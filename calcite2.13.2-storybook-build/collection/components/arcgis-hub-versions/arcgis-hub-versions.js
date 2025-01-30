import { Fragment, Host, h } from '@stencil/core';
import { cloneObject, deleteVersion, updateVersionMetadata, searchVersions, } from '@esri/hub-common';
import { getItem } from '@esri/arcgis-rest-portal';
import intlManager from '../../utils/intl-manager';
import { bind } from '../../utils/context';
import { copyStringToClipboard } from '../../utils/clipboard';
const dateFormat = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
export class ArcgisHubVersions {
  /**
   * Constructor function, pre-binds context to relevant methods
   */
  constructor() {
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
    bind(this, 'onAlertClose', 'onDelete', 'onHideDeleteModal', 'onHideDetailsModal', 'onSaveDetails', 'onSelectVersion', 'onShare', 'onShowDeleteModal', 'onShowDetailsModal', 'onShowPopover', 'renderListItem', 'setPopoverEl');
  }
  /**
   * Component will load lifecycle method, fetches translations and data
   * needed to render the UI
   */
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
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
        this.item = await getItem(this.itemId, (_a = this.context) === null || _a === void 0 ? void 0 : _a.requestOptions);
        const versions = await searchVersions(this.itemId, (_b = this.context) === null || _b === void 0 ? void 0 : _b.requestOptions);
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
      this.versionToOperateOn = cloneObject(version);
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
      await updateVersionMetadata(this.itemId, updatedVersion, this.item.owner, (_a = this.context) === null || _a === void 0 ? void 0 : _a.requestOptions);
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
      this.versionToOperateOn = cloneObject(version);
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
      await deleteVersion(this.itemId, version.id, this.item.owner, (_a = this.context) === null || _a === void 0 ? void 0 : _a.requestOptions);
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
      await copyStringToClipboard(this.getShareUrl(this.versionToOperateOn.id));
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
    return (h("calcite-alert", { "auto-close": true, autoCloseDuration: "fast", kind: kind, label: this.intl.t(msg), onCalciteAlertClose: this.onAlertClose, open: this.shouldShowAlert, placement: "top", scale: "s" }, h("div", { slot: "title" }, this.intl.t(msg))));
  }
  /**
   * Renders the loading state
   */
  renderLoading() {
    const { loading } = this;
    if (loading) {
      return h(Fragment, null, h("arcgis-skeleton-loader", { active: true, rows: 1, "show-heading": true }), h("arcgis-skeleton-loader", { active: true, rows: 1, "show-heading": true }), h("arcgis-skeleton-loader", { active: true, rows: 1, "show-heading": true }));
    }
  }
  /**
   * Renders the empty state
   */
  renderEmptyState() {
    const { loading, error: hasError, versions } = this;
    if (!loading && !hasError && !versions.length) {
      return h(Fragment, null, h("h2", null, this.intl.t('emptyMessage')));
    }
  }
  /**
   * Renders the error state
  */
  renderError() {
    const { loading, error: hasError } = this;
    if (!loading && hasError) {
      return h(Fragment, null, h("h2", null, this.intl.t('errorMessage')));
    }
  }
  renderPopover() {
    if (!!this.versions.length) {
      return (h("calcite-popover", { "auto-close": true, "focus-trap-disabled": true, label: this.intl.t('popover.label'), overlayPositioning: "fixed", placement: "leading", ref: this.setPopoverEl, referenceElement: "" }, h("calcite-action-pad", { "expand-disabled": true, expanded: true }, h("calcite-action", { icon: "share", onClick: this.onShare, scale: "m", text: this.intl.t('popover.actions.share') }), h("calcite-action", { icon: "pencil", onClick: this.onShowDetailsModal, scale: "m", text: this.intl.t('popover.actions.edit') }), this.shouldShowDeleteButton && h("calcite-action", { icon: "trash", onClick: this.onShowDeleteModal, scale: "m", text: this.intl.t('popover.actions.delete'), "text-enabled": true }))));
    }
  }
  renderDetailsModal() {
    return (h("arcgis-hub-versions-details-modal", { error: this.updateDetailsError, onArcgisHubVersionsDetailsModalClose: this.onHideDetailsModal, onArcgisHubVersionsDetailsModalSave: this.onSaveDetails, shouldShow: this.shouldShowDetailsModal, version: this.versionToOperateOn }));
  }
  renderDeleteModal() {
    return (h("arcgis-hub-versions-delete-modal", { displayName: this.getVersionName(this.versionToOperateOn), error: this.deleteError, onArcgisHubVersionsDeleteModalClose: this.onHideDeleteModal, onArcgisHubVersionsDeleteModalDelete: this.onDelete, shouldShow: this.shouldShowDeleteModal, version: this.versionToOperateOn }));
  }
  renderListItem(version) {
    return (h("calcite-list-item", { key: version.id, metadata: this.getVersionMetadata(version), onCalciteListItemSelect: this.onSelectVersion, selected: this.activeVersionId === version.id, value: version }, h("div", { slot: "content" }, h("div", { class: "badges-container" }, this.publishedVersionId === version.id && h("calcite-chip", { kind: "brand", scale: "s", value: "" }, this.intl.t('publishedBadge')), this.activeVersionId === version.id && h("calcite-chip", { class: "viewing-badge", scale: "s", value: "" }, this.intl.t('viewingBadge'))), h("h2", { class: "version-title" }, h("calcite-link", { href: this.getItemUrl(version.id), onClick: this.onTitleLinkClick }, this.getVersionName(version))), h("div", null, this.getCreatedDate(version)), h("div", null, this.intl.t('createdBy', version)), h("div", null, version.description)), h("calcite-action", { "data-id": version.id, icon: "ellipsis", onClick: this.onShowPopover, slot: "actions-end", text: this.intl.t('menuLabel') })));
  }
  /**
   * Primary render entrypoint
   */
  render() {
    return (h(Host, { "data-element": "versions" }, h("calcite-list", { "selection-appearance": "border", "selection-mode": "none" }, this.renderLoading(), this.renderEmptyState(), this.renderError(), this.versions.map(this.renderListItem)), this.renderPopover(), h("arcgis-wormhole", null, this.renderAlert(), this.renderDetailsModal(), this.renderDeleteModal())));
  }
  static get is() { return "arcgis-hub-versions"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-versions.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-versions.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "activeVersionId": {
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
          "text": "The id of the currently selected version"
        },
        "attribute": "active-version-id",
        "reflect": false
      },
      "context": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IArcGISContext",
          "resolved": "IArcGISContext",
          "references": {
            "IArcGISContext": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An instance of ArcGISContext"
        }
      },
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
          "tags": [],
          "text": "The item id of the item to fetch versions for"
        },
        "attribute": "item-id",
        "reflect": false
      },
      "publishedVersionId": {
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
          "text": "The item id of the published version\nused to render a published badge on the specified version list item"
        },
        "attribute": "published-version-id",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "versions": {},
      "loading": {},
      "error": {},
      "versionToOperateOn": {},
      "shouldShowDetailsModal": {},
      "shouldShowDeleteModal": {},
      "updateDetailsError": {},
      "deleteError": {},
      "shouldShowAlert": {},
      "hasClipboardError": {},
      "item": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubVersionsVersionSelected",
        "name": "arcgisHubVersionsVersionSelected",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when a version is selected\nevent detail is the selected [IVersionMetadata](https://esri.github.io/hub.js/api/common/IVersionMetadata/)"
        },
        "complexType": {
          "original": "IVersionMetadata",
          "resolved": "IVersionMetadata",
          "references": {
            "IVersionMetadata": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "showDeleteModal": {
        "complexType": {
          "signature": "(versionId: string) => Promise<void>",
          "parameters": [{
              "tags": [{
                  "name": "param",
                  "text": "versionId"
                }],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Shows the delete modal for the specified version",
          "tags": [{
              "name": "param",
              "text": "versionId"
            }]
        }
      }
    };
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "context",
        "methodName": "fetchVersions"
      }, {
        "propName": "itemId",
        "methodName": "fetchVersions"
      }];
  }
}
