import { IArcGISContext, IHubSite } from '@esri/hub-common';
import { IHubNotice, IHubNoticeBase } from './notices';
/**
 * The shared context to use when the component needs
 * authentication or info about the portal or current user
 * @returns global context
 */
export declare const getGlobalContext: () => IArcGISContext | undefined;
/**
 * Set the shared context to use when the component needs
 * authentication or info about the portal or current user
 * @param context
 */
export declare const setGlobalContext: (context?: IArcGISContext) => void;
/**
 * The IHubSite representing the current site that a component is on
 * @returns the current site
 */
export declare const getCurrentSite: () => IHubSite | undefined;
/**
* Set the IHubSite representing the current site that a component is on
* @param site
*/
export declare const setCurrentSite: (site?: IHubSite) => void;
export declare const getNotices: () => IHubNotice[];
export declare function showNotice(notificationId: string): IHubNotice;
export declare function showNotice(notice: IHubNoticeBase): IHubNotice;
export declare const removeNotice: (noticeId: string) => void;
/**
 * Function to set query params in the consuming application. This function
 * will update the store and dispatch a custom event to notify the consuming
 * application of the change.
 *
 * A component should only ever call this function with query params that
 * belong to its own component prefix.
 *
 * @param urlState - the urlState to set. This should be a deeply nested object
 * with top-level keys as the component prefix (e.g. project-view) and the
 * object inside as the key-value pairs for that component.
 */
export declare function setUrlState(urlState: IUrlState): void;
/**
 * This function will return the url state for a given component key.
 * @param componentKey - the component key to get the url state for (ex. "project-view", "initiative-view")
 * @returns
 */
export declare function getUrlState(componentKey: UrlStateParams): Record<string, any>;
/**
 * Initialize the url state in the store from the current search params of the consuming application's url.
 * This function will parse the search params and set the store's urlState property.
 * This function should be called when the consuming application is initialized.
 *
 * NOTE: This function will only parse keys that have a substring in validUrlStateParams.
 * @param urlSearchParams - the current URLSearchParams(window.location.search)
 */
export declare function initializeUrlState(urlSearchParams: URLSearchParams): void;
/**
 * A list of valid top-level keys for the url state.
 * Only keys in this list will be parsed from the url.
 *
 * If you have a component that needs to use the url state, add the key here.
 *
 * TODO: We'd like to remove this array of valid url state params to reduce coupling -- that way, a
 * developer doesn't have to come in and update this array.
 *
 * Instead, we can rely on having the requested format -- i.e., using the URL_STATE_SEPARATOR.
 */
export declare const validUrlStateParams: string[];
export declare type UrlStateParams = (typeof validUrlStateParams)[number];
/**
 * The separator used to separate the component prefix from the query param key in the url.
 * This should be a unique separator so that we can determine at run-time what components are in the url and differentiate
 * these from other unrelated query params.
 */
export declare const URL_STATE_SEPARATOR = ":";
/**
 * A deeply nested state object representing the url state.
 * Top-level keys are component prefixes (e.g. project-view), and the object
 * inside are the key-value pairs for that component.
 */
export declare type IUrlState = {
  [key in UrlStateParams]: Record<string, any>;
};
/**
 * Implement this interface if your component needs to watch the global context for changes
 */
export interface IWithContext {
  /**
   * The shared context to use when the component needs
   * authentication or info about the portal or current user
   *
   * This should use the @State decorator
   *
   * NOTE: We use the `_` prefix to indicate that this for internal use by the component
   * since we cannot mark the member as private and still fulfill the interface.
   */
  _context: IArcGISContext;
  /**
   * A function that will stop listening for changes to global context
   * This _must_ be called in disconnectedCallback() to avoid memory leads
   *
   * NOTE: This will be implemented by connectContext
   */
  disconnectContext: () => void;
}
/**
 * Update context in component state when the store updates
 * and provide a clean up function to call when the component is removed
 *
 * Call this from connectedCallback()
 *
 * @param component that implements IWithContext
 */
export declare const connectContext: (component: IWithContext) => void;
