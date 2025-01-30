import { H as HubItemEntitySchema } from './HubItemEntitySchema-5c1f4677.js';
import './types-2eaa1a18.js';
import './subschemas-4d56570e.js';

const TemplateEditorTypes = ["hub:template:edit"];
const TemplateSchema = Object.assign(Object.assign({}, HubItemEntitySchema), { properties: Object.assign(Object.assign({}, HubItemEntitySchema.properties), { previewUrl: {
            type: "string",
            if: { minLength: 1 },
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            then: { format: "url" },
        } }) });

export { TemplateEditorTypes, TemplateSchema };
