export interface CommandOptions {
    signature: string;
    description?: string;
}
export declare function Command(options?: string | CommandOptions): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
