import { HTMLCalciteInputElement, HTMLCalciteDropdownElement } from '@esri/calcite-components/dist';
import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { IItemAdd } from "@esri/arcgis-rest-portal";
import { IExtent } from "@esri/arcgis-rest-feature-layer";
export interface IValidatedUrlItem {
  pass: boolean;
  item?: any;
  type?: string;
  error?: string;
}
export declare class ArcgisHubUrlContentForm {
  el: HTMLArcgisHubUrlContentFormElement;
  private intl;
  dropdownEl: HTMLCalciteDropdownElement;
  inputEl: HTMLCalciteInputElement;
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
   * Portals name.
   *
   * @type {string}
   * @memberof ArcgisHubDataSourceSelector
   */
  portalName: string;
  /**
   * State for the type of content, if it has to be selected via the dropdown
   *
   * @type {string}
   * @memberof ArcgisHubUrlContentForm
   */
  selectedTypeText: string;
  /**
   * State for errors from url validation
   *
   * @type {('invalidFormat' | 'invalidUrl')}
   * @memberof ArcgisHubUrlContentForm
   */
  errorString: 'invalidFormat' | 'invalidUrl';
  /**
   * State for whether or not we need to show the type picker
   *
   * @memberof ArcgisHubUrlContentForm
   */
  showTypePicker: boolean;
  /**
   * State tracking the validated url item response
   *
   * @type {IValidatedUrlItem}
   * @memberof ArcgisHubUrlContentForm
   */
  validatedUrlItem: IValidatedUrlItem;
  mergedUrlItem: IItemAdd;
  /**
   * Event which is emitted when the url is validated.
   *
   * @type {EventEmitter<IValidatedUrlItem>}
   * @memberof ArcgisHubUrlContentForm
   */
  arcgisHubUrlValidated: EventEmitter<IItemAdd>;
  /**
   * Event which is emitted when type is manually selected.
   *
   * @type {EventEmitter<IValidatedUrlItem>}
   * @memberof ArcgisHubUrlContentForm
   */
  arcgisHubItemTypeSelected: EventEmitter<IItemAdd>;
  types: {
    intl: string;
    type: string;
    active?: boolean;
  }[];
  constructor();
  componentWillLoad(): Promise<void>;
  validateDebounced(): void;
  /**
   * Listen to the calciteDropdownSelect event, gets the selected type,
   * sets the type on the validatedUrlItem, and then emits out the validatedUrl item.
   */
  handleItemTypeSelection(): void;
  /**
   * Handles url validation.
   * Gets the url from the inputEl element, if a URL is present
   * then it does validation, determines if the type picker should be shown,
   * and emits the urlValidatedItem.
   */
  validateUrl(): Promise<void>;
  handleOnInput(): void;
  handleOnKeyDown(e: KeyboardEvent): void;
  setDropdownEl(el: HTMLCalciteDropdownElement): void;
  setInputEl(el: HTMLCalciteInputElement): void;
  renderSubText(): VNode;
  render(): any;
}
