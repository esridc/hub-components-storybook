import { Host, h, Fragment, getAssetPath } from '@stencil/core';
import { SharingAccess } from '@esri/hub-discussions';
import { getUserThumbnailUrl } from '@esri/hub-common';
import intlManager from '../../../../utils/intl-manager';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { bind } from '../../../../utils/context';
import { getChannelName } from '../../utils/discussions';
import { getGlobalContext } from '../../../../utils/state';
/** @internal */
export class ArcgisHubDiscussionsPopover {
  constructor() {
    this.buttonEl = undefined;
    this.post = undefined;
    this.postCreator = undefined;
    this.postCreatorOrg = undefined;
    this.channel = undefined;
    this.channelGroups = undefined;
    this.parent = undefined;
    this.parentCreator = undefined;
    this.index = undefined;
    this.isHub = undefined;
    bind(this, 'handlePopoverOpened', 'handleGoToProfile', 'emitHubTelemetry');
  }
  get _context() {
    return getGlobalContext();
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  emitHubTelemetry(telemetry) {
    const { post, parent, channel, index } = this;
    this.hubTelemetry.emit(Object.assign(Object.assign({}, telemetry), { postId: post === null || post === void 0 ? void 0 : post.id, parentId: parent === null || parent === void 0 ? void 0 : parent.id, channelId: channel === null || channel === void 0 ? void 0 : channel.id, channelAccess: channel === null || channel === void 0 ? void 0 : channel.access, position: index }));
  }
  handlePopoverOpened() {
    this.emitHubTelemetry(dictionary.category.interaction.action.open.label.popover.details.details);
  }
  handleCalcitePopoverBeforeOpened() {
    this.arcgisHubDiscussionPopoverBeforeOpen.emit();
  }
  handlePopoverClosed() {
    this.arcgisHubDiscussionPopoverClose.emit();
  }
  handleGoToProfile() {
    this.emitHubTelemetry(dictionary.category.navigation.action.view.label.users.details.profile);
  }
  renderCreatorAvatar() {
    var _a;
    const { post, postCreator: creator, _context, intl } = this;
    const user = (!creator && post)
      ? { username: post.creator }
      : creator;
    return (user === null || user === void 0 ? void 0 : user.username) ? (h("calcite-avatar", { "full-name": user === null || user === void 0 ? void 0 : user.fullName, scale: "l", thumbnail: (user === null || user === void 0 ? void 0 : user.thumbnail) && getUserThumbnailUrl(_context.hubRequestOptions.portal, user, (_a = _context.hubRequestOptions.authentication) === null || _a === void 0 ? void 0 : _a.token), "user-id": user === null || user === void 0 ? void 0 : user.id, username: user === null || user === void 0 ? void 0 : user.username })) : (h("calcite-avatar", { "full-name": intl.t('anonymous'), scale: "l", thumbnail: getAssetPath('./assets/no-user-thumb.jpeg') }));
  }
  renderCreatorDetails() {
    const { intl, post: { creator: creatorUsername }, postCreator: creator, } = this;
    let fullName = intl.t('anonymous');
    let username;
    if (creator || creatorUsername) {
      fullName = (creator === null || creator === void 0 ? void 0 : creator.fullName) || intl.t('privateUser');
      username = creatorUsername;
    }
    return (h(Fragment, null, h("b", null, fullName), username && (h("span", null, username))));
  }
  renderCreatorExpandedDetails() {
    const { intl, postCreator: creator, postCreatorOrg: organization, isHub } = this;
    /// 'region' acts as a stand-in for whether or not the user is viewable from an access standpoint.
    /// If we don't have a region property, we also don't have access to portal or the other needed information.
    if (creator === null || creator === void 0 ? void 0 : creator.region) {
      const region = intl.formatDisplayName(creator.region.toLocaleUpperCase(), { type: 'region' });
      return (h(Fragment, null, organization && h("div", null, h("calcite-icon", { icon: "organization", scale: "s", "text-label": intl.t('orgLabel') }), (organization === null || organization === void 0 ? void 0 : organization.name) || intl.t('privateOrg')), h("div", null, h("calcite-icon", { icon: "pin", scale: "s", "text-label": intl.t('location') }), region), isHub && (h("calcite-button", { appearance: "outline-fill", href: "/people/" + creator.username, kind: "neutral", label: intl.t('profile'), onClick: this.handleGoToProfile, round: true, scale: "l", width: "full" }, intl.t('profile')))));
    }
  }
  renderPostDetails() {
    const { intl, post, parentCreator, channel, channelGroups } = this;
    const postedTo = parentCreator ?
      h("div", null, h("calcite-icon", { icon: "right", scale: "s" }), intl.t('replyingTo', { username: parentCreator.username })) :
      h("div", null, h("calcite-icon", { icon: "speech-bubble", scale: "s" }), h("span", null, intl.t('postedIn', { groupName: getChannelName(channel, channelGroups, intl.t('unnamedChannel')) })));
    let visibilityIcon;
    let visibilityText;
    if (channel.access === SharingAccess.PRIVATE) {
      visibilityIcon = "lock";
      visibilityText = intl.t('visiblePrivate');
    }
    else if (channel.access === SharingAccess.ORG) {
      visibilityIcon = "organization";
      visibilityText = intl.t('visibleOrg');
    }
    else if (channel.access === SharingAccess.PUBLIC) {
      visibilityIcon = "globe";
      visibilityText = intl.t('visibleAll');
    }
    const timestamp = new Date(post.createdAt).toLocaleString(intl.locale, {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
    return (h("footer", null, postedTo, h("div", null, h("calcite-icon", { icon: visibilityIcon, scale: "s" }), visibilityText), h("div", null, h("calcite-icon", { icon: "clock", scale: "s" }), timestamp)));
  }
  render() {
    const { intl } = this;
    return (h(Host, { "data-element": "discussions-popover" }, this.buttonEl &&
      h("calcite-popover", { autoClose: true, label: intl.t('information'), overlayPositioning: "fixed", placement: "top", referenceElement: this.buttonEl }, h("div", { class: "popover-body" }, h("address", null, this.renderCreatorAvatar(), this.renderCreatorDetails()), this.renderCreatorExpandedDetails()), this.renderPostDetails()), h("button", { "aria-label": intl.t('buttonLabel'), ref: (el) => { this.buttonEl = el; }, type: "button" }, h("slot", null))));
  }
  static get is() { return "arcgis-hub-discussions-popover"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-discussions-popover.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-discussions-popover.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "post": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IPost | null",
          "resolved": "IPost",
          "references": {
            "IPost": {
              "location": "import",
              "path": "@esri/hub-discussions"
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
      "postCreator": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IUser | null",
          "resolved": "IUser",
          "references": {
            "IUser": {
              "location": "import",
              "path": "@esri/arcgis-rest-portal"
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
      "postCreatorOrg": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IPortal | null",
          "resolved": "IPortal",
          "references": {
            "IPortal": {
              "location": "import",
              "path": "@esri/arcgis-rest-portal"
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
      "channel": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IChannel",
          "resolved": "IChannel",
          "references": {
            "IChannel": {
              "location": "import",
              "path": "@esri/hub-discussions"
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
      "channelGroups": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IGroup[]",
          "resolved": "IGroup[]",
          "references": {
            "IGroup": {
              "location": "import",
              "path": "@esri/arcgis-rest-portal"
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
      "parent": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IPost",
          "resolved": "IPost",
          "references": {
            "IPost": {
              "location": "import",
              "path": "@esri/hub-discussions"
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
      "parentCreator": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IUser",
          "resolved": "IUser",
          "references": {
            "IUser": {
              "location": "import",
              "path": "@esri/arcgis-rest-portal"
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
      }, {
        "method": "arcgisHubDiscussionPopoverBeforeOpen",
        "name": "arcgisHubDiscussionPopoverBeforeOpen",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted just before popover opens"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "arcgisHubDiscussionPopoverClose",
        "name": "arcgisHubDiscussionPopoverClose",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when popover closes"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
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
      }, {
        "name": "calcitePopoverBeforeOpen",
        "method": "handleCalcitePopoverBeforeOpened",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "calcitePopoverClose",
        "method": "handlePopoverClosed",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
