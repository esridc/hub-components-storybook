import { EventEmitter } from '../../../../../../stencil-public-runtime';
import { IRenderParams, IStyleParams } from '../resources';
import { ComponentIntl } from '../../../../../../utils/stencil-intl';
import { IHubSearchResult } from '@esri/hub-common';
import { IGallerySelection } from '../../../../../../utils/types';
import { ArcgisHubGalleryPickerCustomEvent } from '../../../../../../components';
import { IWithContext } from '../../../../../../utils/state';
import { SelectionMode } from '../../../../../interfaces';
export declare class GalleryPicker implements IWithContext {
  element: HTMLElement;
  params: IRenderParams;
  styles: IStyleParams;
  _context: import("@esri/hub-common").IArcGISContext;
  disconnectContext: () => void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  isOpen: boolean;
  /**
   * Existing selection as an IGallerySelection object
   * This is the selection to pass to the arcgis-hub-gallery-picker as
   * the "pre-selected" entities
   */
  gallerySelection: IGallerySelection;
  /**
   * Current selected entities (results from hubSearch)
   */
  selectedEntities: IHubSearchResult[];
  /**
   * Fires when an entity is added/removed
   */
  arcgisConfigurationEditorFieldInputChange: EventEmitter<string[]>;
  hubTelemetry: EventEmitter<Record<string, any>>;
  intl: ComponentIntl;
  constructor();
  componentWillLoad(): Promise<void>;
  get targetEntity(): string;
  get limit(): number;
  get selectionMode(): SelectionMode;
  get canReorder(): boolean;
  /**
   * Get title to show in the modal as well as on the button to launch the modal
   */
  get pickerTitle(): string;
  /**
   * Get the icon for the content type
   */
  getTypeIcon(type: string): string;
  /**
   * Convert the list of entity IDs to an IGallerySelection
   * based on the entity type
   */
  convertEntityIdsToGallerySelection(): IGallerySelection;
  /**
   * Convert the IGallerySelection received from the Hub Gallery Picker
   * to an array of entity IDs based on the entity type
   */
  convertGallerySelectionToEntityIds(gallerySelection: IGallerySelection): [];
  handleGalleryPickerOpen(): void;
  handleGalleryPickerClose(): void;
  handleGalleryPickerSelectionUpdate(evt: CustomEvent): Promise<void>;
  /**
   * because we wrap the arcgis-hub-gallery-picker in a wormhole, we
   * intercept its telemetry and re-emit it from this component so
   * we don't loose the DOM context
   *
   * Additionally, we append the field name to the telemetry event
   * if it doesn't already have a "details" dimension
   */
  handleHubTelemetry: (evt: ArcgisHubGalleryPickerCustomEvent<Record<string, any>>) => void;
  fetchEntities(): Promise<void>;
  fetchGallerySelectionEntities(gallerySelection: IGallerySelection): Promise<IHubSearchResult[]>;
  handleGallerySelectionRemove(evt: MouseEvent): void;
  handleSelectEntitiesOrderChange(evt: any): void;
  renderSelectedEntities(entities: IHubSearchResult[]): HTMLCalciteValueListElement;
  renderActions(entity: IHubSearchResult, idx: number): HTMLCalciteActionElement[];
  renderEntity(result: IHubSearchResult, idx: number): HTMLCalciteListItemElement;
  renderGalleryPickerButton(): HTMLElement;
  renderGalleryPicker(): HTMLElement;
  render(): any;
}
