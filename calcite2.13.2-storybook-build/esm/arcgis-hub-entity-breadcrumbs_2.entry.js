import { r as registerInstance, h, H as Host, a as getElement, c as createEvent } from './index-57f71b44.js';
import { g as getGlobalContext, h as connectContext } from './state-31a09db0.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { B as Breadcrumbs } from './breadcrumbs-29b5f623.js';
import { f as fetchHubEntity } from './fetchHubEntity-28d04ab4.js';
import { p as parseContainmentPath, a as pathMap } from './parseContainmentPath-a32e8034.js';
import { u as getContentTypeIcon } from './compose-d5b83ab7.js';
import { b as bind } from './context-7d8f7366.js';
import { g as getWorkspaceLinkDefinitions } from './getWorkspaceLinkDefinitions-6ee1781a.js';
import { W as WORKSPACE_PANES } from './types-dca4cb90.js';
import { S as SCREEN_SIZE } from './screen-4768262d.js';
import { R as ResizeObserverManager } from './resize-observer-dc6e269e.js';
import { g as getTypeFromEntity } from './getTypeFromEntity-e149b61e.js';
import { c as checkPermission } from './checkPermission-6c5be250.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './_commonjsHelpers-11ca3be1.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './search-c7a57aa9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './append-custom-params-4bd856e5.js';
import './request-fa80ae40.js';
import './generate-random-string-1436d9e6.js';
import './extent-34a4ba2a.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
import './slugify-e3e67bac.js';
import './HubError-e26c5610.js';
import './get-with-default-b819d95d.js';
import './OperationError-387ae9ab.js';
import './object-to-json-blob-583ae5c3.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './fail-safe-cd1a5a2a.js';
import './delete-prop-bd13d424.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './get-form-json-1d4e3591.js';
import './HubInitiatives-4f4e24ce.js';
import './_enrichments-8641475c.js';
import './helpers-8c7e5e31.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './types-2eaa1a18.js';
import './TemplateBusinessRules-0e35d61b.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './get-item-home-url-b414b731.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './get-family-543fac52.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './map-by-a2234e13.js';
import './tslib.es6-9c17e83a.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
import './hostedServiceUtils-f22b023b.js';
import './is-service-ad021db8.js';
import './_deep-map-values-53f8dbd1.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './settings-2d4e159a.js';
import './discussions-api-request-199cae2d.js';
import './request-3e386aeb.js';
import './fetchContent-dbc662af.js';
import './index-edff2d62.js';
import './getLayer-464ff70e.js';
import './hubSearch-41612481.js';
import './merge-objects-5b123ab3.js';
import './get-850c466d.js';
import './search-211dee83.js';
import './channels-2574fd6e.js';
import './events-c59246f8.js';
import './registrations-431b9788.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';
import './fetch-63549ae7.js';
import './getPropertyMap-10ee9d61.js';
import './types-db540898.js';
import './get-structured-license-33306790.js';

const arcgisHubEntityBreadcrumbsCss = ".sc-arcgis-hub-entity-breadcrumbs-h{display:block}";

const ArcgisHubEntityBreadcrumbs = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.breadcrumbs = [];
    this.path = undefined;
    this.breadcrumbEntries = [];
  }
  get _context() { return getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * When the component is about to render, construct the breadcrumbs
   */
  async componentWillRender() {
    // Prefer the breadcrumbs prop, but fall back to the path prop
    if (this.breadcrumbs.length > 0) {
      this.breadcrumbEntries = await this.buildBreadcrumbsFromArray(this.breadcrumbs, this._context);
    }
    else if (this.path) {
      this.breadcrumbEntries = await this.buildBreadcrumbsFromPath(this.path, this._context);
    }
    else {
      this.breadcrumbEntries = [];
    }
  }
  /**
   * Given a path like `/projects/:identifier`, construct the breadcrumbs
   * @param path
   * @param context
   * @returns
   */
  async buildBreadcrumbsFromPath(path, context) {
    const crumbs = this.constructCrumbsFromPath(path);
    return await this.buildBreadcrumbsFromArray(crumbs, context);
  }
  /**
   * Given an array of IHubBreadcrumb, construct the breadcrumb entries
   * @param crumbs
   * @param context
   * @returns
   */
  async buildBreadcrumbsFromArray(crumbs, context) {
    const crumbEntities = await this.fetchCrumbEntities(crumbs, context);
    return this.constructBreadcrumbs(crumbEntities);
  }
  /**
   * Iterate an array of IHubBreadcrumb and fetch the entity for each
   * if not already present
   * @param crumbs
   * @param context
   * @returns
   */
  async fetchCrumbEntities(crumbs, context) {
    return crumbs = await Promise.all(crumbs.map(async (crumb) => {
      if (crumb.entity) {
        return Promise.resolve(crumb);
      }
      else {
        // fetcht the entity, attach to the crumb and return
        const entity = await fetchHubEntity(crumb.type, crumb.identifier, context);
        return Object.assign(Object.assign({}, crumb), { entity });
      }
    }));
  }
  /**
   * Convert a path like `/projects/:identifier` into an IHubBreadcrumb[]
   * which is then used to construct the breadcrumb entries
   * @param path
   * @returns
   */
  constructCrumbsFromPath(path) {
    const crumbs = [];
    const parsedPath = parseContainmentPath(path);
    for (let i = 0; i < parsedPath.parts.length; i += 2) {
      const type = pathMap[parsedPath.parts[i]];
      crumbs.push({
        identifier: parsedPath.parts[i + 1],
        type
      });
    }
    return crumbs;
  }
  getEntityPathFromTypeAndId(type, id) {
    // Reverse the pathMap to get the segment
    const reverseMap = Object.entries(pathMap).reduce((acc, entry) => {
      const [key, value] = entry;
      acc[value] = key;
      return acc;
    }, {});
    return `/${reverseMap[type]}/${id}`;
  }
  /**
   * Construct the breadcrumb entries from an array of IHubBreadcrumb
   * These are the objects used to render the actual breadcrumbs
   * @param crumbs
   * @returns
   */
  constructBreadcrumbs(crumbs) {
    let path = "";
    return crumbs.map((crumb, idx, arr) => {
      var _a, _b;
      const icon = getContentTypeIcon(crumb.entity.type);
      let url = (_a = crumb.entity.links) === null || _a === void 0 ? void 0 : _a.siteRelative;
      // for any entry that's neighter the first or lest, we need to the path param
      // to the url
      if (idx > 1 && idx < arr.length - 1) {
        const previous = arr[idx - 1];
        path = `${path}${this.getEntityPathFromTypeAndId(previous.type, previous.identifier)}`;
        url = `${url}?path=${path}`;
      }
      let title = crumb.entity.name || crumb.identifier;
      const label = crumb.entity.name || crumb.identifier;
      // If this is a site, we want to link to the site home, which is the self link
      if (crumb.type === "site") {
        url = (_b = crumb.entity.links) === null || _b === void 0 ? void 0 : _b.self;
        // Add the port so this works in dev mode
        if (window.location.port) {
          url = `${url}:${window.location.port}`;
        }
        // And the label should be "Home"
        title = this.intl.t('home');
      }
      return {
        label,
        icon,
        link: url,
        title
      };
    });
  }
  renderBreadcrumbs() {
    if (this.breadcrumbEntries.length === 0) {
      return null;
    }
    return (h(Host, { "data-element": "entity-breadcrumbs" }, h("calcite-menu", { slot: "content-start" }, h(Breadcrumbs, { breadcrumbs: this.breadcrumbEntries }))));
  }
  // Temporarily render nothing until we have a solution to some invalid site items
  render() {
    return null;
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubEntityBreadcrumbs.style = arcgisHubEntityBreadcrumbsCss;

const arcgisHubWorkspaceCss = ".sc-arcgis-hub-workspace-h{position:relative;display:block;height:100vh}.workspace__navigation.sc-arcgis-hub-workspace{border-right:1px solid var(--calcite-color-border-1)}.workspace__pane.sc-arcgis-hub-workspace{height:100%;background-color:var(--calcite-color-background)}.skip-nav.sc-arcgis-hub-workspace{position:absolute;top:-60px;left:64px;z-index:-1;background-color:#fff;padding:15px 10px;box-shadow:0 0 2px 2px #333;opacity:0;transition:top 0.5s ease}.skip-nav.sc-arcgis-hub-workspace:focus{opacity:1.0;top:64px;z-index:1036}";

const ArcgisHubWorkspace = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubWorkspaceAccessDenied = createEvent(this, "arcgisHubWorkspaceAccessDenied", 7);
    this.arcgisHubWorkspaceSignOut = createEvent(this, "arcgisHubWorkspaceSignOut", 7);
    this.arcgisHubWorkspaceEntityDelete = createEvent(this, "arcgisHubWorkspaceEntityDelete", 7);
    this.arcgisHubWorkspaceEntitySave = createEvent(this, "arcgisHubWorkspaceEntitySave", 7);
    this.arcgisHubWorkspaceNavigate = createEvent(this, "arcgisHubWorkspaceNavigate", 7);
    this.arcgisHubWorkspaceInitialized = createEvent(this, "arcgisHubWorkspaceInitialized", 7);
    this.shouldFocusPaneContainer = false;
    this._setPaneContainer = (el) => {
      this.paneContainer = el;
    };
    this._context = getGlobalContext();
    this.isMobile = false;
    this.layout = "default";
    this.entity = undefined;
    this.identifier = undefined;
    this.pane = "overview";
    this.site = undefined;
    this.type = undefined;
    this.isLoading = undefined;
    this._entity = undefined;
    this.isDirty = false;
    this.attemptedClick = undefined;
    bind(this, 'handleWorkspaceLinkClicked', '_setPaneContainer', 'handlePaneInitialized', 'handleResize');
  }
  connectedCallback() {
    connectContext(this);
    ResizeObserverManager.addHandler(this.element, this.handleResize);
  }
  disconnectedCallback() {
    this.disconnectContext();
    ResizeObserverManager.unobserve(this.element);
  }
  async handleResize() {
    // window.screen.width... does not change with zoom
    // const sizeProp = isPortrait ? 'width' : 'height';
    // this.isMobile = window.screen[sizeProp] < SCREEN_SIZE.SMALL;
    // this.element.clientWidth... changes with zoom (as does window.innerWidth)
    // so this can be triggered by zooming in/out
    // but i think that is ok because what we are interested in is,
    // "how much real estate do we have to work with"
    // but brolly does not want a "short" screen height to trigger it...
    // this.isMobile = Math.min(this.element.clientWidth, this.element.clientHeight) < SCREEN_SIZE.SMALL;
    // so:
    this.isMobile = this.element.clientWidth < SCREEN_SIZE.SMALL;
  }
  dispatchInitializedEvent() {
    if (this._entity && this.intl) {
      let title;
      switch (this._type) {
        case 'user':
          const orgName = this._context.portal.name;
          title = this.intl.t('pageTitle.user', { orgName });
          break;
        case 'group':
          const groupName = this._entity.name;
          title = this.intl.t('pageTitle.group', { groupName });
          break;
        default:
          const entityName = this._entity.name;
          title = this.intl.t('pageTitle.default', { entityName });
      }
      this.arcgisHubWorkspaceInitialized.emit({
        entity: this._entity,
        meta: [],
        title
      });
    }
  }
  // "Pane Events" that are re-emitted to appease react + typescript
  handleWorkspaceEntityDelete(evt) {
    this.arcgisHubWorkspaceEntityDelete.emit(evt.detail);
  }
  handleWorkspaceLinkClicked(evt) {
    // stop the arcgisHubXyzLinkClicked event from bubbling
    evt.stopImmediatePropagation();
    const { detail, target } = evt;
    const isDirtyStateModalOkClick = target.tagName === 'ARCGIS-HUB-WORKSPACE-DIRTY-STATE-MODAL';
    if (isDirtyStateModalOkClick) {
      // user is OK w/ navigating away and losing changes
      // clear the dirty state
      this.isDirty = false;
      // close the dirty state modal
      this.attemptedClick = null;
    }
    // determine how to handle the click
    let cancel = false;
    if (this.isDirty) {
      // don't allow navigation away while in a dirty state
      cancel = true;
      // and show dirty state modal
      this.attemptedClick = detail;
    }
    else {
      // not in a dirty state
      const { pane } = detail;
      if (pane) {
        // we handle pane navigation w/in this component
        this.pane = pane;
        cancel = true;
      }
      // either way, we emit the navigate event
      // so that the consuming application can either:
      // pane - update the router to match the updated pane above
      // href - handle internal links as route transitions rather than full page loads
      this.arcgisHubWorkspaceNavigate.emit(detail);
      this.shouldFocusPaneContainer = true;
    }
    if (cancel) {
      // either we're in a dirty state
      // or we've already navigated to the pane
      // so we don't want the underlying click event to go through
      const { clickEvent } = detail;
      clickEvent.preventDefault();
      clickEvent.stopPropagation();
    }
  }
  handlePaneInitialized() {
    if (this.shouldFocusPaneContainer) {
      this.paneContainer && this.paneContainer.focus();
      this.shouldFocusPaneContainer = false;
    }
  }
  handleEntityChanged(evt) {
    // stop the arcgisHubWorkspaceEntityChange event from bubbling
    evt.stopImmediatePropagation();
    // determine how to handle the change
    const didSave = !evt.detail.isDirty;
    if (didSave) {
      // changes were saved, so we need to re-fetch the entity
      // NOTE: dirty state will be reset after the entity is fetched and set
      if (this._isSelfFetching) {
        this.fetchEntity();
      }
      else {
        // tell parent to refetch the entity
        this.arcgisHubWorkspaceEntitySave.emit();
      }
    }
    else {
      // changes weren't saved, so the workspace is dirty
      this.isDirty = true;
    }
  }
  onSignout() {
    this.arcgisHubWorkspaceSignOut.emit();
  }
  onDirtyStateModalClosed() {
    // hide the dirty state modal
    this.attemptedClick = null;
  }
  /**
   * This component works by allowing the consumer to provide either:
   * 1. a full entity (HubEntity)
   * 2. an entity type and identifier - in this case, we fetch the
   * HubEntity based on the provided information
   *
   * We store the provided or fetched HubEntity on the internal
   * _entity state property
   */
  async handleFetchingPropsChanged() {
    if (this._context && !this.entity && this.identifier) {
      await this.fetchEntity({ showLoading: true });
      this.dispatchInitializedEvent();
    }
  }
  /**
   * Fetches the workspace's entity and populates the internal _entity state property.
   * Fetches can trigger the loading UI (e.g., on initial startup) or be silent (e.g.,
   * refreshing after an entity has been updated)
   * @param showLoading
   */
  async fetchEntity(opts = {}) {
    opts.showLoading && (this.isLoading = true);
    try {
      fetchHubEntity(this.type, this.identifier, this._context).then(entity => {
        this._entity = Object.assign(entity);
      });
    }
    catch (e) {
      console.error(`Error fetching entity ${this.identifier}: ${e}`);
    }
    finally {
      opts.showLoading && (this.isLoading = false);
    }
  }
  /**
   * We need to watch the provided HubEntity so we can reset the
   * internal _entity state property if it changes
   */
  handleEntityChange() {
    this._entity = this.entity;
    this.dispatchInitializedEvent();
  }
  handle_EntityChange() {
    // clear the dirty state
    this.isDirty = false;
  }
  checkEntityAccess() {
    if (this._context && this._entity) {
      const type = getTypeFromEntity(this._entity);
      const manageResponse = checkPermission(`hub:${type}:manage`, this._context, this._entity);
      if (!manageResponse.access) {
        // emit access denied event
        this.arcgisHubWorkspaceAccessDenied.emit(manageResponse);
        // TODO: set the (not yet implemented) error state
      }
      else if (!["project", "discussion"].includes(type)) {
        // we support project & discussion board workspaces without needing to opt in
        // if not a project or a discussion board, check that the user has opted in
        const workspacesEnabledResponse = checkPermission("hub:feature:workspace", this._context);
        if (!workspacesEnabledResponse.access) {
          // emit access denied event
          this.arcgisHubWorkspaceAccessDenied.emit(workspacesEnabledResponse);
        }
      }
    }
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    // initialize the entity from the provided props
    this.handleEntityChange();
    this.handleFetchingPropsChanged();
  }
  /**
   * As described above, this component works by providing either:
   * 1. a full entity (HubEntity)
   * 2. an entity type and identifier
   *
   * since type is only optionally provided, we need an internal
   * _type property that's either the provided type or derived
   * from the provided entity
   */
  get _type() {
    return this.type || getTypeFromEntity(this.entity);
  }
  /**
   * if a component is not defined in the entity's link definitions,
   * we should fall back to the pane default
   */
  get defaultPaneComponents() {
    return {
      overview: 'arcgis-hub-entity-overview',
      details: 'arcgis-hub-entity-details',
      settings: 'arcgis-hub-entity-settings',
    };
  }
  get paneComponent() {
    if (!WORKSPACE_PANES.includes(this.pane)) {
      return 'arcgis-hub-workspace-missing-pane';
    }
    const workspaceLinkDefinitions = getWorkspaceLinkDefinitions(this._type);
    // recursively search for the component to render
    const findComponent = (linkDefinitions) => {
      var _a;
      for (const linkDef of linkDefinitions) {
        if (linkDef.pane === this.pane) {
          return linkDef.component;
        }
        if ((_a = linkDef.children) === null || _a === void 0 ? void 0 : _a.length) {
          const childComponent = findComponent(linkDef.children);
          if (childComponent) {
            return childComponent;
          }
        }
      }
      return null;
    };
    const component = findComponent(workspaceLinkDefinitions);
    return component || this.defaultPaneComponents[this.pane];
  }
  get shouldShowDirtyStateModal() {
    return !!this.attemptedClick;
  }
  // if parent passed in an identifier instead of an entity
  // this component is responsible for (re)fetching the entity
  get _isSelfFetching() {
    return !this.entity && !!this.identifier;
  }
  renderHeader() {
    return h("arcgis-hub-workspace-header", { class: "workspace__header", entity: this._entity, isDirty: this.isDirty, isMobile: this.isMobile, layout: this.layout, site: this.site, slot: "header" });
  }
  ;
  renderNavigation() {
    return (h("div", { class: "workspace__navigation", slot: "panel-start" }, h("slot", { name: "workspace-navigation" }, h("arcgis-hub-workspace-navigation", { activePane: this.pane, entity: this._entity, isMobile: this.isMobile }))));
  }
  ;
  renderPane() {
    const Component = this.paneComponent;
    return (h("div", { class: "workspace__pane", id: "workspace-pane", ref: this._setPaneContainer, role: "group", tabindex: -1 }, h(Component, { entity: this._entity, isMobile: this.isMobile, pane: this.pane })));
  }
  renderFooter() {
    if (!this.isMobile) {
      return h("arcgis-hub-product-footer", { isMobile: this.isMobile, slot: "footer" });
    }
  }
  renderDirtyStateModal() {
    var _a, _b;
    return this.shouldShowDirtyStateModal
      ? h("arcgis-hub-workspace-dirty-state-modal", { href: (_a = this.attemptedClick) === null || _a === void 0 ? void 0 : _a.href, "is-open": true, pane: (_b = this.attemptedClick) === null || _b === void 0 ? void 0 : _b.pane })
      : null;
  }
  render() {
    // TODO: Loader should be representative of the UX being loaded
    return (this.isLoading || !this._entity
      ? h("arcgis-skeleton-loader", { active: true, class: "workspace__loader", rows: 3, "show-heading": "true" })
      : h(Host, { "data-element": "workspace", unthemed: true }, h("a", { class: "skip-nav", href: "#workspace-pane" }, this.intl.t('skipNav')), h("calcite-shell", null, this.renderHeader(), this.renderNavigation(), this.renderPane(), this.renderFooter()), this.renderDirtyStateModal()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "identifier": ["handleFetchingPropsChanged"],
    "_context": ["handleFetchingPropsChanged", "checkEntityAccess"],
    "entity": ["handleFetchingPropsChanged", "handleEntityChange"],
    "_entity": ["handle_EntityChange", "checkEntityAccess"]
  }; }
};
ArcgisHubWorkspace.style = arcgisHubWorkspaceCss;

export { ArcgisHubEntityBreadcrumbs as arcgis_hub_entity_breadcrumbs, ArcgisHubWorkspace as arcgis_hub_workspace };
