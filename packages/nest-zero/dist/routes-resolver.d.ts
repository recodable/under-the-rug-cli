import { NestContainer, ApplicationConfig } from '@nestjs/core';
import { Injector } from '@nestjs/core/injector/injector';
import { Controller } from '@nestjs/common/interfaces/controllers/controller.interface';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { NestZeroApplication } from './nest-zero-application';
export declare class RoutesResolver {
    private readonly container;
    private readonly config;
    private readonly injector;
    private readonly metadataScanner;
    constructor(container: NestContainer, config: ApplicationConfig, injector: Injector);
    resolve(app: NestZeroApplication): void;
    registerRouters(routes: Map<string, InstanceWrapper<Controller>>, moduleName: string, app: NestZeroApplication): void;
    scanForPaths(instance: Controller, prototype?: any): any[];
    exploreMethodMetadata(instance: Controller, instancePrototype: any, methodName: string): {
        routePath: any;
        targetCallback: any;
        methodName: string;
    };
}
