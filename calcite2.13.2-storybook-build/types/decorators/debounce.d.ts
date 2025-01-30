interface IDebounceDecoratorParams {
  timeout: number;
}
export default function DebounceDecoratorFactory(params: IDebounceDecoratorParams): MethodDecorator;
export {};
