import { BaseHubComponentPage, waitForAndClick, waitForHasAttribute, waitForNotHasAttribute } from "../../../../../../../../test/e2e/utils";
export class TileSelectPage extends BaseHubComponentPage {
  constructor() {
    super(...arguments);
    this._root = 'hub-field-input-tile-select';
  }
  get _calcite_tile_group() {
    return `${this.root} >>> calcite-tile-group`;
  }
  _getTileSelect(idx) {
    return `${this._calcite_tile_group} calcite-tile:nth-child(${idx})`;
  }
  // NOTE: idx is 1-based
  async verifyOptionSelected(idx) {
    const selector = this._getTileSelect(idx);
    await waitForHasAttribute(this.page, selector, 'selected');
  }
  // NOTE: idx is 1-based
  async selectOption(idx) {
    const selector = this._getTileSelect(idx);
    await waitForAndClick(this.page, `${selector} >>> .container.interactive`);
    await waitForHasAttribute(this.page, selector, 'selected');
  }
  // NOTE: idx is 1-based
  async verifyOptionDisabled(idx) {
    const selector = this._getTileSelect(idx);
    await waitForHasAttribute(this.page, selector, 'disabled');
  }
  // NOTE: idx is 1-based
  async verifyOptionNotDisabled(idx) {
    const selector = this._getTileSelect(idx);
    await waitForNotHasAttribute(this.page, selector, 'disabled');
  }
}
