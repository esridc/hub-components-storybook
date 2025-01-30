import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { D as DebounceDecoratorFactory } from './debounce-e9be81f1.js';
import { b as bind } from './context-7d8f7366.js';
import { d as dist } from './index-dd3f99ac.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { watch } from '@arcgis/core/core/reactiveUtils.js';
import SearchViewModel from '@arcgis/core/widgets/Search/SearchViewModel.js';
import { l as loadArcGisCss } from './arcgis-1e3a04cd.js';
import { g as getProp } from './get-prop-ec5be510.js';
import './_commonjsHelpers-11ca3be1.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import '@arcgis/core/config.js';

/**
 * Function to get the list of location types to be displayed after a user search
 * Currently, we only support point, extent/rectangle, and draw your own.
 * In the future, we look to add polyline and polygon geometries
 */
function getAllLocationTypes(intl) {
  return [
    { key: 'point', text: intl.t('point'), sourceIndex: 0 },
    { key: 'rectangle', text: intl.t('rectangle'), sourceIndex: 0 },
    { key: 'draw', text: intl.t('draw'), sourceIndex: 0 },
  ];
}

const arcgisHubMapWidgetSearchCss = ":host{display:block}arcgis-hub-map-widget-search calcite-dropdown{position:absolute}arcgis-hub-map-widget-search calcite-input{width:var(--width)}arcgis-hub-map-widget-search calcite-dropdown-group{width:var(--width)}.hub-widget-search.top{position:absolute;width:var(--width)}.hub-widget-search.right{right:100%;margin-right:1rem}.hub-widget-search.left{left:100%;margin-left:1rem}";

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
const ArcgisHubMapWidgetSearch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubGeometryResultSelection = createEvent(this, "arcgisHubGeometryResultSelection", 7);
    this.arcgisHubWidgetPanelToggled = createEvent(this, "arcgisHubWidgetPanelToggled", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.tools = undefined;
    this.scale = 'm';
    this.view = undefined;
    this.searchViewModelProperties = {};
    this.active = undefined;
    this.completeValidSearch = undefined;
    this.loading = undefined;
    this.suggestions = [];
    this.value = undefined;
    this.width = '25rem';
    bind(this, 'handleSetInputRef', 'handleSetDropdownRef', 'searchIfEnter', 'toggleActive', 'setInputWidth');
  }
  get inputScale() {
    return this.scale === 's'
      ? 'm'
      : 'l';
  }
  async componentWillLoad() {
    const { el } = this;
    const parentContainer = el && el.closest('arcgis-hub-map-widget-container');
    this.viewPosition = parentContainer === null || parentContainer === void 0 ? void 0 : parentContainer.viewPosition;
    this.intl = await intlManager.loadIntlForComponent(el);
    await this.connectViewModel();
  }
  connectedCallback() {
    this.connectWatch();
  }
  disconnectedCallback() {
    this.removeWatch();
  }
  componentDidLoad() {
    loadArcGisCss();
  }
  handleViewChange(view, prevView) {
    if (view && view !== prevView) {
      this.removeWatch();
      this.connectViewModel().then(() => {
        this.connectWatch();
      });
    }
  }
  handleSuggestionsChange() {
    const { dropdownEl, suggestions } = this;
    dropdownEl.open = Boolean(suggestions.length);
  }
  handleActiveChange(active) {
    const { hubTelemetry } = this;
    const details = active
      ? dist.dictionary.category.interaction.action.open.label.search
      : dist.dictionary.category.interaction.action.close.label.search;
    hubTelemetry.emit(details);
    this.setInputWidth();
  }
  handleValueChange() {
    const { value, searchViewModel } = this;
    if (searchViewModel && value === '') {
      searchViewModel.clear();
    }
  }
  /**
   * handles property changes to the searchViewModel
   */
  handleSearchViewModelChange() {
    this.connectViewModel();
  }
  handlePanelToggled(event) {
    const { target, detail: dismissed } = event;
    const { el } = this;
    if (target !== el && !dismissed) {
      // only 1 widget open at a time
      this.active = false;
    }
  }
  /**
   * Handles the `calciteDropdownSelect` event triggered by the Calcite dropdown component.
   * Processes the user's selection of either a location or location type
   */
  onCalciteDropdownSelect() {
    const { dropdownEl } = this;
    // value key selected by user
    const selectedValue = dropdownEl.selectedItems[0].dataset.value;
    // if map has a ui to draw tools
    if (this.completeValidSearch) {
      // if the user selection is not "Draw your own"
      if (selectedValue !== "draw") {
        // emits geometry && user selection of location type
        this.arcgisHubGeometryResultSelection.emit({ geometry: this._getGeometry(selectedValue), userSelection: selectedValue, locationName: this.inputEl.value });
      }
      // clears suggestions
      this.suggestions = [];
      // location selected by user
    }
    else {
      this.selectedKey = selectedValue;
      this.value = this.selected.text;
      this.search();
    }
  }
  onCalciteInputChange(e) {
    this.value = e.target.value;
  }
  onCalciteInputInput(e) {
    this.value = e.target.value;
    if (this.value) {
      this.getSuggestions();
    }
  }
  handleSetDropdownRef(dropdownEl) {
    if (dropdownEl) {
      this.dropdownEl = dropdownEl;
    }
  }
  async handleSetInputRef(inputEl) {
    if (inputEl) {
      this.inputEl = inputEl;
      // set focus on the input at the time we establish the element reference versus in every render loop
      await inputEl.setFocus();
    }
  }
  async getSuggestions() {
    const { value, completeValidSearch, hubTelemetry, searchViewModel } = this;
    hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.search.label.query), { search: value }));
    const { results: [result] } = await searchViewModel.suggest(value);
    if (completeValidSearch) {
      // Ignore hanging suggestion after a search
      this.completeValidSearch = null;
    }
    else {
      this.suggestions = (result === null || result === void 0 ? void 0 : result.results) || [];
    }
  }
  /**
   * extracts the geometry of each location type
   * TODO: add polyline and polygon once able to extract from result object
   *
   * @param type - location type
   * @returns __esri.Geometry
   */
  _getGeometry(type) {
    let geometry;
    // Determine validity based on type key
    switch (type) {
      case 'point':
        // check if point can be extracted from the search result
        geometry = getProp(this.completeValidSearch, "results[0].results[0].feature.geometry");
        break;
      case 'rectangle':
        // check if extent can be extracted from the search result
        geometry = getProp(this.completeValidSearch, "results[0].results[0].extent");
        break;
    }
    return geometry;
  }
  async search() {
    const { value, hubTelemetry, searchViewModel } = this;
    this.loading = true;
    const searchValue = this.selected || value;
    const result = await searchViewModel.search(searchValue);
    hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.zoom.label.to), { details: result === null || result === void 0 ? void 0 : result.searchTerm }));
    this.loading = false;
    this.selectedKey = null;
    setTimeout(() => {
      // checks for a valid result, otherwise ensures completeValidSearch is set to null
      this.completeValidSearch = (result === null || result === void 0 ? void 0 : result.numResults) === 1 ? result : null;
      // Call addLocationType when the parent component has defined draw tools passed in and there is a valid result.
      // Otherwise, clear all suggestions. This ensures the additional dropdown of location types appears only if draw tools are available.
      this.tools && this.completeValidSearch ? this.addLocationType() : this.suggestions = [];
    }, 150);
  }
  /**
   * Updates suggestions with valid location types.
   * TODO: Once calcite-dropdown-item gets bumped, disable invalid location types rather than remove them.
   * This method will likely become unnecessary
   */
  addLocationType() {
    // filters location types dependent on tools and result information
    const filterTypes = getAllLocationTypes(this.intl).filter(type => this.isValidLocationType(type.key));
    // Since the "draw" key is always included, we verify if there are other location types in filterTypes. If there
    // are no additional types, we clear the suggestions. Otherwise, suggestions will be set to filterTypes.
    this.suggestions = filterTypes.length === 1 ? [] : filterTypes;
  }
  /**
   * Determines if the location type is valid within tools and has a geometry
   * or of type 'draw' which is always included
   *
   * @param type - location type
   * @returns boolean - true if type should be included, false otherwise
   */
  isValidLocationType(type) {
    const validType = this.tools.includes(type) && !!this._getGeometry(type);
    return validType || type === "draw";
  }
  searchIfEnter(e) {
    const { key } = e;
    if (key === 'Enter') {
      this.search();
    }
  }
  toggleActive() {
    const { active, arcgisHubWidgetPanelToggled } = this;
    this.active = !active;
    arcgisHubWidgetPanelToggled.emit(active);
  }
  connectWatch() {
    const { view } = this;
    if (view) {
      this.handle = watch(() => view.size, this.setInputWidth);
    }
  }
  removeWatch() {
    const { handle } = this;
    if (handle) {
      handle.remove();
    }
    this.handle = undefined;
  }
  async connectViewModel() {
    const { view } = this;
    if (view) {
      await view.when();
      this.searchViewModel = new SearchViewModel(Object.assign({ autoSelect: true, suggestionsEnabled: true, maxResults: 1, maxSuggestions: 5, minSuggestCharacters: 3, view: view }, this.searchViewModelProperties));
    }
  }
  setInputWidth() {
    // restrain input with to no greater than 65% view width for small view widths
    const { inputEl, view: { size } } = this;
    if (!inputEl) {
      return;
    }
    const [viewWidth] = size;
    this.width = viewWidth < 600 ? `${viewWidth * .65}px` : '25rem';
  }
  get positionClass() {
    const { viewPosition } = this;
    if (!viewPosition) {
      return;
    }
    return `hub-widget-search ${viewPosition.split('-').join(' ')}`;
  }
  get selected() {
    const { suggestions, selectedKey } = this;
    return suggestions.filter(({ key }) => key === selectedKey).pop();
  }
  get styles() {
    const { width } = this;
    return {
      '--width': width
    };
  }
  render() {
    const { value, loading, scale, active, styles } = this;
    const textOpen = this.intl.t('textOpen');
    const textClose = this.intl.t('textClose');
    const placeholder = this.intl.t('placeholder');
    return (h(Host, { "data-element": 'map-widget-search', style: styles }, this.active &&
      h("section", { class: this.positionClass }, h("calcite-input", { clearable: true, icon: "search", loading: loading, onKeyPress: this.searchIfEnter, placeholder: placeholder, ref: this.handleSetInputRef, scale: this.inputScale, value: value }), h("calcite-dropdown", { ref: this.handleSetDropdownRef, scale: scale }, h("span", { slot: "trigger" }), h("calcite-dropdown-group", { selectionMode: 'single' }, this.suggestions.map((suggestion) => (h("calcite-dropdown-item", { "data-value": suggestion.key, key: suggestion.key }, suggestion.text)))))), h("arcgis-hub-map-widget-generic", { active: active, icon: 'search', onClick: this.toggleActive, scale: scale, text: active ? textClose : textOpen })));
  }
  static get assetsDirs() { return ["locales"]; }
  get el() { return getElement(this); }
  static get watchers() { return {
    "view": ["handleViewChange"],
    "suggestions": ["handleSuggestionsChange"],
    "active": ["handleActiveChange"],
    "value": ["handleValueChange"],
    "searchViewModelProperties": ["handleSearchViewModelChange"]
  }; }
};
__decorate([
  DebounceDecoratorFactory({ timeout: 150 })
], ArcgisHubMapWidgetSearch.prototype, "getSuggestions", null);
__decorate([
  DebounceDecoratorFactory({ timeout: 25 })
], ArcgisHubMapWidgetSearch.prototype, "setInputWidth", null);
ArcgisHubMapWidgetSearch.style = arcgisHubMapWidgetSearchCss;

export { ArcgisHubMapWidgetSearch as arcgis_hub_map_widget_search };
