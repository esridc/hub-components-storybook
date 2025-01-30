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

const arcgisHubUserContentPaneCss = ".sc-arcgis-hub-user-content-pane-h{display:block;height:100%}";

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
const ArcgisHubUserContentPane = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    /**
     * Callback that lets us modify the cardViewModel before it is rendered
     * @param model
     * @param _layout
     * @param _context
     * @param result
     * @returns
     */
    this.resultCallback = (model, _layout, _context, result) => {
      const editUrl = result.links.workspaceRelative || `/workspace${result.links.siteRelative}`;
      // ensure the title link goes to the edit route
      model.titleUrl = editUrl;
      // construct the additionalInfos
      const infos = [];
      // type:
      infos.push({
        label: this.intl.t('type'),
        value: result.type,
      });
      // owner
      infos.push({
        label: this.intl.t('owner'),
        value: result.owner,
      });
      // modified:
      infos.push({
        label: this.intl.t('updated'),
        value: this.intl.formatDate(result.updatedDate),
      });
      model.additionalInfo = infos;
      model.actionLinks = [{
          tooltip: this.intl.t('actionLinks.edit'),
          label: this.intl.t('actionLinks.edit'),
          ariaLabel: this.intl.t('actionLinks.ariaEdit', { title: model.title }),
          href: editUrl,
          icon: 'pencil',
          buttonStyle: 'transparent'
        }, {
          tooltip: this.intl.t('actionLinks.view'),
          label: this.intl.t('actionLinks.view'),
          ariaLabel: this.intl.t('actionLinks.ariaView', { title: model.title }),
          href: result.links.siteRelative,
          icon: 'launch',
          buttonStyle: 'transparent'
        }];
      return model;
    };
    this.isMobile = false;
    this._context = state.getGlobalContext();
  }
  get userEditGroupIds() {
    const groups = this.currentUser.groups || [];
    const userEditGroupIds = groups.filter(g => g.capabilities.includes('updateitemcontrol')).map(g => g.id);
    return userEditGroupIds; //.slice(0, 100);
  }
  get currentUser() {
    return this._context.currentUser;
  }
  get baseQuery() {
    return {
      targetEntity: "item",
      filters: [
        {
          predicates: [
            {
              type: { not: ["Code Attachment"] }
            }
          ],
        }
      ]
    };
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  get accessFacet() {
    const f = {
      label: this.intl.t('facets.content.label'),
      key: 'access',
      display: 'single-select',
      operation: 'OR',
      options: [
        {
          label: this.intl.t('facets.content.myContent'),
          key: 'mine',
          selected: true,
          predicates: [
            {
              owner: this.currentUser.username
            }
          ]
        },
        {
          label: this.intl.t('facets.content.editableContent'),
          key: 'editable',
          selected: false,
          predicates: [
            {
              owner: this.currentUser.username,
            },
            {
              group: this.userEditGroupIds,
            },
          ]
        },
        {
          label: this.intl.t('facets.content.all'),
          key: 'all',
          selected: false,
          predicates: [{
              owner: '*'
            }]
        },
      ],
    };
    return f;
  }
  get facets() {
    return [
      this.accessFacet,
      "modified",
      "type",
      "tags",
      "categories"
    ];
  }
  /**
   * Construct props that will be passed through the gallery, to the
   * `arcgis-hub-add-content` component
   */
  get addContentProps() {
    return {
      buttonText: this.intl.t('addContentButtonText'),
    };
  }
  render() {
    return (index.h(index.Host, { "data-element": "user-content" }, index.h("arcgis-hub-workspace-pane", { isMobile: this.isMobile, "sticky-footer": true }, index.h("h2", { slot: "title" }, this.intl.t('content')), index.h("arcgis-hub-gallery", { addContentProps: this.addContentProps, callback: this.resultCallback, facets: this.facets, layout: "grid", layoutOptions: ['grid', 'list', 'map', 'compact'], limit: 12, linkTarget: "workspaceRelative", mobileView: this.isMobile, query: this.baseQuery, showAddContent: true, showFacets: true, showLayoutSwitcher: true, showMoreResultsBtn: true, showSearch: true, showSort: true, showThumbnail: true, sortField: 'modified', sortOrder: 'desc' }))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
__decorate([
  memoize.MemoizeDecoratorFactory()
], ArcgisHubUserContentPane.prototype, "baseQuery", null);
__decorate([
  memoize.MemoizeDecoratorFactory()
], ArcgisHubUserContentPane.prototype, "accessFacet", null);
__decorate([
  memoize.MemoizeDecoratorFactory()
], ArcgisHubUserContentPane.prototype, "facets", null);
ArcgisHubUserContentPane.style = arcgisHubUserContentPaneCss;

exports.arcgis_hub_user_content_pane = ArcgisHubUserContentPane;
