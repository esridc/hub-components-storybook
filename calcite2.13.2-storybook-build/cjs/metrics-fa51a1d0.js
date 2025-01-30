'use strict';

const featureService = require('./feature-service-49ec8903.js');
const isNil = require('./is-nil-e28a2884.js');
const resources = require('./resources-e64df288.js');

var __rest = (undefined && undefined.__rest) || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
/**
 * Gets the metricId from the IMetricDisplayConfig. Returns the string metricId;
 */
function getMetricId(metricDisplay) {
  let { metricId } = metricDisplay;
  if (metricId === null || metricId === void 0 ? void 0 : metricId.includes("_")) {
    metricId = metricId.split("_")[0];
  }
  return metricId;
}
/**
 * Finds the correct resolved metric and returns the value and cardConfig to render from that metric in the stat card
 * @returns value of the resolved metric
 */
function metricToStatCardConfig(resolvedMetric, metricDisplay, intl) {
  metricDisplay = updateStatMetricDisplay(metricDisplay);
  // prepare result for metric
  let result = Object.assign({ value: "--" }, metricDisplay);
  const metricId = getMetricId(metricDisplay);
  if (resolvedMetric === null || resolvedMetric === void 0 ? void 0 : resolvedMetric.features) {
    let value;
    const metricFeature = getSingleMetricFeature(resolvedMetric.features, metricId);
    if (metricFeature) {
      value = metricFeature === null || metricFeature === void 0 ? void 0 : metricFeature.attributes[metricId];
      // If date type dynamic metric, then we need to format the date
      if ((metricDisplay === null || metricDisplay === void 0 ? void 0 : metricDisplay.fieldType) === 'esriFieldTypeDate' && metricDisplay.statistic !== 'count') {
        value = intl.formatDate(value);
      }
      // if date type static metric, we need to split the date out and rebuild into a date object
      // this ensures that timezones are handled correctly and the date doesn't accidentally format to the day before
      else if (metricFeature.attributes.valueType === 'date' && metricDisplay.type === 'static') {
        const [year, month, day] = value === null || value === void 0 ? void 0 : value.split('-');
        // create new Date with Date constructor -- month in constructor is monthIndex, so subtract 1
        value = intl.formatDate(new Date(year, Number(month) - 1, day));
      }
      // can be parsed into number or is numeric field type, format as number
      else if (((!isNaN(parseFloat(value))) || featureService.NUMERIC_FIELD_TYPES.includes(metricDisplay === null || metricDisplay === void 0 ? void 0 : metricDisplay.fieldType)) && intl.formatNumber(value) !== "NaN") {
        value = intl.formatNumber(value, { style: "decimal", maximumFractionDigits: 2 });
      }
    }
    // if false or undefined, reset to "--"
    value = value ? value : "--";
    result = Object.assign({ value }, metricDisplay);
  }
  return result;
}
/**
 * Specific stat-card display updates that should be done for the card configuration
 * @param metricDisplay
 * @returns
 */
function updateStatMetricDisplay(metricDisplay) {
  metricDisplay.border = metricDisplay.border || false;
  return metricDisplay;
}
/**
 * Finds the specific resolved metric feature needed by this card by using the metricId.
 * @param resolvedMetric metrics resolved by the call to resolveMetrics: IMetricFeature[]
 * @returns resolvedMetric used for rendering
 *
 */
function getSingleMetricFeature(resolvedMetric, metricId) {
  const metricFeature = resolvedMetric === null || resolvedMetric === void 0 ? void 0 : resolvedMetric.find(metric => { var _a; return (_a = metric === null || metric === void 0 ? void 0 : metric.attributes) === null || _a === void 0 ? void 0 : _a.hasOwnProperty(metricId); });
  return metricFeature;
}
/**
 * @param {Array} fields the available fields for a given dataset
 * @param {Object} values the selected values
 *
 * @returns {string} returns a string for the where clause query
 *
 * NOTE: currently returns string as a MATCH and everything else as BETWEEN
 */
function buildWhereClause(expressionSet = []) {
  return expressionSet.map(expression => {
    const { field, values, relationship } = expression;
    const escape = value => value === null || value === void 0 ? void 0 : value.replace(/(['])/g, '$1$1'); // currently only handles single quotes
    // if we don't have values or field, or if it is an "incomplete" expression, do not include
    if (!values || !values.length || !field || !(field === null || field === void 0 ? void 0 : field.name)) {
      return false;
    }
    let clause;
    switch (field.type) {
      case "esriFieldTypeString":
        // used for migrating over the old "like" clauses
        clause = relationship === resources.ExpressionRelationships.LIKE ?
          `${field.name} like '%${values[0]}%'` :
          `(${field.name} IN (${values.map(value => `'${escape(value)}'`).join(', ')}))`;
        break;
      case "esriFieldTypeDate":
        // if we have just one value for either value box
        if (!isNil.isNil(values[0])) {
          clause = `${field.name} >= timestamp '${escape(values[0])} 00:00:00'`;
        }
        else if (!isNil.isNil(values[1])) {
          clause = `${field.name} <= timestamp '${escape(values[1])} 23:59:59'`;
        }
        // if we have both, rewrite clause
        if (!isNil.isNil(values[0]) && !isNil.isNil(values[1])) {
          clause = `${field.name} >= timestamp '${escape(values[0])} 00:00:00' AND ${field.name} <= timestamp '${escape(values[1])} 23:59:59'`;
        }
        break;
      default:
        // if we have just one value for each value box
        if (!isNil.isNil(values[0])) {
          clause = `(${field.name}) >= ${values[0]}`;
        }
        else if (!isNil.isNil(values[1])) {
          clause = `(${field.name}) <= ${values[1]}`;
        }
        // if we have both, rewrite clause
        if (!isNil.isNil(values[0]) && !isNil.isNil(values[1])) {
          clause = `(${field.name}) >= ${values[0]} AND (${field.name}) <= ${values[1]}`;
        }
        break;
    }
    return clause;
  })
    .filter(Boolean)
    .join(' AND ') || '1=1';
}
/**
 * Transforms the arcgis-stat-card-editor values into an object with IMetric and IMetricDisplayConfig to be passed to the arcgis-hub-metric-card component.
 * @param values arcgis-configuration-editor values for the arcgis-hub-metric-card to use
 * @param metricName what should be the name of the transformed metric
 * @param metricId what should be the id of the transformed metric
 * @param entityInfo what should be the entityInfo of the transformed metric
 * @returns a metric and metricDisplay used for rendering arcgis-hub-metric-card
 */
function transformEditorValuesToMetricAndCardConfig(values, metricId, opts) {
  const { value, dynamicMetric } = values, config = __rest(values, ["value", "dynamicMetric"]);
  const { layerId, field, statistic, serviceUrl, fieldType, sourceTitle, allowExpressionSet, expressionSet, legacyWhere } = dynamicMetric || {};
  let { sourceLink } = dynamicMetric || {};
  const { entityInfo, metricName, portalBaseUrl } = opts;
  // if we are in enterprise, we need to append the sourceLink relative link to the enterprise url
  // so that the relative routing includes the entire enterprise url
  if (portalBaseUrl && sourceLink) {
    sourceLink = `${portalBaseUrl}${sourceLink}`;
  }
  // create source
  const source = (values === null || values === void 0 ? void 0 : values.type) === 'dynamic'
    ? {
      type: 'service-query',
      serviceUrl,
      layerId: layerId,
      field: field,
      statistic: statistic,
      where: legacyWhere ? legacyWhere : buildWhereClause(allowExpressionSet ? expressionSet : []),
    }
    : {
      type: 'static-value',
      value: value,
    };
  // create metric
  const metric = {
    source,
    name: metricName || metricId,
    entityInfo: entityInfo || { id: undefined, name: undefined, type: undefined },
    id: metricId,
  };
  delete config.itemId;
  // create card config
  const cardConfig = Object.assign(Object.assign({}, config), { displayType: config.displayType || 'stat-card', metricId,
    fieldType,
    statistic, 
    // if we are in dynamic mode and have a link, then we use that link
    // otherwise we use manually input sourceLink on card config
    sourceLink: (values === null || values === void 0 ? void 0 : values.type) === 'dynamic' && sourceLink ? sourceLink : config === null || config === void 0 ? void 0 : config.sourceLink, sourceTitle: (values === null || values === void 0 ? void 0 : values.type) === 'dynamic' && sourceTitle ? sourceTitle : config === null || config === void 0 ? void 0 : config.sourceTitle, allowLink: (values === null || values === void 0 ? void 0 : values.type) === 'dynamic' ? config.allowDynamicLink : config.allowLink });
  return { metric, cardConfig };
}

exports.metricToStatCardConfig = metricToStatCardConfig;
exports.transformEditorValuesToMetricAndCardConfig = transformEditorValuesToMetricAndCardConfig;
