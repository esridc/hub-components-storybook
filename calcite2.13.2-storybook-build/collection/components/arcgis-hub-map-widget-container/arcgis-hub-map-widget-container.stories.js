import { attachMapView } from '../../../.storybook/decorators/attachMapView';
import { withMap } from '../../../.storybook/decorators/withMap';
export default {
  title: 'Visualization/Map/Widgets/Map Widget Container',
  component: 'arcgis-hub-map-widget-container',
  argTypes: {
    viewPosition: {
      options: ['top-right', 'bottom-right', 'bottom-left', 'top-left'],
      control: { type: 'select' }
    },
    scale: {
      options: ['s', 'm', 'l'],
      control: { type: 'inline-radio' }
    },
    expandDisabled: {
      control: 'boolean'
    },
    expanded: {
      control: 'boolean'
    },
    view: {
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
  viewPosition: 'top-right',
  scale: 'm',
  expandDisabled: true,
  expanded: true
};
export const Default = (args) => `
  <arcgis-hub-map-widget-container
    expanded="${args.expanded}"
    expand-disabled="${args.expandDisabled}"
    view-position="${args.viewPosition}"
    scale="${args.scale}"
  >
    <arcgis-hub-map-widget-generic
      icon="table"
      text="View Table"
      scale="${args.scale}"
    ></arcgis-hub-map-widget-generic>
  </arcgis-hub-map-widget-container>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Map Widget Container';
