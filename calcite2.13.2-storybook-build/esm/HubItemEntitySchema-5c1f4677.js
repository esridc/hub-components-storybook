import { a as HubEntityHero } from './types-2eaa1a18.js';
import { a as ENTITY_NAME_SCHEMA, b as ENTITY_SUMMARY_SCHEMA, d as ENTITY_ACCESS_SCHEMA, e as ENTITY_LOCATION_SCHEMA, f as ENTITY_TAGS_SCHEMA, g as ENTITY_CATEGORIES_SCHEMA, E as ENTITY_IS_DISCUSSABLE_SCHEMA, c as ENTITY_IMAGE_SCHEMA, h as ENTITY_FEATURED_CONTENT_SCHEMA, i as ENTITY_MAP_SCHEMA, j as ENTITY_TIMELINE_SCHEMA, k as SLUG_SCHEMA } from './subschemas-4d56570e.js';

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
        name: ENTITY_NAME_SCHEMA,
        summary: ENTITY_SUMMARY_SCHEMA,
        description: { type: "string" },
        access: ENTITY_ACCESS_SCHEMA,
        location: ENTITY_LOCATION_SCHEMA,
        tags: ENTITY_TAGS_SCHEMA,
        categories: ENTITY_CATEGORIES_SCHEMA,
        isDiscussable: ENTITY_IS_DISCUSSABLE_SCHEMA,
        _thumbnail: ENTITY_IMAGE_SCHEMA,
        _followers: {
            type: "object",
            properties: {
                groupAccess: Object.assign(Object.assign({}, ENTITY_ACCESS_SCHEMA), { enum: ["private", "org", "public"] }),
                showFollowAction: {
                    type: "boolean",
                    default: true,
                },
                isDiscussable: ENTITY_IS_DISCUSSABLE_SCHEMA,
            },
        },
        _associations: {
            type: "object",
            properties: {
                groupAccess: Object.assign(Object.assign({}, ENTITY_ACCESS_SCHEMA), { enum: ["private", "org", "public"], default: "private" }),
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
                featuredContentIds: ENTITY_FEATURED_CONTENT_SCHEMA,
                featuredImage: ENTITY_IMAGE_SCHEMA,
                featuredImageAltText: { type: "string" },
                featuredImageName: { type: "string" },
                mapSettings: ENTITY_MAP_SCHEMA,
                timeline: ENTITY_TIMELINE_SCHEMA,
                hero: {
                    type: "string",
                    default: HubEntityHero.map,
                    enum: Object.keys(HubEntityHero),
                },
                heroActions: { type: "array" },
            },
        },
        _slug: SLUG_SCHEMA,
    },
};

export { HubItemEntitySchema as H };
