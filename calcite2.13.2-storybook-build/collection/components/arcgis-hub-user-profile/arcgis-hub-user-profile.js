import { Host, h } from '@stencil/core';
import intlManager from '../../utils/intl-manager';
import { checkPermission } from '@esri/hub-common';
import { getGlobalContext, } from '../../utils/state';
import { HubUserAvatar } from '../functional/hub-user-avatar';
import { HubNavigationUser } from '../functional/hub-navigation-user';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { getOverviewUrl, getWorkspaceHomeUrl, getProfileUrl } from '../../utils/urls';
export class ArcgisHubUserProfile {
  constructor() {
    this.handleDropdownClick = () => {
      this.hubTelemetry.emit({ telemetry: dictionary.category.interaction.action.open.label.menu.details.user });
    };
    this.handleLinkClick = (clickEvent) => {
      const href = clickEvent.target.href;
      this.arcgisHubUserProfileLinkClick.emit({ clickEvent, href });
    };
    this.handleViewProfileClick = (clickEvent) => {
      this.hubTelemetry.emit({ telemetry: dictionary.category.navigation.action.view.label.users.details.profile });
      this.handleLinkClick(clickEvent);
    };
    this.handleViewOverviewClick = (clickEvent) => {
      this.hubTelemetry.emit({ telemetry: dictionary.category.navigation.action.view.label.orgs.details.overview });
      this.handleLinkClick(clickEvent);
    };
    this.handleWorkspaceHomeClick = (clickEvent) => {
      this.hubTelemetry.emit({ telemetry: dictionary.category.navigation.action.view.label.users.details.workspace });
      this.handleLinkClick(clickEvent);
    };
    this.handleSignOut = () => {
      this.hubTelemetry.emit({ telemetry: dictionary.category.interaction.action.authenticate.label.signout });
      // signout is an application level concern
      // also consumers might want to take action after signing out
      // so we just raise  an event and let consumers handle it appropriately
      this.arcgisHubUserProfileSignout.emit();
    };
    this.variant = 'default';
  }
  get context() { return getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  get profileUrl() {
    return getProfileUrl(this.context);
  }
  get overviewUrl() {
    return getOverviewUrl(this.context);
  }
  get workspaceHomeUrl() {
    return getWorkspaceHomeUrl(this.context);
  }
  get useWorkspaceLink() {
    return checkPermission('hub:feature:workspace:user', this.context).access;
  }
  renderUserProfile() {
    return this.variant === 'minimal' ? h(HubUserAvatar, { context: this.context }) : h(HubNavigationUser, { context: this.context, slot: "user" });
  }
  renderMenu() {
    return (h("calcite-dropdown", null, h("button", { onClick: this.handleDropdownClick, slot: "trigger" }, this.renderUserProfile()), h("calcite-dropdown-group", { selectionMode: "none" }, h("calcite-dropdown-item", { href: this.profileUrl, onClick: this.handleViewProfileClick }, this.intl.t("viewProfile")), this.useWorkspaceLink
      ? h("calcite-dropdown-item", { href: this.workspaceHomeUrl, onClick: this.handleWorkspaceHomeClick }, this.intl.t("viewWorkspace"))
      : h("calcite-dropdown-item", { href: this.overviewUrl, onClick: this.handleViewOverviewClick }, this.intl.t("viewOverview")), h("slot", null), h("calcite-dropdown-item", { onClick: this.handleSignOut }, this.intl.t("signOut")))));
  }
  render() {
    var _a;
    return (h(Host, { "data-element": "user-profile" }, ((_a = this.context) === null || _a === void 0 ? void 0 : _a.isAuthenticated) && this.renderMenu()));
  }
  static get is() { return "arcgis-hub-user-profile"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-user-profile.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-user-profile.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'default' | 'minimal'",
          "resolved": "\"default\" | \"minimal\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "variant",
        "reflect": false,
        "defaultValue": "'default'"
      }
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubUserProfileSignout",
        "name": "arcgisHubUserProfileSignout",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
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
        "method": "arcgisHubUserProfileLinkClick",
        "name": "arcgisHubUserProfileLinkClick",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IWorkspaceLinkClicked",
          "resolved": "IWorkspaceLinkClicked",
          "references": {
            "IWorkspaceLinkClicked": {
              "location": "import",
              "path": "../../utils"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
}
