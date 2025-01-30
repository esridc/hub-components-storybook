/**
 * Retrieve Hub notices from local storage
 * @param win
 * @returns
 */
export declare function getHubNoticesFromLocalStorage(/* istanbul ignore next */ win?: any): {
  dismissed: string[];
};
/**
 * Store Hub notices in local storage
 * @param hubNotices
 * @param win
 */
export declare function setHubNoticesInLocalStorage(hubNotices: {
  dismissed: string[];
}, /* istanbul ignore next */ win?: any): void;
