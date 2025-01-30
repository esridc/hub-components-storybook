import { EventEmitter } from "../../../../../../../stencil-public-runtime";
import { ComponentIntl } from "../../../../../../../utils/stencil-intl";
import { EntityType, IChangeEventDetail, IConfigurationSchema, IConfigurationValues, IGalleryDisplayConfig, IUiSchema } from "@esri/hub-common";
import { ICatalogBuilderCallbacks } from "../../../../../../arcgis-hub-workspace-panes/arcgis-hub-entity-catalog/resources";
/**
 * The arcgis-hub-catalog-appearance-builder is a composite field for
 * configuring the appearance of an IHubCatalog. See readme for additional details.
 */
export declare class ArcgisHubCatalogAppearanceBuilder {
  element: HTMLElement;
  /** hub catalog definition */
  catalogDisplayConfig: {
    displayConfig: IGalleryDisplayConfig;
  };
  /** current target entity we are working with */
  targetEntity: EntityType;
  /** optional callbacks from the catalog builder */
  callbacks?: ICatalogBuilderCallbacks;
  /** the current state of the appearance settings */
  _catalogDisplayConfig: IConfigurationValues;
  /** whether we are editing results appearance */
  _isAppearanceEditorOpen: boolean;
  arcgisHubCatalogAppearanceBuilderChange: EventEmitter<IConfigurationValues>;
  _intl: ComponentIntl;
  componentWillLoad(): Promise<void>;
  /**
   * Reference to upper level calcite flow to hook into
   */
  get _calciteFlowRef(): HTMLCalciteFlowElement;
  /**
   * Returns the correct schema for the editor depending on which editor is selected
   */
  get _schema(): IConfigurationSchema;
  /**
   * Returns the correct uiSchema for the editor depending on which editor is selected
   */
  get _uiSchema(): IUiSchema;
  /**
   * Returns the correct values for the editor, separated by target entity
   */
  get _values(): IConfigurationValues;
  /**
  * wrapper around the built-in intl.t function that
  * encapsulates the translation strings from this
  * component to pass into the configuration editor
  */
  translationFunc: (key: any, values?: any, opts?: any) => string;
  /**
   * Handles a change from the appearance editor
   * @param evt
   */
  handleAppearanceEditorChange: (evt: CustomEvent<IChangeEventDetail>) => void;
  /**
 * renders the editor for the appearance builder, either the results editor
 * or the collections editor depending on which is selected
 * @returns
 */
  renderEditor(): HTMLArcgisConfigurationFormElement;
  /**
   * opens the editor depending on if we should open the "results" editor or the "collections" editor.
   * @param evt
   */
  handleOnEditorOpen: () => void;
  /**
   * Closes the appearance editor.
   */
  handleOnEditorClose: (event: CustomEvent<any>) => void;
  /**
   * renders the results and collections sections for the appearance panel
   * @returns
   */
  renderAppearancePanelSections(): HTMLElement;
  render(): any;
}
