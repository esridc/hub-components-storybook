import { atob, btoa } from '@esri/hub-common';
const LOCAL_STORAGE_KEY = 'ESRI_HUB_NOTICES';
/**
 * Retrieve Hub notices from local storage
 * @param win
 * @returns
 */
export function getHubNoticesFromLocalStorage(/* istanbul ignore next */ win = window) {
  const encoded = win.localStorage.getItem(LOCAL_STORAGE_KEY);
  const decoded = encoded && atob(encoded);
  return decoded ? JSON.parse(decoded) : { dismissed: [] };
}
/**
 * Store Hub notices in local storage
 * @param hubNotices
 * @param win
 */
export function setHubNoticesInLocalStorage(hubNotices, /* istanbul ignore next */ win = window) {
  const serialized = JSON.stringify(hubNotices);
  const encoded = serialized && btoa(serialized);
  win.localStorage.setItem(LOCAL_STORAGE_KEY, encoded);
}
