import { NestContainer, ApplicationConfig } from '@nestjs/core';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { Injector } from '@nestjs/core/injector/injector';
import { Controller } from '@nestjs/common/interfaces/controllers/controller.interface';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { SIGNATURE } from './constants';
import { NestZeroApplication } from './nest-zero-application';

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

  public resolve(app: NestZeroApplication) {
    const modules = this.container.getModules();
    modules.forEach(({ controllers, metatype }, moduleName) => {
      // let path = metatype
      //   ? Reflect.getMetadata(MODULE_PATH, metatype)
      //   : undefined;
      // path = path ? basePath + path : basePath;
      this.registerRouters(controllers, moduleName, app);
    });
  }

  public registerRouters(
    routes: Map<string, InstanceWrapper<Controller>>,
    moduleName: string,
    app: NestZeroApplication,
  ) {
    routes.forEach(instanceWrapper => {
      const { metatype } = instanceWrapper;
      let signature = Reflect.getMetadata(SIGNATURE, metatype);
      // const path = this.routerBuilder.extractRouterPath(
      //   metatype as Type<any>,
      //   basePath,
      // );
      const controllerName = metatype.name;
      // console.log({ signature, controllerName });
      // app.command(signature).action(k)
      app.addCommand(signature, controllerName);

      // this.logger.log(CONTROLLER_MAPPING_MESSAGE(controllerName, path));
      // this.routerBuilder.explore(
      //   instanceWrapper,
      //   moduleName,
      //   applicationRef,
      //   path,
      // );
    });
  }
}
