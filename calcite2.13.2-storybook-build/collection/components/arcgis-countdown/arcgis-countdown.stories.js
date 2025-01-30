import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
export default {
  title: 'Layouts/Countdown/Countdown',
  component: 'arcgis-countdown',
  argTypes: {
    countdownDate: {
      control: { type: 'date' }
    }
  },
  decorators: [withCenteredLayout('30%')],
};
// default countdown to 30 days from today
const date = Date.parse(new Date(new Date().setDate(new Date().getDate() + 30)).toISOString());
const defaultArgs = {
  cardTitle: 'Countdown Title',
  countdownDate: date,
  shareable: false,
  shareableByValue: false,
  shareableOnHover: false
};
export const Default = args => {
  return `
  <arcgis-countdown
    card-title="${args.cardTitle}"
    countdown-date="${new Date(Number(args.countdownDate)).toISOString()}"
    id="countdown-card"
    shareable="${args.shareable}"
    shareable-by-value="${args.shareableByValue}"
    shareable-on-hover="${args.shareableOnHover}"
  ></arcgis-countdown>
`;
};
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Countdown';
