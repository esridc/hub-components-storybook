import { Host, h } from '@stencil/core';
import intlManager from '../../utils/intl-manager';
import { bind } from '../../utils/context';
export class ArcgisHubFeedsList {
  constructor() {
    this.feeds = undefined;
    bind(this, 'generateViewButtonHandler');
  }
  onCopyButtonClicked(event) {
    const url = event.detail;
    const feedClicked = this.feeds.find((feed) => feed.url === url);
    this.hubTelemetry.emit({
      category: 'Interaction',
      action: 'Copy',
      label: 'Content',
      details: feedClicked.telemetryName
    });
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  generateViewButtonHandler(feed) {
    // Bind arguments to hubTelemetry.emit()
    return () => {
      this.hubTelemetry.emit({
        category: 'Navigation',
        action: 'View',
        label: 'Content',
        details: feed.telemetryName
      });
    };
  }
  render() {
    return (h(Host, null, h("p", { class: "list-description" }, h("slot", null)), this.feeds.map(feed => (h("div", { class: "feed-container" }, h("arcgis-copyable-input", { label: feed.label, readonly: true, value: feed.copyUrl || feed.url }), h("calcite-button", { appearance: "outline", href: feed.url, iconEnd: "launch", label: this.intl.t('viewButtonLabel'), onClick: this.generateViewButtonHandler(feed), target: "_blank" }, this.intl.t('viewButtonText')))))));
  }
  static get is() { return "arcgis-hub-feeds-list"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-feeds-list.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-feeds-list.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "feeds": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IFeed[]",
          "resolved": "IFeed[]",
          "references": {
            "IFeed": {
              "location": "local"
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
  static get elementRef() { return "element"; }
  static get listeners() {
    return [{
        "name": "arcgisHubCopyButtonClicked",
        "method": "onCopyButtonClicked",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
