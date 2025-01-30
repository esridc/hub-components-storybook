import { EventEmitter } from '../../../../../../../stencil-public-runtime';
import { IHubCollection, IChangeEventDetail, IConfigurationSchema, IUiSchema, EntityType } from '@esri/hub-common';
import { _IHubCollection } from './types';
import { ComponentIntl } from '../../../../../../../utils/stencil-intl';
import { PredicateProperty } from '../arcgis-hub-predicates-builder/types';
import { ICatalogBuilderCallbacks } from '../../../../../../arcgis-hub-workspace-panes/arcgis-hub-entity-catalog/resources';
/**
 * The arcgis-hub-collections-builder is a composite field for
 * configuring an array of IHubCollections
 */
export declare class ArcgisHubCollectionsBuilder {
  element: HTMLElement;
  /** hub collection definition */
  values: IHubCollection;
  /**
   * type of entity the collection scope's query is
   * targeting. This is used internally to determine
   * which API we query.
   */
  targetEntity: EntityType;
  /** predicate properties to present as filter options */
  availablePredicateProperties: PredicateProperty[];
  /** Possible callbacks for the collections builder to use on specific events */
  callbacks?: ICatalogBuilderCallbacks;
  /** internal copy of the collection being configured */
  _collection: _IHubCollection;
  /** Whether or not to display the delete confirmation dialog */
  _deleteConfirmationDialogVisible: boolean;
  /** Whether or not the appearance settings editor is open */
  _isAppearanceSettingsEditorOpen: boolean;
  /** event emitted when the collection is updated */
  arcgisHubCollectionsBuilderChange: EventEmitter<IHubCollection>;
  /** event emitted when we start to edit a new collection */
  arcgisHubCollectionsBuilderEditedCollectionKeyChange: EventEmitter<string>;
  _intl: ComponentIntl;
  _collectionSchema: IConfigurationSchema;
  _appearanceSchema: IConfigurationSchema;
  _appearanceUiSchema: IUiSchema;
  get _flowTarget(): HTMLCalciteFlowElement;
  componentWillLoad(): Promise<void>;
  /** dynamically generated collection builder uiSchema */
  get _collectionUiSchema(): IUiSchema;
  /**
   * wrapper around the built-in intl.t function that
   * encapsulates the translation strings from this
   * component to pass into the configuration editor
   */
  translationFunc: (key: any, values?: any, opts?: any) => string;
  /**
   * Emits the key of the collection now being edited
   * @param key
   */
  setEditKey: (key: string) => void;
  /**
   * function to transform the collections into a format that is
   * consistent with the underlying collections editor
   */
  transformCollectionForEditor(collection?: IHubCollection): _IHubCollection;
  /**
   * function to transform the editor values into a
   * valid IHubCollection before emitting
   */
  transformCollectionToEmit(collection: _IHubCollection): IHubCollection;
  handleCollectionEditorChange: (evt: CustomEvent<IChangeEventDetail>) => void;
  /** handler for when a collection is deleted. */
  handleDeleteCollection: () => void;
  /**
   * Closes the delete confirmation dialog
   */
  closeDeleteConfirmation: () => void;
  /**
   * Launches the delete confirmation dialog
   * @param evt
   */
  handleLaunchDeleteConfirmation: () => void;
  /**
   * Handler for when the appearance settings are opened
   */
  handleOpenAppearanceSettingsEditor: () => void;
  /**
   * Handler for when the appearance settings editor is closed
   */
  handleCloseAppearanceSettingsEditor: (event: CustomEvent<any>) => void;
  /**
   * Renders the delete collection button in the edit experience
   * @returns
   */
  renderDeleteButton(): HTMLCalciteButtonElement;
  renderCollectionEditor(): HTMLArcgisConfigurationEditorElement;
  /**
   * Renders the dialog to confirm deletion of a collection
   * @returns
   */
  renderDeleteConfirmationDialog(): HTMLCalciteDialogElement;
  renderAppearanceSettingsBlock(): HTMLElement;
  /**
   * Renders the editor for the collection appearance settings
   * @returns
   */
  renderAppearanceSettingsEditor(): HTMLElement;
  render(): any;
}
