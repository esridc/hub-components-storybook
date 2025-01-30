import { BaseHubComponentPage, waitForFocusAndType, waitForValueEquals, waitForVisible } from "../../../../../../../../test/e2e/utils";
export class ColorPickerPage extends BaseHubComponentPage {
  constructor() {
    super(...arguments);
    this._root = 'hub-field-input-color';
  }
  get _calciteInput() {
    return `${this.root} arcgis-hub-input-color >>> calcite-input`;
  }
  get _input() {
    return `${this._calciteInput} >>> input`;
  }
  async typeInput(input) {
    const inputEl = await waitForVisible(this.page, this._input);
    const currentValue = await this.page.evaluate(el => el.value, inputEl) || '';
    await waitForFocusAndType(this.page, this._input, input);
    await waitForValueEquals(this.page, this._input, `${currentValue}${input}`);
  }
}
