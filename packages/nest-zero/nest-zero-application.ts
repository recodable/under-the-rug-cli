import { INestApplicationContext } from '@nestjs/common';
import * as commander from 'commander';
import {
  NestContainer,
  ApplicationConfig,
  NestApplicationContext,
} from '@nestjs/core';
import { RoutesResolver } from './routes-resolver';

export class NestZeroApplication extends NestApplicationContext {
  private instance = commander;
  private routesResolver: RoutesResolver;

  constructor(
    container: NestContainer,
    private readonly config: ApplicationConfig,
    options?,
  ) {
    super(container);

    this.routesResolver = new RoutesResolver(
      this.container,
      this.config,
      this.injector,
    );
  }

  public async execute(args: any[]) {
    await this.initialize();
    this.instance.parse(args);
  }

  private async initialize() {
    this.routesResolver.resolve(this);
  }

  public addCommand(route, controllerName: string) {
    const controller = this.get(controllerName);
    (route.routePath
      ? this.instance.command(route.routePath)
      : this.instance
    ).action(controller[route.methodName].bind(controller));
    return this;
  }
}
