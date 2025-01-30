export default {
  title: 'Layouts/Media Gallery/Media Gallery',
  component: 'arcgis-hub-media-gallery',
};
const defaultArgs = {
  // NOTE: the global context defaults to unauthenticated QA for all stories
  // prod
  // itemId: '211ec658c4a34dc28d6903a7b4e76931',
  // qa
  itemId: '4e694269e30a476daa3b2d995f643687',
  selectable: true,
  layout: 'grid'
};
export const Default = args => `
  <arcgis-hub-media-gallery
    item-id="${args.itemId}"
    selectable="${args.selectable}"
    layout="${args.layout}"
  ></arcgis-hub-media-gallery>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Media Gallery';
