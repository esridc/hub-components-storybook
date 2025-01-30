export const SUBTITLE = `The following harness demonstrates how to use the composite timeline field. A composite field is one that renders an instance of the configuration editor itself:

1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of field.`;

export const SCHEMA = {
  type: 'object',
  properties: {
    timeline: {
      type: 'object'
    }
  }
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      scope: '/properties/timeline',
      type: 'Control',
      options: {
        control: 'arcgis-hub-timeline-editor'
      }
    }
  ]
};

export const VALUES = {
  timeline: {
    title:"The Project We Need",
    description:"We Promise to Listen to You!!",
    stages: [
      {
        title: "Discuss It Quickly!",
        timeframe: "March 3rd, 2022",
        stageDescription: "It is important that we do this now, in terms of one thing and another",
        key: "stage123",
        status: "notStarted"
      }
    ]
  }
};

export const TRANSLATIONS = {
  timeline: {
    label: "Timeline"
  }
}
