import { HubComponentPage } from "../../../../../../../../test/e2e/types";
import { BaseHubComponentPage } from "../../../../../../../../test/e2e/utils";
export declare class ColorPickerPage extends BaseHubComponentPage implements HubComponentPage {
  protected _root: string;
  private get _calciteInput();
  private get _input();
  typeInput(input: string): Promise<void>;
}
