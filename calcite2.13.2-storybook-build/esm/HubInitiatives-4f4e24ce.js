import { a as cloneObject, u as unique, i as isNil, b as capitalize, c as createId, d as camelize } from './util-3e6872d9.js';
import { k as keywordSlugToUriSlug, a as appendIdToSlug, t as truncateSlug, p as parseIdentifier, u as uriSlugToKeywordSlug } from './slugs-7ec67036.js';
import { b as getUniqueSlug, s as setSlugKeyword, c as findItemsBySlug, f as fetchModelFromItem, d as constructSlug, e as createModel, h as getModel, u as updateModel, l as lookupDomain, r as removeDomain, g as getSiteById, i as addDomain, j as capabilityToFeatureMap, k as ensureUniqueDomainName, m as getOrgDefaultTheme, n as addSiteDomains, o as removeDomainsBySiteId, a as getItemBySlug } from './themes-e08327b4.js';
import { P as PropertyMapper } from './PropertyMapper-4eb0ac8f.js';
import { f as fetchItemEnrichments } from './_enrichments-8641475c.js';
import { H as HubEntityStatus, a as HubEntityHero, b as HubFamilies } from './types-2eaa1a18.js';
import { g as InitiativeDefaultFeatures, h as PageDefaultFeatures, i as SiteDefaultFeatures, j as ProjectDefaultFeatures, k as TemplateDefaultFeatures } from './TemplateBusinessRules-0e35d61b.js';
import { g as getRelativeWorkspaceUrl } from './getRelativeWorkspaceUrl-ac123b7f.js';
import { d as deriveLocationFromItem, b as getItemThumbnailUrl, c as getHubRelativeUrl, e as isPageType, g as getHubApiUrl } from './compose-d5b83ab7.js';
import { g as getItemHomeUrl } from './get-item-home-url-b414b731.js';
import { i as isDiscussable, s as setDiscussableKeyword } from './utils-6bf1b713.js';
import { g as getProp } from './get-prop-ec5be510.js';
import { g as getTypeWithKeywordQuery, c as combineQueries } from './getTypeWithKeywordQuery-9f583e1b.js';
import { U as UserSession } from './UserSession-2c05f7b6.js';
import { s as setProp } from './set-prop-9a4aa9a9.js';
import { g as getFamily, a as getFamilyTypes } from './get-family-543fac52.js';
import { a as getItem } from './get-f0caeb52.js';
import { a as addContextToSlug } from './slugs-7b8828d5.js';
import { r as removeItem } from './remove-7361a90a.js';
import { m as mapBy } from './map-by-a2234e13.js';
import { _ as __rest } from './tslib.es6-9c17e83a.js';
import { M as MetricVisibility, E as ExpressionRelationships } from './Metrics-9cb7a1fc.js';
import { g as getWithDefault } from './get-with-default-b819d95d.js';
import { i as isGuid } from './is-guid-982831aa.js';
import { u as updateGroup } from './update-26e2fbc1.js';
import { d as dasherize } from './dasherize-9215e9fc.js';
import { H as HubError } from './HubError-e26c5610.js';
import { g as getWellknownCollection } from './wellKnownCatalog-7e9f7f53.js';
import { s as searchItems } from './search-c7a57aa9.js';
import { s as stripProtocol } from './domain-exists-4fd7dc09.js';
import { s as slugify } from './slugify-e3e67bac.js';

/**
 * Key value pair of IModel resource to resource filename.
 * (used for fetching/creating resources)
 */
const EntityResourceMap = {
    location: "location.json",
};

/**
 * Consistent means to get an item's identifier - either the slug or the id
 * @param item
 * @returns
 */
function getItemIdentifier(item, 
// for backwards compatibility, we do not include the id in the slug by default
// once all of the routes have been updated to expect slugs w/ ids, we should always include the id
includeIdInSlug = false) {
    const { id, properties } = item;
    const slug = properties === null || properties === void 0 ? void 0 : properties.slug;
    return slug
        ? keywordSlugToUriSlug(includeIdInSlug ? appendIdToSlug(slug, id) : slug)
        : id;
}

/**
 * Parse an IncludeSpec from the include string
 * Include String structure:
 * - `enrichment{.deep.path} AS propertyName`
 *
 * Examples
 * - `server.layers.0.name as layerName` -> use the `server` enrichment, extract the name of the first layer and attach that as `layerName`
 * - `server.layers` ->  use the `server` enrichment, attach the `layers` array as `layers`
 * @param include
 * @returns
 */
function parseInclude(include) {
    // TODO: Validate enrichment? Not clear how we'd do that other than a manully maintained string list
    const parts = include.split(" AS ");
    const path = parts[0];
    const prop = parts[1] || path.split(".").reverse()[0];
    const enrichment = path.split(".")[0];
    // We need the actual list of string values so we can verify
    // what we get in, is infact a valid enrichment.
    const spec = {
        enrichment,
        path,
        prop,
    };
    return spec;
}

// NOTE: this is covered by pre-existing tests for project to entity
/**
 * extract the common ephemeral properties from the editor
 * and then clone into an entity that has all common properties
 * @param editor
 * @param portal
 * @returns
 */
function editorToEntity(editor, portal) {
    var _a;
    // 1. remove the ephemeral props we graft onto the editor
    const _slug = editor._slug;
    delete editor._slug;
    // convert back to an entity. Apply any reverse transforms used in
    // of the toEditor method
    const entity = cloneObject(editor);
    entity.orgUrlKey = editor.orgUrlKey ? editor.orgUrlKey : portal.urlKey;
    // copy the location extent up one level
    entity.extent = (_a = editor.location) === null || _a === void 0 ? void 0 : _a.extent;
    if (_slug) {
        // ensure the slug is truncated
        entity.slug = truncateSlug(_slug, entity.orgUrlKey);
    }
    return entity;
}

// NOTE: this mutates the entity that is passed in
const ensureUniqueEntitySlug = async (entity, requestOptions) => {
    // verify that the slug is unique
    const { id: existingId, slug } = entity;
    const slugInfo = existingId ? { slug, existingId } : { slug };
    entity.slug = await getUniqueSlug(slugInfo, requestOptions);
    // add slug to keywords
    entity.typeKeywords = setSlugKeyword(entity.typeKeywords, entity.slug);
    return entity;
};

/**
 * Returns an Array of IPropertyMap objects
 * that define the standard projection of properties from a IModel an entity interface
 * @returns
 */
function getBasePropertyMap() {
    const itemProps = [
        "access",
        "created",
        "culture",
        "description",
        "extent",
        "id",
        "itemControl",
        "modified",
        "owner",
        "tags",
        "categories",
        "type",
        "typeKeywords",
        "thumbnail",
        "url",
        "orgId",
    ];
    const dataProps = ["display", "geometry", "view", "associations", "catalogs"];
    const resourceProps = Object.keys(EntityResourceMap);
    const map = [];
    itemProps.forEach((entry) => {
        map.push({ entityKey: entry, storeKey: `item.${entry}` });
    });
    dataProps.forEach((entry) => {
        map.push({ entityKey: entry, storeKey: `data.${entry}` });
    });
    resourceProps.forEach((entry) => {
        map.push({ entityKey: entry, storeKey: `resources.${entry}` });
    });
    // Deeper mappings
    map.push({
        entityKey: "slug",
        storeKey: "item.properties.slug",
    });
    map.push({
        entityKey: "summary",
        storeKey: "item.snippet",
    });
    map.push({
        entityKey: "schemaVersion",
        storeKey: "item.properties.schemaVersion",
    });
    map.push({
        entityKey: "orgUrlKey",
        storeKey: "item.properties.orgUrlKey",
    });
    map.push({
        entityKey: "name",
        storeKey: "item.title",
    });
    map.push({
        entityKey: "boundary",
        storeKey: "item.properties.boundary",
    });
    map.push({
        entityKey: "discussionSettings",
        storeKey: "entitySettings.settings.discussions",
    });
    map.push({
        entityKey: "entitySettingsId",
        storeKey: "entitySettings.id",
    });
    return map;
}

/**
 * Base property mapping for item backed entity types
 * @param item IItem
 * @param entity IHubItemEntity
 * @returns
 */
function computeItemProps(item, entity) {
    // Handle Dates
    entity.createdDate = new Date(item.created);
    entity.createdDateSource = "item.created";
    entity.updatedDate = new Date(item.modified);
    entity.updatedDateSource = "item.modified";
    // TODO: thumbnail url?
    // location
    entity.location = entity.location || deriveLocationFromItem(item);
    // isDiscussable
    entity.isDiscussable = isDiscussable(item);
    // return updated (mutated) entity
    return entity;
}

/**
 * Enrich a generic search result
 * @param item
 * @param includes
 * @param requestOptions
 * @returns
 */
async function enrichContentSearchResult(item, include, requestOptions) {
    // Create the basic structure
    const result = {
        access: item.access,
        id: item.id,
        type: item.type,
        name: item.title,
        owner: item.owner,
        tags: item.tags,
        typeKeywords: item.typeKeywords,
        categories: item.categories,
        summary: item.snippet || item.description,
        createdDate: new Date(item.created),
        createdDateSource: "item.created",
        updatedDate: new Date(item.modified),
        updatedDateSource: "item.modified",
        family: getFamily(item.type),
        links: {
            self: "not-implemented",
            siteRelative: "not-implemented",
            thumbnail: "not-implemented",
        },
        location: deriveLocationFromItem(item),
        rawResult: item,
    };
    // default includes
    const DEFAULTS = [];
    // Add any type-specific defaults here
    // if (["Map Service", "Feature Service"].includes(item.type)) {
    //   DEFAULTS = ["server.layers.length AS layerCount"];
    // }
    // if (item.type === "Web Map") {
    //   DEFAULTS = ["data.operationalLayers.length AS layerCount"];
    // }
    // merge includes
    include = [...DEFAULTS, ...include].filter(unique);
    // Parse the includes into a valid set of enrichments
    const specs = include.map(parseInclude);
    // Extract out the low-level enrichments needed
    const enrichments = mapBy("enrichment", specs).filter(unique);
    // fetch the enrichments
    let enriched = {};
    if (enrichments.length) {
        enriched = await fetchItemEnrichments(item, enrichments, requestOptions);
    }
    // map the enriched props onto the result
    specs.forEach((spec) => {
        result[spec.prop] = getProp(enriched, spec.path);
    });
    // Handle links
    // TODO: Link handling should be an enrichment
    result.links.thumbnail = getItemThumbnailUrl(item, requestOptions);
    result.links.self = getItemHomeUrl(result.id, requestOptions);
    result.links.siteRelative = getHubRelativeUrl(result.type, result.id, item.typeKeywords);
    result.links.workspaceRelative = getRelativeWorkspaceUrl(result.type, result.id);
    return result;
}

/**
 * Fetch an item by its identifier
 * @param identifier item id or slug, which may or may not include the org key
 * @param requestOptions
 */
function fetchItem(identifier, requestOptions) {
    const { id, slug, orgKey } = parseIdentifier(identifier);
    if (id) {
        // use the id to fetch the item
        return getItem(id, requestOptions);
    }
    // we'll have to look up by slug
    // first, ensure the slug has the org key
    const fullyQualifiedSlug = addContextToSlug(slug, orgKey || requestOptions.siteOrgKey);
    const slugKeyword = uriSlugToKeywordSlug(fullyQualifiedSlug);
    return findItemsBySlug({ slug: slugKeyword }, requestOptions).then((results) => {
        if (results.length) {
            // search results only include a subset of properties of the item, so
            // issue a subsequent call to getItem to get the full item details
            return getItem(results[0].id, requestOptions);
        }
        else {
            return null;
        }
    });
}

const HUB_INITIATIVE_ITEM_TYPE = "Hub Initiative";
/**
 * Default values of a IHubInitiative
 */
const DEFAULT_INITIATIVE = {
    name: "",
    tags: [],
    typeKeywords: ["hubInitiativeV2"],
    catalog: { schemaVersion: 0 },
    permissions: [],
    schemaVersion: 2,
    status: HubEntityStatus.notStarted,
    features: InitiativeDefaultFeatures,
    view: {
        featuredContentIds: [],
        hero: HubEntityHero.map,
        metricDisplays: [],
    },
};
/**
 * Default values for a new HubInitiative Model
 */
const DEFAULT_INITIATIVE_MODEL = {
    item: {
        type: HUB_INITIATIVE_ITEM_TYPE,
        title: "",
        description: "",
        snippet: "",
        tags: [],
        typeKeywords: ["hubInitiativeV2"],
        properties: {
            slug: "",
            schemaVersion: 2,
        },
    },
    data: {
        catalog: { schemaVersion: 0 },
        status: HubEntityStatus.notStarted,
        view: {
            featuredContentIds: [],
            hero: HubEntityHero.map,
            metricDisplays: [],
        },
    },
};

/**
 * Returns an Array of IPropertyMap objects
 * that define the projection of properties from a IModel to an IHubProject
 * @returns
 * @private
 */
function getPropertyMap$5() {
    const map = getBasePropertyMap();
    // Type specific mappings
    map.push({ entityKey: "status", storeKey: "data.status" });
    map.push({ entityKey: "catalog", storeKey: "data.catalog" });
    map.push({ entityKey: "permissions", storeKey: "data.permissions" });
    map.push({ entityKey: "contacts", storeKey: "data.contacts" });
    map.push({ entityKey: "timeline", storeKey: "data.timeline" });
    // Capabilities
    map.push({ entityKey: "content", storeKey: "data.content" });
    map.push({ entityKey: "events", storeKey: "data.events" });
    // Deeper/Indirect mappings
    map.push({ entityKey: "metrics", storeKey: "item.properties.metrics" });
    map.push({
        entityKey: "location",
        storeKey: "item.properties.location",
    });
    map.push({
        entityKey: "followersGroupId",
        storeKey: "item.properties.followersGroupId",
    });
    map.push({
        entityKey: "features",
        storeKey: "data.settings.features",
    });
    return map;
}

/**
 * Take an entity's features and merge them with the default features ensuring
 * that only the featires defined in the business rules are allowed through.
 * @param entityFeatures
 * @param defaultFeatures
 * @returns
 */
function processEntityFeatures(entityFeatures, defaultFeatures) {
    // Extend the defaults with the entity values
    const features = Object.assign(Object.assign({}, defaultFeatures), entityFeatures);
    // Remove any features that are not in the default features hash.
    // this prevents enabling features that are not defined in hub business rules
    const defaultKeys = Object.keys(defaultFeatures);
    const keysToRemove = Object.keys(features).reduce((acc, key) => {
        if (!defaultKeys.includes(key)) {
            acc.push(key);
        }
        return acc;
    }, []);
    // remove any keys that are not in the default hash
    keysToRemove.forEach((key) => {
        delete features[key];
    });
    return features;
}

/**
 * Compute the links that get appended to a Hub Initiative
 * search result and entity
 *
 * @param item
 * @param requestOptions
 */
function computeItemLinks(item, requestOptions) {
    let token;
    if (requestOptions.authentication) {
        const session = requestOptions.authentication;
        token = session.token;
    }
    return {
        self: getItemHomeUrl(item.id, requestOptions),
        siteRelative: getHubRelativeUrl(item.type, 
        // use slug if available, otherwise id
        getItemIdentifier(item), item.typeKeywords),
        siteRelativeEntityType: getHubRelativeUrl(item.type),
        // no SEO for workspace, so we always use id instead of slug
        workspaceRelative: getRelativeWorkspaceUrl(item.type, item.id),
        thumbnail: getItemThumbnailUrl(item, requestOptions, token),
    };
}

/**
 * Compute the links that get appended to a Hub Initiative
 * search result and entity
 *
 * @param item
 * @param requestOptions
 */
function computeLinks$4(item, requestOptions) {
    return computeItemLinks(item, requestOptions);
}

const CATALOG_SCHEMA_VERSION = 1.0;
const getAgoEntityOrgIdPredicates = (orgId) => [
    // Portal uses `orgid` instead of `orgId`, so we comply.
    // While `orgid` is valid field for search, it does not count
    // towards Portal's requirement of needing at least one filter.
    { orgid: [orgId] },
    // Hack to force Portal to think that at least one filter has
    // been provided. 'Code Attachment' is an old AGO type that has
    // been defunct for some time, so the results won't be affected.
    { type: { not: ["Code Attachment"] } },
];
const getEventEntityOrgIdPredicates = (orgId) => [
    { orgId },
];
const ORG_ID_PREDICATE_FNS_BY_ENTITY_TYPE = {
    item: getAgoEntityOrgIdPredicates,
    event: getEventEntityOrgIdPredicates,
};
/**
 * Apply schema upgrades to Catalog objects
 * @param catalog
 * @returns
 */
function upgradeCatalogSchema(catalog) {
    if (getProp(catalog, "schemaVersion") === CATALOG_SCHEMA_VERSION) {
        return catalog;
    }
    else {
        let clone = cloneObject(catalog);
        // apply migrations in order
        clone = applyCatalogSchema(clone);
        return clone;
    }
}
/**
 * Apply the Catalog schema to the original, unversioned
 * site catalog objects
 * @param original
 * @returns
 */
function applyCatalogSchema(original) {
    if (getProp(original, "schemaVersion") > 1.0) {
        return original;
    }
    else {
        const catalog = {
            schemaVersion: 1,
            title: "Default Catalog",
            scopes: {
                item: {
                    targetEntity: "item",
                    filters: [],
                },
                event: {
                    targetEntity: "event",
                    filters: [],
                },
            },
            collections: [],
        };
        // Handle legacy group structure
        const rawGroups = getProp(original, "groups") || [];
        let groups = [];
        if (Array.isArray(rawGroups) && rawGroups.length) {
            groups = rawGroups;
        }
        else if (typeof rawGroups === "string") {
            groups = [rawGroups];
        }
        if (groups.length) {
            // add the group predicate to item & event scope queries
            catalog.scopes = Object.entries(catalog.scopes).reduce((acc, entry) => (Object.assign(Object.assign({}, acc), { [entry[0]]: Object.assign(Object.assign({}, entry[1]), { filters: [{ predicates: [{ group: groups }] }] }) })), {});
        }
        // Handle legacy orgId value, which should only be present
        // for org-level home sites (e.g., "my-org.hub.arcgis.com")
        const orgId = getProp(original, "orgId");
        if (orgId) {
            // add the org ID predicate to all the scope queries
            catalog.scopes = Object.entries(catalog.scopes).reduce((acc, entry) => {
                const entityType = entry[0];
                const query = entry[1];
                return Object.assign(Object.assign({}, acc), { [entityType]: Object.assign(Object.assign({}, query), { filters: [
                            ...query.filters,
                            {
                                operation: "AND",
                                predicates: ORG_ID_PREDICATE_FNS_BY_ENTITY_TYPE[entityType](orgId),
                            },
                        ] }) });
            }, {});
        }
        return catalog;
    }
}

/**
 * Given a model and an Initiative, set various computed properties that can't be directly mapped
 * @private
 * @param model
 * @param initiative
 * @param requestOptions
 * @returns
 */
function computeProps$4(model, initiative, requestOptions) {
    var _a, _b;
    let token;
    if (requestOptions.authentication) {
        const session = requestOptions.authentication;
        token = session.token;
    }
    // compute base properties on initiative
    initiative = computeItemProps(model.item, initiative);
    // thumbnail url
    initiative.thumbnailUrl = getItemThumbnailUrl(model.item, requestOptions, token);
    initiative.view = Object.assign(Object.assign({}, model.data.view), { featuredImageUrl: (_a = model.data.view) === null || _a === void 0 ? void 0 : _a.featuredImageUrl });
    // Ensure we have a catalog and that its at the current schema
    initiative.catalog = upgradeCatalogSchema(initiative.catalog || {});
    /**
     * Features that can be disabled by the entity owner
     */
    initiative.features = processEntityFeatures(((_b = model.data.settings) === null || _b === void 0 ? void 0 : _b.features) || {}, InitiativeDefaultFeatures);
    initiative.links = computeLinks$4(model.item, requestOptions);
    // cast b/c this takes a partial but returns a full object
    return initiative;
}

const INITIATIVE_SCHEMA_VERSION = 2;
/**
 * Apply all Initiative model migrations
 * @param model
 * @returns
 */
function applyInitiativeMigrations(model, requestOptions) {
    if (getProp(model, "item.properties.schemaVersion") ===
        INITIATIVE_SCHEMA_VERSION) {
        return Promise.resolve(model);
    }
    else {
        // apply upgrade functions in order...
        model = addDefaultCatalog(model);
        return Promise.resolve(model);
    }
}
/**
 * Apply the default catalog to the model
 * @param model
 * @returns
 */
function addDefaultCatalog(model) {
    if (getProp(model, "item.properties.schemaVersion") >= 1.1) {
        return model;
    }
    else {
        const clone = cloneObject(model);
        // v0 of initiatives did not have a catalog, so we need to add one
        // based on the content group associated with the initiative
        const groupId = getProp(clone, "item.properties.contentGroupId");
        const group = groupId ? [groupId] : [];
        const catalog = {
            schemaVersion: 1,
            title: "Default Initiative Catalog",
            scopes: {
                item: {
                    targetEntity: "item",
                    filters: [
                        {
                            predicates: [
                                {
                                    group,
                                },
                            ],
                        },
                    ],
                },
            },
            collections: [],
        };
        clone.data.catalog = catalog;
        // set the schema version
        if (!clone.item.properties) {
            clone.item.properties = {};
        }
        clone.item.properties.schemaVersion = 1.1;
        return clone;
    }
}

/**
 * Determines whether a value is null, undefined, or an empty string.
 * This is particularly useful when 0 and false are considered meaningful values
 * @param value value to check
 * @returns whether the value is null, undefined, or an empty string
 */
function isNilOrEmptyString(value) {
    return value == null || value === "";
}

/**
 * Searches through a list of filters and finds a specific predicate that should be appended at the top level of a search
 * (i.e., has special requirements for combining with other predicates). Also verifies that the predicate is not combined in any invalid ways.
 *
 * Combination Requirements:
 * - Only ONE filter can have a predicate with the target field
 * - Only ONE predicate with the target field can exist
 * - The predicate can only be ANDed to other predicates
 * - The predicate's field value MUST be a string or boolean (not string[] or IMatchOptions)
 *
 * Example: Portal's bbox field cannot be conditionally searched. Any value provided will always be applied as a top-level filter.
 * - Valid: `?bbox=1,2,3,4&filter=type:CSV`
 * - Invalid: `?filter=type:CSV OR (type:PDF AND bbox=1,2,3,4)
 *
 * @param field the field of the desired predicate
 * @param filters filters to be searched / validated
 * @returns the predicate (if present and all requirements are met)
 */
function getTopLevelPredicate(field, filters) {
    let result = null;
    const matchingFilters = filters.filter((f) => {
        return f.predicates.find((p) => !isNilOrEmptyString(p[field]));
    });
    if (matchingFilters.length > 1) {
        throw new Error(`Only 1 IFilter can have a '${field}' predicate but ${matchingFilters.length} were detected`);
    }
    if (matchingFilters.length) {
        const matchingFilter = matchingFilters[0];
        const matchingPredicates = matchingFilter.predicates.filter((p) => !isNilOrEmptyString(p[field]));
        if (matchingPredicates.length > 1) {
            throw new Error(`Only 1 '${field}' predicate is allowed but ${matchingPredicates.length} were detected`);
        }
        if (matchingFilter.operation !== "AND" &&
            matchingFilter.predicates.length > 1) {
            throw new Error(`'${field}' predicates cannot be OR'd to other predicates`);
        }
        const topLevelPredicate = matchingPredicates[0];
        const predicateValue = topLevelPredicate[field];
        const isValidPrimitive = typeof predicateValue === "string" || typeof predicateValue === "boolean";
        if (!isValidPrimitive) {
            throw new Error(`'${field}' predicate must be a string or boolean primitive. string[] and IMatchOptions are not allowed.`);
        }
        result = topLevelPredicate;
    }
    return result;
}

/**
 * @private
 * Determines whether a string corresponds to a search category (as opposed to a collection)
 *
 * @param value value to verify
 * @returns whether the value represents one of the old search categories
 */
function isLegacySearchCategory(value) {
    const categories = [
        "Site",
        "Event",
        "Dataset",
        "Document",
        "App,Map",
    ];
    return categories.includes(value);
}

/**
 * @private
 * Converts a search category key to its corresponding wellknown collection key
 *
 * @param legacySearchCategory search category key to transform
 * @returns the wellknown collection key
 */
function toCollectionKey(legacySearchCategory) {
    return legacySearchCategory === "App,Map"
        ? "appAndMap"
        : legacySearchCategory.toLowerCase();
}

/* Copyright (c) 2018-2021 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Well known APIs
 * Short-forms for specifying common APIs
 * We will likely deprecate this
 */
const SEARCH_APIS = {
    arcgis: {
        label: "ArcGIS Online",
        url: "https://www.arcgis.com",
        type: "arcgis",
    },
    arcgisQA: {
        label: "ArcGIS Online QAEXT",
        url: "https://qaext.arcgis.com",
        type: "arcgis",
    },
    arcgisDEV: {
        label: "ArcGIS Online DEVEXT",
        url: "https://devext.arcgis.com",
        type: "arcgis",
    },
    hub: {
        label: "ArcGIS Hub",
        url: "https://hub.arcgis.com/api",
        type: "arcgis-hub",
    },
    hubDEV: {
        label: "ArcGIS Hub DEV",
        url: "https://hubdev.arcgis.com/api",
        type: "arcgis-hub",
    },
    hubQA: {
        label: "ArcGIS Hub QA",
        url: "https://hubqa.arcgis.com/api",
        type: "arcgis-hub",
    },
};
/**
 * @private
 * Convert array of api "names" into full ApiDefinitions
 * @param apis
 * @returns
 */
function expandApis(apis) {
    return apis.map(expandApi);
}
/**
 * @private
 * Convert an api "name" into a full ApiDefinition
 * @param api
 * @returns
 */
function expandApi(api) {
    if (typeof api === "string" && api in SEARCH_APIS) {
        return SEARCH_APIS[api];
    }
    else {
        // it's an object, so we trust that it's well formed
        return api;
    }
}
/**
 * @private
 * Convert a field value into a MatchOptions if it's not already one
 * @param value
 * @returns
 */
function valueToMatchOptions(value) {
    let result = {};
    if (Array.isArray(value)) {
        result = {
            any: value,
        };
    }
    else {
        if (typeof value === "string") {
            result = {
                any: [value],
            };
        }
        if (typeof value === "object") {
            result = value;
        }
    }
    return result;
}
/**
 * @private
 * Convert a RelativeDate to a DateRange<number>
 * @param relative
 * @returns
 */
function relativeDateToDateRange(relative) {
    // hash of offsets
    const offsetMs = {
        min: 1000 * 60,
        hours: 1000 * 60 * 60,
        days: 1000 * 60 * 60 * 24,
        weeks: 1000 * 60 * 60 * 24 * 7,
    };
    const now = new Date();
    // default
    const result = {
        type: "date-range",
        from: now.getTime(),
        to: now.getTime(),
    };
    //
    switch (relative.unit) {
        case "hours":
        case "days":
        case "weeks":
            result.from = result.to - offsetMs[relative.unit] * relative.num;
            break;
        case "months":
            // get the current month and subtract num
            // NOTE: when the previous month has fewer days than this month
            // setMonth() will return a date w/in the current month
            // example: 3/30 -> 3/2 b/c there is no 2/28
            now.setMonth(now.getMonth() - relative.num);
            result.from = now.getTime();
            break;
        case "years":
            now.setFullYear(now.getFullYear() - relative.num);
            result.from = now.getTime();
            break;
    }
    return result;
}
/**
 * @private
 * Create a `.next()` function for a type
 * @param request
 * @param nextStart
 * @param total
 * @param fn
 * @returns
 */
function getNextFunction(request, nextStart, total, fn) {
    var _a;
    const clonedRequest = cloneObject(request);
    // clone will not handle authentication so we do it manually
    if (request.authentication) {
        clonedRequest.authentication = UserSession.deserialize(request.authentication.serialize());
    }
    // ensure that if we have requestOptions, we have also update the authentication on it
    if ((_a = request.requestOptions) === null || _a === void 0 ? void 0 : _a.authentication) {
        clonedRequest.requestOptions.authentication =
            request.requestOptions.authentication;
    }
    // figure out the start
    clonedRequest.start = nextStart > -1 ? nextStart : total + 1;
    return (authentication) => {
        if (authentication) {
            clonedRequest.authentication = authentication;
            // ensure that if we have requestOptions, we have also update the authentication on it
            if (clonedRequest.requestOptions) {
                clonedRequest.requestOptions.authentication =
                    clonedRequest.authentication;
            }
        }
        return fn(clonedRequest);
    };
}
/**
 * Construct a the full url to a group thumbnail
 *
 * - If the group has a thumbnail, construct the full url
 * - If the group is not public, append on the token (if passed in)
 * @param portalUrl
 * @param group
 * @param token
 * @returns
 */
function getGroupThumbnailUrl(portalUrl, group, token) {
    let thumbnailUrl = null;
    if (group.thumbnail) {
        thumbnailUrl = `${portalUrl}/community/groups/${group.id}/info/${group.thumbnail}`;
        if (token && group.access !== "public") {
            thumbnailUrl = `${thumbnailUrl}?token=${token}`;
        }
    }
    return thumbnailUrl;
}
/**
 * Construct a the full url to a user thumbnail
 *
 * - If the user has a thumbnail, construct the full url
 * - If the user is not public, append on the token
 * @param portalUrl
 * @param user
 * @param token
 * @returns
 */
function getUserThumbnailUrl(portalUrl, user, token) {
    let thumbnailUrl = null;
    if (user.thumbnail) {
        thumbnailUrl = `${portalUrl}/community/users/${user.username}/info/${user.thumbnail}`;
        if (token && user.access !== "public") {
            thumbnailUrl = `${thumbnailUrl}?token=${token}`;
        }
    }
    return thumbnailUrl;
}
/**
 * Function that can migrate a legacy search category to a wellknown
 * collection key. Useful when the caller has an unknown value that
 * could either be a search category or wellknown collection.
 *
 * If the value passed is not a search category, it is returned as-is.
 *
 * @param collectionOrSearchCategory key to be migrated
 * @returns the migrated wellknown collection key
 */
function migrateToCollectionKey(collectionOrSearchCategory) {
    return isLegacySearchCategory(collectionOrSearchCategory)
        ? toCollectionKey(collectionOrSearchCategory)
        : collectionOrSearchCategory;
}
/**
 * DEPRECATED: Please use `getGroupPredicate`
 * Searches through a catalog scope and retrieves the predicate responsible
 * for determining group sharing requirements.
 * Still in use 10/29/2024
 * @param scope Catalog scope to search through
 * @returns The first predicate with a `group` field (if present)
 */
// istanbul ignore next -- deprecated function
function getScopeGroupPredicate(scope) {
    /* tslint:disable no-console */
    console.warn(`"getScopeGroupPredicate(query)" is deprecated. Please use "getGroupPredicate(qyr)`);
    const isGroupPredicate = (predicate) => !!predicate.group;
    const groupFilter = scope.filters.find((f) => f.predicates.find(isGroupPredicate));
    return groupFilter && groupFilter.predicates.find(isGroupPredicate);
}
/**
 * Searches through an `IQuery` and retrieves the predicate with a `group` definition.
 * If there is no group predicate, returns `null`
 * @param query IQuery to search
 * @returns
 */
function getGroupPredicate(query) {
    const expandedQuery = expandQuery(query);
    const isGroupPredicate = (predicate) => !!predicate.group;
    const groupFilter = expandedQuery.filters.find((f) => f.predicates.find(isGroupPredicate));
    return groupFilter && groupFilter.predicates.find(isGroupPredicate);
}
/**
 * Determines the canonical siteRelative link for a search result.
 *
 * We need to pass in `site` specifically for Hub Page items. Unfortunately
 * for us, Hub Page items have their canonical slug stored in the corresponding
 * site's data.json, not within the Hub Page item itself.
 *
 * NOTE: The slugs generated by indexer for Hub Page items are not canonical
 * and should not be used for link generation.
 *
 * @param searchResult the search result we're calculating the link for
 * @param site IHubSite that is related to the result
 * @returns a canonical siteRelative link
 */
function getResultSiteRelativeLink(searchResult, site) {
    var _a;
    const { id, type, typeKeywords } = searchResult;
    let siteRelativeLink = (_a = searchResult.links) === null || _a === void 0 ? void 0 : _a.siteRelative;
    if (siteRelativeLink && isPageType(type, typeKeywords)) {
        const pages = (site === null || site === void 0 ? void 0 : site.pages) || [];
        const targetPage = pages.find((p) => p.id === id);
        const slug = targetPage === null || targetPage === void 0 ? void 0 : targetPage.slug;
        if (slug) {
            siteRelativeLink = siteRelativeLink.replace(id, slug);
        }
    }
    return siteRelativeLink;
}
/**
 * Adds default predicates for item target entity
 *
 * @param query IQuery to search items
 * @returns a cloned copy of the query object with default item search predicates
 */
function addDefaultItemSearchPredicates(query) {
    const queryWithDefaultItemPredicates = cloneObject(query);
    const defaultPredicates = {
        // 'Code Attachment' is an old AGO type that has
        // been defunct for some time, so add this predicate
        // to all catalog filter to omit 'Code Attachment' items
        // from search results
        predicates: [{ type: { not: ["Code Attachment"] } }],
    };
    queryWithDefaultItemPredicates.filters.push(defaultPredicates);
    return queryWithDefaultItemPredicates;
}
/**
 * Returns the size in kilobytes of a query string or a SearchQueryBuilder.
 * This is used to later determine if a query is too large or almost too large to be sent to the server.
 * @param query
 * @returns
 */
function getKilobyteSizeOfQuery(query) {
    // convert query to string if it isn't already
    const queryString = typeof query === "string" ? query : query.toParam();
    // get the size of the query string using the TextEncoder api
    const encoder = new TextEncoder();
    const encodedString = encoder.encode(queryString);
    const sizeInBytes = encodedString.length;
    const sizeInKB = sizeInBytes / 1024; // Convert bytes to kilobytes
    return sizeInKB;
}
/**
 * Expand an item IQuery for portal by applying well-known filters and predicates,
 * and then expanding all the predicates into IMatchOption objects.
 * @param query `IQuery` to expand
 * @returns IQuery
 */
function expandPortalQuery(query) {
    let updatedQuery = applyWellKnownCollectionFilters(query);
    // Expand well-known filterGroups
    // TODO: Should we remove this with the whole idea of collections?
    updatedQuery = applyWellKnownItemPredicates(updatedQuery);
    // Expand the individual predicates in each filter
    return expandPredicates(updatedQuery);
}

/**
 * @internal
 * Predicate properties that are treated as dates
 */
const PREDICATE_DATE_PROPS = ["created", "modified", "lastlogin"];
/**
 * @internal
 * Predicate properties that are just copied forward
 */
const PREDICATE_COPY_PROPS = [
    "bbox",
    "categoriesAsParam",
    "categoryFilter",
    "filterType",
    "isopendata",
    "isviewonly",
    "memberType",
    "name",
    "searchUserAccess",
    "searchUserName",
    "term",
];
/**
 * @internal
 * Predicate properties that are not treated as match options
 */
const PREDICATE_NON_MATCH_OPTIONS_PROPS = [
    ...PREDICATE_DATE_PROPS,
    ...PREDICATE_COPY_PROPS,
];
/**
 * @private
 * Expand a predicate
 * @param predicate
 * @returns
 */
function expandPredicate(predicate) {
    const result = {};
    // Do the conversion
    Object.entries(predicate).forEach(([key, value]) => {
        // Handle MatchOptions fields
        if (!PREDICATE_NON_MATCH_OPTIONS_PROPS.includes(key)) {
            setProp(key, valueToMatchOptions(value), result);
        }
        // Handle Date fields
        if (PREDICATE_DATE_PROPS.includes(key)) {
            const dateFieldValue = cloneObject(getProp(predicate, key));
            if (getProp(predicate, `${key}.type`) === "relative-date") {
                setProp(key, relativeDateToDateRange(dateFieldValue), result);
            }
            else {
                setProp(key, dateFieldValue, result);
            }
        }
        // Handle fields that are just copied forward
        if (PREDICATE_COPY_PROPS.includes(key) && predicate.hasOwnProperty(key)) {
            setProp(key, value, result);
        }
    });
    return result;
}

/**
 * Serialize IQuery into ISearchOptions for ArcGIS Portal
 * @param query
 * @returns
 */
function serializeQueryForPortal(query) {
    const filterSearchOptions = query.filters.map(serializeFilter);
    // remove any empty entries
    const nonEmptyOptions = filterSearchOptions.filter(removeEmptyEntries);
    const result = mergeSearchOptions(nonEmptyOptions, "AND");
    const bboxPredicate = getTopLevelPredicate("bbox", query.filters);
    if (bboxPredicate) {
        result.params = { bbox: bboxPredicate.bbox };
    }
    return result;
}
/**
 * Predicate to remove things from array
 * @param e
 * @returns
 */
function removeEmptyEntries(e) {
    return !(typeof e === "undefined" || e === null || e === "");
}
function mergeSearchOptions(options, operation) {
    const result = options.reduce((acc, entry) => {
        // walk the props
        Object.entries(entry).forEach(([key, value]) => {
            // if prop exists and is not empty string
            if (acc[key] && value !== "") {
                // combine via operation
                acc[key] = `${acc[key]} ${operation} ${value}`;
            }
            else {
                // just copy the value if it's not empty string
                if (value !== "") {
                    acc[key] = value;
                }
            }
        });
        return acc;
    }, { q: "" });
    return result;
}
/**
 * Serialize the filters in a FitlerGroup into a Portal Query
 * @param filter
 * @returns
 */
function serializeFilter(filter) {
    const operation = filter.operation || "AND";
    const predicates = filter.predicates.map(expandPredicate);
    const predicateSearchOptions = predicates
        .map(serializePredicate)
        .filter((e) => e !== undefined && e !== null);
    // combine these searchOptions
    const searchOptions = mergeSearchOptions(predicateSearchOptions, operation);
    // wrap in parens if we have more than one predicate
    if (predicates.length > 1) {
        searchOptions.q = `(${searchOptions.q})`;
    }
    return searchOptions;
}
/**
 * Serialize a Filter into a Portal Query
 * @param predicate
 * @returns
 */
function serializePredicate(predicate) {
    const dateProps = ["created", "modified"];
    const boolProps = ["isopendata", "isviewonly"];
    // In order to not get "expanded", these also need to be listed
    // in the `expandPredicate` function
    const passThroughProps = [
        "searchUserAccess",
        "searchUserName",
        "memberType",
        "name",
        "categoriesAsParam",
        "categoryFilter",
        "bbox",
        "joined",
    ];
    const specialProps = [
        "filterType",
        "term",
        ...dateProps,
        ...boolProps,
        ...passThroughProps,
    ];
    const portalAllowList = [
        "access",
        "capabilities",
        "created",
        "categories",
        "categoriesAsParam",
        "categoryFilter",
        "description",
        "disabled",
        "email",
        "emailstatus",
        "firstname",
        "fullname",
        "group",
        "id",
        "isInvitationOnly",
        "isopendata",
        "joined",
        "lastlogin",
        "lastname",
        "memberType",
        "modified",
        "name",
        "orgid",
        "orgIds",
        "owner",
        "provider",
        "role",
        "searchUserAccess",
        "searchUserName",
        "snippet",
        "tags",
        "term",
        "title",
        "type",
        "typekeywords",
        "userlicensetype",
        "username",
        "isviewonly",
    ];
    // TODO: Look at using reduce vs .map and remove the `.filter`
    const opts = Object.entries(predicate)
        .map(([key, value]) => {
        // When serializing for portal we limit predicate properties to
        // a list of known properties that the portal api accepts. This will
        // not attempt to ensure the properties are used in the correct combinations
        if (portalAllowList.includes(key)) {
            const so = { q: "" };
            if (!specialProps.includes(key) && key !== "term") {
                so.q = serializeMatchOptions(key, value);
            }
            if (dateProps.includes(key) || isRange(value)) {
                so.q = serializeRange(key, value);
            }
            if (boolProps.includes(key)) {
                so.q = `${key}:${value}`;
            }
            if (passThroughProps.includes(key)) {
                // Because the groups/:id/userlist API takes a specific format for
                // `joined` (dates), therefore for group members, we have to
                // add a separate `joined` field with the specific format for the value
                if (key === "joined") {
                    so[key] = `${value.from},${value.to}`;
                }
                else {
                    so[key] = value;
                }
            }
            if (key === "term") {
                so.q = value;
            }
            return so;
        }
    })
        .filter(removeEmptyEntries);
    // merge up all the searchOptions
    if (opts.length) {
        const searchOptions = mergeSearchOptions(opts, "AND");
        if (searchOptions.q) {
            searchOptions.q = `(${searchOptions.q})`;
        }
        return searchOptions;
    }
    else {
        return null;
    }
}
/**
 * Serialize MatchOptions into portal syntax
 * @param key
 * @param value
 * @returns
 */
function serializeMatchOptions(key, value) {
    var _a, _b, _c;
    let result = "";
    if ((_a = value.any) === null || _a === void 0 ? void 0 : _a.length) {
        result = `${serializeStringOrArray("OR", key, value.any)}`;
    }
    if ((_b = value.all) === null || _b === void 0 ? void 0 : _b.length) {
        result =
            (result ? result + " AND " : "") +
                `${serializeStringOrArray("AND", key, value.all)}`;
    }
    if ((_c = value.not) === null || _c === void 0 ? void 0 : _c.length) {
        // negate the entries if they are not
        result =
            (result ? result + " AND " : "") +
                `${serializeStringOrArray("OR", `-${key}`, value.not)}`;
    }
    return result;
}
/**
 * Serialize a range into Portal syntax
 * @param key
 * @param range
 * @returns
 */
function serializeRange(key, range) {
    return `${key}:[${range.from} TO ${range.to}]`;
}
/**
 * Serialize a `string` or `string[]` into a string
 * @param join
 * @param key
 * @param value
 * @returns
 */
function serializeStringOrArray(join, key, value) {
    let q = "";
    if (Array.isArray(value) && value.length) {
        q = `${key}:"${value.join(`" ${join} ${key}:"`)}"`;
        if (value.length > 1) {
            q = `(${q})`;
        }
    }
    else {
        q = `${key}:"${value}"`;
    }
    return q;
}
/**
 * Determines if the given value is a range object
 * @param value A search param value
 * @returns true when the value is a range object, e.g. { from: '0', to: '{' }
 */
function isRange(value) {
    return (typeof value === "object" &&
        value !== null &&
        ["from", "to"].every((key) => typeof value[key] !== "undefined"));
}

/**
 * Returns an Array of IPropertyMap objects
 * that define the projection of properties from a IModel to an IHubPage
 * @returns
 * @private
 */
function getPropertyMap$4() {
    const map = getBasePropertyMap();
    /**
     * page-specific mappings.
     */
    // map.push({ entityKey: "permissions", storeKey: "data.permissions" });
    const valueProps = ["headContent", "layout"];
    valueProps.forEach((entityKey) => {
        map.push({ entityKey, storeKey: `data.values.${entityKey}` });
    });
    return map;
}

/**
 * Compute the links that get appended to a Hub Site
 * search result and entity
 *
 * @param item
 * @param requestOptions
 */
function computeLinks$3(item, requestOptions) {
    const links = computeItemLinks(item, requestOptions);
    // re-compute the site relative link to include the id
    // NOTE: when we expand this beyond pages we should drop this override
    // and just pass true to getItemIdentifier in computeItemLinks
    const siteRelative = getHubRelativeUrl(item.type, getItemIdentifier(item, true), item.typeKeywords);
    return Object.assign(Object.assign({}, links), { 
        // add id to site relative link
        siteRelative, 
        // add the layout relative link
        layoutRelative: `/pages/${item.id}/edit` });
}

/**
 * Given a model and a page, set various computed properties that can't be directly mapped
 * @private
 * @param model
 * @param page
 * @param requestOptions
 * @returns
 */
function computeProps$3(model, page, requestOptions) {
    var _a;
    let token;
    // istanbul ignore next - this logic is covered elsewhere and should be refactored into a shared util
    if (requestOptions.authentication) {
        const session = requestOptions.authentication;
        token = session.token;
    }
    // compute base properties on page
    page = computeItemProps(model.item, page);
    // thumbnail url
    const thumbnailUrl = getItemThumbnailUrl(model.item, requestOptions, token);
    // TODO: Remove this once opendata-ui starts using `links.thumbnail` instead
    page.thumbnailUrl = thumbnailUrl;
    page.links = computeLinks$3(model.item, requestOptions);
    /**
     * Features that can be disabled by the entity owner
     * NOTE: Pages do not have any features that can be disabled
     */
    page.features = processEntityFeatures(((_a = model.data.settings) === null || _a === void 0 ? void 0 : _a.features) || {}, PageDefaultFeatures);
    // cast b/c this takes a partial but returns a full page
    return page;
}

const HUB_PAGE_ITEM_TYPE = "Hub Page";
const ENTERPRISE_PAGE_ITEM_TYPE = "Site Page";
const PAGE_TYPE_KEYWORD = "hubPage";
/**
 * Default values of a IHubPage
 */
const DEFAULT_PAGE = {
    name: "",
    permissions: [],
    schemaVersion: 1,
    tags: [],
    typeKeywords: [PAGE_TYPE_KEYWORD],
    view: {
        contacts: [],
        featuredContentIds: [],
        showMap: true,
    },
    layout: {
        sections: [],
    },
};
/**
 * Default values for a new HubPage Model
 */
const DEFAULT_PAGE_MODEL = {
    item: {
        type: HUB_PAGE_ITEM_TYPE,
        title: "",
        description: "",
        snippet: "",
        tags: [],
        typeKeywords: [PAGE_TYPE_KEYWORD],
        properties: {
            slug: "",
            schemaVersion: 1,
        },
    },
    data: {
        values: {
            layout: {},
        },
    },
};

/**
 * @private
 * Create a new Hub Page item
 *
 * Minimal properties are name and org
 *
 * @param partialPage
 * @param requestOptions
 */
async function createPage(partialPage, requestOptions) {
    // merge incoming with the default
    // this expansion solves the typing somehow
    const page = Object.assign(Object.assign({}, DEFAULT_PAGE), partialPage);
    // Create a slug from the title if one is not passed in
    if (!page.slug) {
        page.slug = constructSlug(page.name, page.orgUrlKey);
    }
    // Ensure slug is  unique
    await ensureUniqueEntitySlug(page, requestOptions);
    // Map page object onto a default page Model
    const mapper = new PropertyMapper(getPropertyMap$4());
    // create model from object, using the default model as a starting point
    let model = mapper.entityToStore(page, cloneObject(DEFAULT_PAGE_MODEL));
    // create the item
    model = await createModel(model, requestOptions);
    // map the model back into a IHubPage
    let newPage = mapper.storeToEntity(model, {});
    newPage = computeProps$3(model, newPage, requestOptions);
    // and return it
    return newPage;
}
/**
 * @private
 * Update a Hub Page
 * @param page
 * @param requestOptions
 */
async function updatePage(page, requestOptions) {
    // verify that the slug is unique, excluding the current page
    await ensureUniqueEntitySlug(page, requestOptions);
    // get the backing item & data
    const model = await getModel(page.id, requestOptions);
    // create the PropertyMapper
    const mapper = new PropertyMapper(getPropertyMap$4());
    // Note: Although we are fetching the model, and applying changes onto it,
    // we are not attempting to handle "concurrent edit" conflict resolution
    // but this is where we would apply that sort of logic
    const modelToUpdate = mapper.entityToStore(page, model);
    // update the backing item
    const updatedModel = await updateModel(modelToUpdate, requestOptions);
    // now map back into a page and return that
    let updatedPage = mapper.storeToEntity(updatedModel, page);
    updatedPage = computeProps$3(model, updatedPage, requestOptions);
    // the casting is needed because modelToObject returns a `Partial<T>`
    // where as this function returns a `T`
    return updatedPage;
}
/**
 * @private
 * Get a Hub Page by id or slug
 * @param identifier item id or slug
 * @param requestOptions
 */
async function fetchPage(identifier, requestOptions) {
    const item = await fetchItem(identifier, requestOptions);
    return item ? convertItemToPage(item, requestOptions) : null;
}
/**
 * @internal
 * Convert an IModel for a Hub Page Item into an IHubPage
 * @param model
 * @param requestOptions
 * @returns
 */
function convertModelToPage(model, requestOptions) {
    const mapper = new PropertyMapper(getPropertyMap$4());
    const prj = mapper.storeToEntity(model, {});
    return computeProps$3(model, prj, requestOptions);
}
/**
 * @private
 * Convert an Hub Page Item into a Hub Page, fetching any additional
 * information that may be required
 * @param item
 * @param auth
 * @returns
 */
async function convertItemToPage(item, requestOptions) {
    const model = await fetchModelFromItem(item, requestOptions);
    // TODO: In the future we will handle the boundary fetching from resource
    return convertModelToPage(model, requestOptions);
}
/**
 * @private
 * Remove a Hub Page
 * @param id
 * @param requestOptions
 */
async function deletePage(id, requestOptions) {
    const ro = Object.assign(Object.assign({}, requestOptions), { id });
    await removeItem(ro);
    return;
}
/**
 * Fetch Page specific Enrichments
 * @param item
 * @param include
 * @param requestOptions
 * @returns
 */
async function enrichPageSearchResult(item, include, requestOptions) {
    // Create the basic structure
    const result = {
        access: item.access,
        id: item.id,
        type: item.type,
        name: item.title,
        owner: item.owner,
        typeKeywords: item.typeKeywords,
        tags: item.tags,
        categories: item.categories,
        summary: item.snippet || item.description,
        createdDate: new Date(item.created),
        createdDateSource: "item.created",
        updatedDate: new Date(item.modified),
        updatedDateSource: "item.modified",
        family: getFamily(item.type),
        links: {
            self: "not-implemented",
            siteRelative: "not-implemented",
            thumbnail: "not-implemented",
        },
        location: deriveLocationFromItem(item),
        rawResult: item,
    };
    // default includes
    const DEFAULTS = [];
    // merge includes
    include = [...DEFAULTS, ...include].filter(unique);
    // Parse the includes into a valid set of enrichments
    const specs = include.map(parseInclude);
    // Extract out the low-level enrichments needed
    const enrichments = mapBy("enrichment", specs).filter(unique);
    // fetch the enrichments
    let enriched = {};
    if (enrichments.length) {
        // TODO: Look into caching for the requests in fetchItemEnrichments
        enriched = await fetchItemEnrichments(item, enrichments, requestOptions);
    }
    // map the enriched props onto the result
    specs.forEach((spec) => {
        result[spec.prop] = getProp(enriched, spec.path);
    });
    // Handle links
    result.links = computeLinks$3(item, requestOptions);
    return result;
}

/**
 * Returns an Array of IPropertyMap objects
 * that define the projection of properties from a IGroup to an IHubGroup
 * @returns
 * @private
 */
function getPropertyMap$3() {
    const map = [];
    /**
     * group-specific mappings
     */
    map.push({ entityKey: "name", storeKey: "title" });
    map.push({ entityKey: "summary", storeKey: "snippet" });
    map.push({ entityKey: "permissions", storeKey: "properties.permissions" });
    // features is intentionally left out
    const groupProps = [
        "access",
        "autoJoin",
        "description",
        "id",
        "isInvitationOnly",
        "isDiscussable",
        "isReadOnly",
        "isViewOnly",
        "membershipAccess",
        "owner",
        "orgId",
        "protected",
        "sortField",
        "sortOrder",
        "tags",
        "thumbnail",
        "thumbnailUrl",
        "typeKeywords",
        "userMembership",
        "isOpenData",
        "hiddenMembers",
        "leavingDisallowed",
    ];
    groupProps.forEach((entry) => {
        map.push({ entityKey: entry, storeKey: entry });
    });
    return map;
}

/**
 * Convert a Hub Group to an IGroup
 * @param hubGroup
 */
function convertHubGroupToGroup(hubGroup) {
    // take the _join props and map them to isInvitationOnly and autoJoin
    switch (hubGroup._join) {
        case "invite":
            hubGroup.isInvitationOnly = true;
            hubGroup.autoJoin = false;
            break;
        case "request":
            hubGroup.isInvitationOnly = false;
            hubGroup.autoJoin = false;
            break;
        case "auto":
            hubGroup.isInvitationOnly = false;
            hubGroup.autoJoin = true;
            break;
    }
    const mapper = new PropertyMapper(getPropertyMap$3());
    const group = mapper.entityToStore(hubGroup, {});
    // convert isSharedUpdate to the updateitemcontrol capability
    if (hubGroup.isSharedUpdate) {
        group.capabilities = "updateitemcontrol";
    }
    // convert the values for membershipAccess back to
    // the ones the API accepts
    if (group.membershipAccess === "organization") {
        group.membershipAccess = "org";
    }
    if (group.membershipAccess === "collaborators") {
        group.membershipAccess = "collaboration";
    }
    // since we are setting null to a prop, we need to
    // send clearEmptyFields: true to the updateGroup call
    if (group.membershipAccess === "anyone") {
        group.membershipAccess = "";
        group._clearEmptyFields = true;
    }
    return group;
}

// These will be spied on in tests
/**
 * Remove an entry from the domain service, based on a hostname
 *
 * Callers must ensure the user is a member of the org that
 * owns the domain entry else the call will fail.
 * @param hostname
 * @param hubRequestOptions
 */
async function removeDomainByHostname(hostname, hubRequestOptions) {
    if (hubRequestOptions.isPortal) {
        throw new Error(`removeDomainByHostname is not available in ArcGIS Enterprise. Instead, edit the hubdomain typekeyword on the item`);
    }
    try {
        const domainEntry = await lookupDomain(hostname, hubRequestOptions);
        // Could consider doing a check here to verify that current user
        // is member of the org owning the domain record, but api will
        // enforce this.
        const id = getProp(domainEntry, "id");
        if (id) {
            await removeDomain(id, hubRequestOptions);
        }
    }
    catch (ex) {
        throw new Error(`Error removing domain entry for ${hostname}: ${ex}`);
    }
}

/**
 * Returns site model given various kinds of identifier
 *
 * @param identifier - a site item ID, site hostname, enterprise site slug, or full site URL
 * @param hubRequestOptions
 */
function fetchSiteModel(identifier, hubRequestOptions) {
    let prms;
    if (isGuid(identifier)) {
        prms = getSiteById(identifier, hubRequestOptions);
    }
    else {
        let hostnameOrSlug = identifier;
        // get down the the hostname
        hostnameOrSlug = stripProtocol(hostnameOrSlug);
        hostnameOrSlug = hostnameOrSlug.split("/")[0];
        prms = lookupDomain(hostnameOrSlug, hubRequestOptions).then(({ siteId }) => getSiteById(siteId, hubRequestOptions));
    }
    return prms;
}

/**
 * Given two site models, determine the domain changes and apply them
 * @param currentModel
 * @param updatedModel
 * @param requestOptions
 * @private
 */
async function handleDomainChanges(updatedModel, currentModel, requestOptions) {
    const defaultDomainRecord = {
        clientKey: updatedModel.data.values.clientId,
        orgId: requestOptions.portalSelf.id,
        orgTitle: requestOptions.portalSelf.name,
        orgKey: requestOptions.portalSelf.urlKey,
        siteId: updatedModel.item.id,
        siteTitle: updatedModel.item.title,
        sslOnly: true,
    };
    const domainChanges = {
        remove: [],
        add: [],
    };
    ["customHostname", "defaultHostname"].forEach((key) => {
        const currentValue = getProp(currentModel, `data.values.${key}`) || "";
        const updatedValue = getProp(updatedModel, `data.values.${key}`) || "";
        if (updatedValue !== currentValue) {
            domainChanges.remove.push(currentValue);
            domainChanges.add.push(updatedValue);
        }
    });
    const domainChangePromises = [];
    // handle additions
    domainChanges.add.map((hostname) => {
        const domainOpts = Object.assign({ hostname }, defaultDomainRecord);
        domainChangePromises.push(addDomain(domainOpts, requestOptions));
    });
    // handle removals
    domainChanges.remove.map((hostname) => {
        domainChangePromises.push(removeDomainByHostname(hostname, requestOptions));
    });
    return Promise.all(domainChangePromises);
    // TODO: Error handling & OperationStack
}

/**
 * Informal migration that creates default permission policies based on the
 * Content and Collaboration Groups
 * @param model
 */
function applyPermissionMigration(model) {
    // TODO: Once we formalize the permission mapping we need to
    // bump the current schema version, and add it here so this gets
    // applied once and then never again.
    // const PERMISSION_SCHEMA_VERSION = 1.6
    // if (
    //   getProp(model, "item.properties.schemaVersion") >= PERMISSION_SCHEMA_VERSION
    // )
    //   return model;
    const clone = cloneObject(model);
    clone.data.permissions = clone.data.permissions || [];
    const permissionMigrations = [
        // Per discussion with @jaydev on 2022-12-01 we are going to
        // allow content team members to create projects in the context
        // of a site
        {
            prop: "item.properties.contentGroupId",
            type: "group",
            permissions: ["hub:project:create"],
        },
        {
            prop: "item.owner",
            type: "user",
            permissions: ["hub:site:delete"],
        },
    ];
    permissionMigrations.forEach((defn) => {
        const value = getProp(clone, defn.prop);
        if (value) {
            defn.permissions.forEach((permission) => {
                const present = clone.data.permissions.find((p) => p.permission === permission && p.collaborationId === value);
                if (!present) {
                    clone.data.permissions.push({
                        permission,
                        collaborationType: defn.type,
                        collaborationId: value,
                    });
                }
            });
        }
    });
    // TODO: Uncomment when we formalize the schema version this applies to
    // clone.item.properties.schemaVersion = PERMISSION_SCHEMA_VERSION;
    return clone;
}

/**
 * Compute the links that get appended to a Hub Site
 * search result and entity
 *
 * @param item
 * @param requestOptions
 */
function computeLinks$2(item, requestOptions) {
    const links = computeItemLinks(item, requestOptions);
    return Object.assign(Object.assign({}, links), { 
        // for sites we use the site's url as the self link
        self: item.url, 
        // add the layout relative link
        layoutRelative: "/edit" });
}

/**
 * Given a model and a site, set various computed properties that can't be directly mapped
 * @private
 * @param model
 * @param site
 * @param requestOptions
 * @returns
 */
function computeProps$2(model, site, requestOptions) {
    var _a;
    let token;
    if (requestOptions.authentication) {
        const session = requestOptions.authentication;
        token = session.token;
    }
    // compute base properties on site
    site = computeItemProps(model.item, site);
    // thumbnail url
    const thumbnailUrl = getItemThumbnailUrl(model.item, requestOptions, token);
    // TODO: Remove this once opendata-ui starts using `links.thumbnail` instead
    site.thumbnailUrl = thumbnailUrl;
    site.links = computeLinks$2(model.item, requestOptions);
    /**
     * Features that can be disabled by the entity owner
     */
    site.features = processEntityFeatures(((_a = model.data.settings) === null || _a === void 0 ? void 0 : _a.features) || {}, SiteDefaultFeatures);
    // Perform schema upgrades on the new catalog structure
    site.catalog = upgradeCatalogSchema(site.catalog);
    // cast b/c this takes a partial but returns a full site
    return site;
}

/**
 * Returns an Array of IPropertyMap objects
 * We could define these directly, but since the
 * properties of IHubSite map directly to properties
 * on item or data, it's slightly less verbose to
 * generate the structure.
 * @returns
 */
function getPropertyMap$2() {
    const map = getBasePropertyMap();
    // Site specific mappings
    map.push({ entityKey: "feeds", storeKey: "data.feeds" });
    map.push({ entityKey: "permissions", storeKey: "data.permissions" });
    // Props stored below `data.values`
    const valueProps = [
        "pages",
        "theme",
        "subdomain",
        "defaultHostname",
        "customHostname",
        "clientId",
        "defaultExtent",
        "map",
        "headerSass",
        "headContent",
        "layout",
        "isUmbrella",
    ];
    valueProps.forEach((entry) => {
        map.push({ entityKey: entry, storeKey: `data.values.${entry}` });
    });
    // Capabilities
    map.push({ entityKey: "events", storeKey: "data.events" });
    map.push({ entityKey: "initiatives", storeKey: "data.initiatives" });
    map.push({ entityKey: "projects", storeKey: "data.projects" });
    map.push({ entityKey: "content", storeKey: "data.content" });
    // Deeper/Indirect mappings
    map.push({
        entityKey: "slug",
        storeKey: "item.properties.slug",
    });
    map.push({
        entityKey: "followersGroupId",
        storeKey: "item.properties.followersGroupId",
    });
    map.push({
        entityKey: "legacyCapabilities",
        storeKey: "data.values.capabilities",
    });
    map.push({
        entityKey: "orgUrlKey",
        storeKey: "item.properties.orgUrlKey",
    });
    map.push({
        entityKey: "name",
        storeKey: "item.title",
    });
    map.push({
        entityKey: "location",
        storeKey: "item.properties.location",
    });
    map.push({
        entityKey: "legacyTeams",
        storeKey: "item.properties.teams",
    });
    map.push({
        entityKey: "isHubHome",
        storeKey: "item.properties.isHubHome",
    });
    map.push({ entityKey: "catalog", storeKey: "data.catalog" });
    map.push({
        entityKey: "features",
        storeKey: "data.settings.features",
    });
    map.push({
        entityKey: "telemetry",
        storeKey: "data.telemetry",
    });
    return map;
}

/**
 * Add the default catalog structure to the Site model
 * Note: This in-memory migration is only applies via `fetchSite(..):IHubSite` and not
 * the older `getSiteById(...):IModel`. Changes made in this migration will not be
 * persisted to AGO until all other parts of the application stop relying on the legacy
 * catalog implementation
 * @param model
 * @returns
 */
function applyCatalogStructureMigration(model) {
    const siteCatalog = getWithDefault(model.data, "catalog", {});
    // This _shouldn't_ happen, but some of our testing sites might have this
    // migration already persisted in AGO. In that case, we ignore and move on
    if (!siteCatalog.schemaVersion) {
        const clonedModel = cloneObject(model);
        clonedModel.data.catalog = upgradeCatalogSchema(siteCatalog);
        // applyCatalogSchema sets the catalog to `Default Catalog` but this fn previously
        // set it to `Default Site Catalog`. Overriding title to `Default Site Catalog` here
        // to prevent any potential regressions
        clonedModel.data.catalog.title = "Default Site Catalog";
        return clonedModel;
    }
    return model;
}

var SearchCategories;
(function (SearchCategories) {
    SearchCategories["DATA"] = "components.search.category_tabs.data";
    SearchCategories["SITES"] = "components.search.category_tabs.sites";
    SearchCategories["DOCUMENTS"] = "components.search.category_tabs.documents";
    SearchCategories["APPS_AND_MAPS"] = "components.search.category_tabs.apps_and_maps";
    // The following entries are currently used, but will be phased out
    SearchCategories["EVENTS"] = "components.search.category_tabs.events";
    SearchCategories["INITIATIVES"] = "components.search.category_tabs.initiatives";
})(SearchCategories || (SearchCategories = {}));

/**
 * In-Memory migration that adds default collections to site models that have the
 * new catalog structure. These default collections will have the same names and
 * display order found in `site.data.values.searchCategories`
 *
 * This migration simplifies display logic, as consuming components no longer
 * have to merge `catalog.collections` with the default collection definitions.
 *
 * This migration also lays the foundation for customization, since editors will
 * be able to modify these persisted default objects. For example, editors can
 * change the default labels, display order, or mark a default as "hidden" so the
 * public can't see it.
 *
 * NOTE: The changes made in this migration will not be persisted to AGO at this time
 *
 * @param model site model to migrate
 * @returns a migrated model with default `IHubCollectionPersistance` objects added
 * to the catalog
 */
function applyDefaultCollectionMigration(model) {
    const baseCollectionKeys = [
        // TODO: add 'all' as a wellknown collection and figure out the
        // ramifications of doing so across the app. (or create a new
        // type that includes 'all')
        "all",
        "dataset",
        "document",
        "site",
        "appAndMap",
    ];
    const baseCollectionMap = baseCollectionKeys.reduce((map, key) => {
        map[key] = {
            // We chose to leave the label as "null" for a couple of reasons. First off,
            // the default collection names are supposed to be translated and we don't
            // have access to i18n services here. Second, because we temporarily have to
            // serialize changes from catalog.collections back to site.data.values.searchCategories
            // for backwards compatibility, we need a way to indicate whether a collection's
            // name has been explicitly set or if it is relying on the default translation.
            // As such, we only set the label on the collection object IFF an explicit
            // override text has been configured.
            label: null,
            key,
            include: [],
            targetEntity: "item",
            scope: {
                targetEntity: "item",
                collection: key,
                filters: [],
            },
        };
        return map;
    }, {});
    const searchCategoryToCollection = {
        [SearchCategories.DATA]: "dataset",
        // Unfortunately, the "site" search category has different keys depending on if the catalog
        // was created for a hub basic or hub premium site. As such, we just account for both.
        [SearchCategories.INITIATIVES]: "site",
        [SearchCategories.SITES]: "site",
        [SearchCategories.DOCUMENTS]: "document",
        [SearchCategories.APPS_AND_MAPS]: "appAndMap",
    };
    // Not every site has `data.values.searchCategories` saved, so we have to keep a bare-bones
    // copy of what the default objects are in opendata-ui.
    // NOTE: The `event` search category has been explicitly omitted. While the classic search view
    // allows for the searching of `events`, the new search view does not.
    const DEFAULT_SEARCH_CATEGORIES = [
        { key: SearchCategories.SITES, hidden: true },
        { key: SearchCategories.DATA },
        { key: SearchCategories.DOCUMENTS },
        { key: SearchCategories.APPS_AND_MAPS },
    ];
    const legacySearchCategories = model.data.values.searchCategories || DEFAULT_SEARCH_CATEGORIES;
    const configuredCollections = legacySearchCategories
        // The new search view doesn't currently allow for searching events
        .filter((searchCategory) => searchCategory.key !== SearchCategories.EVENTS)
        // Some sites have a borked `data.values.searchCategories` that explicitly includes the `all`
        // collection. We have this check to catch that and any other weird scenarios.
        .filter((searchCategory) => !!searchCategoryToCollection[searchCategory.key])
        .map((searchCategory) => {
        const collectionKey = searchCategoryToCollection[searchCategory.key];
        const collection = baseCollectionMap[collectionKey];
        collection.label = searchCategory.overrideText || null;
        collection.hidden = searchCategory.hidden;
        return collection;
    });
    // the "all" collection always goes first
    configuredCollections.unshift(baseCollectionMap.all);
    model.data.catalog.collections = configuredCollections;
    return model;
}

/**
 * Reflects changes from a site model's collections to the `site.data.values.searchCategories`
 * legacy property. This is a needed stop-gap since old search page will coexist for a time with
 * the new workspaces UI and the old search page (among others) still rely on the `searchCategories`
 * construct.
 *
 * @param model a site item model
 * @returns a model with the catalog collections and search categories in sync
 */
function reflectCollectionsToSearchCategories(model) {
    const clone = cloneObject(model);
    const collectionToSearchCategory = {
        dataset: SearchCategories.DATA,
        // NOTE: the `searchCategories` construct actually has two possible labels for the
        // `site` collection: "Sites" or "Initiatives". "Sites" is used if a site was created
        // with Hub Basic, "Initiatives" was used if a site was created with Hub Premium.
        // Since the new search page only uses "Sites", we've opted to ignore "Initiatives"
        site: SearchCategories.SITES,
        appAndMap: SearchCategories.APPS_AND_MAPS,
        document: SearchCategories.DOCUMENTS,
    };
    const searchCategoryToQueryParam = {
        [SearchCategories.DATA]: "Dataset",
        [SearchCategories.SITES]: "Site",
        [SearchCategories.APPS_AND_MAPS]: "App,Map",
        [SearchCategories.DOCUMENTS]: "Document",
    };
    const collections = clone.data.catalog.collections;
    const updatedSearchCategories = collections
        // We don't want to persist any non-standard collection as a search category,
        // such as the "all" collection
        .filter((c) => !!collectionToSearchCategory[c.key])
        .map((c) => {
        const searchCategoryKey = collectionToSearchCategory[c.key];
        const updated = {
            hidden: c.hidden,
            key: searchCategoryKey,
            queryParams: {
                collection: searchCategoryToQueryParam[searchCategoryKey],
            },
        };
        // If `c.label` is falsy, we assume that the UI should display the
        // default translated label for that collection. We also assume that if
        // `c.label` _does_ have a value, then it must be a configured override.
        if (c.label) {
            updated.overrideText = c.label;
        }
        return updated;
    });
    clone.data.values.searchCategories = updatedSearchCategories;
    return clone;
}

/**
 * Converts the migrated catalog of a site model back into a legacy catalog format.
 * As the new catalog format is much more flexible than the legacy format, only supported
 * fields configurations (i.e., group ids) are transferred.
 *
 * @param modelToUpdate modified site model with a migrated catalog
 * @param currentModel currently persisted site model with a legacy catalog
 * @returns site model with any catalog group changes reflected in a legacy format
 */
function convertCatalogToLegacyFormat(modelToUpdate, currentModel) {
    const updatedModel = cloneObject(modelToUpdate);
    const legacyCatalog = catalogToLegacy(updatedModel.data.catalog);
    // If the catalog has groups, we update the model with the legacy catalog
    if (legacyCatalog.groups.length) {
        updatedModel.data.catalog = legacyCatalog;
    }
    else {
        // This shouldn't happen, but in case something is malformed we protect the data integrity
        // by reverting to the catalog of the most recently fetched model
        updatedModel.data.catalog = cloneObject(currentModel.data.catalog);
        return updatedModel;
    }
    return updatedModel;
}
/**
 * Focused function converting an IHubCatalog to a legacy catalog format.
 * @param catalog
 * @returns
 */
function catalogToLegacy(catalog) {
    var _a;
    const legacyCatalog = {
        groups: [],
    };
    if ((_a = catalog.scopes) === null || _a === void 0 ? void 0 : _a.item) {
        const groupPredicate = getGroupPredicate(catalog.scopes.item);
        if (groupPredicate) {
            // using getWithDefault to side-step test coverage for a condition
            // we can't replicate in a typed environment
            legacyCatalog.groups = getWithDefault(groupPredicate, "group.any", []);
        }
    }
    return legacyCatalog;
}

/**
 * Site capabilities are currently saved as an array on the
 * site.data.values.capabilities. We want to migragte these
 * legacy capabilities over to features in the new permissions
 * system; however, we must continue persisting updates to
 * these features in the legacy capabilities array until the
 * existing site capabilities in our application are plumbed
 * to work off of permissions
 *
 * This function is called within updateSite to ensure
 * the legacy capabilities array is kept up-to-date
 *
 * TODO: Remove once site capabilities use permissions
 *
 * @param modelToUpdate
 * @param currentModel
 */
const convertFeaturesToLegacyCapabilities = (modelToUpdate, currentModel) => {
    let legacyCapabilityFeatureFlags = {};
    // 1. convert legacy capabilities to a feature flag hash
    (getProp(currentModel, "data.values.capabilities") || []).forEach((capability) => {
        legacyCapabilityFeatureFlags[capability] = true;
    });
    // 2. override legacy capabilities that are driven by features
    const features = getProp(modelToUpdate, "data.settings.features") || {};
    legacyCapabilityFeatureFlags = capabilityToFeatureMap.reduce((capabilities, map) => {
        // TODO: remove istanbul exception once we include a
        // legacy capability that satisfies the second condition
        /* istanbul ignore next */
        const featureFlag = map.negate
            ? !features[map.feature]
            : features[map.feature];
        return Object.assign(Object.assign({}, capabilities), { [map.capability]: featureFlag });
    }, legacyCapabilityFeatureFlags);
    // 3. convert legacy capabilities back to an array and persist on model
    const updatedCapabilities = Object.entries(legacyCapabilityFeatureFlags).reduce((acc, [key, value]) => {
        value && acc.push(key);
        return acc;
    }, []);
    setProp("data.values.capabilities", updatedCapabilities, modelToUpdate);
    return modelToUpdate;
};

const HUB_SITE_ITEM_TYPE = "Hub Site Application";
const ENTERPRISE_SITE_ITEM_TYPE = "Site Application";
/**
 * Default values of a IHubSite
 */
const DEFAULT_SITE = {
    name: "",
    tags: [],
    typeKeywords: ["Hub Site", "hubSite", "DELETEMESITE"],
    legacyCapabilities: [
        "api_explorer",
        "pages",
        "my_data",
        "social_logins",
        "json_chart_card",
        "document_iframes",
        "items_view",
        "app_page",
        "underlinedLinks",
        "globalNav",
        "socialSharing",
    ],
    catalog: {
        schemaVersion: 1,
    },
    subdomain: "",
    defaultHostname: "",
    customHostname: "",
    clientId: "",
    map: null,
    feeds: {},
    pages: [],
    theme: null,
    contentViews: {
        sidePanelOpen: {
            app: true,
            map: true,
            dataset: true,
            document: true,
            feedback: true,
        },
    },
    telemetry: {},
    layout: {
        sections: [],
        header: {
            component: {
                name: "site-header",
                settings: {
                    fullWidth: false,
                    title: "",
                    headerType: "default",
                    menuLinks: [],
                    schemaVersion: 3,
                    showTitle: true,
                },
            },
        },
    },
};
/**
 * Default values for a new HubSite Model
 */
const DEFAULT_SITE_MODEL = {
    item: {
        // type: intentionally left out as we need to
        // set that based on portal/enterprise
        title: "",
        description: "",
        snippet: "",
        tags: [],
        typeKeywords: ["Hub Site", "hubSite", "DELETEMESITE"],
        properties: {
            slug: "",
            orgUrlKey: "",
            defaultHostname: "",
            customHostname: "",
            clientId: "",
            subdomain: "",
            schemaVersion: 1.5,
        },
        url: "",
    },
    data: {
        catalog: {
            groups: [],
        },
        feeds: {},
        values: {
            title: "",
            defaultHostname: "",
            customHostname: "",
            subdomain: "",
            faviconUrl: "",
            uiVersion: "2.4",
            clientId: "",
            map: {
                basemaps: {},
            },
            defaultExtent: {},
            pages: [],
            theme: {},
            layout: {
                sections: [],
                header: {
                    component: {
                        name: "site-header",
                        settings: {
                            fullWidth: false,
                            iframeHeight: "150px",
                            iframeUrl: "",
                            links: [],
                            logoUrl: "",
                            title: "default site",
                            markdown: "",
                            headerType: "default",
                            schemaVersion: 3,
                            showLogo: true,
                            showTitle: true,
                            logo: {
                                display: {},
                                state: "valid",
                            },
                            shortTitle: "",
                            menuLinks: [],
                            socialLinks: {
                                facebook: {},
                                twitter: {},
                                instagram: {},
                                youtube: {},
                            },
                        },
                    },
                    showEditor: false,
                },
                footer: {
                    component: {
                        name: "site-footer",
                        settings: {
                            footerType: "none",
                            markdown: "",
                            schemaVersion: 2.1,
                        },
                    },
                    showEditor: false,
                },
            },
            contentViews: {
                sidePanelOpen: {
                    app: true,
                    map: true,
                    dataset: true,
                    document: true,
                    feedback: true,
                },
            },
        },
    },
};
// TODO: Add OperationStack & Error Handling
/**
 * Create a new Hub Site
 *
 * Minimum properties are `name` and `org`
 * @param partialSite
 * @param requestOptions
 */
async function createSite(partialSite, requestOptions) {
    const site = Object.assign(Object.assign({}, DEFAULT_SITE), partialSite);
    const portal = requestOptions.portalSelf;
    // Set the type based on the environment we are working in
    site.type = requestOptions.isPortal
        ? ENTERPRISE_SITE_ITEM_TYPE
        : HUB_SITE_ITEM_TYPE;
    // Create a slug from the title if one is not passed in
    if (!site.slug) {
        site.slug = constructSlug(site.name, site.orgUrlKey);
    }
    // Ensure slug is  unique
    await ensureUniqueEntitySlug(site, requestOptions);
    if (!site.subdomain) {
        site.subdomain = slugify(site.name);
    }
    site.subdomain = await ensureUniqueDomainName(site.subdomain, requestOptions);
    // Domains
    if (!requestOptions.isPortal) {
        // now that we know the subdomain is available, set the defaultHostname
        site.defaultHostname = `${site.subdomain}-${portal.urlKey}.${stripProtocol(getHubApiUrl(requestOptions))}`;
        // set the url
        site.url = `https://${site.customHostname ? site.customHostname : site.defaultHostname}`;
    }
    else {
        // Portal Sites use subdomain in hash based router
        site.typeKeywords.push(`hubsubdomain|${site.subdomain}`.toLowerCase());
        site.url = `${requestOptions.authentication.portal.replace(`/sharing/rest`, `/apps/sites`)}/#/${site.subdomain}`;
    }
    // Note:  We used to use adlib for this, but it's much harder to
    // use templates with typescript. i.e. you can't assign a string template
    // to a property defined as `IExtent` without using `as unknown as ...`
    // which basically removes typechecking
    site.orgUrlKey = portal.urlKey;
    // override only if not set...
    if (!site.theme) {
        site.theme = getOrgDefaultTheme(portal);
    }
    if (!site.defaultExtent) {
        site.defaultExtent = portal.defaultExtent;
    }
    if (!site.culture) {
        site.culture = portal.culture;
    }
    // pull the basemap from portalSelf
    if (!getProp(site, "map.basemaps.primary")) {
        setProp("map.basemaps.primary", portal.defaultBasemap, site);
    }
    // Put the title into the header
    if (!getProp(site, "layout.header.component.settings.title")) {
        setProp("layout.header.component.settings.title", site.name, site);
    }
    site.typeKeywords = setDiscussableKeyword(site.typeKeywords, site.isDiscussable);
    // Now convert the IHubSite into an IModel
    const mapper = new PropertyMapper(getPropertyMap$2());
    let model = mapper.entityToStore(site, cloneObject(DEFAULT_SITE_MODEL));
    // At this point `data.catalog` may have become a full IHubCatalog object due to an in-memory
    // migration. However, we can't persist an IHubCatalog in `data.catalog` without breaking
    // the application, since most of the app relies on the old catalog structure. As such,
    // we convert any changes made to the catalog scope into the old format and merge the changes
    // with the existing structure on the most current model.
    // TODO: Remove once the application is plumbed to work off an IHubCatalog
    if (getProp(model, "data.catalog.scopes")) {
        model.data.catalog = catalogToLegacy(model.data.catalog);
    }
    // create the backing item
    model = await createModel(model, requestOptions);
    // Register as an app
    // NOTE: Site registration needs to happen via the hub api domain api calls
    // See https://devtopia.esri.com/dc/hub/issues/6390 for info
    // Register domain and at the same time register the site as an application
    // for portal, this will return a single entry with just the clientKey
    const domainResponses = await addSiteDomains(model, requestOptions);
    model.data.values.clientId = domainResponses[0].clientKey;
    // update the model
    const updatedModel = await updateModel(model, requestOptions);
    // convert the model into a IHubSite and return
    return mapper.storeToEntity(updatedModel, {});
}
/**
 * Update a Hub Site
 *
 * This checks for and applies domain changes
 * @param site
 * @param requestOptions
 * @returns
 */
async function updateSite(site, requestOptions) {
    var _a, _b, _c, _d;
    // verify that the slug is unique, excluding the current site
    await ensureUniqueEntitySlug(site, requestOptions);
    site.typeKeywords = setDiscussableKeyword(site.typeKeywords, site.isDiscussable);
    // Fetch backing model from the portal
    const currentModel = await getModel(site.id, requestOptions);
    // Note: Although we are fetching the model, and applying changes onto it,
    // we are not attempting to handle "concurrent edit" conflict resolution
    // but this is where we would apply that sort of logic
    const mapper = new PropertyMapper(getPropertyMap$2());
    let modelToUpdate = mapper.entityToStore(site, currentModel);
    // ============================================================
    // Entity to Store can not handle scenarios where deep properties have been removed
    // via a run-time migration.
    // At this time we don't have a comprehensize solution for this, so we just remove
    // the well-known-invalid properties from the model here.
    // NOTES:
    // * Add test logic into the `describe("updateSite removes properties:"...` section
    // * We ignore coverage on the delete statements below because they
    // use the optional property chaining, but we don't want to add a bunch of
    // complex test cases just to satisfy the coverage tool.
    // The tests do verify that the properties are removed.
    // ============================================================
    // Old telemetry props: migrated to correct property path in _migrateTelemetryConfig
    /* istanbul ignore next */
    (_b = (_a = modelToUpdate.data) === null || _a === void 0 ? void 0 : _a.values) === null || _b === void 0 ? true : delete _b.telemetry;
    /* istanbul ignore next */
    (_d = (_c = modelToUpdate.item) === null || _c === void 0 ? void 0 : _c.properties) === null || _d === void 0 ? true : delete _d.telemetry;
    // handle any domain changes
    await handleDomainChanges(modelToUpdate, currentModel, requestOptions);
    // Because some old (but critical) application code still uses `data.values.searchCategories`
    // as the source of truth for collection display configuration, we port all display changes
    // in `data.catalog.collections` to the search category format.
    // TODO: Remove once the app no longer relies on `data.values.searchCategories`
    modelToUpdate = reflectCollectionsToSearchCategories(modelToUpdate);
    // At this point `data.catalog` has become a full IHubCatalog object due to an in-memory
    // migration. However, we can't persist an IHubCatalog in `data.catalog` without breaking
    // the application, since most of the app relies on the old catalog structure. As such,
    // we convert any changes made to the catalog scope into the old format and merge the changes
    // with the existing structure on the most current model.
    // TODO: Remove once the application is plumbed to work off an IHubCatalog
    modelToUpdate = convertCatalogToLegacyFormat(modelToUpdate, currentModel);
    /**
     * Site capabilities are currently saved as an array on the
     * site.data.values.capabilities. We want to migragte these
     * legacy capabilities over to features in the new permissions
     * system; however, we must continue persisting updates to
     * these features in the legacy capabilities array until the
     * existing site capabilities in our application are plumbed
     * to work off of permissions
     * TODO: Remove once site capabilities use permissions
     */
    modelToUpdate = convertFeaturesToLegacyCapabilities(modelToUpdate, currentModel);
    // send updates to the Portal API and get back the updated site model
    const updatedSiteModel = await updateModel(modelToUpdate, requestOptions);
    // convert that back into a IHubSite and return it
    const updatedSite = convertModelToSite(updatedSiteModel, requestOptions);
    return updatedSite;
}
/**
 * Remove a Hub Site
 *
 * This simply removes the Site item, and it's associated domain records.
 * This does not remove any Teams/Groups or content associated with the
 * Site
 * @param id
 * @param requestOptions
 * @returns
 */
async function deleteSite(id, requestOptions) {
    // For AGO we need to remove the domain records for the site
    if (!requestOptions.isPortal) {
        await removeDomainsBySiteId(id, requestOptions);
    }
    // now we can remove the item
    const ro = Object.assign(Object.assign({}, requestOptions), { id });
    await removeItem(ro);
    return;
}
/**
 * Returns site model given various kinds of identifier
 *
 * @param identifier - a site item ID, site hostname, enterprise site slug, or full site URL
 * @param requestOptions
 * @private // remove when we remove existing fetchSite function
 */
async function fetchSite(identifier, requestOptions) {
    // get the model
    const model = await fetchSiteModel(identifier, requestOptions);
    // convert to IHubSite
    return convertModelToSite(model, requestOptions);
}
/**
 * @internal
 * Convert an IModel for a Hub Site Item into an IHubSite
 * @param model
 * @param requestOptions
 * @returns
 */
function convertModelToSite(model, requestOptions) {
    // Add permissions based on Groups
    // This may get moved to a formal schema migration in the future but for now
    // we can do it here as there is no ux for managing permissions yet.
    let migrated = applyPermissionMigration(model);
    // Ensure we have the new Catalog structure
    migrated = applyCatalogStructureMigration(migrated);
    // Add default collections while preserving configuration from `data.values.searchCategories`
    migrated = applyDefaultCollectionMigration(migrated);
    // convert to site
    const mapper = new PropertyMapper(getPropertyMap$2());
    const site = mapper.storeToEntity(migrated, {});
    // compute additional properties
    return computeProps$2(model, site, requestOptions);
}
/**
 * Convert a Hub Site Application item into a Hub Site, fetching any
 * additional information that may be required
 * @param item
 * @param auth
 * @returns
 */
async function convertItemToSite(item, requestOptions) {
    const model = await fetchModelFromItem(item, requestOptions);
    return convertModelToSite(model, requestOptions);
}
/**
 * Fetch Site specific enrichments
 * @param item
 * @param include
 * @param requestOptions
 * @returns
 */
async function enrichSiteSearchResult(item, include, requestOptions) {
    // we send old hub sites through this enrichment and
    // artificially change their type so they appear to be
    // newer "Hub Site Application"s - note this change
    // won't actually be persisted
    item.type =
        item.type === "Web Mapping Application"
            ? "Hub Site Application"
            : item.type;
    // Create the basic structure
    const result = {
        access: item.access,
        id: item.id,
        type: item.type,
        name: item.title,
        owner: item.owner,
        typeKeywords: item.typeKeywords,
        tags: item.tags,
        categories: item.categories,
        summary: item.snippet || item.description,
        createdDate: new Date(item.created),
        createdDateSource: "item.created",
        updatedDate: new Date(item.modified),
        updatedDateSource: "item.modified",
        family: getFamily(item.type),
        links: {
            self: "not-implemented",
            siteRelative: "not-implemented",
            thumbnail: "not-implemented",
        },
        location: deriveLocationFromItem(item),
        rawResult: item,
    };
    // default includes
    const DEFAULTS = [];
    // merge includes
    include = [...DEFAULTS, ...include].filter(unique);
    // Parse the includes into a valid set of enrichments
    const specs = include.map(parseInclude);
    // Extract out the low-level enrichments needed
    const enrichments = mapBy("enrichment", specs).filter(unique);
    // fetch the enrichments
    let enriched = {};
    if (enrichments.length) {
        // TODO: Look into caching for the requests in fetchItemEnrichments
        enriched = await fetchItemEnrichments(item, enrichments, requestOptions);
    }
    // map the enriched props onto the result
    specs.forEach((spec) => {
        result[spec.prop] = getProp(enriched, spec.path);
    });
    // Handle links
    result.links = computeLinks$2(item, requestOptions);
    return result;
}

/**
 * Compute the links that get appended to a Hub Project
 * search result and entity
 *
 * @param item
 * @param requestOptions
 * @returns
 */
function computeLinks$1(item, requestOptions) {
    return computeItemLinks(item, requestOptions);
}

/**
 * Given a model and a project, set various computed properties that can't be directly mapped
 * @private
 * @param model
 * @param project
 * @param requestOptions
 * @returns
 */
function computeProps$1(model, project, requestOptions) {
    var _a, _b;
    let token;
    if (requestOptions.authentication) {
        const session = requestOptions.authentication;
        token = session.token;
    }
    // compute base properties on project
    project = computeItemProps(model.item, project);
    // thumbnail url
    project.thumbnailUrl = getItemThumbnailUrl(model.item, requestOptions, token);
    project.view = Object.assign(Object.assign({}, model.data.view), { featuredImageUrl: (_a = model.data.view) === null || _a === void 0 ? void 0 : _a.featuredImageUrl });
    // Ensure we have a catalog and that its at the current schema
    project.catalog = upgradeCatalogSchema(project.catalog || {});
    /**
     * Features that can be disabled by the entity owner
     */
    project.features = processEntityFeatures(((_b = model.data.settings) === null || _b === void 0 ? void 0 : _b.features) || {}, ProjectDefaultFeatures);
    project.links = computeLinks$1(model.item, requestOptions);
    // cast b/c this takes a partial but returns a full project
    return project;
}

/**
 * Returns an Array of IPropertyMap objects
 * that define the projection of properties from a IModel to an IHubProject
 * @returns
 * @private
 */
function getPropertyMap$1() {
    const map = getBasePropertyMap();
    // Type specific mappings
    map.push({ entityKey: "status", storeKey: "data.status" });
    // TOOD: Remove catalog and swap to using the content-capability-pane in the UI
    map.push({ entityKey: "catalog", storeKey: "data.catalog" });
    // Capabilities
    map.push({ entityKey: "content", storeKey: "data.content" });
    map.push({ entityKey: "events", storeKey: "data.events" });
    map.push({ entityKey: "permissions", storeKey: "data.permissions" });
    map.push({
        entityKey: "features",
        storeKey: "data.settings.features",
    });
    map.push({
        entityKey: "location",
        storeKey: "item.properties.location",
    });
    map.push({ entityKey: "metrics", storeKey: "item.properties.metrics" });
    return map;
}

/**
 * @private
 * Get a Hub Project by id or slug
 * @param identifier item id or slug
 * @param requestOptions
 */
async function fetchProject(identifier, requestOptions) {
    let getPrms;
    if (isGuid(identifier)) {
        // get item by id
        getPrms = getItem(identifier, requestOptions);
    }
    else {
        getPrms = getItemBySlug(identifier, requestOptions);
    }
    return getPrms.then((item) => {
        if (!item)
            return null;
        return convertItemToProject(item, requestOptions);
    });
}
/**
 * @private
 * Convert an Hub Project Item into a Hub Project, fetching any additional
 * information that may be required
 * @param item
 * @param auth
 * @returns
 */
async function convertItemToProject(item, requestOptions) {
    const model = await fetchModelFromItem(item, requestOptions);
    // TODO: In the future we will handle the boundary fetching from resource
    const mapper = new PropertyMapper(getPropertyMap$1());
    const prj = mapper.storeToEntity(model, {});
    return computeProps$1(model, prj, requestOptions);
}
/**
 * @private
 * Fetch project specific enrichments
 * @param item
 * @param include
 * @param requestOptions
 * @returns
 */
async function enrichProjectSearchResult(item, include, requestOptions) {
    // Create the basic structure
    const result = {
        access: item.access,
        id: item.id,
        type: item.type,
        name: item.title,
        owner: item.owner,
        typeKeywords: item.typeKeywords,
        tags: item.tags,
        categories: item.categories,
        summary: item.snippet || item.description,
        createdDate: new Date(item.created),
        createdDateSource: "item.created",
        updatedDate: new Date(item.modified),
        updatedDateSource: "item.modified",
        family: getFamily(item.type),
        links: {
            self: "not-implemented",
            siteRelative: "not-implemented",
            thumbnail: "not-implemented",
            workspaceRelative: "not-implemented",
        },
        location: deriveLocationFromItem(item),
        rawResult: item,
    };
    // default includes
    const DEFAULTS = [];
    // merge includes
    include = [...DEFAULTS, ...include].filter(unique);
    // Parse the includes into a valid set of enrichments
    const specs = include.map(parseInclude);
    // Extract out the low-level enrichments needed
    const enrichments = mapBy("enrichment", specs).filter(unique);
    // fetch the enrichments
    let enriched = {};
    if (enrichments.length) {
        // TODO: Look into caching for the requests in fetchItemEnrichments
        enriched = await fetchItemEnrichments(item, enrichments, requestOptions);
    }
    // map the enriched props onto the result
    specs.forEach((spec) => {
        result[spec.prop] = getProp(enriched, spec.path);
    });
    // Handle links
    // TODO: Link handling should be an enrichment
    result.links = computeLinks$1(item, requestOptions);
    return result;
}

/**
 * adds/updates the entity status typekeyword and returns
 * a new array of typekeywords
 * @param typeKeywords entity's current typekeywords
 * @param status entity status
 */
function setEntityStatusKeyword(typeKeywords, status) {
    // filter out the existing status typekeyword
    const filteredTypekeywords = typeKeywords.filter((typekeyword) => {
        return !typekeyword.startsWith("status|");
    });
    // add the new/updated status typekeyword
    filteredTypekeywords.push(`status|${status}`);
    return filteredTypekeywords;
}

/**
 * Transforms the IConfigurationValues into an object with IMetric and IMetricDisplayConfig to be saved on an entity or rendered in the ui.
 * @param values IConfigurationValues for the arcgis-hub-metric-card to use
 * @param metricId what should be the id of the transformed metric
 * @param entityInfo what should be the entityInfo of the transformed metric
 * @returns IMetricCardParams
 */
function editorToMetric(values = {
    displayType: "stat-card",
    metricId: undefined,
}, metricId, opts) {
    const { value, valueType, dynamicMetric } = values, config = __rest(values, ["value", "valueType", "dynamicMetric"]);
    const { layerId, itemId, field, statistic, serviceUrl, fieldType, sourceLink, sourceTitle, allowExpressionSet, expressionSet, legacyWhere, } = dynamicMetric || {};
    const { entityInfo, metricName } = opts || {};
    // create source
    const source = values.type === "dynamic"
        ? {
            type: "service-query",
            serviceUrl,
            layerId,
            field,
            statistic: statistic,
            where: legacyWhere
                ? legacyWhere
                : buildWhereClause(allowExpressionSet ? expressionSet : []),
        }
        : {
            type: "static-value",
            value,
            valueType,
        };
    // create metric
    const metric = {
        source,
        name: metricName || metricId,
        entityInfo: entityInfo || {
            id: undefined,
            name: undefined,
            type: undefined,
        },
        id: metricId,
    };
    delete config.itemId;
    // create card config
    const displayConfig = Object.assign(Object.assign({}, config), { displayType: config.displayType || "stat-card", visibility: config.visibility || MetricVisibility.hidden, metricId,
        // dynamic metric values
        fieldType,
        itemId,
        expressionSet,
        allowExpressionSet,
        statistic, 
        // if we are in dynamic mode and have a link, then we use that link
        // otherwise we use manually input sourceLink on card config
        sourceLink: values.type === "dynamic" && sourceLink ? sourceLink : config.sourceLink, sourceTitle: values.type === "dynamic" && sourceTitle
            ? sourceTitle
            : config.sourceTitle, allowLink: values.type === "dynamic" ? config.allowDynamicLink : config.allowLink, type: values.type });
    return { metric, displayConfig };
}
/**
 * Constructs a where clause from a given expression set.
 *
 * @param {Array} fields the available fields for a given dataset
 * @param {Object} values the selected values
 *
 * @returns {string} returns a string for the where clause query
 *
 * NOTE: currently returns string as a MATCH and everything else as BETWEEN
 */
function buildWhereClause(expressionSet = []) {
    const whereClause = expressionSet
        .map((expression) => {
        const { field, values, relationship } = expression;
        const escape = (value) => {
            // Ensure that the value has a .replace method
            // We encountered a case where the value was an empty object (unclear how this happened)
            // and it caused the site to go into an infinite loop and crash. This is a safeguard.
            return value.replace && value.replace(/(['])/g, "$1$1"); // currently only handles single quotes
        };
        // if we don't have values or field, or if it is an "incomplete" expression, do not include
        if (!values || !values.length || !field || !field.name) {
            return false;
        }
        let clause;
        switch (field.type) {
            case "esriFieldTypeString":
                // used for migrating over the old "like" clauses
                clause =
                    relationship === ExpressionRelationships.LIKE
                        ? `${field.name} like '%${values[0]}%'`
                        : `(${field.name} IN (${values
                            .map((value) => `'${escape(value)}'`)
                            .join(", ")}))`;
                break;
            case "esriFieldTypeDate":
                // just the first bounding value
                if (typeof values[0] === "string") {
                    clause = `${field.name} >= timestamp '${escape(values[0])} 00:00:00'`;
                }
                // just the second bounding value
                if (typeof values[1] === "string") {
                    clause = `${field.name} <= timestamp '${escape(values[1])} 23:59:59'`;
                }
                // if we have both, rewrite clause
                if (typeof values[0] === "string" &&
                    typeof values[1] === "string") {
                    clause = `${field.name} >= timestamp '${escape(values[0])} 00:00:00' AND ${field.name} <= timestamp '${escape(values[1])} 23:59:59'`;
                }
                break;
            default:
                // just the first bounding value
                if (!isNil(values[0])) {
                    clause = `(${field.name}) >= ${values[0]}`;
                }
                // just the second bounding value
                if (!isNil(values[1])) {
                    clause = `(${field.name}) <= ${values[1]}`;
                }
                // if we have both, rewrite clause
                if (!isNil(values[0]) && !isNil(values[1])) {
                    clause = `(${field.name}) >= ${values[0]} AND (${field.name}) <= ${values[1]}`;
                }
                break;
        }
        return clause;
    })
        .filter(Boolean)
        .join(" AND ") || "1=1";
    return encodeURIComponent(whereClause);
}

/**
 * Sets a given metric and metricDisplayConfig on an entity's metric and view.metricDisplays props.
 *
 * @param entity - should have metric and metricDisplays implemented
 * @param metric - IMetric
 * @param displayConfig - IMetricDisplayConfig configuration to display the metric in the ui
 *
 * Right now, this just accepts a HubProject; in the future as more entities support metrics,
 * other entities can be allowed.
 */
function setMetricAndDisplay(entity, metric, displayConfig) {
    const entityCopy = cloneObject(entity);
    const metricId = metric.id;
    // get with default in case we have an undefined metrics array
    const metrics = getWithDefault(entityCopy, "metrics", []);
    const mIndex = metrics.findIndex((m) => m.id === metricId);
    // get array in case of undefined displays array
    const displays = getWithDefault(entityCopy, "view.metricDisplays", []);
    const dIndex = displays.findIndex((d) => d.metricId === metricId);
    // existing vs new metric
    if (mIndex > -1) {
        metrics[mIndex] = metric;
    }
    else {
        metrics.push(metric);
    }
    // existing vs new display
    if (dIndex > -1) {
        displays[dIndex] = displayConfig;
    }
    else {
        displays.push(displayConfig);
    }
    // reset the arrays
    entityCopy.view.metricDisplays = displays;
    entityCopy.metrics = metrics;
    return entityCopy;
}

/**
 * @private
 * Returns an Array of IPropertyMap objects that
 * define the projection of properties from an
 * IModel to an IHubTemplate
 */
function getPropertyMap() {
    const map = getBasePropertyMap();
    // IHubTemplate specific mappings
    map.push({ entityKey: "previewUrl", storeKey: "item.properties.previewUrl" });
    return map;
}

/**
 * Compute the links that get appended to a Hub Template
 * search result and entity
 *
 * @param item
 * @param requestOptions
 */
function computeLinks(item, requestOptions) {
    var _a;
    const links = computeItemLinks(item, requestOptions);
    // If a solution template is deployed, we don't support
    // managing it in the workspace, so we kick users to AGO
    const isDeployed = (_a = item.typeKeywords) === null || _a === void 0 ? void 0 : _a.includes("Deployed");
    const { self, siteRelative, workspaceRelative } = links;
    // templates have an advanced edit link
    const advancedEditRelative = `${siteRelative
        .split("/")
        .slice(0, -1)
        .join("/")}/edit/advanced`;
    return Object.assign(Object.assign({}, links), { 
        // handle deployed templates
        workspaceRelative: isDeployed ? self : workspaceRelative, 
        // add advanced edit relative link
        advancedEditRelative });
}

/**
 * We do our best to glean what the solution template
 * is supposed to become when deployed. This util
 * extracts the expected item type from the
 * hubSolutionType typeKeyword on the solution item
 *
 * We use this in various UIs to show the expected
 * type rather than "Solution"
 *
 * @param template
 */
const getDeployedTemplateType = (template) => {
    let deployedType = "Solution";
    // 1. Extract the camelCase item type from the
    // hubSolutionType|<camel-case-item-type> typeKeyword
    const hubSolutionTypeKeyword = template.typeKeywords.find((keyword) => keyword.startsWith("hubSolutionType|"));
    // 2. Attempt to de-camelize the item type
    if (hubSolutionTypeKeyword) {
        const camelizedType = hubSolutionTypeKeyword.split("|")[1];
        deployedType = dasherize(camelizedType)
            .split("-")
            .map((str) => capitalize(str))
            .join(" ");
        // some item types need to be handled separately
        // because they don't follow the standard pattern
        const exceptionMap = {
            storyMap: "StoryMap",
        };
        if (exceptionMap[camelizedType]) {
            deployedType = exceptionMap[camelizedType];
        }
    }
    return deployedType;
};

/**
 * @private
 * Given a model and a template, set various computed
 * properties on the template that can't be directly
 * mapped from the model
 * @param model
 * @param template
 * @param requestOptions
 */
function computeProps(model, template, requestOptions) {
    // 1. compute base properties on template
    template = computeItemProps(model.item, template);
    // 2. compute relevant template links
    template.links = computeLinks(model.item, requestOptions);
    // 3. append the template's thumbnail url at the top-level
    template.thumbnailUrl = template.links.thumbnail;
    // 6. process features that can be disabled by the entity owner
    template.features = processEntityFeatures(getProp(model, "data.settings.features") || {}, TemplateDefaultFeatures);
    // 7. compute additional template-specific properties
    template.isDeployed = (getProp(model, "item.typeKeywords") || []).includes("Deployed");
    template.deployedType = getDeployedTemplateType(model.item);
    // 8. cast b/c this takes a partial but returns a full template
    return template;
}

/**
 * @private
 * Fetch a Hub Template backing item by id or slug
 * @param identifier item id or slug
 * @param requestOptions
 */
async function fetchTemplate(identifier, requestOptions) {
    let getPrms;
    if (isGuid(identifier)) {
        getPrms = getItem(identifier, requestOptions);
    }
    else {
        getPrms = getItemBySlug(identifier, requestOptions);
    }
    return getPrms.then((item) => {
        if (!item)
            return null;
        return convertItemToTemplate(item, requestOptions);
    });
}
/**
 * @private
 * Convert a Solution Item into a Hub Template, fetching
 * any additional information that may be required
 * @param item
 * @param auth
 */
async function convertItemToTemplate(item, requestOptions) {
    const model = await fetchModelFromItem(item, requestOptions);
    // 1. Create a property mapper between the the template
    // object and item model
    const mapper = new PropertyMapper(getPropertyMap());
    // 2. Map the item into an IHubTemplate
    const template = mapper.storeToEntity(model, {});
    // 3. Compute + set various properties on the IHubTemplate
    // that cannot be directly mapped from the item
    return computeProps(model, template, requestOptions);
}
/**
 * @private
 * Fetch template specific enrichments
 * @param item
 * @param include
 * @param requestOptions
 */
async function enrichTemplateSearchResult(item, include, requestOptions) {
    const result = {
        access: item.access,
        id: item.id,
        type: item.type,
        name: item.title,
        owner: item.owner,
        typeKeywords: item.typeKeywords,
        tags: item.tags,
        categories: item.categories,
        summary: item.snippet || item.description,
        createdDate: new Date(item.created),
        createdDateSource: "item.created",
        updatedDate: new Date(item.modified),
        updatedDateSource: "item.modified",
        family: getFamily(item.type),
        links: {
            self: "not-implemented",
            siteRelative: "not-implemented",
            thumbnail: "not-implemented",
            workspaceRelative: "not-implemented",
        },
        location: deriveLocationFromItem(item),
        rawResult: item,
    };
    // 1. optionally enrich the template item with
    // well-known item enrichments
    const DEFAULTS = [];
    // merge default and provided "include" enrichments
    include = [...DEFAULTS, ...include].filter(unique);
    // Parse the includes into a valid set of enrichments
    const specs = include.map(parseInclude);
    // Extract out the low-level enrichments needed
    const enrichments = mapBy("enrichment", specs).filter(unique);
    // fetch the enrichments
    let enriched = {};
    if (enrichments.length) {
        enriched = await fetchItemEnrichments(item, enrichments, requestOptions);
    }
    // map the enriched props onto the result
    specs.forEach((spec) => {
        result[spec.prop] = getProp(enriched, spec.path);
    });
    // 2. append relevant links onto the search result - these
    // are the same links that get appended to the template entity
    result.links = computeLinks(item, requestOptions);
    // 3. append additional template-specific properties
    result.deployedType = getDeployedTemplateType(item);
    return result;
}

/**
 * @private
 * Convert a portal aggregation structure into the HubAggregations structure
 * @param searchResults
 * @returns
 */
function convertPortalAggregations(searchResults) {
    var _a;
    if ((_a = searchResults.aggregations) === null || _a === void 0 ? void 0 : _a.counts) {
        return searchResults.aggregations.counts.map((entry) => {
            return {
                mode: "terms",
                field: entry.fieldName,
                values: entry.fieldValues,
            };
        });
    }
    else {
        return [];
    }
}

/**
 * @internal
 * Portal Search Implementation for Items returning IHubSearchResults
 * @param query
 * @param options
 * @returns
 */
async function portalSearchItems(query, options) {
    const queryWithDefaultPredicates = addDefaultItemSearchPredicates(query);
    const so = processSearchParams(options, queryWithDefaultPredicates);
    return searchPortalAsHubSearchResult(so);
}
/**
 * @internal
 * Portal Search for Items using IQuery and IHubSearchOptions
 * @param query
 * @param options
 * @returns
 */
function portalSearchItemsAsItems(query, options) {
    const so = processSearchParams(options, query);
    return searchPortalAsItem(so);
}
/**
 * DEPRECATED - use expandPortalQuery instead
 *
 *
 * @internal
 * Expand an IQuery by applying well-known filters and predicates,
 * and then expanding all the predicates into IMatchOption objects.
 * @param query `IQuery` to expand
 * @returns IQuery
 */
function expandQuery(query) {
    let updatedQuery = applyWellKnownCollectionFilters(query);
    // Expand well-known filterGroups
    // TODO: Should we remove this with the whole idea of collections?
    updatedQuery = applyWellKnownItemPredicates(updatedQuery);
    // Expand the individual predicates in each filter
    return expandPredicates(updatedQuery);
}
/**
 * Expand the predicates in a query without applying
 * the well-known type expansions
 * @param query
 * @returns
 */
function expandPredicates(query) {
    const clonedQuery = cloneObject(query);
    clonedQuery.filters = clonedQuery.filters.map((filter) => {
        filter.predicates = filter.predicates.map(expandPredicate);
        return filter;
    });
    return clonedQuery;
}
/**
 * Common preprocessing for search options and the query
 * @param options
 * @param query
 * @returns
 */
function processSearchParams(options, query) {
    var _a;
    if (!options.requestOptions) {
        throw new HubError("portalSearchItems", "options.requestOptions is required.");
    }
    const updatedQuery = expandPortalQuery(query);
    // Serialize the all the groups for portal
    const so = serializeQueryForPortal(updatedQuery);
    // Array of properties we want to copy from IHubSearchOptions to the ISearchOptions
    const props = [
        "num",
        "sortField",
        "sortOrder",
        "include",
        "start",
        "httpMethod",
        "requestOptions",
    ];
    // copy the props over
    props.forEach((prop) => {
        if (options.hasOwnProperty(prop)) {
            so[prop] = options[prop];
        }
    });
    if (options.requestOptions.authentication) {
        so.authentication = options.requestOptions.authentication;
    }
    else {
        so.portal = options.requestOptions.portal;
    }
    // Aggregations
    if ((_a = options.aggFields) === null || _a === void 0 ? void 0 : _a.length) {
        so.countFields = options.aggFields.join(",");
        so.countSize = options.aggLimit || 10;
    }
    return so;
}
/**
 * Internal portal search, which just returns IItems witn no conversion
 * Due to typescript complexity when adding multiple returns types to a function
 * it is simpler to have two functions that do the almost the same thing.
 * @param searchOptions
 * @returns
 */
async function searchPortalAsItem(searchOptions) {
    // Execute portal search
    const resp = await searchItems(searchOptions);
    // convert portal  aggregations into hub aggregations
    const aggregations = convertPortalAggregations(resp);
    // Construct the return
    return {
        total: resp.total,
        results: resp.results,
        aggregations,
        hasNext: resp.nextStart > -1,
        next: getNextFunction(searchOptions, resp.nextStart, resp.total, searchPortalAsItem),
        executedQuerySize: getKilobyteSizeOfQuery(searchOptions.q),
    };
}
/**
 * Internal portal search, which then converts `IItem`s to `IHubSearchResult`s
 * handling enrichments & includes along the way
 *
 * @param searchOptions
 * @returns
 */
async function searchPortalAsHubSearchResult(searchOptions) {
    // Execute portal search
    const resp = await searchItems(searchOptions);
    // create mappable fn that will handle the includes
    const fn = (item) => {
        return itemToSearchResult(item, searchOptions.include, searchOptions.requestOptions);
    };
    // map over results
    const results = await Promise.all(resp.results.map(fn));
    // convert portal  aggregations into hub aggregations
    const aggregations = convertPortalAggregations(resp);
    // Construct the return
    return {
        total: resp.total,
        results,
        aggregations,
        hasNext: resp.nextStart > -1,
        next: getNextFunction(searchOptions, resp.nextStart, resp.total, searchPortalAsHubSearchResult),
        executedQuerySize: getKilobyteSizeOfQuery(searchOptions.q),
    };
}
/**
 * Convert an `IItem` to a `IHubSearchResult`
 * Fetches the enrichments, and attaches them as directed in the `include` list
 * @param item
 * @param includes
 * @param requestOptions
 * @returns
 */
async function itemToSearchResult(item, includes = [], requestOptions) {
    // based on the type, we delegate to type-specific functions
    // this allows each type to apply "default" enrichments
    let fn = enrichContentSearchResult;
    switch (item.type) {
        case "Hub Site Application":
        case "Site Application":
            fn = enrichSiteSearchResult;
            break;
        case "Hub Page":
        case "Site Page":
            fn = enrichPageSearchResult;
            break;
        case "Hub Project":
            fn = enrichProjectSearchResult;
            break;
        case "Hub Initiative":
            fn = enrichInitiativeSearchResult;
            break;
        case "Solution":
            fn = enrichTemplateSearchResult;
            break;
        // handle old hub sites
        case "Web Mapping Application":
            if (item.typeKeywords.includes("hubSite")) {
                fn = enrichSiteSearchResult;
            }
            break;
    }
    return fn(item, includes, requestOptions);
}
const WellKnownItemPredicates = {
    $application: [
        {
            type: {
                any: [
                    "Web Mapping Application",
                    "Application",
                    "Insights",
                    "Web Experience",
                ],
                not: ["Insights Theme", "Insights Model"],
            },
            typekeywords: {
                not: ["hubSite", "Story Map"],
            },
        },
        {
            type: "Web Mapping Experience",
            typekeywords: "EXB Experience",
        },
    ],
    $dashboard: [
        {
            type: {
                any: ["Dashboard"],
                not: ["Operation View"],
            },
            typekeywords: {
                not: ["Extension", "ArcGIS Operation View"],
            },
        },
    ],
    $dataset: [
        {
            type: {
                any: [
                    "Scene Service",
                    "Feature Collection",
                    "Route Layer",
                    "Layer",
                    "Explorer Layer",
                    "Tile Package",
                    "Vector Tile Package",
                    "Scene Package",
                    "Layer Package",
                    "Feature Service",
                    "Stream Service",
                    "Map Service",
                    "Vector Tile Service",
                    "Image Service",
                    "WMS",
                    "WFS",
                    "WMTS",
                    "KML",
                    "KML Collection",
                    "Globe Service",
                    "CSV",
                    "Shapefile",
                    "GeoJson",
                    "Service Definition",
                    "File Geodatabase",
                    "CAD Drawing",
                    "Relational Database Connection",
                ],
                not: ["Web Mapping Application", "Geodata Service"],
            },
        },
        {
            typekeywords: ["OGC", "Geodata Service"],
        },
    ],
    $document: [
        {
            type: [
                "PDF",
                "Microsoft Excel",
                "Microsoft Word",
                "Microsoft Powerpoint",
                "iWork Keynote",
                "iWork Pages",
                "iWork Numbers",
                "Visio Document",
                "Document Link",
            ],
        },
    ],
    $initiative: [
        {
            type: "Hub Initiative",
            typekeywords: "hubInitiativeV2",
        },
    ],
    $experience: [
        {
            type: "Web Experience",
        },
    ],
    $feedback: [
        {
            type: "Form",
        },
    ],
    $page: [
        {
            typekeywords: "hubPage",
        },
    ],
    $site: [
        {
            type: ["Hub Site Application", "Site Application"],
        },
    ],
    $storymap: [
        {
            type: "Storymap",
        },
        {
            type: "Web Mapping Application",
            typekeywords: "Story Map",
        },
    ],
    $template: [
        {
            type: [
                "Web Mapping Application",
                "Hub Initiative",
                "Hub Initiative Template",
                "Solution",
            ],
            typekeywords: {
                any: ["hubInitiativeTemplate", "hubSolutionTemplate", "Template"],
                not: "Deployed",
            },
        },
    ],
    $webmap: [
        {
            type: {
                any: ["Web Map", "Web Scene"],
                not: "Web Mapping Application",
            },
        },
    ],
};
/**
 * @private
 * Add filter blocks from a well-known item collection if indicated.
 * This is meant to simplify query construction for common use cases.
 *
 * Only exported for testing.
 *
 * @param query query to add collection filters to
 * @returns a copy of the query with the additional filters
 */
function applyWellKnownCollectionFilters(query) {
    const updated = cloneObject(query);
    if (updated.collection) {
        const { collection, targetEntity, filters: queryFilters } = query;
        const wellKnownCollection = getWellknownCollection("", targetEntity, collection);
        const wellKnownFilters = getProp(wellKnownCollection, "scope.filters") || [];
        updated.filters = [...queryFilters, ...wellKnownFilters];
    }
    return updated;
}
/**
 * @private
 * Convert a Filter Group to expand well-known type filters
 *
 * The purpose of this function is to allow for the use of short-hand
 * names for commonly used, complex queries.
 *
 * It works by looking for filters using the .type property, the value
 * of which is a key in the WellKnownItemFilters hash. If found in the
 * hash, the filters array of the active filterGroup is replaced with the
 * filters specified in the hash.
 *
 * NOTE: Any other properties specified in a filter will be removed
 *
 * Only exported to enable extensive testing
 * @param query
 */
function applyWellKnownItemPredicates(query) {
    const queryClone = cloneObject(query);
    // iterate the filters
    queryClone.filters = queryClone.filters.map((filter) => {
        // replace predicates with well-known types
        let replacedPredicates = false;
        filter.predicates = filter.predicates.reduce((acc, predicate) => {
            // if the predicate has a well-known type
            // we replace it with the set of predicates defined
            // for the well-known type
            if (isWellKnownTypeFilter(predicate.type)) {
                const replacements = lookupTypePredicates(predicate.type);
                acc = [...acc, ...replacements];
                replacedPredicates = true;
            }
            else if (
            /**
             * NOTE: as of Nov. 26 2024, we have elected to start using the family types
             * for a type replacement rather than the entire replacement itself. This updates
             * a well-known predicate to only have type values, rather than types, typekeywords, etc etc.
             * We also use the family types to replace the type values. Almost all of our current type
             * replacements include typekeywords only to also retrieve old items -- i.e. having  -- we need to be aware
             * that by using family types, we are not including these old items in results in these cases.
             *
             * This clause is primarily used by custom-build catalogs using the new catalog editor.
             *
             * We specifically do not say that we have replaced filters here either as we want to leave the
             * operator as is.
             */
            predicate.type &&
                typeof predicate.type !== "string" &&
                !Array.isArray(predicate.type)) {
                // we have an IMatchOptions object, so we have to iterate over the all/any/not
                Object.keys(predicate.type).forEach((key) => {
                    const types = predicate.type[key];
                    // try to reduce the array if it is an array
                    if (Array.isArray(types)) {
                        // for each type, try to replace it with the family types if it is an expansion
                        predicate.type[key] = types.reduce((typesAcc, type) => {
                            if (isFamilyExpansionType(type)) {
                                // we need the type keyword without the dollar sign
                                const family = type.slice(1);
                                // get the family types from the given expansion
                                const familyTypes = getFamilyTypes(family);
                                typesAcc = [...typesAcc, ...familyTypes];
                            }
                            else {
                                typesAcc.push(type);
                            }
                            return typesAcc;
                        }, []);
                    }
                });
                // keep the updated predicate
                acc.push(predicate);
            }
            else {
                // this predicate does not have a well-known type
                // so we just keep it
                acc.push(predicate);
            }
            return acc;
        }, []);
        if (replacedPredicates) {
            // Any filter who's predicates were replaced with
            // well-known predicates, needs to use "OR" to ensure
            // correct query logic
            filter.operation = "OR";
        }
        return filter;
    });
    return queryClone;
}
/**
 * Is the argument a well-known type "key"
 *
 * Accepts `string`, `string[]` or `IMatchOptions`
 * but only string values can possibly be keys
 * on `WellKnownItemFilters`
 * @param key
 * @returns
 */
function isWellKnownTypeFilter(key) {
    let result = false;
    if (typeof key === "string") {
        result = key in WellKnownItemPredicates;
    }
    return result;
}
/**
 * Checks to see if our type is a family expansion,
 * i.e. our type is a key in HubFamilies and it begins with a dollar sign
 *
 * $content, $site, etc.
 * @param key
 * @returns
 */
function isFamilyExpansionType(key) {
    let result = false;
    // if we have a key, the first character of the key is a $, and the key without the $ is in Hub Families
    if (key &&
        key.charAt(0) === "$" &&
        HubFamilies.includes(key.slice(1))) {
        result = true;
    }
    return result;
}
/**
 * Return the predicates for a well-known type
 * @param key
 * @returns
 */
function lookupTypePredicates(key) {
    return WellKnownItemPredicates[key];
}

/**
 * @private
 * Helper function that locates group predicates and "negates" them
 * so we get a query that is `not in groups ...` vs `in groups ...`
 * @param query
 * @returns
 */
function negateGroupPredicates(query) {
    // if nothing is passed in just return undefined
    if (!query) {
        return;
    }
    const expanded = expandPredicates(query);
    // negate the group predicate on the query
    // we opted to be surgical about this vs attempting a `negateQuery(query)` function
    expanded.filters.forEach((f) => {
        f.predicates.forEach((p) => {
            if (p.group) {
                p.group.not = [...(p.group.any || []), ...(p.group.all || [])];
                p.group.any = [];
                p.group.all = [];
            }
        });
    });
    return expanded;
}

/**
 * @private
 * Create a new Hub Initiative item
 *
 * Minimal properties are name and orgUrlKey
 *
 * @param partialInitiative
 * @param requestOptions
 */
async function createInitiative(partialInitiative, requestOptions) {
    // merge incoming with the default
    // this expansion solves the typing somehow
    const initiative = Object.assign(Object.assign({}, DEFAULT_INITIATIVE), partialInitiative);
    // Create a slug from the title if one is not passed in
    if (!initiative.slug) {
        initiative.slug = constructSlug(initiative.name, initiative.orgUrlKey);
    }
    // Ensure slug is  unique
    await ensureUniqueEntitySlug(initiative, requestOptions);
    // add the status keyword
    initiative.typeKeywords = setEntityStatusKeyword(initiative.typeKeywords, initiative.status);
    initiative.typeKeywords = setDiscussableKeyword(initiative.typeKeywords, initiative.isDiscussable);
    // Map initiative object onto a default initiative Model
    const mapper = new PropertyMapper(getPropertyMap$5());
    // create model from object, using the default model as a starting point
    let model = mapper.entityToStore(initiative, cloneObject(DEFAULT_INITIATIVE_MODEL));
    // create the item
    model = await createModel(model, requestOptions);
    // map the model back into a IHubInitiative
    let newInitiative = mapper.storeToEntity(model, {});
    newInitiative = computeProps$4(model, newInitiative, requestOptions);
    // and return it
    return newInitiative;
}
/**
 * Convert a IHubInitiativeEditor back to an IHubInitiative
 * @param editor
 * @param portal
 * @returns
 */
async function editorToInitiative(editor, context) {
    var _a, _b;
    const _metric = editor._metric;
    const _associations = editor._associations;
    // 1. remove the ephemeral props we graft onto the editor
    delete editor._groups;
    delete editor._thumbnail;
    (_a = editor.view) === null || _a === void 0 ? true : delete _a.featuredImage;
    delete editor._metric;
    delete editor._groups;
    delete editor._associations;
    // 2. clone into a HubInitiative and extract common properties
    let initiative = editorToEntity(editor, context.portal);
    // 4. handle configured metric:
    //   a. transform editor values into metric + displayConfig
    //   b. set metric and displayConfig on initiative
    if (_metric && Object.keys(_metric).length) {
        const metricId = _metric.metricId || createId(camelize(`${_metric.cardTitle}_`));
        const { metric, displayConfig } = editorToMetric(_metric, metricId, {
            metricName: _metric.cardTitle,
        });
        initiative = setMetricAndDisplay(initiative, metric, displayConfig);
    }
    // 5. handle association group settings
    const assocGroupId = (_b = initiative.associations) === null || _b === void 0 ? void 0 : _b.groupId;
    if (assocGroupId && _associations) {
        const associationGroup = convertHubGroupToGroup(_associations);
        // handle group access
        if (_associations.groupAccess) {
            await updateGroup({
                group: {
                    id: assocGroupId,
                    access: _associations.groupAccess,
                },
                authentication: context.hubRequestOptions.authentication,
            });
        }
        // handle membership access
        if (_associations.membershipAccess) {
            await updateGroup({
                group: {
                    id: assocGroupId,
                    membershipAccess: associationGroup.membershipAccess,
                    clearEmptyFields: true,
                },
                authentication: context.hubRequestOptions.authentication,
            });
        }
    }
    return initiative;
}
/**
 * @private
 * Update a Hub Initiative
 * @param initiative
 * @param requestOptions
 */
async function updateInitiative(initiative, requestOptions) {
    // verify that the slug is unique, excluding the current initiative
    await ensureUniqueEntitySlug(initiative, requestOptions);
    // update the status keyword
    initiative.typeKeywords = setEntityStatusKeyword(initiative.typeKeywords, initiative.status);
    initiative.typeKeywords = setDiscussableKeyword(initiative.typeKeywords, initiative.isDiscussable);
    // get the backing item & data
    const model = await getModel(initiative.id, requestOptions);
    // create the PropertyMapper
    const mapper = new PropertyMapper(getPropertyMap$5());
    // Note: Although we are fetching the model, and applying changes onto it,
    // we are not attempting to handle "concurrent edit" conflict resolution
    // but this is where we would apply that sort of logic
    const modelToUpdate = mapper.entityToStore(initiative, model);
    // update the backing item
    const updatedModel = await updateModel(modelToUpdate, requestOptions);
    // now map back into an initiative and return that
    let updatedInitiative = mapper.storeToEntity(updatedModel, initiative);
    updatedInitiative = computeProps$4(model, updatedInitiative, requestOptions);
    // the casting is needed because modelToObject returns a `Partial<T>`
    // where as this function returns a `T`
    return updatedInitiative;
}
/**
 * @private
 * Get a Hub Initiative by id or slug
 * @param identifier item id or slug
 * @param requestOptions
 */
function fetchInitiative(identifier, requestOptions) {
    let getPrms;
    if (isGuid(identifier)) {
        // get item by id
        getPrms = getItem(identifier, requestOptions);
    }
    else {
        getPrms = getItemBySlug(identifier, requestOptions);
    }
    return getPrms.then((item) => {
        if (!item)
            return null;
        return convertItemToInitiative(item, requestOptions);
    });
}
/**
 * @private
 * Remove a Hub Initiative
 * @param id
 * @param requestOptions
 */
async function deleteInitiative(id, requestOptions) {
    const ro = Object.assign(Object.assign({}, requestOptions), { id });
    await removeItem(ro);
    return;
}
/**
 * @private
 * Convert an Hub Initiative Item into a Hub Initiative, fetching any additional
 * information that may be required
 * @param item
 * @param auth
 * @returns
 */
async function convertItemToInitiative(item, requestOptions) {
    let model = await fetchModelFromItem(item, requestOptions);
    // apply migrations
    model = await applyInitiativeMigrations(model);
    const mapper = new PropertyMapper(getPropertyMap$5());
    const prj = mapper.storeToEntity(model, {});
    return computeProps$4(model, prj, requestOptions);
}
/**
 * @private
 * Fetch Initiative specific enrichments
 * @param item
 * @param include
 * @param requestOptions
 * @returns
 */
async function enrichInitiativeSearchResult(item, include, requestOptions) {
    // Create the basic structure
    const result = {
        access: item.access,
        id: item.id,
        type: item.type,
        name: item.title,
        owner: item.owner,
        typeKeywords: item.typeKeywords,
        summary: item.snippet || item.description,
        createdDate: new Date(item.created),
        createdDateSource: "item.created",
        updatedDate: new Date(item.modified),
        updatedDateSource: "item.modified",
        family: getFamily(item.type),
        links: {
            self: "not-implemented",
            siteRelative: "not-implemented",
            thumbnail: "not-implemented",
            workspaceRelative: "not-implemented",
        },
        location: deriveLocationFromItem(item),
        rawResult: item,
    };
    // default includes
    const DEFAULTS = [];
    // merge includes
    include = [...DEFAULTS, ...include].filter(unique);
    // Parse the includes into a valid set of enrichments
    const specs = include.map(parseInclude);
    // Extract out the low-level enrichments needed
    const enrichments = mapBy("enrichment", specs).filter(unique);
    // fetch the enrichments
    let enriched = {};
    if (enrichments.length) {
        // TODO: Look into caching for the requests in fetchItemEnrichments
        enriched = await fetchItemEnrichments(item, enrichments, requestOptions);
    }
    // map the enriched props onto the result
    specs.forEach((spec) => {
        result[spec.prop] = getProp(enriched, spec.path);
    });
    // Handle links
    // TODO: Link handling should be an enrichment
    result.links = computeLinks$4(item, requestOptions);
    return result;
}
// NOTE: even though I can't find any uses of
// this deprecated function in the codebase
// if you delete it, tests in the following files will fail
// but _only in node_, not in chrome, so go figure:
// - projects/fetch.test.ts
// - search/_internal/portalSearchItems.test.ts
/**
 * ** DEPRECATED: Please use the association methods directly.
 * This will be removed in the next breaking version **
 *
 * Related Projects are those that have the Initiative id in the
 * typekeywords but NOT in the catalog. We use this query to show
 * Projects which want to be associated but are not yet included in
 * the catalog
 * This is passed into the Gallery showing "Pending Projects"
 * @param initiative
 * @returns
 */
/* istanbul ignore next */
function getPendingProjectsQuery(initiative) {
    // get query that returns Hub Projects with the initiative keyword
    let query = getTypeWithKeywordQuery("Hub Project", `initiative|${initiative.id}`);
    // The the item scope from the catalog...
    const qry = getProp(initiative, "catalog.scopes.item");
    // negate the scope, combine that with the base query
    query = combineQueries([query, negateGroupPredicates(qry)]);
    return query;
}

export { getGroupPredicate as $, expandPortalQuery as A, updatePage as B, updateInitiative as C, updateSite as D, ensureUniqueEntitySlug as E, setEntityStatusKeyword as F, getPropertyMap$1 as G, computeProps$1 as H, editorToEntity as I, editorToMetric as J, setMetricAndDisplay as K, getPropertyMap as L, computeProps as M, getScopeGroupPredicate as N, negateGroupPredicates as O, ENTERPRISE_SITE_ITEM_TYPE as P, HUB_SITE_ITEM_TYPE as Q, createSite as R, deleteSite as S, getPropertyMap$2 as T, expandPredicates as U, DEFAULT_PAGE as V, ENTERPRISE_PAGE_ITEM_TYPE as W, HUB_PAGE_ITEM_TYPE as X, createPage as Y, deletePage as Z, deleteInitiative as _, fetchPage as a, portalSearchItemsAsItems as a0, DEFAULT_INITIATIVE as a1, createInitiative as a2, editorToInitiative as a3, PREDICATE_NON_MATCH_OPTIONS_PROPS as a4, PREDICATE_DATE_PROPS as a5, enrichContentSearchResult as a6, EntityResourceMap as a7, convertItemToInitiative as a8, enrichInitiativeSearchResult as a9, getPendingProjectsQuery as aa, getItemIdentifier as ab, fetchItem as ac, convertModelToPage as ad, convertItemToPage as ae, enrichPageSearchResult as af, convertItemToProject as ag, enrichProjectSearchResult as ah, SEARCH_APIS as ai, expandApis as aj, valueToMatchOptions as ak, relativeDateToDateRange as al, migrateToCollectionKey as am, getResultSiteRelativeLink as an, removeDomainByHostname as ao, fetchSiteModel as ap, convertItemToSite as aq, enrichSiteSearchResult as ar, convertItemToTemplate as as, enrichTemplateSearchResult as at, buildWhereClause as au, fetchInitiative as b, convertModelToSite as c, fetchSite as d, fetchProject as e, fetchTemplate as f, expandApi as g, getUserThumbnailUrl as h, expandPredicate as i, getNextFunction as j, getGroupThumbnailUrl as k, getPropertyMap$3 as l, convertHubGroupToGroup as m, getKilobyteSizeOfQuery as n, isNilOrEmptyString as o, parseInclude as p, itemToSearchResult as q, getTopLevelPredicate as r, serializeQueryForPortal as s, portalSearchItems as t, upgradeCatalogSchema as u, getBasePropertyMap as v, computeItemProps as w, computeItemLinks as x, processEntityFeatures as y, addDefaultItemSearchPredicates as z };
