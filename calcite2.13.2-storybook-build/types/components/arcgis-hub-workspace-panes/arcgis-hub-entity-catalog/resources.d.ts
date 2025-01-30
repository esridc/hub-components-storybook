import { EntityType, IHubCatalog, IHubCollection, IQuery, Kilobyte } from "@esri/hub-common";
/** The query size at which we display a warning in the UI, but allow the user to continue editing */
export declare const QUERY_SIZE_WARNING_LIMIT: Kilobyte;
/** The absolute largest we allow a query size to be  */
export declare const QUERY_SIZE_MAXIMUM_LIMIT: Kilobyte;
export declare const TARGET_ENTITY_TYPES: ("item" | "event" | "group" | "user" | "portalUser" | "communityUser" | "groupMember" | "channel" | "discussionPost" | "eventAttendee")[];
/**
 * Enum for the different panels in the catalog building experience
 *
 * Details - where the definition of the catalog is set
 * Appearance - where the displayConfigs of the catalog and collections are set
 */
export declare enum CatalogPanels {
  Details = "details",
  Appearance = "appearance"
}
/**
 * Interface for the options that can be passed to the catalog builder ui schema
 */
export interface ICatalogBuilderUiSchemaOptions {
  callbacks?: ICatalogBuilderCallbacks;
  targetEntity?: EntityType;
}
/**
 * Interface for possible catalog builder callbacks, used to
 * easily identify when specific parts of the catalog definition have
 * changed without having to parse and compare the entire catalog
 */
export interface ICatalogBuilderCallbacks {
  /**
   * callback to be called when the scope of a catalog has changed.
   * this is used to easily identify when the catalog scope has changed versus
   * any other part of the catalog
   * @param query - The new scope query for the catalog's target entity
   * @param targetEntity - The target entity of the catalog that has changed its scope
   * @returns
   */
  onCatalogScopeChangeCallback?: (query: IQuery, targetEntity: EntityType) => void;
  /**
   * callback to be called when collections have been removed from the catalog
   * this is used to easily identify when collections have been removed
   * so that they can be removed from the query sizes record
   * @param collectionKeys - The keys of the collections that have been removed
   * @returns
   */
  onCollectionsRemovedCallback?: (collectionKeys: string[]) => void;
  /**
   * callback to be called when getting the reference to the calcite flow
   * to allow the title of the calcite flow to be changed
   * and the correct flow item to be shown
   * from within the configuration editor
   * @returns
   */
  calciteFlowRefCallback?: () => HTMLCalciteFlowElement;
  /**
   * Callback to be called on query builder change, used to
   * easily identify when specific parts of the query definition have
   * changed without having to parse and compare the entire query
   */
  onQueryBuilderChangeCallback?: (query: IQuery, targetEntity: EntityType) => void;
  /**
   * Callback to be called when the key of the current collection being edited changes,
   * used to switch the rendered catalog selected collection to the one being edited
   * @param key
   * @returns
   */
  onCollectionEditedKeyChange?: (key: string) => void;
}
/**
 * Returns the size of a collection scope in kilobytes, making sure to combine the collection scope's filters
 * with the catalog scope's filters
 * @param collectionScope
 * @param catalogScope
 * @returns
 */
export declare const getCollectionScopeSize: (collectionScope: IQuery, catalogScope: IQuery) => Kilobyte;
/**
 * Returns the size of a scope in kilobytes
 * @param scope
 * @returns
 */
export declare const getScopeSize: (scope?: IQuery) => Kilobyte;
/**
 * Initializes the record of query sizes for each query
 * For catalog scopes, we store query sizes as targetEntity: size in kb
 * For collections, we store query sizes as collectionKey: size in kb
 *
 * Note: collection query sizes are stored taking the catalog query size into account as the scopes are joined before querying
 * @param catalog
 * @returns
 */
export declare const initializeQuerySizes: (catalog: IHubCatalog) => Record<string, Kilobyte>;
/**
 * Updates the query sizes record for a specific target entity
 * with the size of the target entity's scope and its collections' scopes
 * @param querySizes
 * @param collections
 * @param targetEntity
 * @param catalogScope
 * @returns
 */
export declare const updateTargetEntityQuerySizes: (querySizes: Record<string, Kilobyte>, collections: IHubCollection[], targetEntity: EntityType, catalogScope: IQuery) => Record<string, Kilobyte>;
/**
 * Removes the query sizes for a list of keys
 * @param querySizes
 * @param keys
 * @returns
 */
export declare const removeQuerySizes: (querySizes: Record<string, Kilobyte>, keys: string[]) => Record<string, Kilobyte>;
