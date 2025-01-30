import { r as registerInstance, h, H as Host, a as getElement } from './index-57f71b44.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import './resources-3b88c839.js';
import { s as stripHtml } from './hubSanitizer-45ca9e6e.js';
import './index-dd3f99ac.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { M as MemoizeDecoratorFactory } from './memoize-dfcfa834.js';
import { a as cloneObject } from './util-3e6872d9.js';
import { g as getProp } from './get-prop-ec5be510.js';
import './store-0a6cb79f.js';
import './index-213c70d0.js';
import './index-55cb25f7.js';
import './_commonjsHelpers-11ca3be1.js';
import './generate-random-string-1436d9e6.js';

const arcgisHubUserEventsPaneCss = ".sc-arcgis-hub-user-events-pane-h{display:block;height:100%}";

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const ArcgisHubUserEventsPane = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.layoutOptions = ['grid', 'compact', 'calendar', 'table'];
    this.facets = ["event-access", "event-from", "event-date"];
    this.sortOptions = ['startDate', 'title', 'modified', 'created'];
    /**
     * Callback that lets us modify the cardViewModel before it is rendered
     * @param model
     * @param _layout
     * @param _context
     * @param result
     * @returns
     */
    this.resultCallback = (originalModel, _layout, _context, result) => {
      var _a, _b, _c;
      const model = cloneObject(originalModel);
      // construct the additionalInfos
      const infos = [];
      const rawResult = getProp(result, 'rawResult');
      // Access:
      infos.push({
        label: this.intl.t('access.label'),
        value: this.intl.t(`access.${rawResult === null || rawResult === void 0 ? void 0 : rawResult.access}`),
      });
      // when
      infos.push({
        label: this.intl.t('starts'),
        value: this.intl.formatDate(new Date(rawResult === null || rawResult === void 0 ? void 0 : rawResult.startDate), {
          dateStyle: 'full',
          timeStyle: 'long',
        }),
      });
      // owner
      const owner = ((_a = rawResult === null || rawResult === void 0 ? void 0 : rawResult.creator) === null || _a === void 0 ? void 0 : _a.firstName) ? `${(_b = rawResult === null || rawResult === void 0 ? void 0 : rawResult.creator) === null || _b === void 0 ? void 0 : _b.firstName} ${(_c = rawResult === null || rawResult === void 0 ? void 0 : rawResult.creator) === null || _c === void 0 ? void 0 : _c.lastName}` : result.owner;
      infos.push({
        label: this.intl.t('owner'),
        value: owner
      });
      // modified:
      infos.push({
        label: this.intl.t('updated'),
        value: this.intl.formatDate(result.updatedDate),
      });
      model.additionalInfo = infos;
      model.summary = stripHtml(model.summary);
      // model.actionLinks = [{
      //   tooltip: this.intl.t('actionLinks.view'),
      //   label: this.intl.t('actionLinks.view'),
      //   ariaLabel: this.intl.t('actionLinks.ariaView', { title: model.title }),
      //   href: result.links.siteRelative,
      //   icon: 'launch',
      //   buttonStyle: 'transparent'
      // }]
      // If you can edit this, show the edit link
      // if (result.owner === this._context.currentUser.username) {
      //   const editUrl = result.links.workspaceRelative || `/workspace${result.links.siteRelative}`;
      //   model.actionLinks = [{
      //     tooltip: this.intl.t('actionLinks.edit'),
      //     label: this.intl.t('actionLinks.edit'),
      //     ariaLabel: this.intl.t('actionLinks.ariaEdit', { title: model.title }),
      //     href: editUrl,
      //     icon: 'pencil',
      //     buttonStyle: 'transparent',
      //   },
      //   ...model.actionLinks]
      // }
      return model;
    };
    this.isMobile = false;
    this._context = getGlobalContext();
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  get query() {
    return {
      targetEntity: "event",
      filters: [
        {
          predicates: [
          // no predicates for now
          ],
        }
      ]
    };
  }
  /**
     * Construct props that will be passed through the gallery, to the
     * `arcgis-hub-add-content` component
     */
  get addContentProps() {
    return {
      buttonText: this.intl.t('addEventButtonText'),
      entityType: "event"
    };
  }
  render() {
    return (h(Host, { "data-element": "user-events" }, h("arcgis-hub-workspace-pane", { isMobile: this.isMobile, "sticky-footer": true }, h("h2", { slot: "title" }, this.intl.t('header')), h("arcgis-hub-gallery", { addContentProps: this.addContentProps, callback: this.resultCallback, facets: this.facets, layout: "grid", layoutOptions: this.layoutOptions, limit: 12, linkTarget: "siteRelative", mobileView: this.isMobile, query: this.query, showAddContent: true, showFacets: true, showLayoutSwitcher: true, showLinkButton: false, showMoreResultsBtn: true, showResultsCount: true, showSearch: true, showSort: true, showThumbnail: false, sortField: 'modified', sortOptions: this.sortOptions, sortOrder: 'desc' }))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
__decorate([
  MemoizeDecoratorFactory()
], ArcgisHubUserEventsPane.prototype, "query", null);
__decorate([
  MemoizeDecoratorFactory()
], ArcgisHubUserEventsPane.prototype, "addContentProps", null);
ArcgisHubUserEventsPane.style = arcgisHubUserEventsPaneCss;

export { ArcgisHubUserEventsPane as arcgis_hub_user_events_pane };
