import { H as HubItemEntitySchema } from './HubItemEntitySchema-5c1f4677.js';
import { S as SITE_ENTITY_NAME_SCHEMA, E as ENTITY_IS_DISCUSSABLE_SCHEMA, P as PRIVACY_CONFIG_SCHEMA } from './subschemas-4d56570e.js';
import './types-2eaa1a18.js';

const SiteEditorTypes = [
    "hub:site:edit",
    "hub:site:create",
    "hub:site:followers",
    "hub:site:discussions",
    "hub:site:settings",
];
/**
 * defines the JSON schema for a Hub Site's editable fields
 */
const getSiteSchema = (siteId) => (Object.assign(Object.assign({ $async: true }, HubItemEntitySchema), { properties: Object.assign(Object.assign({}, HubItemEntitySchema.properties), { name: SITE_ENTITY_NAME_SCHEMA, _discussions: ENTITY_IS_DISCUSSABLE_SCHEMA, telemetry: PRIVACY_CONFIG_SCHEMA, _urlInfo: {
            type: "object",
            isUniqueDomain: { siteId },
            required: ["subdomain"],
            properties: {
                subdomain: {
                    type: "string",
                    format: "slug",
                },
            },
        } }) }));

export { SiteEditorTypes, getSiteSchema };
