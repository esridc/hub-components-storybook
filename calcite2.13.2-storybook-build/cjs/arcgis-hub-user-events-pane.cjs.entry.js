'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const state = require('./state-6637df8c.js');
const intlManager = require('./intl-manager-f0103583.js');
require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
require('./resources-e64df288.js');
const hubSanitizer = require('./hubSanitizer-d5497b99.js');
require('./index-6f16fe65.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
const memoize = require('./memoize-1f967971.js');
const util = require('./util-38e73510.js');
const getProp = require('./get-prop-4bd8fc1a.js');
require('./store-2a385ca0.js');
require('./index-f4a4c954.js');
require('./index-77618030.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./generate-random-string-8807d629.js');

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
    index.registerInstance(this, hostRef);
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
      const model = util.cloneObject(originalModel);
      // construct the additionalInfos
      const infos = [];
      const rawResult = getProp.getProp(result, 'rawResult');
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
      model.summary = hubSanitizer.stripHtml(model.summary);
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
    this._context = state.getGlobalContext();
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
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
    return (index.h(index.Host, { "data-element": "user-events" }, index.h("arcgis-hub-workspace-pane", { isMobile: this.isMobile, "sticky-footer": true }, index.h("h2", { slot: "title" }, this.intl.t('header')), index.h("arcgis-hub-gallery", { addContentProps: this.addContentProps, callback: this.resultCallback, facets: this.facets, layout: "grid", layoutOptions: this.layoutOptions, limit: 12, linkTarget: "siteRelative", mobileView: this.isMobile, query: this.query, showAddContent: true, showFacets: true, showLayoutSwitcher: true, showLinkButton: false, showMoreResultsBtn: true, showResultsCount: true, showSearch: true, showSort: true, showThumbnail: false, sortField: 'modified', sortOptions: this.sortOptions, sortOrder: 'desc' }))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
__decorate([
  memoize.MemoizeDecoratorFactory()
], ArcgisHubUserEventsPane.prototype, "query", null);
__decorate([
  memoize.MemoizeDecoratorFactory()
], ArcgisHubUserEventsPane.prototype, "addContentProps", null);
ArcgisHubUserEventsPane.style = arcgisHubUserEventsPaneCss;

exports.arcgis_hub_user_events_pane = ArcgisHubUserEventsPane;
