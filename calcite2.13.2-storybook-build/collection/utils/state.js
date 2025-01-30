import { createId } from '@esri/hub-common';
import store from '../store';
import { getPreconfiguredNotice } from './notices';
/**
 * The shared context to use when the component needs
 * authentication or info about the portal or current user
 * @returns global context
 */
export const getGlobalContext = () => store.state.context;
/**
 * Set the shared context to use when the component needs
 * authentication or info about the portal or current user
 * @param context
 */
export const setGlobalContext = (context) => {
  store.state.context = context;
};
/**
 * The IHubSite representing the current site that a component is on
 * @returns the current site
 */
export const getCurrentSite = () => store.state.site;
/**
* Set the IHubSite representing the current site that a component is on
* @param site
*/
export const setCurrentSite = (site) => {
  store.state.site = site;
};
export const getNotices = () => store.state.notices;
export function showNotice(noticeOrId) {
  let notice;
  if (typeof noticeOrId === 'string') {
    notice = getPreconfiguredNotice(noticeOrId, getGlobalContext());
    if (!notice) {
      throw new Error(`Notice with id ${noticeOrId} not found`);
    }
  }
  else {
    notice = noticeOrId;
    if (!notice.id) {
      notice.id = createId('notice');
    }
  }
  store.state.notices = [...store.state.notices, notice];
  return notice;
}
export const removeNotice = (noticeId) => {
  store.state.notices = store.state.notices.filter(a => a.id !== noticeId);
};
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
export function setUrlState(urlState) {
  const newState = Object.assign({}, store.state.urlState);
  // update the state with the new values
  Object.keys(urlState).forEach(key => {
    newState[key] = Object.assign(Object.assign({}, newState[key]), urlState[key]);
  });
  // update the store
  store.state.urlState = newState;
  const flattenedUrlState = {};
  // flatten the url state
  Object.keys(newState).forEach(key => {
    Object.keys(newState[key]).forEach(paramKey => {
      flattenedUrlState[`${key}${URL_STATE_SEPARATOR}${paramKey}`] = store.state.urlState[key][paramKey];
    });
  });
  // Dispatch the custom event
  const event = new CustomEvent('arcgisHubUrlStateChange', { detail: flattenedUrlState });
  document.dispatchEvent(event);
}
/**
 * This function will return the url state for a given component key.
 * @param componentKey - the component key to get the url state for (ex. "project-view", "initiative-view")
 * @returns
 */
export function getUrlState(componentKey) {
  return store.state.urlState[componentKey] || {};
}
/**
 * Initialize the url state in the store from the current search params of the consuming application's url.
 * This function will parse the search params and set the store's urlState property.
 * This function should be called when the consuming application is initialized.
 *
 * NOTE: This function will only parse keys that have a substring in validUrlStateParams.
 * @param urlSearchParams - the current URLSearchParams(window.location.search)
 */
export function initializeUrlState(urlSearchParams) {
  // get the current state of the url into an object
  const currentState = Array.from(urlSearchParams.keys()).reduce((acc, val) => (Object.assign(Object.assign({}, acc), { [val]: urlSearchParams.get(val) })), {});
  // parse keys that have a substring in validUrlStateParams
  const urlState = {};
  // for each key in the current state
  Object.keys(currentState).forEach(key => {
    // for each component prefix
    validUrlStateParams.forEach(prefix => {
      // if the key includes the prefix
      // TODO: we'd like to remove this prefix check to reduce coupling. We can instead rely on the URL_STATE_SEPARATOR.
      if (key.includes(prefix)) {
        const paramKey = key.split(`${prefix}${URL_STATE_SEPARATOR}`)[1];
        // set the prefix as the top-level key with an object as value
        if (!urlState[prefix]) {
          urlState[prefix] = {};
        }
        // then inside, set query param and value
        urlState[prefix][paramKey] = currentState[key];
      }
    });
  });
  store.state.urlState = urlState;
}
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
export const validUrlStateParams = [
  "project-view",
  "initiative-view",
  "entity-projects"
];
/**
 * The separator used to separate the component prefix from the query param key in the url.
 * This should be a unique separator so that we can determine at run-time what components are in the url and differentiate
 * these from other unrelated query params.
 */
export const URL_STATE_SEPARATOR = ':';
/**
 * Update context in component state when the store updates
 * and provide a clean up function to call when the component is removed
 *
 * Call this from connectedCallback()
 *
 * @param component that implements IWithContext
 */
export const connectContext = (component) => {
  component.disconnectContext = store.onChange('context', function (context) {
    component._context = context;
  });
};
