import { capitalize, getTypeFromEntity } from '@esri/hub-common';
import { Host, h } from '@stencil/core';
import { ViewTabs } from './types';
import { fetchAssociatedEntitiesCount, getViews } from './utils';
import { getGlobalContext } from '../../utils/state';
import { ABOUT_VIEWS, HERO_VIEWS } from './config';
import intlManager from '../../utils/intl-manager';
import { isReducedMotion } from '../../utils/is-reduced-motion';
import { bind } from '../../utils/context';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { ResizeObserverManager } from '../../utils/resize-observer';
export class ArcgisHubEntityView {
  constructor() {
    this.view = ViewTabs.Overview;
    this.entity = undefined;
    this.path = "";
    this.isMobile = undefined;
    this.mode = 'default';
    this._hasAboutSlot = false;
    this._typeSpecificViews = [];
    bind(this, 'handleTabChange', 'handleResize');
  }
  get _context() { return getGlobalContext(); }
  async init() {
    if (!this.entity) {
      return;
    }
    // fetch the type-specific views
    this._typeSpecificViews = await getViews(this.entity, this._context, { path: this.path });
    // augment them with contentCount
    this._typeSpecificViews = await Promise.all(this._typeSpecificViews.map(async (view) => {
      const contentCount = await fetchAssociatedEntitiesCount(this.entity, view.name, this._context);
      return Object.assign(Object.assign({}, view), { contentCount });
    }));
  }
  get entityType() {
    return getTypeFromEntity(this.entity);
  }
  connectedCallback() {
    ResizeObserverManager.addHandler(this.element, this.handleResize);
  }
  disconnectedCallback() {
    ResizeObserverManager.unobserve(this.element);
  }
  async handleResize() {
    this.isMobile = this.element.clientWidth < 560;
  }
  async componentWillLoad() {
    this._hasAboutSlot = !!this.element.querySelector('[slot="about"]');
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.init();
  }
  /**
   * About component to display in the Overview tab,
   * either the default entity about or a type-specific about
   */
  get aboutComponent() {
    const entry = ABOUT_VIEWS.find(entry => entry.entities.includes(this.entityType));
    return entry ? entry.component : 'arcgis-hub-entity-about';
  }
  /**
   * Views are rendered in tabs and in the future will be user-configurable.
   * At this time we generate the view definitions based on the type but once
   * we enable configurablity, we will pull the configured views from the entity.
   */
  get views() {
    // 1. add the about view
    let views = [{
        name: 'about',
        i18nLabel: 'tabs.overview',
        component: this.aboutComponent,
        props: {
          path: this.path
        }
      }];
    // 3. add the type specific views
    views = [...views, ...this._typeSpecificViews];
    return views;
  }
  get hasViews() {
    return !!this.views.length;
  }
  /**
   * Hero component to display at the top of the view,
   * either the default entity hero or a type-specific hero
   */
  get heroComponent() {
    const entry = HERO_VIEWS.find(entry => entry.entities.includes(this.entityType));
    return entry ? entry.component : 'arcgis-hub-entity-hero';
  }
  /** This is needed for clicks from the about pane */
  handleTabChange(evt) {
    var _a;
    evt.stopPropagation();
    // We need to use evt.detail?.target from the listener because its an event that is emitting
    // an event. However we are also using this for onCalciteTabsActivate which uses evt.target
    const target = ((_a = evt.detail) === null || _a === void 0 ? void 0 : _a.target) || evt.target;
    const tab = target.tab || target.getAttribute('data-tab');
    const scroll = !!target.getAttribute('data-scroll');
    this.view = tab;
    if (scroll) {
      // Scroll back up to the top when switching
      this.element.scrollIntoView({ behavior: isReducedMotion() ? 'auto' : 'smooth' });
    }
    // This is a temporary measure as we don't know yet if we are sticking with overview or about.
    const dictTabName = tab === 'about' ? 'overview' : tab;
    this.hubTelemetry.emit(Object.assign({ label: capitalize(dictTabName) }, (dictionary.category.navigation.action.onPage.label[dictTabName] || dictionary.category.navigation.action.onPage)));
  }
  renderViewName(view) {
    // return this.intl.t(view.i18nLabel);
    const i18nKey = (view.contentCount !== undefined) ? `${view.i18nLabel}WithCount` : view.i18nLabel;
    return this.intl.t(i18nKey, { count: view.contentCount });
  }
  renderViews() {
    if (this.hasViews) {
      return (h("calcite-tabs", { scale: "l" }, h("calcite-tab-nav", { slot: "title-group" }, this.views.map((view, idx) => (h("calcite-tab-title", { key: idx, name: view.name, onCalciteTabsActivate: this.handleTabChange, selected: this.view === view.name, tab: view.name }, this.renderViewName(view))))), this.views.map((vw, idx) => {
        var _a;
        const Comp = vw.component;
        return (h("calcite-tab", { key: idx, name: vw.name, tab: vw.name }, h(Comp, Object.assign({ entity: this.entity, isMobile: this.isMobile, path: (_a = vw.props) === null || _a === void 0 ? void 0 : _a.path }, vw.props))));
      })));
    }
  }
  renderHero() {
    const HeroComp = this.heroComponent;
    const props = {
      showEdit: false
    };
    if (this.mode === 'inline') {
      props.showEdit = true;
    }
    return (h(HeroComp, Object.assign({ entity: this.entity }, props)));
  }
  render() {
    return (this.entity && h(Host, { "data-element": `entity-view-${this.view}` }, h("slot", { name: "breadcrumbs" }), this.renderHero(), h("slot", { name: "about", slot: this._hasAboutSlot ? "about" : "" }), this.renderViews(), h("slot", { name: "footer" })));
  }
  static get is() { return "arcgis-hub-entity-view"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-view.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-view.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "view": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "ViewTabs",
          "resolved": "ViewTabs.Content | ViewTabs.Initiatives | ViewTabs.Members | ViewTabs.Metrics | ViewTabs.Overview | ViewTabs.Projects",
          "references": {
            "ViewTabs": {
              "location": "import",
              "path": "./types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "View tab to land on"
        },
        "attribute": "view",
        "reflect": false,
        "defaultValue": "ViewTabs.Overview"
      },
      "entity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Exclude<HubEntity, IHubGroup | IHubUser>",
          "resolved": "IHubDiscussion | IHubEvent | IHubInitiative | IHubPage | IHubProject | IHubSite | IHubSurvey | IHubTemplate",
          "references": {
            "Exclude": {
              "location": "global"
            },
            "HubEntity": {
              "location": "import",
              "path": "@esri/hub-common"
            },
            "IHubGroup": {
              "location": "import",
              "path": "@esri/hub-common"
            },
            "IHubUser": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The entity to display"
        }
      },
      "path": {
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
          "text": "Content Hierarchy Path used to display breadcrumbs aand construct links.\nThis is passed into the workspace so that it can be passed into any galleries\nor other components that need to know the current path so they can construct\nlinks that go another level deeper"
        },
        "attribute": "path",
        "reflect": false,
        "defaultValue": "\"\""
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
          "text": "Whether or not we are viewing in mobile"
        },
        "attribute": "is-mobile",
        "reflect": false
      },
      "mode": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'default' | 'inline'",
          "resolved": "\"default\" | \"inline\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "`\nOnly used in the arcgis-hub-entity-view-wrapper component which\nis designed so that the view and workspace can be displayed on the same route"
        },
        "attribute": "mode",
        "reflect": false,
        "defaultValue": "'default'"
      }
    };
  }
  static get states() {
    return {
      "_hasAboutSlot": {},
      "_typeSpecificViews": {}
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
  static get watchers() {
    return [{
        "propName": "entity",
        "methodName": "init"
      }];
  }
  static get listeners() {
    return [{
        "name": "arcgisHubEntityAboutTabChange",
        "method": "handleTabChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
