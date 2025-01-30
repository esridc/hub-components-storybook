import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
export default {
  title: 'Visualization/Statistics Card/Stat Card',
  component: 'arcgis-stat-card',
  argTypes: {
    textAlign: {
      options: ['start', 'center', 'end'],
      control: { type: 'inline-radio' }
    },
    unitPosition: {
      options: ['before', 'after', 'below'],
      control: { type: 'inline-radio' }
    },
    valueColor: {
      control: { type: 'color' }
    },
    corners: {
      options: ['square', 'round'],
      control: { type: 'inline-radio' }
    }
  },
  decorators: [withCenteredLayout('400px')],
};
const defaultArgs = {
  valueColor: '',
  cardTitle: 'This is the title',
  subtitle: '',
  value: '42',
  textAlign: 'end',
  trailingText: '',
  unit: '%',
  unitPosition: 'after',
  corners: 'squared',
  shareable: true,
  shareableByValue: false,
  shareableOnHover: true,
  popoverTitle: '',
  popoverDescription: '',
  scale: 'm',
};
export const Default = args => `
  <arcgis-stat-card
    id="my-stat-card"
    value-color="${args.valueColor}"
    card-title="${args.cardTitle}"
    subtitle="${args.subtitle}"
    value="${args.value}"
    text-align="${args.textAlign}"
    trailing-text="${args.trailingText}"
    unit="${args.unit}"
    unit-position="${args.unitPosition}"
    corners="${args.corners}"
    shareable="${args.shareable}"
    shareable-by-value="${args.shareableByValue}"
    shareable-on-hover="${args.shareableOnHover}"
    popover-title="${args.popoverTitle}"
    popover-description="${args.popoverDescription}"
    scale="${args.scale}"
  >
    <calcite-icon icon="gear" slot="header-media"></calcite-icon>
    <a slot="footer" href="#">this is the footer slotted content</a>
  </arcgis-stat-card>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Stat Card';
export const PageViewsDashboard = args => `
  <arcgis-stat-card
    value-color="${args.valueColor}"
    card-title="${args.cardTitle}"
    subtitle="${args.subtitle}"
    value="${args.value}"
    text-align="${args.textAlign}"
    trailing-text="${args.trailingText}"
    unit="${args.unit}"
    unit-position="${args.unitPosition}"
    corners="${args.corners}"
    shareable="${args.shareable}"
    popover-title="${args.popoverTitle}"
    popover-description="${args.popoverDescription}"
    shareable-by-value="${args.shareableByValue}"
    shareable-on-hover="${args.shareableOnHover}"
    scale="${args.scale}"
  >
    <calcite-icon icon="arrow-bold-up" slot="value-media"></calcite-icon>
    <div slot="footer">
      <svg width="100%" viewBox="0 0 440 120" class="chart">
        <polyline
          fill="none"
          stroke="#0074d9"
          stroke-width="2"
          points="00,120 20,60 40,80 60,20 80,80 100,80 120,60 140,100 160,90 180,80 200, 110 220, 10 240, 70 260, 100 280, 100 300, 40 320, 0 340, 100 360, 100 380, 120 400, 60 420, 70 440, 80"
        />
      </svg>
    </div>
  </arcgis-stat-card>
`;
PageViewsDashboard.args = Object.assign(Object.assign({}, defaultArgs), { cardTitle: 'Pageviews', subtitle: 'Last 30 Days', value: '1,042', unit: '' });
