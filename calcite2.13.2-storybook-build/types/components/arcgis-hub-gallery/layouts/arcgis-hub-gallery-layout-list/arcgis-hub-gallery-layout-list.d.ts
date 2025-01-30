import { CardModelTarget, ICardActionLink, IHubSearchResult } from '@esri/hub-common';
import { VNode } from '../../../../stencil-public-runtime';
import { LayoutOptions } from '../../../../utils/types';
import { CORNERS, DROP_SHADOWS, IMAGE_TYPES, SelectionMode } from '../../../interfaces';
import { Appearance } from '@esri/calcite-components';
import { IGalleryResultsLayout } from '../../utils/types';
import { ComponentIntl } from "../../../../utils/stencil-intl";
import { CardViewModelCallback } from '../../../../utils/cardModelConverters/types';
/**
 * arcgis-hub-gallery-layout-list
 * A component for rendering an array of IHubSearchResults in a list, grid, or grid-filled layout
 * Can be used standalone or via the gallery with layout="list|grid|grid-filled"
 */
export declare class ArcgisHubGalleryLayoutList implements IGalleryResultsLayout {
  element: HTMLElement;
  constructor();
  layout: LayoutOptions;
  searchResults: IHubSearchResult[];
  loading: boolean;
  selectedMapFeatureIds: string[];
  selectedIds: string[];
  baseUrl: any;
  linkTarget: CardModelTarget;
  limit: number;
  showThumbnail: boolean;
  imageType: IMAGE_TYPES;
  lazy: boolean;
  newTab: boolean;
  selectionMode: SelectionMode;
  get selectable(): boolean;
  cardTitleTag: string;
  corners: CORNERS;
  showAdditionalInfo: boolean;
  showEmptyState: boolean;
  get shouldRenderEmptyState(): boolean;
  shadow: DROP_SHADOWS;
  showLinkButton: boolean;
  linkButtonText: string;
  linkButtonStyle: Appearance;
  showBadges: boolean;
  showType: boolean;
  showOwner: boolean;
  cardActionLinks: ICardActionLink[];
  handleMouseEventEntityCard: (event: MouseEvent) => void;
  lastSearchResultsCount: number;
  hasError: boolean;
  callback: CardViewModelCallback;
  primaryActionsToRender: 1 | 2 | 3;
  gridColumns: number;
  /**
   * Focusable (but invisible) element at the bottom of the gallery result list.
   * Used to comply with accessibility requirements.
   */
  previousResultsEnd: HTMLSpanElement;
  intl: ComponentIntl;
  componentWillLoad(): Promise<void>;
  connectedCallback(): void;
  disconnectedCallback(): void;
  componentDidUpdate(): void;
  handleResize(): Promise<void>;
  setPreviousResultsEnd(el: HTMLSpanElement): void;
  getCardLayout: (layout: string, idx: number, count: number) => 'row' | 'card';
  renderResult(result: IHubSearchResult, idx?: number): VNode;
  _renderLoading(): VNode;
  /**
   * Render an empty state if there are no results,
   * or if there is an error
   */
  _renderEmptyState(): VNode;
  _renderResults(): VNode;
  render(): any;
}
