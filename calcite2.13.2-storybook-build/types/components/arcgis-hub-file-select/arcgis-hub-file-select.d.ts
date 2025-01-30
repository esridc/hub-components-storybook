import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { HTMLCalciteButtonElement } from '@esri/calcite-components/dist';
import { IAllowedFileTypes } from "@esri/hub-common";
import { IItemAdd } from "@esri/arcgis-rest-portal";
import { IExtent } from "@esri/arcgis-rest-feature-layer";
export declare class ArcgisHubFileSelect {
  el: HTMLArcgisHubFileSelectElement;
  /**
   * Should the drag-n-drop zone be configured to show Image or Content specific strings.
   *
   * @type {('content' | 'image')}
   * @memberof ArcgisHubFileSelect
   */
  componentType: 'content' | 'image';
  /**
   * Max allowed size of a selected file in MB
   *
   * @memberof ArcgisHubFileSelect
   */
  maxSize: number;
  /**
   * Current users name IE the owner of the to be created item.
   *
   * @type {string}
   * @memberof ArcgisHubDataSourceSelector
   */
  owner: string;
  /**
   * Default extenxt which comes from the portal object
   *
   * @type {IExtent}
   * @memberof ArcgisHubDataSourceSelector
   */
  defaultExtent: IExtent;
  /**
   * What file types or extensions are allowed?
   *
   * @type {AllowedFileTypes}
   * @memberof ArcgisHubFileSelect
   */
  allowedFileTypes: IAllowedFileTypes;
  /**
   * Portals name.
   *
   * @type {string}
   * @memberof ArcgisHubDataSourceSelector
   */
  portalName: string;
  /**
   * Is there currently an Error state or not
   *
   * @memberof ArcgisHubFileSelect
   */
  errorMessage: string;
  /**
  * File selected
  *
  * @type {FileList}
  * @memberof ArcgisHubFileSelect
  */
  files: FileList;
  isDragging: boolean;
  arcgisHubFileSelected: EventEmitter<IItemAdd>;
  arcgisHubDragOver: EventEmitter<boolean>;
  private intl;
  private inputElement;
  private mainInputRef;
  constructor();
  componentWillLoad(): Promise<void>;
  /**
   * Watches files State && validates selected file/files.
   * On success selected file is emitted
   * On failure error state.
   *
   * @memberof ArcgisHubFileSelect
   */
  validateFiles(): void;
  /**
   * Removes extension from filename.
   */
  trimExtension(filename: string): string;
  focusMainInput(): Promise<void>;
  clearSelectedFile(): Promise<void>;
  /**
   * Takes passed in allowedFileTypes and returns a list of all possible extensions, made unique.
   * allowedFileTypes can have an array of human readable File Types And/OR an array of extensions
   * To compile this into one list the below is needed.
   *
   * @readonly
   * @type {string[]}
   * @memberof ArcgisHubFileSelect
   */
  get fileExtensionsFromAllowedFileTypes(): string[];
  get isFileSelected(): boolean;
  handleDragOver(e: DragEvent): boolean;
  handleDragLeave(): void;
  handleDrop(e: DragEvent): void;
  onInputChange(e: any): void;
  setInputEl(el: HTMLInputElement): void;
  get inputAcceptList(): string;
  onButtonClick(): void;
  buttonRef(el: HTMLCalciteButtonElement): void;
  get buttonIntl(): string;
  get headingIntl(): string;
  renderDetails(): VNode;
  render(): any;
}
