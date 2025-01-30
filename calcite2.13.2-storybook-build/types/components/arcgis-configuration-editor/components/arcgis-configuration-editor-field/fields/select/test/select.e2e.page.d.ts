import { HubComponentPage } from "../../../../../../../../test/e2e/types";
import { BaseHubComponentPage } from "../../../../../../../../test/e2e/utils";
export declare class SelectPage extends BaseHubComponentPage implements HubComponentPage {
  protected _root: string;
  private get _select();
  selectOption(): Promise<void>;
}
