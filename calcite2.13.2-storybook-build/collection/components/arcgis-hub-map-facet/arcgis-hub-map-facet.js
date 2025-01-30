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
import { Host, h } from '@stencil/core';
import { watch } from "@arcgis/core/core/reactiveUtils";
import Debounce from "../../decorators/debounce";
import { webMercatorToGeographic } from '@arcgis/core/geometry/support/webMercatorUtils';
import Search from "@arcgis/core/widgets/Search";
import { bBoxToExtent, bboxToString, extentToBBox } from '@esri/hub-common';
import Extent from '@arcgis/core/geometry/Extent';
import { injectMapStyleSheet } from '../../utils/arcgis';
import { bind } from '../../utils/context';
import intlManager from '../../utils/intl-manager';
import * as projection from "@arcgis/core/geometry/projection";
/**
 * This component is a prototype and is not production ready. Before we release it to
 * the public, we should address the comments made in the initial PR
 * (https://github.com/Esri/hub-components/pull/1092), namely:
 *
 * - [ ] Replace the `get<:facetType>Facets` functions with a generic, so we don't have to
 * copy-paste with every new facet type
 * - [ ] Consider changing arcgisMapFacetChange to omit `detail`, relying on `event.target`
 * instead (a little more involved, as `this.bbox` couldn't be a getter)
 * - [ ] Consider in-lining the `arcgis-hub-map-widget-checkbox` so we don't bloat component count
 * - [ ] Abstract the loading of JSAPI CSS into a common flow (either revamp `loadArcGisCss` or
 * create a decorator)
 * - [ ] Figure out how to handle extents with aspect ratios that don't match the map. Product should
 * be informed of any assumptions we make
 * - [ ] Push `maybeLoadProjectionEngine` into <arcgis-hub-map> (Note that we wouldn't use `isWgs84()`
 * or `isWebMercator()`, but would check against the spatial reference of the map's basemap.)
 */
export class ArcgisHubMapFacet {
  constructor() {
    this.facet = undefined;
    this.resultsCount = undefined;
    this.view = undefined;
    this.shouldFilterByExtent = false;
    bind(this, 'toggleFilterOnExtent');
  }
  async componentWillLoad() {
    // TODO: create a decorator for this logic
    injectMapStyleSheet(this.element);
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  handleMapViewReady(event) {
    event.stopPropagation();
    const view = event.detail.view;
    view.when(() => {
      view.ui.components = [];
      // TODO: use `arcgis-hub-map-widget-search` instead of appending
      // the widget manually. This should be done once we've moved this
      // map out of the prototype phase
      const searchWidget = new Search({
        view: view,
        popupEnabled: false
      });
      view.ui.add(searchWidget, {
        position: "top-leading",
      });
      this.view = view;
      this.initializeMap();
    });
    watch(() => view.extent, () => this.shouldFilterByExtent && this.handleExtentChange());
  }
  handleFacetChange(oldFacet, newFacet) {
    const oldValue = bboxToString(oldFacet.value || []);
    const newValue = bboxToString(newFacet.value || []);
    if (oldValue !== newValue) {
      this.initializeMap();
    }
  }
  async initializeMap() {
    this.shouldFilterByExtent = !!this.facet.value;
    if (this.view && this._initialExtent) {
      await this.maybeLoadProjectionEngine();
      this.view.extent = this._initialExtent;
    }
  }
  get _initialExtent() {
    let result = null;
    const { value, extent } = this.facet;
    if (value) {
      result = new Extent(bBoxToExtent(value));
    }
    else if (extent) {
      result = new Extent(extent);
    }
    return result;
  }
  /**
   * Workaround for the idiosyncrasies of the JSAPI.
   *
   * If we want to Programmatically set the extent of the MapView using
   * a non-standard Spatial Reference (i.e, NOT WGS–84 or Web Mercator),
   * We need to manually load the Projection Engine.
   *
   * If the proper criteria are met and the engine has not yet been loaded,
   * this function will do so, otherwise it's a no-op.
   */
  async maybeLoadProjectionEngine() {
    const { spatialReference } = this._initialExtent;
    if (!spatialReference.isWGS84 && !spatialReference.isWebMercator) {
      return projection.isLoaded() || projection.load();
    }
  }
  handleExtentChange() {
    this.arcgisMapFacetChange.emit({ key: this.facet.key, value: this.bbox });
  }
  /**
   * Returns a bbox of the current map extent if the filter is toggled on,
   * otherwise null.
   */
  get bbox() {
    let result = null;
    if (this.shouldFilterByExtent && this.view.extent) {
      const geographicExtent = webMercatorToGeographic(this.view.extent);
      result = extentToBBox(geographicExtent);
    }
    return result;
  }
  get shouldShowResultCount() {
    return !isNaN(this.resultsCount);
  }
  toggleFilterOnExtent(evt) {
    this.shouldFilterByExtent = evt.detail;
    this.handleExtentChange();
  }
  render() {
    return (h(Host, { "data-element": "map-facet" }, h("arcgis-hub-map", { basemap: "gray-vector", expand: 1.5 }, this.shouldShowResultCount &&
      h("arcgis-hub-map-widget-container", { "expand-disabled": true, expanded: true, scale: "m", view: this.view, "view-position": "top-leading" }, h("div", { class: "result-count" }, " ", this.intl.t('resultsCount', { resultsCount: this.resultsCount }), " ")), h("arcgis-hub-map-widget-container", { "expand-disabled": true, expanded: true, scale: "m", view: this.view, "view-position": "bottom-leading" }, h("arcgis-hub-map-widget-checkbox", { checked: this.shouldFilterByExtent, onArcgisHubCheckboxWidgetClicked: this.toggleFilterOnExtent, scale: "m", text: this.intl.t('checkboxLabel') })), h("arcgis-hub-map-widget-container", { "expand-disabled": true, scale: "s", view: this.view, "view-position": "bottom-trailing" }, h("arcgis-hub-map-widget-zoom", { scale: "s", view: this.view })))));
  }
  static get is() { return "arcgis-hub-map-facet"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-map-facet.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-map-facet.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "facet": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IMapFacet",
          "resolved": "IMapFacet",
          "references": {
            "IMapFacet": {
              "location": "import",
              "path": "../../utils/types"
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
      "resultsCount": {
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
        "attribute": "results-count",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "view": {},
      "shouldFilterByExtent": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisMapFacetChange",
        "name": "arcgisMapFacetChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "MapFacetChangePayload",
          "resolved": "{ key: string; value: BBox; }",
          "references": {
            "MapFacetChangePayload": {
              "location": "import",
              "path": "../../utils/state-utils"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "facet",
        "methodName": "handleFacetChange"
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
  Debounce({ timeout: 250 })
], ArcgisHubMapFacet.prototype, "handleExtentChange", null);
