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
export declare function validateMeasurementId(measurementId: string): boolean;
export declare function validateTrackingId(measurementId: string): boolean;
export declare function validateGA(id: string): boolean;
export declare function validateAdobeLaunchScriptTag(str: string): boolean;
export declare function validateNonEmptyStr(str: string): boolean;
