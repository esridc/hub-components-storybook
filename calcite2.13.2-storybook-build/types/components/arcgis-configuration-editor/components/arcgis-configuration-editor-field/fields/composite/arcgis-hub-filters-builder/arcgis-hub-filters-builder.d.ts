import { EventEmitter } from '../../../../../../../stencil-public-runtime';
import { IChangeEventDetail, IConfigurationSchema, IUiSchema, EntityType, IFilter } from '@esri/hub-common';
import { ComponentIntl } from '../../../../../../../utils/stencil-intl';
import { PredicateProperty } from '../arcgis-hub-predicates-builder/types';
import { _IFilter } from './types';
/**
 * The arcgis-hub-filters-builder is a composite field for
 * configuring an array of IFilter
 */
export declare class ArcgisHubFiltersBuilder {
  element: HTMLElement;
  /** array of hub filter definitions */
  filters: IFilter[];
  /**
   * type of entity the filter is targeting. This is used
   * internally to determine which API we query.
   */
  targetEntity: EntityType;
  /** predicate properties to present as filter options */
  availablePredicateProperties: PredicateProperty[];
  /** internal copy of the filters being configured */
  _filters: _IFilter[];
  /** unique identifier of the filter being edited */
  _editKey: string;
  /** event emitted when the filter is updated */
  arcgisHubFiltersBuilderChange: EventEmitter<IFilter[]>;
  /** event to emit Hub telemetry */
  hubTelemetry: EventEmitter<any>;
  _intl: ComponentIntl;
  _filterSchema: IConfigurationSchema;
  /** a reference to the add filter button */
  _addFilterButtonRef: HTMLCalciteButtonElement;
  /** a reference to the calcite block element of the last rendered filter */
  _filterBlockRef: HTMLCalciteBlockElement;
  /**
   * The number of filters currently made -- note that this property gets updated after each render.
   * NOTE: We should use the _filters.length property to get the current number of filters.
   * This is just a helper to determine if the number of filters has changed after a render,
   * so that we can set focus on the new filter block -- we do this after the render so that
   * we have a reference to the new block element.
   */
  _lastRenderFiltersCount: number;
  componentWillLoad(): Promise<void>;
  componentDidRender(): void;
  /** dynamically generated filter builder uiSchema */
  get _filterUiSchema(): IUiSchema;
  /**
   * returns whether the current filter being edited is valid.
   * We use this to conditionally disable the "New filter" button
   * as well as other filter blocks.
   *
   * If no filter is being edited, we default to true to enable
   * these UIs
   */
  get _isValid(): boolean;
  /**
   * wrapper around the built-in intl.t function that
   * encapsulates the translation strings from this
   * component to pass into the configuration editor
   */
  translationFunc: (key: any, values?: any, opts?: any) => string;
  /** helper to find a filter by its unique identifier */
  findFilterByKey: (key: string, filters?: _IFilter[]) => _IFilter;
  /**
   * function to transform the filters into a format that is
   * consistent with the underlying filters editor
   */
  transformFiltersForEditor(filters?: IFilter[]): _IFilter[];
  /**
   * function to transform the editor values into an array of
   * valid IFilters before emitting
   */
  transformFiltersToEmit(filters: _IFilter[]): IFilter[];
  handleFilterEditorChange: (evt: CustomEvent<IChangeEventDetail>) => void;
  /**
   * handler for when the "New filter" button is clicked.
   * We create a new filter and set it as the one being edited
   */
  handleAddFilter: () => void;
  /**
   * Sets the ref to the "New filter" button.
   * @param el
   */
  setAddFilterButtonRef: (el: HTMLCalciteButtonElement) => void;
  /**
   * Sets the ref to the calcite block element of the last rendered filter.
   * @param el
   */
  setFilterBlockRef: (el: HTMLCalciteBlockElement) => void;
  /** handler for when a filter block is opened for editing. */
  handleEditFilter: (evt: MouseEvent) => void;
  /** handler for when a filter is deleted. */
  handleDeleteFilter: (evt: MouseEvent) => void;
  renderAddButton(): HTMLCalciteButtonElement;
  renderFilters(filters?: _IFilter[]): HTMLElement[];
  renderFilter(filter: _IFilter, idx: number): HTMLCalciteBlockElement | HTMLArcgisConfigurationEditorElement;
  renderBlockActions(filterKey: string, label: string): HTMLElement;
  renderFilterEditor(): HTMLArcgisConfigurationEditorElement;
  render(): any;
}
