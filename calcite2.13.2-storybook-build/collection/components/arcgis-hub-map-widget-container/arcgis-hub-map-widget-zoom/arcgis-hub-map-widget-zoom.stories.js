import { attachMapView } from '../../../../.storybook/decorators/attachMapView';
import { withRenderCallback } from '../../../../.storybook/decorators/withRenderCallback.js';
import { withMap } from '../../../../.storybook/decorators/withMap';
export default {
  title: 'Visualization/Map/Widgets/Map Widget Zoom',
  component: 'arcgis-hub-map-widget-zoom',
  argTypes: {
    scale: {
      options: ['s', 'm', 'l'],
      control: { type: 'inline-radio' }
    },
    view: {
      control: false
    }
  },
  decorators: [
    withMap(),
    attachMapView(['arcgis-hub-map-widget-container', 'arcgis-hub-map-widget-zoom']),
    withRenderCallback('arcgis-hub-map', ($el) => {
      $el.addEventListener('arcgisHubMapViewReady', (evt) => {
        const { detail: { view } } = evt;
        view.ui.components = [];
      });
    })
  ],
  parameters: {
    layout: 'fullscreen'
  }
};
const defaultArgs = {
  scale: 'm'
};
export const Default = (args) => `
  <arcgis-hub-map-widget-container
    view-position="top-right"
    scale="${args.scale}"
  >
    <arcgis-hub-map-widget-zoom
      scale="${args.scale}"
    ></arcgis-hub-map-widget-zoom>
  </arcgis-hub-map-widget-container>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Map Widget Zoom';
