import { HubComponentPage } from "../../../../../../../../test/e2e/types";
import { BaseHubComponentPage } from "../../../../../../../../test/e2e/utils";
export declare class GalleryPickerPage extends BaseHubComponentPage implements HubComponentPage {
  protected _root: string;
  private get _pickerButton();
  private _openPicker;
  validateRender(): Promise<void>;
  selectItems(): Promise<void>;
}
