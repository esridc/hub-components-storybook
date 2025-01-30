'use strict';

const cacheBustUrl = require('./cacheBustUrl-e8fc7455.js');

/**
 * Get the image url with token if authenticated,
 * return the original url otherwise
 * @param url image url
 * @param requestOptions
 */
function getAuthedImageUrl(url, requestOptions) {
    let token;
    if (requestOptions.authentication) {
        const session = requestOptions.authentication;
        token = session.token;
    }
    const queryParams = requestOptions.authentication ? `?token=${token}` : "";
    return url && cacheBustUrl.cacheBustUrl(`${url}${queryParams}`);
}

exports.getAuthedImageUrl = getAuthedImageUrl;
