import { dictionary } from '@esri/telemetry-dictionary-hub';
export const EVENT_ACTIONS = {
  register: {
    inPerson: {
      success: 'alerts.inPersonRegistrationConfirmed',
      unexpected: 'alerts.inPersonRegistrationError',
      capacity: 'alerts.inPersonRegistrationAtCapacity',
      telemetry: Object.assign(Object.assign({}, dictionary.category.interaction.action.select.label.register.details.event), { type: 'In-person' }),
    },
    online: {
      success: 'alerts.onlineRegistrationConfirmed',
      unexpected: 'alerts.onlineRegistrationError',
      capacity: 'alerts.onlineRegistrationAtCapacity',
      telemetry: Object.assign(Object.assign({}, dictionary.category.interaction.action.select.label.register.details.event), { type: 'Online' }),
    },
  },
  unregister: {
    inPerson: {
      success: 'alerts.inPersonRegistrationCanceled',
      error: 'alerts.inPersonRegistrationCanceledError',
      telemetry: Object.assign(Object.assign({}, dictionary.category.interaction.action.select.label.unregister.details.event), { type: 'In-person' }),
    },
    online: {
      success: 'alerts.onlineRegistrationCanceled',
      error: 'alerts.onlineRegistrationCanceledError',
      telemetry: Object.assign(Object.assign({}, dictionary.category.interaction.action.select.label.unregister.details.event), { type: 'Online' }),
    },
  },
};
