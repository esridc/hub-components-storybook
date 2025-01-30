import { HubComponentPage } from "../../../../../../../../test/e2e/types";
import { BaseHubComponentPage } from "../../../../../../../../test/e2e/utils";
export declare class RadioPage extends BaseHubComponentPage implements HubComponentPage {
  protected _root: string;
  private get _calciteRadioButtonGroup();
  private _getCalciteRadioButton;
  private _getRadioButton;
  selectOption(idx: number): Promise<void>;
}
