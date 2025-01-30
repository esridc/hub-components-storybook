import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback';
import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
export default {
  title: 'Views/Content Hero',
  component: 'arcgis-hub-content-hero',
  argTypes: {
    layout: {
      options: ['content-view', 'hub-entity'],
      control: { type: 'inline-radio' }
    }
  },
  decorators: [
    withRenderCallback('arcgis-hub-content-hero', ($el, { args }) => {
      $el.extent = args.extent;
      $el.graphics = args.graphics;
    }),
    withCenteredLayout()
  ]
};
const defaultArgs = {
  heroTitle: 'Content Hero Title',
  layout: 'content-view',
  thumbnailUrl: 'https://devext.arcgis.com/sharing/rest/content/items/87767b99a5f94db484ef8852d844bf15/info/thumbnail/ago_downloaded.jpg?w=400'
};
export const Default = args => `
  <arcgis-hub-content-hero
    hero-title="${args.heroTitle}"
    thumbnail-url="${args.thumbnailUrl}">
    <calcite-button slot="footer-start">Download</calcite-button>
  </arcgis-hub-content-hero>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Content Hero w/Thumbnail';
export const extentHero = args => `
  <arcgis-hub-content-hero
    hero-title="${args.heroTitle}"
    layout="${args.layout}">
    <calcite-button round slot="footer-start">Follow Project</calcite-button>
  </arcgis-hub-content-hero>
`;
const mockExtent = {
  spatialReference: { wkid: 4326 },
  type: "extent",
  xmax: -87.63493369784207,
  xmin: -87.76985954012704,
  ymax: 41.97823198570687,
  ymin: 41.868390342648965
};
extentHero.args = Object.assign(Object.assign({}, defaultArgs), { layout: 'hub-entity', basemap: 'streets-night-vector', extent: mockExtent, graphics: [{
      geometry: mockExtent,
      symbol: {
        type: "esriSFS",
        style: "solid",
        color: [227, 139, 79, 100],
        outline: {
          type: "esriSLS",
          style: "solid",
          color: [255, 255, 255],
          width: 1
        }
      }
    }] });
extentHero.storyName = "Content Hero w/Extent";
