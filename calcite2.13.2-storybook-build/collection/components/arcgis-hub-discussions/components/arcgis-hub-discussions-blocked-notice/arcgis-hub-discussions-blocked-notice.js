import { Host, h } from '@stencil/core';
import intlManager from '../../../../utils/intl-manager';
import { bind } from '../../../../utils/context';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { ArcgisHubDiscussionsBlockedNoticeConfigs } from './resources';
/** @internal */
export class ArcgisHubDiscussionsBlockedNotice {
  constructor() {
    this.variant = undefined;
    this.scale = 'm';
    bind(this, 'handleImpression');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.el);
  }
  get variantConfig() {
    return ArcgisHubDiscussionsBlockedNoticeConfigs[this.variant];
  }
  handleImpression() {
    this.hubTelemetry.emit(dictionary.category.interaction.action.alert.label.warning.details.discussionsBlocked);
  }
  render() {
    return (h(Host, { "data-element": "discussions-blocked-notice" }, h("calcite-notice", { kind: "warning", open: true, ref: this.handleImpression, scale: this.scale }, h("div", { slot: "title" }, this.intl.t(this.variantConfig.title)), h("div", { slot: "message" }, this.intl.t(this.variantConfig.message)))));
  }
  static get is() { return "arcgis-hub-discussions-blocked-notice"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-discussions-blocked-notice.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-discussions-blocked-notice.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "ArcgisHubDiscussionsBlockedNoticeVariant",
          "resolved": "ArcgisHubDiscussionsBlockedNoticeVariant.EditPost | ArcgisHubDiscussionsBlockedNoticeVariant.EditPostGroup | ArcgisHubDiscussionsBlockedNoticeVariant.EditPostItem | ArcgisHubDiscussionsBlockedNoticeVariant.EditReply | ArcgisHubDiscussionsBlockedNoticeVariant.EditReplyGroup | ArcgisHubDiscussionsBlockedNoticeVariant.EditReplyItem | ArcgisHubDiscussionsBlockedNoticeVariant.Group | ArcgisHubDiscussionsBlockedNoticeVariant.Item | ArcgisHubDiscussionsBlockedNoticeVariant.Reply",
          "references": {
            "ArcgisHubDiscussionsBlockedNoticeVariant": {
              "location": "import",
              "path": "./resources"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "variant",
        "reflect": false
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
}
