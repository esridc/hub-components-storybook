'use strict';

const HubItemEntitySchema = require('./HubItemEntitySchema-62590777.js');
const subschemas = require('./subschemas-61a41e85.js');
require('./types-097b54b1.js');

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
const getSiteSchema = (siteId) => (Object.assign(Object.assign({ $async: true }, HubItemEntitySchema.HubItemEntitySchema), { properties: Object.assign(Object.assign({}, HubItemEntitySchema.HubItemEntitySchema.properties), { name: subschemas.SITE_ENTITY_NAME_SCHEMA, _discussions: subschemas.ENTITY_IS_DISCUSSABLE_SCHEMA, telemetry: subschemas.PRIVACY_CONFIG_SCHEMA, _urlInfo: {
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

exports.SiteEditorTypes = SiteEditorTypes;
exports.getSiteSchema = getSiteSchema;
