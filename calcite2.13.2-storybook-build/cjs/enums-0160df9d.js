'use strict';

/**
 * Alignment values allowed for a display
 *
 * values = start | center | end
 */
exports.ALIGNMENTS = void 0;
(function (ALIGNMENTS) {
    ALIGNMENTS["start"] = "start";
    ALIGNMENTS["center"] = "center";
    ALIGNMENTS["end"] = "end";
})(exports.ALIGNMENTS || (exports.ALIGNMENTS = {}));
/**
 * Corner values allowed for a display
 *
 * values = square | round
 */
exports.CORNERS = void 0;
(function (CORNERS) {
    CORNERS["square"] = "square";
    CORNERS["round"] = "round";
})(exports.CORNERS || (exports.CORNERS = {}));
/**
 * Drop shadow values allowed for a display
 *
 * values = none | low | medium | heavy
 */
exports.DROP_SHADOWS = void 0;
(function (DROP_SHADOWS) {
    DROP_SHADOWS["none"] = "none";
    DROP_SHADOWS["low"] = "low";
    DROP_SHADOWS["medium"] = "medium";
    DROP_SHADOWS["heavy"] = "heavy";
})(exports.DROP_SHADOWS || (exports.DROP_SHADOWS = {}));
/**
 * Tags to wrap the title on each card
 */
exports.CARD_TITLE_TAGS = void 0;
(function (CARD_TITLE_TAGS) {
    CARD_TITLE_TAGS["h1"] = "h1";
    CARD_TITLE_TAGS["h2"] = "h2";
    CARD_TITLE_TAGS["h3"] = "h3";
    CARD_TITLE_TAGS["h4"] = "h4";
    CARD_TITLE_TAGS["h5"] = "h5";
    CARD_TITLE_TAGS["h6"] = "h6";
})(exports.CARD_TITLE_TAGS || (exports.CARD_TITLE_TAGS = {}));
