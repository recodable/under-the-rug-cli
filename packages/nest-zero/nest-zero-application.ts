import { INestApplicationContext } from '@nestjs/common';
import * as commander from 'commander';

export class NestZeroApplication {
  private cli = commander;

  constructor(private readonly context: INestApplicationContext) {}

  public async execute(args: any[]) {
    this.cli.parse(args);
  }
}
