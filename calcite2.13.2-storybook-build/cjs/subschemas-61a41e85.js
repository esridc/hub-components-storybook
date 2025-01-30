'use strict';

/**
 * For consistency and validation purposes, leverage these commonly
 * re-used subschemas in your schema definitions
 */
const ENTITY_NAME_SCHEMA = {
    type: "string",
    minLength: 1,
    maxLength: 250,
    format: "entityTitleValidator",
};
const SITE_ENTITY_NAME_SCHEMA = {
    type: "string",
    minLength: 1,
    maxLength: 250,
    format: "siteEntityTitleValidator",
};
const ENTITY_SUMMARY_SCHEMA = {
    type: "string",
    maxLength: 2048,
};
const ENTITY_ACCESS_SCHEMA = {
    type: "string",
    enum: ["public", "org", "private"],
    default: "private",
};
const ENTITY_TAGS_SCHEMA = {
    type: "array",
    items: {
        type: "string",
    },
};
const ENTITY_CATEGORIES_SCHEMA = {
    type: "array",
    items: {
        type: "string",
    },
};
const ENTITY_IS_DISCUSSABLE_SCHEMA = {
    type: "boolean",
    enum: [true, false],
    default: true,
};
const ENTITY_FEATURED_CONTENT_SCHEMA = {
    type: "array",
    maxItems: 4,
    items: {
        type: "string",
    },
};
const ENTITY_LOCATION_SCHEMA = {
    type: "object",
    default: { type: "none" },
    properties: {
        type: {
            type: "string",
            enum: ["none", "org", "custom"],
            default: "none",
        },
        name: {
            type: "string",
        },
    },
};
/**
 * defines the JSON schema for the map configuration settings
 */
const ENTITY_MAP_SCHEMA = {
    type: "object",
    properties: {
        baseViewItemId: {
            type: "array",
            items: {
                type: "string",
            },
            maxItems: 1,
        },
    },
};
const ENTITY_IMAGE_SCHEMA = {
    type: "object",
    properties: {
        base64: { type: "string" },
        format: { type: "string" },
        fileName: { type: "string" },
        blob: {
            type: "object",
            properties: {
                type: { type: "string" },
                size: { type: "number" },
            },
        },
    },
};
const ENTITY_TIMELINE_SCHEMA = {
    type: "object",
    properties: {
        title: { type: "string" },
        description: { type: "string" },
        canCollapse: { type: "boolean" },
        stages: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    // we should make title required or add minLength: 1
                    // once we know how to handle in the UI
                    title: { type: "string" },
                    timeframe: { type: "string" },
                    stageDescription: { type: "string" },
                    status: { type: "string" },
                    link: {
                        type: "object",
                        properties: {
                            // we should add format: url here once we know how
                            // to handle this in the UI
                            href: { type: "string" },
                            title: { type: "string" },
                        },
                    },
                },
            },
        },
    },
};
const PRIVACY_CONFIG_SCHEMA = {
    type: "object",
    properties: {
        consentNotice: {
            type: "object",
            properties: {
                allowPrivacyConfig: {
                    type: "boolean",
                    default: false,
                },
                blocking: {
                    type: "boolean",
                    default: false,
                },
                disclaimer: {
                    type: "array",
                    items: [
                        {
                            type: "object",
                            properties: {
                                text: {
                                    type: "string",
                                },
                                lang: {
                                    type: "string",
                                },
                                default: {
                                    type: "boolean",
                                },
                            },
                        },
                    ],
                },
                policyURL: {
                    type: "string",
                    pattern: "^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w.-]*)*\\/?$|^$",
                },
            },
        },
    },
};
const SLUG_SCHEMA = {
    type: "string",
    /** lower case alpha numeric characters and '-' only */
    pattern: "^[a-z0-9]+(?:-[a-z0-9]+-*)*$",
};

exports.ENTITY_ACCESS_SCHEMA = ENTITY_ACCESS_SCHEMA;
exports.ENTITY_CATEGORIES_SCHEMA = ENTITY_CATEGORIES_SCHEMA;
exports.ENTITY_FEATURED_CONTENT_SCHEMA = ENTITY_FEATURED_CONTENT_SCHEMA;
exports.ENTITY_IMAGE_SCHEMA = ENTITY_IMAGE_SCHEMA;
exports.ENTITY_IS_DISCUSSABLE_SCHEMA = ENTITY_IS_DISCUSSABLE_SCHEMA;
exports.ENTITY_LOCATION_SCHEMA = ENTITY_LOCATION_SCHEMA;
exports.ENTITY_MAP_SCHEMA = ENTITY_MAP_SCHEMA;
exports.ENTITY_NAME_SCHEMA = ENTITY_NAME_SCHEMA;
exports.ENTITY_SUMMARY_SCHEMA = ENTITY_SUMMARY_SCHEMA;
exports.ENTITY_TAGS_SCHEMA = ENTITY_TAGS_SCHEMA;
exports.ENTITY_TIMELINE_SCHEMA = ENTITY_TIMELINE_SCHEMA;
exports.PRIVACY_CONFIG_SCHEMA = PRIVACY_CONFIG_SCHEMA;
exports.SITE_ENTITY_NAME_SCHEMA = SITE_ENTITY_NAME_SCHEMA;
exports.SLUG_SCHEMA = SLUG_SCHEMA;
