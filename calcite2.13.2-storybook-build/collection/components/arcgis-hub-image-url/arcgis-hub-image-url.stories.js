export default {
  title: 'Editing/Image Url',
  component: 'arcgis-hub-image-url',
};
const defaultArgs = {
  imageSrc: ''
};
const Component = (args) => `
  <arcgis-hub-image-url
    imageSrc="${args.imageSrc}"
  />
`;
export const Default = Component.bind({});
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Image Url';
