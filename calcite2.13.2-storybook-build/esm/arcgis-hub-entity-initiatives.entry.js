import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import { i as interpolateTranslations } from './interpolate-translations-f9ad4891.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import { d as showNotice, g as getGlobalContext } from './state-31a09db0.js';
import { d as dist } from './index-dd3f99ac.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { g as getReferencedEntityIds } from './getReferencedEntityIds-265ddcf1.js';
import { g as getWellKnownAssociationsCatalog, a as getAvailableToRequestAssociationCatalogs, r as requestAssociation, b as breakAssociation } from './requestAssociation-74404ad8.js';
import { d as camelize } from './util-3e6872d9.js';
import { g as getRequestingEntitiesQuery } from './getRequestingEntitiesQuery-e8399fe2.js';
import { g as getProp } from './get-prop-ec5be510.js';
import { A as ASSOCIATION_REFERENCE_LIMIT } from './types-83bbabfd.js';
import './index-213c70d0.js';
import './interpolate-d39d6151.js';
import './_commonjsHelpers-11ca3be1.js';
import './store-0a6cb79f.js';
import './getAssociatedEntitiesQuery-a2536649.js';
import './getTypeFromEntity-e149b61e.js';
import './get-family-543fac52.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './request-fa80ae40.js';
import './append-custom-params-4bd856e5.js';
import './updateHubEntity-c9ae958c.js';
import './edit-237c0a70.js';
import './tslib.es6-9c17e83a.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './search-c7a57aa9.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './helpers-8c7e5e31.js';
import './generate-random-string-1436d9e6.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
import './slugify-e3e67bac.js';
import './HubError-e26c5610.js';
import './get-with-default-b819d95d.js';
import './OperationError-387ae9ab.js';
import './object-to-json-blob-583ae5c3.js';
import './fail-safe-cd1a5a2a.js';
import './delete-prop-bd13d424.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './get-form-json-1d4e3591.js';
import './HubInitiatives-4f4e24ce.js';
import './_enrichments-8641475c.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './types-2eaa1a18.js';
import './TemplateBusinessRules-0e35d61b.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './map-by-a2234e13.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
import './hostedServiceUtils-f22b023b.js';
import './is-service-ad021db8.js';
import './_deep-map-values-53f8dbd1.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './getDownloadFlow-6c6d04d5.js';
import './canUseHubDownloadSystem-a22afbb9.js';
import './index-edff2d62.js';
import './getDownloadConfiguration-6cb6d32f.js';
import './types-303cd4d6.js';
import './shouldShowDownloadsConfiguration-385c6ff6.js';
import './edit-9f487804.js';
import './settings-2d4e159a.js';
import './discussions-api-request-199cae2d.js';
import './request-3e386aeb.js';
import './edit-fa9666f2.js';
import './getPropertyMap-10ee9d61.js';
import './events-c59246f8.js';
import './types-db540898.js';
import './registrations-431b9788.js';
import './defaults-1f93a79e.js';
import './getDefaultEventDatesAndTimes-4847a519.js';
import './hubSearch-41612481.js';
import './merge-objects-5b123ab3.js';
import './get-850c466d.js';
import './search-211dee83.js';
import './channels-2574fd6e.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';
import './fetchHubEntity-28d04ab4.js';
import './fetchContent-dbc662af.js';
import './getLayer-464ff70e.js';
import './fetch-63549ae7.js';
import './unshare-item-with-group-b4a3a08f.js';
import './helpers-6692d307.js';
import './share-item-with-group-5711513b.js';
import './update-user-membership-261681cf.js';

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
    registerInstance(this, hostRef);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
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
      this._referencedEntitiesCount = getReferencedEntityIds(this.entity).length;
      // 2. get well-known association state catalogs to populate main gallery
      this._associationCatalogs = await Promise.all(["associated", "pending", "requesting"]
        .map(async (key) => {
        const catalog = await getWellKnownAssociationsCatalog("associationsGallery", key, this.entity, ASSOCIATION_TYPE, this._context);
        return interpolateTranslations(this.intl, catalog);
      }));
      // 3. get catalogs to populate the "request association" picker
      const catalogs = getAvailableToRequestAssociationCatalogs("requestAssociation", this.entity, ASSOCIATION_TYPE, this._context, ["myContent", "organization", "community", "partners"]);
      this._availableToRequestCatalogs = catalogs.map(catalog => interpolateTranslations(this.intl, catalog));
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
      this._activeCatalogKey = camelize(catalogKey);
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
      const requestTelemetry = Object.assign(Object.assign({}, dist.dictionary.category.content.action.update.label.association), { details: `Invite ${ASSOCIATION_TYPE}`, count: initiativeIds.length });
      try {
        let alreadyRequestingCount = 0;
        // 1. grab the ids of initiatives that have already requested
        // to associate with the entity
        const requestingEntityIds = await getRequestingEntitiesQuery(this.entity, ASSOCIATION_TYPE, this._context)
          .then(query => query ? getProp(query, "filters[0].predicates[0].id") || [] : []);
        // 2. iterate over and request association with the selected initiatives
        await Promise.all(initiativeIds.map(async (id) => {
          // keep track of outgoing initiative requests that have already sent
          // a reciprocal incoming request
          requestingEntityIds.includes(id) && alreadyRequestingCount++;
          return requestAssociation(this.entity, ASSOCIATION_TYPE, id, this._context);
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
        showNotice(noticeConfig);
        // 5. emit success telemetry
        this.hubTelemetry.emit(Object.assign(Object.assign({}, requestTelemetry), { response: dist.constants.response.SUCCESS }));
      }
      catch (error) {
        // 1. trigger an alert to let the user know their request(s) failed
        showNotice({
          title: this.intl.t("shared.error.title"),
          message: this.intl.t("shared.error.message"),
          configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
        });
        // 2. emit failure telemetry
        this.hubTelemetry.emit(Object.assign(Object.assign({}, requestTelemetry), { response: dist.constants.response.FAILURE }));
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
      const acceptTelemetry = Object.assign(Object.assign({}, dist.dictionary.category.content.action.update.label.association), { details: `Add ${ASSOCIATION_TYPE}` });
      try {
        await requestAssociation(this.entity, ASSOCIATION_TYPE, model.id, this._context);
        await this.init();
        showNotice({
          title: this.intl.t("acceptAssociation.success.title"),
          message: this.intl.t("acceptAssociation.success.message", { requestor: model.title }),
          configuration: Object.assign(Object.assign({}, alertConfig), { label: this.intl.t('notice.label') })
        });
        this.hubTelemetry.emit(Object.assign(Object.assign({}, acceptTelemetry), { response: dist.constants.response.SUCCESS }));
      }
      catch (error) {
        showNotice({
          title: this.intl.t("shared.error.title"),
          message: this.intl.t("shared.error.message"),
          configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
        });
        this.hubTelemetry.emit(Object.assign(Object.assign({}, acceptTelemetry), { response: dist.constants.response.FAILURE }));
      }
    }
    else if (action === "break") {
      const breakTelemetry = Object.assign(Object.assign({}, dist.dictionary.category.content.action.update.label.association), { details: `${this._activeCatalogKey === "associated" ? "Remove" : "Cancel"} ${ASSOCIATION_TYPE}` });
      try {
        await breakAssociation(this.entity, ASSOCIATION_TYPE, model.id, this._context);
        await this.init();
        const i18nKey = this._activeCatalogKey === "associated" ? "breakAssociation" : "cancelRequest";
        const autoCloseDuration = this._activeCatalogKey === "associated" ? "slow" : "fast";
        showNotice({
          title: this.intl.t(`${i18nKey}.success.title`),
          message: this.intl.t(`${i18nKey}.success.message`),
          configuration: Object.assign(Object.assign({}, alertConfig), { autoCloseDuration, kind: this._activeCatalogKey === "associated" ? "brand" : "success", label: this.intl.t('notice.label') })
        });
        this.hubTelemetry.emit(Object.assign(Object.assign({}, breakTelemetry), { response: dist.constants.response.SUCCESS }));
      }
      catch (error) {
        showNotice({
          title: this.intl.t("shared.error.title"),
          message: this.intl.t("shared.error.message"),
          configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
        });
        this.hubTelemetry.emit(Object.assign(Object.assign({}, breakTelemetry), { response: dist.constants.response.FAILURE }));
      }
    }
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.init();
  }
  /** contextual auth and portal information */
  get _context() { return getGlobalContext(); }
  /**
   * Whether the total number of referenced initiatives >= 50.
   * If there are more than 50 referenced initiatives, we do
   * not allow the user to request additional associations
   * or accept incoming requests.
   */
  get _isAssociationLimitReached() {
    return this._referencedEntitiesCount >= ASSOCIATION_REFERENCE_LIMIT;
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
    return (h("div", { class: "entity-initiatives__request-association", slot: "primary-actions" }, this.renderRequestAssociationButton(), this.renderRequestAssociationCount(), this._isPickerOpen && h("arcgis-wormhole", { elAttributes: { unthemed: '' } }, h("arcgis-hub-gallery-picker", { catalogs: this._availableToRequestCatalogs, facets: getRequestAssociationFacets(this.intl), limit: ASSOCIATION_REFERENCE_LIMIT - this._referencedEntitiesCount, linkTarget: "siteRelative", modalTitle: this.intl.t('requestAssociation.findInitiatives'), onArcgisHubGalleryPickerClose: this.handlePickerClose, onArcgisHubGalleryPickerSelectionUpdate: this.handlePickerSelectionUpdate, onHubTelemetry: this.handleHubTelemetry, open: this._isPickerOpen, primaryButtonLabel: this.intl.t('requestAssociation.sendRequest'), showSearch: true }))));
  }
  /** renders the "request association" button.
   * If the association limit is reached, we render a tooltip as well.
   */
  renderRequestAssociationButton() {
    const button = (h("calcite-button", { appearance: "solid", disabled: this._isAssociationLimitReached, onClick: this.handlePickerOpen, round: true }, this.intl.t('requestAssociation.findInitiatives')));
    return (this._isAssociationLimitReached
      ?
        h("arcgis-ref-tooltip", { placement: "top", text: this.intl.t("shared.requestAssociationCount.tooltip") }, button)
      :
        button);
  }
  /**
   * renders the main gallery with association state (associated,
   * pending = "outgoing", requesting = "incoming") source facets
   */
  renderAssociationsGallery() {
    return (h("arcgis-hub-catalog", { callback: associationsGalleryCallback, cardActionLinks: this._actionLinks, catalogs: this._associationCatalogs, facets: getAssociationsGalleryFacets(this.intl), linkTarget: "siteRelative", onArcgisHubCatalogActiveCatalogChange: this.handleCatalogChange, ref: (el) => { this._catalogEl = el; }, showSearch: true, showThumbnail: true, sourceLabel: this.intl.t("associationsGallery.sources") }));
  }
  /** renders the current association count + outgoing request count */
  renderRequestAssociationCount() {
    const kind = this._isAssociationLimitReached ? "warning" : "info";
    const icon = this._isAssociationLimitReached ? "exclamation-mark-triangle" : "";
    return (h("div", null, h("calcite-notice", { icon: icon, kind: kind, open: true, scale: "s" }, h("div", { slot: "title" }, this.intl.t("shared.requestAssociationCount.label", {
      currentConfirmedAndOutgoingRequests: this._referencedEntitiesCount,
      maxCurrentAndOutgoingRequestsAllowed: ASSOCIATION_REFERENCE_LIMIT
    })))));
  }
  render() {
    var _a;
    return (h(Host, { "data-element": "entity-initiatives" }, h("arcgis-hub-workspace-pane", null, h("h1", { slot: "title" }, this.intl.t('initiatives')), h("div", null, h("span", null, this.intl.t("description")), this.renderRequestAssociation(), ((_a = this._associationCatalogs) === null || _a === void 0 ? void 0 : _a.length) && this.renderAssociationsGallery()))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubEntityInitiatives.style = arcgisHubEntityInitiativesCss;

export { ArcgisHubEntityInitiatives as arcgis_hub_entity_initiatives };
