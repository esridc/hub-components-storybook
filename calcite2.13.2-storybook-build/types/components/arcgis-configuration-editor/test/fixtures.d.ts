import { IConfigurationSchema, IConfigurationValues, IUiSchema } from '@esri/hub-common';
export declare const MOCK_RETURN_VALUES: {
  parseJson: {};
  validate: {
    valid: boolean;
    errors: any[];
  };
  invalidate: {
    valid: boolean;
    errors: any[];
  };
  generateUiSchemaFromSchema: {
    type: string;
    elements: any[];
  };
  generateUiSchemaElementsFromSchema: any[];
  instantiateValidator: () => boolean;
  instantiateValidatorFalse: () => boolean;
  emitChangeEvent: any;
  getDefaultValues: {
    property1: string;
    property2: {
      subPropertyA: string;
    };
  };
};
/** mock catalogs and facets for gallery-picker fields */
export declare const MOCK_CATALOGS: {
  schemaVersion: number;
  title: string;
  scopes: {
    item: {
      targetEntity: string;
      filters: {
        predicates: {
          owner: string;
        }[];
      }[];
    };
  };
  collections: {
    label: string;
    key: string;
    targetEntity: string;
    include: any[];
    scope: {
      targetEntity: string;
      filters: {
        predicates: {
          type: string;
        }[];
      }[];
    };
  }[];
}[];
export declare const MOCK_FACETS: {
  label: string;
  key: string;
  display: string;
  operation: string;
}[];
export declare const BASIC_SCHEMA: IConfigurationSchema;
export declare const BASIC_UI_SCHEMA: IUiSchema;
export declare const BASIC_UI_SCHEMA_WITH_IDS: IUiSchema;
export declare const BASIC_VALUES: IConfigurationValues;
export declare const UI_SCHEMA_WITH_MESSAGES: IUiSchema;
export declare const NESTED_OBJECTS_SCHEMA: IConfigurationSchema;
export declare const NESTED_OBJECTS_UI_SCHEMA: IUiSchema;
export declare const NESTED_OBJECTS_UI_SCHEMA_WITH_IDS: IUiSchema;
/** Comprehensive schema that includes all supported field types */
export declare const ALL_FIELDS_SCHEMA: IConfigurationSchema;
export declare const ALL_FIELDS_UI_SCHEMA: IUiSchema;
/** Schema to test editor validation states */
export declare const VALIDATION_SCHEMA: IConfigurationSchema;
export declare const VALIDATION_UI_SCHEMA: IUiSchema;
/** Schema to test required fields - test always, conditionally, and nested required fields */
export declare const REQUIRED_PROPERTIES_SCHEMA: IConfigurationSchema;
export declare const REQUIRED_PROPERTIES_UI_SCHEMA: IUiSchema;
export declare const RULES_SCHEMA: IConfigurationSchema;
export declare const RULES_UI_SCHEMA: IUiSchema;
export declare const RESET_RULE_SCHEMA: IConfigurationSchema;
export declare const RESET_RULE_UI_SCHEMA: IUiSchema;
