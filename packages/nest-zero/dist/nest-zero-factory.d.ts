import { NestZeroApplication } from './nest-zero-application';
export declare class NestZeroFactoryStatic {
    create(module: any, options?: any): Promise<NestZeroApplication>;
    private initialize;
}
export declare const NestZeroFactory: NestZeroFactoryStatic;
