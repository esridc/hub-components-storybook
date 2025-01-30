import { ITelemetryDataEntry } from '@esri/telemetry-reporting-client';
import { ITelemetryDataTransformOptions } from '../interfaces';
import { ComponentIntl } from '../../../utils/stencil-intl';
interface IMetricTransformedData {
  value: string;
}
export declare class ArcgisTelemetryValue {
  element: HTMLArcgisTelemetryValueElement;
  /**
   * raw telemetry data
   * @type {ITelemetryDataEntry}
   * @memberof ArcgisTelemetryValue
   */
  data: Array<ITelemetryDataEntry> | number;
  /**
   * report transform options
   * @type {ITelemetryDataTransformOptions}
   * @memberof ArcgisTelemetryValue
   */
  options: ITelemetryDataTransformOptions;
  /**
   * an indication as to whether or not telemetry data
   * is still being fetched
   * @type {boolean}
   * @memberof ArcgisTelemetryValue
   */
  isLoading: boolean;
  intl: ComponentIntl;
  value: string;
  isTransforming: boolean;
  handleChange(): void;
  componentWillLoad(): Promise<void>;
  _transform(data: ITelemetryDataEntry, options: ITelemetryDataTransformOptions): string | number;
  transform(data: ITelemetryDataEntry[] | number, options?: ITelemetryDataTransformOptions): Promise<IMetricTransformedData>;
  render(): any;
}
export {};
