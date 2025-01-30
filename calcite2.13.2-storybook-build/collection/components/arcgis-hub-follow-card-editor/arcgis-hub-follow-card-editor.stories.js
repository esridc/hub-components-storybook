import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback';
export default {
  title: 'Layouts/Follow Card/Hub Follow Card Editor',
  component: 'arcgis-hub-follow-card-editor',
  parameters: {
    actions: {
      handles: ['arcgisHubFollowCardEditorChange']
    }
  },
  decorators: [
    withRenderCallback('arcgis-hub-follow-card-editor', ($el, { args }) => {
      $el.values = args.values;
    }),
  ],
};
const VALUES = {
  entityId: ['cfd7184e710c411fb33ad23f6f48ac52'],
  entityType: 'site',
  callToActionText: 'By following our work you will get updates about new events, surveys, and tools that you can use to help us achieve our goals.',
  callToActionAlign: 'center',
  buttonText: 'Follow',
  unfollowButtonText: 'Unfollow',
  buttonAlign: 'center',
  buttonStyle: 'outline-fill',
  schemaVersion: 1,
};
const defaultArgs = {
  values: VALUES
};
export const Default = () => `<arcgis-hub-follow-card-editor></arcgis-hub-follow-card-editor>`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Hub Follow Card Editor';
