import { fetchHubEntity, fetchHubGroup, getProp } from '@esri/hub-common';
import { Host, h } from '@stencil/core';
import { bind } from '../../utils/context';
import { connectContext, getGlobalContext } from '../../utils/state';
import intlManager from '../../utils/intl-manager';
export class ArcgisHubFollowCard {
  constructor() {
    this.cardConfig = undefined;
    this.isEditingSite = false;
    this.followersGroup = undefined;
    this._context = getGlobalContext();
    bind(this, 'handleArcgisHubFollowActionChange', 'handleStartFollowCardPopoutAuth');
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    await this.cardConfigUpdated();
  }
  /**
   * Called when the card is updated
   */
  async cardConfigUpdated() {
    const { entityId, entityType } = this.cardConfig;
    if (entityId) {
      // update the followersGroup with the newly selected
      // entity's followers group
      try {
        this._entity = await fetchHubEntity(entityType, entityId, this._context);
        this.followersGroup = this._entity.followersGroupId && await fetchHubGroup(this._entity.followersGroupId, this._context.hubRequestOptions);
      }
      catch (e) {
        console.error(`Error fetching followers group: ${e}`);
      }
    }
  }
  /**
   * Whether the user has access to the entity's followers group
   */
  get hasGroupAccess() {
    return !!this.followersGroup && !!getProp(this.followersGroup, 'access');
  }
  get callToActionClass() {
    return `cta-align-${this.cardConfig.callToActionAlign}`;
  }
  handleArcgisHubFollowActionChange(event) {
    event.preventDefault();
    event.stopPropagation();
    this.arcgisHubFollowCardFollowChange.emit(event.detail);
  }
  handleStartFollowCardPopoutAuth(event) {
    event.preventDefault();
    event.stopPropagation();
    this.startFollowCardPopoutAuth.emit();
  }
  renderNotice() {
    return h("calcite-notice", { kind: "danger", open: true }, h("div", { slot: "message" }, this.intl.t("inaccessibleFollowerGroup")));
  }
  /**
   * The user won't have access to the group if any of these scenarios happens
   * 1. the item does not have a followers group
   * 2. the user does not have access to the item's followers group
   * 3. the item is inaccessible
   * if so, we will hide the card on the site or if the user is editing the site,
   * we will render a notice
   */
  render() {
    const { entityId, entityType, buttonText, unfollowButtonText, buttonStyle, buttonAlign } = this.cardConfig;
    return (h(Host, { "data-element": "follow-card" }, this.hasGroupAccess
      ? h("div", null, h("div", { class: `cta-text ${this.callToActionClass}` }, this.cardConfig.callToActionText), h("arcgis-hub-follow-action", { buttonAlign: buttonAlign, buttonStyle: buttonStyle, buttonText: buttonText, entityAccess: this._entity.access, entityId: entityId, entityType: entityType, followersGroup: this.followersGroup, onArcgisHubFollowActionChange: this.handleArcgisHubFollowActionChange, onStartFollowActionPopoutAuth: this.handleStartFollowCardPopoutAuth, unfollowButtonText: unfollowButtonText }))
      : this.isEditingSite && this.renderNotice()));
  }
  static get is() { return "arcgis-hub-follow-card"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-follow-card.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-follow-card.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "cardConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IFollowCardConfig",
          "resolved": "IFollowCardConfig",
          "references": {
            "IFollowCardConfig": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The follow card configuration"
        }
      },
      "isEditingSite": {
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
          "text": "Indicates whether the site is in edit mode."
        },
        "attribute": "is-editing-site",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "followersGroup": {},
      "_context": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubFollowCardFollowChange",
        "name": "arcgisHubFollowCardFollowChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event fired when the follow action in the card is toggled"
        },
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        }
      }, {
        "method": "startFollowCardPopoutAuth",
        "name": "startFollowCardPopoutAuth",
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
        "propName": "_context",
        "methodName": "cardConfigUpdated"
      }, {
        "propName": "cardConfig",
        "methodName": "cardConfigUpdated"
      }];
  }
}
