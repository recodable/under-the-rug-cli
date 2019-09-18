import { ApplicationConfig } from '@nestjs/core';
import { NestContainer } from '@nestjs/core';
import { Logger } from '@nestjs/common/services/logger.service';
import { MESSAGES } from '@nestjs/core/constants';
import { validatePath } from '@nestjs/common/utils/shared.utils';
import { Resolver } from '@nestjs/core/router/interfaces/resolver.interface';
import { RoutesResolver } from './routes-resolver';
import { Injector } from '@nestjs/core/injector/injector';

export class NestZeroApplication {
  protected isInitialized: boolean = false;
  private readonly logger = new Logger(NestZeroApplication.name, true);
  private readonly routesResolver: Resolver;
  protected readonly injector = new Injector();

  constructor(
    private readonly container: NestContainer,
    private readonly config: ApplicationConfig,
  ) {
    this.routesResolver = new RoutesResolver(
      this.container,
      // this.config,
      // this.injector,
    );
  }

  public async init(): Promise<this> {
    // const useBodyParser =
    //   this.appOptions && this.appOptions.bodyParser !== false;
    // useBodyParser && this.registerParserMiddleware();

    // await this.registerModules();
    await this.registerRouter();
    // await this.callInitHook();
    // await this.registerRouterHooks();
    // await this.callBootstrapHook();

    this.isInitialized = true;
    this.logger.log(MESSAGES.APPLICATION_READY);
    return this;
  }

  public async execute() {
    !this.isInitialized && (await this.init());

    // this.httpAdapter.listen(port, ...args);
    // return this.httpServer;
  }

  public async registerRouter() {
    // await this.registerMiddleware(this.httpAdapter);

    const prefix = this.config.getGlobalPrefix();
    const basePath = validatePath(prefix);
    this.routesResolver.resolve({}, basePath);
  }
}
