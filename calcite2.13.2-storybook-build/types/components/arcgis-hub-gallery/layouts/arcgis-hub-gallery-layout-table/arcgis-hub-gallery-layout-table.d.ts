import { CardModelTarget, EntityType, ICardActionLink, IHubCardViewModel, IHubSearchResult } from '@esri/hub-common';
import { EventEmitter, VNode } from '../../../../stencil-public-runtime';
import { SelectionMode } from '../../../interfaces';
import { IGalleryResultsLayout } from '../../utils/types';
import { CardViewModelCallback } from '../../../../utils/cardModelConverters/types';
import { ComponentIntl } from "../../../../utils/stencil-intl";
import { GalleryTableColumnName, IGalleryTableColumn, IGalleryTableRowModel } from '../../utils/get-table-columns';
/**
 * arcgis-hub-gallery-layout-table
 * A component for rendering an array of IHubSearchResults in a table layout
 * Can be used standalone or via the gallery with layout="table"
 */
export declare class ArcgisHubGalleryLayoutTable implements IGalleryResultsLayout {
  element: HTMLElement;
  searchResults: IHubSearchResult[];
  loading: boolean;
  selectedIds: string[];
  baseUrl: any;
  entityType: EntityType;
  linkTarget: CardModelTarget;
  limit: number;
  newTab: boolean;
  selectionMode: SelectionMode;
  showAdditionalInfo: boolean;
  showType: boolean;
  showOwner: boolean;
  cardActionLinks: ICardActionLink[];
  showEmptyState: boolean;
  showThumbnail: boolean;
  get shouldRenderEmptyState(): boolean;
  lastSearchResultsCount: number;
  hasError: boolean;
  callback: CardViewModelCallback;
  /**
   * The columns to render when the layout is 'table'
   * If not provided, the default columns for the entity type will be used
   * see ../layouts.md for more info
   */
  columns: (IGalleryTableColumn | GalleryTableColumnName)[];
  arcgisHubCardSelect: EventEmitter<IHubCardViewModel>;
  arcgisHubCardAction: EventEmitter<{
    action: string;
    model: IHubCardViewModel;
  }>;
  intl: ComponentIntl;
  constructor();
  componentWillLoad(): Promise<void>;
  private get context();
  get _showType(): boolean;
  handleSelect(event: CustomEvent): void;
  /**
   * Focusable (but invisible) element at the bottom of the gallery result list.
   * Used to comply with accessibility requirements.
   */
  nextResultsStart: HTMLSpanElement;
  componentDidUpdate(): void;
  setNextResultsStart(el: HTMLSpanElement): void;
  _renderLoading(): VNode;
  /**
   * Render an empty state if there are no results,
   * or if there is an error
   */
  _renderEmptyState(): VNode;
  rowActionHandler(action: string, model: IHubCardViewModel): void;
  getViewModel(model: IHubSearchResult): IHubCardViewModel;
  _renderActionLinks(model: IGalleryTableRowModel): VNode[];
  private _renderCellContent;
  private _renderCell;
  _renderRow(searchResult: IHubSearchResult, idx: number): VNode;
  _renderHead(): VNode;
  get _columns(): IGalleryTableColumn[];
  _renderResults(): VNode;
  render(): any;
}
