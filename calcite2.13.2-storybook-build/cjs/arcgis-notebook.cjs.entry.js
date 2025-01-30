'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const UserSession = require('./UserSession-f8bc10c8.js');
const get = require('./get-0368c931.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./request-67da3c71.js');
require('./clean-url-1dfecac0.js');
require('./tslib.es6-e7faa7f3.js');
require('./get-portal-url-44f2448f.js');
require('./append-custom-params-0f5d0fe2.js');

const arcgisNotebookCss = ":host{display:block;height:100%;width:100%}iframe{height:100%;width:100%;border-style:none}calcite-notice[active],calcite-loader[active]{margin-top:1rem}";

const ArcgisNotebook = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcGisNotebookError = index.createEvent(this, "arcGisNotebookError", 7);
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
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.el);
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
    const authentication = new UserSession.UserSession({
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
    get.getItemResource(this.itemId, opts)
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
    return (index.h(index.Host, null, index.h("calcite-notice", { dir: "ltr", kind: "danger", open: !!this.error, scale: "m", width: "half" }, index.h("div", { slot: "title" }, this.error)), index.h("calcite-loader", { hidden: !this.isLoading, label: this.intl.t('labelLoading') }), index.h("iframe", { ref: this.setIframeEl.bind(this), sandbox: this.sandboxSettings, title: this.notebookTitle })));
  }
  static get assetsDirs() { return ["locales"]; }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "itemId": ["onItemIdChanged"],
    "token": ["onTokenChanged"],
    "portalUrl": ["onPortalUrlChanged"],
    "notebookPreview": ["onPreviewChanged"]
  }; }
};
ArcgisNotebook.style = arcgisNotebookCss;

exports.arcgis_notebook = ArcgisNotebook;
