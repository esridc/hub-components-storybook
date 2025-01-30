import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
export default {
  title: 'Visualization/Embed Card',
  component: 'arcgis-hub-embed-card',
  parameters: {
    withAuth: {
      components: ['arcgis-hub-embed-card']
    },
  },
  decorators: [
    withRenderCallback('arcgis-hub-embed-card', ($el, { args }) => {
      $el.embed = args.embed;
    }),
  ],
  argTypes: {
    embed: {
      control: { type: 'object' },
    },
  }
};
/** MAP EMBED START */
const mapArgs = {
  embed: {
    kind: "map",
    id: "e98b1b232d1c469184233d28c9524558"
  }
};
export const MapEmbed = () => `<arcgis-hub-embed-card />`;
MapEmbed.args = Object.assign({}, mapArgs);
MapEmbed.storyName = 'Map Embed';
/** MAP EMBED END */
/** APP EMBED STARTS */
const appArgs = {
  embed: {
    id: '56e8ce53546140cd8d37938164230400',
    kind: 'app'
  }
};
export const AppEmbed = () => `<arcgis-hub-embed-card />`;
AppEmbed.args = Object.assign({}, appArgs);
AppEmbed.storyName = 'App Embed';
/** APP EMBED END */
