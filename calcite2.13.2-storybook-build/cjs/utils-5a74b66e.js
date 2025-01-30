'use strict';

/**
 * @private
 * Determines if the given download format configuration is for
 * an additional resource.
 *
 * @param config IDownloadFormatConfiguration
 * @returns boolean
 */
function isAdditionalResourceConfiguration(config) {
    return config.key.startsWith("additionalResource::");
}
/**
 * @private
 * Get's the index of the additional resource from the given
 * download format configuration.
 *
 * @param config IDownloadFormatConfiguration
 * @returns number - The index of the additional resource
 */
function getAdditionalResourceIndex(config) {
    return parseInt(config.key.split("::")[1], 10);
}

exports.getAdditionalResourceIndex = getAdditionalResourceIndex;
exports.isAdditionalResourceConfiguration = isAdditionalResourceConfiguration;
