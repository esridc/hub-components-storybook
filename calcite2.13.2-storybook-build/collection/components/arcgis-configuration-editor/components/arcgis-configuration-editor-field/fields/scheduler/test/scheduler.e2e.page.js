import { BaseHubComponentPage, waitForVisible } from "../../../../../../../../test/e2e/utils";
export class SchedulerPage extends BaseHubComponentPage {
  constructor() {
    super(...arguments);
    this._root = 'hub-field-input-scheduler';
  }
  get _calciteSelect() {
    return `${this.root} calcite-select`;
  }
  async validateRender() {
    await waitForVisible(this.page, this._calciteSelect);
  }
}
