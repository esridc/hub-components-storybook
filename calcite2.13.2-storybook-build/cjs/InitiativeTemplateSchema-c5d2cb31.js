'use strict';

const HubItemEntitySchema = require('./HubItemEntitySchema-62590777.js');
require('./types-097b54b1.js');
require('./subschemas-61a41e85.js');

const InitiativeTemplateEditorTypes = [
    "hub:initiativeTemplate:edit",
];
const InitiativeTemplateSchema = Object.assign(Object.assign({}, HubItemEntitySchema.HubItemEntitySchema), { properties: Object.assign(Object.assign({}, HubItemEntitySchema.HubItemEntitySchema.properties), { previewUrl: {
            type: "string",
            if: { minLength: 1 },
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            then: { format: "url" },
        }, recommendedTemplates: {
            type: "array",
            items: {
                type: "string",
            },
        } }) });

exports.InitiativeTemplateEditorTypes = InitiativeTemplateEditorTypes;
exports.InitiativeTemplateSchema = InitiativeTemplateSchema;
