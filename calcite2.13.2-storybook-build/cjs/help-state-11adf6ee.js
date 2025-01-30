'use strict';

const index = require('./index-7c083111.js');

const HelpState = ({ t, state, actionKey, headingKey, messageKey, icon, kind, className, loadingLabel }) => {
  return index.h("arcgis-hub-help-state", { actionText: actionKey ? t(actionKey) : "", class: className, heading: t(headingKey), icon: icon, isMain: false, kind: kind, loadingLabel: loadingLabel && t(loadingLabel), message: messageKey ? t(messageKey) : "", state: state });
};

exports.HelpState = HelpState;
