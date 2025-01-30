export const SCHEMA = {
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "default": "This is the default name"
    }
  }
};

export const UI_SCHEMA = {
  "type": "Layout",
  "elements": [
    {
      "label": "Name",
      "labelKey": "name",
      "scope": "/properties/name",
      "type": "Control"
    }
  ]
};

export const VALUES = {
  "name": "This is the name"
};

export const TRANSLATIONS = {
  "name": "Enter a name:"
};
