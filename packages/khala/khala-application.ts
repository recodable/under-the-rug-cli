import { INestApplicationContext } from '@nestjs/common';
import * as commander from 'commander';
import {
  NestContainer,
  ApplicationConfig,
  NestApplicationContext,
} from '@nestjs/core';
import { RoutesResolver } from './routes-resolver';

export class KhalaApplication extends NestApplicationContext {
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
    const signature = [route.prefix, route.routePath].filter(v => v).join(':');
    (signature ? this.instance.command(signature) : this.instance).action(
      controller[route.methodName].bind(controller),
    );
    return this;
  }
}
