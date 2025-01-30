import { EventEmitter } from "../../../../../../../stencil-public-runtime";
import { ComponentIntl } from "../../../../../../../utils/stencil-intl";
import { IConfigurationSchema, IGalleryDisplayConfig, IUiSchema } from "@esri/hub-common";
export declare class ArcgisHubResultsAppearanceBuilder {
  element: HTMLElement;
  /**
   * The display configuration for the gallery
   */
  displayConfig: IGalleryDisplayConfig;
  _intl: ComponentIntl;
  /**
   * Event emitted when the results appearance configuration editor changes
   */
  arcgisHubResultsAppearanceBuilderChange: EventEmitter<IGalleryDisplayConfig>;
  componentWillLoad(): Promise<void>;
  /**
   * Returns the schema for the results appearance builder
   */
  get _schema(): IConfigurationSchema;
  /**
   * Returns the uiSchema for the results appearance builder
   */
  get _uiSchema(): IUiSchema;
  translationFunc: (key: any, values?: any, opts?: any) => string;
  /**
   * Event handler for when the results appearance configuration editor changes
   */
  handleResultsAppearanceBuilderChange: (event: CustomEvent) => void;
  render(): any;
}
