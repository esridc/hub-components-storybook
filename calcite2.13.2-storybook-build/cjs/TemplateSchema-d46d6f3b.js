'use strict';

const HubItemEntitySchema = require('./HubItemEntitySchema-62590777.js');
require('./types-097b54b1.js');
require('./subschemas-61a41e85.js');

const TemplateEditorTypes = ["hub:template:edit"];
const TemplateSchema = Object.assign(Object.assign({}, HubItemEntitySchema.HubItemEntitySchema), { properties: Object.assign(Object.assign({}, HubItemEntitySchema.HubItemEntitySchema.properties), { previewUrl: {
            type: "string",
            if: { minLength: 1 },
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            then: { format: "url" },
        } }) });

exports.TemplateEditorTypes = TemplateEditorTypes;
exports.TemplateSchema = TemplateSchema;
