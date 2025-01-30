import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { b as bind } from './context-7d8f7366.js';
import { V as ViewTabs } from './types-cd0b60e2.js';
import { d as getAssociatedEntitiesQuery } from './getAssociatedEntitiesQuery-a2536649.js';
import { h as hubSearch } from './hubSearch-41612481.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './_commonjsHelpers-11ca3be1.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './getTypeFromEntity-e149b61e.js';
import './get-family-543fac52.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './request-fa80ae40.js';
import './append-custom-params-4bd856e5.js';
import './tslib.es6-9c17e83a.js';
import './HubError-e26c5610.js';
import './get-with-default-b819d95d.js';
import './OperationError-387ae9ab.js';
import './HubInitiatives-4f4e24ce.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './search-c7a57aa9.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './helpers-8c7e5e31.js';
import './generate-random-string-1436d9e6.js';
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
import './TemplateBusinessRules-0e35d61b.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './map-by-a2234e13.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
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

/**
 * max number of associated initiatives to render on the project view
 * before revealing the overflow pattern ("Explore associations" button
 * + "Initiatives" tab with full gallery of associated initiatives)
 */
const FEATURED_ASSOCIATED_INITIATIVES_MAX = 5;
/**
 * Callback fn to pass into the associated initiatives gallery
 * to modify the card view models
 *
 * @param model - card view model
 * @param _layout - card layout
 * @param _context - contextual portal & auth information
 * @param _result - raw search result
 * @returns {IHubCardViewModel}
 */
const associatedInitiativesGalleryCallback = (model, _layout, _context, _result) => {
  // 1. set the summary to undefined so that it doesn't render
  // beneath the title
  model.summary = undefined;
  return model;
};

const arcgisHubProjectAboutCss = ".project-about__initiatives.sc-arcgis-hub-project-about calcite-button.sc-arcgis-hub-project-about{margin-top:1.5rem}h2.sc-arcgis-hub-project-about{margin:0 0 0.75rem 0;font-size:var(--calcite-font-size-2);line-height:1.5rem;font-weight:var(--calcite-font-weight-bold)}";

const ArcgisHubProjectAbout = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubEntityAboutTabChange = createEvent(this, "arcgisHubEntityAboutTabChange", 7);
    this.entity = undefined;
    this.path = "";
    this._associatedInitiativesCount = 0;
    bind(this, 'handleTabChange');
  }
  async init() {
    // NOTE: if the current user does not have access to the related initiative, this will fail
    try {
      // 1. build the query to fetch the project's associated initiatives
      this._associatedInitiativesQuery = this.project && await getAssociatedEntitiesQuery(this.project, "initiative", this._context);
      // 2. fetch the project's associated initiatives to get the total count -
      // we use this to conditionally render the "Associated Initiatives" section
      // and overflow pattern when there are > 5 associated initiatives
      if (this._associatedInitiativesQuery) {
        const { total } = await hubSearch(this._associatedInitiativesQuery, { requestOptions: this._context.hubRequestOptions });
        this._associatedInitiativesCount = total;
      }
    }
    catch (error) {
      // swallow it
    }
  }
  /** global context: contextual portal & auth information */
  get _context() { return getGlobalContext(); }
  get project() {
    return this.entity;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.init();
  }
  handleTabChange(evt) {
    this.arcgisHubEntityAboutTabChange.emit(evt);
  }
  /**
   * Renders associated initiatives of the project
   * Renders at max 4 -- if there are more, then we
   * render a button to explore all initiatives
   */
  renderAssociatedInitiatives() {
    return (h("div", { class: "project-about__initiatives" }, h("h2", null, this.intl.t('associatedInitiatives')), h("arcgis-hub-gallery", { callback: associatedInitiativesGalleryCallback, limit: FEATURED_ASSOCIATED_INITIATIVES_MAX, linkTarget: "siteRelative", path: this.path, query: this._associatedInitiativesQuery, showAdditionalInfo: false, showOwner: false, showThumbnail: false, showType: false }), h("calcite-button", { appearance: "outline", "data-scroll": "scroll", "data-tab": ViewTabs.Initiatives, onClick: this.handleTabChange, round: true }, this.intl.t("exploreAssociations"))));
  }
  render() {
    return (h(Host, { "data-element": "project-about" }, h("arcgis-hub-entity-about", { entity: this.entity, path: this.path }, h("div", { slot: "sidebar" }, this._associatedInitiativesCount > 0 && this.renderAssociatedInitiatives()))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "entity": ["init"]
  }; }
};
ArcgisHubProjectAbout.style = arcgisHubProjectAboutCss;

export { ArcgisHubProjectAbout as arcgis_hub_project_about };
