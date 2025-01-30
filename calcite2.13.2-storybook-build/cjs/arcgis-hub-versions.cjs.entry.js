'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const context = require('./context-0167a31e.js');
const clipboard = require('./clipboard-e854350e.js');
const get = require('./get-0368c931.js');
const updateVersionMetadata = require('./updateVersionMetadata-3ded56b8.js');
const util = require('./util-38e73510.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./tslib.es6-e7faa7f3.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./request-67da3c71.js');
require('./append-custom-params-0f5d0fe2.js');
require('./remove-921f5dc7.js');
require('./merge-objects-b31af1a3.js');
require('./get-prop-4bd8fc1a.js');
require('./deep-set-49b373be.js');
require('./object-to-json-blob-5c0a267d.js');
require('./update-b8977041.js');

const arcgisHubVersionsCss = ":host{display:block}arcgis-skeleton-loader{margin:1.25rem;margin-bottom:0}.version-title{margin-block:0.25rem;font-size:1rem;color:var(--calcite-color-brand)}calcite-list-item{border-inline-start:4px solid transparent}calcite-list-item[selected]{border-inline-start-color:var(--calcite-color-brand)}calcite-list-item[selected] .version-title:before{content:\"≫ \";color:black}calcite-list-item[selected] .version-title calcite-link{color:transparent;--calcite-color-text-link:black;--calcite-link-blue-underline:transparent;text-decoration:none}.badges-container{min-height:1.5rem;display:flex;gap:0.25rem}.viewing-badge{--calcite-color-foreground-2:var(--calcite-color-foreground-current)}";

const dateFormat = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
const ArcgisHubVersions = class {
  /**
   * Constructor function, pre-binds context to relevant methods
   */
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubVersionsVersionSelected = index.createEvent(this, "arcgisHubVersionsVersionSelected", 7);
    this.activeVersionId = undefined;
    this.context = undefined;
    this.itemId = undefined;
    this.publishedVersionId = undefined;
    this.versions = [];
    this.loading = true;
    this.error = false;
    this.versionToOperateOn = undefined;
    this.shouldShowDetailsModal = false;
    this.shouldShowDeleteModal = false;
    this.updateDetailsError = false;
    this.deleteError = false;
    this.shouldShowAlert = false;
    this.hasClipboardError = false;
    this.item = undefined;
    context.bind(this, 'onAlertClose', 'onDelete', 'onHideDeleteModal', 'onHideDetailsModal', 'onSaveDetails', 'onSelectVersion', 'onShare', 'onShowDeleteModal', 'onShowDetailsModal', 'onShowPopover', 'renderListItem', 'setPopoverEl');
  }
  /**
   * Component will load lifecycle method, fetches translations and data
   * needed to render the UI
   */
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    this.fetchVersions();
  }
  /**
   * Watches for changes to context or itemId and fetches versions
   * when they change
   */
  async fetchVersions() {
    var _a, _b;
    this.loading = true;
    this.error = false;
    try {
      if (this.context && this.itemId) {
        this.item = await get.getItem(this.itemId, (_a = this.context) === null || _a === void 0 ? void 0 : _a.requestOptions);
        const versions = await updateVersionMetadata.searchVersions(this.itemId, (_b = this.context) === null || _b === void 0 ? void 0 : _b.requestOptions);
        this.versions = versions;
      }
    }
    catch (e) {
      console.error(e.message);
      this.error = true;
    }
    finally {
      this.loading = false;
    }
  }
  onTitleLinkClick(e) {
    // when the title is clicked, we want to not follow the link
    // we handle it via events and selection
    // but using a link with an href will allow it to work when ctrl-clicked (open link in new tab)
    e.preventDefault();
  }
  /**
   * Listens for onCalciteListItemSelect events, sets the activeVersionId, and emits the selected version
   */
  onSelectVersion(event) {
    event.stopPropagation();
    // we want to manage selection based on the activeVersionId prop
    // bit calcite-list wants to manage it, which causes problems
    // so we make the calcite-list selection-mode=none and manage it ourselves
    const id = event.target.value.id;
    if (id !== this.activeVersionId) {
      this.arcgisHubVersionsVersionSelected.emit(event.target.value);
    }
  }
  setPopoverEl(el) {
    this.popover = el;
  }
  onShowPopover(event) {
    event.stopPropagation();
    const version = this.versions.find(v => v.id === event.target.dataset.id);
    if (version) {
      this.versionToOperateOn = util.cloneObject(version);
      this.popover.referenceElement = event.target;
      setTimeout(() => {
        // when we set the reference element and then immediately open it
        // it sometimes is not positioned correctly
        this.popover.open = true;
      }, 100);
    }
  }
  onShowDetailsModal(event) {
    event.stopPropagation();
    this.popover.open = false;
    this.shouldShowDetailsModal = true;
  }
  onHideDetailsModal(event) {
    event.stopPropagation();
    this.updateDetailsError = false;
    this.versionToOperateOn = null;
    this.shouldShowDetailsModal = false;
  }
  async onSaveDetails(event) {
    var _a;
    event.stopPropagation();
    try {
      const updatedVersion = event.detail;
      await updateVersionMetadata.updateVersionMetadata(this.itemId, updatedVersion, this.item.owner, (_a = this.context) === null || _a === void 0 ? void 0 : _a.requestOptions);
      // we need to update the version in the list
      this.versions = this.versions.map(v => v.id === updatedVersion.id ? updatedVersion : v);
      this.shouldShowDetailsModal = false;
      this.versionToOperateOn = null;
    }
    catch (error) {
      console.error(error);
      this.updateDetailsError = true;
    }
  }
  onShowDeleteModal(event) {
    event.stopPropagation();
    this.showDeleteModal(this.versionToOperateOn.id);
  }
  /**
   * Shows the delete modal for the specified version
   * @param {string} versionId
   */
  async showDeleteModal(versionId) {
    const version = this.versions.find(v => v.id === versionId);
    if (version) {
      this.popover.open = false;
      this.versionToOperateOn = util.cloneObject(version);
      this.shouldShowDeleteModal = true;
    }
  }
  onHideDeleteModal(event) {
    event.stopPropagation();
    this.deleteError = null;
    this.versionToOperateOn = null;
    this.shouldShowDeleteModal = false;
  }
  async onDelete(event) {
    var _a;
    event.stopPropagation();
    try {
      const version = event.detail;
      await updateVersionMetadata.deleteVersion(this.itemId, version.id, this.item.owner, (_a = this.context) === null || _a === void 0 ? void 0 : _a.requestOptions);
      // we need to update the version in the list
      this.versions = this.versions.filter(v => v.id !== version.id);
      this.shouldShowDeleteModal = false;
      this.versionToOperateOn = null;
      if (version.id === this.activeVersionId) {
        this.activeVersionId = null;
        this.arcgisHubVersionsVersionSelected.emit(null);
      }
    }
    catch (error) {
      this.deleteError = true;
    }
  }
  async onShare() {
    try {
      this.hasClipboardError = false;
      await clipboard.copyStringToClipboard(this.getShareUrl(this.versionToOperateOn.id));
    }
    catch (error) {
      console.log('Error copying to clipboard', error);
      this.hasClipboardError = true;
    }
    finally {
      this.popover.open = false;
      this.shouldShowAlert = true;
    }
  }
  onAlertClose() {
    this.shouldShowAlert = false;
  }
  getItemUrl(versionId) {
    // we want a querystring that preserves any existing query params
    // and includes the versionId
    // this can be a relative url
    const search = new URLSearchParams(window.location.search);
    search.set('version', versionId);
    return `?${search.toString()}`;
  }
  getShareUrl(versionId) {
    // this url must be fully qualified
    const url = new URL(window.location.origin);
    url.searchParams.set('layoutVersion', versionId);
    url.searchParams.set('previewing', 'true');
    return url.toString();
  }
  get shouldShowDeleteButton() {
    var _a;
    return this.publishedVersionId !== ((_a = this.versionToOperateOn) === null || _a === void 0 ? void 0 : _a.id);
  }
  getVersionMetadata(version) {
    const name = this.getVersionName(version);
    return {
      name,
      createdBy: version.creator
    };
  }
  getVersionName(version) {
    return (version === null || version === void 0 ? void 0 : version.name) || this.intl.formatDate(version === null || version === void 0 ? void 0 : version.created, dateFormat);
  }
  /**
   * Returns the formatted created date for the specified version
   * or an empty string if the version does not have a name (since if it has a name we will use the created date as the name)
   * and thus do not need to show it again
   */
  getCreatedDate(version) {
    const { name, created } = version;
    let result = '';
    if (name) {
      result = this.intl.formatDate(created, dateFormat);
    }
    return result;
  }
  renderAlert() {
    const msg = this.hasClipboardError ? 'shareErrorMessage' : 'shareSuccessMessage';
    const kind = this.hasClipboardError ? 'danger' : 'success';
    return (index.h("calcite-alert", { "auto-close": true, autoCloseDuration: "fast", kind: kind, label: this.intl.t(msg), onCalciteAlertClose: this.onAlertClose, open: this.shouldShowAlert, placement: "top", scale: "s" }, index.h("div", { slot: "title" }, this.intl.t(msg))));
  }
  /**
   * Renders the loading state
   */
  renderLoading() {
    const { loading } = this;
    if (loading) {
      return index.h(index.Fragment, null, index.h("arcgis-skeleton-loader", { active: true, rows: 1, "show-heading": true }), index.h("arcgis-skeleton-loader", { active: true, rows: 1, "show-heading": true }), index.h("arcgis-skeleton-loader", { active: true, rows: 1, "show-heading": true }));
    }
  }
  /**
   * Renders the empty state
   */
  renderEmptyState() {
    const { loading, error: hasError, versions } = this;
    if (!loading && !hasError && !versions.length) {
      return index.h(index.Fragment, null, index.h("h2", null, this.intl.t('emptyMessage')));
    }
  }
  /**
   * Renders the error state
  */
  renderError() {
    const { loading, error: hasError } = this;
    if (!loading && hasError) {
      return index.h(index.Fragment, null, index.h("h2", null, this.intl.t('errorMessage')));
    }
  }
  renderPopover() {
    if (!!this.versions.length) {
      return (index.h("calcite-popover", { "auto-close": true, "focus-trap-disabled": true, label: this.intl.t('popover.label'), overlayPositioning: "fixed", placement: "leading", ref: this.setPopoverEl, referenceElement: "" }, index.h("calcite-action-pad", { "expand-disabled": true, expanded: true }, index.h("calcite-action", { icon: "share", onClick: this.onShare, scale: "m", text: this.intl.t('popover.actions.share') }), index.h("calcite-action", { icon: "pencil", onClick: this.onShowDetailsModal, scale: "m", text: this.intl.t('popover.actions.edit') }), this.shouldShowDeleteButton && index.h("calcite-action", { icon: "trash", onClick: this.onShowDeleteModal, scale: "m", text: this.intl.t('popover.actions.delete'), "text-enabled": true }))));
    }
  }
  renderDetailsModal() {
    return (index.h("arcgis-hub-versions-details-modal", { error: this.updateDetailsError, onArcgisHubVersionsDetailsModalClose: this.onHideDetailsModal, onArcgisHubVersionsDetailsModalSave: this.onSaveDetails, shouldShow: this.shouldShowDetailsModal, version: this.versionToOperateOn }));
  }
  renderDeleteModal() {
    return (index.h("arcgis-hub-versions-delete-modal", { displayName: this.getVersionName(this.versionToOperateOn), error: this.deleteError, onArcgisHubVersionsDeleteModalClose: this.onHideDeleteModal, onArcgisHubVersionsDeleteModalDelete: this.onDelete, shouldShow: this.shouldShowDeleteModal, version: this.versionToOperateOn }));
  }
  renderListItem(version) {
    return (index.h("calcite-list-item", { key: version.id, metadata: this.getVersionMetadata(version), onCalciteListItemSelect: this.onSelectVersion, selected: this.activeVersionId === version.id, value: version }, index.h("div", { slot: "content" }, index.h("div", { class: "badges-container" }, this.publishedVersionId === version.id && index.h("calcite-chip", { kind: "brand", scale: "s", value: "" }, this.intl.t('publishedBadge')), this.activeVersionId === version.id && index.h("calcite-chip", { class: "viewing-badge", scale: "s", value: "" }, this.intl.t('viewingBadge'))), index.h("h2", { class: "version-title" }, index.h("calcite-link", { href: this.getItemUrl(version.id), onClick: this.onTitleLinkClick }, this.getVersionName(version))), index.h("div", null, this.getCreatedDate(version)), index.h("div", null, this.intl.t('createdBy', version)), index.h("div", null, version.description)), index.h("calcite-action", { "data-id": version.id, icon: "ellipsis", onClick: this.onShowPopover, slot: "actions-end", text: this.intl.t('menuLabel') })));
  }
  /**
   * Primary render entrypoint
   */
  render() {
    return (index.h(index.Host, { "data-element": "versions" }, index.h("calcite-list", { "selection-appearance": "border", "selection-mode": "none" }, this.renderLoading(), this.renderEmptyState(), this.renderError(), this.versions.map(this.renderListItem)), this.renderPopover(), index.h("arcgis-wormhole", null, this.renderAlert(), this.renderDetailsModal(), this.renderDeleteModal())));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "context": ["fetchVersions"],
    "itemId": ["fetchVersions"]
  }; }
};
ArcgisHubVersions.style = arcgisHubVersionsCss;

exports.arcgis_hub_versions = ArcgisHubVersions;
