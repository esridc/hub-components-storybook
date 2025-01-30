import { c as cleanUrl } from './clean-url-dff2b6ee.js';

/* Copyright (c) 2017-2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
var serviceRegex = new RegExp(/.+(?:map|feature|image)server/i);
/**
 * Return the service url. If not matched, returns what was passed in
 */
function parseServiceUrl(url) {
    var match = url.match(serviceRegex);
    if (match) {
        return match[0];
    }
    else {
        return stripQueryString(url);
    }
}
function stripQueryString(url) {
    var stripped = url.split('?')[0];
    return cleanUrl(stripped);
}

export { parseServiceUrl as p };
