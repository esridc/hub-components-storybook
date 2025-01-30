import { EventEmitter } from "../../../../../../stencil-public-runtime";
import { ImageUploadSavePayload } from "../../../../../arcgis-hub-image-upload/types";
import { IRenderParams, IStyleParams } from "../resources";
import { ComponentIntl } from "../../../../../../utils/stencil-intl";
export declare class ImagePicker {
  element: HTMLElement;
  params: IRenderParams;
  styles: IStyleParams;
  arcgisConfigurationEditorFieldInputChange: EventEmitter<ImageUploadSavePayload>;
  hubTelemetry: EventEmitter<Record<string, any>>;
  imgSrc: string;
  isEditing: boolean;
  intl: ComponentIntl;
  defaultImg: string;
  constructor();
  get sizeDescription(): string;
  componentWillLoad(): Promise<void>;
  handleArcgisInputImageUploadSave(evt: CustomEvent<ImageUploadSavePayload>): void;
  clearSrc(): void;
  onCalciteItemDropdownSelect(evt: CustomEvent): void;
  renderButton(): HTMLCalciteButtonElement;
  render(): any;
}
