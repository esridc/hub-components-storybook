import { IPortal } from "@esri/arcgis-rest-portal";
import { IArcGISContext, IHubSite } from "@esri/hub-common";
import { ITelemetryInfo, ITelemetryDimensions } from './_internal';
import { DomainInfo } from "../domain";
export { ITelemetryInfo, ITelemetryDimensions } from './_internal';
export interface IAmazonConfig {
  disabled?: boolean;
  fips?: boolean;
  dimensions?: any;
  metrics?: any;
  userPoolID?: string;
  app?: {
    name: string;
    id: string;
    version: string;
  };
}
export interface IInitTelemetryOptions {
  amazon?: IAmazonConfig;
  debug?: boolean;
  disabled?: boolean;
  orgInfo?: IPortal;
}
export interface IAddCommonDimensionsOptions {
  composedPath?: EventTarget[];
  context?: IArcGISContext;
  domain?: DomainInfo;
  isSuccess?: boolean;
  routeDimensions?: ITelemetryDimensions;
  site?: IHubSite;
}
/**
 * Compares two telemetry info objects to see if they match
 * @param a ITelemetryInfo - telemetry info A
 * @param b ITelemetryInfo  - telemetry info B
 * @returns boolean - true if they match, false if they don't
 */
export declare const matchesTelemetry: (a: ITelemetryInfo, b: ITelemetryInfo) => boolean;
export declare const isEueiDisabled: (orgInfo?: IPortal) => boolean;
/**
 * Check if hub analytics is enabled for a site
 * @param site IHubSite
 * @returns boolean
*/
export declare const isHubAnalyticsEnabled: (site: IHubSite) => boolean;
export declare const initTelemetry: (site: IHubSite, options: IInitTelemetryOptions) => Promise<any>;
/**
 * function to append common dimensions onto a telemetry
 * event object
 * @param {Object} event telemetry event configuration
 * @param {EventTarget[]} options.composedPath composed path of the logged event
 * @param {Boolean} options.isSuccess indicates whether or not the logged event was a success or failure
 */
export declare const addCommonDimensions: (event: ITelemetryDimensions, options?: IAddCommonDimensionsOptions) => ITelemetryDimensions;
