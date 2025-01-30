import { b as bBoxToExtent, o as orgExtent, c as extentToBBox } from './extent-34a4ba2a.js';
import { g as getTypeFromEntity } from './getTypeFromEntity-e149b61e.js';

/**
 * Get the extent from the entity's location, if it has one.
 * Otherwise, fall back to using the org extent.
 */
async function getLocationExtent(location, hubRequestOptions) {
    var _a;
    return ((_a = location === null || location === void 0 ? void 0 : location.extent) === null || _a === void 0 ? void 0 : _a.length) ? bBoxToExtent(location.extent)
        : await orgExtent(hubRequestOptions);
}

/**
 * Construct the dynamic location picker options with the entity's
 * configured location using the following logic:
 *
 * 1. If there is no entity (e.g. we're creating an entity),
 * select the "custom" option by default
 * 2. Else if there is no location set on the entity, select the
 * "none" option
 * 3. Else if the entity has a location and it's the same as the
 * current option, select it and update the option with the entity's
 * location
 */
async function getLocationOptions(id, type, location, portalName, hubRequestOptions) {
    const defaultExtent = await orgExtent(hubRequestOptions);
    // Base options
    const optionsArray = [
        {
            label: "{{shared.fields.location.none:translate}}",
            location: { type: "none" },
        },
        {
            label: "{{shared.fields.location.org:translate}}",
            description: portalName,
            location: {
                type: "org",
                extent: extentToBBox(defaultExtent),
                spatialReference: defaultExtent.spatialReference,
            },
        },
        {
            label: "{{shared.fields.location.custom:translate}}",
            description: "{{shared.fields.location.customDescription:translate}}",
            entityType: getTypeFromEntity({ type }),
            location: {
                type: "custom",
                spatialReference: defaultExtent.spatialReference,
            },
        },
    ];
    // In the future, if we want to include other options
    // on a per entity basis, they can be added right here
    // with an optional parameter and splicing the extra option
    // into the options array. This function was changed into
    // this format when we were considering adding an
    // "Item's extent" option for content entities.
    return optionsArray.map((option) => {
        // If this is a new entity, select the custom option by default
        if (!id && option.location.type === "custom") {
            option.selected = true;
        }
        else if (id && !location && option.location.type === "none") {
            option.selected = true;
        }
        else if ((location === null || location === void 0 ? void 0 : location.type) === option.location.type) {
            option.location = location;
            option.selected = true;
        }
        return option;
    });
}

export { getLocationOptions as a, getLocationExtent as g };
