import { getUserThumbnailUrl } from '@esri/hub-common';
import { Host, h } from '@stencil/core';
import { getGlobalContext } from '../../utils/state';
const getContextEnvironment = context => {
  const contextEnv = context === null || context === void 0 ? void 0 : context.environment;
  return contextEnv
    ? contextEnv === 'production'
      ? 'prod'
      : contextEnv.replace('ext', '')
    : undefined;
};
const ENVIRONMENTS = {
  qa: {
    // itemId: '2bc7844793a84037a9cf8e8f93187971',
    clientId: 'Lmafo8GvkSnPwbek',
    portal: 'https://qaext.arcgis.com'
  },
  dev: {
    // itemId: '2157ac058755404c8512fe415b9e8fad',
    clientId: '7zaXMmruGTX0FMzR',
    portal: 'https://devext.arcgis.com'
  },
  prod: {
    // itemId: 'cc9ee3398ec844b18319746b56f563ab',
    clientId: 'bHypqtyn5UaaJ1Zt',
    portal: 'https://www.arcgis.com'
  }
};
const DEFAULT_ENVIRONMENT = 'qa';
/*
  This component is intended for use only in our html harnesses.
*/
export class HarnessHeader {
  constructor() {
    this.onChangeEnv = (evt) => {
      // NOTE: this updates the portal we pass into arcgis-app-identity
      // which in turn updates the global context
      this.environment = evt.target.value;
    };
    this.pageTitle = undefined;
    this.environment = undefined;
    this.flags = {};
  }
  get _context() { return getGlobalContext(); }
  componentWillLoad() {
    // if environment is not passed in, assume the default
    if (!this.environment) {
      this.environment = DEFAULT_ENVIRONMENT;
      // if we also have context, use that to determine the environment
      if (this._context) {
        this.environment = getContextEnvironment(this._context) || DEFAULT_ENVIRONMENT;
      }
    }
  }
  get identityConfig() {
    return Object.assign({ flags: this.flags }, ENVIRONMENTS[this.environment]);
  }
  get isGhPages() {
    return (window.location.pathname.includes('/harnesses'));
  }
  get redirectUri() {
    const result = new URL(window.location.origin);
    result.pathname = '/html/redirect.html';
    if (this.isGhPages) {
      result.pathname = '/harnesses/html/redirect.html';
    }
    return result.toString();
  }
  get logoUri() {
    return `${this.homeUri}build/assets/ArcGIS_Hub_Hexagon_256.png`;
  }
  get homeUri() {
    let result = '/';
    if (this.isGhPages) {
      result = '/harnesses/';
    }
    return result;
  }
  signIn() {
    const evt = new CustomEvent('arcgisAppIdentityStartSignIn');
    document.dispatchEvent(evt);
  }
  signOut() {
    const evt = new CustomEvent('arcgisAppIdentityStartSignOut');
    document.dispatchEvent(evt);
  }
  onSignedIn(evt) {
    var _a;
    const context = evt.detail;
    if (context.session.clientId !== ((_a = this.identityConfig) === null || _a === void 0 ? void 0 : _a.clientId)) {
      // there was auth stuff in localstorage but it does not match the requested environment so we will log out
      evt.stopPropagation();
      const signOutEvt = new CustomEvent('arcgisAppIdentityStartSignOut');
      document.dispatchEvent(signOutEvt);
    }
  }
  renderAuth() {
    var _a, _b;
    const currentUser = (_a = this._context) === null || _a === void 0 ? void 0 : _a.currentUser;
    const session = (_b = this._context) === null || _b === void 0 ? void 0 : _b.session;
    const results = [];
    results.push(h("calcite-chip-group", { label: "environment", "selection-mode": "single", slot: "content-end" }, Object.keys(ENVIRONMENTS).map(env => {
      return h("calcite-chip", { key: env, onCalciteChipSelect: this.onChangeEnv, selected: env === this.environment, value: env }, env);
    })));
    if (currentUser) {
      results.push(h("calcite-navigation-user", { "full-name": currentUser.fullName, slot: "user", thumbnail: currentUser.thumbnail && getUserThumbnailUrl(session.portal, currentUser, session.token), "user-id": currentUser.id, username: currentUser.username }));
      results.push(h("calcite-action", { onClick: this.signOut, scale: "l", slot: "user", text: "Sign Out", "text-enabled": true }));
    }
    else {
      results.push(h("calcite-action", { onClick: this.signIn, scale: "l", slot: "user", text: "Sign In", "text-enabled": true }));
    }
    return results;
  }
  render() {
    return (h(Host, null, h("arcgis-hub-notice-provider", null), h("calcite-navigation", { slot: "header" }, h("calcite-navigation-logo", { heading: "Home", href: this.homeUri, slot: "navigation-action", thumbnail: this.logoUri }), h("calcite-navigation-logo", { heading: this.pageTitle, slot: "logo" }), this.renderAuth()), h("arcgis-app-identity", Object.assign({}, this.identityConfig, { "redirect-uri": this.redirectUri }))));
  }
  static get is() { return "harness-header"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["harness-header.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["harness-header.css"]
    };
  }
  static get properties() {
    return {
      "pageTitle": {
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
          "text": ""
        },
        "attribute": "page-title",
        "reflect": false
      },
      "environment": {
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
          "text": ""
        },
        "attribute": "environment",
        "reflect": false
      },
      "flags": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IFeatureFlags",
          "resolved": "IFeatureFlags",
          "references": {
            "IFeatureFlags": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Set of feature flags to enable"
        },
        "defaultValue": "{}"
      }
    };
  }
  static get listeners() {
    return [{
        "name": "arcgisAppIdentitySignedIn",
        "method": "onSignedIn",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
