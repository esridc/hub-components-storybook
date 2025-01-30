import { BaseHubComponentPage, waitForAndClick, waitForExists, waitForNotExists } from "../../../../../../../../test/e2e/utils";
export class ImagePickerPage extends BaseHubComponentPage {
  constructor() {
    super(...arguments);
    this._root = 'hub-field-input-image-picker';
  }
  get _image() {
    return `${this.root} img`;
  }
  get _trashButton() {
    return `${this.root} calcite-button`;
  }
  get _imageUpload() {
    return `${this.root} arcgis-hub-image-upload`;
  }
  ;
  get _browseButton() {
    return `${this._imageUpload} >>> arcgis-hub-image-upload-file-step >>> calcite-button`;
  }
  async removeImage() {
    await waitForExists(this.page, this._image);
    await waitForAndClick(this.page, this._trashButton);
    await waitForNotExists(this.page, this._image);
    await waitForExists(this.page, this._imageUpload);
  }
  async uploadImage() {
    const [fileChooser] = await Promise.all([
      this.page.waitForFileChooser(),
      waitForAndClick(this.page, this._browseButton)
    ]);
    await fileChooser.cancel();
  }
}
