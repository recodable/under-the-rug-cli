import { NestContainer, ApplicationConfig, NestApplicationContext } from '@nestjs/core';
export declare class KhalaApplication extends NestApplicationContext {
    private readonly config;
    private instance;
    private routesResolver;
    constructor(container: NestContainer, config: ApplicationConfig, options?: any);
    execute(args: any[]): Promise<void>;
    private initialize;
    addCommand(route: any, controllerName: string): this;
}
