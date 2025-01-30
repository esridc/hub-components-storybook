import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
export default {
  title: 'Utility/Ref Tooltip',
  component: 'arcgis-ref-tooltip',
  decorators: [
    withCenteredLayout('0'),
  ]
};
const defaultArgs = {
  overlayPositioning: 'fixed',
  placement: 'auto',
  text: 'Some tooltip text'
};
export const Default = (args) => `
  <arcgis-ref-tooltip
    overlay-positioning="${args.overlayPositioning}"
    placement="${args.placement}"
    text="${args.text}">
    <calcite-chip
      icon="analysis"
      label="chip with ref tooltip"
      scale="s"
      value="some-value">
      chip with ref tooltip
    </calcite-chip>
  </arcgis-ref-tooltip>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Ref Tooltip';
