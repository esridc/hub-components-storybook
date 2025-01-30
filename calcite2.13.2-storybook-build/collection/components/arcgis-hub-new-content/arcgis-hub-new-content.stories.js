import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback';
export default {
  title: 'Editing/New Content',
  component: 'arcgis-hub-new-content',
  decorators: [
    withRenderCallback('arcgis-hub-new-content', ($el, { args }) => {
      $el.entityConfigs = args.entityConfigs;
      $el.resourceLinks = args.resourceLinks;
    })
  ]
};
const defaultArgs = {
  buttonAppearance: "outline-fill",
  buttonColor: 'blue',
  isMobile: false,
  renderAsDropdown: false,
  entityConfigs: [
    {
      key: 'project',
      label: 'Project',
      description: 'Showcase time-bound work in a standard layout, Showcase time-bound work in a standard layout, Showcase time-bound work in a standard layout',
      icon: 'projects'
    },
    {
      key: 'event',
      label: 'Event',
      description: 'Host an event online or in-person',
      icon: 'event',
      href: 'https://google.com'
    }
  ],
  resourceLinks: [
    {
      label: 'Template Gallery',
      href: 'https://google.com'
    }
  ]
};
export const Default = (args) => `
  <arcgis-hub-new-content
    button-appearance="${args.buttonAppearance}"
    button-color="${args.buttonColor}"
    is-mobile="${args.isMobile}"
    render-as-dropdown="${args.renderAsDropdown}">
  </arcgis-hub-new-content>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'New Content';
