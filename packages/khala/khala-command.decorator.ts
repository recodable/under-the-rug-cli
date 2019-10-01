import { SIGNATURE } from './constants';
export interface CommandOptions {
  signature?: string;
}

export function Command(options: string | CommandOptions = '') {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    // descriptor.enumerable = value;
    Reflect.defineMetadata(SIGNATURE, options, descriptor.value);
  };
}
