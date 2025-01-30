import { CardModelTarget, ICardActionLink, IHubCardViewModel, IHubSearchResult, IInfoConfig } from '@esri/hub-common';
import { VNode, EventEmitter } from '../../../../stencil-public-runtime';
import { IMAGE_TYPES, SelectionMode } from '../../../interfaces';
import { IGalleryResultsLayout } from '../../utils/types';
import { ComponentIntl } from "../../../../utils/stencil-intl";
import { CardViewModelCallback } from '../../../../utils/cardModelConverters/types';
/**
 * arcgis-hub-gallery-layout-compact
 * A component for rendering an array of IHubSearchResults in a compact layout
 * Can be used standalone or via the gallery with layout="compact"
 *
 * NOTE: This component is not yet fully implemented
 */
export declare class ArcgisHubGalleryLayoutCompact implements IGalleryResultsLayout {
  element: HTMLElement;
  constructor();
  searchResults: IHubSearchResult[];
  loading: boolean;
  selectedIds: string[];
  baseUrl: any;
  linkTarget: CardModelTarget;
  limit: number;
  newTab: boolean;
  cardTitleTag: string;
  showEmptyState: boolean;
  get shouldRenderEmptyState(): boolean;
  showThumbnail: boolean;
  imageType: IMAGE_TYPES;
  lazy: boolean;
  selectionMode: SelectionMode;
  showLinkButton: boolean;
  linkButtonText: string;
  cardActionLinks: ICardActionLink[];
  lastSearchResultsCount: number;
  hasError: boolean;
  callback: CardViewModelCallback;
  /**
   * Focusable (but invisible) element at the end of the previous set of results.
   * Used to comply with accessibility requirements.
   */
  previousResultsEnd: HTMLSpanElement;
  arcgisHubCardSelect: EventEmitter<IHubCardViewModel>;
  intl: ComponentIntl;
  private get context();
  componentWillLoad(): Promise<void>;
  componentDidUpdate(): void;
  handleSelect(event: CustomEvent): void;
  setPreviousResultsEnd(el: HTMLSpanElement): void;
  renderThumbnail(model: IHubCardViewModel): VNode;
  getViewModel(model: IHubSearchResult): IHubCardViewModel;
  renderResult(result: IHubSearchResult): VNode;
  renderTitle(model: IHubCardViewModel): VNode;
  renderAdditionalInfo(infos: Array<IInfoConfig>): VNode[];
  renderActionLink(actionLink: ICardActionLink, newTab: boolean, key: string): VNode;
  renderButtonActionLink(actionLink: ICardActionLink, newTab: boolean, key: string): VNode;
  renderToolltip(actionLink: ICardActionLink, key: string): VNode;
  renderActionActionLink(actionLink: ICardActionLink, key: string): VNode;
  _renderLoading(): VNode;
  /**
   * Render an empty state if there are no results,
   * or if there is an error
   */
  _renderEmptyState(): VNode;
  _renderResults(): VNode;
  render(): any;
}
