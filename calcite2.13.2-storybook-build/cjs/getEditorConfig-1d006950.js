'use strict';

const util = require('./util-38e73510.js');
const _deepMapValues = require('./_deep-map-values-d489006b.js');
const slugs = require('./slugs-9d179f70.js');

/**
 * For a given property name, extract an array of the unique values of that property
 * This was designed to work with string values, so no promises about other types
 * @param obj
 */
function deepGetPropValues(obj, prop) {
    const props = [];
    _deepMapValues._deepMapValues(obj, (value, path) => {
        // if the path ends with the property we're looking for then add it to the list
        if (path.split(".").pop() === prop) {
            props.push(value);
        }
        return value;
    });
    return props.filter(util.unique);
}

/**
 * Get all the property names from a UI schema.
 *
 * Used to subset a json schema to only those properties used in a UI Schema
 * @param uiSchema
 * @returns
 */
function getUiSchemaProps(uiSchema) {
    return deepGetPropValues(uiSchema, "scope")
        .map((scope) => {
        return scope.split("/")[2];
    })
        .filter(util.unique);
}

/**
 * Subset a json schema to only those properties specified.
 * @param schema
 * @param props
 * @returns
 *
 */
function subsetSchema(schema, props) {
    const subset = util.cloneObject(schema);
    // 1. remove un-specified properties from the "required" array
    if (subset.required) {
        subset.required = [...subset.required].filter((required) => props.includes(required));
    }
    // 2. filter the rest of the schema down to the specified properties
    if (subset.properties) {
        Object.keys(subset.properties).forEach((key) => {
            if (props.indexOf(key) === -1) {
                delete subset.properties[key];
            }
        });
    }
    // 3. filter schema compositions (anyOf, allOf, oneOf) down
    // to specified properties
    // TODO: enhance subset functionality to filter more complex
    // compositional schemas (anyOf, oneOf) and non-if/then/else conditional structures.
    // Also enhance to account for whole compositions versus individual clauses.
    if (subset.allOf) {
        subset.allOf = subset.allOf.map((s) => subsetSchema(s, props));
    }
    if (subset.if) {
        subset.if = subsetSchema(subset.if, props);
    }
    if (subset.then) {
        subset.then = subsetSchema(subset.then, props);
    }
    if (subset.else) {
        subset.else = subsetSchema(subset.else, props);
    }
    return subset;
}

/**
 * Subset a json schema to only those properties needed by the uiSchema
 * @param schema
 * @param uiSchema
 * @returns
 */
function filterSchemaToUiSchema(schema, uiSchema) {
    const propsToKeep = getUiSchemaProps(uiSchema);
    schema = subsetSchema(schema, propsToKeep);
    return schema;
}

/**
 * Helper function to get card type string from full type
 */
function getCardType(type) {
    return type && type.split(":")[2];
}

/**
 * get the editor schema and uiSchema defined for a layout card.
 * The schema and uiSchema that are returned can be used to
 * render a form UI (using the configuration editor).
 *
 * @param i18nScope  translation scope to be interpolated into the uiSchema
 * @param type editor type - corresponds to the returned uiSchema
 * @param options optional hash of dynamic uiSchema element options
 * @param context
 * @returns
 */
async function getCardEditorSchemas(i18nScope, type, options, context) {
    const cardType = getCardType(type);
    // schema and uiSchema are dynamically imported based
    // on the previous editor types
    let schema;
    let uiSchema;
    let schemaPromise;
    let uiSchemaPromise;
    switch (cardType) {
        case "stat":
            // get correct module
            schemaPromise = Promise.resolve().then(function () { return require('./MetricSchema-b212808d.js'); }).then(function (n) { return n.MetricSchema$1; });
            uiSchemaPromise = {
                "hub:card:stat": () => Promise.resolve().then(function () { return require('./StatCardUiSchema-ce84d043.js'); }),
            }[type];
            // Allow imports to run in parallel
            await Promise.all([schemaPromise, uiSchemaPromise()]).then(async ([schemaModuleResolved, uiSchemaModuleResolved]) => {
                const { MetricSchema } = schemaModuleResolved;
                schema = util.cloneObject(MetricSchema);
                uiSchema = await uiSchemaModuleResolved.buildUiSchema(i18nScope, options, context);
                // if we have buildDefaults, build the defaults
                // TODO: when first implementing buildDefaults for initiative templates, remove the ignore line
                /* istanbul ignore next */
                if (uiSchemaModuleResolved.buildDefaults) {
                    uiSchemaModuleResolved.buildDefaults(i18nScope, options, context);
                }
            });
            break;
        case "follow":
            // get correct module
            schemaPromise = Promise.resolve().then(function () { return require('./FollowSchema-71a50dd8.js'); });
            uiSchemaPromise = {
                "hub:card:follow": () => Promise.resolve().then(function () { return require('./FollowCardUiSchema-72874627.js'); }),
            }[type];
            // Allow imports to run in parallel
            await Promise.all([schemaPromise, uiSchemaPromise()]).then(([schemaModuleResolved, uiSchemaModuleResolved]) => {
                const { FollowSchema: FollowSchema } = schemaModuleResolved;
                schema = util.cloneObject(FollowSchema);
                uiSchema = uiSchemaModuleResolved.buildUiSchema(i18nScope, options, context);
            });
            break;
        case "eventGallery":
            schemaPromise = Promise.resolve().then(function () { return require('./EventGalleryCardSchema-d3800970.js'); });
            uiSchemaPromise = Promise.resolve().then(function () { return require('./EventGalleryCardUiSchema-2525e374.js'); });
            const [{ EventGalleryCardSchema }, { buildUiSchema }] = await Promise.all([schemaPromise, uiSchemaPromise]);
            schema = util.cloneObject(EventGalleryCardSchema);
            uiSchema = await buildUiSchema(i18nScope, options, context);
            break;
    }
    // filter out properties not used in uiSchema
    schema = filterSchemaToUiSchema(schema, uiSchema);
    return Promise.resolve({ schema, uiSchema });
}

/**
 * add slug max length and unique validation to schema
 * based on the orgUrlKey
 * @param schema
 * @param options
 * @returns
 */
const addDynamicSlugValidation = (schema, options) => {
    var _a;
    const _slug = util.cloneObject((_a = schema.properties) === null || _a === void 0 ? void 0 : _a._slug);
    if (!_slug) {
        return schema;
    }
    // add max length to slug
    const { orgUrlKey } = options;
    _slug.maxLength = slugs.getSlugMaxLength(orgUrlKey);
    // add conditional validation to ensure slug is unique
    const allOf = util.cloneObject(schema.allOf) || [];
    const { pattern } = _slug;
    const { id } = options;
    allOf.push({
        // only do async isUniqueSlug check if the slug is valid
        if: { properties: { _slug: { pattern } } },
        then: { properties: { _slug: { isUniqueSlug: { id, orgUrlKey } } } },
    });
    const clone = util.cloneObject(schema);
    clone.properties._slug = _slug;
    clone.allOf = allOf;
    return clone;
};

/**
 * get the editor schema and uiSchema defined for an editor (either an entity or a card).
 * The schema and uiSchema that are returned can be used to
 * render a form UI (using the configuration editor)
 *
 * @param i18nScope translation scope to be interpolated into the uiSchema
 * @param type editor type - corresonds to the returned uiSchema
 * @param options optional hash of dynamic uiSchema element options
 * @returns
 */
async function getEditorSchemas(i18nScope, type, options, context) {
    const editorType = type.split(":")[1];
    // schema and uiSchema are dynamically imported based on
    // the entity type and the provided editor type
    let schema;
    let uiSchema;
    let defaults;
    switch (editorType) {
        case "site":
            const { getSiteSchema } = await Promise.resolve().then(function () { return require('./SiteSchema-85074143.js'); });
            // site id is needed for validation of site url
            schema = getSiteSchema(options.id);
            const siteModule = await {
                "hub:site:edit": () => Promise.resolve().then(function () { return require('./SiteUiSchemaEdit-c8ffd846.js'); }),
                "hub:site:create": () => Promise.resolve().then(function () { return require('./SiteUiSchemaCreate-6b3f1040.js'); }),
                "hub:site:followers": () => Promise.resolve().then(function () { return require('./SiteUiSchemaFollowers-ec56b731.js'); }),
                "hub:site:discussions": () => Promise.resolve().then(function () { return require('./SiteUiSchemaDiscussions-0569f375.js'); }),
                "hub:site:settings": () => Promise.resolve().then(function () { return require('./SiteUiSchemaSettings-4dc0aa74.js'); }),
            }[type]();
            uiSchema = await siteModule.buildUiSchema(i18nScope, options, context);
            // if we have the buildDefaults fn, then construct the defaults
            // TODO: when implementing buildDefaults for sites, remove the ignore line
            /* istanbul ignore next */
            if (siteModule.buildDefaults) {
                defaults = await siteModule.buildDefaults(i18nScope, options, context);
            }
            break;
        // ----------------------------------------------------
        case "discussion":
            const { DiscussionSchema } = await Promise.resolve().then(function () { return require('./DiscussionSchema-24407ed6.js'); });
            schema = util.cloneObject(DiscussionSchema);
            const discussionModule = await {
                "hub:discussion:edit": () => Promise.resolve().then(function () { return require('./DiscussionUiSchemaEdit-27888168.js'); }),
                "hub:discussion:create": () => Promise.resolve().then(function () { return require('./DiscussionUiSchemaCreate-9a96a548.js'); }),
                "hub:discussion:settings": () => Promise.resolve().then(function () { return require('./DiscussionUiSchemaSettings-ca70dfad.js'); }),
            }[type]();
            uiSchema = await discussionModule.buildUiSchema(i18nScope, options, context);
            // if we have the buildDefaults fn, then construct the defaults
            // TODO: when first implementing buildDefaults for discussions, remove the ignore line
            /* istanbul ignore next */
            if (discussionModule.buildDefaults) {
                defaults = await discussionModule.buildDefaults(i18nScope, options, context);
            }
            break;
        // ----------------------------------------------------
        case "project":
            const { ProjectSchema } = await Promise.resolve().then(function () { return require('./ProjectSchema-d1b6b7cf.js'); });
            schema = util.cloneObject(ProjectSchema);
            const projectModule = await {
                "hub:project:edit": () => Promise.resolve().then(function () { return require('./ProjectUiSchemaEdit-014a6a83.js'); }),
                "hub:project:create": () => Promise.resolve().then(function () { return require('./ProjectUiSchemaCreate-9813fb45.js'); }),
                "hub:project:create2": () => Promise.resolve().then(function () { return require('./ProjectUiSchemaCreate2-51802084.js'); }),
                "hub:project:metrics": () => Promise.resolve().then(function () { return require('./ProjectUiSchemaMetrics-0ebb9e9f.js'); }),
                "hub:project:settings": () => Promise.resolve().then(function () { return require('./ProjectUiSchemaSettings-a9960400.js'); }),
            }[type]();
            uiSchema = await projectModule.buildUiSchema(i18nScope, options, context);
            // if we have the buildDefaults fn, then construct the defaults
            if (projectModule.buildDefaults) {
                defaults = await projectModule.buildDefaults(i18nScope, options, context);
            }
            break;
        // ----------------------------------------------------
        case "initiative":
            const { InitiativeSchema } = await Promise.resolve().then(function () { return require('./InitiativeSchema-5a0a1956.js'); });
            schema = util.cloneObject(InitiativeSchema);
            const initiativeModule = await {
                "hub:initiative:edit": () => Promise.resolve().then(function () { return require('./InitiativeUiSchemaEdit-3df79a71.js'); }),
                "hub:initiative:create": () => Promise.resolve().then(function () { return require('./InitiativeUiSchemaCreate-f26a67f7.js'); }),
                "hub:initiative:create2": () => Promise.resolve().then(function () { return require('./InitiativeUiSchemaCreate2-0369d95a.js'); }),
                "hub:initiative:metrics": () => Promise.resolve().then(function () { return require('./InitiativeUiSchemaMetrics-596d6052.js'); }),
                "hub:initiative:associations": () => Promise.resolve().then(function () { return require('./InitiativeUiSchemaAssociations-4280527b.js'); }),
                "hub:initiative:settings": () => Promise.resolve().then(function () { return require('./InitiativeUiSchemaSettings-e4e29062.js'); }),
            }[type]();
            uiSchema = await initiativeModule.buildUiSchema(i18nScope, options, context);
            // if we have the buildDefaults fn, then construct the defaults
            if (initiativeModule.buildDefaults) {
                defaults = await initiativeModule.buildDefaults(i18nScope, options, context);
            }
            break;
        // ----------------------------------------------------
        case "page":
            const { PageSchema } = await Promise.resolve().then(function () { return require('./PageSchema-f15eb977.js'); });
            schema = util.cloneObject(PageSchema);
            const pageModule = await {
                "hub:page:edit": () => Promise.resolve().then(function () { return require('./PageUiSchemaEdit-bcc10855.js'); }),
                "hub:page:create": () => Promise.resolve().then(function () { return require('./PageUiSchemaCreate-54fdb87e.js'); }),
            }[type]();
            uiSchema = await pageModule.buildUiSchema(i18nScope, options, context);
            // if we have the buildDefaults fn, then construct the defaults
            // TODO: when first implementing buildDefaults for pages, remove the ignore line
            /* istanbul ignore next */
            if (pageModule.buildDefaults) {
                defaults = await pageModule.buildDefaults(i18nScope, options, context);
            }
            break;
        // ----------------------------------------------------
        case "content":
            const { ContentSchema } = await Promise.resolve().then(function () { return require('./ContentSchema-92224d5f.js'); });
            schema = util.cloneObject(ContentSchema);
            const contentModule = await {
                "hub:content:edit": () => Promise.resolve().then(function () { return require('./ContentUiSchemaEdit-8db832dd.js'); }),
                "hub:content:discussions": () => Promise.resolve().then(function () { return require('./ContentUiSchemaDiscussions-0e5fd94d.js'); }),
                "hub:content:settings": () => Promise.resolve().then(function () { return require('./ContentUiSchemaSettings-aedd428f.js'); }),
            }[type]();
            uiSchema = await contentModule.buildUiSchema(i18nScope, options, context);
            // if we have the buildDefaults fn, then construct the defaults
            // TODO: when first implementing buildDefaults for content, remove the ignore line
            /* istanbul ignore next */
            if (contentModule.buildDefaults) {
                defaults = await contentModule.buildDefaults(i18nScope, options, context);
            }
            break;
        // ----------------------------------------------------
        case "template":
            const { TemplateSchema } = await Promise.resolve().then(function () { return require('./TemplateSchema-d46d6f3b.js'); });
            schema = util.cloneObject(TemplateSchema);
            const templateModule = await {
                "hub:template:edit": () => Promise.resolve().then(function () { return require('./TemplateUiSchemaEdit-f96d64a0.js'); }),
            }[type]();
            uiSchema = await templateModule.buildUiSchema(i18nScope, options, context);
            // if we have the buildDefaults fn, then construct the defaults
            // TODO: when first implementing buildDefaults for templates, remove the ignore line
            /* istanbul ignore next */
            if (templateModule.buildDefaults) {
                defaults = await templateModule.buildDefaults(i18nScope, options, context);
            }
            break;
        // ----------------------------------------------------
        case "group":
            const { GroupSchema } = await Promise.resolve().then(function () { return require('./GroupSchema-e21948a6.js'); });
            schema = util.cloneObject(GroupSchema);
            const groupModule = await {
                "hub:group:create:followers": () => Promise.resolve().then(function () { return require('./GroupUiSchemaCreateFollowers-a0fd25fa.js'); }),
                "hub:group:create:association": () => Promise.resolve().then(function () { return require('./GroupUiSchemaCreateAssociation-ca7b7797.js'); }),
                "hub:group:create:view": () => Promise.resolve().then(function () { return require('./GroupUiSchemaCreateView-21438d80.js'); }),
                "hub:group:create:edit": () => Promise.resolve().then(function () { return require('./GroupUiSchemaCreateEdit-90d6ca7c.js'); }),
                "hub:group:create": () => Promise.resolve().then(function () { return require('./GroupUiSchemaCreate-2b3fc821.js'); }),
                "hub:group:edit": () => Promise.resolve().then(function () { return require('./GroupUiSchemaEdit-31306106.js'); }),
                "hub:group:settings": () => Promise.resolve().then(function () { return require('./GroupUiSchemaSettings-5d862f10.js'); }),
                "hub:group:discussions": () => Promise.resolve().then(function () { return require('./GroupUiSchemaDiscussions-2b445127.js'); }),
            }[type]();
            uiSchema = await groupModule.buildUiSchema(i18nScope, options, context);
            // if we have the buildDefaults fn, then construct the defaults
            if (groupModule.buildDefaults) {
                defaults = await groupModule.buildDefaults(i18nScope, options, context);
            }
            break;
        // ----------------------------------------------------
        case "survey":
            const { SurveySchema } = await Promise.resolve().then(function () { return require('./SurveySchema-9ec907b6.js'); });
            schema = util.cloneObject(SurveySchema);
            const surveyModule = await {
                "hub:survey:edit": () => Promise.resolve().then(function () { return require('./SurveyUiSchemaEdit-35c6b116.js'); }),
                "hub:survey:settings": () => Promise.resolve().then(function () { return require('./SurveyUiSchemaSettings-85a07609.js'); }),
            }[type]();
            uiSchema = await surveyModule.buildUiSchema(i18nScope, options, context);
            break;
        // ----------------------------------------------------
        case "event":
            const eventSchemaModule = await {
                "hub:event:create": () => Promise.resolve().then(function () { return require('./EventSchemaCreate-bf05e6ea.js'); }),
                "hub:event:edit": () => Promise.resolve().then(function () { return require('./EventSchemaEdit-d5841370.js'); }),
                "hub:event:registrants": () => Promise.resolve().then(function () { return require('./EventSchemaAttendeesSettings-cfbb2721.js'); }),
            }[type]();
            const eventUiSchemaModule = await {
                "hub:event:create": () => Promise.resolve().then(function () { return require('./EventUiSchemaCreate-62aec7ef.js'); }),
                "hub:event:edit": () => Promise.resolve().then(function () { return require('./EventUiSchemaEdit-0ca52b5c.js'); }),
                "hub:event:registrants": () => Promise.resolve().then(function () { return require('./EventUiSchemaAttendeesSettings-efe67bd4.js'); }),
            }[type]();
            schema = eventSchemaModule.buildSchema();
            uiSchema = await eventUiSchemaModule.buildUiSchema(i18nScope, options, context);
            break;
        case "initiativeTemplate":
            const { InitiativeTemplateSchema } = await Promise.resolve().then(function () { return require('./InitiativeTemplateSchema-c5d2cb31.js'); });
            schema = util.cloneObject(InitiativeTemplateSchema);
            const initiativeTemplateModule = await {
                "hub:initiativeTemplate:edit": () => Promise.resolve().then(function () { return require('./InitiativeTemplateUiSchemaEdit-0d751e37.js'); }),
            }[type]();
            uiSchema = await initiativeTemplateModule.buildUiSchema(i18nScope, options, context);
            // if we have the buildDefaults fn, then construct the defaults
            // TODO: when first implementing buildDefaults for initiative templates, remove the ignore line
            /* istanbul ignore next */
            if (initiativeTemplateModule.buildDefaults) {
                defaults = await initiativeTemplateModule.buildDefaults(i18nScope, options, context);
            }
            break;
        case "user":
            const { UserSchema } = await Promise.resolve().then(function () { return require('./UserSchema-5e3cafa7.js'); });
            schema = util.cloneObject(UserSchema);
            const userModule = await {
                "hub:user:settings": () => Promise.resolve().then(function () { return require('./UserUiSchemaSettings-d1fe8369.js'); }),
            }[type]();
            uiSchema = await userModule.buildUiSchema(i18nScope, options, context);
            // if we have the buildDefaults fn, then construct the defaults
            // TODO: when first implementing buildDefaults for users, remove the ignore line
            /* istanbul ignore next */
            if (userModule.buildDefaults) {
                defaults = await userModule.buildDefaults(i18nScope, options, context);
            }
            break;
        case "card":
            const result = await getCardEditorSchemas(i18nScope, type, options, context);
            schema = result.schema;
            uiSchema = result.uiSchema;
            defaults = result.defaults;
    }
    // filter out properties not used in the UI schema
    schema = filterSchemaToUiSchema(schema, uiSchema);
    // if schema includes slug, add conditional validation
    schema = addDynamicSlugValidation(schema, options);
    return Promise.resolve({ schema, uiSchema, defaults });
}

// General function
async function getEditorConfig(i18nScope, type, options, context) {
    return getEditorSchemas(i18nScope, type, options, context);
}

exports.getEditorConfig = getEditorConfig;
