import { EventEmitter } from '../../../../../../../stencil-public-runtime';
import { ComponentIntl } from '../../../../../../../utils/stencil-intl';
import { IUiSchemaElement, IConfigurationSchema, IUiSchema, IConfigurationValues, IChangeEventDetail } from '@esri/hub-common';
import { IField } from '@esri/arcgis-rest-feature-layer';
import { IHubCompositeInputExpressionSet, IExpression } from './resources';
import { IWithContext } from '../../../../../../../utils/state';
export declare class ExpressionSet implements IWithContext {
  element: HTMLElement;
  values: IConfigurationValues;
  fields: IField[];
  arcgisCompositeExpressionSetFieldChange: EventEmitter<IHubCompositeInputExpressionSet>;
  expressions: IExpression[];
  _context: import("@esri/hub-common").IArcGISContext;
  disconnectContext: () => void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  _schema: IConfigurationSchema;
  _uiSchema: IUiSchema;
  internalValues: IConfigurationValues;
  isValid: boolean;
  intl: ComponentIntl;
  constructor();
  componentWillLoad(): Promise<void>;
  getSchemaProperties(expressions: IExpression[]): Record<string, IConfigurationSchema>;
  getUiSchemaElements(expressions: IExpression[]): IUiSchemaElement[];
  /**
   * Function to ensure expressions have every part necessary to render correctly, in case
   * an expression was incomplete during a migration.
   * @param values
   * @returns expressions IExpression[]
   */
  repairExpressionsFromMigration(values: IExpression[]): IExpression[];
  /**
   * allows the starting expressions passed down to be separated out into
   * renderable configuration editor values
   */
  transformExpressionsToSchemaValues(expressions: IExpression[]): IConfigurationValues;
  handleEditorChangeEvent(event: CustomEvent<IChangeEventDetail>): void;
  updateExpressionsAndValuesOnChange(expressions: IExpression[], values: IConfigurationValues, fields: IField[]): void;
  updateExpressionField(expression: IExpression, fieldValue: string, fields: IField[]): IExpression;
  updateExpressionRelationship(expression: IExpression): IExpression;
  updateExpressionValues(newExpression: IExpression, currentExpression: IExpression, values: IConfigurationValues): IExpression;
  updateInternalValues(newExpression: IExpression, values: IConfigurationValues): IConfigurationValues;
  private translationFunc;
  updateSchema(expressions: IExpression[]): void;
  updateUiSchema(expressions: IExpression[]): void;
  handleAddExpression(): void;
  handleDeleteExpression(e: CustomEvent<any>): void;
  resetExpressions(newFields: IField[]): void;
  renderExpressionSet(): HTMLElement;
  render(): any;
}
