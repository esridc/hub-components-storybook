'use strict';

/** enum to discriminate between embed union members */
exports.EmbedKind = void 0;
(function (EmbedKind) {
    EmbedKind["app"] = "app";
    EmbedKind["map"] = "map";
    EmbedKind["feedback"] = "feedback";
    EmbedKind["external"] = "external";
})(exports.EmbedKind || (exports.EmbedKind = {}));
