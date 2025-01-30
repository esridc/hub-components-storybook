import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
export default {
  title: 'Search/Card',
  component: 'arcgis-hub-card',
  argTypes: {
    titleTag: {
      options: ['h1', 'h2', 'h3', 'h4', 'h5'],
      control: { type: 'inline-radio' }
    },
    corners: {
      options: ['square', 'round'],
      control: { type: 'inline-radio' }
    },
    imageType: {
      options: ['thumbnail', 'icon'],
      control: { type: 'inline-radio' }
    },
    shadow: {
      options: ['none', 'low', 'medium', 'heavy'],
      control: { type: 'inline-radio' }
    }
  },
  decorators: [withCenteredLayout('900px')],
};
const defaultArgs = {
  itemTitle: "US States and Territories",
  source: "NAPSG Foundation",
  type: "Feature Service",
  family: "dataset",
  summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  additionalInfo: "type:Feature Service|featureCount:23,910|size:4mb|dateUpdated:3 days ago",
  badges: "green:check-shield:Verified|red:exclamation-mark-triangle-f",
  actionLinks: "open-ago:launch:Primary|delete:trash:Secondary|delete:satellite-3:Tertiary",
  thumbnailUrl: "https://devext.arcgis.com/sharing/rest/content/items/87767b99a5f94db484ef8852d844bf15/info/thumbnail/ago_downloaded.jpg",
  showThumbnail: true,
  layout: "row",
  showAdditionalInfo: true,
  showBadges: true,
  showType: true,
  showOwner: true,
  newTab: true,
  selectable: true,
  titleTag: 'h2',
  corners: 'round',
  imageType: 'thumbnail',
  shadow: 'medium'
};
export const Default = args => `
  <arcgis-hub-card
    item-title="${args.itemTitle}"
    source="${args.source}"
    type="${args.type}"
    family="${args.family}"
    summary="${args.summary}"
    additional-info="${args.additionalInfo}"
    badges="${args.badges}"
    action-links="${args.actionLinks}"
    thumbnail-url="${args.thumbnailUrl}"
    show-thumbnail="${args.showThumbnail}"
    layout="${args.layout}"
    show-additional-info="${args.showAdditionalInfo}"
    show-badges="${args.showBadges}"
    show-type="${args.showType}"
    show-owner="${args.showOwner}"
    new-tab="${args.newTab}"
    selectable="${args.selectable}"
    title-tag="${args.titleTag}"
    corners="${args.corners}"
    image-type="${args.imageType}"
    shadow="${args.shadow}"
  ></arcgis-hub-card>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Card';
