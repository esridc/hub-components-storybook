import { h } from '@stencil/core';
export const HelpState = ({ t, state, actionKey, headingKey, messageKey, icon, kind, className, loadingLabel }) => {
  return h("arcgis-hub-help-state", { actionText: actionKey ? t(actionKey) : "", class: className, heading: t(headingKey), icon: icon, isMain: false, kind: kind, loadingLabel: loadingLabel && t(loadingLabel), message: messageKey ? t(messageKey) : "", state: state });
};
