interface ICallWhenDecoratorParams {
  when: (...args: any[]) => boolean;
}
/**
 * A method decorator factory function for the callWhen decorator
 * @param params An ICallWhenDecoratorParams object
 * @returns The callWhen method decorator function
 */
export default function CallWhenFactory<T>(params: ICallWhenDecoratorParams): MethodDecorator;
export {};
