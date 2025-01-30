import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
function propNameToAttribute(prop) {
  return prop.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}
export default {
  title: 'Display/Hub Help State',
  component: 'arcgis-hub-help-state',
  parameters: {
    actions: {
      handles: ['arcgisHubHelpStateActionClick', 'hubTelemetry'],
    },
  },
  decorators: [
    withRenderCallback('arcgis-hub-help-state', ($el, { args }) => {
      $el.telemetry = args.telemetry;
    })
  ]
};
const defaultArgs = {
  // override default image url
  imageUrl: 'https://qaext.arcgis.com/sharing/rest/content/items/d4f484fe02324aaf86c4275a5ee72d3e/resources/logo-smokey-social.png?v=1695942712708',
  state: 'unauthenticated',
  telemetry: {
    category: 'Gateway',
    action: 'Click sign in',
    label: 'Triggered from the 403 screen'
  }
};
export const Default = args => {
  // dynamically add other arguments if they are not undefined
  const dynamicArgs = ['actionLink', 'actionText', 'heading', 'icon', 'imageUrl', 'message'];
  const template = dynamicArgs.reduce((accum, key) => {
    const value = args[key];
    const attr = propNameToAttribute(key);
    console.log({ key, attr, value });
    return value
      ? accum += `${propNameToAttribute(key)}="${value}"`
      : accum;
  }, `<arcgis-hub-help-state
  state="${args.state}"`);
  return template + '></arcgis-hub-help-state>';
};
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Hub Help State';
