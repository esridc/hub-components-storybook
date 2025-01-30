import { IUiSchema, IConfigurationSchema, IUiSchemaElement } from "@esri/hub-common";
import { IField } from '@esri/arcgis-rest-feature-layer';
import { FieldType } from '@esri/arcgis-rest-types';
export declare const getSchema: (properties: Record<string, IConfigurationSchema>) => IConfigurationSchema;
export declare const getUiSchema: (elements?: IUiSchemaElement[]) => IUiSchema;
export declare type IHubCompositeInputExpressionSet = IExpression[];
export interface IExpression {
  field?: IField;
  values?: Array<string | number | Date>;
  key?: string;
  relationship?: ExpressionRelationships;
}
export declare enum ExpressionRelationships {
  BETWEEN = "between",
  IS_EXACTLY = "isExactly",
  LIKE = "like"
}
export declare const DEFAULT_FIELD_TO_RELATIONSHIP: Record<FieldType, ExpressionRelationships>;
