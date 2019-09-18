import { NestZeroApplication } from './nest-zero-application';
import { NestFactory, NestContainer, ApplicationConfig } from '@nestjs/core';
import { InstanceLoader } from '@nestjs/core/injector/instance-loader';
import { DependenciesScanner } from '@nestjs/core/scanner';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { ExceptionsZone } from '@nestjs/core/errors/exceptions-zone';

export class NestZeroFactoryStatic {
  public async create(module: any, options?): Promise<NestZeroApplication> {
    const config = new ApplicationConfig();
    const container = new NestContainer();
    await this.initialize(module, container, config);
    const instance = new NestZeroApplication(container, config, options);
    return instance;
  }

  private async initialize(
    module: any,
    container: NestContainer,
    config = new ApplicationConfig(),
  ) {
    const instanceLoader = new InstanceLoader(container);
    const dependenciesScanner = new DependenciesScanner(
      container,
      new MetadataScanner(),
      config,
    );
    try {
      await ExceptionsZone.asyncRun(async () => {
        await dependenciesScanner.scan(module);
        await instanceLoader.createInstancesOfDependencies();
        dependenciesScanner.applyApplicationProviders();
      });
    } catch (e) {
      process.abort();
    }
  }
}

export const NestZeroFactory = new NestZeroFactoryStatic();
