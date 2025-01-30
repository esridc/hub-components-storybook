import { IStructuredLicense } from '@esri/hub-common';
import { EventEmitter } from '../../stencil-public-runtime';
import { ComponentIntl } from '../../utils/stencil-intl';
import { CalciteListItemCustomEvent } from '@esri/calcite-components';
export declare class ArcgisHubLicensePickerModal {
  element: HTMLArcgisHubLicensePickerModalElement;
  arcgisHubLicensePickerModalApply: EventEmitter<string>;
  arcgisHubLicensePickerModalCancel: EventEmitter<void>;
  modalIsOpen: boolean;
  licenseInfo: any;
  wasCustomLicense: boolean;
  wasStructuredLicense: boolean;
  get structuredLicense(): IStructuredLicense;
  intl: ComponentIntl;
  licenseChoices: IStructuredLicense[];
  licenseChoiceAbbrs: string[];
  richTextEditor: HTMLArcgisHubRichTextElement;
  constructor();
  componentWillLoad(): Promise<void>;
  handleLicenseSelection(event: CalciteListItemCustomEvent<any>): void;
  handleTextChange(event: CustomEvent<any>): void;
  handleApply(): void;
  handleCancel(): void;
  handleOpenLink(event: MouseEvent): void;
  setRichTextEditor(el: HTMLArcgisHubRichTextElement): void;
  render(): any;
}
