import { IAutoLinkOptions } from '../utils/string';
/**
 * A decorator factory function that accepts the auto link decorator configuration params
 *
 * @returns The cache decorator function
 */
export default function AutoLinkDecoratorFactory(options?: IAutoLinkOptions): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
