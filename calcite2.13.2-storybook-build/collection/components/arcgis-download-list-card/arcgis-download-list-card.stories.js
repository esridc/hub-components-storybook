import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
export default {
  title: 'Deprecated/Download List Card',
  component: 'arcgis-download-list-card',
  parameters: {
    actions: {
      handles: ['hubTelemetry', 'arcgisDownloadSuccess', 'arcgisDownloadError'],
    },
  },
  argTypes: {
    fileFormat: {
      control: { type: 'select' },
      options: ['sqlite', 'geoPackage', 'filegdb', 'shapefile', 'csv', 'json', 'geojson', 'excel', 'featureCollection']
    },
    filterGeometry: {
      control: { type: 'object' },
    },
    item: {
      control: { type: 'object' },
    },
    layers: {
      control: { type: 'object' },
    },
    server: {
      control: { type: 'object' },
    },
  },
  decorators: [
    withCenteredLayout('400px'),
    withRenderCallback('arcgis-download-list-card', ($el, { args }) => {
      $el.item = args.item;
      $el.server = args.server;
      $el.layers = args.layers;
      $el.filterGeometry = args.filterGeometry;
    })
  ]
};
const defaultArgs = {
  fileFormat: 'csv',
  item: {
    id: '9001',
    type: 'Feature Service',
    access: 'public',
    orgId: '13',
    url: 'https://servicesqa.arcgis.com/97KLIFOSt5CxbiRI/arcgis/rest/services/download_test_do_not_remove/FeatureServer',
  },
  layers: '0',
};
export const Default = (args) => `
  <arcgis-download-list-card file-format="${args.fileFormat}"/>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Download List Card';
