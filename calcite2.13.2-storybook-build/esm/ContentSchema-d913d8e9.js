import { H as HubItemEntitySchema } from './HubItemEntitySchema-5c1f4677.js';
import './types-2eaa1a18.js';
import './subschemas-4d56570e.js';

const ContentEditorTypes = [
    "hub:content:edit",
    "hub:content:settings",
    "hub:content:discussions",
];
/**
 * defines the JSON schema for a Hub Content's editable fields
 */
const ContentSchema = Object.assign(Object.assign({}, HubItemEntitySchema), { properties: Object.assign(Object.assign({}, HubItemEntitySchema.properties), { licenseInfo: {
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

export { ContentEditorTypes, ContentSchema };
