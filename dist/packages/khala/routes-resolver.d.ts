import { NestContainer, ApplicationConfig } from '@nestjs/core';
import { Injector } from '@nestjs/core/injector/injector';
import { Controller } from '@nestjs/common/interfaces/controllers/controller.interface';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { KhalaApplication } from './khala-application';
export declare class RoutesResolver {
    private readonly container;
    private readonly config;
    private readonly injector;
    private readonly metadataScanner;
    constructor(container: NestContainer, config: ApplicationConfig, injector: Injector);
    resolve(app: KhalaApplication): void;
    registerRouters(routes: Map<string, InstanceWrapper<Controller>>, moduleName: string, app: KhalaApplication): void;
    scanForPaths(instance: Controller, prototype?: any): any[];
    exploreMethodMetadata(instance: Controller, instancePrototype: any, methodName: string): {
        routePath: any;
        targetCallback: any;
        methodName: string;
    };
}
