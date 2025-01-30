import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
export default {
  title: 'Visualization/Map',
  component: 'arcgis-hub-map',
  parameters: {
    layout: 'fullscreen'
  }
};
const defaultArgs = {
  zoom: 11,
  center: '-118.1079,34.1643',
  basemap: 'topo-vector'
};
const graphicsArr = [{
    geometry: {
      "xmin": -118.1879,
      "ymin": 34.1172,
      "xmax": -118.0659,
      "ymax": 34.2043,
      "type": "extent",
      "spatialReference": {
        "wkid": 4326
      }
    },
    symbol: {
      type: "esriSFS",
      style: "esriSFSSolid",
      color: [
        227,
        139,
        79,
        204
      ],
      outline: {
        type: "esriSLS",
        style: "esriSLSSolid",
        color: [
          255,
          255,
          255
        ],
        width: 1
      }
    }
  }];
// Basic Map
export const BasicMap = (args) => `
  <arcgis-hub-map
    style='height: 100vh; width: 100%'
    zoom=${args.zoom}
    center=${args.center}
    basemap=${args.basemap}
  />
`;
BasicMap.args = Object.assign({}, defaultArgs);
// Map Graphics
export const MapGraphics = (args) => `
  <arcgis-hub-map
    style='height: 100vh; width: 100%'
    basemap=${args.basemap}
  />
`;
MapGraphics.args = {
  extent: graphicsArr[0].geometry,
  basemap: 'osm',
  graphics: graphicsArr
};
MapGraphics.decorators = [
  withRenderCallback('arcgis-hub-map', ($el, { args }) => {
    $el.extent = args.extent;
    $el.graphics = args.graphics;
  })
];
