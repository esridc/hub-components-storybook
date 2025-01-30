import { M as MetricSchema } from './MetricSchema-da66a5ad.js';
import { H as HubItemEntitySchema } from './HubItemEntitySchema-5c1f4677.js';
import { H as HubEntityStatus } from './types-2eaa1a18.js';
import { I as IF_SOURCE_TITLE_THEN_SOURCE_LINK, a as IF_STATIC_THEN_REQUIRE_VALUE, b as IF_STATIC_THEN_URL_FORMAT, V as VALUE_TYPE_MAPPING } from './definitions-193d63f9.js';
import './enums-783e40b4.js';
import './subschemas-4d56570e.js';

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
const InitiativeSchema = Object.assign(Object.assign({}, HubItemEntitySchema), { properties: Object.assign(Object.assign({}, HubItemEntitySchema.properties), { _groups: {
            type: "array",
            items: { type: "string" },
        }, status: {
            type: "string",
            default: HubEntityStatus.notStarted,
            enum: Object.keys(HubEntityStatus),
        }, _metric: {
            type: "object",
            required: ["cardTitle"],
            properties: MetricSchema.properties,
        } }), allOf: [
        IF_SOURCE_TITLE_THEN_SOURCE_LINK,
        IF_STATIC_THEN_REQUIRE_VALUE,
        IF_STATIC_THEN_URL_FORMAT,
        VALUE_TYPE_MAPPING,
    ] });

export { InitiativeEditorTypes, InitiativeSchema };
