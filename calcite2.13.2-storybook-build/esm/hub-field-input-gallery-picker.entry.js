import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, a as getElement } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { b as buildQueryFromGallerySelection } from './build-query-from-gallery-selection-025c80a8.js';
import { d as dist } from './index-dd3f99ac.js';
import { i as isNil } from './is-nil-03b9a6b5.js';
import { g as getLabel } from './getLabel-a2b67324.js';
import { g as getGlobalContext, h as connectContext } from './state-31a09db0.js';
import { b as capitalize } from './util-3e6872d9.js';
import { u as getContentTypeIcon } from './compose-d5b83ab7.js';
import { g as getProp } from './get-prop-ec5be510.js';
import { h as hubSearch } from './hubSearch-41612481.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './_commonjsHelpers-11ca3be1.js';
import './store-0a6cb79f.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './request-fa80ae40.js';
import './helpers-8c7e5e31.js';
import './tslib.es6-9c17e83a.js';
import './HubError-e26c5610.js';
import './get-with-default-b819d95d.js';
import './OperationError-387ae9ab.js';
import './HubInitiatives-4f4e24ce.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './search-c7a57aa9.js';
import './append-custom-params-4bd856e5.js';
import './generate-random-string-1436d9e6.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './slugify-e3e67bac.js';
import './object-to-json-blob-583ae5c3.js';
import './fail-safe-cd1a5a2a.js';
import './delete-prop-bd13d424.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './_enrichments-8641475c.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './types-2eaa1a18.js';
import './TemplateBusinessRules-0e35d61b.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeFromEntity-e149b61e.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './map-by-a2234e13.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
import './merge-objects-5b123ab3.js';
import './get-850c466d.js';
import './search-211dee83.js';
import './request-3e386aeb.js';
import './channels-2574fd6e.js';
import './discussions-api-request-199cae2d.js';
import './events-c59246f8.js';
import './registrations-431b9788.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';

const galleryPickerCss = "hub-field-input-gallery-picker .gallery-picker__selected-entities{margin-bottom:1.5rem}hub-field-input-gallery-picker calcite-list-item [slot=\"actions-start\"]{margin-top:10px;margin-left:0.75rem}hub-field-input-gallery-picker calcite-list-item{--calcite-font-size--2:var(--calcite-font-size--1);--tw-shadow:var(--twShadowNew, 0 1px 0 var(--calcite-color-border-3))}hub-field-input-gallery-picker calcite-link{display:flex;flex-direction:column;align-items:center;justify-content:center}";

const GalleryPicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
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
    this._context = getGlobalContext();
    this.isOpen = false;
    this.gallerySelection = undefined;
    this.selectedEntities = undefined;
    bind(this, 'handleGalleryPickerSelectionUpdate', 'handleGalleryPickerOpen', 'handleGalleryPickerClose', 'handleGallerySelectionRemove');
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  async componentWillLoad() {
    await this.fetchEntities();
    this.intl = await intlManager.loadIntlForComponent(this.element);
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
    if (!isNil((_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.canReorder)) {
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
      ? getLabel(this.params.uiSchema, this.params.t, "options.pickerTitle")
      : this.intl.t(`select${capitalize(this.targetEntity)}`);
  }
  /**
   * Get the icon for the content type
   */
  getTypeIcon(type) {
    return type ? getContentTypeIcon(type) : "file";
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
    if (getProp(gallerySelection, `${this.targetEntity}.length`)) {
      const query = buildQueryFromGallerySelection(gallerySelection, this.targetEntity);
      const include = this.targetEntity === 'group' ? ['membershipSummary'] : [];
      const hubSearchOptions = { requestOptions: (_a = this._context) === null || _a === void 0 ? void 0 : _a.hubRequestOptions, include };
      try {
        ({ results } = await hubSearch(query, hubSearchOptions));
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
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.remove.label[telemetryLabel]), { details: this.params.telemetryLabel, count: this.selectedEntities.length }));
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
    return (h("calcite-list", { class: "gallery-picker__selected-entities", "drag-enabled": this.canReorder }, entities.map((entity, idx) => this.renderEntity(entity, idx))));
  }
  renderActions(entity, idx) {
    var _a, _b, _c, _d;
    const actions = [];
    // add link launch action, if we have linkTarget and valid href
    if ((_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.linkTarget) {
      const href = entity.links[(_d = (_c = this.params.uiSchema) === null || _c === void 0 ? void 0 : _c.options) === null || _d === void 0 ? void 0 : _d.linkTarget];
      if (!!href) {
        actions.push(h("calcite-link", { href: href, rel: "noreferrer", slot: "actions-end", target: "_blank" }, h("calcite-action", { "data-index": idx, icon: "launch", label: this.intl.t("launch"), text: "" })));
      }
    }
    // add remove action
    actions.push(h("calcite-action", { "data-index": idx, icon: "x-circle", label: this.intl.t("remove"), onClick: this.handleGallerySelectionRemove, slot: "actions-end", text: "" }));
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
    return (h("calcite-list-item", { "data-index": idx, description: description, key: id, label: name, nonInteractive: true, value: id }, this.targetEntity === 'group'
      ? h("calcite-avatar", { fullName: name, scale: 'm', slot: "actions-start", thumbnail: links === null || links === void 0 ? void 0 : links.thumbnail })
      : h("calcite-icon", { icon: this.getTypeIcon(type), scale: "l", slot: "actions-start" }), this.renderActions(result, idx)));
  }
  renderGalleryPickerButton() {
    var _a, _b, _c, _d, _e, _f, _g;
    return (h(Fragment, null, h("calcite-button", { appearance: (_c = (_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.appearance) !== null && _c !== void 0 ? _c : 'outline-fill', class: "gallery-picker__select", kind: (_e = (_d = this.params.uiSchema) === null || _d === void 0 ? void 0 : _d.options) === null || _e === void 0 ? void 0 : _e.kind, onClick: this.handleGalleryPickerOpen, round: true, width: (_g = (_f = this.params.uiSchema) === null || _f === void 0 ? void 0 : _f.options) === null || _g === void 0 ? void 0 : _g.width }, this.pickerTitle)));
  }
  renderGalleryPicker() {
    var _a, _b, _c, _d, _e, _f, _g;
    return (h("arcgis-wormhole", { elAttributes: { unthemed: '' } }, h("arcgis-hub-gallery-picker", { catalogs: (_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.catalogs, facets: (_d = (_c = this.params.uiSchema) === null || _c === void 0 ? void 0 : _c.options) === null || _d === void 0 ? void 0 : _d.facets, gallerySelection: this.gallerySelection, limit: this.limit, linkTarget: "siteRelative", modalOptions: (_e = this.params.uiSchema) === null || _e === void 0 ? void 0 : _e.options, modalTitle: this.pickerTitle, onArcgisHubGalleryPickerClose: this.handleGalleryPickerClose, onArcgisHubGalleryPickerSelectionUpdate: this.handleGalleryPickerSelectionUpdate, onHubTelemetry: this.handleHubTelemetry, open: this.isOpen, selectionMode: this.selectionMode, showSearch: true, showSelection: (_g = (_f = this.params.uiSchema) === null || _f === void 0 ? void 0 : _f.options) === null || _g === void 0 ? void 0 : _g.showSelection })));
  }
  render() {
    var _a, _b;
    return (h(Host, { "data-element": "gallery-picker-field", style: this.styles }, !!((_a = this.selectedEntities) === null || _a === void 0 ? void 0 : _a.length) && this.renderSelectedEntities(this.selectedEntities), (!this.selectedEntities || ((_b = this.selectedEntities) === null || _b === void 0 ? void 0 : _b.length) < this.limit) && this.renderGalleryPickerButton(), this.isOpen && this.renderGalleryPicker()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
GalleryPicker.style = galleryPickerCss;

export { GalleryPicker as hub_field_input_gallery_picker };
