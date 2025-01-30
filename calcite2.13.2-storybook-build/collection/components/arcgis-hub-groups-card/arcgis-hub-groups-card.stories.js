import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
export default {
  title: 'Search/Groups Card',
  component: 'arcgis-hub-groups-card',
  decorators: [
    withRenderCallback('arcgis-hub-groups-card', ($el, { args }) => {
      $el.groups = args.groups;
    }),
    withCenteredLayout()
  ]
};
const defaultArgs = {
  cardTitle: 'Featured groups',
  titleAlign: 'left',
  showThumbnail: true,
  layout: 'grid',
  site: 'https://hub.arcgis.com',
  newTab: true,
  groups: [
    "f10a814b5d8f4d16bcaa32e3b063cd3a",
    "c20df640230948219aa1e8126ce3162c",
    "18c672e8f5254cb4882fe73e005ed802",
    "3d79a4bc151440039ea8c1495cf8fe25"
  ]
};
export const Default = (args) => `
  <arcgis-hub-groups-card
    card-title=${args.cardTitle}
    title-align=${args.titleAlign}
    show-thumbnail=${args.showThumbnail}
    layout=${args.layout}
    site=${args.site}
    new-tab=${args.newTab}
  ></arcgis-hub-groups-card>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Groups Card';
