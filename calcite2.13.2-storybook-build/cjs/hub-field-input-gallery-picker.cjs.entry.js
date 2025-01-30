'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');
const intlManager = require('./intl-manager-f0103583.js');
const buildQueryFromGallerySelection = require('./build-query-from-gallery-selection-7db73693.js');
const index$1 = require('./index-6f16fe65.js');
const isNil = require('./is-nil-e28a2884.js');
const getLabel = require('./getLabel-c21bfe7f.js');
const state = require('./state-6637df8c.js');
const util = require('./util-38e73510.js');
const compose = require('./compose-9b4311c9.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const hubSearch = require('./hubSearch-79d30702.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./store-2a385ca0.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./get-family-cafa88bb.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./request-67da3c71.js');
require('./helpers-64227739.js');
require('./tslib.es6-b6cfa7d7.js');
require('./HubError-44e07249.js');
require('./get-with-default-d1b1754d.js');
require('./OperationError-902f34ae.js');
require('./HubInitiatives-25ecf40a.js');
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./search-2db68ef4.js');
require('./append-custom-params-0f5d0fe2.js');
require('./generate-random-string-8807d629.js');
require('./get-0368c931.js');
require('./tslib.es6-e7faa7f3.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./slugify-826af07b.js');
require('./object-to-json-blob-5c0a267d.js');
require('./fail-safe-33c35b7f.js');
require('./delete-prop-7826ae49.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./_enrichments-a40a3850.js');
require('./get-user-5eecc1c4.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getService-b27eda44.js');
require('./types-097b54b1.js');
require('./TemplateBusinessRules-5564c964.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./getTypeFromEntity-9476954e.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./UserSession-f8bc10c8.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
require('./map-by-a7a75788.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
require('./merge-objects-b31af1a3.js');
require('./get-52661c13.js');
require('./search-b00c4c79.js');
require('./request-79b61e92.js');
require('./channels-bf478342.js');
require('./discussions-api-request-e9e6e346.js');
require('./events-7873340d.js');
require('./registrations-a6dd52b7.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');

const galleryPickerCss = "hub-field-input-gallery-picker .gallery-picker__selected-entities{margin-bottom:1.5rem}hub-field-input-gallery-picker calcite-list-item [slot=\"actions-start\"]{margin-top:10px;margin-left:0.75rem}hub-field-input-gallery-picker calcite-list-item{--calcite-font-size--2:var(--calcite-font-size--1);--tw-shadow:var(--twShadowNew, 0 1px 0 var(--calcite-color-border-3))}hub-field-input-gallery-picker calcite-link{display:flex;flex-direction:column;align-items:center;justify-content:center}";

const GalleryPicker = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = index.createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    /**
     * because we wrap the arcgis-hub-gallery-picker in a wormhole, we
     * intercept its telemetry and re-emit it from this component so
     * we don't loose the DOM context
     *
     * Additionally, we append the field name to the telemetry event
     * if it doesn't already have a "details" dimension
     */
    this.handleHubTelemetry = (evt) => {
      evt.stopPropagation();
      this.hubTelemetry.emit(Object.assign({ details: this.params.telemetryLabel }, evt.detail));
    };
    this.params = undefined;
    this.styles = undefined;
    this._context = state.getGlobalContext();
    this.isOpen = false;
    this.gallerySelection = undefined;
    this.selectedEntities = undefined;
    context.bind(this, 'handleGalleryPickerSelectionUpdate', 'handleGalleryPickerOpen', 'handleGalleryPickerClose', 'handleGallerySelectionRemove');
  }
  connectedCallback() {
    state.connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  async componentWillLoad() {
    await this.fetchEntities();
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  get targetEntity() {
    var _a, _b;
    return ((_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.targetEntity) || 'item';
  }
  get limit() {
    return this.params.schema.maxItems || 100;
  }
  get selectionMode() {
    return this.params.schema.maxItems === 1 ? 'single' : 'multiple';
  }
  get canReorder() {
    var _a, _b, _c, _d;
    let canReorder = true;
    // if we have canReorder option set, listen to that
    if (!isNil.isNil((_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.canReorder)) {
      canReorder = (_d = (_c = this.params.uiSchema) === null || _c === void 0 ? void 0 : _c.options) === null || _d === void 0 ? void 0 : _d.canReorder;
    }
    // if limit > 1, then allow canReorder
    return canReorder && this.limit !== 1 && this.selectedEntities.length > 1;
  }
  /**
   * Get title to show in the modal as well as on the button to launch the modal
   */
  get pickerTitle() {
    var _a, _b;
    return ((_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.pickerTitle)
      ? getLabel.getLabel(this.params.uiSchema, this.params.t, "options.pickerTitle")
      : this.intl.t(`select${util.capitalize(this.targetEntity)}`);
  }
  /**
   * Get the icon for the content type
   */
  getTypeIcon(type) {
    return type ? compose.getContentTypeIcon(type) : "file";
  }
  /**
   * Convert the list of entity IDs to an IGallerySelection
   * based on the entity type
   */
  convertEntityIdsToGallerySelection() {
    return { [this.targetEntity]: this.params.value };
  }
  /**
   * Convert the IGallerySelection received from the Hub Gallery Picker
   * to an array of entity IDs based on the entity type
   */
  convertGallerySelectionToEntityIds(gallerySelection) {
    return gallerySelection[this.targetEntity];
  }
  handleGalleryPickerOpen() {
    this.isOpen = true;
  }
  handleGalleryPickerClose() {
    this.isOpen = false;
  }
  async handleGalleryPickerSelectionUpdate(evt) {
    this.selectedEntities = await this.fetchGallerySelectionEntities(evt.detail);
    const ids = this.convertGallerySelectionToEntityIds(evt.detail);
    this.arcgisConfigurationEditorFieldInputChange.emit(ids);
    this.isOpen = false;
  }
  async fetchEntities() {
    const gallerySelection = this.convertEntityIdsToGallerySelection();
    this.selectedEntities = this._context && await this.fetchGallerySelectionEntities(gallerySelection);
  }
  async fetchGallerySelectionEntities(gallerySelection) {
    var _a;
    let results = [];
    if (getProp.getProp(gallerySelection, `${this.targetEntity}.length`)) {
      const query = buildQueryFromGallerySelection.buildQueryFromGallerySelection(gallerySelection, this.targetEntity);
      const include = this.targetEntity === 'group' ? ['membershipSummary'] : [];
      const hubSearchOptions = { requestOptions: (_a = this._context) === null || _a === void 0 ? void 0 : _a.hubRequestOptions, include };
      try {
        ({ results } = await hubSearch.hubSearch(query, hubSearchOptions));
        // TODO: move this logic to a util or somewhere so it can be reused
        // sort the results according to the way it's sorted
        // but if it is not in the array, put it at the end
        const sortByIds = gallerySelection[this.targetEntity];
        results = results.slice().sort((a, b) => {
          const aIdx = sortByIds.includes(a.id) ? sortByIds.indexOf(a.id) : Infinity;
          const bIdx = sortByIds.includes(b.id) ? sortByIds.indexOf(b.id) : Infinity;
          return aIdx - bIdx;
        });
      }
      catch (error) {
        console.error("Unable to fetch selected entities:", error);
      }
    }
    this.gallerySelection = gallerySelection;
    return results;
  }
  handleGallerySelectionRemove(evt) {
    const el = evt.target;
    const entityIdx = Number(el.getAttribute('data-index'));
    const { id } = this.selectedEntities[entityIdx];
    this.selectedEntities = [
      ...this.selectedEntities.slice(0, entityIdx),
      ...this.selectedEntities.slice(entityIdx + 1)
    ];
    this.gallerySelection[this.targetEntity] = this.gallerySelection[this.targetEntity]
      .filter(entityId => entityId !== id);
    const ids = this.convertGallerySelectionToEntityIds(this.gallerySelection);
    this.arcgisConfigurationEditorFieldInputChange.emit(ids);
    const telemetryLabel = { item: "content", group: "groups", user: "users" }[this.targetEntity] || 'content';
    this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.remove.label[telemetryLabel]), { details: this.params.telemetryLabel, count: this.selectedEntities.length }));
  }
  handleSelectEntitiesOrderChange(evt) {
    this.gallerySelection[this.targetEntity] = evt.detail;
    this.selectedEntities = this.gallerySelection[this.targetEntity]
      .reduce((accum, id) => {
      this.selectedEntities.forEach(entity => {
        if (entity.id === id) {
          accum.push(entity);
        }
      });
      return accum;
    }, []);
    const ids = this.convertGallerySelectionToEntityIds(this.gallerySelection);
    this.arcgisConfigurationEditorFieldInputChange.emit(ids);
  }
  renderSelectedEntities(entities) {
    return (index.h("calcite-list", { class: "gallery-picker__selected-entities", "drag-enabled": this.canReorder }, entities.map((entity, idx) => this.renderEntity(entity, idx))));
  }
  renderActions(entity, idx) {
    var _a, _b, _c, _d;
    const actions = [];
    // add link launch action, if we have linkTarget and valid href
    if ((_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.linkTarget) {
      const href = entity.links[(_d = (_c = this.params.uiSchema) === null || _c === void 0 ? void 0 : _c.options) === null || _d === void 0 ? void 0 : _d.linkTarget];
      if (!!href) {
        actions.push(index.h("calcite-link", { href: href, rel: "noreferrer", slot: "actions-end", target: "_blank" }, index.h("calcite-action", { "data-index": idx, icon: "launch", label: this.intl.t("launch"), text: "" })));
      }
    }
    // add remove action
    actions.push(index.h("calcite-action", { "data-index": idx, icon: "x-circle", label: this.intl.t("remove"), onClick: this.handleGallerySelectionRemove, slot: "actions-end", text: "" }));
    return actions;
  }
  renderEntity(result, idx) {
    const { updatedDate, owner, id, name, type, links } = result;
    let description = `${owner} | ${this.intl.t('updatedDate', { updatedDate: this.intl.formatDate(updatedDate) })}`;
    if (this.targetEntity === "group" && result.membershipSummary) {
      const count = result.membershipSummary.total;
      if (count === 0) {
        description = this.intl.t('memberCount.noMember');
      }
      else if (count === 1) {
        description = this.intl.t('memberCount.oneMember');
      }
      else {
        description = this.intl.t('memberCount.members', { count });
      }
    }
    return (index.h("calcite-list-item", { "data-index": idx, description: description, key: id, label: name, nonInteractive: true, value: id }, this.targetEntity === 'group'
      ? index.h("calcite-avatar", { fullName: name, scale: 'm', slot: "actions-start", thumbnail: links === null || links === void 0 ? void 0 : links.thumbnail })
      : index.h("calcite-icon", { icon: this.getTypeIcon(type), scale: "l", slot: "actions-start" }), this.renderActions(result, idx)));
  }
  renderGalleryPickerButton() {
    var _a, _b, _c, _d, _e, _f, _g;
    return (index.h(index.Fragment, null, index.h("calcite-button", { appearance: (_c = (_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.appearance) !== null && _c !== void 0 ? _c : 'outline-fill', class: "gallery-picker__select", kind: (_e = (_d = this.params.uiSchema) === null || _d === void 0 ? void 0 : _d.options) === null || _e === void 0 ? void 0 : _e.kind, onClick: this.handleGalleryPickerOpen, round: true, width: (_g = (_f = this.params.uiSchema) === null || _f === void 0 ? void 0 : _f.options) === null || _g === void 0 ? void 0 : _g.width }, this.pickerTitle)));
  }
  renderGalleryPicker() {
    var _a, _b, _c, _d, _e, _f, _g;
    return (index.h("arcgis-wormhole", { elAttributes: { unthemed: '' } }, index.h("arcgis-hub-gallery-picker", { catalogs: (_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.catalogs, facets: (_d = (_c = this.params.uiSchema) === null || _c === void 0 ? void 0 : _c.options) === null || _d === void 0 ? void 0 : _d.facets, gallerySelection: this.gallerySelection, limit: this.limit, linkTarget: "siteRelative", modalOptions: (_e = this.params.uiSchema) === null || _e === void 0 ? void 0 : _e.options, modalTitle: this.pickerTitle, onArcgisHubGalleryPickerClose: this.handleGalleryPickerClose, onArcgisHubGalleryPickerSelectionUpdate: this.handleGalleryPickerSelectionUpdate, onHubTelemetry: this.handleHubTelemetry, open: this.isOpen, selectionMode: this.selectionMode, showSearch: true, showSelection: (_g = (_f = this.params.uiSchema) === null || _f === void 0 ? void 0 : _f.options) === null || _g === void 0 ? void 0 : _g.showSelection })));
  }
  render() {
    var _a, _b;
    return (index.h(index.Host, { "data-element": "gallery-picker-field", style: this.styles }, !!((_a = this.selectedEntities) === null || _a === void 0 ? void 0 : _a.length) && this.renderSelectedEntities(this.selectedEntities), (!this.selectedEntities || ((_b = this.selectedEntities) === null || _b === void 0 ? void 0 : _b.length) < this.limit) && this.renderGalleryPickerButton(), this.isOpen && this.renderGalleryPicker()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
GalleryPicker.style = galleryPickerCss;

exports.hub_field_input_gallery_picker = GalleryPicker;
