'use strict';

const HubError = require('./HubError-44e07249.js');
const getDownloadFlow = require('./getDownloadFlow-94a34207.js');
const getDownloadFormats = require('./getDownloadFormats-a9f297e8.js');

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
    if (getDownloadFormats.canUseHubDownloadApi(withPollInterval.entity, withPollInterval.context)) {
        fetchingFn = (await Promise.resolve().then(function () { return require('./fetchHubApiDownloadFile-b92fdbc5.js'); })).fetchHubApiDownloadFile;
    }
    else if (getDownloadFlow.canUseExportImageFlow(withPollInterval.entity)) {
        fetchingFn = (await Promise.resolve().then(function () { return require('./fetchExportImageDownloadFile-33978b8f.js'); })).fetchExportImageDownloadFile;
    }
    else {
        throw new HubError.HubError("fetchDownloadFile", "Downloads are not supported for this item in this environment");
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
    const validServerFormats = getDownloadFormats.getDownloadFormats({
        entity,
        context,
    })
        .filter((f) => f.type === "dynamic")
        .map((f) => f.format);
    if (!validServerFormats.includes(format)) {
        throw new HubError.HubError("fetchDownloadFile", `The following format is not enabled for the entity: ${format}`);
    }
}

exports.fetchDownloadFile = fetchDownloadFile;
