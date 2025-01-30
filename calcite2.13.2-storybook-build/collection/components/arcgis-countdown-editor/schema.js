export const SCHEMA = {
  required: ['countdownDate'],
  type: 'object',
  properties: {
    cardTitle: {
      type: 'string'
    },
    countdownDate: {
      type: 'string',
      format: 'date'
    }
  }
};
