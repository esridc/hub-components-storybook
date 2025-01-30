import { EntityType, IConfigurationSchema, IUiSchema } from "@esri/hub-common";
import { PredicateProperty } from "../arcgis-hub-predicates-builder/types";
export declare const COLLECTION_BUILDER_SCHEMA: IConfigurationSchema;
export declare const buildCollectionBuilderUiSchema: (opts: {
  targetEntity: EntityType;
  availablePredicateProperties: PredicateProperty[];
}) => IUiSchema;
/**
 * Schema for building the appearance of a collection
 */
export declare const COLLECTION_APPEARANCE_BUILDER_SCHEMA: IConfigurationSchema;
/**
 * UiSchema for building the appearance of a collection
 */
export declare const COLLECTION_APPEARANCE_BUILDER_UI_SCHEMA: IUiSchema;
