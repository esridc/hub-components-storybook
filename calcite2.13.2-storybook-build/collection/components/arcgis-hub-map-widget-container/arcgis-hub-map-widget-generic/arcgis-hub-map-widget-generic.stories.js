import { attachMapView } from '../../../../.storybook/decorators/attachMapView';
import { withMap } from '../../../../.storybook/decorators/withMap';
export default {
  title: 'Visualization/Map/Widgets/Map Widget Generic',
  component: 'arcgis-hub-map-widget-generic',
  argTypes: {
    scale: {
      options: ['s', 'm', 'l'],
      control: { type: 'inline-radio' }
    },
    active: {
      control: 'boolean'
    },
    icon: {
      control: { type: 'text' }
    },
    text: {
      control: { type: 'text' }
    },
    disabled: {
      control: 'boolean'
    },
    textEnabled: {
      control: false
    }
  },
  decorators: [
    withMap(),
    attachMapView(['arcgis-hub-map-widget-container', 'arcgis-hub-map-widget-generic'])
  ],
  parameters: {
    layout: 'fullscreen'
  }
};
const defaultArgs = {
  scale: 'm',
  active: false,
  icon: 'gps-on',
  text: 'My Location',
  disabled: false
};
export const Default = (args) => `
  <arcgis-hub-map-widget-container
    view-position="top-right"
    scale="${args.scale}"
  >
    <arcgis-hub-map-widget-generic
      active="${args.active}"
      icon="${args.icon}"
      text="${args.text}"
      scale="${args.scale}"
      disabled="${args.disabled}"
    ></arcgis-hub-map-widget-generic>
  </arcgis-hub-map-widget-container>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Map Widget Generic';
