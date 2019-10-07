import { KhalaApplication } from './khala-application';
export declare class KhalaFactoryStatic {
    create(module: any, options?: any): Promise<KhalaApplication>;
    private initialize;
}
export declare const KhalaFactory: KhalaFactoryStatic;
