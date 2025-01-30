/**
 * A util to debounce another function. It will return a function
 * that, as long as it continues to be invoked, will not be triggered
 * until the designated timeout has passed.
 */
export function debounce(fn, timeout = 300) {
  let timeoutId;
  return function (context, ...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(context, args), timeout);
  };
}
;
