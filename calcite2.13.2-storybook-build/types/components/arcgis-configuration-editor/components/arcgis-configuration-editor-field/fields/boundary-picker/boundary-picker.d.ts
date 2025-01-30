import { IExtent } from "@esri/arcgis-rest-feature-layer";
import { EventEmitter } from "../../../../../../stencil-public-runtime";
import { IBoundaryPickerSource } from "../../../../../../utils";
import { IRenderParams } from "../resources";
/** Deprecated - please use the location picker field instead */
export declare class BoundaryPicker {
  params: IRenderParams;
  sources: IBoundaryPickerSource[];
  arcgisConfigurationEditorFieldInputChange: EventEmitter<IExtent>;
  constructor();
  componentWillLoad(): void;
  /**
   * generate the boundary picker sources from the uiSchema options.
   * This function handles source label translations if a labelKey is
   * provided
   */
  getSources(): IBoundaryPickerSource[];
  handleArcgisHubInputBoundaryPickerChange(evt: CustomEvent<IBoundaryPickerSource>): void;
  render(): any;
}
