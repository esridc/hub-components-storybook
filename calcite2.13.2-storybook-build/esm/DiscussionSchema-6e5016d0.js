import { H as HubItemEntitySchema } from './HubItemEntitySchema-5c1f4677.js';
import './types-2eaa1a18.js';
import './subschemas-4d56570e.js';

const DiscussionEditorTypes = [
    "hub:discussion:edit",
    "hub:discussion:create",
    "hub:discussion:settings",
];
/**
 * defines the JSON schema for a Discussion's editable fields
 */
const DiscussionSchema = Object.assign(Object.assign({}, HubItemEntitySchema), { required: ["name"], properties: Object.assign(Object.assign({}, HubItemEntitySchema.properties), { prompt: {
            type: "string",
            default: "",
            maxLength: 150,
        } }) });

export { DiscussionEditorTypes, DiscussionSchema };
