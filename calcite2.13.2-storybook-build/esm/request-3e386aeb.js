import { g as getHubApiUrl } from './compose-d5b83ab7.js';

/**
 * @private
 */
function buildUrl(params) {
    const { host, path, query } = params;
    const baseUrl = host.endsWith("/") ? host : `${host}/`;
    const url = new URL(path, baseUrl);
    url.search = buildQueryString(query);
    return url.toString();
}
function buildQueryString(params = {}) {
    const queryParams = Object.keys(params)
        .filter((key) => {
        return params[key] !== undefined;
    })
        .reduce((acc, key) => {
        acc[key] = params[key];
        return acc;
    }, {});
    return new URLSearchParams(queryParams).toString();
}

/**
 * remote server error
 */
class RemoteServerError extends Error {
    constructor(message, url, status) {
        super(message);
        this.status = status;
        this.url = url;
    }
}
/**
 * ```js
 * import { hubApiRequest } from "@esri/hub-common";
 * //
 * hubApiRequest(
 *   "/datasets",
 *   requestOptions
 * })
 *   .then(response);
 * ```
 * make a request to the Hub API
 * @param route API route
 * @param requestOptions request options
 */
function hubApiRequest(route, requestOptions) {
    // merge in default request options
    const options = Object.assign({ 
        // why do we default to GET w/ our API?
        httpMethod: "GET" }, requestOptions);
    // use fetch override if any
    const _fetch = options.fetch || fetch;
    // merge in default headers
    const headers = Object.assign({ "Content-Type": "application/json" }, options.headers);
    // build query params/body based on requestOptions.params
    let query;
    let body;
    if (options.httpMethod === "GET") {
        // pass params in query string
        query = options.params;
    }
    else {
        // pass params in request body
        body = JSON.stringify(options.params);
    }
    // build Hub API URL
    const url = buildUrl({
        host: getHubApiUrl(options),
        path: `/api/v3/${route}`.replace(/\/\//g, "/"),
        query,
    });
    return _fetch(url, {
        method: options.httpMethod,
        headers,
        body,
    }).then((resp) => {
        if (resp.ok) {
            return resp.json();
        }
        else {
            throw new RemoteServerError(resp.statusText, url, resp.status);
        }
    });
}

export { RemoteServerError as R, buildUrl as b, hubApiRequest as h };
