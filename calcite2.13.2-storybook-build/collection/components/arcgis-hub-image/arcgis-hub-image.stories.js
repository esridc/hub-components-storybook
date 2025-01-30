export default {
  title: 'Display/Image',
  component: 'arcgis-hub-image',
  parameters: {
    layout: 'centered',
  }
};
const defaultArgs = {
  src: 'https://via.placeholder.com/600x400',
  fallback: 'aturner.jpeg',
  alt: 'A fallback image of different content types',
};
export const Default = args => `
  <arcgis-hub-image
    src="${args.src}",
    fallback="${args.fallback}",
    alt="${args.alt}"
  ></arcgis-hub-image>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Image';
