import { h, Host } from '@stencil/core';
import { UserSession } from '@esri/arcgis-rest-auth';
import { getItemResource } from '@esri/arcgis-rest-portal';
import intlManager from '../../utils/intl-manager';
export class ArcgisNotebook {
  constructor() {
    this.itemId = undefined;
    this.token = undefined;
    this.portalUrl = 'https://www.arcgis.com/sharing/rest';
    this.notebookTitle = undefined;
    this.allowScripts = false;
    this.notebookPreview = undefined;
    this.authentication = undefined;
    this.isLoading = true;
    this.error = undefined;
  }
  onItemIdChanged() {
    this.fetchPreview();
  }
  onTokenChanged() {
    this.fetchPreview();
  }
  onPortalUrlChanged() {
    this.fetchPreview();
  }
  onPreviewChanged(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.updateIframe();
    }
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.el);
    return this.fetchPreview();
  }
  componentShouldUpdate(_newVal, _oldVal, propName) {
    // NOTE: we render an iframe and we use the dom api to write stuff into it
    // thus, we don't want to re-render if the prop that changed was portalUrl, itemId, token, or notebookPreview
    // because in the case of portalUrl, itemId, and token, what we want to do is fetch the preview
    // and in the case of notebookPreview we want to use the dom api to write the preview into the iframe
    const noUpdateProps = ['portalUrl', 'itemId', 'token', 'notebookPreview'];
    return !noUpdateProps.includes(propName);
  }
  get requestOpts() {
    const authentication = new UserSession({
      portal: this.portalUrl,
      token: this.token,
    });
    return {
      fileName: 'notebook_preview.json',
      readAs: 'json',
      authentication,
      httpMethod: 'GET'
    };
  }
  get sandboxSettings() {
    // this is not State because we don't expect it to change
    const result = ['allow-same-origin'];
    if (this.allowScripts) {
      result.push("allow-scripts");
    }
    return result.join(' ');
  }
  reset() {
    this.notebookPreview = '';
    this.isLoading = true;
    this.error = null;
  }
  updateIframe() {
    var _a;
    const doc = (_a = this.iFrameEl) === null || _a === void 0 ? void 0 : _a.contentWindow.document;
    if (doc) {
      doc.write(this.notebookPreview); // when you call write, open is automatically called
      doc.close();
    }
  }
  fetchPreview() {
    this.reset();
    const opts = this.requestOpts;
    getItemResource(this.itemId, opts)
      .then(obj => {
      this.notebookPreview = obj.html;
    }).catch((e) => {
      this.error = this.intl.t('messageFetchError');
      this.arcGisNotebookError.emit(`Error in arcgis-notebook fetchPreview: ${e.message}`);
    })
      .finally(() => {
      this.isLoading = false;
    });
  }
  setIframeEl(el) {
    this.iFrameEl = el;
  }
  render() {
    return (h(Host, null, h("calcite-notice", { dir: "ltr", kind: "danger", open: !!this.error, scale: "m", width: "half" }, h("div", { slot: "title" }, this.error)), h("calcite-loader", { hidden: !this.isLoading, label: this.intl.t('labelLoading') }), h("iframe", { ref: this.setIframeEl.bind(this), sandbox: this.sandboxSettings, title: this.notebookTitle })));
  }
  static get is() { return "arcgis-notebook"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-notebook.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-notebook.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "itemId": {
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
          "tags": [{
              "name": "type",
              "text": "{string}"
            }, {
              "name": "memberof",
              "text": "HubArcgisNotebook"
            }],
          "text": "The item id of the notebook preview to render"
        },
        "attribute": "item-id",
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
          "tags": [{
              "name": "type",
              "text": "{string}"
            }, {
              "name": "memberof",
              "text": "HubArcgisNotebook"
            }],
          "text": "The authentication token"
        },
        "attribute": "token",
        "reflect": false
      },
      "portalUrl": {
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
          "tags": [{
              "name": "type",
              "text": "{string}"
            }, {
              "name": "memberof",
              "text": "HubArcgisNotebook"
            }],
          "text": "The portal rest api url"
        },
        "attribute": "portal-url",
        "reflect": false,
        "defaultValue": "'https://www.arcgis.com/sharing/rest'"
      },
      "notebookTitle": {
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
          "tags": [{
              "name": "type",
              "text": "{string}"
            }, {
              "name": "memberof",
              "text": "HubArcgisNotebook"
            }],
          "text": "A title for the notebook, applied to the iframe title attribute"
        },
        "attribute": "notebook-title",
        "reflect": false
      },
      "allowScripts": {
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
          "tags": [{
              "name": "type",
              "text": "{boolean}"
            }, {
              "name": "memberof",
              "text": "HubArcgisNotebook"
            }],
          "text": "Indicates whether the iframe is allowed to run scripts"
        },
        "attribute": "allow-scripts",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "notebookPreview": {},
      "authentication": {},
      "isLoading": {},
      "error": {}
    };
  }
  static get events() {
    return [{
        "method": "arcGisNotebookError",
        "name": "arcGisNotebookError",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{EventEmitter<string>}"
            }, {
              "name": "memberof",
              "text": "HubArcgisNotebook"
            }],
          "text": "Error event emitted when the component is unable to fetch the notebook preview"
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "itemId",
        "methodName": "onItemIdChanged"
      }, {
        "propName": "token",
        "methodName": "onTokenChanged"
      }, {
        "propName": "portalUrl",
        "methodName": "onPortalUrlChanged"
      }, {
        "propName": "notebookPreview",
        "methodName": "onPreviewChanged"
      }];
  }
}
