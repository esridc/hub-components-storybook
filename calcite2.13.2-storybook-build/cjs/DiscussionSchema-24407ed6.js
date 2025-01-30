'use strict';

const HubItemEntitySchema = require('./HubItemEntitySchema-62590777.js');
require('./types-097b54b1.js');
require('./subschemas-61a41e85.js');

const DiscussionEditorTypes = [
    "hub:discussion:edit",
    "hub:discussion:create",
    "hub:discussion:settings",
];
/**
 * defines the JSON schema for a Discussion's editable fields
 */
const DiscussionSchema = Object.assign(Object.assign({}, HubItemEntitySchema.HubItemEntitySchema), { required: ["name"], properties: Object.assign(Object.assign({}, HubItemEntitySchema.HubItemEntitySchema.properties), { prompt: {
            type: "string",
            default: "",
            maxLength: 150,
        } }) });

exports.DiscussionEditorTypes = DiscussionEditorTypes;
exports.DiscussionSchema = DiscussionSchema;
