import { AbstractHttpAdapter } from '@nestjs/core';
import * as commander from 'commander';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';
import { RequestMethod } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export class NestZeroAdapter extends AbstractHttpAdapter {
  constructor(instance?: any) {
    super(instance || commander);
  }

  initHttpServer(options: NestApplicationOptions) {
    return (this.httpServer = commander);
  }

  getRequestMethod(request): string {
    console.log({ where: 'getRequestMethod', request });
    return 'GET';
  }

  getRequestUrl(request) {
    console.log({ where: 'getRequestUrl', request });
    return '/';
  }

  reply(response, body: any, statusCode?: number) {
    console.log({ response, body, statusCode });
  }

  createMiddlewareFactory(
    requestMethod: RequestMethod,
  ): (path: string, callback: Function) => any {
    return (path, callback) => null;
  }

  getType(): string {
    return 'cli';
  }

  async execute(args: any[] = []) {
    return this.instance.parse(args);
  }

  close() {}
  useStaticAssets(...args: any[]) {}
  setViewEngine(engine: string) {}
  render(response, view: string, options: any) {}
  redirect(response, statusCode: number, url: string) {}
  setErrorHandler(handler: Function) {}
  setNotFoundHandler(handler: Function) {}
  setHeader(response, name: string, value: string) {}
  registerParserMiddleware() {}
  enableCors(options: CorsOptions) {}
  status(response, statusCode: number) {}
}
