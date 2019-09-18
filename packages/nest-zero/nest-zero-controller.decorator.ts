import { SIGNATURE } from './constants';

export interface ControllerOptions {
  signature?: string;
}

export function Controller(
  options: string | ControllerOptions = '',
): ClassDecorator {
  const signature = typeof options === 'string' ? options : options.signature;
  return (target: object) => {
    Reflect.defineMetadata(SIGNATURE, signature, target);
  };
}
