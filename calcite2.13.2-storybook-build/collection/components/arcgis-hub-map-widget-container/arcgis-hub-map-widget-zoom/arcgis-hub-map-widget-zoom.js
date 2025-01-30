import { h, Host } from '@stencil/core';
import { bind } from '../../../utils/context';
import intlManager from '../../../utils/intl-manager';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { watch } from '@arcgis/core/core/reactiveUtils';
import ZoomViewModel from "@arcgis/core/widgets/Zoom/ZoomViewModel";
import { loadArcGisCss } from "../../../utils/arcgis";
export class ArcgisHubMapWidgetZoom {
  constructor() {
    this.handles = [];
    this.view = undefined;
    this.scale = 'm';
    this.canZoomIn = undefined;
    this.canZoomOut = undefined;
    bind(this, 'zoomIn', 'zoomOut', 'updateCanZoomIn', 'updateCanZoomOut');
  }
  async componentWillLoad() {
    const { el } = this;
    this.intl = await intlManager.loadIntlForComponent(el);
    await this.connectViewModel();
    this.connectWatch();
    loadArcGisCss();
  }
  connectedCallback() {
    this.connectWatch();
  }
  disconnectedCallback() {
    this.removeWatch();
  }
  handleViewChange(view, prevView) {
    if (view && view !== prevView) {
      this.removeWatch();
      this.connectViewModel().then(() => {
        this.connectWatch();
      });
    }
  }
  connectWatch() {
    const { view, handles, zoomViewModel } = this;
    if (view && zoomViewModel) {
      handles.push(watch(() => zoomViewModel.canZoomIn, this.updateCanZoomIn), watch(() => zoomViewModel.canZoomOut, this.updateCanZoomOut));
    }
  }
  removeWatch() {
    const { handles } = this;
    handles.forEach((handle) => {
      handle.remove();
    });
    this.handles = [];
  }
  async connectViewModel() {
    const { view } = this;
    if (view) {
      await view.when();
      this.zoomViewModel = new ZoomViewModel({
        view: view
      });
      const { canZoomIn, canZoomOut } = this.zoomViewModel;
      this.canZoomIn = canZoomIn;
      this.canZoomOut = canZoomOut;
    }
  }
  updateCanZoomIn(value) {
    this.canZoomIn = value;
  }
  updateCanZoomOut(value) {
    this.canZoomOut = value;
  }
  zoomIn() {
    const { zoomViewModel, canZoomIn, view } = this;
    if (zoomViewModel && canZoomIn) {
      zoomViewModel.zoomIn();
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action.zoom.label.in), { details: view.zoom }));
    }
  }
  zoomOut() {
    const { zoomViewModel, canZoomOut, view } = this;
    if (zoomViewModel && canZoomOut) {
      this.zoomViewModel.zoomOut();
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action.zoom.label.out), { details: view.zoom }));
    }
  }
  render() {
    const { zoomIn, zoomOut, canZoomIn, canZoomOut, scale } = this;
    const textZoomIn = this.intl.t('zoomIn');
    const textZoomOut = this.intl.t('zoomOut');
    return (h(Host, { "data-element": "map-widget-zoom" }, h("arcgis-hub-map-widget-generic", { disabled: !canZoomIn, icon: 'plus', onClick: zoomIn, scale: scale, text: textZoomIn }), h("arcgis-hub-map-widget-generic", { disabled: !canZoomOut, icon: 'minus', onClick: zoomOut, scale: scale, text: textZoomOut })));
  }
  static get is() { return "arcgis-hub-map-widget-zoom"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-map-widget-zoom.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-map-widget-zoom.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
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
          "text": ""
        }
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
      }
    };
  }
  static get states() {
    return {
      "canZoomIn": {},
      "canZoomOut": {}
    };
  }
  static get events() {
    return [{
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "view",
        "methodName": "handleViewChange"
      }];
  }
}
