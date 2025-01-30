import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { a as fetchPage } from './HubInitiatives-4f4e24ce.js';
import { c as checkPermission } from './checkPermission-6c5be250.js';
import { H as HubSite } from './HubSite-374c57db.js';
import { g as getCatalogGroups } from './getPredicateValues-ef475313.js';
import { a as fetchHubGroup } from './hubSearch-41612481.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './_commonjsHelpers-11ca3be1.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
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
import './get-family-543fac52.js';
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
import './HubError-e26c5610.js';
import './get-with-default-b819d95d.js';
import './OperationError-387ae9ab.js';
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
import './TemplateBusinessRules-0e35d61b.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeFromEntity-e149b61e.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './map-by-a2234e13.js';
import './tslib.es6-9c17e83a.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './Catalog-290f043e.js';
import './ArcGISContextManager-c977211a.js';
import './logger-f8667200.js';
import './encoding-1c5014ff.js';
import './index-0a8fd06b.js';
import './fetch-63549ae7.js';
import './getPropertyMap-10ee9d61.js';
import './events-c59246f8.js';
import './types-db540898.js';
import './registrations-431b9788.js';
import './fetchHubEntity-28d04ab4.js';
import './get-form-json-1d4e3591.js';
import './hostedServiceUtils-f22b023b.js';
import './is-service-ad021db8.js';
import './_deep-map-values-53f8dbd1.js';
import './settings-2d4e159a.js';
import './discussions-api-request-199cae2d.js';
import './request-3e386aeb.js';
import './fetchContent-dbc662af.js';
import './index-edff2d62.js';
import './getLayer-464ff70e.js';
import './getEditorSlug-78023e22.js';
import './unshare-item-from-groups-b09dcce3.js';
import './unshare-item-with-group-b4a3a08f.js';
import './helpers-6692d307.js';
import './get-850c466d.js';
import './share-item-with-group-5711513b.js';
import './update-user-membership-261681cf.js';
import './share-item-to-groups-547b9cd0.js';
import './poll-77a94dfa.js';
import './search-211dee83.js';
import './sharedWith-3ad296b7.js';
import './enrichEntity-a5bc0b4f.js';
import './access-7968589d.js';
import './getEditorConfig-a89f031d.js';
import './deepContains-ff859c50.js';
import './parseContainmentPath-a32e8034.js';
import './updateVersionMetadata-068ede7c.js';
import './merge-objects-5b123ab3.js';
import './channels-2574fd6e.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';

const arcgisHubPageMigrationCss = ":host{display:block}";

const ArcgisHubPageMigration = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubPageMigrationWorkflowComplete = createEvent(this, "arcgisHubPageMigrationWorkflowComplete", 7);
    this.arcgisHubPageMigrationWorkflowClose = createEvent(this, "arcgisHubPageMigrationWorkflowClose", 7);
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
    this.intl = await intlManager.loadIntlForComponent(this.element);
    const context = getGlobalContext();
    if (context) {
      // figure out if the user has the necessary permissions
      const page = await fetchPage(this.pageId, context.requestOptions);
      const canEditPage = checkPermission('hub:page:edit', context, page).access;
      const siteInstance = HubSite.fromJson(this.site, context);
      const groupsByMembership = getCatalogGroups(siteInstance.catalog, context);
      const groupIds = [...groupsByMembership['admin'], ...groupsByMembership['member'], ...groupsByMembership['owner']];
      const groupPromises = groupIds.map(groupId => {
        return fetchHubGroup(groupId, context.hubRequestOptions);
      });
      const groups = await Promise.all(groupPromises);
      const canShareToAnyGroups = groups.some(group => checkPermission('hub:group:shareContent', context, group).access);
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
        return h("calcite-button", { appearance: "transparent", onClick: this.handleButtonClick, scale: "s" }, this.intl.t("buttonText"));
      }
      else {
        return h(Fragment, null, h("calcite-icon", { icon: "information", id: "no-access-icon", scale: "s" }), h("calcite-tooltip", { label: "Data disclaimer", "reference-element": "no-access-icon" }, h("span", null, this.intl.t('noAccess'))));
      }
    }
  }
  renderDialog() {
    if (this.canMigratePage && this.shouldMigratePage) {
      return h("arcgis-wormhole", { elAttributes: { unthemed: 'true' }, styles: { "--calcite-dialog-background-color": "#fff" } }, h("calcite-dialog", { "escape-disabled": true, heading: this.intl.t("modalHeading"), headingLevel: 3, modal: true, onCalciteDialogClose: this.handleModalClose, open: this.shouldShowModal, "outside-close-disabled": true, scale: "l", widthScale: "l" }, this.shouldShowModal && h("arcgis-hub-page-migration-workflow", { onArcgisHubPageMigrationWorkflowClose: this.handleClose, onArcgisHubPageMigrationWorkflowComplete: this.handlePageMigrationWorkflowComplete, pageId: this.pageId, site: this.site })));
    }
  }
  render() {
    return (h(Host, { "data-element": "hub-page-migration" }, this._renderButton(), this.renderDialog()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubPageMigration.style = arcgisHubPageMigrationCss;

export { ArcgisHubPageMigration as arcgis_hub_page_migration };
