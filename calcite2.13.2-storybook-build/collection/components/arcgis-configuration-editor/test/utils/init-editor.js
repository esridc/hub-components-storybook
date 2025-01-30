import { newHubE2EPage, newHubComponentPage } from "../../../../../test/e2e/utils";
import { ArcgisConfigurationEditorPage } from "../arcgis-configuration-editor.e2e.page";
/** util to initialize a config editor E2E page model */
export const initEditor = async (schema, uiSchema) => {
  const page = await newHubE2EPage({
    html: `
      <arcgis-configuration-editor schema=${JSON.stringify(schema)}></arcgis-configuration-editor>`
  });
  /**
   * set the uiSchema - the schema prop is setup to handle being passed an object or a json string but the uiSchema prop is not
   */
  const props = { uiSchema };
  await page.$eval("arcgis-configuration-editor", (el, { uiSchema }) => {
    el.uiSchema = uiSchema;
    el.t = key => key;
  }, props);
  const editor = await newHubComponentPage(ArcgisConfigurationEditorPage, page, { uiSchema });
  return { page, editor };
};
