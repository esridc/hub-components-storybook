'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');
const callOnce = require('./call-once-9214659c.js');
const debounce = require('./debounce-bd990e9f.js');
const memoize = require('./memoize-1f967971.js');
const arcgis = require('./arcgis-492079b8.js');
const location = require('./location-c7120f11.js');
const geometryEngine = require('@arcgis/core/geometry/geometryEngine.js');
const GraphicsLayer = require('@arcgis/core/layers/GraphicsLayer.js');
const webMercatorUtils_js = require('@arcgis/core/geometry/support/webMercatorUtils.js');
const reactiveUtils_js = require('@arcgis/core/core/reactiveUtils.js');
const Viewpoint = require('@arcgis/core/Viewpoint.js');
const interfaces = require('./interfaces-fc0046ff.js');
const intlManager = require('./intl-manager-f0103583.js');
const index$1 = require('./index-6f16fe65.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const util = require('./util-38e73510.js');
const getFamily = require('./get-family-cafa88bb.js');
const getCardModelUrl = require('./getCardModelUrl-df1328a2.js');
const extent = require('./extent-715f7c8d.js');
require('./generate-random-string-8807d629.js');
require('@arcgis/core/config.js');
require('./types-ff8f7df0.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./store-2a385ca0.js');
require('./extent-d08ca59a.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
require('./index-77afc8bd.js');
require('./index-f4a4c954.js');
require('./request-67da3c71.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

const GraphicsLayer__default = /*#__PURE__*/_interopDefaultLegacy(GraphicsLayer);
const Viewpoint__default = /*#__PURE__*/_interopDefaultLegacy(Viewpoint);

const arcgisHubGalleryLayoutMapCss = ":host{display:block;height:100%;width:100%}arcgis-hub-map{position:relative;aspect-ratio:1.5}arcgis-hub-gallery-layout-list{margin-top:1rem}arcgis-hub-map-widget-container>h2.results-count{margin:0.25rem}.map-popup-body>arcgis-multiline-ellipsis{padding-bottom:0.75rem}:host arcgis-hub-map{display:block;height:100%;width:100%}.esri-popup__main-container .esri-popup__content{overflow-x:visible}.esri-ui-inner-container .esri-popup .esri-popup__main-container{max-height:100%}";

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
const ArcgisHubGalleryLayoutMap = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubGalleryFacetChange = index.createEvent(this, "arcgisHubGalleryFacetChange", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    /**
     * Handles for highlight results on the map.  These are stored so they
     * can be tracked and cleared.
     * */
    this.highlightHandles = {
      select: null,
      hover: null // for hovered graphics
    };
    /**
     * Tracks whether initial map extent has been set
     */
    this.initialExtentSet = false;
    this.searchResults = [];
    this.loading = false;
    this.selectedIds = [];
    this.baseUrl = undefined;
    this.linkTarget = 'self';
    this.limit = 10;
    this.showThumbnail = true;
    this.imageType = interfaces.IMAGE_TYPES.thumbnail;
    this.lazy = false;
    this.newTab = false;
    this.selectionMode = 'none';
    this.cardTitleTag = undefined;
    this.corners = interfaces.CORNERS.square;
    this.showAdditionalInfo = true;
    this.showEmptyState = true;
    this.shadow = undefined;
    this.showLinkButton = false;
    this.linkButtonText = undefined;
    this.linkButtonStyle = undefined;
    this.showBadges = true;
    this.showType = true;
    this.showOwner = true;
    this.cardActionLinks = [];
    this.lastSearchResultsCount = undefined;
    this.callback = undefined;
    this.hasError = false;
    this.expand = 1.5;
    this.shouldShowResults = false;
    this.shouldShowFilterByExtent = false;
    this.shouldFilterByExtent = false;
    this.galleryMapSettings = location.DEFAULT_MAP_SETTINGS;
    this.mapSettings = undefined;
    this.initialExtent = undefined;
    this.disableMouseWheelZoom = false;
    this.disableTelemetry = false;
    this.entityType = undefined;
    this.popupContent = (index.h("div", null));
    this.mapView = undefined;
    this.selectedMapFeatureIds = [];
    context.bind(this, 'handleMapTelemetry', 'handleMouseEventEntityCard', 'handleShouldFilterByExtentChanged', 'setExtent', 'toggleShouldFilterByExtent');
  }
  /**
   * Element used as container for map popup content
   */
  get popupEl() {
    if (!this._popupEl) {
      this._popupEl = document.createElement('div');
    }
    return this._popupEl;
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Toggle if results are filtered by map extent
   */
  toggleShouldFilterByExtent() {
    const { shouldFilterByExtent } = this;
    const mapFacet = { key: 'bbox' };
    // we are toggling this from what it currently is
    if (shouldFilterByExtent) {
      mapFacet.value = null;
    }
    else {
      const geographicExtent = webMercatorUtils_js.webMercatorToGeographic(this.mapView.extent);
      const bbox = extent.extentToBBox(geographicExtent);
      mapFacet.value = bbox;
    }
    this.arcgisHubGalleryFacetChange.emit(mapFacet);
  }
  /**
   * Array of graphics created from search result geometries
   */
  get searchResultGraphics() {
    const { searchResults } = this;
    const graphics = searchResults.map((r) => {
      var _a, _b;
      const popupTemplate = {
        title: "{name}",
        content: () => this.popupEl,
      };
      const attributes = Object.assign({}, r);
      const result = (_b = (_a = r.location) === null || _a === void 0 ? void 0 : _a.geometries) === null || _b === void 0 ? void 0 : _b.map(geometry => {
        return {
          geometry,
          symbol: location.getSymbol(geometry),
          attributes,
          popupTemplate
        };
      });
      return result;
    })
      .filter(item => item !== undefined)
      .flat()
      .sort((a, b) => {
      // NOTE: as of JSAPI 4.30.9, `geodesicArea()` returns the wrong area for large polygons that approximate the
      // world's extent. As a result, these large polygons get stacked on top of smaller polygons, blocking mouse events.
      // Using `planarArea()` prevents this issue in most cases.
      return location.sortGeometriesByArea(a.geometry, b.geometry, geometryEngine.planarArea);
    });
    return graphics;
  }
  injectMapStyleSheet() {
    arcgis.injectMapStyleSheet(this.element);
  }
  /**
   * Highlight a collection of features on the map,
   * styled by the highlightType
   * @param view Esri JSAPI MapView
   * @param graphics Esri JSAPI Collection of Graphics to highlight
   * @param layer GraphicsLayer to add the highlighted graphics to
   * @param highlightType Type of highlight to apply
   */
  highlightGraphics(view, graphics, layer, highlightType) {
    if (!graphics) {
      return;
    }
    this.clearHighlights(layer, highlightType);
    view.whenLayerView(layer).then((layerView) => {
      layerView.highlightOptions = location.getHighlightOptions(highlightType);
      layer.addMany(graphics.toArray());
      this.highlightHandles[highlightType] = graphics.map(graphic => {
        return layerView.highlight(graphic);
      });
    });
  }
  /**
   * Clear any existing highlighted graphics
   * */
  clearHighlights(layer, highlightType) {
    var _a;
    if (this.highlightHandles && layer) {
      layer.removeAll();
      (_a = this.highlightHandles[highlightType]) === null || _a === void 0 ? void 0 : _a.forEach(h => h.remove());
      this.highlightHandles[highlightType] = null;
    }
  }
  // Expand extent and return expanded extent
  expandExtent(extent) {
    let _extent = extent;
    if (this.expand) {
      _extent = _extent.clone().expand(this.expand);
    }
    return _extent;
  }
  // set view extent to graphics extent
  goToGraphicsExtent() {
    const { mapView } = this;
    mapView.goTo(mapView.graphics).then(async () => {
      this.mapHomeRef.setViewpoint(new Viewpoint__default['default']({ targetGeometry: this.expandExtent(mapView.extent) }));
    });
  }
  /**
   * Clears popups, highlights, and selected  map features
   */
  clearMap() {
    if (this.mapView) {
      location.clearActiveMapState(this.mapView);
      this.clearHighlights(this.highlightGraphicsLayer, 'select');
      this.clearHighlights(this.hoverGraphicsLayer, 'hover');
      this.selectedMapFeatureIds = [];
    }
  }
  // set extent based on map settings
  setExtent() {
    // When the results are being filtered by map extent, disregard
    // the map settings extent and use the current map extent
    if (this.shouldFilterByExtent) {
      if (!this.initialExtentSet) {
        this.mapView.extent = this.expandExtent(this.initialExtent);
        this.initialExtentSet = true;
      }
      return;
    }
    // Go to results extent once
    if (this.galleryMapSettings.extent === 'results') {
      if (!this.initialExtentSet) {
        this.goToGraphicsExtent();
        this.initialExtentSet = true;
      }
    }
    // Go to results extent every time the results change
    else if (this.galleryMapSettings.extent === 'continuous') {
      this.goToGraphicsExtent();
      this.initialExtentSet = true;
    }
    // Go to extent defined on the location facet (if available), else fallback to the portal extent
    else {
      if (!this.initialExtentSet) {
        const extent = this.initialExtent;
        if (extent) {
          this.mapView.extent = this.expandExtent(extent);
          this.initialExtentSet = true;
        }
        else if (!!this.mapView.graphics.length) {
          // As fallback go to the graphics extent
          this.goToGraphicsExtent();
          this.initialExtentSet = true;
        }
      }
    }
  }
  async handleMapViewReady(evt) {
    const { detail: { view } } = evt;
    this.mapView = view;
    // Wait until view is fully loaded before setting up the map
    await this.mapView.when();
    // temporary fix for popup pagination 'untitled' header
    view['title'] = '';
    // Add highlight graphics layers
    this.highlightGraphicsLayer = new GraphicsLayer__default['default']({ graphics: [] });
    this.hoverGraphicsLayer = new GraphicsLayer__default['default']({ graphics: [] });
    view.map.addMany([this.highlightGraphicsLayer, this.hoverGraphicsLayer]);
    location.constrainViewToWorldBounds(view);
    view.ui.components = []; // remove default UI components
    // Override default goTo behavior in popup to zoom to all graphics with same ID
    view.popup.goToOverride = (view) => {
      const selectedFeatureId = view.popup.selectedFeature.attributes.id;
      const selectedGraphics = view.graphics.clone().filter(g => g.attributes.id === selectedFeatureId);
      view.goTo(selectedGraphics);
    };
    this.setExtent();
    // wire up the popup
    reactiveUtils_js.watch(() => view.popup.selectedFeature, () => {
      if (getProp.getProp(view, 'popup.selectedFeature.sourceLayer')) {
        // only inject custom popup content for graphics not any
        // other sourceLayer like a featureLayer
        this.clearHighlights(this.highlightGraphicsLayer, 'select');
        return;
      }
      // Remove any duplicates, which are artifacts of additional highlight
      // graphics layers being added
      view.popup.features = view.popup.features.filter((feature, index, self) => {
        return index === self.findIndex((t) => (t.attributes.id === feature.attributes.id));
      });
      if (view.popup.selectedFeature) {
        view.popup.dockEnabled = true;
        view.popup.set("dockOptions", {
          breakpoint: false,
          buttonEnabled: false,
          position: view.widthBreakpoint === 'xsmall' ? 'bottom-center' : 'bottom-right'
        });
        // We are setting the popup position based on the widthBreakpoint
        // The values are being set here when the popup is first opened.
        if (view.popup.selectedFeature) {
          this.popupContent = this._renderPopupContent(view.popup.selectedFeature.attributes);
        }
        // highlight the selected feature and its corresponding geometries
        const graphicsToHighlight = view.graphics.clone().filter(g => g.attributes.id === view.popup.selectedFeature.attributes.id);
        this.highlightGraphics(view, graphicsToHighlight, this.highlightGraphicsLayer, 'select');
        this.selectedMapFeatureIds = [view.popup.selectedFeature.attributes.id];
      }
    });
    reactiveUtils_js.watch(() => view.widthBreakpoint, () => {
      // We are re-setting things based on the widthBreakpoint when the widthBreakpoint changes
      // To get the popup content to re-render with the correct position
      // We have to set the popup content again
      if (view.popup.dockOptions) {
        view.popup.dockOptions.position = view.widthBreakpoint === 'xsmall' ? 'bottom-center' : 'bottom-right';
      }
      if (view.popup.selectedFeature && !getProp.getProp(view, 'popup.selectedFeature.sourceLayer')) {
        this.popupContent = this._renderPopupContent(view.popup.selectedFeature.attributes);
      }
    });
    reactiveUtils_js.watch(() => view.popup.visible, () => {
      if (!view.popup.visible) {
        // clear highlights when popup closes
        this.clearMap();
      }
    });
    reactiveUtils_js.watch(() => view.extent, () => {
      if (this.shouldFilterByExtent) {
        this.handleShouldFilterByExtentChanged();
      }
    }); // filter results by extent
    reactiveUtils_js.on(() => view.graphics, "change", this.setExtent); // set extent on every change in graphics
    let activeGraphicId; // reference to the active graphic id
    reactiveUtils_js.on(() => view, "pointer-move", (event) => {
      view.hitTest(event, { include: view.graphics }).then((response) => {
        if (response.results.length) {
          const id = response.results[0].graphic.attributes.id;
          if (id === activeGraphicId) {
            return;
          }
          else {
            activeGraphicId = id;
          }
          const graphicsToHighlight = view.graphics.clone().filter(g => g.attributes.id === (id));
          this.highlightGraphics(view, graphicsToHighlight, this.hoverGraphicsLayer, 'hover');
        }
        else {
          activeGraphicId = null;
          this.clearHighlights(this.hoverGraphicsLayer, 'hover');
        }
      });
    });
  }
  /**
   * Handles enabling / disabling of filter by extent and when 'shouldFilterByExtent':
   * true => updates the map facet extent value based on the current map extent
   * false => resets the map facet extent value
   */
  handleShouldFilterByExtentChanged() {
    const { shouldFilterByExtent } = this;
    if (this.mapView.popup.visible) {
      return;
    } // do not filter if popup is open
    const mapFacet = { key: 'bbox' };
    if (shouldFilterByExtent) {
      const geographicExtent = webMercatorUtils_js.webMercatorToGeographic(this.mapView.extent);
      const bbox = extent.extentToBBox(geographicExtent);
      mapFacet.value = bbox;
    }
    else {
      mapFacet.value = null;
    }
    this.arcgisHubGalleryFacetChange.emit(mapFacet);
  }
  /**
   * 1. When mouse hovers over an entity card, highlight the corresponding graphic on the map
   * 2. When mouse selects an entity card, select the corresponding graphic on the map
   * @param event - mouse event
   */
  handleMouseEventEntityCard(event) {
    var _a;
    const { type } = event;
    if (type === 'mouseleave') {
      this.clearHighlights(this.hoverGraphicsLayer, 'hover');
      return;
    }
    const target = event.target;
    const id = (_a = target.searchResult) === null || _a === void 0 ? void 0 : _a.id;
    const graphics = this.mapView.graphics.clone().filter(g => g.attributes.id === id);
    if (graphics.length) {
      const action = type === 'mouseover' ? 'hover' : 'select';
      this.highlightGraphics(this.mapView, graphics, this.hoverGraphicsLayer, action);
      if (action === 'select') {
        this.mapView.openPopup({ features: graphics.toArray() });
        this.mapView.goTo(graphics);
      }
    }
  }
  /**
   * Handles the telemetry event on arcgis-hub-map and adds any extra decoration
   * @param e
   */
  handleMapTelemetry(e) {
    const { detail = {} } = e;
    e.stopPropagation();
    if (!this.disableTelemetry) {
      let telemetry = Object.assign({}, detail);
      // add extra decoration and re-emit
      if (detail.label === index$1.dist.constants.element.POPUP || detail["element"] === index$1.dist.constants.element.POPUP) {
        const target = this.entityType === 'item' ? 'content' : this.entityType;
        telemetry = Object.assign(Object.assign({}, telemetry), { details: util.capitalize(target) });
      }
      this.hubTelemetry.emit(telemetry);
    }
  }
  _renderLoading() {
    return index.h("calcite-loader", { active: true });
  }
  _renderMap() {
    this.injectMapStyleSheet();
    return (index.h(index.Fragment, null, index.h("arcgis-hub-map", { basemap: "gray-vector", disableMouseWheelZoom: this.disableMouseWheelZoom, graphics: this.searchResultGraphics, onHubTelemetry: this.handleMapTelemetry, settings: this.mapSettings }, this._renderMapWidgets()), index.h("arcgis-wormhole", { styles: { position: 'unset' }, target: this.popupEl }, this.popupContent)));
  }
  _renderMapWidgets() {
    return (index.h(index.Fragment, null, this.shouldShowFilterByExtent &&
      index.h("arcgis-hub-map-widget-container", { "expand-disabled": true, expanded: true, scale: "m", view: this.mapView, "view-position": "bottom-left" }, index.h("arcgis-hub-map-widget-checkbox", { checked: this.shouldFilterByExtent, onArcgisHubCheckboxWidgetClicked: this.toggleShouldFilterByExtent, scale: "m", text: this.intl.t('mapFilterCheckboxLabel') })), index.h("arcgis-hub-map-widget-container", { "expand-disabled": true, scale: "s", view: this.mapView, viewPosition: "top-right" }, index.h("arcgis-hub-map-widget-search", { scale: "s", searchViewModelProperties: {
        popupEnabled: false,
        resultGraphicEnabled: false
      }, view: this.mapView })), index.h("arcgis-hub-map-widget-container", { "expand-disabled": true, scale: "s", view: this.mapView, viewPosition: "top-right" }, index.h("arcgis-hub-map-widget-zoom", { scale: "s", view: this.mapView }), index.h("arcgis-hub-map-widget-home", { ref: (el) => this.mapHomeRef = el, scale: "s", view: this.mapView }))));
  }
  _renderList() {
    return (index.h("arcgis-hub-gallery-layout-list", { baseUrl: this.baseUrl, callback: this.callback, cardActionLinks: this.cardActionLinks, cardTitleTag: this.cardTitleTag, corners: this.corners, handleMouseEventEntityCard: this.handleMouseEventEntityCard, imageType: this.imageType, lastSearchResultsCount: this.lastSearchResultsCount, layout: "grid", lazy: this.lazy, limit: this.limit, linkButtonStyle: this.linkButtonStyle, linkButtonText: this.linkButtonText, linkTarget: this.linkTarget, loading: false, newTab: this.newTab, onMouseDown: this.handleMouseEventEntityCard, onMouseLeave: this.handleMouseEventEntityCard, onMouseOver: this.handleMouseEventEntityCard, searchResults: this.searchResults, selectedIds: this.selectedIds, selectedMapFeatureIds: this.selectedMapFeatureIds, selectionMode: this.selectionMode, shadow: this.shadow, showAdditionalInfo: this.showAdditionalInfo, showBadges: this.showBadges, showEmptyState: this.showEmptyState, showLinkButton: this.showLinkButton, showOwner: this.showOwner, showThumbnail: this.showThumbnail, showType: this.showType }));
  }
  _renderPopupContent(result) {
    let type = getFamily.getFamily(result.type);
    // Temporary fix added as part of https://confluencewikidev.esri.com/x/KYJuDg
    // Remove once re-classification efforts are complete
    if (result.type === 'Feature Service') {
      type = 'dataset';
    }
    return (index.h("div", { class: "map-popup-body" }, index.h("arcgis-multiline-ellipsis", { lines: 3 }, result.summary), index.h("calcite-link", { href: getCardModelUrl.getCardModelUrlFromResult(result, this.linkTarget, this.baseUrl), target: this.linkTarget }, this.linkButtonText || this.intl.t(`popupButtonText.${type}`))));
  }
  render() {
    return (index.h(index.Host, { "data-element": "gallery-layout-map" }, this.loading ? this._renderLoading() : this._renderMap(), this.shouldShowResults && this._renderList()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "searchResults": ["clearMap"],
    "shouldFilterByExtent": ["handleShouldFilterByExtentChanged"]
  }; }
};
__decorate([
  memoize.MemoizeDecoratorFactory('searchResults')
], ArcgisHubGalleryLayoutMap.prototype, "searchResultGraphics", null);
__decorate([
  callOnce.callOnceFactory()
], ArcgisHubGalleryLayoutMap.prototype, "injectMapStyleSheet", null);
__decorate([
  debounce.DebounceDecoratorFactory({ timeout: 50 })
], ArcgisHubGalleryLayoutMap.prototype, "highlightGraphics", null);
__decorate([
  debounce.DebounceDecoratorFactory({ timeout: 250 })
], ArcgisHubGalleryLayoutMap.prototype, "handleShouldFilterByExtentChanged", null);
ArcgisHubGalleryLayoutMap.style = arcgisHubGalleryLayoutMapCss;

exports.arcgis_hub_gallery_layout_map = ArcgisHubGalleryLayoutMap;
