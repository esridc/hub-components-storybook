/*
 * This util is temporarily copied from hub-components in opendata-ui for dev purposes
 */
const UNITS = [
  'B',
  'KB',
  'MB',
  'GB',
  'TB',
  'PB',
  'EB',
  'ZB',
  'YB'
];
/**
 * Convert the given byte number into a human-readable format.
 * @param  {number} number       byte number
 * @param  {Object} [options={}] options
 * @param  {string} [options.unit]  output unit
 * @param  {string} [options.locale]  locale string
 * @param  {number} [options.round=2] max decimal digits for rounding
 * @return {string}              human-readable string
 */
function formatBytes(number, options = {}) {
  let exponent;
  if (number === 0) {
    exponent = UNITS.indexOf(options.unit || 'KB');
  }
  else if (options.unit) {
    exponent = UNITS.indexOf(options.unit);
  }
  else {
    exponent = Math.min(Math.floor(Math.log10(number) / 3), UNITS.length - 1);
  }
  const round = Number.isInteger(options.round) ? options.round : 2;
  const factor = Math.pow(10, round);
  number = number / Math.pow(1000, exponent);
  number = Math.round(number * factor) / factor;
  const numberString = number.toLocaleString(options.locale);
  return numberString + ' ' + UNITS[exponent];
}

export { formatBytes as f };
