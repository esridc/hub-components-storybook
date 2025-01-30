import { HubComponentPage } from "../../../../../../../../test/e2e/types";
import { BaseHubComponentPage } from "../../../../../../../../test/e2e/utils";
export declare class RichTextPage extends BaseHubComponentPage implements HubComponentPage {
  protected _root: string;
  get _ckEditorContent(): string;
  typeInput(input: string): Promise<void>;
}
