import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { U as UserSession } from './UserSession-2c05f7b6.js';
import { e as getItemResource } from './get-f0caeb52.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './request-fa80ae40.js';
import './clean-url-dff2b6ee.js';
import './tslib.es6-7023f322.js';
import './get-portal-url-b1c49fc5.js';
import './append-custom-params-4bd856e5.js';

const arcgisNotebookCss = ":host{display:block;height:100%;width:100%}iframe{height:100%;width:100%;border-style:none}calcite-notice[active],calcite-loader[active]{margin-top:1rem}";

const ArcgisNotebook = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcGisNotebookError = createEvent(this, "arcGisNotebookError", 7);
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
  static get assetsDirs() { return ["locales"]; }
  get el() { return getElement(this); }
  static get watchers() { return {
    "itemId": ["onItemIdChanged"],
    "token": ["onTokenChanged"],
    "portalUrl": ["onPortalUrlChanged"],
    "notebookPreview": ["onPreviewChanged"]
  }; }
};
ArcgisNotebook.style = arcgisNotebookCss;

export { ArcgisNotebook as arcgis_notebook };
