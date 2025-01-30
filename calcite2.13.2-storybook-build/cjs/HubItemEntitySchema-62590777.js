'use strict';

const types = require('./types-097b54b1.js');
const subschemas = require('./subschemas-61a41e85.js');

/**
 * Defines a default schema for an IHubItemEntity's editiable fields.
 * All item entity schemas should leverage this base schema.
 * Reference the Project or Initiative schemas as an example
 */
const HubItemEntitySchema = {
    $async: true,
    type: "object",
    required: ["name"],
    properties: {
        name: subschemas.ENTITY_NAME_SCHEMA,
        summary: subschemas.ENTITY_SUMMARY_SCHEMA,
        description: { type: "string" },
        access: subschemas.ENTITY_ACCESS_SCHEMA,
        location: subschemas.ENTITY_LOCATION_SCHEMA,
        tags: subschemas.ENTITY_TAGS_SCHEMA,
        categories: subschemas.ENTITY_CATEGORIES_SCHEMA,
        isDiscussable: subschemas.ENTITY_IS_DISCUSSABLE_SCHEMA,
        _thumbnail: subschemas.ENTITY_IMAGE_SCHEMA,
        _followers: {
            type: "object",
            properties: {
                groupAccess: Object.assign(Object.assign({}, subschemas.ENTITY_ACCESS_SCHEMA), { enum: ["private", "org", "public"] }),
                showFollowAction: {
                    type: "boolean",
                    default: true,
                },
                isDiscussable: subschemas.ENTITY_IS_DISCUSSABLE_SCHEMA,
            },
        },
        _associations: {
            type: "object",
            properties: {
                groupAccess: Object.assign(Object.assign({}, subschemas.ENTITY_ACCESS_SCHEMA), { enum: ["private", "org", "public"], default: "private" }),
                membershipAccess: {
                    type: "string",
                    enum: ["organization", "collaborators", "anyone"],
                    default: "organization",
                },
            },
        },
        view: {
            type: "object",
            properties: {
                embeds: { type: "array" },
                featuredContentIds: subschemas.ENTITY_FEATURED_CONTENT_SCHEMA,
                featuredImage: subschemas.ENTITY_IMAGE_SCHEMA,
                featuredImageAltText: { type: "string" },
                featuredImageName: { type: "string" },
                mapSettings: subschemas.ENTITY_MAP_SCHEMA,
                timeline: subschemas.ENTITY_TIMELINE_SCHEMA,
                hero: {
                    type: "string",
                    default: types.HubEntityHero.map,
                    enum: Object.keys(types.HubEntityHero),
                },
                heroActions: { type: "array" },
            },
        },
        _slug: subschemas.SLUG_SCHEMA,
    },
};

exports.HubItemEntitySchema = HubItemEntitySchema;
