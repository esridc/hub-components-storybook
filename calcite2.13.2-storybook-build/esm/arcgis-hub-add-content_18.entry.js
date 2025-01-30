import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, a as getElement, d as getAssetPath } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { g as getGlobalContext, h as connectContext } from './state-31a09db0.js';
import { a as getHubEntityTypeFromType, g as getEntityTypeFromHubEntityType, c as createFacetsFromAggregations } from './type-converters-c5f8a126.js';
import { d as dist } from './index-dd3f99ac.js';
import { L as Logger } from './logger-f8667200.js';
import { g as getAddContentConfig } from './getAddContentConfig-17d50cc0.js';
import { c as checkPermission } from './checkPermission-6c5be250.js';
import { a as cloneObject, h as flattenArray, w as without } from './util-3e6872d9.js';
import { H as HelpState } from './help-state-4de44f92.js';
import { s as shareEntitiesToGroups } from './utils-d4523406.js';
import './types-dca4cb90.js';
import esriConfig from '@arcgis/core/config.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { d as fetchHubContent } from './fetchHubEntity-28d04ab4.js';
import { f as fetchEvent } from './fetch-63549ae7.js';
import { a as fetchHubGroup, h as hubSearch } from './hubSearch-41612481.js';
import { g as getTypeFromEntity } from './getTypeFromEntity-e149b61e.js';
import { p as poll } from './poll-77a94dfa.js';
import { E as EntityEditor } from './EntityEditor-1f0c9dcd.js';
import { b as bind } from './context-7d8f7366.js';
import { D as DebounceDecoratorFactory } from './debounce-e9be81f1.js';
import { H as HubError } from './HubError-e26c5610.js';
import { b as base64ToUnicode, u as unicodeToBase64 } from './encoding-1c5014ff.js';
import { g as getSearchResultTypeIcon } from './search-6c91f105.js';
import { s as stripHtml } from './hubSanitizer-45ca9e6e.js';
import './store-0a6cb79f.js';
import { i as isValidDateRange, r as removeCountLabel, b as isTreeFacet, g as getListFacets, c as getTreeFacets, d as getDateRangeFacets, e as getMapFacets, f as isMapFacet, h as isOptionsBasedFacet, j as filterFacetsBasedOnLayout, w as willStateChange, k as applyGalleryState, l as getOptionsBasedFacets, p as processCommonDynamicOptions, a as addPathToResults, m as convertToQueryString, s as serializeGalleryState, n as navigate, o as resetFacet, q as hasMapFacets } from './gallery-utils-2d637f50.js';
import { g as getProp } from './get-prop-ec5be510.js';
import { g as getLocaleInfo } from './index-213c70d0.js';
import { I as IMAGE_TYPES, C as CORNERS } from './interfaces-0d0bef14.js';
import { M as MemoizeDecoratorFactory } from './memoize-dfcfa834.js';
import { D as DEFAULT_MAP_SETTINGS } from './location-ba906d75.js';
import { m as matchesTelemetry } from './index-39849f62.js';
import Extent from '@arcgis/core/geometry/Extent.js';
import { h as hydrateFacets, f as filterFacetsbyTargetEntity } from './facets-1177471f.js';
import { a as bboxToString, b as bBoxToExtent, c as extentToBBox } from './extent-34a4ba2a.js';
import { v as removeEmptyProps } from './themes-e08327b4.js';
import { t as titleize } from './titleize-fd193332.js';
import { g as getCardModelUrlFromResult } from './getCardModelUrl-a5543776.js';
import { l as getSiteHomeUrl } from './urls-0e36649d.js';
import Map from '@arcgis/core/Map.js';
import MapView from '@arcgis/core/views/MapView.js';
import SceneView from '@arcgis/core/views/SceneView.js';
import WebScene from '@arcgis/core/WebScene.js';
import WebMap from '@arcgis/core/WebMap.js';
import PortalItem from '@arcgis/core/portal/PortalItem.js';
import esriId from '@arcgis/core/identity/IdentityManager.js';
import Basemap from '@arcgis/core/Basemap.js';
import { Point, Extent as Extent$1 } from '@arcgis/core/geometry.js';
import Graphic from '@arcgis/core/Graphic.js';
import { l as loadArcGisCss, i as injectMapStyleSheet } from './arcgis-1e3a04cd.js';
import { on, watch } from '@arcgis/core/core/reactiveUtils.js';
import { n as deepEqual } from './get-form-json-1d4e3591.js';
import { webMercatorToGeographic } from '@arcgis/core/geometry/support/webMercatorUtils.js';
import Search from '@arcgis/core/widgets/Search.js';
import * as projection from '@arcgis/core/geometry/projection.js';
import ZoomViewModel from '@arcgis/core/widgets/Zoom/ZoomViewModel.js';
import './_commonjsHelpers-11ca3be1.js';
import './HubInitiatives-4f4e24ce.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './_enrichments-8641475c.js';
import './get-with-default-b819d95d.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './helpers-8c7e5e31.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './request-fa80ae40.js';
import './append-custom-params-4bd856e5.js';
import './OperationError-387ae9ab.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './types-2eaa1a18.js';
import './TemplateBusinessRules-0e35d61b.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './map-by-a2234e13.js';
import './tslib.es6-9c17e83a.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
import './search-c7a57aa9.js';
import './domain-exists-4fd7dc09.js';
import './slugify-e3e67bac.js';
import './getPredicateValues-ef475313.js';
import './Catalog-290f043e.js';
import './ArcGISContextManager-c977211a.js';
import './fail-safe-cd1a5a2a.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './unshareEntityWithGroups-78dcc7e1.js';
import './unshareEventWithGroups-2bac7a58.js';
import './events-c59246f8.js';
import './search-211dee83.js';
import './share-item-to-groups-547b9cd0.js';
import './share-item-with-group-5711513b.js';
import './helpers-6692d307.js';
import './get-850c466d.js';
import './update-user-membership-261681cf.js';
import './unshare-item-from-groups-b09dcce3.js';
import './unshare-item-with-group-b4a3a08f.js';
import './settings-2d4e159a.js';
import './discussions-api-request-199cae2d.js';
import './request-3e386aeb.js';
import './fetchContent-dbc662af.js';
import './index-edff2d62.js';
import './getLayer-464ff70e.js';
import './is-service-ad021db8.js';
import './getPropertyMap-10ee9d61.js';
import './types-db540898.js';
import './registrations-431b9788.js';
import './merge-objects-5b123ab3.js';
import './channels-2574fd6e.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';
import './getEditorSlug-78023e22.js';
import './update-6a7d5697.js';
import './sharedWith-3ad296b7.js';
import './enrichEntity-a5bc0b4f.js';
import './access-7968589d.js';
import './getEditorConfig-a89f031d.js';
import './_deep-map-values-53f8dbd1.js';
import './edit-237c0a70.js';
import './hostedServiceUtils-f22b023b.js';
import './getDownloadFlow-6c6d04d5.js';
import './canUseHubDownloadSystem-a22afbb9.js';
import './getDownloadConfiguration-6cb6d32f.js';
import './types-303cd4d6.js';
import './shouldShowDownloadsConfiguration-385c6ff6.js';
import './utils-cde3af49.js';
import './HubGroup-9aed80ee.js';
import './getEntityMetrics-ad176d9d.js';
import './resolveMetric-7286227d.js';
import './HubPage-e56c4fe7.js';
import './HubSite-374c57db.js';
import './deepContains-ff859c50.js';
import './parseContainmentPath-a32e8034.js';
import './updateVersionMetadata-068ede7c.js';
import './object-to-json-blob-583ae5c3.js';
import './defaults-1f93a79e.js';
import './getDefaultEventDatesAndTimes-4847a519.js';
import './getEventGroups-a2ce236d.js';
import './index-0a8fd06b.js';
import './generate-random-string-1436d9e6.js';
import './extent-67c6eb57.js';
import './index-5d989261.js';
import './_internal-96d77ae4.js';
import './create-de41f6f6.js';
import './delete-prop-bd13d424.js';

/**
 * Get the configuration for a gallery of "existing" content
 * @param _
 * @param options
 * @returns
 */
function getContentGalleryConfig(_, options) {
  const response = {
    corners: 'round',
    facets: [
      {
        label: options.t("contentGallery.facets.type.label"),
        key: 'type',
        display: 'multi-select',
        field: 'type',
        options: [],
        operation: 'OR',
        aggLimit: 100,
      },
      {
        label: options.t("contentGallery.facets.tags.label"),
        key: 'tags',
        display: 'multi-select',
        field: 'tags',
        options: [],
        operation: 'OR',
      },
      {
        label: options.t("contentGallery.facets.categories.label"),
        key: 'categories',
        display: 'tree',
        field: 'categories',
        options: [],
        operation: 'OR',
      },
      {
        label: options.t("contentGallery.facets.modified.label"),
        key: 'modified',
        display: 'date-range',
        field: 'modified',
        state: 'open',
        max: new Date(),
      }
    ],
    gallerySelection: { [options.query.targetEntity]: (options === null || options === void 0 ? void 0 : options.selectedContentIds) || [] },
    layout: 'grid',
    limit: 8,
    linkTarget: 'siteRelative',
    query: options.query,
    selectionMode: 'multiple',
    showFacets: true,
    showLayoutSwitcher: true,
    showMoreResultsBtn: true,
    showResultsCount: true,
    showSearch: true,
    showSelection: true,
    state: options === null || options === void 0 ? void 0 : options.state
  };
  if (options.canAddOthersContent) {
    // add the access facet
    response.facets = [
      {
        label: options.t("contentGallery.facets.access.label"),
        key: 'access',
        display: 'multi-select',
        field: 'access',
        options: [],
        operation: 'OR',
      },
      ...response.facets
    ];
  }
  return response;
}
/**
 * Get the configuration for a gallery of groups the user can choose to share to
 * @param context
 * @param options
 * @returns
 */
function getGroupsGalleryConfig(context, options) {
  var _a, _b, _c;
  // the base query - further filtered by the facets
  const query = {
    targetEntity: "group",
    filters: [
      {
        predicates: [
          {
            searchUserAccess: 'groupMember',
            searchUserName: context.currentUser.username,
          },
        ]
      }
    ]
  };
  const idsOfUserAdminGroups = context.currentUser.groups
    .reduce((acc, group) => {
    group.userMembership.memberType === 'admin' && acc.push(group.id);
    return acc;
  }, []);
  const result = {
    corners: 'round',
    facets: [
      {
        label: options.t("groupsGallery.facets.access.label"),
        key: "access",
        display: "multi-select",
        operation: "OR",
        options: [
          {
            label: options.t("groupsGallery.facets.access.options.public"),
            key: "public",
            selected: false,
            predicates: [{
                access: "public",
              }],
          },
          {
            label: options.t('groupsGallery.facets.access.options.org'),
            key: "organization",
            selected: false,
            predicates: [{
                access: "org",
              },]
          },
          {
            label: options.t("groupsGallery.facets.access.options.private"),
            key: "mine",
            selected: false,
            predicates: [{
                access: "private",
              }],
          }
        ],
      },
      {
        label: options.t('groupsGallery.facets.type.label'),
        key: "types",
        display: "multi-select",
        pageSize: 4,
        operation: "AND",
        options: [
          {
            label: options.t('groupsGallery.facets.type.options.sharedUpdate'),
            key: "sharedUpdate",
            selected: false,
            predicates: [{ capabilities: "updateitemcontrol" }]
          },
          {
            label: options.t('groupsGallery.facets.type.options.opendata'),
            key: "opendata",
            selected: false,
            predicates: [{ isopendata: true }]
          }
        ]
      },
      {
        label: options.t('groupsGallery.facets.from.label'),
        key: 'from',
        display: 'single-select',
        options: [
          {
            label: options.t('groupsGallery.facets.from.options.myGroups'),
            key: 'myGroups',
            selected: false,
            predicates: [
              {
                owner: context === null || context === void 0 ? void 0 : context.currentUser.username
              }
            ]
          },
          {
            label: options.t('groupsGallery.facets.from.options.myOrganization'),
            key: 'myOrganization',
            selected: true,
            predicates: [
              ((_a = options.catalogGroupIds) === null || _a === void 0 ? void 0 : _a.length) ? {
                orgid: (_b = context === null || context === void 0 ? void 0 : context.currentUser) === null || _b === void 0 ? void 0 : _b.orgId,
                id: options.catalogGroupIds
              } : {
                orgid: (_c = context === null || context === void 0 ? void 0 : context.currentUser) === null || _c === void 0 ? void 0 : _c.orgId,
                isviewonly: false
              }
            ]
          }
        ]
      }
    ],
    gallerySelection: { group: options.selectedGroupIds },
    layout: 'grid',
    limit: 8,
    linkTarget: 'siteRelative',
    newTab: true,
    query,
    selectionMode: 'single',
    showFacets: true,
    showLayoutSwitcher: true,
    showMoreResultsBtn: true,
    showResultsCount: true,
    showSearch: true,
    showSelection: true,
    showSort: true,
    state: options === null || options === void 0 ? void 0 : options.state
  };
  const fromFacet = result.facets.find(facet => facet.key === 'from');
  if (context === null || context === void 0 ? void 0 : context.communityOrgId) {
    fromFacet.options.push({
      label: options.t('groupsGallery.facets.from.options.myCommunity'),
      key: 'myCommunity',
      selected: false,
      predicates: [
        {
          orgid: context === null || context === void 0 ? void 0 : context.communityOrgId,
          isviewonly: false
        },
        {
          orgid: context === null || context === void 0 ? void 0 : context.communityOrgId,
          id: idsOfUserAdminGroups
        }
      ]
    });
  }
  fromFacet.options.push({
    label: options.t('groupsGallery.facets.from.options.world'),
    key: 'world',
    selected: false,
    predicates: [
      {
        isviewonly: false
      }
    ]
  });
  return result;
}
function getIcon(entityType) {
  // if an icon is not provided in the config, fallback to a default
  const DEFAULT_ICONS = {
    event: "event",
    discussion: "speech-bubbles",
    group: "group",
    initiative: "initiative",
    page: "file-text",
    project: "projects",
    site: "browser"
  };
  return DEFAULT_ICONS[entityType] || "file";
}
function getDefaultEventEntityValues(options) {
  var _a;
  const values = {};
  let entity;
  if (['project', 'initiative', 'site'].includes(getHubEntityTypeFromType((_a = options === null || options === void 0 ? void 0 : options.entity) === null || _a === void 0 ? void 0 : _a.type))) {
    entity = options.entity;
  }
  else if ((options === null || options === void 0 ? void 0 : options.site) && !options.site.isHubHome) {
    entity = options.site;
  }
  if (entity) {
    values.referencedContentIds = [entity.id];
    values.referencedContentIdsByType = [{
        entityId: entity.id,
        entityType: entity.type,
      }];
  }
  return values;
}
function getDefaultSiteEntityValues(_options) {
  return {
    _urlInfo: {
      // this is a hack to work around what i consider to be a configuration editor bug
      // it removes empty values and that breaks the validation
      _: '_',
    }
  };
}
const DEFAULT_ENTITY_VALUES_MAP = {
  event: getDefaultEventEntityValues,
  site: getDefaultSiteEntityValues
};
function getDefaultEntityValues(entityType, configurationValues, options) {
  var _a;
  const defaultEntityValues = (_a = DEFAULT_ENTITY_VALUES_MAP[entityType]) === null || _a === void 0 ? void 0 : _a.call(DEFAULT_ENTITY_VALUES_MAP, options);
  return Object.assign(Object.assign({}, configurationValues), defaultEntityValues);
}

const arcgisHubAddContentCss = ":host{display:block}.dropdown-item{display:flex;flex-direction:row;align-items:center}.dropdown-item-icon{height:3.5rem;width:3.5rem;margin-right:0.75rem;display:flex;align-items:center;background-color:var(--calcite-color-background)}.dropdown-item-icon calcite-icon{width:70px}.dropdown-item-content{display:flex;flex-direction:column;white-space:normal;overflow-wrap:break-word}.dropdown-item-content :first-child{margin-bottom:0.25rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}.dropdown-item-content :last-child{color:var(--calcite-color-text-2)}calcite-dropdown{display:var(--arcgis-hub-add-content-dropdown-display, inline-block)}";

const ArcgisHubAddContent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.arcgisHubAddContentWorkflowComplete = createEvent(this, "arcgisHubAddContentWorkflowComplete", 7);
    this.handleAddContentWorkflowComplete = (evt) => {
      // we need to catch and re-emit this event because the workflow component is in a wormhole, thanks safari
      evt.stopPropagation();
      this.arcgisHubAddContentWorkflowComplete.emit();
    };
    /**
     * Handler for the dropdown button click
     */
    this.handleDropdownButtonClick = () => {
      this.hubTelemetry.emit(dist.dictionary.category.interaction.action.open.label.options.details.add);
    };
    /**
     * Handler for dropdown item click
     */
    this.handleDropdownItemSelect = (event) => {
      this.selectDropdownEntry(this.dropDownEntries[event.target.dataset.index]);
    };
    /**
     * Click handler for button to create a specific entity type
     */
    this.handleButtonClick = () => {
      this.selectDropdownEntry(this.specificEntityTypeToCreate);
    };
    /**
     * Handler for onCalciteModalClose event
     */
    this.handleModalClose = () => {
      this.shouldShowModal = false;
      this.selectedConfig = null;
      this.hubTelemetry.emit(dist.dictionary.category.interaction.action.close.label.modal.details.add);
    };
    /**
     * Handler for onArcgisHubAddContentWorkflowClose event
     */
    this.handleClose = () => {
      this.shouldShowModal = false;
    };
    /**
     * workaround for dropdown scrolling issue.
     * This should be addressed by passing maxItems to the dropdown
     * but https://github.com/Esri/calcite-components/issues/6230
     * TODO: remove when calcite issue is addressed
     */
    this.handleCalciteDropdownRef = (dropdown) => {
      setTimeout(() => {
        var _a;
        const contentEl = (_a = dropdown === null || dropdown === void 0 ? void 0 : dropdown.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.calcite-dropdown-content');
        if (contentEl) {
          // ugh, need to make it scrollable too - so need to make sure we are not making it taller than the window
          const rect = contentEl.getBoundingClientRect();
          const maxHeight = window.innerHeight - rect.top - 10;
          contentEl.style.maxBlockSize = maxHeight + 'px';
        }
      }, 100);
    };
    this.renderDropdownItem = (config, index) => {
      const onlineOrEnterprise = this._context.isPortal ? 'ArcGIS Enterprise' : 'ArcGIS Online';
      const workflow = config.workflowConfig.workflow;
      const entityType = config.entityType || '';
      const intlKeyBase = workflow === 'create' ? `${workflow}.${entityType}` : workflow;
      let itemTitle = this.intl.t(`${intlKeyBase}.title`);
      let itemDescription = this.intl.t(`${intlKeyBase}.description`, { onlineOrEnterprise });
      if (workflow === 'existing') {
        itemTitle = this.addExistingTitle || itemTitle;
        itemDescription = this.addExistingDescription || itemDescription;
      }
      return (h("calcite-dropdown-item", { "data-index": index, key: `${workflow}${entityType}`, label: this.intl.t(`${intlKeyBase}.title`), onCalciteDropdownItemSelect: this.handleDropdownItemSelect }, h("div", { class: "dropdown-item" }, h("div", { class: "dropdown-item-icon" }, h("calcite-icon", { icon: getIcon(config.entityType), scale: "m" })), h("div", { class: "dropdown-item-content" }, h("div", null, itemTitle), h("div", null, itemDescription)))));
    };
    this.query = undefined;
    this.catalog = undefined;
    this.config = undefined;
    this.entity = undefined;
    this.site = undefined;
    this.entityType = undefined;
    this.workflowConfig = undefined;
    this.allowGroupSelection = false;
    this.buttonText = undefined;
    this.buttonProps = {};
    this.addExistingTitle = undefined;
    this.addExistingDescription = undefined;
    this._context = getGlobalContext();
    this.shouldShowModal = false;
    this.selectedConfig = undefined;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.processConfiguration();
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  // Note: There are some circumstances where this set of watch's may lead to
  // unexpected behavior, but those are not expected given the current
  // useage of this component.
  processConfiguration() {
    if (this._context.isAuthenticated) {
      if (this.config) {
        Logger.info(`AC: Using provided config`);
        // use the provided config
        this.workflowConfig = this.config;
      }
      else {
        if (this.query) {
          Logger.info(`AC: Using query`);
          // create config from query
          this.workflowConfig = getAddContentConfig(this._context, this.query);
        }
        else if (this.catalog) {
          Logger.info(`AC: Using catalog`);
          // create config from catalog
          this.workflowConfig = getAddContentConfig(this._context, this.catalog);
        }
        else {
          Logger.info(`AC: Using default config`);
          // create the default workflowconfig
          this.workflowConfig = getAddContentConfig(this._context);
        }
      }
    }
  }
  get dropDownEntries() {
    // filter the config into a new config that only contains entries the user has permission to do
    const config = [];
    // use the configuration to construct the button configs
    if (this.workflowConfig) {
      // if the configuration has a create workflow, we need to add it to the config
      if (this.workflowConfig.create) {
        // convert into individual entries for each type
        const types = this.workflowConfig.create.types || [];
        const creatableTypes = types.filter(type => {
          const entityType = getHubEntityTypeFromType(type);
          const permission = `hub:${entityType}:create`;
          Logger.info(`AC: Checking permission: ${permission}`);
          return checkPermission(permission, this._context).access;
        });
        creatableTypes.forEach(type => {
          const wfConfig = cloneObject(this.workflowConfig.create);
          wfConfig.types = [type];
          config.push({
            workflow: 'create',
            workflowConfig: wfConfig,
            entityType: getHubEntityTypeFromType(type),
          });
        });
      }
      // if the configuration has a upload workflow, we need to add it to the config
      if (this.workflowConfig.existing) {
        config.push({
          workflow: 'existing',
          workflowConfig: this.workflowConfig.existing,
        });
      }
    }
    return config;
  }
  get isMemberOfRequiredGroup() {
    return this.dropDownEntries.length > 0;
  }
  get isDisabled() {
    return !this.workflowConfig || this.workflowConfig.state === "disabled";
  }
  get tooltip() {
    if (this.isDisabled) {
      // eslint-disable-next-line unicorn/prefer-ternary
      if (this.workflowConfig.reason) {
        return this.intl.t(`tooltip.${this.workflowConfig.reason}`);
      }
      else if (!this.isMemberOfRequiredGroup) {
        return this.intl.t('tooltip.noCatalog');
      }
    }
  }
  get specificEntityTypeToCreate() {
    // Note: the "existing" workflow definition will not have a entityType
    // so we need to ensure that this.entityType is defined before we do
    // the deeper check.
    if (this.entityType) {
      return this.dropDownEntries.find(({ entityType }) => entityType === this.entityType);
    }
  }
  /**
   * Computes the button text
   */
  get _buttonText() {
    let text;
    if (this.buttonText) {
      text = this.buttonText;
    }
    else if (this.specificEntityTypeToCreate) {
      text = this.intl.t(`addContentType.${this.specificEntityTypeToCreate.entityType}`);
    }
    else {
      text = this.intl.t('addContent');
    }
    return text;
  }
  /**
   * Sets the selectedConfig to the provided dropdownEntry
   * @param dropdownEntry The dropdown entry to set as the selectedConfig
   */
  selectDropdownEntry(dropdownEntry) {
    this.selectedConfig = dropdownEntry;
    this.hubTelemetry.emit(dist.dictionary.category.interaction.action.open.label.modal.details.add);
    this.shouldShowModal = true;
  }
  get modalHeader() {
    if (!!this.selectedConfig) {
      const entityType = this.selectedConfig.entityType || '';
      const workflow = this.selectedConfig.workflowConfig.workflow;
      const intlKeyBase = workflow === 'create' ? `${workflow}.${entityType}` : workflow;
      return this.intl.t(`${intlKeyBase}.modalTitle`);
    }
  }
  renderModalContent() {
    if (!!this.selectedConfig) {
      return (h("arcgis-hub-add-content-workflow", { allowGroupSelection: this.allowGroupSelection, entity: this.entity, onArcgisHubAddContentWorkflowClose: this.handleClose, onArcgisHubAddContentWorkflowComplete: this.handleAddContentWorkflowComplete, site: this.site, workflowConfig: this.selectedConfig.workflowConfig }));
    }
  }
  renderDropdown() {
    return (h(Fragment, null, h("calcite-dropdown", { disabled: this.isDisabled, id: "add-content-dropdown", placement: "bottom-end", ref: this.handleCalciteDropdownRef }, this._renderButton({
      iconEnd: 'chevron-down',
      onClick: this.handleDropdownButtonClick,
      slot: 'trigger',
    }), h("calcite-dropdown-group", { "selection-mode": "none" }, this.dropDownEntries.map(this.renderDropdownItem)), h("slot", { name: "dropdown-items" })), this.tooltip && (h("calcite-tooltip", { label: this.intl.t('tooltip.label'), "reference-element": "add-content-dropdown" }, h("span", null, this.tooltip)))));
  }
  _renderButton(props = {}) {
    // we do not translate these strings because they are product names
    const buttonProps = Object.assign(Object.assign({ round: true }, props), this.buttonProps);
    return h("calcite-button", Object.assign({}, buttonProps), this._buttonText);
  }
  renderButton() {
    return this._renderButton({ onClick: this.handleButtonClick });
  }
  render() {
    if (this.workflowConfig) {
      return (h(Host, { "data-element": "add-entity" }, this.specificEntityTypeToCreate ? this.renderButton() : this.renderDropdown(), h("arcgis-wormhole", { elAttributes: { unthemed: 'true' }, styles: { "--calcite-dialog-background-color": "#fff" } }, h("calcite-dialog", { "escape-disabled": true, heading: this.modalHeader, headingLevel: 3, modal: true, onCalciteDialogClose: this.handleModalClose, open: this.shouldShowModal, "outside-close-disabled": true, scale: "l", widthScale: "l" }, this.renderModalContent()))));
    }
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "_context": ["processConfiguration"],
    "config": ["processConfiguration"],
    "query": ["processConfiguration"],
    "catalog": ["processConfiguration"]
  }; }
};
ArcgisHubAddContent.style = arcgisHubAddContentCss;

class BaseMachine {
  constructor(workflowConfig, context, options) {
    this.overrideAllowGroupSelection = false;
    this.context = context;
    this.workflowConfig = workflowConfig;
    this.t = options === null || options === void 0 ? void 0 : options.t;
    this.overrideAllowGroupSelection = options === null || options === void 0 ? void 0 : options.allowGroupSelection;
  }
  ;
  /**
   *If we are working with a Group, they we can't allow group selection b/c we can't share a group to a group
   Otherwise if there are groups, and there are more than one, we should allow group selection
   */
  get allowGroupSelection() {
    let result = true;
    // If we are working with a group, we can't allow group selection
    if (this.workflowConfig.types.includes("Group")) {
      result = false;
    }
    else {
      // If there are groups, and there are more than one, we should allow group selection
      // otherwise, check if the components have passed a prop to override the default behavior
      result = this.workflowConfig.groups ? this.workflowGroupIds.length > 1 : this.overrideAllowGroupSelection;
    }
    return result;
  }
  /**
   * List of groups that the user can share to in order to be included in the context / query
   */
  get workflowGroupIds() {
    const groupMemberships = this.workflowConfig.groups || { owner: [], admin: [], member: [] };
    return [...groupMemberships.owner, ...groupMemberships.admin, ...groupMemberships.member];
  }
  start() {
    return this.reduce({ tag: 'Initialize' });
  }
}

const States = {
  isSelectContent: (state) => state.tag === 'SelectContent',
  isCreateContent: (state) => state.tag === 'CreateContent',
  isSelectGroups: (state) => state.tag === 'SelectGroups',
  isWorking: (state) => state.tag === 'Working',
  isConfirmation: (state) => state.tag === 'Confirmation',
  isFailure: (state) => state.tag === 'Failure',
  isNotImplemented: (state) => state.tag === 'NotImplemented',
};
const DEFAULT_SELECT_CONTENT_STATE = {
  tag: 'SelectContent',
  component: 'arcgis-hub-gallery',
  selectedContentIds: [],
  selectedGroupIds: [],
  stepIndex: 0
};
const DEFAULT_CREATE_CONTENT_STATE = {
  tag: 'CreateContent',
  component: 'arcgis-hub-entity-editor',
  configurationValues: {},
  selectedGroupIds: [],
  stepIndex: 0
};
const DEFAULT_SELECT_GROUPS_STATE = {
  tag: 'SelectGroups',
  component: 'arcgis-hub-gallery',
  selectedContentIds: [],
  selectedGroupIds: [],
  stepIndex: 1,
};
const DEFAULT_WORKING_STATE = {
  tag: 'Working',
  component: HelpState,
  componentArgs: {
    state: 'loading',
    headingKey: 'working.heading',
    loadingLabel: 'working.loadingLabel',
  }
};

const Actions = {
  isInitialize: (action) => action.tag === 'Initialize',
  isGallerySelectionChanged: (action) => action.tag === 'GallerySelectionChanged',
  isGalleryStateChanged: (action) => action.tag === 'GalleryStateChanged',
  isEntityEditorChanged: (action) => action.tag === 'EntityEditorChanged',
  isNextStep: (action) => action.tag === 'NextStep',
  isPreviousStep: (action) => action.tag === 'PreviousStep',
  isStepChanged: (action) => action.tag === 'StepChanged',
  isSuccess: (action) => action.tag === 'Success',
  isFailure: (action) => action.tag === 'Failure',
  isRetry: (action) => action.tag === 'Retry',
};

class AddExistingMachine extends BaseMachine {
  constructor(workflowConfig, context, options) {
    super(workflowConfig, context, options);
    this.workflow = 'existing';
    // TODO: Add logic here to determine if group selection is required
    // this.requireGroupSelection = true;
  }
  ;
  get canAddOthersContent() {
    const groupMemberships = this.workflowConfig.groups || { owner: [], admin: [], member: [] };
    // are  there any admin / owned groups?
    const groups = [...groupMemberships.owner, ...groupMemberships.admin];
    return groups.length > 1;
  }
  /**
  * Called to get a new state from the machine
  */
  reduce(action, state) {
    /*
      NOTE: we want this to return the passed in state if we don't have a reducer for it (which should mean it is an invalid action for the state)
            so the top level reducer should return the passed in state if it doesn't have a reducer for the action
            all the private reducers return undefined if they don't have a reducer for the action
    */
    let newState;
    if (!state) {
      newState = this.reduceInitial(action);
    }
    else if (States.isSelectContent(state)) {
      newState = this.reduceSelectContent(action, state);
    }
    else if (States.isSelectGroups(state)) {
      newState = this.reduceSelectGroups(action, state);
    }
    else if (States.isWorking(state)) {
      newState = this.reduceWorking(action, state);
    }
    else if (States.isFailure(state)) {
      newState = this.reduceFailure(action, state);
    }
    if (newState) {
      const steps = this.reduceSteps(action, newState);
      const controls = this.reduceControls(action, newState);
      const result = Object.assign(Object.assign(Object.assign({}, newState), steps), controls);
      return result;
    }
    Logger.warn(`reducer for workflow: ${this.workflow}, state: ${state.tag}, and action: ${action.tag} not implemented yet`);
    return state;
  }
  /**
   * Initial reducer for the machine that just sets things up
   * @param action
   * @returns
   */
  reduceInitial(action) {
    if (Actions.isInitialize(action)) {
      // if we can't share other people's content, we should only show the user's content
      // const query = canAddOthersContent? getProp(this.config, 'world') : getProp(this.config, 'mine');
      return Object.assign(Object.assign({}, DEFAULT_SELECT_CONTENT_STATE), { componentArgs: getContentGalleryConfig(this.context, { t: this.t, query: this.workflowConfig.query, canAddOthersContent: this.canAddOthersContent }), 
        // we are limiting to one group for now, so we just choose the first one
        selectedGroupIds: [this.workflowGroupIds[0]].filter(Boolean) });
    }
  }
  /**
   * Fires when the user selects content in the gallery of "exitsting" content
   * @param action
   * @param state
   * @returns
   */
  reduceSelectContent(action, state) {
    const { componentArgs, contentGalleryState, groupsGalleryState, selectedContentIds, selectedGroupIds, stepIndex } = state;
    const selectionKey = this.workflowConfig.targetEntity;
    if (Actions.isGallerySelectionChanged(action)) {
      componentArgs.gallerySelection = action.selected;
      return Object.assign(Object.assign({}, DEFAULT_SELECT_CONTENT_STATE), { componentArgs,
        contentGalleryState,
        groupsGalleryState, selectedContentIds: action.selected[selectionKey], selectedGroupIds,
        stepIndex });
    }
    if (Actions.isGalleryStateChanged(action)) {
      return Object.assign(Object.assign({}, DEFAULT_SELECT_CONTENT_STATE), { componentArgs, contentGalleryState: action.galleryState, groupsGalleryState,
        selectedContentIds,
        selectedGroupIds,
        stepIndex });
    }
    if (Actions.isNextStep(action)) {
      // we are on the SelectContent step and we got the NextStep action
      // eslint-disable-next-line unicorn/prefer-ternary
      if (this.allowGroupSelection) {
        return Object.assign(Object.assign({}, DEFAULT_SELECT_GROUPS_STATE), { componentArgs: getGroupsGalleryConfig(this.context, {
            selectedGroupIds: state.selectedGroupIds,
            state: groupsGalleryState,
            t: this.t,
            catalogGroupIds: this.workflowGroupIds
          }), contentGalleryState,
          groupsGalleryState,
          selectedContentIds,
          selectedGroupIds, telemetry: this.allowGroupSelection ? dist.dictionary.category.interaction.action.open.label.stepper.details.selectGroups : undefined });
      }
      else {
        return Object.assign(Object.assign({}, DEFAULT_WORKING_STATE), { action: 'addExistingContent', selectedContentIds,
          selectedGroupIds, stepIndex: 1 });
      }
    }
    if (Actions.isStepChanged(action)) {
      // we are on the SelectContent step and we got the StepChanged action
      // this is when a user selects a step from the stepper (ie they did not use the Next or Back buttons)
      if (action.stepIndex === state.stepIndex) {
        // this means we stay on the current step
        return state;
      }
      if (action.stepIndex === 1) {
        // if we are on the selectcontent state (which is index 1) and we want to go to index 2, that amounts to a NextStep action
        return this.reduceSelectContent({ tag: 'NextStep' }, state);
      }
      if (action.stepIndex === 2) {
        return Object.assign(Object.assign({}, DEFAULT_WORKING_STATE), { action: 'addExistingContent', selectedContentIds,
          selectedGroupIds, stepIndex: action.stepIndex });
      }
    }
  }
  reduceSelectGroups(action, state) {
    const { componentArgs, contentGalleryState, groupsGalleryState, selectedContentIds, selectedGroupIds, stepIndex } = state;
    if (Actions.isGallerySelectionChanged(action)) {
      componentArgs.gallerySelection = action.selected;
      return Object.assign(Object.assign({}, DEFAULT_SELECT_GROUPS_STATE), { componentArgs,
        contentGalleryState,
        groupsGalleryState, selectedGroupIds: action.selected.group, selectedContentIds,
        stepIndex });
    }
    if (Actions.isGalleryStateChanged(action)) {
      return Object.assign(Object.assign({}, DEFAULT_SELECT_GROUPS_STATE), { componentArgs,
        contentGalleryState, groupsGalleryState: action.galleryState, selectedContentIds,
        selectedGroupIds,
        stepIndex });
    }
    if (Actions.isPreviousStep(action)) {
      // we are on the SelectGroups step and we got the PreviousStep action
      return Object.assign(Object.assign({}, DEFAULT_SELECT_CONTENT_STATE), { componentArgs: getContentGalleryConfig(this.context, { selectedContentIds, state: contentGalleryState, t: this.t, query: this.workflowConfig.query, canAddOthersContent: this.canAddOthersContent }), contentGalleryState,
        groupsGalleryState,
        selectedContentIds,
        selectedGroupIds, telemetry: dist.dictionary.category.interaction.action.open.label.stepper.details.selectContent });
    }
    if (Actions.isNextStep(action)) {
      // we are on the SelectGroups step and we got the NextStep action
      return Object.assign(Object.assign({}, DEFAULT_WORKING_STATE), { action: 'addExistingContent', selectedContentIds,
        selectedGroupIds, stepIndex: 2, telemetry: dist.dictionary.category.interaction.action.open.label.stepper.details.confirm });
    }
    if (Actions.isStepChanged(action)) {
      // we are on the SelectGroups step and we got the StepChanged action
      // this is when a user selects a step from the stepper (ie they did not use the Next or Back buttons)
      if (action.stepIndex === state.stepIndex) {
        // this means we stay on the current step
        return state;
      }
      if (action.stepIndex === 0) {
        // if we are on the selectgroups state (which is index 1) and we want to go to index 0, that amounts to a PreviousStep action
        return this.reduceSelectGroups({ tag: 'PreviousStep' }, state);
      }
      if (action.stepIndex === 2) {
        // if we are on the selectgroups state (which is index 1) and we want to go to index 2, that amounts to a NextStep action
        return this.reduceSelectGroups({ tag: 'NextStep' }, state);
      }
    }
  }
  // Shared reduce logic for the Working and Confirmation states
  reduceWorking(action, state) {
    const { selectedContentIds, selectedGroupIds } = state;
    if (Actions.isSuccess(action)) {
      // we are in the working state and we got the Success action
      // this means we successfully added the content
      // we should show the confirmation state
      const isSuccess = action.results.overallStatus === 'success';
      const icon = isSuccess ? 'check-circle' : 'exclamation-mark-triangle';
      const i18nParts = [this.workflow];
      const i18nBase = i18nParts.filter(Boolean).join('.');
      return {
        tag: 'Confirmation',
        component: 'arcgis-hub-add-content-results',
        stepIndex: this.allowGroupSelection ? 2 : 1,
        componentArgs: {
          workflow: this.workflow,
          results: action.results,
          icon,
          helpStateClass: isSuccess ? 'success' : 'warning',
          helpStateConfig: {
            heading: `${i18nBase}.${isSuccess ? 'successHeading' : 'failureHeading'}`,
            icon,
            isMain: false,
            kind: isSuccess ? 'success' : 'warning',
          }
        },
        telemetry: Object.assign(Object.assign({}, dist.dictionary.category.groups.action.share.label.content), { response: dist.constants.response.SUCCESS })
      };
    }
    if (Actions.isFailure(action)) {
      // we are in the working state and we got the Failure action
      // this means we failed to add the content
      // we should return the failure state
      return {
        tag: 'Failure',
        component: HelpState,
        selectedContentIds,
        selectedGroupIds,
        stepIndex: this.allowGroupSelection ? 2 : 1,
        componentArgs: {
          className: 'danger',
          actionKey: 'failure.action',
          headingKey: 'failure.heading',
          icon: 'frown',
          kind: 'danger',
          messageKey: 'failure.message',
        },
        telemetry: Object.assign(Object.assign({}, dist.dictionary.category.groups.action.share.label.content), { response: dist.constants.response.FAILURE })
      };
    }
  }
  reduceFailure(action, state) {
    const { selectedContentIds, selectedGroupIds } = state;
    if (Actions.isRetry(action)) {
      // we are on the SelectGroups step and we got the NextStep action
      return Object.assign(Object.assign({}, DEFAULT_WORKING_STATE), { action: 'addExistingContent', selectedContentIds,
        selectedGroupIds, stepIndex: this.allowGroupSelection ? 2 : 1 });
    }
  }
  reduceSteps(_, state) {
    // this is the stepper steps
    const selectedContentIds = state.selectedContentIds || [];
    const selectedGroupIds = state.selectedGroupIds || [];
    // NOTE: the state here is the _new_ state
    const steps = [
      {
        labelKey: 'steps.selectContent',
        complete: States.isWorking(state) || States.isSelectGroups(state) || States.isConfirmation(state) || States.isFailure(state),
        disabled: States.isWorking(state) || States.isConfirmation(state) || States.isFailure(state),
        error: false
      }
    ];
    if (this.allowGroupSelection) {
      let groupsStepIsDisabled = true;
      // eslint-disable-next-line unicorn/prefer-ternary
      if (States.isWorking(state) || States.isConfirmation(state) || States.isFailure(state)) {
        groupsStepIsDisabled = true;
      }
      else {
        groupsStepIsDisabled = !selectedContentIds.length;
      }
      steps.push({
        labelKey: 'steps.selectGroups',
        complete: States.isWorking(state) || States.isConfirmation(state) || States.isFailure(state),
        disabled: groupsStepIsDisabled,
        error: false
      });
    }
    steps.push({
      labelKey: 'steps.confirmation',
      complete: States.isConfirmation(state),
      disabled: (!States.isConfirmation(state) && !States.isFailure(state) && !States.isWorking(state)) && (!selectedContentIds.length || !selectedGroupIds.length),
      error: States.isFailure(state)
    });
    return { steps };
  }
  reduceControls(_, state) {
    // this is the controls at the bottom
    // NOTE: the state here is the _new_ state
    const selectedContentIds = state.selectedContentIds || [];
    const selectedGroupIds = state.selectedGroupIds || [];
    let nextIsDisabled = true;
    if (States.isSelectContent(state)) {
      nextIsDisabled = !selectedContentIds.length || (!this.allowGroupSelection && !selectedGroupIds.length);
    }
    else if (States.isSelectGroups(state)) {
      nextIsDisabled = !selectedGroupIds.length;
    }
    let nextButtonLabelKey = 'controls.addContent';
    if (States.isSelectContent(state) && this.allowGroupSelection) {
      nextButtonLabelKey = 'controls.next';
    }
    return {
      controls: {
        back: {
          visible: States.isSelectGroups(state),
          labelKey: 'controls.back'
        },
        selection: {
          visible: States.isSelectContent(state) || States.isSelectGroups(state),
          count: States.isSelectContent(state) ? selectedContentIds.length : selectedGroupIds === null || selectedGroupIds === void 0 ? void 0 : selectedGroupIds.length,
          limit: States.isSelectGroups(state) ? 1 : undefined
        },
        next: {
          visible: States.isSelectContent(state) || States.isSelectGroups(state),
          disabled: nextIsDisabled,
          labelKey: nextButtonLabelKey
        },
        cancel: {
          visible: States.isSelectContent(state) || States.isSelectGroups(state),
          labelKey: 'controls.cancel'
        },
        close: {
          visible: States.isConfirmation(state) || States.isFailure(state) || States.isWorking(state),
          disabled: States.isWorking(state),
          labelKey: 'controls.close'
        }
      },
    };
  }
}

class CreateNewMachine extends BaseMachine {
  constructor(workflowConfig, context, options) {
    super(workflowConfig, context, options);
    this.workflow = 'create';
    this.requireGroupSelection = false;
    this.requireGroupSelection = this.workflowGroupIds.length > 1;
    this.entity = options === null || options === void 0 ? void 0 : options.entity;
    this.site = options === null || options === void 0 ? void 0 : options.site;
  }
  ;
  /**
   * Get the HubEntityType of the thing we are creating
   * e.g. initiative, project, etc, vs "Hub Project" or "Hub Initiative"
   */
  get entityType() {
    // Although the workflowConfig.types is an array, for the create workflow,
    // we pre-process things so there is only one entry
    const type = this.workflowConfig.types[0];
    // convert to an entity type
    return getHubEntityTypeFromType(type);
  }
  /**
  * Called to get a new state from the machine
  */
  reduce(action, state) {
    /*
      NOTE: we want this to return the passed in state if we don't have a reducer for it (which should mean it is an invalid action for the state)
            so the top level reducer should return the passed in state if it doesn't have a reducer for the action
            all the private reducers return undefined if they don't have a reducer for the action
    */
    let newState;
    if (!state) {
      newState = this.reduceInitial(action);
    }
    else if (States.isCreateContent(state)) {
      newState = this.reduceCreateContent(action, state);
    }
    else if (States.isSelectGroups(state)) {
      newState = this.reduceSelectGroups(action, state);
    }
    else if (States.isWorking(state)) {
      newState = this.reduceWorking(action, state);
    }
    else if (States.isFailure(state)) {
      newState = this.reduceFailure(action, state);
    }
    if (newState) {
      const steps = this.reduceSteps(action, newState);
      const controls = this.reduceControls(action, newState);
      const result = Object.assign(Object.assign(Object.assign({}, newState), steps), controls);
      return result;
    }
    Logger.warn(`reducer for workflow: ${this.workflow}, state: ${state.tag}, and action: ${action.tag} not implemented yet`);
    return state;
  }
  get helpStateProps() {
    const i18nBase = `createHelpState.${this.entityType}.`;
    return {
      heading: this.t(`${i18nBase}heading`),
      icon: getIcon(this.entityType),
      isMain: false,
      message: this.t(`${i18nBase}message`),
    };
  }
  reduceInitial(action) {
    if (Actions.isInitialize(action)) {
      const { helpStateProps } = this;
      const editorTypeVersion = ['initiative', 'project'].includes(this.entityType) ? '2' : '';
      const editorType = `hub:${this.entityType}:create${editorTypeVersion}`;
      return Object.assign(Object.assign({}, DEFAULT_CREATE_CONTENT_STATE), { componentArgs: {
          editorType,
          entity: getDefaultEntityValues(this.entityType, DEFAULT_CREATE_CONTENT_STATE.configurationValues, {
            entity: this.entity,
            site: this.site,
          }),
          isOpen: true,
          layout: "step",
          scale: 'l'
        }, helpStateProps, 
        // we are limiting to one group for now, so we just choose the first one
        selectedGroupIds: [this.workflowGroupIds[0]].filter(Boolean) });
    }
  }
  reduceCreateContent(action, state) {
    const { componentArgs, configurationValues, groupsGalleryState, selectedGroupIds } = state;
    if (Actions.isEntityEditorChanged(action)) {
      const { helpStateProps } = this;
      return Object.assign(Object.assign({}, DEFAULT_CREATE_CONTENT_STATE), { componentArgs: Object.assign(Object.assign({}, componentArgs), { entity: action.configurationValues.values }), configurationValues: action.configurationValues, helpStateProps,
        selectedGroupIds });
    }
    if (Actions.isNextStep(action)) {
      // we are on the SelectContent step and we got the NextStep action
      // eslint-disable-next-line unicorn/prefer-ternary
      if (this.allowGroupSelection) {
        return Object.assign(Object.assign({}, DEFAULT_SELECT_GROUPS_STATE), { componentArgs: getGroupsGalleryConfig(this.context, {
            selectedGroupIds: state.selectedGroupIds,
            state: groupsGalleryState,
            t: this.t,
            catalogGroupIds: this.workflowGroupIds
          }), configurationValues,
          groupsGalleryState,
          selectedGroupIds, telemetry: this.allowGroupSelection ? dist.dictionary.category.interaction.action.open.label.stepper.details.selectGroups : undefined });
      }
      else {
        return Object.assign(Object.assign({}, DEFAULT_WORKING_STATE), { action: 'addNewContent', configurationValues,
          selectedGroupIds, stepIndex: 1 });
      }
    }
    if (Actions.isStepChanged(action)) {
      // we are on the CreateContent step and we got the StepChanged action
      // this is when a user selects a step from the stepper (ie they did not use the Next or Back buttons)
      if (action.stepIndex === state.stepIndex) {
        // this means we stay on the current step
        return state;
      }
      if (action.stepIndex === 1) {
        // if we are on the createcontent state (which is index 1) and we want to go to index 2, that amounts to a NextStep action
        return this.reduceCreateContent({ tag: 'NextStep' }, state);
      }
      if (action.stepIndex === 2) {
        return Object.assign(Object.assign({}, DEFAULT_WORKING_STATE), { action: 'addNewContent', configurationValues,
          selectedGroupIds, stepIndex: action.stepIndex });
      }
    }
  }
  reduceSelectGroups(action, state) {
    const { componentArgs, configurationValues, groupsGalleryState, selectedGroupIds, stepIndex } = state;
    if (Actions.isGallerySelectionChanged(action)) {
      componentArgs.gallerySelection = action.selected;
      return Object.assign(Object.assign({}, DEFAULT_SELECT_GROUPS_STATE), { componentArgs,
        groupsGalleryState,
        configurationValues, selectedGroupIds: action.selected.group, stepIndex });
    }
    if (Actions.isGalleryStateChanged(action)) {
      return Object.assign(Object.assign({}, DEFAULT_SELECT_GROUPS_STATE), { componentArgs,
        configurationValues, groupsGalleryState: action.galleryState, selectedGroupIds,
        stepIndex });
    }
    if (Actions.isPreviousStep(action)) {
      // we are on the SelectGroups step and we got the PreviousStep action
      const { helpStateProps } = this;
      const editorTypeVersion = ['initiative', 'project'].includes(this.entityType) ? '2' : '';
      const editorType = `hub:${this.entityType}:create${editorTypeVersion}`;
      return Object.assign(Object.assign({}, DEFAULT_CREATE_CONTENT_STATE), { componentArgs: {
          context: this.context,
          // editorContext={this.editorContext}
          editorType,
          entity: state.configurationValues.values,
          isOpen: true,
          layout: "step"
        }, configurationValues: state.configurationValues, groupsGalleryState,
        helpStateProps,
        selectedGroupIds });
    }
    if (Actions.isNextStep(action)) {
      // we are on the SelectGroups step and we got the NextStep action
      return Object.assign(Object.assign({}, DEFAULT_WORKING_STATE), { action: 'addNewContent', configurationValues,
        selectedGroupIds, stepIndex: 2, telemetry: dist.dictionary.category.interaction.action.open.label.stepper.details.confirm });
    }
    if (Actions.isStepChanged(action)) {
      // we are on the SelectGroups step and we got the StepChanged action
      // this is when a user selects a step from the stepper (ie they did not use the Next or Back buttons)
      if (action.stepIndex === state.stepIndex) {
        // this means we stay on the current step
        return state;
      }
      if (action.stepIndex === 0) {
        // if we are on the selectgroups state (which is index 1) and we want to go to index 0, that amounts to a PreviousStep action
        return this.reduceSelectGroups({ tag: 'PreviousStep' }, state);
      }
      if (action.stepIndex === 2) {
        // if we are on the selectgroups state (which is index 1) and we want to go to index 2, that amounts to a NextStep action
        return this.reduceSelectGroups({ tag: 'NextStep' }, state);
      }
    }
  }
  // Shared reduce logic for the Working and Confirmation states
  reduceWorking(action, state) {
    var _a, _b;
    const { configurationValues, selectedGroupIds } = state;
    if (Actions.isSuccess(action)) {
      // we are in the working state and we got the Success action
      // this means we successfully added the content
      // we should show the confirmation state
      const isSuccess = action.results.overallStatus === 'success';
      const icon = isSuccess ? 'check-circle' : 'exclamation-mark-triangle';
      const i18nParts = [this.workflow, this.entityType];
      const message = isSuccess ? [...i18nParts, 'successMessage'].join('.') : undefined;
      if (isSuccess) {
        if (!!((_b = (_a = action.results) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b.length)) {
          i18nParts.push('successWithGroupHeading');
        }
        else {
          i18nParts.push('successWithoutGroupHeading');
        }
      }
      else {
        i18nParts.push('failureHeading');
      }
      return {
        tag: 'Confirmation',
        component: 'arcgis-hub-add-content-results',
        stepIndex: this.allowGroupSelection ? 2 : 1,
        componentArgs: {
          workflow: this.workflow,
          results: action.results,
          icon,
          helpStateClass: isSuccess ? 'success' : 'warning',
          helpStateConfig: {
            heading: i18nParts.filter(Boolean).join('.'),
            icon,
            kind: isSuccess ? 'success' : 'warning',
            message
          }
        },
        telemetry: Object.assign(Object.assign({}, dist.dictionary.category.groups.action.share.label.content), { response: dist.constants.response.SUCCESS })
      };
    }
    if (Actions.isFailure(action)) {
      // we are in the working state and we got the Failure action
      // this means we failed to add the content
      // we should return the failure state
      return {
        tag: 'Failure',
        component: HelpState,
        configurationValues,
        selectedGroupIds,
        stepIndex: this.allowGroupSelection ? 2 : 1,
        componentArgs: {
          className: 'danger',
          actionKey: 'failure.action',
          headingKey: 'failure.heading',
          icon: 'frown',
          kind: 'danger',
          messageKey: 'failure.message',
        },
        telemetry: Object.assign(Object.assign({}, dist.dictionary.category.groups.action.share.label.content), { response: dist.constants.response.FAILURE })
      };
    }
  }
  reduceFailure(action, state) {
    const { configurationValues, selectedGroupIds } = state;
    if (Actions.isRetry(action)) {
      // we are on the SelectGroups step and we got the NextStep action
      return Object.assign(Object.assign({}, DEFAULT_WORKING_STATE), { action: 'addNewContent', configurationValues,
        selectedGroupIds, stepIndex: this.allowGroupSelection ? 2 : 1 });
    }
  }
  reduceSteps(_, state) {
    // this is the stepper steps
    const selectedGroupIds = state.selectedGroupIds || [];
    const configurationValues = state.configurationValues || {};
    // NOTE: the state here is the _new_ state
    const steps = [
      {
        labelKey: 'steps.createContent',
        complete: States.isWorking(state) || States.isSelectGroups(state) || States.isConfirmation(state) || States.isFailure(state),
        disabled: States.isWorking(state) || States.isConfirmation(state) || States.isFailure(state),
        error: false
      }
    ];
    if (this.allowGroupSelection) {
      let groupsStepIsDisabled = true;
      // eslint-disable-next-line unicorn/prefer-ternary
      if (States.isWorking(state) || States.isConfirmation(state) || States.isFailure(state)) {
        groupsStepIsDisabled = true;
      }
      else {
        groupsStepIsDisabled = !state.configurationValues.isValid;
      }
      steps.push({
        labelKey: 'steps.selectGroups',
        complete: States.isWorking(state) || States.isConfirmation(state) || States.isFailure(state),
        disabled: groupsStepIsDisabled,
        error: false
      });
    }
    let confirmationStepIsDisabled = true;
    if (States.isConfirmation(state) || States.isFailure(state) || States.isWorking(state)) {
      confirmationStepIsDisabled = false;
    }
    else if (States.isCreateContent(state) || States.isSelectGroups(state)) {
      confirmationStepIsDisabled = !configurationValues.isValid || (this.requireGroupSelection && !selectedGroupIds.length);
    }
    steps.push({
      labelKey: 'steps.confirmation',
      complete: States.isConfirmation(state),
      disabled: confirmationStepIsDisabled,
      error: States.isFailure(state)
    });
    return { steps };
  }
  reduceControls(_, state) {
    // this is the controls at the bottom
    // NOTE: the state here is the _new_ state
    const selectedGroupIds = state.selectedGroupIds || [];
    let nextIsDisabled = true;
    if (States.isCreateContent(state)) {
      nextIsDisabled = !state.configurationValues.isValid;
    }
    else if (States.isSelectGroups(state)) {
      nextIsDisabled = this.requireGroupSelection && !selectedGroupIds.length;
    }
    let nextButtonLabelKey = 'controls.create';
    if (States.isCreateContent(state) && this.allowGroupSelection) {
      nextButtonLabelKey = 'controls.next';
    }
    return {
      controls: {
        back: {
          visible: States.isSelectGroups(state),
          labelKey: 'controls.back'
        },
        selection: {
          visible: States.isSelectGroups(state),
          count: selectedGroupIds === null || selectedGroupIds === void 0 ? void 0 : selectedGroupIds.length,
          limit: States.isSelectGroups(state) ? 1 : undefined
        },
        next: {
          visible: States.isCreateContent(state) || States.isSelectGroups(state),
          disabled: nextIsDisabled,
          labelKey: nextButtonLabelKey
        },
        cancel: {
          visible: States.isCreateContent(state) || States.isSelectGroups(state),
          labelKey: 'controls.cancel'
        },
        close: {
          visible: States.isConfirmation(state) || States.isFailure(state) || States.isWorking(state),
          disabled: States.isWorking(state),
          labelKey: 'controls.close'
        }
      },
    };
  }
}

class NotImplementedMachine extends BaseMachine {
  /**
  * Called to get a new state from the machine
  */
  reduce(action, state) {
    /*
      NOTE: we want this to return the passed in state if we don't have a reducer for it (which should mean it is an invalid action for the state)
            so the top level reducer should return the passed in state if it doesn't have a reducer for the action
            all the private reducers return undefined if they don't have a reducer for the action
    */
    let newState;
    if (!state) {
      newState = this.reduceInitial(action);
    }
    if (newState) {
      const steps = this.reduceSteps(action, newState);
      const controls = this.reduceControls(action, newState);
      const result = Object.assign(Object.assign(Object.assign({}, newState), steps), controls);
      return result;
    }
    Logger.warn(`reducer for workflow: not-implemented, state: ${state.tag}, and action: ${action.tag} not implemented yet`);
    return state;
  }
  reduceInitial(action) {
    if (Actions.isInitialize(action)) {
      return {
        tag: 'NotImplemented',
        component: HelpState,
        componentArgs: {
          className: 'warning',
          headingKey: 'notImplemented.heading',
          icon: 'frown',
        },
        controls: {},
        configurationValues: {},
        selectedContentIds: [],
        selectedGroupIds: [],
        stepIndex: 0,
        steps: [],
      };
    }
  }
  reduceSteps(_, state) {
    // this is the stepper steps
    // NOTE: the state here is the _new_ state
    if (States.isNotImplemented(state)) {
      return {
        steps: [
          {
            labelKey: 'steps.notImplemented',
            complete: false,
            disabled: false,
            error: false
          }
        ]
      };
    }
  }
  reduceControls(_, state) {
    // this is the controls at the bottom
    // NOTE: the state here is the _new_ state
    if (States.isNotImplemented(state)) {
      return {
        controls: {
          back: {
            visible: false,
            labelKey: 'controls.back'
          },
          selection: {
            visible: false,
            count: 0,
          },
          next: {
            visible: false,
            disabled: false,
            labelKey: 'controls.next'
          },
          cancel: {
            visible: false,
            labelKey: 'controls.cancel'
          },
          close: {
            visible: true,
            disabled: false,
            labelKey: 'controls.close'
          }
        },
      };
    }
  }
}

async function initMachine(workflowConfig, context, options) {
  switch (workflowConfig.workflow) {
    case 'existing':
      return new AddExistingMachine(workflowConfig, context, options);
    case 'create':
      return new CreateNewMachine(workflowConfig, context, options);
    default:
      return new NotImplementedMachine(null, context, options);
  }
}

const arcgisHubAddContentWorkflowCss = ".sc-arcgis-hub-add-content-workflow-h{display:flex;flex-direction:column;justify-content:space-between;gap:1rem;width:calc(100% - 2px)}.sc-arcgis-hub-add-content-workflow-scroll-container{height:65vh;overflow-y:auto;padding-inline:4px}arcgis-hub-entity-editor.sc-arcgis-hub-add-content-workflow{max-width:60%;margin:0 auto}arcgis-configuration-editor-field.sc-arcgis-hub-add-content-workflow calcite-label.sc-arcgis-hub-add-content-workflow>span.sc-arcgis-hub-add-content-workflow:first-child{font-weight:bold}arcgis-hub-help-state.sc-arcgis-hub-add-content-workflow,arcgis-hub-add-content-results.sc-arcgis-hub-add-content-workflow{min-height:60vh}arcgis-hub-help-state.create-help-state.sc-arcgis-hub-add-content-workflow{min-height:unset}arcgis-hub-help-state.danger.sc-arcgis-hub-add-content-workflow{--calcite-ui-icon-color:var(--calcite-color-status-danger)}arcgis-hub-help-state.warning.sc-arcgis-hub-add-content-workflow{--calcite-ui-icon-color:var(--calcite-color-status-warning)}.sc-arcgis-hub-add-content-workflow.browse-templates-button.sc-arcgis-hub-add-content-workflow{display:flex;justify-self:center}.sc-arcgis-hub-add-content-workflow-footer.sc-arcgis-hub-add-content-workflow{display:flex;justify-content:space-between;gap:0.5rem;border-width:0px;border-top-width:1px;border-style:solid;border-color:var(--calcite-color-border-1);padding-block-start:var(--calcite-panel-content-space)}.sc-arcgis-hub-add-content-workflow-footer-start.sc-arcgis-hub-add-content-workflow,.sc-arcgis-hub-add-content-workflow-footer-end.sc-arcgis-hub-add-content-workflow{display:flex;gap:0.5rem}.sc-arcgis-hub-add-content-workflow-selection-count{display:flex;align-items:center;border-radius:0.25rem;padding:0.75rem;background-color:var(--calcite-color-foreground-1);--calcite-label-margin-bottom:0;border:solid 1px var(--calcite-color-text-1)}";

const ArcgisHubAddContentWorkflow = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubAddContentWorkflowClose = createEvent(this, "arcgisHubAddContentWorkflowClose", 7);
    this.arcgisHubAddContentWorkflowComplete = createEvent(this, "arcgisHubAddContentWorkflowComplete", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    /**
    * Handler for clicking a step item in the stepper header
    */
    this.handleStepperItemChange = (evt) => {
      const { state } = this;
      // this is insane but i don't think there is a good way to get the index of the selected item from the stepper
      const stepIndex = Array.from(evt.target.children).reduce((acc, item, idx) => {
        if (item.selected) {
          return idx;
        }
        return acc;
      }, -1);
      const action = { tag: 'StepChanged', stepIndex };
      this.state = this.machine.reduce(action, state);
    };
    /**
    * Handler for the back button
    */
    this.handleBackButton = () => {
      const { state } = this;
      const action = { tag: 'PreviousStep' };
      this.state = this.machine.reduce(action, state);
    };
    /**
    * Handler for the next button
    */
    this.handleNextButton = () => {
      const { state } = this;
      const action = { tag: 'NextStep' };
      this.state = this.machine.reduce(action, state);
    };
    /**
    * Handler for the cancel button
    */
    this.handleCancelButton = () => {
      this.arcgisHubAddContentWorkflowClose.emit();
    };
    /**
     * Handler for the browse button
     */
    this.handleBrowseTemplatesButton = () => {
      this.hubTelemetry.emit(dist.dictionary.category.interaction.action.open.label.modal.details.templates);
      this.arcgisHubAddContentWorkflowClose.emit();
    };
    /**
    * Handler for the close/done button
    */
    this.handleCloseButton = () => {
      this.arcgisHubAddContentWorkflowClose.emit();
    };
    this.workflowConfig = undefined;
    this.allowGroupSelection = false;
    this.entity = undefined;
    this.site = undefined;
    this.machine = undefined;
    this.state = undefined;
  }
  get _context() { return getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.initMachine();
  }
  async initMachine() {
    const options = {
      allowGroupSelection: this.allowGroupSelection,
      t: (key, opts) => this.intl.t(key, opts),
      entity: this.entity,
      site: this.site,
    };
    this.machine = await initMachine(this.workflowConfig, this._context, options);
    this.state = this.machine.start();
  }
  stateChanged(state) {
    if (state.telemetry) {
      // if the new state has telemetry, emit it
      this.hubTelemetry.emit(state.telemetry);
    }
    if (States.isWorking(state) && state.action) {
      // if the new state is the Working state and it has an action, execute it
      this[state.action](state);
    }
    if (States.isConfirmation(state)) {
      // if the new state is the Confirmation state, emit the complete event
      this.arcgisHubAddContentWorkflowComplete.emit();
    }
  }
  /**
  * Fetches the content we will share to the selected groups
  */
  fetchContent(state) {
    switch (this.workflowConfig.targetEntity) {
      case 'event':
        const eventPromises = state.selectedContentIds.map(id => fetchEvent(id, this._context.hubRequestOptions));
        return Promise.all(eventPromises);
      default:
        const contentPromises = state.selectedContentIds.map(id => fetchHubContent(id, this._context.requestOptions));
        return Promise.all(contentPromises);
    }
  }
  async shareEntitiesWithGroups(groupIds, content) {
    const groupPromises = groupIds.map(groupId => fetchHubGroup(groupId, this._context.hubRequestOptions));
    const groups = await Promise.all(groupPromises);
    const results = await shareEntitiesToGroups(groups, content, this._context);
    return results;
  }
  /**
  * Adds the selected content to the selected groups
  */
  async addExistingContent(state) {
    try {
      const content = await this.fetchContent(state);
      const results = await this.shareEntitiesWithGroups(state.selectedGroupIds, content);
      const action = { tag: 'Success', results };
      this.state = this.machine.reduce(action, state);
    }
    catch (error) {
      this.state = this.machine.reduce({ tag: 'Failure', error }, state);
    }
  }
  async pollForContent(entity) {
    var _a;
    const query = {
      targetEntity: getEntityTypeFromHubEntityType(getTypeFromEntity(entity)),
      filters: [
        {
          predicates: [
            {
              id: entity.id
            }
          ]
        }
      ],
    };
    const searchOpts = {
      num: 1,
      requestOptions: (_a = this._context) === null || _a === void 0 ? void 0 : _a.hubRequestOptions
    };
    return poll(() => hubSearch(query, searchOpts), (content) => !!content.total);
  }
  async addNewContent(state) {
    try {
      // create the entity
      const editor = EntityEditor.fromEntity(state.configurationValues.values, this._context);
      const entity = await editor.save(cloneObject(state.configurationValues.values));
      // poll for the content - the search index is not immediately updated
      // we don't want to proceed to the success state until we know the gallery will show the entity
      await this.pollForContent(entity);
      if (entity.type === 'Group') {
        const results = {
          overallStatus: 'success',
          groups: [],
          entities: [entity],
          results: [],
          receipts: []
        };
        const action = { tag: 'Success', results };
        this.state = this.machine.reduce(action, state);
      }
      else {
        const results = await this.shareEntitiesWithGroups(state.selectedGroupIds, [entity]);
        const action = { tag: 'Success', results };
        this.state = this.machine.reduce(action, state);
      }
    }
    catch (error) {
      this.state = this.machine.reduce({ tag: 'Failure', error }, state);
    }
  }
  /**
  * Handler for gallery state change events
  * This is used for the content gallery and the groups gallery - the state machien decides what to do with it
  */
  handleGalleryStateChange(event) {
    if (!event.detail.isInitialization) {
      const { state } = this;
      const action = { tag: 'GalleryStateChanged', galleryState: event.detail };
      this.state = this.machine.reduce(action, state);
    }
  }
  /**
  * Handler for gallery selection events
  * This is used for the content gallery and the groups gallery - the state machien decides what to do with it
  */
  handleGallerySelect(event) {
    const { state } = this;
    const action = { tag: 'GallerySelectionChanged', selected: event.detail };
    this.state = this.machine.reduce(action, state);
  }
  /**
  * Handler for clicks of the arcgis-hub-help-state action
  * This is currently only used for the retry action
  */
  handleHelpStateActionClick() {
    const { state } = this;
    this.state = this.machine.reduce({ tag: 'Retry' }, state);
  }
  handleEntityEditorChange(event) {
    const { state } = this;
    this.state = this.machine.reduce({ tag: 'EntityEditorChanged', configurationValues: event.detail }, state);
  }
  /**
  * Renders the content for the active step based on the component and component args provided on the state
  */
  renderCurrentStep(stepIndex) {
    var _a;
    const { state } = this;
    if (state && state.stepIndex === stepIndex) {
      const results = [];
      if (state.helpStateProps) {
        results.push(h("arcgis-hub-help-state", Object.assign({ class: "create-help-state" }, state.helpStateProps)));
      }
      if (state.component) {
        const props = Object.assign(Object.assign({}, state.componentArgs), { t: (key) => this.intl.t(key) });
        const editorType = (_a = state.componentArgs) === null || _a === void 0 ? void 0 : _a.editorType;
        results.push(h(this.state.component, Object.assign({}, props)));
        // TODO: remove the alpha gating of this button before the GA release
        if (editorType === "hub:site:create" && this._context.isAlphaOrg) {
          results.push(h("calcite-button", { class: "browse-templates-button", href: "/edit/new/browse", label: this.intl.t('controls.browseTemplates'), onClick: this.handleBrowseTemplatesButton, rel: "noopener noreferrer", target: "_blank" }, this.intl.t('controls.browseTemplates')));
        }
      }
      return results;
    }
  }
  renderSelectionCount(state) {
    const { selection } = state.controls;
    if (selection.visible) {
      const selectionKey = selection.limit ? 'selection.limited' : 'selection.unlimited';
      return h("div", { class: "sc-arcgis-hub-add-content-workflow-selection-count" }, h("calcite-label", null, this.intl.t(selectionKey, selection)));
    }
  }
  renderControls(state) {
    return h("div", { class: "sc-arcgis-hub-add-content-workflow-footer" }, h("div", { class: "sc-arcgis-hub-add-content-workflow-footer-start" }, state.controls.back.visible &&
      h("calcite-button", { apperance: "outline", disabled: state.controls.back.disabled, kind: "neutral", onClick: this.handleBackButton, round: true, scale: "l" }, this.intl.t(state.controls.back.labelKey)), this.renderSelectionCount(state)), h("div", { class: "sc-arcgis-hub-add-content-workflow-footer-end" }, state.controls.cancel.visible &&
      h("calcite-button", { appearance: "outline", disabled: state.controls.cancel.disabled, onClick: this.handleCancelButton, round: true, scale: "l" }, this.intl.t(state.controls.cancel.labelKey)), state.controls.next.visible &&
      h("calcite-button", { disabled: state.controls.next.disabled, onClick: this.handleNextButton, round: true, scale: "l" }, this.intl.t(state.controls.next.labelKey)), state.controls.close.visible &&
      h("calcite-button", { disabled: state.controls.close.disabled, onClick: this.handleCloseButton, round: true, scale: "l" }, this.intl.t(state.controls.close.labelKey))));
  }
  render() {
    const { state } = this;
    if (state) {
      return (h(Host, { "data-element": "add-content-workflow" }, h("calcite-stepper", { icon: true, numbered: true, onCalciteStepperChange: this.handleStepperItemChange }, state.steps.map((step, idx) => {
        return (h("calcite-stepper-item", { complete: step.complete, disabled: step.disabled, error: step.error, heading: this.intl.t(step.labelKey), key: step.labelKey, selected: state.stepIndex === idx }, h("div", { class: "sc-arcgis-hub-add-content-workflow-scroll-container" }, this.renderCurrentStep(idx))));
      })), this.renderControls(state)));
    }
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "workflowConfig": ["initMachine"],
    "state": ["stateChanged"]
  }; }
};
ArcgisHubAddContentWorkflow.style = arcgisHubAddContentWorkflowCss;

// TODO: Move to hub.js
var AutoSuggestMatchSource;
(function (AutoSuggestMatchSource) {
  /**
   * Match came from the recent matches list in local storage
   */
  AutoSuggestMatchSource["RECENT"] = "recent";
  /**
   * Match came from a search api (e.g., portal or hub)
   */
  AutoSuggestMatchSource["SEARCH"] = "search";
  /**
   * Match came from a location api (e.g., geocoder, places api, etc.)
   */
  AutoSuggestMatchSource["LOCATION"] = "location";
})(AutoSuggestMatchSource || (AutoSuggestMatchSource = {}));

/**
 * Returns an empty auto-suggest response object.
 * @returns {IHubAutoSuggestResponse} An empty auto-suggest response object.
 */
function getEmptyAutoSuggestResponse() {
  return {
    recent: [],
    search: [],
    location: [],
  };
}

/**
 * enum of keys used in local storage
 */
var HUB_STORAGE_KEYS;
(function (HUB_STORAGE_KEYS) {
  HUB_STORAGE_KEYS["AUTO_SUGGEST"] = "ESRI_HUB_AUTO_SUGGEST";
})(HUB_STORAGE_KEYS || (HUB_STORAGE_KEYS = {}));

/**
 * Returns all recent terms matches from local storage.
 */
function getAllRecentTermsMatches() {
  try {
    let storageEntry = { recent: [] };
    const encoded = localStorage.getItem(HUB_STORAGE_KEYS.AUTO_SUGGEST);
    if (encoded) {
      const decoded = base64ToUnicode(encoded);
      storageEntry = JSON.parse(decoded);
    }
    return storageEntry.recent;
  }
  catch (_a) {
    throw new Error('Error getting recent matches from local storage');
  }
}

/**
 * Searches local storage for matches against a term.
 * Matches are case-insensitive and trimmed of extra whitespace.
 *
 * @param term term to match against
 * @param num max number of matches to return
 * @returns an array of corresponding match objects
 */
function hubSuggestRecents(term, num = 10) {
  const recents = getAllRecentTermsMatches();
  return recents
    .filter(match => match.label.toLowerCase().includes(term.toLowerCase().trim()))
    .slice(0, num);
}

/**
 * TODO: move to hub.js
 * Searches the `hubSearch()` subsystem for matches against a term.
 *
 * @param term term to match against
 * @param searchQuery scope query for limiting search results, does not include the term
 * @param options search options
 * @returns an array of corresponding match objects
 */
async function hubSuggestSearchResults(term, searchQuery, options) {
  let matches = [];
  const { searchField, resultField } = getSuggestFieldInfo(searchQuery.targetEntity);
  if (!term) {
    throw new HubError('hubAutoSuggestResult', 'term is required');
  }
  if (!searchField) {
    throw new HubError('hubAutoSuggestResult', `suggestField is not implemented for entity type ${searchQuery.targetEntity}`);
  }
  if (!searchQuery) {
    throw new HubError('hubAutoSuggestResult', 'searchQuery is required');
  }
  const queryWithSuggest = cloneObject(searchQuery);
  queryWithSuggest.filters.push({
    predicates: [{
        [searchField]: term
      }]
  });
  const { results } = await hubSearch(queryWithSuggest, options);
  matches = results.map((result) => {
    const fieldName = resultField || searchField;
    const label = result[fieldName];
    if (!label) {
      throw new Error(`suggestField "${fieldName}" is not present in search result ${result.id}`);
    }
    return {
      source: AutoSuggestMatchSource.SEARCH,
      label,
      icon: getSearchResultTypeIcon(result.type),
      description: result.type,
      result,
    };
  });
  return matches;
}
/**
 * Retrieves field information for suggestion requests based on the entity type.
 * TODO: Consider adding support for multiple fields
 *
 * @param entityType The type of the entity.
 * @returns The field information.
 */
function getSuggestFieldInfo(entityType) {
  let result = { searchField: null };
  switch (entityType) {
    case 'item':
      result = {
        searchField: 'title',
        resultField: 'name',
      };
      break;
    // TODO: Add fields for other entity types
  }
  return result;
}

/**
 * Fetches auto suggest matches based on the provided options.
 * @param opts - The options for fetching auto suggest matches.
 * @returns A promise that resolves to an object containing the auto suggest matches.
 * @throws {HubError} If the term is not provided.
 */
async function fetchAutoSuggestMatches(opts) {
  var _a, _b;
  // TODO: Consider adding a maxMatches option
  const MAX_MATCHES = 5;
  if (!opts.term) {
    throw new HubError('fetchAutoSuggestMatches', 'term is required');
  }
  const result = getEmptyAutoSuggestResponse();
  if (opts.matchRecent) {
    result.recent = hubSuggestRecents(opts.term, MAX_MATCHES);
  }
  if (opts.matchSearch) {
    const searchOptions = {
      requestOptions: (_a = opts.context) === null || _a === void 0 ? void 0 : _a.hubRequestOptions,
      num: MAX_MATCHES,
    };
    // TODO: we can remove this once the hubSearch subsystem has been updated
    // to use the platform-level OGC API instead of the site-level OGC API
    if (opts.searchApi === 'hub') {
      searchOptions.site = (_b = opts.context) === null || _b === void 0 ? void 0 : _b.hubUrl;
    }
    result.search = await hubSuggestSearchResults(opts.term, opts.query, searchOptions);
  }
  if (opts.matchLocation) {
    // TODO: Implement `hubSuggestLocations()` as needed. Make sure MAX_MATCHES is respected
    throw new HubError('fetchAutoSuggestMatches', 'Location matches are not yet implemented');
  }
  return result;
}

/**
 * Removes a recent match from local storage.
 *
 * @param match match to remove
 */
function removeRecentMatch(match) {
  try {
    const recentMatches = getAllRecentTermsMatches();
    const updatedRecents = recentMatches.filter((recentMatch) => recentMatch.label !== match.label);
    const updatedEntry = { recent: updatedRecents };
    const encoded = unicodeToBase64(JSON.stringify(updatedEntry));
    localStorage.setItem(HUB_STORAGE_KEYS.AUTO_SUGGEST, encoded);
  }
  catch (_a) {
    console.error('Error removing recent match from local storage');
  }
}

/**
 * Saves a recent match to local storage (if it doesn't already exist).
 * NOTE: Label checking is case insensitive.
 * @param match match to save
 */
function saveRecentMatch(match) {
  try {
    const recentMatches = getAllRecentTermsMatches();
    const isNewMatch = !recentMatches.some((recent) => recent.label.toLowerCase() === match.label.toLowerCase());
    if (isNewMatch) {
      recentMatches.unshift(match);
      const updatedEntry = { recent: recentMatches };
      const encoded = unicodeToBase64(JSON.stringify(updatedEntry));
      localStorage.setItem(HUB_STORAGE_KEYS.AUTO_SUGGEST, encoded);
    }
  }
  catch (_a) {
    console.error('Error saving recent match to local storage');
  }
}

const arcgisHubAutoSuggestCss = ":host{display:block}.container{position:relative}.matches-dropdown{position:absolute;left:0px;right:0px;z-index:50;margin-top:0.5rem;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-input);background-color:var(--calcite-color-foreground-1);box-shadow:0px 8px 16px 0px rgba(0,0,0,0.2)}.matches-section{padding:0.5rem}.matches-section:not(:last-of-type){border-bottom:1px solid #ECECEC}.section-header{line-height:1.5rem;font-style:italic;font-size:var(--calcite-font-size--1);color:var(--calcite-color-border-input)}arcgis-hub-auto-suggest-match:not(:last-of-type){margin-bottom:0.5rem}";

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const ArcgisHubAutoSuggest = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.inputChangeEvent = createEvent(this, "arcgisHubAutoSuggestInputChange", 7);
    this.matchSelectedEvent = createEvent(this, "arcgisHubAutoSuggestMatchSelected", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    /**
     * The minimum number of characters that must be entered into the input before searching
     * actually begins. If this threshold is not met, the component will display the N most
     * recently searched terms instead (see `numDefaultRecentMatches)
     */
    this._minTermLength = 3;
    /**
     * The number of recent terms to display when the input character count is below the `minTermLength` threshold.
     */
    this._numDefaultRecentMatches = 3;
    this.term = '';
    this.searchApi = 'portal';
    this.query = undefined;
    this.matchRecent = false;
    this.matchSearch = false;
    this.matchLocation = false;
    this.clearButton = false;
    this.searchButton = false;
    this.showSearchIcon = false;
    this.disableTelemetry = false;
    this.placeholder = undefined;
    this.scale = 'l';
    this.readOnly = false;
    this.lastResponse = undefined;
    bind(this, 'setInputElement', 'refreshMatches', 'clearMatches', 'handleInputFocused', 'handleInputKeyDown', 'handleInputTyped', 'handleInputCommitted', 'handleMatchKeyDown', 'handleMatchSelected', 'handleRecentMatchRemoved', 'handleMatchTabOut');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.lastResponse = getEmptyAutoSuggestResponse();
    // prevent xss attack vector issue #12121
    if (this.term) {
      this.term = stripHtml(this.term);
    }
  }
  ////////////////////////
  // Click Outside Logic
  ////////////////////////
  // This is very O_o, but it's the only workaround I've found that works with nested shadow doms:
  //
  // - Add an event listener that closes the dropdown when the document receives a click event
  // - Prevent click events _within_ this component from bubbling up to the document
  //
  // NOTE: Nested shadow doms wreak havoc on event.target, making it difficult to detect where a
  // click event originated  (See: https://stackoverflow.com/questions/49678404/event-target-is-null-when-using-shadow-dom).
  // This is why we can't use a more straightforward approach like `node.contains(event.target)`
  // (See: https://stackoverflow.com/questions/14188654/detect-click-outside-element-vanilla-javascript#answer-28432139).
  // eslint-disable-next-line @stencil/prefer-vdom-listener
  preventClickPropagation(event) {
    event.stopPropagation();
  }
  connectedCallback() {
    document.addEventListener('click', this.clearMatches);
  }
  disconnectedCallback() {
    document.removeEventListener('click', this.clearMatches);
  }
  ///////////////////////////
  // End Click Outside Logic
  ///////////////////////////
  get shouldShowRecentMatches() {
    return this.matchRecent && !!this.lastResponse.recent.length;
  }
  get shouldShowSearchMatches() {
    return this.matchSearch && !!this.lastResponse.search.length;
  }
  get shouldShowLocationMatches() {
    return this.matchLocation && !!this.lastResponse.location.length;
  }
  get shouldShowDropdown() {
    return this.shouldShowRecentMatches || this.shouldShowSearchMatches || this.shouldShowLocationMatches;
  }
  /**
   * Returns the name of the icon to display in the input
   */
  get searchIcon() {
    return this.showSearchIcon ? 'search' : null;
  }
  /**
   * Returns the placeholder text to display in the input
   */
  get _placeholder() {
    return this.placeholder || this.intl.t('search');
  }
  /**
   * This handles when consumers programmatically change the `term` prop.
   */
  handleTermInputChanged(termInput) {
    // Note from Caleb: by the time this fires, this.term === termInput
    // so the if statement is never hit. When we refactor for #12125, we should
    // likely be able to remove this entirely
    if (termInput !== this.term) {
      // avoid xss attack vector issue #12121
      this.term = stripHtml(termInput);
      this.refreshMatches();
    }
  }
  /**
   * Set focus on the input element programmatically
   */
  async setFocus() {
    var _a;
    (_a = this._inputElement) === null || _a === void 0 ? void 0 : _a.setFocus();
  }
  setInputElement(el) {
    this._inputElement = el;
  }
  /**
   * Debounced wrapper for `this._refreshMatches`. This function should always be called in lieu of
   * `this._refreshMatches` to ensure that matches are not refreshed too frequently.
   *
   * NOTE: Due to accessibility / product requirements, we can't add a `Watch('term')` decorator
   * since we need to be able to update the term without triggering a search (e.g., when a user
   * selects a match). This function _must_ be manually called whenever matches need to be refreshed.
   */
  refreshMatches() {
    this._refreshMatches();
  }
  /**
   * Executes a search for matches based on the current value of the input.
   *
   * NOTE: _Do not_ decorate this function with `@Debounce` and _do not_ call this function
   * directly outside of a test. We had to separate the debounce from the actual logic as our
   * testing framework doesn't play nicely with debounced async functions.
   */
  async _refreshMatches() {
    if ((this.term || '').length < this._minTermLength) {
      // Minimum term length not met, so display recent search terms (if enabled)
      const newResponse = getEmptyAutoSuggestResponse();
      if (this.matchRecent) {
        newResponse.recent = getAllRecentTermsMatches().slice(0, this._numDefaultRecentMatches);
      }
      this.lastResponse = newResponse;
    }
    else {
      // avoid xss attack vector issue #12121
      this.term = stripHtml(this.term);
      this.lastResponse = await fetchAutoSuggestMatches({
        term: this.term,
        searchApi: this.searchApi,
        query: this.query,
        matchRecent: this.matchRecent,
        matchSearch: this.matchSearch,
        matchLocation: this.matchLocation,
        context: getGlobalContext(),
      });
    }
  }
  /**
   * Clears all matches from the dropdown and closes the dropdown
   */
  clearMatches() {
    this.lastResponse = getEmptyAutoSuggestResponse();
  }
  /**
   * Product requirements for when the input is focused:
   * - If the dropdown is closed, open the dropdown and refresh matches
   * - If the dropdown is open, do nothing and assume results are up to date
   */
  handleInputFocused() {
    !this.shouldShowDropdown && this.refreshMatches();
  }
  /**
   * Handles keyboard interaction and navigation on the input element
   */
  handleInputKeyDown(event) {
    // prevent xss attack vector issue #12121
    // this.term = stripHtml(this.term);
    switch (event.key) {
      case 'Enter':
        // Commit the input value when the user presses 'Enter'
        // NOTE: We can't use the input's onCalciteInputChange event because it fires
        // on both 'Enter' and 'Tab' keydown events, but we only care about 'Enter'.
        this.handleInputCommitted();
        break;
      case 'ArrowDown':
        // If the dropdown is open, focus the first match
        if (this.shouldShowDropdown) {
          event.preventDefault();
          const firstMatch = this.element.shadowRoot.querySelector('arcgis-hub-auto-suggest-match');
          firstMatch === null || firstMatch === void 0 ? void 0 : firstMatch.setFocus();
        }
        break;
      case 'Escape':
        // calcite-input _erases_ the value of the input when the escape key is pressed,
        // which is not the behavior we want. This prevents that from happening.
        event.preventDefault();
    }
  }
  /**
   * Records the current value of the input whenever the user changes it (via type, paste, etc.)
   * and refreshes matches accordingly. This is _not_ propagated to the parent component.
   *
   * Note: this does not fire when `this.term` is updated programmatically
   */
  handleInputTyped(event) {
    // prevent xss attack vector issue #12121
    this.term = stripHtml(event.target.value);
    this.refreshMatches();
  }
  /**
   * Handles when the user commits the input value by pressing 'Enter' or clicking the search button,
   * indicating that they would like to execute a search. This is propagated to the parent component.
   *
   * If the `matchRecent` prop is true, this will save the current value of the input as a recent term.
   */
  handleInputCommitted() {
    var _a, _b;
    // avoid xss attack vector issue #12121
    // possibly redundant, but this ensures that the term is stripped of html before being used in any way
    this.term = stripHtml(this.term);
    if (this.matchRecent && ((_a = this.term) === null || _a === void 0 ? void 0 : _a.trim())) {
      const newMatch = {
        label: this.term.trim(),
        source: AutoSuggestMatchSource.RECENT,
        icon: 'recent',
      };
      saveRecentMatch(newMatch);
    }
    // Send telemetry for the search
    this.maybeSendTelemetry(Object.assign(Object.assign({}, dist.dictionary
      .category.interaction
      .action.search
      .label.query), { search: (_b = this.term) === null || _b === void 0 ? void 0 : _b.trim() }));
    this.inputChangeEvent.emit(this.term);
    this.clearMatches();
  }
  /**
   * Handles keyboard interaction and navigation on match elements.
   *
   * NOTE: "Tab" events are special snowflakes that must be handled separately.
   * See `handleMatchTabOut` for more info.
   */
  async handleMatchKeyDown(e) {
    const { event: keyboardEvent, match } = e.detail;
    // NOTE, we need to calculate the current index across all match types, not just the current match type,
    const matchElements = Array.from(this.element.shadowRoot.querySelectorAll('arcgis-hub-auto-suggest-match'));
    const currentIndex = matchElements.findIndex((el) => el === e.target);
    switch (keyboardEvent.key) {
      // Navigate to the next match if available, otherwise focus the input
      case 'ArrowDown': {
        keyboardEvent.preventDefault();
        const nextIndex = currentIndex + 1;
        if (nextIndex < matchElements.length) {
          const nextMatch = matchElements[nextIndex];
          nextMatch.setFocus();
        }
        else {
          this._inputElement.setFocus();
        }
        break;
      }
      // Navigate to the previous match if available, otherwise focus the input
      case 'ArrowUp': {
        keyboardEvent.preventDefault();
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
          const prevMatch = matchElements[prevIndex];
          prevMatch === null || prevMatch === void 0 ? void 0 : prevMatch.setFocus();
        }
        else {
          this._inputElement.setFocus();
        }
        break;
      }
      // Set the match as the current value of the input, but _don't_ commit the input
      case ' ': {
        keyboardEvent.preventDefault();
        this.term = match.label;
        await this._inputElement.setFocus();
        this.clearMatches();
        break;
      }
      // Select the match and notify the consumer
      case 'Enter': {
        keyboardEvent.preventDefault();
        this.selectMatch(match);
        break;
      }
      // Close the dropdown and focus the input
      case 'Escape': {
        keyboardEvent.preventDefault();
        await this._inputElement.setFocus();
        this.clearMatches();
        break;
      }
    }
  }
  /**
   * Wrapper for handling event propagation from match elements
   */
  handleMatchSelected(event) {
    event.preventDefault();
    const match = event.detail;
    this.selectMatch(match);
  }
  /**
   * Handles when a user selects a match from the dropdown. The match
   * is propagated to the parent component and the dropdown is closed.
   *
   * @param match match to be emitted to consumer
   */
  selectMatch(match) {
    const telemetryBaseObject = match.source === AutoSuggestMatchSource.RECENT
      ? dist.dictionary.category.interaction.action.search.label.recent
      : dist.dictionary.category.interaction.action.search.label.suggest;
    this.maybeSendTelemetry(Object.assign(Object.assign({}, telemetryBaseObject), { details: match.label, search: this.term, position: this.lastResponse[match.source].findIndex((m) => m === match), count: this.lastResponse[match.source].length }));
    this.matchSelectedEvent.emit(match);
    // prevent xss attack vector issue #12121
    this.term = stripHtml(match.label);
    this.clearMatches();
  }
  /**
   * Handles when a user removes a recent match from the dropdown.
   */
  handleRecentMatchRemoved(event) {
    var _a;
    event.preventDefault();
    const match = event.detail;
    // Remove the match from local storage
    removeRecentMatch(match);
    const updatedResponse = cloneObject(this.lastResponse);
    updatedResponse.recent = ((_a = this.term) === null || _a === void 0 ? void 0 : _a.length) >= this._minTermLength
      // Term length is above threshold, so filter out the removed match
      ? updatedResponse.recent.filter((recent) => recent.label !== match.label)
      // Term length is below threshold, so display the default number of recent matches
      : getAllRecentTermsMatches().slice(0, this._numDefaultRecentMatches);
    this.lastResponse = updatedResponse;
  }
  /**
   * Handles forward tabs out of a match element.
   *
   * If the match is the last match in the dropdown, we let the browser handle the tab event
   * (i.e., focus the next tabbable element in the DOM) and close the dropdown.
   *
   * We can't do this in `handleMatchKeyDown` because recent match elements have mulitple tabbable
   * elements within them (i.e., the 'remove button'), so the component has to notify us via an event.
   */
  handleMatchTabOut(e) {
    const matchElements = Array.from(this.element.shadowRoot.querySelectorAll('arcgis-hub-auto-suggest-match'));
    const nextIndex = matchElements.findIndex((el) => el === e.target) + 1;
    if (nextIndex >= matchElements.length) {
      // I know this is O_o, but if we don't wait until the next tick _before_ we close the
      // dropdown, the browser's groove gets thrown off and it doesn't focus the next element
      setTimeout(this.clearMatches, 0);
    }
  }
  /**
   * Wrapper for emiting telemetry
   */
  maybeSendTelemetry(data) {
    if (!this.disableTelemetry) {
      this.hubTelemetry.emit(data);
    }
  }
  renderMatchesSection(matchSource) {
    return h("div", { class: "matches-section" }, h("div", { class: "section-header" }, this.intl.t(`sections.${matchSource}`)), this.lastResponse[matchSource].map((match) => {
      return h("arcgis-hub-auto-suggest-match", { key: match.label, match: match, onMatchKeyDown: this.handleMatchKeyDown, onMatchSelected: this.handleMatchSelected, onMatchTabOut: this.handleMatchTabOut, onRecentMatchRemoved: this.handleRecentMatchRemoved, term: this.term });
    }));
  }
  render() {
    return (h(Host, { "data-element": "auto-suggest" }, h("div", { class: "container" }, h("calcite-input", { clearable: this.clearButton, icon: this.searchIcon, label: this._placeholder, onCalciteInputInput: this.handleInputTyped, onFocus: this.handleInputFocused, onKeyDown: this.handleInputKeyDown, placeholder: this._placeholder, readOnly: this.readOnly, ref: this.setInputElement, scale: this.scale, value: this.term }, this.searchButton &&
      h("calcite-button", { onClick: this.handleInputCommitted, scale: this.scale, slot: "action" }, this.intl.t('search'))), this.shouldShowDropdown &&
      h("div", { class: "matches-dropdown" }, this.shouldShowRecentMatches && this.renderMatchesSection(AutoSuggestMatchSource.RECENT), this.shouldShowSearchMatches && this.renderMatchesSection(AutoSuggestMatchSource.SEARCH), this.shouldShowLocationMatches && this.renderMatchesSection(AutoSuggestMatchSource.LOCATION)))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "term": ["handleTermInputChanged"]
  }; }
};
__decorate$3([
  DebounceDecoratorFactory({ timeout: 100 })
], ArcgisHubAutoSuggest.prototype, "refreshMatches", null);
ArcgisHubAutoSuggest.style = arcgisHubAutoSuggestCss;

/**
 * This function adds highlighting to a label string based on a term.
 * All segments of the label that DO NOT contain the term will be bolded.
 *
 * NOTE: term matching is case-insensitive.
 *
 * e.g. getHighlightedLabel('Hello World', 'hello') => 'Hello<b> World</b>'
 *
 * @param label label to be highlighted
 * @param term term to match against
 * @returns a rich text label string
 */
function getHighlightedLabel(label, term) {
  let result = label;
  if (term) {
    const lowerCaseLabel = label.toLowerCase();
    const lowerCaseTerm = term.toLowerCase();
    // Get the indices of all the term matches within the label
    const termIndices = [];
    let index = lowerCaseLabel.indexOf(lowerCaseTerm);
    while (index !== -1) {
      termIndices.push(index);
      index = lowerCaseLabel.indexOf(lowerCaseTerm, index + 1);
    }
    // Separate the label into term and non-term segments
    const segments = [];
    let startIndex = 0;
    let termIndicesIndex = 0;
    while (startIndex < label.length) {
      // There are still term matches left in the label
      if (termIndicesIndex < termIndices.length) {
        const termIndex = termIndices[termIndicesIndex];
        // Create term segment
        if (startIndex === termIndex) {
          const value = label.slice(startIndex, startIndex + term.length);
          segments.push({ type: 'term', value });
          startIndex += term.length;
          termIndicesIndex++;
        }
        // Create non-term segment
        else {
          const value = label.slice(startIndex, termIndex);
          segments.push({ type: 'non-term', value });
          startIndex = termIndex;
        }
      }
      // No term matches are left, create non-term segment out of remaining characters
      else {
        const value = label.slice(startIndex);
        segments.push({ type: 'non-term', value });
        startIndex = label.length;
      }
    }
    // Bold non-term segments
    result = segments
      .map(({ type, value }) => type === 'non-term' ? `<b>${value}</b>` : value)
      .join('');
  }
  return result;
}

const arcgisHubAutoSuggestMatchCss = ":host{display:flex;align-items:flex-start;gap:0.5rem}.match-icon{margin-top:0.25rem}.match-info{display:flex;min-width:0px;flex:1 1 0%;flex-direction:column}.match-link{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:inherit;text-decoration:none}.match-link:hover,.match-link:focus{text-decoration:underline}.match-description{margin-top:-0.25rem;font-size:var(--calcite-font-size--1);color:var(--calcite-color-border-input)}.remove-match-button{margin-left:auto}";

const ArcgisHubAutoSuggestMatch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.matchSelected = createEvent(this, "matchSelected", 7);
    this.matchKeyDown = createEvent(this, "matchKeyDown", 7);
    this.recentMatchRemoved = createEvent(this, "recentMatchRemoved", 7);
    this.matchTabOut = createEvent(this, "matchTabOut", 7);
    this.match = undefined;
    this.term = '';
    bind(this, 'setLinkElement', 'handleMatchSelected', 'handleMatchKeyDown', 'handleRecentMatchRemoved', 'handleRemoveMatchButtonKeyDown');
  }
  setLinkElement(el) {
    this._link = el;
  }
  async setFocus() {
    this._link.focus();
  }
  get isRecentMatch() {
    return this.match.source === AutoSuggestMatchSource.RECENT;
  }
  handleMatchSelected(event) {
    // Prevent the empty link from navigating to prevent interference
    // with navigation handlers defined by the parent component
    event.preventDefault();
    this.matchSelected.emit(this.match);
  }
  handleMatchKeyDown(event) {
    this.matchKeyDown.emit({
      event,
      match: this.match
    });
    // Non-recent matches should emit a `matchTabOut` event when the user forward tabs off the link
    if (!this.isRecentMatch && event.key === 'Tab' && !event.shiftKey) {
      this.matchTabOut.emit(this.match);
    }
  }
  handleRecentMatchRemoved() {
    this.recentMatchRemoved.emit(this.match);
  }
  handleRemoveMatchButtonKeyDown(event) {
    // recent matches should emit a `matchTabOut` event when the user forward tabs off the remove button
    if (event.key === 'Tab' && !event.shiftKey) {
      this.matchTabOut.emit(this.match);
    }
  }
  render() {
    // prevent xss attack vector issue #12121
    const label = stripHtml(this.match.label);
    const highlighted = getHighlightedLabel(label, this.term);
    // TODO: Change this into a button and fix the icon alignment
    // eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid
    const link = h("a", { class: "match-link", href: '#', innerHTML: highlighted, onClick: this.handleMatchSelected, onKeyDown: this.handleMatchKeyDown, ref: this.setLinkElement });
    return (h(Host, { "data-element": "auto-suggest-match" }, h("calcite-icon", { class: "match-icon", icon: this.match.icon, scale: "s" }), h("div", { class: "match-info" }, link, this.match.description &&
      h("div", { class: "match-description" }, this.match.description)), this.isRecentMatch &&
      h("calcite-action", { class: "remove-match-button", icon: "x", onClick: this.handleRecentMatchRemoved, onKeyDown: this.handleRemoveMatchButtonKeyDown, scale: "s" })));
  }
};
ArcgisHubAutoSuggestMatch.style = arcgisHubAutoSuggestMatchCss;

const arcgisHubDateRangeFacetCss = ":host{display:block}calcite-input-date-picker{--calcite-color-text-1:#151515;--calcite-color-brand:var(--calcite-color-text-1);--calcite-color-foreground-current:var(--calcite-color-foreground-3);--calcite-color-foreground-1:#fff;--calcite-color-foreground-2:#f3f3f3;--calcite-color-foreground-3:#eaeaea;--calcite-color-text-3:#6a6a6a;--calcite-color-border-input:#757575;--calcite-color-border-2:#4a4a4a}";

const ArcgisHubDateRangeFacet = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubDateRangeFacetChange = createEvent(this, "arcgisHubDateRangeFacetChange", 7);
    this.facet = undefined;
    bind(this, 'handleDateRangeChange');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  changeDateRange(range = { from: null, to: null }) {
    this.arcgisHubDateRangeFacetChange.emit({
      key: this.facet.key,
      value: range,
    });
  }
  handleDateRangeChange(event) {
    event.preventDefault();
    const [startDate, endDate] = event.target.valueAsDate;
    const range = {
      from: startDate === null || startDate === void 0 ? void 0 : startDate.toISOString(),
      to: endDate === null || endDate === void 0 ? void 0 : endDate.toISOString()
    };
    // range has been selected
    if (isValidDateRange(range)) {
      this.changeDateRange(range);
    }
    // range has been cleared
    else if (!startDate && !endDate) {
      this.changeDateRange();
    }
    // invalid date range - display validation error
    else {
      // need to emit here otherwise the picker doesn't visually update the first selection the user makes
      this.changeDateRange(range);
    }
  }
  render() {
    const startDate = getProp(this.facet, 'value.from') || null;
    const endDate = getProp(this.facet, 'value.to') || null;
    const max = getProp(this.facet, 'max');
    const maxDate = max ? new Date(max) : null;
    const displayValidationMessage = !startDate !== !endDate; // if only one date is empty it is an invalid state
    return (h(Host, { "data-element": "date-range-facet" }, h("calcite-input-date-picker", { id: "input-date-picker", layout: "vertical", max: maxDate === null || maxDate === void 0 ? void 0 : maxDate.toISOString(), onCalciteInputDatePickerChange: this.handleDateRangeChange, range: true, scale: "m", status: displayValidationMessage ? "invalid" : "idle", value: [startDate, endDate] }), displayValidationMessage &&
      h("calcite-input-message", { "aria-labelledby": "input-date-picker", icon: "x-octagon", status: "invalid" }, this.intl.t('validationMessage'))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubDateRangeFacet.style = arcgisHubDateRangeFacetCss;

/**
 * Converts an array of facet options into a tree.
 *
 * Implementation notes:
 * 1) There MUST be an option for EVERY tree node. However, the options array doesn't have to be in parent-child order,
 * 2) All option keys MUST prefixed with a `/` (e.g. `/categories/business`)
 * 3) If the created tree's root only has one child, then the child is returned instead
 * 4) The result tree's root is meant to be an entry point for recursive processing. DO NOT display in the UI!
 *
 * @param options flat array of options to convert
 * @returns a tree representation of the options. Every node except the root is guaranteed to have an option attached.
 */
const createTree = (options) => {
  const rawTree = createRawTree(options);
  // If the tree only has 1 child, make the child the new top-level node
  const children = getChildren(rawTree);
  return children.length === 1 ? children[0] : rawTree;
};
const createRawTree = (options) => {
  const parentTree = { label: 'root', children: {}, option: null };
  options.forEach(opt => {
    const path = opt.key.slice(1).split('/');
    addTreeBranches(parentTree, opt, path);
  });
  return parentTree;
};
/**
 * Akin to mkdir -p, this function recursively traverses
 * a tree path and creates the final indicated node. Also
 * creates intermediary nodes if they do not exist.
 *
 * @param subtree the current root node
 * @param facetOption the facet option to be added to the final node
 * @param path the remaining path to the final node
 */
const addTreeBranches = (subtree, facetOption, path) => {
  if (!path.length) {
    subtree.label = facetOption.label;
    subtree.option = facetOption;
  }
  else {
    const nextPath = path.shift();
    const nextSubTree = subtree.children[nextPath] || { label: nextPath, children: {}, option: null };
    subtree.children[nextPath] = nextSubTree;
    addTreeBranches(nextSubTree, facetOption, path);
  }
};
/**
 * Returns whether a tree has any child nodes
 */
const hasChildren = (tree) => !!getChildren(tree).length;
/**
 * Returns an array of child nodes
 */
const getChildren = (tree) => Object.values(tree.children);
/**
 * Returns whether an entire tree has been selected
 */
const isTreeSelected = (tree) => {
  const isNodeSelected = tree.option.selected;
  return (hasChildren(tree))
    // Parent node, verify that node and all children are selected
    ? isNodeSelected && getChildren(tree).every(isTreeSelected)
    // Leaf node, return whether individual option is selected
    : isNodeSelected;
};
/**
 * Recursively generates the jsx for displaying an IFacetOptionTree
 *
 * @param subtree current subtree node
 * @returns a fully rendered subtree
 */
const renderSubtree = (subtree, topLevelIndex) => {
  // Set the telemetry index for the option
  subtree.option._telemetryIndex = topLevelIndex;
  return h("calcite-tree-item", { "data-key": subtree.option.key, selected: subtree.option.selected },
    h("div", { class: "option-label" }, subtree.label),
    hasChildren(subtree) &&
      h("calcite-tree", { slot: "children" }, getChildren(subtree).map(childTree => renderSubtree(childTree, topLevelIndex))));
};
const getSelectionDifference = (oldKeys, newKeys) => {
  const removedKeys = oldKeys.filter(o => !newKeys.includes(o));
  const addedKeys = newKeys.filter(n => !oldKeys.includes(n));
  let result = null;
  if (removedKeys.length) {
    result = { operation: 'removed', keys: removedKeys };
  }
  else if (addedKeys.length) {
    result = { operation: 'added', keys: addedKeys };
  }
  return result;
};
const getTreeOptionLabel = (key) => {
  const segments = key.split('/');
  return segments[segments.length - 1];
};

/**
 * Traverses each facet and calculates the filter chip models based on current facet values
 *
 * @param facets array of facets to compute chips from
 * @returns a flat array of all active chips
 */
const getActiveChips = (facets) => {
  return facets.reduce((allChips, facet) => {
    let facetChips = [];
    switch (facet.display) {
      case 'single-select':
        facetChips = getSingleSelectFacetChips(facet);
        break;
      case 'multi-select':
        facetChips = getMultiSelectFacetChips(facet);
        break;
      case 'tree':
        facetChips = getTreeFacetChips(facet);
        break;
      case 'date-range':
        facetChips = getDateRangeFacetChips(facet);
        break;
    }
    return [...allChips, ...facetChips];
  }, []);
};
/**
 * Returns a filter chip for the selected option IFF the option represents
 * an "unrecognized" (i.e., unmatched user provided) option. See the documentation
 * for IFacetOption._unrecognized for more information
 *
 * TODO: determine whether we should always show filter chips for single-select facets
 *
 * @param facet
 * @returns an array of active chips for the facet
 */
const getSingleSelectFacetChips = (facet) => {
  return facet.options
    .filter(o => o.selected && o._unrecognized)
    .map(opt => {
    return {
      key: facet.key,
      label: facet.label,
      optionKey: opt.key,
      optionLabel: opt.label
    };
  });
};
/**
 * Returns filter chips based on the facet's currently selected options
 *
 * @param facet
 * @returns an array of active chips for the facet
 */
const getMultiSelectFacetChips = (facet) => {
  return facet.options
    .filter(o => o.selected)
    .map(opt => {
    const optionLabel = removeCountLabel(opt.label);
    return {
      key: facet.key,
      label: facet.label,
      optionKey: opt.key,
      optionLabel
    };
  });
};
/**
 * Returns filtered chips for a tree facet based on selected options.
 * The following rules determine whether an option is turned into a chip:
 * - If a parent category and all its subcategories are selected, ONLY return a chip for the parent category
 * - If the subcategory represents an "unrecognized" (i.e., unmatched user provided) option, return a solo chip
 * for that subcategory (See the documentation for IFacetOption._unrecognized for more info)
 * - Else, return a chip for each selected category
 *
 * @param facet
 * @returns an array of active chips for the facet
 */
const getTreeFacetChips = (facet) => {
  const recognizedOptions = facet.options.filter(option => !option._unrecognized);
  const tree = createTree(recognizedOptions);
  // The tree root is just an entry point. We don't want to include it in chip calculations
  const normalChips = getChildren(tree).map(child => getSubtreeChips(facet, child)).flat();
  const unrecognizedUserAppliedOptions = facet.options.filter(option => option.selected && option._unrecognized);
  const unrecognizedUserAppliedChips = unrecognizedUserAppliedOptions.map(option => ({
    key: facet.key,
    label: facet.label,
    optionKey: option.key,
    optionLabel: option.label
  }));
  return [...unrecognizedUserAppliedChips, ...normalChips];
};
/**
 * Recursive helper that gets all chips for a sub tree. See `getTreeFacetChips` for an
 * explanation of the business logic
 *
 * NOTE: this helper expects that all nodes of the sub tree have a corresponding `option` attached
 *
 * @param facet
 * @param tree current subtree
 * @returns all chips for the current subtree
 */
function getSubtreeChips(facet, tree) {
  let result = [];
  tree.option.selected && result.push({
    key: facet.key,
    label: facet.label,
    optionKey: tree.option.key,
    optionLabel: removeCountLabel(tree.option.label)
  });
  if (!isTreeSelected(tree)) {
    getChildren(tree).forEach(child => {
      const childChips = getSubtreeChips(facet, child);
      result = result.concat(childChips);
    });
  }
  return result;
}
/**
 * Returns filter chips based on the date range's selected dates.
 * Returns an empty array if either `from` or `to` are undefined/null.
 *
 * @param facet
 * @returns an array of facet chips containing the date range
 */
const getDateRangeFacetChips = (facet) => {
  var _a, _b;
  if (!((_a = facet.value) === null || _a === void 0 ? void 0 : _a.from) || !((_b = facet.value) === null || _b === void 0 ? void 0 : _b.to)) {
    return [];
  }
  const localeInfo = getLocaleInfo();
  const from = new Date(facet.value.from).toLocaleDateString(localeInfo.locale);
  const to = new Date(facet.value.to).toLocaleDateString(localeInfo.locale);
  // does not include label due to it overflowing the chip
  // also, the optionLabel handles RTL and LTR in the browser by formatting the string there
  return [
    {
      key: facet.key,
      optionKey: facet.key,
      optionLabel: `${from} - ${to}`
    }
  ];
};
/**
 * Creates a copy of the facet and deselects options / values that correspond to the chip.
 * Also returns the keys of dismissed options
 *
 * @param facet
 * @param chip option to deselect
 * @returns a modified and cloned facet
 */
const dismissFacetChip = (facet, chip) => {
  let response;
  switch (facet.display) {
    case 'single-select':
      response = dismissSingleSelectChip(facet, chip);
      break;
    case 'multi-select':
      response = dismissMultiSelectChip(facet, chip);
      break;
    case 'tree':
      response = dismissTreeChip(facet, chip);
      break;
    case 'date-range':
      response = dismissDateRangeChip(facet, chip);
      break;
  }
  return response;
};
/**
 * De-selects the facet option corresponding to the provided filter chip
 * and returns the keys of dismissed options.
 *
 * NOTE: Since filter chips should only appear for single-select facets when
 * an "unrecognized" (i.e., unmatched user provided) option is selected, we don't want
 * the facet to be in an invalid "no options selected" state when the filter
 * chip is dismissed. As such, we select the first non-unrecognized option.
 *
 * @param facet
 * @param chip option to de-select
 * @returns the cloned, modified facet
 */
const dismissSingleSelectChip = (facet, chip) => {
  const updated = cloneObject(facet);
  const targetOption = updated.options.find(opt => opt.key === chip.optionKey && opt._unrecognized);
  targetOption.selected = false;
  const newlySelectedOption = updated.options.find(opt => !opt._unrecognized);
  newlySelectedOption.selected = true;
  return {
    updatedFacet: updated,
    dismissedKeys: [chip.optionKey]
  };
};
/**
 * De-selects the facet option corresponding to the provided filter chip
 * and returns the keys of dismissed options
 * @param facet
 * @param chip option to de-select
 * @returns the cloned, modified facet
 */
const dismissMultiSelectChip = (facet, chip) => {
  const updated = cloneObject(facet);
  updated.options.forEach((option) => {
    if (option.key === chip.optionKey) {
      option.selected = false;
    }
  });
  return {
    updatedFacet: updated,
    dismissedKeys: [chip.optionKey]
  };
};
/**
 * De-selects facet options corresponding to the provided filter chip and returns the keys of dismissed options
 * The following rules determine which options will be de-selected with the chip:
 * - If the chip corresponds to a "unrecognized" (i.e., unmatched user provided) option, ONLY deselect that option
 * - If the chip corresponds to a parent category AND all subcategories are selected,
 * de-select the parent category and all subcategories (NOTE: "unrecognized" subcategories remain untouched)
 * - Else if the chip corresponds to a parent category but not all subcategories are
 * selected, ONLY deselect the parent category
 * - Else deselect the subcategory
 *
 * @param facet
 * @param chip reference option for the de-selection process
 * @returns the cloned, modified facet
 */
const dismissTreeChip = (facet, chip) => {
  const updatedFacet = cloneObject(facet);
  const option = updatedFacet.options.find(opt => opt.key === chip.optionKey);
  let optionChildren = [];
  let allChildrenSelected = false;
  if (!option._unrecognized) {
    optionChildren = updatedFacet.options.filter(opt => {
      return !opt._unrecognized &&
        opt.key !== chip.optionKey &&
        opt.key.includes(chip.optionKey);
    });
    allChildrenSelected = !!optionChildren.length && optionChildren.every(child => child.selected);
  }
  const dismissedKeys = [];
  // Unselect parent option
  option.selected = false;
  dismissedKeys.push(option.key);
  // If all children were previously selected, unselect them
  if (allChildrenSelected) {
    optionChildren.forEach(child => {
      child.selected = false;
      dismissedKeys.push(child.key);
    });
  }
  return { updatedFacet, dismissedKeys };
};
/**
 * Dismisses date range chip and sets values to null.
 *
 * @param facet
 * @param chip option to de-select
 * @returns the cloned, modified facet
 */
const dismissDateRangeChip = (facet, chip) => {
  const updated = cloneObject(facet);
  updated.value.from = null;
  updated.value.to = null;
  return {
    updatedFacet: updated,
    dismissedKeys: [chip.optionKey]
  };
};
const formatDismissedKeys = (facet, keys) => {
  const formatted = isTreeFacet(facet) ? keys.map(getTreeOptionLabel) : keys;
  return formatted.join(', ');
};

const arcgisHubFacetListCss = ":host{display:block}.header-container{display:flex;flex-direction:row;align-items:center;justify-content:space-between}.header-container calcite-button{font-size:1rem}calcite-accordion{--calcite-accordion-item-content-space:.75rem 0rem}calcite-accordion-item{border-width:0px;border-top-width:1px;border-style:solid;border-color:var(--calcite-color-border-2)}@media (max-width: 1200px){calcite-accordion-item[is-map]{display:none}}calcite-chip{margin-bottom:0.5rem;max-width:100%}calcite-chip:nth-last-of-type(1){margin-bottom:1.25rem}.reset-facets-button{--calcite-font-size--1:var(--hub-gallery-font-size-large)}.additional-facet-container{--calcite-font-size--1:var(--calcite-font-size-0);}.facet-popover-content{text-align:center;font-weight:var(--calcite-font-weight-light);font-size:1rem}calcite-tooltip{max-width:13rem}.facet-popover-trigger{margin-inline-start:.375rem}";

const ArcgisHubFacetList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubFacetListChange = createEvent(this, "arcgisHubFacetListChange", 7);
    this.arcgisHubFacetListReset = createEvent(this, "arcgisHubFacetListReset", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.showChips = false;
    this.facets = [];
    this.disableTelemetry = false;
    this.resultsCount = undefined;
    bind(this, 'resetFacets', 'onChipClose');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Wrapper for emiting telemetry
   */
  maybeSendTelemetry(data) {
    if (!this.disableTelemetry) {
      this.hubTelemetry.emit(data);
    }
  }
  // TODO: Add other listeners for different types of Facets (map, dates etc)
  /**
   * Handles changes in the child facets
   * The events flow up from the child components, and this function applies
   * the changes to the facets, and updates the _chips array. Resulting changes
   * then flow back down to the Facets.
   * @param evt
   */
  onListFacetChange(evt) {
    evt.preventDefault();
    this.maybeSendTelemetry(Object.assign(Object.assign({}, dist.dictionary
      .category.interaction
      .action.search
      .label.filter), { details: evt.detail.checked
        ? `${evt.detail.key}: ${evt.detail.optionKey}`
        : `${evt.detail.key}: Removed ${evt.detail.optionKey}`, element: evt.detail.key, position: evt.detail.optionIndex }));
    // update the facets
    // find and clone the facet that we're updating...
    const facet = getListFacets(this.facets).find(f => f.key === evt.detail.key);
    // update the state of the option
    facet.options = facet.options.map((fo) => {
      if (fo.key === evt.detail.optionKey) {
        fo.selected = evt.detail.checked;
      }
      else {
        // For single-select, we must set all the other options to
        // selected: false
        if (facet.display === "single-select") {
          fo.selected = false;
        }
      }
      return fo;
    });
    this.arcgisHubFacetListChange.emit(facet);
  }
  onTreeFacetChange(evt) {
    const facet = getTreeFacets(this.facets).find(f => f.key === evt.detail.key);
    // Send Telemetry
    const { optionKeys } = evt.detail;
    const formattedOptionKeys = optionKeys.map(getTreeOptionLabel).join(', ');
    this.maybeSendTelemetry(Object.assign(Object.assign({}, dist.dictionary
      .category.interaction
      .action.search
      .label.filter), { details: evt.detail.selected
        ? `${evt.detail.key}: ${formattedOptionKeys}`
        : `${evt.detail.key}: Removed ${formattedOptionKeys}`, element: evt.detail.key, position: evt.detail.topLevelIndex }));
    // Update the state of the options
    facet.options = facet.options.map((fo) => {
      if (optionKeys.includes(fo.key)) {
        fo.selected = evt.detail.selected;
      }
      return fo;
    });
    this.arcgisHubFacetListChange.emit(facet);
  }
  onDateRangeFacetChange(event) {
    const { detail: { key, value } } = event;
    const facet = getDateRangeFacets(this.facets).find((f) => f.key === key);
    // send telemetry
    if (isValidDateRange(value)) {
      this.maybeSendTelemetry(Object.assign(Object.assign({}, dist.dictionary
        .category.interaction
        .action.search
        .label.filter), { details: dist.constants.details.DATE_UPDATED, element: facet.key }));
    }
    // update state of the option
    facet.value = value;
    this.arcgisHubFacetListChange.emit(facet);
  }
  onMapFacetChange(event) {
    const { detail: { key, value } } = event;
    const facet = getMapFacets(this.facets).find((f) => f.key === key);
    // update state of the option
    facet.value = value;
    this.arcgisHubFacetListChange.emit(facet);
  }
  /**
   * Handles the removal of a chip.
   * It resets the selected state of the corresponding facet option, and updates the
   * chips array.
   *
   * NOTE: after upgrading to calcite-components@1.0.4, the event payload stopped providing
   * ANY reference to the chip element that was dismissed. As a workaround, we attach this
   * function as a callback with pre-bound arguments.
   * @param chip
   */
  onChipClose(chip) {
    const index = this.facets.findIndex(f => f.key === chip.key);
    const { updatedFacet, dismissedKeys } = dismissFacetChip(this.facets[index], chip);
    this.maybeSendTelemetry(Object.assign(Object.assign({}, dist.dictionary
      .category.interaction
      .action.search
      .label.filter), { details: `${updatedFacet.key}: Removed ${formatDismissedKeys(updatedFacet, dismissedKeys)}`, element: dist.constants.element.CHIPS }));
    this.facets[index] = updatedFacet;
    this.arcgisHubFacetListChange.emit(updatedFacet);
  }
  /**
   * Reset the facets to the original state
   */
  resetFacets() {
    // Problem: We can't send updates state on this b/c we are not resetting
    // the facets in this component - we do that from the Gallery
    // but the Gallery does not know how to update the state on it's own
    this.arcgisHubFacetListReset.emit();
  }
  /**
   * Get the chips to display, based on the facet state
   */
  get chips() {
    return getActiveChips(this.facets);
  }
  /**
   * Render the Facets
   * @returns
   */
  renderFacets() {
    return this.facets.map(facet => {
      // Don't render the facet accordion if it's options based facet with 1 or no options
      const shouldRenderFacet = !isOptionsBasedFacet(facet) || facet.options.length > 1;
      return shouldRenderFacet
        ? h("calcite-accordion-item", { expanded: facet.state !== "closed", heading: facet.label, "is-map": isMapFacet(facet), key: facet.key }, this.renderFacetComponent(facet), this.renderFacetTooltip(facet))
        : null;
    });
  }
  renderFacetComponent(facet) {
    switch (facet.display) {
      case 'single-select':
      case 'multi-select':
        return h("arcgis-hub-facet-options", { "data-test": facet.key, facet: facet });
      case 'date-range':
        return h("arcgis-hub-date-range-facet", { "data-test": facet.key, facet: facet });
      case 'tree':
        return h("arcgis-hub-tree-facet", { "data-test": facet.key, facet: facet });
      case 'map':
        return h("arcgis-hub-map-facet", { "data-test": facet.key, facet: facet, resultsCount: this.resultsCount });
    }
  }
  renderFacetTooltip(facet) {
    const popoverToggleId = `popover-toggle-${facet.key}`;
    return facet.tooltip &&
      h("div", { slot: "actions-end" }, h("calcite-action", { appearance: "transparent", icon: "information-f", id: popoverToggleId, label: "info tooltip", scale: "s" }), h("calcite-tooltip", { label: `${facet.key} info`, overlayPositioning: "fixed", placement: "bottom-end", referenceElement: popoverToggleId }, h("span", { class: "facet-popover-content" }, facet.tooltip)));
  }
  /**
   * Render the Chips
   * @returns
   */
  renderChips() {
    return this.chips.map((chip) => {
      const label = !chip.label ? `${chip.optionLabel}` : `${chip.label}: ${chip.optionLabel}`;
      const handler = this.onChipClose.bind(this, chip);
      return h("calcite-chip", { closable: true, "data-test": label, key: chip.optionKey, messageOverrides: {
          dismissLabel: this.intl.t('dismissLabel', { label })
        }, onCalciteChipClose: handler, scale: "m", value: label }, label);
    });
  }
  /**
   * Main render
   * @returns
   */
  render() {
    // render nothing if there are no facets
    if (this.facets.length) {
      return (h(Host, null, h("div", { class: "header-container", id: "filters-header" }, h("slot", { name: "header" }), h("calcite-button", { appearance: "transparent", "aria-labelledby": "filters-header", class: "reset-facets-button", color: "blue", onClick: this.resetFacets }, this.intl.t('reset'))), this.showChips ? this.renderChips() : "", h("calcite-accordion", { appearance: "transparent", scale: 'l' }, h("div", { class: "additional-facet-container" }, h("slot", { name: "additional-facet" })), this.renderFacets())));
    }
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubFacetList.style = arcgisHubFacetListCss;

const arcgisHubFacetOptionsCss = ":host{display:block}calcite-input{--calcite-color-foreground-1:var(--hub-gallery-input-background);--calcite-color-text-1:var(--hub-gallery-input-text)}.option-search-bar{margin-bottom:0.75rem}.option{line-height:normal;overflow-wrap:anywhere;-webkit-hyphens:auto;hyphens:auto}.option-container{display:flex;gap:0.5rem}.option-container calcite-checkbox{margin-top:0.125rem}calcite-radio-button-group>calcite-label,fieldset>calcite-label{--calcite-font-size--1:var(--calcite-font-size-0)}fieldset{border:0px;padding:0px}legend{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}@media (max-width: 576px){calcite-label{padding-top:0.5rem}calcite-label{padding-bottom:0.5rem}}.more-or-less-container{width:100%;display:flex;flex-direction:row-reverse}";

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const ArcgisHubFacetOptions = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubFacetOptionsChange = createEvent(this, "arcgisHubFacetOptionsChange", 7);
    this.arcgisHubFacetMoreLessClicked = createEvent(this, "arcgisHubFacetMoreLessClicked", 7);
    /**
     * Number of facet options to show, default is 5
     */
    this.pageSize = 5;
    this.facet = undefined;
    this.showLimitedOptions = false;
    this.query = '';
    bind(this, 'handleCalciteRadioButtonChangeEvent', 'handleCalciteCheckboxChangeEvent', 'toggleMoreOrLessButton', 'handleCalciteInputInput', 'setPageSeparator');
  }
  async componentWillLoad() {
    // Reset page size if it's passed in
    if (this.facet.optionLimit) {
      this.pageSize = this.facet.optionLimit;
    }
    this.intl = await intlManager.loadIntlForComponent(this.element);
    // If there is a default page size and the number of facet options is more than that
    // we display the limited amount of options and the Show More button
    if (this.facet.options.length > this.pageSize) {
      this.showLimitedOptions = true;
    }
  }
  updateQuery() {
    this.query = this._query;
  }
  handleCalciteInputInput(event) {
    this._query = event.target.value;
    this.updateQuery();
  }
  /**
   * Event that's fired when a radio button is clicked(single mode)
   * Not using @Listen because the event's target is this component NOT
   * the calcite-radio. We are unclear if this is an issue with nested
   * shadowdom or something calcite specific
   */
  handleCalciteRadioButtonChangeEvent(evt) {
    this.onFacetChanged(evt.target.id, evt.target.checked);
  }
  /**
   * Event that's fired when a checkbox is checked/unchecked(multi mode)
   * Not using @Listen because the event's target is this component NOT
   * the calcite-checkbox. We are unclear if this is an issue with nested
   * shadowdom or something calcite specific
   */
  handleCalciteCheckboxChangeEvent(checkboxIndex, evt) {
    this.onFacetChanged(evt.target.id, evt.target.checked, checkboxIndex);
  }
  /**
   * Emit the arcgisHubFacetOptionsChange event
   * @param key
   * @param checked
   */
  onFacetChanged(key, checked, optionIndex) {
    this.arcgisHubFacetOptionsChange.emit({
      key: this.facet.key,
      optionKey: key,
      checked,
      optionIndex
    });
  }
  /**
   * filtered multi-select options based on user query
   */
  get filteredOptions() {
    return this.facet.options.filter(
    // Prevent "unrecognized" options from rendering, as they are only displayed as a filter chip.
    // See the documentation for IFacetOption._unrecognized for more info.
    ({ _unrecognized, label }) => !_unrecognized && label.toLowerCase().includes(this.query.toLowerCase()));
  }
  /**
   * ordered multi-select options based on facet setting
   */
  get orderedOptions() {
    return this.facet.orderBy === 'label'
      ? this.filteredOptions.sort((a, b) => a.label.localeCompare(b.label))
      : this.filteredOptions.sort((a, b) => { var _a, _b; return ((_a = b.count) !== null && _a !== void 0 ? _a : 0) - ((_b = a.count) !== null && _b !== void 0 ? _b : 0); });
  }
  setPageSeparator(el) {
    this.pageSeparator = el;
  }
  /**
   * Render the facet with checkboxes.
   */
  renderCheckboxes() {
    const allOptions = this.orderedOptions.map((option, i) => {
      // key needs to include the count or the facetOption won't be updated when count changes
      const key = option.count ? `${option.key}:${option.count}` : option.key;
      const checkboxChangeHandler = this.handleCalciteCheckboxChangeEvent.bind(this, i);
      return h("calcite-label", { key: key }, h("div", { class: "option-container" }, h("calcite-checkbox", { checked: option.selected, id: option.key, name: option.label, onCalciteCheckboxChange: checkboxChangeHandler }), h("span", { class: "option" }, option.label)));
    });
    // This may look odd, but it's needed for accessibility requirements.
    // When a user clicks the more button, the user's next tab press should
    // navigate to the first checkbox of the NEWLY loaded page.
    //
    // Focusing on an invisible span _in between_ the two pages is the easiest
    // way to achieve the desired behavior since the span is always present
    // and doesn't show a visual cue when we programmatically focus it.
    const firstOptionsPage = allOptions.slice(0, this.pageSize);
    const remainingOptions = this.showLimitedOptions ? [] : allOptions.slice(this.pageSize);
    const result = [
      ...firstOptionsPage,
      h("span", { key: "page-separator", ref: this.setPageSeparator, tabIndex: -1 }),
      ...remainingOptions
    ];
    return result;
  }
  toggleMoreOrLessButton() {
    // Emit event to notify consumers
    this.arcgisHubFacetMoreLessClicked.emit({
      facet: this.facet,
      isMore: this.showLimitedOptions
    });
    this.showLimitedOptions = !this.showLimitedOptions;
    this.renderCheckboxes();
    // By focusing on the separator span now, the user's next tab press
    // will navigate to the first checkbox of the next option page
    this.pageSeparator.focus();
  }
  /**
   * Number of options to display after the default page size.
   * Base off filtered options in case a query has been applied.
   */
  get optionsLeftToDisplay() {
    return this.filteredOptions.length - this.pageSize;
  }
  /**
   * Icon next to the "Show More" or "Show Less" button
   */
  get moreOrLessButtonIconEnd() {
    return this.showLimitedOptions ? "chevron-down" : "chevron-up";
  }
  /**
   * Show {num} More or Show Less label
   */
  get moreOrLessButtonLabel() {
    return this.showLimitedOptions
      ? this.intl.t('showMore', { num: this.optionsLeftToDisplay })
      : this.intl.t('showLess');
  }
  get showNoMatchesNotice() {
    return this.facet.display === 'multi-select' && !this.filteredOptions.length;
  }
  /**
   * Only show More/Less button for checkboxes AND when the filtered options are more than page size
   * when page size is not defined or the filtered options are less than page size
   * we don't want to show any buttons
   */
  renderMoreOrLessButton() {
    if (this.facet.display === 'multi-select' && this.filteredOptions.length > this.pageSize) {
      return (h("div", { class: "more-or-less-container" }, h("calcite-button", { appearance: "transparent", color: "blue", "icon-end": this.moreOrLessButtonIconEnd, label: this.intl.t('moreOrLessButtonLabel', {
          moreOrLess: this.moreOrLessButtonLabel,
          label: this.facet.label
        }), onClick: this.toggleMoreOrLessButton }, this.moreOrLessButtonLabel)));
    }
  }
  /**
   * Render the facet with radio buttons
   */
  renderRadioButtons() {
    // Prevent "unrecognized" options from rendering, as they are only displayed as a filter chip.
    // See the documentation for IFacetOption._unrecognized for more info.
    return this.facet.options.filter(option => !option._unrecognized).map(option => {
      return h("calcite-label", { key: option.key, layout: "inline" }, h("calcite-radio-button", { checked: option.selected, id: option.key, name: option.label, onCalciteRadioButtonChange: this.handleCalciteRadioButtonChangeEvent, value: option.key }), h("span", { class: "option" }, option.label));
    });
  }
  renderNoMatchesNotice() {
    return this.showNoMatchesNotice &&
      h("calcite-notice", { id: "no-match-notice", open: true, width: "full" }, h("div", { slot: "message" }, this.intl.t('noMatchesNotice')));
  }
  /**
   * Main Render
   */
  render() {
    const isMultiSelect = this.facet.display === 'multi-select';
    const showFilterInput = isMultiSelect && this.facet.options.length > 5;
    // Collaboration has an issue to hide the search bar when facet.options is less than 5, but
    // not when a filter is applied. In other words, my quick fix was not comprehensive enough.
    return (h(Host, { "data-element": "facet-options" }, showFilterInput &&
      h("calcite-input", { "aria-label": this.intl.t('inputAriaLabel', { label: this.facet.label }), "aria-labelledby": this.showNoMatchesNotice ? "no-match-notice" : null, class: "option-search-bar", clearable: true, onCalciteInputInput: this.handleCalciteInputInput, placeholder: this.intl.t('inputPlaceholder') }), isMultiSelect ?
      h("fieldset", { "data-test": "options-container" }, h("legend", null, this.facet.label), this.renderCheckboxes()) :
      h("calcite-radio-button-group", { "data-test": "options-container", layout: "vertical", name: "facet-group" }, this.renderRadioButtons()), this.renderMoreOrLessButton(), h("div", { "aria-live": "polite", role: "status" }, this.renderNoMatchesNotice())));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
__decorate$2([
  DebounceDecoratorFactory({ timeout: 750 })
], ArcgisHubFacetOptions.prototype, "updateQuery", null);
ArcgisHubFacetOptions.style = arcgisHubFacetOptionsCss;

/** Defines an enum SortDirection */
var SortDirection;
(function (SortDirection) {
  SortDirection["asc"] = "asc";
  SortDirection["desc"] = "desc";
})(SortDirection || (SortDirection = {}));

const arcgisHubGalleryCss = ":host{display:flex;flex-direction:column;gap:1.25rem;--hub-gallery-input-background:#fff;--hub-gallery-input-text:#151515;--hub-gallery-font-size-large:var(--calcite-font-size-1);--hub-gallery-bulk-actions-bottom:4rem}:host(:not([show-results])) .gallery-main,:host(:not([show-results])) .gallery-list{height:100%}h1,h2,h3,h4,h5,h6{font-family:var(--hub-heading-family, inherit)}arcgis-hub-facet-list{flex:0 0 25%;max-width:25%}.gallery-main{display:flex;flex-direction:row;align-items:flex-start;column-gap:2.5rem}.gallery-list{display:flex;width:100%;flex-direction:column;gap:1.25rem;padding-bottom:2px;}:host([layout=\"table\"]) .gallery-list{overflow-x:scroll}.gallery-list-footer{display:flex;justify-content:space-between}.gallery-list-header{display:flex;align-items:center;justify-content:space-between}.results-count-container{grid-area:resultsCount}.list-header-controls-container{display:flex;flex-wrap:wrap;align-items:center;justify-content:flex-end;gap:0.5rem;grid-area:sortAndLayout}.bulk-actions{position:fixed;z-index:10}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -10px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}.bulk-actions{animation:in-down 300ms ease-in-out forwards;align-self:center;--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);bottom:var(--hub-gallery-bulk-actions-bottom)}.bulk-actions.sticky{position:sticky;top:1rem;bottom:auto}.bulk-actions .selection-count{display:flex;align-self:center;padding-left:1rem;padding-right:1rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}.bulk-actions calcite-dropdown-item>div{display:flex;flex-direction:column;gap:0.25rem}.bulk-actions calcite-dropdown-item>div div:first-child{font-weight:var(--calcite-font-weight-medium)}.layout-option{height:100%}.actions-popover-container{margin-inline-start:1rem}.actions-popover-content{padding:0.5rem}.gallery-list>.results-count{margin-top:1.25rem}.no-results-action-container{display:grid;justify-content:center}.search-bar{margin-bottom:0px}.search-sort{margin-bottom:0px}.results-count{display:flex;align-items:center;font-size:var(--calcite-font-size-1);line-height:1.5rem;font-weight:var(--calcite-font-weight-normal);margin-block-start:0.83em;margin-block-end:0.83em;margin-inline-start:0px;margin-inline-end:0px}[slot=\"header\"]{font-size:var(--calcite-font-size-1);line-height:1.5rem;font-weight:var(--calcite-font-weight-normal)}.loading-link-button{position:relative}.loading-link-button:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0}@keyframes shimmer{0%{background-size:200% 100%;background-position:100% 0}100%{background-size:200% 100%;background-position:-100% 0}}.loading-link-button:after{animation:shimmer 2s cubic-bezier(0.4, 0, 0.2, 0.8) infinite;background-image:linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, 0) 100%);background-color:var(--calcite-color-foreground-3)}.loading-link-button{margin-top:1rem;height:2rem}.result-top{position:absolute}.layout-switcher-container{display:flex;align-items:center}.result-bottom{position:absolute}";

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const DEFAULT_GALLERY_SELECTION = {
  channel: [],
  item: [],
  group: [],
  user: [],
  portalUser: [],
  communityUser: [],
  groupMember: [],
  event: [],
  eventAttendee: []
};
const ArcgisHubGallery = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.arcgisHubGallerySelect = createEvent(this, "arcgisHubGallerySelect", 7);
    this.arcgisHubGalleryQueryChange = createEvent(this, "arcgisHubGalleryQueryChange", 7);
    this.arcgisHubGalleryStateChange = createEvent(this, "arcgisHubGalleryStateChange", 7);
    this.arcgisHubGalleryResultsChange = createEvent(this, "arcgisHubGalleryResultsChange", 7);
    this.arcgisHubGalleryAction = createEvent(this, "arcgisHubGalleryAction", 7);
    this.arcgisHubContentGalleryFacetModalClose = createEvent(this, "arcgisHubContentGalleryFacetModalClose", 7);
    this.arcgisHubGalleryBulkAction = createEvent(this, "arcgisHubGalleryBulkAction", 7);
    this.arcgisHubGalleryExecutedQuerySize = createEvent(this, "arcgisHubGalleryExecutedQuerySize", 7);
    /**
     * renders each bulk action
     * @param {IInternalComponentAction} action
     * @returns bulk action along with the tooltip associated with the action
     */
    this.renderBulkAction = (action) => {
      var _a;
      const actionArgs = {
        active: action.loading,
        icon: action.icon,
        key: action.key,
        loading: action.loading,
        text: action.text,
        textEnabled: true,
        disabled: action.disabled
      };
      // handles bulk action
      let bulkAction;
      const id = `bulk-action-${action.key}`;
      if (action.name && !action.children) {
        bulkAction = h("calcite-action", Object.assign({ id: id, onClick: action.handler }, actionArgs));
      }
      else if (action.children) {
        // if it's got children we will render it as a dropdown
        bulkAction =
          h("calcite-dropdown", { "width-scale": "m" }, h("calcite-action", Object.assign({}, actionArgs, { id: id, slot: "trigger" })), h("calcite-dropdown-group", { selectionMode: "none" }, action.children.map(child => {
            return (h("calcite-dropdown-item", { key: child.key, onCalciteDropdownItemSelect: child.handler }, h("div", null, h("div", null, child.text), h("div", null, child.helperText))));
          })));
      }
      // returns bulk action with tooltip association
      return (h(Fragment, null, bulkAction, ((_a = action.tooltip) === null || _a === void 0 ? void 0 : _a.text) &&
        h("calcite-tooltip", { label: action.tooltip.label || action.tooltip.text, placement: "top", "reference-element": id }, h("span", null, action.tooltip.text))));
    };
    this._context = getGlobalContext();
    this.term = undefined;
    this.baseUrl = undefined;
    this.path = "";
    this.linkTarget = 'self';
    this.api = 'portal';
    this.limit = 10;
    this.sortField = null;
    this.sortOrder = null;
    this.sortByIds = undefined;
    this.layout = 'list';
    this.layoutOptions = ['grid', 'list', 'table'];
    this.showThumbnail = true;
    this.imageType = IMAGE_TYPES.thumbnail;
    this.lazy = false;
    this.showSort = false;
    this.showSearch = false;
    this.matchRecent = false;
    this.matchSearch = false;
    this.showChips = false;
    this.showFacets = false;
    this.newTab = false;
    this.selectionMode = 'none';
    this.bulkActions = { position: 'bottom', actions: [] };
    this.showMoreResultsBtn = false;
    this.showResultsCount = false;
    this.showBackToTopBtn = false;
    this.query = undefined;
    this.facets = [];
    this.galleryType = undefined;
    this.cardTitleTag = undefined;
    this.include = '';
    this.state = {};
    this.corners = CORNERS.square;
    this.showAdditionalInfo = true;
    this.showEmptyState = true;
    this.disableTelemetry = false;
    this.shadow = undefined;
    this.showLinkButton = false;
    this.linkButtonText = undefined;
    this.linkButtonStyle = undefined;
    this.mobileView = false;
    this.showAddContent = false;
    this.addContentProps = {};
    this.showFacetModal = false;
    this._shouldShowFacetModal = false;
    this.showBadges = true;
    this.showType = true;
    this.showOwner = true;
    this.showLayoutSwitcher = false;
    this.mapSettings = undefined;
    this.galleryMapSettings = DEFAULT_MAP_SETTINGS;
    this.expand = undefined;
    this.showResults = true;
    this.disableMapMouseWheelZoom = false;
    this.additionalFacet = undefined;
    this.gallerySelection = undefined;
    this._gallerySelection = undefined;
    this.showSelection = false;
    this.cardActionLinks = [];
    this.callback = undefined;
    this.sortOptions = undefined;
    this.primaryActionsToRender = 1;
    this.tableColumns = undefined;
    this.isInitialized = false;
    this.isSearching = false;
    this.actions = [];
    this.searchResults = [];
    this.error = undefined;
    this._facets = undefined;
    bind(this, 'changeSortField', 'fetchMore', 'actionHandler', 'closeFacetModal', 'onFacetModalClose', 'onFacetModalOpen', 'onFacetChange', 'resetFacets', 'backToTop', 'setResultTopSpan', 'logGalleryActionsTelemetry', 'handleSearchChange', 'handleMatchSelected', 'handleHubTelemetry', 'openFacetModal');
  }
  // NOTE: Use this private getter instead of referencing `this.include` directly
  get _include() {
    return this.include ? this.include.split('|') : [];
  }
  /**
   * The currently active SortOption
   */
  get _activeSortOption() {
    var _a;
    const sortAttr = this.sortField;
    const option = (_a = this._sortOptions) === null || _a === void 0 ? void 0 : _a.find(option => option.attribute === sortAttr);
    return option && Object.assign(Object.assign({}, option), { order: this.sortOrder });
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this._facets = this.buildFacets();
    this.initialize();
  }
  /**
   * Builds the facets for the gallery with the facets
   * passed in, hydrating them so if a facet is a string,
   * it is converted to an IFacet, and filtering them
   * based on the targetEntity
   */
  buildFacets() {
    const targetEntity = this.activeQuery.targetEntity;
    const hydratedfacets = hydrateFacets(this.facets, this._context, this.intl);
    const filteredByEntityType = filterFacetsbyTargetEntity(hydratedfacets, targetEntity);
    const filteredByLayout = filterFacetsBasedOnLayout(filteredByEntityType, this.layout);
    return filteredByLayout;
  }
  async initialize() {
    try {
      // Clear any previous errors on initialization
      this.error = null;
      // We only want to show the skeleton loader the first time the component loads, not on subsequent searches
      // NOTE: the initialized flag is set to true in `this.search()` once search results have been fetched.
      this.isInitialized = false;
      // Visual audits can use this attribute to determine when to take screenshots
      delete this.element.dataset.testReady;
      // -----------------------------------------------------------------
      // Actions via Slot disabled for now - may revisit
      // -----------------------------------------------------------------
      // Currently handled via slot, which allows customization of the UX
      // I think we'd be better served using tuples of well-known actions
      // NOTE: querySelector('slot') is almost always null, unless it's a
      // reload spawned from a rebuild
      // const slot = this.element.shadowRoot.querySelector('slot') as HTMLSlotElement;
      // this.actions = slot.assignedElements();
      // This works consistently vs getting slot from shadowRoot
      // this.actions =  Array.from(this.element.querySelectorAll("[action]"));
      // -----------------------------------------------------------------
      // If component was not passed an IQuery, construct it from the other passed in props
      if (!this.query) {
        this.query = {
          targetEntity: this.galleryType || 'item',
          filters: [
            {
              predicates: [
                {
                  term: this.term
                }
              ]
            }
          ]
        };
      }
      this.setSortOptions(this.sortOptions);
      // If a gallerySelection is not passed in, construct it
      if (!this.gallerySelection || !Object.entries(this.gallerySelection).length) {
        this.gallerySelection = cloneObject(DEFAULT_GALLERY_SELECTION);
      }
      if (this._facets) {
        // pre-fetch dynamic facet options
        await this.fetchDynamicFacetOptions();
      }
      // run initial state setup (and select dynamic facet values)
      if (Object.keys(this.state).length > 0) {
        this.applySerializedState(this.state);
      }
      // send the current state of the gallery so hosts can serialize to url
      this.arcgisHubGalleryStateChange.emit(Object.assign(Object.assign({}, this.serializedGalleryState), { isInitialization: true }));
      // Include the existing selection in the selection copy that we want to return back
      // to the consuming app
      // Assign a gallerySelection clone otherwise updating _gallerySelection will
      // also update gallerySelection
      this._gallerySelection = cloneObject(this.gallerySelection);
      // ...and on to search we go!!
      // since this method is debounced and not awaited, errors are caught and handled seperately
      // inside of internal `search` method.
      this.prepareAndExecuteSearch();
    }
    catch (ex) {
      // String to be used in console.warn
      const message = `We are sorry but component could not initialize.  Please try again.`;
      this.handleError(message, ex, 'initialization');
    }
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  async handleContextChange() {
    if (this._facets) {
      await this.fetchDynamicFacetOptions();
    }
    this.prepareAndExecuteSearch();
  }
  async fetchFacetsAndSearch() {
    this._facets = this.buildFacets();
    if (this._facets) {
      await this.fetchDynamicFacetOptions();
      // Clear all the facets to an empty state and notify consumers
      // Note: We do not use resetFacets() since we also need to reset the query string.
      this.applySerializedState({});
      this.arcgisHubGalleryStateChange.emit(this.serializedGalleryState);
    }
    this.prepareAndExecuteSearch();
  }
  /**
   * Build the search options and filters then excute the search
   */
  prepareAndExecuteSearch() {
    this.search(this.activeQuery, this._searchOptions);
  }
  onStateChanged() {
    // Applying state can be costly, so we only do it if the new user input will actually cause a change
    if (willStateChange(this.serializedGalleryState, this.state)) {
      this.applySerializedState(this.state);
      this.prepareAndExecuteSearch();
    }
  }
  onGallerySelectionChanged(gallerySelection) {
    this._gallerySelection = Object.assign({}, gallerySelection);
  }
  /**
   * Re-fetches the search results up to the current "page"
   * For use in cases where the consumer knows the results have changed
   * @return {*}  {Promise<void>}
   * @memberof ArcgisHubGallery
   */
  async refresh() {
    // re-fetches search results up to the current "page"
    const currentPageNumber = Math.ceil(this.searchResults.length / this.limit);
    const num = currentPageNumber * this.limit;
    const opts = Object.assign(Object.assign({}, this._searchOptions), { num });
    this.search(this.activeQuery, opts);
  }
  async clearSelection() {
    this.gallerySelection = cloneObject(DEFAULT_GALLERY_SELECTION);
  }
  setResultTopSpan(el) {
    this.resultTopSpan = el;
  }
  /**
   * Apply serialize state to the Gallery
   * @param state
   */
  applySerializedState(state) {
    const updatedState = applyGalleryState(this.galleryState, state);
    // now apply the state into the gallery properties
    if (updatedState.term !== this.term) {
      this.term = updatedState.term;
    }
    if (updatedState.sort) {
      this.sortField = updatedState.sort.attribute;
      this.sortOrder = updatedState.sort.order;
    }
    if (updatedState.facets) {
      this._facets = updatedState.facets;
    }
    if (updatedState.layout) {
      this.layout = updatedState.layout;
    }
  }
  /**
   * Batches of fields that need aggregations fetched from the API
   * Note: Because the portal API can only handle 3 aggregation fields at a time,
   * each batch has a max size of 3
   */
  get _aggFieldBatches() {
    const fields = getOptionsBasedFacets(this._facets).reduce((acc, facet) => {
      if (facet.field) {
        acc.push(facet.field);
      }
      return acc;
    }, []);
    const batches = [];
    const batchSize = 3;
    for (let i = 0; i < fields.length; i += batchSize) {
      batches.push(fields.slice(i, i + batchSize));
    }
    return batches;
  }
  /**
  * The max number of aggregations to get from the API
  * For the portal API the max is 200, and regardless of how many
  * fields are requested, the same number is applied to all.
  */
  get _aggLimit() {
    // Find the largest aggLimit, or use 10 as the default
    return getOptionsBasedFacets(this._facets).reduce((acc, facet) => {
      if (facet.aggLimit && facet.aggLimit > acc) {
        acc = facet.aggLimit;
      }
      return acc;
    }, 10);
  }
  get hasSearchResults() {
    return this.lastSearchResponse && !!this.searchResults.length;
  }
  /**
   * return array of `IFilter`'s which represent the selected/active
   * facets options
   */
  get activeFacetFilters() {
    const filters = [];
    getOptionsBasedFacets(this._facets).forEach((facet) => {
      const selectedPredicates = facet.options.reduce((acc, opt) => {
        if (opt.selected) {
          acc = [...acc, ...opt.predicates];
        }
        return acc;
      }, []);
      // if there are any selectedPredicates, construct a filter for the facet
      if (selectedPredicates.length) {
        const filter = {
          operation: facet.operation,
          predicates: selectedPredicates
        };
        filters.push(filter);
      }
    });
    return filters;
  }
  get activeDateRangeFilters() {
    const filters = [];
    const dateRangeFacets = getDateRangeFacets(this._facets || []);
    dateRangeFacets.forEach((facet) => {
      if (facet.value && isValidDateRange(facet.value)) {
        const fieldRange = {
          from: Date.parse(facet.value.from),
          to: Date.parse(facet.value.to)
        };
        const filter = {
          operation: 'OR',
          predicates: [{
              [facet.field]: fieldRange
            }]
        };
        filters.push(filter);
      }
    });
    return filters;
  }
  get activeMapFilters() {
    const filters = [];
    const mapFacets = getMapFacets(this._facets || []);
    mapFacets.forEach((facet) => {
      if (facet.value) {
        const filter = {
          operation: 'OR',
          predicates: [{
              [facet.field]: bboxToString(facet.value)
            }]
        };
        filters.push(filter);
      }
    });
    return filters;
  }
  /**
   * True if error is present on @State() error
   */
  get hasError() {
    return !!this.error;
  }
  async fetchDynamicFacetOptions() {
    if (this._aggSearchOptionBatches.length) {
      try {
        const searchPromises = this._aggSearchOptionBatches.map((batchOptions) => hubSearch(this.query, batchOptions));
        const aggregationBatches = await Promise.all(searchPromises);
        const aggregationFacets = aggregationBatches.reduce((facets, { aggregations }) => {
          if (aggregations) {
            const batchFacets = createFacetsFromAggregations(aggregations);
            facets = facets.concat(batchFacets);
          }
          return facets;
        }, []);
        // now, set the options of each corresponding facet
        aggregationFacets.forEach((aggFacet) => {
          const existingFacet = getOptionsBasedFacets(this._facets).find(f => f.field === aggFacet.field);
          if (existingFacet) {
            const formattedOptions = processCommonDynamicOptions(aggFacet, this.intl);
            existingFacet.options = formattedOptions;
          }
        });
        // clone facets to trigger re-render
        this._facets = this._facets.map(f => cloneObject(f));
      }
      catch (ex) {
        throw new Error(`Error loading facet options: ${ex}`);
      }
    }
  }
  /**
   * 'Execute' the hubSearch fn and assign state variables based on the response
   * @param query IQuery
   * @param options IHubSearchOptions
   */
  async search(query, options) {
    try {
      this.isSearching = true;
      const response = await hubSearch(query, options);
      // inject path if set
      response.results = addPathToResults(this.path, response.results);
      this.lastSearchResponse = response;
      // We emit the IHubSearchResults because those objects have more info than the ViewModels
      this.arcgisHubGalleryResultsChange.emit(response.results);
      // emit the length of the executed query string if we have it
      response.executedQuerySize && this.arcgisHubGalleryExecutedQuerySize.emit(response.executedQuerySize);
      const { sortByIds } = this;
      let sortedResults = response.results;
      if (sortByIds && sortByIds.length) {
        sortedResults = response.results.slice().sort((a, b) => {
          // sort according to the ids array
          // but if it is not in the array, put it at the end
          const aIdx = sortByIds.includes(a.id) ? sortByIds.indexOf(a.id) : Infinity;
          const bIdx = sortByIds.includes(b.id) ? sortByIds.indexOf(b.id) : Infinity;
          return aIdx - bIdx;
        });
      }
      this.searchResults = sortedResults;
      // In case this is the initial search on startup, set the initialized flag to true
      // NOTE: the initialized flag is turned off in `componentWillLoad()`
      this.isInitialized = true;
      // Visual audits can use this attribute to determine when to take screenshots
      this.element.dataset.testReady = '';
    }
    catch (ex) {
      // String to be used in console.warn
      const message = `We are sorry but search ran into an error.  Please try again.`;
      this.handleError(message, ex, 'search');
    }
    this.isSearching = false;
  }
  /**
   * Fired when "Load More" button is clicked
   */
  async fetchMore() {
    const currentPageNumber = Math.ceil(this.searchResults.length / this.limit);
    this.maybeSendTelemetry(Object.assign(Object.assign({}, dist.dictionary
      .category.interaction
      .action.search
      .label.loadMore), { search: convertToQueryString(this.serializedGalleryState), element: dist.constants.element.RESULTS_LIST, position: currentPageNumber, count: this.lastSearchResponse.total }));
    try {
      // cache the results count before fetching more results
      this.lastSearchResultsCount = this.searchResults.length;
      this.lastSearchResponse = await this.lastSearchResponse.next();
      // inject path if set
      this.lastSearchResponse.results = addPathToResults(this.path, this.lastSearchResponse.results);
      this.searchResults = [...this.searchResults, ...this.lastSearchResponse.results];
    }
    catch (e) {
      console.error(`Unable to fetch more results: ${e}`);
    }
  }
  backToTop() {
    var _a;
    this.maybeSendTelemetry(Object.assign(Object.assign({}, dist.dictionary
      .category.interaction
      .action.search
      .label.backToTop), { element: dist.constants.element.BACK_TO_TOP }));
    // Focus for accessibility requirements. Next tab should place the user into the results list.
    (_a = this.resultTopSpan) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
    // When used on Hub, the global navbar is "covering" some portion of the gallery, so when
    // scroll to top, we need to scroll to the top of the parent element to show the entire gallery.
    // In other cases, e.g. the catalog component, we only need to scroll to the top of
    // the gallery (element.parenetElement is null)
    this.element.parentElement
      ? this.element.parentElement.scrollIntoView({ behavior: 'smooth' })
      : this.element.scrollIntoView({ behavior: 'smooth' });
  }
  /**
   * Compute the `IQuery`  based on the current state of the component
   */
  get activeQuery() {
    // start with the base query, and add additional filters
    const qry = cloneObject(this.query);
    // if we have a query, add a filter for it
    if (this.term) {
      qry.filters.push({
        predicates: [
          {
            term: this.term
          }
        ]
      });
    }
    // append list filters
    if (this.activeFacetFilters.length) {
      qry.filters = [...qry.filters, ...this.activeFacetFilters];
    }
    // append date range filters
    if (this.activeDateRangeFilters.length) {
      qry.filters = [...qry.filters, ...this.activeDateRangeFilters];
    }
    if (this.activeMapFilters.length) {
      qry.filters = [...qry.filters, ...this.activeMapFilters];
    }
    // if we have no blocks, and this is a user search, we need to add in an empty term query
    // as the user search api actually supports this. We can't push this down to `hubSearch`
    // unless we also send the `FilterType`
    if (!qry.filters.length && this.query.targetEntity === "user") {
      qry.filters.push({
        predicates: [
          {
            term: ""
          }
        ]
      });
    }
    // If there are pre-selected cards and we choose to not show them, exclude their IDs from the query
    if (!this.showSelection && this.gallerySelection && flattenArray(Object.values(this.gallerySelection)).length) {
      // If there is an entry for the gallery selection for the type of the current query
      // add it to the exclude ID list
      for (const [type, ids] of Object.entries(this.gallerySelection)) {
        if (type === qry.targetEntity) {
          // We are doing the below because items need an id to exclude, but users need a username
          // to properly exclude the user from the search response.
          // This _may_ need expansion with other types depending on how the API evolves
          let targetToExclude = 'id';
          if (type === 'communityUser' || type === 'portalUser' || type === 'groupMember' || type === 'user') {
            targetToExclude = 'username';
          }
          qry.filters.push({
            predicates: [
              {
                [targetToExclude]: {
                  not: [...ids]
                }
              }
            ]
          });
        }
      }
    }
    return qry;
  }
  /**
   * Construct an `IHubSearchOptions` based on the current state of the component
   */
  get _searchOptions() {
    var _a, _b;
    const opts = {
      num: this.limit,
      // Don't use _activeSortOption, as we want sortField and sortOrder to be pass-throughs to the api
      sortField: this.sortField,
      sortOrder: SortDirection[this.sortOrder],
      include: this._include,
      requestOptions: (_a = this._context) === null || _a === void 0 ? void 0 : _a.hubRequestOptions,
      // httpMethod is only respected by the Portal API
      // OGC API is GET only
      httpMethod: 'POST'
    };
    // TODO: we can remove this once the hubSearch subsystem has been updated
    // to use the platform-level OGC API instead of the site-level OGC API
    if (this.api === 'hub') {
      opts.site = (_b = this._context) === null || _b === void 0 ? void 0 : _b.hubUrl;
    }
    return opts;
  }
  /**
   * Construct batches of `IHubSearchOptions` for aggregations based on the current state of the component.
   * We have to batch the requests due to the Portal API's limit of 3 aggregation fields per request.
   */
  get _aggSearchOptionBatches() {
    var _a, _b;
    const baseBatchOptions = {
      num: 1,
      include: [],
      requestOptions: (_a = this._context) === null || _a === void 0 ? void 0 : _a.hubRequestOptions,
      aggLimit: this._aggLimit,
      httpMethod: 'POST'
    };
    // TODO: we can remove this once the hubSearch subsystem has been updated
    // to use the platform-level OGC API instead of the site-level OGC API
    if (this.api === 'hub') {
      baseBatchOptions.site = (_b = this._context) === null || _b === void 0 ? void 0 : _b.hubUrl;
    }
    const searchOptionBatches = [];
    this._aggFieldBatches.forEach((fieldBatch) => {
      searchOptionBatches.push(Object.assign(Object.assign({}, baseBatchOptions), { aggFields: fieldBatch }));
    });
    return searchOptionBatches;
  }
  /**
   * Return a single structure that represents the current state of the gallery
   */
  get galleryState() {
    return {
      term: this.term,
      sort: this._activeSortOption,
      facets: this._facets,
      layout: this.layout
    };
  }
  /**
   * Return the serialized state of the gallery
   */
  get serializedGalleryState() {
    return removeEmptyProps(serializeGalleryState(this.galleryState));
  }
  get _hasSlottedGalleryActions() {
    return !!this.element.querySelector('[slot="gallery-actions"]');
  }
  handleLayoutSelect(event) {
    var _a;
    this.layout = event.detail;
    this.maybeSendTelemetry(Object.assign(Object.assign({}, dist.dictionary
      .category.interaction
      .action.search
      .label.view), { element: dist.constants.element.VIEW_BUTTON, details: `${titleize(this.layout)} View`, search: convertToQueryString(this.serializedGalleryState), count: ((_a = this.lastSearchResponse) === null || _a === void 0 ? void 0 : _a.total) || 0 }));
    this.arcgisHubGalleryStateChange.emit(this.serializedGalleryState);
  }
  sendCardTitleClickTelemetry(event) {
    var _a;
    const { model } = event.detail;
    this.maybeSendTelemetry(Object.assign(Object.assign({}, dist.dictionary
      .category.interaction
      .action.search
      .label.click), { type: model.type, search: convertToQueryString(this.serializedGalleryState), element: model.index === -1 ? dist.constants.element.POPUP : dist.constants.element.RESULTS_LIST, position: model.index, count: (_a = this.lastSearchResponse) === null || _a === void 0 ? void 0 : _a.total }));
  }
  sendMoreLessClickTelemetry(event) {
    const { facet, isMore } = event.detail;
    this.maybeSendTelemetry(Object.assign(Object.assign({}, dist.dictionary
      .category.interaction
      .action.search
      .label.filter), { details: isMore
        ? dist.constants.details.MORE
        : dist.constants.details.LESS, search: convertToQueryString(this.serializedGalleryState), element: facet.key, count: this.lastSearchResponse.total }));
  }
  /**
   * Add/remove a card ID from the `gallerySelection` list when it is selected/deselected
   * It emits the `arcgisHubGallerySelect` event that's being listened by the consumer component
   * @param event
   */
  cardSelect(event) {
    event.stopPropagation();
    const id = event.detail.id;
    const selection = this._gallerySelection[this.query.targetEntity];
    if (selection.includes(id)) {
      // user selected one that is currently selected, remove it from the selection
      this._gallerySelection[this.query.targetEntity] = without(selection, event.detail.id);
    }
    else if (this.selectionMode === 'single') {
      // user selected one that is not selected and we are in single select mode, selection becomes just this one
      this._gallerySelection[this.query.targetEntity] = [event.detail.id];
    }
    else {
      // user selected one that is not selected and we are in multiple select mode, add it to the selection
      this._gallerySelection[this.query.targetEntity] = [...selection, event.detail.id];
    }
    this._gallerySelection = cloneObject(this._gallerySelection);
    this.arcgisHubGallerySelect.emit(this._gallerySelection);
  }
  /**
   * Handle any gallery errors by setting error state to thrown error, clearing
   * any existing search results, setting isInitialized to true, clearing the map,
   * and logging the message as a warning to the console.
   * @param message string - the custom error to log to the console
   * @param err Error - the error object
   * @param source ErrorSource - the source of the error
   */
  handleError(message, err, source) {
    var _a;
    this.error = err;
    this.searchResults = []; // upon error, clear any existing results
    this.isInitialized = true; // need to set to true, else will be stuck in skeleton loading state
    console.warn(message, err);
    this.maybeSendTelemetry(Object.assign(Object.assign({}, dist.dictionary
      .category.interaction
      .action.search
      .label.query), { details: `Failure: ${source} : ${err.message}`, search: convertToQueryString(this.serializedGalleryState), count: ((_a = this.lastSearchResponse) === null || _a === void 0 ? void 0 : _a.total) || 0 }));
  }
  /**
   * Listen for changes on the search input
   * @param event
   */
  handleSearchChange(event) {
    event.stopPropagation();
    this.searchTerm(event.detail);
  }
  /**
   * Executes a new search based on the updated term
   * @param term term to search
   */
  searchTerm(term) {
    // We have this guard to prevent duplicate searches
    if (this.term !== term) {
      // changing the query will execute the search
      this.term = term;
      this.arcgisHubGalleryStateChange.emit(this.serializedGalleryState);
      this.maybeSendTelemetry(Object.assign(Object.assign({}, dist.dictionary
        .category.interaction
        .action.search
        .label.query), { details: convertToQueryString(this.serializedGalleryState), search: this.term, element: dist.constants.element.ON_PAGE }));
    }
  }
  /**
   * Handles when a match is selected from the auto-suggest component
   */
  handleMatchSelected(event) {
    const match = event.detail;
    switch (match.source) {
      case 'recent':
        const recentMatch = match;
        this.searchTerm(recentMatch.label);
        break;
      case 'search':
        this.handleSearchMatchSelected(match);
        break;
      case 'location':
        console.warn('Location matches are not yet supported');
        break;
    }
  }
  /**
   * Navigate to the corresponding url of a search match
   * @param match match to navigate to
   */
  handleSearchMatchSelected(match) {
    // TODO: Should we actually _emit_ an event when `linkTarget` is set to `event`?
    // We're not currently doing anything of the sort, even when actual card is clicked
    if (!['none', 'event'].includes(this.linkTarget)) {
      const url = getCardModelUrlFromResult(match.result, this.linkTarget, this.baseUrl);
      navigate(url);
    }
  }
  /**
  * Handle changes in the facets
  * @param event
  */
  onFacetChange(event) {
    event.stopPropagation();
    const updatedFacet = cloneObject(event.detail);
    // based on the payload, update the state of the facet
    const updatedFacets = this._facets.map((facet) => {
      return facet.key === updatedFacet.key ? Object.assign(Object.assign({}, facet), updatedFacet) : facet;
    });
    this._facets = updatedFacets;
    this.arcgisHubGalleryStateChange.emit(this.serializedGalleryState);
    this.prepareAndExecuteSearch();
  }
  /**
   * Reset the facets to the original state
   */
  resetFacets() {
    var _a;
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary
      .category.interaction
      .action.search
      .label.filter), { details: dist.constants.details.RESET, search: convertToQueryString(this.serializedGalleryState), element: dist.constants.element.RESET_FILTERS, count: (_a = this.lastSearchResponse) === null || _a === void 0 ? void 0 : _a.total }));
    this._facets = this._facets.map(resetFacet);
    this.arcgisHubGalleryStateChange.emit(this.serializedGalleryState);
    // update state based on the query
    this.prepareAndExecuteSearch();
  }
  /**
   * Handle the telemetry event on arcgis-hub-auto-suggest and stop it from propagating
   * if it's a search query
   * @param e CustomEvent<any> - A custom event that contains the telemetry data
   */
  handleHubTelemetry(e) {
    if (matchesTelemetry(e.detail, dist.dictionary.category.interaction.action.search.label.query)) {
      e.stopPropagation();
    }
  }
  /**
   * Wrapper for emiting telemetry
   */
  maybeSendTelemetry(data) {
    if (!this.disableTelemetry) {
      this.hubTelemetry.emit(data);
    }
  }
  /**
   * Triggered every time sort field has changed
   * @param event
   */
  changeSortField(event) {
    this.sortField = event.detail.attribute;
    this.sortOrder = event.detail.order;
    this.arcgisHubGalleryStateChange.emit(this.serializedGalleryState);
    this.prepareAndExecuteSearch();
  }
  /**
   * Render the search input
   * @returns
   */
  renderSearch() {
    if (this.showSearch) {
      return h("arcgis-hub-auto-suggest", { class: "search-bar", clearButton: true, disableTelemetry: this.disableTelemetry, matchRecent: this.matchRecent, matchSearch: this.matchSearch, onArcgisHubAutoSuggestInputChange: this.handleSearchChange, onArcgisHubAutoSuggestMatchSelected: this.handleMatchSelected, onHubTelemetry: this.handleHubTelemetry, query: this.query, searchApi: this.api, showSearchIcon: true, term: this.term });
    }
  }
  renderMobileFacetsTrigger() {
    var _a;
    if (this.mobileView && ((_a = this._facets) === null || _a === void 0 ? void 0 : _a.length)) {
      return (h("calcite-button", { appearance: "transparent", iconStart: "filter", label: this.intl.t('filter'), onClick: this.openFacetModal, scale: "l" }));
    }
  }
  renderLayoutSwitcher() {
    if (this.showLayoutSwitcher && !this.mobileView) {
      const layoutOptions = this.layoutOptions.map((opt) => {
        const icon = opt === 'compact' ? 'list-bullet' : opt;
        return {
          tooltip: this.intl.t(`layoutOptions.${opt}`),
          layout: opt,
          icon
        };
      });
      return h("div", { class: "layout-switcher-container" }, layoutOptions.map((opt) => (h("arcgis-hub-layout-button", { class: "layout-option", icon: opt.icon, key: opt.layout, layout: opt.layout, selected: this.layout === opt.layout, tooltip: opt.tooltip }))));
    }
  }
  /**
   * Render the More Results button
   * @returns
   */
  renderMoreResultsBtn() {
    var _a;
    if (this.showMoreResultsBtn && ((_a = this.lastSearchResponse) === null || _a === void 0 ? void 0 : _a.hasNext)) {
      return (h("calcite-button", { onClick: this.fetchMore }, this.intl.t('moreResults')));
    }
  }
  renderBackToTopBtn() {
    if (this.showBackToTopBtn && this.hasSearchResults) {
      return (h("calcite-button", { appearance: "outline", class: 'back-to-top-btn', onClick: this.backToTop }, this.intl.t('backToTop')));
    }
  }
  /**
    * Get the sort options for the sort field
    * defaultOrder is the default sort order and order is the current order
    * label is unused but is here because it is required in ISortOption
    * Note that 'relevance' has null attributes. That is because selecting 'relevance'
    * is meant to remove any explicit sort field on our end and rely instead on the backing
    * API's ranking algorithm. In other words, it's actually the _absence_ of a sort field.
  */
  setSortOptions(sortOptions) {
    // Note: Label is not used in the UI, but is required in ISortOption
    const sortOptionsMap = {
      relevance: { attribute: null, label: 'Relevance', defaultOrder: null, order: null },
      title: { attribute: 'title', label: 'Title', defaultOrder: 'asc', order: 'asc' },
      created: { attribute: 'created', label: 'Date Created', defaultOrder: 'desc', order: 'desc' },
      startDate: { attribute: 'startDate', label: 'Date', defaultOrder: 'desc', order: 'desc' },
      modified: { attribute: 'modified', label: 'Date Updated', defaultOrder: 'desc', order: 'desc' },
      username: { attribute: 'username', label: 'Username', defaultOrder: 'asc', order: 'asc' },
      firstName: { attribute: 'firstName', label: 'First name', defaultOrder: 'desc', order: 'desc' },
      lastName: { attribute: 'lastName', label: 'Last name', defaultOrder: 'desc', order: 'desc' },
      joined: { attribute: 'joined', label: 'Date Joined', defaultOrder: 'desc', order: 'desc' },
      // membertype is all lowercase because that's what the API takes
      memberType: { attribute: 'membertype', label: 'Role', defaultOrder: 'desc', order: 'desc' },
    };
    sortOptions = sortOptions || ['relevance', 'title', 'created', 'modified'];
    this._sortOptions = sortOptions.map(option => sortOptionsMap[option]);
  }
  /**
 * Only render sort when set to do so
 * @returns the -search-sort component
 */
  renderSort() {
    if (this.showSort && this.hasSearchResults) {
      return h("arcgis-hub-search-sort", { activeSortOption: this._activeSortOption, class: "search-sort", onHubSearchSortChange: this.changeSortField, sortOptions: this._sortOptions });
    }
  }
  handleFacetModalChange(newValue) {
    this._shouldShowFacetModal = newValue;
  }
  openFacetModal() {
    this._shouldShowFacetModal = true;
  }
  /**
   * Forces the calcite-modal component to fire the calciteModalClose
   * event when the "View Results" button is clicked.
   */
  closeFacetModal() {
    this._shouldShowFacetModal = false;
  }
  /**
   * arcgis-wormhole prevents targeting of the underlying `calciteModalClose` event,
   * so binding this callback and firing a new custom event guarantees that consumers can
   * be notified that the modal is closed.
   *
   * @param event
   */
  onFacetModalClose(event) {
    event.stopPropagation();
    this.closeFacetModal();
    this.arcgisHubContentGalleryFacetModalClose.emit();
  }
  onFacetModalOpen(event) {
    event.stopPropagation();
    this.hubTelemetry.emit(dist.dictionary.category.interaction.action.open.label.sheet.details.filters);
  }
  renderFacets() {
    if (this.showFacets) {
      return this.mobileView ? this.renderMobileFacets() : this.renderDesktopFacets(this._facets);
    }
  }
  renderDesktopFacets(facets) {
    var _a;
    return h("arcgis-hub-facet-list", { disableTelemetry: this.disableTelemetry, facets: facets, onArcgisHubFacetListChange: this.onFacetChange, onArcgisHubFacetListReset: this.resetFacets, resultsCount: ((_a = this.lastSearchResponse) === null || _a === void 0 ? void 0 : _a.total) || 0, showChips: this.showChips }, h("div", { slot: 'additional-facet' }, this.additionalFacet), this.mobileView ? '' : h("h2", { class: "facet-list-header", slot: "header" }, this.intl.t('filter')));
  }
  renderMobileFacets() {
    var _a;
    // Set accordions open by default on mobile
    const facets = this._facets.map((facet) => cloneObject(Object.assign(Object.assign({}, facet), { accordionClosed: false })));
    return h("arcgis-wormhole", null, h("calcite-modal", { onCalciteModalClose: this.onFacetModalClose, onCalciteModalOpen: this.onFacetModalOpen, open: this._shouldShowFacetModal }, h("span", { slot: "header" }, this.intl.t('filter')), h("div", { slot: "content" }, this.renderDesktopFacets(facets)), h("calcite-button", { onClick: this.closeFacetModal, slot: "primary", width: "full" }, this.intl.t('viewResults', { numResults: (_a = this.lastSearchResponse) === null || _a === void 0 ? void 0 : _a.total }))));
  }
  actionHandler(evt) {
    // intentionally not calling stopPropagation or preventDefault at this time per guidance from Caleb,
    // will be handled in a separate story that'll verify nothing regresses as a result
    this.arcgisHubGalleryAction.emit(evt.detail);
  }
  get resultsComponent() {
    let ResultsComponent = 'arcgis-hub-gallery-layout-list';
    switch (this.layout) {
      case 'calendar':
        ResultsComponent = 'arcgis-hub-gallery-layout-calendar';
        break;
      case 'map':
        ResultsComponent = 'arcgis-hub-gallery-layout-map';
        break;
      case 'compact':
        ResultsComponent = 'arcgis-hub-gallery-layout-compact';
        break;
      case 'table':
        ResultsComponent = 'arcgis-hub-gallery-layout-table';
        break;
      default:
        // grid, grid-filled, list
        ResultsComponent = 'arcgis-hub-gallery-layout-list';
    }
    return ResultsComponent;
  }
  renderResults() {
    const { hasError, layout, showResults } = this;
    // a little weird maybe but this is roughly how the logic works today
    let shouldRender = showResults;
    if (layout === 'map') {
      shouldRender = !hasError;
    }
    if (shouldRender) {
      const [mapFacet] = getMapFacets(this._facets || []);
      let extent;
      if (mapFacet) {
        const { value: bbox } = mapFacet;
        extent = bbox && new Extent(bBoxToExtent(bbox));
      }
      const { searchResults } = this;
      const ResultsComponent = this.resultsComponent;
      return h(Fragment, null, h("section", { "aria-label": this.intl.t('resultsSection') }, h(ResultsComponent, { baseUrl: this.baseUrl, callback: this.callback, cardActionLinks: this.cardActionLinks, cardTitleTag: this.cardTitleTag, columns: this.tableColumns, corners: this.corners, disableMouseWheelZoom: this.disableMapMouseWheelZoom, disableTelemetry: this.disableTelemetry, entityType: this.query.targetEntity, expand: this.expand, galleryMapSettings: this.galleryMapSettings, hasError: hasError, imageType: this.imageType, initialExtent: extent, lastSearchResultsCount: this.lastSearchResultsCount, layout: this.layout, lazy: this.lazy, limit: this.limit, linkButtonStyle: this.linkButtonStyle, linkButtonText: this.linkButtonText, linkTarget: this.linkTarget, loading: false, mapSettings: this.mapSettings, newTab: this.newTab, primaryActionsToRender: this.primaryActionsToRender, searchResults: searchResults, selectedIds: this._gallerySelection[this.query.targetEntity], selectionMode: this.selectionMode, shadow: this.shadow, shouldFilterByExtent: !!this.activeMapFilters.length, shouldShowFilterByExtent: hasMapFacets(this._facets) && this.showResults, shouldShowResults: this.showResults, showAdditionalInfo: this.showAdditionalInfo, showBadges: this.showBadges, showEmptyState: this.showEmptyState, showLinkButton: this.showLinkButton, showOwner: this.showOwner, showThumbnail: this.showThumbnail, showType: this.showType }, h("slot", { name: "search-error-action", slot: "search-error-action" }), h("slot", { name: "no-results-action", slot: "no-results-action" }))), !!searchResults.length && this.renderResultsCount(), !!searchResults.length && this.renderListFooter());
    }
  }
  renderMain() {
    return h("div", { class: "gallery-list" }, this.renderListHeader(), this.renderBulkActions(), h("span", { class: "result-top", ref: this.setResultTopSpan, tabIndex: -1 }), this.renderResults());
  }
  renderListHeader() {
    const showResultsCount = this.renderResultsCount();
    const showListHeaderControls = this.renderSort() || this.renderLayoutSwitcher() || this.renderGalleryActionsPopover() || this.renderAddContent();
    if (showResultsCount || showListHeaderControls) {
      return (h("div", { class: "gallery-list-header" }, showResultsCount &&
        h("div", { "aria-live": "polite", class: "results-count-container", role: "status" }, this.renderResultsCount()), showListHeaderControls &&
        h("div", { class: "list-header-controls-container" }, this.renderAddContent(), this.renderSort(), this.renderMobileFacetsTrigger(), this.renderLayoutSwitcher(), this.renderGalleryActionsPopover())));
    }
  }
  async handleEntityCreated(_evt) {
    // wait a little so we know the share has happened...
    // this may no longer be necessary because we poll for the new item before raising the event from the add-content component
    await new Promise((resolve) => setTimeout(resolve, 500));
    await this.refresh();
  }
  renderAddContent() {
    if (this.showAddContent) {
      return h("arcgis-hub-add-content", Object.assign({ query: this.query }, this.addContentProps));
    }
  }
  get selectable() {
    return this.selectionMode !== 'none';
  }
  get selectionCount() {
    var _a;
    return (_a = this._gallerySelection[this.query.targetEntity]) === null || _a === void 0 ? void 0 : _a.length;
  }
  get hasSelection() {
    return !!this.selectionCount;
  }
  /**
   * Getter for the internal _bulkActions
   * Used so that we can augment each action with a key for rendering and a pre-bound action handler
   * @readonly
   * @type {IInternalComponentAction[]}
   * @memberof ArcgisHubGallery
   */
  get _bulkActions() {
    var _a;
    // for each action, we want to call its click handler
    // with the action object as the arg
    // so we pre-bind it to each action here
    const bindHandler = (action) => {
      action = Object.assign({}, action);
      if (action.name) {
        action.handler = this.handleBulkAction.bind(this, action);
      }
      // we need a key but we don't have a unique identifier
      const { name, args } = action;
      action.key = unicodeToBase64(JSON.stringify({ name, args }));
      return action;
    };
    const actions = ((_a = this.bulkActions) === null || _a === void 0 ? void 0 : _a.actions) || [];
    return actions.map((action) => {
      action = bindHandler(action);
      if (!!action.children) {
        action.children = action.children.map(bindHandler);
      }
      return action;
    });
  }
  /**
   * Handler for bulk actions
   * @param {IComponentAction} action
   * @memberof ArcgisHubGallery
   */
  async handleBulkAction(action) {
    const selection = this._gallerySelection[this.query.targetEntity];
    if (!!action && !!selection.length) {
      const { name, args } = action;
      this.arcgisHubGalleryBulkAction.emit({ action: { name, args }, selection });
    }
  }
  renderBulkActions() {
    if (this.hasSelection && this._bulkActions.length) {
      const classObj = {
        'bulk-actions': true,
        sticky: this.bulkActions.position === 'top'
      };
      return h("calcite-action-pad", { class: classObj, "expand-disabled": true, expanded: true, layout: "horizontal", scale: "s" }, h("div", { class: "selection-count" }, this.intl.t('selected', { count: this.selectionCount })), this._bulkActions.map(this.renderBulkAction));
    }
  }
  renderGalleryActionsPopover() {
    let result;
    if (this._hasSlottedGalleryActions) {
      result = h("div", { class: "actions-popover-container" }, h("calcite-popover", { "auto-close": true, label: this.intl.t('galleryActionsLabel'), overlayPositioning: "fixed", placement: "bottom-end", referenceElement: "gallery-actions-toggle" }, h("div", { class: "actions-popover-content" }, h("slot", { name: "gallery-actions" }))), h("calcite-button", { appearance: "transparent", "icon-start": "ellipsis", id: "gallery-actions-toggle", kind: "neutral", label: this.intl.t('popoverActionButtonLabel'), onClick: this.logGalleryActionsTelemetry, round: true, scale: "m" }));
    }
    return result;
  }
  logGalleryActionsTelemetry() {
    this.maybeSendTelemetry(Object.assign({}, dist.dictionary
      .category.interaction
      .action.search
      .label.action
      .details.overflow));
  }
  renderListFooter() {
    if (this.renderMoreResultsBtn() || this.renderBackToTopBtn()) {
      return (h("div", { class: 'gallery-list-footer' }, h("div", null, this.renderMoreResultsBtn()), h("div", null, this.renderBackToTopBtn())));
    }
  }
  renderResultsCount() {
    if (this.showResultsCount && this.hasSearchResults) {
      return h("p", { class: 'results-count' }, this.intl.t('resultsCount', { pageTotal: this.searchResults.length, searchTotal: this.lastSearchResponse.total }));
    }
  }
  renderGallery() {
    return this.renderGalleryDefault();
  }
  /**
   * Render the gallery with the default layout
   */
  renderGalleryDefault() {
    return h(Fragment, null, this.renderSearch(), h("slot", { name: "collection-select" }), h("div", { class: "gallery-main", "data-searching": this.isSearching ? 'true' : null }, this.renderFacets(), this.renderMain()), h("slot", { name: "click-actions" }));
  }
  renderLoadingScreen() {
    const ResultsComponent = this.resultsComponent;
    return h("slot", { name: "loading-screen" }, h(ResultsComponent, { layout: this.layout, loading: true, showLinkButton: this.showLinkButton, showOwner: this.showOwner, showType: this.showType }));
  }
  /**
   * Main Render
   * @returns
   */
  render() {
    return (h(Host, null, this.isInitialized ? this.renderGallery() : this.renderLoadingScreen()));
  }
  static get assetsDirs() { return ["assets", "locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "_context": ["handleContextChange"],
    "query": ["fetchFacetsAndSearch"],
    "facets": ["fetchFacetsAndSearch"],
    "term": ["prepareAndExecuteSearch"],
    "limit": ["prepareAndExecuteSearch"],
    "state": ["onStateChanged"],
    "gallerySelection": ["onGallerySelectionChanged"],
    "showFacetModal": ["handleFacetModalChange"]
  }; }
};
__decorate$1([
  DebounceDecoratorFactory({ timeout: 100 })
], ArcgisHubGallery.prototype, "prepareAndExecuteSearch", null);
__decorate$1([
  MemoizeDecoratorFactory('bulkActions')
], ArcgisHubGallery.prototype, "_bulkActions", null);
ArcgisHubGallery.style = arcgisHubGalleryCss;

const arcgisHubHelpStateCss = ":host{text-align:center;display:flex;flex-direction:column;align-items:center}:host([scale=\"s\"]){font-size:0.75rem}:host([scale=\"s\"]) calcite-icon,:host([scale=\"s\"]) img{height:9rem;width:auto}:host([scale=\"s\"]) calcite-loader{--calcite-loader-size:9rem}:host([scale=\"m\"]){font-size:1rem}:host([kind=\"brand\"]) calcite-icon#help-icon{color:var(--calcite-color-brand)}:host([kind=\"info\"]) calcite-icon#help-icon{color:var(--calcite-color-status-info)}:host([kind=\"success\"]) calcite-icon#help-icon{color:var(--calcite-color-status-success)}:host([kind=\"warning\"]) calcite-icon#help-icon{color:var(--calcite-color-status-warning)}:host([kind=\"danger\"]) calcite-icon#help-icon{color:var(--calcite-color-status-danger)}calcite-icon,img{height:12rem;width:auto}calcite-loader{--calcite-loader-size:12rem}:host([scale=\"l\"]){font-size:1.25rem}:host([scale=\"l\"]) calcite-icon,:host([scale=\"l\"]) img{height:15rem;width:auto}:host([scale=\"l\"]) calcite-loader{--calcite-loader-size:15rem}:host>h1,:host>h2,:host>h3,:host>h4,:host>h5,:host>h6{font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}p{color:var(--bodyText)}";

const getStateDefaultValue = (state, key, context) => {
  // default prop values for the above pre-defined states
  // NOTE: default strings are in locales and use _getMessage()
  const stateDefaults = {
    // NOTE: default image URLs should be a relative path to the assets folder
    // and will have the asset path appended at runtime
    unauthenticated: {
      // NOTE: before using the fallback, the hub app tries to get
      // appSettings.portalInfo.portalProperties.sharedTheme.logo.small
      imageUrl: './assets/sign-in-generic.svg',
      // add default telemetry?
    },
    'not-found': {
      icon: 'file-magnifying-glass',
      actionLink: getSiteHomeUrl(window.location.href, window.location.origin, context),
      // add default icon and/or telemetry?
    },
    'unsupported-device': {
      icon: 'mobile-off',
      telemetry: dist.dictionary.category.navigation.action.view.label.content,
      viewedTelemetry: dist.dictionary.category.interaction.action.viewed.label.notice.details.unsupportedDevice,
    },
    'access-denied': {
      icon: 'lock',
      actionLink: getSiteHomeUrl(window.location.href, window.location.origin, context),
    },
    loading: {}
  };
  const defaults = stateDefaults[state] || {};
  return defaults[key];
};
const ArcgisHubHelpState = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubHelpStateActionClick = createEvent(this, "arcgisHubHelpStateActionClick", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.heading = undefined;
    this.icon = undefined;
    this.imageUrl = undefined;
    this.message = undefined;
    this.actionText = undefined;
    this.actionLink = undefined;
    this.loadingLabel = undefined;
    this.telemetry = undefined;
    this.viewedTelemetry = undefined;
    this.state = undefined;
    this.headingLevel = 3;
    this.scale = 'm';
    this.kind = undefined;
    this.isMain = true;
    bind(this, 'handleClick');
  }
  get _context() { return getGlobalContext(); }
  get _imageUrl() {
    const { imageUrl } = this;
    return imageUrl
      ? imageUrl
      : this._fallbackImageUrl;
  }
  get _fallbackImageUrl() {
    const fallbackImageUrl = getStateDefaultValue(this.state, 'imageUrl', this._context);
    return fallbackImageUrl
      ? getAssetPath(fallbackImageUrl)
      : undefined;
  }
  _getProp(name) {
    const value = this[name];
    return value !== undefined
      // override with prop value
      ? value
      // get default value for state, if any
      : getStateDefaultValue(this.state, name, this._context);
  }
  _getMessage(name) {
    const value = this[name];
    return typeof value === 'string'
      // override with prop value
      ? value
      : this.state
        // get translated string for state
        ? this.intl.t(`${this.state}.${name}`)
        : undefined;
  }
  handleClick(e) {
    // prevent any further handlers from being called
    e.stopPropagation();
    const telemetry = this._getProp('telemetry');
    this.arcgisHubHelpStateActionClick.emit();
    if (telemetry) {
      this.hubTelemetry.emit(telemetry);
    }
  }
  async componentWillLoad() {
    // set up intl
    this.intl = await intlManager.loadIntlForComponent(this.el);
  }
  async componentDidLoad() {
    const telemetry = this._getProp('viewedTelemetry');
    if (telemetry) {
      this.hubTelemetry.emit(telemetry);
    }
  }
  _renderLoader() {
    if (this.state === 'loading') {
      return h("calcite-loader", { active: true, label: this._getMessage('loadingLabel'), scale: this.scale });
    }
  }
  _renderImage() {
    let result;
    const heading = this._getMessage('heading');
    const icon = this._getProp('icon');
    if (!!this._imageUrl) {
      result = h("img", { alt: heading, src: this._imageUrl });
    }
    else if (!!icon) {
      result = h("calcite-icon", { icon: icon, id: "help-icon", scale: this.scale });
    }
    return result;
  }
  render() {
    const heading = this._getMessage('heading');
    const actionText = this._getMessage('actionText');
    // styles and aria role may need to change
    // for in-line vs "splash" screen use
    const HeadingTag = `h${this.headingLevel}`;
    return (h(Host, { "aria-live": "polite", "data-element": "help-state", role: this.isMain ? "main" : "" }, this._renderLoader(), this._renderImage(), h("slot", { name: "heading" }, h(HeadingTag, null, heading)), h("slot", { name: "message" }, h("p", null, this._getMessage('message'))), h("slot", { name: "actions" }, !!actionText &&
      h("div", { class: "actions" }, h("calcite-button", { href: this._getProp('actionLink'), onClick: this.handleClick, round: true, scale: this.scale }, actionText)))));
  }
  static get assetsDirs() { return ["locales", "assets"]; }
  get el() { return getElement(this); }
};
ArcgisHubHelpState.style = arcgisHubHelpStateCss;

const arcgisHubLayoutButtonCss = ".popover-content{margin:0.75rem}#toggle-button{height:100%}#toggle-button[kind=\"neutral\"]{--calcite-ui-icon-color:#151515}#toggle-button[kind=\"neutral\"]:hover,#toggle-button[kind=\"neutral\"]:focus{--calcite-ui-icon-color:var(--calcite-color-brand)}calcite-icon{position:relative;top:.10rem}";

const ArcgisHubLayoutButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubLayoutButtonSelect = createEvent(this, "arcgisHubLayoutButtonSelect", 7);
    this.selected = undefined;
    this.icon = undefined;
    this.layout = undefined;
    this.tooltip = undefined;
    bind(this, 'selectLayout', 'setPopoverElement', 'maybeOpenPopover', 'maybeClosePopover');
  }
  get _kind() {
    return this.selected ? 'neutral' : 'brand';
  }
  get _appearance() {
    return this.selected ? 'solid' : 'transparent';
  }
  setPopoverElement(el) {
    this.popoverElement = el;
  }
  maybeOpenPopover() {
    this.tooltip && (this.popoverElement.open = true);
  }
  maybeClosePopover() {
    this.tooltip && (this.popoverElement.open = false);
  }
  selectLayout() {
    this.arcgisHubLayoutButtonSelect.emit(this.layout);
  }
  render() {
    return h(Host, { onMouseEnter: this.maybeOpenPopover, onMouseLeave: this.maybeClosePopover }, h("calcite-button", { appearance: this._appearance, "aria-current": this.selected, id: "toggle-button", kind: this._kind, label: this.tooltip || this.layout, onClick: this.selectLayout, scale: "l" }, h("calcite-icon", { icon: this.icon })), this.tooltip &&
      h("calcite-popover", { label: this.tooltip, placement: "bottom-end", ref: this.setPopoverElement, referenceElement: "toggle-button" }, h("div", { class: "popover-content" }, this.tooltip)));
  }
};
ArcgisHubLayoutButton.style = arcgisHubLayoutButtonCss;

const arcgisHubMapCss = ".sc-arcgis-hub-map-h{display:block}.esri-view.sc-arcgis-hub-map{height:inherit;width:inherit}";

// Fetches portal item info by item ID and sets
// global portalUrl
const getPortalItem = async (context, itemId) => {
  const { portalUrl } = context;
  esriConfig.portalUrl = portalUrl;
  // register token to access arcgis secure resources
  // invalid placeholder string tokens will prevent login prompt of no session exists
  const token = getProp(context, 'session.token') || 'invalidTokenString';
  const server = getProp(context, 'session.portal') || 'invalidServerString';
  esriId.registerToken({ token, server });
  // end secure resources
  const item = new PortalItem({
    id: itemId,
    portal: {
      url: portalUrl
    }
  });
  await item.load();
  return item;
};
// if you pass JSON returned from an API endpoint to new Graphic()
// or __esri.GraphicProperties to Graphic.fromJSON()
// the fn will not throw but the returned graphic will be missing
// whatever could not be parsed (i.e. symbol will be null)
// so we have to compare the input to the output to validate
const validateGraphicInstance = (input, output) => {
  // most of the format differences are in symbol definitions
  // or due to missing geometry type
  const isInvalid = (input.symbol && !output.symbol) || (input.geometry && !output.geometry);
  return !isInvalid;
};
const ArcgisHubMap = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubMapViewReady = createEvent(this, "arcgisHubMapViewReady", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.center = '0,0';
    this.zoom = 2;
    this.extent = undefined;
    this.expand = undefined;
    this.basemap = 'gray-vector';
    this.graphics = undefined;
    this.disablePinchZoomAndPanning = false;
    this.disableDoubleClickZoom = false;
    this.disableMouseWheelZoom = false;
    this.settings = undefined;
    bind(this, '_setContainer');
  }
  handleBasemapChanged(basemap) {
    this.map.basemap = Basemap.fromId(basemap);
  }
  handleCenterChanged(center) {
    this.center = center;
    const [longitude, latitude] = this.centerToCoords(center);
    this.view.center = Point.fromJSON({
      longitude,
      latitude
    });
  }
  handleGraphicsChanged(graphics) {
    // empty graphics layer and re-populate
    if (!this.isMapLoaded()) {
      return;
    }
    this.view.graphics.removeAll();
    if (graphics) {
      this.view.graphics.addMany(this.buildGraphics());
    }
  }
  handleExtentChanged() {
    if (!this.isMapLoaded()) {
      return;
    }
    this.setExtent();
  }
  handleDisablePinchZoomAndPanningChange() {
    if (this.disablePinchZoomAndPanning) {
      this.dragHandle = this.view.on("drag", this.stopEvtPropagation);
    }
    else {
      this.dragHandle.remove();
      this.dragHandle = null;
    }
  }
  handleDisableDoubleClickZoomChange() {
    if (this.disableDoubleClickZoom) {
      this.doubleClickHandle = this.view.on("double-click", this.stopEvtPropagation);
    }
    else {
      this.doubleClickHandle.remove();
      this.doubleClickHandle = null;
    }
  }
  handleDisableMouseWheelZoomChange() {
    if (this.disableMouseWheelZoom) {
      this.mouseWheelHandle = this.view.on("mouse-wheel", this.stopEvtPropagation);
    }
    else {
      this.mouseWheelHandle.remove();
      this.mouseWheelHandle = null;
    }
  }
  /**
   * If the settings change, re-setup the map
   */
  async handleSettingsChange(newSettings, oldSettings) {
    if (!deepEqual(newSettings, oldSettings)) {
      await this.setup();
    }
  }
  isMapLoaded() {
    return !!this.map;
  }
  centerToCoords(center) {
    return center.split(',').map(coord => +coord);
  }
  // This fn takes any of the above supported graphics formats
  // and returns a new Graphic instance
  createGraphic(object) {
    const graphicObject = object;
    let newGraphic = graphicObject.clone
      // this is an instance of the Graphic class, clone it
      ? graphicObject.clone()
      // assume this is a __esri.GraphicProperties
      : new Graphic(graphicObject);
    if (!validateGraphicInstance(graphicObject, newGraphic)) {
      // it was probably graphic JSON returned from server
      newGraphic = Graphic.fromJSON(graphicObject);
    }
    return newGraphic;
  }
  buildGraphics() {
    try {
      return this.graphics.filter(Boolean).map(g => this.createGraphic(g));
    }
    catch (err) {
      // if unable to parse graphics arr
      // return empty array
      return [];
    }
  }
  setExtent() {
    let extent = new Extent$1(this.extent);
    if (this.expand) {
      extent = extent.expand(this.expand);
    }
    this.view.extent = extent;
  }
  _setContainer(el) {
    this._container = el;
  }
  async componentDidLoad() {
    // Esri StyleSheet intelligent loading
    loadArcGisCss();
    await this.setup();
  }
  /**
   * Setup the map and view
   */
  async setup() {
    // Get base properties for view
    const getBaseViewProperties = (map) => {
      return {
        map,
        center: this.centerToCoords(this.center),
        zoom: this.zoom,
        ui: { components: [] }
      };
    };
    let map = new Map({
      basemap: Basemap.fromId(this.basemap)
    });
    let view = new MapView(getBaseViewProperties(map));
    // If we have a portal item from settings, attempt to load it
    const baseViewItemId = getProp(this.settings || {}, 'baseViewItemId[0]');
    if (baseViewItemId) {
      let portalItem;
      try {
        portalItem = await getPortalItem(this._context, baseViewItemId);
      }
      catch (error) {
        // in some scenarios, the portal item may not be found or inaccessible because
        // the user does not have access to the item.
        // in these cases, we should log a warning and continue with the default map
        console.warn(`WARNING: Unable to load portal item ${baseViewItemId}`);
      }
      if (portalItem) {
        const { type } = portalItem;
        const isScene = type === 'Web Scene';
        map = isScene
          ? new WebScene({ portalItem })
          : new WebMap({ portalItem });
        view = isScene
          ? new SceneView({
            map,
            environment: {
              lighting: {
                type: "virtual"
              }
            }
          })
          : new MapView(Object.assign(Object.assign({}, getBaseViewProperties(map)), { extent: portalItem.extent ? portalItem.extent : undefined }));
      }
    }
    // Set the container of the view.  This is done after the view is created
    // to avoid multiple renders of the view
    view.container = this._container;
    this.map = map;
    this.view = view;
    if (this.disablePinchZoomAndPanning) {
      this.dragHandle = this.view.on("drag", this.stopEvtPropagation);
    }
    if (this.disableDoubleClickZoom) {
      this.doubleClickHandle = this.view.on("double-click", this.stopEvtPropagation);
    }
    if (this.disableMouseWheelZoom) {
      this.mouseWheelHandle = this.view.on("mouse-wheel", this.stopEvtPropagation);
    }
    if (this.extent) {
      this.setExtent();
    }
    this.view.graphics.addMany(this.buildGraphics());
    this.addTelemetryWatchers();
    this.arcgisHubMapViewReady.emit({ view: this.view });
  }
  /**
   * Adds handlers for actions in the map view that should emit telemetry
   */
  addTelemetryWatchers() {
    // telemetry for popover opening
    on(() => this.view, "pointer-down", (event) => {
      // check to see if we hit the map and hit a graphic
      this.view.hitTest(event, { include: this.view.graphics }).then((results) => {
        var _a;
        // if we hit a result, then emit a popup telemetry event
        if ((_a = results === null || results === void 0 ? void 0 : results.results) === null || _a === void 0 ? void 0 : _a.length) {
          this.hubTelemetry.emit(dist.dictionary.category.interaction.action.open.label.popUp);
        }
      });
    });
    // popup closes
    watch(() => this.view.popup.visible, () => {
      if (!this.view.popup.visible && this.view.popup.selectedFeature) {
        this.hubTelemetry.emit(dist.dictionary.category.interaction.action.close.label.popUp);
      }
    });
    // telemetry for actions in popup
    on(() => this.view.popup, 'trigger-action', (evt) => {
      // if we have a zoom-to action triggered
      if (evt.action.id === 'zoom-to-feature') {
        // emit a telemetry event
        this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.zoom.label.to), { element: dist.constants.element.POPUP }));
      }
    });
  }
  stopEvtPropagation(event) {
    event.stopPropagation();
  }
  /**
   * Get the global context
   * @returns {IArcGISContext}
   */
  get _context() {
    return getGlobalContext();
  }
  render() {
    return (h(Host, { "data-element": "Map" }, h("div", { ref: this._setContainer })));
  }
  static get watchers() { return {
    "basemap": ["handleBasemapChanged"],
    "center": ["handleCenterChanged"],
    "graphics": ["handleGraphicsChanged"],
    "extent": ["handleExtentChanged"],
    "expand": ["handleExtentChanged"],
    "disablePinchZoomAndPanning": ["handleDisablePinchZoomAndPanningChange"],
    "disableDoubleClickZoom": ["handleDisableDoubleClickZoomChange"],
    "disableMouseWheelZoom": ["handleDisableMouseWheelZoomChange"],
    "settings": ["handleSettingsChange"]
  }; }
};
ArcgisHubMap.style = arcgisHubMapCss;

const arcgisHubMapFacetCss = ":host{display:block}arcgis-hub-map{height:18.5rem;width:100%}arcgis-hub-map .esri-ui-top-left{margin-top:-.375rem;margin-left:-.375rem}arcgis-hub-map .esri-ui-bottom-left{margin-left:-.375rem}.result-count{font-weight:var(--calcite-font-weight-medium);padding:.375rem}";

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const ArcgisHubMapFacet = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisMapFacetChange = createEvent(this, "arcgisMapFacetChange", 7);
    this.facet = undefined;
    this.resultsCount = undefined;
    this.view = undefined;
    this.shouldFilterByExtent = false;
    bind(this, 'toggleFilterOnExtent');
  }
  async componentWillLoad() {
    // TODO: create a decorator for this logic
    injectMapStyleSheet(this.element);
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  handleMapViewReady(event) {
    event.stopPropagation();
    const view = event.detail.view;
    view.when(() => {
      view.ui.components = [];
      // TODO: use `arcgis-hub-map-widget-search` instead of appending
      // the widget manually. This should be done once we've moved this
      // map out of the prototype phase
      const searchWidget = new Search({
        view: view,
        popupEnabled: false
      });
      view.ui.add(searchWidget, {
        position: "top-leading",
      });
      this.view = view;
      this.initializeMap();
    });
    watch(() => view.extent, () => this.shouldFilterByExtent && this.handleExtentChange());
  }
  handleFacetChange(oldFacet, newFacet) {
    const oldValue = bboxToString(oldFacet.value || []);
    const newValue = bboxToString(newFacet.value || []);
    if (oldValue !== newValue) {
      this.initializeMap();
    }
  }
  async initializeMap() {
    this.shouldFilterByExtent = !!this.facet.value;
    if (this.view && this._initialExtent) {
      await this.maybeLoadProjectionEngine();
      this.view.extent = this._initialExtent;
    }
  }
  get _initialExtent() {
    let result = null;
    const { value, extent } = this.facet;
    if (value) {
      result = new Extent(bBoxToExtent(value));
    }
    else if (extent) {
      result = new Extent(extent);
    }
    return result;
  }
  /**
   * Workaround for the idiosyncrasies of the JSAPI.
   *
   * If we want to Programmatically set the extent of the MapView using
   * a non-standard Spatial Reference (i.e, NOT WGS–84 or Web Mercator),
   * We need to manually load the Projection Engine.
   *
   * If the proper criteria are met and the engine has not yet been loaded,
   * this function will do so, otherwise it's a no-op.
   */
  async maybeLoadProjectionEngine() {
    const { spatialReference } = this._initialExtent;
    if (!spatialReference.isWGS84 && !spatialReference.isWebMercator) {
      return projection.isLoaded() || projection.load();
    }
  }
  handleExtentChange() {
    this.arcgisMapFacetChange.emit({ key: this.facet.key, value: this.bbox });
  }
  /**
   * Returns a bbox of the current map extent if the filter is toggled on,
   * otherwise null.
   */
  get bbox() {
    let result = null;
    if (this.shouldFilterByExtent && this.view.extent) {
      const geographicExtent = webMercatorToGeographic(this.view.extent);
      result = extentToBBox(geographicExtent);
    }
    return result;
  }
  get shouldShowResultCount() {
    return !isNaN(this.resultsCount);
  }
  toggleFilterOnExtent(evt) {
    this.shouldFilterByExtent = evt.detail;
    this.handleExtentChange();
  }
  render() {
    return (h(Host, { "data-element": "map-facet" }, h("arcgis-hub-map", { basemap: "gray-vector", expand: 1.5 }, this.shouldShowResultCount &&
      h("arcgis-hub-map-widget-container", { "expand-disabled": true, expanded: true, scale: "m", view: this.view, "view-position": "top-leading" }, h("div", { class: "result-count" }, " ", this.intl.t('resultsCount', { resultsCount: this.resultsCount }), " ")), h("arcgis-hub-map-widget-container", { "expand-disabled": true, expanded: true, scale: "m", view: this.view, "view-position": "bottom-leading" }, h("arcgis-hub-map-widget-checkbox", { checked: this.shouldFilterByExtent, onArcgisHubCheckboxWidgetClicked: this.toggleFilterOnExtent, scale: "m", text: this.intl.t('checkboxLabel') })), h("arcgis-hub-map-widget-container", { "expand-disabled": true, scale: "s", view: this.view, "view-position": "bottom-trailing" }, h("arcgis-hub-map-widget-zoom", { scale: "s", view: this.view })))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "facet": ["handleFacetChange"]
  }; }
};
__decorate([
  DebounceDecoratorFactory({ timeout: 250 })
], ArcgisHubMapFacet.prototype, "handleExtentChange", null);
ArcgisHubMapFacet.style = arcgisHubMapFacetCss;

const arcgisHubMapWidgetCheckboxCss = ":host{display:block;padding:.5rem;cursor:pointer}.checkbox-label{--calcite-label-margin-bottom:0}";

const ArcgisHubMapWidgetCheckbox = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubCheckboxWidgetClicked = createEvent(this, "arcgisHubCheckboxWidgetClicked", 7);
    this.scale = 'm';
    this.text = undefined;
    this.checked = false;
    bind(this, 'handleCheckboxChange');
  }
  get parentContainer() {
    const { el } = this;
    return el && el.closest('arcgis-hub-map-widget-container');
  }
  handleCheckboxChange(evt) {
    this.checked = evt.target.checked;
    this.arcgisHubCheckboxWidgetClicked.emit(this.checked);
  }
  render() {
    return this.parentContainer && (h("calcite-label", { class: "checkbox-label", layout: "inline", scale: this.scale }, h("calcite-checkbox", { checked: this.checked, onCalciteCheckboxChange: this.handleCheckboxChange, scale: this.scale }), this.text));
  }
  get el() { return getElement(this); }
};
ArcgisHubMapWidgetCheckbox.style = arcgisHubMapWidgetCheckboxCss;

const arcgisHubMapWidgetContainerCss = ":host{display:flex;justify-content:flex-end;--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host-context(div.esri-ui-inner-container.esri-ui-corner-container){box-shadow:none !important}";

const ArcgisHubMapWidgetContainer = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.expandDisabled = undefined;
    this.viewPosition = 'top-right';
    this.view = undefined;
    this.scale = 'm';
    this.expanded = undefined;
    bind(this, 'toggleExpanded');
  }
  get position() {
    return this.viewPosition.includes('right')
      ? 'end'
      : 'start';
  }
  componentWillLoad() {
    const { view, el, viewPosition } = this;
    if (view && view.ui) {
      view.ui.add(el, viewPosition);
    }
  }
  disconnectedCallback() {
    const { view, el } = this;
    if (view && view.ui) {
      view.ui.remove(el);
    }
  }
  addWidgetToView(view, prevView) {
    if (view && view.ui && view !== prevView) {
      this.view.ui.add(this.el, this.viewPosition);
    }
  }
  toggleExpanded() {
    this.expanded = !this.expanded;
  }
  render() {
    const { expandDisabled, expanded, position, scale } = this;
    return (h(Host, null, this.view && (h("calcite-action-pad", { expandDisabled: expandDisabled, expanded: expanded, onCalciteActionPadToggle: this.toggleExpanded, position: position, scale: scale }, h("slot", null)))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "view": ["addWidgetToView"]
  }; }
};
ArcgisHubMapWidgetContainer.style = arcgisHubMapWidgetContainerCss;

const arcgisHubMapWidgetGenericCss = ":host{display:block}";

const ArcgisHubMapWidgetGeneric = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubWidgetSelected = createEvent(this, "arcgisHubWidgetSelected", 7);
    this.active = undefined;
    this.disabled = undefined;
    this.icon = undefined;
    this.text = undefined;
    this.scale = 'm';
    this.textEnabled = undefined;
    this.expanded = undefined;
    this.visible = undefined;
    bind(this, 'emitSelected', 'updateExpanded');
  }
  get parentContainer() {
    const { el } = this;
    return el && el.closest('arcgis-hub-map-widget-container');
  }
  connectedCallback() {
    const { parentContainer } = this;
    if (parentContainer) {
      this.updateExpanded();
      parentContainer.addEventListener('calciteActionPadToggle', this.updateExpanded);
    }
  }
  disconnectedCallback() {
    const { parentContainer } = this;
    if (parentContainer) {
      parentContainer.removeEventListener('calciteActionPadToggle', this.updateExpanded);
    }
  }
  emitSelected() {
    this.arcgisHubWidgetSelected.emit();
  }
  updateExpanded() {
    var _a;
    this.expanded = (_a = this.parentContainer) === null || _a === void 0 ? void 0 : _a.expanded;
  }
  render() {
    const { active, disabled, icon, scale, text, expanded, textEnabled } = this;
    return (h(Host, null, this.parentContainer && (h("calcite-action", { active: active, disabled: disabled, icon: icon, onClick: this.emitSelected, scale: scale, text: text, textEnabled: textEnabled || expanded }))));
  }
  get el() { return getElement(this); }
};
ArcgisHubMapWidgetGeneric.style = arcgisHubMapWidgetGenericCss;

const arcgisHubMapWidgetZoomCss = "";

const ArcgisHubMapWidgetZoom = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.handles = [];
    this.view = undefined;
    this.scale = 'm';
    this.canZoomIn = undefined;
    this.canZoomOut = undefined;
    bind(this, 'zoomIn', 'zoomOut', 'updateCanZoomIn', 'updateCanZoomOut');
  }
  async componentWillLoad() {
    const { el } = this;
    this.intl = await intlManager.loadIntlForComponent(el);
    await this.connectViewModel();
    this.connectWatch();
    loadArcGisCss();
  }
  connectedCallback() {
    this.connectWatch();
  }
  disconnectedCallback() {
    this.removeWatch();
  }
  handleViewChange(view, prevView) {
    if (view && view !== prevView) {
      this.removeWatch();
      this.connectViewModel().then(() => {
        this.connectWatch();
      });
    }
  }
  connectWatch() {
    const { view, handles, zoomViewModel } = this;
    if (view && zoomViewModel) {
      handles.push(watch(() => zoomViewModel.canZoomIn, this.updateCanZoomIn), watch(() => zoomViewModel.canZoomOut, this.updateCanZoomOut));
    }
  }
  removeWatch() {
    const { handles } = this;
    handles.forEach((handle) => {
      handle.remove();
    });
    this.handles = [];
  }
  async connectViewModel() {
    const { view } = this;
    if (view) {
      await view.when();
      this.zoomViewModel = new ZoomViewModel({
        view: view
      });
      const { canZoomIn, canZoomOut } = this.zoomViewModel;
      this.canZoomIn = canZoomIn;
      this.canZoomOut = canZoomOut;
    }
  }
  updateCanZoomIn(value) {
    this.canZoomIn = value;
  }
  updateCanZoomOut(value) {
    this.canZoomOut = value;
  }
  zoomIn() {
    const { zoomViewModel, canZoomIn, view } = this;
    if (zoomViewModel && canZoomIn) {
      zoomViewModel.zoomIn();
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.zoom.label.in), { details: view.zoom }));
    }
  }
  zoomOut() {
    const { zoomViewModel, canZoomOut, view } = this;
    if (zoomViewModel && canZoomOut) {
      this.zoomViewModel.zoomOut();
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.zoom.label.out), { details: view.zoom }));
    }
  }
  render() {
    const { zoomIn, zoomOut, canZoomIn, canZoomOut, scale } = this;
    const textZoomIn = this.intl.t('zoomIn');
    const textZoomOut = this.intl.t('zoomOut');
    return (h(Host, { "data-element": "map-widget-zoom" }, h("arcgis-hub-map-widget-generic", { disabled: !canZoomIn, icon: 'plus', onClick: zoomIn, scale: scale, text: textZoomIn }), h("arcgis-hub-map-widget-generic", { disabled: !canZoomOut, icon: 'minus', onClick: zoomOut, scale: scale, text: textZoomOut })));
  }
  static get assetsDirs() { return ["locales"]; }
  get el() { return getElement(this); }
  static get watchers() { return {
    "view": ["handleViewChange"]
  }; }
};
ArcgisHubMapWidgetZoom.style = arcgisHubMapWidgetZoomCss;

const arcgisHubSearchSortCss = ":host{margin-bottom:1.25rem;display:flex;flex-direction:row;justify-content:flex-end;--calcite-font-size--1:var(--hub-gallery-font-size-large)}.sort-order{--calcite-font-size-0:var(--hub-gallery-font-size-large)}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}";

const ArcgisHubSearchSort = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubSearchSortChange = createEvent(this, "hubSearchSortChange", 7);
    this.sortOptions = [];
    this.activeSortOption = undefined;
    this.sortOrderIcon = undefined;
    bind(this, 'setDropdownEl', 'handleOrderChange');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  componentWillRender() {
    this.sortOrderIcon = this.activeSortOption.order === 'asc' ? "sort-ascending-arrow" : "sort-descending-arrow";
  }
  /**
   * Listen to the sort field dropdown change and fire the sort change fn with new activeSortOption
   */
  handleFieldChangeEvent() {
    const selectedItems = this.dropdownEl.selectedItems;
    if (selectedItems.length) {
      // Component is set to single-select mode, so there should only ever be one
      const selectedValue = selectedItems[0].dataset.value || null;
      this.activeSortOption = this.sortOptions.find(e => e.attribute === selectedValue);
      // Because we can only send one argument to hubSearchSortChange event,
      // we have to alternate the sort order in activeSortOption while keeping
      // the default orders there. So when sort field is changed,
      // we will reset the sort order to the default order here
      this.activeSortOption.order = SortDirection[this.activeSortOption.defaultOrder];
      this.hubSearchSortChange.emit(this.activeSortOption);
    }
  }
  setDropdownEl(el) {
    this.dropdownEl = el;
  }
  /**
   * Whenever sort order button is clicked, change the sort order and its icon, then
   * Fire the sort change fn with new activeSortOption
   */
  handleOrderChange() {
    this.activeSortOption.order = this.activeSortOption.order === "asc" ? "desc" : "asc";
    this.sortOrderIcon = this.activeSortOption.order === 'asc' ? "sort-ascending-arrow" : "sort-descending-arrow";
    this.hubSearchSortChange.emit(this.activeSortOption);
  }
  render() {
    var _a, _b;
    return (h(Host, null, h("calcite-dropdown", { ref: this.setDropdownEl }, h("calcite-button", { appearance: "transparent", "aria-label": this.intl.t('change-sort-order'), color: "blue", "data-test": "sort-attribute", "icon-end": "caret-down", slot: "trigger" }, h("span", { title: this.intl.t((_a = this.activeSortOption.attribute) !== null && _a !== void 0 ? _a : 'relevance') }, this.intl.t((_b = this.activeSortOption.attribute) !== null && _b !== void 0 ? _b : 'relevance'))), h("calcite-dropdown-group", { "selection-mode": "single" }, this.sortOptions.map(option => {
      var _a, _b, _c;
      return h("calcite-dropdown-item", { "aria-label": this.intl.t('sort-by') + this.intl.t((_a = option.attribute) !== null && _a !== void 0 ? _a : 'relevance'), "data-value": option.attribute, key: option.attribute, selected: this.activeSortOption.attribute === option.attribute, title: this.intl.t((_b = option.attribute) !== null && _b !== void 0 ? _b : 'relevance') }, this.intl.t((_c = option.attribute) !== null && _c !== void 0 ? _c : 'relevance'));
    }))), this.activeSortOption.order &&
      h("calcite-button", { appearance: "transparent", "aria-label": this.intl.t('sort-by') + this.intl.t(this.activeSortOption.order), class: "sort-order", color: "blue", "data-test": "sort-direction", "icon-end": this.sortOrderIcon, onClick: this.handleOrderChange, role: "button", title: this.intl.t(this.activeSortOption.order) })));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubSearchSort.style = arcgisHubSearchSortCss;

const arcgisHubTreeFacetCss = ":host{display:block}calcite-tree-item{--calcite-font-size--1:16px;--calcite-color-text-3:var(--calcite-color-text-1);padding-top:0.5rem}.option-label{overflow-wrap:anywhere;-webkit-hyphens:auto;hyphens:auto}.more-or-less-container{width:100%;display:flex;flex-direction:row-reverse;margin-top:0.5rem}";

const ArcgisHubTreeFacet = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubTreeFacetChange = createEvent(this, "arcgisHubTreeFacetChange", 7);
    this.arcgisHubFacetMoreLessClicked = createEvent(this, "arcgisHubFacetMoreLessClicked", 7);
    this.topLevelPageSize = 5;
    this.facet = undefined;
    this.showLimitedOptions = true;
    bind(this, 'toggleMoreOrLessButton', 'handleTreeSelect');
  }
  handleTreeSelect(event) {
    event.stopPropagation();
    // `event.target.selectedItems` gives us the set of ALL selected elements in the tree, meaning
    // we have to do some juggling to figure out which elements were selected (or
    // unselected) as part of this interaction
    const newSelectedKeys = event.target.selectedItems.map(e => e.dataset.key);
    // Exclude "unrecognized" keys from the calculus as they can only be unselected via a filter chip.
    // See the documentation for IFacetOption._unrecognized for more info.
    const oldSelectedKeys = this.facet.options.filter(o => o.selected && !o._unrecognized).map(o => o.key);
    const difference = getSelectionDifference(oldSelectedKeys, newSelectedKeys);
    // Product created the concept of a "Top-level Index" for telemetry purposes. Each
    // top-level option of the facet is assigned an index, and each descendant of that
    // option gets the same index. These indices are assigned at runtime and are appended
    // onto the option model.
    //
    // We assume that all changed options have the same top-level index, so we just
    // grab the value of the first one we can find. We're confident in this approach
    // since the only way to change multiple options at once is by clicking the checkbox
    // for a parent option, which selects the parent AND all its descendants
    const changedOption = this.facet.options.find(o => difference.keys.includes(o.key));
    const topLevelIndex = changedOption._telemetryIndex;
    this.arcgisHubTreeFacetChange.emit({
      key: this.facet.key,
      optionKeys: difference.keys,
      selected: difference.operation === 'added',
      topLevelIndex,
    });
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  get optionsAsTree() {
    // Prevent "unrecognized" options from rendering, as they are only displayed as a filter chip.
    // See the documentation for IFacetOption._unrecognized for more info.
    const visibleOptions = this.facet.options.filter(opt => !opt._unrecognized);
    return createTree(visibleOptions);
  }
  get numTopLevelOptions() {
    return getChildren(this.optionsAsTree).length;
  }
  get optionsLeftToDisplay() {
    return this.numTopLevelOptions - this.topLevelPageSize;
  }
  get moreOrLessButtonIconEnd() {
    return this.showLimitedOptions ? "chevron-down" : "chevron-up";
  }
  get moreOrLessButtonLabel() {
    return this.showLimitedOptions
      ? this.intl.t('showMore', { num: this.optionsLeftToDisplay })
      : this.intl.t('showLess');
  }
  toggleMoreOrLessButton() {
    // Emit event to notify consumers
    this.arcgisHubFacetMoreLessClicked.emit({
      facet: this.facet,
      isMore: this.showLimitedOptions
    });
    this.showLimitedOptions = !this.showLimitedOptions;
  }
  renderTopLevelOptions() {
    const allTopLevelOptions = getChildren(this.optionsAsTree).map((child, i) => renderSubtree(child, i));
    return this.showLimitedOptions
      ? allTopLevelOptions.slice(0, this.topLevelPageSize)
      : allTopLevelOptions;
  }
  renderMoreLessButton() {
    if (this.numTopLevelOptions > this.topLevelPageSize) {
      return h("div", { class: "more-or-less-container" }, h("calcite-button", { appearance: "transparent", color: "blue", "icon-end": this.moreOrLessButtonIconEnd, label: this.intl.t('moreOrLessButtonLabel', {
          moreOrLess: this.moreOrLessButtonLabel,
          label: this.facet.label
        }), onClick: this.toggleMoreOrLessButton }, this.moreOrLessButtonLabel));
    }
  }
  render() {
    return (h(Host, { "data-element": "tree-facet" }, h("div", null, h("calcite-tree", { onCalciteTreeSelect: this.handleTreeSelect, "selection-mode": "ancestors" }, this.renderTopLevelOptions()), this.renderMoreLessButton())));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubTreeFacet.style = arcgisHubTreeFacetCss;

export { ArcgisHubAddContent as arcgis_hub_add_content, ArcgisHubAddContentWorkflow as arcgis_hub_add_content_workflow, ArcgisHubAutoSuggest as arcgis_hub_auto_suggest, ArcgisHubAutoSuggestMatch as arcgis_hub_auto_suggest_match, ArcgisHubDateRangeFacet as arcgis_hub_date_range_facet, ArcgisHubFacetList as arcgis_hub_facet_list, ArcgisHubFacetOptions as arcgis_hub_facet_options, ArcgisHubGallery as arcgis_hub_gallery, ArcgisHubHelpState as arcgis_hub_help_state, ArcgisHubLayoutButton as arcgis_hub_layout_button, ArcgisHubMap as arcgis_hub_map, ArcgisHubMapFacet as arcgis_hub_map_facet, ArcgisHubMapWidgetCheckbox as arcgis_hub_map_widget_checkbox, ArcgisHubMapWidgetContainer as arcgis_hub_map_widget_container, ArcgisHubMapWidgetGeneric as arcgis_hub_map_widget_generic, ArcgisHubMapWidgetZoom as arcgis_hub_map_widget_zoom, ArcgisHubSearchSort as arcgis_hub_search_sort, ArcgisHubTreeFacet as arcgis_hub_tree_facet };
