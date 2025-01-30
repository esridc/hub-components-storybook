import { IConfigurationSchema, IUiSchema, IGalleryDisplayConfig } from "@esri/hub-common";
import { EventEmitter } from "../../../../../../../stencil-public-runtime";
import { ComponentIntl } from "../../../../../../../utils/stencil-intl";
/**
 * The arcgis-hub-collections-appearance-builder is a composite field for
 * configuring the appearance of an IHubCollection. See readme for additional details.
 */
export declare class ArcgisHubCollectionsAppearanceBuilder {
  element: HTMLElement;
  /** optional reference to a calcite flow element to insert the flow for a specific collection */
  calciteFlowRefCallback?: () => HTMLCalciteFlowElement;
  /** hub collections definition */
  displayConfig: IGalleryDisplayConfig;
  /** internal state of display config transformed for the editor */
  _displayConfig: IGalleryDisplayConfig;
  arcgisHubCollectionsAppearanceBuilderChange: EventEmitter<IGalleryDisplayConfig>;
  _intl: ComponentIntl;
  componentWillLoad(): Promise<void>;
  /**
   * Returns the correct schema for the editor depending on which editor is selected
   */
  get _schema(): IConfigurationSchema;
  /**
   * Returns the correct uiSchema for the editor depending on which editor is selected
   */
  get _uiSchema(): IUiSchema;
  /**
   * Handles a change from the collections appearance builder
   * Updates internal state and emits the change event
   */
  handleCollectionsAppearanceBuilderChange: (evt: CustomEvent) => void;
  /**
   * wrapper around the built-in intl.t function that
   * encapsulates the translation strings from this
   * component to pass into the configuration editor
   */
  translationFunc: (key: any, values?: any, opts?: any) => string;
  /**
   * Renders an instance of the configuration editor
   * @returns
   */
  renderEditor(): HTMLArcgisConfigurationEditorElement;
  render(): any;
}
