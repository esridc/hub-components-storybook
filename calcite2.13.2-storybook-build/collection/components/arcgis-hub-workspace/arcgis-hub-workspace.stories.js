import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
export default {
  title: 'Editing/Workspace',
  component: 'arcgis-hub-workspace',
  parameters: {
    actions: {
      handles: ['arcgisHubWorkspaceEntityChange', 'arcgisHubWorkspaceAccessDenied', 'arcgisHubWorkspaceSignOut', 'arcgisHubWorkspaceNavigate'],
    },
  },
  decorators: [
    // TODO: remove? or update to handle navigate event
    withRenderCallback('arcgis-hub-workspace', ($el) => {
      // Listen for workspace link clicks: for storybook purposes,
      // we need to prevent redirects when navigating between panes
      $el.addEventListener('arcgisHubWorkspaceNavigate', (evt) => {
        const { clickEvent, href } = evt.detail;
        if (href) {
          clickEvent.preventDefault();
        }
      });
    }),
    (Story) => `<div style="width: 95vw; margin: auto;">${Story()}</div>`
  ]
};
const defaultArgs = {
  identifier: '62b7be7ae93943f5bb5d13310baf435f',
  type: 'site',
  siteName: 'City of X Department of Resiliency',
  pane: 'details'
};
export const Default = (args) => `
  <arcgis-hub-workspace
    identifier="${args.identifier}"
    type="${args.type}"
    pane="${args.pane}">
  </arcgis-hub-workspace>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Workspace';
