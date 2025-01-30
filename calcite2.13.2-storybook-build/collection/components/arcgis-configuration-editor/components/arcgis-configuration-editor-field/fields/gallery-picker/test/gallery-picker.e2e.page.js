import { BaseHubComponentPage, waitForAndClick, waitForVisible } from "../../../../../../../../test/e2e/utils";
export class GalleryPickerPage extends BaseHubComponentPage {
  constructor() {
    super(...arguments);
    this._root = 'hub-field-input-gallery-picker';
  }
  get _pickerButton() {
    return `${this.root} calcite-button`;
  }
  async _openPicker() {
    await waitForAndClick(this.page, this._pickerButton);
  }
  async validateRender() {
    await waitForVisible(this.page, this._pickerButton);
  }
  // NOTE: we cannot currently interact with the gallery picker
  // field in the E2E tests. This is because of how we are
  // externalizing the JSAPI modules.
  async selectItems() {
    await this._openPicker();
  }
}
