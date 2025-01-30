import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
export default {
  title: 'Search/Group List Manager',
  component: 'arcgis-hub-group-list-manager',
  parameters: {
    withAuth: {
      components: ['arcgis-hub-group-list-manager']
    },
    actions: {
      handles: ['arcgisHubGroupListManagerChanged']
    }
  },
  decorators: [
    withRenderCallback('arcgis-hub-group-list-manager', ($el, { args }) => {
      $el.groupIds = args.groupIds;
      $el.pickerFacets = args.pickerFacets;
    }),
    withCenteredLayout('50%')
  ],
};
const pickerToggleLabel = "Toggle Label";
const itemSearchFacets = [{}];
const defaultArgs = {
  groupIds: [
    '0608dffbd45b4d38872f92e9be73341d'
  ],
  allowAdd: true,
  allowRemove: true,
  metadataMode: 'members',
  wellKnownPickerCatalog: "myContent",
  pickerFacets: itemSearchFacets,
  pickerToggleLabel: pickerToggleLabel,
  showEmptyState: false,
};
export const Default = args => `
    <arcgis-hub-group-list-manager
        allow-add=${args.allowAdd}
        allow-remove=${args.allowRemove}
        metadata-mode="${args.metadataMode}"
        picker-toggle-label="${args.pickerToggleLabel}"
        well-known-picker-catalog="${args.wellKnownPickerCatalog}"
        show-empty-state=${args.showEmptyState}
    />
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Group List Manager';
