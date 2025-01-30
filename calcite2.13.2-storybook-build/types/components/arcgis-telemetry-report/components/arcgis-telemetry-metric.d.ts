import { ITelemetryDataEntry, TIME_DIMENSIONS } from '@esri/telemetry-reporting-client';
import { ITelemetryDataTransformOptions } from '../interfaces';
import { ComponentIntl } from '../../../utils/stencil-intl';
interface IMetricTransformedData {
  value: string;
}
export declare class ArcgisTelemetryMetric {
  element: HTMLElement;
  /**
   * raw telemetry data
   * @type {ITelemetryDataEntry}
   * @memberof ArcgisTelemetryMetric
   */
  data: Array<ITelemetryDataEntry> | number;
  binnedData: Array<ITelemetryDataEntry>;
  /**
   * category axis aggregation
   */
  category: TIME_DIMENSIONS;
  /**
   * error that could have occured in processing the metric
   */
  error: string;
  /**
  * report title
  * @type {string}
  * @memberof ArcgisTelemetryMetric
  */
  reportTitle: string;
  /**
   * report subtitle
   * @type {string}
   * @memberof ArcgisTelemetryMetric
   */
  subtitle: string;
  /**
   * text to render in the footer of the report
   */
  trailingText: string;
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
   * the time label to use when a sparkline is rendered
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
  intl: ComponentIntl;
  value: string;
  isTransforming: boolean;
  handleChange(): void;
  componentWillLoad(): Promise<void>;
  _transform(data: ITelemetryDataEntry, options: ITelemetryDataTransformOptions): string | number;
  transform(data: ITelemetryDataEntry[] | number, options?: ITelemetryDataTransformOptions): Promise<IMetricTransformedData>;
  renderFooter(): HTMLElement;
  render(): any;
}
export {};
