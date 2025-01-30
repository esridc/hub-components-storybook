import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
export default {
  title: 'Search/Hub Calendar',
  component: 'arcgis-hub-calendar',
  decorators: [
    withRenderCallback('arcgis-hub-calendar', ($el, { args }) => {
      if ($el) {
        Object.assign($el, args);
      }
    }),
  ],
};
const now = new Date();
const defaultArgs = {
  searchResults: [],
  maxEventsPerDay: 5,
  minSelectableDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0).toISOString(),
  maxSelectableDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30, 0, 0, 0, 0).toISOString(),
  interactable: true,
};
export const Default = () => `
  <arcgis-hub-calendar></arcgis-hub-calendar>
`;
Default.args = Object.assign({}, defaultArgs);
Default.argTypes = {
  minSelectableDate: { control: 'date' },
  maxSelectableDate: { control: 'date' },
  interactable: { control: 'boolean' }
};
Default.storyName = 'Hub Calendar';
