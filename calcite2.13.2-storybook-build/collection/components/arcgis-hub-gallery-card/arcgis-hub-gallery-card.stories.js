import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
export default {
  title: 'Search/Gallery Card',
  component: 'arcgis-hub-gallery-card',
  argTypes: {
    access: {
      options: ['private', 'org', 'shared', 'public'],
      control: { type: 'inline-radio' }
    },
    catalogs: { control: { type: 'text' } },
    categories: { control: { type: 'text' } },
    cardTitleTag: {
      options: ['h1', 'h2', 'h3', 'h4', 'h5'],
      control: { type: 'inline-radio' }
    },
    corners: {
      options: ['square', 'round'],
      control: { type: 'inline-radio' }
    },
    groups: { control: { type: 'text' } },
    ids: { control: { type: 'text' } },
    tags: { control: { type: 'text' } },
    types: { control: { type: 'text' } },
    mode: {
      options: ['dynamic', 'manual'],
      control: { type: 'inline-radio' }
    },
    imageType: {
      options: ['Thumbnails', 'Icons'],
      control: { type: 'inline-radio' }
    },
    shadow: {
      options: ['none', 'low', 'medium', 'heavy'],
      control: { type: 'inline-radio' }
    },
    linkButtonStyle: {
      options: ['primary', 'default'],
      control: { type: 'inline-radio' }
    },
  },
  decorators: [withCenteredLayout('60%')],
};
const defaultArgs = {
  access: "public",
  catalogs: "",
  categories: "",
  groups: "",
  orgid: "Xj56SBi2udA78cC9",
  portal: "https://qa-pre-a-hub.mapsqa.arcgis.com",
  limit: 4,
  baseUrl: "https://jupes-newest-cool-initiative-qa-pre-a-hub.hubqa.arcgis.com",
  sort: "numviews",
  tags: "",
  types: "application",
  corners: "round",
  newTab: true,
  cardTitleTag: 'h3',
  ids: "",
  mode: "dynamic",
  imageType: "Thumbnails",
  showEmptyState: true,
  shadow: "medium",
  showLinkButton: false,
  linkButtonText: "",
  linkButtonStyle: "primary",
  linkButtonBackgroundColor: "",
  linkButtonBackgroundHoverColor: "",
  linkButtonTextColor: "",
  shareable: false,
  shareableByValue: false,
  shareableOnHover: false,
};
export const Default = args => `
  <arcgis-hub-gallery-card
    access="${args.access}"
    catalogs="${args.catalogs}"
    categories="${args.categories}"
    groups="${args.groups}"
    orgid="${args.orgid}"
    limit="${args.limit}"
    base-url="${args.baseUrl}"
    sort="${args.sort}"
    tags="${args.tags}"
    types="${args.types}"
    corners="${args.corners}"
    new-tab="${args.newTab}"
    card-title-tag="${args.cardTitleTag}"
    ids="${args.ids}"
    mode="${args.mode}"
    image-type="${args.imageType}"
    show-empty-state="${args.showEmptyState}"
    shadow="${args.shadow}"
    show-link-button="${args.showLinkButton}"
    link-button-text="${args.linkButtonText}"
    link-button-style="${args.linkButtonStyle}"
    link-button-background-color="${args.linkButtonBackgroundColor}"
    link-button-background-hover-color="${args.linkButtonBackgroundHoverColor}"
    link-button-text-color="${args.linkButtonTextColor}"
    shareable="${args.shareable}"
    shareable-by-value="${args.shareableByValue}"
    shareable-on-hover="${args.shareableOnHover}"
    id="my-gallery-card"
  ></arcgis-hub-gallery-card>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Gallery Card';
