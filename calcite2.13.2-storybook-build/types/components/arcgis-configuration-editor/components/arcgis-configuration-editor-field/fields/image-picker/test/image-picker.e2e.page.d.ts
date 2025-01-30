import { HubComponentPage } from "../../../../../../../../test/e2e/types";
import { BaseHubComponentPage } from "../../../../../../../../test/e2e/utils";
export declare class ImagePickerPage extends BaseHubComponentPage implements HubComponentPage {
  protected _root: string;
  private get _image();
  private get _trashButton();
  private get _imageUpload();
  private get _browseButton();
  removeImage(): Promise<void>;
  uploadImage(): Promise<void>;
}
