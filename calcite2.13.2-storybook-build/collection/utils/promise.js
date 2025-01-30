// special timeout error
export const TIMEOUT_ERROR = new Error("Timeout");
/**
 * Function to allow a promise to race against a timeout. If the promise finishes before the specified timeout,
 * the promise's value will be returned. If the timeout elapses before the promise finishes,
 * a timeout exception is returned.
 * @param prom Promise to race against a timeout (e.g. call to api)
 * @param timeoutAmount Amount of time (in seconds) to wait for the promise to finish before throwing an error
 * @returns Either returns the promise's resolved/rejected value, or TIMEOUT_ERROR
 */
export const promiseWithTimeout = (prom, timeoutAmount) => {
  let timer;
  const timeout = timeoutAmount * 1000; // convert to milliseconds
  return Promise.race([
    prom,
    new Promise((_r, rej) => timer = setTimeout(rej, timeout, TIMEOUT_ERROR))
  ]).finally(() => clearTimeout(timer));
};
