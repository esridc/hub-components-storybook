import { HubComponentPage } from "../../../../../../../../test/e2e/types";
import { BaseHubComponentPage } from "../../../../../../../../test/e2e/utils";
export declare class RadioGroupPage extends BaseHubComponentPage implements HubComponentPage {
  protected _root: string;
  private get _segmentedControl();
  private _getSegmentedControlItem;
  selectOption(idx: number): Promise<void>;
}
