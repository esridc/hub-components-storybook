'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const state = require('./state-6637df8c.js');
const intlManager = require('./intl-manager-f0103583.js');
const breadcrumbs = require('./breadcrumbs-ae2ea407.js');
const fetchHubEntity = require('./fetchHubEntity-88467d55.js');
const parseContainmentPath = require('./parseContainmentPath-aaf496c0.js');
const compose = require('./compose-9b4311c9.js');
const context = require('./context-0167a31e.js');
const getWorkspaceLinkDefinitions = require('./getWorkspaceLinkDefinitions-aae57a67.js');
const types = require('./types-ff8f7df0.js');
const screen = require('./screen-9b9fd440.js');
const resizeObserver = require('./resize-observer-4169a5e0.js');
const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');
const checkPermission = require('./checkPermission-11ab5992.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./search-2db68ef4.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./append-custom-params-0f5d0fe2.js');
require('./request-67da3c71.js');
require('./generate-random-string-8807d629.js');
require('./extent-715f7c8d.js');
require('./get-0368c931.js');
require('./tslib.es6-e7faa7f3.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');
require('./slugify-826af07b.js');
require('./HubError-44e07249.js');
require('./get-with-default-d1b1754d.js');
require('./OperationError-902f34ae.js');
require('./object-to-json-blob-5c0a267d.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./fail-safe-33c35b7f.js');
require('./delete-prop-7826ae49.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./get-form-json-e6831b20.js');
require('./HubInitiatives-25ecf40a.js');
require('./_enrichments-a40a3850.js');
require('./helpers-64227739.js');
require('./get-user-5eecc1c4.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getService-b27eda44.js');
require('./types-097b54b1.js');
require('./TemplateBusinessRules-5564c964.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./get-item-home-url-b1e3ff74.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./UserSession-f8bc10c8.js');
require('./get-family-cafa88bb.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
require('./map-by-a7a75788.js');
require('./tslib.es6-b6cfa7d7.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
require('./hostedServiceUtils-236344a8.js');
require('./is-service-9b8238d2.js');
require('./_deep-map-values-d489006b.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./settings-0b8cd93b.js');
require('./discussions-api-request-e9e6e346.js');
require('./request-79b61e92.js');
require('./fetchContent-963f3885.js');
require('./index-ef80ab27.js');
require('./getLayer-0c83b4c1.js');
require('./hubSearch-79d30702.js');
require('./merge-objects-b31af1a3.js');
require('./get-52661c13.js');
require('./search-b00c4c79.js');
require('./channels-bf478342.js');
require('./events-7873340d.js');
require('./registrations-a6dd52b7.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');
require('./fetch-1292fb6b.js');
require('./getPropertyMap-030ec7b2.js');
require('./types-751ad3a9.js');
require('./get-structured-license-4e9f994b.js');

const arcgisHubEntityBreadcrumbsCss = ".sc-arcgis-hub-entity-breadcrumbs-h{display:block}";

const ArcgisHubEntityBreadcrumbs = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.breadcrumbs = [];
    this.path = undefined;
    this.breadcrumbEntries = [];
  }
  get _context() { return state.getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
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
        const entity = await fetchHubEntity.fetchHubEntity(crumb.type, crumb.identifier, context);
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
    const parsedPath = parseContainmentPath.parseContainmentPath(path);
    for (let i = 0; i < parsedPath.parts.length; i += 2) {
      const type = parseContainmentPath.pathMap[parsedPath.parts[i]];
      crumbs.push({
        identifier: parsedPath.parts[i + 1],
        type
      });
    }
    return crumbs;
  }
  getEntityPathFromTypeAndId(type, id) {
    // Reverse the pathMap to get the segment
    const reverseMap = Object.entries(parseContainmentPath.pathMap).reduce((acc, entry) => {
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
      const icon = compose.getContentTypeIcon(crumb.entity.type);
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
    return (index.h(index.Host, { "data-element": "entity-breadcrumbs" }, index.h("calcite-menu", { slot: "content-start" }, index.h(breadcrumbs.Breadcrumbs, { breadcrumbs: this.breadcrumbEntries }))));
  }
  // Temporarily render nothing until we have a solution to some invalid site items
  render() {
    return null;
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubEntityBreadcrumbs.style = arcgisHubEntityBreadcrumbsCss;

const arcgisHubWorkspaceCss = ".sc-arcgis-hub-workspace-h{position:relative;display:block;height:100vh}.workspace__navigation.sc-arcgis-hub-workspace{border-right:1px solid var(--calcite-color-border-1)}.workspace__pane.sc-arcgis-hub-workspace{height:100%;background-color:var(--calcite-color-background)}.skip-nav.sc-arcgis-hub-workspace{position:absolute;top:-60px;left:64px;z-index:-1;background-color:#fff;padding:15px 10px;box-shadow:0 0 2px 2px #333;opacity:0;transition:top 0.5s ease}.skip-nav.sc-arcgis-hub-workspace:focus{opacity:1.0;top:64px;z-index:1036}";

const ArcgisHubWorkspace = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubWorkspaceAccessDenied = index.createEvent(this, "arcgisHubWorkspaceAccessDenied", 7);
    this.arcgisHubWorkspaceSignOut = index.createEvent(this, "arcgisHubWorkspaceSignOut", 7);
    this.arcgisHubWorkspaceEntityDelete = index.createEvent(this, "arcgisHubWorkspaceEntityDelete", 7);
    this.arcgisHubWorkspaceEntitySave = index.createEvent(this, "arcgisHubWorkspaceEntitySave", 7);
    this.arcgisHubWorkspaceNavigate = index.createEvent(this, "arcgisHubWorkspaceNavigate", 7);
    this.arcgisHubWorkspaceInitialized = index.createEvent(this, "arcgisHubWorkspaceInitialized", 7);
    this.shouldFocusPaneContainer = false;
    this._setPaneContainer = (el) => {
      this.paneContainer = el;
    };
    this._context = state.getGlobalContext();
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
    context.bind(this, 'handleWorkspaceLinkClicked', '_setPaneContainer', 'handlePaneInitialized', 'handleResize');
  }
  connectedCallback() {
    state.connectContext(this);
    resizeObserver.ResizeObserverManager.addHandler(this.element, this.handleResize);
  }
  disconnectedCallback() {
    this.disconnectContext();
    resizeObserver.ResizeObserverManager.unobserve(this.element);
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
    this.isMobile = this.element.clientWidth < screen.SCREEN_SIZE.SMALL;
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
      fetchHubEntity.fetchHubEntity(this.type, this.identifier, this._context).then(entity => {
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
      const type = getTypeFromEntity.getTypeFromEntity(this._entity);
      const manageResponse = checkPermission.checkPermission(`hub:${type}:manage`, this._context, this._entity);
      if (!manageResponse.access) {
        // emit access denied event
        this.arcgisHubWorkspaceAccessDenied.emit(manageResponse);
        // TODO: set the (not yet implemented) error state
      }
      else if (!["project", "discussion"].includes(type)) {
        // we support project & discussion board workspaces without needing to opt in
        // if not a project or a discussion board, check that the user has opted in
        const workspacesEnabledResponse = checkPermission.checkPermission("hub:feature:workspace", this._context);
        if (!workspacesEnabledResponse.access) {
          // emit access denied event
          this.arcgisHubWorkspaceAccessDenied.emit(workspacesEnabledResponse);
        }
      }
    }
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
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
    return this.type || getTypeFromEntity.getTypeFromEntity(this.entity);
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
    if (!types.WORKSPACE_PANES.includes(this.pane)) {
      return 'arcgis-hub-workspace-missing-pane';
    }
    const workspaceLinkDefinitions = getWorkspaceLinkDefinitions.getWorkspaceLinkDefinitions(this._type);
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
    return index.h("arcgis-hub-workspace-header", { class: "workspace__header", entity: this._entity, isDirty: this.isDirty, isMobile: this.isMobile, layout: this.layout, site: this.site, slot: "header" });
  }
  ;
  renderNavigation() {
    return (index.h("div", { class: "workspace__navigation", slot: "panel-start" }, index.h("slot", { name: "workspace-navigation" }, index.h("arcgis-hub-workspace-navigation", { activePane: this.pane, entity: this._entity, isMobile: this.isMobile }))));
  }
  ;
  renderPane() {
    const Component = this.paneComponent;
    return (index.h("div", { class: "workspace__pane", id: "workspace-pane", ref: this._setPaneContainer, role: "group", tabindex: -1 }, index.h(Component, { entity: this._entity, isMobile: this.isMobile, pane: this.pane })));
  }
  renderFooter() {
    if (!this.isMobile) {
      return index.h("arcgis-hub-product-footer", { isMobile: this.isMobile, slot: "footer" });
    }
  }
  renderDirtyStateModal() {
    var _a, _b;
    return this.shouldShowDirtyStateModal
      ? index.h("arcgis-hub-workspace-dirty-state-modal", { href: (_a = this.attemptedClick) === null || _a === void 0 ? void 0 : _a.href, "is-open": true, pane: (_b = this.attemptedClick) === null || _b === void 0 ? void 0 : _b.pane })
      : null;
  }
  render() {
    // TODO: Loader should be representative of the UX being loaded
    return (this.isLoading || !this._entity
      ? index.h("arcgis-skeleton-loader", { active: true, class: "workspace__loader", rows: 3, "show-heading": "true" })
      : index.h(index.Host, { "data-element": "workspace", unthemed: true }, index.h("a", { class: "skip-nav", href: "#workspace-pane" }, this.intl.t('skipNav')), index.h("calcite-shell", null, this.renderHeader(), this.renderNavigation(), this.renderPane(), this.renderFooter()), this.renderDirtyStateModal()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "identifier": ["handleFetchingPropsChanged"],
    "_context": ["handleFetchingPropsChanged", "checkEntityAccess"],
    "entity": ["handleFetchingPropsChanged", "handleEntityChange"],
    "_entity": ["handle_EntityChange", "checkEntityAccess"]
  }; }
};
ArcgisHubWorkspace.style = arcgisHubWorkspaceCss;

exports.arcgis_hub_entity_breadcrumbs = ArcgisHubEntityBreadcrumbs;
exports.arcgis_hub_workspace = ArcgisHubWorkspace;
