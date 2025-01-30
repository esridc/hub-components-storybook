import { withMap } from '../../../../.storybook/decorators/withMap';
import { attachMapView } from '../../../../.storybook/decorators/attachMapView';
import { withRenderCallback } from '../../../../.storybook/decorators/withRenderCallback.js';
export default {
  title: 'Visualization/Map/Widgets/Map Widget Draw',
  component: 'arcgis-hub-map-widget-draw',
  argTypes: {
    geometry: {
      control: false
    },
    mode: {
      options: ['freehand', 'hybrid', 'click'],
      control: { type: 'select' }
    },
    tools: {
      options: ['select', 'point', 'polyline', 'polygon', 'circle', 'rectangle'],
      control: { type: 'inline-check' }
    },
    view: {
      control: false
    },
    disablePrimaryOptions: {
      control: 'boolean'
    },
    disableEditOptions: {
      control: 'boolean'
    },
    enableMapTips: {
      control: 'boolean'
    },
    drawTip: {
      control: false
    },
    color: {
      control: 'object'
    },
    buffer: {
      control: 'boolean'
    },
    condensed: {
      control: 'boolean'
    },
    resetOnDisconnect: {
      control: false
    },
    disabled: {
      control: 'boolean'
    },
    boundaries: {
      control: false
    }
  },
  decorators: [
    withMap(),
    attachMapView(['arcgis-hub-map-widget-container', 'arcgis-hub-map-widget-draw']),
    withRenderCallback('arcgis-hub-map', (_, { args }) => {
      const $drawEl = document.querySelector('arcgis-hub-map-widget-draw');
      Object.keys(args).forEach(key => $drawEl[key] = args[key]);
    })
  ],
  parameters: {
    layout: 'fullscreen'
  }
};
const defaultArgs = {
  mode: 'click',
  tools: ['point', 'polyline', 'polygon'],
  disablePrimaryOptions: true,
  disableEditOptions: false,
  enableMapTips: false,
  color: [255, 0, 0],
  buffer: false,
  condensed: false
};
export const Default = (_args) => `
  <arcgis-hub-map-widget-container
    view-position="top-right"
    scale="m"
  >
    <arcgis-hub-map-widget-draw></arcgis-hub-map-widget-draw>
  </arcgis-hub-map-widget-container>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Map Widget Draw';
