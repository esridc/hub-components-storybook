import { HubEntity, IHubSite } from "@esri/hub-common";
/**
 * Interface for telemetry info
 */
export interface ITelemetryInfo {
  action?: string;
  category?: string;
  label?: string;
}
export interface ITelemetryDimensions extends ITelemetryInfo {
  userType?: string;
  organizationId?: string;
  siteId?: string;
  element?: string;
  response?: string;
  [key: string]: string | undefined;
}
/**
 * function to find all parent elements in an event's composed path with a
 * 'data-element' attribute. This returns a joined string of all of these values
 * @param {EventTarget[]} composedPath composed path of the logged event
 */
export declare const getElementPath: (composedPath: EventTarget[]) => string;
/**
 * function to transform select dimensions before they are
 * appended to the telemetry event object.
 * @param {Object} dimensions telemetry custom dimensions
 */
export declare const transformDimensions: (dimensions?: ITelemetryDimensions, site?: IHubSite) => {
  [x: string]: string;
  userType?: string;
  organizationId?: string;
  siteId?: string;
  element?: string;
  response?: string;
  action?: string;
  category?: string;
  label?: string;
};
/**
 * function to transform a boolean status to a readable string.
 * We need to explicitly check for strict boolean equality because
 * we don't want an undefined status (i.e. not provided), for example,
 * to result in "Failure" getting logged
 * @param {Boolean | undefined} isSuccess
 * @returns {String}
 */
export declare const getResponse: (isSuccess: boolean) => any;
export declare const getEntityTelemetryDimensions: (entity: HubEntity) => Record<string, string>;
