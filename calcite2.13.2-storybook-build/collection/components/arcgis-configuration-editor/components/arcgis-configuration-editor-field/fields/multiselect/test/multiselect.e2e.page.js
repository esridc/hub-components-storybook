import { BaseHubComponentPage, waitForAndClick, waitForFocusAndType, waitForNoTextContentEquals, waitForSomeTextContentEquals, waitForValueEquals } from "../../../../../../../../test/e2e/utils";
export class MultiselectPage extends BaseHubComponentPage {
  constructor() {
    super(...arguments);
    this._root = 'hub-field-input-multiselect';
  }
  get _input() {
    return `${this.root} calcite-input >>> input`;
  }
  get _chips() {
    return `${this.root} calcite-chip`;
  }
  _getChip(idx) {
    /**
     * note: we must do idx + 2 to account for:
     * 1. the fact that :nth-child is 1-based
     * 2. the fact that the first child of the
     * parent is the input element (not a chip)
     */
    return `${this._chips}:nth-child(${idx + 2})`;
  }
  _getChipCloseBtn(idx) {
    return `${this._getChip(idx)} >>> button.close`;
  }
  async addOption(input) {
    await waitForFocusAndType(this.page, this._input, input);
    await waitForValueEquals(this.page, this._input, input);
    await this.page.keyboard.press('Enter');
    await waitForSomeTextContentEquals(this.page, this._chips, input);
  }
  async removeOption(idx) {
    const chipTextContent = (await this.page.find(this._getChip(idx))).textContent;
    await waitForAndClick(this.page, this._getChipCloseBtn(idx));
    await waitForNoTextContentEquals(this.page, this._chips, chipTextContent);
  }
}
