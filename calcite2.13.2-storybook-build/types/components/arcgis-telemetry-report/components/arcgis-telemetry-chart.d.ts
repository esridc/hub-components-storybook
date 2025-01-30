import { ITelemetryDataEntry, TIME_DIMENSIONS } from '@esri/telemetry-reporting-client';
import type { ValidationStatus } from '@arcgis/charts-components';
import { ITelemetryDataTransformOptions } from '../interfaces';
import { TelemetryChartConfig } from '../utils/chart';
export declare class ArcgisTelemetryChart {
  /**
   * raw telemetry data
   * @type {ITelemetryDataEntry}
   * @memberof ArcgisTelemetryMetric
   */
  data: Array<ITelemetryDataEntry>;
  /**
   * category axis aggregation
   */
  category: TIME_DIMENSIONS;
  /**
  * report title
  * @type {string}
  * @memberof ArcgisTelemetryMetric
  */
  reportTitle: string;
  /**
   * report transform options
   * @type {ITelemetryDataTransformOptions}
   * @memberof ArcgisTelemetryMetric
   */
  options: ITelemetryDataTransformOptions;
  /**
   * an indication as to whether or not telemetry data
   * is still being fetched
   * @type {boolean}
   * @memberof ArcgisTelemetryMetric
   */
  isLoading: boolean;
  /**
   * the time label to use on the chart
   * @type {string}
   * @memberof ArcgisTelemetryMetric
   */
  timeLabel: string;
  /**
   * the data label to use when a sparkline is rendered
   * @type {string}
   * @memberof ArcgisTelemetryMetric
   */
  dataLabel: string;
  /**
   * the type of chart to render
   * @type {string}
   * @memberof ArcgisTelemetryMetric
   */
  type: string;
  /**
   * the config to pass to the chart component
   */
  chartConfig: TelemetryChartConfig;
  handleChange(): Promise<void>;
  handleUpdateComplete(e: CustomEvent<ValidationStatus>): void;
  componentWillLoad(): Promise<void>;
  transform(data: ITelemetryDataEntry[], options?: ITelemetryDataTransformOptions): Promise<any>;
  get chartTagName(): string;
  render(): any;
}
