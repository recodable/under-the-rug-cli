import { NestContainer, ApplicationConfig } from '@nestjs/core';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { Injector } from '@nestjs/core/injector/injector';

export class RoutesResolver {
  constructor(
    private readonly container: NestContainer,
    private readonly config: ApplicationConfig,
    private readonly injector: Injector,
  ) {
    // this.routerExceptionsFilter = new RouterExceptionFilters(
    //   container,
    //   config,
    //   container.getHttpAdapterRef(),
    // );
    // const metadataScanner = new MetadataScanner();
    // this.routerBuilder = new RouterExplorer(
    //   metadataScanner,
    //   this.container,
    //   this.injector,
    //   this.routerProxy,
    //   this.routerExceptionsFilter,
    //   this.config,
    // );
  }

  public resolve() {
    const modules = this.container.getModules();
    modules.forEach(({ controllers, metatype }, moduleName) => {
      console.log({ controllers, metatype, moduleName });
      // let path = metatype
      //   ? Reflect.getMetadata(MODULE_PATH, metatype)
      //   : undefined;
      // path = path ? basePath + path : basePath;
      // this.registerRouters(controllers, moduleName, path, applicationRef);
    });
  }

  // public registerRouters(
  //   routes: Map<string, InstanceWrapper<Controller>>,
  //   moduleName: string,
  //   basePath: string,
  //   applicationRef: HttpServer,
  // ) {
  //   routes.forEach(instanceWrapper => {
  //     const { metatype } = instanceWrapper;
  //     const path = this.routerBuilder.extractRouterPath(
  //       metatype as Type<any>,
  //       basePath,
  //     );
  //     const controllerName = metatype.name;

  //     this.logger.log(CONTROLLER_MAPPING_MESSAGE(controllerName, path));
  //     this.routerBuilder.explore(
  //       instanceWrapper,
  //       moduleName,
  //       applicationRef,
  //       path,
  //     );
  //   });
  // }
}
