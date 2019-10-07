import { SIGNATURE, DESCRIPTION } from './constants';

export interface CommandOptions {
  signature: string;
  description?: string;
}

export function Command(options: string | CommandOptions = '') {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    if (typeof options === "string") {
      options = { signature: options };
    }
    Reflect.defineMetadata(SIGNATURE, options.signature, descriptor.value);
    Reflect.defineMetadata(DESCRIPTION, options.description, descriptor.value);
  };
}
