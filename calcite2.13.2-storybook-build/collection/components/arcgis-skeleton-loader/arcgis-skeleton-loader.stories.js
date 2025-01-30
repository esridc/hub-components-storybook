import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
export default {
  title: 'Display/Skeleton Loader',
  component: 'arcgis-skeleton-loader',
  decorators: [
    withCenteredLayout('600px')
  ]
};
const defaultArgs = {
  active: true,
  headingRows: 1,
  rows: 3,
  showFooter: false,
  showHeading: true,
  showThumbnail: false,
};
export const Default = args => `
  <arcgis-skeleton-loader
    active="${args.active}"
    heading-rows="${args.headingRows}"
    rows="${args.rows}"
    show-footer="${args.showFooter}"
    show-heading="${args.showHeading}"
    show-thumbnail="${args.showThumbnail}"
  ></arcgis-skeleton-loader>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Skeleton Loader';
