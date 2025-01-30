declare type TelemetrySeriesCallback = (val: string | number) => any | Promise<any>;
import { ITelemetryRequestParams } from '@esri/telemetry-reporting-client';
export declare enum COMMON_TELEMETRY {
  sessions = "sessions",
  referrers = "referrers",
  ['page-views'] = "page-views",
  ['session-activity'] = "session-activity"
}
interface ITelemetrySeriesLink {
  href: TelemetrySeriesCallback;
  target?: string;
}
interface ITelemetrySeriesValue {
  display?: TelemetrySeriesCallback;
  link?: ITelemetrySeriesLink;
}
export interface ITelemetryDataTransform {
  name: string;
  title?: string;
  value?: ITelemetrySeriesValue;
}
export interface ITelemetryDataTransformOptions {
  seriesTransforms?: Record<string, ITelemetryDataTransform>;
  dataTransforms?: ITelemetryDataTransform[];
  requestParams?: ITelemetryRequestParams;
}
export interface ITelemetryContext {
  customDimensionsConfig?: Record<string, number>;
  customMetricsConfig?: Record<string, number>;
}
export {};
