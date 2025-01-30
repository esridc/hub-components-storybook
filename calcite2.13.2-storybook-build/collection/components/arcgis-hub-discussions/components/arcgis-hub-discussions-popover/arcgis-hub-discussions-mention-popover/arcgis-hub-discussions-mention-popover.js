import { Host, h, Fragment } from '@stencil/core';
import { bind } from '../../../../../utils/context';
import intlManager from '../../../../../utils/intl-manager';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { getUserThumbnailUrl } from '@esri/hub-common';
export class ArcgisHubDiscussionsMentionPopover {
  constructor() {
    this.buttonEl = undefined;
    this.username = undefined;
    this.fullName = undefined;
    this.thumbnail = undefined;
    this.userId = undefined;
    this.access = undefined;
    this.token = undefined;
    this.portal = undefined;
    this.region = undefined;
    this.organization = undefined;
    this.creatorUsername = undefined;
    this.postId = undefined;
    this.parentId = undefined;
    this.channelId = undefined;
    this.channelAccess = undefined;
    this.index = undefined;
    this.isHub = undefined;
    bind(this, 'handlePopoverOpened', 'handleGoToProfile', 'emitHubTelemetry');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  emitHubTelemetry(telemetry) {
    const { postId, parentId, channelId, channelAccess, index } = this;
    this.hubTelemetry.emit(Object.assign(Object.assign({}, telemetry), { postId,
      parentId,
      channelId,
      channelAccess, position: index }));
  }
  handlePopoverOpened() {
    this.emitHubTelemetry(dictionary.category.interaction.action.open.label.popover.details.details);
  }
  handleGoToProfile() {
    this.emitHubTelemetry(dictionary.category.navigation.action.view.label.users.details.profile);
  }
  renderCreatorAvatar() {
    const { username, fullName, thumbnail, portal, token, userId, access, } = this;
    return (h("calcite-avatar", { "full-name": fullName, scale: "l", thumbnail: thumbnail && getUserThumbnailUrl(portal, {
        username,
        access,
        thumbnail
      }, token), "user-id": userId, username: username }));
  }
  renderCreatorDetails() {
    const { intl, username, fullName } = this;
    let displayFullName = intl.t('anonymous');
    let displayUsername = intl.t('noUser');
    if (username) {
      displayFullName = fullName || intl.t('privateUser');
      displayUsername = username;
    }
    return (h(Fragment, null, h("b", null, displayFullName), h("span", null, displayUsername)));
  }
  renderCreatorExpandedDetails() {
    const { intl, region, organization, username, isHub } = this;
    /// 'region' acts as a stand-in for whether or not the user is viewable from an access standpoint.
    /// If we don't have a region property, we also don't have access to portal or the other needed information.
    if (region) {
      const displayRegion = intl.formatDisplayName(region.toLocaleUpperCase(), { type: 'region' });
      return (h(Fragment, null, organization && h("div", null, h("calcite-icon", { icon: "organization", scale: "s", "text-label": intl.t('orgLabel') }), organization), displayRegion && h("div", null, h("calcite-icon", { icon: "pin", scale: "s", "text-label": intl.t('location') }), displayRegion), isHub && (h("calcite-button", { appearance: "outline-fill", href: "/people/" + username, kind: "neutral", label: intl.t('profile'), onClick: this.handleGoToProfile, round: true, scale: "l", width: "full" }, intl.t('profile')))));
    }
  }
  renderPostDetails() {
    const { intl, creatorUsername } = this;
    return (h("footer", null, h("div", null, h("calcite-icon", { icon: "speech-bubbles", scale: "s" }), h("span", null, intl.t('mentionedBy', { username: creatorUsername })))));
  }
  render() {
    const { intl } = this;
    return (h(Host, { "data-element": "discussions-mention-popover" }, this.buttonEl &&
      h("calcite-popover", { autoClose: true, label: intl.t('information'), overlayPositioning: 'fixed', placement: "top", referenceElement: this.buttonEl }, h("div", { class: "popover-body" }, h("address", null, this.renderCreatorAvatar(), this.renderCreatorDetails()), this.renderCreatorExpandedDetails()), this.renderPostDetails()), h("button", { ref: (el) => { this.buttonEl = el; }, type: "button" }, h("slot", null))));
  }
  static get is() { return "arcgis-hub-discussions-mention-popover"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-discussions-mention-popover.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-discussions-mention-popover.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "username": {
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
          "text": "Username of mentioned user"
        },
        "attribute": "username",
        "reflect": false
      },
      "fullName": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Full name of mentioned user"
        },
        "attribute": "full-name",
        "reflect": false
      },
      "thumbnail": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Thumbnail for mentioned user icon"
        },
        "attribute": "thumbnail",
        "reflect": false
      },
      "userId": {
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
          "text": "Mentioned user ID"
        },
        "attribute": "user-id",
        "reflect": false
      },
      "access": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Mentioned user access level"
        },
        "attribute": "access",
        "reflect": false
      },
      "token": {
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
          "text": "Session token"
        },
        "attribute": "token",
        "reflect": false
      },
      "portal": {
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
          "text": "Session portal"
        },
        "attribute": "portal",
        "reflect": false
      },
      "region": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Mentioned user region"
        },
        "attribute": "region",
        "reflect": false
      },
      "organization": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Mentioned user organization name"
        },
        "attribute": "organization",
        "reflect": false
      },
      "creatorUsername": {
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
          "text": "Username of creator who mentioned the user"
        },
        "attribute": "creator-username",
        "reflect": false
      },
      "postId": {
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
          "text": "Post ID"
        },
        "attribute": "post-id",
        "reflect": false
      },
      "parentId": {
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
          "text": "If reply, parent post ID"
        },
        "attribute": "parent-id",
        "reflect": false
      },
      "channelId": {
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
          "text": "Channel ID"
        },
        "attribute": "channel-id",
        "reflect": false
      },
      "channelAccess": {
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
          "text": "Channel access level"
        },
        "attribute": "channel-access",
        "reflect": false
      },
      "index": {
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
          "text": "Position of post in thread"
        },
        "attribute": "index",
        "reflect": false
      },
      "isHub": {
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
          "text": "If this component is embedded in a Hub site"
        },
        "attribute": "is-hub",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "buttonEl": {}
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
          "text": "Emits telemetry information"
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
        "name": "calcitePopoverOpen",
        "method": "handlePopoverOpened",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
