import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { b as bind } from './context-7d8f7366.js';
import { i as interpolateTranslations } from './interpolate-translations-f9ad4891.js';
import { g as getGlobalContext, d as showNotice } from './state-31a09db0.js';
import { d as dist } from './index-dd3f99ac.js';
import { c as checkPermission } from './checkPermission-6c5be250.js';
import { a as getWellKnownCatalog } from './wellKnownCatalog-7e9f7f53.js';
import { h as hubSearch } from './hubSearch-41612481.js';
import { s as shareItemWithGroup } from './share-item-with-group-5711513b.js';
import { u as unshareItemWithGroup } from './unshare-item-with-group-b4a3a08f.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './interpolate-d39d6151.js';
import './store-0a6cb79f.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './_commonjsHelpers-11ca3be1.js';
import './TemplateBusinessRules-0e35d61b.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './get-with-default-b819d95d.js';
import './map-by-a2234e13.js';
import './get-family-543fac52.js';
import './tslib.es6-9c17e83a.js';
import './HubError-e26c5610.js';
import './OperationError-387ae9ab.js';
import './HubInitiatives-4f4e24ce.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './search-c7a57aa9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './append-custom-params-4bd856e5.js';
import './request-fa80ae40.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './helpers-8c7e5e31.js';
import './generate-random-string-1436d9e6.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './slugify-e3e67bac.js';
import './object-to-json-blob-583ae5c3.js';
import './fail-safe-cd1a5a2a.js';
import './delete-prop-bd13d424.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './_enrichments-8641475c.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './types-2eaa1a18.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeFromEntity-e149b61e.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './merge-objects-5b123ab3.js';
import './get-850c466d.js';
import './search-211dee83.js';
import './request-3e386aeb.js';
import './channels-2574fd6e.js';
import './discussions-api-request-199cae2d.js';
import './events-c59246f8.js';
import './registrations-431b9788.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';
import './helpers-6692d307.js';
import './update-user-membership-261681cf.js';

const arcgisHubEntityGroupContentCss = ":host{display:block;height:100%}calcite-button{width:-moz-fit-content;width:fit-content}calcite-modal{--calcite-modal-height:80vh}";

const ArcgisHubEntityGroupContent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
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
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.content.action.update.label.groups.details.add), { response: 'Failed' }));
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
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.content.action.update.label.groups.details.add), { response: 'Success' }));
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
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.content.action.update.label.groups.details.remove), { response: 'Failure', count: this.groupContentCount }));
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
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.content.action.update.label.groups.details.remove), { response: 'Success', count: this.groupContentCount }));
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
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubEntityGroupContent.style = arcgisHubEntityGroupContentCss;

export { ArcgisHubEntityGroupContent as arcgis_hub_entity_group_content };
