import { HubComponentPage } from "../../../../../../../../test/e2e/types";
import { BaseHubComponentPage } from "../../../../../../../../test/e2e/utils";
export declare class TileSelectPage extends BaseHubComponentPage implements HubComponentPage {
  protected _root: string;
  private get _calcite_tile_group();
  private _getTileSelect;
  verifyOptionSelected(idx: number): Promise<void>;
  selectOption(idx: number): Promise<void>;
  verifyOptionDisabled(idx: number): Promise<void>;
  verifyOptionNotDisabled(idx: number): Promise<void>;
}
