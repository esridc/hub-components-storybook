import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
export default {
  title: 'Editing/Location Picker',
  component: 'arcgis-hub-location-picker',
  parameters: {
    actions: {
      handles: ['arcgisHubLocationPickerUpdate']
    }
  },
  decorators: [
    withRenderCallback('arcgis-hub-location-picker', ($el, { args }) => {
      $el.options = args.options;
      $el.extent = args.extent;
    })
  ],
  argTypes: {
    options: {
      control: { type: 'object' }
    },
    extent: {
      control: { type: 'object' }
    },
  }
};
const extent = {
  "xmin": -88,
  "ymin": 39.1,
  "xmax": -87.10000000000001,
  "ymax": 40,
  "type": "extent",
  "spatialReference": {
    "wkid": 4326
  }
};
const options = [
  {
    label: "No Location",
    location: {
      type: "none",
    }
  },
  {
    label: "Organization's Extent",
    description: "City of X",
    selected: true,
    location: {
      type: "org",
      extent: [[-88, 39.1], [-87.10000000000001, 40]],
      spatialReference: {
        wkid: 4326
      }
    }
  },
  {
    label: "Custom",
    description: "Draw one or more locations",
    location: {
      type: "custom",
      extent: [[-88, 39.1], [-87.10000000000001, 40]],
      spatialReference: {
        wkid: 4326
      }
    }
  },
];
const defaultArgs = {
  extent,
  options
};
export const Default = () => `
  <arcgis-hub-location-picker
  ></arcgis-hub-location-picker>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Location Picker';
