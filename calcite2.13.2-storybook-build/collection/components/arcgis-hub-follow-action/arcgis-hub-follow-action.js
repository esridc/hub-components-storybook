import { Host, h } from '@stencil/core';
import { bind } from '../../utils/context';
import { isUserFollowing, followEntity, unfollowEntity, checkPermission, getFamilyTypes } from '@esri/hub-common';
import { connectContext, getGlobalContext } from '../../utils/state';
import intlManager from '../../utils/intl-manager';
import { dictionary } from '@esri/telemetry-dictionary-hub';
export class ArcgisHubFollowAction {
  constructor() {
    /**
     * Whether it is an auth'ed or anonymous user that clicks follow
     */
    this._clicksFollowWithoutAuth = false;
    this.entityId = undefined;
    this.entityType = undefined;
    this.entityAccess = undefined;
    this.buttonText = undefined;
    this.unfollowButtonText = undefined;
    this.buttonStyle = 'solid';
    this.buttonAlign = 'center';
    this.followersGroup = undefined;
    this.isFollowing = undefined;
    this.showAlert = false;
    this.cannotUnfollow = undefined;
    this._context = getGlobalContext();
    bind(this, 'handleFollowToggle', 'handleAlertClose');
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  async componentWillLoad() {
    await this.fetchFollowStatus();
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Fetch the current user's follow status of the item
   */
  async fetchFollowStatus() {
    if (this._context.isAuthenticated) {
      this.isFollowing = this.entityId && await isUserFollowing(this.entityId, this._context.currentUser, this.entityType, this._context);
      this.setCannotUnfollow();
    }
  }
  /**
   * User cannot leave a followers group if they are
   * the owner of the group
   */
  setCannotUnfollow() {
    this.cannotUnfollow = checkPermission('hub:group:owner', this._context, this.followersGroup).access;
  }
  /**
   * This is triggered whenever the context changes, but we do not want to
   * toggle follow every time when context changes, instead, we only want to
   * toggle when an anonymous user clicks follow and successfully signs in
   */
  async toggleFollowWithContextChange() {
    if (this._clicksFollowWithoutAuth) {
      await this.fetchFollowStatus();
      await this.toggleFollow(true);
      this._clicksFollowWithoutAuth = false;
    }
  }
  get buttonClass() {
    return `btn-align-${this.buttonAlign}`;
  }
  /**
   * Calls when the follow/unfollow button is clicked
   * @param onSignIn whether the button is clicked when user is unauth'ed
   */
  async toggleFollow(onSignIn = false) {
    const toggleFollowFunc = this.isFollowing ? unfollowEntity : followEntity;
    // If the user is already following the item and signing in, we don't want
    // them to unfollow the item. So we only want to call the follow/unfollow
    // fn when the user is not signing in OR when user is signing in but they
    // are not currently following the item
    if (!onSignIn || onSignIn && !this.isFollowing) {
      try {
        await toggleFollowFunc(this.entityId, this._context.currentUser, this.entityType, this._context);
        this.arcgisHubFollowActionChange.emit(!this.isFollowing);
        this.logTelemetry(!this.isFollowing, 'Success');
        // refresh the user so the groups list gets updated
        await this._context.refreshUser();
        await this.fetchFollowStatus();
      }
      catch (error) {
        this.showAlert = true;
        this.logTelemetry(!this.isFollowing, 'Failure');
      }
    }
  }
  /**
   * If the user is auth'ed, we will toggle follow, otherwise, we will
   * show the sign in window, _clicksFollowWithoutAuth indicates whether
   * the user is unauth'ed when they clicks the follow button
   */
  async handleFollowToggle() {
    if (this._context.isAuthenticated) {
      await this.toggleFollow();
    }
    else {
      this.startFollowActionPopoutAuth.emit();
      this._clicksFollowWithoutAuth = true;
    }
  }
  logTelemetry(isFollowing, response) {
    var _a, _b, _c;
    const action = isFollowing
      ? dictionary.category.groups.action.join.label.members
      : dictionary.category.groups.action.leave.label.members;
    this.hubTelemetry.emit(Object.assign(Object.assign({}, action), { access: this.entityAccess, groupType: 'Followers', id: this.entityId, type: getFamilyTypes(this.entityType)[0], groupId: (_a = this.followersGroup) === null || _a === void 0 ? void 0 : _a.id, groupOrg: (_b = this.followersGroup) === null || _b === void 0 ? void 0 : _b.orgId, groupAccess: (_c = this.followersGroup) === null || _c === void 0 ? void 0 : _c.access, response: response }));
  }
  handleAlertClose() {
    this.showAlert = false;
  }
  renderButton() {
    const button = (h("div", { class: this.buttonClass }, h("calcite-button", { appearance: this.buttonStyle, disabled: this.cannotUnfollow, "icon-start": this.isFollowing ? 'rss-f' : 'rss', onClick: this.handleFollowToggle }, this.isFollowing ? this.unfollowButtonText : this.buttonText)));
    return this.cannotUnfollow
      ? h("arcgis-ref-tooltip", { placement: "top", text: this.intl.t("cannotLeaveGroup") }, button)
      : button;
  }
  renderAlert() {
    return h("arcgis-wormhole", null, h("calcite-alert", { autoClose: true, autoCloseDuration: "fast", icon: true, kind: 'danger', label: this.intl.t('alertMessage'), onCalciteAlertClose: this.handleAlertClose, open: this.showAlert, placement: "top-end" }, h("div", { slot: "title" }, this.intl.t('alertTitle')), h("div", { slot: "message" }, this.intl.t('alertMessage'))));
  }
  render() {
    return (h(Host, { "data-element": "follow-action" }, h("div", null, this.renderButton(), this.renderAlert())));
  }
  static get is() { return "arcgis-hub-follow-action"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-follow-action.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-follow-action.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "entityId": {
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
          "text": "Id of entity to follow"
        },
        "attribute": "entity-id",
        "reflect": false
      },
      "entityType": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "HubEntityType",
          "resolved": "\"content\" | \"discussion\" | \"event\" | \"group\" | \"initiative\" | \"initiativeTemplate\" | \"org\" | \"page\" | \"project\" | \"site\" | \"survey\" | \"template\" | \"user\"",
          "references": {
            "HubEntityType": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Entity type"
        },
        "attribute": "entity-type",
        "reflect": false
      },
      "entityAccess": {
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
          "text": "Entity access"
        },
        "attribute": "entity-access",
        "reflect": false
      },
      "buttonText": {
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
          "text": "Follow button text"
        },
        "attribute": "button-text",
        "reflect": false
      },
      "unfollowButtonText": {
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
          "text": "Unfollow button text"
        },
        "attribute": "unfollow-button-text",
        "reflect": false
      },
      "buttonStyle": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'solid' | 'outline-fill'",
          "resolved": "\"outline-fill\" | \"solid\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Follow/unfollow button button style"
        },
        "attribute": "button-style",
        "reflect": false,
        "defaultValue": "'solid'"
      },
      "buttonAlign": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'center' | 'start' | 'end'",
          "resolved": "\"center\" | \"end\" | \"start\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Follow/unfollow button button alignment"
        },
        "attribute": "button-align",
        "reflect": false,
        "defaultValue": "'center'"
      },
      "followersGroup": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubGroup",
          "resolved": "IHubGroup",
          "references": {
            "IHubGroup": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The followed entity's followers group"
        }
      }
    };
  }
  static get states() {
    return {
      "isFollowing": {},
      "showAlert": {},
      "cannotUnfollow": {},
      "_context": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubFollowActionChange",
        "name": "arcgisHubFollowActionChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event fired when the follow action is toggled"
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
          "original": "Record<string, any>",
          "resolved": "{ [x: string]: any; }",
          "references": {
            "Record": {
              "location": "global"
            }
          }
        }
      }, {
        "method": "startFollowActionPopoutAuth",
        "name": "startFollowActionPopoutAuth",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event fired when an anonymous user clicks the follow button"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "entityId",
        "methodName": "fetchFollowStatus"
      }, {
        "propName": "entityType",
        "methodName": "fetchFollowStatus"
      }, {
        "propName": "_context",
        "methodName": "fetchFollowStatus"
      }, {
        "propName": "_context",
        "methodName": "toggleFollowWithContextChange"
      }];
  }
}
