import { NestZeroApplication } from './nest-zero-application';
import { NestFactory } from '@nestjs/core';

export class NestZeroFactoryStatic {
  public async create(module: any, options?): Promise<NestZeroApplication> {
    const context = await NestFactory.createApplicationContext(module);
    return new NestZeroApplication(context);
  }
}

export const NestZeroFactory = new NestZeroFactoryStatic();
