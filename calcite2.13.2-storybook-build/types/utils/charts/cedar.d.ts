import type { Color, WebChart, WebChartBarChartSeries, WebChartLineChartSeries } from '@arcgis/charts-spec';
import type { BarChartModel, LineChartModel } from '@arcgis/charts-model';
import type { ChartConfig } from '@arcgis/charts-shared-utils';
export declare type CedarChartModel = BarChartModel | LineChartModel;
export declare type CedarChartConfig = ChartConfig<WebChartBarChartSeries, WebChart> | ChartConfig<WebChartLineChartSeries, WebChart>;
export interface ICedarFormattingOptions {
  isSparkline?: boolean;
}
export declare const CEDAR_COLORS: {
  black: Color;
  blue: Color;
  gray: Color;
  red: Color;
  white: Color;
};
export declare const getCedarFormattedConfig: (model: CedarChartModel, options?: ICedarFormattingOptions) => CedarChartConfig;
