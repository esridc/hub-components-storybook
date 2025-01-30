'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const state = require('./state-6637df8c.js');
const HubInitiatives = require('./HubInitiatives-25ecf40a.js');
const checkPermission = require('./checkPermission-11ab5992.js');
const HubSite = require('./HubSite-fab90409.js');
const getPredicateValues = require('./getPredicateValues-091930af.js');
const hubSearch = require('./hubSearch-79d30702.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
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
require('./get-family-cafa88bb.js');
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
require('./HubError-44e07249.js');
require('./get-with-default-d1b1754d.js');
require('./OperationError-902f34ae.js');
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
require('./TemplateBusinessRules-5564c964.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./getTypeFromEntity-9476954e.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./UserSession-f8bc10c8.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
require('./map-by-a7a75788.js');
require('./tslib.es6-b6cfa7d7.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./Catalog-acebae88.js');
require('./ArcGISContextManager-c5cc74e9.js');
require('./logger-5db3d659.js');
require('./encoding-211adb23.js');
require('./index-058372c1.js');
require('./fetch-1292fb6b.js');
require('./getPropertyMap-030ec7b2.js');
require('./events-7873340d.js');
require('./types-751ad3a9.js');
require('./registrations-a6dd52b7.js');
require('./fetchHubEntity-88467d55.js');
require('./get-form-json-e6831b20.js');
require('./hostedServiceUtils-236344a8.js');
require('./is-service-9b8238d2.js');
require('./_deep-map-values-d489006b.js');
require('./settings-0b8cd93b.js');
require('./discussions-api-request-e9e6e346.js');
require('./request-79b61e92.js');
require('./fetchContent-963f3885.js');
require('./index-ef80ab27.js');
require('./getLayer-0c83b4c1.js');
require('./getEditorSlug-eeb95a05.js');
require('./unshare-item-from-groups-3f34f54a.js');
require('./unshare-item-with-group-05dbcf93.js');
require('./helpers-05252545.js');
require('./get-52661c13.js');
require('./share-item-with-group-6c27286f.js');
require('./update-user-membership-4af88c1c.js');
require('./share-item-to-groups-6bc2a4bc.js');
require('./poll-7962a495.js');
require('./search-b00c4c79.js');
require('./sharedWith-ca14e4af.js');
require('./enrichEntity-1632b924.js');
require('./access-049994c9.js');
require('./getEditorConfig-1d006950.js');
require('./deepContains-7989f3f1.js');
require('./parseContainmentPath-aaf496c0.js');
require('./updateVersionMetadata-3ded56b8.js');
require('./merge-objects-b31af1a3.js');
require('./channels-bf478342.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');

const arcgisHubPageMigrationCss = ":host{display:block}";

const ArcgisHubPageMigration = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubPageMigrationWorkflowComplete = index.createEvent(this, "arcgisHubPageMigrationWorkflowComplete", 7);
    this.arcgisHubPageMigrationWorkflowClose = index.createEvent(this, "arcgisHubPageMigrationWorkflowClose", 7);
    this.handleButtonClick = () => {
      this.shouldShowModal = true;
    };
    /**
     * Handler for onCalciteDialogClose event
     */
    this.handleModalClose = () => {
      this.shouldShowModal = false;
      this.arcgisHubPageMigrationWorkflowClose.emit();
    };
    /**
     * Handler for onArcgisHubAddContentWorkflowClose event
     */
    this.handleClose = () => {
      this.shouldShowModal = false;
      this.arcgisHubPageMigrationWorkflowClose.emit();
    };
    this.handlePageMigrationWorkflowComplete = (evt) => {
      // we need to catch and re-emit this event because the workflow component is in a wormhole, thanks safari
      evt.stopPropagation();
      this.arcgisHubPageMigrationWorkflowComplete.emit(evt.detail);
    };
    this.pageId = undefined;
    this.site = undefined;
    this.shouldShowModal = false;
    this.canMigratePage = undefined;
    this.shouldMigratePage = false;
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    const context = state.getGlobalContext();
    if (context) {
      // figure out if the user has the necessary permissions
      const page = await HubInitiatives.fetchPage(this.pageId, context.requestOptions);
      const canEditPage = checkPermission.checkPermission('hub:page:edit', context, page).access;
      const siteInstance = HubSite.HubSite.fromJson(this.site, context);
      const groupsByMembership = getPredicateValues.getCatalogGroups(siteInstance.catalog, context);
      const groupIds = [...groupsByMembership['admin'], ...groupsByMembership['member'], ...groupsByMembership['owner']];
      const groupPromises = groupIds.map(groupId => {
        return hubSearch.fetchHubGroup(groupId, context.hubRequestOptions);
      });
      const groups = await Promise.all(groupPromises);
      const canShareToAnyGroups = groups.some(group => checkPermission.checkPermission('hub:group:shareContent', context, group).access);
      this.canMigratePage = canEditPage && canShareToAnyGroups;
      // figure out if the page has a slug and is already in the site catalog
      const isInCatalog = await siteInstance.contains(this.pageId);
      this.shouldMigratePage = !(page.slug && isInCatalog.isContained);
    }
  }
  _renderButton() {
    if (this.shouldMigratePage) {
      // eslint-disable-next-line unicorn/prefer-ternary
      if (this.canMigratePage) {
        return index.h("calcite-button", { appearance: "transparent", onClick: this.handleButtonClick, scale: "s" }, this.intl.t("buttonText"));
      }
      else {
        return index.h(index.Fragment, null, index.h("calcite-icon", { icon: "information", id: "no-access-icon", scale: "s" }), index.h("calcite-tooltip", { label: "Data disclaimer", "reference-element": "no-access-icon" }, index.h("span", null, this.intl.t('noAccess'))));
      }
    }
  }
  renderDialog() {
    if (this.canMigratePage && this.shouldMigratePage) {
      return index.h("arcgis-wormhole", { elAttributes: { unthemed: 'true' }, styles: { "--calcite-dialog-background-color": "#fff" } }, index.h("calcite-dialog", { "escape-disabled": true, heading: this.intl.t("modalHeading"), headingLevel: 3, modal: true, onCalciteDialogClose: this.handleModalClose, open: this.shouldShowModal, "outside-close-disabled": true, scale: "l", widthScale: "l" }, this.shouldShowModal && index.h("arcgis-hub-page-migration-workflow", { onArcgisHubPageMigrationWorkflowClose: this.handleClose, onArcgisHubPageMigrationWorkflowComplete: this.handlePageMigrationWorkflowComplete, pageId: this.pageId, site: this.site })));
    }
  }
  render() {
    return (index.h(index.Host, { "data-element": "hub-page-migration" }, this._renderButton(), this.renderDialog()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubPageMigration.style = arcgisHubPageMigrationCss;

exports.arcgis_hub_page_migration = ArcgisHubPageMigration;
