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

export { ENTITY_IS_DISCUSSABLE_SCHEMA as E, PRIVACY_CONFIG_SCHEMA as P, SITE_ENTITY_NAME_SCHEMA as S, ENTITY_NAME_SCHEMA as a, ENTITY_SUMMARY_SCHEMA as b, ENTITY_IMAGE_SCHEMA as c, ENTITY_ACCESS_SCHEMA as d, ENTITY_LOCATION_SCHEMA as e, ENTITY_TAGS_SCHEMA as f, ENTITY_CATEGORIES_SCHEMA as g, ENTITY_FEATURED_CONTENT_SCHEMA as h, ENTITY_MAP_SCHEMA as i, ENTITY_TIMELINE_SCHEMA as j, SLUG_SCHEMA as k };
