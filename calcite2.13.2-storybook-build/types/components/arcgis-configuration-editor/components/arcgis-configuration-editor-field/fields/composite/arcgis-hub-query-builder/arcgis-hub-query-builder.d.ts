import { EventEmitter } from '../../../../../../../stencil-public-runtime';
import { IConfigurationSchema, IUiSchema, IQuery, EntityType, IChangeEventDetail } from '@esri/hub-common';
import { ComponentIntl } from '../../../../../../../utils/stencil-intl';
import { PredicateProperty } from '../arcgis-hub-predicates-builder/types';
import { ICatalogBuilderCallbacks } from '../../../../../../arcgis-hub-workspace-panes/arcgis-hub-entity-catalog/resources';
/**
 * The `arcgis-hub-query-builder` is a composite field for
 * configuring an IQuery.
 */
export declare class ArcgisHubQueryBuilder {
  element: HTMLElement;
  /** hub query definition */
  query: IQuery;
  /**
   * type of entity the query is targeting. This is used
   * internally to determine which API we query.
   */
  targetEntity: EntityType;
  /**
   * optional callbacks which can be used to call on specific query builder actions.
   * This allows us to easily know specific information about query updates
   * without having to parse the entire returned query/an entire catalog.
   */
  callbacks?: ICatalogBuilderCallbacks;
  /** predicate properties to present as filter options */
  availablePredicateProperties: PredicateProperty[];
  /**
   * optional context for which a query is being constructed.
   * This is used to conditionally change the UI (e.g. button
   * appearance)
   */
  queryContext: "catalogScope" | "collection";
  /** internal copy of the query being configured */
  _query: IQuery;
  /** event emitted when the query is updated */
  arcgisHubQueryBuilderChange: EventEmitter<IQuery>;
  _intl: ComponentIntl;
  _schema: IConfigurationSchema;
  componentWillLoad(): Promise<void>;
  /** dynamically generated query builder uiSchema */
  get _uiSchema(): IUiSchema;
  /**
   * wrapper around the built-in intl.t function that
   * encapsulates the translation strings from this
   * component to pass into the configuration editor
   */
  translationFunc: (key: any, values?: any, opts?: any) => string;
  /**
   * function to transform the incoming IQuery into a format
   * that is consistent with the underlying catalog editor
   */
  transformQueryForEditor(query: IQuery): IQuery;
  /**
   * function to transform the editor values into a valid
   * IQuery before emitting
   */
  transformQueryToEmit(query: IQuery): IQuery;
  handleQueryEditorChange: (evt: CustomEvent<IChangeEventDetail>) => void;
  render(): any;
}
