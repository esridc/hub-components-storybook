'use strict';

/**
 * Build an IQuery based on the IGallerySelection and EntityType provided
 * @param gallerySelection gallery selection as an IGallerySelection object
 * @returns null if no selection is available, else query as an IQuery
 */
function buildQueryFromGallerySelection(gallerySelection, entityType) {
  const selection = gallerySelection[entityType];
  return (selection === null || selection === void 0 ? void 0 : selection.length)
    ? {
      targetEntity: entityType,
      filters: [
        {
          operation: "OR",
          predicates: [
            {
              id: selection
            }
          ]
        }
      ]
    }
    : null;
}

exports.buildQueryFromGallerySelection = buildQueryFromGallerySelection;
