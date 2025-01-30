import { EventEmitter } from '../../../../../../../stencil-public-runtime';
import { IConfigurationSchema, IUiSchema, IPredicate, IChangeEventDetail, EntityType } from '@esri/hub-common';
import { ComponentIntl } from '../../../../../../../utils/stencil-intl';
import { _IPredicate, PredicateProperty } from './types';
/**
 * The `arcgis-hub-predicates-builder` is a composite field for
 * configuring an array of `IPredicate`. See readme for additional
 * details.
 */
export declare class ArcgisHubPredicatesBuilder {
  element: HTMLElement;
  /** array of hub predicate definitions */
  predicates: IPredicate[];
  /**
   * type of entity the predicate is targeting. This is used
   * internally to determine which API we query.
   */
  targetEntity: EntityType;
  /** explicit list of predicate properties to present as "Parameter" options */
  availablePredicateProperties: PredicateProperty[];
  /** indicates whether the editor is loading */
  _isLoading: boolean;
  /** predicate builder schema */
  _schema: IConfigurationSchema;
  /** predicate builder uiSchema */
  _uiSchema: IUiSchema;
  /** internal copy of the predicates being configured */
  _predicates: _IPredicate[];
  _intl: ComponentIntl;
  /** event emitted when the predicate is updated */
  arcgisHubPredicatesBuilderChange: EventEmitter<IPredicate[]>;
  buildSchemas(): Promise<void>;
  componentWillLoad(): Promise<void>;
  init(): Promise<void>;
  private get _context();
  /**
   * predicate properties to present as "Parameter" options. If
   * none are provided, we default to all properties available
   * for the targetEntity
   */
  get _predicateProperties(): PredicateProperty[];
  /**
   * if availablePredicateProperties are not provided, we
   * default to all properties available for the targetEntity
   */
  get _defaultPredicateProperties(): PredicateProperty[];
  /**
   * wrapper around the built-in intl.t function that
   * encapsulates the translation strings from this
   * component to pass into the configuration editor
   */
  translationFunc: (key: any, values?: any, opts?: any) => string;
  /** function to dynamically generate the predicate builder schema */
  buildSchema(): Promise<void>;
  /** function to dynamically generate the predicate builder uiSchema */
  buildUiSchema(): Promise<void>;
  /**
  * function to transform the predicates into a format that is
  * consistent with the underlying predicate editor
  */
  transformPredicatesForEditor(predicates: IPredicate[]): Promise<_IPredicate[]>;
  /**
   * function to transform the editor values into an array of
   * valid IPredicates before emitting
   */
  transformPredicatesToEmit(predicates: _IPredicate[]): Promise<IPredicate[]>;
  handlePredicatesEditorChange: (evt: CustomEvent<IChangeEventDetail>) => Promise<void>;
  renderLoadingState(): HTMLArcgisSkeletonLoaderElement;
  renderEditor(): HTMLArcgisConfigurationEditorElement;
  render(): any;
}
