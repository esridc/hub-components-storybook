import { EventEmitter, VNode } from '../../../../stencil-public-runtime';
import { JSONSchema } from '../../resources';
import { IRenderParams as IFieldInputRenderParams } from './fields/resources';
import { Scale, Status } from '@esri/calcite-components/dist/types/components/interfaces';
import { IUiSchemaMessage, IUiSchemaElement, UiSchemaMessageTypes, IChangeEventDetail } from '@esri/hub-common';
import { IFieldChangeEventDetail } from './resources';
import { JSONSchemaTypeName, TranslationFunc } from '../../resources';
export declare class ArcgisConfigurationEditorField {
  element: HTMLElement;
  /**
   * The field's property key from the form schema
   */
  property: string;
  /**
   * The field's schema
   */
  schema: JSONSchema;
  /**
   * The field's uiSchema
   */
  uiSchema: IUiSchemaElement;
  /**
   * The entire form's current state.
   * Holds the values of all fields in the form as well as the schema and validity of the form.
   */
  model: IChangeEventDetail;
  /**
   * The field's value
   */
  value: unknown;
  /**
   * Indicates whether the value is valid
   */
  invalid: boolean;
  /**
   * An array of AJV errors associated with the field
   */
  messages: IUiSchemaMessage[];
  /**
   * Indicates whether the field is disabled
   */
  disabled: boolean;
  /**
   * Indicates whether the field value is required
   */
  required: boolean;
  /**
   * A translation function with which to translate field labels
   */
  t: TranslationFunc;
  scale: Scale;
  /**
   * State for if the field has been interacted with yet
   */
  shouldShowMessages: boolean;
  /**
   * This custom event is emitted when the value of the field
   * changes. It includes the field's property and value
   */
  arcgisConfigurationEditorFieldChange: EventEmitter<IFieldChangeEventDetail>;
  constructor();
  componentWillLoad(): void;
  /**
   * Contextual auth & portal information
   */
  private get _context();
  get fieldLabel(): string;
  get hasHelperText(): boolean;
  get hasTooltip(): boolean;
  get isDisabled(): boolean;
  get status(): Status;
  /**
   * the field value is the first of the following conditions that is met:
   * 1. the provided value
   * 2. the default value defined on the schema
   * 3. the constant value defined on the schema
   * 4. the default value based on the field type
   */
  get _value(): any;
  get fieldTelemetryLabel(): string;
  /**
   * compiled parameters to pass into each field-input component
   * as a single "params" prop
   */
  get fieldParams(): IFieldInputRenderParams;
  /**
   * mapping of supported composite fields (i.e. fields that render the
   * configuration editor themselves) to their field change event
   */
  compositeFields: {
    'arcgis-hub-timeline-editor': {
      inputChange: string;
    };
    'hub-composite-input-icon': {
      inputChange: string;
    };
    'hub-composite-input-service-query-metric': {
      inputChange: string;
    };
    'hub-composite-input-expression-set': {
      inputChange: string;
    };
    'hub-composite-input-action-links': {
      values: string;
      inputChange: string;
    };
    'arcgis-hub-access-level-controls': {
      values: string;
      inputChange: string;
    };
    'arcgis-hub-license-picker': {
      inputChange: string;
      values: string;
    };
    'arcgis-privacy-config': {
      inputChange: string;
      values: string;
    };
    'hub-composite-input-map-settings': {
      values: string;
      inputChange: string;
    };
    'hub-composite-input-embed': {
      inputChange: string;
      values: string;
    };
    'hub-composite-input-embeds': {
      inputChange: string;
      values: string;
    };
    'hub-composite-input-site-url': {
      inputChange: string;
      values: string;
    };
    'arcgis-hub-catalog-builder': {
      values: string;
      inputChange: string;
    };
    'arcgis-hub-collections-builder': {
      inputChange: string;
    };
    'arcgis-hub-query-builder': {
      values: string;
      inputChange: string;
    };
    'arcgis-hub-filters-builder': {
      values: string;
      inputChange: string;
    };
    'arcgis-hub-predicates-builder': {
      values: string;
      inputChange: string;
    };
    'arcgis-hub-catalog-appearance-builder': {
      values: string;
      inputChange: string;
    };
    'arcgis-hub-collections-appearance-builder': {
      values: string;
      inputChange: string;
    };
    'arcgis-hub-results-appearance-builder': {
      values: string;
      inputChange: string;
    };
  };
  isCompositeField(name: string): boolean;
  /**
   * handler function for the arcgisConfigurationEditorFieldInputChange event
   * which gets emitted every time the field input changes. This function
   * re-emits the updated field input value for the arcgis-configuration-editor
   * to validate and compile
   */
  handleFieldInputChange(evt: CustomEvent): void;
  /**
   * If the uiSchema does not specify a specific control to render,
   * we fall-back to a default control based on the field's type
   */
  getDefaultControl(type: JSONSchemaTypeName): string;
  getMessageIcon(icon: boolean | string, type: UiSchemaMessageTypes, label: string): string;
  getMessageStatus(type: UiSchemaMessageTypes): string;
  renderMessages(messages: IUiSchemaMessage[]): HTMLElement[];
  renderNoticeLink(message: IUiSchemaMessage): VNode;
  renderControl(params: IFieldInputRenderParams): Element;
  renderTooltip(uiSchemaElement: IUiSchemaElement, t: TranslationFunc): HTMLElement;
  renderBlockField(): HTMLElement;
  renderInlineField(): HTMLElement;
  render(): any;
}
