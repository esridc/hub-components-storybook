/**
 * Convert the given byte number into a human-readable format.
 * @param  {number} number       byte number
 * @param  {Object} [options={}] options
 * @param  {string} [options.unit]  output unit
 * @param  {string} [options.locale]  locale string
 * @param  {number} [options.round=2] max decimal digits for rounding
 * @return {string}              human-readable string
 */
export declare function formatBytes(number: number, options?: any): string;
