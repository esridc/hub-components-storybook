import { EventEmitter } from "../../../stencil-public-runtime";
import { FileChangePayload } from "../types";
/** @internal **/
export declare class ArcgisHubImageUploadFileStep {
  el: HTMLArcgisHubImageUploadFileStepElement;
  sizeDescription: string;
  arcgisImageUploadFileStepFileChange: EventEmitter<FileChangePayload>;
  arcgisImageUploadFileStepInvalidFile: EventEmitter;
  errorMessage: string;
  fileInput: HTMLInputElement;
  private intl;
  componentWillLoad(): Promise<void>;
  constructor();
  get headingIntl(): string;
  get description(): string;
  handleDragOver: (event: any) => void;
  handleDrop: (event: any) => void;
  handleFileInputChange: (event: any) => void;
  processFile(file: File): void;
  isValidFile(file: File): boolean;
  handleButtonClick(): void;
  setFileInputEl(el: HTMLInputElement): void;
  triggerErrorState: (intlMessage: string) => void;
  resetErrorState: () => void;
  render(): any;
}
