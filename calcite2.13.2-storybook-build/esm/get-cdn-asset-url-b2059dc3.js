import { g as getPortalUrl } from './get-portal-url-cc8a77b9.js';

/**
 * Returns an env-specific CDN asset URL for the given `assetPath` and `requestOptions`.
 * @param assetPath The CDN asset's path
 * @param requestOptions An IRequestOptions object
 */
function getCdnAssetUrl(assetPath, requestOptions) {
    const portalUrl = getPortalUrl(requestOptions);
    let baseUrl;
    if (/(devext|mapsdevext)\.arcgis\.com/.test(portalUrl)) {
        baseUrl = "https://hubdevcdn.arcgis.com/opendata-ui/assets";
    }
    else if (/(qaext|mapsqa)\.arcgis\.com/.test(portalUrl)) {
        baseUrl = "https://hubqacdn.arcgis.com/opendata-ui/assets";
    }
    else if (/(www|maps)\.arcgis\.com/.test(portalUrl)) {
        baseUrl = "https://hubcdn.arcgis.com/opendata-ui/assets";
    }
    else {
        baseUrl = `${portalUrl}/apps/sites`;
    }
    const delimiter = assetPath.startsWith("/") ? "" : "/";
    return [baseUrl, assetPath].join(delimiter);
}

export { getCdnAssetUrl as g };
