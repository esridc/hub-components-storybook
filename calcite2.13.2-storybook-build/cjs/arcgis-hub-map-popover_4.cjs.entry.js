'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const geometryEngine = require('@arcgis/core/geometry/geometryEngine.js');
const callWhen = require('./call-when-7ec85145.js');
const Polygon = require('@arcgis/core/geometry/Polygon.js');
const context = require('./context-0167a31e.js');
const intlManager = require('./intl-manager-f0103583.js');
const index$1 = require('./index-6f16fe65.js');
const string = require('./string-df2d8a2a.js');
const reactiveUtils_js = require('@arcgis/core/core/reactiveUtils.js');
const GraphicsLayer = require('@arcgis/core/layers/GraphicsLayer.js');
const SketchViewModel = require('@arcgis/core/widgets/Sketch/SketchViewModel.js');
const GroupLayer = require('@arcgis/core/layers/GroupLayer.js');
const Graphic = require('@arcgis/core/Graphic.js');
const webMercatorUtils_js = require('@arcgis/core/geometry/support/webMercatorUtils.js');
const Geometry = require('@arcgis/core/geometry/Geometry.js');
const Extent = require('@arcgis/core/geometry/Extent.js');
const Point = require('@arcgis/core/geometry/Point.js');
const arcgis = require('./arcgis-492079b8.js');
const map = require('./map-610ee1fc.js');
const memoize = require('./memoize-1f967971.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('@arcgis/core/config.js');
require('./generate-random-string-8807d629.js');
require('./get-prop-4bd8fc1a.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

const geometryEngine__namespace = /*#__PURE__*/_interopNamespace(geometryEngine);
const Polygon__default = /*#__PURE__*/_interopDefaultLegacy(Polygon);
const GraphicsLayer__default = /*#__PURE__*/_interopDefaultLegacy(GraphicsLayer);
const SketchViewModel__default = /*#__PURE__*/_interopDefaultLegacy(SketchViewModel);
const GroupLayer__default = /*#__PURE__*/_interopDefaultLegacy(GroupLayer);
const Graphic__default = /*#__PURE__*/_interopDefaultLegacy(Graphic);
const Geometry__default = /*#__PURE__*/_interopDefaultLegacy(Geometry);
const Extent__default = /*#__PURE__*/_interopDefaultLegacy(Extent);
const Point__default = /*#__PURE__*/_interopDefaultLegacy(Point);

/**
 * Determine which view quadrant a point is located
 * @param point ScreenPoint
 * @param view MapView
 * @returns Quadrant
 */
const getQuad = (point, view) => {
  const { height, width } = view;
  const yQuad = point.y < height / 2
    ? 'top'
    : 'bottom';
  const xQuad = point.x < width / 2
    ? 'left'
    : 'right';
  return `${yQuad}-${xQuad}`;
};
/**
 * Given an extent and quad, return corner point closest to map center
 * @param extent Extent
 * @param quad Quadrant
 * @returns Point
 */
const getExtentQuadCornerPoint = (extent, quad) => {
  const { xmin, ymin, xmax, ymax, spatialReference } = extent;
  const y = quad.includes('top')
    ? ymin
    : ymax;
  const x = quad.includes('left')
    ? xmax
    : xmin;
  return {
    x,
    y,
    spatialReference
  };
};
/**
 * Calculates planar distance between two points
 * @param pointA Point
 * @param pointB Point
 * @returns Distance between points in relative units
 */
const distance = (pointA, pointB) => {
  const { x: x1, y: y1 } = pointA;
  const { x: x2, y: y2 } = pointB;
  const dX = x2 - x1;
  const dY = y2 - y1;
  return Math.sqrt(dX ** 2 + dY ** 2);
};
/**
 * Dermine the closest point on a polygon or polyline from a given point
 * @param point Point
 * @param geom Polygon || Polyline
 * @returns Point
 */
const getClosestPoint = (point, geom) => {
  const { spatialReference } = geom;
  let minDistance = Infinity;
  let closestPointIndex = 0;
  // flatten multi-paths, multi-rings into simple point aray
  const coords = (geom.type === 'polygon'
    ? geom.rings.flat(Infinity)
    : geom.paths.flat(Infinity)).reduce((accum, value, index) => {
    // reassemble into [x,y] coordinates
    const coordIndex = Math.floor(index / 2);
    if (!accum[coordIndex]) {
      accum[coordIndex] = [];
    }
    accum[coordIndex].push(value);
    return accum;
  }, []);
  coords.forEach((coord, index) => {
    const [x, y] = coord;
    const distanceToPoint = distance({
      x,
      y,
      spatialReference
    }, point);
    if (distanceToPoint < minDistance) {
      minDistance = distanceToPoint;
      closestPointIndex = index;
    }
  });
  const [x, y] = coords[closestPointIndex];
  return {
    x,
    y,
    spatialReference
  };
};

const arcgisHubMapPopoverCss = ":host{position:absolute;z-index:1;width:max-content;--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);top:var(--top-offset);left:var(--left-offset);transform:var(--transform)}calcite-action{border-width:0px;border-top-width:1px;border-style:solid;border-color:var(--calcite-color-border-1)}calcite-action:first-of-type{border-width:0px}calcite-action-pad>calcite-action{border-width:0px}calcite-action-group{border-width:0px;border-bottom-width:1px;border-style:solid;border-color:var(--calcite-color-border-1)}calcite-action-group>calcite-action{border-style:none}";

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const ArcgisHubMapPopover = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.target = undefined;
    this.unthemed = false;
    this.x = undefined;
    this.y = undefined;
    this.quadrant = undefined;
    this.content = undefined;
  }
  /**
   * Handles the event for a popover open request, opening the popup
   * at a best fit location in the view and rendering the content
   * @param event PopoverEventDetails
   */
  handlePopoverOpen(event) {
    event.stopPropagation();
    const { detail: popoverEventDetails } = event;
    const view = popoverEventDetails.view;
    const geometry = popoverEventDetails.geometry;
    const { left, top, height, width } = view.container.getBoundingClientRect();
    if (geometry.type === 'polygon' || geometry.type === 'polyline' || geometry.type === 'extent') {
      const extent = geometry.extent;
      const centerScreenPoint = view.toScreen(extent.center);
      this.quadrant = getQuad(centerScreenPoint, view);
      const cornerPoint = getExtentQuadCornerPoint(extent, this.quadrant);
      const lineOrPolygon = geometry.type === 'extent'
        ? Polygon__default['default'].fromExtent(geometry)
        : geometry;
      const closestGeometryPoint = getClosestPoint(cornerPoint, lineOrPolygon);
      const closestGeometryScreenPoint = view.toScreen(closestGeometryPoint);
      if (closestGeometryScreenPoint.x < 0 ||
        closestGeometryScreenPoint.y < 0 ||
        closestGeometryScreenPoint.x > width ||
        closestGeometryScreenPoint.y > height) {
        // If closest geometry point is off screen
        // display pop in map center, assuming geometry is visible
        if (geometryEngine.intersects(view.extent, geometry)) {
          const viewCenterScreenPoint = view.toScreen(view.center);
          this.quadrant = getQuad(viewCenterScreenPoint, view);
          this.x = viewCenterScreenPoint.x + left;
          this.y = viewCenterScreenPoint.y + top;
        }
        else {
          this.content = null;
          return;
        }
      }
      else {
        this.x = closestGeometryScreenPoint.x + left;
        this.y = closestGeometryScreenPoint.y + top;
      }
    }
    else if (geometry.type === 'point') {
      // Handle point
      const pointScreenPoint = view.toScreen(geometry);
      this.quadrant = getQuad(pointScreenPoint, view);
      this.x = pointScreenPoint.x + left;
      this.y = pointScreenPoint.y + top;
    }
    if (this.x < left ||
      this.x > left + width ||
      this.y < top ||
      this.y > top + height) {
      // Don't display popover is desired placement is
      // outside of map view
      this.content = null;
      return;
    }
    // Render content in popover
    this.content = popoverEventDetails.render(geometry.type);
  }
  /**
   * Handles the event to clear any existing popover content
   * @param event
   */
  handlePopoverClear(event) {
    event.stopPropagation();
    this.content = null;
  }
  /**
   * Computes styles object
   */
  get styles() {
    const { quadrant, x, y } = this;
    const transformX = (quadrant === null || quadrant === void 0 ? void 0 : quadrant.includes('right'))
      ? 'translateX(-110%)'
      : 'translateX(10%)';
    const transformY = (quadrant === null || quadrant === void 0 ? void 0 : quadrant.includes('top'))
      ? 'translateY(-25%)'
      : 'translateY(-75%)';
    return {
      // add window.scrollY to y to account for scroll position
      '--top-offset': `${y + window.scrollY}px`,
      '--left-offset': `${x}px`,
      'transform': `${transformX} ${transformY}`,
    };
  }
  render() {
    const { styles, content, unthemed } = this;
    return (index.h(index.Host, { style: styles, unthemed: unthemed }, content));
  }
  get el() { return index.getElement(this); }
};
__decorate$1([
  callWhen.CallWhenFactory({ when(event) {
      const { target } = this;
      const { detail: { source } } = event;
      return (!target && !source) || ((target === null || target === void 0 ? void 0 : target.toLowerCase()) === (source === null || source === void 0 ? void 0 : source.toLowerCase()));
    } })
], ArcgisHubMapPopover.prototype, "handlePopoverOpen", null);
ArcgisHubMapPopover.style = arcgisHubMapPopoverCss;

const arcgisHubMapTipCss = ":host{display:block}span{margin:0px;width:auto;border-radius:0.5rem;--tw-bg-opacity:1;background-color:rgb(151 71 255 / var(--tw-bg-opacity));padding:0.5rem;font-size:var(--calcite-font-size--1);line-height:1rem;font-weight:var(--calcite-font-weight-medium);--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));--tw-drop-shadow:drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));filter:var(--tw-filter)}span.danger{background-color:var(--calcite-color-status-danger)}span.brand{background-color:var(--calcite-color-brand)}span.info{background-color:var(--calcite-color-status-info)}span.warning{background-color:var(--calcite-color-status-warning)}span.success{background-color:var(--calcite-color-status-success)}calcite-icon{margin-right:0.5rem;vertical-align:sub}";

const ArcgisHubMapTip = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.text = undefined;
    this.kind = undefined;
    this.icon = undefined;
  }
  render() {
    const { text, kind, icon } = this;
    return (index.h(index.Host, { "data-element": "map-tip" }, index.h("span", { class: kind }, icon && index.h("calcite-icon", { icon: icon, scale: "s" }), text)));
  }
};
ArcgisHubMapTip.style = arcgisHubMapTipCss;

/**
 * SketchViewModel states
 * https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch-SketchViewModel.html#event-create
 */
var DrawState;
(function (DrawState) {
  DrawState["START"] = "start";
  DrawState["ACTIVE"] = "active";
  DrawState["COMPLETE"] = "complete";
  DrawState["CANCEL"] = "cancel";
})(DrawState || (DrawState = {}));
/**
 * Map Tip states
 * 'start' -> before first location added
 * 'active' -> first location added, adding more points
 * 'inactive' -> not drawing / editing
 */
var TipState;
(function (TipState) {
  TipState["START"] = "start";
  TipState["ACTIVE"] = "active";
  TipState["INACTIVE"] = "inactive";
})(TipState || (TipState = {}));

const arcgisHubMapWidgetDrawCss = ":host{display:block}.hub-widget-draw{min-width:none !important;max-width:none !important;padding:0px}.draw-popover{width:max-content}.draw-popover>p{margin:0px;padding:0.75rem}@media only screen and (min-width: 640px){.hub-widget-draw.top{position:absolute}.hub-widget-draw.top{width:25rem}.hub-widget-draw.top{padding:0px}.hub-widget-draw.right{right:100%}.hub-widget-draw.right{margin-right:1rem}.hub-widget-draw.left{left:100%}.hub-widget-draw.left{margin-left:1rem}.hub-widget-draw.bottom.left{margin-left:0.5rem}.hub-widget-draw.bottom.right{margin-right:0.5rem}}@media only screen and (max-width: 640px){.hub-widget-draw.top{position:absolute}.hub-widget-draw.top{z-index:50}.hub-widget-draw.top{padding:0px}.hub-widget-draw.top{top:calc(var(--top-offset) + var(--bottom-offset));width:calc(var(--view-width) + 1px);display:var(--mobile-display)}.hub-widget-draw.right{right:-1rem}.hub-widget-draw.left{left:-1rem}}";

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
const allTools = ['select', 'point', 'polyline', 'polygon', 'rectangle'];
/**
 * Calcite icon name by drawing tool
 */
const toolIcons = {
  'select': {
    icon: 'select',
  },
  'point': {
    icon: 'pin'
  },
  'polyline': {
    icon: 'freehand'
  },
  'polygon': {
    icon: 'freehand-area'
  },
  'rectangle': {
    icon: 'rectangle-area'
  },
  'circle': {
    icon: 'circle'
  }
};
const ArcgisHubMapWidgetDraw = class {
  /**
   * Constructor function, pre-binds context to relevant methods
   */
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubMapDrawGraphicsChange = index.createEvent(this, "arcgisHubMapDrawGraphicsChange", 7);
    this.arcgisHubMapDrawGraphicsClear = index.createEvent(this, "arcgisHubMapDrawGraphicsClear", 7);
    this.arcgisHubMapDrawSelect = index.createEvent(this, "arcgisHubMapDrawSelect", 7);
    this.arcgisHubDrawCancel = index.createEvent(this, "arcgisHubDrawCancel", 7);
    this.arcgisHubDrawActiveToolChange = index.createEvent(this, "arcgisHubDrawActiveToolChange", 7);
    this.arcgisHubMapPopoverOpen = index.createEvent(this, "arcgisHubMapPopoverOpen", 7);
    this.arcgisHubMapPopoverClear = index.createEvent(this, "arcgisHubMapPopoverClear", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    /**
     * Callback handles that are created/destroyed when connected/disconnected
     * from DOM
     */
    this.handles = [];
    this.boundaries = undefined;
    this.geometry = undefined;
    this.mode = 'hybrid';
    this.scale = 'm';
    this.tools = allTools;
    this.view = undefined;
    this.disablePrimaryOptions = undefined;
    this.disableEditOptions = undefined;
    this.color = [0, 0, 0];
    this.buffer = undefined;
    this.condensed = undefined;
    this.resetOnDisconnect = true;
    this.enableMapTips = undefined;
    this.drawTip = undefined;
    this.unthemed = false;
    this.disabled = false;
    this.activeTool = undefined;
    this.isEditing = undefined;
    this.isFiltered = undefined;
    this.geometryIsInvalid = undefined;
    this.bufferDetails = undefined;
    this.bufferPanelVisible = undefined;
    this.bottomOffset = 0;
    this.topOffset = 0;
    this.viewWidth = undefined;
    this.open = undefined;
    this.optionsEl = undefined;
    this.mapTipState = TipState.INACTIVE;
    context.bind(this, 'applyFilter', 'cancelEdits', 'clearFilter', 'deleteDrawing', 'handleSetBufferWidgetRef', 'handleSketchOnCreate', 'handleSketchOnUpdate', 'handleViewClick', 'handleViewEscape', 'handleViewExtentChange', 'handleViewPointerMove', 'handleViewPointerMoveOrDown', 'renderPrimaryOptions', 'renderEditOptions', 'renderEditingOptions', 'renderMapTip', 'setPanelHeight', 'startEditing', 'saveEdits', 'setOptionsEl');
  }
  /**
   * Component will load lifecycle method, fetches translations and data
   * needed to render the UI
   */
  async componentWillLoad() {
    const { el } = this;
    this.intl = await intlManager.intlManager.loadIntlForComponent(el);
    this.createGraphicsLayers();
    await this.connectViewModel();
    this.addWatchHandles();
    this.setViewPosition();
    arcgis.loadArcGisCss();
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
    if (this.resetOnDisconnect) {
      this.reset();
    }
    this.removeWatchHandles();
  }
  /**
   * Handles the event that's emitted when graphics are created or edited
   */
  handleMapDrawFilter(event) {
    const { hubTelemetry, isFiltered } = this;
    const { detail: { graphics: [graphic], save } } = event;
    if (graphic && save && isFiltered) {
      const { geometry: { type } } = graphic;
      hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.search.label.filter), { details: string.capitalize(type) }));
    }
  }
  /**
   * Handles the event that's emitted when a draw tool is
   * selected.  Sets active tool, removes previous graphics from map,
   * removes popover, and empties any previous cached graphics.
   * @param event A Custom event with an icon payload
   */
  handleWidgetSelected(event) {
    const { activeTool, isEditing } = this;
    const { target } = event;
    const { icon } = target;
    const entryByIcon = ([, val]) => val.icon === icon;
    const tool = icon === 'minus-circle'
      ? activeTool
      : Object.entries(toolIcons).find(entryByIcon)[0];
    if (tool !== 'select') {
      this.reset();
    }
    else if (isEditing) {
      this.cancelEdits();
    }
    this.activeTool = (activeTool === tool) ? undefined : tool;
    this.open = false;
  }
  /**
   * Listens for buffer distance/unit changes
   */
  handleWidgetDrawBufferChanged(event) {
    const { detail } = event;
    this.bufferDetails = detail;
  }
  /**
   * Listens for buffer reset
   */
  handleWidgetDrawBufferReset() {
    const { bufferGraphicsLayer } = this;
    if (!bufferGraphicsLayer) {
      return;
    }
    this.bufferDetails = undefined;
    bufferGraphicsLayer.removeAll();
  }
  /**
   * Listens for buffer panel to be closed
   */
  handleWidgetDrawBufferClosed() {
    this.bufferPanelVisible = false;
  }
  /**
   * Listen for other panels to be opened and close buffer panel
   */
  handleWidgetPanelToggled(event) {
    const { target, detail: panelDismissed } = event;
    const { bufferWidgetEl } = this;
    if (target !== bufferWidgetEl && !panelDismissed) {
      this.bufferPanelVisible = false;
    }
    else if (target === bufferWidgetEl && !panelDismissed) {
      setTimeout(() => {
        // nextTick
        this.setPanelHeight();
      }, 0);
    }
  }
  /**
   * Focuses on the view after a short delay
   */
  focusView() {
    const { view } = this;
    setTimeout(() => {
      view === null || view === void 0 ? void 0 : view.focus();
    }, 250);
  }
  /**
   * Listens for activeTool state changes and calls
   * create() method on sketchViewModel for given geometry type
   */
  handleActiveToolChange(curTool, prevTool) {
    const { hubTelemetry, sketchViewModel, isEditing } = this;
    if (sketchViewModel) {
      sketchViewModel.cancel();
      if (curTool && curTool !== 'select' && !isEditing) {
        sketchViewModel.create(curTool);
        this.arcgisHubDrawActiveToolChange.emit(curTool);
      }
      else if (!curTool) {
        this.isEditing = false;
      }
    }
    const label = curTool === 'select'
      ? 'select'
      : 'draw';
    this.mapTipState = this.activeTool
      ? TipState.ACTIVE
      : TipState.INACTIVE;
    if (curTool) {
      this.focusView();
    }
    this.arcgisHubMapPopoverClear.emit();
    hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action[curTool ? 'enable' : 'disable'].label[label]), { details: string.capitalize(curTool || prevTool) }));
  }
  handleBoundariesChange(currBoundaries, prevBoundaries) {
    // Compare geometry strings, faster than geometryEngine.equals
    const toString = (geoms) => JSON.stringify(geoms === null || geoms === void 0 ? void 0 : geoms.map(geom => geom.toJSON()));
    if (toString(currBoundaries) !== toString(prevBoundaries)) {
      this.addGeometryToBoundariesLayer();
    }
  }
  handleGraphicsChange() {
    const { geometry, bufferWidgetEl } = this;
    if (geometry) {
      this.addGeometryToGraphicsLayer();
      this.startEditing();
    }
    else {
      this.reset();
      bufferWidgetEl === null || bufferWidgetEl === void 0 ? void 0 : bufferWidgetEl.forceReset();
      this.activeTool = undefined;
    }
  }
  /**
   * Listens for isEditing state changes and sets activeTool to null when
   * editing is completed
   */
  handleIsEditingChange() {
    const { isEditing } = this;
    if (!isEditing) {
      this.activeTool = undefined;
    }
    this.setBufferPanelVisible();
  }
  /**
   * Listens for isFiltered state changes and sets custom symbol on graphic
   */
  handleIsFilteredChange() {
    const { isFiltered, graphicsLayer: { graphics } } = this;
    const graphic = graphics.getItemAt(0);
    if (isFiltered && graphic) {
      const { geometry: { type } } = graphic;
      const tool = map.getGeometryTypeDrawTool(type);
      const filteredSymbol = this[`${tool}Symbol`];
      graphic.symbol = filteredSymbol;
    }
    this.setBufferPanelVisible();
  }
  /**
   * Listens for view prop changes and initializes sketchViewModel
   * and creates watch handles
   * @param view The current map View
   * @param prevView The previous map View
   */
  handleViewChange(view, prevView) {
    if (view && view !== prevView) {
      this.removeWatchHandles();
      this.connectViewModel().then(() => {
        this.addWatchHandles();
      });
    }
  }
  /**
   * Listens for bufferDetails state changes and updates graphics
   */
  handleBufferDetailsChanged() {
    const { arcgisHubMapDrawGraphicsChange, bufferPolygonSymbol, graphicsLayer, bufferGraphicsLayer, bufferDetails, isEditing } = this;
    const { graphics } = graphicsLayer;
    const [graphic] = graphics;
    const { graphics: bufferGraphics } = bufferGraphicsLayer;
    if (!bufferDetails || !graphic) {
      return;
    }
    const { distance, unit } = bufferDetails;
    const bufferGeom = geometryEngine.buffer(graphic === null || graphic === void 0 ? void 0 : graphic.geometry, distance, unit.split(' ').join('-'), true);
    const bufferGraphic = new Graphic__default['default']({
      geometry: bufferGeom,
      symbol: bufferPolygonSymbol
    });
    bufferGraphicsLayer.removeAll();
    bufferGraphicsLayer.add(bufferGraphic);
    arcgisHubMapDrawGraphicsChange.emit({
      graphics: graphics.clone(),
      bufferGraphics: bufferGraphics.clone(),
      save: !isEditing
    });
  }
  /**
   * Public Method to call internal reset()
   */
  async forceReset() {
    this.reset();
  }
  /**
  * Set the current drawing tool displayed to the user.
  * 'select' | 'point' | 'polyline' | 'polygon' | 'circle' | 'rectangle'
  * @param tool - 'select' | 'point' | 'polyline' | 'polygon' | 'circle' | 'rectangle';
   */
  async setActiveTool(tool) {
    this.activeTool = tool;
  }
  /**
   * Sets arcgis-hub-map-widget-draw-buffer ref to this.bufferWidgetEl
   */
  handleSetBufferWidgetRef(bufferWidgetEl) {
    if (bufferWidgetEl) {
      this.bufferWidgetEl = bufferWidgetEl;
    }
  }
  /**
   * Constructs new graphics layer and makes call to populate with any
   * existing prop geometry
   */
  createGraphicsLayers() {
    const { graphicsLayer, bufferGraphicsLayer, boundariesGroupLayer } = this;
    if (!GraphicsLayer__default['default']) {
      return;
    }
    // draw graphics
    if (!graphicsLayer) {
      this.graphicsLayer = new GraphicsLayer__default['default']({
        elevationInfo: {
          mode: 'on-the-ground'
        },
        listMode: 'hide',
      });
      this.reset();
      this.addGeometryToGraphicsLayer();
    }
    // buffer graphics
    if (!bufferGraphicsLayer) {
      this.bufferGraphicsLayer = new GraphicsLayer__default['default']({
        elevationInfo: {
          mode: 'on-the-ground'
        },
        listMode: 'hide',
      });
    }
    // restricted draw boundary graphics
    if (!boundariesGroupLayer) {
      // draw boundary polygons
      this.boundariesLayer = new GraphicsLayer__default['default']({
        elevationInfo: {
          mode: 'on-the-ground'
        },
        listMode: 'hide',
      });
      // global mask with semi-transparent symbol
      this.boundariesMaskLayer = new GraphicsLayer__default['default']({
        elevationInfo: {
          mode: 'on-the-ground'
        },
        graphics: [
          new Graphic__default['default']({
            geometry: new Polygon__default['default']({
              rings: [[
                  [-180, 90],
                  [180, 90],
                  [180, -90],
                  [-180, -90]
                ]]
            }),
            symbol: this.maskSymbol
          })
        ],
        listMode: 'hide',
      });
      // group layer for boundary and mask blending
      this.boundariesGroupLayer = new GroupLayer__default['default']({
        blendMode: "destination-in",
        layers: [
          this.boundariesMaskLayer,
          this.boundariesLayer
        ],
        listMode: 'hide',
        visible: false // hidden by default
      });
      // seperate outline layer for better visual identification of boundary
      this.boundariesOutlineLayer = new GraphicsLayer__default['default']({
        effect: "drop-shadow(1px, 1px, 2px)",
        elevationInfo: {
          mode: 'on-the-ground'
        },
        listMode: 'hide',
        visible: false // hidden by default
      });
      // Add any intiial geometries to boundaries layer
      this.addGeometryToBoundariesLayer();
    }
  }
  /**
   * Callback for sketch 'create' event for managing popover
   * @param event SketchViewModelCreateEvent
   */
  handleSketchOnCreate(event) {
    const { state, graphic, tool, toolEventInfo } = event;
    const { activeTool, arcgisHubMapPopoverOpen, bufferGraphicsLayer, graphicsLayer, boundariesLayer, sketchViewModel, hubTelemetry, view } = this;
    // if boundaries are defined, validate geometry
    if (this.boundaries && this.boundaries.length) {
      if ((toolEventInfo === null || toolEventInfo === void 0 ? void 0 : toolEventInfo.type) === 'vertex-add') {
        const point = new Point__default['default']({
          x: toolEventInfo.vertices[0].coordinates[0],
          y: toolEventInfo.vertices[0].coordinates[1],
          spatialReference: view.spatialReference
        });
        const withins = boundariesLayer.graphics.toArray().find((boundary) => {
          // check if point is within valid draw boundary
          return geometryEngine__namespace.within(point, boundary.geometry);
        });
        if (!withins) {
          // undo or cancel edit for invalid vertices
          if (tool === 'point') {
            setTimeout(() => {
              // next tick
              // reset back to point, try again
              this.activeTool = 'point';
            });
          }
          else {
            setTimeout(() => {
              // next tick
              sketchViewModel.canUndo() && sketchViewModel.undo();
            }, 0);
          }
        }
      }
      if (state === DrawState.COMPLETE) {
        // validate entire graphic when drawing is completed
        const withins = boundariesLayer.graphics.toArray().find((boundary) => {
          // check if completed geometry is within valid draw boundary
          return geometryEngine__namespace.within(graphic.geometry, boundary.geometry);
        });
        if (!withins) {
          // delete non-valid completed drawings
          this.deleteDrawing();
          return;
        }
      }
    }
    if (state === DrawState.START) {
      hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.draw.label.start.details[activeTool]);
      this.mapTipState = TipState.ACTIVE;
    }
    if (state === DrawState.COMPLETE) {
      if (this.activeTool === 'rectangle') {
        // convert from polygon to extent
        graphic.geometry = graphic.geometry.extent;
      }
      view.map.reorder(graphicsLayer, 99);
      view.map.reorder(bufferGraphicsLayer, 100);
      this.isEditing = false;
      this.activeTool = undefined;
      setTimeout(() => {
        // add 150ms delay from drawing completion to opening popover
        arcgisHubMapPopoverOpen.emit({
          source: 'options',
          geometry: graphic === null || graphic === void 0 ? void 0 : graphic.geometry,
          view,
          render: this.renderPrimaryOptions
        });
      }, 150);
      hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.draw.label.complete.details[activeTool]);
      if (this.disableEditOptions && this.disablePrimaryOptions) {
        // emit change event if no popover options available
        this.arcgisHubMapDrawGraphicsChange.emit({
          graphics: graphicsLayer.graphics.clone(),
          unsaved: true
        });
      }
      this.mapTipState = TipState.INACTIVE;
    }
    if (state === DrawState.CANCEL && tool === activeTool) {
      // When the user presses the 'escape' key, the SketchViewModel will emit a cancel
      // state, calling the cancel() method.  In this event, we simply deactivate the draw tools
      this.isEditing = false;
      this.activeTool = undefined;
      this.arcgisHubDrawCancel.emit();
    }
  }
  /**
   * Callback for sketch 'update' event for managing popover
   * and emits event to notify of graphic changes
   * @param event SketchViewModelUpdateEve
   */
  handleSketchOnUpdate(event) {
    var _a;
    const { state, graphics: [graphic], toolEventInfo } = event;
    const { arcgisHubMapPopoverClear, arcgisHubMapDrawGraphicsChange, graphicsLayer: { graphics }, bufferGraphicsLayer: { graphics: bufferGraphics }, sketchViewModel } = this;
    // if boundaries are defined, validate geometry
    if (this.boundaries && this.boundaries.length && ((_a = toolEventInfo === null || toolEventInfo === void 0 ? void 0 : toolEventInfo.type) === null || _a === void 0 ? void 0 : _a.includes('stop'))) {
      // check if graphic is contained
      const withins = this.boundariesLayer.graphics.toArray().find((boundary) => {
        // check if updated geometry is within valid draw boundary
        return geometryEngine__namespace.within(graphic.geometry, boundary.geometry);
      });
      if (!withins) {
        setTimeout(() => {
          // next tick
          sketchViewModel.canUndo() && sketchViewModel.undo();
        }, 0);
      }
    }
    // states: start, active, complete
    if (state === DrawState.ACTIVE) {
      arcgisHubMapPopoverClear.emit();
      arcgisHubMapDrawGraphicsChange.emit({
        graphics: graphics.clone(),
        bufferGraphics: bufferGraphics.clone()
      });
      this.handleBufferDetailsChanged();
    }
  }
  /**
   * Callback for view 'click' event for closing popover
   */
  handleViewClick(event) {
    const { activeTool, arcgisHubMapPopoverClear, hubTelemetry } = this;
    arcgisHubMapPopoverClear.emit();
    if (activeTool === 'select') {
      hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.select.label.content.details.selectTool);
      this.arcgisHubMapDrawSelect.emit(event);
    }
    else {
      hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.select.label.content);
    }
  }
  /**
   * Callback for view 'pointer-move' event for displaying tooptip helper text
   * @param event ViewPointerMoveEvent
   * @returns
   */
  handleViewPointerMove(event) {
    const { view, arcgisHubMapPopoverOpen, isScene } = this;
    const geometry = view.toMap(event);
    if (isScene && !geometry) {
      // 3D views return undefined geometry if pointer is not on the map (somewhere in space)
      return;
    }
    if (this.boundaries && this.boundaries.length) {
      // Validate that pointer is within allowable draw boundary
      const contains = this.boundariesLayer.graphics.toArray().find((boundary) => {
        return geometryEngine__namespace.contains(boundary.geometry, geometry);
      });
      this.geometryIsInvalid = !contains;
    }
    arcgisHubMapPopoverOpen.emit({
      source: 'tips',
      geometry,
      view,
      render: this.renderMapTip
    });
  }
  /**
   * Callback for view 'pointer-move' and 'pointer-down' event and checking for overlap of
   * graphicsLayer and managing popover renders
   * @param event ViewPointerMoveEvent or ViewPointerDownEvent
   */
  handleViewPointerMoveOrDown(event) {
    const { view, graphicsLayer } = this;
    view.hitTest(event, { include: graphicsLayer }).then((r) => {
      var _a;
      const { isFiltered, isEditing, arcgisHubMapPopoverOpen } = this;
      const result = arcgis.getFirstHitGraphic(r.results);
      if (r.results.length) {
        if (event.type === 'pointer-down' && this.sketchViewModel.state === 'ready') {
          // when the graphic being edited loses focus, it moves to the sketchViewModel
          // state from 'active'to 'ready' and we need to start editing again when clicked.
          // this is the workaround for out updateOnGraphicClick being set to 'false'
          this.startEditing();
          return;
        }
        let render = this.renderPrimaryOptions;
        if (isFiltered && !isEditing) {
          render = this.renderEditOptions;
        }
        else if (isEditing) {
          render = this.renderEditingOptions;
        }
        arcgisHubMapPopoverOpen.emit({
          source: 'options',
          geometry: (_a = result.graphic) === null || _a === void 0 ? void 0 : _a.geometry,
          view,
          render
        });
      }
    });
  }
  /**
   * Callback for view extent 'change' to clear popover
   */
  handleViewExtentChange() {
    const { arcgisHubMapPopoverClear } = this;
    arcgisHubMapPopoverClear.emit();
  }
  /**
   * Handles popover open event
   */
  handleToolsOpened() {
    this.open = true;
    this.hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.open.label.popover.details.options);
  }
  /**
   * Handles popover closed event
   */
  handleToolsClosed() {
    this.open = false;
    this.hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.close.label.popover.details.options);
  }
  /**
   * Creates instance of SketchViewModel and adds graphics layer to map
   */
  async connectViewModel() {
    const { bufferGraphicsLayer, graphicsLayer, mode, sketchViewModel, view, pointSymbol, polygonSymbol, polylineSymbol } = this;
    if (view && !sketchViewModel && SketchViewModel__default['default']) {
      await view.when();
      view.map.addMany([graphicsLayer, bufferGraphicsLayer, this.boundariesGroupLayer, this.boundariesOutlineLayer], 0);
      this.sketchViewModel = new SketchViewModel__default['default']({
        view: view,
        layer: graphicsLayer,
        defaultCreateOptions: {
          mode
        },
        updateOnGraphicClick: false,
        polygonSymbol,
        polylineSymbol,
        pointSymbol
      });
      reactiveUtils_js.watch(() => view.size, this.setPanelHeight);
    }
  }
  /**
   * Resets activeTool to undefined when a user preses escape key while the `select` control is active
   */
  handleViewEscape(_event) {
    this.activeTool = undefined;
  }
  /**
   * Adds event listeners on view and sketchViewModel
   */
  addWatchHandles() {
    const { handles, sketchViewModel, view } = this;
    if (view && reactiveUtils_js.watch && sketchViewModel) {
      handles.push(view.on('key-down', ["Escape"], this.handleViewEscape), view.on('pointer-down', this.handleViewClick), view.on(['pointer-move', 'pointer-down'], this.handleViewPointerMoveOrDown), view.on('pointer-move', this.handleViewPointerMove), reactiveUtils_js.watch(() => view.extent, this.handleViewExtentChange), sketchViewModel.on('create', this.handleSketchOnCreate), sketchViewModel.on('update', this.handleSketchOnUpdate));
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
  /**
   * Clears any previous boundaries and populates boundaries graphics layer
   * with any defined boundaries.
   */
  addGeometryToBoundariesLayer() {
    var _a;
    const { boundaries, boundariesLayer, boundariesOutlineLayer } = this;
    if ((_a = boundariesLayer.graphics) === null || _a === void 0 ? void 0 : _a.length) {
      // Clear any previous boundaries
      boundariesLayer.removeAll();
      boundariesOutlineLayer.removeAll();
    }
    if (boundaries && boundaries.length) {
      // Process incoming geometries and convert into graphics
      const boundariesProcessed = boundaries.map(this.processGeometry, this);
      const graphics = boundariesProcessed.map((geometry) => {
        return new Graphic__default['default']({
          geometry,
          symbol: this.boundarySymbol
        });
      });
      this.boundariesLayer.addMany(graphics);
      const _graphics = boundariesProcessed.map((geometry) => {
        return new Graphic__default['default']({
          geometry,
          symbol: this.boundaryOutlineSymbol
        });
      });
      this.boundariesOutlineLayer.addMany(_graphics);
      // Make the group layer (boundary + mask) visible
      this.boundariesGroupLayer.visible = true;
      // IF 3D, hide masking as web scenes do not support layer effects
      // that are used for the masking effect.  This is a known limitation:
      // https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-FeatureEffect.html
      this.boundariesGroupLayer.opacity = this.isScene ? 0 : 1;
      this.boundariesOutlineLayer.visible = true;
      this.view.container.style.backgroundColor = '#ffffff';
      // Set the map extent to current extent of boundaries
      this.view.goTo(this.boundariesLayer.graphics);
    }
    else {
      // Hide the boundaries group layer
      this.boundariesGroupLayer.visible = false;
      this.boundariesOutlineLayer.visible = false;
    }
  }
  /**
   * Add an existing geometry (point, polyline, polygon, extent) to the graphics layer
   * that is utilized by sketchViewModel.
   * Geometry of type extent is converted to polygon and utilizes transform tools only
   * in place of reshape.
   */
  addGeometryToGraphicsLayer() {
    const { geometry, graphicsLayer, sketchViewModel } = this;
    if (!geometry || !graphicsLayer || !this.sketchViewModel) {
      return;
    }
    this.isFiltered = true;
    const geomProcessed = this.processGeometry(geometry);
    const symbolType = geomProcessed.type === 'extent'
      ? 'polygon'
      : geomProcessed.type;
    const graphic = new Graphic__default['default']({
      geometry: geomProcessed,
      symbol: sketchViewModel[`${symbolType}Symbol`]
    });
    graphicsLayer.add(graphic);
  }
  /**
   * Notifies of intent to filter data and closes popover
   */
  applyFilter() {
    const { arcgisHubMapDrawGraphicsChange, arcgisHubMapPopoverClear, graphicsLayer: { graphics }, bufferGraphicsLayer: { graphics: bufferGraphics } } = this;
    this.isFiltered = true;
    arcgisHubMapDrawGraphicsChange.emit({
      graphics: graphics.clone(),
      bufferGraphics: bufferGraphics.clone(),
      save: true
    });
    arcgisHubMapPopoverClear.emit();
  }
  /**
   * Removes sketch graphics, closes popover, and cleares active tool.
   */
  deleteDrawing() {
    const { graphicsLayer: { graphics: [graphic] }, hubTelemetry, bufferWidgetEl } = this;
    if (!graphic) {
      return;
    }
    const { geometry: { type } } = graphic;
    hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.draw.label.delete.details[type]), { response: 'Success' }));
    this.reset();
    this.activeTool = undefined;
    bufferWidgetEl === null || bufferWidgetEl === void 0 ? void 0 : bufferWidgetEl.forceReset();
  }
  /**
   * Removes sketch graphics and notifies of intent to clear existing filter
   */
  clearFilter() {
    const { arcgisHubMapDrawGraphicsClear, hubTelemetry } = this;
    this.deleteDrawing();
    arcgisHubMapDrawGraphicsClear.emit();
    hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.search.label.filter.details.clear);
  }
  /**
   * Begins sketchViewModel update process on active graphic
   */
  startEditing() {
    const { arcgisHubMapPopoverClear, graphicsLayer: { graphics }, bufferGraphicsLayer: { graphics: bufferGraphics }, hubTelemetry, sketchViewModel, geometryIsExtent } = this;
    arcgisHubMapPopoverClear.emit();
    this.isEditing = true;
    this.cachedGraphics = graphics.clone();
    this.cachedBufferGraphics = bufferGraphics.clone();
    const graphic = graphics.getItemAt(0);
    const type = graphic.geometry.type;
    this.activeTool = map.getGeometryTypeDrawTool(type);
    let tool = type === 'extent' ? 'transform' : 'reshape';
    let enableRotation = true;
    let toggleToolOnClick = true;
    if (geometryIsExtent) {
      tool = 'transform';
      enableRotation = false;
      toggleToolOnClick = false;
    }
    sketchViewModel.update(graphics.getItemAt(0), {
      tool,
      enableRotation,
      toggleToolOnClick
    });
    hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.enable.label.draw.details.update);
  }
  /**
   * Cancels current sketch edits and reverts to original cached graphics
   */
  cancelEdits() {
    const { arcgisHubMapPopoverClear, arcgisHubMapDrawGraphicsChange, cachedGraphics, cachedBufferGraphics, graphicsLayer: { graphics }, bufferGraphicsLayer: { graphics: bufferGraphics }, hubTelemetry } = this;
    // cancel edits
    if (cachedGraphics && cachedBufferGraphics) {
      this.graphicsLayer.graphics = cachedGraphics.clone();
      this.cachedGraphics = null;
      this.bufferGraphicsLayer.graphics = cachedBufferGraphics.clone();
      this.cachedBufferGraphics = null;
    }
    this.isEditing = false;
    arcgisHubMapPopoverClear.emit();
    arcgisHubMapDrawGraphicsChange.emit({
      graphics: graphics.clone(),
      bufferGraphics: bufferGraphics.clone(),
      canceled: true
    });
    hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.disable.label.draw.details.update);
  }
  /**
   * Completes current sketch and notifies changes via event
   */
  saveEdits() {
    const { activeTool, arcgisHubMapDrawGraphicsChange, arcgisHubMapPopoverClear, graphicsLayer: { graphics }, bufferGraphicsLayer: { graphics: bufferGraphics }, hubTelemetry, sketchViewModel } = this;
    // save edits
    sketchViewModel.complete();
    arcgisHubMapDrawGraphicsChange.emit({
      graphics: graphics.clone(),
      bufferGraphics: bufferGraphics.clone(),
      save: true
    });
    arcgisHubMapPopoverClear.emit();
    this.isEditing = false;
    hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.draw.label.update.details[activeTool]);
    this.open = false;
  }
  /**
   * General reset method to clear graphics and popover
   */
  reset() {
    const { bufferGraphicsLayer, graphicsLayer, arcgisHubMapPopoverClear, bufferWidgetEl } = this;
    if (!graphicsLayer || !bufferGraphicsLayer) {
      return;
    }
    this.isEditing = false;
    this.isFiltered = false;
    this.cachedGraphics = null;
    this.cachedBufferGraphics = null;
    this.geometry = null;
    this.geometryIsInvalid = false;
    graphicsLayer.removeAll();
    bufferGraphicsLayer.removeAll();
    arcgisHubMapPopoverClear.emit();
    bufferWidgetEl === null || bufferWidgetEl === void 0 ? void 0 : bufferWidgetEl.forceReset();
  }
  /**
   * Projects geometry to map view projection, converts POJO geometry
   * to instance of __esri.Geometry
   */
  processGeometry(geometry) {
    const { view } = this;
    let geom = geometry;
    if (!geometry.clone) {
      // geometry is POJO, convert to instance of Geometry
      geom = (geometry.type === 'extent')
        ? Extent__default['default'].fromJSON(geom)
        : Geometry__default['default'].fromJSON(geom);
    }
    if (geom.spatialReference !== view.spatialReference) {
      geom = webMercatorUtils_js.project(geom, view.spatialReference);
    }
    return geom;
  }
  /**
   * Set bufferPanelVisible state if filter is applied or actively editing geometry
   */
  setBufferPanelVisible() {
    const { isEditing, isFiltered } = this;
    this.bufferPanelVisible = isEditing || isFiltered;
  }
  /**
   * Set buffer panel height based on widget position in view
   */
  setPanelHeight() {
    const { bufferWidgetEl, view: { size, container } } = this;
    if (!bufferWidgetEl || !container) {
      return;
    }
    const [viewWidth] = size;
    this.viewWidth = viewWidth;
    const { top: viewTop, bottom: viewBottom } = container.getBoundingClientRect();
    const { top: widgetTop, bottom: widgetBottom } = bufferWidgetEl.getBoundingClientRect();
    this.topOffset = widgetTop - viewTop;
    this.bottomOffset = viewBottom - widgetBottom;
  }
  /**
   * Set view position inherited from parent container
   */
  setViewPosition() {
    const { el } = this;
    const parentContainer = el && el.closest('arcgis-hub-map-widget-container');
    this.viewPosition = parentContainer === null || parentContainer === void 0 ? void 0 : parentContainer.viewPosition;
  }
  /**
   * Set reference to DOM element
   * @param el HTMLCalciteActionElement DOM Element reference
   */
  setOptionsEl(el) {
    this.optionsEl = el;
  }
  get geometryIsExtent() {
    var _a;
    return ((_a = this.geometry) === null || _a === void 0 ? void 0 : _a.type) === 'extent';
  }
  /**
   * Returns true of view is a SceneView
   */
  get isScene() {
    var _a;
    return ((_a = this.view) === null || _a === void 0 ? void 0 : _a.type) === '3d';
  }
  /**
   * Point symbol object
   */
  get pointSymbol() {
    const { color } = this;
    return {
      type: "text",
      color: [...color, 0.9],
      text: "\ue61d",
      font: {
        size: 24,
        family: "CalciteWebCoreIcons"
      }
    };
  }
  /**
   * Polyline symbol object
   */
  get polylineSymbol() {
    const { lineStyle, color } = this;
    return {
      style: lineStyle,
      color: [...color, 1],
      width: 2,
      type: 'simple-line'
    };
  }
  /**
   * Polygon symbol object
   */
  get polygonSymbol() {
    const { color, lineStyle } = this;
    return {
      type: 'simple-fill',
      style: 'solid',
      color: [0, 0, 0, 0],
      outline: {
        style: lineStyle,
        color: [...color, 1],
        width: 2
      }
    };
  }
  /**
   * Mask symbol
   */
  get maskSymbol() {
    return {
      type: 'simple-fill',
      style: 'solid',
      color: [0, 0, 0, 0.25],
      outline: {
        style: "solid",
        color: [0, 0, 0, 1],
        width: 0
      }
    };
  }
  /**
   * Boundary symbol
   */
  get boundarySymbol() {
    return {
      type: 'simple-fill',
      style: 'solid',
      color: [0, 0, 0, 1],
      outline: {
        style: "solid",
        color: [0, 0, 0, 0],
        width: 0
      }
    };
  }
  /**
   * Boundary Outline symbol
   */
  get boundaryOutlineSymbol() {
    return {
      type: 'simple-fill',
      style: 'solid',
      color: [0, 0, 0, 0],
      outline: {
        style: "solid",
        color: [0, 0, 0, 1],
        width: 2
      }
    };
  }
  /**
   * Rectangle symbol object
   */
  get rectangleSymbol() {
    return this.polygonSymbol;
  }
  /**
   * Line symbol object
   */
  get lineStyle() {
    const { isFiltered } = this;
    const lineStyle = isFiltered
      ? 'solid'
      : 'short-dash';
    return lineStyle;
  }
  /**
   * Buffer polygon symbol object
   */
  get bufferPolygonSymbol() {
    const { color } = this;
    return {
      type: 'simple-fill',
      style: 'cross',
      color: [...color, .25],
      outline: {
        style: 'short-dash',
        color: [...color, 1],
        width: 2
      }
    };
  }
  /**
   * Class name indicates view position
   */
  get positionClass() {
    const { viewPosition } = this;
    if (!viewPosition) {
      return;
    }
    return `hub-widget-draw ${viewPosition.split('-').join(' ')}`;
  }
  /**
   * Computed styles object
   */
  get styles() {
    const { viewWidth, bottomOffset, topOffset, bufferPanelVisible } = this;
    return {
      '--view-width': `${viewWidth}px`,
      '--bottom-offset': `${bottomOffset}px`,
      '--top-offset': `${topOffset}px`,
      '--mobile-display': bufferPanelVisible ? 'flex' : 'none'
    };
  }
  /**
   * Returns current helper text to toolitip (when hasTooltips = true)
   */
  get helperText() {
    const { activeTool, mapTipState, sketchViewModel: { createGraphic }, intl, isEditing } = this;
    // for some reason createGraphic is undefined when we start drawing rectangles
    // so we end up returning on the following line
    // TODO: move the logic of this getter to a util
    // and add tests that cover existing scenarios
    // then add logic to handle rectangles
    if (!isEditing && !createGraphic && activeTool !== 'select') {
      return;
    }
    let text = activeTool === 'select'
      ? intl.t('tip.select')
      : intl.t('tip.edit');
    if (createGraphic && !isEditing) {
      const { geometry } = createGraphic;
      let position = 'start';
      const isPoly = ['polygon', 'polyline'].includes(activeTool);
      if (mapTipState === TipState.ACTIVE && isPoly) {
        const numVertices = activeTool === 'polygon'
          ? geometry && geometry.rings[0].length - 2
          : geometry && geometry.paths[0].length - 1;
        if (numVertices === 1) {
          position = 'point';
        }
        else if (numVertices > 1) {
          position = 'end';
        }
      }
      text = intl.t(`tip.${activeTool}.${position}`);
    }
    if (this.geometryIsInvalid) {
      text = this.intl.t('invalid');
    }
    return text;
  }
  /**
   * Render function with primary options.  If disablePrimaryOptions = true,
   * primary options are skipped and only edit/editing options are displayed.
   * @param geometryType {Tool} - Type of geometry
   */
  renderPrimaryOptions(geometryType = 'polygon') {
    const { disablePrimaryOptions } = this;
    const tool = map.getGeometryTypeDrawTool(geometryType);
    const textFilter = this.intl.t(`filter.${tool}`);
    const textDelete = this.intl.t('delete');
    if (disablePrimaryOptions) {
      return this.renderEditOptions();
    }
    return (index.h(index.Fragment, null, index.h("calcite-action", { icon: "selection-filter", onClick: this.applyFilter, text: textFilter, "text-enabled": true }), index.h("calcite-action", { icon: "trash", onClick: this.deleteDrawing, text: textDelete, "text-enabled": true })));
  }
  /**
   * Render function with options to edit / delete active sketch
   */
  renderEditOptions() {
    const textUpdate = this.intl.t('update');
    const textDelete = this.intl.t('delete');
    return (index.h("calcite-action-pad", { "expand-disabled": true, layout: "horizontal" }, index.h("calcite-action", { icon: "pencil", onClick: this.startEditing, text: textUpdate }), index.h("calcite-action", { icon: "trash", onClick: this.clearFilter, text: textDelete })));
  }
  /**
   * Render function to cancel / save current sketch edits
   */
  renderEditingOptions() {
    const textCancel = this.intl.t('cancel');
    const textSave = this.intl.t('save');
    return (index.h(index.Fragment, null, index.h("calcite-action", { icon: "undo", onClick: this.cancelEdits, text: textCancel, "text-enabled": true }), index.h("calcite-action", { icon: "check", onClick: this.saveEdits, text: textSave, "text-enabled": true })));
  }
  /**
   * Render function for on-map popover tip
   */
  renderMapTip() {
    const { helperText, geometryIsInvalid } = this;
    let icon, kind;
    if (geometryIsInvalid) {
      icon = 'exclamation-mark-triangle-f';
      kind = 'danger';
    }
    return (!!helperText
      ? index.h("arcgis-hub-map-tip", { icon: icon, kind: kind, text: helperText })
      : null);
  }
  /**
   * Renders draw buffer
   */
  renderDrawBuffer() {
    const { buffer, positionClass, handleSetBufferWidgetRef, bufferPanelVisible } = this;
    if (buffer) {
      return (index.h("arcgis-hub-map-widget-draw-buffer", { class: positionClass, ref: handleSetBufferWidgetRef, visible: bufferPanelVisible }));
    }
  }
  /**
   * Renders collection of draw tool widgets
   */
  renderDrawToolWidgets(enableText = false) {
    const { tools, activeTool, scale } = this;
    return allTools.reduce((acc, tool) => tools.includes(tool)
      ? [...acc, (index.h("arcgis-hub-map-widget-generic", { active: activeTool === tool, disabled: this.disabled, icon: toolIcons[tool].icon, key: tool, scale: scale, text: this.intl.t(tool), textEnabled: enableText }))]
      : acc, []);
  }
  /**
   * Renders action button for condensed draw tools widget
   */
  renderDrawingOptionsAction() {
    const { open, isEditing, activeTool, intl } = this;
    const active = open || isEditing;
    let icon;
    if (isEditing) {
      icon = "pencil";
    }
    else if (activeTool) {
      icon = toolIcons[activeTool].icon;
    }
    else {
      icon = "pencil-mark-plus";
    }
    let text;
    if (isEditing) {
      text = intl.t('updating');
    }
    else if (open) {
      text = intl.t('close');
    }
    else {
      text = intl.t('open');
    }
    return (index.h("calcite-action", { active: active, icon: icon, ref: this.setOptionsEl, text: text }));
  }
  /**
   * Renders relevant content for the widget popover
   */
  renderDrawingOptionsPopoverContent() {
    const { isEditing, open, activeTool, intl } = this;
    return isEditing
      ? (index.h("calcite-action", { onClick: this.saveEdits, text: intl.t('finish'), "text-enabled": true })) : (index.h(index.Fragment, null, this.renderDrawToolWidgets(true), activeTool && open &&
      index.h("arcgis-hub-map-widget-generic", { icon: "minus-circle", text: intl.t('stop'), "text-enabled": true })));
  }
  /**
   * Renders draw tools as a single widget with a popover menu
   */
  renderCondensedDrawTools() {
    const { open, intl, optionsEl } = this;
    return (index.h(index.Fragment, null, this.renderDrawingOptionsAction(), this.renderDrawBuffer(), index.h("calcite-popover", { "auto-close": true, "disable-pointer": true, label: intl.t('options'), offsetDistance: 15, open: open, placement: "left-start", referenceElement: optionsEl }, this.renderDrawingOptionsPopoverContent())));
  }
  /**
   * Renders draw tools as a list of widgets
   */
  renderDrawTools() {
    return (index.h(index.Fragment, null, this.renderDrawBuffer(), this.renderDrawToolWidgets()));
  }
  renderPopovers() {
    const { unthemed } = this;
    return (index.h("arcgis-wormhole", { styles: { position: 'absolute', top: 0, left: 0 } }, index.h("arcgis-hub-map-popover", { style: { pointerEvents: 'none' }, target: "tips", unthemed: unthemed }), index.h("arcgis-hub-map-popover", { target: "options", unthemed: unthemed }), index.h("arcgis-hub-map-popover", { target: "action", unthemed: unthemed })));
  }
  renderDrawPopover() {
    const { el, drawTip } = this;
    return (index.h("calcite-popover", { autoClose: true, class: "draw-popover", label: drawTip, open: true, placement: 'left', referenceElement: el, triggerDisabled: true }, index.h("p", null, drawTip)));
  }
  render() {
    return (index.h(index.Host, { "data-element": "map-widget-draw", style: this.styles }, this.renderDrawPopover(), this.condensed
      ? this.renderCondensedDrawTools()
      : this.renderDrawTools(), this.renderPopovers()));
  }
  static get assetsDirs() { return ["locales"]; }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "activeTool": ["handleActiveToolChange"],
    "boundaries": ["handleBoundariesChange"],
    "geometry": ["handleGraphicsChange"],
    "isEditing": ["handleIsEditingChange"],
    "isFiltered": ["handleIsFilteredChange"],
    "view": ["handleViewChange"],
    "bufferDetails": ["handleBufferDetailsChanged"]
  }; }
};
__decorate([
  callWhen.CallWhenFactory({ when() { return this.enableMapTips && ((this.mapTipState !== TipState.INACTIVE) || (this.isEditing && this.activeTool !== 'point')); } })
], ArcgisHubMapWidgetDraw.prototype, "handleViewPointerMove", null);
__decorate([
  callWhen.CallWhenFactory({ when() { return this.activeTool === 'select'; } })
], ArcgisHubMapWidgetDraw.prototype, "handleViewEscape", null);
__decorate([
  callWhen.CallWhenFactory({ when() { return this.boundariesGroupLayer; } })
], ArcgisHubMapWidgetDraw.prototype, "addGeometryToBoundariesLayer", null);
__decorate([
  memoize.MemoizeDecoratorFactory()
], ArcgisHubMapWidgetDraw.prototype, "pointSymbol", null);
__decorate([
  memoize.MemoizeDecoratorFactory()
], ArcgisHubMapWidgetDraw.prototype, "polylineSymbol", null);
__decorate([
  memoize.MemoizeDecoratorFactory()
], ArcgisHubMapWidgetDraw.prototype, "polygonSymbol", null);
__decorate([
  memoize.MemoizeDecoratorFactory()
], ArcgisHubMapWidgetDraw.prototype, "maskSymbol", null);
__decorate([
  memoize.MemoizeDecoratorFactory()
], ArcgisHubMapWidgetDraw.prototype, "boundarySymbol", null);
__decorate([
  memoize.MemoizeDecoratorFactory()
], ArcgisHubMapWidgetDraw.prototype, "boundaryOutlineSymbol", null);
__decorate([
  memoize.MemoizeDecoratorFactory()
], ArcgisHubMapWidgetDraw.prototype, "rectangleSymbol", null);
__decorate([
  memoize.MemoizeDecoratorFactory()
], ArcgisHubMapWidgetDraw.prototype, "bufferPolygonSymbol", null);
__decorate([
  callWhen.CallWhenFactory({ when() { return !this.disableEditOptions; } })
], ArcgisHubMapWidgetDraw.prototype, "renderEditOptions", null);
__decorate([
  callWhen.CallWhenFactory({ when() { return !this.disableEditOptions; } })
], ArcgisHubMapWidgetDraw.prototype, "renderEditingOptions", null);
__decorate([
  callWhen.CallWhenFactory({ when() { return this.view; } })
], ArcgisHubMapWidgetDraw.prototype, "renderPopovers", null);
__decorate([
  callWhen.CallWhenFactory({ when() { return this.drawTip && this.drawTip.length; } })
], ArcgisHubMapWidgetDraw.prototype, "renderDrawPopover", null);
ArcgisHubMapWidgetDraw.style = arcgisHubMapWidgetDrawCss;

/**
 * Systems of measurement
 */
var MeasurementSystem;
(function (MeasurementSystem) {
  MeasurementSystem["Imperial"] = "imperial";
  MeasurementSystem["Metric"] = "metric";
})(MeasurementSystem || (MeasurementSystem = {}));
/**
 * Imperial Units of Measurement
 */
var ImperialUnit;
(function (ImperialUnit) {
  ImperialUnit["Feet"] = "feet";
  ImperialUnit["Miles"] = "miles";
  ImperialUnit["NauticalMiles"] = "nautical miles";
})(ImperialUnit || (ImperialUnit = {}));
/**
 * Metric Units of Measurement
 */
var MetricUnit;
(function (MetricUnit) {
  MetricUnit["Meters"] = "meters";
  MetricUnit["Kilometers"] = "kilometers";
})(MetricUnit || (MetricUnit = {}));

const arcgisHubMapWidgetDrawBufferCss = "calcite-panel div{display:grid;gap:0.25rem;padding:1rem;background-color:var(--calcite-color-foreground-1)}calcite-panel[closed]{display:none}";

const ArcgisHubMapWidgetDrawBuffer = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubMapWidgetDrawBufferChanged = index.createEvent(this, "arcgisHubMapWidgetDrawBufferChanged", 7);
    this.arcgisHubMapWigetDrawBufferReset = index.createEvent(this, "arcgisHubMapWigetDrawBufferReset", 7);
    this.arcgisHubMapWidgetDrawBufferPanelClosed = index.createEvent(this, "arcgisHubMapWidgetDrawBufferPanelClosed", 7);
    this.arcgisHubWidgetPanelToggled = index.createEvent(this, "arcgisHubWidgetPanelToggled", 7);
    this.visible = undefined;
    this.unit = this.defaultUnitOfMeasurement;
    this.distance = 0;
    this.status = 'idle';
    context.bind(this, 'handleInputKeyUp', 'handleSetPanelRef', 'handleSetSelectRef', 'handleSetInputRef', 'reset');
  }
  /**
   * componentWillLoad lifecycle method
   */
  async componentWillLoad() {
    const { el } = this;
    this.intl = await intlManager.intlManager.loadIntlForComponent(el);
    this.handleVisibleChange();
  }
  /**
   * Listen for unit or distance changes, validate and emit values
   */
  handleUnitDistanceChanged() {
    const { arcgisHubMapWidgetDrawBufferChanged, unit, distance } = this;
    arcgisHubMapWidgetDrawBufferChanged.emit({
      distance,
      unit
    });
  }
  /**
   * Listen for calcite-select change and update unit and system state
   */
  handleCalciteSelectChange() {
    const { selectEl: { selectedOption: { value } } } = this;
    this.unit = value.toLowerCase();
  }
  /**
   * Listen for calcite-input change and update distance state
   */
  handleCalciteInputInput() {
    const { inputEl: { value } } = this;
    this.distance = +value;
    this.validateDistance();
  }
  /**
   * Listen for calcite-panel dismissed changes
   */
  handleCalcitePanelDismissedChange() {
    const { panelEl: { closed }, arcgisHubMapWidgetDrawBufferPanelClosed } = this;
    if (closed) {
      arcgisHubMapWidgetDrawBufferPanelClosed.emit();
    }
  }
  /**
   * Handle changes to visible prop
   */
  handleVisibleChange() {
    const { visible, panelEl, arcgisHubWidgetPanelToggled } = this;
    if (panelEl) {
      const closed = !visible;
      arcgisHubWidgetPanelToggled.emit(closed);
    }
  }
  async forceReset() {
    this.reset();
  }
  /**
   * Reset distance
   */
  reset() {
    const { arcgisHubMapWigetDrawBufferReset } = this;
    this.distance = 0;
    this.unit = this.defaultUnitOfMeasurement;
    arcgisHubMapWigetDrawBufferReset.emit();
  }
  /**
   * Validate input distance
   */
  validateDistance() {
    const { inputEl: { value } } = this;
    this.status = value
      ? 'idle'
      : 'invalid';
  }
  /**
   * Handles distance input keyUp event, since
   * calcite-input envent's are not fired when value is cleared
   */
  handleInputKeyUp() {
    this.validateDistance();
  }
  /**
   * Sets calcite-select ref to this.selectEl
   * @param selectEl
   */
  handleSetSelectRef(selectEl) {
    if (selectEl) {
      this.selectEl = selectEl;
    }
  }
  /**
   * Sets calcite-input ref to this.inputEl
   * @param inputEl
   */
  handleSetInputRef(inputEl) {
    if (inputEl) {
      this.inputEl = inputEl;
    }
  }
  /**
   * Set calcite-panel ref to this.panelEl
   * @param panelEl
   */
  handleSetPanelRef(panelEl) {
    if (panelEl) {
      this.panelEl = panelEl;
    }
  }
  /**
   * Get the default system of measurement based on locale
   */
  get defaultSystemOfMesasurement() {
    const [, country] = window.navigator.language.toLowerCase().split('-');
    // united states, liberia, myanmar use imperial system of measurement
    return ['us', 'lr', 'mm'].includes(country)
      ? MeasurementSystem.Imperial
      : MeasurementSystem.Metric;
  }
  /**
   * Get the default unit of measurement based on locale
   */
  get defaultUnitOfMeasurement() {
    const { defaultSystemOfMesasurement } = this;
    return defaultSystemOfMesasurement === MeasurementSystem.Imperial
      ? ImperialUnit.Feet
      : MetricUnit.Meters;
  }
  /**
   * Returns true if form can be reset to default values
   */
  get canReset() {
    const { distance, unit, defaultUnitOfMeasurement } = this;
    return Boolean(distance) || (unit !== defaultUnitOfMeasurement);
  }
  /**
   * Validation status (as boolean) of distance input
   * used for validation message
   */
  get distanceIsInvalid() {
    const { status } = this;
    return status === 'invalid';
  }
  /**
   * Imperial or Metric unit options
   */
  renderOptionsGroup(system, units) {
    const { unit: activeUnit, intl } = this;
    return (index.h("calcite-option-group", { label: intl.t(`system.${system}`) }, units.map(unit => {
      const unitLabel = intl.t(`units.${unit.replace(' ', '')}`);
      return (index.h("calcite-option", { key: unit, label: unitLabel, selected: activeUnit === unit, value: unit }, unitLabel));
    })));
  }
  render() {
    const { distance, distanceIsInvalid, intl, canReset, status, visible, handleInputKeyUp, handleSetSelectRef, handleSetInputRef, handleSetPanelRef, reset } = this;
    const panelHeadingText = intl.t('panel.heading');
    const panelResetText = intl.t('panel.reset');
    const distanceTitleText = intl.t('distance.title');
    const distancePlaceholderText = intl.t('distance.placeholder');
    const distanceMessageText = intl.t('distance.message');
    const unitsTitleText = intl.t('units.title');
    return (index.h(index.Host, { "data-element": "widget-draw-buffer" }, index.h("calcite-panel", { closable: true, closed: !visible, heading: panelHeadingText, ref: handleSetPanelRef }, index.h("calcite-action", { disabled: !canReset, icon: "reset", onClick: reset, slot: "header-actions-end", text: panelResetText }), index.h("div", { class: "location-filter" }, index.h("calcite-label", { scale: "l" }, distanceTitleText, index.h("calcite-input", { onKeyUp: handleInputKeyUp, placeholder: distancePlaceholderText, ref: handleSetInputRef, scale: "l", status: status, type: "number", value: distance.toString() }), index.h("calcite-input-message", { hidden: !distanceIsInvalid }, distanceMessageText)), index.h("calcite-label", { scale: "l" }, unitsTitleText, index.h("calcite-select", { label: unitsTitleText, ref: handleSetSelectRef, scale: "l" }, this.renderOptionsGroup(MeasurementSystem.Metric, Object.values(MetricUnit)), this.renderOptionsGroup(MeasurementSystem.Imperial, Object.values(ImperialUnit))))))));
  }
  static get assetsDirs() { return ["locales"]; }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "unit": ["handleUnitDistanceChanged"],
    "distance": ["handleUnitDistanceChanged"],
    "visible": ["handleVisibleChange"]
  }; }
};
ArcgisHubMapWidgetDrawBuffer.style = arcgisHubMapWidgetDrawBufferCss;

exports.arcgis_hub_map_popover = ArcgisHubMapPopover;
exports.arcgis_hub_map_tip = ArcgisHubMapTip;
exports.arcgis_hub_map_widget_draw = ArcgisHubMapWidgetDraw;
exports.arcgis_hub_map_widget_draw_buffer = ArcgisHubMapWidgetDrawBuffer;
