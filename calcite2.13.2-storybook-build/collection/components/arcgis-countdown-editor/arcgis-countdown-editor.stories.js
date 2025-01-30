import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback';
import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
export default {
  title: 'Layouts/Countdown/Countdown Editor',
  component: 'arcgis-countdown-editor',
  parameters: {
    actions: {
      handles: ['arcgisCountdownEditorChange', 'arcgisConfigurationEditorChange'], // i expect it to never catch arcgisConfigurationEditorChange... just checking
    },
  },
  decorators: [
    withRenderCallback('arcgis-countdown-editor', ($el, { args }) => {
      $el.values = args.values;
    }),
    withCenteredLayout('30%')
  ]
};
const defaultArgs = {
  values: {
    cardTitle: 'Countdown to Something!',
    countdownDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T').shift()
  }
};
export const Default = () => `<arcgis-countdown-editor></arcgis-countdown-editor>`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Countdown Editor';
