import { Kind, Scale } from '@esri/calcite-components/dist/types/components/interfaces';
import { IChangeEventDetail, IUiSchema } from '@esri/hub-common';
import { CONFIGURATION_VARIANTS, TranslationFunc } from '../../resources';
export interface ISectionParams {
  label: string;
  disabled: boolean;
  model: IChangeEventDetail;
  uiSchema: IUiSchema;
  scale?: Scale;
  t: TranslationFunc;
  variant: CONFIGURATION_VARIANTS;
}
export interface ISectionAction {
  action: string;
  disableWhenInvalid?: boolean;
  label?: string;
  labelKey?: string;
}
export interface ICardSectionAction extends ISectionAction {
  appearance?: string;
  href?: string;
  kind?: Kind;
  round?: boolean;
  slot: "footer-start" | "footer-end";
}
