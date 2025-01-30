import { h, Fragment } from '@stencil/core';
import { getWorkspaceLinks, getRelativeWorkspacePaneUrl } from '../../../utils/workspace';
import intlManager from '../../../utils/intl-manager';
import { bind } from '../../../utils/context';
import { getCurrentSite } from '../../../utils';
import { getGlobalContext } from '../../../utils/state';
import { logWorkspaceLinkTelemetry } from '../arcgis-hub-workspace-link/utils';
export class ArcgisHubWorkspaceNavigation {
  constructor() {
    this.activePane = 'overview';
    this.entity = undefined;
    this.isMobile = false;
    this.links = [];
    bind(this, '_getWorkspaceLinks', 'onMenuItemSelect', 'handleKeyDown');
  }
  get _context() { return getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this._getWorkspaceLinks();
  }
  async _getWorkspaceLinks() {
    const links = await getWorkspaceLinks(this.entity, this._context);
    // filter out any panes that should be hidden
    // TODO: remove once dashboard pane works from Hub Home
    const site = getCurrentSite();
    const hidePanes = (site === null || site === void 0 ? void 0 : site.isHubHome) ? ['dashboard'] : [];
    this.links = links.filter(link => !hidePanes.includes(link.pane));
  }
  /**
   * Prevents the page from rerouting with the default refresh
   * @param event
   */
  preventRefresh(event) {
    event.preventDefault();
  }
  /**
   * Handle when a menu item is selected
   * @param event
   */
  onMenuItemSelect(event) {
    const el = event.currentTarget;
    const displayOnly = el.hasAttribute('data-display-only');
    if (!displayOnly) {
      const pane = el.getAttribute('data-value');
      this.arcgisHubWorkspaceNavigationLinkClick.emit({ clickEvent: event, pane });
      logWorkspaceLinkTelemetry({ pane, hubTelemetry: this.hubTelemetry });
    }
  }
  /**
   * Allows for pressing enter on the menu item to select it
   * @param evt
   */
  handleKeyDown(evt) {
    var _a;
    evt.preventDefault();
    if (((_a = evt.key) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'enter') {
      this.onMenuItemSelect(evt);
    }
  }
  renderWorkspaceNavigationLink(link, isChild = false) {
    var _a;
    const isActivePane = link.pane === this.activePane;
    const id = `workspace-navigation-${link.pane}`;
    const MenuItem = h("calcite-menu-item", { active: isActivePane, "aria-current": isActivePane ? 'page' : null, "data-display-only": link.displayOnly, "data-value": link.pane, href: !link.displayOnly ? getRelativeWorkspacePaneUrl(link.pane) : undefined, iconFlipRtl: this.intl.direction == "ltr" ? "start" : "end", iconStart: link.icon, id: id, key: link.pane, label: this.intl.t(link.i18nKey), onCalciteMenuItemSelect: this.onMenuItemSelect, onClick: this.preventRefresh, onKeyDown: this.handleKeyDown, open: link.children && link.children.length, slot: isChild ? "submenu-item" : "", text: this.isMobile ? "" : this.intl.t(link.i18nKey) }, ((_a = link.children) === null || _a === void 0 ? void 0 : _a.length) && link.children.map(child => this.renderWorkspaceNavigationLink(child, true)));
    // eslint-disable-next-line unicorn/prefer-ternary
    if (this.isMobile) {
      return h(Fragment, null, MenuItem, h("calcite-tooltip", { referenceElement: id }, h("span", null, this.intl.t(link.i18nKey))));
    }
    else {
      return MenuItem;
    }
  }
  render() {
    return (h("calcite-menu", { class: { 'mobile': this.isMobile }, "data-element": "workspace-navigation", label: this.intl.t('navigation'), layout: "vertical" }, this.links.map(link => this.renderWorkspaceNavigationLink(link))));
  }
  static get is() { return "arcgis-hub-workspace-navigation"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-workspace-navigation.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-workspace-navigation.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "activePane": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "WorkspacePane",
          "resolved": "\"catalog\" | \"catalog-content\" | \"catalog-events\" | \"collaborators\" | \"content\" | \"dashboard\" | \"details\" | \"discussion\" | \"events\" | \"followers\" | \"groups\" | \"initiatives\" | \"members\" | \"metrics\" | \"metrics-coming-soon\" | \"overview\" | \"participation\" | \"projects\" | \"registrants\" | \"settings\"",
          "references": {
            "WorkspacePane": {
              "location": "import",
              "path": "../../../utils/workspace"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "active-pane",
        "reflect": false,
        "defaultValue": "'overview'"
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
          "text": ""
        }
      },
      "isMobile": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "is-mobile",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "links": {}
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
      }, {
        "method": "arcgisHubWorkspaceNavigationLinkClick",
        "name": "arcgisHubWorkspaceNavigationLinkClick",
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
              "path": "../../../utils/workspace"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
}
