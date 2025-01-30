'use strict';

const HubItemEntitySchema = require('./HubItemEntitySchema-62590777.js');
require('./types-097b54b1.js');
require('./subschemas-61a41e85.js');

const PageEditorTypes = ["hub:page:edit", "hub:page:create"];
/**
 * defines the JSON schema for a Hub Site's editable fields
 */
const PageSchema = Object.assign(Object.assign({}, HubItemEntitySchema.HubItemEntitySchema), { properties: Object.assign({}, HubItemEntitySchema.HubItemEntitySchema.properties) });

exports.PageEditorTypes = PageEditorTypes;
exports.PageSchema = PageSchema;
