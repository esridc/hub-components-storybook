import { H as HubItemEntitySchema } from './HubItemEntitySchema-5c1f4677.js';
import './types-2eaa1a18.js';
import './subschemas-4d56570e.js';

const SurveyEditorTypes = [
    "hub:survey:edit",
    "hub:survey:settings",
];
/**
 * defines the JSON schema for a Survey entity's editable fields
 */
const SurveySchema = Object.assign(Object.assign({}, HubItemEntitySchema), { properties: Object.assign({ displayMap: {
            type: "boolean",
            enum: [true, false],
            default: false,
        }, hasMapQuestion: {
            type: "boolean",
            enum: [true, false],
            default: false,
        } }, HubItemEntitySchema.properties) });

export { SurveyEditorTypes, SurveySchema };
