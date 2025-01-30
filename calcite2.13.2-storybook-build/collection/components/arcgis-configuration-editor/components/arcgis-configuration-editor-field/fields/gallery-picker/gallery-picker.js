import { h, Host, Fragment } from '@stencil/core';
import { bind } from '../../../../../../utils/context';
import intlManager from '../../../../../../utils/intl-manager';
import { hubSearch, getContentTypeIcon, getProp, capitalize } from '@esri/hub-common';
import { buildQueryFromGallerySelection } from '../../../../../../utils/build-query-from-gallery-selection';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { isNil } from '../../../../../../utils/is-nil';
import { getLabel } from '../../../../utils';
import { connectContext, getGlobalContext } from '../../../../../../utils/state';
export class GalleryPicker {
  constructor() {
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
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action.remove.label[telemetryLabel]), { details: this.params.telemetryLabel, count: this.selectedEntities.length }));
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
    ;
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
  static get is() { return "hub-field-input-gallery-picker"; }
  static get originalStyleUrls() {
    return {
      "$": ["gallery-picker.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gallery-picker.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "params": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IRenderParams",
          "resolved": "IRenderParams",
          "references": {
            "IRenderParams": {
              "location": "import",
              "path": "../resources"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "styles": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IStyleParams",
          "resolved": "IStyleParams",
          "references": {
            "IStyleParams": {
              "location": "import",
              "path": "../resources"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      }
    };
  }
  static get states() {
    return {
      "_context": {},
      "isOpen": {},
      "gallerySelection": {},
      "selectedEntities": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisConfigurationEditorFieldInputChange",
        "name": "arcgisConfigurationEditorFieldInputChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Fires when an entity is added/removed"
        },
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        }
      }, {
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
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
        "name": "calciteListItemRemove",
        "method": "handleGallerySelectionRemove",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "calciteListOrderChange",
        "method": "handleSelectEntitiesOrderChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
