import { H as HubItemEntitySchema } from './HubItemEntitySchema-5c1f4677.js';
import './types-2eaa1a18.js';
import './subschemas-4d56570e.js';

const PageEditorTypes = ["hub:page:edit", "hub:page:create"];
/**
 * defines the JSON schema for a Hub Site's editable fields
 */
const PageSchema = Object.assign(Object.assign({}, HubItemEntitySchema), { properties: Object.assign({}, HubItemEntitySchema.properties) });

export { PageEditorTypes, PageSchema };
