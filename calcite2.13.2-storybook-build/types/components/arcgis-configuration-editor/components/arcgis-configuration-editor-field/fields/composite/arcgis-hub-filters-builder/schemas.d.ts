import { EntityType, IConfigurationSchema, IUiSchema } from "@esri/hub-common";
import { PredicateProperty } from "../arcgis-hub-predicates-builder/types";
export declare const FILTER_BUILDER_SCHEMA: IConfigurationSchema;
export declare const buildFilterBuilderUiSchema: (opts: {
  availablePredicateProperties: PredicateProperty[];
  targetEntity: EntityType;
}) => IUiSchema;
