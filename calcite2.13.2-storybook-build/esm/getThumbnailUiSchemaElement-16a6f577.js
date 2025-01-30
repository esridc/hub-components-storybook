import { U as UiSchemaRuleEffects } from './types-1fca2e83.js';
import { g as getCdnAssetUrl } from './get-cdn-asset-url-b2059dc3.js';

const DEFAULT_ENTITY_THUMBNAILS = {
    discussion: "/ember-arcgis-opendata-components/assets/images/placeholders/discussion.png",
    group: "/ember-arcgis-opendata-components/assets/images/placeholders/group.png",
    content: "/ember-arcgis-opendata-components/assets/images/placeholders/content.png",
};
/**
 * Returns the UI schema element needed to render
 * the thumbnail editing control for an item-based entity.
 *
 * @param i18nScope i18n scope for the entity translations
 * @param entity The entity to build the UI schema for
 * @returns the UI schema element for thumbnail editing
 */
function getThumbnailUiSchemaElement(i18nScope, thumbnail, thumbnailUrl, entityType, requestOptions) {
    var _a;
    const defaultEntityThumbnail = (_a = DEFAULT_ENTITY_THUMBNAILS[entityType]) !== null && _a !== void 0 ? _a : DEFAULT_ENTITY_THUMBNAILS.content;
    const defaultImgUrl = getCdnAssetUrl(defaultEntityThumbnail, requestOptions);
    const options = entityType === "group"
        ? {
            aspectRatio: 1,
            sizeDescription: {
                labelKey: `${i18nScope}.fields._thumbnail.sizeDescription`,
            },
        }
        : {
            aspectRatio: 1.5,
            sizeDescription: {
                labelKey: "shared.fields._thumbnail.sizeDescription",
            },
        };
    return [
        {
            labelKey: entityType === "group"
                ? `${i18nScope}.fields._thumbnail.label`
                : "shared.fields._thumbnail.label",
            scope: "/properties/_thumbnail",
            type: "Control",
            options: Object.assign({ control: "hub-field-input-image-picker", imgSrc: thumbnailUrl, defaultImgUrl, maxWidth: 727, maxHeight: 484, helperText: {
                    // helper text varies between entity types
                    labelKey: `${i18nScope}.fields._thumbnail.helperText`,
                } }, options),
        },
        // Advise the user if the entity's thumbnail is either of the default values
        {
            type: "Notice",
            options: {
                notice: {
                    configuration: {
                        id: "no-thumbnail-or-png-notice",
                        noticeType: "notice",
                        closable: false,
                        icon: "lightbulb",
                        kind: "info",
                        scale: "m",
                    },
                    message: "{{shared.fields._thumbnail.defaultThumbnailNotice:translate}}",
                    autoShow: true,
                },
            },
            rules: [
                {
                    effect: UiSchemaRuleEffects.SHOW,
                    conditions: [
                        !thumbnail || thumbnail === "thumbnail/ago_downloaded.png",
                    ],
                },
            ],
        },
    ];
}

export { getThumbnailUiSchemaElement as g };
