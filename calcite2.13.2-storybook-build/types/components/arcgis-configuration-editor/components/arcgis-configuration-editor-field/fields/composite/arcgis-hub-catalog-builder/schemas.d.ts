import { EntityType, IConfigurationSchema, IUiSchema } from "@esri/hub-common";
import { ICatalogBuilderCallbacks } from "../../../../../../arcgis-hub-workspace-panes/arcgis-hub-entity-catalog/resources";
import { ComponentIntl } from "../../../../../../../utils/stencil-intl";
export declare const CATALOG_BUILDER_SCHEMA: IConfigurationSchema;
export declare const buildCatalogBuilderUiSchema: (opts: {
  targetEntity: EntityType;
  callbacks: ICatalogBuilderCallbacks;
  intl: ComponentIntl;
}) => IUiSchema;
