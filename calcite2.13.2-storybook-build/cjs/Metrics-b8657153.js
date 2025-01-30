'use strict';

/**
 * Possible relationships for an expression
 * BETWEEN -- used to show between two values, i.e. 7 < x < 10
 * IS_EXACTLY -- for exact matching, i.e. two same strings
 */
exports.ExpressionRelationships = void 0;
(function (ExpressionRelationships) {
    ExpressionRelationships["BETWEEN"] = "between";
    ExpressionRelationships["IS_EXACTLY"] = "isExactly";
    // deprecated and not currently allowed for new use, only used for migrating older stat cards
    ExpressionRelationships["LIKE"] = "like";
})(exports.ExpressionRelationships || (exports.ExpressionRelationships = {}));
/**
 * Types of states of visibility a metric can be in
 * featured, visible, or hidden
 */
exports.MetricVisibility = void 0;
(function (MetricVisibility) {
    MetricVisibility["visible"] = "visible";
    MetricVisibility["hidden"] = "hidden";
    MetricVisibility["featured"] = "featured";
})(exports.MetricVisibility || (exports.MetricVisibility = {}));
/** Maxmium number of metrics allowed on any given entity. */
const MAX_ENTITY_METRICS_ALLOWED = 24;
/** Maximum number of featured metrics allowed on any given entity. */
const MAX_FEATURED_METRICS_ALLOWED = 4;

exports.MAX_ENTITY_METRICS_ALLOWED = MAX_ENTITY_METRICS_ALLOWED;
exports.MAX_FEATURED_METRICS_ALLOWED = MAX_FEATURED_METRICS_ALLOWED;
