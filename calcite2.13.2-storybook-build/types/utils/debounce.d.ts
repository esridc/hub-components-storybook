/**
 * A util to debounce another function. It will return a function
 * that, as long as it continues to be invoked, will not be triggered
 * until the designated timeout has passed.
 */
export declare function debounce(fn: () => any, timeout?: number): (context?: any, ...args: any[]) => void;
