'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const context = require('./context-0167a31e.js');
const interpolateTranslations = require('./interpolate-translations-83c38ec8.js');
const state = require('./state-6637df8c.js');
const index$1 = require('./index-6f16fe65.js');
const checkPermission = require('./checkPermission-11ab5992.js');
const wellKnownCatalog = require('./wellKnownCatalog-799c8326.js');
const hubSearch = require('./hubSearch-79d30702.js');
const shareItemWithGroup = require('./share-item-with-group-6c27286f.js');
const unshareItemWithGroup = require('./unshare-item-with-group-05dbcf93.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./interpolate-c1fe951a.js');
require('./store-2a385ca0.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./TemplateBusinessRules-5564c964.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./get-with-default-d1b1754d.js');
require('./map-by-a7a75788.js');
require('./get-family-cafa88bb.js');
require('./tslib.es6-b6cfa7d7.js');
require('./HubError-44e07249.js');
require('./OperationError-902f34ae.js');
require('./HubInitiatives-25ecf40a.js');
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./search-2db68ef4.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./append-custom-params-0f5d0fe2.js');
require('./request-67da3c71.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./helpers-64227739.js');
require('./generate-random-string-8807d629.js');
require('./get-0368c931.js');
require('./tslib.es6-e7faa7f3.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./slugify-826af07b.js');
require('./object-to-json-blob-5c0a267d.js');
require('./fail-safe-33c35b7f.js');
require('./delete-prop-7826ae49.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./_enrichments-a40a3850.js');
require('./get-user-5eecc1c4.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getService-b27eda44.js');
require('./types-097b54b1.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./getTypeFromEntity-9476954e.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./UserSession-f8bc10c8.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./merge-objects-b31af1a3.js');
require('./get-52661c13.js');
require('./search-b00c4c79.js');
require('./request-79b61e92.js');
require('./channels-bf478342.js');
require('./discussions-api-request-e9e6e346.js');
require('./events-7873340d.js');
require('./registrations-a6dd52b7.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');
require('./helpers-05252545.js');
require('./update-user-membership-4af88c1c.js');

const arcgisHubEntityGroupContentCss = ":host{display:block;height:100%}calcite-button{width:-moz-fit-content;width:fit-content}calcite-modal{--calcite-modal-height:80vh}";

const ArcgisHubEntityGroupContent = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
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
    this._context = state.getGlobalContext();
    this._catalogs = undefined;
    context.bind(this, 'handleAddContentModalOpen', 'handleAddContentModalClose', 'handleGalleryPickerSelectionUpdate', 'handleUnsharedContentModalClose', 'handleGalleryBulkAction', 'setTotalResultCount');
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
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
    return checkPermission.checkPermission(`hub:group:shareContent`, this._context, this.entity).access;
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
      const catalog = wellKnownCatalog.getWellKnownCatalog('shareContent', name, 'item', opts);
      // exclude the existing items in the group
      catalog.scopes.item.filters[0].predicates.push({ group: { not: this.entity.id } });
      return interpolateTranslations.interpolateTranslations(this.intl, catalog);
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
        const { results } = await hubSearch.hubSearch(query, hubSearchOptions);
        await shareItemWithGroup.shareItemWithGroup({
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
        const { results } = await hubSearch.hubSearch(query, hubSearchOptions);
        await unshareItemWithGroup.unshareItemWithGroup({
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
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.update.label.groups.details.add), { response: 'Failed' }));
    }
    else {
      state.showNotice({
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
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.update.label.groups.details.add), { response: 'Success' }));
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
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.update.label.groups.details.remove), { response: 'Failure', count: this.groupContentCount }));
    }
    else {
      state.showNotice({
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
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.update.label.groups.details.remove), { response: 'Success', count: this.groupContentCount }));
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
    return index.h("calcite-notice", { icon: this.intl.t(`${i18nScope}.icon`), kind: "danger", open: true, scale: "m" }, index.h("div", { slot: "title" }, this.intl.t(`${i18nScope}.title`)), index.h("div", { slot: "message" }, this.intl.t(`${i18nScope}.message`)), !this.isUnsharing && index.h("calcite-link", { "aria-label": this.intl.t('newTab'), href: "https://doc.arcgis.com/en/arcgis-online/share-maps/share-items.htm", iconEnd: "launch", slot: "link", target: "_blank" }, this.intl.t(`${i18nScope}.linkText`)));
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
    return index.h("arcgis-wormhole", { elAttributes: { unthemed: '' } }, index.h("calcite-modal", { "data-element": "modal", onCalciteModalClose: this.handleUnsharedContentModalClose, open: this.isSharingErrorsModalOpen }, index.h("div", { slot: "header" }, this.intl.t(`${i18nScope}.title`)), index.h("div", { slot: "content" }, this.renderSharingErrorsNotice(), index.h("arcgis-hub-gallery", { linkTarget: "siteRelative", newTab: true, query: query, showAdditionalInfo: false, showBackToTopBtn: true, showMoreResultsBtn: true, showResultsCount: true, showThumbnail: false })), index.h("calcite-button", { onClick: this.handleUnsharedContentModalClose, slot: "primary", width: "full" }, this.intl.t('close'))));
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
    return index.h("arcgis-hub-gallery", { bulkActions: this.bulkActions, facets: this.contentFacets, linkTarget: 'siteRelative', onArcgisHubGalleryBulkAction: this.handleGalleryBulkAction, onArcgisHubGalleryResultsChange: this.setTotalResultCount, query: query, ref: (el) => { this.contentGallery = el; }, selectionMode: this.canShareContentWithGroup ? 'multiple' : 'none', "show-back-to-top-btn": true, "show-chips": true, "show-facets": true, "show-layout-switcher": true, "show-more-results-btn": true, "show-results-count": true, "show-search": true, "show-sort": true, sortField: 'modified' });
  }
  renderGalleryPicker() {
    return (index.h("arcgis-wormhole", { elAttributes: { unthemed: '' } }, index.h("arcgis-hub-gallery-picker", { catalogs: this._catalogs, facets: this.contentPickerFacets, linkTarget: "siteRelative", modalTitle: this.intl.t('shareContent.modal.title'), onArcgisHubGalleryPickerClose: this.handleAddContentModalClose, onArcgisHubGalleryPickerSelectionUpdate: this.handleGalleryPickerSelectionUpdate, onHubTelemetry: this.handleHubTelemetry, open: this.isAddContentModalOpen, showFacetForSingleCatalog: true, showSearch: true, showSelection: true })));
  }
  render() {
    return (index.h(index.Host, { "data-element": "entity-group-content" }, index.h("arcgis-hub-workspace-pane", null, index.h("h1", { slot: "title" }, this.intl.t("title")), index.h("arcgis-ref-tooltip", { placement: "right", slot: "primary-actions", text: !this.canShareContentWithGroup ? this.intl.t("shareContent.disabledTooltip") : "" }, index.h("calcite-button", { appearance: 'solid', disabled: !this.canShareContentWithGroup, onClick: this.handleAddContentModalOpen, round: true }, this.intl.t('shareContent.buttonText'))), index.h("div", null, this.renderContentGallery())), this.isAddContentModalOpen && this.renderGalleryPicker(), this.isSharingErrorsModalOpen && this.renderSharingErrorsModal(this.sharingErrorIds)));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubEntityGroupContent.style = arcgisHubEntityGroupContentCss;

exports.arcgis_hub_entity_group_content = ArcgisHubEntityGroupContent;
