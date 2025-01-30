import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback';
import { attachMapView } from '../../../.storybook/decorators/attachMapView';
import { withNotice } from '../../../.storybook/decorators/withNotice';
export default {
  title: 'Discussions/Map Integrator',
  component: 'arcgis-hub-discussions-map-integrator',
  decorators: [
    withRenderCallback('arcgis-hub-discussions', ($el, { args }) => {
      if ($el) {
        $el.isHub = args === null || args === void 0 ? void 0 : args.isHub;
      }
    }),
    withRenderCallback('arcgis-hub-discussions-map-integrator', ($el, { args }) => {
      if ($el) {
        $el.isHub = args === null || args === void 0 ? void 0 : args.isHub;
        $el.theme = args === null || args === void 0 ? void 0 : args.theme;
        document.querySelectorAll('arcgis-hub-discussions').forEach(el => $el.discussionsRef = el);
        document.querySelectorAll('arcgis-hub-map-widget-search').forEach(el => $el.searchRef = el);
        document.querySelectorAll('arcgis-hub-map-widget-draw').forEach(el => $el.drawRef = el);
      }
    }),
    attachMapView(['arcgis-hub-map-widget-container', 'arcgis-hub-map-widget-search', 'arcgis-hub-map-widget-draw', 'arcgis-hub-discussions-map-integrator']),
    withNotice('This component requires authentication to render. Please auth as juliana_pa on QA.', { text: 'Try the harness example', href: 'https://friendly-adventure-7w1eyl2.pages.github.io/harnesses/html/arcgis-hub-discussions-map-integrator/index.html' }, undefined, { style: "margin-block-end: 2rem;" })
  ],
  argTypes: {
    view: { control: false },
    discussionsRef: { control: false },
    searchRef: { control: false },
    drawRef: { control: false },
    entity: { control: false },
    entityId: { control: false },
    entityType: { control: false },
    activeFeature: { control: false },
    channelIds: { control: false }
  }
};
const defaultArgs = {
  discussion: 'hub://content/af97b44f8dbb4cabb8d4d00d22418ace',
  isHub: false,
  isMobile: false,
  showChannelAvatar: false,
  showChannelName: false,
  theme: {
    callout: {
      backgroundColor: [129, 93, 166],
      textColor: [255, 255, 255],
      hoverColor: [21, 5, 38],
      activeColor: [191, 48, 60],
      width: 2
    },
    point: {
      activeColor: [191, 48, 60],
      color: [129, 93, 166],
      hoverColor: [21, 5, 38]
    },
    polyline: {
      activeColor: [191, 48, 60],
      color: [129, 93, 166],
      hoverColor: [21, 5, 38]
    },
    polygon: {
      activeColor: [191, 48, 60],
      color: [129, 93, 166],
      hoverColor: [21, 5, 38]
    }
  }
};
export const Default = (args) => `
  <arcgis-hub-discussions-map-integrator
    discussion="${args.discussion}"
  >
  </arcgis-hub-discussions-map-integrator>
  <div style="display: flex;">

    <arcgis-hub-discussions
      discussion="${args.discussion}"
      style="flex: 1; height: 100vh;"
    >
    </arcgis-hub-discussions>

    <arcgis-hub-map style="flex: 2; height: 100vh;">
    </arcgis-hub-map>

  </div>
  <arcgis-hub-map-widget-container view-position='top-right'>
  <arcgis-hub-map-widget-search></arcgis-hub-map-widget-search>
  <arcgis-hub-map-widget-draw></arcgis-hub-map-widget-draw>
  </arcgis-hub-map-widget-container>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Map Integrator';
