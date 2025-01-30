'use strict';

const MetricSchema = require('./MetricSchema-b212808d.js');
const HubItemEntitySchema = require('./HubItemEntitySchema-62590777.js');
const types = require('./types-097b54b1.js');
const definitions = require('./definitions-94c1da69.js');
require('./enums-0160df9d.js');
require('./subschemas-61a41e85.js');

const InitiativeEditorTypes = [
    "hub:initiative:edit",
    "hub:initiative:create",
    "hub:initiative:create2",
    "hub:initiative:metrics",
    "hub:initiative:associations",
    "hub:initiative:settings",
];
/**
 * defines the JSON schema for a Hub Initiative's editable fields
 */
const InitiativeSchema = Object.assign(Object.assign({}, HubItemEntitySchema.HubItemEntitySchema), { properties: Object.assign(Object.assign({}, HubItemEntitySchema.HubItemEntitySchema.properties), { _groups: {
            type: "array",
            items: { type: "string" },
        }, status: {
            type: "string",
            default: types.HubEntityStatus.notStarted,
            enum: Object.keys(types.HubEntityStatus),
        }, _metric: {
            type: "object",
            required: ["cardTitle"],
            properties: MetricSchema.MetricSchema.properties,
        } }), allOf: [
        definitions.IF_SOURCE_TITLE_THEN_SOURCE_LINK,
        definitions.IF_STATIC_THEN_REQUIRE_VALUE,
        definitions.IF_STATIC_THEN_URL_FORMAT,
        definitions.VALUE_TYPE_MAPPING,
    ] });

exports.InitiativeEditorTypes = InitiativeEditorTypes;
exports.InitiativeSchema = InitiativeSchema;
