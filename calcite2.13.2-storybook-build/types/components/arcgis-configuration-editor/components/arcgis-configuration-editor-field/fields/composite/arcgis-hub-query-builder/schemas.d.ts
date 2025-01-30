import { EntityType, IConfigurationSchema, IUiSchema } from "@esri/hub-common";
import { PredicateProperty } from "../arcgis-hub-predicates-builder/types";
export declare const QUERY_BUILDER_SCHEMA: IConfigurationSchema;
export declare const buildQueryBuilderUiSchema: (opts: {
  showTargetEntitySelection: boolean;
  targetEntity: EntityType;
  availablePredicateProperties: PredicateProperty[];
  queryContext: "catalogScope" | "collection";
}) => IUiSchema;
