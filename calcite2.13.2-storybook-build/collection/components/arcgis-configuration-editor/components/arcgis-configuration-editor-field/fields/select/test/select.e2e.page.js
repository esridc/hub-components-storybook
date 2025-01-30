import { BaseHubComponentPage, waitForVisible } from "../../../../../../../../test/e2e/utils";
export class SelectPage extends BaseHubComponentPage {
  constructor() {
    super(...arguments);
    this._root = 'hub-field-input-select';
  }
  get _select() {
    return `${this.root} calcite-select`;
  }
  async selectOption() {
    const selectEl = await waitForVisible(this.page, this._select);
    await selectEl.click();
    await selectEl.click();
  }
}
