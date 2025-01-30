import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
export default {
  title: 'Deprecated/Download Card',
  component: 'hub-download-card',
  argTypes: {
    target: {
      control: { type: 'inline-radio' },
      options: [
        'hub',
        'portal',
        'enterprise'
      ]
    },
    format: {
      control: { type: 'select' },
      options: [
        'Shapefile',
        'CSV',
        'KML',
        'GeoJson',
        'Excel',
        'File Geodatabase',
        'Feature Collection',
        'Scene Package'
      ]
    }
  },
  parameters: {
    actions: {
      handles: ['hubTelemetry']
    }
  },
  decorators: [withCenteredLayout('400px')]
};
const defaultArgs = {
  host: 'https://opendata.arcgis.com',
  name: 'Trees Shapefile',
  datasetId: '593b88391b614123890f54a1db8fbf55_2',
  format: 'Shapefile',
  spatialRefId: '',
  where: '',
  geometry: '',
  username: '',
  token: '',
  target: 'hub'
};
export const Default = args => `
  <hub-download-card
    host="${args.host}"
    name="${args.name}"
    dataset-id="${args.datasetId}"
    format="${args.format}"
    spatial-ref-id="${args.spatialRefId}"
    where="${args.where}"
    geometry="${args.geometry}"
    username="${args.username}"
    token="${args.token}"
    target="${args.target}"
  ></hub-download-card>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Download Card';
