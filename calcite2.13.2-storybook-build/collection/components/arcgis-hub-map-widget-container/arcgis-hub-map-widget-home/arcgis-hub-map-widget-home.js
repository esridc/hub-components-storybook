import { h, Host } from '@stencil/core';
import { bind } from '../../../utils/context';
import intlManager from '../../../utils/intl-manager';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { watch } from '@arcgis/core/core/reactiveUtils';
import HomeViewModel from "@arcgis/core/widgets/Home/HomeViewModel";
import { loadArcGisCss } from "../../../utils/arcgis";
export class ArcgisHubMapWidgetHome {
  constructor() {
    this.handles = [];
    this.view = undefined;
    this.scale = 'm';
    this.disabled = undefined;
    bind(this, 'zoomToInitialExtent', 'updateState');
  }
  async componentWillLoad() {
    const { el } = this;
    this.intl = await intlManager.loadIntlForComponent(el);
    const [intl] = await Promise.all([
      intlManager.loadIntlForComponent(el),
      this.connectViewModel()
    ]);
    this.intl = intl;
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
    const { view, handles, homeViewModel } = this;
    if (view && homeViewModel) {
      handles.push(watch(() => homeViewModel.state, this.updateState));
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
      this.homeViewModel = new HomeViewModel({
        view: view
      });
      const { state } = this.homeViewModel;
      this.updateState(state);
    }
  }
  updateState(value) {
    this.disabled = value === "disabled" || value === "going-home";
  }
  zoomToInitialExtent() {
    const { homeViewModel } = this;
    if (homeViewModel) {
      homeViewModel.go();
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action.zoom.label.to), { details: "Home" }));
    }
  }
  /**
   * Sets the viewpoint of the home widget, which controls the extent that
   * the view should zoom to when the home button is clicked
   * @param viewpoint
   */
  async setViewpoint(viewpoint) {
    const { homeViewModel } = this;
    if (homeViewModel) {
      homeViewModel.viewpoint = viewpoint;
    }
  }
  render() {
    const { scale, disabled } = this;
    return (h(Host, { "data-element": "map-widget-home" }, h("arcgis-hub-map-widget-generic", { disabled: disabled, icon: 'home', onClick: this.zoomToInitialExtent, scale: scale, text: this.intl.t('home') })));
  }
  static get is() { return "arcgis-hub-map-widget-home"; }
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
      "disabled": {}
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
  static get methods() {
    return {
      "setViewpoint": {
        "complexType": {
          "signature": "(viewpoint: __esri.Viewpoint) => Promise<void>",
          "parameters": [{
              "tags": [{
                  "name": "param",
                  "text": "viewpoint"
                }],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            },
            "___esri": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Sets the viewpoint of the home widget, which controls the extent that\nthe view should zoom to when the home button is clicked",
          "tags": [{
              "name": "param",
              "text": "viewpoint"
            }]
        }
      }
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "view",
        "methodName": "handleViewChange"
      }];
  }
}
