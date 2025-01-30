/**
 * ```
 * import { wait } from '@esri/hub-common';
 *
 * await wait(1000); // waits for 1 second before continuing
 * ```
 *
 * A generic utility function for delaying an action by a provided timeout
 * @param delay Time to wait in milliseconds
 * @returns An empty promise that needs to be awaited
 */
const wait = (delay) => {
    return new Promise((resolve) => setTimeout(resolve, delay));
};

export { wait as w };
