import { EventEmitter } from '../../../../../../../stencil-public-runtime';
import { IConfigurationSchema, IUiSchema, IConfigurationValues, IChangeEventDetail } from '@esri/hub-common';
import { ComponentIntl } from '../../../../../../../utils/stencil-intl';
interface IHubCompositeInputIcon {
  scope?: string;
  name?: string;
  url?: string;
  color?: string;
  altText?: string;
}
/**
 * @internal
 * NOTE: this component is not ready for consumption
 */
export declare class Icon {
  element: HTMLElement;
  values: IConfigurationValues;
  arcgisCompositeIconFieldChange: EventEmitter<IHubCompositeInputIcon>;
  isModalOpen: boolean;
  iconElements: HTMLElement[];
  selectedIcon: string;
  isValid: boolean;
  internalValues: IHubCompositeInputIcon;
  intl: ComponentIntl;
  _schema: IConfigurationSchema;
  _uiSchema: IUiSchema;
  constructor();
  componentWillLoad(): Promise<void>;
  componentDidLoad(): void;
  handleOpenIconModal(): void;
  handleCloseIconModal(): void;
  handleClickIcon(event: any): void;
  handleSelectIcon(): void;
  handleEditorChangeEvent(event: CustomEvent<IChangeEventDetail>): void;
  loadIcons(): void;
  private translationFunc;
  render(): any;
}
export {};
