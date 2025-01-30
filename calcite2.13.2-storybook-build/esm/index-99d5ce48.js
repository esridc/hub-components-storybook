import { _ as _getHubUrlFromPortalHostname, w as categories, n as normalizeItemType, a as includes, e as isPageType, l as composeContent, u as getContentTypeIcon, c as getHubRelativeUrl, v as getShortenedCategories } from './compose-d5b83ab7.js';
export { P as PublisherSource, U as UpdateFrequency, w as categories, l as composeContent, u as getContentTypeIcon, g as getHubApiUrl, E as getItemApiUrl, F as getItemDataUrl, B as getItemHubId, o as getItemLayer, A as getItemLayerId, b as getItemThumbnailUrl, s as getLayerIdFromUrl, y as getPortalUrls, p as getProxyUrl, a as includes, x as isDownloadable, z as isFeatureService, D as isLayerView, i as isSiteType, n as normalizeItemType, C as parseItemCategories } from './compose-d5b83ab7.js';
export { b as ALPHA_ORGS, a as ArcGISContext, A as ArcGISContextManager, k as addHistoryEntry, c as fetchMaxNumUserGroupsLimit, f as fetchOrgLimits, i as fetchUserHubSettings, h as fetchUserSiteSettings, d as getHubApiFromPortalUrl, j as getObjectSize, g as getOrgThumbnailUrl, r as removeHistoryEntry, u as updateUserHubSettings, e as updateUserSiteSettings } from './ArcGISContextManager-c977211a.js';
import { r as request, a as ArcGISRequestError } from './request-fa80ae40.js';
import { U as UserSession } from './UserSession-2c05f7b6.js';
export { h as GLOBAL_EXTENT, G as GeoJSONPolygonToBBox, d as allCoordinatesPossiblyWGS84, b as bBoxToExtent, a as bboxToString, f as createExtent, c as extentToBBox, e as extentToPolygon, g as getExtentCenter, j as getOrgExtentAsBBox, i as isBBox, k as isValidExtent, o as orgExtent } from './extent-34a4ba2a.js';
export { D as DEFAULT_THEME, S as SITE_SCHEMA_VERSION, G as _checkStatusAndParseJson, N as _ensureSafeDomainLength, _ as _ensureTelemetry, M as _lookupPortal, z as _migrateEventListCardConfigs, y as _migrateFeedConfig, L as _migrateLinkUnderlinesCapability, A as _migrateTelemetryConfig, i as addDomain, n as addSiteDomains, d as constructSlug, e as createModel, t as doesResourceExist, C as domainExistsPortal, k as ensureUniqueDomainName, f as fetchModelFromItem, J as fetchModelResources, c as findItemsBySlug, a as getItemBySlug, h as getModel, H as getModelBySlug, m as getOrgDefaultTheme, g as getSiteById, F as getUniqueDomainName, E as getUniqueDomainNamePortal, b as getUniqueSlug, l as lookupDomain, w as migrateBadBasemap, x as migrateWebMappingApplicationSites, r as removeDomain, o as removeDomainsBySiteId, v as removeEmptyProps, s as setSlugKeyword, K as stringToBlob, u as updateModel, B as upgradeSiteSchema, I as upsertModelResources, q as upsertResource } from './themes-e08327b4.js';
export { R as RemoteServerError, b as buildUrl, h as hubApiRequest } from './request-3e386aeb.js';
export { F as FileExtension, a as HubEntityHero, H as HubEntityStatus, b as HubFamilies, I as ItemType, c as addCreateItemTypes } from './types-2eaa1a18.js';
import { g as getServiceTypeFromUrl } from './index-edff2d62.js';
export { g as getServiceTypeFromUrl, i as isMapOrFeatureServerUrl } from './index-edff2d62.js';
import { a as cloneObject, d as camelize, f as findBy } from './util-3e6872d9.js';
export { q as addDays, k as arrayToObject, d as camelize, b as capitalize, r as chunkArray, a as cloneObject, l as compose, c as createId, e as extend, p as filterBy, f as findBy, h as flattenArray, i as isNil, n as last, m as maybeAdd, g as maybePush, o as objectToArray, u as unique, j as uniqueBy, w as without } from './util-3e6872d9.js';
export { u as updateHubEntity } from './updateHubEntity-c9ae958c.js';
import { g as getCardModelUrlFromResult, a as getCardModelUrlFromEntity } from './getCardModelUrl-a5543776.js';
export { a as getCardModelUrlFromEntity, g as getCardModelUrlFromResult } from './getCardModelUrl-a5543776.js';
export { E as EntityEditor, H as HubContent, f as HubDiscussion, h as HubEvent, a as HubInitiative, c as HubInitiativeTemplate, j as HubProject, g as HubSurvey, l as HubTemplate, b as initiativeResultToCardModel, e as initiativeTemplateResultToCardModel, d as initiativeTemplateToCardModel, i as initiativeToCardModel, k as projectResultToCardModel, p as projectToCardModel, r as removeResource } from './EntityEditor-1f0c9dcd.js';
import { a4 as PREDICATE_NON_MATCH_OPTIONS_PROPS, a5 as PREDICATE_DATE_PROPS, A as expandPortalQuery } from './HubInitiatives-4f4e24ce.js';
export { P as ENTERPRISE_SITE_ITEM_TYPE, a7 as EntityResourceMap, Q as HUB_SITE_ITEM_TYPE, ai as SEARCH_APIS, z as addDefaultItemSearchPredicates, au as buildWhereClause, a8 as convertItemToInitiative, ae as convertItemToPage, ag as convertItemToProject, aq as convertItemToSite, as as convertItemToTemplate, ad as convertModelToPage, c as convertModelToSite, a2 as createInitiative, Y as createPage, R as createSite, _ as deleteInitiative, Z as deletePage, S as deleteSite, a3 as editorToInitiative, J as editorToMetric, a6 as enrichContentSearchResult, a9 as enrichInitiativeSearchResult, af as enrichPageSearchResult, ah as enrichProjectSearchResult, ar as enrichSiteSearchResult, at as enrichTemplateSearchResult, g as expandApi, aj as expandApis, A as expandPortalQuery, b as fetchInitiative, ac as fetchItem, a as fetchPage, e as fetchProject, d as fetchSite, ap as fetchSiteModel, f as fetchTemplate, $ as getGroupPredicate, k as getGroupThumbnailUrl, ab as getItemIdentifier, n as getKilobyteSizeOfQuery, j as getNextFunction, aa as getPendingProjectsQuery, an as getResultSiteRelativeLink, N as getScopeGroupPredicate, h as getUserThumbnailUrl, am as migrateToCollectionKey, al as relativeDateToDateRange, ao as removeDomainByHostname, s as serializeQueryForPortal, C as updateInitiative, B as updatePage, D as updateSite, u as upgradeCatalogSchema, ak as valueToMatchOptions } from './HubInitiatives-4f4e24ce.js';
import { g as getWithDefault } from './get-with-default-b819d95d.js';
export { g as getWithDefault } from './get-with-default-b819d95d.js';
import { g as getProp } from './get-prop-ec5be510.js';
export { g as getProp } from './get-prop-ec5be510.js';
import { g as getItemGroups } from './get-f0caeb52.js';
import { s as searchCatalogs } from './searchCatalogs-3b4731ac.js';
export { s as searchCatalogs } from './searchCatalogs-3b4731ac.js';
export { g as getAddContentConfig } from './getAddContentConfig-17d50cc0.js';
export { g as getCatalogGroups, b as getPredicateValues } from './getPredicateValues-ef475313.js';
export { d as deepCatalogContains, i as isOpenDataGroup } from './deepCatalogContains-727e43de.js';
export { g as getHubEntityTypeFromPath, b as getPathForHubEntityType, p as parseContainmentPath, a as pathMap } from './parseContainmentPath-a32e8034.js';
export { C as Catalog, a as Collection, c as catalogContains, g as getHubTypeFromItemType, i as isCuid } from './Catalog-290f043e.js';
export { O as OperationStack, c as createOperationPipeline, i as isServicesDirectoryDisabled } from './_enrichments-8641475c.js';
export { O as OperationError } from './OperationError-387ae9ab.js';
export { H as HubError } from './HubError-e26c5610.js';
import { a as abab } from './index-0a8fd06b.js';
export { r as acceptAssociation, b as breakAssociation, a as getAvailableToRequestAssociationCatalogs, c as getAvailableToRequestEntitiesQuery, g as getWellKnownAssociationsCatalog, r as requestAssociation } from './requestAssociation-74404ad8.js';
export { A as ASSOCIATION_REFERENCE_LIMIT } from './types-83bbabfd.js';
export { d as getAssociatedEntitiesQuery, b as getTypesFromEntityType } from './getAssociatedEntitiesQuery-a2536649.js';
export { g as getAssociationStats } from './getAssociationStats-39b08e03.js';
export { a as getPendingEntitiesQuery, g as getRequestingEntitiesQuery } from './getRequestingEntitiesQuery-e8399fe2.js';
export { g as getReferencedEntityIds } from './getReferencedEntityIds-265ddcf1.js';
export { s as setEntityAssociationGroup } from './setEntityAssociationGroup-28489bbb.js';
import { h as hasBasePriv, c as canEditItem } from './can-edit-item-e533d8e4.js';
export { c as canEditItem, h as hasBasePriv } from './can-edit-item-e533d8e4.js';
import { b as getCollection, g as getFamily } from './get-family-543fac52.js';
export { g as getFamily, a as getFamilyTypes } from './get-family-543fac52.js';
import { _ as __rest } from './tslib.es6-9c17e83a.js';
import { r as removeContextFromSlug, p as parseDatasetId } from './slugs-7b8828d5.js';
export { a as addContextToSlug, i as isSlug, p as parseDatasetId, r as removeContextFromSlug } from './slugs-7b8828d5.js';
import { i as isService } from './is-service-ad021db8.js';
export { i as isService } from './is-service-ad021db8.js';
import { g as getService } from './getService-e61b8c6e.js';
import { w as wait } from './wait-77e1cc59.js';
export { w as wait } from './wait-77e1cc59.js';
export { s as createContent, p as createInitiativeTemplate, n as createProject, r as createTemplate, i as deleteContent, h as deleteInitiativeTemplate, j as deleteProject, f as deleteSurvey, g as deleteTemplate, k as editorToContent, m as editorToProject, q as editorToTemplate, t as setDisplayMapKeyword, c as updateContent, a as updateInitiativeTemplate, d as updateProject, u as updateSurvey, b as updateTemplate } from './edit-237c0a70.js';
export { f as fetchContent } from './fetchContent-dbc662af.js';
export { h as convertItemToDiscussion, e as convertItemToInitiativeTemplate, i as convertItemToSurvey, g as enrichInitiativeTemplateSearchResult, a as fetchDiscussion, d as fetchHubContent, f as fetchHubEntity, b as fetchInitiativeTemplate, c as fetchSurvey } from './fetchHubEntity-28d04ab4.js';
import { s as setProp } from './set-prop-9a4aa9a9.js';
export { s as setProp } from './set-prop-9a4aa9a9.js';
import { n as deepEqual, m as modelToHubEditableContent } from './get-form-json-1d4e3591.js';
export { M as MAP_SURVEY_TYPEKEYWORD, p as decodeForm, n as deepEqual, a as getDefaultEntitySettings, q as getFormInfoJson, j as getFormJson, r as getMapQuestion, s as hasMapQuestion, t as isDraft, u as isMapQuestion, v as isPageQuestion, w as isSurvey123Connect, m as modelToHubEditableContent, x as shouldDisplayMap } from './get-form-json-1d4e3591.js';
export { a as JobRecordStatus, J as JobRecordType, f as fetchItemJobRecords } from './fetchItemJobRecords-843ad5b7.js';
export { S as ServiceCapabilities, h as hasServiceCapability, i as isAGOFeatureServiceUrl, a as isHostedFeatureServiceMainEntity, b as isHostedFeatureServiceMainItem, c as isSecureProxyServiceUrl, t as toggleServiceCapability } from './hostedServiceUtils-f22b023b.js';
export { H as HUB_ENTITY_TYPES, g as getRelativeWorkspaceUrl, i as isValidEntityType } from './getRelativeWorkspaceUrl-ac123b7f.js';
export { T as TIMELINE_STAGE_STATUSES } from './IHubTimeline-0350fa19.js';
export { E as ExpressionRelationships, a as MAX_ENTITY_METRICS_ALLOWED, b as MAX_FEATURED_METRICS_ALLOWED, M as MetricVisibility } from './Metrics-9cb7a1fc.js';
export { E as EmbedKind } from './Embeds-00f86cb6.js';
export { a as UiSchemaElementTypes, b as UiSchemaMessageTypes, U as UiSchemaRuleEffects, c as UiSchemaSectionTypes, h as validCardEditorTypes, v as validEditorTypes, d as validEntityEditorTypes, g as validEventGalleryCardEditorTypes, f as validFollowCardEditorTypes, e as validStatCardEditorTypes } from './types-1fca2e83.js';
export { g as getEditorConfig } from './getEditorConfig-a89f031d.js';
export { d as ENTITY_ACCESS_SCHEMA, g as ENTITY_CATEGORIES_SCHEMA, h as ENTITY_FEATURED_CONTENT_SCHEMA, c as ENTITY_IMAGE_SCHEMA, E as ENTITY_IS_DISCUSSABLE_SCHEMA, e as ENTITY_LOCATION_SCHEMA, i as ENTITY_MAP_SCHEMA, a as ENTITY_NAME_SCHEMA, b as ENTITY_SUMMARY_SCHEMA, f as ENTITY_TAGS_SCHEMA, j as ENTITY_TIMELINE_SCHEMA, P as PRIVACY_CONFIG_SCHEMA, S as SITE_ENTITY_NAME_SCHEMA, k as SLUG_SCHEMA } from './subschemas-4d56570e.js';
export { C as CatalogSchema, b as CollectionAppearanceSchema, a as CollectionSchema, F as FilterSchema, G as GalleryDisplayConfigSchema, P as PredicateSchema, Q as QuerySchema, t as targetEntities } from './CatalogSchema-e8481cdb.js';
export { g as getTypeFromEntity } from './getTypeFromEntity-e149b61e.js';
export { a as processActionLink, p as processActionLinks } from './processActionLinks-d3b3f868.js';
export { g as getS123EditUrl, s as setEntityAccess } from './get-s123-edit-url-0ac4dd9f.js';
export { s as shareEntityWithGroups, u as unshareEntityWithGroups } from './unshareEntityWithGroups-78dcc7e1.js';
export { g as getEntityGroups } from './getEntityGroups-8715eb41.js';
export { g as getEntityThumbnailUrl } from './getEntityThumbnailUrl-d6b416fe.js';
export { a as asyncForEach, g as getEntityTypeFromHubEntityType } from './deepContains-ff859c50.js';
export { W as WGS84_WKID, c as buildExistingExportsPortalQuery, g as getExportItemTypeKeyword, a as getExportLayerTypeKeyword, b as getSpatialRefTypeKeyword, s as serializeSpatialReference } from './build-existing-exports-portal-query-94212eff.js';
export { A as ArcgisHubDownloadError, D as DownloadOperationStatus, P as PORTAL_EXPORT_TYPES, S as ServiceDownloadFormat } from './types-303cd4d6.js';
export { f as fetchDownloadFile } from './fetchDownloadFile-83809572.js';
export { a as canUseCreateReplica, c as canUseHubDownloadSystem } from './canUseHubDownloadSystem-a22afbb9.js';
export { c as canUseHubDownloadApi, g as getDownloadFormats, a as getHubDownloadApiFormats } from './getDownloadFormats-3dc2a95d.js';
export { d as getDownloadConfiguration } from './getDownloadConfiguration-6cb6d32f.js';
export { M as HUB_CDN_URLMAP, H as HUB_LOCALES, G as _addTokenToResourceUrl, _ as _unprotectAndRemoveGroup, m as _unprotectAndRemoveItem, k as addSolutionResourceUrlToAssets, l as buildDraft, c as convertToWellKnownLocale, F as deepStringReplace, h as ensureUniqueString, e as failSafeUpdate, I as fetchAndUploadResource, J as fetchAndUploadThumbnail, f as fetchHubTranslation, K as fetchImageAsBlob, b as getCulture, o as getDomainsForSite, L as getHubLocaleAssetUrl, g as getHubProduct, A as getInputFeatureServiceModel, j as getItemAssets, d as getModelFromOptions, B as getSourceFeatureServiceModelFromFieldworker, C as getStakeholderModel, a as getSubscriptionType, t as getSurveyModels, q as interpolateItemId, v as isDomainForLegacySite, x as isDomainUsedElsewhere, D as isFieldworkerView, y as isValidDomain, E as itemPropsNotInTemplates, n as normalizeSolutionTemplateItem, p as propifyString, r as replaceItemId, s as serializeModel, u as unprotectModel, z as updateDomain, i as uploadResourcesFromUrl, w as withoutByProp } from './get-survey-models-e6e1fa81.js';
import { _ as __assign } from './tslib.es6-7023f322.js';
import { g as getPortalUrl } from './get-portal-url-b1c49fc5.js';
import { c as chunk } from './update-user-membership-261681cf.js';
import { b as autoAddUsers, i as inviteUsers } from './addGroupMembers-7d588ca7.js';
export { a as addGroupMembers, b as autoAddUsers, i as inviteUsers } from './addGroupMembers-7d588ca7.js';
export { j as convertUserToHubUser, c as createHubGroup, d as deleteHubGroup, e as enrichGroupSearchResult, k as enrichUserSearchResult, a as fetchHubGroup, f as fetchHubUser, i as getGroupHomeUrl, g as getUserHomeUrl, h as hubSearch, p as pickProps, u as updateHubGroup } from './hubSearch-41612481.js';
export { H as HubGroup } from './HubGroup-9aed80ee.js';
export { g as getWellKnownGroup } from './getWellKnownGroup-af6e6a2a.js';
export { createDiscussion, deleteDiscussion, updateDiscussion } from './edit-9f487804.js';
export { A as AclCategory, e as AclSubCategory, C as CANNOT_DISCUSS, j as ChannelFilter, b as ChannelRelation, k as ChannelSort, w as CommonSort, u as DiscussionSource, D as DiscussionType, E as EntitySettingType, m as PostReaction, f as PostRelation, P as PostSort, h as PostStatus, x as PostType, v as ReactionRelation, R as Role, S as SearchPostsFormat, a as SharingAccess, d as SortOrder, c as channelToSearchResult, q as getChannelAccess, t as getChannelGroupIds, r as getChannelOrgIds, l as getChannelUsersQuery, g as getPostCSVFileName, i as isDiscussable, o as isOrgChannel, p as isPrivateChannel, n as isPublicChannel, s as setDiscussableKeyword } from './utils-6bf1b713.js';
export { s as searchChannels } from './channels-2574fd6e.js';
export { c as createSetting, f as fetchSetting, r as removeSetting, u as updateSetting } from './settings-2d4e159a.js';
export { d as discussionsApiRequest } from './discussions-api-request-199cae2d.js';
export { createHubEvent, createHubEventRegistration, deleteHubEvent, deleteHubEventRegistration, updateHubEvent } from './edit-fa9666f2.js';
export { c as convertClientEventToHubEvent, f as fetchEvent } from './fetch-63549ae7.js';
export { H as HubEventAttendanceType, a as HubEventCapacityType } from './types-db540898.js';
export { g as getEventGroups } from './getEventGroups-a2ce236d.js';
export { d as deleteProp } from './delete-prop-bd13d424.js';
export { i as interpolate } from './interpolate-d39d6151.js';
export { s as shareItemToGroups } from './share-item-to-groups-547b9cd0.js';
export { u as unshareItemFromGroups } from './unshare-item-from-groups-b09dcce3.js';
import { s as searchItems } from './search-c7a57aa9.js';
import { b as batch } from './batch-eaeeb888.js';
export { b as batch } from './batch-eaeeb888.js';
export { S as STANDARD_LICENSES, g as getStructuredLicense } from './get-structured-license-33306790.js';
export { d as deleteItemThumbnail, s as setItemThumbnail, u as uploadImageResource } from './getEditorSlug-78023e22.js';
import { g as getPortalApiUrl } from './get-portal-api-url-8aa1582b.js';
export { a as getEnvironmentFromPortalUrl, g as getPortalApiUrl } from './get-portal-api-url-8aa1582b.js';
export { a as createItemFromFile, b as createItemFromUrl, c as createItemFromUrlOrFile } from './create-item-from-url-or-file-04550dad.js';
export { f as followEntity, g as getEntityFollowersGroupId, i as isUserFollowing, u as unfollowEntity } from './follow-76eed880.js';
import { _ as _isObject, b as _isDate, c as _isRegExp, d as _isFunction } from './_deep-map-values-53f8dbd1.js';
export { a as _deepMapValues, b as _isDate, d as _isFunction, _ as _isObject, c as _isRegExp, e as _isString, f as _mapValues } from './_deep-map-values-53f8dbd1.js';
import { d as deepSet } from './deep-set-67281c6f.js';
export { d as deepSet } from './deep-set-67281c6f.js';
export { m as mergeObjects } from './merge-objects-5b123ab3.js';
import { i as isFindable } from './deepFilter-df6b0aed.js';
export { d as deepFilter } from './deepFilter-df6b0aed.js';
export { d as deepFind, a as deepFindById } from './deepFind-a22f417b.js';
export { f as fetchOrg } from './fetch-org-8e578c0d.js';
export { H as HubPage } from './HubPage-e56c4fe7.js';
export { H as HubPermissionsPolicies, c as checkPermission, g as getPermissionPolicy, i as isPermission } from './checkPermission-6c5be250.js';
export { a as addPermissionPolicy, r as removePermissionPolicy } from './enrichEntity-a5bc0b4f.js';
export { o as objectToJsonBlob } from './object-to-json-blob-583ae5c3.js';
export { v as validateUrl } from './validate-url-c1c458fc.js';
export { d as dotifyString, a as getWellKnownCatalog, g as getWellknownCollection, c as getWellknownCollections } from './wellKnownCatalog-7e9f7f53.js';
import { d as domainExists } from './domain-exists-4fd7dc09.js';
export { _ as _getAuthHeader, a as _getDomainServiceUrl, d as domainExists, s as stripProtocol } from './domain-exists-4fd7dc09.js';
export { H as HubSite, a as applyVersion, b as checkForStaleVersion, c as createVersion, u as updateVersion } from './HubSite-374c57db.js';
import { a as getMajorVersion } from './previewFeed-2389da58.js';
export { g as getFeedTemplate, p as previewFeed, r as reharvestSiteCatalog, s as setFeedTemplate } from './previewFeed-2389da58.js';
import { g as getPortalUrl$1 } from './get-portal-url-cc8a77b9.js';
export { g as getPortalUrl } from './get-portal-url-cc8a77b9.js';
export { g as getItemHomeUrl } from './get-item-home-url-b414b731.js';
export { g as getPortalBaseFromOrgUrl } from './getPortalBaseFromOrgUrl-ad7df86a.js';
export { c as cacheBustUrl } from './cacheBustUrl-082c34f5.js';
export { g as getCdnAssetUrl } from './get-cdn-asset-url-b2059dc3.js';
export { b as base64ToUnicode, u as unicodeToBase64 } from './encoding-1c5014ff.js';
export { f as failSafe } from './fail-safe-cd1a5a2a.js';
export { g as generateRandomString } from './generate-random-string-1436d9e6.js';
export { i as isGuid } from './is-guid-982831aa.js';
export { m as mapBy } from './map-by-a2234e13.js';
export { s as slugify } from './slugify-e3e67bac.js';
export { a as Level, L as Logger } from './logger-f8667200.js';
export { i as isUpdateGroup } from './is-update-group-7b9eb0ea.js';
export { d as dasherize } from './dasherize-9215e9fc.js';
export { t as titleize } from './titleize-fd193332.js';
export { p as poll } from './poll-77a94dfa.js';
export { a as getDatePickerDate, b as getTimePickerTime, c as guessTimeZone } from './getDefaultEventDatesAndTimes-4847a519.js';
export { i as isComboboxItemSelected } from './isComboboxItemSelected-f8731af3.js';
export { d as deleteVersion, b as getVersion, s as searchVersions, u as updateVersionMetadata } from './updateVersionMetadata-068ede7c.js';
export { g as getEntityMetrics } from './getEntityMetrics-ad176d9d.js';
export { r as resolveMetric } from './resolveMetric-7286227d.js';
import './helpers-8c7e5e31.js';
import './clean-url-dff2b6ee.js';
import './get-user-f035bd36.js';
import './get-portal-5e0a1617.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './append-custom-params-4bd856e5.js';
import './slugs-7ec67036.js';
import './shouldShowDownloadsConfiguration-385c6ff6.js';
import './getDownloadFlow-6c6d04d5.js';
import './utils-cde3af49.js';
import './remove-7361a90a.js';
import './get-850c466d.js';
import './defaults-1f93a79e.js';
import './events-c59246f8.js';
import './unshareEventWithGroups-2bac7a58.js';
import './search-211dee83.js';
import './TemplateBusinessRules-0e35d61b.js';
import './PropertyMapper-4eb0ac8f.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './update-26e2fbc1.js';
import './unshare-item-with-group-b4a3a08f.js';
import './helpers-6692d307.js';
import './share-item-with-group-5711513b.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './getLayer-464ff70e.js';
import './ProjectSchema-060a6b72.js';
import './MetricSchema-da66a5ad.js';
import './enums-783e40b4.js';
import './definitions-193d63f9.js';
import './HubItemEntitySchema-5c1f4677.js';
import './InitiativeSchema-4fb31f85.js';
import './SiteSchema-3e282ce1.js';
import './DiscussionSchema-6e5016d0.js';
import './PageSchema-4cbe3bd9.js';
import './ContentSchema-d913d8e9.js';
import './TemplateSchema-83e65297.js';
import './GroupSchema-13ff9290.js';
import './InitiativeTemplateSchema-bf5d8531.js';
import './SurveySchema-0fcb1d64.js';
import './EventSchemaCreate-2f6ba245.js';
import './validations-3d61466c.js';
import './UserSchema-abc4f738.js';
import './access-7968589d.js';
import './sharedWith-3ad296b7.js';
import './protect-e98e6111.js';
import './remove-2e7122d1.js';
import './registrations-431b9788.js';
import './getPropertyMap-10ee9d61.js';

/**
 * Send a notification to members of the requesting user's org.
 * Operation success will be indicated by a flag on the return
 * object. If there are any errors, they will be placed in an
 * errors array on the return object
 *
 * ```js
 * const authentication: IAuthenticationManager; // Typically passed into to the function
 * //
 * const options: IInviteGroupUsersOptions = {
 *  id: 'group_id',
 *  users: ['larry', 'curly', 'moe'],
 *  notificationChannelType: 'email',
 *  expiration: 20160,
 *  authentication
 * }
 * //
 * const result = await createOrgNotification(options);
 * //
 * const if_success_result_looks_like = {
 *  success: true
 * }
 * //
 * const if_failure_result_looks_like = {
 *  success: false,
 *  errors: [ArcGISRequestError]
 * }
 * ```
 * @param {ICreateOrgNotificationOptions} options
 *
 * @returns {ICreateOrgNotificationResult}
 */
function createOrgNotification(options) {
    var url = getPortalUrl(options) + "/portals/self/createNotification";
    var batches = _generateBatchRequests(options);
    var promises = batches.map(function (batch) { return _sendSafeRequest(url, batch); });
    return Promise.all(promises).then(_combineResults);
}
/**
 * @private
 */
function _generateBatchRequests(options) {
    var userBatches = chunk(options.users, options.batchSize || 25);
    return userBatches.map(function (users) { return _generateRequestOptions(users, options); });
}
/**
 * @private
 */
function _generateRequestOptions(users, baseOptions) {
    var requestOptions = Object.assign({}, baseOptions);
    requestOptions.params = __assign(__assign({}, requestOptions.params), { users: users, subject: baseOptions.subject, message: baseOptions.message, notificationChannelType: requestOptions.notificationChannelType });
    return requestOptions;
}
/**
 * @private
 */
function _sendSafeRequest(url, requestOptions) {
    return request(url, requestOptions)
        .catch(function (error) { return ({ errors: [error] }); });
}
/**
 * @private
 */
function _combineResults(responses) {
    var success = responses.every(function (res) { return res.success; });
    var errors = responses.reduce(function (collection, res) { return collection.concat(res.errors || []); }, []);
    var combined = { success: success };
    if (errors.length > 0) {
        combined.errors = errors;
    }
    return combined;
}

/**
 * Ensure that an object has a deep property path.
 * This will replace any existing object at the end of the path
 * @param {Object} target Object we want to ensure has some deep property
 * @param {string} path Dotted path to the property we want to ensure exists
 */
function ensureProp(target, path) {
    return deepSet(target, path);
}

/**
 * Given an array of prop paths, return all the values that exist, in an array
 */
function getProps(obj, props) {
    return props.reduce((a, p) => {
        const v = getProp(obj, p);
        if (v) {
            a.push(v);
        }
        return a;
    }, []);
}

/**
 * Resolve all $use references in an object graph.
 * The $use syntax is relative to an entire object so
 * the developer must ensure they resolve the references
 * on the same graph they were defined on.
 * Put another way, you can't resolve references on a subset
 * of an object graph.
 * @param obj
 * @param ctx
 * @returns
 */
function resolveReferences(obj, ctx) {
    const keys = Object.keys(obj);
    ctx = ctx || cloneObject(obj);
    const newObject = keys.reduce(function (acc, currentKey) {
        // if the value is an array, map over it
        if (Array.isArray(obj[currentKey])) {
            acc[currentKey] = obj[currentKey].map((entry) => {
                return resolveReferences(entry, ctx);
            });
        }
        // if the value is an object, resolve it's references
        else if (obj[currentKey] &&
            _isObject(obj[currentKey]) &&
            !_isDate(obj[currentKey]) &&
            !_isRegExp(obj[currentKey]) &&
            !_isFunction(obj[currentKey])) {
            // if the value is an object it may be a reference
            if (obj[currentKey] && obj[currentKey].$use) {
                // use getProp to resolve the reference
                const useRef = getProp(ctx, obj[currentKey].$use);
                if (_isObject(useRef)) {
                    // references could contain references, so resolve them
                    acc[currentKey] = resolveReferences(useRef, ctx);
                }
                else {
                    acc[currentKey] = useRef;
                }
            }
            else {
                acc[currentKey] = resolveReferences(obj[currentKey], ctx);
            }
        }
        else {
            // assign value
            acc[currentKey] = obj[currentKey];
        }
        return acc;
    }, {});
    return newObject;
}

/**
 * Recursively deletes properties from an object or array that have a
 * specific value.
 *
 * Hub commonly applies migrations to entities on load. During those
 * migrations, often we want to delete properties to clean things up.
 * However, during the save process, we typically fetch the entity
 * from it's backing store and spread the migrated entity over the top of
 * the fetched entity. This results in the deleted props being re-added.
 *
 * To avoid this, instead of deleting the props in the migration,
 * we can set them to a specific value (e.g. `remove-this-prop`) and then
 * use this function to remove them, after the merge.
 *
 * @param object - The object or array to delete properties from.
 * @param value - The value to match and delete.
 * @returns The modified object or array with properties deleted.
 */
function deepDeletePropByValue(object, value) {
    // If the object is the value we want to delete, return undefined
    if (deepEqual(object, value)) {
        return undefined;
    }
    // If the object is an array, iterate over the array and recurse
    // on the entries
    if (Array.isArray(object)) {
        return object.reduce((acc, entry) => {
            if (isFindable(entry)) {
                const recursedObject = deepDeletePropByValue(entry, value);
                if (recursedObject !== undefined) {
                    acc = [...acc, recursedObject];
                }
            }
            else {
                if (entry !== value) {
                    acc = [...acc, entry];
                } // else we are excluding this entry
            }
            return acc;
        }, []);
    }
    if (_isObject(object)) {
        return Object.keys(object).reduce((acc, key) => {
            // if this is an object but not a date, regexp, or function, recurse
            if (isFindable(object[key]) && !deepEqual(object[key], value)) {
                const filteredEntry = deepDeletePropByValue(object[key], value);
                acc[key] = filteredEntry;
            }
            else {
                // ensure the value is not the value we want to delete
                if (!deepEqual(object[key], value)) {
                    acc = Object.assign(Object.assign({}, acc), { [key]: object[key] });
                } // else this key matches the value and we are excluding it
            }
            return acc;
        }, {});
    }
    else {
        // just return the object b/c it's not something we can compare
        // e.g. a function
        return object;
    }
}

const validServices = [
    "portal",
    "discussions",
    "events",
    "metrics",
    "notifications",
    "hub-search",
    "domains",
    "hub-downloads",
];
/**
 * Validate a Service
 * @param service
 * @returns
 */
function isHubService(maybeService) {
    return validServices.includes(maybeService);
}

/**
 * Given a string, append a `- 1` on the end if no number is present
 * otherwise, increment the number
 * @param {string} str String to increment
 */
function incrementString(str) {
    const matches = str.match(/-\s(\d+$)/);
    if (matches) {
        // get the number
        const current = parseInt(matches[1], 10);
        // replace `- current` with `- current + 1`
        const next = current + 1;
        str = str.replace(`- ${current}`, `- ${next}`);
    }
    else {
        str = str + " - 1";
    }
    return str;
}

/* Copyright (c) 2020 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Runs the given task and returns a IRevertableTaskResult
 * @param {Function} task A task method to run
 * @param {Function} revert A method to revert the task
 * @returns {Promise<IRevertableTaskResult>}
 */
const runRevertableTask = (task, revert) => {
    return task()
        .then(results => {
        return {
            status: "fullfilled",
            results,
            revert
        };
    })
        .catch(error => {
        return { status: "rejected", error };
    });
};
/**
 * Processes an Array of Promise<IRevertableTaskResult>. When all IRevertableTaskResult
 * are IRevertableTaskSuccess, it resolves an Array of all result values. If any
 * IRevertableTaskResult are IRevertableTaskFailed, it reverts all IRevertableTaskSuccess
 * and rejects with the first IRevertableTaskFailed error
 * @param revertableTasks
 * @returns {Promise<any[]>}
 */
const processRevertableTasks = (revertableTasks) => {
    return Promise.all(revertableTasks).then(results => {
        const isFullfilled = (result) => result.status === "fullfilled";
        const successfulTasks = results.filter(isFullfilled);
        const failedTasks = results.filter((result) => !isFullfilled(result));
        if (failedTasks.length) {
            const reverts = successfulTasks.map(task => task.revert());
            // fire & forget
            /* tslint:disable no-empty */
            Promise.all(reverts).catch(() => { });
            /* tslint:enable no-empty */
            throw failedTasks[0].error;
        }
        const returnResults = successfulTasks.map((result) => result.results);
        return returnResults;
    });
};

/**
 * Create a cache key from an array of arguments
 * @param args
 * @returns
 */
const createCacheKeyFromArgs = (args) => args.reduce((cacheKey, arg) => (cacheKey += `_${typeof arg === "object" ? JSON.stringify(args) : `${arg}`}_`), "");
let memoizedFnCache = {};
/**
 * Wrap a function into a memoized version of itself. Multiple calls for the same function
 * will return the same memoized function - thus enabling a shared cache of results.
 * `const memoizedItemSearch = memoize(searchItems);`
 * @param fn
 * @returns
 */
const memoize = (fn) => {
    if (!memoizedFnCache[`_${fn.name}`]) {
        const cache = {};
        const memoizedFn = (...args) => {
            const cacheKey = createCacheKeyFromArgs(args);
            if (cache[cacheKey]) {
                return cache[cacheKey];
            }
            const asyncFn = fn.call(undefined, ...args);
            cache[cacheKey] = asyncFn;
            return asyncFn;
        };
        memoizedFnCache[`_${fn.name}`] = memoizedFn;
    }
    return memoizedFnCache[`_${fn.name}`];
};
/**
 * Clear the cache of a memoized function
 * If no function name is provided, the entire cache is cleared
 * This is useful for testing, but should not be used in production
 * @param fn
 */
const clearMemoizedCache = (fnName) => {
    if (!fnName) {
        memoizedFnCache = {};
        return;
    }
    else {
        delete memoizedFnCache[`_${fnName}`];
    }
};

/**
 * Apply a hash of properties to an array of items.
 * Extracted to simplify testing.
 * @param {array} items Array of items to apply the properties to
 * @param {object} props hash of properties to apply to the item
 */
function applyPropertiesToItems(items, props) {
    return items.map((item) => {
        if (!item.properties) {
            item.properties = {};
        }
        Object.assign(item.properties, props);
        return item;
    });
}

/**
 * Check if a site/page exists with a specific name
 */
function doesItemExistWithTitle(itemTitle, options, authMgr) {
    // if options have multiple properties, put them into one string separated with 'AND'
    const optionsQuery = Object.keys(options)
        .map(key => {
        return `${key}:"${options[key]}"`;
    })
        .join(" AND ");
    const opts = {
        q: `title:"${itemTitle}" AND ${optionsQuery}`,
        authentication: authMgr
    };
    return searchItems(opts)
        .then(searchResponse => searchResponse.results.length > 0)
        .catch(e => {
        throw Error(`Error in doesItemExistWithTitle ${e}`);
    });
}

/**
 * Given a title, construct a site/page title that is unique
 * if that title exists, this fn will add a number on the end, and increment until
 * an available title is found
 * @param {string} title site/page title to ensure if unique
 * @param {object} options an object that can be passed in to the q, eg. typekeywords, type
 * @param {object} authMgr auth info tells the function what url to use for the "root" of the API,
 * if missing, it will search against PROD
 * @param {number} step Number to increment. Defaults to 0
 */
function getUniqueItemTitle(title, options, authMgr, step = 0) {
    let combinedName = title;
    if (step) {
        combinedName = `${title} ${step}`;
    }
    return doesItemExistWithTitle(combinedName, options, authMgr)
        .then(result => {
        if (result) {
            step++;
            return getUniqueItemTitle(title, options, authMgr, step);
        }
        else {
            return combinedName;
        }
    })
        .catch(e => {
        throw Error(`Error in getUniqueItemTitle ${e}`);
    });
}

const MAX_NUM = 100;
/**
 * Fetches all the pages in a search request
 * @param {SearchFunction} searchFunc
 * @param {ISearchOptions} opts
 * @param {number} limit
 * @param {batchSize} number of concurrent requests at a time
 * @returns {Promise<SearchableType[]>}
 */
function fetchAllPages(searchFunc, opts, limit = -1, batchSize) {
    const pageSize = opts.num || MAX_NUM;
    const firstStart = opts.start || 1;
    // If a limit is provided, we don't have to use the first request to get the
    // total count before sending things off to batch(). So instead we fake the first
    // response just to set things up.
    const promise = limit === -1
        ? searchFunc(Object.assign(Object.assign({}, opts), { num: pageSize, start: firstStart }))
        : Promise.resolve({
            nextStart: firstStart,
            total: limit,
            results: [],
            num: pageSize
        });
    return promise
        .then(firstResponse => {
        // no more requests needed, return the first response
        if (firstResponse.nextStart === -1)
            return [firstResponse];
        // generate batch requests for the remaining pages to fetch
        const starts = [];
        for (let i = firstResponse.nextStart; i <= firstResponse.total; i += pageSize) {
            starts.push(i);
        }
        const batchSearchFunc = (start) => searchFunc(Object.assign(Object.assign({}, opts), { start, num: pageSize }));
        return batch(starts, batchSearchFunc, batchSize).then(responses => [
            firstResponse,
            ...responses
        ]);
    })
        .then(responses => {
        // merge all the search results into a single array
        const results = responses.reduce((acc, response) => [
            ...acc,
            ...response.results
        ], []);
        // discard results beyond the limit if applicable
        const clipLimit = limit === -1 ? results.length : limit;
        return results.slice(0, clipLimit);
    });
}

/**
 * Add protocol or upgrade http to https
 * @param {string} url
 */
function upgradeProtocol(url) {
    if (url.indexOf("http") === -1) {
        return `https://${url}`;
    }
    else if (url.indexOf("http://") !== -1) {
        return url.replace(/^http:/i, "https:");
    }
    return url;
}

/**
 * Given a url without a protocol or with either http or https, return an array
 * that contains both the http and https version
 * @param {string} uri Url with either http or https, or no protocol
 * @private
 */
function _getHttpAndHttpsUris(uri) {
    if (!uri) {
        return [];
    }
    const domain = uri.replace(/^http(s?):\/\//, "");
    return [`http://${domain}`, `https://${domain}`];
}

/**
 * Wrapper over window.location
 * @private
 */
/* istanbul ignore next */
function _getLocation() {
    /* istanbul ignore next */
    if (window) {
        return window.location;
    }
}

/**
 * Return the Hub Url based on the portal self
 * @param portal
 */
function getHubUrlFromPortal(portal) {
    if (portal.isPortal) {
        throw new Error(`Hub Url is not available in ArcGIS Enterprise`);
    }
    else {
        return _getHubUrlFromPortalHostname(portal.portalHostname);
    }
}

/**
 * Return the Portal url based on the portal self
 * @param {Object} portal Portal Self
 */
function getHubApiUrlFromPortal(portal) {
    return `${getHubUrlFromPortal(portal)}/api/v3`;
}

/**
 * Convert urls in a string to hyperlinks
 * @param {content} string
 */
function convertUrlsToAnchorTags(content) {
    const urls = content.match(/((((ftp|https?):\/\/)|(w{3}\.))[-\w@:%_+.~#?,&//=]+)/g);
    if (urls) {
        urls.forEach(function (url) {
            content = content.replace(url, '<a target="_blank" href="' + url + '">' + url + "</a>");
        });
    }
    return content.replace("(", "<br/>(");
}

/**
 * Builds a Hub "campaign" URL used as a single entry-point into
 * Hub from external links, i.e. push notifications, emails, sms, etc,
 * from which we can capture campaign-related telemetry before redirecting
 * the user off to a provided destination.
 * @param options.portal A string IPortal IHubRequestOptions or IRequestOptions object
 * @param options.uri A URI that provides additional context for how to parse the provide meta
 * @param options.meta An object of metadata for the campaign URL
 * @param options.redirectURL A redirect URL
 * @returns string A campaign URL
 */
function getCampaignUrl(options) {
    const { portal } = options, data = __rest(options, ["portal"]);
    const portalUrl = getPortalUrl$1(portal);
    const hubURL = _getHubUrlFromPortalHostname(portalUrl);
    const url = new URL(`${hubURL}/c`);
    const b64Data = abab.btoa(JSON.stringify(data));
    url.searchParams.set("d", b64Data);
    return url.toString();
}

const SAFE_REDIRECT_URL = new RegExp("^https?:\\/\\/([a-z0-9-]+\\.)*(arcgis|esri)\\.com");
const HTTP_PROTOCOL = new RegExp("^https?:$");
/**
 * Determines if a given URL is safe to redirect to.
 * All URLs to *.esri.com and *.arcgis.com are considered
 * safe. Non esri/arcgis domains must have a domain record.
 * @param options.url url A URL
 * @param ...options An IHubRequestOptions object
 * @returns a promise that resolves a boolean
 */
async function isSafeRedirectUrl(options) {
    const { url } = options, hubRequestOptions = __rest(options, ["url"]);
    let isSafe;
    try {
        isSafe = SAFE_REDIRECT_URL.test(url);
        if (!isSafe) {
            const { protocol, hostname } = new URL(url);
            if (!HTTP_PROTOCOL.test(protocol)) {
                throw new Error("invalid protocol");
            }
            isSafe = await domainExists(hostname, hubRequestOptions);
        }
    }
    catch (e) {
        isSafe = false;
    }
    return isSafe;
}

/**
 * @private
 * @internal
 * Register an Item as an application, enabling oAuth flows at custom
 * domains. Only item types with "Application" in the name are valid
 * with this API call.
 * @param {string} itemId Item Id of item to create an application for
 * @param {Array} redirectUris Array of valid redirect uris for the app
 * @param {string} appType Defaults to "browser"
 * @param {IRequestOptions} requestOptions
 */
function registerBrowserApp(itemId, redirectUris, requestOptions) {
    const url = `${getPortalApiUrl(requestOptions)}/oauth2/registerApp`;
    const options = {
        method: "POST",
        authentication: requestOptions.authentication,
        params: {
            itemId,
            appType: "browser",
            redirect_uris: JSON.stringify(redirectUris),
        },
    };
    return request(url, options);
}

// TODO: remove this at next breaking version
/**
 * ```js
 * import { getCategory } from "@esri/hub-common";
 * //
 * getCategory('Feature Layer')
 * > 'dataset'
 * ```
 * **DEPRECATED: Use getFamily() instead**
 * returns the Hub category for a given item type
 * @param itemType The ArcGIS [item type](https://developers.arcgis.com/rest/users-groups-and-items/items-and-item-types.htm).
 * @returns the category of a given item type.
 */
/* istanbul ignore next deprecated */
function getCategory(itemType = "") {
    /* tslint:disable no-console */
    console.warn("DEPRECATED: Use getFamily() instead. getCategory will be removed at the next breaking version");
    /* tslint:enable no-console */
    const collection = getCollection(itemType);
    // for backwards compatibility
    return collection === "feedback" ? "app" : collection;
}
/**
 * ```js
 * import { getTypes } from "@esri/hub-common";
 * //
 * getTypes('site')
 * > [ 'hub site application' ]
 * ```
 * To do.
 * @param category The ArcGIS Hub category.
 * @returns all the item types for the given category.
 *
 */
function getTypes(category = "") {
    return categories[category.toLowerCase()];
}
/**
 * ```js
 * import { getTypeCategories } from "@esri/hub-common";
 * //
 * getTypeCategories(item)
 * > [ 'Hub Site Application' ]
 * ```
 * **DEPRECATED: getTypeCategories will be removed at the next breaking version**
 * @param item Item object.
 * @returns typeCategory of the input item.
 *
 */
/* istanbul ignore next deprecated */
function getTypeCategories(item = {}) {
    /* tslint:disable no-console */
    console.warn("DEPRECATED: getTypeCategories will be removed at the next breaking version");
    /* tslint:enable no-console */
    const type = normalizeItemType(item);
    const category = getCategory(type);
    if (category) {
        // upper case first letter and return as element in array for backwards compatibility
        const chars = Array.from(category);
        chars[0] = chars[0].toUpperCase();
        return [chars.join("")];
    }
    else {
        return ["Other"];
    }
}
/**
 * ```js
 * import { getContentIdentifier } from "@esri/hub-common";
 * //
 * getContentIdentifier(content, site)
 * > 'f12hhjk32' // id
 * // OR
 * > 'content-slug' // human-readable slug
 * ```
 * Returns the preferred identifier for a piece of content (determined by content type):
 * - Content from the 'template' and 'feedback' families return the standard id field
 * - Pages that are linked to the site parameter will return the slug defined by the site. Otherwise, the page id will be returned
 * - All other content will return the highest available item in the following hierarchy:
 *   1. slug - includes org prefix if the site parameter is a portal or has an orgKey different from the slug prefix
 *   2. hubId
 *   3. id
 * @param content The IHubContent item
 * @param site The site to compare content against
 * @returns the preferred id for the given content.
 */
function getContentIdentifier(content, site) {
    // We don't currently support slugs for hub initiative templates, solutions or surveys
    if (includes(["template", "feedback"], content.family)) {
        return content.id;
    }
    // If it is a hub page linked to a site, return the page slug at the
    // site data instead. Because this one is the original one that was used
    // to create the page url (not mutable once created) and the slug (below)
    // generated by the hub-indexer could simply change with page name.
    if (isPageType(content.type, content.typeKeywords)) {
        // check if the page is linked to the current site
        const pages = getProp(site, "data.values.pages") || [];
        // if so, return the page slug otherwise the page id
        const page = pages.find((p) => p.id === content.id);
        return page ? page.slug : content.id;
    }
    // If a slug is present, always return it
    if (content.slug) {
        let slug;
        const orgKey = getProp(site, "domainInfo.orgKey");
        // Use namespaced slug when on the umbrella site
        if (getProp(site, "data.values.isUmbrella")) {
            slug = content.slug;
        }
        else {
            // Use shortened slug if the slug's namespace is the same as the orgKey
            slug = removeContextFromSlug(content.slug, orgKey);
        }
        return slug;
    }
    return content.hubId || content.id;
}
/**
 * Convert a Portal item to Hub content
 *
 * @param item Portal Item
 * @returns Hub content
 * @export
 */
function itemToContent(item) {
    return composeContent(item);
}
/**
 * Convert a Hub API dataset resource to Hub Content
 *
 * @param {DatasetResource} Dataset resource
 * @returns {IHubContent} Hub content object
 * @export
 */
function datasetToContent(dataset) {
    // extract item from dataset, create content from the item
    const item = datasetToItem(dataset);
    // extract enrichments from attributes
    const { 
    // item enrichments
    errors, boundary, metadata, slug, groupIds, orgId, orgName, organization, orgExtent, 
    // map and feature server enrichments
    server, layers, layer, recordCount, statistics, 
    // additional attributes needed
    extent, searchDescription, } = dataset.attributes;
    // get the layerId from the layer
    const layerId = layer && layer.id;
    // re-assemble the org as an enrichment
    const org = orgId && {
        id: orgId,
        name: orgName || organization,
        extent: orgExtent,
    };
    // compose a content out of the above
    return composeContent(item, {
        layerId,
        slug,
        errors,
        // setting this to null signals to enrichMetadata to skip this
        metadata: metadata || null,
        groupIds,
        org,
        server,
        layers,
        recordCount,
        boundary,
        extent,
        searchDescription,
        statistics,
    });
}
/**
 * Convert a Hub API dataset resource to a portal item
 *
 * @param {DatasetResource} Dataset resource
 * @returns {IItem} portal item
 * @export
 */
function datasetToItem(dataset) {
    if (!dataset) {
        return;
    }
    const { id, attributes } = dataset;
    if (!attributes) {
        return;
    }
    // parse item id
    const { itemId } = parseDatasetId(id);
    // read item properties from attributes
    // NOTE: we attempt to read all item properties
    // even though some may not be currently returned
    const { 
    // start w/ item properties from
    // https://developers.arcgis.com/rest/users-groups-and-items/item.htm
    owner, orgId, created, 
    // the Hub API returns item.modified in attributes.itemModified (below)
    modified, 
    // NOTE: we use attributes.name to store the title or the service/layer name
    // but in Portal name is only used for file types to store the file name (read only)
    name, title, type, typeKeywords, description, snippet, tags, thumbnail, 
    // the Hub API returns item.extent in attributes.itemExtent (below)
    // extent,
    categories, contentStatus, 
    // the Hub API doesn't currently return spatialReference
    spatialReference, 
    // the Hub API doesn't currently return accessInformation
    accessInformation, licenseInfo, culture, url, access, 
    // the Hub API doesn't currently return proxyFilter
    proxyFilter, properties, 
    // the Hub API doesn't currently return appCategories, industries,
    // languages, largeThumbnail, banner, screenshots, listed, ownerFolder
    appCategories, industries, languages, largeThumbnail, banner, screenshots, listed, ownerFolder, size, 
    // the Hub API doesn't currently return protected
    protected: isProtected, commentsEnabled, 
    // the Hub API doesn't currently return numComments, numRatings,
    // avgRating, numViews, itemControl, scoreCompleteness
    numComments, numRatings, avgRating, numViews, itemControl, scoreCompleteness, 
    // additional attributes we'll need
    // to derive the above values when missing
    itemExtent, itemModified, modifiedProvenance, serviceSpatialReference, } = attributes;
    // layer datasets will get their type from the layer
    // so we will need to derive the item type from the URL
    const serviceType = url && getServiceTypeFromUrl(url);
    // build and return an item from properties
    // NOTE: we currently do NOT provide default values
    // (i.e. null for scalar attributes, [] for arrays, etc)
    // for attributes that are not returned by the Hub API
    // this helps distinguish an item that comes from the API
    // but forces all consumers to do handle missing properties
    return {
        id: itemId,
        owner: owner,
        orgId,
        created: created,
        // for feature layers, modified will usually come from the layer so
        // we prefer itemModified, but fall back to modified if it came from the item
        modified: (itemModified ||
            (modifiedProvenance === "item.modified" && modified)),
        title: (title || name),
        type: serviceType || type,
        typeKeywords,
        description,
        tags,
        snippet,
        thumbnail,
        extent: itemExtent ||
            /* istanbul ignore next: API should always return itemExtent, but we default to [] just in case */ [],
        categories,
        contentStatus,
        spatialReference: spatialReference || serviceSpatialReference,
        accessInformation,
        licenseInfo,
        culture,
        url,
        access,
        size,
        protected: isProtected,
        proxyFilter,
        properties,
        appCategories,
        industries,
        languages,
        largeThumbnail,
        banner,
        screenshots,
        listed,
        ownerFolder,
        commentsEnabled,
        numComments,
        numRatings,
        avgRating,
        numViews,
        itemControl,
        scoreCompleteness,
    };
}
/**
 * returns a new content that has the specified type and
 * and updated related properties like, family, etc
 * @param content orignal content
 * @param type new type
 * @returns new content
 */
const setContentType = (content, type) => {
    // get family and normalized type based on new type
    const normalizedType = normalizeItemType(Object.assign(Object.assign({}, content.item), { type }));
    const family = getFamily(normalizedType);
    const contentTypeIcon = getContentTypeIcon(normalizedType);
    const contentTypeLabel = getContentTypeLabel(normalizedType, content.isProxied);
    const updated = Object.assign(Object.assign({}, content), { type: normalizedType, family,
        contentTypeIcon,
        contentTypeLabel });
    // update the relative URL to the content
    // which is based on type and family
    return appendContentUrls(updated, {
        relative: getContentRelativeUrl(updated),
    });
};
/**
 * Compute the content type label
 * @param contentType
 * @param isProxied
 * @returns content type label
 */
const getContentTypeLabel = (contentType, isProxied) => {
    return isProxied ? "CSV" : camelize(contentType || "");
};
// URL helpers
const appendContentUrls = (content, newUrls) => {
    // merge new urls into existing ones and return a new content
    const urls = Object.assign(Object.assign({}, content.urls), newUrls);
    return Object.assign(Object.assign({}, content), { urls });
};
const getContentRelativeUrl = (content, siteIdentifier) => {
    return getHubRelativeUrl(content.type, siteIdentifier || content.identifier, content.typeKeywords);
};
// Tests can be found in packages/common/test/content/content.test.ts
const availability = (status) => {
    return {
        kind: "service",
        service: {
            availability: status,
        },
    };
};
/**
 * Get the status of a content item
 * @param entity the content item
 * @returns the status of the content item
 */
async function getServiceStatus(entity, options) {
    // get the request options for the `getService` call, and set a default timeout if one is not provided
    const { timeout = 3000 } = options, requestOptions = __rest(options, ["timeout"]);
    const { url } = entity;
    const hasUrl = !!url;
    if (!hasUrl) {
        return availability("available");
    }
    const hasQueryParams = url.includes("?");
    const isServiceBackedEntity = isService(hasQueryParams ? url.split("?")[0] : url); // remove any query params
    if (isServiceBackedEntity) {
        // set up our two promises: one to get the service definition and one to sleep for 3 seconds
        const definitionPromise = getService(Object.assign({ url }, requestOptions))
            .then(() => {
            // if the service is returned, then we consider it available
            return availability("available");
        })
            .catch((error) => {
            // see interface IHubServiceBackedContentStatus for possible
            // availability values and what each signifies
            if (error.response) {
                const statusCode = error.response.error.code;
                const requiresAuth = [401, 403, 499].includes(statusCode);
                return requiresAuth
                    ? availability("auth-required")
                    : availability("unavailable");
            }
            else {
                // sometimes, the 499 status code is returned as a "failed to fetch" error
                return availability("auth-required");
            }
        });
        // race the two promises
        const status = Promise.race([definitionPromise, await wait(timeout)]).then((result) => {
            // if result is undefined, the service is slow
            // otherwise, the service is available OR unavailable, depending on how the promise resolves
            return result ? result : availability("slow");
        });
        return status;
    }
    else {
        // if we don't have a url or it is not a service backed entity, assume it is available
        return availability("available");
    }
}

/**
 * Convert the resources array on an individual template in a solution
 * into an assets array that can be used to upload the resources to
 * the newly created item.
 * @param {object} template Template from a Solution
 * @param {IHubRequestOptions} hubRequestOptions
 */
function convertSolutionTemplateResourcesToAssets(template, hubRequestOptions) {
    let assets = [];
    if (template.resources && template.bundleItemId) {
        const portalRestUrl = getPortalApiUrl(hubRequestOptions.portalSelf);
        // the resources are stored on the solution item, and that Id is attached
        // into the template as .bundleItemId
        const solutionItemUrl = `${portalRestUrl}/content/items/${template.bundleItemId}`;
        // the resources on the solution are prefixed with the item id of the item the
        // template was created from, which is stored as .itemId
        const prefix = template.itemId;
        // map over the resources and convert them into assets
        assets = template.resources.map(name => {
            // we fetch the resource from .url property
            // and we upload it using the .name property
            return {
                name,
                type: "resource",
                url: `${solutionItemUrl}/resources/${prefix}-${name}`
            };
        });
    }
    return assets;
}

/**
 * composes a Hub content entity from an item and optional enrichments
 * @param item item to compose content from
 * @param requestOptions request options (needed to determine certain urls)
 * @param enrichments enrichments to use during composition
 * @returns content entity
 */
const composeHubContent = (item, requestOptions, enrichments) => {
    // we must normalize the underlying item type to account
    // for older items (e.g. sites that are type "Web Mapping
    // Application") before we map the model to a Hub Entity
    const normalizedItem = cloneObject(item);
    const type = normalizeItemType(item);
    setProp("type", type, normalizedItem);
    return modelToHubEditableContent({ item: normalizedItem }, requestOptions, enrichments);
};

/**
 * Convert a user hub search result into a card view model that
 * can be consumed by the suite of hub gallery components
 *
 * @param searchResult hub user search result
 * @param opts view model options
 */
const userResultToCardModel = (searchResult, opts) => {
    const { actionLinks = [], baseUrl = "", locale = "en-US", target = "self", } = opts || {};
    const titleUrl = getCardModelUrlFromResult(searchResult, target, baseUrl);
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, getSharedUserCardModel(searchResult)), { actionLinks }), (!isNaN(searchResult.index) && { index: searchResult.index })), { titleUrl }), (searchResult.links.thumbnail && {
        thumbnailUrl: searchResult.links.thumbnail,
    }));
};
/**
 * Given a hub search result, construct the
 * users card view model properties
 *
 * @param user user search result
 * @param locale internationalization locale
 */
const getSharedUserCardModel = (user) => {
    const badges = [];
    const memberType = user.memberType;
    /**
     * for group members, we want to configure
     * member type badges to render in the user
     * card
     */
    if (memberType) {
        if (user.isGroupOwner) {
            badges.push({
                icon: "user-key",
                color: "gray",
                i18nKey: "badges.members.owner",
                hideLabel: true,
                tooltip: { i18nKey: "badges.members.owner" },
            });
        }
        else if (memberType === "admin") {
            badges.push({
                icon: "user-up",
                color: "gray",
                i18nKey: "badges.members.admin",
                hideLabel: true,
                tooltip: { i18nKey: "badges.members.admin" },
            });
        }
        else {
            badges.push({
                icon: "user",
                color: "gray",
                i18nKey: "badges.members.member",
                hideLabel: true,
                tooltip: { i18nKey: "badges.members.member" },
            });
        }
    }
    return {
        access: user.access,
        badges,
        family: user.family,
        id: user.id,
        source: user.name ? `@${user.id}` : undefined,
        summary: user.summary,
        title: user.name || `@${user.id}`,
        type: user.type,
    };
};

/**
 * DEPRECATED: Use `getFeedTemplate()` instead
 * this can be deleted once we remove the feed editor from the content-library (Ember addon)
 * Returns feed configuration from a site model
 *
 * @param {IModel} site - site model
 * @param {FeedFormat} format - feed format
 * @param {string} version  - semantic version
 */
function getFeedConfiguration(site, format, version) {
    if (format === "dcat-us") {
        return getDcatUsConfig(site, version);
    }
    if (format === "dcat-ap") {
        return getDcatApConfig(site, version);
    }
    if (format === "rss") {
        return getRssConfig(site, version);
    }
    throw new Error("Unsupported feed format");
}
/**
 * DEPRECATED: This will be removed in the next breaking version. Use `setFeedTemplate()` instead;
 * Returns feed configuration from a site model
 *
 * @param {IModel} site - site model
 * @param {FeedFormat} format - feed format
 * @param {string} version  - semantic version
 * @param {Record<string, any>} feedConfig - feed configuration
 */
function setFeedConfiguration(site, format, version, feedConfig) {
    if (format === "dcat-us") {
        setDcatUsConfig(site, version, feedConfig);
        return;
    }
    if (format === "dcat-ap") {
        setDcatApConfig(site, version, feedConfig);
        return;
    }
    if (format === "rss") {
        setRssConfig(site, version, feedConfig);
        return;
    }
    throw new Error("Unsupported feed format");
}
function getDcatApConfig(site, version) {
    if (getMajorVersion(version) === "2") {
        return site.data.feeds.dcatAP2XX || site.data.feeds.dcatAP201;
    }
    throw new Error("Unsupported DCAT AP version");
}
function getDcatUsConfig(site, version) {
    if (getMajorVersion(version) === "1") {
        return site.data.feeds.dcatUS1X || site.data.feeds.dcatUS11;
    }
    throw new Error("Unsupported DCAT US version");
}
function getRssConfig(site, version) {
    if (getMajorVersion(version) === "2") {
        return site.data.feeds.rss2;
    }
    throw new Error("Unsupported RSS version");
}
function setDcatApConfig(site, version, config) {
    if (getMajorVersion(version) === "2") {
        site.data.feeds.dcatAP2XX = config;
        return;
    }
    throw new Error("Unsupported DCAT AP Version");
}
function setDcatUsConfig(site, version, config) {
    if (getMajorVersion(version) === "1") {
        site.data.feeds.dcatUS1X = config;
        return;
    }
    throw new Error("Unsupported DCAT US Version");
}
function setRssConfig(site, version, config) {
    if (getMajorVersion(version) === "2") {
        site.data.feeds.rss2 = config;
        return;
    }
    throw new Error("Unsupported RSS Version");
}

/**
 * Checks if user has access to edit an event in Hub
 * @param {IEventModel} model consolidated event model as consumed by Hub, contains the event feature, related initiative model, and attendees group
 * @param {IUser} user
 * @returns {boolean}
 */
function canEditEvent(model, user) {
    let res = false;
    if (hasBasePriv(user)) {
        const coreTeamId = model.initiative
            ? getProp(model, "initiative.item.properties.collaborationGroupId")
            : getProp(model, "site.properties.collaborationGroupId");
        const { groups = [] } = user;
        res = !!coreTeamId && !!findBy(groups, "id", coreTeamId);
    }
    return res;
}

const REQUIRED_PRIVS = [
    "portal:user:createGroup",
    "portal:user:createItem",
    "portal:user:shareToGroup",
    "portal:user:viewOrgGroups",
    "portal:user:viewOrgItems"
];
/**
 * Checks if user has access to content library in Hub
 * In Hub Home context, user access requires additional privileges
 * In initiative context, check is delegated to canEditItem for the initiative site item
 * @param {IItem} item
 * @param {IUser} user
 * @returns {boolean}
 */
function canEditSiteContent(item, user) {
    let res = false;
    const isDefaultHubHome = getProp(item, "properties.isDefaultHubHome");
    const hasPriv = hasBasePriv(user);
    if (!isDefaultHubHome && hasPriv) {
        res = canEditItem(item, user);
    }
    else if (hasPriv) {
        const userOrgId = user.orgId;
        const itemOrgId = item.orgId;
        const sameOrg = !!userOrgId && userOrgId === itemOrgId;
        if (sameOrg) {
            const privileges = user.privileges || [];
            res = REQUIRED_PRIVS.every(privilege => includes(privileges, privilege));
        }
    }
    return res;
}

/**
 * Checks if user has access to edit site in Hub
 * Currently, Hub Home sites are not editable
 * In initiative context, check is delegated to canEditItem for the initiative site item
 * @param {IItem} model
 * @param {IUser} user
 * @returns {boolean}
 */
function canEditSite(model, user) {
    let res = false;
    const isDefaultHubHome = getProp(model, "properties.isDefaultHubHome");
    if (!isDefaultHubHome && hasBasePriv(user)) {
        res = canEditItem(model, user);
    }
    return res;
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * A thin wrapper around [`UserSession.completeOAuth2()`](https://esri.github.io/arcgis-rest-js/api/auth/UserSession/#completeOAuth2) that sets search tags and other relevant metadata for newly created community users.
 */
/* istanbul ignore next */
function completeOAuth2(options, win = window) {
    const match = win.location.href.match(/access_token=(.+)&expires_in=.+&username=([^&]+)/);
    const token = match[1];
    const user = decodeURIComponent(match[2]);
    const baseUrl = `https://www.arcgis.com/sharing/rest/community/users/${user}`;
    return request(baseUrl, {
        params: { token },
        httpMethod: "GET"
    }).then(response => {
        if (Date.now() - response.created < 5000) {
            return request(`${baseUrl}/update`, {
                params: {
                    token,
                    tags: ["hubRole:participant", `org:${response.orgId}`],
                    access: "public"
                }
            }).then(() => {
                return UserSession.completeOAuth2(options);
            });
        }
        else {
            return UserSession.completeOAuth2(options);
        }
    });
}

/**
 * @private
 */
function _consolidateResults(context) {
    const { autoAddResult, inviteResult, primaryEmailResult, secondaryEmailResult } = context;
    let combinedEmailResults;
    if (primaryEmailResult || secondaryEmailResult) {
        const validResults = [primaryEmailResult, secondaryEmailResult].filter(r => r);
        const combinedSuccess = validResults.every(r => r.success);
        const combinedErrors = validResults.reduce((collection, r) => collection.concat(getWithDefault(r, "errors", [])), []);
        combinedEmailResults = {
            success: combinedSuccess
        };
        if (combinedErrors.length) {
            combinedEmailResults.errors = combinedErrors;
        }
    }
    const overallSuccess = [autoAddResult, inviteResult, combinedEmailResults]
        .filter(r => r)
        .every(r => r.success);
    return {
        success: overallSuccess,
        autoAdd: autoAddResult,
        invite: inviteResult,
        email: combinedEmailResults
    };
}

/**
 * @private
 *
 * Coerce autoAdd response into a more similar interface as
 * the other rest calls.
 *
 * If any users are not auto added, an error is added to the response
 * and unadded users are placed into the invitation list
 */
function _formatAutoAddResponse(rawResponse, context) {
    if (rawResponse) {
        const success = !getProp(rawResponse, "notAdded.length") && !rawResponse.errors;
        context.autoAddResult = { success };
        if (!success) {
            const errors = rawResponse.errors || [];
            if (getProp(rawResponse, "notAdded.length")) {
                errors.push(new ArcGISRequestError(`Users not auto-added: ${rawResponse.notAdded.join(", ")}`));
            }
            context.autoAddResult.errors = errors;
            // Move unadded users to invite list;
            const unaddedUsers = context.usersToAutoAdd.filter(user => includes(rawResponse.notAdded, user.username));
            context.usersToInvite = context.usersToInvite.concat(unaddedUsers);
        }
    }
    return context;
}

/**
 * @private
 *
 * returns whether or not the users are in the same org
 */
function _canEmailUser(recipient, sender) {
    return recipient.orgId === sender.orgId;
}

/**
 * @private
 */
function _isOrgAdmin(user) {
    return user.role === "org_admin" && !user.roleId;
}

/**
 * Attempts to email members of the requesting user's organization.
 *
 * @param {IUser[]} users Users to email (must be in the same org as the requesting user)
 * @param {IEmail} email
 * @param {IAuthenticationManager} authentication
 * @param {boolean} isOrgAdmin // Whether the requesting user in an org admin
 *
 * @returns {object|null} A promise that resolves to the result of the transaction (null if no users are passed in)
 */
function emailOrgUsers(users, email, authentication, isOrgAdmin) {
    let response = Promise.resolve(null);
    if (users.length) {
        const args = {
            authentication,
            message: email.body,
            subject: email.subject,
            notificationChannelType: "email",
            users: users.map((u) => u.username),
        };
        if (!isOrgAdmin) {
            args.batchSize = 1;
        }
        response = createOrgNotification(args);
    }
    return response;
}

/**
 * @private
 *
 * If a secondary authentication is passed in AND
 * an email object is passed in AND
 * the previous invitation call was successful:
 *
 * Send an email notification to the invited
 * users that are part of the secondary authentication's org
 */
function _processSecondaryEmail(context) {
    let response = Promise.resolve(context);
    // If secondaryRO provided, send email to the invited users in the secondaryRO's org (typically a community org)
    if (context.email &&
        context.secondaryRO &&
        getProp(context, "inviteResult.success")) {
        const secondaryUser = getWithDefault(context, "secondaryRO.portalSelf.user", {});
        const secondaryOrgUsersToEmail = context.usersToInvite.filter((u) => _canEmailUser(u, secondaryUser));
        response = emailOrgUsers(secondaryOrgUsersToEmail, context.email, context.secondaryRO.authentication, _isOrgAdmin(secondaryUser)).then((result) => {
            context.secondaryEmailResult = result;
            return context;
        });
    }
    return response;
}

/**
 * @private
 */
function _processAutoAdd(context) {
    return autoAddUsers(getProp(context, "groupId"), getProp(context, "usersToAutoAdd"), getProp(context, "primaryRO.authentication")).then((rawResponse) => _formatAutoAddResponse(rawResponse, context));
}

/**
 * @private
 */
function _processInvite(context) {
    return inviteUsers(getProp(context, "groupId"), getProp(context, "usersToInvite"), getProp(context, "primaryRO.authentication")).then((result) => {
        context.inviteResult = result;
        return context;
    });
}

/**
 * @private
 *
 * Send email notification if an email object is present and
 * the previous invitation call was successful
 */
function _processPrimaryEmail(context) {
    let response = Promise.resolve(context);
    // Email users if invite succeeds
    if (context.email && getProp(context, "inviteResult.success")) {
        response = emailOrgUsers(context.usersToEmail, context.email, context.primaryRO.authentication, _isOrgAdmin(context.requestingUser)).then((result) => {
            context.primaryEmailResult = result;
            return context;
        });
    }
    return response;
}

/**
 * @private
 *
 * A user can be auto-added if they are part of the requesting user's e-org
 * or c-org and the requesting user has the assignToGroups privilege
 */
function _getAutoAddUsers(users, requestingUser) {
    let usersToAutoAdd = [];
    if (requestingUser.privileges.indexOf("portal:admin:assignToGroups") !== -1) {
        const orgIds = [requestingUser.orgId, requestingUser.cOrgId].filter(o => o);
        usersToAutoAdd = users.filter(u => orgIds.indexOf(u.orgId) !== -1);
    }
    return usersToAutoAdd;
}

/**
 * @private
 *
 * A user will be invited if they cannot be auto-added
 */
function _getInviteUsers(users, requestingUser) {
    const autoAddedUsers = _getAutoAddUsers(users, requestingUser);
    return users.filter(user => !autoAddedUsers.some(aau => aau.username === user.username));
}

/**
 * @private
 *
 * A user can be emailed if they are invited (not auto-added)
 * and the _canEmailUser condition is met
 */
function _getEmailUsers(users, requestingUser, includeSelf = false) {
    const invitedUsers = _getInviteUsers(users, requestingUser);
    const emailUsers = invitedUsers.filter(user => _canEmailUser(user, requestingUser));
    if (includeSelf) {
        emailUsers.push(requestingUser);
    }
    return emailUsers;
}

/**
 * Adds, invites or emails users about joining a group
 * based on the permissions of the requesting user. The
 * function returns a hash of results indicating which
 * operations were attempted and whether they were successful.
 *
 * In general, this algorithm will auto-add all the users
 * that it can, invite the others, and send emails to eligible
 * invited users (See below for more details)
 *
 * Here are a couple caveats to be aware of:
 * 1) If the requestingUser can auto-add to the group (A.K.A. has
 * portal:admin:assignToGroups) no email will be sent, period.
 * 2) Emails can only be sent to members of the same org as the
 * requesting user if they have been invited (not auto-added)
 * to the group. If emails must to be sent to invited members
 * of a second org (e.g a community org), an authenticated user
 * of the second org must be passed in (see secondaryRO)
 * 3) If no email is passed in, no email will be sent
 * 4) If auto-adding fails, the unadded users will be invited
 *
 * @param {string} groupId
 * @param {IUser[]} allUsers
 * @param {IHubRequestOptions} primaryRO Info and authentication for the requesting user
 * @param {IEmail} [email] Email to be sent (if qualifying users are passed in)
 * @param {IHubRequestOptions} [secondaryRO] Info and authentication for emailing members of a secondary organization (typically a community org)
 *
 * @returns {IConsolidatedResult} The operations attempted, whether they were successful and any errors
 */
function addUsersToGroup(groupId, allUsers, primaryRO, email, secondaryRO) {
    // Extract requesting user
    const requestingUser = cloneObject(getWithDefault(primaryRO, "portalSelf.user", {}));
    requestingUser.cOrgId = getProp(primaryRO, "portalSelf.portalProperties.hub.settings.communityOrg.orgId");
    // Context for each process segment
    const context = {
        groupId,
        allUsers,
        primaryRO,
        email,
        secondaryRO,
        requestingUser,
        usersToAutoAdd: _getAutoAddUsers(allUsers, requestingUser),
        usersToInvite: _getInviteUsers(allUsers, requestingUser),
        usersToEmail: _getEmailUsers(allUsers, requestingUser, getProp(email, "copyMe")),
    };
    return _processAutoAdd(context)
        .then(_processInvite)
        .then(_processPrimaryEmail)
        .then(_processSecondaryEmail)
        .then(_consolidateResults);
}

function getS123ShareUrl(id, context) {
    return `${context.survey123Url}/share/${id}?portalUrl=${encodeURIComponent(context.portalUrl)}`;
}

/**
 * return a token created using options.authentication or set on options.token
 *
 * @export
 * @param {INewslettersRequestOptions} options
 * @return {*}  {Promise<string>}
 */
function authenticateRequest$1(options) {
    const { token, authentication } = options;
    if (authentication) {
        return authentication.getToken(authentication.portal);
    }
    return Promise.resolve(token);
}

async function customClient$1(orvalParams, customParams) {
    const { url, method, data } = orvalParams;
    const { mode, cache, credentials } = customParams;
    const { headers, params } = combineParams$1(orvalParams, customParams);
    const baseUrl = removeTrailingSlash$1(customParams.hubApiUrl);
    const requestUrl = `${baseUrl}${url}?${new URLSearchParams(params)}`;
    const requestOptions = {
        headers,
        method,
        cache,
        credentials,
        mode,
    };
    if (data) {
        requestOptions.body = JSON.stringify(data);
    }
    const res = await fetch(requestUrl, requestOptions);
    const { statusText, status } = res;
    if (res.ok) {
        return res.json();
    }
    const error = await res.json();
    throw new RemoteServerError$1(statusText, requestUrl, status, JSON.stringify(error.message));
}
function removeTrailingSlash$1(hubApiUrl = "https://hub.arcgis.com") {
    return hubApiUrl.replace(/\/$/, "");
}
function combineParams$1(orvalParams, options) {
    const headers = new Headers(Object.assign(Object.assign({}, orvalParams.headers), options.headers));
    if (options.token) {
        headers.set("Authorization", options.token);
    }
    const params = Object.assign(Object.assign({}, orvalParams.params), options.params);
    return { headers, params };
}
class RemoteServerError$1 extends Error {
    constructor(message, url, status, error) {
        super(message);
        this.status = status;
        this.url = url;
        this.error = error;
    }
}

/**
 * Generated by orval v6.24.0 🍺
 * Do not edit manually.
 * Hub Newsletters Service
 * OpenAPI spec version: 0.0.1
 */
var SubscriptionEntityType$1;
(function (SubscriptionEntityType) {
    SubscriptionEntityType["DISCUSSION"] = "DISCUSSION";
})(SubscriptionEntityType$1 || (SubscriptionEntityType$1 = {}));
var DeliveryMethod$1;
(function (DeliveryMethod) {
    DeliveryMethod["EMAIL"] = "EMAIL";
})(DeliveryMethod$1 || (DeliveryMethod$1 = {}));
var Cadence$1;
(function (Cadence) {
    Cadence["ON_EVENT"] = "ON_EVENT";
    Cadence["DAILY"] = "DAILY";
    Cadence["WEEKLY"] = "WEEKLY";
    Cadence["MONTHLY"] = "MONTHLY";
})(Cadence$1 || (Cadence$1 = {}));
var SystemNotificationSpecNames$1;
(function (SystemNotificationSpecNames) {
    SystemNotificationSpecNames["TELEMETRY_REPORT"] = "TELEMETRY_REPORT";
    SystemNotificationSpecNames["EVENT"] = "EVENT";
    SystemNotificationSpecNames["DISCUSSION_ON_ENTITY"] = "DISCUSSION_ON_ENTITY";
})(SystemNotificationSpecNames$1 || (SystemNotificationSpecNames$1 = {}));
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "ASC";
    SortOrder["DESC"] = "DESC";
})(SortOrder || (SortOrder = {}));
var FilterOperation;
(function (FilterOperation) {
    FilterOperation["AND"] = "AND";
    FilterOperation["OR"] = "OR";
})(FilterOperation || (FilterOperation = {}));
var WellKnownCollection;
(function (WellKnownCollection) {
    WellKnownCollection["content"] = "content";
    WellKnownCollection["dataset"] = "dataset";
    WellKnownCollection["document"] = "document";
    WellKnownCollection["event"] = "event";
    WellKnownCollection["feedback"] = "feedback";
    WellKnownCollection["initiative"] = "initiative";
    WellKnownCollection["people"] = "people";
    WellKnownCollection["site"] = "site";
    WellKnownCollection["team"] = "team";
    WellKnownCollection["template"] = "template";
    WellKnownCollection["project"] = "project";
    WellKnownCollection["channel"] = "channel";
    WellKnownCollection["discussion"] = "discussion";
    WellKnownCollection["eventAttendee"] = "eventAttendee";
})(WellKnownCollection || (WellKnownCollection = {}));
var EntityType;
(function (EntityType) {
    EntityType["item"] = "item";
    EntityType["group"] = "group";
    EntityType["user"] = "user";
    EntityType["portalUser"] = "portalUser";
    EntityType["communityUser"] = "communityUser";
    EntityType["groupMember"] = "groupMember";
    EntityType["event"] = "event";
    EntityType["channel"] = "channel";
    EntityType["discussionPost"] = "discussionPost";
    EntityType["eventAttendee"] = "eventAttendee";
})(EntityType || (EntityType = {}));
var SubscriptionAction$1;
(function (SubscriptionAction) {
    SubscriptionAction["DISCUSSION_POST_PENDING"] = "DISCUSSION_POST_PENDING";
})(SubscriptionAction$1 || (SubscriptionAction$1 = {}));
const createSubscription$1 = (iCreateSubscription, options) => {
    return customClient$1({
        url: `/api/newsletters/v1/subscriptions`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: iCreateSubscription,
    }, options);
};
const getSubscriptions$1 = (params, options) => {
    return customClient$1({ url: `/api/newsletters/v1/subscriptions`, method: "GET", params }, options);
};
const subscribe$1 = (iSubscribe, options) => {
    return customClient$1({
        url: `/api/newsletters/v1/subscriptions/subscribe`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: iSubscribe,
    }, options);
};
const getSubscription$1 = (id, options) => {
    return customClient$1({ url: `/api/newsletters/v1/subscriptions/${id}`, method: "GET" }, options);
};
const updateSubscription$1 = (id, iUpdateSubscription, options) => {
    return customClient$1({
        url: `/api/newsletters/v1/subscriptions/${id}`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        data: iUpdateSubscription,
    }, options);
};
const createUser$1 = (iCreateUser, options) => {
    return customClient$1({
        url: `/api/newsletters/v1/users`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: iCreateUser,
    }, options);
};
const getUser$1 = (userId, options) => {
    return customClient$1({ url: `/api/newsletters/v1/users/${userId}`, method: "GET" }, options);
};
const updateUser$1 = (userId, iUpdateUser, options) => {
    return customClient$1({
        url: `/api/newsletters/v1/users/${userId}`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        data: iUpdateUser,
    }, options);
};
const deleteUser$1 = (userId, options) => {
    return customClient$1({ url: `/api/newsletters/v1/users/${userId}`, method: "DELETE" }, options);
};

/**
 * create a subscription for user (existing or not) to a newsletter
 *
 * @param {ISubscribeParams} options
 * @return {Promise<ISubscription>}
 */
async function subscribe(options) {
    options.token = await authenticateRequest$1(options);
    return subscribe$1(options.data, options);
}
/**
 * create a subscription for user (existing) to a newsletter
 *
 * @param {ICreateSubscriptionParams} options
 * @return {Promise<ISubscription>}
 */
async function createSubscription(options) {
    options.token = await authenticateRequest$1(options);
    return createSubscription$1(options.data, options);
}
/**
 * get subscriptions
 *
 * @param {IGetSubscriptionsParams} options
 * @return {Promise<ISubscription[]>}
 */
async function getSubscriptions(options) {
    options.token = await authenticateRequest$1(options);
    return getSubscriptions$1(options.data, options);
}
/**
 * get a subscription
 *
 * @param {IGetSubscriptionParams} options
 * @return {Promise<ISubscription>}
 */
async function getSubscription(options) {
    options.token = await authenticateRequest$1(options);
    return getSubscription$1(options.subscriptionId, options);
}
/**
 * update a subscription
 *
 * @param {IUpdateSubscriptionParams} options
 * @return {Promise<ISubscription>}
 */
async function updateSubscription(options) {
    options.token = await authenticateRequest$1(options);
    return updateSubscription$1(options.subscriptionId, options.data, options);
}

/**
 * create a user
 *
 * @param {ICreateUserParams} options
 * @return {Promise<IUser>}
 */
async function createUser(options) {
    options.token = await authenticateRequest$1(options);
    return createUser$1(options.data, options);
}
/**
 * get a user
 *
 * @param {IGetUserParams} options
 * @return {Promise<IUser>}
 */
async function getUser(options) {
    options.token = await authenticateRequest$1(options);
    return getUser$1(options.userId, options);
}
/**
 * update a user
 *
 * @param {IUpdateUserParams} options
 * @return {Promise<IUser>}
 */
async function updateUser(options) {
    options.token = await authenticateRequest$1(options);
    return updateUser$1(options.userId, options.data, options);
}
/**
 * delete a user
 *
 * @param {IDeleteUserParams} options
 * @return {Promise<IUser>}
 */
async function deleteUser(options) {
    options.token = await authenticateRequest$1(options);
    return deleteUser$1(options.userId, options);
}

/**
 * return a token created using options.authentication or set on options.token
 *
 * @export
 * @param {INewslettersSchedulerRequestOptions} options
 * @return {*}  {Promise<string>}
 */
function authenticateRequest(options) {
    const { token, authentication } = options;
    if (authentication) {
        return authentication.getToken(authentication.portal);
    }
    return Promise.resolve(token);
}

async function customClient(orvalParams, customParams) {
    const { url, method, data } = orvalParams;
    const { mode, cache, credentials } = customParams;
    const { headers, params } = combineParams(orvalParams, customParams);
    const baseUrl = removeTrailingSlash(customParams.hubApiUrl);
    const requestUrl = `${baseUrl}${url}?${new URLSearchParams(params)}`;
    const requestOptions = {
        headers,
        method,
        cache,
        credentials,
        mode,
    };
    if (data) {
        requestOptions.body = JSON.stringify(data);
    }
    const res = await fetch(requestUrl, requestOptions);
    const { statusText, status } = res;
    if (res.ok) {
        return res.json();
    }
    const error = await res.json();
    throw new RemoteServerError(statusText, requestUrl, status, JSON.stringify(error.message));
}
function removeTrailingSlash(hubApiUrl = "https://hub.arcgis.com") {
    return hubApiUrl.replace(/\/$/, "");
}
function combineParams(orvalParams, options) {
    const headers = new Headers(Object.assign(Object.assign({}, orvalParams.headers), options.headers));
    if (options.token) {
        headers.set("Authorization", options.token);
    }
    const params = Object.assign(Object.assign({}, orvalParams.params), options.params);
    return { headers, params };
}
class RemoteServerError extends Error {
    constructor(message, url, status, error) {
        super(message);
        this.status = status;
        this.url = url;
        this.error = error;
    }
}

/**
 * Generated by orval v6.24.0 🍺
 * Do not edit manually.
 * Hub Newsletters Scheduler
 * OpenAPI spec version: 0.0.1
 */
var DeliveryMethod;
(function (DeliveryMethod) {
    DeliveryMethod["EMAIL"] = "EMAIL";
})(DeliveryMethod || (DeliveryMethod = {}));
var SystemNotificationSpecNames;
(function (SystemNotificationSpecNames) {
    SystemNotificationSpecNames["TELEMETRY_REPORT"] = "TELEMETRY_REPORT";
    SystemNotificationSpecNames["EVENT"] = "EVENT";
    SystemNotificationSpecNames["DISCUSSION_ON_ENTITY"] = "DISCUSSION_ON_ENTITY";
})(SystemNotificationSpecNames || (SystemNotificationSpecNames = {}));
var SubscriptionEntityType;
(function (SubscriptionEntityType) {
    SubscriptionEntityType["DISCUSSION"] = "DISCUSSION";
})(SubscriptionEntityType || (SubscriptionEntityType = {}));
var Cadence;
(function (Cadence) {
    Cadence["ON_EVENT"] = "ON_EVENT";
    Cadence["DAILY"] = "DAILY";
    Cadence["WEEKLY"] = "WEEKLY";
    Cadence["MONTHLY"] = "MONTHLY";
})(Cadence || (Cadence = {}));
var SubscriptionAction;
(function (SubscriptionAction) {
    SubscriptionAction["DISCUSSION_POST_PENDING"] = "DISCUSSION_POST_PENDING";
})(SubscriptionAction || (SubscriptionAction = {}));
const notify$1 = (iNotify, options) => {
    return customClient({
        url: `/api/newsletters-scheduler/v1/subscriptions/notify`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: iNotify,
    }, options);
};

/**
 * Notify (schedule) subscriptions to recipients
 *
 * @param {INotifyParams} options
 * @return {Promise<ISubscription[]>}
 */
async function notify(options) {
    options.token = await authenticateRequest(options);
    return notify$1(options.data, options);
}

/**
 * Convert a template entity into a card view model that can
 * be consumed by the suite of hub gallery components
 *
 * @param template template entity
 * @param context auth & portal information
 * @param opts view model options
 */
const templateToCardModel = (template, context, opts) => {
    const { actionLinks = [], baseUrl = "", locale = "en-US", target = "self", } = opts || {};
    const titleUrl = getCardModelUrlFromEntity(template, context, target, baseUrl);
    return Object.assign(Object.assign(Object.assign({}, getSharedTemplateCardModel(template, locale)), { actionLinks,
        titleUrl }), (template.thumbnailUrl && { thumbnailUrl: template.thumbnailUrl }));
};
/**
 * Convert a template hub search result into a card view model
 * that can be consumed by the suite of hub gallery components
 *
 * @param searchResult hub template search result
 * @param opts view model options
 */
const templateResultToCardModel = (searchResult, opts) => {
    const { actionLinks = [], baseUrl = "", locale = "en-US", target = "self", } = opts || {};
    const titleUrl = getCardModelUrlFromResult(searchResult, target, baseUrl);
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, getSharedTemplateCardModel(searchResult, locale)), { actionLinks }), (!isNaN(searchResult.index) && { index: searchResult.index })), { titleUrl }), (searchResult.links.thumbnail && {
        thumbnailUrl: searchResult.links.thumbnail,
    }));
};
/**
 * Given a template entity OR hub serach result, construct the
 * template's shared card view model properties
 *
 * @param entityOrSearchResult template entity or hub search result
 * @param locale internationalization locale
 */
const getSharedTemplateCardModel = (entityOrSearchResult, locale) => {
    var _a, _b;
    const additionalInfo = [
        {
            i18nKey: "type",
            value: entityOrSearchResult.type,
        },
        {
            i18nKey: "dateUpdated",
            value: entityOrSearchResult.updatedDate.toLocaleDateString(locale),
        },
        ...(((_a = entityOrSearchResult.tags) === null || _a === void 0 ? void 0 : _a.length) ? [
            {
                i18nKey: "tags",
                value: entityOrSearchResult.tags.join(", "),
            },
        ]
            : []),
        ...(((_b = entityOrSearchResult.categories) === null || _b === void 0 ? void 0 : _b.length) ? [
            {
                i18nKey: "categories",
                value: getShortenedCategories(entityOrSearchResult.categories).join(", "),
            },
        ]
            : []),
        {
            i18nKey: "dateCreated",
            value: entityOrSearchResult.createdDate.toLocaleDateString(locale),
        },
    ];
    return {
        access: entityOrSearchResult.access,
        badges: [],
        id: entityOrSearchResult.id,
        family: getFamily(entityOrSearchResult.type),
        source: entityOrSearchResult.owner,
        summary: entityOrSearchResult.summary,
        title: entityOrSearchResult.name,
        type: entityOrSearchResult.type,
        additionalInfo,
    };
};

/**
 * Given an array of metrics, aggregate them using the specified aggregation
 * Consumer must be aware of the type of the metrics and pass an appropriate aggregation
 * @param metrics
 * @param aggregation
 * @returns
 */
function aggregateMetrics(metrics, field, aggregation) {
    // Get the values from the metrics, we use any so
    // we can keep the rest of the code simpler
    const values = metrics.map((m) => m.attributes[field]);
    let aggregate = null;
    switch (aggregation) {
        case "sum":
            aggregate = values.reduce((acc, v) => acc + v, 0);
            break;
        case "count":
            aggregate = values.length;
            break;
        case "avg":
            aggregate = values.reduce((acc, v) => acc + v, 0) / values.length;
            break;
        case "min":
            aggregate = values.reduce((acc, v) => Math.min(acc, v), Number.MAX_VALUE);
            break;
        case "max":
            aggregate = values.reduce((acc, v) => Math.max(acc, v), Number.MIN_VALUE);
            break;
        case "countByValue": // count for each value as a hash {value: string, count: number}
            aggregate = values.reduce((acc, v) => {
                if (acc[v]) {
                    acc[v] += 1;
                }
                else {
                    acc[v] = 1;
                }
                return acc;
            }, {});
            break;
    }
    return aggregate;
}

async function explainDatePredicate(predicate, result, requestOptions) {
    // get the value from the predicate
    throw new Error("Not implemented");
}
async function explainPropPredicate(predicate, result, requestOptions) {
    // get the value from the predicate
    throw new Error("Not implemented");
}
/**
 * @internal
 * Create explanation for an IMatchOptions predicate
 * @param predicate
 * @param result
 * @param requestOptions
 * @returns
 */
async function explainMatchOptionPredicate(predicate, result, requestOptions) {
    // get the key from the predicate
    const attribute = Object.keys(predicate)[0];
    const matchOptions = predicate[attribute];
    const explanation = {
        predicate: cloneObject(predicate),
        matched: true,
        reasons: [],
    };
    // Construct meta hash that will allow us to carry additional info about the match
    const meta = {};
    // TODO Implement when needed
    // if (attribute === "orgid") {
    //   // fetch org into and attach the id + name into the meta hash
    // }
    if (attribute === "group") {
        // fetch items groups and attach as `group` prop
        const response = await getItemGroups(result.id, requestOptions);
        // ----------------------------------------
        // TODO: We've got a bunch of useful group info in the response, but only use the ids for the explanation
        // However, to provide the user a useful explanation, we should include the group titles, and maybe even the group owners
        // ----------------------------------------
        // map out the id and titles into meta.groups
        meta.groups = [
            ...getWithDefault(response, "admin", []),
            ...getWithDefault(response, "member", []),
            ...getWithDefault(response, "other", []),
        ].map((g) => ({ id: g.id, title: g.title }));
        // and the id's into the match options attribute `group`
        result.group = meta.groups.map((g) => g.id);
    }
    // get the value of the key, from the result
    const resultValue = getProp(result, attribute);
    if (resultValue) {
        // check the any, all, not, exact props if defined
        const fns = {
            any: checkAny,
            all: checkAll,
            not: checkNot,
        };
        // for each prop, if defined, call the appropriate check function
        Object.keys(fns).forEach((prop) => {
            const conditionToCheck = getProp(matchOptions, prop);
            if (conditionToCheck) {
                const fn = getProp(fns, prop);
                const r = fn(attribute, conditionToCheck, resultValue);
                r.meta = meta;
                explanation.reasons.push(r);
            }
        });
        // decide if all the predicates matched
        explanation.matched = explanation.reasons.every((r) => r.matched);
    }
    else {
        explanation.matched = false;
        explanation.reasons.push({
            attribute,
            matched: false,
            message: `Property ${attribute} not present on search result, cannot provide explanation`,
        });
    }
    return Promise.resolve(explanation);
}
/**
 * Returns information about the match between a result value and the .any property of an IMatchOptions predicate
 * @param attribute
 * @param option
 * @param resultValue
 * @returns
 */
function checkAny(attribute, option, resultValue) {
    const result = {
        attribute,
        values: arrayify(resultValue).join(","),
        condition: "IN",
        matched: false,
        requirement: arrayify(option).join(","),
        message: "No match",
    };
    const { options, matches } = getMatches(arrayify(option), arrayify(resultValue));
    result.matched = matches.length > 0;
    if (result.matched) {
        result.message = `Value(s) ${result.values} contained at least one of value from [${result.requirement}]`;
    }
    else {
        result.message = `Value(s) ${result.values} did not contain any of value from [${result.requirement}]`;
    }
    return result;
}
/**
 * * Returns information about the match between a result value and the .all property of an IMatchOptions predicate
 * @param attribute
 * @param option
 * @param resultValue
 * @returns
 */
function checkAll(attribute, option, resultValue) {
    const result = {
        attribute,
        values: arrayify(resultValue).join(","),
        condition: "ALL",
        requirement: arrayify(option).join(","),
        matched: false,
        message: "No match",
    };
    const { options, matches } = getMatches(arrayify(option), arrayify(resultValue));
    result.matched = matches.length === options.length;
    if (result.matched) {
        result.message = `Value(s) ${result.values} contained all values from [${result.requirement}]`;
    }
    else {
        result.message = `Value(s) ${result.values} did not contain all values from [${result.requirement}]`;
    }
    return result;
}
/**
 * * Returns information about the match between a result value and the .not property of an IMatchOptions predicate
 * @param attribute
 * @param option
 * @param resultValue
 * @returns
 */
function checkNot(attribute, option, resultValue) {
    const result = {
        attribute,
        values: arrayify(resultValue).join(","),
        condition: "NOT_IN",
        requirement: arrayify(option).join(","),
        matched: false,
        message: "No match",
    };
    const { options, values, matches } = getMatches(arrayify(option), arrayify(resultValue));
    result.matched = matches.length === 0;
    if (result.matched) {
        result.message = `Value(s) ${result.values} is not contained in [${result.requirement}]`;
    }
    else {
        result.message = `Value(s) ${result.values} is contained in [${result.requirement}]`;
    }
    return result;
}
/**
 * Ensure a value that could be `string | string[]` is a `string[]`
 * @param value
 * @returns
 */
function arrayify(value) {
    if (!Array.isArray(value)) {
        return [value];
    }
    return value;
}
/**
 * Return matching values from two arrays
 * @param options
 * @param resultValues
 * @returns
 */
function getMatches(options, resultValues) {
    const result = {
        options,
        values: resultValues,
        matches: [],
    };
    result.matches = options.reduce((acc, o) => {
        if (resultValues.includes(o)) {
            acc.push(o);
        }
        return acc;
    }, []);
    return result;
}

/**
 * Geneate an explanation if a specific result passes the predicate's criteria
 * This will delegate to more specific functions based on the predicate's key
 * @param predicate
 * @param result
 * @param requestOptions
 * @returns
 */
async function explainPredicate(predicate, result, requestOptions) {
    // const predicateResult: IPredicateExplanation = {
    //   predicate: cloneObject(predicate),
    //   included: false,
    //   reasons: [],
    // };
    // get the key from the predicate
    const key = Object.keys(predicate)[0];
    // default to match options...
    let fn = explainMatchOptionPredicate;
    // However, some keys are treated differently
    if (PREDICATE_NON_MATCH_OPTIONS_PROPS.includes(key)) {
        if (PREDICATE_DATE_PROPS.includes(key)) {
            // handle as date
            fn = explainDatePredicate;
        }
        else {
            // handle as prop we just copy forward
            fn = explainPropPredicate;
        }
    }
    // return the result
    return fn(predicate, result, requestOptions);
}

/**
 * Generate an explanation if a specific result passes the filter's criteria
 * @param filter
 * @param result
 * @param requestOptions
 * @returns
 */
async function explainFilter(filter, result, requestOptions) {
    // setup return value
    const explanation = {
        filter: cloneObject(filter),
        matched: false,
        reasons: [],
    };
    // for each predicate, explain the match and return the explanation
    for (const predicate of filter.predicates) {
        const r = await explainPredicate(predicate, result, requestOptions);
        explanation.reasons.push(r);
    }
    // depending on the operation, we combine the predicate results differently
    if (filter.operation === "OR") {
        // if any of the predicates match, then the filter matches
        explanation.matched = explanation.reasons.some((r) => r.matched);
    }
    else {
        // filter.operation defaults to AND
        explanation.matched = explanation.reasons.every((r) => r.matched);
    }
    // return
    return explanation;
}

/**
 * Explain why a specific result was included in a Query.
 *
 * NOTE: This only works for entityType: "item" queries and does not
 * cover all possible permutations.
 * @param queryResult
 * @param query
 * @param requestOptions
 * @returns
 */
async function explainQueryResult(queryResult, query, requestOptions) {
    // Throw if the query is not for items
    if (query.targetEntity !== "item") {
        throw new Error(`explainQueryResult: Only queries with targetEntity: "item" are supported`);
    }
    // Expand the query so we have a standardized structure to work with
    const expandedQuery = expandPortalQuery(query);
    // iterate the filters on the query and get explanations for each
    const filterExplanations = [];
    for (const filter of expandedQuery.filters) {
        const fe = await explainFilter(filter, queryResult, requestOptions);
        filterExplanations.push(fe);
    }
    // Collect up the reasons
    const included = filterExplanations.reduce((acc, explanation) => {
        if (!explanation.matched) {
            acc = false;
        }
        return acc;
    }, true);
    // Collect up all the reasons into a single array
    const summary = [];
    filterExplanations.forEach((fe) => {
        fe.reasons.forEach((predicateExplanation) => {
            predicateExplanation.reasons.forEach((reason) => {
                summary.push(reason);
            });
        });
    });
    // construct the result
    const result = {
        result: cloneObject(queryResult),
        query: cloneObject(query),
        matched: included,
        reasons: filterExplanations,
        summary,
    };
    return result;
}

/**
 * Given an entity, execute a search on all the catalogs, and their associated with the entity
 * If the entity has no catalogs, an empty array is returned
 * If passed an IQuery, only collections using the same targetEntity will be searched
 * If passed a string, a query will be executed on all collections in all catalogs
 * @param entity
 * @param query - string or IQuery
 * @param options - IPagingOptions & ISortOptions - only num is used
 * @param context
 * @returns
 */
async function searchEntityCatalogs(entity, query, options, context) {
    // collect all the catalogs from the entity, and search them
    const catalogs = getWithDefault(entity, "catalogs", []);
    return searchCatalogs(catalogs, query, options, context);
}

const atob = abab.atob;
const btoa = abab.btoa;
export { DeliveryMethod$1 as DeliveryMethod, Cadence$1 as NewsletterCadence, REQUIRED_PRIVS, Cadence as SchedulerCadence, DeliveryMethod as SchedulerDeliveryMethod, SubscriptionAction as SchedulerSubscriptionAction, SystemNotificationSpecNames as SchedulerSystemNotificationSpecNames, SubscriptionAction$1 as SubscriptionAction, SubscriptionEntityType, SystemNotificationSpecNames$1 as SystemNotificationSpecNames, _canEmailUser, _consolidateResults, _formatAutoAddResponse, _getAutoAddUsers, _getEmailUsers, _getHttpAndHttpsUris, _getInviteUsers, _getLocation, _isOrgAdmin, _processAutoAdd, _processInvite, _processPrimaryEmail, _processSecondaryEmail, addUsersToGroup, aggregateMetrics, applyPropertiesToItems, atob, btoa, canEditEvent, canEditSite, canEditSiteContent, clearMemoizedCache, completeOAuth2, composeHubContent, convertSolutionTemplateResourcesToAssets, convertUrlsToAnchorTags, createSubscription, createUser, datasetToContent, datasetToItem, deepDeletePropByValue, deleteUser, doesItemExistWithTitle, emailOrgUsers, ensureProp, explainQueryResult, fetchAllPages, getCampaignUrl, getCategory, getContentIdentifier, getContentTypeLabel, getFeedConfiguration, getHubApiUrlFromPortal, getHubUrlFromPortal, getProps, getS123ShareUrl, getServiceStatus, getSubscription, getSubscriptions, getTypeCategories, getTypes, getUniqueItemTitle, getUser, incrementString, isHubService, isSafeRedirectUrl, itemToContent, memoize, notify, processRevertableTasks, registerBrowserApp, resolveReferences, runRevertableTask, searchEntityCatalogs, setContentType, setFeedConfiguration, subscribe, templateResultToCardModel, templateToCardModel, updateSubscription, updateUser, upgradeProtocol, userResultToCardModel };
