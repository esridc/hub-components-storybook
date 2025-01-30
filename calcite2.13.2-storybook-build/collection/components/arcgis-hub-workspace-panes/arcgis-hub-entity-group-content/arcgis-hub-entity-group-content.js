import { checkPermission, getWellKnownCatalog, hubSearch } from '@esri/hub-common';
import { Host, h } from '@stencil/core';
import intlManager from '../../../utils/intl-manager';
import { bind } from '../../../utils/context';
import { interpolateTranslations } from '../../../utils/localization/interpolate-translations';
import { shareItemWithGroup, unshareItemWithGroup } from '@esri/arcgis-rest-portal';
import { getGlobalContext, showNotice } from '../../../utils/state';
import { dictionary } from '@esri/telemetry-dictionary-hub';
/**
 * This component renders a list of content that is shared
 * to the group. It allows the qualified users to add and
 * manage the group content.
 * Note: there are (potentially) 2 modals being rendered
 * in this component, one is the "Add content" modal, the
 * other one is the "Items not added" modal. The "Items
 * not added" modal is only rendered when there are items
 * that are unable to be shared to the group.
 */
export class ArcgisHubEntityGroupContent {
  constructor() {
    /**
     * Ids of items that failed to shared to the group
     */
    this.sharingErrorIds = [];
    /**
     * This is used for the "Unshared content" notice
     */
    this.isUnsharing = false;
    /**
     * because we wrap the arcgis-hub-gallery-picker in a wormhole, we
     * intercept its telemetry and re-emit it from this component so
     * we don't loose the DOM context
     */
    this.handleHubTelemetry = (evt) => {
      evt.stopPropagation();
      this.hubTelemetry.emit(Object.assign({}, evt.detail));
    };
    this.entity = undefined;
    this.isAddContentModalOpen = false;
    this.isSharingErrorsModalOpen = false;
    this._context = getGlobalContext();
    this._catalogs = undefined;
    bind(this, 'handleAddContentModalOpen', 'handleAddContentModalClose', 'handleGalleryPickerSelectionUpdate', 'handleUnsharedContentModalClose', 'handleGalleryBulkAction', 'setTotalResultCount');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.setCatalogs();
  }
  /**
   * Group content gallery facets
   */
  get contentFacets() {
    return [
      {
        label: this.intl.t('facets.map.label'),
        tooltip: this.intl.t('facets.map.tooltip'),
        key: 'bbox',
        display: 'map',
        field: 'bbox',
        value: null,
      },
      {
        label: this.intl.t("facets.type"),
        key: 'type',
        display: 'multi-select',
        field: 'type',
        options: [],
        operation: 'OR',
        aggLimit: 100,
      },
      {
        label: this.intl.t('facets.tags'),
        key: 'tags',
        display: 'multi-select',
        field: 'tags',
        options: [],
        operation: 'OR',
      },
      {
        label: this.intl.t('facets.categories'),
        key: 'categories',
        display: 'tree',
        field: 'categories',
        options: [],
        operation: 'OR',
      },
      {
        label: this.intl.t('facets.dateUpdated'),
        key: 'modified',
        display: 'date-range',
        field: 'modified',
        state: 'open',
        max: new Date(),
      },
      {
        label: this.intl.t("facets.sharing"),
        key: 'access',
        display: 'multi-select',
        field: 'access',
        options: [],
        operation: 'OR',
      },
    ];
  }
  /**
   * Group content gallery picker facets
   */
  get contentPickerFacets() {
    return [
      {
        label: this.intl.t("shareContent.facets.type"),
        key: "type",
        display: "multi-select",
        field: "type",
        options: [],
        operation: "OR",
        aggLimit: 100,
      },
      {
        label: this.intl.t("shareContent.facets.sharing"),
        key: "access",
        display: "multi-select",
        field: "access",
        options: [],
        operation: "OR",
      },
    ];
  }
  /**
   * Whether the user is able to share content to the group or not.
   * For owners and admins, true as long as their user priv has
   * 'portal:user:shareToGroup'
   * for members, true when their user priv has 'portal:user:shareToGroup'
   * and group property "isReadOnly" is false
   */
  get canShareContentWithGroup() {
    return checkPermission(`hub:group:shareContent`, this._context, this.entity).access;
  }
  /**
   * Catalogs passed to the group content galley.
   * Only show the user's own content for edit groups,
   * show all content for view groups
   */
  setCatalogs() {
    const catalogNames = this.entity.isSharedUpdate
      ? ['myContent']
      : ['myContent', 'favorites', 'organization', 'world'];
    this._catalogs = catalogNames.map((name) => {
      var _a;
      const opts = {
        user: (_a = this._context) === null || _a === void 0 ? void 0 : _a.currentUser,
        filter: {
          group: {
            not: this.entity.id
          }
        },
        collectionNames: ['appAndMap', 'dataset', 'document', 'feedback', 'site', 'projectAndInitiative']
      };
      const catalog = getWellKnownCatalog('shareContent', name, 'item', opts);
      // exclude the existing items in the group
      catalog.scopes.item.filters[0].predicates.push({ group: { not: this.entity.id } });
      return interpolateTranslations(this.intl, catalog);
    });
  }
  handleAddContentModalOpen() {
    this.isAddContentModalOpen = true;
  }
  handleAddContentModalClose() {
    this.isAddContentModalOpen = false;
  }
  handleUnsharedContentModalClose() {
    // reset sharingErrorIds so they don't reappear
    // in the modal next time when it's open
    this.sharingErrorIds = [];
    this.isUnsharing = false;
    this.isSharingErrorsModalOpen = false;
  }
  /** Get possible bulk actions */
  get bulkActions() {
    const bulkActions = {
      actions: [],
    };
    // If we can make edits, we can delete
    if (this.canShareContentWithGroup) {
      bulkActions.actions.push({
        name: 'unshareContent',
        icon: 'x-circle',
        text: this.intl.t('unshareContent.remove')
      });
    }
    return bulkActions;
  }
  setTotalResultCount(evt) {
    this.groupContentCount = evt.detail.length;
  }
  // TODO: this is used many times in the code,
  // we should consider hoisting it to hub.js as a util
  async delay(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }
  /**
   * Handle sharing items to the group
   * @param itemIds items ids
   */
  async handleContentShare(itemIds) {
    // TODO: create a shareItemsWithGroup fn in hub.js
    await Promise.all(itemIds.map(async (itemId) => {
      var _a, _b;
      try {
        // We need the item owner for `shareItemWithGroup`,
        // so have to do a search
        const query = {
          targetEntity: 'item',
          filters: [
            {
              predicates: [
                { id: itemId }
              ]
            }
          ]
        };
        const hubSearchOptions = { requestOptions: (_a = this._context) === null || _a === void 0 ? void 0 : _a.hubRequestOptions };
        const { results } = await hubSearch(query, hubSearchOptions);
        await shareItemWithGroup({
          id: itemId,
          groupId: this.entity.id,
          confirmItemControl: this.entity.isSharedUpdate,
          owner: results[0].owner,
          authentication: (_b = this._context) === null || _b === void 0 ? void 0 : _b.session,
        });
      }
      catch (e) {
        // For every item that failed to be shared to the
        // group, add its id to the sharingErrorIds list,
        // which will be used to populate the gallery in
        // the unsharedContentModal modal
        this.sharingErrorIds = [...this.sharingErrorIds, itemId];
      }
    }));
    // There is a delay for sharing the content on the API side,
    // so we have to do an artificial delay before resetting the
    // catalogs so the page can be rerendered
    // until we have resolution, this is the best solution we have
    await this.delay(2000);
    this.setCatalogs();
  }
  /**
   * Handle unsharing items from the group
   * @param itemIds items ids
   */
  async handleContentUnshare(itemIds) {
    await Promise.all(itemIds.map(async (itemId) => {
      var _a, _b;
      try {
        // We need the item owner for 'usnhareItemFromGroup',
        // so we have to do a search
        const query = {
          targetEntity: 'item',
          filters: [
            {
              predicates: [
                { id: itemId }
              ]
            }
          ]
        };
        const hubSearchOptions = { requestOptions: (_a = this._context) === null || _a === void 0 ? void 0 : _a.hubRequestOptions };
        const { results } = await hubSearch(query, hubSearchOptions);
        await unshareItemWithGroup({
          id: itemId,
          groupId: this.entity.id,
          owner: results[0].owner,
          authentication: (_b = this._context) === null || _b === void 0 ? void 0 : _b.session,
        });
      }
      catch (e) {
        // For every item that failed to be shared to the group,
        // add its id to the sharingErrorIds list, which will be
        // used to populate the gallery in the unsharedContentModal
        this.sharingErrorIds = [...this.sharingErrorIds, itemId];
      }
    }));
    // There is a delay for sharing the content on the API side,
    // so we have to do an artificial delay before resetting the
    // catalogs so the page can be rerendered
    // until we have resolution, this is the best solution we have
    await this.delay(2000);
    this.setCatalogs();
  }
  async handleGalleryPickerSelectionUpdate(evt) {
    const itemIds = evt.detail.item || [];
    await this.handleContentShare(itemIds);
    // Open the unsharedContentModal if any items are failed
    // to be shared, otherwise, show the success notice
    if (!!this.sharingErrorIds.length) {
      this.isSharingErrorsModalOpen = true;
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.content.action.update.label.groups.details.add), { response: 'Failed' }));
    }
    else {
      showNotice({
        title: this.intl.t('shareContent.itemSharedSuccessAlert'),
        message: '',
        configuration: {
          noticeType: 'alert',
          autoClose: true,
          autoCloseDuration: 'fast',
          icon: true,
          kind: 'success',
          label: this.intl.t('notice.label')
        }
      });
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.content.action.update.label.groups.details.add), { response: 'Success' }));
    }
    // Close the Add Content modal
    this.isAddContentModalOpen = false;
  }
  /**
 * Handle unsharing items from the group
 * @param itemIds items ids
 */
  async unshareContentFromGroup(itemIds) {
    var _a, _b;
    // unshare items from the group
    await this.handleContentUnshare(itemIds);
    // Open the unsharedContentModal if any items have failed
    // to be unshared, otherwise show the success notice
    if (!!this.sharingErrorIds.length) {
      this.isUnsharing = true;
      this.isSharingErrorsModalOpen = true;
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.content.action.update.label.groups.details.remove), { response: 'Failure', count: this.groupContentCount }));
    }
    else {
      showNotice({
        title: this.intl.t('unshareContent.success', { groupName: this.entity.name }),
        message: '',
        configuration: {
          noticeType: 'alert',
          autoClose: true,
          autoCloseDuration: 'fast',
          icon: true,
          kind: 'success',
          label: this.intl.t('notice.label')
        }
      });
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.content.action.update.label.groups.details.remove), { response: 'Success', count: this.groupContentCount }));
    }
    // Refresh the gallery and clear the selection
    (_a = this.contentGallery) === null || _a === void 0 ? void 0 : _a.refresh();
    (_b = this.contentGallery) === null || _b === void 0 ? void 0 : _b.clearSelection();
  }
  async handleGalleryBulkAction(evt) {
    // Extract the action and selection from the event
    const { action, selection } = evt.detail;
    switch (action.name) {
      case 'unshareContent':
        this.unshareContentFromGroup(selection);
        break;
    }
  }
  renderSharingErrorsNotice() {
    const i18nScope = this.isUnsharing ? 'unshareContent.unsharedModal.notice' : 'shareContent.unsharedModal.notice';
    return h("calcite-notice", { icon: this.intl.t(`${i18nScope}.icon`), kind: "danger", open: true, scale: "m" }, h("div", { slot: "title" }, this.intl.t(`${i18nScope}.title`)), h("div", { slot: "message" }, this.intl.t(`${i18nScope}.message`)), !this.isUnsharing && h("calcite-link", { "aria-label": this.intl.t('newTab'), href: "https://doc.arcgis.com/en/arcgis-online/share-maps/share-items.htm", iconEnd: "launch", slot: "link", target: "_blank" }, this.intl.t(`${i18nScope}.linkText`)));
  }
  renderSharingErrorsModal(ids) {
    const query = {
      targetEntity: 'item',
      filters: [
        {
          predicates: [
            { id: { any: ids } }
          ]
        }
      ]
    };
    const i18nScope = this.isUnsharing ? 'unshareContent.unsharedModal' : 'shareContent.unsharedModal';
    return h("arcgis-wormhole", { elAttributes: { unthemed: '' } }, h("calcite-modal", { "data-element": "modal", onCalciteModalClose: this.handleUnsharedContentModalClose, open: this.isSharingErrorsModalOpen }, h("div", { slot: "header" }, this.intl.t(`${i18nScope}.title`)), h("div", { slot: "content" }, this.renderSharingErrorsNotice(), h("arcgis-hub-gallery", { linkTarget: "siteRelative", newTab: true, query: query, showAdditionalInfo: false, showBackToTopBtn: true, showMoreResultsBtn: true, showResultsCount: true, showThumbnail: false })), h("calcite-button", { onClick: this.handleUnsharedContentModalClose, slot: "primary", width: "full" }, this.intl.t('close'))));
  }
  renderContentGallery() {
    const query = {
      targetEntity: 'item',
      filters: [
        {
          predicates: [
            { group: this.entity.id }
          ]
        }
      ]
    };
    return h("arcgis-hub-gallery", { bulkActions: this.bulkActions, facets: this.contentFacets, linkTarget: 'siteRelative', onArcgisHubGalleryBulkAction: this.handleGalleryBulkAction, onArcgisHubGalleryResultsChange: this.setTotalResultCount, query: query, ref: (el) => { this.contentGallery = el; }, selectionMode: this.canShareContentWithGroup ? 'multiple' : 'none', "show-back-to-top-btn": true, "show-chips": true, "show-facets": true, "show-layout-switcher": true, "show-more-results-btn": true, "show-results-count": true, "show-search": true, "show-sort": true, sortField: 'modified' });
  }
  renderGalleryPicker() {
    return (h("arcgis-wormhole", { elAttributes: { unthemed: '' } }, h("arcgis-hub-gallery-picker", { catalogs: this._catalogs, facets: this.contentPickerFacets, linkTarget: "siteRelative", modalTitle: this.intl.t('shareContent.modal.title'), onArcgisHubGalleryPickerClose: this.handleAddContentModalClose, onArcgisHubGalleryPickerSelectionUpdate: this.handleGalleryPickerSelectionUpdate, onHubTelemetry: this.handleHubTelemetry, open: this.isAddContentModalOpen, showFacetForSingleCatalog: true, showSearch: true, showSelection: true })));
  }
  render() {
    return (h(Host, { "data-element": "entity-group-content" }, h("arcgis-hub-workspace-pane", null, h("h1", { slot: "title" }, this.intl.t("title")), h("arcgis-ref-tooltip", { placement: "right", slot: "primary-actions", text: !this.canShareContentWithGroup ? this.intl.t("shareContent.disabledTooltip") : "" }, h("calcite-button", { appearance: 'solid', disabled: !this.canShareContentWithGroup, onClick: this.handleAddContentModalOpen, round: true }, this.intl.t('shareContent.buttonText'))), h("div", null, this.renderContentGallery())), this.isAddContentModalOpen && this.renderGalleryPicker(), this.isSharingErrorsModalOpen && this.renderSharingErrorsModal(this.sharingErrorIds)));
  }
  static get is() { return "arcgis-hub-entity-group-content"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-group-content.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-group-content.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "entity": {
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
          "text": ""
        }
      }
    };
  }
  static get states() {
    return {
      "isAddContentModalOpen": {},
      "isSharingErrorsModalOpen": {},
      "_context": {},
      "_catalogs": {}
    };
  }
  static get events() {
    return [{
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
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
}
