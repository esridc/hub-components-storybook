/**
 * Alignment values allowed for a display
 *
 * values = start | center | end
 */
var ALIGNMENTS;
(function (ALIGNMENTS) {
    ALIGNMENTS["start"] = "start";
    ALIGNMENTS["center"] = "center";
    ALIGNMENTS["end"] = "end";
})(ALIGNMENTS || (ALIGNMENTS = {}));
/**
 * Corner values allowed for a display
 *
 * values = square | round
 */
var CORNERS;
(function (CORNERS) {
    CORNERS["square"] = "square";
    CORNERS["round"] = "round";
})(CORNERS || (CORNERS = {}));
/**
 * Drop shadow values allowed for a display
 *
 * values = none | low | medium | heavy
 */
var DROP_SHADOWS;
(function (DROP_SHADOWS) {
    DROP_SHADOWS["none"] = "none";
    DROP_SHADOWS["low"] = "low";
    DROP_SHADOWS["medium"] = "medium";
    DROP_SHADOWS["heavy"] = "heavy";
})(DROP_SHADOWS || (DROP_SHADOWS = {}));
/**
 * Tags to wrap the title on each card
 */
var CARD_TITLE_TAGS;
(function (CARD_TITLE_TAGS) {
    CARD_TITLE_TAGS["h1"] = "h1";
    CARD_TITLE_TAGS["h2"] = "h2";
    CARD_TITLE_TAGS["h3"] = "h3";
    CARD_TITLE_TAGS["h4"] = "h4";
    CARD_TITLE_TAGS["h5"] = "h5";
    CARD_TITLE_TAGS["h6"] = "h6";
})(CARD_TITLE_TAGS || (CARD_TITLE_TAGS = {}));

export { ALIGNMENTS as A, CARD_TITLE_TAGS as C, DROP_SHADOWS as D, CORNERS as a };
