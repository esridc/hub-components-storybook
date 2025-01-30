'use strict';

const HubItemEntitySchema = require('./HubItemEntitySchema-62590777.js');
require('./types-097b54b1.js');
require('./subschemas-61a41e85.js');

const SurveyEditorTypes = [
    "hub:survey:edit",
    "hub:survey:settings",
];
/**
 * defines the JSON schema for a Survey entity's editable fields
 */
const SurveySchema = Object.assign(Object.assign({}, HubItemEntitySchema.HubItemEntitySchema), { properties: Object.assign({ displayMap: {
            type: "boolean",
            enum: [true, false],
            default: false,
        }, hasMapQuestion: {
            type: "boolean",
            enum: [true, false],
            default: false,
        } }, HubItemEntitySchema.HubItemEntitySchema.properties) });

exports.SurveyEditorTypes = SurveyEditorTypes;
exports.SurveySchema = SurveySchema;
