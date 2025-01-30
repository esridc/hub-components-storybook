'use strict';

const enums = require('./enums-0160df9d.js');

const targetEntities = [
    "item",
    "group",
    "user",
    "portalUser",
    "communityUser",
    "groupMember",
    "event",
    "channel",
    "discussionPost",
    "eventAttendee",
];

/** JSON schema for an IPredicate */
const PredicateSchema = {
    type: "object",
};
/** JSON schema for an IFilter */
const FilterSchema = {
    type: "object",
    properties: {
        operation: {
            type: "string",
            enum: ["AND", "OR"],
        },
        predicates: {
            type: "array",
            minItems: 1,
            items: PredicateSchema,
        },
    },
};
/** JSON schema for an IQuery */
const QuerySchema = {
    type: "object",
    required: ["targetEntity"],
    properties: {
        targetEntity: {
            type: "string",
            enum: [...targetEntities],
        },
        filters: {
            type: "array",
            items: FilterSchema,
        },
    },
};
/** JSON schema for an IHubCollection */
const CollectionSchema = {
    type: "object",
    required: ["label"],
    properties: {
        label: {
            type: "string",
        },
        scope: QuerySchema,
    },
};
/**
 * JSON schema for the appearance of a gallery display
 * This can be for a catalog, a collection, a gallery card, etc
 */
const GalleryDisplayConfigSchema = {
    type: "object",
    properties: {
        hidden: { type: "boolean", default: false },
        layout: {
            type: "string",
            enum: ["list", "grid", "table", "map", "compact"],
            default: "list",
        },
        cardTitleTag: {
            type: "string",
            enum: Object.keys(enums.CARD_TITLE_TAGS),
            default: enums.CARD_TITLE_TAGS.h3,
        },
        showThumbnail: {
            type: "string",
            enum: ["show", "hide", "grid"],
            default: "show",
        },
        corners: {
            type: "string",
            enum: Object.keys(enums.CORNERS),
            default: enums.CORNERS.square,
        },
        shadow: {
            type: "string",
            enum: Object.keys(enums.DROP_SHADOWS),
            default: enums.DROP_SHADOWS.none,
        },
        showLinkButton: { type: "boolean", default: false },
        linkButtonStyle: {
            type: "string",
            enum: ["outline", "outline-filled"],
            default: "outline-filled",
        },
        linkButtonText: { type: "string", default: "Explore" },
    },
};
/** JSON schema for an IHubCatalog */
const CatalogSchema = {
    type: "object",
    properties: {
        title: {
            type: "string",
        },
        scopes: {
            type: "object",
            properties: targetEntities.reduce((acc, targetEntity) => {
                acc[targetEntity] = QuerySchema;
                return acc;
            }, {}),
        },
        collections: {
            type: "array",
            items: CollectionSchema,
        },
        displayConfig: GalleryDisplayConfigSchema,
    },
};
/**
 * JSON schema for the appearance of an IHubCollection
 */
const CollectionAppearanceSchema = {
    type: "object",
    properties: {
        displayConfig: GalleryDisplayConfigSchema,
    },
};

exports.CatalogSchema = CatalogSchema;
exports.CollectionAppearanceSchema = CollectionAppearanceSchema;
exports.CollectionSchema = CollectionSchema;
exports.FilterSchema = FilterSchema;
exports.GalleryDisplayConfigSchema = GalleryDisplayConfigSchema;
exports.PredicateSchema = PredicateSchema;
exports.QuerySchema = QuerySchema;
exports.targetEntities = targetEntities;
