import { IConfigurationSchema, IUiSchema } from "@esri/hub-common";
import { ArcgisConfigurationEditorPage } from "../arcgis-configuration-editor.e2e.page";
/** util to initialize a config editor E2E page model */
export declare const initEditor: (schema: IConfigurationSchema, uiSchema: IUiSchema) => Promise<{
  page: import("@stencil/core/testing").E2EPage;
  editor: ArcgisConfigurationEditorPage;
}>;
