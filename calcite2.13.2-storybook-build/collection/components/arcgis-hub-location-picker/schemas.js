export const buildLocationSchema = (opts) => {
  const { hasNoGeometries, locationNameRequired } = opts;
  const required = [];
  if (locationNameRequired) {
    required.push("name");
  }
  return hasNoGeometries
    ? { type: "object" }
    : {
      type: "object",
      required,
      properties: {
        name: {
          type: "string"
        }
      }
    };
};
export const buildLocationUiSchema = (opts) => {
  const { hasNoGeometries } = opts;
  return hasNoGeometries
    ? { type: "Layout", elements: [] }
    : {
      type: "Layout",
      elements: [
        {
          scope: "/properties/name",
          type: "Control",
          label: "{{locationName.label:translate}}",
          options: {
            messages: [
              {
                type: "ERROR",
                keyword: "required",
                icon: true,
                label: "{{locationName.error:translate}}"
              }
            ]
          }
        }
      ]
    };
};
