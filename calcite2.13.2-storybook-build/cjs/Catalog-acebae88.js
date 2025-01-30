'use strict';

const ArcGISContextManager = require('./ArcGISContextManager-c5cc74e9.js');
const isGuid = require('./is-guid-b5c2b74c.js');
const hubSearch = require('./hubSearch-79d30702.js');
const getWithDefault = require('./get-with-default-d1b1754d.js');
const HubError = require('./HubError-44e07249.js');
const util = require('./util-38e73510.js');
const fetch = require('./fetch-1292fb6b.js');
const HubInitiatives = require('./HubInitiatives-25ecf40a.js');
const themes = require('./themes-d539965a.js');
const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');
const fetchHubEntity = require('./fetchHubEntity-88467d55.js');
const domainExists = require('./domain-exists-0c69176a.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const get = require('./get-0368c931.js');
const mapBy = require('./map-by-a7a75788.js');

/**
 * Determines if the provided `stringToTest` matches CUID format
 * @param stringToTest The string to evaluate
 * @returns true when stringToTest matches CUID format
 */
function isCuid(stringToTest) {
    const regexCuid = /^c[a-z0-9]{24}$/;
    return typeof stringToTest === 'string' && regexCuid.test(stringToTest);
}

/**
 * Given an identifier and a catalog, check if the catalog contains the identifier.
 * Optionally, pass in the
 * @param identifier
 * @param catalog
 * @param options
 */
async function catalogContains(identifier, catalog, context, options = {}) {
    // construct a default response
    const response = {
        identifier,
        isContained: false,
    };
    // construct the predicate
    const pred = {};
    if (isGuid.isGuid(identifier) || isCuid(identifier)) {
        pred.id = identifier;
    }
    else {
        // treat as slug
        pred.typekeywords = `slug|${identifier}`;
    }
    // construct the queries
    const queries = [];
    if (options.entityType) {
        // --------------------------------------------------------
        // Check the scope for the entity type
        // then check any collections that match the entity type
        // if there are no scopes or collections with the entity type
        // then the entity is not contained in the catalog
        // --------------------------------------------------------
        if (catalog.scopes && catalog.scopes[options.entityType]) {
            // Scope is a "bounding query" for all collections involving the entity type
            // so we can check if it's in the catalog by checking if it's in the scope
            queries.push({
                targetEntity: options.entityType,
                filters: [{ predicates: [pred] }],
            });
        }
        else {
            // If there is no scope for the entity type, we check the collections
            const collections = catalog.collections || [];
            const typeCollections = collections.filter((c) => c.targetEntity === options.entityType);
            if (typeCollections.length) {
                // If there are collections for the entity type, we check them
                typeCollections.forEach((collection) => {
                    queries.push({
                        targetEntity: collection.targetEntity,
                        filters: [{ predicates: [pred] }, ...collection.scope.filters],
                    });
                });
            }
            else {
                // no collections or scope for this entity type
                // thus it cannot be in the catalog
                return Promise.resolve(response);
            }
        }
    }
    else {
        // Construct a query for each scope
        Object.keys(catalog.scopes).forEach((type) => {
            queries.push({
                targetEntity: type,
                filters: [{ predicates: [pred] }],
            });
        });
    }
    // execute the queries
    const results = await Promise.all(queries.map((query) => {
        // get the scope if it exists and merge filters
        if (catalog.scopes[query.targetEntity]) {
            query.filters = [
                ...query.filters,
                ...catalog.scopes[query.targetEntity].filters,
            ];
        }
        // We set num to be 10 to account for api not doing exact matching on slugs
        return hubSearch.hubSearch(query, {
            targetEntity: query.targetEntity,
            num: 10,
            requestOptions: context.hubRequestOptions,
        });
    }));
    // if any of the queries returned a result, then the entity is contained
    response.isContained = results.reduce((isContained, queryResponse) => {
        if (queryResponse.results.length) {
            if (pred.id) {
                isContained = true;
            }
            else {
                // slug based search, which is not exact,
                // so we manually verify the exact slug matches
                isContained = queryResponse.results.reduce((slugKeywordPresent, entry) => {
                    // try .keywords, then rawResult.typeKeywords, else empty array
                    getWithDefault.getWithDefault(entry, "typeKeywords", getWithDefault.getWithDefault(entry, "rawResult.typeKeywords", []));
                    // if (kwds.includes(pred.typekeywords)) {
                    //   slugKeywordPresent = true;
                    // }
                    if (entry.typeKeywords.includes(pred.typekeywords)) {
                        slugKeywordPresent = true;
                    }
                    return slugKeywordPresent;
                }, false);
            }
        }
        return isContained;
    }, false);
    return response;
}

/**
 * Given an item type, return its HubEntityType
 * Simple wrapper over the poorly named `getTypeFromEntity` function
 * @param itemType
 * @returns
 */
function getHubTypeFromItemType(itemType) {
    const fakeEntity = {
        type: itemType,
    };
    return getTypeFromEntity.getTypeFromEntity(fakeEntity);
}

/**
 * Fetch a Catalog for an entity.
 * This function fetches the entity and returns the `.catalog` property
 * However, other properties can be fetched by passing the name of the property
 * in the `prop` option.
 * Additionally, passing the `hubEntityType` option provide a performance boost
 * by skipping the fetch of the backing Item, then fetching the entity.
 * @param identifier
 * @param context
 * @param options { hubEntityType?: string; prop: string }
 * @returns
 */
async function fetchEntityCatalog(identifier, context, options) {
    let catalog;
    // identifier can be a guid or a url
    if (identifier.indexOf("http") === 0) {
        // Handle Sites via Url
        let url = identifier;
        // get down the the hostname
        url = domainExists.stripProtocol(url);
        // if url does not include a hash (i.e. it's not portal)
        // then we want to split on the first slash to get the hostname
        // lookupDomain will handle the enterprise base urls
        if (!url.includes("#")) {
            url = url.split("/")[0];
        }
        const domainEntry = await themes.lookupDomain(url, context.hubRequestOptions);
        const site = await HubInitiatives.fetchSite(domainEntry.siteId, context.hubRequestOptions);
        catalog = getProp.getProp(site, (options === null || options === void 0 ? void 0 : options.prop) || "catalog");
    }
    else if (isGuid.isGuid(identifier)) {
        // Handle Item Backed entities
        let entityType;
        if (options === null || options === void 0 ? void 0 : options.hubEntityType) {
            entityType = options.hubEntityType;
        }
        else {
            const item = await get.getItem(identifier, context.requestOptions);
            entityType = getHubTypeFromItemType(item.type);
        }
        const entity = await fetchHubEntity.fetchHubEntity(entityType, identifier, context);
        catalog = getProp.getProp(entity, (options === null || options === void 0 ? void 0 : options.prop) || "catalog");
    }
    else if (isCuid(identifier)) {
        // get the entity, use that to get the type, and then get the entity
        // and return the catalog
        const event = await fetch.fetchEvent(identifier, context.hubRequestOptions);
        catalog = getProp.getProp(event, (options === null || options === void 0 ? void 0 : options.prop) || "catalog");
    }
    else {
        throw new HubError.HubError("Catalog.init", "Identifier must be a url, item or event id");
    }
    return catalog;
}

/**
 * Collection Class
 *
 * Abstracts searching a Collection
 *
 * For more information, check out the [Catalog & Collection Guide](/hub.js/guides/concepts/catalog-collection/)
 */
class Collection {
    constructor(collection, context) {
        this._collection = collection;
        this._context = context;
    }
    /**
     * Create an instance of a Collection from a JSON object
     * @param collection
     * @param context
     * @returns
     */
    static fromJson(collection, context) {
        return new Collection(collection, context);
    }
    /**
     * Return the JSON object backing the instance
     * @returns
     */
    toJson() {
        return util.cloneObject(this._collection);
    }
    // Getters
    get label() {
        return this._collection.label;
    }
    get key() {
        return this._collection.key;
    }
    get include() {
        return this._collection.include || [];
    }
    get scope() {
        return this._collection.scope;
    }
    get sortField() {
        return this._collection.sortField || "title";
    }
    get sortDirection() {
        return this._collection.sortDirection || "asc";
    }
    get targetEntity() {
        return this._collection.targetEntity;
    }
    /**
     * Search the collection using a string or IQuery
     * @param query
     * @param options
     * @returns
     */
    async search(query, options = {}) {
        let qry;
        if (typeof query === "string") {
            // construct a query from that...
            qry = {
                targetEntity: this._collection.targetEntity,
                filters: [
                    {
                        predicates: [
                            {
                                term: query,
                            },
                        ],
                    },
                ],
            };
        }
        else {
            qry = util.cloneObject(query);
        }
        // TODO: What should happen when a Query is passed in that has a targetEntity that doesn't match the collection's targetEntity?
        // merge the passed in query w/ the scope
        qry.filters = [...qry.filters, ...this.scope.filters];
        const opts = util.cloneObject(options);
        opts.requestOptions = this._context.hubRequestOptions;
        // inject default sort info if not specified
        opts.sortField = options.sortField || this.sortField;
        opts.sortOrder = options.sortOrder || this.sortDirection;
        // inject default includes if not specified
        opts.include = options.include || this.include;
        // execute the search and return results
        return hubSearch.hubSearch(qry, opts);
    }
}

/**
 * Catalog Class
 *
 * Abstracts working with Catalogs and fetching collections with
 * the correct scope applied.
 *
 * For more information, check out the [Catalog & Collection Guide](/hub.js/guides/concepts/catalog-collection/)
 */
class Catalog {
    // internal - use static factory methods
    constructor(catalog, context) {
        this._containsCache = {};
        this._catalog = catalog;
        this._context = context;
    }
    /**
     * Fetch a catalog
     * At this point, it returns the `.catalog` property from the entity
     * @param identifier url, guid, cuid
     * @param context
     * @param options is possible, pass the hubEntityType to improve fetching performance
     * @returns
     */
    static async init(identifier, context, options) {
        // create default context if none passed
        if (!context) {
            const mgr = await ArcGISContextManager.ArcGISContextManager.create();
            context = mgr.context;
        }
        // fetch the catalog
        const fetched = await fetchEntityCatalog(identifier, context, options);
        // return an instance
        if (fetched) {
            return new Catalog(fetched, context);
        }
        else {
            throw new HubError.HubError("Catalog.fetch", "No catalog found for the entity");
        }
    }
    /**
     * Create a Catalog instance from a Catalog Definition Json object
     * @param json
     * @param context
     * @returns
     */
    static fromJson(json, context) {
        // ensure it's in the latest structure
        const catalog = HubInitiatives.upgradeCatalogSchema(json);
        return new Catalog(catalog, context);
    }
    /**
     * Return the JSON object backing the instance
     * @returns
     */
    toJson() {
        return util.cloneObject(this._catalog);
    }
    /**
     * Return the schema version
     */
    get schemaVersion() {
        return this._catalog.schemaVersion;
    }
    /**
     * Title getter
     */
    get title() {
        return this._catalog.title;
    }
    /**
     * Title setter
     */
    set title(v) {
        this._catalog.title = v;
    }
    /**
     * Return the existing scopes hash
     */
    get scopes() {
        return this._catalog.scopes || {};
    }
    /**
     * Return an array of the entity types available in this Catalog
     */
    get availableScopes() {
        return Object.keys(this.scopes);
    }
    /**
     * Return the display configuration for the gallery
     */
    get displayConfig() {
        return this._catalog.displayConfig;
    }
    /**
     * Get the scope's query for a particular entity type
     * @param type
     * @returns
     */
    getScope(type) {
        var _a;
        return (_a = this._catalog.scopes) === null || _a === void 0 ? void 0 : _a[type];
    }
    /**
     * Set the scope for a specific entity type
     * @param type
     * @param query
     */
    setScope(type, query) {
        // TODO: This needs to be much smarter in terms of merging
        // existing filters with the new ones. Basically this
        // hides very little complexity from the developer
        this._catalog.scopes[type] = query;
    }
    /**
     * Get the collections array. Returns simple objects not Collection instances
     */
    get collections() {
        return this._catalog.collections || [];
    }
    /**
     * Get the names of the collections
     */
    get collectionNames() {
        return mapBy.mapBy("key", this.collections);
    }
    /**
     * Get a Collection instance by name
     * @param name
     * @returns
     */
    getCollection(name) {
        const json = this.getCollectionJson(name);
        return Collection.fromJson(json, this._context);
    }
    /**
     * Add a collection
     * @param {IHubCollection} collection
     */
    addCollection(collection) {
        var _a;
        ((_a = this._catalog.collections) === null || _a === void 0 ? void 0 : _a.length) ? this._catalog.collections.push(collection)
            : (this._catalog.collections = [collection]);
    }
    /**
     * Get the Collection json by name
     * @param name
     * @returns
     */
    getCollectionJson(name) {
        const json = this.collections.find((entry) => entry.key === name);
        if (json) {
            // clone it then merge in the associated scope filter
            const clone = util.cloneObject(json);
            const catalogScope = this.getScope(clone.scope.targetEntity);
            if (catalogScope === null || catalogScope === void 0 ? void 0 : catalogScope.filters) {
                clone.scope.filters = [...clone.scope.filters, ...catalogScope.filters];
            }
            return clone;
        }
        else {
            throw new HubError.HubError("getCollectionJson", `Collection "${name}" is not present in the Catalog`);
        }
    }
    /**
     * Get a Collection instance, based on a specific entity type and filters
     * This extends from the base scope for the entity type
     * @param type
     * @param filters
     * @returns
     */
    getCustomCollection(type, filters) {
        // create the collection
        const collection = this.getCustomCollectionJson(type, filters);
        // create instance
        return Collection.fromJson(collection, this._context);
    }
    /**
     * Create a custom collection based on a specific entity type and filters
     * Returned collection extends from the base scope for the entity type
     * @param type
     * @param filters
     * @returns
     */
    getCustomCollectionJson(type, filters) {
        // get the scope
        const scopeQuery = this.getScope(type);
        // create the collection
        const collection = {
            key: `${type}-custom`,
            label: `${type} Custom`,
            targetEntity: type,
            scope: {
                targetEntity: type,
                filters: [...((scopeQuery === null || scopeQuery === void 0 ? void 0 : scopeQuery.filters) || []), ...filters],
            },
        };
        return collection;
    }
    /**
     * Search for Items
     * Will throw if the Catalog does not have a scope defined for items
     * @param query - string or IQuery
     * @param options
     * @returns
     */
    async searchItems(query, options) {
        if (!options) {
            options = this.getDefaultSearchOptions("item");
        }
        if (!this.getScope("item")) {
            const result = this.getEmptyResult();
            result.messages = [
                {
                    code: "missingScope",
                    message: "Catalog does not have a scope for items",
                    data: {
                        scope: "item",
                    },
                },
            ];
            return Promise.resolve(result);
        }
        else {
            // ensure it's an item search
            options.targetEntity = "item";
            return this.search(query, options);
        }
    }
    async contains(identifier, options) {
        const start = Date.now();
        // check if we have cached results for this identifier
        if (this._containsCache[identifier]) {
            const cachedResult = util.cloneObject(this._containsCache[identifier]);
            cachedResult.duration = Date.now() - start;
            return Promise.resolve(cachedResult);
        }
        else {
            // delegate to catalogContains
            const result = await catalogContains(identifier, this._catalog, this._context, options);
            // add to cache...
            this._containsCache[identifier] = result;
            result.duration = Date.now() - start;
            return result;
        }
    }
    /**
     * Search for Groups
     * Will throw if the Catalog does not have a scope defined for groups
     * @param query  - string or IQuery
     * @param options
     * @returns
     */
    async searchGroups(query, options) {
        if (!options) {
            options = this.getDefaultSearchOptions("group");
        }
        if (!this.getScope("group")) {
            const result = this.getEmptyResult();
            result.messages = [
                {
                    code: "missingScope",
                    message: "Catalog does not have a scope for groups",
                    data: {
                        scope: "group",
                    },
                },
            ];
            return Promise.resolve(result);
        }
        else {
            // ensure it's an group search
            options.targetEntity = "group";
            return this.search(query, options);
        }
    }
    /**
     * Search for Users
     * Will throw if the Catalog does not have a scope defined for users
     * @param query  - string or IQuery
     * @param options
     * @returns
     */
    async searchUsers(query, options = {}) {
        if (!this.getScope("user")) {
            const result = this.getEmptyResult();
            result.messages = [
                {
                    code: "missingScope",
                    message: "Catalog does not have a scope for user",
                    data: {
                        scope: "user",
                    },
                },
            ];
            return Promise.resolve(result);
        }
        else {
            // ensure it's an group search
            options.targetEntity = "user";
            return this.search(query, options);
        }
    }
    /**
     * Execute a term search against all the collections in the Catalog
     * or an IQuery against all collections that match the targetEntity.
     * Note: This will not search scopes which do not have corresponding collections.
     * If you want that behavior, use `searchCatalogs` function instead.
     * @param query  - string or IQuery
     * @param options
     * @returns
     */
    async searchCollections(query, options = {}) {
        // build a query
        let passedQuery = true;
        let qry;
        if (typeof query === "string") {
            passedQuery = false;
            qry = {
                targetEntity: "item",
                filters: [
                    {
                        predicates: [
                            {
                                term: query,
                            },
                        ],
                    },
                ],
            };
        }
        else {
            qry = query;
        }
        // iterate the colllections, issue searchs for each one
        const promiseKeys = [];
        const promises = this.collectionNames.reduce((acc, name) => {
            const col = this.getCollection(name);
            // if an IQuery was passed in,
            if (passedQuery) {
                // we only execute queries on collections that match the targetEntity
                // and skip the rest
                if (col.targetEntity === qry.targetEntity) {
                    promiseKeys.push(name);
                    acc.push(col.search(qry, options));
                }
            }
            else {
                // if a string was passed in, we execute the search on all collections
                // by replacing the targetEntity in the query to match the collection
                promiseKeys.push(name);
                qry.targetEntity = col.targetEntity;
                acc.push(col.search(qry, options));
            }
            return acc;
        }, []);
        const responses = await Promise.all(promises);
        // merge the responses into the hash
        const hash = {};
        for (let i = 0; i < promiseKeys.length; i++) {
            hash[promiseKeys[i]] = responses[i];
        }
        return hash;
    }
    /**
     * Execute a term search against all the scopes in the Catalog
     * @param query - term or IQuery
     * @param options
     * @returns
     */
    async searchScopes(query, options = {}, limitTo) {
        let qry;
        if (typeof query === "string") {
            qry = {
                targetEntity: "item",
                filters: [
                    {
                        predicates: [
                            {
                                term: query,
                            },
                        ],
                    },
                ],
            };
        }
        else {
            qry = query;
        }
        const promiseKeys = [];
        const promises = this.availableScopes.reduce((acc, entityType) => {
            if (!limitTo || limitTo.includes(entityType)) {
                promiseKeys.push(entityType);
                const qryClone = util.cloneObject(qry);
                const optsClone = util.cloneObject(options);
                qryClone.targetEntity = entityType;
                optsClone.targetEntity = entityType;
                acc.push(this.search(qryClone, optsClone));
            }
            return acc;
        }, []);
        // wait for all the searches to complete
        const responses = await Promise.all(promises);
        // merge the responses into the hash
        const hash = {};
        for (let i = 0; i < promiseKeys.length; i++) {
            hash[promiseKeys[i]] = responses[i];
        }
        return hash;
    }
    /**
     * Execute a term search or IQuery search against the Catalog.
     * @param query - term or IQuery
     * @param options
     * @returns
     */
    async search(query, options) {
        let targetEntity = options.targetEntity;
        let qry;
        if (typeof query === "string") {
            qry = {
                targetEntity,
                filters: [
                    {
                        predicates: [
                            {
                                term: query,
                            },
                        ],
                    },
                ],
            };
        }
        else {
            targetEntity = query.targetEntity;
            qry = util.cloneObject(query);
        }
        // Now merge in catalog scope level filters if they exist
        const scope = this.getScope(targetEntity);
        // Since the public methods (searchItem etc) all
        // check for the scope before calling this method
        // we can assume that the scope exists, but this is extra
        // defensive just to ensure we don't blow up
        /* istanbul ignore else */
        if (scope) {
            qry.filters = [...qry.filters, ...scope.filters];
        }
        const opts = util.cloneObject(options);
        // An Catalog instance always uses the context so we remove/replace any passed in auth
        delete opts.authentication;
        opts.requestOptions = this._context.hubRequestOptions;
        return hubSearch.hubSearch(qry, opts);
    }
    /**
     * Construct an empty result. Returned when a search is performed against an entity type that
     * does not have a scope defined.
     * @returns
     */
    getEmptyResult() {
        return {
            results: [],
            total: 0,
            hasNext: false,
            next: null,
        };
    }
    getDefaultSearchOptions(type) {
        return {
            targetEntity: type,
            num: 10,
            start: 1,
            requestOptions: this._context.hubRequestOptions,
        };
    }
}

exports.Catalog = Catalog;
exports.Collection = Collection;
exports.catalogContains = catalogContains;
exports.getHubTypeFromItemType = getHubTypeFromItemType;
exports.isCuid = isCuid;
