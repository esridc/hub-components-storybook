/**
 * Possible relationships for an expression
 * BETWEEN -- used to show between two values, i.e. 7 < x < 10
 * IS_EXACTLY -- for exact matching, i.e. two same strings
 */
var ExpressionRelationships;
(function (ExpressionRelationships) {
    ExpressionRelationships["BETWEEN"] = "between";
    ExpressionRelationships["IS_EXACTLY"] = "isExactly";
    // deprecated and not currently allowed for new use, only used for migrating older stat cards
    ExpressionRelationships["LIKE"] = "like";
})(ExpressionRelationships || (ExpressionRelationships = {}));
/**
 * Types of states of visibility a metric can be in
 * featured, visible, or hidden
 */
var MetricVisibility;
(function (MetricVisibility) {
    MetricVisibility["visible"] = "visible";
    MetricVisibility["hidden"] = "hidden";
    MetricVisibility["featured"] = "featured";
})(MetricVisibility || (MetricVisibility = {}));
/** Maxmium number of metrics allowed on any given entity. */
const MAX_ENTITY_METRICS_ALLOWED = 24;
/** Maximum number of featured metrics allowed on any given entity. */
const MAX_FEATURED_METRICS_ALLOWED = 4;

export { ExpressionRelationships as E, MetricVisibility as M, MAX_ENTITY_METRICS_ALLOWED as a, MAX_FEATURED_METRICS_ALLOWED as b };
