import { HubComponentPage } from "../../../../../../../../test/e2e/types";
import { BaseHubComponentPage } from "../../../../../../../../test/e2e/utils";
import { ALIGNMENTS } from "../../../../../../interfaces";
export declare class AlignmentPage extends BaseHubComponentPage implements HubComponentPage {
  protected _root: string;
  private get _segmentedControl();
  private get _alignmentStart();
  private get _alignmentCenter();
  private get _alignmentEnd();
  setAlignment(alignment: ALIGNMENTS): Promise<void>;
}
