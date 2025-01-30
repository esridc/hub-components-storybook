const SERVICE_URL_REGEX = /\/[a-zA-Z]+server(\/|\/(\d+))?$/i;
/**
 * Tests if url string is a service (map, feature, image, etc)
 *
 * @param {string} url Url to test
 * @return {*}  {boolean}
 */
function isService(url) {
    return SERVICE_URL_REGEX.test(url);
}

export { isService as i };
