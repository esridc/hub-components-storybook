import { H as HubError } from './HubError-e26c5610.js';
import { c as canUseExportImageFlow } from './getDownloadFlow-6c6d04d5.js';
import { c as canUseHubDownloadApi, g as getDownloadFormats } from './getDownloadFormats-3dc2a95d.js';

/**
 * Fetches a download file URL for the given entity and format.
 * @param options options to refine / filter the results of the fetchDownloadFile operation
 * @returns a promise that resolves with a download file url or blob
 * @throws {ArcgisHubDownloadError} if the download file URL cannot be fetched for a well-known reason
 */
async function fetchDownloadFile(options) {
    // Make sure that format requested has been enabled for the entity
    validateFormat(options);
    // If the pollInterval is not set, default to 3 seconds
    const withPollInterval = options.pollInterval == null ? Object.assign(Object.assign({}, options), { pollInterval: 3000 }) : options;
    let fetchingFn;
    if (canUseHubDownloadApi(withPollInterval.entity, withPollInterval.context)) {
        fetchingFn = (await import('./fetchHubApiDownloadFile-0dfcd81d.js')).fetchHubApiDownloadFile;
    }
    else if (canUseExportImageFlow(withPollInterval.entity)) {
        fetchingFn = (await import('./fetchExportImageDownloadFile-5103dbb7.js')).fetchExportImageDownloadFile;
    }
    else {
        throw new HubError("fetchDownloadFile", "Downloads are not supported for this item in this environment");
    }
    return fetchingFn(withPollInterval);
}
/**
 * Validates the format requested is enabled for the entity
 * @param options options for the fetchDownloadFile operation
 * @throws {HubError} if the format requested is not enabled for the entity
 */
function validateFormat(options) {
    const { entity, context, format } = options;
    const validServerFormats = getDownloadFormats({
        entity,
        context,
    })
        .filter((f) => f.type === "dynamic")
        .map((f) => f.format);
    if (!validServerFormats.includes(format)) {
        throw new HubError("fetchDownloadFile", `The following format is not enabled for the entity: ${format}`);
    }
}

export { fetchDownloadFile as f };
