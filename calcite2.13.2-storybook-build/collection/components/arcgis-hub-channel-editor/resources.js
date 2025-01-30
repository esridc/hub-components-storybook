export const CHANNEL_SCHEMA = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    allowAsAnonymous: {
      type: 'boolean',
      default: false,
    },
    blockWords: {
      type: 'string',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      format: 'blockWords',
    },
    access: {
      type: 'string',
      enum: ['public', 'org', 'private'],
    },
    groups: {
      type: 'array',
    },
  },
  allOf: [
    {
      if: {
        properties: {
          groups: { const: [] },
        },
      },
      then: {
        properties: {
          access: { enum: ['public', 'org'] },
        },
      },
    },
  ],
  required: ['name'],
};
