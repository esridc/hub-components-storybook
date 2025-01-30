import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
export default {
  title: 'Deprecated/Download List',
  component: 'arcgis-download-list',
  argTypes: {
    server: {
      control: { type: 'object' },
    },
    layers: {
      control: { type: 'object' },
    },
    filterGeometry: {
      control: { type: 'object' },
    },
  },
  parameters: {
    actions: {
      handles: ['hubTelemetry', 'arcgisDownloadSuccess', 'arcgisDownloadError'],
    },
  },
  decorators: [
    withCenteredLayout('400px'),
    withRenderCallback('arcgis-download-list', ($el, { args }) => {
      $el.item = args.item;
      $el.server = args.server;
      $el.layers = args.layers;
      $el.filterGeometry = args.filterGeometry;
    })
  ]
};
const publicItemArgs = {
  item: {
    id: "1c36f0f21ba34a7aa1f5d48f7313cf6b",
    type: "Feature Service",
    access: "public",
    url: "https://servicesqa.arcgis.com/Xj56SBi2udA78cC9/arcgis/rest/services/Public_dataset_uploaded_as_a_feature_layer_by_Juliana_who_is_important/FeatureServer/0",
  },
  layers: '0',
  layout: 'cards',
};
export const Item = (args) => `
  <arcgis-download-list
    layout="${args.layout}"
  ></arcgis-download-list>
`;
Item.args = Object.assign({}, publicItemArgs);
Item.storyName = "Public Item's URL";
const privateItemArgs = {
  item: {
    id: "a9d8d9a9d3814ed08a364b3099b9aa59",
    type: "Feature Service",
    access: "org",
    url: "https://servicesqa.arcgis.com/Xj56SBi2udA78cC9/arcgis/rest/services/Exaggerated_(5x)_Plume_Height_(MISR)_for_the_California_Fires_2020/FeatureServer/0",
  },
  layers: '0',
  layout: 'cards',
};
export const PrivateItem = (args) => `
  <arcgis-download-list
    layout="${args.layout}"
  ></arcgis-download-list>
`;
PrivateItem.args = Object.assign({}, privateItemArgs);
PrivateItem.storyName = "Private Item's URL";
const serverUrlArgs = {
  server: 'https://services2.arcgis.com/zNjnZafDYCAJAbN0/arcgis/rest/services/Street_ROW_Trees/FeatureServer',
  layers: '0',
  layout: 'cards',
};
export const ServerUrl = (args) => `
  <arcgis-download-list
    layout="${args.layout}"
  ></arcgis-download-list>
`;
ServerUrl.args = Object.assign({}, serverUrlArgs);
ServerUrl.storyName = "Server's URL";
const serverDefinitionArgs = {
  server: {
    url: 'https://services2.arcgis.com/zNjnZafDYCAJAbN0/arcgis/rest/services/Street_ROW_Trees/FeatureServer',
    capabilities: 'Extract',
    supportedExportFormats: 'csv,geojson'
  },
  layers: '0',
  layout: 'cards',
};
export const ServerDefinition = (args) => `
  <arcgis-download-list
    layout="${args.layout}"
  ></arcgis-download-list>
`;
ServerDefinition.args = Object.assign({}, serverDefinitionArgs);
ServerDefinition.storyName = "Server's Definition Object";
const layerOptionArgs = {
  server: 'https://services2.arcgis.com/zNjnZafDYCAJAbN0/arcgis/rest/services/Street_ROW_Trees/FeatureServer',
  layers: [{
      id: 0,
      where: "Common_Name IN ('CHINESE ELM')"
    }],
  layout: 'cards',
};
export const LayerOptions = (args) => `
  <arcgis-download-list
    layout="${args.layout}"
  ></arcgis-download-list>
`;
LayerOptions.args = Object.assign({}, layerOptionArgs);
LayerOptions.storyName = 'Layer Options';
const linkViewArgs = {
  server: 'https://services2.arcgis.com/zNjnZafDYCAJAbN0/arcgis/rest/services/Street_ROW_Trees/FeatureServer',
  layers: '0',
  layout: 'links',
};
export const LinkView = (args) => `
  <arcgis-download-list
    layout="${args.layout}"
  ></arcgis-download-list>
`;
LinkView.args = Object.assign({}, linkViewArgs);
LinkView.storyName = 'Link View';
const dropdownViewArgs = {
  server: 'https://services2.arcgis.com/zNjnZafDYCAJAbN0/arcgis/rest/services/Street_ROW_Trees/FeatureServer',
  layers: '0',
  layout: 'dropdown',
};
export const DropdownView = (args) => `
  <arcgis-download-list
    layout="${args.layout}"
  ></arcgis-download-list>
`;
DropdownView.args = Object.assign({}, dropdownViewArgs);
DropdownView.storyName = 'Dropdown View';
const headerSlotArgs = {
  server: 'https://services2.arcgis.com/zNjnZafDYCAJAbN0/arcgis/rest/services/Street_ROW_Trees/FeatureServer',
  layers: '0',
  layout: 'cards',
  header: `
    <div>
      <b>My Fancy Title</b>
      <br/>
      <p> My fancy description </p>
    </div>
  `
};
export const HeaderSlot = (args) => `
  <arcgis-download-list
    layout="${args.layout}"
  >
    ${args.header}
  </arcgis-download-list>
`;
HeaderSlot.args = Object.assign({}, headerSlotArgs);
HeaderSlot.storyName = 'Optional Header';
