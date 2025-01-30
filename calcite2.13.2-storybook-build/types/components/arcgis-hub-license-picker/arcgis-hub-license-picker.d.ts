import { IStructuredLicense } from '@esri/hub-common';
import { EventEmitter } from '../../stencil-public-runtime';
import { ComponentIntl } from '../../utils/stencil-intl';
export declare class ArcgisHubLicensePicker {
  element: HTMLArcgisHubLicensePickerElement;
  arcgisHubLicensePickerChange: EventEmitter<string>;
  licenseInfo: string;
  modalIsOpen: boolean;
  intl: ComponentIntl;
  get structuredLicense(): IStructuredLicense;
  constructor();
  componentWillLoad(): Promise<void>;
  handleApply(event: CustomEvent<string>): void;
  handleModalClose(): void;
  handleModalOpen(): void;
  handleRemove(): void;
  handleOpenLink(event: MouseEvent): void;
  render(): any;
}
