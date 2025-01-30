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
import { h, Host } from '@stencil/core';
import intlManager from '../../../utils/intl-manager';
import { bind } from '../../../utils/context';
import CallWhen from '../../../decorators/call-when';
import Debounce from '../../../decorators/debounce';
const HUB_MAP_OUTLINE = '#9747FF';
export class ArcgisHubDiscussionsMapActionNotice {
  /**
   * Constructor function, pre-binds context to relevant methods
   */
  constructor() {
    /**
     * Styles applied when notice is active
     */
    this.activeStyles = {
      outline: `.25rem solid ${HUB_MAP_OUTLINE}`,
      padding: '.25rem',
      outlineOffset: '-.25rem'
    };
    this.view = undefined;
    this.isConnected = undefined;
    bind(this, 'handleDone');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.el);
  }
  connectedCallback() {
    this._connect();
  }
  disconnectedCallback() {
    this._disconnect();
  }
  /**
   * Connects component element and styles to MapView UI container
   */
  _connect() {
    const { view, el, activeStyles } = this;
    const addStyle = (key) => view.ui.container.style[key] = activeStyles[key];
    Object
      .keys(activeStyles)
      .forEach(addStyle);
    view.ui.add(el);
    setTimeout(() => {
      this.isConnected = true;
    }, 50);
  }
  /**
   * Removes component element and styles from UI container
   */
  _disconnect() {
    const { view, activeStyles, el } = this;
    const removeStyle = (key) => view.ui.container.style.removeProperty(key);
    Object
      .keys(activeStyles)
      .forEach(removeStyle);
    view.ui.remove(el);
    this.isConnected = false;
  }
  handleDone() {
    this.arcgisHubDrawDone.emit();
  }
  /**
   * Checks if MapView is available with UI container
   */
  get hasViewUI() {
    const { view } = this;
    return Boolean(view && view.ui);
  }
  get styles() {
    const { isConnected } = this;
    return {
      '--display': (isConnected) ? 'block' : 'none',
      '--hub-map-outline': HUB_MAP_OUTLINE
    };
  }
  render() {
    const { intl, styles, isConnected } = this;
    return (h(Host, { "aria-hidden": isConnected, "data-element": "discussions-map-action-notice", style: styles, tabindex: 0 }, h("div", null, h("span", null, intl.t('adding.notice')), h("calcite-button", { appearance: 'outline-fill', kind: 'neutral', onClick: this.handleDone, round: true, scale: 's' }, intl.t('adding.action')))));
  }
  static get is() { return "arcgis-hub-discussions-map-action-notice"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-discussions-map-action-notice.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-discussions-map-action-notice.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "view": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "__esri.MapView",
          "resolved": "MapView",
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
          "text": "Reference to the map view"
        }
      }
    };
  }
  static get states() {
    return {
      "isConnected": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubDrawDone",
        "name": "arcgisHubDrawDone",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event to notify that 'done' has been clicked and draw state\nshould be inactive"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "el"; }
}
__decorate([
  Debounce({ timeout: 100 }),
  CallWhen({ when() { return this.hasViewUI && !this.isConnected; } })
], ArcgisHubDiscussionsMapActionNotice.prototype, "_connect", null);
__decorate([
  CallWhen({ when() { return this.hasViewUI && this.isConnected; } })
], ArcgisHubDiscussionsMapActionNotice.prototype, "_disconnect", null);
