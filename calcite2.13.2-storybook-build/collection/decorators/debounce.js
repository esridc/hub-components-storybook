import { debounce } from '../utils/debounce';
export default function DebounceDecoratorFactory(params) {
  function DebounceDecorator(_target, propertyKey, descriptor) {
    const { value: original } = descriptor;
    const debouncedKey = `${propertyKey.toString()}Debounced`;
    const value = function (...args) {
      if (!this[debouncedKey]) {
        Object.defineProperty(this, debouncedKey, {
          value: debounce(original, params.timeout),
        });
      }
      this[debouncedKey](this, ...args);
    };
    return Object.assign(Object.assign({}, descriptor), { value });
  }
  return DebounceDecorator;
}
