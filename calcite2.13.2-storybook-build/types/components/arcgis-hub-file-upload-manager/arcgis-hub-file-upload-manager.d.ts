import { HTMLCalciteStepperElement } from '@esri/calcite-components/dist';
import { ICreateItemResponse, IGroup, IItemAdd, ISharingResponse } from "@esri/arcgis-rest-portal";
import { IArcGISContext, IAllowedFileTypes } from "@esri/hub-common";
import { VNode, EventEmitter } from "../../stencil-public-runtime";
declare enum STAGE {
  ITEM = "item",
  METADATA = "metadata",
  SHARING = "sharing",
  CREATING = "creating",
  COMPLETE = "complete"
}
/**
 * @internal
 *
 * @export
 * @class ArcgisHubFileUploadManager
 */
export declare class ArcgisHubFileUploadManager {
  /**
   * Context - how we pass in auth & portal information
   * This is mutable because if not passed the component
   * creates it's own, based on the value of `portal`
   */
  context: IArcGISContext;
  /**
   * Portal url. If `context` is not passed in,
   * then a `context` will be created using the portal
   * value.
   * Should not have /sharing/rest on the end
   * defaults to https://www.arcgis.com
   */
  portal: string;
  el: HTMLArcgisHubFileUploadManagerElement;
  /**
   * Potential list of groups the item can bbe shared with.
   *
   * @type {IGroup[]}
   * @memberof ArcgisHubFileUploadManager
   */
  groups: IGroup[];
  /**
   * List og groups that are selected by default
   *
   * @type {IGroup[]}
   * @memberof ArcgisHubFileUploadManager
   */
  selectedGroups: IGroup[];
  /**
   * File types that the file picker allows. By default we use the below, but it can be overridden
   * if needed.
   *
   * @type {IAllowedFileTypes}
   * @memberof ArcgisHubFileUploadManager
   */
  allowedFileTypes: IAllowedFileTypes;
  /**
   * Should Back/Next/Save be shown or no?
   * If no then utilize methods for going back/forward in stages and
   * to save/create the item
   *
   * @memberof ArcgisHubFileUploadManager
   */
  showButtons: boolean;
  /**
   * Internal state for tracking the selected item.
   *
   * @type {IItemAdd}
   * @memberof ArcgisHubFileUploadManager
   */
  selectedItem: IItemAdd;
  /**
   * Tracks what stage we are on.
   *
   * @type {STAGE}
   * @memberof ArcgisHubFileUploadManager
   */
  stage: STAGE;
  private itemSource;
  private stepperElement;
  private fileSelectElement;
  private intl;
  private metadataValues;
  private secondStageComplete;
  duplicateFileId: string;
  thirdStageDisabled: boolean;
  _context: IArcGISContext;
  /**
   * Default extenxt which comes from the portal object
   *
   * @type {IExtent}
   * @memberof ArcgisHubDataSourceSelector
   */
  private defaultExtent;
  /**
   * Emit out status of item creation.
   *
   * @type {EventEmitter<ICreateItemResponse>}
   * @memberof ArcgisHubFileUploadManager
   */
  arcgisHubItemCreationState: EventEmitter<{
    title: string;
    type: string;
    access: string;
    groups: string[];
    createdItem: ICreateItemResponse;
    itemAccessResponse: ISharingResponse;
    itemSharingResponse: ISharingResponse[];
  }>;
  /**
   * Emit out when the stage changes
   *
   * @type {EventEmitter<string>}
   * @memberof ArcgisHubFileUploadManager
   */
  arcgisHubFileUploadManagerStageChange: EventEmitter<string>;
  /**
   * Emit out when File or Url is valid and what its source is.
   *
   * @type {(EventEmitter<{ valid: boolean, source: 'file' | 'url' }>)}
   * @memberof ArcgisHubFileUploadManager
   */
  arcgisHubFileOrUrlValid: EventEmitter<{
    valid: boolean;
    source: 'file' | 'url';
  }>;
  constructor();
  componentWillLoad(): Promise<void>;
  componentWillRender(): Promise<void>;
  onPortalChange(): Promise<void>;
  onStageChange(): Promise<void>;
  handleCalciteStepperChangeEvent(event: CustomEvent): void;
  handleFileSelected(event: CustomEvent): void;
  handleUrlValidation(event: CustomEvent): void;
  handleItemTypeSelection(event: CustomEvent): void;
  mergeMetadataValuesWithItem(event: CustomEvent): void;
  updateSelectedGroups(event: CustomEvent): void;
  updateAccessLevel(event: CustomEvent): void;
  /**
   * Move forward a stage, or create item if we are at the sharing stage.
   *
   * @memberof ArcgisHubFileUploadManager
   */
  nextStage(): Promise<void>;
  /**
   * Move back a stage.
   *
   * @return {*}  {Promise<void>}
   * @memberof ArcgisHubFileUploadManager
   */
  previousStage(): Promise<void>;
  private _moveToPreviousStage;
  private _moveToNextStage;
  setStepperEl(el: HTMLCalciteStepperElement): void;
  setFileSelectEl(el: HTMLArcgisHubFileSelectElement): void;
  renderItemStage(): VNode;
  renderCreating(): VNode;
  renderCompleteStage(): VNode;
  renderButtons(): VNode;
  render(): any;
}
export {};
