import { Host, h, getAssetPath } from '@stencil/core';
import { getUserThumbnailUrl } from '@esri/hub-common';
import intlManager from '../../../../utils/intl-manager';
import { SharingAccess } from '@esri/hub-discussions';
import { bind } from '../../../../utils/context';
import { getChannelName } from '../../utils/discussions';
import { getGlobalContext } from '../../../../utils/state';
/** @internal */
export class ArcgisHubDiscussionsPostHeader {
  constructor() {
    this.postId = undefined;
    this.post = undefined;
    this.parent = undefined;
    this.postCreator = undefined;
    this.parentCreator = undefined;
    this.postCreatorOrg = undefined;
    this.channel = undefined;
    this.channelGroups = undefined;
    this.index = undefined;
    this.isHub = undefined;
    this.showCreatorAvatar = undefined;
    this.showCreatorUsername = undefined;
    this.showChannelAvatar = undefined;
    this.showPopover = undefined;
    this.showChannelName = undefined;
    this.showTimestamp = undefined;
    this.showChannelAccessIcon = undefined;
    this.showReplyingTo = undefined;
    this.showViewPostAction = undefined;
    this.displayAnon = undefined;
    this.iconScale = 'm';
    this.metadataOrientation = 'block';
    bind(this, 'handleViewPostClicked');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  get _context() {
    return getGlobalContext();
  }
  get creator() {
    const { _context, post, postCreator, displayAnon } = this;
    if (post) {
      return postCreator;
    }
    else {
      return displayAnon ? null : _context.currentUser;
    }
  }
  get creatorFullName() {
    const { intl, post, creator } = this;
    let fullName = intl.t('anonymous');
    if (creator || (post === null || post === void 0 ? void 0 : post.creator)) {
      fullName = (creator === null || creator === void 0 ? void 0 : creator.fullName) || intl.t('privateUser');
    }
    return fullName;
  }
  get accessIcon() {
    const { intl, channel } = this;
    let icon;
    let label;
    if (channel.access === SharingAccess.PRIVATE) {
      icon = 'lock';
      label = intl.t('visiblePrivate');
    }
    else if (channel.access === SharingAccess.ORG) {
      icon = 'organization';
      label = intl.t('visibleOrg');
    }
    else {
      icon = 'globe';
      label = intl.t('visibleAll');
    }
    return { icon, label };
  }
  handleViewPostClicked() {
    this.arcgisHubDiscussionsPostSelect.emit();
  }
  renderAccessIcon() {
    const { accessIcon, showChannelAccessIcon } = this;
    if (showChannelAccessIcon) {
      return h("calcite-icon", { class: "access-icon", icon: accessIcon.icon, scale: "s", "text-label": accessIcon.label });
    }
  }
  renderPopover(avatars) {
    const { post, showPopover, postCreator, postCreatorOrg, channel, index, isHub, parent, parentCreator } = this;
    return post && showPopover ? (h("arcgis-hub-discussions-popover", { channel: channel, channelGroups: this.channelGroups, index: index, isHub: isHub, parent: parent, parentCreator: parentCreator, post: post, postCreator: postCreator, postCreatorOrg: postCreatorOrg }, avatars)) : (avatars);
  }
  renderAvatars() {
    const avatars = [this.renderCreatorAvatar(), this.renderChannelAvatar()].filter(Boolean);
    if (avatars.length) {
      const avatarContainer = h("div", { class: "avatars" }, avatars);
      return this.renderPopover(avatarContainer);
    }
  }
  renderCreatorAvatar() {
    var _a;
    const { post, creator, _context, showCreatorAvatar, iconScale, intl } = this;
    if (showCreatorAvatar) {
      const user = !creator && post ? { username: post === null || post === void 0 ? void 0 : post.creator } : creator;
      return (user === null || user === void 0 ? void 0 : user.username) ? (h("calcite-avatar", { "full-name": user === null || user === void 0 ? void 0 : user.fullName, scale: iconScale, thumbnail: (user === null || user === void 0 ? void 0 : user.thumbnail) && getUserThumbnailUrl(_context.hubRequestOptions.portal, user, (_a = _context.hubRequestOptions.authentication) === null || _a === void 0 ? void 0 : _a.token), "user-id": user === null || user === void 0 ? void 0 : user.id, username: user === null || user === void 0 ? void 0 : user.username })) : (h("calcite-avatar", { "full-name": intl.t('anonymous'), scale: iconScale, thumbnail: getAssetPath('./assets/no-user-thumb.jpeg') }));
    }
  }
  renderChannelAvatar() {
    const { channel, channelGroups, showChannelAvatar, iconScale, showCreatorAvatar, intl } = this;
    if (showChannelAvatar) {
      let scale;
      if (showCreatorAvatar) {
        if (iconScale === 'l') {
          scale = 'm';
        }
        else if (iconScale === 'm') {
          scale = 's';
        }
      }
      else {
        scale = iconScale;
      }
      if (scale) {
        return h("calcite-avatar", { "full-name": getChannelName(channel, channelGroups, intl.t('unnamedChannel')), scale: scale });
      }
    }
  }
  renderPostTimestamp() {
    const { showTimestamp, post } = this;
    if (showTimestamp && post) {
      return h("arcgis-relative-date", { dateTime: post.createdAt, formatStyle: "short" });
    }
  }
  renderHeader() {
    return h("header", null, this.creatorFullName);
  }
  renderChannelName() {
    const { showChannelName, channel, channelGroups, intl } = this;
    if (showChannelName) {
      return h("span", { class: "channel-name" }, getChannelName(channel, channelGroups, intl.t('unnamedChannel')));
    }
  }
  renderCreatorUsername() {
    const { post, showCreatorUsername } = this;
    if (showCreatorUsername && (post === null || post === void 0 ? void 0 : post.creator)) {
      return h("span", { class: "post-creator-username" }, post.creator);
    }
  }
  renderReplyingTo() {
    const { showReplyingTo, parentCreator, intl } = this;
    if (showReplyingTo && parentCreator) {
      return h("span", { class: "replying-to" }, h("calcite-icon", { icon: "right", scale: "s" }), intl.t('replyingTo', { fullName: parentCreator.fullName }));
    }
  }
  renderViewPostAction() {
    const { showViewPostAction, intl } = this;
    if (showViewPostAction) {
      return h("calcite-link", { onClick: this.handleViewPostClicked }, intl.t('viewPost'));
    }
  }
  get isMetadataInline() {
    return this.metadataOrientation === 'inline';
  }
  renderMetadata() {
    const children = [this.renderCreatorUsername(), this.renderChannelName(), this.renderReplyingTo(), this.renderViewPostAction(), this.renderPostTimestamp(), this.renderAccessIcon()].filter(Boolean).reduce((acc, child, idx) => this.isMetadataInline || idx > 0
      ? [
        ...acc,
        h("span", { class: "metadata-separator", key: `separator:${idx}` }, "\u00B7"),
        child,
      ]
      : [...acc, child], []);
    if (children.length) {
      return h("div", { class: { metadata: true, inline: this.isMetadataInline } }, children);
    }
  }
  render() {
    return (h(Host, null, h("address", null, this.renderAvatars(), this.renderHeader(), this.renderMetadata())));
  }
  static get is() { return "arcgis-hub-discussions-post-header"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-discussions-post-header.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-discussions-post-header.css"]
    };
  }
  static get assetsDirs() { return ["locales", "assets"]; }
  static get properties() {
    return {
      "postId": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The post ID"
        },
        "attribute": "post-id",
        "reflect": true
      },
      "post": {
        "type": "unknown",
        "mutable": true,
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
          "text": "The post record"
        }
      },
      "parent": {
        "type": "unknown",
        "mutable": true,
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
          "text": "A parent post record"
        }
      },
      "postCreator": {
        "type": "unknown",
        "mutable": true,
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
          "text": "The post creator"
        }
      },
      "parentCreator": {
        "type": "unknown",
        "mutable": true,
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
          "text": "The post creator"
        }
      },
      "postCreatorOrg": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "IPortal",
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
          "text": "The post creator org"
        }
      },
      "channel": {
        "type": "unknown",
        "mutable": true,
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
          "text": "The channel"
        }
      },
      "channelGroups": {
        "type": "unknown",
        "mutable": true,
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
          "text": "The channel groups"
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
      },
      "showCreatorAvatar": {
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
          "text": "Renders the creator avatar"
        },
        "attribute": "show-creator-avatar",
        "reflect": false
      },
      "showCreatorUsername": {
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
          "text": "Renders the creator username"
        },
        "attribute": "show-creator-username",
        "reflect": false
      },
      "showChannelAvatar": {
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
          "text": "Renders the channel avatar"
        },
        "attribute": "show-channel-avatar",
        "reflect": false
      },
      "showPopover": {
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
          "text": "Renders the avatar popover"
        },
        "attribute": "show-popover",
        "reflect": false
      },
      "showChannelName": {
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
          "text": "Renders the channel group name"
        },
        "attribute": "show-channel-name",
        "reflect": false
      },
      "showTimestamp": {
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
          "text": "Renders the post timestamp"
        },
        "attribute": "show-timestamp",
        "reflect": false
      },
      "showChannelAccessIcon": {
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
          "text": "Renders the channel access icon"
        },
        "attribute": "show-channel-access-icon",
        "reflect": false
      },
      "showReplyingTo": {
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
          "text": "Renders the replying to text"
        },
        "attribute": "show-replying-to",
        "reflect": false
      },
      "showViewPostAction": {
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
          "text": "Renders the view post action"
        },
        "attribute": "show-view-post-action",
        "reflect": false
      },
      "displayAnon": {
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
          "text": "Display the current user anonymously (if not already anonymous)"
        },
        "attribute": "display-anon",
        "reflect": false
      },
      "iconScale": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'l' | 'm' | 's'",
          "resolved": "\"l\" | \"m\" | \"s\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The scale of the creator or channel avatar. Only `l` and `m` are supported\nwhen both avatars are rendered, and will be applied the creator avatar."
        },
        "attribute": "icon-scale",
        "reflect": false,
        "defaultValue": "'m'"
      },
      "metadataOrientation": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'block' | 'inline'",
          "resolved": "\"block\" | \"inline\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Whether the metadata (creator username, channel group name, post timestamp & channel access icon) display\ninline or on their own line from the post creator name"
        },
        "attribute": "metadata-orientation",
        "reflect": false,
        "defaultValue": "'block'"
      }
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubDiscussionsPostSelect",
        "name": "arcgisHubDiscussionsPostSelect",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when view post action is clicked"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
}
