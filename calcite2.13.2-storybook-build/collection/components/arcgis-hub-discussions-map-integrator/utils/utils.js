/**
 * Optional map states for symbol
 */
export var SYMBOL_STATE;
(function (SYMBOL_STATE) {
  SYMBOL_STATE["ACTIVE"] = "active";
  SYMBOL_STATE["HOVER"] = "hover";
  SYMBOL_STATE["DEFAULT"] = "default";
})(SYMBOL_STATE || (SYMBOL_STATE = {}));
/**
 * Get the maximum deviation for a given view
 * @param {Object} view - Esri view
 * @param {number} maxDeviation - Maximum allowed deviation from original geometry
 * @returns {number} Number - Maximum deviation
**/
export function getMaxDeviation(view, maxDeviation = 3.5) {
  return view.resolution * maxDeviation;
}
