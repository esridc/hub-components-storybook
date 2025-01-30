import { withNotice } from '../../../.storybook/decorators/withNotice';
export default {
  title: 'Prototypes/Hub Keyboard Shortcuts',
  component: 'arcgis-hub-keyboard-shortcuts',
  decorators: [
    withNotice('Try typing shift ? (and make sure you are authed)', undefined, 'This component does not have visible ui by default', { icon: "information", kind: "brand", style: "margin-block-start: 2rem; margin-block-end: 2rem;" })
  ],
};
export const Default = () => `
  <arcgis-hub-keyboard-shortcuts
  ></arcgis-hub-keyboard-shortcuts>
`;
Default.storyName = 'Hub Keyboard Shortcuts';
