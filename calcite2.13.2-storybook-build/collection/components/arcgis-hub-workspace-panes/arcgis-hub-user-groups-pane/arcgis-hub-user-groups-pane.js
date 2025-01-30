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
import { getProp } from '@esri/hub-common';
import Memoize from '../../../decorators/memoize';
export class ArcgisHubUserGroupsPane {
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
      // ensure the link goes to the edit route
      model.titleUrl = editUrl;
      // construct the additionalInfos
      const infos = [];
      // type
      infos.push({
        label: this.intl.t('type'),
        value: getProp(result, 'isSharedUpdate') ? this.intl.t('sharedUpdate') : this.intl.t('viewOnly'),
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
          tooltip: this.intl.t('actionLinks.view'),
          label: this.intl.t('actionLinks.view'),
          ariaLabel: this.intl.t('actionLinks.ariaView', { title: model.title }),
          href: result.links.siteRelative,
          icon: 'launch',
          buttonStyle: 'transparent'
        }];
      if (result.owner === this.currentUser.username) {
        model.actionLinks = [{
            tooltip: this.intl.t('actionLinks.edit'),
            label: this.intl.t('actionLinks.edit'),
            ariaLabel: this.intl.t('actionLinks.ariaEdit', { title: model.title }),
            href: editUrl,
            icon: 'pencil',
            buttonStyle: 'transparent',
          },
          ...model.actionLinks];
      }
      return model;
    };
    this.layoutOptions = ['grid', 'compact', 'table'];
    this.isMobile = false;
    this._context = getGlobalContext();
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  get currentUser() {
    return this._context.currentUser;
  }
  get query() {
    return {
      targetEntity: "group",
      filters: [
        {
          predicates: [
            {
              searchUserAccess: "groupMember"
            }
          ],
        }
      ]
    };
  }
  get facets() {
    return ["group-access", "group-type",
      {
        label: "Special Groups",
        key: "types",
        display: "multi-select",
        pageSize: 4,
        operation: "AND",
        options: [
          {
            label: this.intl.t('facets.type.options.sharedUpdate'),
            key: "sharedUpdate",
            selected: false,
            predicates: [{ capabilities: "updateitemcontrol" }]
          },
          {
            label: this.intl.t('facets.type.options.opendata'),
            key: "opendata",
            selected: false,
            predicates: [{ isopendata: true }]
          }
        ]
      }
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
    return (h(Host, { "data-element": "user-groups" }, h("arcgis-hub-workspace-pane", { isMobile: this.isMobile, "sticky-footer": true }, h("h2", { slot: "title" }, this.intl.t('groups')), h("arcgis-hub-gallery", { addContentProps: this.addContentProps, callback: this.resultCallback, facets: this.facets, layout: "grid", layoutOptions: this.layoutOptions, limit: 12, linkTarget: "workspaceRelative", mobileView: this.isMobile, query: this.query, showAddContent: true, showFacets: true, showLayoutSwitcher: true, showLinkButton: false, showMoreResultsBtn: true, showSearch: true, showSort: true, showThumbnail: false, sortField: 'modified', sortOrder: 'desc' }))));
  }
  static get is() { return "arcgis-hub-user-groups-pane"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-user-groups-pane.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-user-groups-pane.css"]
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
], ArcgisHubUserGroupsPane.prototype, "query", null);
__decorate([
  Memoize()
], ArcgisHubUserGroupsPane.prototype, "facets", null);
