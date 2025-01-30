import { IConfigurationValues, IEntityInfo, IMetric, IMetricFeature, IResolvedMetric, IMetricDisplayConfig } from "@esri/hub-common";
import { ComponentIntl } from './stencil-intl';
import { IExpression } from "../components/arcgis-configuration-editor/components/arcgis-configuration-editor-field/fields/composite/expression-set/resources";
export interface IMetricCardProps {
  metric: IMetric;
  cardConfig: IMetricDisplayConfig;
}
/**
 * Gets the metricId from the IMetricDisplayConfig. Returns the string metricId;
 */
export declare function getMetricId(metricDisplay: IMetricDisplayConfig): string;
/**
 * Finds the correct resolved metric and returns the value and cardConfig to render from that metric in the stat card
 * @returns value of the resolved metric
 */
export declare function metricToStatCardConfig(resolvedMetric: IResolvedMetric, metricDisplay: IMetricDisplayConfig, intl: ComponentIntl): any;
/**
 * Finds the specific resolved metric feature needed by this card by using the metricId.
 * @param resolvedMetric metrics resolved by the call to resolveMetrics: IMetricFeature[]
 * @returns resolvedMetric used for rendering
 *
 */
export declare function getSingleMetricFeature(resolvedMetric: IMetricFeature[], metricId: string): IMetricFeature;
/**
 * @param {Array} fields the available fields for a given dataset
 * @param {Object} values the selected values
 *
 * @returns {string} returns a string for the where clause query
 *
 * NOTE: currently returns string as a MATCH and everything else as BETWEEN
 */
export declare function buildWhereClause(expressionSet?: IExpression[]): string;
/**
 * Transforms the arcgis-stat-card-editor values into an object with IMetric and IMetricDisplayConfig to be passed to the arcgis-hub-metric-card component.
 * @param values arcgis-configuration-editor values for the arcgis-hub-metric-card to use
 * @param metricName what should be the name of the transformed metric
 * @param metricId what should be the id of the transformed metric
 * @param entityInfo what should be the entityInfo of the transformed metric
 * @returns a metric and metricDisplay used for rendering arcgis-hub-metric-card
 */
export declare function transformEditorValuesToMetricAndCardConfig(values: IConfigurationValues, metricId: string, opts?: {
  metricName?: string;
  entityInfo?: IEntityInfo;
  portalBaseUrl?: string;
}): IMetricCardProps;
