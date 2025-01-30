import { IResolvedMetric } from "@esri/hub-common";
export declare const TIMEOUT_ERROR: Error;
/**
 * Function to allow a promise to race against a timeout. If the promise finishes before the specified timeout,
 * the promise's value will be returned. If the timeout elapses before the promise finishes,
 * a timeout exception is returned.
 * @param prom Promise to race against a timeout (e.g. call to api)
 * @param timeoutAmount Amount of time (in seconds) to wait for the promise to finish before throwing an error
 * @returns Either returns the promise's resolved/rejected value, or TIMEOUT_ERROR
 */
export declare const promiseWithTimeout: (prom: Promise<IResolvedMetric>, timeoutAmount: number) => Promise<unknown>;
