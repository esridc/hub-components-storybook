import { EventEmitter } from "../../../../../../stencil-public-runtime";
import { IRenderParams } from "../resources";
import { IHubLocationOption } from "../../../../../../utils/types/IHubLocationOption";
import { IHubLocation } from "@esri/hub-common";
export declare class LocationPicker {
  params: IRenderParams;
  arcgisConfigurationEditorFieldInputChange: EventEmitter<IHubLocation>;
  constructor();
  get options(): IHubLocationOption[];
  handleArcgisHubInputLocationPickerChange(evt: CustomEvent<IHubLocation>): void;
  render(): any;
}
