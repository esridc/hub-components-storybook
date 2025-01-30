import { IExtent } from '@esri/arcgis-rest-feature-layer';
import { EventEmitter, VNode } from '../../stencil-public-runtime';
import { IBoundaryPickerSource } from '../../utils/content';
export declare class ArcgisBoundaryPickerUi {
  element: HTMLElement;
  state: 'loading' | 'saving' | undefined;
  authenticated: boolean;
  sources: IBoundaryPickerSource[];
  extent: IExtent;
  /**
   * Should we reset the hub-map-widget-draw component's state
   * when the component is disconnected from the DOM
   */
  resetDrawingToolsOnDisconnect: boolean;
  /** Event that is fired when a source is selected */
  arcgisBoundaryPickerUpdate: EventEmitter<IBoundaryPickerSource>;
  /** Event that is fired when the cancel button is clicked */
  arcgisBoundaryPickerCancel: EventEmitter<void>;
  /** Event that is fired when the save button is clicked */
  arcgisBoundaryPickerSave: EventEmitter<IBoundaryPickerSource>;
  private _selected;
  private _savedEditState;
  private _view;
  private _editGeometry;
  private _updatedGeometry;
  constructor();
  private get _editing();
  private get _selectedGraphic();
  private get _selectedGraphics();
  private get _selectedValue();
  private get _isNone();
  private get _initialSelection();
  private get _isGeometryDirty();
  private get _isDirty();
  private get _isLoadingOrSaving();
  private get _canSave();
  private get _noneOption();
  private get _otherOptions();
  private get _saveGeometry();
  private get _saveSource();
  private get _overlayMessage();
  private _mapDrawElement;
  private _getDefaultLabel;
  private _cancelEditGeometry;
  private _setMapDrawElement;
  private _emitGeometryUpdate;
  componentWillLoad(): Promise<void>;
  onSourcesUpdate(): void;
  handleMapViewReady(e: CustomEvent<any>): Promise<void>;
  handleListChange(event: CustomEvent<any>): void;
  handleGraphicsChange(e: CustomEvent<any>): void;
  handleTelemetry(e: CustomEvent<any>): void;
  cancelEditGeometry(): Promise<void>;
  handleSave(e: MouseEvent): void;
  handleCancel(e: MouseEvent): void;
  handleEditClick(e: MouseEvent): void;
  handleCancelEditClick(e: MouseEvent): void;
  handleSaveEditClick(e: MouseEvent): void;
  renderEditConfirmButton(): VNode;
  intl: any;
  render(): any;
}
