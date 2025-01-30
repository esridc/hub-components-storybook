import { IArcGISContext, IUiSchema } from "@esri/hub-common";
import { ComponentIntl } from "../../../utils/stencil-intl";
interface IBuildChannelUiSchemaOptions {
  intl: ComponentIntl;
  namePrefix: string;
  isOrgAdmin: boolean;
  context: IArcGISContext;
  disabled?: boolean;
}
export declare const buildChannelUiSchema: (options: IBuildChannelUiSchemaOptions) => IUiSchema;
export {};
