export const ENTITY = {
  id: "00123",
  name: "Mock Entity",
  type: "Hub Project",
  metrics: [
    {
      id: "m123",
      source: {
        value: "100",
        unit: "m"
      }
    }
  ],
  view: {
    metricDisplays: [
      {
        metricId: "m123",
        type: "static",
        title: "First metric",
        trailingText: "trailing text..."
      }
    ]
  }
};
export const ENTITY_NO_METRICS = {
  id: "00123",
  name: "Mock Entity",
  type: "Hub Project",
};
