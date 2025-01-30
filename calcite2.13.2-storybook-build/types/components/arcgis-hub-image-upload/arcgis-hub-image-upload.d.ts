import { EventEmitter } from "../../stencil-public-runtime";
import { FileChangePayload, DrawParameters, ImageUploadSavePayload } from "./types";
declare enum ACTIVE_STEP {
  FILE = "file",
  EDIT = "edit"
}
export declare class ArcgisHubImageUpload {
  el: HTMLArcgisHubImageUploadElement;
  private intl;
  /**
   * Title text for the modal header slot.
   */
  modalTitle: string;
  /**
   * Size description text ex: "For best results, the image should be 300 x 300 pixels."
   */
  sizeDescription: string;
  /**
   * Flag to indicate whether or not to auto zoom to fit the image into the frame
   */
  zoomToFit: boolean;
  /**
   * Maximum width for the scaled image output
   */
  maxWidth: number;
  /**
   * Maximum height for the scaled image output
   */
  maxHeight: number;
  /**
   * Flag to indicate to auto fill background with the color #efefef
   */
  fillBackground: boolean;
  /**
   * Flag to show/hide the calcite-modal
   */
  active: boolean;
  /**
   * Desired height of the output image
   */
  height: number;
  /**
   * Number to indicate the ratio of the output image width relative to the height
   */
  aspectRatio: number;
  inline: boolean;
  previewSrc: string;
  saving: boolean;
  editExisting: boolean;
  isModified: boolean;
  arcgisImageUploadCancel: EventEmitter;
  arcgisImageUploadError: EventEmitter<string>;
  arcgisImageUploadSave: EventEmitter<ImageUploadSavePayload>;
  hubTelemetry: EventEmitter<Record<string, any>>;
  activeStep: ACTIVE_STEP;
  hasError: boolean;
  imageFormat: string;
  editStepEl: HTMLArcgisHubImageUploadEditStepElement;
  canvasEl: HTMLCanvasElement;
  fileName: string;
  private get _messageOverrides();
  componentWillLoad(): Promise<void>;
  constructor();
  handleFileChange(evt: CustomEvent<FileChangePayload>): void;
  handleInvalidFile(): void;
  handleImageChange(): Promise<void>;
  handleActiveChange(): void;
  resetState(): void;
  triggerErrorState: () => void;
  resetErrorState: () => void;
  handleCancel: () => void;
  handleChooseDiffClick: () => void;
  handleSaveClick: () => Promise<void>;
  dataURIToBlob(dataURI: string): Blob;
  drawImage({ selectionX, selectionY, selectionWidth, selectionHeight, canvasWidth, canvasHeight, minWidth, minHeight, drawDimensions }: DrawParameters, scaleFactor: number, img: HTMLImageElement, context: CanvasRenderingContext2D): {
    base64: string;
    blob: Blob;
  };
  getScaledImageData(img: HTMLImageElement): Promise<ImageUploadSavePayload>;
  getCanvasImage(): Promise<ImageUploadSavePayload>;
  getEditStepRef(el: HTMLArcgisHubImageUploadEditStepElement): void;
  getCanvasRef(el: HTMLCanvasElement): void;
  renderInlineEditStateButtons(): HTMLElement;
  renderModalButtons(): HTMLElement;
  renderContent(): HTMLElement;
  render(): any;
}
export {};
