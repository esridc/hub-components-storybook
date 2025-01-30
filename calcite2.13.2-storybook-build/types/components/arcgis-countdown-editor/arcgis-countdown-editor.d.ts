import { EventEmitter } from '../../stencil-public-runtime';
import { ComponentIntl } from "../../utils/stencil-intl";
import { SCHEMA } from "./schema";
import { IChangeEventDetail, IConfigurationValues } from '@esri/hub-common';
export declare class ArcgisCountdownEditor {
  element: HTMLElement;
  intl: ComponentIntl;
  /**
   * The dynamic countdown values
   *
   * @type {IConfigurationValues}
   * @memberof ArcgisCountdownEditor
   */
  values: IConfigurationValues;
  arcgisCountdownEditorChange: EventEmitter<IChangeEventDetail>;
  /**
   * emit an event with the updated countdown values
   * when a field in the arcgis-configuration-editor is
   * changed
   * @param event
   */
  handleEditorChangeEvent(event: CustomEvent): void;
  componentWillLoad(): Promise<void>;
  /**
   * json schema for the arcgis-countdown-editor
   * this gets parsed by the arcgis-configuration-editor
   * to determine what inputs to render
   */
  get schema(): typeof SCHEMA;
  render(): any;
}
