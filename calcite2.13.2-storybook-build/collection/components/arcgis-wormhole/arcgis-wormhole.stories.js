import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
export default {
  title: 'Display/Wormhole',
  component: 'arcgis-wormhole',
  decorators: [
    withRenderCallback('arcgis-wormhole', ($el, { args }) => {
      $el.elAttributes = args.elAttributes;
      $el.styles = args.styles;
    })
  ],
  parameters: {
    layout: 'centered',
  }
};
const defaultArgs = {
  elAttributes: {},
  styles: {
    color: 'red',
    padding: '1rem',
    backgroundColor: 'lightgoldenrodyellow',
    border: '1px solid red',
  },
  zIndex: '9'
};
export const Default = args => `
  <arcgis-wormhole
    z-index="${args.zIndex}"
  >
    <div>
      This content is rendered at the root of the body (not inside the wormhole component)!
    </div>
  </arcgis-wormhole>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Wormhole';
