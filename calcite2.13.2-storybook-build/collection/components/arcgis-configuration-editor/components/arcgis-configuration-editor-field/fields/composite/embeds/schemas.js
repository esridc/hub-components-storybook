export const EMBED_SCHEMA = {
  type: 'object',
  properties: {
    embed: {
      type: "object"
    }
  }
};
export const buildEmbedUiSchema = (opts = {}) => {
  const { facets, catalogs } = opts;
  return {
    type: "Layout",
    elements: [
      {
        scope: "/properties/embed",
        type: "Control",
        options: {
          control: "hub-composite-input-embed",
          facets,
          catalogs
        },
      },
    ]
  };
};
