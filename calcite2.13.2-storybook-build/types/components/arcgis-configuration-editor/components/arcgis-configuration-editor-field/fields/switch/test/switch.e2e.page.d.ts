import { HubComponentPage } from "../../../../../../../../test/e2e/types";
import { BaseHubComponentPage } from "../../../../../../../../test/e2e/utils";
export declare class SwitchPage extends BaseHubComponentPage implements HubComponentPage {
  protected _root: string;
  private get _calciteSwitch();
  toggleOn(): Promise<void>;
  toggleOff(): Promise<void>;
  verifyOn(): Promise<void>;
  verifyOff(): Promise<void>;
}
