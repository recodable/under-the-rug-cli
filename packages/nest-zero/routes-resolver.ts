import { Resolver } from '@nestjs/core/router/interfaces/resolver.interface';
import { MODULE_PATH } from '@nestjs/common/constants';

export class RoutesResolver implements Resolver {
  constructor(private readonly container) {}

  resolve(instance: any, basePath: string): void {
    const modules = this.container.getModules();
    modules.forEach(({ controllers, metatype }, moduleName) => {
      let path = metatype
        ? Reflect.getMetadata(MODULE_PATH, metatype)
        : undefined;
      path = path ? basePath + path : basePath;
      this.registerRouters(controllers, moduleName, path, applicationRef);
    });
  }

  // public resolve<T extends HttpServer>(applicationRef: T, basePath: string) {
  //   const modules = this.container.getModules();
  //   modules.forEach(({ controllers, metatype }, moduleName) => {
  //     let path = metatype
  //       ? Reflect.getMetadata(MODULE_PATH, metatype)
  //       : undefined;
  //     path = path ? basePath + path : basePath;
  //     this.registerRouters(controllers, moduleName, path, applicationRef);
  //   });
  // }

  registerNotFoundHandler(): void {
    console.log('resolveregisterNotFoundHandler');
  }

  registerExceptionHandler(): void {
    console.log('registerExceptionHandler');
  }
}
