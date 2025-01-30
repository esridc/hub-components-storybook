import { IMetric } from '@esri/hub-common';
export interface IDataSources {
  metrics: IMetric[];
  [key: string]: any;
}
export interface IErrorMessage {
  /** input a custom message for the error */
  message?: string;
  /** input a custom title for the error */
  title?: string;
  /** Use a premade error that already exists */
  premadeType?: METRIC_ERRORS;
}
export declare enum METRIC_ERRORS {
  generic = "generic",
  timeout = "timeout"
}
