import { r as registerInstance, c as createEvent, h, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { b as bind } from './context-7d8f7366.js';
import { a as cloneObject } from './util-3e6872d9.js';
import { m as mergeObjects } from './merge-objects-5b123ab3.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './get-prop-ec5be510.js';
import './deep-set-67281c6f.js';

const arcgisHubVersionsDeleteModalCss = "h2{margin:0px}";

const ArcgisHubVersionsDeleteModal = class {
  /**
   * Constructor function, pre-binds context to relevant methods
   */
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubVersionsDeleteModalDelete = createEvent(this, "arcgisHubVersionsDeleteModalDelete", 7);
    this.arcgisHubVersionsDeleteModalClose = createEvent(this, "arcgisHubVersionsDeleteModalClose", 7);
    this.version = undefined;
    this.displayName = undefined;
    this.shouldShow = false;
    this.error = undefined;
    bind(this, 'onHide', 'onDelete');
  }
  /**
   * Component will load lifecycle method, fetches translations and data
   * needed to render the UI
   */
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  onHide(event) {
    event.stopPropagation();
    this.arcgisHubVersionsDeleteModalClose.emit();
  }
  async onDelete(event) {
    event.stopPropagation();
    this.arcgisHubVersionsDeleteModalDelete.emit(this.version);
  }
  renderError() {
    if (this.error) {
      return (h("calcite-notice", { color: "red", icon: true, kind: "danger", open: true, scale: "s" }, h("div", { slot: "title" }, this.intl.t('error'))));
    }
  }
  render() {
    if (!!this.version) {
      return (h("calcite-modal", { "close-button-disabled": true, "focus-trap-disabled": true, onCalciteModalClose: this.onHide, open: this.shouldShow }, h("div", { slot: "header" }, h("h2", null, this.intl.t('title'))), h("div", { slot: "content" }, h("p", null, this.intl.t('message')), h("strong", null, this.displayName), this.renderError()), h("calcite-button", { appearance: "solid", kind: "danger", onClick: this.onDelete, slot: "primary" }, this.intl.t('delete')), h("calcite-button", { appearance: "outline", onClick: this.onHide, slot: "secondary" }, this.intl.t('cancel'))));
    }
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubVersionsDeleteModal.style = arcgisHubVersionsDeleteModalCss;

const SCHEMA = {
  type: "object",
  properties: {
    name: {
      type: "string",
      maxLength: 64,
    },
    description: {
      type: "string",
      maxLength: 255,
    }
  }
};
const UI_SCHEMA = {
  type: "Layout",
  elements: [
    {
      scope: "/properties/name",
      type: "Control",
      labelKey: 'name.label',
      options: {
        helperText: { labelKey: 'name.helpText' },
      }
    },
    {
      scope: "/properties/description",
      type: "Control",
      labelKey: 'description.label',
      options: {
        control: 'hub-field-input-input',
        type: 'textarea',
      }
    }
  ]
};

const arcgisHubVersionsDetailsModalCss = "h2{margin:0px}";

const ArcgisHubVersionsDetailsModal = class {
  /**
   * Constructor function, pre-binds context to relevant methods
   */
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubVersionsDetailsModalSave = createEvent(this, "arcgisHubVersionsDetailsModalSave", 7);
    this.arcgisHubVersionsDetailsModalClose = createEvent(this, "arcgisHubVersionsDetailsModalClose", 7);
    this.version = undefined;
    this.shouldShow = false;
    this._version = undefined;
    this.error = undefined;
    bind(this, 'onDetailsChange', 'onHide', 'onSave', 'translationFunc');
  }
  /**
   * Component will load lifecycle method, fetches translations and data
   * needed to render the UI
   */
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.versionChangeHandler(this.version);
  }
  versionChangeHandler(version) {
    this._version = cloneObject(version);
  }
  onDetailsChange(event) {
    event.stopPropagation();
    const { valid, values } = event.detail;
    if (valid) {
      this._version = mergeObjects(values, this.version, ['description', 'name']);
    }
  }
  onHide(event) {
    event.stopPropagation();
    this._version = null;
    this.arcgisHubVersionsDetailsModalClose.emit();
  }
  async onSave(event) {
    event.stopPropagation();
    this.arcgisHubVersionsDetailsModalSave.emit(this._version);
  }
  translationFunc(key, values, opts) {
    return this.intl.t(key, values, opts);
  }
  renderError() {
    if (this.error) {
      return (h("calcite-notice", { color: "red", icon: true, kind: "danger", open: true, scale: "s" }, h("div", { slot: "title" }, this.intl.t('error'))));
    }
  }
  render() {
    if (!!this.version) {
      return (h("calcite-modal", { "close-button-disabled": true, "focus-trap-disabled": true, onCalciteModalClose: this.onHide, open: this.shouldShow }, h("div", { slot: "header" }, h("h2", null, this.intl.t('title'))), h("div", { slot: "content" }, h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.onDetailsChange, schema: SCHEMA, t: this.translationFunc, uiSchema: UI_SCHEMA, values: this._version }), this.renderError()), h("calcite-button", { onClick: this.onSave, slot: "primary" }, this.intl.t('save')), h("calcite-button", { appearance: "outline", onClick: this.onHide, slot: "secondary" }, this.intl.t('cancel'))));
    }
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "version": ["versionChangeHandler"]
  }; }
};
ArcgisHubVersionsDetailsModal.style = arcgisHubVersionsDetailsModalCss;

export { ArcgisHubVersionsDeleteModal as arcgis_hub_versions_delete_modal, ArcgisHubVersionsDetailsModal as arcgis_hub_versions_details_modal };
