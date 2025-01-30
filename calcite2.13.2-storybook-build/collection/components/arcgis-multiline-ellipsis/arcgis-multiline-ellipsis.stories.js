export default {
  title: 'Display/Multiline Ellipsis',
  component: 'arcgis-multiline-ellipsis',
  argTypes: {
    tooltipPlacement: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left', 'top-start', 'top-end', 'right-start', 'right-end', 'bottom-start', 'bottom-end', 'left-start', 'left-end', 'auto-start', 'auto-end', 'leading-start', 'leading', 'leading-end', 'trailing', 'trailing-start', 'trailing-end']
    },
  },
  parameters: {
    layout: 'centered',
  }
};
const defaultArgs = {
  lines: 1,
  expandEnabled: false,
  expandIcon: '',
  expandText: '',
  collapseEnabled: false,
  collapseIcon: '',
  collapseText: '',
  tooltipEnabled: false,
  tooltipText: '',
  tooltipPlacement: 'auto',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  width: '200px',
};
export const Default = (args) => `
  <arcgis-multiline-ellipsis
    style="width:${args.width}"
    lines="${args.lines}"
    expand-enabled="${args.expandEnabled}"
    expand-icon="${args.expandIcon}"
    expand-text="${args.expandText}"
    collapse-enabled="${args.collapseEnabled}"
    collapse-text="${args.collapseText}"
    collapse-icon="${args.collapseIcon}"
    tooltip-enabled="${args.tooltipEnabled}"
    tooltip-text="${args.tooltipText}"
    tooltip-placement="${args.tooltipPlacement}"
  >
    ${args.text}
  </arcgis-multiline-ellipsis>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Multiline Ellipsis';
