import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
export default {
  title: 'Layouts/Follow Card/Hub Follow Card',
  component: 'arcgis-hub-follow-card',
  parameters: {
    withAuth: {
      components: ['arcgis-hub-follow-card']
    },
    actions: {
      handles: ['arcgisHubFollowCardFollowChange']
    }
  },
  decorators: [
    withRenderCallback('arcgis-hub-follow-card', ($el, { args }) => {
      $el.cardConfig = args.cardConfig;
    }),
  ],
};
const CONFIG = {
  cardId: "sampleCardId",
  entityId: "b9017cb63f264979841bf0bb9f9e1d6a",
  entityType: "site",
  callToActionText: "This is the call to action text",
  callToActionAlign: "center",
  buttonText: "Follow",
  unfollowButtonText: "Unfollow",
  buttonAlign: "center",
  buttonStyle: "solid",
  schemaVersion: 1
};
const defaultArgs = {
  cardConfig: CONFIG,
};
export const Default = () => `<arcgis-hub-follow-card></arcgis-hub-follow-card>`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Hub Follow Card';
