import { Host, h } from '@stencil/core';
import { bind } from '../../utils/context';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import SceneView from '@arcgis/core/views/SceneView';
import WebScene from '@arcgis/core/WebScene';
import WebMap from '@arcgis/core/WebMap';
import PortalItem from '@arcgis/core/portal/PortalItem';
import esriConfig from '@arcgis/core/config';
import esriId from '@arcgis/core/identity/IdentityManager';
import Basemap from '@arcgis/core/Basemap';
import { Point, Extent } from '@arcgis/core/geometry';
import Graphic from '@arcgis/core/Graphic';
import { loadArcGisCss } from "../../utils/arcgis";
import { watch, on } from '@arcgis/core/core/reactiveUtils';
import { constants, dictionary } from '@esri/telemetry-dictionary-hub';
import { deepEqual, getProp } from '@esri/hub-common';
import { getGlobalContext } from '../../utils/state';
// Fetches portal item info by item ID and sets
// global portalUrl
const getPortalItem = async (context, itemId) => {
  const { portalUrl } = context;
  esriConfig.portalUrl = portalUrl;
  // register token to access arcgis secure resources
  // invalid placeholder string tokens will prevent login prompt of no session exists
  const token = getProp(context, 'session.token') || 'invalidTokenString';
  const server = getProp(context, 'session.portal') || 'invalidServerString';
  esriId.registerToken({ token, server });
  // end secure resources
  const item = new PortalItem({
    id: itemId,
    portal: {
      url: portalUrl
    }
  });
  await item.load();
  return item;
};
// if you pass JSON returned from an API endpoint to new Graphic()
// or __esri.GraphicProperties to Graphic.fromJSON()
// the fn will not throw but the returned graphic will be missing
// whatever could not be parsed (i.e. symbol will be null)
// so we have to compare the input to the output to validate
const validateGraphicInstance = (input, output) => {
  // most of the format differences are in symbol definitions
  // or due to missing geometry type
  const isInvalid = (input.symbol && !output.symbol) || (input.geometry && !output.geometry);
  return !isInvalid;
};
export class ArcgisHubMap {
  constructor() {
    this.center = '0,0';
    this.zoom = 2;
    this.extent = undefined;
    this.expand = undefined;
    this.basemap = 'gray-vector';
    this.graphics = undefined;
    this.disablePinchZoomAndPanning = false;
    this.disableDoubleClickZoom = false;
    this.disableMouseWheelZoom = false;
    this.settings = undefined;
    bind(this, '_setContainer');
  }
  handleBasemapChanged(basemap) {
    this.map.basemap = Basemap.fromId(basemap);
  }
  handleCenterChanged(center) {
    this.center = center;
    const [longitude, latitude] = this.centerToCoords(center);
    this.view.center = Point.fromJSON({
      longitude,
      latitude
    });
  }
  handleGraphicsChanged(graphics) {
    // empty graphics layer and re-populate
    if (!this.isMapLoaded()) {
      return;
    }
    this.view.graphics.removeAll();
    if (graphics) {
      this.view.graphics.addMany(this.buildGraphics());
    }
  }
  handleExtentChanged() {
    if (!this.isMapLoaded()) {
      return;
    }
    this.setExtent();
  }
  handleDisablePinchZoomAndPanningChange() {
    if (this.disablePinchZoomAndPanning) {
      this.dragHandle = this.view.on("drag", this.stopEvtPropagation);
    }
    else {
      this.dragHandle.remove();
      this.dragHandle = null;
    }
  }
  handleDisableDoubleClickZoomChange() {
    if (this.disableDoubleClickZoom) {
      this.doubleClickHandle = this.view.on("double-click", this.stopEvtPropagation);
    }
    else {
      this.doubleClickHandle.remove();
      this.doubleClickHandle = null;
    }
  }
  handleDisableMouseWheelZoomChange() {
    if (this.disableMouseWheelZoom) {
      this.mouseWheelHandle = this.view.on("mouse-wheel", this.stopEvtPropagation);
    }
    else {
      this.mouseWheelHandle.remove();
      this.mouseWheelHandle = null;
    }
  }
  /**
   * If the settings change, re-setup the map
   */
  async handleSettingsChange(newSettings, oldSettings) {
    if (!deepEqual(newSettings, oldSettings)) {
      await this.setup();
    }
  }
  isMapLoaded() {
    return !!this.map;
  }
  centerToCoords(center) {
    return center.split(',').map(coord => +coord);
  }
  // This fn takes any of the above supported graphics formats
  // and returns a new Graphic instance
  createGraphic(object) {
    const graphicObject = object;
    let newGraphic = graphicObject.clone
      // this is an instance of the Graphic class, clone it
      ? graphicObject.clone()
      // assume this is a __esri.GraphicProperties
      : new Graphic(graphicObject);
    if (!validateGraphicInstance(graphicObject, newGraphic)) {
      // it was probably graphic JSON returned from server
      newGraphic = Graphic.fromJSON(graphicObject);
    }
    return newGraphic;
  }
  buildGraphics() {
    try {
      return this.graphics.filter(Boolean).map(g => this.createGraphic(g));
    }
    catch (err) {
      // if unable to parse graphics arr
      // return empty array
      return [];
    }
  }
  setExtent() {
    let extent = new Extent(this.extent);
    if (this.expand) {
      extent = extent.expand(this.expand);
    }
    this.view.extent = extent;
  }
  _setContainer(el) {
    this._container = el;
  }
  async componentDidLoad() {
    // Esri StyleSheet intelligent loading
    loadArcGisCss();
    await this.setup();
  }
  /**
   * Setup the map and view
   */
  async setup() {
    // Get base properties for view
    const getBaseViewProperties = (map) => {
      return {
        map,
        center: this.centerToCoords(this.center),
        zoom: this.zoom,
        ui: { components: [] }
      };
    };
    let map = new Map({
      basemap: Basemap.fromId(this.basemap)
    });
    let view = new MapView(getBaseViewProperties(map));
    // If we have a portal item from settings, attempt to load it
    const baseViewItemId = getProp(this.settings || {}, 'baseViewItemId[0]');
    if (baseViewItemId) {
      let portalItem;
      try {
        portalItem = await getPortalItem(this._context, baseViewItemId);
      }
      catch (error) {
        // in some scenarios, the portal item may not be found or inaccessible because
        // the user does not have access to the item.
        // in these cases, we should log a warning and continue with the default map
        console.warn(`WARNING: Unable to load portal item ${baseViewItemId}`);
      }
      if (portalItem) {
        const { type } = portalItem;
        const isScene = type === 'Web Scene';
        map = isScene
          ? new WebScene({ portalItem })
          : new WebMap({ portalItem });
        view = isScene
          ? new SceneView({
            map,
            environment: {
              lighting: {
                type: "virtual"
              }
            }
          })
          : new MapView(Object.assign(Object.assign({}, getBaseViewProperties(map)), { extent: portalItem.extent ? portalItem.extent : undefined }));
      }
    }
    // Set the container of the view.  This is done after the view is created
    // to avoid multiple renders of the view
    view.container = this._container;
    this.map = map;
    this.view = view;
    if (this.disablePinchZoomAndPanning) {
      this.dragHandle = this.view.on("drag", this.stopEvtPropagation);
    }
    if (this.disableDoubleClickZoom) {
      this.doubleClickHandle = this.view.on("double-click", this.stopEvtPropagation);
    }
    if (this.disableMouseWheelZoom) {
      this.mouseWheelHandle = this.view.on("mouse-wheel", this.stopEvtPropagation);
    }
    if (this.extent) {
      this.setExtent();
    }
    this.view.graphics.addMany(this.buildGraphics());
    this.addTelemetryWatchers();
    this.arcgisHubMapViewReady.emit({ view: this.view });
  }
  /**
   * Adds handlers for actions in the map view that should emit telemetry
   */
  addTelemetryWatchers() {
    // telemetry for popover opening
    on(() => this.view, "pointer-down", (event) => {
      // check to see if we hit the map and hit a graphic
      this.view.hitTest(event, { include: this.view.graphics }).then((results) => {
        var _a;
        // if we hit a result, then emit a popup telemetry event
        if ((_a = results === null || results === void 0 ? void 0 : results.results) === null || _a === void 0 ? void 0 : _a.length) {
          this.hubTelemetry.emit(dictionary.category.interaction.action.open.label.popUp);
        }
      });
    });
    // popup closes
    watch(() => this.view.popup.visible, () => {
      if (!this.view.popup.visible && this.view.popup.selectedFeature) {
        this.hubTelemetry.emit(dictionary.category.interaction.action.close.label.popUp);
      }
    });
    // telemetry for actions in popup
    on(() => this.view.popup, 'trigger-action', (evt) => {
      // if we have a zoom-to action triggered
      if (evt.action.id === 'zoom-to-feature') {
        // emit a telemetry event
        this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action.zoom.label.to), { element: constants.element.POPUP }));
      }
    });
  }
  stopEvtPropagation(event) {
    event.stopPropagation();
  }
  /**
   * Get the global context
   * @returns {IArcGISContext}
   */
  get _context() {
    return getGlobalContext();
  }
  render() {
    return (h(Host, { "data-element": "Map" }, h("div", { ref: this._setContainer })));
  }
  static get is() { return "arcgis-hub-map"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-map.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-map.css"]
    };
  }
  static get properties() {
    return {
      "center": {
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
          "text": "Map center: lng,lat"
        },
        "attribute": "center",
        "reflect": false,
        "defaultValue": "'0,0'"
      },
      "zoom": {
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
          "text": "Level of Detail (LOD)"
        },
        "attribute": "zoom",
        "reflect": false,
        "defaultValue": "2"
      },
      "extent": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IExtentJson",
          "resolved": "{ xmin: number; ymin: number; xmax: number; ymax: number; spatialReference?: { wkid: number; }; }",
          "references": {
            "IExtentJson": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Geometry Object for setting map extent\nhttps://developers.arcgis.com/documentation/common-data-types/geometry-objects.htm"
        }
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
          "text": "Expand extent by given factor\nhttps://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-Extent.html#expand"
        },
        "attribute": "expand",
        "reflect": false
      },
      "basemap": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "IBasemapOptions",
          "resolved": "\"dark-gray-vector\" | \"gray-vector\" | \"hybrid\" | \"oceans\" | \"osm\" | \"satellite\" | \"streets-navigation-vector\" | \"streets-night-vector\" | \"streets-relief-vector\" | \"streets-vector\" | \"terrain\" | \"topo-vector\"",
          "references": {
            "IBasemapOptions": {
              "location": "local"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Well known basemap ID"
        },
        "attribute": "basemap",
        "reflect": false,
        "defaultValue": "'gray-vector'"
      },
      "graphics": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "any[]",
          "resolved": "any[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Array of graphics that will be added to the view's graphics layer\nThe graphics can be an array of any of the following:\n- JSON objects in the API response format (i.e. web map spec)\n- the properties you pass to new Graphic() (__esri.GraphicProperties)\n- instances of the Graphic class (__esri.Graphic)\nThe latter will be cloned before being added to the map. See:\nhttps://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#graphics"
        }
      },
      "disablePinchZoomAndPanning": {
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
          "text": "Whether to disable pinch-zoom and panning on the view"
        },
        "attribute": "disable-pinch-zoom-and-panning",
        "reflect": false,
        "defaultValue": "false"
      },
      "disableDoubleClickZoom": {
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
          "text": "Whether to disable zooming via double-click on the view"
        },
        "attribute": "disable-double-click-zoom",
        "reflect": false,
        "defaultValue": "false"
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
          "text": "Whether to disable mouse wheel scroll zooming on the view"
        },
        "attribute": "disable-mouse-wheel-zoom",
        "reflect": false,
        "defaultValue": "false"
      },
      "settings": {
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
          "text": "Entity specific map configuration settings"
        }
      }
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubMapViewReady",
        "name": "arcgisHubMapViewReady",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "{view: __esri.MapView}",
          "resolved": "{ view: MapView; }",
          "references": {
            "___esri": {
              "location": "global"
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
  static get watchers() {
    return [{
        "propName": "basemap",
        "methodName": "handleBasemapChanged"
      }, {
        "propName": "center",
        "methodName": "handleCenterChanged"
      }, {
        "propName": "graphics",
        "methodName": "handleGraphicsChanged"
      }, {
        "propName": "extent",
        "methodName": "handleExtentChanged"
      }, {
        "propName": "expand",
        "methodName": "handleExtentChanged"
      }, {
        "propName": "disablePinchZoomAndPanning",
        "methodName": "handleDisablePinchZoomAndPanningChange"
      }, {
        "propName": "disableDoubleClickZoom",
        "methodName": "handleDisableDoubleClickZoomChange"
      }, {
        "propName": "disableMouseWheelZoom",
        "methodName": "handleDisableMouseWheelZoomChange"
      }, {
        "propName": "settings",
        "methodName": "handleSettingsChange"
      }];
  }
}
