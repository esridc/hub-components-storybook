import { Catalog, cloneObject, createId, findBy } from '@esri/hub-common';
import { Host, h } from '@stencil/core';
import { bind } from '../../utils/context';
import intlManager from '../../utils/intl-manager';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { getGlobalContext, connectContext } from '../../utils/state';
export class ArcgisHubCatalog {
  /**
   * Pre-binds method context
   * @constructor
   */
  constructor() {
    this.accordionOpen = true;
    /**
     * List Catalogs instances created from the passed in Catalog Definition Json objects or IDs
     */
    this._catalogs = [];
    /**
     * Flag to indicate if we just set the active collection through a key. If so, we
     * need to wait until the render occurs to prevent changing values during rerender.
     */
    this._activeCollectionProgrammaticallySet = false;
    this.term = undefined;
    this.showAddContent = false;
    this.catalogs = undefined;
    this.targetEntity = undefined;
    this.activeCollectionKey = undefined;
    this.cardActionLinks = [];
    this.path = "";
    this.callback = undefined;
    this._context = getGlobalContext();
    this.layout = "list";
    this.layoutOptions = ['grid', 'list', 'table'];
    this.facets = undefined;
    this.gallerySelection = undefined;
    this.selectionMode = undefined;
    this.showThumbnail = false;
    this.showSelection = false;
    this.showBadges = false;
    this.showSearch = false;
    this.showLayoutSwitcher = false;
    this.newTab = false;
    this.linkTarget = undefined;
    this.showFacetForSingleCatalog = undefined;
    this.sortOptions = undefined;
    this.sortField = null;
    this.sortOrder = 'asc';
    this.sourceLabel = undefined;
    this.addContentProps = {};
    this.activeCollection = undefined;
    this.activeCatalog = undefined;
    bind(this, 'handleCalciteTabChange', 'handleCalciteRadioButtonGroupChange');
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  async initialize() {
    var _a, _b, _c;
    /**
     * 1. Filter out any collections that are hidden with the displayConfig: {  hidden: true }.
     *
     * If we have a targetEntity prop, we only keep collections that are not hidden AND are that target entity.
     * If we don't have a targetEntity prop, we only keep collections that are not hidden.
     */
    let catalogs = cloneObject(this.catalogs);
    // only do this step if we're working with IHubCatalog objects
    if (typeof this.catalogs[0] !== 'string') {
      // loop through all catalogs' collections
      catalogs = catalogs.reduce((acc, catalog) => {
        var _a;
        // filter out collections that are hidden
        catalog.collections = (_a = catalog.collections) === null || _a === void 0 ? void 0 : _a.filter((collection) => {
          var _a;
          const correctTargetEntity = this.targetEntity ? collection.targetEntity === this.targetEntity : true;
          const isVisible = !!((_a = collection.displayConfig) === null || _a === void 0 ? void 0 : _a.hidden) === false;
          return correctTargetEntity && isVisible;
        });
        return [...acc, catalog];
      }, []);
    }
    /**
     * 2. Construct a list of Catalog instances based on the type
     * of catalogs passed in.
     *
     * note: as any[] is needed to avoid a typescript compiler error
     * see https://github.com/microsoft/TypeScript/issues/36390#issuecomment-641718624
     */
    const prms = catalogs.reduce((acc, c) => {
      if (typeof c === 'string') {
        acc.push(Catalog.init(c, this._context));
      }
      else {
        acc.push(Catalog.fromJson(c, this._context));
      }
      return acc;
    }, []);
    this._catalogs = await Promise.all(prms);
    /**
     * 3. Ensure that each target entity defined on a catalog's scope
     * has a collection defined. If not, create an "empty" collection
     * for that target entity.
     *
     * If we have a targetEntity prop, we only focus on that target entity. Else, we do this for all target entity scopes.
     */
    this._catalogs.forEach(catalog => {
      const targetEntities = this.targetEntity ? [this.targetEntity] : catalog.availableScopes;
      targetEntities.forEach(targetEntity => {
        var _a;
        if (!((_a = catalog.collections) === null || _a === void 0 ? void 0 : _a.some(collection => collection.targetEntity === targetEntity))) {
          const emptyCollection = {
            label: this.intl.t(`targetEntity.${targetEntity}`),
            key: createId("collection"),
            targetEntity,
            scope: {
              targetEntity,
              filters: [
                { predicates: [] }
              ]
            },
          };
          catalog.addCollection(emptyCollection);
        }
      });
    });
    /** 4. set the active catalog */
    this.activeCatalog = this.activeCatalog
      ? this._catalogs.find(catalog => catalog.title === this.activeCatalog.title)
      : this._catalogs[0];
    this.arcgisHubCatalogActiveCatalogChange.emit(this.activeCatalog.title);
    /**
     * 5. Get the merged collection from the active catalog and
     * the first collection in the active catalog
     */
    let collection = this.activeCatalog.getCollection((_b = (_a = this.activeCatalog) === null || _a === void 0 ? void 0 : _a.collections[0]) === null || _b === void 0 ? void 0 : _b.key);
    // if we have an active collection key passed in, try to set it
    if (this.activeCollectionKey) {
      const collectionByKey = this.setActiveCollectionByKey(this.activeCollectionKey);
      // we may get nothing back, because that collection might be hidden right now
      // so default to what we had before in that case
      collection = collectionByKey || collection;
    }
    this.activeCollection = collection;
    ((_c = this.activeCollection) === null || _c === void 0 ? void 0 : _c.key) && this.arcgisHubCatalogActiveCollectionChange.emit(this.activeCollection.key);
  }
  async refresh() {
    this._galleryEl.refresh();
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    // Because there is no error message when a required prop is used outside of stencil,
    // we need to manually add it here
    if (!this.catalogs) {
      console.error('<arcgis-hub-catalog> component requires one or more catalogs be provided');
    }
    else {
      await this.initialize();
    }
    // Initialize the display configuration
    this.updateCatalogDisplayConfig();
  }
  componentDidRender() {
    // If we have an active collection key that was set programmatically
    // we need to wait until the render occurs to prevent changing values during rerender
    if (this._activeCollectionProgrammaticallySet) {
      this._activeCollectionProgrammaticallySet = false;
      this.arcgisHubCatalogActiveCollectionChange.emit(this.activeCollection.key);
    }
  }
  /**
   * display configuration settings for the entire catalog, separated by target entity
   */
  get _displayConfig() {
    var _a;
    let displayConfig = (_a = this.activeCatalog) === null || _a === void 0 ? void 0 : _a.displayConfig;
    if (displayConfig && displayConfig[this.targetEntity]) {
      displayConfig = displayConfig[this.targetEntity];
    }
    return displayConfig;
  }
  handleLayoutButtonSelect(event) {
    var _a;
    this.layout = event.detail;
    const showThumbnail = this._displayConfig.showThumbnail;
    const thumbnailActions = {
      grid: event.detail === 'grid',
      show: true,
      hide: false
    };
    this.showThumbnail = (_a = thumbnailActions[showThumbnail]) !== null && _a !== void 0 ? _a : this.showThumbnail;
  }
  /**
   * Updates the display configuration for the catalog,
   * this is triggered when the active catalog changes
   */
  updateCatalogDisplayConfig() {
    var _a, _b;
    const { layout, cardTitleTag, corners, shadow, showLinkButton, showThumbnail, linkButtonStyle, linkButtonText } = (_a = this._displayConfig) !== null && _a !== void 0 ? _a : {};
    Object.assign(this, { layout, cardTitleTag, corners, shadow, showLinkButton, showThumbnail, linkButtonStyle, linkButtonText });
    // if showThumbnail is set to 'grid',
    // only show it if the layout is grid
    const thumbnailActions = {
      grid: this.layout === 'grid',
      show: true,
      hide: false
    };
    this.showThumbnail = (_b = thumbnailActions[showThumbnail]) !== null && _b !== void 0 ? _b : this.showThumbnail;
  }
  /**
   * Sets the active collection by the key of the collection, if it exists in the catalog
   * @param collectionKey
   */
  setActiveCollectionByKey(collectionKey) {
    if (collectionKey && this.activeCatalog) {
      try {
        const collection = this.activeCatalog.getCollection(collectionKey);
        collection && (this.activeCollection = collection);
        collection && (this._activeCollectionProgrammaticallySet = true);
        return collection;
      }
      catch (e) {
        console.info('Collection with key', collectionKey, 'does not yet exist in the active catalog');
      }
    }
  }
  /**
   * Handle catalog radio button change
   * Assign merged collection to activeCollection
   * If there is no collection passed in, assign null and let Hub Gallery construct it there
   */
  handleCalciteRadioButtonGroupChange(evt) {
    // Adding this additional check here to prevent errors if there are other radio button facets
    // rendered in the gallery component
    const selectedCatalog = findBy(this._catalogs, "title", evt.target.selectedItem.value);
    if (selectedCatalog) {
      // 1. set the active catalog
      this.activeCatalog = selectedCatalog;
      this.arcgisHubCatalogActiveCatalogChange.emit(this.activeCatalog.title);
      // 2. set the active collection to the first collection in the active catalog
      this.activeCollection = this.activeCatalog.collections.find(collection => collection.key === this.activeCollection.key)
        ? this.activeCatalog.getCollection(this.activeCollection.key)
        : this.activeCatalog.getCollection(this.activeCatalog.collections[0].key);
      this.arcgisHubCatalogActiveCollectionChange.emit(this.activeCollection.key);
      // 3. emit telemetry for the source facets that's
      // consistent with the other gallery facets
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary
        .category.interaction
        .action.search
        .label.filter), { details: `source: ${selectedCatalog.title}` }));
    }
  }
  /**
   * Handle collection change
   */
  handleCalciteTabChange(evt) {
    this.activeCollection = this.activeCatalog.getCollection(evt.target.tab);
    this.arcgisHubCatalogActiveCollectionChange.emit(this.activeCollection.key);
    // Emit telemetry for the collection change
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary
      .category.interaction
      .action.search
      .label.click), { details: 'catalog tabs' }));
  }
  /**
   * The catalog facet we want to render on top of all the other facets in hub gallery
   */
  renderCatalogFacet() {
    return h("calcite-accordion", { appearance: "transparent", scale: "l" }, h("calcite-accordion-item", { expanded: this.accordionOpen, heading: this.sourceLabel || this.intl.t('source') }, h("calcite-radio-button-group", { layout: 'vertical', name: 'catalog-group', onCalciteRadioButtonGroupChange: this.handleCalciteRadioButtonGroupChange }, this._catalogs.map((catalog, idx) => {
      return h("calcite-label", { key: catalog.title, layout: "inline" }, h("calcite-radio-button", { checked: idx === 0, id: catalog.title, name: catalog.title, value: catalog.title }), h("span", { class: "catalog" }, catalog.title));
    }))));
  }
  ;
  renderCollections(collections) {
    return h("calcite-tab-nav", { slot: "title-group" }, collections.map((collection) => {
      return h("calcite-tab-title", { key: collection.key, onCalciteTabsActivate: this.handleCalciteTabChange, selected: this.activeCollection.key === collection.key, tab: collection.key }, collection.label);
    }));
  }
  render() {
    var _a;
    const showCollections = ((_a = this.activeCatalog) === null || _a === void 0 ? void 0 : _a.collections.length) > 1;
    const showCatalogFacets = this.showFacetForSingleCatalog || this._catalogs.length > 1;
    const collection = this.activeCollection.toJson();
    const include = collection.include && collection.include.join('|');
    return (h(Host, { "data-element": "catalog" }, h("arcgis-hub-gallery", { addContentProps: this.addContentProps, additionalFacet: showCatalogFacets && this.renderCatalogFacet(), callback: this.callback, cardActionLinks: this.cardActionLinks, cardTitleTag: this.cardTitleTag, corners: this.corners, facets: this.facets, gallerySelection: this.gallerySelection, include: include, layout: this.layout, layoutOptions: this.layoutOptions, linkButtonStyle: this.linkButtonStyle, linkButtonText: this.linkButtonText, linkTarget: this.linkTarget, newTab: this.newTab, path: this.path, query: collection.scope, ref: (el) => { this._galleryEl = el; }, selectionMode: this.selectionMode, shadow: this.shadow, showAddContent: this.showAddContent, showBackToTopBtn: true, showBadges: this.showBadges, showChips: true, showFacets: this.facets && this.facets.length > 0, showLayoutSwitcher: this.showLayoutSwitcher, showLinkButton: this.showLinkButton, showMoreResultsBtn: true, showResultsCount: true, showSearch: this.showSearch, showSelection: this.showSelection, showSort: true, showThumbnail: this.showThumbnail, sortField: this.sortField, sortOptions: this.sortOptions, sortOrder: this.sortOrder, term: this.term || "" }, h("calcite-tabs", { layout: "center", scale: "l", slot: "collection-select" }, showCollections && this.renderCollections(this.activeCatalog.collections)))));
  }
  static get is() { return "arcgis-hub-catalog"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-catalog.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-catalog.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "term": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Term passed into the galleries"
        },
        "attribute": "term",
        "reflect": false
      },
      "showAddContent": {
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
          "text": "Show/hide the add content button"
        },
        "attribute": "show-add-content",
        "reflect": false,
        "defaultValue": "false"
      },
      "catalogs": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubCatalog[] | string[]",
          "resolved": "IHubCatalog[] | string[]",
          "references": {
            "IHubCatalog": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": true,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "List of Catalog Definition Json objects or IDs(site url or item ID), required"
        }
      },
      "targetEntity": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "EntityType",
          "resolved": "\"channel\" | \"communityUser\" | \"discussionPost\" | \"event\" | \"eventAttendee\" | \"group\" | \"groupMember\" | \"item\" | \"portalUser\" | \"user\"",
          "references": {
            "EntityType": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Optional target entity to filter the catalog by"
        },
        "attribute": "target-entity",
        "reflect": false
      },
      "activeCollectionKey": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "A key that represents what should be set as the active collection upon initialization.\nWhen this prop changes, the active collection will be updated accordingly.\n\nThis is only useful when you want to programmatically set the active collection without the user\nchanging the collections themselves."
        },
        "attribute": "active-collection-key",
        "reflect": false
      },
      "cardActionLinks": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ICardActionLink[]",
          "resolved": "ICardActionLink[]",
          "references": {
            "ICardActionLink": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "gallery card action links\n\nNote: if action links are dependent on the active catalog\nand/or collection, listen for the arcgisHubCatalogActiveCatalogChange\nand/or arcgisHubCatalogActiveCollectionChange events to update the\ncardActionLinks prop accordingly."
        },
        "defaultValue": "[]"
      },
      "path": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Content Hierarchy Path that will be passed onto the gallery component\nso links are constructed with the correct path"
        },
        "attribute": "path",
        "reflect": false,
        "defaultValue": "\"\""
      },
      "callback": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "(\n    model: IHubCardViewModel,\n    layout: string,\n    context: IArcGISContext,\n    raw: IHubSearchResult | HubEntity\n  ) => IHubCardViewModel",
          "resolved": "(model: IHubCardViewModel, layout: string, context: IArcGISContext, raw: HubEntity | IHubSearchResult) => IHubCardViewModel",
          "references": {
            "IHubCardViewModel": {
              "location": "import",
              "path": "@esri/hub-common"
            },
            "IArcGISContext": {
              "location": "import",
              "path": "@esri/hub-common"
            },
            "IHubSearchResult": {
              "location": "import",
              "path": "@esri/hub-common"
            },
            "HubEntity": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Callback fn to customize gallery card view models\ne.g. badges, actions, and meta information shown\non the card.\n\nNote: if the callback is dependent on the active catalog\nand/or collection, listen for the arcgisHubCatalogActiveCatalogChange\nand/or arcgisHubCatalogActiveCollectionChange events to update\nthe callback prop accordingly."
        }
      },
      "layout": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "LayoutOptions",
          "resolved": "\"calendar\" | \"compact\" | \"grid\" | \"grid-filled\" | \"list\" | \"map\" | \"table\"",
          "references": {
            "LayoutOptions": {
              "location": "import",
              "path": "../../utils/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Layout of each card in hub gallery"
        },
        "attribute": "layout",
        "reflect": false,
        "defaultValue": "\"list\""
      },
      "layoutOptions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "LayoutOptions[]",
          "resolved": "LayoutOptions[]",
          "references": {
            "LayoutOptions": {
              "location": "import",
              "path": "../../utils/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "List of layout options that the user can switch between\nThese options are rendered by the layout switcher in the header"
        },
        "defaultValue": "[ 'grid', 'list', 'table' ]"
      },
      "facets": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Array<WellKnownFacetTypes | IFacet>",
          "resolved": "(\"access\" | \"categories\" | \"tags\" | \"location\" | \"type\" | \"source\" | \"modified\" | IFacet | \"license\" | \"group-role\" | \"group-type\" | \"group-access\" | \"event-from\" | \"event-access\" | \"event-date\")[]",
          "references": {
            "Array": {
              "location": "global"
            },
            "WellKnownFacetTypes": {
              "location": "import",
              "path": "../arcgis-hub-gallery/utils/facets"
            },
            "IFacet": {
              "location": "import",
              "path": "../../utils/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Facets to render in hub gallery, can be a list of facet types,\nIFacets or both"
        }
      },
      "gallerySelection": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IGallerySelection",
          "resolved": "{ item?: string[]; event?: string[]; group?: string[]; user?: string[]; portalUser?: string[]; communityUser?: string[]; groupMember?: string[]; channel?: string[]; discussionPost?: string[]; eventAttendee?: string[]; }",
          "references": {
            "IGallerySelection": {
              "location": "import",
              "path": "../../utils/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Collection of selected entity IDs as an IGallerySelection object"
        }
      },
      "selectionMode": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "SelectionMode",
          "resolved": "\"multiple\" | \"none\" | \"single\"",
          "references": {
            "SelectionMode": {
              "location": "import",
              "path": "../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Whether to make the cards selectable in the gallery"
        },
        "attribute": "selection-mode",
        "reflect": false
      },
      "showThumbnail": {
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
          "text": "Whether to show the thumbnail in each card"
        },
        "attribute": "show-thumbnail",
        "reflect": false,
        "defaultValue": "false"
      },
      "showSelection": {
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
          "text": "Whether to show the entities in the `gallerySelection` to the result list"
        },
        "attribute": "show-selection",
        "reflect": false,
        "defaultValue": "false"
      },
      "showBadges": {
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
          "text": "Show/hide available badges on each card. Badges are defined in the view model of each card."
        },
        "attribute": "show-badges",
        "reflect": false,
        "defaultValue": "false"
      },
      "showSearch": {
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
          "text": "Whether to show/hide search input in the gallery"
        },
        "attribute": "show-search",
        "reflect": false,
        "defaultValue": "false"
      },
      "showLayoutSwitcher": {
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
          "text": "whether to show/hide the layout switcher in the gallery"
        },
        "attribute": "show-layout-switcher",
        "reflect": false,
        "defaultValue": "false"
      },
      "newTab": {
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
          "text": "Whether the target url for individual cards should open up in a new tab"
        },
        "attribute": "new-tab",
        "reflect": false,
        "defaultValue": "false"
      },
      "linkTarget": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "CardModelTarget",
          "resolved": "\"event\" | \"none\" | \"self\" | \"siteRelative\" | \"workspaceRelative\"",
          "references": {
            "CardModelTarget": {
              "location": "import",
              "path": "../../utils/cardModelConverters/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "indicates where the card should redirect"
        },
        "attribute": "link-target",
        "reflect": false
      },
      "showFacetForSingleCatalog": {
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
          "text": "Whether to show/hide catalog facets\nThis is specifically designed for situation when there\nis only one catalog but we still want to show it in the\nfacet list. If we don't set this to true, the catalog will\nbe hidden in the facet list when there is only one catalog"
        },
        "attribute": "show-facet-for-single-catalog",
        "reflect": false
      },
      "sortOptions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "SortOption[]",
          "resolved": "SortOption[]",
          "references": {
            "SortOption": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "A list of sort options for the sort field"
        }
      },
      "sortField": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Default sort field. Null indicates that no sorting should be applied to the initial search requests."
        },
        "attribute": "sort-field",
        "reflect": false,
        "defaultValue": "null"
      },
      "sortOrder": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'asc' | 'desc'",
          "resolved": "\"asc\" | \"desc\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Default sort order. Null indicates that the backing api's default sort direction should be used in\nthe initial search requests."
        },
        "attribute": "sort-order",
        "reflect": false,
        "defaultValue": "'asc'"
      },
      "sourceLabel": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "label for the catalog facets - defaults to \"Source\""
        },
        "attribute": "source-label",
        "reflect": false
      },
      "addContentProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Record<string, any>",
          "resolved": "{ [x: string]: any; }",
          "references": {
            "Record": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Pass in props that will be applied to the -add-content component"
        },
        "defaultValue": "{}"
      }
    };
  }
  static get states() {
    return {
      "_context": {},
      "activeCollection": {},
      "activeCatalog": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubCatalogActiveCatalogChange",
        "name": "arcgisHubCatalogActiveCatalogChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "event that's emitted when the active catalog changes"
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }, {
        "method": "arcgisHubCatalogActiveCollectionChange",
        "name": "arcgisHubCatalogActiveCollectionChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "event that's emitted when the active catalog changes"
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }, {
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "event to emit Hub telemetry"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "refresh": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "catalogs",
        "methodName": "initialize"
      }, {
        "propName": "targetEntity",
        "methodName": "initialize"
      }, {
        "propName": "activeCatalog",
        "methodName": "updateCatalogDisplayConfig"
      }, {
        "propName": "activeCollectionKey",
        "methodName": "setActiveCollectionByKey"
      }];
  }
  static get listeners() {
    return [{
        "name": "arcgisHubLayoutButtonSelect",
        "method": "handleLayoutButtonSelect",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
