import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
export default {
  title: 'Metadata/Relative Date',
  component: 'arcgis-relative-date',
  argTypes: {
    formatStyle: {
      control: { type: 'radio' },
      options: ['long', 'short', 'narrow']
    },
    dateTime: {
      control: {
        type: 'date'
      }
    }
  },
  decorators: [withCenteredLayout('30%')],
};
const defaultArgs = {
  dateTime: Date.now() - 60 * 1000 * 60,
  tooltip: false,
  formatStyle: 'long'
};
export const Default = (args) => `
  <arcgis-relative-date
    date-time="${args.dateTime}"
    tooltip="${args.tooltip}"
    format-style="${args.formatStyle}"
  />
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Relative Date';
