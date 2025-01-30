import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
export default {
  title: 'Deprecated/Download Features Button',
  component: 'arcgis-download-features-button',
  argTypes: {
    fileFormat: {
      control: { type: 'select' },
      options: ['sqlite', 'geoPackage', 'filegdb', 'shapefile', 'csv', 'json', 'geojson', 'excel', 'featureCollection']
    },
    layers: {
      control: { type: 'object' },
    },
    filterGeometry: {
      control: { type: 'object' },
    },
    server: {
      control: { type: 'object' },
    },
    item: {
      control: { type: 'object' },
    },
  },
  parameters: {
    actions: {
      handles: ['hubTelemetry', 'arcgisDownloadSuccess', 'arcgisDownloadError'],
    },
  },
  decorators: [
    withRenderCallback('arcgis-download-features-button', ($el, { args }) => {
      $el.item = args.item;
      $el.server = args.server;
      $el.layers = args.layers;
      $el.filterGeometry = args.filterGeometry;
    })
  ]
};
const itemUrlArgs = {
  fileFormat: 'csv',
  item: {
    id: "593b88391b614123890f54a1db8fbf55",
    type: "Feature Service",
    orgId: '3890f54a1db8fbf55593b88391b61412',
    access: "public",
    url: "https://services2.arcgis.com/zNjnZafDYCAJAbN0/arcgis/rest/services/Street_ROW_Trees/FeatureServer",
  },
  layers: "0",
  appearance: 'solid'
};
export const ItemUrl = (args) => `
  <arcgis-download-features-button
    file-format="${args.fileFormat}"
    appearance="${args.appearance}"
    >
    Download
  </arcgis-download-features-button>
`;
ItemUrl.args = Object.assign({}, itemUrlArgs);
ItemUrl.storyName = "Item's URL";
const serverUrlArgs = {
  server: 'https://services2.arcgis.com/zNjnZafDYCAJAbN0/arcgis/rest/services/Street_ROW_Trees/FeatureServer',
  layers: "0",
  fileFormat: 'csv',
  appearance: 'solid'
};
export const ServerUrl = (args) => `
  <arcgis-download-features-button
    file-format="${args.fileFormat}"
    appearance="${args.appearance}"
    >
    Download
  </arcgis-download-features-button>
`;
ServerUrl.args = Object.assign({}, serverUrlArgs);
ServerUrl.storyName = "Server's URL";
const serverDefinitionArgs = {
  server: {
    url: 'https://services2.arcgis.com/zNjnZafDYCAJAbN0/arcgis/rest/services/Street_ROW_Trees/FeatureServer',
    capabilities: 'Extract',
    supportedExportFormats: 'csv,geojson'
  },
  layers: "0",
  fileFormat: 'csv',
  appearance: 'solid'
};
export const ServerDefinition = (args) => `
  <arcgis-download-features-button
    file-format="${args.fileFormat}"
    appearance="${args.appearance}"
    >
    Download
  </arcgis-download-features-button>
`;
ServerDefinition.args = Object.assign({}, serverDefinitionArgs);
ServerDefinition.storyName = "Server's Definition Object";
const layerOptionsArgs = {
  server: 'https://services2.arcgis.com/zNjnZafDYCAJAbN0/arcgis/rest/services/Street_ROW_Trees/FeatureServer',
  layers: [{
      id: 0,
      where: "Common_Name IN ('CHINESE ELM')"
    }],
  fileFormat: 'csv',
  appearance: 'solid'
};
export const LayerOptions = (args) => `
  <arcgis-download-features-button
    file-format="${args.fileFormat}"
    appearance="${args.appearance}"
    >
    Download
  </arcgis-download-features-button>
`;
LayerOptions.args = Object.assign({}, layerOptionsArgs);
LayerOptions.storyName = 'Layer Options';
const filterGeometryArgs = {
  server: 'https://services2.arcgis.com/zNjnZafDYCAJAbN0/arcgis/rest/services/Street_ROW_Trees/FeatureServer',
  layers: "0",
  fileFormat: 'csv',
  filterGeometry: {
    type: 'extent',
    spatialReference: 3857,
    xmin: -13158033.0752367,
    ymin: 4043663.4261237,
    xmax: -13141614.0685781,
    ymax: 4057165.64454059,
  },
  appearance: 'solid'
};
export const FilterGeometry = (args) => `
  <arcgis-download-features-button
    file-format="${args.fileFormat}"
    appearance="${args.appearance}"
    >
    Download
  </arcgis-download-features-button>
`;
FilterGeometry.args = Object.assign({}, filterGeometryArgs);
FilterGeometry.storyName = 'Filter Geometry';
const erroredArgs = {
  server: 'https://services2.arcgis.com/zNjnZafDYCAJAbN0/arcgis/rest/services/Street_ROW_Trees/FeatureServer',
  layers: '2',
  fileFormat: 'csv',
  filterGeometry: {
    type: 'extent',
    spatialReference: 3857,
    xmin: -13158033.0752367,
    ymin: 4043663.4261237,
    xmax: -13141614.0685781,
    ymax: 4057165.64454059,
  },
  appearance: 'solid'
};
export const Errored = (args) => `
  <arcgis-download-features-button
    file-format="${args.fileFormat}"
    appearance="${args.appearance}"
    >
    Download
  </arcgis-download-features-button>
`;
Errored.args = Object.assign({}, erroredArgs);
Errored.storyName = 'Error State';
