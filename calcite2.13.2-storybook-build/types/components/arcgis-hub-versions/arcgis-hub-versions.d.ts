import { EventEmitter, VNode } from '../../stencil-public-runtime';
import { IArcGISContext, IVersionMetadata } from '@esri/hub-common';
import { IItem } from '@esri/arcgis-rest-portal';
import { ComponentIntl } from "../../utils/stencil-intl";
import { CalciteListItemCustomEvent } from '@esri/calcite-components';
export declare class ArcgisHubVersions {
  /**
   * Reference to host element
   */
  element: HTMLElement;
  popover: HTMLCalcitePopoverElement;
  /**
   * The id of the currently selected version
   */
  activeVersionId: string;
  /**
   * An instance of ArcGISContext
   */
  context: IArcGISContext;
  /**
   * The item id of the item to fetch versions for
   */
  itemId: string;
  /**
   * The item id of the published version
   * used to render a published badge on the specified version list item
   */
  publishedVersionId: string;
  /**
   * The versions for the specified item
   */
  versions: IVersionMetadata[];
  /**
   * Are we currently fetching versions?
   */
  loading: boolean;
  /**
   * Was there an error fetching versions?
   */
  error: boolean;
  versionToOperateOn: IVersionMetadata;
  /**
   * Should we show the details modal?
   */
  shouldShowDetailsModal: boolean;
  /**
   * Should we show the delete modal?
   */
  shouldShowDeleteModal: boolean;
  updateDetailsError: boolean;
  deleteError: boolean;
  shouldShowAlert: boolean;
  hasClipboardError: boolean;
  item: IItem;
  /**
   * Emitted when a version is selected
   * event detail is the selected [IVersionMetadata](https://esri.github.io/hub.js/api/common/IVersionMetadata/)
   */
  arcgisHubVersionsVersionSelected: EventEmitter<IVersionMetadata>;
  /**
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  /**
   * Constructor function, pre-binds context to relevant methods
   */
  constructor();
  /**
   * Component will load lifecycle method, fetches translations and data
   * needed to render the UI
   */
  componentWillLoad(): Promise<void>;
  /**
   * Watches for changes to context or itemId and fetches versions
   * when they change
   */
  fetchVersions(): Promise<void>;
  onTitleLinkClick(e: MouseEvent): void;
  /**
   * Listens for onCalciteListItemSelect events, sets the activeVersionId, and emits the selected version
   */
  onSelectVersion(event: CalciteListItemCustomEvent<void>): void;
  setPopoverEl(el: HTMLCalcitePopoverElement): void;
  onShowPopover(event: MouseEvent): void;
  onShowDetailsModal(event: MouseEvent): void;
  onHideDetailsModal(event: Event): void;
  onSaveDetails(event: CustomEvent): Promise<void>;
  onShowDeleteModal(event: MouseEvent): void;
  /**
   * Shows the delete modal for the specified version
   * @param {string} versionId
   */
  showDeleteModal(versionId: string): Promise<void>;
  onHideDeleteModal(event: Event): void;
  onDelete(event: CustomEvent): Promise<void>;
  onShare(): Promise<void>;
  onAlertClose(): void;
  getItemUrl(versionId: string): string;
  getShareUrl(versionId: string): string;
  get shouldShowDeleteButton(): boolean;
  getVersionMetadata(version: IVersionMetadata): Record<string, any>;
  getVersionName(version: IVersionMetadata): string;
  /**
   * Returns the formatted created date for the specified version
   * or an empty string if the version does not have a name (since if it has a name we will use the created date as the name)
   * and thus do not need to show it again
   */
  getCreatedDate(version: IVersionMetadata): string;
  renderAlert(): VNode;
  /**
   * Renders the loading state
   */
  renderLoading(): VNode;
  /**
   * Renders the empty state
   */
  renderEmptyState(): VNode;
  /**
   * Renders the error state
  */
  renderError(): VNode;
  renderPopover(): VNode;
  renderDetailsModal(): VNode;
  renderDeleteModal(): VNode;
  renderListItem(version: IVersionMetadata): VNode;
  /**
   * Primary render entrypoint
   */
  render(): any;
}
