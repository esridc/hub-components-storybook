import { ComponentIntl } from "../../../../../../../utils/stencil-intl";
import { _IPredicate, PredicateProperty } from "./types";
import { EntityType, IArcGISContext, IConfigurationSchema, IUiSchema } from "@esri/hub-common";
export declare const buildPredicateBuilderSchema: (opts: {
  properties: PredicateProperty[];
  predicates: _IPredicate[];
  targetEntity: EntityType;
  context: IArcGISContext;
  intl: ComponentIntl;
}) => Promise<IConfigurationSchema>;
export declare const buildPredicateBuilderUiSchema: (opts: {
  properties: PredicateProperty[];
  predicates: _IPredicate[];
  targetEntity: EntityType;
  context: IArcGISContext;
  intl: ComponentIntl;
}) => Promise<IUiSchema>;
