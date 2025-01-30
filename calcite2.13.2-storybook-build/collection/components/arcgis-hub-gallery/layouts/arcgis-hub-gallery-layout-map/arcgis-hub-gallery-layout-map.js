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
import { extentToBBox, getProp, getFamily, getCardModelUrlFromResult, capitalize } from '@esri/hub-common';
import { Fragment, Host, h } from '@stencil/core';
import { bind } from '../../../../utils/context';
import CallOnce from '../../../../decorators/call-once';
import Debounce from "../../../../decorators/debounce";
import Memoize from '../../../../decorators/memoize';
import { injectMapStyleSheet } from '../../../../utils/arcgis';
import { clearActiveMapState, constrainViewToWorldBounds, DEFAULT_MAP_SETTINGS, getHighlightOptions, getSymbol, sortGeometriesByArea, } from '../../utils/location';
import { planarArea } from "@arcgis/core/geometry/geometryEngine";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import { webMercatorToGeographic } from "@arcgis/core/geometry/support/webMercatorUtils";
import { on, watch } from "@arcgis/core/core/reactiveUtils";
import Viewpoint from "@arcgis/core/Viewpoint";
import { CORNERS, IMAGE_TYPES } from '../../../interfaces';
import intlManager from '../../../../utils/intl-manager';
import { constants } from '@esri/telemetry-dictionary-hub';
/**
 * arcgis-hub-gallery-layout-map
 * A component for rendering an array of IHubSearchResults in a map layout
 * Can be used standalone or via the gallery with layout="map"
 */
export class ArcgisHubGalleryLayoutMap {
  constructor() {
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
    this.imageType = IMAGE_TYPES.thumbnail;
    this.lazy = false;
    this.newTab = false;
    this.selectionMode = 'none';
    this.cardTitleTag = undefined;
    this.corners = CORNERS.square;
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
    this.galleryMapSettings = DEFAULT_MAP_SETTINGS;
    this.mapSettings = undefined;
    this.initialExtent = undefined;
    this.disableMouseWheelZoom = false;
    this.disableTelemetry = false;
    this.entityType = undefined;
    this.popupContent = (h("div", null));
    this.mapView = undefined;
    this.selectedMapFeatureIds = [];
    bind(this, 'handleMapTelemetry', 'handleMouseEventEntityCard', 'handleShouldFilterByExtentChanged', 'setExtent', 'toggleShouldFilterByExtent');
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
    this.intl = await intlManager.loadIntlForComponent(this.element);
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
      const geographicExtent = webMercatorToGeographic(this.mapView.extent);
      const bbox = extentToBBox(geographicExtent);
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
          symbol: getSymbol(geometry),
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
      return sortGeometriesByArea(a.geometry, b.geometry, planarArea);
    });
    return graphics;
  }
  injectMapStyleSheet() {
    injectMapStyleSheet(this.element);
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
      layerView.highlightOptions = getHighlightOptions(highlightType);
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
      this.mapHomeRef.setViewpoint(new Viewpoint({ targetGeometry: this.expandExtent(mapView.extent) }));
    });
  }
  /**
   * Clears popups, highlights, and selected  map features
   */
  clearMap() {
    if (this.mapView) {
      clearActiveMapState(this.mapView);
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
    this.highlightGraphicsLayer = new GraphicsLayer({ graphics: [] });
    this.hoverGraphicsLayer = new GraphicsLayer({ graphics: [] });
    view.map.addMany([this.highlightGraphicsLayer, this.hoverGraphicsLayer]);
    constrainViewToWorldBounds(view);
    view.ui.components = []; // remove default UI components
    // Override default goTo behavior in popup to zoom to all graphics with same ID
    view.popup.goToOverride = (view) => {
      const selectedFeatureId = view.popup.selectedFeature.attributes.id;
      const selectedGraphics = view.graphics.clone().filter(g => g.attributes.id === selectedFeatureId);
      view.goTo(selectedGraphics);
    };
    this.setExtent();
    // wire up the popup
    watch(() => view.popup.selectedFeature, () => {
      if (getProp(view, 'popup.selectedFeature.sourceLayer')) {
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
    watch(() => view.widthBreakpoint, () => {
      // We are re-setting things based on the widthBreakpoint when the widthBreakpoint changes
      // To get the popup content to re-render with the correct position
      // We have to set the popup content again
      if (view.popup.dockOptions) {
        view.popup.dockOptions.position = view.widthBreakpoint === 'xsmall' ? 'bottom-center' : 'bottom-right';
      }
      if (view.popup.selectedFeature && !getProp(view, 'popup.selectedFeature.sourceLayer')) {
        this.popupContent = this._renderPopupContent(view.popup.selectedFeature.attributes);
      }
    });
    watch(() => view.popup.visible, () => {
      if (!view.popup.visible) {
        // clear highlights when popup closes
        this.clearMap();
      }
    });
    watch(() => view.extent, () => {
      if (this.shouldFilterByExtent) {
        this.handleShouldFilterByExtentChanged();
      }
    }); // filter results by extent
    on(() => view.graphics, "change", this.setExtent); // set extent on every change in graphics
    let activeGraphicId; // reference to the active graphic id
    on(() => view, "pointer-move", (event) => {
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
      const geographicExtent = webMercatorToGeographic(this.mapView.extent);
      const bbox = extentToBBox(geographicExtent);
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
      if (detail.label === constants.element.POPUP || detail["element"] === constants.element.POPUP) {
        const target = this.entityType === 'item' ? 'content' : this.entityType;
        telemetry = Object.assign(Object.assign({}, telemetry), { details: capitalize(target) });
      }
      this.hubTelemetry.emit(telemetry);
    }
  }
  _renderLoading() {
    return h("calcite-loader", { active: true });
  }
  _renderMap() {
    this.injectMapStyleSheet();
    return (h(Fragment, null, h("arcgis-hub-map", { basemap: "gray-vector", disableMouseWheelZoom: this.disableMouseWheelZoom, graphics: this.searchResultGraphics, onHubTelemetry: this.handleMapTelemetry, settings: this.mapSettings }, this._renderMapWidgets()), h("arcgis-wormhole", { styles: { position: 'unset' }, target: this.popupEl }, this.popupContent)));
  }
  _renderMapWidgets() {
    return (h(Fragment, null, this.shouldShowFilterByExtent &&
      h("arcgis-hub-map-widget-container", { "expand-disabled": true, expanded: true, scale: "m", view: this.mapView, "view-position": "bottom-left" }, h("arcgis-hub-map-widget-checkbox", { checked: this.shouldFilterByExtent, onArcgisHubCheckboxWidgetClicked: this.toggleShouldFilterByExtent, scale: "m", text: this.intl.t('mapFilterCheckboxLabel') })), h("arcgis-hub-map-widget-container", { "expand-disabled": true, scale: "s", view: this.mapView, viewPosition: "top-right" }, h("arcgis-hub-map-widget-search", { scale: "s", searchViewModelProperties: {
        popupEnabled: false,
        resultGraphicEnabled: false
      }, view: this.mapView })), h("arcgis-hub-map-widget-container", { "expand-disabled": true, scale: "s", view: this.mapView, viewPosition: "top-right" }, h("arcgis-hub-map-widget-zoom", { scale: "s", view: this.mapView }), h("arcgis-hub-map-widget-home", { ref: (el) => this.mapHomeRef = el, scale: "s", view: this.mapView }))));
  }
  _renderList() {
    return (h("arcgis-hub-gallery-layout-list", { baseUrl: this.baseUrl, callback: this.callback, cardActionLinks: this.cardActionLinks, cardTitleTag: this.cardTitleTag, corners: this.corners, handleMouseEventEntityCard: this.handleMouseEventEntityCard, imageType: this.imageType, lastSearchResultsCount: this.lastSearchResultsCount, layout: "grid", lazy: this.lazy, limit: this.limit, linkButtonStyle: this.linkButtonStyle, linkButtonText: this.linkButtonText, linkTarget: this.linkTarget, loading: false, newTab: this.newTab, onMouseDown: this.handleMouseEventEntityCard, onMouseLeave: this.handleMouseEventEntityCard, onMouseOver: this.handleMouseEventEntityCard, searchResults: this.searchResults, selectedIds: this.selectedIds, selectedMapFeatureIds: this.selectedMapFeatureIds, selectionMode: this.selectionMode, shadow: this.shadow, showAdditionalInfo: this.showAdditionalInfo, showBadges: this.showBadges, showEmptyState: this.showEmptyState, showLinkButton: this.showLinkButton, showOwner: this.showOwner, showThumbnail: this.showThumbnail, showType: this.showType }));
  }
  _renderPopupContent(result) {
    let type = getFamily(result.type);
    // Temporary fix added as part of https://confluencewikidev.esri.com/x/KYJuDg
    // Remove once re-classification efforts are complete
    if (result.type === 'Feature Service') {
      type = 'dataset';
    }
    return (h("div", { class: "map-popup-body" }, h("arcgis-multiline-ellipsis", { lines: 3 }, result.summary), h("calcite-link", { href: getCardModelUrlFromResult(result, this.linkTarget, this.baseUrl), target: this.linkTarget }, this.linkButtonText || this.intl.t(`popupButtonText.${type}`))));
  }
  render() {
    return (h(Host, { "data-element": "gallery-layout-map" }, this.loading ? this._renderLoading() : this._renderMap(), this.shouldShowResults && this._renderList()));
  }
  static get is() { return "arcgis-hub-gallery-layout-map"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-gallery-layout-map.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-gallery-layout-map.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "searchResults": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubSearchResult[]",
          "resolved": "IHubSearchResult[]",
          "references": {
            "IHubSearchResult": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "[]"
      },
      "loading": {
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
          "text": ""
        },
        "attribute": "loading",
        "reflect": false,
        "defaultValue": "false"
      },
      "selectedIds": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "[]"
      },
      "baseUrl": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "base-url",
        "reflect": false
      },
      "linkTarget": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "CardModelTarget",
          "resolved": "\"event\" | \"none\" | \"self\" | \"siteRelative\" | \"workspaceRelative\"",
          "references": {
            "CardModelTarget": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Pre-defined options of where the card should redirect"
        },
        "attribute": "link-target",
        "reflect": false,
        "defaultValue": "'self'"
      },
      "limit": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "limit",
        "reflect": false,
        "defaultValue": "10"
      },
      "showThumbnail": {
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
          "text": ""
        },
        "attribute": "show-thumbnail",
        "reflect": false,
        "defaultValue": "true"
      },
      "imageType": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "IMAGE_TYPES",
          "resolved": "IMAGE_TYPES.icon | IMAGE_TYPES.thumbnail",
          "references": {
            "IMAGE_TYPES": {
              "location": "import",
              "path": "../../../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The type of image that individual cards will display.\nEither thumbnail or icon, defaults to thumbnail."
        },
        "attribute": "image-type",
        "reflect": false,
        "defaultValue": "IMAGE_TYPES.thumbnail"
      },
      "lazy": {
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
          "text": "Indicates if the thumbnail on individual cards should lazy load"
        },
        "attribute": "lazy",
        "reflect": false,
        "defaultValue": "false"
      },
      "newTab": {
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
          "text": "Whether the target url for individual cards should open up in a new tab"
        },
        "attribute": "new-tab",
        "reflect": false,
        "defaultValue": "false"
      },
      "selectionMode": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "SelectionMode",
          "resolved": "\"multiple\" | \"none\" | \"single\"",
          "references": {
            "SelectionMode": {
              "location": "import",
              "path": "../../../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Whether individual cards are selectable via a checkbox"
        },
        "attribute": "selection-mode",
        "reflect": false,
        "defaultValue": "'none'"
      },
      "cardTitleTag": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines what tag (i.e <h3>, <h4>) should wrap the titles on each card. Used for accessibility compliance."
        },
        "attribute": "card-title-tag",
        "reflect": false
      },
      "corners": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "CORNERS",
          "resolved": "CORNERS.round | CORNERS.square",
          "references": {
            "CORNERS": {
              "location": "import",
              "path": "../../../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines how the corners of each card are styled."
        },
        "attribute": "corners",
        "reflect": false,
        "defaultValue": "CORNERS.square"
      },
      "showAdditionalInfo": {
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
          "text": "Whether individual cards should display additional info (metadata) about their view models"
        },
        "attribute": "show-additional-info",
        "reflect": false,
        "defaultValue": "true"
      },
      "showEmptyState": {
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
          "text": "Whether the gallery should show special empty state when the current search has returned no results"
        },
        "attribute": "show-empty-state",
        "reflect": false,
        "defaultValue": "true"
      },
      "shadow": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "DROP_SHADOWS",
          "resolved": "DROP_SHADOWS.heavy | DROP_SHADOWS.low | DROP_SHADOWS.medium | DROP_SHADOWS.none",
          "references": {
            "DROP_SHADOWS": {
              "location": "import",
              "path": "../../../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines how heavy of a drop shadow should be applied to the individual cards"
        },
        "attribute": "shadow",
        "reflect": false
      },
      "showLinkButton": {
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
          "text": "Whether the individual cards should add a link button (as opposed to relying on\nthe link in the card's title). Must be used in conjunction with `linkButtonText`."
        },
        "attribute": "show-link-button",
        "reflect": false,
        "defaultValue": "false"
      },
      "linkButtonText": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The text to display on each card's link button. Must be used in conjunction with `showlinkButton`."
        },
        "attribute": "link-button-text",
        "reflect": false
      },
      "linkButtonStyle": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Appearance",
          "resolved": "\"outline\" | \"outline-fill\" | \"solid\" | \"transparent\"",
          "references": {
            "Appearance": {
              "location": "import",
              "path": "@esri/calcite-components/dist/types/components/interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Sets the style of each card's link button. Must be used in conjunction with `showlinkButton`."
        },
        "attribute": "link-button-style",
        "reflect": false
      },
      "showBadges": {
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
          "text": "Show/hide available badges on each card. Badges are defined in the view model of each card."
        },
        "attribute": "show-badges",
        "reflect": false,
        "defaultValue": "true"
      },
      "showType": {
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
          "text": "Show/hide the view model's family name and icon on each card"
        },
        "attribute": "show-type",
        "reflect": false,
        "defaultValue": "true"
      },
      "showOwner": {
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
          "text": "Show/hide the view model's source information on each card"
        },
        "attribute": "show-owner",
        "reflect": false,
        "defaultValue": "true"
      },
      "cardActionLinks": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ICardActionLink[]",
          "resolved": "ICardActionLink[]",
          "references": {
            "ICardActionLink": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "[]"
      },
      "lastSearchResultsCount": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The number of search results from the last search\nused by some layouts for a11y purposes"
        },
        "attribute": "last-search-results-count",
        "reflect": false
      },
      "callback": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "CardViewModelCallback",
          "resolved": "(model: IHubCardViewModel, layout: CardLayout, context: IArcGISContext, result: HubEntity | IHubSearchResult) => IHubCardViewModel",
          "references": {
            "CardViewModelCallback": {
              "location": "import",
              "path": "../../../../utils/cardModelConverters/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Passing a callback function into the gallery allows the developer to apply custom\nbusiness logic to the processing of the Card View model. This is useful in scenarios\nwhere we want to show non-standard metadata, badges, actions and to apply logic to\nthe selectability of the card."
        }
      },
      "hasError": {
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
          "text": ""
        },
        "attribute": "has-error",
        "reflect": false,
        "defaultValue": "false"
      },
      "expand": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "expand",
        "reflect": false,
        "defaultValue": "1.5"
      },
      "shouldShowResults": {
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
          "text": ""
        },
        "attribute": "should-show-results",
        "reflect": false,
        "defaultValue": "false"
      },
      "shouldShowFilterByExtent": {
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
          "text": ""
        },
        "attribute": "should-show-filter-by-extent",
        "reflect": false,
        "defaultValue": "false"
      },
      "shouldFilterByExtent": {
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
          "text": ""
        },
        "attribute": "should-filter-by-extent",
        "reflect": false,
        "defaultValue": "false"
      },
      "galleryMapSettings": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IGalleryMapSettings",
          "resolved": "IGalleryMapSettings",
          "references": {
            "IGalleryMapSettings": {
              "location": "import",
              "path": "../../utils/location"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{IGalleryMapSettings}"
            }],
          "text": "Map configuration settings specific to the gallery experience\n- extent\n  - 'default' - Uses site extent, or org extent if not available.  If neither are available, uses extent of initial results.\n  - 'results' - Uses extent of initial results.  Changes to query do not update extent.\n  - 'continuous' - Uses extent of initial results.  Changes to query update extent.\nTODO - We will likely want to fold this into the mapSettings prop, so this component\nwould only have one mapSettings prop to manage."
        },
        "defaultValue": "DEFAULT_MAP_SETTINGS"
      },
      "mapSettings": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubMapSettings",
          "resolved": "IHubMapSettings",
          "references": {
            "IHubMapSettings": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "IHubMapSettings object that defines the map's initial state.  Currently this is used to set\nthe underlying web map or web scene by itemId.  In the future this will hold additional settings\nthat are passed into the map component.\nExample: { itemId: '1234567890' }"
        }
      },
      "initialExtent": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "__esri.Extent",
          "resolved": "Extent",
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
          "text": ""
        }
      },
      "disableMouseWheelZoom": {
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
          "text": ""
        },
        "attribute": "disable-mouse-wheel-zoom",
        "reflect": false,
        "defaultValue": "false"
      },
      "disableTelemetry": {
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
          "text": ""
        },
        "attribute": "disable-telemetry",
        "reflect": false,
        "defaultValue": "false"
      },
      "entityType": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "EntityType",
          "resolved": "\"channel\" | \"communityUser\" | \"discussionPost\" | \"event\" | \"eventAttendee\" | \"group\" | \"groupMember\" | \"item\" | \"portalUser\" | \"user\"",
          "references": {
            "EntityType": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "entity-type",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "popupContent": {},
      "mapView": {},
      "selectedMapFeatureIds": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubGalleryFacetChange",
        "name": "arcgisHubGalleryFacetChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IMapFacet",
          "resolved": "IMapFacet",
          "references": {
            "IMapFacet": {
              "location": "import",
              "path": "../../../../utils/types"
            }
          }
        }
      }, {
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event that fires for recording telemetry"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "searchResults",
        "methodName": "clearMap"
      }, {
        "propName": "shouldFilterByExtent",
        "methodName": "handleShouldFilterByExtentChanged"
      }];
  }
  static get listeners() {
    return [{
        "name": "arcgisHubMapViewReady",
        "method": "handleMapViewReady",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
__decorate([
  Memoize('searchResults')
], ArcgisHubGalleryLayoutMap.prototype, "searchResultGraphics", null);
__decorate([
  CallOnce()
], ArcgisHubGalleryLayoutMap.prototype, "injectMapStyleSheet", null);
__decorate([
  Debounce({ timeout: 50 })
], ArcgisHubGalleryLayoutMap.prototype, "highlightGraphics", null);
__decorate([
  Debounce({ timeout: 250 })
], ArcgisHubGalleryLayoutMap.prototype, "handleShouldFilterByExtentChanged", null);
