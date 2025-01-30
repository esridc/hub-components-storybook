'use strict';

const MetricSchema = require('./MetricSchema-b212808d.js');
const definitions = require('./definitions-94c1da69.js');
const HubItemEntitySchema = require('./HubItemEntitySchema-62590777.js');
const types = require('./types-097b54b1.js');
require('./enums-0160df9d.js');
require('./subschemas-61a41e85.js');

const ProjectEditorTypes = [
    "hub:project:create",
    "hub:project:create2",
    "hub:project:edit",
    "hub:project:metrics",
    "hub:project:settings",
];
/**
 * Defines the JSON schema for a Hub Project's editable fields
 */
const ProjectSchema = Object.assign(Object.assign({}, HubItemEntitySchema.HubItemEntitySchema), { properties: Object.assign(Object.assign({}, HubItemEntitySchema.HubItemEntitySchema.properties), { _groups: {
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

exports.ProjectEditorTypes = ProjectEditorTypes;
exports.ProjectSchema = ProjectSchema;
