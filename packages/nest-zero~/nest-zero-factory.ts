import { INestApplication } from '@nestjs/common';
import { NestFactoryStatic } from '@nestjs/core/nest-factory';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';
import { AbstractHttpAdapter } from '@nestjs/core';
import { NestZeroAdapter } from './adapter';

interface INestZeroApplication extends INestApplication {
  execute(args: any[]);
}

export class NestZeroFactoryStatic extends NestFactoryStatic {
  public async createCLI<T extends INestZeroApplication = INestZeroApplication>(
    module: any,
    options?: NestApplicationOptions,
  ): Promise<T> {
    return this.create(module, this.createCLIAdapter(), options);
  }

  private createCLIAdapter(): AbstractHttpAdapter {
    return new NestZeroAdapter();
  }
}

export const NestZeroFactory = new NestZeroFactoryStatic();
