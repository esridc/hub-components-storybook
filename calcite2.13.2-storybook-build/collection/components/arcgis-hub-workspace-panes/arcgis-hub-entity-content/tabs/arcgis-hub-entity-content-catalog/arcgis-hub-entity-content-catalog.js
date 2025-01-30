import { cloneObject } from '@esri/hub-common';
import { Host, h, Fragment } from '@stencil/core';
import { bind } from '../../../../../utils/context';
import intlManager from '../../../../../utils/intl-manager';
import { ContentPaneTabs } from '../../types';
import { getEntityCatalogGroupIds } from '../../../../../utils/workspace/getEntityCatalogGroupIds';
import { connectContext, getGlobalContext } from '../../../../../utils/state';
import { CORNERS, DROP_SHADOWS } from '../../../../interfaces';
export class ArcgisHubEntityContentCatalog {
  constructor() {
    this.entity = undefined;
    this.isMobile = false;
    this.facets = undefined;
    this._context = getGlobalContext();
    this.selectedCollectionKey = undefined;
    this.showThumbnail = false;
    bind(this, 'handleCollectionSelect', 'openCatalogConfigTab');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.setFacets();
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  setFacets() {
    this.facets = [
      {
        label: this.intl.t('facets.map.label'),
        tooltip: this.intl.t('facets.map.tooltip'),
        key: 'bbox',
        display: 'map',
        field: 'bbox',
        value: null,
      },
      {
        label: this.intl.t('facets.type'),
        key: 'type',
        display: 'multi-select',
        field: 'type',
        options: [],
        operation: 'OR',
        aggLimit: 100,
      },
      {
        label: this.intl.t('facets.tags'),
        key: 'tags',
        display: 'multi-select',
        field: 'tags',
        options: [],
        operation: 'OR',
      },
      {
        label: this.intl.t('facets.categories'),
        key: 'categories',
        display: 'tree',
        field: 'categories',
        options: [],
        operation: 'OR',
      },
      {
        label: this.intl.t('facets.dateUpdated'),
        key: 'modified',
        display: 'date-range',
        field: 'modified',
        state: 'open',
        max: new Date(),
      },
      {
        label: this.intl.t('facets.sharing'),
        key: 'access',
        display: 'multi-select',
        field: 'access',
        options: [],
        operation: 'OR',
      },
    ];
  }
  openCatalogConfigTab() {
    this.arcgisHubEntityContentTabChangeRequest.emit(ContentPaneTabs.CATALOG_CONFIG);
  }
  /**
   * Combines the entity's catalog scope with the selected collection's scope
   * to create the unified IQuery that will be the base of the gallery's display
   */
  get query() {
    const catalogScope = this.entity.catalog.scopes.item;
    const collectionScope = this.selectedCollection.scope;
    // Collections often have a `scope.collection` shortcut field so they don't have to hard-code every
    // predicate definition. To make sure that this shortcut field gets included in the final IQuery, we
    // treat the collection scope as the base rather than the catalog scope.
    const result = cloneObject(collectionScope);
    result.filters = [...result.filters, ...catalogScope.filters];
    return result;
  }
  get selectedCollection() {
    return this.collections.find(c => c.key === this._selectedCollectionKey);
  }
  get _selectedCollectionKey() {
    const fallback = this.collections[0].key;
    return this.selectedCollectionKey || fallback;
  }
  get collections() {
    const collectionPersistances = this.entity.catalog.collections;
    return collectionPersistances.filter(c => !c.hidden);
  }
  handleCollectionSelect(evt) {
    this.selectedCollectionKey = evt.target.tab;
  }
  get addContentConfig() {
    // NOTE: This is overly complex because current site catalog configuration
    // and migration does not support the `types` property in the query
    // and instead uses "WellKnownCollections"
    // Although there is a hub.js function for this, it's not exported
    // because we really should not need it... but until we resolve the
    // well-known collections issue, we need to do this manually
    const userGroupsByMembership = {
      owner: [],
      member: [],
      admin: [],
    };
    // get the user's groups
    const userGroups = this._context.currentUser.groups || [];
    // loop through the groups and determine if the user is an admin or normal member
    // and add into the response
    userGroups.forEach((group) => {
      var _a, _b, _c;
      // We only want to add the group if it's in the catalogGroupIds
      if (this.catalogGroupIds.includes(group.id)) {
        if (((_a = group.userMembership) === null || _a === void 0 ? void 0 : _a.memberType) === "owner") {
          userGroupsByMembership.owner.push(group.id);
        }
        if (((_b = group.userMembership) === null || _b === void 0 ? void 0 : _b.memberType) === "admin") {
          userGroupsByMembership.admin.push(group.id);
        }
        // If user is just a member and the group is not view only
        if (((_c = group.userMembership) === null || _c === void 0 ? void 0 : _c.memberType) === "member" && !group.isViewOnly) {
          userGroupsByMembership.member.push(group.id);
        }
      }
    });
    const addExistingConfig = {
      targetEntity: 'item',
      workflow: 'existing',
      types: [],
      // Query for all items that are not in the catalog groups
      query: {
        targetEntity: 'item',
        filters: [
          {
            predicates: [
              {
                group: { not: [...this.catalogGroupIds] }
              }
            ]
          }
        ],
      },
      // These are the groups the user can choose to share to
      groups: userGroupsByMembership,
    };
    const existingWfConfig = {
      existing: addExistingConfig,
      state: 'enabled',
    };
    return {
      config: existingWfConfig,
      // allowGroupSelection: true,
      entity: this.entity,
      entityCapability: 'content',
    };
  }
  renderNoCollectionsView() {
    return (h(Fragment, null, h("h4", null, this.intl.t('noCollections.title')), h("p", null, this.intl.t('noCollections.message')), h("calcite-button", { appearance: "outline-fill", onClick: this.openCatalogConfigTab, round: true }, this.intl.t('noCollections.button'))));
  }
  updateShowThumbnail(event) {
    this.showThumbnail = event.detail.layout === 'grid';
  }
  handleAddContentWorkflowComplete() {
    setTimeout(() => {
      // ugh - we got the event so we know the stuff was shared but we need to give the api time to catch up
      this.contentGalleryRef.refresh();
    }, 2000);
  }
  get catalogGroupIds() {
    return getEntityCatalogGroupIds(this.entity);
  }
  render() {
    return (h(Host, { "data-element": "entity-content-catalog" }, h("div", { class: "title" }, h("h3", null, this.intl.t('title')), h("arcgis-hub-add-content", Object.assign({}, this.addContentConfig))), this.catalogGroupIds.length
      ? h("arcgis-hub-gallery", { corners: CORNERS.round, facets: this.facets, linkTarget: "siteRelative", mobileView: this.isMobile, query: this.query, ref: (el) => { this.contentGalleryRef = el; }, shadow: DROP_SHADOWS.low, "show-back-to-top-btn": true, "show-chips": true, "show-facets": true, "show-layout-switcher": true, "show-more-results-btn": true, "show-results-count": true, "show-search": true, "show-sort": true, showThumbnail: this.showThumbnail }, h("div", { slot: "collection-select" }, h("calcite-tabs", { layout: "center", scale: "l" }, h("calcite-tab-nav", { onCalciteTabsActivate: this.handleCollectionSelect, slot: "title-group" }, this.collections.map(c => h("calcite-tab-title", { key: c.key, selected: c.key === this._selectedCollectionKey, tab: c.key }, c.label || this.intl.t(`collections.${c.key}`)))))))
      : this.renderNoCollectionsView()));
  }
  static get is() { return "arcgis-hub-entity-content-catalog"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-content-catalog.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-content-catalog.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "entity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "HubEntityWithCatalog",
          "resolved": "IHubDiscussion & IWithCatalog | IHubEvent & IWithCatalog | IHubGroup & IWithCatalog | IHubInitiative & IWithCatalog | IHubPage & IWithCatalog | IHubProject & IWithCatalog | IHubSite & IWithCatalog | IHubSurvey & IWithCatalog | IHubTemplate & IWithCatalog | IHubUser & IWithCatalog",
          "references": {
            "HubEntityWithCatalog": {
              "location": "import",
              "path": "../../types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
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
      "facets": {},
      "_context": {},
      "selectedCollectionKey": {},
      "showThumbnail": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubEntityContentTabChangeRequest",
        "name": "arcgisHubEntityContentTabChangeRequest",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "ContentPaneTabs",
          "resolved": "ContentPaneTabs.CATALOG | ContentPaneTabs.CATALOG_CONFIG | ContentPaneTabs.COLLECTIONS | ContentPaneTabs.FEEDS",
          "references": {
            "ContentPaneTabs": {
              "location": "import",
              "path": "../../types"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get listeners() {
    return [{
        "name": "arcgisHubGalleryStateChange",
        "method": "updateShowThumbnail",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubAddContentWorkflowComplete",
        "method": "handleAddContentWorkflowComplete",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
