import { BaseHubComponentPage, waitForFocusAndType, waitForValueEquals, waitForVisible } from "../../../../../../../../test/e2e/utils";
export class DatePickerPage extends BaseHubComponentPage {
  constructor() {
    super(...arguments);
    this._root = 'hub-field-input-date';
  }
  get _input() {
    // Note: shadow dom selector changes from Calcite v1.10.0 to v1.11.0 -- https://devtopia.esri.com/dc/hub/issues/10584
    return `${this.root} calcite-input-date-picker >>> calcite-input-text >>> input`;
  }
  async typeInput(input) {
    const inputEl = await waitForVisible(this.page, this._input);
    const currentValue = await this.page.evaluate(el => el.value, inputEl) || '';
    await waitForFocusAndType(this.page, this._input, input);
    await this.page.keyboard.press('Enter');
    await waitForValueEquals(this.page, this._input, `${currentValue}${input}`);
  }
}
