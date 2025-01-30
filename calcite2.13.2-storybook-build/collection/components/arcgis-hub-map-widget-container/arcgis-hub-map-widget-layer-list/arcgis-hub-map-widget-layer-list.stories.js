import { attachMapView } from '../../../../.storybook/decorators/attachMapView';
import { withMap } from '../../../../.storybook/decorators/withMap';
import { withRenderCallback } from '../../../../.storybook/decorators/withRenderCallback';
export default {
  title: 'Visualization/Map/Widgets/Map Widget Layer List',
  component: 'arcgis-hub-map-widget-layer-list',
  argTypes: {
    scale: {
      options: ['s', 'm', 'l'],
      control: { type: 'inline-radio' }
    },
    view: {
      control: false
    },
    showZoomAction: {
      control: { type: 'boolean' }
    },
    showRemoveAction: {
      control: { type: 'boolean' }
    },
    showLegend: {
      control: { type: 'boolean' }
    }
  },
  decorators: [
    withMap(),
    attachMapView(['arcgis-hub-map-widget-container', 'arcgis-hub-map-widget-layer-list']),
    withRenderCallback('arcgis-hub-map', ($el) => {
      // Add settings to display a web map with layers to display in the layer list
      $el.settings = {
        baseViewItemId: ['20d9e962d9f0431fb5ba80cd3cff0269']
      };
    }),
    withRenderCallback('arcgis-hub-map-widget-layer-list', ($el, { args }) => {
      const { showZoomAction, showRemoveAction, showLegend } = args;
      $el.showZoomAction = showZoomAction;
      $el.showRemoveAction = showRemoveAction;
      $el.showLegend = showLegend;
    }),
  ],
  parameters: {
    layout: 'fullscreen'
  }
};
const defaultArgs = {
  scale: 'm',
  showZoomAction: true,
  showRemoveAction: true,
  showLegend: true
};
export const Default = (args) => `
  <arcgis-hub-map-widget-container
    view-position="top-right"
    scale="${args.scale}"
    expand-disabled
  >
    <arcgis-hub-map-widget-layer-list
      scale="${args.scale}"
    ></arcgis-hub-map-widget-layer-list>
  </arcgis-hub-map-widget-container>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Map Widget Layer List';
