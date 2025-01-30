import { EventEmitter } from "../../../../../../stencil-public-runtime";
import { IRenderParams } from "../resources";
export declare class RichText {
  constructor();
  params: IRenderParams;
  arcgisConfigurationEditorFieldInputChange: EventEmitter<string>;
  handleArcgisHubInputRichTextChange(evt: CustomEvent<void>): void;
  render(): any;
}
