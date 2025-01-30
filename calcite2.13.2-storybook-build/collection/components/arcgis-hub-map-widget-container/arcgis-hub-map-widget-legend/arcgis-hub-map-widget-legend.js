import { h, Host } from '@stencil/core';
import { bind } from '../../../utils/context';
import intlManager from '../../../utils/intl-manager';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { watch } from '@arcgis/core/core/reactiveUtils';
import Legend from '@arcgis/core/widgets/Legend';
import { loadArcGisCss } from "../../../utils/arcgis";
export class ArcgisHubMapWidgetLegend {
  constructor() {
    this.scale = 'm';
    this.view = undefined;
    this.active = undefined;
    this.bottomOffset = 0;
    this.topOffset = 0;
    this.closed = true;
    this.viewHeight = undefined;
    this.viewHeightWithOffset = undefined;
    this.viewWidth = undefined;
    bind(this, 'toggleClosed', 'setPanelHeight', 'handleSetPanelRef', 'handleSetWidgetRef');
  }
  async componentWillLoad() {
    const { el } = this;
    const parentContainer = el && el.closest('arcgis-hub-map-widget-container');
    this.viewPosition = parentContainer === null || parentContainer === void 0 ? void 0 : parentContainer.viewPosition;
    this.intl = await intlManager.loadIntlForComponent(el);
  }
  async componentDidLoad() {
    const { view } = this;
    if (view) {
      this.addWidget();
    }
    loadArcGisCss();
  }
  addWidgetToView(view, prevView) {
    if (view && view !== prevView) {
      this.addWidget();
    }
  }
  updateViewHeightWhenOpen() {
    const { closed } = this;
    this.active = !closed;
    if (this.active) {
      this.setPanelHeight();
    }
  }
  emitEventOnActiveChange(active) {
    const details = active
      ? dictionary.category.interaction.action.open.label.panel.details.legend
      : dictionary.category.interaction.action.close.label.panel.details.legend;
    this.hubTelemetry.emit(details);
  }
  handleCalcitePanelDismissedChange(event) {
    event.stopPropagation();
    const panelClosed = event.target.closed;
    this.arcgisHubWidgetPanelToggled.emit(panelClosed);
  }
  handlePanelToggled(event) {
    const { target, detail: panelClosed } = event;
    const { el } = this;
    // panel is dismissible by clicking 'x' in header
    if (target === el) {
      this.closed = panelClosed;
    }
    else if (!panelClosed) {
      // only 1 widget open at a time
      this.closed = true;
    }
  }
  handleSetPanelRef(panelEl) {
    if (panelEl) {
      this.panelEl = panelEl;
    }
  }
  handleSetWidgetRef(legendEl) {
    if (legendEl) {
      this.legendEl = legendEl;
    }
  }
  toggleClosed() {
    this.closed = !this.closed;
  }
  setPanelHeight() {
    const { legendEl, view: { size, container } } = this;
    if (!container) {
      return;
    }
    const [viewWidth, viewHeight] = size;
    this.viewHeight = viewHeight;
    this.viewWidth = viewWidth;
    const { top: viewTop, bottom: viewBottom } = container.getBoundingClientRect();
    const { top: widgetTop, bottom: widgetBottom } = legendEl.getBoundingClientRect();
    this.topOffset = widgetTop - viewTop;
    if (this.viewPosition.includes('top')) {
      this.viewHeightWithOffset = viewHeight - this.topOffset;
    }
    else {
      this.bottomOffset = viewBottom - widgetBottom;
      this.viewHeightWithOffset = viewHeight - this.bottomOffset;
    }
  }
  async addWidget() {
    const { legend, view, panelEl: container } = this;
    if (view && container && !legend) {
      await view.when();
      this.legend = new Legend({
        view: view,
        container
      });
      watch(() => view.size, this.setPanelHeight);
    }
  }
  get positionClass() {
    const { viewPosition } = this;
    if (!viewPosition) {
      return;
    }
    return `hub-widget-legend ${viewPosition.split('-').join(' ')}`;
  }
  get styles() {
    const { viewHeight, viewWidth, viewHeightWithOffset, bottomOffset, topOffset, active } = this;
    let mobileMaxHeight = 640;
    if (mobileMaxHeight > viewHeight) {
      mobileMaxHeight = viewHeight;
    }
    return {
      '--panel-height': `${viewHeightWithOffset}px`,
      '--panel-height-mobile': `${mobileMaxHeight}px`,
      '--view-width': `${viewWidth}px`,
      '--bottom-offset': `${bottomOffset}px`,
      '--top-offset': `${topOffset}px`,
      '--mobile-display': active ? 'flex' : 'none'
    };
  }
  get _messageOverrides() {
    return {
      close: this.intl.t('textClose')
    };
  }
  render() {
    const { styles, positionClass, closed, active, scale } = this;
    const heading = this.intl.t(`heading`);
    const textOpen = this.intl.t(`textOpen`);
    const textClose = this.intl.t(`textClose`);
    return (h(Host, { "data-element": "map-widget-legend", style: styles }, h("calcite-panel", { class: positionClass, closable: true, closed: closed, heading: heading, messageOverrides: this._messageOverrides, ref: this.handleSetPanelRef }), h("arcgis-hub-map-widget-generic", { active: active, icon: 'legend', onClick: this.toggleClosed, ref: this.handleSetWidgetRef, scale: scale, text: active ? textClose : textOpen })));
  }
  static get is() { return "arcgis-hub-map-widget-legend"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-map-widget-legend.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-map-widget-legend.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
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
      }
    };
  }
  static get states() {
    return {
      "active": {},
      "bottomOffset": {},
      "topOffset": {},
      "closed": {},
      "viewHeight": {},
      "viewHeightWithOffset": {},
      "viewWidth": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubWidgetPanelToggled",
        "name": "arcgisHubWidgetPanelToggled",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
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
        "methodName": "addWidgetToView"
      }, {
        "propName": "closed",
        "methodName": "updateViewHeightWhenOpen"
      }, {
        "propName": "active",
        "methodName": "emitEventOnActiveChange"
      }];
  }
  static get listeners() {
    return [{
        "name": "calcitePanelClose",
        "method": "handleCalcitePanelDismissedChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubWidgetPanelToggled",
        "method": "handlePanelToggled",
        "target": "body",
        "capture": false,
        "passive": false
      }];
  }
}
