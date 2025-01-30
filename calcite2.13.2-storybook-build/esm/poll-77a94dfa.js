/**
 * Function to poll a provided request until a validation
 * state or timeout is reached
 *
 * NOTE: we expose this as a public util, but should use this
 * functionality sparingly when dealing with the Portal API.
 * Best practice is to leverage this polling functionality
 * internally on functions that we know incur a Portal delay.
 *
 * @param requestFn
 * @param validationFn
 * @param opts
 */
async function poll(requestFn, validationFn, options) {
    const isGreaterThanZero = (num) => !isNaN(num) && num > 0;
    const _maxAttempts = isGreaterThanZero(options === null || options === void 0 ? void 0 : options.maxAttempts)
        ? options.maxAttempts
        : 7;
    const _delay = isGreaterThanZero(options === null || options === void 0 ? void 0 : options.initialRetryDelay)
        ? options.initialRetryDelay
        : 500;
    async function pollRecursive(attempt, delay) {
        if (attempt > _maxAttempts) {
            throw new Error(`Polling failed after ${_maxAttempts} attempts`);
        }
        const results = await new Promise((resolve) => {
            setTimeout(async () => {
                const res = await requestFn();
                resolve(res);
            }, delay);
        });
        return validationFn(results)
            ? results
            : await pollRecursive(attempt + 1, attempt === 1 ? _delay : delay * 2);
    }
    return pollRecursive(1, 0);
}

export { poll as p };
