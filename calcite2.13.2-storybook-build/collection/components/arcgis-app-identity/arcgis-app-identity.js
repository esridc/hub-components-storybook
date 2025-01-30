import { h, Host } from '@stencil/core';
import { UserSession } from "@esri/arcgis-rest-auth";
import { ArcGISContextManager } from '@esri/hub-common';
import { storeContextManager, retrieveContextManager } from '../../utils/context-manager';
import { getGlobalContext, setGlobalContext } from '../../utils/state';
const contextManagerUpdated = (updated, persist) => {
  setGlobalContext(updated.context);
  if (persist) {
    storeContextManager(updated);
  }
};
export class ArcgisAppIdentity {
  constructor() {
    this.clientId = undefined;
    this.redirectUri = undefined;
    this.popup = true;
    this.persist = true;
    this.features = undefined;
    this.flags = {};
    this.portal = "https://www.arcgis.com";
    this.mode = 'html';
    this.contextManager = undefined;
  }
  async portalUpdated() {
    this.contextManager = await ArcGISContextManager.create({ portalUrl: this.portal, featureFlags: this.flags });
    contextManagerUpdated(this.contextManager, this.persist);
  }
  /**
   * Sharing API base url
   */
  get sharingApiUrl() {
    return `${this.portal}/sharing/rest`;
  }
  async onSignInHandler(event) {
    console.info(`app-identity: Caught start signin event. Using ${this.portal}, ${this.clientId}`, event);
    const session = await UserSession.beginOAuth2({ clientId: this.clientId, redirectUri: this.redirectUri, portal: this.sharingApiUrl });
    this.contextManager = await ArcGISContextManager.create({ portalUrl: this.portal, authentication: session, featureFlags: this.flags });
    contextManagerUpdated(this.contextManager, this.persist);
    console.info(`app-identity: sign-in complete: emitting ArcGISContext ${this.contextManager.id}`);
    this.signInCompleted.emit(this.contextManager.context);
  }
  async onSignOutHandler() {
    console.info(`app-identity: sign-out for ${this.contextManager.id}`);
    this.contextManager.clearAuthentication();
    contextManagerUpdated(this.contextManager, this.persist);
    console.info(`app-identity: sign-out complete. ${this.contextManager.id} isAuthenticated? ${this.contextManager.context.isAuthenticated}`);
    this.signOutCompleted.emit(this.contextManager.context);
  }
  componentWillLoad() {
    console.info(`app-identity: componentWillLoad`);
    // Only create internal ArcGISContext if in html mode
    if (this.mode === 'html' && !this.contextManager) {
      console.info(`app-identity: creating ArcGISContext based on attrs...`);
      this._initContextManager();
      console.info(`app-identity: created.`);
    }
  }
  componentWillRender() {
    var _a;
    console.info(`app-identity: componentWillRender`);
    const context = (_a = this.contextManager) === null || _a === void 0 ? void 0 : _a.context;
    if ((context === null || context === void 0 ? void 0 : context.isAuthenticated) && this.mode === 'html') {
      // Only raise this event if this is in html mode
      console.info(`app-identity: rendered, emitting signInCompleted w ArcGISContext`);
      this.signInCompleted.emit(context);
    }
  }
  componentDidRender() {
    var _a;
    console.info(`app-identity: componentDidRender`);
    const context = (_a = this.contextManager) === null || _a === void 0 ? void 0 : _a.context;
    if ((context === null || context === void 0 ? void 0 : context.isAuthenticated) && this.mode === 'html') {
      // Only raise this event if this is in html mode
      console.info(`app-identity: rendered, emitting signInCompleted w ArcGISContext`);
      this.signInCompleted.emit(context);
    }
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
  async _initContextManager() {
    // this.contextManager = await initContextManager(this.portal, this.persist)
    const context = getGlobalContext();
    // TODO: add a static fromContext() method to get a new manager from a context
    const fromState = context && await ArcGISContextManager.create({
      authentication: context.session,
      portalUrl: context.portalUrl,
      portal: context.portal,
      currentUser: context.currentUser,
      trustedOrgs: context.trustedOrgs,
      trustedOrgIds: context.trustedOrgIds,
      featureFlags: context.featureFlags,
      // logLevel: context.???,
      properties: context.properties,
      serviceStatus: context.serviceStatus
    });
    const existing = fromState || (this.persist
      ? await retrieveContextManager()
      : undefined);
    this.contextManager = existing || await ArcGISContextManager.create({
      portalUrl: this.portal
    });
    contextManagerUpdated(this.contextManager, this.persist);
  }
  static get is() { return "arcgis-app-identity"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-app-identity.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-app-identity.css"]
    };
  }
  static get properties() {
    return {
      "clientId": {
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
          "text": "oAuth ClientId"
        },
        "attribute": "client-id",
        "reflect": false
      },
      "redirectUri": {
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
          "text": "Redirect Uri associated with the clientid"
        },
        "attribute": "redirect-uri",
        "reflect": false
      },
      "popup": {
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
          "text": "Use popup or redirect based oauth\nNOTE: only popup is currently supported"
        },
        "attribute": "popup",
        "reflect": false,
        "defaultValue": "true"
      },
      "persist": {
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
          "text": "Should the identity be persisted in localStorage"
        },
        "attribute": "persist",
        "reflect": false,
        "defaultValue": "true"
      },
      "features": {
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
          "text": "Popup window features\ni.e. `height=400,width=600,menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes`"
        },
        "attribute": "features",
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
          "text": "Portal to authenticate against\ndefaults to https://www.arcgis.com"
        },
        "attribute": "portal",
        "reflect": false,
        "defaultValue": "\"https://www.arcgis.com\""
      },
      "mode": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'html' | 'app'",
          "resolved": "\"app\" | \"html\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If a host application will be providing\nan ArcGISContext instance, set mode to 'app'\notherwise leave as the default 'html'\nin which case this will create it's own\nArcGISContext instance and will check localStorage\nwhen it starts up"
        },
        "attribute": "mode",
        "reflect": false,
        "defaultValue": "'html'"
      },
      "contextManager": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "ArcGISContextManager",
          "resolved": "ArcGISContextManager",
          "references": {
            "ArcGISContextManager": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Container for settings and session\nThis is mutable because when in `html` mode,\nthe component will re-hydrate a session from\nlocalStorage, and then assign it to `.context`"
        }
      }
    };
  }
  static get events() {
    return [{
        "method": "signInCompleted",
        "name": "arcgisAppIdentitySignedIn",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IArcGISContext",
          "resolved": "IArcGISContext",
          "references": {
            "IArcGISContext": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }, {
        "method": "signOutCompleted",
        "name": "arcgisAppIdentitySignedOut",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IArcGISContext",
          "resolved": "IArcGISContext",
          "references": {
            "IArcGISContext": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }];
  }
  static get watchers() {
    return [{
        "propName": "portal",
        "methodName": "portalUpdated"
      }];
  }
  static get listeners() {
    return [{
        "name": "arcgisAppIdentityStartSignIn",
        "method": "onSignInHandler",
        "target": "document",
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisAppIdentityStartSignOut",
        "method": "onSignOutHandler",
        "target": "document",
        "capture": false,
        "passive": false
      }];
  }
}
