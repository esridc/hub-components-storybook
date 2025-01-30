import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { d as dist } from './index-dd3f99ac.js';
import { D as DebounceDecoratorFactory } from './debounce-e9be81f1.js';
import { b as bind } from './context-7d8f7366.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { g as getExtentSymbol } from './map-d797b63c.js';
import { webMercatorToGeographic } from '@arcgis/core/geometry/support/webMercatorUtils.js';
import { m as matchesTelemetry } from './index-39849f62.js';
import './_commonjsHelpers-11ca3be1.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './sha256-bf3e0364.js';
import './_internal-96d77ae4.js';
import './dasherize-9215e9fc.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';

const arcgisBoundaryPickerUiCss = ".sc-arcgis-boundary-picker-ui-h{display:block}@media (min-width: 640px){.row.sc-arcgis-boundary-picker-ui{display:flex}.row.sc-arcgis-boundary-picker-ui{flex-direction:row-reverse}}arcgis-hub-map.sc-arcgis-boundary-picker-ui{height:300px;position:relative;margin-bottom:1rem;width:100%}@media (min-width: 640px){arcgis-hub-map.sc-arcgis-boundary-picker-ui{margin-bottom:0px}}arcgis-hub-map.sc-arcgis-boundary-picker-ui .arcgis-boundary-map-overlay.sc-arcgis-boundary-picker-ui{position:absolute;top:0px;left:0px;z-index:10;display:flex;height:100%;width:100%;flex-direction:column;justify-content:center;background-color:#0000004d;color:var(--calcite-color-text-inverse)}.arcgis-boundary-none-message.sc-arcgis-boundary-picker-ui{text-align:center}calcite-list.sc-arcgis-boundary-picker-ui{width:100%;background-color:var(--calcite-color-foreground-3);padding:1rem;color:var(--calcite-color-text-3)}@media (min-width: 640px){calcite-list.sc-arcgis-boundary-picker-ui{max-width:20rem}}.buttons.sc-arcgis-boundary-picker-ui{display:flex;justify-content:flex-end;padding:1rem}.buttons.sc-arcgis-boundary-picker-ui calcite-button.sc-arcgis-boundary-picker-ui{margin-left:0.5rem}";

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
// the amount we expand the initial extent of the map
// for now we are hard-coding this, but it could be a prop
// I'm trying to avoid having a bunch of pass through props to the map
// and we may ultimately need to provide a slot for the map
const EXPAND_FACTOR = 1.5;
// the "none" source is special: it's not in the pick list group
// and we show an overlay message on the map when it's selected
const NONE_VALUE = 'none';
const ArcgisBoundaryPickerUi = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisBoundaryPickerUpdate = createEvent(this, "arcgisBoundaryPickerUpdate", 7);
    this.arcgisBoundaryPickerCancel = createEvent(this, "arcgisBoundaryPickerCancel", 7);
    this.arcgisBoundaryPickerSave = createEvent(this, "arcgisBoundaryPickerSave", 7);
    this.state = undefined;
    this.authenticated = false;
    this.sources = undefined;
    this.extent = undefined;
    this.resetDrawingToolsOnDisconnect = true;
    this._selected = undefined;
    this._savedEditState = undefined;
    this._view = undefined;
    this._editGeometry = undefined;
    this._updatedGeometry = undefined;
    bind(this, 'handleSave', 'handleCancel', 'handleEditClick', 'handleCancelEditClick', 'handleSaveEditClick', '_setMapDrawElement');
  }
  get _editing() {
    return !!this._editGeometry;
  }
  get _selectedGraphic() {
    var _a;
    return (_a = this._selected) === null || _a === void 0 ? void 0 : _a.graphic;
  }
  // return the selected graphic w/ a default symbol if none is defined
  get _selectedGraphics() {
    const graphic = this._selectedGraphic;
    if (graphic && !graphic.symbol && graphic.geometry && graphic.geometry.type) {
      graphic.symbol = getExtentSymbol();
    }
    return this._editing
      ? []
      : [graphic];
  }
  get _selectedValue() {
    var _a;
    return (_a = this._selected) === null || _a === void 0 ? void 0 : _a.value;
  }
  get _isNone() {
    return this._selectedValue === NONE_VALUE;
  }
  get _initialSelection() {
    var _a;
    return (_a = this.sources) === null || _a === void 0 ? void 0 : _a.find(s => s.selected);
  }
  get _isGeometryDirty() {
    return !!this._updatedGeometry;
  }
  get _isDirty() {
    var _a;
    return this._selectedValue !== ((_a = this._initialSelection) === null || _a === void 0 ? void 0 : _a.value) || this._isGeometryDirty;
  }
  get _isLoadingOrSaving() {
    return this.state === 'loading' || this.state === 'saving';
  }
  get _canSave() {
    return this.authenticated && this._isDirty && !this._isLoadingOrSaving;
  }
  get _noneOption() {
    var _a;
    return (_a = this.sources) === null || _a === void 0 ? void 0 : _a.find(s => s.value === NONE_VALUE);
  }
  get _otherOptions() {
    var _a;
    return (_a = this.sources) === null || _a === void 0 ? void 0 : _a.filter(s => s.value !== NONE_VALUE);
  }
  // the geometry object we use when saving
  get _saveGeometry() {
    return this._isGeometryDirty
      // get updated geometry
      ? this._selectedValue === 'item'
        // the drawing tools always return a polygon
        // but for item's, we'll need the geo extent
        ? webMercatorToGeographic(this._updatedGeometry.extent)
        // TODO: should not-item geometries be converted to geographic?
        : this._updatedGeometry
      // get the original geometry of the selected source
      : this._selectedGraphic.geometry;
  }
  // the source object we omit when saving
  get _saveSource() {
    const selectedGraphic = this._selectedGraphic;
    const geometry = this._saveGeometry;
    const graphic = Object.assign(Object.assign({}, selectedGraphic), { geometry });
    return Object.assign(Object.assign({}, this._selected), { graphic });
  }
  get _overlayMessage() {
    var _a;
    if (this._editing) {
      return undefined;
    }
    return this._isNone
      ? this.intl.t('noLocationSet')
      : this._selectedValue === 'item' && !((_a = this._selectedGraphic) === null || _a === void 0 ? void 0 : _a.geometry)
        ? this.intl.t('clickEditAndDraw')
        : undefined;
  }
  // NOTE: we already translated "None" and "Item's Current Extent"
  // rather than move all those translations to the parent component
  // we are providing default labels for those options
  _getDefaultLabel(value) {
    const hasDefaultLabel = [NONE_VALUE, 'item'].includes(value);
    return hasDefaultLabel
      ? this.intl.t(value === 'item' ? 'itemsCurrentExtent' : value)
      : undefined;
  }
  _cancelEditGeometry() {
    this._editGeometry = null;
    this._updatedGeometry = null;
    this._mapDrawElement.forceReset();
  }
  _setMapDrawElement(el) {
    this._mapDrawElement = el;
  }
  _emitGeometryUpdate() {
    this.arcgisBoundaryPickerUpdate.emit(this._saveSource);
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    // set the initial selection
    this.onSourcesUpdate();
  }
  onSourcesUpdate() {
    this._selected = this._initialSelection;
  }
  async handleMapViewReady(e) {
    // TODO: is stopPropagation needed?
    e.stopPropagation();
    const { detail: { view } } = e;
    await view.when();
    // clear the default zoom controls
    view.ui.components = [];
    this._view = view;
  }
  handleListChange(event) {
    var _a;
    event.stopPropagation();
    // cancel any edits (if any)
    this._cancelEditGeometry();
    const value = event.target.value;
    let selected = (_a = this.sources) === null || _a === void 0 ? void 0 : _a.find(s => s.value === value);
    // If we swap around List items we want to maintain edit state. Only one edit state at a time is saved.
    if (this._savedEditState && selected.value === this._savedEditState.value) {
      selected = this._savedEditState;
    }
    this._selected = Object.assign(Object.assign({}, selected), {
      // NOTE: sources w/ .selected reflects initial selection state
      selected: true
    });
    this.arcgisBoundaryPickerUpdate.emit(this._selected);
  }
  handleGraphicsChange(e) {
    var _a;
    const { graphics } = e.detail;
    this._updatedGeometry = (_a = graphics.getItemAt(0)) === null || _a === void 0 ? void 0 : _a.geometry;
    this._emitGeometryUpdate();
  }
  handleTelemetry(e) {
    // filter out map drawing telemetry events
    const detail = e.detail;
    const actions = dist.dictionary.category.interaction.action;
    if (matchesTelemetry(detail, actions.search.label.filter) ||
      matchesTelemetry(detail, actions.enable.label.draw.details.update) ||
      matchesTelemetry(detail, actions.disable.label.draw.details.update)) {
      e.stopPropagation();
    }
  }
  async cancelEditGeometry() {
    this._cancelEditGeometry();
  }
  handleSave(e) {
    e.preventDefault();
    this.arcgisBoundaryPickerSave.emit(this._saveSource);
    // NOTE: after save is complete, consumers should call cancelEditGeometry
  }
  handleCancel(e) {
    e.preventDefault();
    // NOTE: we expect that the consumer will unmount this component
    // i.e. close a modal, but if not, we may want to reset this form
    // emit event
    this.arcgisBoundaryPickerCancel.emit();
    this._cancelEditGeometry();
  }
  handleEditClick(e) {
    var _a;
    e.preventDefault();
    const selectedGeometry = (_a = this._selectedGraphic) === null || _a === void 0 ? void 0 : _a.geometry;
    if (!selectedGeometry) {
      // initialize editing with map extent
      // TODO: convert extent to polygon when source is not item
      this._editGeometry = this._view.extent.expand(1 / EXPAND_FACTOR);
      // signal that the geometry is dirty
      this._updatedGeometry = this._editGeometry;
      this.arcgisBoundaryPickerUpdate.emit(this._saveSource);
    }
    else {
      // start editing selected geometry
      this._editGeometry = selectedGeometry;
    }
  }
  handleCancelEditClick(e) {
    e.preventDefault();
    this._cancelEditGeometry();
    this.arcgisBoundaryPickerUpdate.emit(this._selected);
  }
  handleSaveEditClick(e) {
    e.preventDefault();
    this._savedEditState = this._saveSource;
    this._selected = this._saveSource;
    this._cancelEditGeometry();
    this._emitGeometryUpdate();
  }
  renderEditConfirmButton() {
    if (this._editing) {
      return (h("calcite-action", { icon: 'check', onClick: this.handleSaveEditClick, slot: "actions-end", text: "" }));
    }
  }
  render() {
    var _a;
    return (h(Host, null, h("div", { class: "row" }, h("arcgis-hub-map", { basemap: "gray-vector", expand: EXPAND_FACTOR, extent: this.extent, graphics: this._selectedGraphics }, h("arcgis-hub-map-widget-container", { "expand-disabled": true, scale: "s", view: this._view, "view-position": "top-right" }, h("arcgis-hub-map-widget-zoom", { scale: "s", view: this._view })), h("arcgis-hub-map-widget-container", { scale: "s", "view-position": "top-right" }, h("arcgis-hub-map-widget-draw", { disableEditOptions: true, disablePrimaryOptions: true, geometry: this._editGeometry, ref: this._setMapDrawElement, resetOnDisconnect: this.resetDrawingToolsOnDisconnect, tools: [], view: this._view })), this._overlayMessage
      ? (h("div", { class: "arcgis-boundary-map-overlay" }, h("div", { class: "arcgis-boundary-none-message" }, this._overlayMessage)))
      : null), h("calcite-list", { "aria-busy": "false", "aria-disabled": this._isLoadingOrSaving, disabled: this._isLoadingOrSaving, role: "menu", selectionMode: "single-persist" }, this._noneOption
      ? h("calcite-list-item", { label: this._noneOption.label || this._getDefaultLabel(this._noneOption.value), selected: this._noneOption.selected, tabindex: "-1", value: this._noneOption.value })
      : null, h("calcite-list-group", { "group-title": this.intl.t('startFrom') }, (_a = this._otherOptions) === null || _a === void 0 ? void 0 : _a.map(option => h("calcite-list-item", { key: option.value, label: option.label || this._getDefaultLabel(option.value), selected: option.selected, value: option.value }, this.renderEditConfirmButton(), h("calcite-action", { disabled: this._selectedValue !== option.value, icon: this._editing ? 'x' : 'pencil', onClick: this._editing ? this.handleCancelEditClick : this.handleEditClick, slot: "actions-end", text: "" })))))), this.authenticated &&
      h("div", { class: "buttons" }, h("calcite-button", { appearance: "solid", color: "blue", disabled: !this._canSave || this.state === 'saving', loading: this.state === 'saving', onClick: this.handleSave, scale: "m", type: "button", width: "auto" }, this.intl.t('save')), h("calcite-button", { appearance: "outline", color: "blue", disabled: this._isLoadingOrSaving, onClick: this.handleCancel, scale: "m", type: "button", width: "auto" }, this.intl.t('cancel')))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "sources": ["onSourcesUpdate"]
  }; }
};
__decorate([
  DebounceDecoratorFactory({ timeout: 300 })
], ArcgisBoundaryPickerUi.prototype, "_emitGeometryUpdate", null);
ArcgisBoundaryPickerUi.style = arcgisBoundaryPickerUiCss;

export { ArcgisBoundaryPickerUi as arcgis_boundary_picker_ui };
