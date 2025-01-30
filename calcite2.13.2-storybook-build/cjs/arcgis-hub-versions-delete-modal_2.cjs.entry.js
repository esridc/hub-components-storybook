'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const context = require('./context-0167a31e.js');
const util = require('./util-38e73510.js');
const mergeObjects = require('./merge-objects-b31af1a3.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./get-prop-4bd8fc1a.js');
require('./deep-set-49b373be.js');

const arcgisHubVersionsDeleteModalCss = "h2{margin:0px}";

const ArcgisHubVersionsDeleteModal = class {
  /**
   * Constructor function, pre-binds context to relevant methods
   */
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubVersionsDeleteModalDelete = index.createEvent(this, "arcgisHubVersionsDeleteModalDelete", 7);
    this.arcgisHubVersionsDeleteModalClose = index.createEvent(this, "arcgisHubVersionsDeleteModalClose", 7);
    this.version = undefined;
    this.displayName = undefined;
    this.shouldShow = false;
    this.error = undefined;
    context.bind(this, 'onHide', 'onDelete');
  }
  /**
   * Component will load lifecycle method, fetches translations and data
   * needed to render the UI
   */
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
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
      return (index.h("calcite-notice", { color: "red", icon: true, kind: "danger", open: true, scale: "s" }, index.h("div", { slot: "title" }, this.intl.t('error'))));
    }
  }
  render() {
    if (!!this.version) {
      return (index.h("calcite-modal", { "close-button-disabled": true, "focus-trap-disabled": true, onCalciteModalClose: this.onHide, open: this.shouldShow }, index.h("div", { slot: "header" }, index.h("h2", null, this.intl.t('title'))), index.h("div", { slot: "content" }, index.h("p", null, this.intl.t('message')), index.h("strong", null, this.displayName), this.renderError()), index.h("calcite-button", { appearance: "solid", kind: "danger", onClick: this.onDelete, slot: "primary" }, this.intl.t('delete')), index.h("calcite-button", { appearance: "outline", onClick: this.onHide, slot: "secondary" }, this.intl.t('cancel'))));
    }
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
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
    index.registerInstance(this, hostRef);
    this.arcgisHubVersionsDetailsModalSave = index.createEvent(this, "arcgisHubVersionsDetailsModalSave", 7);
    this.arcgisHubVersionsDetailsModalClose = index.createEvent(this, "arcgisHubVersionsDetailsModalClose", 7);
    this.version = undefined;
    this.shouldShow = false;
    this._version = undefined;
    this.error = undefined;
    context.bind(this, 'onDetailsChange', 'onHide', 'onSave', 'translationFunc');
  }
  /**
   * Component will load lifecycle method, fetches translations and data
   * needed to render the UI
   */
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    this.versionChangeHandler(this.version);
  }
  versionChangeHandler(version) {
    this._version = util.cloneObject(version);
  }
  onDetailsChange(event) {
    event.stopPropagation();
    const { valid, values } = event.detail;
    if (valid) {
      this._version = mergeObjects.mergeObjects(values, this.version, ['description', 'name']);
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
      return (index.h("calcite-notice", { color: "red", icon: true, kind: "danger", open: true, scale: "s" }, index.h("div", { slot: "title" }, this.intl.t('error'))));
    }
  }
  render() {
    if (!!this.version) {
      return (index.h("calcite-modal", { "close-button-disabled": true, "focus-trap-disabled": true, onCalciteModalClose: this.onHide, open: this.shouldShow }, index.h("div", { slot: "header" }, index.h("h2", null, this.intl.t('title'))), index.h("div", { slot: "content" }, index.h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.onDetailsChange, schema: SCHEMA, t: this.translationFunc, uiSchema: UI_SCHEMA, values: this._version }), this.renderError()), index.h("calcite-button", { onClick: this.onSave, slot: "primary" }, this.intl.t('save')), index.h("calcite-button", { appearance: "outline", onClick: this.onHide, slot: "secondary" }, this.intl.t('cancel'))));
    }
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "version": ["versionChangeHandler"]
  }; }
};
ArcgisHubVersionsDetailsModal.style = arcgisHubVersionsDetailsModalCss;

exports.arcgis_hub_versions_delete_modal = ArcgisHubVersionsDeleteModal;
exports.arcgis_hub_versions_details_modal = ArcgisHubVersionsDetailsModal;
