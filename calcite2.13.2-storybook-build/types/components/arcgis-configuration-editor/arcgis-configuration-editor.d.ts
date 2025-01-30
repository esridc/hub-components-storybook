import { EventEmitter, VNode } from '../../stencil-public-runtime';
import { AsyncValidateFunction, ErrorObject, ValidateFunction } from 'ajv';
import { IFieldChangeEventDetail } from './components/arcgis-configuration-editor-field/resources';
import { JSONSchema, TranslationFunc, CONFIGURATION_VARIANTS, IValidationResult } from './resources';
import { UiSchemaRuleEffects, IConfigurationSchema, IConfigurationValues, IChangeEventDetail, IUiSchemaElement, IUiSchema, IUiSchemaMessage } from '@esri/hub-common';
import { Scale } from '@esri/calcite-components';
import { ComponentIntl } from '../../utils/stencil-intl';
export declare class ArcgisConfigurationEditor {
  element: HTMLArcgisConfigurationEditorElement;
  /**
   * An object in JSONSchema format that describe the configuration
   * schema. It can be an object or a stringified object.
   */
  schema: string | IConfigurationSchema;
  /**
   * An optional object that describes how the form should be rendered
   */
  uiSchema: IUiSchema;
  /**
   * An object that provides the configuration values. Its keys
   * are property names and values are property values.
   */
  values: string | IConfigurationValues;
  /**
   * A boolean value indicating whether the form is disabled.
   * When disabled, the form is not editable.
   */
  disabled: boolean;
  /**
   * A translation function with which to translate form labels.
   */
  t: TranslationFunc;
  /**
   * optionally add a preset-style to the configuration editor to change
   * the editor's appearance
   */
  variant: CONFIGURATION_VARIANTS;
  scale: Scale;
  /**
   * the form's current state (validity + values)
   */
  _model: IChangeEventDetail;
  /**
   * Properties that are currently required in the schema, either through always being required or by being
   * conditionally required at this point in time.
   * Set onLoad, onSchemaChange, and onFieldChange.
   */
  currentlyRequiredProperties: Set<string>;
  _validationResult: IValidationResult;
  _schema: IConfigurationSchema;
  _uiSchema: IUiSchema;
  _values: IConfigurationValues;
  _validator: ValidateFunction | AsyncValidateFunction;
  /**
   * Properties that are always required in the specific schema, regardless of values passed in
   */
  alwaysRequiredProperties: string[];
  /**
   * Properties that are potentially required in the schema based on the values passed in.
   * Only conditionally required properties exist in this array.
   */
  conditionallyRequiredProperties: Map<string, Set<string>>;
  /**
   * Properties in the schema that are currently emitted based on rule evaluation and current values.
   * These properties are currently visible.
   */
  _uiSchemaWhiteList: string[];
  /** intl for component */
  _intl: ComponentIntl;
  /**
   * This custom event is emitted when the value of any field input
   * changes. It includes the validity and current form values
   */
  arcgisConfigurationEditorChange: EventEmitter<IChangeEventDetail>;
  /**
   * This custom event is emitted when the editor is initially loaded.
   * It includes the validity and current form values
   * NOTE: for unknown reasons, if this event is used with Listen, you must pass {capture: true} to the Listen decorator
   */
  arcgisConfigurationEditorInitialized: EventEmitter<IChangeEventDetail>;
  /**
   * event to indicate that the form has been fully loaded/rendered
   * NOTE: for unknown reasons, if this event is used with Listen, you must pass {capture: true} to the Listen decorator
   */
  arcgisConfigurationEditorLoaded: EventEmitter<null>;
  arcgisConfigurationEditorSectionAction: EventEmitter<{
    action: string;
    model: IChangeEventDetail;
  }>;
  /**
   * watch for changes to the schema and re-initialize.
   * This allows for dynamically rendered uiSchemas
   */
  handleUiSchemaChange(uiSchema: IUiSchema): void;
  /**
   * watch for changes to the schema and re-initialize.
   * This allows for dynamically rendered schemas
   */
  handleSchemaChange(schema: IConfigurationSchema): Promise<void>;
  /** watch for changes to the editor values and re-initialize. */
  handleValuesChange(values: string | IConfigurationValues): void;
  /**
   * handler function for the arcgisConfigurationEditorFieldChange event
   * which gets emitted every time a field input changes. This function
   * updates the internally stored form values and calls the emitChangeEvents
   * function to re-validate and emit the updated form values
   */
  handleArcgisConfigurationEditorFieldChange(event: CustomEvent<IFieldChangeEventDetail>): void;
  setFieldValue(property: string, value: any): void;
  /**
   * If there is a uiSchema rule with a RESET effect
   * whose conditions are met, then we apply the rule by resetting the field to its default value
   */
  applyUiSchemaResetRule(uiSchema: IUiSchema, property: string, value: any): void;
  /**
   * We listen for internal instances of the arcgisConfigurationEditorInitialized
   * and arcgisConfigurationEditorLoaded events and stop their propagation. This
   * prevents the top-level configuration editor from emitting these events when
   * a composite field is initialized/loaded.
   */
  handleCompositeEditorEvents(evt: CustomEvent<IChangeEventDetail>): void;
  /**
   * public method to set focus to the editor. Use this, for example,
   * to initially set focus to a form for a11y purposes
   */
  setFocus(): Promise<void>;
  /**
   * public method to manually trigger validation. Use this, fox example,
   * to force a form validation when `values` is changed externally
   */
  validate(): Promise<IValidationResult>;
  constructor();
  componentWillLoad(): Promise<void>;
  /**
   * We emit an event when the top-level configuration editor has
   * completely loaded/rendered. Consuming components can hook into
   * this event to toggle a loading indicator
   */
  componentDidLoad(): void;
  get invalidProperties(): string[];
  /** initialize the uiSchema by adding ids onto every scoped element */
  initUiSchema(uiSchema: IUiSchema): IUiSchema;
  /** 2. traverse the uiSchema and add unique ids */
  _addIdsToUiSchema(uiSchema: IUiSchema, isTopLevel?: boolean, sectionScopes?: string[]): void;
  /** initialize the editor values */
  initValues(values: string | IConfigurationValues): IConfigurationValues;
  /**
   * Sets a state array of required properties that are not conditional and thus are always required
   */
  setAlwaysRequiredProperties(): Promise<void>;
  /**
   * Sets the state array of required properties that are potentially required based on the values passed in
   */
  setConditionallyRequiredProperties(): void;
  /**
   * Sets the state array of currently required properties based on the values passed in
   */
  setCurrentlyRequiredProperties(changedProp?: string): Promise<void>;
  /**
   * Returns a parsed object. This utility is used to parse the schema,
   * and values which can all be passed in as stringified JSON
   */
  parseJson(json: string | object): object;
  /**
   * Providing a uiSchema is optional. If none is provided, this function
   * generates a default one based on the properties defined in the schema
   */
  generateUiSchemaFromSchema(schema: IConfigurationSchema): IUiSchema;
  generateUiSchemaElementsFromSchema(schema: JSONSchema, scopePath?: string): IUiSchemaElement[];
  /**
   * Validates the provided values against the form as a whole. This
   * convenience method leverages the form validator instance that
   * gets instantiated when the component is loaded
   */
  _validate(values: object): Promise<IValidationResult>;
  /**
   * recursively traverse the uiSchema to get the schema defaults to
   * append to the emitted values in the case that the user does not
   * overwrite the value
   */
  getDefaultValues(schema: IConfigurationSchema, uiSchema: IUiSchema, defaults?: IConfigurationValues): IConfigurationValues;
  /**
   * recursively traverses the uiSchema to compile a list of properties
   * that should be emitted by the configuration editor. If the property
   * is not defined on the uiSchema, or if a uiSchema rule dictates that
   * the field should be hidden, we don't want to emit it as part of the
   * IChangeEventDetail
   *
   * Also creates IDs for each uiSchema element if they don't already exist
   */
  getUiSchemaWhiteList(uiSchema: IUiSchema, model: IChangeEventDetail): {
    whiteListIds: string[];
    clearOnHidden: string[];
  };
  maybeAddToWhiteList(element: IUiSchemaElement, ruleEffects: UiSchemaRuleEffects[], acc: {
    whiteListIds: string[];
    clearOnHidden: string[];
  }): {
    whiteListIds: string[];
    clearOnHidden: string[];
  };
  /**
   * This function is responsible for generating and emitting an
   * IChangeEventDetail based on the forms current values. This
   * function gets called on initialization as well as every time
   * a form field value changes
   */
  emitChangeEvent(isInitialization?: boolean): Promise<void>;
  /**
   * Returns the schema property path associated with an AJV error
   */
  getErrorPropertyPath(error: any): string;
  /**
   * returns an array of errors messages associated with a specific
   * field control
   */
  getControlErrorMessages(controlPropertyPath: string, errors: ErrorObject[], errorMessages: IUiSchemaMessage[]): IUiSchemaMessage[];
  /**
   * returns an array of messages for a specific field control, including
   * error, success, and/or custom messages
   */
  getControlMessages(elementUiSchema: IUiSchema): IUiSchemaMessage[];
  renderUiSchemaElement(uiSchema: IUiSchema): VNode;
  renderUiSchemaControl(uiSchemaElement: IUiSchemaElement, ruleEffects?: UiSchemaRuleEffects[]): VNode;
  renderUiSchemaSection(uiSchema: IUiSchema, ruleEffects?: UiSchemaRuleEffects[]): VNode;
  render(): VNode;
}
