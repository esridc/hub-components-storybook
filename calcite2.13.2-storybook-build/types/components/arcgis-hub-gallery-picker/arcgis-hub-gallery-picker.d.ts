import { EventEmitter } from '../../stencil-public-runtime';
import { IHubCatalog, SortOption } from '@esri/hub-common';
import { IFacet, IGallerySelection } from '../../utils/types';
import { ComponentIntl } from '../../utils/stencil-intl';
import { CardViewModelCallback } from '../../utils/cardModelConverters/types';
import { SelectionMode } from '../interfaces';
import { CardModelTarget } from '../../utils/cardModelConverters/types';
export declare class ArcgisHubGalleryPicker {
  /**
   * Title shown in the header of the picker
   */
  modalTitle: string;
  /**
   * Whether the picker modal is open
   */
  open: boolean;
  /**
   * The max number of selection allowed
   */
  limit: number;
  /**
   * Catalogs that the picker uses to generate the gallery
   */
  catalogs: IHubCatalog[] | string[];
  /**
   * Facets to show in the picker
   */
  facets: IFacet[];
  /**
   * Collection of selected entity IDs as an IGallerySelection object
   */
  gallerySelection: IGallerySelection;
  /**
   * Whether to show the entities in the `gallerySelection` in the gallery
   */
  showSelection: boolean;
  showBadges: boolean;
  /**
   * Whether to show/hide search input in the gallery
   */
  showSearch: boolean;
  /**
   * Whether to show/hide thumbnail in the gallery
   */
  showThumbnail: boolean;
  /**
   * Whether to show/hide catalog facets
   * if undefined, will be hidden when there is only one catalog
   * (see arcgis-hub-catalog)
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
  /** label for the catalog facets - defaults to "Source" */
  sourceLabel: string;
  /** label for the primary button in the picker footer - defaults to "Add" */
  primaryButtonLabel: string;
  /**
   * Passing a callback function into the gallery-picker allows the developer to apply custom
   * business logic to the processing of the Card View model. This is useful in scenarios
   * where we want to show non-standard metadata, badges, actions and to apply logic to
   * the selectability of the card.
   */
  callback: CardViewModelCallback;
  selectionMode: SelectionMode;
  /** indicates where the card should redirect */
  linkTarget: CardModelTarget;
  /** options to change the appearace of the gallery-picker calcite-modal */
  modalOptions: Record<string, any>;
  /**
   * Event that's fired when the "Add" button is clicked
   */
  arcgisHubGalleryPickerSelectionUpdate: EventEmitter<IGallerySelection>;
  arcgisHubGalleryPickerClose: EventEmitter<boolean>;
  hubTelemetry: EventEmitter<Record<string, any>>;
  element: HTMLElement;
  _gallerySelection: IGallerySelection;
  /**
   * Current selection count, this is the total count of selection
   */
  count: number;
  intl: ComponentIntl;
  constructor();
  componentWillLoad(): Promise<void>;
  handleHubGallerySelect(event: any): void;
  /** parse the target entity from the first catalog collection. We need this
   * for telemetry logging purposes */
  get targetEntity(): string;
  handleGalleryPickerClose(event: any): void;
  handleGalleryPickerOpen(event: any): void;
  handleGalleryPickerAdd(event: any): void;
  render(): any;
}
