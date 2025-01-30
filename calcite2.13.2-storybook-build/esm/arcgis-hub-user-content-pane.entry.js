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
    registerInstance(this, hostRef);
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
    this._context = getGlobalContext();
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
    this.intl = await intlManager.loadIntlForComponent(this.element);
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
    return (h(Host, { "data-element": "user-content" }, h("arcgis-hub-workspace-pane", { isMobile: this.isMobile, "sticky-footer": true }, h("h2", { slot: "title" }, this.intl.t('content')), h("arcgis-hub-gallery", { addContentProps: this.addContentProps, callback: this.resultCallback, facets: this.facets, layout: "grid", layoutOptions: ['grid', 'list', 'map', 'compact'], limit: 12, linkTarget: "workspaceRelative", mobileView: this.isMobile, query: this.baseQuery, showAddContent: true, showFacets: true, showLayoutSwitcher: true, showMoreResultsBtn: true, showSearch: true, showSort: true, showThumbnail: true, sortField: 'modified', sortOrder: 'desc' }))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
__decorate([
  MemoizeDecoratorFactory()
], ArcgisHubUserContentPane.prototype, "baseQuery", null);
__decorate([
  MemoizeDecoratorFactory()
], ArcgisHubUserContentPane.prototype, "accessFacet", null);
__decorate([
  MemoizeDecoratorFactory()
], ArcgisHubUserContentPane.prototype, "facets", null);
ArcgisHubUserContentPane.style = arcgisHubUserContentPaneCss;

export { ArcgisHubUserContentPane as arcgis_hub_user_content_pane };
