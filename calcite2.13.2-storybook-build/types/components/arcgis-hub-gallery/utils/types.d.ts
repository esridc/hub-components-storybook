import { CardModelTarget, HubEntity, IArcGISContext, ICardActionLink, IHubCardViewModel, IHubSearchResult } from "@esri/hub-common";
import { LayoutOptions } from "../../../utils/types";
import { CORNERS, DROP_SHADOWS, IMAGE_TYPES, SelectionMode } from "../../interfaces";
import { Appearance } from "@esri/calcite-components";
export interface IGalleryResultsLayout {
  element: HTMLElement;
  baseUrl: any;
  /**
   * Passing a callback function into the gallery allows the developer to apply custom
   * business logic to the processing of the Card View model. This is useful in scenarios
   * where we want to show non-standard metadata, badges, actions and to apply logic to
   * the selectability of the card.
   */
  callback?: (model: IHubCardViewModel, layout: string, context: IArcGISContext, raw: IHubSearchResult | HubEntity) => IHubCardViewModel;
  cardActionLinks: ICardActionLink[];
  /**
   * Pre-defined options of where the card should redirect
   */
  linkTarget: CardModelTarget;
  loading: boolean;
  /**
   * Whether the target url for individual cards should open up in a new tab
   */
  newTab: boolean;
  searchResults: IHubSearchResult[];
  /**
   * Whether the gallery should show special empty state when the current search has returned no results
   */
  showEmptyState: boolean;
  /**
   * The gallery layout: list, grid, grid-filled, or map - default is list
   * most of them know what their layout is but arcgis-hub-gallery-layout-list
   * handles both list and grid and needs to know which one
   */
  layout?: LayoutOptions;
  selectedMapFeatureIds?: string[];
  selectedIds?: string[];
  limit?: number;
  showThumbnail?: boolean;
  /**
   * The type of image that individual cards will display.
   * Either thumbnail or icon, defaults to thumbnail.
   */
  imageType?: IMAGE_TYPES;
  /**
   * Indicates if the thumbnail on individual cards should lazy load
   */
  lazy?: boolean;
  /**
   * Whether individual cards are selectable via a checkbox
   */
  selectionMode?: SelectionMode;
  /**
   * Defines what tag (i.e <h3>, <h4>) should wrap the titles on each card. Used for accessibility compliance.
   */
  cardTitleTag?: string;
  /**
   * Defines how the corners of each card are styled.
   */
  corners?: CORNERS;
  /**
   * Whether individual cards should display additional info (metadata) about their view models
   */
  showAdditionalInfo?: boolean;
  /**
   * Defines how heavy of a drop shadow should be applied to the individual cards
   */
  shadow?: DROP_SHADOWS;
  /**
   * Whether the individual cards should add a link button (as opposed to relying on
   * the link in the card's title). Must be used in conjunction with `linkButtonText`.
   */
  showLinkButton?: boolean;
  /**
   * The text to display on each card's link button. Must be used in conjunction with `showlinkButton`.
   */
  linkButtonText?: string;
  /**
   * Sets the style of each card's link button. Must be used in conjunction with `showlinkButton`.
   */
  linkButtonStyle?: Appearance;
  /**
   * Show/hide available badges on each card. Badges are defined in the view model of each card.
   */
  showBadges?: boolean;
  /**
   * Show/hide the view model's family name and icon on each card
   */
  showType?: boolean;
  /**
   * Show/hide the view model's source information on each card
   */
  showOwner?: boolean;
  /**
   * The number of search results from the last search
   * used by some layouts for a11y purposes
   */
  lastSearchResultsCount?: number;
  hasError?: boolean;
}
