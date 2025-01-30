/** enum to discriminate between embed union members */
var EmbedKind;
(function (EmbedKind) {
    EmbedKind["app"] = "app";
    EmbedKind["map"] = "map";
    EmbedKind["feedback"] = "feedback";
    EmbedKind["external"] = "external";
})(EmbedKind || (EmbedKind = {}));

export { EmbedKind as E };
