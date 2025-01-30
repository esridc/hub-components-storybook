import { BaseHubComponentPage, waitForAndClick, waitForHasAttribute } from "../../../../../../../../test/e2e/utils";
export class RadioGroupPage extends BaseHubComponentPage {
  constructor() {
    super(...arguments);
    this._root = 'hub-field-input-radio-group';
  }
  get _segmentedControl() {
    return `${this.root} calcite-segmented-control`;
  }
  _getSegmentedControlItem(idx) {
    return `${this._segmentedControl} calcite-segmented-control-item:nth-child(${idx})`;
  }
  async selectOption(idx) {
    const selector = this._getSegmentedControlItem(idx);
    await waitForAndClick(this.page, selector);
    await waitForHasAttribute(this.page, selector, 'checked');
  }
}
