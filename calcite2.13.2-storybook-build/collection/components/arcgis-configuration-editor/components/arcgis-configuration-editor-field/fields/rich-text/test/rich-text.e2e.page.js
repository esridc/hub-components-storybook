import { BaseHubComponentPage, waitForFocusAndType, waitForTextContentEquals, waitForVisible } from "../../../../../../../../test/e2e/utils";
export class RichTextPage extends BaseHubComponentPage {
  constructor() {
    super(...arguments);
    this._root = 'hub-field-input-rich-text';
  }
  get _ckEditorContent() {
    return `${this.root} .ck-content`;
  }
  async typeInput(input) {
    const ckEditorContentEl = await waitForVisible(this.page, this._ckEditorContent);
    const currentValue = await this.page.evaluate(el => el.value, ckEditorContentEl) || '';
    await waitForFocusAndType(this.page, this._ckEditorContent, input);
    await waitForTextContentEquals(this.page, this._ckEditorContent, `${currentValue}${input}`);
  }
}
