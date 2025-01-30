import { HubComponentPage } from "../../../../../../../../test/e2e/types";
import { BaseHubComponentPage } from "../../../../../../../../test/e2e/utils";
export declare class DatePickerPage extends BaseHubComponentPage implements HubComponentPage {
  protected _root: string;
  private get _input();
  typeInput(input: string): Promise<void>;
}
