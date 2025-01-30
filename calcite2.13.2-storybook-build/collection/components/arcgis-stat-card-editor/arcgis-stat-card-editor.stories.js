import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback';
import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
export default {
  title: 'Visualization/Statistics Card/Stat Card Editor',
  component: 'arcgis-stat-card-editor',
  parameters: {
    actions: {
      handles: ['arcgisStatCardEditorChange', 'arcgisConfigurationEditorChange'], // i expect it to never catch arcgisConfigurationEditorChange... just checking
    },
  },
  decorators: [
    withRenderCallback('arcgis-stat-card-editor', ($el, { args }) => {
      $el.values = args.values;
    }),
    withCenteredLayout('600px')
  ],
};
const defaultArgs = {
  values: {
    cardTitle: '',
    value: '42',
    unit: '',
    unitPosition: 'after',
    trailingText: '',
    textAlign: 'start',
    valueColor: '',
    corners: 'squared',
    sourceLink: '',
    sourceTitle: '',
  }
};
export const Default = (args) => `
  <arcgis-stat-card-editor
  values="${args.values}"></arcgis-stat-card-editor>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Stat Card Editor';
