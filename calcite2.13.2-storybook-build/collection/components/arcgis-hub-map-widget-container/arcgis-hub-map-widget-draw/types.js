/**
 * SketchViewModel states
 * https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch-SketchViewModel.html#event-create
 */
export var DrawState;
(function (DrawState) {
  DrawState["START"] = "start";
  DrawState["ACTIVE"] = "active";
  DrawState["COMPLETE"] = "complete";
  DrawState["CANCEL"] = "cancel";
})(DrawState || (DrawState = {}));
;
/**
 * Map Tip states
 * 'start' -> before first location added
 * 'active' -> first location added, adding more points
 * 'inactive' -> not drawing / editing
 */
export var TipState;
(function (TipState) {
  TipState["START"] = "start";
  TipState["ACTIVE"] = "active";
  TipState["INACTIVE"] = "inactive";
})(TipState || (TipState = {}));
;
