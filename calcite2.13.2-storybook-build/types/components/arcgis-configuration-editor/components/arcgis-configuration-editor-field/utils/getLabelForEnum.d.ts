import { IUiSchema } from '@esri/hub-common';
import { TranslationFunc } from '../../../resources';
export declare const getLabelForEnum: (uiSchema: IUiSchema, enumVal: string, t: TranslationFunc, opts?: {
  fallback?: string;
  path?: string;
}) => string;
