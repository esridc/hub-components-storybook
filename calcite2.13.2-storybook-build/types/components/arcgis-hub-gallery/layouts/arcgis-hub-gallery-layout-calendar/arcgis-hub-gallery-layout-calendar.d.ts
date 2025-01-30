import { VNode } from '../../../../stencil-public-runtime';
import { CORNERS, DROP_SHADOWS, IMAGE_TYPES, SelectionMode } from '../../../interfaces';
import { Appearance } from '@esri/calcite-components/dist/types/components/interfaces';
import { IHubSearchResult, CardModelTarget, ICardActionLink } from '@esri/hub-common';
import { CardViewModelCallback } from '../../../../utils/cardModelConverters/types';
import { IGalleryResultsLayout } from '../../utils/types';
/**
 * arcgis-hub-gallery-layout-calendar
 * A component for rendering an array of IHubSearchResults in a calendar layout
 * Can be used standalone or via the gallery with layout="calendar"
 */
export declare class ArcgisHubGalleryLayoutCalendar implements IGalleryResultsLayout {
  element: HTMLElement;
  /**
   * Array of search results
   */
  searchResults: IHubSearchResult[];
  /**
   * Whether or not component is loading
   */
  loading: boolean;
  /**
   * Base url
   */
  baseUrl: any;
  /**
   * Link target
   */
  linkTarget: CardModelTarget;
  /**
   * Result limit
   */
  limit: number;
  /**
   * Whether the target url for individual cards should open up in a new tab
   */
  newTab: boolean;
  /**
   * Whether individual cards should display additional info (metadata) about their view models
   */
  showAdditionalInfo: boolean;
  /**
   * Whether the gallery should show special empty state when the current search has returned no results
   */
  showEmptyState: boolean;
  /**
   * Whether the individual cards should add a link button (as opposed to relying on the link in the card's title). Must be used in conjunction with `linkButtonText`
   */
  showLinkButton: boolean;
  /**
   * Show/hide available badges on each card. Badges are defined in the view model of each card.
   */
  showBadges: boolean;
  /**
   * Show/hide the view model's family name and icon on each card
   */
  showType: boolean;
  /**
   * Show/hide the view model's source information on each card
   */
  showOwner: boolean;
  /**
   * Card action links
   */
  cardActionLinks: ICardActionLink[];
  /**
   * Whether or not the component has encountered an error
   */
  hasError: boolean;
  /**
   * Passing a callback function allows the developer to apply custom business logic to the processing of the Card View model.
   * This is useful in scenarios where we want to show non-standard metadata, badges, actions and to apply logic to the selectability of the card.
   */
  callback: CardViewModelCallback;
  /**
   * Whether or not the list of search results should render
   */
  shouldShowResults: boolean;
  /**
   * Whether or not the thumbnail should render
   */
  showThumbnail: boolean;
  /**
   * Defines how the corners of each card are styled
   */
  corners: CORNERS;
  /**
   * Defines how heavy of a drop shadow should be applied to the individual cards
   */
  shadow: DROP_SHADOWS;
  /**
   * Array of selected ids
   */
  selectedIds: string[];
  /**
   * Whether individual cards are selectable via a checkbox
   */
  selectionMode: SelectionMode;
  /**
   * The text to display on each card's link button. Must be used in conjunction with `showlinkButton`
   */
  linkButtonText: string;
  /**
   * Sets the style of each card's link button. Must be used in conjunction with `showlinkButton`
   */
  linkButtonStyle: Appearance;
  /**
   * Defines what tag (i.e , ) should wrap the titles on each card. Used for accessibility compliance.
   */
  cardTitleTag: string;
  /**
   * The number of search results from the last search used by some layouts for a11y purposes
   */
  lastSearchResultsCount: number;
  /**
   * The type of image that individual cards will display. Either thumbnail or icon, defaults to thumbnail.
   */
  imageType: IMAGE_TYPES;
  /**
   * Indicates if the thumbnail on individual cards should lazy load
   */
  lazy: boolean;
  get shouldRenderEmptyState(): boolean;
  _renderLoading(): VNode;
  _renderCalendar(): VNode;
  _renderList(): VNode;
  render(): any;
}
