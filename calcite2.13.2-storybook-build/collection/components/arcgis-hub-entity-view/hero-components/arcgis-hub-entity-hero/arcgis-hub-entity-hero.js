var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { bBoxToExtent, checkPermission, getEntityThumbnailUrl, getTypeFromEntity, processActionLinks } from '@esri/hub-common';
import { Host, h, Fragment } from '@stencil/core';
import { getGlobalContext } from '../../../../utils/state';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import Graphic from '@arcgis/core/Graphic';
import { SYMBOL_STATE } from '../../../arcgis-hub-discussions-map-integrator/utils/utils';
import symbols, { defaultLayerThemeOptions } from '../../../arcgis-hub-discussions-map-integrator/symbols';
import intlManager from '../../../../utils/intl-manager';
import { interpolateTranslations } from '../../../../utils';
import Memoize from '../../../../decorators/memoize';
export class ArcgisHubEntityHero {
  constructor() {
    this._heroActions = [];
    this.handleEditClick = () => {
      // emit an event to swap to the workspace view
      this.arcgisEntityEdit.emit();
    };
    /**
     * Handles clicks to the hero link buttons
     */
    this.handleHeroActionClick = (event) => {
      var _a, _b, _c;
      const idx = Number(event.currentTarget.getAttribute('data-index'));
      const heroAction = ((_c = (_b = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.view) === null || _b === void 0 ? void 0 : _b.heroActions) !== null && _c !== void 0 ? _c : [])[idx];
      let telemetry;
      if (heroAction) {
        if (heroAction.kind === 'content') {
          telemetry = dictionary.category.navigation.action.view.label.content;
        }
        else if (heroAction.kind === 'external') {
          telemetry = Object.assign(Object.assign({}, dictionary.category.navigation.action.external.label.link), { details: heroAction.href });
        }
        else if (heroAction.kind === 'well-known') {
          const WELL_KNOWN_ACTION_TELEMETRY = {
            register: null, /* replace `null` with the register telemetry event definition */
          };
          telemetry = WELL_KNOWN_ACTION_TELEMETRY[heroAction.action];
        }
      }
      if (telemetry) {
        this.hubTelemetry.emit({ telemetry, composedPath: event.composedPath() });
      }
    };
    this.entity = undefined;
    this.tooltipRefs = {};
    this.showEdit = false;
  }
  get _context() { return getGlobalContext(); }
  get location() {
    return this.entity.location;
  }
  get hasLocation() {
    var _a;
    return !!(this.location && ((_a = this.location) === null || _a === void 0 ? void 0 : _a.type) !== "none");
  }
  get canEditEntity() {
    const permission = `hub:${this.entityType}:edit`;
    return checkPermission(permission, this._context, this.entity).access;
  }
  get entityType() {
    return getTypeFromEntity(this.entity);
  }
  get heroActions() {
    return this._heroActions.slice(0, 2);
  }
  get extent() {
    var _a;
    return this.hasLocation ? bBoxToExtent((_a = this.location) === null || _a === void 0 ? void 0 : _a.extent) : undefined;
  }
  get graphics() {
    var _a;
    if (!this.hasLocation) {
      return [];
    }
    const geometries = (_a = this.location.geometries) !== null && _a !== void 0 ? _a : [];
    return geometries.length
      ? geometries.map(geometry => {
        return new Graphic({
          geometry,
          symbol: symbols[geometry.type](SYMBOL_STATE.DEFAULT, defaultLayerThemeOptions[geometry.type]),
        });
      })
      : [
        {
          symbol: symbols.polygon(SYMBOL_STATE.DEFAULT, defaultLayerThemeOptions.polygon),
          geometry: Object.assign({ type: 'extent' }, this.extent),
        },
      ];
  }
  get showMap() {
    var _a, _b;
    return (_b = (_a = this.entity.view) === null || _a === void 0 ? void 0 : _a.showMap) !== null && _b !== void 0 ? _b : false;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    await this.init();
  }
  async init() {
    var _a, _b;
    // attempt to initialize the hero actions in case user does not have access to linked content
    try {
      // 1. process the projects hero actions
      const heroActions = ((_b = (_a = this.entity.view) === null || _a === void 0 ? void 0 : _a.heroActions) !== null && _b !== void 0 ? _b : []).map(action => {
        return Object.assign({}, interpolateTranslations(this.intl, action));
      });
      this._heroActions = await processActionLinks(heroActions, this._context.hubRequestOptions);
    }
    catch (error) {
      // swallow it
    }
  }
  /**
   * Show the edit button if the user has permission to edit the entity and the showEdit prop is true
   * This was setup to enable the arcgis-hub-entity-view-wrapper to toggle between the view and workspace
   * in-situ. This is not currently planned behavior for the generic hero, but it's here for future use.
   * @returns
   */
  renderEditButton() {
    // NOTE: at this time, button this is for development purposes only thus not localized
    return ((this.canEditEntity && this.showEdit) ?
      h("calcite-button", { appearance: "solid", "data-element": "primary-action", href: "#", "icon-start": "gear", label: "Edit", onClick: this.handleEditClick, round: true }, "Edit")
      : null);
  }
  renderHeroActions(heroActions = []) {
    return (h(Fragment, null, h("div", { slot: "footer-start" }, heroActions.map((heroAction, index) => (h("div", { key: heroAction.label }, h("calcite-button", { appearance: index === 0 ? 'solid' : 'outline-fill', "data-element": index === 0 ? 'primary-action' : 'secondary-action', "data-index": index, disabled: heroAction.disabled, href: heroAction.kind === 'external' ? heroAction.href : undefined, label: heroAction.label, onClick: this.handleHeroActionClick, ref: (element) => {
        this.tooltipRefs =
          (heroAction.tooltip && this.tooltipRefs[heroAction.tooltip] !== element) ? Object.assign(Object.assign({}, this.tooltipRefs), { [heroAction.tooltip]: element }) : this.tooltipRefs;
      }, round: true }, heroAction.label), this.tooltipRefs[heroAction.tooltip] && h("calcite-tooltip", { referenceElement: this.tooltipRefs[heroAction.tooltip] }, heroAction.tooltip))))), h("div", { slot: "footer-end" }, this.renderEditButton())));
  }
  render() {
    var _a;
    return (h(Host, { "data-element": "entity-hero" }, h("arcgis-hub-content-hero", { extent: this.extent, graphics: this.graphics, "hero-title": (_a = this.entity) === null || _a === void 0 ? void 0 : _a.name, showMap: this.showMap, thumbnailUrl: this.hasLocation && this.showMap ? null : getEntityThumbnailUrl(this.entity) }, h("slot", { name: "footer-start" }), this._heroActions && this.renderHeroActions(this._heroActions))));
  }
  static get is() { return "arcgis-hub-entity-hero"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-hero.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-hero.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
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
          "text": "ArcGIS Hub entity that excludes IHubGroup and IHubUser"
        }
      },
      "showEdit": {
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
          "text": "Not currently used, except in a prototype, where we set this to true"
        },
        "attribute": "show-edit",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "tooltipRefs": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisEntityEdit",
        "name": "arcgisEntityEdit",
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
}
__decorate([
  Memoize('_heroActions')
], ArcgisHubEntityHero.prototype, "heroActions", null);
__decorate([
  Memoize('location.extent')
], ArcgisHubEntityHero.prototype, "extent", null);
__decorate([
  Memoize('location.geometries')
], ArcgisHubEntityHero.prototype, "graphics", null);
