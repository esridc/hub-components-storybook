import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
import { withMap } from '../../../.storybook/decorators/withMap';
export default {
  title: 'Visualization/Map Popover',
  component: 'arcgis-hub-map-popover',
  argTypes: {
    target: {
      control: false,
    }
  },
  decorators: [
    withMap(),
    withRenderCallback('arcgis-hub-map', ($el) => {
      $el.addEventListener('arcgisHubMapViewReady', (evt) => {
        const { detail: { view } } = evt;
        view.container.style.cursor = 'crosshair';
        view.on('pointer-move', (evt) => {
          const geometry = view.toMap(evt);
          const openPopoverEvent = new CustomEvent('arcgisHubMapPopoverOpen', {
            detail: {
              geometry,
              view,
              render: () => `${geometry.longitude.toFixed(4)}, ${geometry.latitude.toFixed(4)}`
            }
          });
          document.body.dispatchEvent(openPopoverEvent);
        });
      });
    })
  ],
  parameters: {
    layout: 'fullscreen'
  }
};
export const Default = (_args) => `
  <arcgis-hub-map-popover style="pointer-events: none; background: #FFFFFF; padding: .75rem; border-radius: 1rem; min-width: 10rem; text-align: center;"></arcgis-hub-map-popover>
`;
Default.storyName = 'Map Popover';
