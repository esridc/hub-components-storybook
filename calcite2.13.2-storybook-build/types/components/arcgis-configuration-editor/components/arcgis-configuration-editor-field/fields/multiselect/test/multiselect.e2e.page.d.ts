import { HubComponentPage } from "../../../../../../../../test/e2e/types";
import { BaseHubComponentPage } from "../../../../../../../../test/e2e/utils";
export declare class MultiselectPage extends BaseHubComponentPage implements HubComponentPage {
  protected _root: string;
  private get _input();
  private get _chips();
  private _getChip;
  private _getChipCloseBtn;
  addOption(input: string): Promise<void>;
  removeOption(idx: number): Promise<void>;
}
