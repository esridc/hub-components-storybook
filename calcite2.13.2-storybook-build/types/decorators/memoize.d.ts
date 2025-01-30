/**
 * A decorator factory function that augments a getter method with caching behavior
 * based on triple-equals comparison of other class member values. The factory accepts
 * zero or more path strings that represent the values to observe for changes. When any
 * of those values change, the underlying getter method will be invoked and it's newly
 * computed value returned vs the previously cached value. Since this decorator uses
 * triple-equals comparison, mutating existing Arrays and other Objects will not trigger
 * a new computation. If you need a the value to be recomputed when observing Arrays
 * or Objects, make sure the observed member(s) is/are updated to a new Arrays or Objects.
 *
 * Example usage:
 * class MyComponent {
 *   @State() usernames = ['user1', 'user2'];
 *
 *   handleAddUsername(username: string) {
 *     // creating a new array here causes `joined` to recompute below
 *     this.usernames = [...this.usernames, username];
 *   }
 *
 *   @Memoize('usernames')
 *   get joined (): string {
 *     // only re-runs when `usernames` array changes to a new array
 *     return this.usernames.join(', ');
 *   }
 *
 *   render() {
 *     {this.joined}
 *   }
 * }
 *
 * @param pathsToWatch An optional array of paths to observe for changes
 * @returns A property descriptor that augments a getter with caching behavior
 */
export default function MemoizeDecoratorFactory(...pathsToWatch: string[]): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
