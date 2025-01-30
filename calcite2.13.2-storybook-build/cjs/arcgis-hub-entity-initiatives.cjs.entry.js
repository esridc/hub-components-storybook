'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
const interpolateTranslations = require('./interpolate-translations-83c38ec8.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
const state = require('./state-6637df8c.js');
const index$1 = require('./index-6f16fe65.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
const getReferencedEntityIds = require('./getReferencedEntityIds-6e14c8eb.js');
const requestAssociation = require('./requestAssociation-4b93d346.js');
const util = require('./util-38e73510.js');
const getRequestingEntitiesQuery = require('./getRequestingEntitiesQuery-f51a983a.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const types = require('./types-435b0880.js');
require('./index-f4a4c954.js');
require('./interpolate-c1fe951a.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./store-2a385ca0.js');
require('./getAssociatedEntitiesQuery-cd1656fc.js');
require('./getTypeFromEntity-9476954e.js');
require('./get-family-cafa88bb.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./get-0368c931.js');
require('./tslib.es6-e7faa7f3.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./request-67da3c71.js');
require('./append-custom-params-0f5d0fe2.js');
require('./updateHubEntity-60b83b84.js');
require('./edit-3df37e35.js');
require('./tslib.es6-b6cfa7d7.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./search-2db68ef4.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./helpers-64227739.js');
require('./generate-random-string-8807d629.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');
require('./slugify-826af07b.js');
require('./HubError-44e07249.js');
require('./get-with-default-d1b1754d.js');
require('./OperationError-902f34ae.js');
require('./object-to-json-blob-5c0a267d.js');
require('./fail-safe-33c35b7f.js');
require('./delete-prop-7826ae49.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./get-form-json-e6831b20.js');
require('./HubInitiatives-25ecf40a.js');
require('./_enrichments-a40a3850.js');
require('./get-user-5eecc1c4.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getService-b27eda44.js');
require('./types-097b54b1.js');
require('./TemplateBusinessRules-5564c964.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./UserSession-f8bc10c8.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
require('./map-by-a7a75788.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
require('./hostedServiceUtils-236344a8.js');
require('./is-service-9b8238d2.js');
require('./_deep-map-values-d489006b.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./getDownloadFlow-94a34207.js');
require('./canUseHubDownloadSystem-5b330e55.js');
require('./index-ef80ab27.js');
require('./getDownloadConfiguration-1ed2582d.js');
require('./types-2810dd27.js');
require('./shouldShowDownloadsConfiguration-62f7f280.js');
require('./edit-fd85c003.js');
require('./settings-0b8cd93b.js');
require('./discussions-api-request-e9e6e346.js');
require('./request-79b61e92.js');
require('./edit-2b7ccc3f.js');
require('./getPropertyMap-030ec7b2.js');
require('./events-7873340d.js');
require('./types-751ad3a9.js');
require('./registrations-a6dd52b7.js');
require('./defaults-abee9bee.js');
require('./getDefaultEventDatesAndTimes-99ac0275.js');
require('./hubSearch-79d30702.js');
require('./merge-objects-b31af1a3.js');
require('./get-52661c13.js');
require('./search-b00c4c79.js');
require('./channels-bf478342.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');
require('./fetchHubEntity-88467d55.js');
require('./fetchContent-963f3885.js');
require('./getLayer-0c83b4c1.js');
require('./fetch-1292fb6b.js');
require('./unshare-item-with-group-05dbcf93.js');
require('./helpers-05252545.js');
require('./share-item-with-group-6c27286f.js');
require('./update-user-membership-4af88c1c.js');

/** type of entity being associated with */
const ASSOCIATION_TYPE = "initiative";
/**
 * Return the facets for the main associations gallery
 * @param intl - component intl
 * @returns {IFacet[]}
 */
const getAssociationsGalleryFacets = (intl) => {
  return [
    {
      label: intl.t("shared.facets.status.label"),
      key: 'status',
      operation: 'OR',
      display: 'multi-select',
      options: [
        {
          label: intl.t("shared.facets.status.notStarted"),
          key: 'notStarted',
          predicates: [{ typekeywords: 'status|notStarted' }],
          selected: false
        },
        {
          label: intl.t("shared.facets.status.inProgress"),
          key: 'inProgress',
          predicates: [{ typekeywords: 'status|inProgress' }],
          selected: false
        },
        {
          label: intl.t("shared.facets.status.onHold"),
          key: 'onHold',
          predicates: [{ typekeywords: 'status|onHold' }],
          selected: false
        },
        {
          label: intl.t("shared.facets.status.complete"),
          key: 'complete',
          predicates: [{ typekeywords: 'status|complete' }],
          selected: false
        }
      ]
    },
    {
      label: intl.t("shared.facets.tags.label"),
      key: 'tags',
      field: 'tags',
      aggLimit: 15,
      operation: 'OR',
      display: 'multi-select',
      options: []
    },
    {
      label: intl.t("shared.facets.access.label"),
      key: "access",
      display: "multi-select",
      field: "access",
      options: [],
      operation: "OR",
    }
  ];
};
/**
 * Return the facets for the request association(s)
 * gallery picker
 * @param intl - component intl
 * @returns {IFacet[]}
 */
const getRequestAssociationFacets = (intl) => {
  return getAssociationsGalleryFacets(intl).filter(facet => facet.key !== 'tags');
};
/**
 * Callback fn to pass into the main associations gallery
 * to modify the card view models
 *
 * @param model - card view model
 * @param _layout - card layout
 * @param _context - contextual portal & auth information
 * @param _result - raw search result
 * @returns {IHubCardViewModel}
 */
const associationsGalleryCallback = (model, _layout, _context, _result) => {
  // 1. Filter out tags and dateCreated from additionalInfo.
  // We do this so that all cards (regardless of if they have
  // a primary action or not) will show the same meta info.
  model.additionalInfo = model.additionalInfo
    .filter(info => !["tags", "dateCreated"].includes(info.i18nKey));
  return model;
};

const arcgisHubEntityInitiativesCss = ".entity-initiatives__request-association{display:flex;flex-direction:row;align-items:center;gap:1rem}";

const alertConfig = {
  noticeType: 'alert',
  autoClose: true,
  autoCloseDuration: 'fast',
  icon: true,
  kind: 'success',
};
const ArcgisHubEntityInitiatives = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    /**
     * Function to initialize the pane. Also gets called anytime
     * associations are accepted, canceled, or requested:
     *
     * 1. gets the number of initiatives the entity references
     * 2. gets the association state (associated, pending and requesting)
     * catalogs to populate the main gallery
     * 3. gets the catalogs to populate the "request association" picker
     */
    this.init = async () => {
      // 1. get the number of entities this entity references (via typeKeyword)
      this._referencedEntitiesCount = getReferencedEntityIds.getReferencedEntityIds(this.entity).length;
      // 2. get well-known association state catalogs to populate main gallery
      this._associationCatalogs = await Promise.all(["associated", "pending", "requesting"]
        .map(async (key) => {
        const catalog = await requestAssociation.getWellKnownAssociationsCatalog("associationsGallery", key, this.entity, ASSOCIATION_TYPE, this._context);
        return interpolateTranslations.interpolateTranslations(this.intl, catalog);
      }));
      // 3. get catalogs to populate the "request association" picker
      const catalogs = requestAssociation.getAvailableToRequestAssociationCatalogs("requestAssociation", this.entity, ASSOCIATION_TYPE, this._context, ["myContent", "organization", "community", "partners"]);
      this._availableToRequestCatalogs = catalogs.map(catalog => interpolateTranslations.interpolateTranslations(this.intl, catalog));
    };
    /**
     * because we wrap the arcgis-hub-gallery-picker in a wormhole, we
     * intercept its telemetry and re-emit it from this component so
     * we don't lose the DOM context
     */
    this.handleHubTelemetry = (evt) => {
      evt.stopPropagation();
      this.hubTelemetry.emit(evt.detail);
    };
    /** handler to update the active association state catalog */
    this.handleCatalogChange = (evt) => {
      const catalogKey = evt.detail;
      this._activeCatalogKey = util.camelize(catalogKey);
    };
    /** handler to open the "request association" picker */
    this.handlePickerOpen = () => {
      this._isPickerOpen = true;
    };
    /** handler to close the "request association" picker */
    this.handlePickerClose = () => {
      this._isPickerOpen = false;
    };
    /** handler to request associations with the selected initiatives */
    this.handlePickerSelectionUpdate = async (evt) => {
      const { item: initiativeIds } = evt.detail;
      const requestTelemetry = Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.update.label.association), { details: `Invite ${ASSOCIATION_TYPE}`, count: initiativeIds.length });
      try {
        let alreadyRequestingCount = 0;
        // 1. grab the ids of initiatives that have already requested
        // to associate with the entity
        const requestingEntityIds = await getRequestingEntitiesQuery.getRequestingEntitiesQuery(this.entity, ASSOCIATION_TYPE, this._context)
          .then(query => query ? getProp.getProp(query, "filters[0].predicates[0].id") || [] : []);
        // 2. iterate over and request association with the selected initiatives
        await Promise.all(initiativeIds.map(async (id) => {
          // keep track of outgoing initiative requests that have already sent
          // a reciprocal incoming request
          requestingEntityIds.includes(id) && alreadyRequestingCount++;
          return requestAssociation.requestAssociation(this.entity, ASSOCIATION_TYPE, id, this._context);
        }));
        // 3. re-initialize the pane to update the gallery
        await this.init();
        // 4. trigger an alert to let the user know how many requests were sent
        const noticeConfig = alreadyRequestingCount
          ? {
            title: this.intl.t("requestAssociation.alreadyRequesting.title"),
            message: this.intl.t("requestAssociation.alreadyRequesting.message", { count: initiativeIds.length - alreadyRequestingCount }),
            configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'brand', label: this.intl.t('notice.label') })
          }
          : {
            title: this.intl.t("requestAssociation.success.title"),
            message: this.intl.t("requestAssociation.success.message", { count: initiativeIds.length }),
            configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'success', label: this.intl.t('notice.label') })
          };
        state.showNotice(noticeConfig);
        // 5. emit success telemetry
        this.hubTelemetry.emit(Object.assign(Object.assign({}, requestTelemetry), { response: index$1.dist.constants.response.SUCCESS }));
      }
      catch (error) {
        // 1. trigger an alert to let the user know their request(s) failed
        state.showNotice({
          title: this.intl.t("shared.error.title"),
          message: this.intl.t("shared.error.message"),
          configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
        });
        // 2. emit failure telemetry
        this.hubTelemetry.emit(Object.assign(Object.assign({}, requestTelemetry), { response: index$1.dist.constants.response.FAILURE }));
      }
    };
    this.entity = undefined;
    this._activeCatalogKey = "associated";
    this._associationCatalogs = undefined;
    this._isPickerOpen = undefined;
  }
  async handleGalleryAction(evt) {
    const { action, model } = evt.detail;
    if (action === "accept") {
      const acceptTelemetry = Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.update.label.association), { details: `Add ${ASSOCIATION_TYPE}` });
      try {
        await requestAssociation.requestAssociation(this.entity, ASSOCIATION_TYPE, model.id, this._context);
        await this.init();
        state.showNotice({
          title: this.intl.t("acceptAssociation.success.title"),
          message: this.intl.t("acceptAssociation.success.message", { requestor: model.title }),
          configuration: Object.assign(Object.assign({}, alertConfig), { label: this.intl.t('notice.label') })
        });
        this.hubTelemetry.emit(Object.assign(Object.assign({}, acceptTelemetry), { response: index$1.dist.constants.response.SUCCESS }));
      }
      catch (error) {
        state.showNotice({
          title: this.intl.t("shared.error.title"),
          message: this.intl.t("shared.error.message"),
          configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
        });
        this.hubTelemetry.emit(Object.assign(Object.assign({}, acceptTelemetry), { response: index$1.dist.constants.response.FAILURE }));
      }
    }
    else if (action === "break") {
      const breakTelemetry = Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.update.label.association), { details: `${this._activeCatalogKey === "associated" ? "Remove" : "Cancel"} ${ASSOCIATION_TYPE}` });
      try {
        await requestAssociation.breakAssociation(this.entity, ASSOCIATION_TYPE, model.id, this._context);
        await this.init();
        const i18nKey = this._activeCatalogKey === "associated" ? "breakAssociation" : "cancelRequest";
        const autoCloseDuration = this._activeCatalogKey === "associated" ? "slow" : "fast";
        state.showNotice({
          title: this.intl.t(`${i18nKey}.success.title`),
          message: this.intl.t(`${i18nKey}.success.message`),
          configuration: Object.assign(Object.assign({}, alertConfig), { autoCloseDuration, kind: this._activeCatalogKey === "associated" ? "brand" : "success", label: this.intl.t('notice.label') })
        });
        this.hubTelemetry.emit(Object.assign(Object.assign({}, breakTelemetry), { response: index$1.dist.constants.response.SUCCESS }));
      }
      catch (error) {
        state.showNotice({
          title: this.intl.t("shared.error.title"),
          message: this.intl.t("shared.error.message"),
          configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
        });
        this.hubTelemetry.emit(Object.assign(Object.assign({}, breakTelemetry), { response: index$1.dist.constants.response.FAILURE }));
      }
    }
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    this.init();
  }
  /** contextual auth and portal information */
  get _context() { return state.getGlobalContext(); }
  /**
   * Whether the total number of referenced initiatives >= 50.
   * If there are more than 50 referenced initiatives, we do
   * not allow the user to request additional associations
   * or accept incoming requests.
   */
  get _isAssociationLimitReached() {
    return this._referencedEntitiesCount >= types.ASSOCIATION_REFERENCE_LIMIT;
  }
  /** gallery card actions for the active catalog */
  get _actionLinks() {
    let _actionLinks = [];
    _actionLinks = this._activeCatalogKey === "incomingRequests"
      ? [Object.assign({ action: 'accept', buttonStyle: 'solid', disabled: this._isAssociationLimitReached, label: this.intl.t("acceptAssociation.label"), showLabel: true }, (this._isAssociationLimitReached && { tooltip: this.intl.t("acceptAssociation.limitReachedTooltip") }))]
      : [
        {},
        {
          action: 'break',
          label: this._activeCatalogKey === "associated"
            ? this.intl.t("breakAssociation.label")
            : this.intl.t("cancelRequest.label"),
          showLabel: true
        }
      ];
    return _actionLinks;
  }
  /** renders the "request association" button + picker experience */
  renderRequestAssociation() {
    return (index.h("div", { class: "entity-initiatives__request-association", slot: "primary-actions" }, this.renderRequestAssociationButton(), this.renderRequestAssociationCount(), this._isPickerOpen && index.h("arcgis-wormhole", { elAttributes: { unthemed: '' } }, index.h("arcgis-hub-gallery-picker", { catalogs: this._availableToRequestCatalogs, facets: getRequestAssociationFacets(this.intl), limit: types.ASSOCIATION_REFERENCE_LIMIT - this._referencedEntitiesCount, linkTarget: "siteRelative", modalTitle: this.intl.t('requestAssociation.findInitiatives'), onArcgisHubGalleryPickerClose: this.handlePickerClose, onArcgisHubGalleryPickerSelectionUpdate: this.handlePickerSelectionUpdate, onHubTelemetry: this.handleHubTelemetry, open: this._isPickerOpen, primaryButtonLabel: this.intl.t('requestAssociation.sendRequest'), showSearch: true }))));
  }
  /** renders the "request association" button.
   * If the association limit is reached, we render a tooltip as well.
   */
  renderRequestAssociationButton() {
    const button = (index.h("calcite-button", { appearance: "solid", disabled: this._isAssociationLimitReached, onClick: this.handlePickerOpen, round: true }, this.intl.t('requestAssociation.findInitiatives')));
    return (this._isAssociationLimitReached
      ?
        index.h("arcgis-ref-tooltip", { placement: "top", text: this.intl.t("shared.requestAssociationCount.tooltip") }, button)
      :
        button);
  }
  /**
   * renders the main gallery with association state (associated,
   * pending = "outgoing", requesting = "incoming") source facets
   */
  renderAssociationsGallery() {
    return (index.h("arcgis-hub-catalog", { callback: associationsGalleryCallback, cardActionLinks: this._actionLinks, catalogs: this._associationCatalogs, facets: getAssociationsGalleryFacets(this.intl), linkTarget: "siteRelative", onArcgisHubCatalogActiveCatalogChange: this.handleCatalogChange, ref: (el) => { this._catalogEl = el; }, showSearch: true, showThumbnail: true, sourceLabel: this.intl.t("associationsGallery.sources") }));
  }
  /** renders the current association count + outgoing request count */
  renderRequestAssociationCount() {
    const kind = this._isAssociationLimitReached ? "warning" : "info";
    const icon = this._isAssociationLimitReached ? "exclamation-mark-triangle" : "";
    return (index.h("div", null, index.h("calcite-notice", { icon: icon, kind: kind, open: true, scale: "s" }, index.h("div", { slot: "title" }, this.intl.t("shared.requestAssociationCount.label", {
      currentConfirmedAndOutgoingRequests: this._referencedEntitiesCount,
      maxCurrentAndOutgoingRequestsAllowed: types.ASSOCIATION_REFERENCE_LIMIT
    })))));
  }
  render() {
    var _a;
    return (index.h(index.Host, { "data-element": "entity-initiatives" }, index.h("arcgis-hub-workspace-pane", null, index.h("h1", { slot: "title" }, this.intl.t('initiatives')), index.h("div", null, index.h("span", null, this.intl.t("description")), this.renderRequestAssociation(), ((_a = this._associationCatalogs) === null || _a === void 0 ? void 0 : _a.length) && this.renderAssociationsGallery()))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubEntityInitiatives.style = arcgisHubEntityInitiativesCss;

exports.arcgis_hub_entity_initiatives = ArcgisHubEntityInitiatives;
