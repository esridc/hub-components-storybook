import { withNotice } from '../../../.storybook/decorators/withNotice';
import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
export default {
  title: 'Editing/Delete Confirmation',
  component: 'arcgis-hub-delete-confirmation',
  decorators: [
    withNotice('In order to flex this component, please authenticate, and update the entity object in the controls section below. The required props on the example entity.', undefined, 'Delete Confirmation', { icon: "information", kind: "brand" }),
    withRenderCallback('arcgis-hub-delete-confirmation', ($el, { args }) => {
      $el.entity = args.entity;
    })
  ]
};
const defaultArgs = {
  entity: {
    type: "Web Map",
    owner: "paige_pa",
    protected: true,
    id: "00c",
    canDelete: true,
    canEdit: true,
  }
};
export const Default = (_args) => `
  <arcgis-hub-delete-confirmation></arcgis-hub-delete-confirmation>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Delete Confirmation';
