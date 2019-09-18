import { ApplicationConfig } from '@nestjs/core';
import { NestContainer } from '@nestjs/core';

export class NestZeroApplication {
  constructor(
    private readonly container: NestContainer,
    private readonly config: ApplicationConfig,
  ) {}

  public async execute() {
    console.log('exec');
  }
}
