import { E2EPage } from "@stencil/core/testing";
import { HubComponentPage } from "../../../../test/e2e/types";
import { BaseHubComponentPage } from "../../../../test/e2e/utils";
import { ArcgisConfigurationEditorFieldPage } from "../components/arcgis-configuration-editor-field/test/arcgis-configuration-editor-field.e2e.page";
export declare class ArcgisConfigurationEditorPage extends BaseHubComponentPage implements HubComponentPage {
  protected _root: string;
  private _uiSchema;
  constructor(page: E2EPage, options: any);
  controls: Record<string, ArcgisConfigurationEditorFieldPage>;
  field: ArcgisConfigurationEditorFieldPage;
  /**
   * dynamically construct the editor's page model based
   * on the uiSchema
   */
  initialize(): Promise<void>;
  verifyLoaded(): Promise<void>;
  verifyControls(expectedControls: string[]): boolean;
}
