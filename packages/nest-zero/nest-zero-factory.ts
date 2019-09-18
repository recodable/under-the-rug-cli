import { NestZeroApplication } from './nest-zero-application';
import { Logger } from '@nestjs/common/services/logger.service';
import { ApplicationConfig } from '@nestjs/core';
import { NestContainer } from '@nestjs/core';
import { InstanceLoader } from '@nestjs/core/injector/instance-loader';
import { DependenciesScanner } from '@nestjs/core/scanner';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { MESSAGES } from '@nestjs/core/constants';
import { ExceptionsZone } from '@nestjs/core/errors/exceptions-zone';
import { isFunction } from '@nestjs/common/utils/shared.utils';

export class NestZeroFactoryStatic {
  private readonly logger = new Logger('NestZeroFactory', true);

  public async create(module): Promise<NestZeroApplication> {
    // let [httpServer, appOptions] = this.isHttpServer(serverOrOptions)
    //   ? [serverOrOptions, options]
    //   : [this.createHttpAdapter(), serverOrOptions];
    const applicationConfig = new ApplicationConfig();
    const container = new NestContainer(applicationConfig);
    // this.applyLogger(appOptions);
    await this.initialize(module, container, applicationConfig);
    // const instance = new NestApplication(
    //   container,
    //   httpServer,
    //   applicationConfig,
    //   appOptions,
    // );
    const instance = new NestZeroApplication(container, applicationConfig);
    const target = this.createNestInstance(instance);
    return this.createAdapterProxy(target);
  }

  private async initialize(
    module: any,
    container: NestContainer,
    config = new ApplicationConfig(),
    // httpServer: HttpServer = null,
  ) {
    const instanceLoader = new InstanceLoader(container);
    const dependenciesScanner = new DependenciesScanner(
      container,
      new MetadataScanner(),
      config,
    );
    // container.setHttpAdapter(httpServer);
    try {
      this.logger.log(MESSAGES.APPLICATION_START);
      await ExceptionsZone.asyncRun(async () => {
        await dependenciesScanner.scan(module);
        await instanceLoader.createInstancesOfDependencies();
        dependenciesScanner.applyApplicationProviders();
      });
    } catch (e) {
      process.abort();
    }
  }

  private createNestInstance<T>(instance: T): T {
    return this.createProxy(instance);
  }

  private createProxy(target: any) {
    const proxy = this.createExceptionProxy();
    return new Proxy(target, {
      get: proxy,
      set: proxy,
    });
  }

  private createExceptionProxy() {
    return (receiver: Record<string, any>, prop: string) => {
      if (!(prop in receiver)) {
        return;
      }
      if (isFunction(receiver[prop])) {
        return this.createExceptionZone(receiver, prop);
      }
      return receiver[prop];
    };
  }

  private createExceptionZone(
    receiver: Record<string, any>,
    prop: string,
  ): Function {
    return (...args: unknown[]) => {
      let result;
      ExceptionsZone.run(() => {
        result = receiver[prop](...args);
      });
      return result;
    };
  }

  private createAdapterProxy(app: NestZeroApplication): NestZeroApplication {
    return app;
    // return (new Proxy(app, {
    //   get: (receiver: Record<string, any>, prop: string) => {
    //     if (!(prop in receiver) && prop in adapter) {
    //       return this.createExceptionZone(adapter, prop);
    //     }
    //     return receiver[prop];
    //   },
    // }) as unknown) as T;
  }
}

export const NestZeroFactory = new NestZeroFactoryStatic();
