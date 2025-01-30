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
import { h, Host, Fragment } from '@stencil/core';
import { bind } from '../../../utils/context';
import intlManager from '../../../utils/intl-manager';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { DrawState, TipState } from './types';
import { capitalize } from '../../../utils/string';
import CallWhen from '../../../decorators/call-when';
import { watch } from '@arcgis/core/core/reactiveUtils';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import SketchViewModel from '@arcgis/core/widgets/Sketch/SketchViewModel';
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import Graphic from '@arcgis/core/Graphic';
import { project } from "@arcgis/core/geometry/support/webMercatorUtils";
import Geometry from "@arcgis/core/geometry/Geometry";
import Extent from "@arcgis/core/geometry/Extent";
import { buffer } from "@arcgis/core/geometry/geometryEngine";
import Polygon from "@arcgis/core/geometry/Polygon";
import Point from "@arcgis/core/geometry/Point";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine";
import { getFirstHitGraphic, loadArcGisCss } from "../../../utils/arcgis";
import { getGeometryTypeDrawTool } from '../../../utils/map';
import Memoize from '../../../decorators/memoize';
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
export class ArcgisHubMapWidgetDraw {
  /**
   * Constructor function, pre-binds context to relevant methods
   */
  constructor() {
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
    bind(this, 'applyFilter', 'cancelEdits', 'clearFilter', 'deleteDrawing', 'handleSetBufferWidgetRef', 'handleSketchOnCreate', 'handleSketchOnUpdate', 'handleViewClick', 'handleViewEscape', 'handleViewExtentChange', 'handleViewPointerMove', 'handleViewPointerMoveOrDown', 'renderPrimaryOptions', 'renderEditOptions', 'renderEditingOptions', 'renderMapTip', 'setPanelHeight', 'startEditing', 'saveEdits', 'setOptionsEl');
  }
  /**
   * Component will load lifecycle method, fetches translations and data
   * needed to render the UI
   */
  async componentWillLoad() {
    const { el } = this;
    this.intl = await intlManager.loadIntlForComponent(el);
    this.createGraphicsLayers();
    await this.connectViewModel();
    this.addWatchHandles();
    this.setViewPosition();
    loadArcGisCss();
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
      hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action.search.label.filter), { details: capitalize(type) }));
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
    hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action[curTool ? 'enable' : 'disable'].label[label]), { details: capitalize(curTool || prevTool) }));
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
      const tool = getGeometryTypeDrawTool(type);
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
    const bufferGeom = buffer(graphic === null || graphic === void 0 ? void 0 : graphic.geometry, distance, unit.split(' ').join('-'), true);
    const bufferGraphic = new Graphic({
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
    if (!GraphicsLayer) {
      return;
    }
    // draw graphics
    if (!graphicsLayer) {
      this.graphicsLayer = new GraphicsLayer({
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
      this.bufferGraphicsLayer = new GraphicsLayer({
        elevationInfo: {
          mode: 'on-the-ground'
        },
        listMode: 'hide',
      });
    }
    // restricted draw boundary graphics
    if (!boundariesGroupLayer) {
      // draw boundary polygons
      this.boundariesLayer = new GraphicsLayer({
        elevationInfo: {
          mode: 'on-the-ground'
        },
        listMode: 'hide',
      });
      // global mask with semi-transparent symbol
      this.boundariesMaskLayer = new GraphicsLayer({
        elevationInfo: {
          mode: 'on-the-ground'
        },
        graphics: [
          new Graphic({
            geometry: new Polygon({
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
      this.boundariesGroupLayer = new GroupLayer({
        blendMode: "destination-in",
        layers: [
          this.boundariesMaskLayer,
          this.boundariesLayer
        ],
        listMode: 'hide',
        visible: false // hidden by default
      });
      // seperate outline layer for better visual identification of boundary
      this.boundariesOutlineLayer = new GraphicsLayer({
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
        const point = new Point({
          x: toolEventInfo.vertices[0].coordinates[0],
          y: toolEventInfo.vertices[0].coordinates[1],
          spatialReference: view.spatialReference
        });
        const withins = boundariesLayer.graphics.toArray().find((boundary) => {
          // check if point is within valid draw boundary
          return geometryEngine.within(point, boundary.geometry);
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
          return geometryEngine.within(graphic.geometry, boundary.geometry);
        });
        if (!withins) {
          // delete non-valid completed drawings
          this.deleteDrawing();
          return;
        }
      }
    }
    if (state === DrawState.START) {
      hubTelemetry.emit(dictionary.category.interaction.action.draw.label.start.details[activeTool]);
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
      hubTelemetry.emit(dictionary.category.interaction.action.draw.label.complete.details[activeTool]);
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
        return geometryEngine.within(graphic.geometry, boundary.geometry);
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
      hubTelemetry.emit(dictionary.category.interaction.action.select.label.content.details.selectTool);
      this.arcgisHubMapDrawSelect.emit(event);
    }
    else {
      hubTelemetry.emit(dictionary.category.interaction.action.select.label.content);
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
        return geometryEngine.contains(boundary.geometry, geometry);
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
      const result = getFirstHitGraphic(r.results);
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
    this.hubTelemetry.emit(dictionary.category.interaction.action.open.label.popover.details.options);
  }
  /**
   * Handles popover closed event
   */
  handleToolsClosed() {
    this.open = false;
    this.hubTelemetry.emit(dictionary.category.interaction.action.close.label.popover.details.options);
  }
  /**
   * Creates instance of SketchViewModel and adds graphics layer to map
   */
  async connectViewModel() {
    const { bufferGraphicsLayer, graphicsLayer, mode, sketchViewModel, view, pointSymbol, polygonSymbol, polylineSymbol } = this;
    if (view && !sketchViewModel && SketchViewModel) {
      await view.when();
      view.map.addMany([graphicsLayer, bufferGraphicsLayer, this.boundariesGroupLayer, this.boundariesOutlineLayer], 0);
      this.sketchViewModel = new SketchViewModel({
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
      watch(() => view.size, this.setPanelHeight);
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
    if (view && watch && sketchViewModel) {
      handles.push(view.on('key-down', ["Escape"], this.handleViewEscape), view.on('pointer-down', this.handleViewClick), view.on(['pointer-move', 'pointer-down'], this.handleViewPointerMoveOrDown), view.on('pointer-move', this.handleViewPointerMove), watch(() => view.extent, this.handleViewExtentChange), sketchViewModel.on('create', this.handleSketchOnCreate), sketchViewModel.on('update', this.handleSketchOnUpdate));
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
        return new Graphic({
          geometry,
          symbol: this.boundarySymbol
        });
      });
      this.boundariesLayer.addMany(graphics);
      const _graphics = boundariesProcessed.map((geometry) => {
        return new Graphic({
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
    const graphic = new Graphic({
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
    hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action.draw.label.delete.details[type]), { response: 'Success' }));
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
    hubTelemetry.emit(dictionary.category.interaction.action.search.label.filter.details.clear);
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
    this.activeTool = getGeometryTypeDrawTool(type);
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
    hubTelemetry.emit(dictionary.category.interaction.action.enable.label.draw.details.update);
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
    hubTelemetry.emit(dictionary.category.interaction.action.disable.label.draw.details.update);
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
    hubTelemetry.emit(dictionary.category.interaction.action.draw.label.update.details[activeTool]);
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
        ? Extent.fromJSON(geom)
        : Geometry.fromJSON(geom);
    }
    if (geom.spatialReference !== view.spatialReference) {
      geom = project(geom, view.spatialReference);
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
    const tool = getGeometryTypeDrawTool(geometryType);
    const textFilter = this.intl.t(`filter.${tool}`);
    const textDelete = this.intl.t('delete');
    if (disablePrimaryOptions) {
      return this.renderEditOptions();
    }
    return (h(Fragment, null, h("calcite-action", { icon: "selection-filter", onClick: this.applyFilter, text: textFilter, "text-enabled": true }), h("calcite-action", { icon: "trash", onClick: this.deleteDrawing, text: textDelete, "text-enabled": true })));
  }
  /**
   * Render function with options to edit / delete active sketch
   */
  renderEditOptions() {
    const textUpdate = this.intl.t('update');
    const textDelete = this.intl.t('delete');
    return (h("calcite-action-pad", { "expand-disabled": true, layout: "horizontal" }, h("calcite-action", { icon: "pencil", onClick: this.startEditing, text: textUpdate }), h("calcite-action", { icon: "trash", onClick: this.clearFilter, text: textDelete })));
  }
  /**
   * Render function to cancel / save current sketch edits
   */
  renderEditingOptions() {
    const textCancel = this.intl.t('cancel');
    const textSave = this.intl.t('save');
    return (h(Fragment, null, h("calcite-action", { icon: "undo", onClick: this.cancelEdits, text: textCancel, "text-enabled": true }), h("calcite-action", { icon: "check", onClick: this.saveEdits, text: textSave, "text-enabled": true })));
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
      ? h("arcgis-hub-map-tip", { icon: icon, kind: kind, text: helperText })
      : null);
  }
  /**
   * Renders draw buffer
   */
  renderDrawBuffer() {
    const { buffer, positionClass, handleSetBufferWidgetRef, bufferPanelVisible } = this;
    if (buffer) {
      return (h("arcgis-hub-map-widget-draw-buffer", { class: positionClass, ref: handleSetBufferWidgetRef, visible: bufferPanelVisible }));
    }
  }
  /**
   * Renders collection of draw tool widgets
   */
  renderDrawToolWidgets(enableText = false) {
    const { tools, activeTool, scale } = this;
    return allTools.reduce((acc, tool) => tools.includes(tool)
      ? [...acc, (h("arcgis-hub-map-widget-generic", { active: activeTool === tool, disabled: this.disabled, icon: toolIcons[tool].icon, key: tool, scale: scale, text: this.intl.t(tool), textEnabled: enableText }))]
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
    return (h("calcite-action", { active: active, icon: icon, ref: this.setOptionsEl, text: text }));
  }
  /**
   * Renders relevant content for the widget popover
   */
  renderDrawingOptionsPopoverContent() {
    const { isEditing, open, activeTool, intl } = this;
    return isEditing
      ? (h("calcite-action", { onClick: this.saveEdits, text: intl.t('finish'), "text-enabled": true })) : (h(Fragment, null, this.renderDrawToolWidgets(true), activeTool && open &&
      h("arcgis-hub-map-widget-generic", { icon: "minus-circle", text: intl.t('stop'), "text-enabled": true })));
  }
  /**
   * Renders draw tools as a single widget with a popover menu
   */
  renderCondensedDrawTools() {
    const { open, intl, optionsEl } = this;
    return (h(Fragment, null, this.renderDrawingOptionsAction(), this.renderDrawBuffer(), h("calcite-popover", { "auto-close": true, "disable-pointer": true, label: intl.t('options'), offsetDistance: 15, open: open, placement: "left-start", referenceElement: optionsEl }, this.renderDrawingOptionsPopoverContent())));
  }
  /**
   * Renders draw tools as a list of widgets
   */
  renderDrawTools() {
    return (h(Fragment, null, this.renderDrawBuffer(), this.renderDrawToolWidgets()));
  }
  renderPopovers() {
    const { unthemed } = this;
    return (h("arcgis-wormhole", { styles: { position: 'absolute', top: 0, left: 0 } }, h("arcgis-hub-map-popover", { style: { pointerEvents: 'none' }, target: "tips", unthemed: unthemed }), h("arcgis-hub-map-popover", { target: "options", unthemed: unthemed }), h("arcgis-hub-map-popover", { target: "action", unthemed: unthemed })));
  }
  renderDrawPopover() {
    const { el, drawTip } = this;
    return (h("calcite-popover", { autoClose: true, class: "draw-popover", label: drawTip, open: true, placement: 'left', referenceElement: el, triggerDisabled: true }, h("p", null, drawTip)));
  }
  render() {
    return (h(Host, { "data-element": "map-widget-draw", style: this.styles }, this.renderDrawPopover(), this.condensed
      ? this.renderCondensedDrawTools()
      : this.renderDrawTools(), this.renderPopovers()));
  }
  static get is() { return "arcgis-hub-map-widget-draw"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-map-widget-draw.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-map-widget-draw.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "boundaries": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<__esri.Polygon>[]",
          "resolved": "Partial<Polygon>[]",
          "references": {
            "Partial": {
              "location": "global"
            },
            "___esri": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Optional array of restricted draw boundaries, which limit where\ngeometries can be drawn and applies layer mask on map."
        }
      },
      "geometry": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "Partial<__esri.Geometry>",
          "resolved": "{ readonly cache?: any; readonly extent?: Extent; hasM?: boolean; hasZ?: boolean; spatialReference?: SpatialReference; readonly type?: \"extent\" | \"point\" | \"multipoint\" | \"polyline\" | \"polygon\" | \"mesh\"; clone?: () => Geometry; destroyed?: boolean; initialized?: boolean; declaredClass?: string; destroy?: () => void; get?: { <T>(propertyName: string): T; (propertyName: string): any; }; set?: { <T>(propertyName: string, value: T): Geometry; (props: HashMap<any>): Geometry; }; watch?: (path: string | string[], callback: WatchCallback, sync?: boolean) => WatchHandle; addHandles?: <T>(handles: IHandle | IHandle[], groupKey?: Exclude<T, IHandle>) => void; removeHandles?: <T>(groupKey?: Exclude<T, IHandle>) => void; hasHandles?: <T>(groupKey?: Exclude<T, IHandle>) => boolean; toJSON?: () => any; }",
          "references": {
            "Partial": {
              "location": "global"
            },
            "___esri": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Optional Geometry to load into sketch graphics layer.  If geometry is provided,\ncomponent's initial state is in edit mode.\nOnly supports: point, polyline, polygon, extent"
        }
      },
      "mode": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Mode",
          "resolved": "\"click\" | \"freehand\" | \"hybrid\"",
          "references": {
            "Mode": {
              "location": "import",
              "path": "./types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Draw create operation mode"
        },
        "attribute": "mode",
        "reflect": false,
        "defaultValue": "'hybrid'"
      },
      "scale": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Scale",
          "resolved": "\"l\" | \"m\" | \"s\"",
          "references": {
            "Scale": {
              "location": "import",
              "path": "@esri/calcite-components/dist/types/components/interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "scale",
        "reflect": false,
        "defaultValue": "'m'"
      },
      "tools": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Tool[]",
          "resolved": "Tool[]",
          "references": {
            "Tool": {
              "location": "import",
              "path": "./types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional list of available tools"
        },
        "defaultValue": "allTools"
      },
      "view": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "__esri.View",
          "resolved": "View",
          "references": {
            "___esri": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "A reference to the active map View"
        }
      },
      "disablePrimaryOptions": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If primary options should be disabled so only editing options are available"
        },
        "attribute": "disable-primary-options",
        "reflect": false
      },
      "disableEditOptions": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If edit and delete options should be available"
        },
        "attribute": "disable-edit-options",
        "reflect": false
      },
      "color": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "[number, number, number]",
          "resolved": "[number, number, number]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "RGB color array for drawn geometry sybols theming"
        },
        "defaultValue": "[0, 0, 0]"
      },
      "buffer": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Draw tool bufer panel enable/disable"
        },
        "attribute": "buffer",
        "reflect": false
      },
      "condensed": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Whether or not widget should display as a single icon with popup menu"
        },
        "attribute": "condensed",
        "reflect": false
      },
      "resetOnDisconnect": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Should we reset the components state when the component is disconnected from the DOM"
        },
        "attribute": "reset-on-disconnect",
        "reflect": false,
        "defaultValue": "true"
      },
      "enableMapTips": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "(optional) If map tooltip is shown during draw and edit, defaults to false"
        },
        "attribute": "enable-map-tips",
        "reflect": false
      },
      "drawTip": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "(optional) Help tip text shows as popover on drawing tools"
        },
        "attribute": "draw-tip",
        "reflect": false
      },
      "unthemed": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Sometimes we may want to have a popover without site themeing applied.\nAs we usually use the popover via a wormhole we need to do this."
        },
        "attribute": "unthemed",
        "reflect": false,
        "defaultValue": "false"
      },
      "disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Sometimes, if the parent is 'editing' a graphic we may want to disable the draw tools"
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "activeTool": {},
      "isEditing": {},
      "isFiltered": {},
      "geometryIsInvalid": {},
      "bufferDetails": {},
      "bufferPanelVisible": {},
      "bottomOffset": {},
      "topOffset": {},
      "viewWidth": {},
      "open": {},
      "optionsEl": {},
      "mapTipState": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubMapDrawGraphicsChange",
        "name": "arcgisHubMapDrawGraphicsChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when drawn graphic is created or edited, specifies if event was triggered\nvia a explicit save (initial filter or saved changes) or not (active editing)"
        },
        "complexType": {
          "original": "GraphicChangeDetails",
          "resolved": "{ graphics: Collection<Graphic>; bufferGraphics?: Collection<Graphic>; save?: boolean; canceled?: boolean; unsaved?: boolean; }",
          "references": {
            "GraphicChangeDetails": {
              "location": "import",
              "path": "./types"
            }
          }
        }
      }, {
        "method": "arcgisHubMapDrawGraphicsClear",
        "name": "arcgisHubMapDrawGraphicsClear",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when drawn graphic is removed"
        },
        "complexType": {
          "original": "null",
          "resolved": "null",
          "references": {}
        }
      }, {
        "method": "arcgisHubMapDrawSelect",
        "name": "arcgisHubMapDrawSelect",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when 'select' widget is active and user clicks on map"
        },
        "complexType": {
          "original": "__esri.ViewPointerDownEvent",
          "resolved": "ViewPointerDownEvent",
          "references": {
            "___esri": {
              "location": "global"
            }
          }
        }
      }, {
        "method": "arcgisHubDrawCancel",
        "name": "arcgisHubDrawCancel",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when 'escape' key is pressed to reset any connected drawing\nprocesses"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "arcgisHubDrawActiveToolChange",
        "name": "arcgisHubDrawActiveToolChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when active tool changes"
        },
        "complexType": {
          "original": "Tool",
          "resolved": "\"circle\" | \"point\" | \"polygon\" | \"polyline\" | \"rectangle\" | \"select\"",
          "references": {
            "Tool": {
              "location": "import",
              "path": "./types"
            }
          }
        }
      }, {
        "method": "arcgisHubMapPopoverOpen",
        "name": "arcgisHubMapPopoverOpen",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted to request the popover component to open\nRequires <arcgis-hub-map-popover /> to be present in DOM"
        },
        "complexType": {
          "original": "PopoverEventDetails",
          "resolved": "{ source?: string; geometry: Geometry; view: View; render: any; }",
          "references": {
            "PopoverEventDetails": {
              "location": "import",
              "path": "../../arcgis-hub-map-popover/types"
            }
          }
        }
      }, {
        "method": "arcgisHubMapPopoverClear",
        "name": "arcgisHubMapPopoverClear",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted to request the popover component to close\nRequires <arcgis-hub-map-popover /> to be present in DOM"
        },
        "complexType": {
          "original": "null",
          "resolved": "null",
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
          "text": "Emits telemetry information"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "forceReset": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Public Method to call internal reset()",
          "tags": []
        }
      },
      "setActiveTool": {
        "complexType": {
          "signature": "(tool: Tool) => Promise<void>",
          "parameters": [{
              "tags": [{
                  "name": "param",
                  "text": "tool - 'select' | 'point' | 'polyline' | 'polygon' | 'circle' | 'rectangle';"
                }],
              "text": "- 'select' | 'point' | 'polyline' | 'polygon' | 'circle' | 'rectangle';"
            }],
          "references": {
            "Promise": {
              "location": "global"
            },
            "Tool": {
              "location": "import",
              "path": "./types"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Set the current drawing tool displayed to the user.\n'select' | 'point' | 'polyline' | 'polygon' | 'circle' | 'rectangle'",
          "tags": [{
              "name": "param",
              "text": "tool - 'select' | 'point' | 'polyline' | 'polygon' | 'circle' | 'rectangle';"
            }]
        }
      }
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "activeTool",
        "methodName": "handleActiveToolChange"
      }, {
        "propName": "boundaries",
        "methodName": "handleBoundariesChange"
      }, {
        "propName": "geometry",
        "methodName": "handleGraphicsChange"
      }, {
        "propName": "isEditing",
        "methodName": "handleIsEditingChange"
      }, {
        "propName": "isFiltered",
        "methodName": "handleIsFilteredChange"
      }, {
        "propName": "view",
        "methodName": "handleViewChange"
      }, {
        "propName": "bufferDetails",
        "methodName": "handleBufferDetailsChanged"
      }];
  }
  static get listeners() {
    return [{
        "name": "arcgisHubMapDrawGraphicsChange",
        "method": "handleMapDrawFilter",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubWidgetSelected",
        "method": "handleWidgetSelected",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubMapWidgetDrawBufferChanged",
        "method": "handleWidgetDrawBufferChanged",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubMapWigetDrawBufferReset",
        "method": "handleWidgetDrawBufferReset",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubMapWidgetDrawBufferPanelClosed",
        "method": "handleWidgetDrawBufferClosed",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubWidgetPanelToggled",
        "method": "handleWidgetPanelToggled",
        "target": "body",
        "capture": false,
        "passive": false
      }, {
        "name": "calcitePopoverOpen",
        "method": "handleToolsOpened",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "calcitePopoverClose",
        "method": "handleToolsClosed",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
__decorate([
  CallWhen({ when() { return this.enableMapTips && ((this.mapTipState !== TipState.INACTIVE) || (this.isEditing && this.activeTool !== 'point')); } })
], ArcgisHubMapWidgetDraw.prototype, "handleViewPointerMove", null);
__decorate([
  CallWhen({ when() { return this.activeTool === 'select'; } })
], ArcgisHubMapWidgetDraw.prototype, "handleViewEscape", null);
__decorate([
  CallWhen({ when() { return this.boundariesGroupLayer; } })
], ArcgisHubMapWidgetDraw.prototype, "addGeometryToBoundariesLayer", null);
__decorate([
  Memoize()
], ArcgisHubMapWidgetDraw.prototype, "pointSymbol", null);
__decorate([
  Memoize()
], ArcgisHubMapWidgetDraw.prototype, "polylineSymbol", null);
__decorate([
  Memoize()
], ArcgisHubMapWidgetDraw.prototype, "polygonSymbol", null);
__decorate([
  Memoize()
], ArcgisHubMapWidgetDraw.prototype, "maskSymbol", null);
__decorate([
  Memoize()
], ArcgisHubMapWidgetDraw.prototype, "boundarySymbol", null);
__decorate([
  Memoize()
], ArcgisHubMapWidgetDraw.prototype, "boundaryOutlineSymbol", null);
__decorate([
  Memoize()
], ArcgisHubMapWidgetDraw.prototype, "rectangleSymbol", null);
__decorate([
  Memoize()
], ArcgisHubMapWidgetDraw.prototype, "bufferPolygonSymbol", null);
__decorate([
  CallWhen({ when() { return !this.disableEditOptions; } })
], ArcgisHubMapWidgetDraw.prototype, "renderEditOptions", null);
__decorate([
  CallWhen({ when() { return !this.disableEditOptions; } })
], ArcgisHubMapWidgetDraw.prototype, "renderEditingOptions", null);
__decorate([
  CallWhen({ when() { return this.view; } })
], ArcgisHubMapWidgetDraw.prototype, "renderPopovers", null);
__decorate([
  CallWhen({ when() { return this.drawTip && this.drawTip.length; } })
], ArcgisHubMapWidgetDraw.prototype, "renderDrawPopover", null);
