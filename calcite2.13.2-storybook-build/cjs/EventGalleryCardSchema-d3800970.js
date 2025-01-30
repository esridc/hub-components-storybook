'use strict';

const subschemas = require('./subschemas-61a41e85.js');

const EventGalleryCardSchema = {
    type: "object",
    properties: {
        selectionMode: {
            type: "string",
            enum: ["dynamic", "manual"],
            default: "dynamic",
        },
        entityIds: {
            type: "array",
            items: {
                type: "string",
            },
            default: [],
        },
        eventIds: {
            type: "array",
            items: {
                type: "string",
            },
            default: [],
        },
        corners: {
            type: "string",
            enum: ["square", "round"],
            default: "square",
        },
        shadow: {
            type: "string",
            enum: ["none", "low", "medium", "heavy"],
            default: "none",
        },
        showAdditionalInfo: {
            type: "boolean",
            default: true,
        },
        access: {
            type: "array",
            items: {
                type: "string",
                enum: ["private", "org", "public"],
            },
            default: [],
        },
        tags: subschemas.ENTITY_TAGS_SCHEMA,
        categories: subschemas.ENTITY_CATEGORIES_SCHEMA,
        titleHeading: {
            type: "string",
            enum: ["h1", "h2", "h3", "h4", "h5", "h6"],
            default: "h4",
        },
        openIn: {
            type: "string",
            enum: ["same", "new"],
            default: "same",
        },
        layout: {
            type: "string",
            enum: ["list", "map", "calendar"],
            default: "list",
        },
    },
};

exports.EventGalleryCardSchema = EventGalleryCardSchema;
