import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
export default {
  title: 'Metadata/Boundary Picker',
  component: 'arcgis-boundary-picker-ui',
  parameters: {
    actions: {
      handles: ['arcgisBoundaryPickerUpdate', 'arcgisBoundaryPickerCancel', 'arcgisBoundaryPickerSave'],
    },
  },
  decorators: [
    withRenderCallback('arcgis-boundary-picker-ui', ($el, { args }) => {
      $el.sources = args.sources;
      $el.extent = args.extent;
    })
  ],
  argTypes: {
    sources: {
      control: { type: 'object' },
    },
    extent: {
      control: { type: 'object' },
    },
    // TODO: why isn't this working the way provenance does?
    state: {
      control: { type: 'radio' },
      options: ['loading', 'saving', undefined]
    }
  }
};
// [[-88, 39.1], [-87.10000000000001, 40]]
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
const sources = [
  {
    value: 'none'
  }, {
    value: 'item',
    graphic: {
      geometry: extent
    },
    selected: true
  }
];
const defaultArgs = {
  extent,
  sources,
  state: undefined,
  authenticated: false
};
export const Default = (args) => `
  <arcgis-boundary-picker-ui
    state="${args.state}"
    authenticated="${args.authenticated}"
  ></arcgis-boundary-picker-ui>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Boundary Picker';
