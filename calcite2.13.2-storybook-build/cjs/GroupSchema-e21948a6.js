'use strict';

const subschemas = require('./subschemas-61a41e85.js');

const GroupEditorTypes = [
    "hub:group:edit",
    "hub:group:settings",
    "hub:group:discussions",
    // editor to create a followers group
    "hub:group:create:followers",
    // editor to create an association group
    "hub:group:create:association",
    "hub:group:create:view",
    "hub:group:create:edit",
    "hub:group:create",
];
/**
 * Defines the JSON schema for a Hub Group's editable fields
 */
const GroupSchema = {
    required: ["name"],
    type: "object",
    properties: {
        name: subschemas.ENTITY_NAME_SCHEMA,
        summary: Object.assign(Object.assign({}, subschemas.ENTITY_SUMMARY_SCHEMA), { 
            // group snippets (mapped to summary on the entity) have
            // a max char limit of 250
            maxLength: 250 }),
        description: { type: "string" },
        _thumbnail: subschemas.ENTITY_IMAGE_SCHEMA,
        access: {
            type: "string",
            enum: ["private", "org", "public"],
            default: "private",
        },
        isSharedUpdate: { type: "boolean", enum: [false, true], default: false },
        leavingDisallowed: { type: "boolean", enum: [false, true], default: false },
        isOpenData: { type: "boolean", enum: [false, true], default: false },
        membershipAccess: {
            type: "string",
            enum: ["organization", "collaborators", "anyone"],
            default: "organization",
        },
        isViewOnly: {
            type: "boolean",
            enum: [false, true],
            default: false,
        },
        _join: {
            type: "string",
            enum: ["invite", "request", "auto"],
            default: "invite",
        },
        hiddenMembers: {
            type: "boolean",
            enum: [false, true],
            default: false,
        },
        isDiscussable: subschemas.ENTITY_IS_DISCUSSABLE_SCHEMA,
    },
};

exports.GroupEditorTypes = GroupEditorTypes;
exports.GroupSchema = GroupSchema;
