import { r as registerInstance, h, H as Host, a as getElement } from './index-57f71b44.js';
import { C as CORNERS, I as IMAGE_TYPES } from './interfaces-0d0bef14.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { S as Shareable } from './shareable-757262ff.js';
import { g as getCardState } from './shareable-utils-8e335e9e.js';
import { g as getGlobalContext, h as connectContext } from './state-31a09db0.js';
import { c as getItemData } from './get-f0caeb52.js';
import { a as cloneObject, g as maybePush } from './util-3e6872d9.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './_commonjsHelpers-11ca3be1.js';
import './tslib.es6-7023f322.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './request-fa80ae40.js';
import './append-custom-params-4bd856e5.js';
import './get-prop-ec5be510.js';

var MODE;
(function (MODE) {
  MODE["dynamic"] = "dynamic";
  MODE["manual"] = "manual";
})(MODE || (MODE = {}));

const arcgisHubGalleryCardCss = ":host{display:block}arcgis-hub-gallery{text-align:center;--calcite-color-text-link:var(--calcite-color-text-2);--calcite-card-border-color:none;--calcite-color-border-3:none}";

const ArcgisHubGalleryCard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "linkButtonBackgroundColor": ["setButtonStyles"],
    "linkButtonBackgroundHoverColor": ["setButtonStyles"],
    "linkButtonTextColor": ["setButtonStyles"],
    "catalogs": ["_fetchCatalogData"]
  }; }
};
ArcgisHubGalleryCard.style = arcgisHubGalleryCardCss;

export { ArcgisHubGalleryCard as arcgis_hub_gallery_card };
