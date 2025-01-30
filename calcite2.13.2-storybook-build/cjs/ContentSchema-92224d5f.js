'use strict';

const HubItemEntitySchema = require('./HubItemEntitySchema-62590777.js');
require('./types-097b54b1.js');
require('./subschemas-61a41e85.js');

const ContentEditorTypes = [
    "hub:content:edit",
    "hub:content:settings",
    "hub:content:discussions",
];
/**
 * defines the JSON schema for a Hub Content's editable fields
 */
const ContentSchema = Object.assign(Object.assign({}, HubItemEntitySchema.HubItemEntitySchema), { properties: Object.assign(Object.assign({}, HubItemEntitySchema.HubItemEntitySchema.properties), { licenseInfo: {
            type: "string",
        }, serverExtractCapability: {
            type: "boolean",
            enum: [true, false],
        }, schedule: {
            type: "object",
        }, _forceUpdate: {
            type: "array",
            items: {
                type: "boolean",
                enum: [true],
            },
        }, downloadFormats: {
            type: "array",
            items: {
                type: "object",
            },
        } }) });

exports.ContentEditorTypes = ContentEditorTypes;
exports.ContentSchema = ContentSchema;
