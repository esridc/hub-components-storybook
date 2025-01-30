import { c as cacheBustUrl } from './cacheBustUrl-082c34f5.js';

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
    return url && cacheBustUrl(`${url}${queryParams}`);
}

export { getAuthedImageUrl as g };
