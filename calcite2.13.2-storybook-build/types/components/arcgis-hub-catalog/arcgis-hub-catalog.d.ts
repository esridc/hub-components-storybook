import { Catalog, Collection, EntityType, HubEntity, IArcGISContext, ICardActionLink, IGalleryDisplayConfig, IHubCardViewModel, IHubCatalog, IHubCollection, IHubSearchResult, SortOption } from '@esri/hub-common';
import { VNode, EventEmitter } from '../../stencil-public-runtime';
import { Appearance, CalciteRadioButtonGroupCustomEvent, CalciteTabTitleCustomEvent } from '@esri/calcite-components';
import { IFacet, IGallerySelection, LayoutOptions } from '../../utils/types';
import { ComponentIntl } from '../../utils/stencil-intl';
import { CORNERS, DROP_SHADOWS, SelectionMode } from '../interfaces';
import { IWithContext } from '../../utils/state';
import { CardModelTarget } from '../../utils/cardModelConverters/types';
import { WellKnownFacetTypes } from '../arcgis-hub-gallery/utils/facets';
export declare class ArcgisHubCatalog implements IWithContext {
  element: HTMLElement;
  /**
   * Term passed into the galleries
   */
  term: string;
  /**
   * Show/hide the add content button
   */
  showAddContent: boolean;
  /**
   * List of Catalog Definition Json objects or IDs(site url or item ID), required
   */
  catalogs: IHubCatalog[] | string[];
  /**
   * Optional target entity to filter the catalog by
   */
  targetEntity?: EntityType;
  /**
   * A key that represents what should be set as the active collection upon initialization.
   * When this prop changes, the active collection will be updated accordingly.
   *
   * This is only useful when you want to programmatically set the active collection without the user
   * changing the collections themselves.
   */
  activeCollectionKey?: string;
  /**
   * gallery card action links
   *
   * Note: if action links are dependent on the active catalog
   * and/or collection, listen for the arcgisHubCatalogActiveCatalogChange
   * and/or arcgisHubCatalogActiveCollectionChange events to update the
   * cardActionLinks prop accordingly.
   */
  cardActionLinks: ICardActionLink[];
  /**
   * Content Hierarchy Path that will be passed onto the gallery component
   * so links are constructed with the correct path
   */
  path: string;
  /**
   * Callback fn to customize gallery card view models
   * e.g. badges, actions, and meta information shown
   * on the card.
   *
   * Note: if the callback is dependent on the active catalog
   * and/or collection, listen for the arcgisHubCatalogActiveCatalogChange
   * and/or arcgisHubCatalogActiveCollectionChange events to update
   * the callback prop accordingly.
   */
  callback: (model: IHubCardViewModel, layout: string, context: IArcGISContext, raw: IHubSearchResult | HubEntity) => IHubCardViewModel;
  _context: IArcGISContext;
  disconnectContext: () => void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  /**
   * Layout of each card in hub gallery
   */
  layout: LayoutOptions;
  /**
   * List of layout options that the user can switch between
   * These options are rendered by the layout switcher in the header
   */
  layoutOptions: LayoutOptions[];
  /**
   * Facets to render in hub gallery, can be a list of facet types,
   * IFacets or both
   */
  facets: Array<WellKnownFacetTypes | IFacet>;
  /**
   * Collection of selected entity IDs as an IGallerySelection object
   */
  gallerySelection: IGallerySelection;
  /**
   * Whether to make the cards selectable in the gallery
   */
  selectionMode: SelectionMode;
  /**
   * Whether to show the thumbnail in each card
   */
  showThumbnail: boolean;
  /**
   * Whether to show the entities in the `gallerySelection` to the result list
   */
  showSelection: boolean;
  /**
   * Show/hide available badges on each card. Badges are defined in the view model of each card.
   */
  showBadges: boolean;
  /**
   * Whether to show/hide search input in the gallery
   */
  showSearch: boolean;
  /** whether to show/hide the layout switcher in the gallery */
  showLayoutSwitcher: boolean;
  /**
   * Whether the target url for individual cards should open up in a new tab
   */
  newTab: boolean;
  /** indicates where the card should redirect */
  linkTarget: CardModelTarget;
  /**
   * Whether to show/hide catalog facets
   * This is specifically designed for situation when there
   * is only one catalog but we still want to show it in the
   * facet list. If we don't set this to true, the catalog will
   * be hidden in the facet list when there is only one catalog
   */
  showFacetForSingleCatalog: boolean;
  /**
   * A list of sort options for the sort field
   */
  sortOptions: SortOption[];
  /**
   * Default sort field. Null indicates that no sorting should be applied to the initial search requests.
   */
  sortField: string;
  /**
   * Default sort order. Null indicates that the backing api's default sort direction should be used in
   * the initial search requests.
   */
  sortOrder: 'asc' | 'desc';
  /** label for the catalog facets - defaults to "Source" */
  sourceLabel: string;
  /**
  * Pass in props that will be applied to the -add-content component
  */
  addContentProps: Record<string, any>;
  /**
   * Collection currently being selected
   */
  activeCollection: Collection;
  /**
   * Catalog currently being selected
   */
  activeCatalog: Catalog;
  /**
   * Defines what tag (i.e <h3>, <h4>) should wrap the titles on each card. Used for accessibility compliance.
   */
  cardTitleTag: string;
  /**
   * Defines how the corners of each card are styled.
   */
  corners: CORNERS;
  /**
   * Defines how heavy of a drop shadow should be applied to the individual cards
   */
  shadow: DROP_SHADOWS;
  /**
   * Whether the individual cards should add a link button (as opposed to relying on
   * the link in the card's title). Must be used in conjunction with `linkButtonText`.
   */
  showLinkButton: boolean;
  /**
   * The text to display on each card's link button. Must be used in conjunction with `showlinkButton`.
   */
  linkButtonText: string;
  /**
   * Sets the style of each card's link button. Must be used in conjunction with `showlinkButton`.
   */
  linkButtonStyle: Appearance;
  initialize(): Promise<void>;
  intl: ComponentIntl;
  accordionOpen: boolean;
  /**
   * List Catalogs instances created from the passed in Catalog Definition Json objects or IDs
   */
  _catalogs: Catalog[];
  _galleryEl: HTMLArcgisHubGalleryElement;
  /**
   * Flag to indicate if we just set the active collection through a key. If so, we
   * need to wait until the render occurs to prevent changing values during rerender.
   */
  _activeCollectionProgrammaticallySet: boolean;
  /** event that's emitted when the active catalog changes */
  arcgisHubCatalogActiveCatalogChange: EventEmitter<string>;
  /** event that's emitted when the active catalog changes */
  arcgisHubCatalogActiveCollectionChange: EventEmitter<string>;
  /** event to emit Hub telemetry */
  hubTelemetry: EventEmitter<any>;
  refresh(): Promise<void>;
  /**
   * Pre-binds method context
   * @constructor
   */
  constructor();
  componentWillLoad(): Promise<void>;
  componentDidRender(): void;
  /**
   * display configuration settings for the entire catalog, separated by target entity
   */
  get _displayConfig(): IGalleryDisplayConfig;
  handleLayoutButtonSelect(event: CustomEvent<LayoutOptions>): void;
  /**
   * Updates the display configuration for the catalog,
   * this is triggered when the active catalog changes
   */
  updateCatalogDisplayConfig(): void;
  /**
   * Sets the active collection by the key of the collection, if it exists in the catalog
   * @param collectionKey
   */
  setActiveCollectionByKey(collectionKey: string): Collection;
  /**
   * Handle catalog radio button change
   * Assign merged collection to activeCollection
   * If there is no collection passed in, assign null and let Hub Gallery construct it there
   */
  handleCalciteRadioButtonGroupChange(evt: CalciteRadioButtonGroupCustomEvent<void>): void;
  /**
   * Handle collection change
   */
  handleCalciteTabChange(evt: CalciteTabTitleCustomEvent<void>): void;
  /**
   * The catalog facet we want to render on top of all the other facets in hub gallery
   */
  renderCatalogFacet(): VNode[];
  renderCollections(collections: IHubCollection[]): VNode;
  render(): VNode;
}
