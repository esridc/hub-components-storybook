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
import { Host, h } from '@stencil/core';
import { getGlobalContext } from '../../../utils/state';
import intlManager from '../../../utils/intl-manager';
import Memoize from '../../../decorators/memoize';
export class ArcgisHubUserContentPane {
  constructor() {
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
  static get is() { return "arcgis-hub-user-content-pane"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-user-content-pane.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-user-content-pane.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "isMobile": {
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
        "attribute": "is-mobile",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "_context": {}
    };
  }
  static get elementRef() { return "element"; }
}
__decorate([
  Memoize()
], ArcgisHubUserContentPane.prototype, "baseQuery", null);
__decorate([
  Memoize()
], ArcgisHubUserContentPane.prototype, "accessFacet", null);
__decorate([
  Memoize()
], ArcgisHubUserContentPane.prototype, "facets", null);
