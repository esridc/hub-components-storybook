import { fetchHubEntity, getContentTypeIcon, parseContainmentPath, pathMap } from '@esri/hub-common';
import { Host, h } from '@stencil/core';
import { getGlobalContext } from '../../../utils/state';
import intlManager from '../../../utils/intl-manager';
import { Breadcrumbs } from '../../functional/breadcrumbs';
export class ArcgisHubEntityBreadcrumbs {
  constructor() {
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
  static get is() { return "arcgis-hub-entity-breadcrumbs"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-breadcrumbs.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-breadcrumbs.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "breadcrumbs": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubEntityBreadcrumb[]",
          "resolved": "IHubEntityBreadcrumb[]",
          "references": {
            "IHubEntityBreadcrumb": {
              "location": "local"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "[]"
      },
      "path": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "\"\"",
          "resolved": "\"\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "path",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "breadcrumbEntries": {}
    };
  }
  static get elementRef() { return "element"; }
}
