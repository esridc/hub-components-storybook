import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
export default {
  title: 'Editing/Image Upload',
  component: 'arcgis-hub-image-upload',
  decorators: [
    withRenderCallback('arcgis-hub-image-upload', ($el) => {
      $el.addEventListener('arcgisImageUploadSave', (evt) => {
        const img = document.querySelector('.image-upload-output');
        img.src = evt.detail.base64;
      });
    }),
    Story => `<div style="width: 650px; margin: auto;">${Story()}</div> <br /> <img class="image-upload-output" />`
  ]
};
const defaultArgs = {
  inline: true,
  sizeDescription: 'For best results, the image should be 300 x 300 pixels.',
  aspectRatio: 1,
  maxWidth: 300,
  maxHeight: 300,
  fillBackground: false,
  height: 300,
};
const Component = (args) => `
  <arcgis-hub-image-upload
    inline="${args.inline}"
    size-description="${args.sizeDescription}"
    aspect-ratio="${args.aspectRatio}"
    max-width="${args.maxWidth}"
    max-height="${args.maxHeight}"
    fill-background="${args.fillBackground}"
    height="${args.height}"
  />
`;
export const Default = Component.bind({});
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Image Upload';
