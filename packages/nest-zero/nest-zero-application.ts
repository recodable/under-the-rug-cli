import { INestApplicationContext } from '@nestjs/common';
import * as commander from 'commander';
import {
  NestContainer,
  ApplicationConfig,
  NestApplicationContext,
} from '@nestjs/core';
import { RoutesResolver } from './routes-resolver';

export class NestZeroApplication extends NestApplicationContext {
  private cli = commander;
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
    this.cli.parse(args);
  }

  private async initialize() {
    this.routesResolver.resolve();
  }
}
