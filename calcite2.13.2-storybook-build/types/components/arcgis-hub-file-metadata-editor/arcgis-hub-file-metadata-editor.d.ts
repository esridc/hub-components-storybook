import { EventEmitter } from "../../stencil-public-runtime";
import { ComponentIntl } from "../../utils/stencil-intl";
import { IChangeEventDetail, IConfigurationSchema, IConfigurationValues, IUiSchema } from "@esri/hub-common";
export declare class ArcgisHubFileMetadataEditor {
  element: HTMLElement;
  intl: ComponentIntl;
  /**
   * The values for the arcgis-configuration-editor (title, snippet, tags)
   *
   * @type {IConfigurationValues}
   * @memberof ArcgisHubFileMetadataEditor
   */
  values: IConfigurationValues;
  private internalValues;
  arcgisHubFileMetadataEditorChange: EventEmitter<IChangeEventDetail>;
  constructor();
  componentWillLoad(): Promise<void>;
  handleValuesChanged(): void;
  /**
   * Emit an event with the updated item metadata values when a field in
   * the arcgis-configuration-editor is changed
   * @param event
   */
  handleEditorChangeEvent(event: CustomEvent<IChangeEventDetail>): void;
  _schema: IConfigurationSchema;
  _uiSchema: IUiSchema;
  private translationFunc;
  render(): any;
}
