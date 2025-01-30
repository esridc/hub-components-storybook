import { IChangeEventDetail, IUiSchemaElement } from '@esri/hub-common';
import { TranslationFunc, JSONSchema } from '../../../resources';
import { Scale } from '@esri/calcite-components';
/**
 * Field input rendering parameters
 */
export interface IRenderParams {
  /**
   * Field schema
   */
  schema: JSONSchema;
  /**
   * Field uiSchema
   */
  uiSchema: IUiSchemaElement;
  /**
   * The entire form's state
   */
  model: IChangeEventDetail;
  /**
   * Field value
   */
  value?: unknown;
  /**
   * Translated field label - Note: if a field doesn't have its own label,
   * but is in a section that has a label, we will pass the section's
   * label down to the field. This might be used for a11y or telemetry
   * purposes
   */
  label: string;
  /**
   * Whether the field is disabled
   */
  disabled?: boolean;
  property?: string;
  /**
   * Whether a value is required
   */
  required?: boolean;
  status?: "idle" | "valid" | "invalid";
  t?: TranslationFunc;
  telemetryLabel: string;
  scale?: Scale;
}
export interface IStyleParams {
  [key: string]: any;
}
