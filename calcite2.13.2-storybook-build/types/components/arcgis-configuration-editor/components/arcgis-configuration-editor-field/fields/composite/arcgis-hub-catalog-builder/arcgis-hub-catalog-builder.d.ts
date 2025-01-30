import { EventEmitter } from '../../../../../../../stencil-public-runtime';
import { IHubCatalog, IConfigurationSchema, IUiSchema, EntityType, IChangeEventDetail, IHubCollection } from '@esri/hub-common';
import { ComponentIntl } from '../../../../../../../utils/stencil-intl';
import { ICatalogBuilderCallbacks } from '../../../../../../arcgis-hub-workspace-panes/arcgis-hub-entity-catalog/resources';
/**
 * The arcgis-hub-catalog-builder is a composite field for
 * configuring an IHubCatalog. See readme for additional
 * details.
 */
export declare class ArcgisHubCatalogBuilder {
  element: HTMLElement;
  /** hub catalog definition */
  catalog: IHubCatalog;
  /** target entities to surface in the config UI */
  targetEntity: EntityType;
  /** optional callbacks to call when specific catalog builder actions have been taken */
  callbacks?: ICatalogBuilderCallbacks;
  /** internal copy of the catalog being configured */
  _catalog: IHubCatalog;
  /** event emitted when the catalog is updated */
  arcgisHubCatalogBuilderChange: EventEmitter<IHubCatalog>;
  /** event to emit Hub telemetry */
  hubTelemetry: EventEmitter<any>;
  /** internal reference to all configured collections */
  _collections: IHubCollection[];
  _intl: ComponentIntl;
  _schema: IConfigurationSchema;
  componentWillLoad(): Promise<void>;
  /** dynamically generated catalog builder uiSchema */
  get _uiSchema(): IUiSchema;
  /**
   * wrapper around the built-in intl.t function that
   * encapsulates the translation strings from this
   * component to pass into the configuration editor
   */
  translationFunc: (key: any, values?: any, opts?: any) => string;
  /**
   * determines whether a specific target entity has been
   * configured in the catalog by checking its scopes and
   * collections
   */
  isTargetEntityConfigured: (targetEntity: EntityType) => boolean;
  /**
   * since collections are configured on a per-targetEntity basis
   * in the UI, we must merge them back together before persisting
   * them on the catalog which stores collections for all target
   * entities in a single array
   */
  mergeCollections: (newlyConfiguredCollections: IHubCollection[]) => IHubCollection[];
  /**
   * function to transform the incoming IHubCatalog into a format
   * that is consistent with the underlying catalog editor
   */
  transformCatalogForEditor(catalog: IHubCatalog): IHubCatalog;
  /**
   * function to transform the editor values into a valid
   * IHubCatalog before emitting
   */
  transformCatalogToEmit(catalog: IHubCatalog): IHubCatalog;
  handleCatalogEditorChange: (evt: CustomEvent<IChangeEventDetail>) => void;
  /**
   * focuses the calcite-flow item when it is first opened
   * @param item
   */
  setCalciteFlowItemFocus: (item: HTMLCalciteFlowItemElement) => void;
  renderEditor(): HTMLCalciteFlowItemElement;
  render(): any;
}
