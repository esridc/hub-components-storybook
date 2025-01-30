import { attachMapView } from '../../../../.storybook/decorators/attachMapView';
import { withMap } from '../../../../.storybook/decorators/withMap';
export default {
  title: 'Visualization/Map/Widgets/Map Widget Search',
  component: 'arcgis-hub-map-widget-search',
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
    attachMapView(['arcgis-hub-map-widget-container', 'arcgis-hub-map-widget-search'])
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
    <arcgis-hub-map-widget-search
      scale="${args.scale}"
    ></arcgis-hub-map-widget-search>
  </arcgis-hub-map-widget-container>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Map Widget Search';
