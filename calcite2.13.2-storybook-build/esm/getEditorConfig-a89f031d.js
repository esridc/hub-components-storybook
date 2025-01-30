import { u as unique, a as cloneObject } from './util-3e6872d9.js';
import { a as _deepMapValues } from './_deep-map-values-53f8dbd1.js';
import { g as getSlugMaxLength } from './slugs-7ec67036.js';

/**
 * For a given property name, extract an array of the unique values of that property
 * This was designed to work with string values, so no promises about other types
 * @param obj
 */
function deepGetPropValues(obj, prop) {
    const props = [];
    _deepMapValues(obj, (value, path) => {
        // if the path ends with the property we're looking for then add it to the list
        if (path.split(".").pop() === prop) {
            props.push(value);
        }
        return value;
    });
    return props.filter(unique);
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
        .filter(unique);
}

/**
 * Subset a json schema to only those properties specified.
 * @param schema
 * @param props
 * @returns
 *
 */
function subsetSchema(schema, props) {
    const subset = cloneObject(schema);
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
            schemaPromise = import('./MetricSchema-da66a5ad.js').then(function (n) { return n.a; });
            uiSchemaPromise = {
                "hub:card:stat": () => import('./StatCardUiSchema-65f3a4df.js'),
            }[type];
            // Allow imports to run in parallel
            await Promise.all([schemaPromise, uiSchemaPromise()]).then(async ([schemaModuleResolved, uiSchemaModuleResolved]) => {
                const { MetricSchema } = schemaModuleResolved;
                schema = cloneObject(MetricSchema);
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
            schemaPromise = import('./FollowSchema-7df42d2b.js');
            uiSchemaPromise = {
                "hub:card:follow": () => import('./FollowCardUiSchema-cbec747a.js'),
            }[type];
            // Allow imports to run in parallel
            await Promise.all([schemaPromise, uiSchemaPromise()]).then(([schemaModuleResolved, uiSchemaModuleResolved]) => {
                const { FollowSchema: FollowSchema } = schemaModuleResolved;
                schema = cloneObject(FollowSchema);
                uiSchema = uiSchemaModuleResolved.buildUiSchema(i18nScope, options, context);
            });
            break;
        case "eventGallery":
            schemaPromise = import('./EventGalleryCardSchema-a3382f1d.js');
            uiSchemaPromise = import('./EventGalleryCardUiSchema-de2bfe61.js');
            const [{ EventGalleryCardSchema }, { buildUiSchema }] = await Promise.all([schemaPromise, uiSchemaPromise]);
            schema = cloneObject(EventGalleryCardSchema);
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
    const _slug = cloneObject((_a = schema.properties) === null || _a === void 0 ? void 0 : _a._slug);
    if (!_slug) {
        return schema;
    }
    // add max length to slug
    const { orgUrlKey } = options;
    _slug.maxLength = getSlugMaxLength(orgUrlKey);
    // add conditional validation to ensure slug is unique
    const allOf = cloneObject(schema.allOf) || [];
    const { pattern } = _slug;
    const { id } = options;
    allOf.push({
        // only do async isUniqueSlug check if the slug is valid
        if: { properties: { _slug: { pattern } } },
        then: { properties: { _slug: { isUniqueSlug: { id, orgUrlKey } } } },
    });
    const clone = cloneObject(schema);
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
            const { getSiteSchema } = await import('./SiteSchema-3e282ce1.js');
            // site id is needed for validation of site url
            schema = getSiteSchema(options.id);
            const siteModule = await {
                "hub:site:edit": () => import('./SiteUiSchemaEdit-c35fce91.js'),
                "hub:site:create": () => import('./SiteUiSchemaCreate-7e879ffc.js'),
                "hub:site:followers": () => import('./SiteUiSchemaFollowers-0350b220.js'),
                "hub:site:discussions": () => import('./SiteUiSchemaDiscussions-763f423b.js'),
                "hub:site:settings": () => import('./SiteUiSchemaSettings-9900342d.js'),
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
            const { DiscussionSchema } = await import('./DiscussionSchema-6e5016d0.js');
            schema = cloneObject(DiscussionSchema);
            const discussionModule = await {
                "hub:discussion:edit": () => import('./DiscussionUiSchemaEdit-c24d603e.js'),
                "hub:discussion:create": () => import('./DiscussionUiSchemaCreate-f9d7817f.js'),
                "hub:discussion:settings": () => import('./DiscussionUiSchemaSettings-450e8456.js'),
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
            const { ProjectSchema } = await import('./ProjectSchema-060a6b72.js');
            schema = cloneObject(ProjectSchema);
            const projectModule = await {
                "hub:project:edit": () => import('./ProjectUiSchemaEdit-e7916ffb.js'),
                "hub:project:create": () => import('./ProjectUiSchemaCreate-6ac8a990.js'),
                "hub:project:create2": () => import('./ProjectUiSchemaCreate2-4092062a.js'),
                "hub:project:metrics": () => import('./ProjectUiSchemaMetrics-48762eb5.js'),
                "hub:project:settings": () => import('./ProjectUiSchemaSettings-165a4d01.js'),
            }[type]();
            uiSchema = await projectModule.buildUiSchema(i18nScope, options, context);
            // if we have the buildDefaults fn, then construct the defaults
            if (projectModule.buildDefaults) {
                defaults = await projectModule.buildDefaults(i18nScope, options, context);
            }
            break;
        // ----------------------------------------------------
        case "initiative":
            const { InitiativeSchema } = await import('./InitiativeSchema-4fb31f85.js');
            schema = cloneObject(InitiativeSchema);
            const initiativeModule = await {
                "hub:initiative:edit": () => import('./InitiativeUiSchemaEdit-4e03d641.js'),
                "hub:initiative:create": () => import('./InitiativeUiSchemaCreate-cedd057d.js'),
                "hub:initiative:create2": () => import('./InitiativeUiSchemaCreate2-5179bfd4.js'),
                "hub:initiative:metrics": () => import('./InitiativeUiSchemaMetrics-ab308e8d.js'),
                "hub:initiative:associations": () => import('./InitiativeUiSchemaAssociations-809f43ed.js'),
                "hub:initiative:settings": () => import('./InitiativeUiSchemaSettings-29443a9f.js'),
            }[type]();
            uiSchema = await initiativeModule.buildUiSchema(i18nScope, options, context);
            // if we have the buildDefaults fn, then construct the defaults
            if (initiativeModule.buildDefaults) {
                defaults = await initiativeModule.buildDefaults(i18nScope, options, context);
            }
            break;
        // ----------------------------------------------------
        case "page":
            const { PageSchema } = await import('./PageSchema-4cbe3bd9.js');
            schema = cloneObject(PageSchema);
            const pageModule = await {
                "hub:page:edit": () => import('./PageUiSchemaEdit-f17bbaa4.js'),
                "hub:page:create": () => import('./PageUiSchemaCreate-ca748d87.js'),
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
            const { ContentSchema } = await import('./ContentSchema-d913d8e9.js');
            schema = cloneObject(ContentSchema);
            const contentModule = await {
                "hub:content:edit": () => import('./ContentUiSchemaEdit-86750818.js'),
                "hub:content:discussions": () => import('./ContentUiSchemaDiscussions-f51747b6.js'),
                "hub:content:settings": () => import('./ContentUiSchemaSettings-85663838.js'),
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
            const { TemplateSchema } = await import('./TemplateSchema-83e65297.js');
            schema = cloneObject(TemplateSchema);
            const templateModule = await {
                "hub:template:edit": () => import('./TemplateUiSchemaEdit-e1462141.js'),
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
            const { GroupSchema } = await import('./GroupSchema-13ff9290.js');
            schema = cloneObject(GroupSchema);
            const groupModule = await {
                "hub:group:create:followers": () => import('./GroupUiSchemaCreateFollowers-b4907f84.js'),
                "hub:group:create:association": () => import('./GroupUiSchemaCreateAssociation-a1a7007c.js'),
                "hub:group:create:view": () => import('./GroupUiSchemaCreateView-a5fe7981.js'),
                "hub:group:create:edit": () => import('./GroupUiSchemaCreateEdit-7aa0a4f5.js'),
                "hub:group:create": () => import('./GroupUiSchemaCreate-20c90735.js'),
                "hub:group:edit": () => import('./GroupUiSchemaEdit-4eb47fe8.js'),
                "hub:group:settings": () => import('./GroupUiSchemaSettings-566e674d.js'),
                "hub:group:discussions": () => import('./GroupUiSchemaDiscussions-dcc78ffe.js'),
            }[type]();
            uiSchema = await groupModule.buildUiSchema(i18nScope, options, context);
            // if we have the buildDefaults fn, then construct the defaults
            if (groupModule.buildDefaults) {
                defaults = await groupModule.buildDefaults(i18nScope, options, context);
            }
            break;
        // ----------------------------------------------------
        case "survey":
            const { SurveySchema } = await import('./SurveySchema-0fcb1d64.js');
            schema = cloneObject(SurveySchema);
            const surveyModule = await {
                "hub:survey:edit": () => import('./SurveyUiSchemaEdit-008a9497.js'),
                "hub:survey:settings": () => import('./SurveyUiSchemaSettings-f6f8985a.js'),
            }[type]();
            uiSchema = await surveyModule.buildUiSchema(i18nScope, options, context);
            break;
        // ----------------------------------------------------
        case "event":
            const eventSchemaModule = await {
                "hub:event:create": () => import('./EventSchemaCreate-2f6ba245.js'),
                "hub:event:edit": () => import('./EventSchemaEdit-9a3c6d19.js'),
                "hub:event:registrants": () => import('./EventSchemaAttendeesSettings-ca7c73a6.js'),
            }[type]();
            const eventUiSchemaModule = await {
                "hub:event:create": () => import('./EventUiSchemaCreate-32bd207f.js'),
                "hub:event:edit": () => import('./EventUiSchemaEdit-ee3aff23.js'),
                "hub:event:registrants": () => import('./EventUiSchemaAttendeesSettings-d2398492.js'),
            }[type]();
            schema = eventSchemaModule.buildSchema();
            uiSchema = await eventUiSchemaModule.buildUiSchema(i18nScope, options, context);
            break;
        case "initiativeTemplate":
            const { InitiativeTemplateSchema } = await import('./InitiativeTemplateSchema-bf5d8531.js');
            schema = cloneObject(InitiativeTemplateSchema);
            const initiativeTemplateModule = await {
                "hub:initiativeTemplate:edit": () => import('./InitiativeTemplateUiSchemaEdit-3bc36f62.js'),
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
            const { UserSchema } = await import('./UserSchema-abc4f738.js');
            schema = cloneObject(UserSchema);
            const userModule = await {
                "hub:user:settings": () => import('./UserUiSchemaSettings-319185e4.js'),
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

export { getEditorConfig as g };
