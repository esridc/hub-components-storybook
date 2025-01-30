import { h, Host } from "@stencil/core";
import intlManager from "../../../utils/intl-manager";
import { getGlobalContext, interpolateTranslations, showNotice } from "../../../utils";
import { ASSOCIATION_TYPE, associationsGalleryCallback, getAssociationsGalleryFacets, getRequestAssociationFacets } from "./resources";
import { dictionary, constants } from '@esri/telemetry-dictionary-hub';
import { getWellKnownAssociationsCatalog, getAvailableToRequestAssociationCatalogs, camelize, requestAssociation, getReferencedEntityIds, ASSOCIATION_REFERENCE_LIMIT, breakAssociation, acceptAssociation, getRequestingEntitiesQuery, getProp } from "@esri/hub-common";
const alertConfig = {
  noticeType: 'alert',
  autoClose: true,
  autoCloseDuration: 'fast',
  icon: true,
  kind: 'success',
};
export class ArcgisHubEntityInitiatives {
  constructor() {
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
      const requestTelemetry = Object.assign(Object.assign({}, dictionary.category.content.action.update.label.association), { details: `Invite ${ASSOCIATION_TYPE}`, count: initiativeIds.length });
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
        this.hubTelemetry.emit(Object.assign(Object.assign({}, requestTelemetry), { response: constants.response.SUCCESS }));
      }
      catch (error) {
        // 1. trigger an alert to let the user know their request(s) failed
        showNotice({
          title: this.intl.t("shared.error.title"),
          message: this.intl.t("shared.error.message"),
          configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
        });
        // 2. emit failure telemetry
        this.hubTelemetry.emit(Object.assign(Object.assign({}, requestTelemetry), { response: constants.response.FAILURE }));
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
      const acceptTelemetry = Object.assign(Object.assign({}, dictionary.category.content.action.update.label.association), { details: `Add ${ASSOCIATION_TYPE}` });
      try {
        await acceptAssociation(this.entity, ASSOCIATION_TYPE, model.id, this._context);
        await this.init();
        showNotice({
          title: this.intl.t("acceptAssociation.success.title"),
          message: this.intl.t("acceptAssociation.success.message", { requestor: model.title }),
          configuration: Object.assign(Object.assign({}, alertConfig), { label: this.intl.t('notice.label') })
        });
        this.hubTelemetry.emit(Object.assign(Object.assign({}, acceptTelemetry), { response: constants.response.SUCCESS }));
      }
      catch (error) {
        showNotice({
          title: this.intl.t("shared.error.title"),
          message: this.intl.t("shared.error.message"),
          configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
        });
        this.hubTelemetry.emit(Object.assign(Object.assign({}, acceptTelemetry), { response: constants.response.FAILURE }));
      }
    }
    else if (action === "break") {
      const breakTelemetry = Object.assign(Object.assign({}, dictionary.category.content.action.update.label.association), { details: `${this._activeCatalogKey === "associated" ? "Remove" : "Cancel"} ${ASSOCIATION_TYPE}` });
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
        this.hubTelemetry.emit(Object.assign(Object.assign({}, breakTelemetry), { response: constants.response.SUCCESS }));
      }
      catch (error) {
        showNotice({
          title: this.intl.t("shared.error.title"),
          message: this.intl.t("shared.error.message"),
          configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
        });
        this.hubTelemetry.emit(Object.assign(Object.assign({}, breakTelemetry), { response: constants.response.FAILURE }));
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
  static get is() { return "arcgis-hub-entity-initiatives"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-initiatives.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-initiatives.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "entity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "HubEntity",
          "resolved": "IHubDiscussion | IHubEvent | IHubGroup | IHubInitiative | IHubPage | IHubProject | IHubSite | IHubSurvey | IHubTemplate | IHubUser",
          "references": {
            "HubEntity": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Hub entity"
        }
      }
    };
  }
  static get states() {
    return {
      "_activeCatalogKey": {},
      "_associationCatalogs": {},
      "_isPickerOpen": {}
    };
  }
  static get events() {
    return [{
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "* Emits telemetry information"
        },
        "complexType": {
          "original": "Record<string, any>",
          "resolved": "{ [x: string]: any; }",
          "references": {
            "Record": {
              "location": "global"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get listeners() {
    return [{
        "name": "arcgisHubGalleryAction",
        "method": "handleGalleryAction",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
