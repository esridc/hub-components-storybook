/**
* Regular Expression snippets to validate Google Analytics tracking code
* see http://code.google.com/apis/analytics/docs/concepts/gaConceptsAccounts.html#webProperty
*
* @author  Faisalman <movedpixel@gmail.com>
* @license http://www.opensource.org/licenses/mit-license.php
* @link    http://gist.github.com/faisalman
* @param   measurementId     string to be validated
* @return  Boolean
*/
export function validateMeasurementId(measurementId) {
  const G_REGEX = /^G-[A-Z0-9]{1,}$/gi;
  const toStringVal = measurementId.toString();
  return G_REGEX.test(toStringVal);
}
// Validate a ga3 tracking id
export function validateTrackingId(measurementId) {
  const UA_REGEX = /^ua-\d{4,9}-\d{1,4}$/i;
  const toStringVal = measurementId.toString();
  return UA_REGEX.test(toStringVal);
}
// Validate that it is either a ga3 or ga4 style id
export function validateGA(id) {
  return validateMeasurementId(id) || validateTrackingId(id);
}
export function validateAdobeLaunchScriptTag(str) {
  const G_REGEX = /^(?!(\/))[\w|\W]*\.js$/i;
  const toStringVal = str.toString();
  return G_REGEX.test(toStringVal);
}
export function validateNonEmptyStr(str) {
  return (str === null || str === void 0 ? void 0 : str.length) > 0;
}
