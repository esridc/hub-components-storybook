import { BaseHubComponentPage, waitForAndFocus, waitForFocusAndType, waitForValueEquals, waitForVisible } from "../../../../../../../../test/e2e/utils";
export class InputPage extends BaseHubComponentPage {
  constructor() {
    super(...arguments);
    this._root = 'hub-field-input-input';
  }
  get _textArea() {
    return `${this.root} calcite-text-area >>> textarea`;
  }
  get _input() {
    return `${this.root} calcite-input >>> input`;
  }
  async typeInput(input) {
    const rootEl = await waitForVisible(this.page, this.root);
    const selector = ['textarea'].includes(await this.page.evaluate(el => el.getAttribute('data-test-type'), rootEl))
      ? this._textArea
      : this._input;
    const inputEl = await waitForVisible(this.page, selector);
    const currentValue = await this.page.evaluate(el => el.value, inputEl) || '';
    await waitForFocusAndType(this.page, selector, input);
    await waitForValueEquals(this.page, selector, `${currentValue}${input}`);
  }
  async clearInput() {
    const rootEl = await waitForVisible(this.page, this.root);
    const selector = ['textarea'].includes(await this.page.evaluate(el => el.getAttribute('data-test-type'), rootEl))
      ? this._textArea
      : this._input;
    const inputEl = await waitForVisible(this.page, selector);
    inputEl.click({ clickCount: 3 });
    await waitForAndFocus(this.page, selector);
    await this.page.keyboard.press('Backspace');
    await waitForValueEquals(this.page, selector, '');
  }
}
