import { Host, h } from '@stencil/core';
import { getNotices, removeNotice, } from '../../utils/state';
import { getPreconfiguredNotices } from '../../utils/notices/notices';
import { getGlobalContext } from '../../utils/state';
/**
 * This component is responsible for rendering preconfigured notices as well as on-demand notices pushed to the global state (stencil store).
 * NOTE: we expect a single instance of this component on the page to avoid duplicate notices
 */
export class ArcgisHubNoticeProvider {
  constructor() {
    this.onCloseNotice = (evt) => {
      // if it is in the store, remove it
      removeNotice(evt.detail.id);
    };
    this.place = undefined;
    this.autoShowDisabled = undefined;
  }
  get _context() { return getGlobalContext(); }
  /**
  * An array of preconfigured notices that should be automatically shown
  * @readonly
  * @private
  * @memberof ArcgisHubNoticeProvider
  */
  get preConfigured() {
    let result = [];
    if (!this.autoShowDisabled) {
      const isNotInline = (n) => {
        return ['alert', 'modal'].includes(n.configuration.noticeType);
      };
      // we attempt to show the configured ones if they are not inline and autoShow is true
      // the child component will do further checks to see if it should be shown
      const configuredNotices = getPreconfiguredNotices(this._context);
      result = Object.values(configuredNotices).filter(n => n.autoShow && isNotInline(n));
    }
    return result;
  }
  /**
  * An array of notices that are pushed to the global state
  * @readonly
  * @private
  * @memberof ArcgisHubNoticeProvider
  */
  get onDemand() {
    return getNotices();
  }
  /**
  * An array of all notices that should be rendered
  * @readonly
  * @private
  * @memberof ArcgisHubNoticeProvider
  */
  get notices() {
    return [...this.preConfigured, ...this.onDemand];
  }
  render() {
    return (h(Host, { "data-element": "hub-notice-provider" }, this.notices.map(a => {
      return h("arcgis-hub-notice", { id: a.id, key: a.id, notice: a, onArcgisHubNoticeClose: this.onCloseNotice, place: this.place });
    })));
  }
  static get is() { return "arcgis-hub-notice-provider"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-notice-provider.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-notice-provider.css"]
    };
  }
  static get properties() {
    return {
      "place": {
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
          "text": "The current place in the app - this will typically be a url path"
        },
        "attribute": "place",
        "reflect": false
      },
      "autoShowDisabled": {
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
        "attribute": "auto-show-disabled",
        "reflect": false
      }
    };
  }
}
