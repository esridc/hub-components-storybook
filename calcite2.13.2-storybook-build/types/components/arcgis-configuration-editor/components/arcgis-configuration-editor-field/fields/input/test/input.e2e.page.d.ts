import { HubComponentPage } from "../../../../../../../../test/e2e/types";
import { BaseHubComponentPage } from "../../../../../../../../test/e2e/utils";
export declare class InputPage extends BaseHubComponentPage implements HubComponentPage {
  protected _root: string;
  private get _textArea();
  private get _input();
  typeInput(input: string): Promise<void>;
  clearInput(): Promise<void>;
}
