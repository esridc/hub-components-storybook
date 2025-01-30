import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
export default {
  title: 'Hub Resource Gallery',
  component: 'arcgis-hub-resource-gallery',
  decorators: [
    withRenderCallback('arcgis-hub-resource-gallery', ($el, { args }) => {
      $el.tags = args.tags;
    })
  ],
  argTypes: {
    tags: {
      control: { type: 'array' },
    }
  }
};
const defaultArgs = {
  headingText: 'Hub Resource Gallery',
  headingLevel: 2,
  limit: 2,
  tags: ["userworkspace"]
};
export const Default = args => `
  <arcgis-hub-resource-gallery
    heading-text="${args.headingText}"
    heading-level="${args.headingLevel}"
    limit="${args.limit}">
  ></arcgis-hub-resource-gallery>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Hub Resource Gallery';
