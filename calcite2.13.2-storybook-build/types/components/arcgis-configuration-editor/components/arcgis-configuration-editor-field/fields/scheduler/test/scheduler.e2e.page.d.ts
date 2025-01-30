import { HubComponentPage } from "../../../../../../../../test/e2e/types";
import { BaseHubComponentPage } from "../../../../../../../../test/e2e/utils";
export declare class SchedulerPage extends BaseHubComponentPage implements HubComponentPage {
  protected _root: string;
  private get _calciteSelect();
  validateRender(): Promise<void>;
}
