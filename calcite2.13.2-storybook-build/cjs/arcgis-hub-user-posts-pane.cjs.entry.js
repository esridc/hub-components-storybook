'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const state = require('./state-6637df8c.js');
const intlManager = require('./intl-manager-f0103583.js');
const memoize = require('./memoize-1f967971.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./generate-random-string-8807d629.js');

const arcgisHubUserPostsPaneCss = ".sc-arcgis-hub-user-posts-pane-h{display:block;height:100%}";

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
const ArcgisHubUserPostsPane = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.isMobile = false;
    this._context = state.getGlobalContext();
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  get query() {
    return {
      targetEntity: "discussionPost",
      filters: [
        {
          predicates: [
            {
              creator: this._context.currentUser
            }
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
    };
  }
  render() {
    return (index.h(index.Host, { "data-element": "user-groups" }, index.h("arcgis-hub-workspace-pane", { isMobile: this.isMobile, "sticky-footer": true }, index.h("h2", { slot: "title" }, this.intl.t('header')), index.h("arcgis-hub-gallery", { api: 'hub', layout: "compact", linkTarget: "workspaceRelative", mobileView: this.isMobile, query: this.query, showAddContent: false, showFacets: false, showLinkButton: false, showMoreResultsBtn: true, showSearch: true, showSort: true, showThumbnail: false }))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
__decorate([
  memoize.MemoizeDecoratorFactory('_context.currentUser.username')
], ArcgisHubUserPostsPane.prototype, "query", null);
__decorate([
  memoize.MemoizeDecoratorFactory()
], ArcgisHubUserPostsPane.prototype, "addContentProps", null);
ArcgisHubUserPostsPane.style = arcgisHubUserPostsPaneCss;

exports.arcgis_hub_user_posts_pane = ArcgisHubUserPostsPane;
