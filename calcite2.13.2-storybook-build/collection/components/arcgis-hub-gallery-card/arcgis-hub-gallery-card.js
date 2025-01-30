import { Host, h } from '@stencil/core';
import { cloneObject, maybePush } from '@esri/hub-common';
import { getItemData } from '@esri/arcgis-rest-portal';
import { CORNERS, IMAGE_TYPES } from "../interfaces";
import intlManager from '../../utils/intl-manager';
import { MODE } from './interfaces';
import { Shareable } from "../functional/shareable";
import { getCardState } from '../../utils/shareable-utils';
import { getGlobalContext, connectContext } from '../../utils/state';
export class ArcgisHubGalleryCard {
  constructor() {
    this._context = getGlobalContext();
    this.access = [];
    this.catalogs = [];
    this.categories = [];
    this.groups = [];
    this.ids = [];
    this.limit = 10;
    this.orgid = undefined;
    this.sort = undefined;
    this.tags = [];
    this.types = [];
    this.mode = MODE.dynamic;
    this.newTab = false;
    this.cardTitleTag = 'h4';
    this.corners = CORNERS.square;
    this.imageType = undefined;
    this.lazy = true;
    this.showEmptyState = true;
    this.shadow = undefined;
    this.showLinkButton = false;
    this.linkButtonText = undefined;
    this.linkButtonStyle = undefined;
    this.linkButtonBackgroundColor = undefined;
    this.linkButtonBackgroundHoverColor = undefined;
    this.linkButtonTextColor = undefined;
    this.shareable = false;
    this.shareableByValue = false;
    this.shareableByReference = false;
    this.shareableOnHover = false;
    this.baseUrl = undefined;
    this.catalogData = undefined;
    this.hasResults = false;
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  get _limit() {
    const ids = this._getArrayProp('ids');
    return this._isManualMode ? ids.length : this.limit;
  }
  get _linkButtonStyle() {
    // od-ui has bootstrap values of primary and default but we want to use calcite Appearance values
    return ({ primary: 'solid', default: 'outline' }[this.linkButtonStyle]);
  }
  get _linkButtonText() {
    // od-ui might say show a button but not say what text it should say
    return this.linkButtonText || this.intl.t('linkButtonDefaultText');
  }
  get _imageType() {
    // od-ui has 'Thumbnails' and 'Icons' but yuck... we don't want to chain the child components to that forever
    const result = { Thumbnails: IMAGE_TYPES.thumbnail, Icons: IMAGE_TYPES.icon }[this.imageType];
    return result || IMAGE_TYPES.thumbnail;
  }
  get _isManualMode() {
    return this.mode === MODE.manual;
  }
  setButtonStyles(newValue, _, propName) {
    // this is horrible - but they want the component to be unthemed (achieved by applying the unthemed attribute on the opendata-ui side)
    // EXCEPT for one element 4 levels deep in shadow DOM (the button)
    // this is not theming, it is exercising fine grained control over the styling of the component
    // fortunately, in this use case, it is the only element that uses these css vars
    // so we step on those variables here
    // WE SHOULD NOT FOLLOW THIS PATTERN ELSEWHERE
    const propertyMap = {
      linkButtonBackgroundColor: '--calcite-color-brand',
      linkButtonBackgroundHoverColor: '--calcite-color-brand-hover',
      linkButtonTextColor: '--calcite-color-text-inverse'
    };
    propName = propertyMap[propName];
    if (newValue) {
      this.element.style.setProperty(propName, newValue);
    }
    else {
      this.element.style.removeProperty(propName);
    }
  }
  onResultsChange(event) {
    const results = event.detail;
    // Determine if there are results.
    this.hasResults = results.length > 0;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.setButtonStyles(this.linkButtonBackgroundColor, undefined, 'linkButtonBackgroundColor');
    this.setButtonStyles(this.linkButtonBackgroundHoverColor, undefined, 'linkButtonBackgroundHoverColor');
    this.setButtonStyles(this.linkButtonTextColor, undefined, 'linkButtonTextColor');
    return this._fetchCatalogData();
  }
  async _fetchCatalogData() {
    const catalogs = this._getArrayProp('catalogs');
    if (catalogs.length && this.mode === MODE.dynamic) {
      const { session: authentication, sharingApiUrl: portal } = this._context;
      const opts = {
        authentication,
        portal
      };
      const catalogItemDatas = await Promise.all(catalogs.map(catalogItemId => getItemData(catalogItemId, opts)));
      this.catalogData = catalogItemDatas.reduce((acc, catalogItem) => {
        // TODO: use convertCatalog
        if (catalogItem.catalog.hasOwnProperty('groups')) {
          catalogItem.catalog.group = catalogItem.catalog.groups;
          delete catalogItem.catalog.groups;
        }
        const catalog = {
          predicates: [catalogItem.catalog],
          operation: 'AND'
        };
        acc = [...acc, catalog];
        return acc;
      }, []);
    }
    else {
      this.catalogData = undefined;
    }
  }
  // some props could be comma-delimited strings OR actual arrays - this allows us to get them as arrays
  _getArrayProps() {
    const arrayProps = ['access', 'catalogs', 'categories', 'groups', 'ids', 'tags', 'types'];
    return arrayProps.reduce((acc, propName) => {
      const value = this._getArrayProp(propName);
      acc[propName] = value;
      return acc;
    }, {});
  }
  // some props could be comma-delimited strings OR actual arrays - this allows us to get them as arrays
  _getArrayProp(propName) {
    let val = this[propName];
    if (val && !Array.isArray(val)) {
      val = val.split(',').map(x => x.trim()).filter(x => !!x);
    }
    return [...val];
  }
  async getState() {
    const { element } = this;
    const state = await getCardState(element);
    const arrayProps = this._getArrayProps();
    return Object.assign(Object.assign(Object.assign({}, state), arrayProps), { 'base-url': this.baseUrl });
  }
  get typeFilters() {
    const types = this._getArrayProp('types');
    if (this._isManualMode || !types.length) {
      return;
    }
    const predicates = types.map(type => {
      /* TODO: not sure about pageForCurrentSite...
          - maybe we need to take further action to constrain it to this site (content group???)
          - or maybe we should just pass in ids from the ember side
          - or maybe we should (or already are) passing in enough site info that we can use that to constrain it to the site
      */
      if (type === 'pageForCurrentSite') {
        type = 'page';
      }
      return { type: `$${type.toLowerCase()}` };
    });
    return {
      operation: "OR",
      predicates
    };
  }
  get scope() {
    const { catalogData, orgid, typeFilters } = this;
    const { access, categories, groups, ids, tags } = this._getArrayProps();
    let filters = [];
    if (!this._isManualMode && catalogData) {
      filters = [...filters, ...cloneObject(catalogData)];
    }
    const filter = {
      operation: 'AND',
      predicates: []
    };
    const hasGroups = filters => filters.reduce((acc, filter) => {
      return !acc && filter.predicates.reduce((acc, filter) => {
        return !acc && filter.hasOwnProperty('group');
      }, false);
    }, false);
    if (this._isManualMode) {
      filter.predicates.push({ id: ids });
    }
    else {
      if (categories.length) {
        filter.predicates.push({ categories });
      }
      if (access.length) {
        if (access.includes('private')) {
          // another "implicit requirement" from od-ui
          access.push('shared');
        }
        filter.predicates.push({ access: access });
      }
      if (groups.length) {
        if (hasGroups(filters)) {
          // this is sorta weird (and maybe even wrong) but it's the way the od-ui gallery card works
          // if we've already got a groups filter (from a catalog) add the groups to it so they are ORed
          filters.forEach(filter => {
            filter.predicates.forEach(predicate => {
              if (predicate.hasOwnProperty('group')) {
                predicate.group = [...predicate.group, ...groups];
              }
            });
          });
        }
        else {
          filter.predicates.push({ group: groups });
        }
      }
      // gallery card in od-ui only uses orgId if there are no groups to search by
      if (!this._isManualMode && orgid && !groups.length && !hasGroups(filters)) {
        filter.predicates.push({ orgid: orgid });
      }
      if (!this._isManualMode && tags.length) {
        filter.predicates.push({ tags: tags });
      }
    }
    if (filter.predicates.length) {
      filters = maybePush(filter, filters);
    }
    filters = maybePush(typeFilters, filters);
    return {
      targetEntity: 'item',
      filters
    };
  }
  get sortDirection() {
    // this gives us parity with od-ui gallery card but could be improved
    return this.sort === 'title' ? 'asc' : 'desc';
  }
  get collection() {
    const { scope, sort, sortDirection } = this;
    const collection = {
      include: [],
      key: 'default',
      label: 'Default',
      scope,
      sortDirection,
      sortField: sort,
      targetEntity: 'item'
    };
    if (JSON.stringify(collection) == JSON.stringify(this._oldCollection)) {
      // if it did not actually change, return the same object so as not to unecessarily trigger re-renders
      return this._oldCollection;
    }
    this._oldCollection = cloneObject(collection);
    return collection;
  }
  get shouldQuery() {
    const { catalogs, groups, types } = this._getArrayProps();
    const isInvalidManualMode = this._isManualMode && !this._getArrayProp('ids').length;
    return isInvalidManualMode
      ? false
      // These checks were implicit requirements from od-ui
      // TODO: types.length and catalogs.length are always > 1 in manual mode - is that a bug?
      : !!(this._isManualMode || types.length || groups.length || catalogs.length);
  }
  _renderGallery() {
    if (this.shouldQuery) {
      const ids = this._getArrayProp('ids');
      const sortByIds = this._isManualMode ? ids : undefined;
      const include = this.collection.include && this.collection.include.join('|');
      return h("arcgis-hub-gallery", { baseUrl: this.baseUrl, cardTitleTag: this.cardTitleTag, corners: this.corners, imageType: this._imageType, include: include, layout: "grid-filled", lazy: this.lazy, limit: this._limit, linkButtonStyle: this._linkButtonStyle, linkButtonText: this._linkButtonText, linkTarget: "siteRelative", newTab: this.newTab, query: this.collection.scope, shadow: this.shadow, showAdditionalInfo: false, showBadges: false, showEmptyState: this.showEmptyState, showLinkButton: this.showLinkButton, showOwner: false, showThumbnail: true, showType: false, sortByIds: sortByIds, sortField: this.sort, sortOrder: this.sortDirection });
    }
    else if (this.showEmptyState) {
      // another implicit requirement - we've actually got a valid query
      // but in the context of this card we don't want to show anything in this case
      // and there's no easy way to tell the arcgis-hub-gallery to do that
      return (h("arcgis-hub-help-state", { icon: "file-magnifying-glass" }, h("h3", { "aria-live": "polite", role: "status", slot: "message" }, this.intl.t('noResults'))));
    }
  }
  render() {
    return (h(Host, { "data-element": "gallery-card" }, h(Shareable, { context: this, showShareUi: this.hasResults || this.showEmptyState }, this._renderGallery())));
  }
  static get is() { return "arcgis-hub-gallery-card"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-gallery-card.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-gallery-card.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "access": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string | string[]",
          "resolved": "string | string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "access level by which to filter items"
        },
        "attribute": "access",
        "reflect": false,
        "defaultValue": "[]"
      },
      "catalogs": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string | string[]",
          "resolved": "string | string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "catolog item ids for filtering items"
        },
        "attribute": "catalogs",
        "reflect": false,
        "defaultValue": "[]"
      },
      "categories": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string | string[]",
          "resolved": "string | string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "categories by which to filter items"
        },
        "attribute": "categories",
        "reflect": false,
        "defaultValue": "[]"
      },
      "groups": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string | string[]",
          "resolved": "string | string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "groups by which to filter items"
        },
        "attribute": "groups",
        "reflect": false,
        "defaultValue": "[]"
      },
      "ids": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string | string[]",
          "resolved": "string | string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "item ids to show in the gallery\nsupersedes all other filters"
        },
        "attribute": "ids",
        "reflect": false,
        "defaultValue": "[]"
      },
      "limit": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Maximum number of items to show in the gallery"
        },
        "attribute": "limit",
        "reflect": true,
        "defaultValue": "10"
      },
      "orgid": {
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
          "text": "orgid by which to filter items"
        },
        "attribute": "orgid",
        "reflect": true
      },
      "sort": {
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
          "text": "Field by which to sort"
        },
        "attribute": "sort",
        "reflect": true
      },
      "tags": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string | string[]",
          "resolved": "string | string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "tags by which to filter items"
        },
        "attribute": "tags",
        "reflect": false,
        "defaultValue": "[]"
      },
      "types": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string | string[]",
          "resolved": "string | string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "types by which to filter items"
        },
        "attribute": "types",
        "reflect": false,
        "defaultValue": "[]"
      },
      "mode": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "MODE",
          "resolved": "MODE.dynamic | MODE.manual",
          "references": {
            "MODE": {
              "location": "import",
              "path": "./interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "mode",
        "reflect": true,
        "defaultValue": "MODE.dynamic"
      },
      "newTab": {
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
          "text": "Indicates whether links to items will open in new tab"
        },
        "attribute": "new-tab",
        "reflect": true,
        "defaultValue": "false"
      },
      "cardTitleTag": {
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
          "text": "The tag to use for the title\nIntended to allow specifying h1 - h6 but can be any tag"
        },
        "attribute": "card-title-tag",
        "reflect": true,
        "defaultValue": "'h4'"
      },
      "corners": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "CORNERS",
          "resolved": "CORNERS.round | CORNERS.square",
          "references": {
            "CORNERS": {
              "location": "import",
              "path": "../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Specifies whether corners should be round or square\nrefelected so we can target it with css"
        },
        "attribute": "corners",
        "reflect": true,
        "defaultValue": "CORNERS.square"
      },
      "imageType": {
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
          "text": ""
        },
        "attribute": "image-type",
        "reflect": true
      },
      "lazy": {
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
          "text": "Indicates if the thumbnail on the cards should be lazily loaded.\nWill lazy load by default"
        },
        "attribute": "lazy",
        "reflect": true,
        "defaultValue": "true"
      },
      "showEmptyState": {
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
        "attribute": "show-empty-state",
        "reflect": true,
        "defaultValue": "true"
      },
      "shadow": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "DROP_SHADOWS",
          "resolved": "DROP_SHADOWS.heavy | DROP_SHADOWS.low | DROP_SHADOWS.medium | DROP_SHADOWS.none",
          "references": {
            "DROP_SHADOWS": {
              "location": "import",
              "path": "../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "shadow",
        "reflect": true
      },
      "showLinkButton": {
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
        "attribute": "show-link-button",
        "reflect": true,
        "defaultValue": "false"
      },
      "linkButtonText": {
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
          "text": ""
        },
        "attribute": "link-button-text",
        "reflect": true
      },
      "linkButtonStyle": {
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
          "text": ""
        },
        "attribute": "link-button-style",
        "reflect": true
      },
      "linkButtonBackgroundColor": {
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
          "text": ""
        },
        "attribute": "link-button-background-color",
        "reflect": true
      },
      "linkButtonBackgroundHoverColor": {
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
          "text": ""
        },
        "attribute": "link-button-background-hover-color",
        "reflect": true
      },
      "linkButtonTextColor": {
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
          "text": ""
        },
        "attribute": "link-button-text-color",
        "reflect": true
      },
      "shareable": {
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
          "text": "Whether the card should render a share button"
        },
        "attribute": "shareable",
        "reflect": true,
        "defaultValue": "false"
      },
      "shareableByValue": {
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
        "attribute": "shareable-by-value",
        "reflect": true,
        "defaultValue": "false"
      },
      "shareableByReference": {
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
        "attribute": "shareable-by-reference",
        "reflect": true,
        "defaultValue": "false"
      },
      "shareableOnHover": {
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
        "attribute": "shareable-on-hover",
        "reflect": true,
        "defaultValue": "false"
      },
      "baseUrl": {
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
          "text": "Base url from which to generate urls"
        },
        "attribute": "base-url",
        "reflect": true
      }
    };
  }
  static get states() {
    return {
      "_context": {},
      "catalogData": {},
      "hasResults": {}
    };
  }
  static get methods() {
    return {
      "getState": {
        "complexType": {
          "signature": "() => Promise<any>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<any>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "linkButtonBackgroundColor",
        "methodName": "setButtonStyles"
      }, {
        "propName": "linkButtonBackgroundHoverColor",
        "methodName": "setButtonStyles"
      }, {
        "propName": "linkButtonTextColor",
        "methodName": "setButtonStyles"
      }, {
        "propName": "catalogs",
        "methodName": "_fetchCatalogData"
      }];
  }
  static get listeners() {
    return [{
        "name": "arcgisHubGalleryResultsChange",
        "method": "onResultsChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
