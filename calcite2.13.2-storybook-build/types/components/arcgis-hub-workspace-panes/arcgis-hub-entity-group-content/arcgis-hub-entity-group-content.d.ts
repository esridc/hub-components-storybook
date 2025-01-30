import { IHubGroup, IHubCatalog, IHubSearchResult } from '@esri/hub-common';
import { EventEmitter } from '../../../stencil-public-runtime';
import { ComponentIntl } from '../../../utils/stencil-intl';
import { IBulkActions, IFacet } from '../../../utils/types';
import { ArcgisHubGalleryPickerCustomEvent } from '../../../components';
export declare class ArcgisHubEntityGroupContent {
  element: HTMLElement;
  entity: IHubGroup;
  isAddContentModalOpen: boolean;
  isSharingErrorsModalOpen: boolean;
  _context: import("@esri/hub-common").IArcGISContext;
  /**
   * Catalogs for group content gallery
   */
  _catalogs: IHubCatalog[];
  hubTelemetry: EventEmitter<any>;
  /**
   * Ids of items that failed to shared to the group
   */
  sharingErrorIds: any[];
  /**
   * Total count of group content, needed for telem
   */
  groupContentCount: number;
  /**
   * This is used for the "Unshared content" notice
   */
  isUnsharing: boolean;
  intl: ComponentIntl;
  contentGallery: HTMLArcgisHubGalleryElement;
  constructor();
  componentWillLoad(): Promise<void>;
  /**
   * Group content gallery facets
   */
  get contentFacets(): IFacet[];
  /**
   * Group content gallery picker facets
   */
  get contentPickerFacets(): IFacet[];
  /**
   * Whether the user is able to share content to the group or not.
   * For owners and admins, true as long as their user priv has
   * 'portal:user:shareToGroup'
   * for members, true when their user priv has 'portal:user:shareToGroup'
   * and group property "isReadOnly" is false
   */
  get canShareContentWithGroup(): boolean;
  /**
   * Catalogs passed to the group content galley.
   * Only show the user's own content for edit groups,
   * show all content for view groups
   */
  setCatalogs(): void;
  handleAddContentModalOpen(): void;
  handleAddContentModalClose(): void;
  handleUnsharedContentModalClose(): void;
  /** Get possible bulk actions */
  get bulkActions(): IBulkActions;
  /**
   * because we wrap the arcgis-hub-gallery-picker in a wormhole, we
   * intercept its telemetry and re-emit it from this component so
   * we don't loose the DOM context
   */
  handleHubTelemetry: (evt: ArcgisHubGalleryPickerCustomEvent<Record<string, any>>) => void;
  setTotalResultCount(evt: CustomEvent<IHubSearchResult[]>): void;
  delay(milliseconds: number): Promise<unknown>;
  /**
   * Handle sharing items to the group
   * @param itemIds items ids
   */
  handleContentShare(itemIds: string[]): Promise<void>;
  /**
   * Handle unsharing items from the group
   * @param itemIds items ids
   */
  handleContentUnshare(itemIds: string[]): Promise<void>;
  handleGalleryPickerSelectionUpdate(evt: CustomEvent): Promise<void>;
  /**
 * Handle unsharing items from the group
 * @param itemIds items ids
 */
  unshareContentFromGroup(itemIds: string[]): Promise<void>;
  handleGalleryBulkAction(evt: CustomEvent): Promise<void>;
  renderSharingErrorsNotice(): any;
  renderSharingErrorsModal(ids: string[]): any;
  renderContentGallery(): any;
  renderGalleryPicker(): HTMLElement;
  render(): any;
}
