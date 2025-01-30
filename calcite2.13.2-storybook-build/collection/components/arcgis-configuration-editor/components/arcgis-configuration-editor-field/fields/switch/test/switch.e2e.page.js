import { BaseHubComponentPage, waitForAndClick, waitForHasAttribute, waitForNotHasAttribute } from "../../../../../../../../test/e2e/utils";
export class SwitchPage extends BaseHubComponentPage {
  constructor() {
    super(...arguments);
    this._root = 'hub-field-input-switch';
  }
  get _calciteSwitch() {
    return `${this.root} calcite-switch`;
  }
  async toggleOn() {
    await waitForAndClick(this.page, this._calciteSwitch);
    await waitForHasAttribute(this.page, this._calciteSwitch, 'checked');
  }
  async toggleOff() {
    await waitForAndClick(this.page, this._calciteSwitch);
    await waitForNotHasAttribute(this.page, this._calciteSwitch, 'checked');
  }
  async verifyOn() {
    await waitForHasAttribute(this.page, this._calciteSwitch, 'checked');
  }
  async verifyOff() {
    await waitForNotHasAttribute(this.page, this._calciteSwitch, 'checked');
  }
}
