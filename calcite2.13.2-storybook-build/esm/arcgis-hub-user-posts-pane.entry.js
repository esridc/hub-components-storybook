import { r as registerInstance, h, H as Host, a as getElement } from './index-57f71b44.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { M as MemoizeDecoratorFactory } from './memoize-dfcfa834.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './_commonjsHelpers-11ca3be1.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './generate-random-string-1436d9e6.js';

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
    registerInstance(this, hostRef);
    this.isMobile = false;
    this._context = getGlobalContext();
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
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
    return (h(Host, { "data-element": "user-groups" }, h("arcgis-hub-workspace-pane", { isMobile: this.isMobile, "sticky-footer": true }, h("h2", { slot: "title" }, this.intl.t('header')), h("arcgis-hub-gallery", { api: 'hub', layout: "compact", linkTarget: "workspaceRelative", mobileView: this.isMobile, query: this.query, showAddContent: false, showFacets: false, showLinkButton: false, showMoreResultsBtn: true, showSearch: true, showSort: true, showThumbnail: false }))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
__decorate([
  MemoizeDecoratorFactory('_context.currentUser.username')
], ArcgisHubUserPostsPane.prototype, "query", null);
__decorate([
  MemoizeDecoratorFactory()
], ArcgisHubUserPostsPane.prototype, "addContentProps", null);
ArcgisHubUserPostsPane.style = arcgisHubUserPostsPaneCss;

export { ArcgisHubUserPostsPane as arcgis_hub_user_posts_pane };
