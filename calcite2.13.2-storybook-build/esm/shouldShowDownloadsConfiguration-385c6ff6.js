import { c as canUseExportImageFlow } from './getDownloadFlow-6c6d04d5.js';
import { g as getProp } from './get-prop-ec5be510.js';

/**
 * @private
 * Determines if the downloads configuration should be shown for an entity.
 *
 * NOTE: product has asked that the download configuration be shown for entities that _can_
 * be downloaded, as well as certain entities that _cannot_ be downloaded currently, but
 * could be downloaded with a change in item / service settings.
 *
 * @param entity entity to check
 * @returns whether downloads configuration should be shown
 */
function shouldShowDownloadsConfiguration(entity) {
    // NOTE: At this time, product has asked that we hide the downloads configuration
    // for multi-layer service entities.
    const isReferenceLayerEntity = ["Feature Service", "Map Service"].includes(entity.type) &&
        /\/\d+$/.test(entity.url);
    const isSingleLayerEntity = getProp(entity, "extendedProps.server.layers.length") === 1;
    const isDownloadableImageService = canUseExportImageFlow(entity);
    return (isReferenceLayerEntity || isSingleLayerEntity || isDownloadableImageService);
}

export { shouldShowDownloadsConfiguration as s };
