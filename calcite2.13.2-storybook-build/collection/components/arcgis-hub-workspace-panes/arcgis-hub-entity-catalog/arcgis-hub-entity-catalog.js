var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Host, h } from '@stencil/core';
import { cloneObject, getTypeFromEntity, updateHubEntity } from '@esri/hub-common';
import intlManager from '../../../utils/intl-manager';
import { catalogBuilderSchema, getCatalogBuilderUiSchema } from './schemas';
import { getGlobalContext, showNotice } from '../../../utils';
import { CatalogPanels, QUERY_SIZE_MAXIMUM_LIMIT, QUERY_SIZE_WARNING_LIMIT, initializeQuerySizes, removeQuerySizes, updateTargetEntityQuerySizes } from './resources';
import { WELL_KNOWN_FACET_TYPES } from '../../arcgis-hub-gallery/utils/facets';
import { bind } from '../../../utils/context';
import Memoize from '../../../decorators/memoize';
import { dictionary } from '@esri/telemetry-dictionary-hub';
export class ArcgisHubEntityCatalog {
  constructor() {
    /**
     * A callback to get the ref to the calcite flow. This allows us
     * to pass the flow into the uiSchema for the collections editor,
     * which will allow us to open the collections editor in a third
     * level of flow.
     *
     * NOTE: we use a function to get the ref rather than passing the ref itself
     * because the configuration editor will wipe an html reference when loading (in cloning the object)
     */
    this.getCalciteFlowRef = () => {
      return this._calciteFlowRef;
    };
    /**
     * Called when collections are removed from the catalog.
     * This is used to remove the query sizes of the removed collections
     * @param collectionKeys
     */
    this.handleCollectionsRemoved = (collectionKeys) => {
      // remove those query sizes from our internal state
      this._currentQuerySizes = removeQuerySizes(this._currentQuerySizes, collectionKeys);
    };
    /**
     * Called when the catalog scope is changed in the catalog builder.
     * This is used to recalculate the query sizes of the target entity's scope
     * and all of its collections
     * @param query
     * @param targetEntity
     */
    this.handleCatalogScopeChange = (query, targetEntity) => {
      var _a;
      // create a new scopes object to calculate with to avoid interrupting the cycle of configuration editor updates
      const scopes = cloneObject(this._catalog.scopes) || {};
      scopes[targetEntity] = query;
      // recalculate query sizes for this target entity's scope and all of its collections only
      this._currentQuerySizes = updateTargetEntityQuerySizes(this._currentQuerySizes, (_a = this._catalog) === null || _a === void 0 ? void 0 : _a.collections, targetEntity, query);
    };
    /**
     * wrapper around the built-in intl.t function that
     * encapsulates the translation strings from this
     * component to pass into the configuration editor
     */
    this.translationFunc = (key, values, opts) => {
      return this._intl.t(key, values, opts);
    };
    /**
     * Closes all open panels and sets focus back onto the action button that opened the panel
     */
    this.collapseAllPanels = () => {
      // set focus back onto the action button that opened the panel
      if (this._isConfigurationPanelOpen && this._configureCatalogButtonRef && this._configureCatalogButtonRef.setFocus) {
        this._configureCatalogButtonRef.setFocus();
      }
      // remove the active panel and its ref
      this._isConfigurationPanelOpen = false;
    };
    /**
     * Toggles the active panel
     * @param evt
     */
    this.toggleActivePanel = () => {
      this._isConfigurationPanelOpen = !this._isConfigurationPanelOpen;
      // emit telemetry
      if (this._isConfigurationPanelOpen) {
        this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary
          .category.interaction
          .action.open.label[`${this._targetEntity}s`]), { details: `Catalog configuration`, type: this.entity.type }));
      }
      // set focus onto the panel
      if (this._activePanelRef && this._activePanelRef.setFocus) {
        this._activePanelRef.setFocus();
      }
    };
    /**
     * Sets the ref to the currently shown calcite panel. Also sets focus on it
     * if it was just opened.
     * @param panel
     */
    this.setPanelRef = (panel) => {
      if (panel && panel.setFocus) {
        this._activePanelRef = panel;
        panel.setFocus();
      }
    };
    /**
     * Sets the ref of the configure catalog button so that we can set focus on it later.
     * @param action
    */
    this.setConfigureButtonRef = (button) => {
      if (button) {
        this._configureCatalogButtonRef = button;
      }
    };
    /**
     * Sets the ref of the calcite flow in the panel.
     * @param flow
     */
    this.setCalciteFlowRef = (flow) => {
      if (flow) {
        this._calciteFlowRef = flow;
      }
    };
    /**
     * Sets the key of the collection that is currently in view on the catalog
     * @param evt
     */
    this.setRenderedCollectionKey = (evt) => {
      this._renderedCollectionKey = evt.detail;
    };
    /**
     * Handles the change event emitted by the configuration form
     * @param evt
     */
    this.handleCatalogChange = (evt) => {
      const { values, isValid } = evt.detail;
      isValid && (this._catalog = values['catalog']);
      // notify the parent workspace that the entity has been
      // updated - this sets the dirty state so that if a user
      // attempts to navigate away, they will be notified that
      // they have un-published changes
      this.arcgisHubWorkspaceEntityChange.emit({
        entity: values,
        isDirty: true,
      });
    };
    /** persist the updated catalog configuration on the entity */
    this.handleCatalogSave = async () => {
      const type = getTypeFromEntity(this.entity);
      const updatedEntity = cloneObject(this.entity);
      // set the entity's catalogs with the updated configuration.
      // NOTE: if the catalog is "empty", we reset the catalog
      updatedEntity.catalog = this._isCatalogEmpty
        ? undefined
        : this._catalog;
      try {
        await updateHubEntity(type, updatedEntity, this._context);
        showNotice({ title: this._intl.t("shared.publish.success.title"), message: '', configuration: { noticeType: 'alert', autoClose: true, autoCloseDuration: 'fast', icon: true, kind: 'success', label: this._intl.t("shared.publish.success.title") } });
        // notify the parent workspace that the entity has been
        // published - this clears the dirty state
        this.arcgisHubWorkspaceEntityChange.emit({
          entity: updatedEntity,
          isDirty: false,
        });
      }
      catch (error) {
        showNotice({ title: this._intl.t("shared.publish.error.title"), message: '', configuration: { noticeType: 'alert', autoClose: true, autoCloseDuration: 'fast', icon: true, kind: 'success', label: this._intl.t("shared.publish.error.title") } });
      }
    };
    this.entity = undefined;
    this.pane = undefined;
    this._catalog = undefined;
    this._isConfigurationPanelOpen = false;
    this.footerSlotEl = undefined;
    this._isAppearancePanelOpen = false;
    this._editedCollectionKey = undefined;
    this._renderedCollectionKey = undefined;
    this._currentQuerySizes = {};
    this._querySizeLimitReached = false;
    bind(this, 'handleArcgisHubGalleryExecutedQuerySize', 'handleArcgisHubCollectionsBuilderEditedCollectionKeyChange');
  }
  async componentWillLoad() {
    // Load the component's intl
    this._intl = await intlManager.loadIntlForComponent(this.element);
    // initialize states
    this.init();
  }
  init() {
    var _a;
    // 1. Initialize the catalog
    this._catalog = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.catalog;
    // 2. Initialize current query sizes of scopes
    this._currentQuerySizes = initializeQuerySizes(this._catalog);
    // 3. Set other default states
    this._editedCollectionKey = null;
    this._renderedCollectionKey = null;
    this._isAppearancePanelOpen = false;
    this._isConfigurationPanelOpen = false;
  }
  /** contextual portal and auth information */
  get _context() {
    return getGlobalContext();
  }
  /** whether the entity has a catalog configured */
  get _hasCatalog() {
    return !!this._catalog;
  }
  /** whether the configured catalog is technically "empty" */
  get _isCatalogEmpty() {
    var _a, _b, _c;
    const hasCollections = ((_b = (_a = this._catalog) === null || _a === void 0 ? void 0 : _a.collections) === null || _b === void 0 ? void 0 : _b.length) > 0;
    const hasScope = Object.values(((_c = this._catalog) === null || _c === void 0 ? void 0 : _c.scopes) || {}).some((scope) => {
      var _a;
      return ((_a = scope === null || scope === void 0 ? void 0 : scope.filters) === null || _a === void 0 ? void 0 : _a.length) > 0;
    });
    return !(hasCollections || hasScope);
  }
  /**
   * The UI schema for the catalog builder
   */
  get _catalogBuilderUiSchema() {
    return getCatalogBuilderUiSchema({
      targetEntity: this._targetEntity,
      callbacks: {
        onCatalogScopeChangeCallback: this.handleCatalogScopeChange,
        onCollectionsRemovedCallback: this.handleCollectionsRemoved,
        onCollectionEditedKeyChange: this.handleArcgisHubCollectionsBuilderEditedCollectionKeyChange,
        calciteFlowRefCallback: this.getCalciteFlowRef,
      }
    });
  }
  get _targetEntity() {
    let targetEntity;
    // get target entity based off of current pane
    switch (this.pane) {
      // events subpane
      case "catalog-events":
        targetEntity = "event";
        break;
      // content subpane
      case "catalog-content":
      default:
        targetEntity = "item";
        break;
    }
    return targetEntity;
  }
  /**
   * We pass this to the arcgis-hub-catalog component as it takes an array
   * We memoize this so that we don't have to recompute it every time (causing a new array in memory, causing a rerender of the component)
   */
  get _catalogs() {
    return [this._catalog];
  }
  /**
   * We pass this to the arcgis-hub-catalog component as it takes an array
   * We memoize this so that we don't have to recompute it every time (causing a new array in memory, causing a rerender of the component)
   */
  get _facets() {
    return [...WELL_KNOWN_FACET_TYPES];
  }
  /**
   * We pass this to the arcgis-hub-catalog component as it takes an array
   * We memoize this so that we don't have to recompute it every time (causing a new array in memory, causing a rerender of the component)
   */
  get _layoutOptions() {
    return ['list', 'grid', 'table', 'map', 'compact'];
  }
  /**
   * Handles the event emitted by the arcgis-hub-gallery component
   * when a query is executed. This is used to determine the size
   * of the query string that was just executed
   * @param event
   */
  handleArcgisHubGalleryExecutedQuerySize(event) {
    // update query size for the collection we are currently rendering in the gallery
    // as the query size we received was the size of the query executed for the rendered collection
    this._currentQuerySizes = Object.assign(Object.assign({}, this._currentQuerySizes), { [this._renderedCollectionKey]: event.detail });
  }
  /**
   * Handles when the key of the collection being edited changes
   * @param key: string
   */
  async handleArcgisHubCollectionsBuilderEditedCollectionKeyChange(key) {
    this._editedCollectionKey = key;
  }
  /** render the entity's configured catalogs
   * we pass a holistic set of facets to the catalog
   * and the gallery will filter them based on the
   * target entity type
   */
  renderCatalogs() {
    if (this._hasCatalog && !this._isCatalogEmpty) {
      return (h("div", { class: "catalog-container" }, h("calcite-button", { class: "configure-catalog-button", onClick: this.toggleActivePanel, ref: this.setConfigureButtonRef, round: true }, this._intl.t("configureCatalog")), h("arcgis-hub-catalog", { activeCollectionKey: this._editedCollectionKey, catalogs: this._catalogs, facets: this._facets, layoutOptions: this._layoutOptions, linkTarget: "siteRelative", onArcgisHubCatalogActiveCollectionChange: this.setRenderedCollectionKey, showAddContent: true, showLayoutSwitcher: true, showSearch: true, targetEntity: this._targetEntity })));
    }
  }
  /**
 * Renders query size warnings and danger notices if
 * any of the query sizes are over the limits
 * @returns
 */
  renderQuerySizeNotices() {
    const querySizeNotices = [];
    let querySizeLimitReached = false;
    // check the query sizes to see if any are over the limit
    Object.entries(this._currentQuerySizes).forEach(([key, size]) => {
      // 1. check if we're dealing with a catalog source for our target entity or a collection source
      const isCatalog = key === this._targetEntity;
      const collection = isCatalog ? null : this._catalog.collections.find((collection) => collection.key === key && collection.targetEntity === this._targetEntity);
      if (isCatalog || collection) {
        const targetEntity = isCatalog ? key : collection.targetEntity;
        let message;
        // 2. check if we are violating the query size limits
        let kind;
        // 2.1 max limit reached -- we'll disable publishing
        if (size >= QUERY_SIZE_MAXIMUM_LIMIT) {
          kind = "danger";
          querySizeLimitReached = true;
        }
        // 2.2 just warnings -- we'll still allow publishing
        else if (size >= QUERY_SIZE_WARNING_LIMIT) {
          kind = "warning";
        }
        ;
        // 3. create message depending on source
        kind && (message = isCatalog ?
          this._intl.t(`detailsPanel.querySizeNotice.${kind}.catalogSourceMessage.${targetEntity}`) :
          this._intl.t(`detailsPanel.querySizeNotice.${kind}.collectionSourceMessage.${targetEntity}`, { collectionName: collection.label }));
        // 4. create a notice if we are violating any limits
        kind && querySizeNotices.push(h("arcgis-hub-notice", { notice: {
            id: `query-size-${kind}-${key}`,
            title: this._intl.t(`detailsPanel.querySizeNotice.${kind}.title`),
            message: message,
            configuration: {
              noticeType: "notice",
              icon: true,
              kind,
              closable: false,
              scale: "m"
            }
          } }));
      }
      else {
        console.info(`Could not find collection or catalog with correct target entity for query size key: ${key}`);
        delete this._currentQuerySizes[key];
      }
    });
    // update the state to determine if we should disable publishing
    this._querySizeLimitReached = querySizeLimitReached;
    return querySizeNotices;
  }
  /**
   * If a catalog is NOT configured on the entity,
   * we render an empty state prompting the user
   * to configure one
   */
  renderEmptyState() {
    if (!this._hasCatalog || this._isCatalogEmpty) {
      return (h("arcgis-hub-help-state", { icon: "file-magnifying-glass", message: this._intl.t('emptyState.message'), slot: "help-state" }, h("calcite-button", { "data-key": CatalogPanels.Details, onClick: this.toggleActivePanel, round: true, slot: "actions" }, this._intl.t('emptyState.action'))));
    }
  }
  /** render the panel to configure the details of a catalog */
  renderDetailsPanel() {
    return (h("calcite-flow", { ref: this.setCalciteFlowRef }, h("calcite-flow-item", null, h("calcite-panel", { closable: true, "data-key": CatalogPanels.Details, heading: this._intl.t("detailsPanel.heading"), messageOverrides: {
        close: this._intl.t("detailsPanel.close")
      }, onCalcitePanelClose: this.collapseAllPanels, ref: this.setPanelRef }, this.renderQuerySizeNotices(), this.footerSlotEl && h("arcgis-configuration-form", { footerSlotRef: this.footerSlotEl, isDisabled: this._querySizeLimitReached, messageOverrides: { save: this._intl.t('shared.publish.label') }, onArcgisConfigurationFormChanged: this.handleCatalogChange, onArcgisConfigurationFormSaved: this.handleCatalogSave, schema: cloneObject(catalogBuilderSchema), t: this.translationFunc, uiSchema: cloneObject(this._catalogBuilderUiSchema), values: { catalog: this._catalog } })), h("div", { ref: (el) => { this.footerSlotEl = el; }, slot: "footer" }))));
  }
  /** render the shell panel */
  renderConfigurationShellPanel() {
    return (h("calcite-shell-panel", { collapsed: !this._isConfigurationPanelOpen, position: "end", slot: "shell-panel-end" }, this._isConfigurationPanelOpen && this.renderDetailsPanel()));
  }
  render() {
    return (h(Host, { "data-element": "entity-catalog" }, h("arcgis-hub-workspace-pane", null, h("h1", { slot: "title" }, this._intl.t(`${this.pane}`)), this.renderEmptyState(), this.renderCatalogs(), this.renderConfigurationShellPanel())));
  }
  static get is() { return "arcgis-hub-entity-catalog"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-catalog.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-catalog.css"]
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
      },
      "pane": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "WorkspacePane",
          "resolved": "\"catalog\" | \"catalog-content\" | \"catalog-events\" | \"collaborators\" | \"content\" | \"dashboard\" | \"details\" | \"discussion\" | \"events\" | \"followers\" | \"groups\" | \"initiatives\" | \"members\" | \"metrics\" | \"metrics-coming-soon\" | \"overview\" | \"participation\" | \"projects\" | \"registrants\" | \"settings\"",
          "references": {
            "WorkspacePane": {
              "location": "import",
              "path": "../../../utils"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Hub workspace pane -- what is the target entity right now"
        },
        "attribute": "pane",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "_catalog": {},
      "_isConfigurationPanelOpen": {},
      "footerSlotEl": {},
      "_isAppearancePanelOpen": {},
      "_editedCollectionKey": {},
      "_renderedCollectionKey": {},
      "_currentQuerySizes": {},
      "_querySizeLimitReached": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubWorkspaceEntityChange",
        "name": "arcgisHubWorkspaceEntityChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IWorkspaceEntityChange",
          "resolved": "IWorkspaceEntityChange",
          "references": {
            "IWorkspaceEntityChange": {
              "location": "import",
              "path": "../../../utils"
            }
          }
        }
      }, {
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "event to emit Hub telemetry"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "pane",
        "methodName": "init"
      }, {
        "propName": "entity",
        "methodName": "init"
      }];
  }
  static get listeners() {
    return [{
        "name": "arcgisHubGalleryExecutedQuerySize",
        "method": "handleArcgisHubGalleryExecutedQuerySize",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
__decorate([
  Memoize('_catalog')
], ArcgisHubEntityCatalog.prototype, "_catalogs", null);
__decorate([
  Memoize('_catalog')
], ArcgisHubEntityCatalog.prototype, "_facets", null);
__decorate([
  Memoize('_catalog')
], ArcgisHubEntityCatalog.prototype, "_layoutOptions", null);
