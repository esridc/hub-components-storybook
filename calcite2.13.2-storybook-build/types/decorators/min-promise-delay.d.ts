interface IMinPromiseDelayOptions {
  delay: number;
}
/**
 * A decorator factory function that accepts the minPromiseDelay decorator
 * configuration params
 * @param options An IMinPromiseDelayOptions object
 * @returns minPromiseDelay decorator
 */
export default function minPromiseDelayFactory(options: IMinPromiseDelayOptions): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export {};
