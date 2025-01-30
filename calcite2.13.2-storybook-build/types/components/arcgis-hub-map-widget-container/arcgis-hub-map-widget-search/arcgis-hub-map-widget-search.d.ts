/// <reference types="arcgis-js-api" />
import { EventEmitter } from '../../../stencil-public-runtime';
import { HTMLCalciteDropdownElement, HTMLCalciteInputElement } from '@esri/calcite-components/dist';
import { Scale } from '@esri/calcite-components/dist/types/components/interfaces';
import { ComponentIntl } from '../../../utils/stencil-intl';
import { Tool } from '../arcgis-hub-map-widget-draw/types';
export declare class ArcgisHubMapWidgetSearch {
  el: HTMLArcgisHubMapWidgetSearchElement;
  dropdownEl: HTMLCalciteDropdownElement;
  inputEl: HTMLCalciteInputElement;
  /**
   * currently available drawing tools
   */
  tools: Tool[];
  scale: Scale;
  view: __esri.View;
  searchViewModelProperties: __esri.SearchViewModelProperties;
  active: boolean;
  /**
   * location object from a valid search
   */
  completeValidSearch: __esri.SearchViewModelSearchResponse;
  loading: boolean;
  suggestions: __esri.SuggestResult[];
  value: string;
  width: string;
  handle: __esri.Handle;
  intl: ComponentIntl;
  searchViewModel: __esri.SearchViewModel;
  selectedKey: string;
  viewPosition: string;
  /**
   * emits event containing the users selection and its geometry
   */
  arcgisHubGeometryResultSelection: EventEmitter<{
    geometry: __esri.Geometry;
    userSelection: Tool;
    locationName?: string;
  }>;
  arcgisHubWidgetPanelToggled: EventEmitter<boolean>;
  hubTelemetry: EventEmitter;
  get inputScale(): Scale;
  constructor();
  componentWillLoad(): Promise<void>;
  connectedCallback(): void;
  disconnectedCallback(): void;
  componentDidLoad(): void;
  handleViewChange(view: __esri.View, prevView: __esri.View): void;
  handleSuggestionsChange(): void;
  handleActiveChange(active: boolean): void;
  handleValueChange(): void;
  /**
   * handles property changes to the searchViewModel
   */
  handleSearchViewModelChange(): void;
  handlePanelToggled(event: CustomEvent): void;
  /**
   * Handles the `calciteDropdownSelect` event triggered by the Calcite dropdown component.
   * Processes the user's selection of either a location or location type
   */
  onCalciteDropdownSelect(): void;
  onCalciteInputChange(e: CustomEvent): void;
  onCalciteInputInput(e: CustomEvent): void;
  handleSetDropdownRef(dropdownEl: HTMLCalciteDropdownElement): void;
  handleSetInputRef(inputEl: HTMLCalciteInputElement): Promise<void>;
  getSuggestions(): Promise<void>;
  /**
   * extracts the geometry of each location type
   * TODO: add polyline and polygon once able to extract from result object
   *
   * @param type - location type
   * @returns __esri.Geometry
   */
  _getGeometry(type: string): __esri.Geometry;
  search(): Promise<void>;
  /**
   * Updates suggestions with valid location types.
   * TODO: Once calcite-dropdown-item gets bumped, disable invalid location types rather than remove them.
   * This method will likely become unnecessary
   */
  addLocationType(): void;
  /**
   * Determines if the location type is valid within tools and has a geometry
   * or of type 'draw' which is always included
   *
   * @param type - location type
   * @returns boolean - true if type should be included, false otherwise
   */
  isValidLocationType(type: string): boolean;
  searchIfEnter(e: KeyboardEvent): void;
  toggleActive(): void;
  connectWatch(): void;
  removeWatch(): void;
  connectViewModel(): Promise<void>;
  setInputWidth(): void;
  get positionClass(): string;
  get selected(): __esri.SuggestResult;
  get styles(): {
    [key: string]: string;
  };
  render(): any;
}
