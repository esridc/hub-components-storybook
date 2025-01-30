import { BaseHubComponentPage, waitForAndClick, waitForHasAttribute } from "../../../../../../../../test/e2e/utils";
export class RadioPage extends BaseHubComponentPage {
  constructor() {
    super(...arguments);
    this._root = 'hub-field-input-radio';
  }
  get _calciteRadioButtonGroup() {
    return `${this.root} >>> calcite-radio-button-group`;
  }
  _getCalciteRadioButton(idx) {
    return `${this._calciteRadioButtonGroup} calcite-label:nth-child(${idx}) calcite-radio-button`;
  }
  _getRadioButton(idx) {
    return `${this._calciteRadioButtonGroup} calcite-label:nth-child(${idx}) calcite-radio-button >>> div[role="radio"]`;
  }
  async selectOption(idx) {
    await waitForAndClick(this.page, this._getRadioButton(idx));
    await waitForHasAttribute(this.page, this._getCalciteRadioButton(idx), 'checked');
  }
}
