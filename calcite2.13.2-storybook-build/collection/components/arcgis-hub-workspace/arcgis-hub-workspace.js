import { Host, h } from '@stencil/core';
import { bind } from '../../utils/context';
import { getWorkspaceLinkDefinitions, WORKSPACE_PANES } from '../../utils/workspace';
import { checkPermission, fetchHubEntity, getTypeFromEntity } from '@esri/hub-common';
import { connectContext, getGlobalContext, } from '../../utils/state';
import intlManager from '../../utils/intl-manager';
import { SCREEN_SIZE } from '../../utils/screen';
import { ResizeObserverManager } from '../../utils/resize-observer';
/**
 * The arcgis-hub-workspace is the top-level workspace
 * component responsible for rendering the internal
 * management experience for Hub entities.
 */
export class ArcgisHubWorkspace {
  constructor() {
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
  static get is() { return "arcgis-hub-workspace"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-workspace.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-workspace.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "layout": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "\"default\" | \"inline\"",
          "resolved": "\"default\" | \"inline\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "layout",
        "reflect": false,
        "defaultValue": "\"default\""
      },
      "entity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "HubEntity",
          "resolved": "IHubDiscussion | IHubEvent | IHubGroup | IHubInitiative | IHubPage | IHubProject | IHubSite | IHubSurvey | IHubTemplate | IHubUser",
          "references": {
            "HubEntity": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Hub entity that this workspace is managing.\n\nNote: This component works by providing either\nan entity OR an identifier + type"
        }
      },
      "identifier": {
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
          "text": "The slug or id of a hub entity that this workspace\nis managing.\n\nNote: This component works by providing either\nan entity OR an identifier + type"
        },
        "attribute": "identifier",
        "reflect": false
      },
      "pane": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "WorkspacePane",
          "resolved": "\"catalog\" | \"catalog-content\" | \"catalog-events\" | \"collaborators\" | \"content\" | \"dashboard\" | \"details\" | \"discussion\" | \"events\" | \"followers\" | \"groups\" | \"initiatives\" | \"members\" | \"metrics\" | \"metrics-coming-soon\" | \"overview\" | \"participation\" | \"projects\" | \"registrants\" | \"settings\"",
          "references": {
            "WorkspacePane": {
              "location": "import",
              "path": "../../utils/workspace"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "current workspace pane"
        },
        "attribute": "pane",
        "reflect": false,
        "defaultValue": "\"overview\""
      },
      "site": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubSite",
          "resolved": "IHubSite",
          "references": {
            "IHubSite": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "A reference to the current site entity."
        }
      },
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "HubEntityType",
          "resolved": "\"content\" | \"discussion\" | \"event\" | \"group\" | \"initiative\" | \"initiativeTemplate\" | \"org\" | \"page\" | \"project\" | \"site\" | \"survey\" | \"template\" | \"user\"",
          "references": {
            "HubEntityType": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Hub entity type\n\nNote: this is required if an identifier (rather than\nan entity) is provided"
        },
        "attribute": "type",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "_context": {},
      "isMobile": {},
      "isLoading": {},
      "_entity": {},
      "isDirty": {},
      "attemptedClick": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubWorkspaceAccessDenied",
        "name": "arcgisHubWorkspaceAccessDenied",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IPermissionAccessResponse",
          "resolved": "IPermissionAccessResponse",
          "references": {
            "IPermissionAccessResponse": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }, {
        "method": "arcgisHubWorkspaceSignOut",
        "name": "arcgisHubWorkspaceSignOut",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "arcgisHubWorkspaceEntityDelete",
        "name": "arcgisHubWorkspaceEntityDelete",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "HubEntity",
          "resolved": "IHubDiscussion | IHubEvent | IHubGroup | IHubInitiative | IHubPage | IHubProject | IHubSite | IHubSurvey | IHubTemplate | IHubUser",
          "references": {
            "HubEntity": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }, {
        "method": "arcgisHubWorkspaceEntitySave",
        "name": "arcgisHubWorkspaceEntitySave",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "arcgisHubWorkspaceNavigate",
        "name": "arcgisHubWorkspaceNavigate",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IWorkspaceLinkClicked",
          "resolved": "IWorkspaceLinkClicked",
          "references": {
            "IWorkspaceLinkClicked": {
              "location": "import",
              "path": "../../utils/workspace"
            }
          }
        }
      }, {
        "method": "arcgisHubWorkspaceInitialized",
        "name": "arcgisHubWorkspaceInitialized",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IHubInitializedEventDetail",
          "resolved": "IHubInitializedEventDetail",
          "references": {
            "IHubInitializedEventDetail": {
              "location": "import",
              "path": "../../utils/types"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "identifier",
        "methodName": "handleFetchingPropsChanged"
      }, {
        "propName": "_context",
        "methodName": "handleFetchingPropsChanged"
      }, {
        "propName": "entity",
        "methodName": "handleFetchingPropsChanged"
      }, {
        "propName": "entity",
        "methodName": "handleEntityChange"
      }, {
        "propName": "_entity",
        "methodName": "handle_EntityChange"
      }, {
        "propName": "_context",
        "methodName": "checkEntityAccess"
      }, {
        "propName": "_entity",
        "methodName": "checkEntityAccess"
      }];
  }
  static get listeners() {
    return [{
        "name": "arcgisHubWorkspacePaneEntityDelete",
        "method": "handleWorkspaceEntityDelete",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubWorkspaceHeaderLinkClick",
        "method": "handleWorkspaceLinkClicked",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubUserProfileLinkClick",
        "method": "handleWorkspaceLinkClicked",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubWorkspaceLinkClicked",
        "method": "handleWorkspaceLinkClicked",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubWorkspaceNavigationLinkClick",
        "method": "handleWorkspaceLinkClicked",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubWorkspacePaneInitialized",
        "method": "handlePaneInitialized",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubWorkspaceEntityChange",
        "method": "handleEntityChanged",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubUserProfileSignout",
        "method": "onSignout",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubWorkspaceDirtyStateModalClosed",
        "method": "onDirtyStateModalClosed",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
