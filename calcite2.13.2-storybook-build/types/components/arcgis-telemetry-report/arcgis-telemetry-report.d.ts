import { IArcGISContext } from '@esri/hub-common';
import { ITelemetryDataTransformOptions, ITelemetryDataTransform, COMMON_TELEMETRY, ITelemetryContext } from './interfaces';
import { ITelemetryRequestParams, ITelemetryRequestOptions, IDimensionFilter, ITelemetryDataEntry, IOrderBy, IHostnameScope, IContentIdScope, COMMON_METRICS, TIME_DIMENSIONS } from '@esri/telemetry-reporting-client';
import { ComponentIntl } from '../../utils/stencil-intl';
export declare class ArcgisTelemetryReport {
  element: HTMLElement;
  /**
   * provides auth & portal information
   * @type {IArcGISContext}
   * @memberof ArcgisTelemetryReport
   */
  context: IArcGISContext;
  /**
   * provides telemetry config information
   * @type {ITelemetryContext}
   * @memberof ArcgisTelemetryReport
   */
  telemetryContext: ITelemetryContext;
  /**
   * report type (value, metric, tabular, line, bar, pie)
   * @type {string}
   * @memberof ArcgisTelemetryReport
   */
  type: string;
  /**
   * report title
   * @type {string}
   * @memberof ArcgisTelemetryReport
   */
  reportTitle: string;
  /**
   * report title tooltip
   * @type {string}
   * @memberof ArcgisTelemetryReport
   */
  titleTooltip: string;
  /**
   * report subtitle
   * @type {string}
   * @memberof ArcgisTelemetryReport
   */
  subtitle: string;
  /**
   * text to render in the footer of the report
   */
  trailingText: string;
  /**
   * hostname to scope telemetry data by
   * @type {string}
   * @memberof ArcgisTelemetryReport
   */
  hostname: string;
  /**
   * content id to scope telemetry data by
   * @type {string}
   * @memberof ArcgisTelemetryReport
   */
  contentId: string;
  /**
   * unique common telemetry identifier or custom telemetry event
   * @type {string}
   * @memberof ArcgisTelemetryReport
   */
  telemetryEvent: COMMON_TELEMETRY | Record<string, string>;
  /**
   * additional dimension filters to apply to the telemetry
   * request. Typically these will be used to further scope
   * a "common telemetry" (e.g. page views) request
   */
  dimensionFilters: IDimensionFilter[];
  /**
   * telemetry dimension(s) by which to aggregate data
   * @type {string}
   * @memberof ArcgisTelemetryReport
   */
  series: (string | ITelemetryDataTransform)[];
  /**
   * Used to define client side data transformations such as converting from seconds to minutes
   * @type {ITelemetryDataTransform[]}
   * @memberof ArcgisTelemetryReport
   */
  dataTransforms: ITelemetryDataTransform[];
  /**
   * category axis aggregation
   */
  category: TIME_DIMENSIONS;
  /**
   * start date to scope telemetry data by
   * @type {string}
   * @memberof ArcgisTelemetryReport
   */
  startDate: string;
  /**
   * end date to scope telemetry data by
   * @type {string}
   * @memberof ArcgisTelemetryReport
   */
  endDate: string;
  /**
   * array of metrics by which to sort the returned telemetry data
   * @type {IOrderBy[]}
   * @memberof ArcgisTelemetryReport
   */
  orderBy: IOrderBy[];
  /**
   * The maximum number data entries to return
   * @type {number}
   * @memberof ArcgisTelemetryReport
   */
  limit: number;
  /**
   * Label key to use for a custom data point
   */
  dataLabel?: string;
  data: ITelemetryDataEntry[];
  aggregateData: ITelemetryDataEntry[];
  error: string;
  isLoading: boolean;
  onRequestParamsChange(): void;
  intl: ComponentIntl;
  componentWillLoad(): Promise<void>;
  get dataTransformOptions(): ITelemetryDataTransformOptions;
  get isCustomEvent(): boolean;
  get seriesTransforms(): Record<string, ITelemetryDataTransform>;
  get _dimensionFilters(): IDimensionFilter[];
  get scope(): IHostnameScope | IContentIdScope;
  get requestParams(): ITelemetryRequestParams;
  get requestOptions(): ITelemetryRequestOptions;
  get _dataLabel(): string;
  getMetric(telemetryEvent: COMMON_TELEMETRY | Record<string, string>): COMMON_METRICS;
  getDimensions(telemetryEvent: COMMON_TELEMETRY | Record<string, string>): string[];
  get shouldAggregateData(): boolean;
  getReportData(): Promise<void>;
  get childComponentProps(): any;
  get isChart(): boolean;
  render(): any;
}
