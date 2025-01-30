'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');
const callWhen = require('./call-when-7ec85145.js');
const GraphicsLayer = require('@arcgis/core/layers/GraphicsLayer.js');
const index$1 = require('./index-77afc8bd.js');
const webMercatorUtils_js = require('@arcgis/core/geometry/support/webMercatorUtils.js');
const arcgis = require('./arcgis-492079b8.js');
const Graphic = require('@arcgis/core/Graphic.js');
const intlManager = require('./intl-manager-f0103583.js');
const Polygon = require('@arcgis/core/geometry/Polygon.js');
const SpatialReference = require('@arcgis/core/geometry/SpatialReference.js');
const Extent = require('@arcgis/core/geometry/Extent.js');
const map = require('./map-610ee1fc.js');
const index$2 = require('./index-6f16fe65.js');
const geometryEngine = require('@arcgis/core/geometry/geometryEngine.js');
require('./types-ff8f7df0.js');
const interpolateTranslations = require('./interpolate-translations-83c38ec8.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
require('./store-2a385ca0.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
const extent = require('./extent-715f7c8d.js');
require('@arcgis/core/config.js');
require('./index-f4a4c954.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./interpolate-c1fe951a.js');
require('./get-prop-4bd8fc1a.js');
require('./request-67da3c71.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

const GraphicsLayer__default = /*#__PURE__*/_interopDefaultLegacy(GraphicsLayer);
const Graphic__default = /*#__PURE__*/_interopDefaultLegacy(Graphic);
const Polygon__default = /*#__PURE__*/_interopDefaultLegacy(Polygon);
const SpatialReference__default = /*#__PURE__*/_interopDefaultLegacy(SpatialReference);
const Extent__default = /*#__PURE__*/_interopDefaultLegacy(Extent);

const buildLocationSchema = (opts) => {
  const { hasNoGeometries, locationNameRequired } = opts;
  const required = [];
  if (locationNameRequired) {
    required.push("name");
  }
  return hasNoGeometries
    ? { type: "object" }
    : {
      type: "object",
      required,
      properties: {
        name: {
          type: "string"
        }
      }
    };
};
const buildLocationUiSchema = (opts) => {
  const { hasNoGeometries } = opts;
  return hasNoGeometries
    ? { type: "Layout", elements: [] }
    : {
      type: "Layout",
      elements: [
        {
          scope: "/properties/name",
          type: "Control",
          label: "{{locationName.label:translate}}",
          options: {
            messages: [
              {
                type: "ERROR",
                keyword: "required",
                icon: true,
                label: "{{locationName.error:translate}}"
              }
            ]
          }
        }
      ]
    };
};

const arcgisHubLocationPickerCss = ".sc-arcgis-hub-location-picker-h{display:block}@media (min-width: 640px){.row.sc-arcgis-hub-location-picker{display:flex}.row.sc-arcgis-hub-location-picker{flex-direction:row-reverse}}arcgis-hub-map.sc-arcgis-hub-location-picker{position:relative;margin-bottom:1rem;height:430px;width:100%}@media (min-width: 640px){arcgis-hub-map.sc-arcgis-hub-location-picker{margin-bottom:0px}}.hide.sc-arcgis-hub-location-picker{display:none}arcgis-hub-map.sc-arcgis-hub-location-picker .arcgis-location-picker-map-overlay.sc-arcgis-hub-location-picker{position:absolute;top:0px;left:0px;z-index:10;display:flex;height:100%;width:100%;flex-direction:column;justify-content:center;background-color:#0000004d;color:var(--calcite-color-text-inverse)}.arcgis-location-picker-none-message.sc-arcgis-hub-location-picker{text-align:center}.draw-popover.sc-arcgis-hub-location-picker{width:max-content}.draw-popover.sc-arcgis-hub-location-picker>p.sc-arcgis-hub-location-picker{margin:0px;padding:0.75rem}.location-picker__sidepanel.sc-arcgis-hub-location-picker{display:flex;width:100%;flex-direction:column;justify-content:space-between;background-color:var(--calcite-color-foreground-3);padding:1rem}@media (min-width: 640px){.location-picker__sidepanel.sc-arcgis-hub-location-picker{max-width:20rem}}calcite-list.sc-arcgis-hub-location-picker{width:100%;background-color:var(--calcite-color-foreground-3);color:var(--calcite-color-text-3)}@media (min-width: 640px){calcite-list.sc-arcgis-hub-location-picker{max-width:20rem}}calcite-notice.sc-arcgis-hub-location-picker{width:100%}@media (min-width: 640px){calcite-notice.sc-arcgis-hub-location-picker{max-width:20rem}}calcite-popover[open].sc-arcgis-hub-location-picker+calcite-tooltip.sc-arcgis-hub-location-picker{display:none}";

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
const MAP_TOOLS = ['point', 'polyline', 'polygon', 'rectangle'];
const ArcgisHubLocationPicker = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubLocationPickerUpdate = index.createEvent(this, "arcgisHubLocationPickerUpdate", 7);
    this.arcgisHubMapPopoverOpen = index.createEvent(this, "arcgisHubMapPopoverOpen", 7);
    this.arcgisHubMapPopoverClear = index.createEvent(this, "arcgisHubMapPopoverClear", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    /**
     * Callback handles that are created/destroyed when connected/disconnected
     * from DOM
     */
    this.handles = [];
    this._drawToolIcons = {
      point: 'pin',
      polyline: 'freehand',
      polygon: 'freehand-area',
      rectangle: 'rectangle-area',
    };
    this.handleLocationEditorChange = (evt) => {
      evt.stopPropagation();
      const { values } = evt.detail;
      this._selected = Object.assign(Object.assign({}, this._selected), { location: Object.assign(Object.assign({}, this._selected.location), values) });
      this.arcgisHubLocationPickerUpdate.emit(this._selected.location);
    };
    /**
     * wrapper around the built-in intl.t function that
     * encapsulates the translation strings from this
     * component to pass into the configuration editor
     */
    this.translationFunc = (key, values, opts) => {
      return this.intl.t(key, values, opts);
    };
    this.options = undefined;
    this.extent = undefined;
    this.mapTools = MAP_TOOLS;
    this.theme = {};
    this.resetDrawingToolsOnDisconnect = true;
    this.maxVerticesCount = 60;
    this.maxFeaturesCount = 10;
    this.locationNameRequired = undefined;
    this.noticeTitleElementAriaLevel = undefined;
    this._selected = undefined;
    this._view = undefined;
    this._editingGraphic = undefined;
    this._isEditing = false;
    this._currentDrawTools = this.mapTools;
    this._currentActiveDrawTool = undefined;
    this.customLocationDrawActionRef = undefined;
    context.bind(this, '_setMapDrawElement', 'handleViewPointerMoveOrDown', 'handleViewPointerLeave', 'editFeature', 'removeFeature', 'renderEditOptions', 'setActiveLocationDrawType', 'clearEditState', 'handleGeometrySelection');
  }
  /**
   * Currently selected option type.
   */
  get _selectedType() {
    var _a, _b;
    return (_b = (_a = this._selected) === null || _a === void 0 ? void 0 : _a.location) === null || _b === void 0 ? void 0 : _b.type;
  }
  /**
   * Should we show draw tools and allow the editing of features
   * (currently only allows for custom option editing, but can be expanded)
   */
  get _shouldEditFeatures() {
    return ['custom'].includes(this._selectedType);
  }
  /**
   * What is the currently selected option
   */
  get _selectedOption() {
    var _a;
    return (_a = this.options) === null || _a === void 0 ? void 0 : _a.find(o => o.selected);
  }
  /**
   * Should we show the extent for a specific option
   */
  get _showExtent() {
    return ['item', 'org'].find(t => t === this._selectedType);
  }
  /**
   * Returns the extent of the currently selected option converted into a graphic.
   */
  get _selectedExtentGraphic() {
    var _a, _b, _c, _d;
    return [{
        symbol: map.getExtentSymbol(),
        geometry: Object.assign({ type: 'extent', spatialReference: (_b = (_a = this._selected) === null || _a === void 0 ? void 0 : _a.location) === null || _b === void 0 ? void 0 : _b.spatialReference }, extent.bBoxToExtent((_d = (_c = this._selected) === null || _c === void 0 ? void 0 : _c.location) === null || _d === void 0 ? void 0 : _d.extent))
      }];
  }
  /**
   * Returns the graphics for the arcgis-hub-map component.
   * Currently only in use for if the selected option should only show the extent graphic
   * 'custom' option has a graphics layer that is set on the mapEl.
   */
  get _selectedGraphics() {
    if (this._showExtent) {
      return this._selectedExtentGraphic;
    }
  }
  get _schema() {
    var _a, _b, _c;
    return buildLocationSchema({
      hasNoGeometries: this._selectedType === "none" || (this._shouldEditFeatures && !((_c = (_b = (_a = this._selected) === null || _a === void 0 ? void 0 : _a.location) === null || _b === void 0 ? void 0 : _b.geometries) === null || _c === void 0 ? void 0 : _c.length)),
      locationNameRequired: this.locationNameRequired
    });
  }
  get _uiSchema() {
    var _a, _b, _c;
    return interpolateTranslations.interpolateTranslations(this.intl, buildLocationUiSchema({
      hasNoGeometries: this._selectedType === "none" || (this._shouldEditFeatures && !((_c = (_b = (_a = this._selected) === null || _a === void 0 ? void 0 : _a.location) === null || _b === void 0 ? void 0 : _b.geometries) === null || _c === void 0 ? void 0 : _c.length)),
    }));
  }
  /**
   * Attach the draw tools element
   */
  _setMapDrawElement(el) {
    this._mapDrawToolsEl = el;
  }
  /**
  * Returns default theme mixed with any custom theme options
  */
  get themeWithDefaults() {
    const { theme } = this;
    const _themeWithDefaults = {};
    ['extent', 'point', 'polyline', 'polygon'].forEach((type) => {
      _themeWithDefaults[type] = Object.assign(Object.assign({}, index$1.defaultLayerThemeOptions[type]), theme[type]);
    });
    return _themeWithDefaults;
  }
  async componentWillLoad() {
    // set up intl
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.el);
    // set the selected option
    this.onOptionsUpdate();
    // add watch handlers
    this.addWatchHandles();
  }
  /**
   * Connected callback lifecycle method, adds watch handle callbacks
   */
  connectedCallback() {
    this.addWatchHandles();
  }
  /**
   * Disconnect callback lifecycle method, removes watch handle callbacks
   * for garbage collection
   */
  disconnectedCallback() {
    this.removeWatchHandles();
  }
  /**
   * Adds event listeners on view
   */
  addWatchHandles() {
    const { _view, handles } = this;
    if (_view) {
      handles.push(this._view.on(['pointer-move', 'pointer-down'], this.handleViewPointerMoveOrDown));
      handles.push(this._view.on('pointer-leave', this.handleViewPointerLeave));
    }
  }
  /**
   * Removes event listeners for garbage collection
   */
  removeWatchHandles() {
    const { handles } = this;
    handles.forEach((handle) => {
      handle.remove();
    });
    this.handles = [];
  }
  /* Watch / Listeners begin */
  handleViewChange(view, prevView) {
    if (view && view !== prevView) {
      this.removeWatchHandles();
      this.addWatchHandles();
    }
  }
  /**
   * Watch for changes to the options prop
   */
  async onOptionsUpdate() {
    var _a, _b;
    // UPdate the selected option
    this._selected = Object.assign({}, this._selectedOption);
    // If we should be editing features then we need to initialize the graphics layer / any existing graphics
    if (this._shouldEditFeatures) {
      await this._initializeGraphicsLayer();
      // If we have a selected org/item, then we want to update the extent to geometries
      // this fires on the first load of the component
    }
    else if (this._showExtent && (!((_a = this._selected.location) === null || _a === void 0 ? void 0 : _a.geometries) || !((_b = this._selected.location) === null || _b === void 0 ? void 0 : _b.geometries.length))) {
      this._updateSelectedLocationExtentToGeometry();
      // emit out currently selected option
      // We are only doing this in here because it's the only place in onOptionsUpdate
      // where the location might change.
      this._emitLocationWithFallback();
    }
  }
  async handleMapViewReady(e) {
    e.stopPropagation();
    const { detail: { view } } = e;
    await view.when();
    //clear the default zoom controls
    view.ui.components = [];
    // Attach the view
    this._view = view;
    // If we should be editing features then we need to initialize the graphics layer / any existing graphics
    if (this._shouldEditFeatures) {
      await this._initializeGraphicsLayer();
    }
  }
  /**
   * Listen for when the calcite-list-item is selected
   */
  async handleListItemSelect(e) {
    e.stopPropagation();
    // Get the selection option
    const value = e.target.value;
    const selected = this.options[value];
    // If the selected option is not the same as the previous selection
    // (we need this due to calcite-list allowing you to reselect the same item)
    if (selected.location.type !== this._selectedType) {
      // If old selection was custom, we need to clean matters up.
      if (this._shouldEditFeatures) {
        // Clear the graphics layer
        this._destroyLayers();
        // Close any popovers (they will stick around otherwise)
        this.arcgisHubMapPopoverClear.emit();
        // clear out edit graphic just in case
        this._mapDrawToolsEl.forceReset();
        // reset drawing tools props
        this._resetToolsAndEditState(true);
      }
      // Update the selected option
      this._selected = Object.assign(Object.assign({}, selected), {
        // NOTE: sources w/ .selected reflects initial selection state
        selected: true
      });
      // If we've switched to custom/need to initialize the graphics layer
      if (this._shouldEditFeatures) {
        await this._initializeGraphicsLayer();
      }
      // If we've switched to an org or item, then also convert the extent to a geometry
      if (this._showExtent) {
        this._updateSelectedLocationExtentToGeometry();
      }
      this._emitLocationWithFallback();
      // goes to the selected option's extent
      if (this._selected.location.extent) {
        let extent$1 = new Extent__default['default'](extent.bBoxToExtent(this._selected.location.extent));
        extent$1 = extent$1.expand(1.5);
        this._view.extent = extent$1;
      }
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$2.dist.dictionary.category.interaction.action.select), { label: selected.label }));
    }
  }
  /**
   * LIsten for when the map draw tools emit a graphics change event
   */
  handleGraphicsChange(e) {
    const { detail: { graphics, save, unsaved, canceled } } = e;
    // Get the current graphics
    const graphic = graphics.getItemAt(0);
    const geometry = graphic.geometry.clone();
    // should we only simplify polygons or lines?
    graphic.geometry = geometry.type === 'extent'
      ? geometry
      : geometryEngine.generalize(graphic.geometry.clone(), index$1.getMaxDeviation(this._view), false);
    // If the graphic is 'unsaved' or 'save' (ie you've just added the graphic to the map
    // or you've just confirmed an edit of the graphic)
    if (unsaved || save) {
      graphic.symbol = index$1.symbols[graphic.geometry.type](index$1.SYMBOL_STATE.DEFAULT, this.themeWithDefaults[graphic.geometry.type]);
      this._addGraphic(graphic);
    }
    else if (canceled) {
      // Cancelled fires when the user is trying to edit an existing graphic
      // and has selected 'Cancel changes' in the popover
      this._mapDrawToolsEl.forceReset();
      // We need to re-add the current editing graphic to the graphics layer
      this._addGraphicsToGraphicsLayer(this.geometryGraphicsLayer, [this._editingGraphic]);
      this.arcgisHubMapPopoverClear.emit();
      // Emit out the currently selected option
      this.arcgisHubLocationPickerUpdate.emit(this._selected.location);
      // reset tools and state
      this._resetToolsAndEditState();
    }
  }
  handleDrawToolSelection(e) {
    e.preventDefault();
    const tool = e.detail;
    // When a tool is selected we want to enable editing to prevent
    // the user from editing an existing feature while trying to draw a new one
    // handleGraphicsChange will disable editing when the user is done drawing
    this._isEditing = true;
    if (tool) {
      this._currentDrawTools = [tool];
      this._currentActiveDrawTool = tool;
    }
  }
  /**
   * Catches the arcgisHubGeometryResultSelection event and creates a graphic dependent
   * on geometry. Then updates draw tools with userSelection and adds graphic to graphic layer.
   *
   * @param e - CustomEvent<__esri.Geometry, Tool>
   */
  handleGeometrySelection(e) {
    e.stopPropagation();
    const { geometry, userSelection, locationName } = e.detail;
    // sets symbol for determined geometry type
    const symbol = index$1.symbols[geometry.type](index$1.SYMBOL_STATE.DEFAULT, this.themeWithDefaults[geometry.type]);
    // creates graphic
    const graphic = new Graphic__default['default']({
      geometry, symbol
    });
    // Sets the active and current draw tools based on user selection
    this._currentDrawTools = [userSelection];
    this._currentActiveDrawTool = userSelection;
    // adds graphic to graphics layer and cleans surrounding properties
    if (locationName) {
      this._currentLocationName = locationName;
    }
    this._addGraphic(graphic);
  }
  /**
   * Callback for view 'pointer-move' and 'pointer-down' events
   * and checking for overlap of graphicsLayer && managing popover render
   */
  handleViewPointerMoveOrDown(e) {
    const { _view, geometryGraphicsLayer } = this;
    // We only want to do this if we're editing features
    if (this._shouldEditFeatures) {
      // Run a hit test on the map view
      _view.hitTest(e, { include: geometryGraphicsLayer }).then((resp) => {
        // If the hit test 'hits' a graphic...
        const result = arcgis.getFirstHitGraphic(resp.results);
        if (result && !this._isEditing) {
          // Set the current editing graphic
          this._editingGraphic = result.graphic;
          // Open the popover
          this.arcgisHubMapPopoverOpen.emit({
            source: 'location-picker-options',
            geometry: result.graphic.geometry,
            view: _view,
            render: this.renderEditOptions
          });
        }
      });
    }
  }
  /**
   * Callback for view 'pointer-leave' event
   * and checking to see if we should clear popover.
   */
  handleViewPointerLeave(e) {
    var _a;
    e.stopPropagation();
    // Are we over a popover?
    if (((_a = e.native.relatedTarget) === null || _a === void 0 ? void 0 : _a.tagName) !== 'ARCGIS-HUB-MAP-POPOVER') {
      // If we are not over a popover we have properly left the view
      // (this will happen by leaving the map with the mouse, or by hovering over draw tools)
      // meaning we should clear the popover.
      this.arcgisHubMapPopoverClear.emit();
    }
  }
  /**
   * Handles the adding of graphics to the graphics layers specifically after you've just added the graphic to the map or
   * you've just confirmed an edit of the graphic along with a reset and update of draw tools, and selected location.
   * This method performs several tasks to ensure the drawing tools and graphics on the map are reset and updated properly
   *
   * @param graphic - The graphic to be processed and added to the graphics layer.
   */
  _addGraphic(graphic) {
    var _a;
    // Reset the drawing tools on the map-widget-draw container.
    this._mapDrawToolsEl.forceReset();
    // Add the graphic to the specified graphics layer.
    this._addGraphicsToGraphicsLayer(this.geometryGraphicsLayer, [graphic]);
    // Update the currently selected options location with the new graphic.
    this._updateSelectedLocation();
    // Check the current count of points in the selected location and emit an update if within the maximum vertices count.
    if (map.getPointCount((_a = this._selected) === null || _a === void 0 ? void 0 : _a.location) <= this.maxVerticesCount) {
      this.arcgisHubLocationPickerUpdate.emit(this._selected.location);
    }
    // Clear the current editing graphic and close the popover, then reset the draw tools.
    this.arcgisHubMapPopoverClear.emit();
    this._resetToolsAndEditState();
    // We are no longer editing
    this._isEditing = false;
  }
  _updateSelectedLocation() {
    this._selected.location = Object.assign(Object.assign({}, this._selected.location), { geometries: this.geometryGraphicsLayer.graphics.clone().toArray().map(g => {
        var _a, _b;
        // If we have a specific spatial reference for the location, project the geometry
        // Otherwise just return the geometry
        const geometry = ((_a = this._selected.location) === null || _a === void 0 ? void 0 : _a.spatialReference)
          ? webMercatorUtils_js.project(g.geometry, (_b = this._selected.location) === null || _b === void 0 ? void 0 : _b.spatialReference)
          : g.geometry;
        return Object.assign(Object.assign({}, geometry.toJSON()), { type: geometry.type });
      }), extent: this._getExtentForAllGraphics, name: this._currentLocationName });
  }
  get _getCurrentFeaturesCount() {
    var _a, _b, _c;
    return ((_c = (_b = (_a = this._selected) === null || _a === void 0 ? void 0 : _a.location) === null || _b === void 0 ? void 0 : _b.geometries) === null || _c === void 0 ? void 0 : _c.length) || 0;
  }
  _updateSelectedLocationExtentToGeometry() {
    var _a, _b, _c, _d, _e;
    const polygon = new Polygon__default['default']({
      spatialReference: new SpatialReference__default['default']({ wkid: (_c = (_b = (_a = this._selected) === null || _a === void 0 ? void 0 : _a.location) === null || _b === void 0 ? void 0 : _b.spatialReference) === null || _c === void 0 ? void 0 : _c.wkid })
    });
    /**
     * as we are working with a polygon and not an extent, we need to explicitly
     * define the entire ring of the converted extent from (xmin, ymin) all the
     * way back around to (xmin, ymin)
     */
    const { xmin, ymin, xmax, ymax } = extent.bBoxToExtent((_e = (_d = this._selected) === null || _d === void 0 ? void 0 : _d.location) === null || _e === void 0 ? void 0 : _e.extent);
    polygon.addRing([[xmin, ymin], [xmin, ymax], [xmax, ymax], [xmax, ymin], [xmin, ymin]]);
    this._selected.location.geometries = [Object.assign(Object.assign({}, polygon.toJSON()), { type: 'polygon' })];
  }
  /* Watch / Listeners end */
  /* Graphics Layer logic Starts */
  /**
   * Initialize the graphics layer, and if there are any geometries existing in the selected option
   * add them to the graphics layer
   */
  async _initializeGraphicsLayer(setToolsOnInitialization = true) {
    var _a, _b, _c, _d;
    const { _view } = this;
    if (_view) {
      await _view.when();
      // Clear out any existing layers (this is needed for after saving in the config editor, there's already a layer present and then
      // onOptionsUpdate is called, which calls this method giving us a new layer. Thus we need to clear out existing layers just in case)
      this._destroyLayers();
      // Add the graphics layer
      this.addGeometryGraphicsLayer();
      // if there are graphics add them to the graphics layer
      if ((_a = this._selected.location) === null || _a === void 0 ? void 0 : _a.geometries) {
        this._addGraphicsToGraphicsLayer(this.geometryGraphicsLayer, this._selected.location.geometries.map(g => {
          return new Graphic__default['default']({
            geometry: g,
            symbol: index$1.symbols[g.type](index$1.SYMBOL_STATE.DEFAULT, this.themeWithDefaults[g.type])
          });
        }));
        if (setToolsOnInitialization) {
          // Set the tools to match the type of geom present
          const tool = map.getGeometryTypeDrawTool((_d = (_c = (_b = this._selected) === null || _b === void 0 ? void 0 : _b.location) === null || _c === void 0 ? void 0 : _c.geometries[0]) === null || _d === void 0 ? void 0 : _d.type);
          this._currentDrawTools = [tool];
          this._currentActiveDrawTool = tool;
        }
      }
    }
  }
  /**
   * Add graphics layer that will hold the drawn geometries
   */
  addGeometryGraphicsLayer() {
    // create new graphics layer
    this.geometryGraphicsLayer = new GraphicsLayer__default['default']({
      graphics: [],
      elevationInfo: {
        mode: 'on-the-ground'
      }
    });
    // add to map
    this._view.map.add(this.geometryGraphicsLayer);
  }
  /**
   * Adds graphics to a specified graphics layer
   */
  _addGraphicsToGraphicsLayer(layer, graphics) {
    layer.addMany(graphics);
  }
  /**
   * Remove layers from the map
   */
  _destroyLayers() {
    [this.geometryGraphicsLayer].forEach((layer) => {
      if (layer) {
        layer.removeAll();
        layer.destroy();
      }
    });
  }
  /**
   *  Gets extent for all graphics in the graphics layer.
   */
  get _getExtentForAllGraphics() {
    const { geometryGraphicsLayer } = this;
    let extent$1;
    // Iterate over all graphics in the graphics layer
    geometryGraphicsLayer.graphics.forEach((graphic) => {
      var _a, _b;
      const projectedGeometry = webMercatorUtils_js.project(graphic.geometry, (_b = (_a = this._selected) === null || _a === void 0 ? void 0 : _a.location) === null || _b === void 0 ? void 0 : _b.spatialReference);
      let gextent = projectedGeometry.extent;
      const calcForPoint = projectedGeometry.type === 'point'
        && (!extent$1 || !extent$1.contains(projectedGeometry));
      if (calcForPoint) {
        // If it's a point, we need to create an extent for it
        gextent = this.pointToExtent(projectedGeometry);
      }
      // gextent can be undefined/null if we have a point that is 'contained' in the extent
      // if we don't exclude that it will cause odd behavior
      if (gextent) {
        // Union the extent with the current extent
        extent$1 = !extent$1 ? gextent : extent$1.union(gextent);
      }
    });
    // Return the extent as a bbox
    return extent$1 ? extent.extentToBBox(extent$1) : undefined;
  }
  /**
   * Creates an extent from a point, used for determining zoom level
   * @param geometry Esri JSAPI Point Geometry
   * @param tolerance Number in Degrees to expand point extent
   * @returns
   */
  pointToExtent(geometry, tolerance = 0.0025) {
    const { x, y, spatialReference } = geometry;
    const extent = new Extent__default['default']({
      xmin: x - tolerance,
      ymin: y - tolerance,
      xmax: x + tolerance,
      ymax: y + tolerance,
      spatialReference
    });
    return extent;
  }
  _resetToolsAndEditState(resetDrawTools = false) {
    var _a, _b;
    // no longer editing
    this._isEditing = false;
    // Reset the draw tools
    this._mapDrawToolsEl.disableEditOptions = true;
    this._mapDrawToolsEl.disablePrimaryOptions = true;
    // Reset the editing graphic
    this._editingGraphic = null;
    // If geometry is empty, or resetDrawTools was passed in, reset the draw tools
    if (!((_b = (_a = this._selected.location) === null || _a === void 0 ? void 0 : _a.geometries) === null || _b === void 0 ? void 0 : _b.length) || resetDrawTools) {
      this._currentDrawTools = this.mapTools;
      this._currentActiveDrawTool = undefined;
    }
  }
  /**
   * Edit a selected feature, we roll this ourselves as we are working with a graphics layer
   */
  editFeature() {
    // We are editing.
    this._isEditing = true;
    // Hand down to the draw widget the geometry to edit
    this._mapDrawToolsEl.geometry = this._editingGraphic.geometry;
    // show draw widget popups
    this._mapDrawToolsEl.disableEditOptions = false;
    this._mapDrawToolsEl.disablePrimaryOptions = false;
    // remove the graphic from the graphics layer
    this.geometryGraphicsLayer.remove(this._editingGraphic);
    // close popup
    this.arcgisHubMapPopoverClear.emit();
  }
  /**
   * Remove a selected feature, we roll this ourselves as we are working with a graphics layer
   */
  removeFeature() {
    this._mapDrawToolsEl.forceReset();
    // remove the graphic from the graphics layer
    this.geometryGraphicsLayer.remove(this._editingGraphic);
    this._currentLocationName = undefined;
    // update the selected option
    this._updateSelectedLocation();
    // Emit out the currently selected option
    this._emitLocationWithFallback();
    // close popup
    this.arcgisHubMapPopoverClear.emit();
    // reset drawing tools props
    this._resetToolsAndEditState();
  }
  _emitLocationWithFallback() {
    var _a, _b, _c;
    // If we have no geometries, we need to emit a 'none' location as a fallback.
    const shouldEmitNoLocation = this._shouldEditFeatures && !((_c = (_b = (_a = this._selected) === null || _a === void 0 ? void 0 : _a.location) === null || _b === void 0 ? void 0 : _b.geometries) === null || _c === void 0 ? void 0 : _c.length);
    this.arcgisHubLocationPickerUpdate.emit(shouldEmitNoLocation ? { type: 'none' } : this._selected.location);
  }
  /**
   * Clear out all existing features, emit it out, and start over
   */
  async clearEditState() {
    // Clear the graphics layer
    this._destroyLayers();
    // Close any popovers (they will stick around otherwise)
    this.arcgisHubMapPopoverClear.emit();
    // clear out edit graphic just in case
    this._mapDrawToolsEl.forceReset();
    // reset drawing tools props
    this._resetToolsAndEditState(true);
    // update selected option
    this._selected.location = Object.assign(Object.assign({}, this._selected.location), { geometries: [] });
    this._currentLocationName = undefined;
    // Re-initialize the graphics layer
    await this._initializeGraphicsLayer(false);
    // emit the current location
    this._emitLocationWithFallback();
    // telemetry
    this.hubTelemetry.emit(index$2.dist.dictionary.category.interaction.action.remove.label.location.details.clearAll);
  }
  /* Graphics Layer logic ends */
  /* Render methods start */
  /**
   * Render the edit popover
   * Needs to be done at this level as we are working with a graphics layer
   */
  renderEditOptions() {
    const textUpdate = this.intl.t('edit');
    const textDelete = this.intl.t('delete');
    return (index.h("calcite-action-pad", { "expand-disabled": true, layout: "horizontal" }, index.h("calcite-action", { icon: "pencil", onClick: this.editFeature, text: textUpdate }), index.h("calcite-action", { icon: "trash", onClick: this.removeFeature, text: textDelete })));
  }
  /**
   * Render the popovers. Both this and the above render method are needed when working with
   * a arcgis-hub-map-popover
   */
  renderPopovers() {
    return (index.h("arcgis-wormhole", { styles: { position: 'absolute', top: 0, left: 0 } }, index.h("arcgis-hub-map-popover", { target: "location-picker-options", unthemed: true })));
  }
  renderNotice() {
    var _a, _b, _c, _d, _e, _f;
    if (this._shouldEditFeatures) {
      const showNoPointsDrawnWarning = !((_c = (_b = (_a = this._selected) === null || _a === void 0 ? void 0 : _a.location) === null || _b === void 0 ? void 0 : _b.geometries) === null || _c === void 0 ? void 0 : _c.length);
      const showMaxFeaturesExceededError = this._getCurrentFeaturesCount >= this.maxFeaturesCount;
      const showMaxPointsExceededError = map.getPointCount((_d = this._selected) === null || _d === void 0 ? void 0 : _d.location) > this.maxVerticesCount;
      const entityType = ((_e = this._selected) === null || _e === void 0 ? void 0 : _e.entityType) || 'content';
      const showWarning = showNoPointsDrawnWarning || showMaxFeaturesExceededError || showMaxPointsExceededError;
      return (index.h("div", { "aria-live": "polite", class: "notice-status-wrapper", role: "status" }, index.h("calcite-notice", { icon: showWarning ? "exclamation-mark-triangle" : 'information', kind: showWarning ? 'warning' : 'info', open: true }, index.h("div", { "aria-level": this.noticeTitleElementAriaLevel,
        // If the element has an aria-level, set the role to heading
        role: this.noticeTitleElementAriaLevel ? "heading" : null, slot: "title" }, showNoPointsDrawnWarning ?
        this.intl.t('emptyLocation.title') :
        // If show max features exceeded warning...
        showMaxFeaturesExceededError ?
          this.intl.t('maximumLocations.title') :
          // If show max points exceeded warning...
          showMaxPointsExceededError ?
            this.intl.t('maximumPoints.title', { currentCount: map.getPointCount((_f = this._selected) === null || _f === void 0 ? void 0 : _f.location), maxLocations: this.maxVerticesCount }) :
            this.intl.t('populatedLocation.title')), index.h("div", { slot: "message" }, showNoPointsDrawnWarning ?
        this.intl.t('emptyLocation.message', { entityType: this.intl.t(`entityTypes.${entityType}`) }) :
        // If show max features exceeded warning message...
        showMaxFeaturesExceededError ?
          this.intl.t('maximumLocations.message') :
          // If show max points exceeded warning message...
          showMaxPointsExceededError ?
            this.intl.t('maximumPoints.message') :
            // Otherwise show normal message
            this.intl.t('populatedLocation.message', { maxLocations: this.maxFeaturesCount })))));
    }
  }
  setActiveLocationDrawType(evt) {
    const { target } = evt;
    const geometryType = target.dataset.type;
    const tool = map.getGeometryTypeDrawTool(geometryType);
    this._mapDrawToolsEl.setActiveTool(tool);
    this._currentDrawTools = [tool];
    this._currentActiveDrawTool = tool;
    this.locationTypePopoverElement.open = false;
  }
  get locationActionTypes() {
    return this._currentDrawTools.map((tool) => {
      const type = tool === 'rectangle'
        ? 'extent'
        : tool;
      return { type, icon: this._drawToolIcons[tool] };
    });
  }
  /**
   * Render the custom end of line action which displays the draw tools as well.
   */
  renderCustomAction(option) {
    var _a;
    const { _currentActiveDrawTool, _isEditing, _drawToolIcons, _shouldEditFeatures, _getCurrentFeaturesCount, maxFeaturesCount, maxVerticesCount } = this;
    if (((_a = option.location) === null || _a === void 0 ? void 0 : _a.type) === 'custom') {
      return (index.h(index.Fragment, null, index.h("calcite-action", { class: {
          'hide': !_shouldEditFeatures
        }, icon: _currentActiveDrawTool ? _drawToolIcons[_currentActiveDrawTool] : "pencil-mark-plus", ref: (el) => { this.customLocationDrawActionRef = el; }, slot: "actions-end" }, index.h("calcite-popover", { autoClose: true, overlayPositioning: "fixed", ref: (locationTypePopoverElement) => { this.locationTypePopoverElement = locationTypePopoverElement; }, referenceElement: this.customLocationDrawActionRef }, this.locationActionTypes.map(({ type, icon }) => {
        var _a;
        return (index.h("calcite-action", { class: {
            'hide': _getCurrentFeaturesCount >= maxFeaturesCount || map.getPointCount((_a = this._selected) === null || _a === void 0 ? void 0 : _a.location) > maxVerticesCount,
          }, "data-type": type, disabled: _isEditing, icon: icon, key: type, onClick: this.setActiveLocationDrawType, text: this.intl.t(`drawLocationPopover.${type}`), textEnabled: true }));
      }), index.h("calcite-action", { class: {
          'hide': !_getCurrentFeaturesCount
        }, "data-type": "reset", icon: "x-circle", key: "reset", onClick: this.clearEditState, text: this.intl.t('drawLocationPopover.clear'), textEnabled: true })), index.h("calcite-tooltip", { closeOnClick: true, label: this.intl.t('drawLocationPopover.tooltip'), overlayPositioning: "fixed", placement: "top", referenceElement: this.customLocationDrawActionRef }, index.h("span", null, this.intl.t('drawLocationPopover.tooltip'))))));
    }
  }
  render() {
    var _a;
    const noneTypeSelected = this._selectedType === 'none';
    const customTypeSelected = this._selectedType === 'custom';
    return (index.h(index.Host, { "data-element": "location-picker", unthemed: true }, index.h("div", { class: "row" }, index.h("arcgis-hub-map", Object.assign({ basemap: "gray-vector", expand: EXPAND_FACTOR, extent: this.extent, graphics: this._selectedGraphics }, { inert: noneTypeSelected }), index.h("arcgis-hub-map-widget-container", { "expand-disabled": true, scale: "m", view: this._view, "view-position": "top-right" }, index.h("arcgis-hub-map-widget-search", { active: customTypeSelected && Boolean(this._view), onArcgisHubGeometryResultSelection: this.handleGeometrySelection, scale: "m", searchViewModelProperties: {
        popupEnabled: false,
        resultGraphicEnabled: !this._shouldEditFeatures
      }, tools: this._shouldEditFeatures ? this._currentDrawTools : undefined, view: this._view })), index.h("arcgis-hub-map-widget-container", { "expand-disabled": true, view: this._view, "view-position": "top-right" }, index.h("arcgis-hub-map-widget-zoom", { view: this._view })), index.h("arcgis-hub-map-widget-container", { view: this._view, "view-position": "top-right" }, index.h("arcgis-hub-map-widget-draw", { class: {
        // Hide the draw controls if we're not editing features or if we've exceeded the max number of features/points
        'hide': !this._shouldEditFeatures || (map.getPointCount((_a = this._selected) === null || _a === void 0 ? void 0 : _a.location) > this.maxVerticesCount || this._getCurrentFeaturesCount >= this.maxFeaturesCount)
      }, "disable-edit-options": true, "disable-primary-options": true, disabled: this._isEditing, "enable-map-tips": true, ref: this._setMapDrawElement, resetOnDisconnect: this.resetDrawingToolsOnDisconnect, tools: this._currentDrawTools, unthemed: true, view: this._view }), index.h("arcgis-hub-map-widget-generic", { class: {
        'hide': !this._getCurrentFeaturesCount && !this._currentActiveDrawTool
      }, "data-type": "reset", icon: "x-circle", onClick: this.clearEditState, text: this.intl.t('drawLocationPopover.clear') })), noneTypeSelected
      ? (index.h("div", { class: "arcgis-location-picker-map-overlay" }, index.h("div", { class: "arcgis-location-picker-none-message" }, this.intl.t('noneMessage'))))
      : null), index.h("div", { class: "location-picker__sidepanel" }, index.h("calcite-list", { "selection-mode": "single" }, this.options.map((option, idx) => {
      var _a;
      return index.h("calcite-list-item", { description: option.description, key: (_a = option.location) === null || _a === void 0 ? void 0 : _a.type, label: option.label, selected: option.selected, value: idx }, this.renderCustomAction(option));
    })), index.h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleLocationEditorChange, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: this._selected.location }), this.renderNotice())), this.renderPopovers()));
  }
  static get assetsDirs() { return ["locales"]; }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "_view": ["handleViewChange"],
    "options": ["onOptionsUpdate"]
  }; }
};
__decorate([
  callWhen.CallWhenFactory({ when() { return this._view; } })
], ArcgisHubLocationPicker.prototype, "renderPopovers", null);
ArcgisHubLocationPicker.style = arcgisHubLocationPickerCss;

exports.arcgis_hub_location_picker = ArcgisHubLocationPicker;
