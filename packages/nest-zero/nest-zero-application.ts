import { INestApplicationContext } from '@nestjs/common';

export class NestZeroApplication {
  constructor(private readonly context: INestApplicationContext) {}

  public execute(args: any[]) {
    console.log({ args });
  }
}
