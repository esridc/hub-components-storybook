var ALIGNMENTS;
(function (ALIGNMENTS) {
  ALIGNMENTS["start"] = "start";
  ALIGNMENTS["center"] = "center";
  ALIGNMENTS["end"] = "end";
})(ALIGNMENTS || (ALIGNMENTS = {}));
var CORNERS;
(function (CORNERS) {
  CORNERS["square"] = "square";
  CORNERS["round"] = "round";
})(CORNERS || (CORNERS = {}));
var DROP_SHADOWS;
(function (DROP_SHADOWS) {
  DROP_SHADOWS["none"] = "none";
  DROP_SHADOWS["low"] = "low";
  DROP_SHADOWS["medium"] = "medium";
  DROP_SHADOWS["heavy"] = "heavy";
})(DROP_SHADOWS || (DROP_SHADOWS = {}));
var LAYOUTS;
(function (LAYOUTS) {
  LAYOUTS["simple"] = "simple";
  LAYOUTS["informational"] = "informational";
})(LAYOUTS || (LAYOUTS = {}));
var SCALE;
(function (SCALE) {
  SCALE["small"] = "s";
  SCALE["medium"] = "m";
  SCALE["large"] = "l";
})(SCALE || (SCALE = {}));
var UNIT_POSITIONS;
(function (UNIT_POSITIONS) {
  UNIT_POSITIONS["before"] = "before";
  UNIT_POSITIONS["after"] = "after";
  UNIT_POSITIONS["below"] = "below";
})(UNIT_POSITIONS || (UNIT_POSITIONS = {}));
var VISUAL_INTEREST;
(function (VISUAL_INTEREST) {
  VISUAL_INTEREST["none"] = "none";
  VISUAL_INTEREST["icon"] = "icon";
})(VISUAL_INTEREST || (VISUAL_INTEREST = {}));
var ICONS;
(function (ICONS) {
  ICONS["caretUp"] = "caret-up";
  ICONS["caretDown"] = "caret-down";
  ICONS["caretDouble"] = "caret-double-horizontal";
})(ICONS || (ICONS = {}));
var SHARING;
(function (SHARING) {
  SHARING["always"] = "always";
  SHARING["hover"] = "hover";
})(SHARING || (SHARING = {}));
var SOURCE;
(function (SOURCE) {
  SOURCE["dynamic"] = "dynamic";
  SOURCE["static"] = "static";
  SOURCE["itemQuery"] = "itemQuery";
})(SOURCE || (SOURCE = {}));
var IMAGE_TYPES;
(function (IMAGE_TYPES) {
  IMAGE_TYPES["thumbnail"] = "thumbnail";
  IMAGE_TYPES["icon"] = "icon";
})(IMAGE_TYPES || (IMAGE_TYPES = {}));

export { ALIGNMENTS as A, CORNERS as C, DROP_SHADOWS as D, IMAGE_TYPES as I, LAYOUTS as L, SCALE as S, UNIT_POSITIONS as U, VISUAL_INTEREST as V, SOURCE as a, ICONS as b };
