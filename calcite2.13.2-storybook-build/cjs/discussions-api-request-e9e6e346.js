'use strict';

const request = require('./request-79b61e92.js');
const utils = require('./utils-7f390376.js');

class RemoteServerError extends request.RemoteServerError {
    constructor(message, url, status, error) {
        super(message, url, status);
        this.error = error;
    }
}
/**
 * returns Promise that resolves token to use in Discussions API requests
 *
 * @export
 * @param {IDiscussionsRequestOptions} options
 * @return {*}  {Promise<string>}
 */
function authenticateRequest(options) {
    const { token, authentication } = options;
    let tokenPromise = () => {
        return Promise.resolve(token);
    };
    if (authentication) {
        tokenPromise = authentication.getToken.bind(authentication, authentication.portal);
    }
    return tokenPromise();
}
/**
 * parses IDiscussionsRequestOptions and makes request against Discussions API
 *
 * @export
 * @template T
 * @param {string} route
 * @param {IDiscussionsRequestOptions} options
 * @param {string} [token]
 * @return {*}  {Promise<T>}
 */
function apiRequest(route, options, token) {
    var _a;
    let routeWithParams = route;
    const headers = new Headers(options.headers);
    headers.append("Content-Type", "application/json");
    if (token) {
        headers.append("Authorization", `Bearer ${token}`);
    }
    const opts = {
        headers,
        method: options.httpMethod || "GET",
        mode: options.mode,
        cache: options.cache,
        credentials: options.credentials,
    };
    const apiBase = request.buildUrl({
        // TODO: we _want_ to use getHubApiUrl(),
        // but have to deal w/ the fact that this package overwrites IHubRequestOptions
        host: options.hubApiUrl || "https://hub.arcgis.com",
        path: "/api/discussions/v1",
    });
    if (options.data) {
        if (options.httpMethod === "GET") {
            const queryParams = new URLSearchParams(options.data).toString();
            routeWithParams += `?${queryParams}`;
        }
        else {
            opts.body = JSON.stringify(options.data);
        }
    }
    // this currently only applies to the search post route. we should rework things in the future such that we don't need
    // to do this sort of evaluation in common logic.
    const isCSV = ["/posts", "/posts/search"].includes(route) &&
        (((_a = options.data) === null || _a === void 0 ? void 0 : _a.f) === utils.SearchPostsFormat.CSV ||
            headers.get("Accept") === "text/csv");
    const url = [
        apiBase.replace(/\/$/, ""),
        routeWithParams.replace(/^\//, ""),
    ].join("/");
    return fetch(url, opts).then((res) => {
        if (res.ok) {
            return isCSV ? res.text() : res.json();
        }
        else {
            const { statusText, status } = res;
            return res.json().then((err) => {
                throw new RemoteServerError(statusText, url, status, JSON.stringify(err.message));
            });
        }
    });
}

/**
 * method that authenticates and makes requests to Discussions API
 *
 * @export
 * @template T
 * @param {string} url
 * @param {IDiscussionsRequestOptions} options
 * @return {*}  {Promise<T>}
 */
// NOTE: feasibly this could be replaced with @esi/hub-common hubApiRequest,
// if that method didn't prepend `/api/v3` to the supplied path. Additionally,
// there is the difference that hubApiRequest sets Authorization header without `Bearer`
// https://github.com/Esri/hub.js/blob/f35b1a0a868916bd07e1dfd84cb084bc2c876267/packages/common/src/request.ts#L62
function discussionsApiRequest(url, options) {
    return authenticateRequest(options).then((token) => {
        return apiRequest(url, options, token);
    });
}

exports.discussionsApiRequest = discussionsApiRequest;
