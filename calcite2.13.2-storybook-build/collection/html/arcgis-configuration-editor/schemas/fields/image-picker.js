export const SUBTITLE = `The following harness shows variations of the image picker field (arcgis-hub-field-image-picker):

1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of field.`;

export const SCHEMA = {
  type: 'object',
  properties: {
    basicImage: {
      type: 'object'
    },
    imageWithAspectRatio: {
      type: 'object'
    },
    imageWithSizeDescription: {
      type: 'object'
    },
    defaultImage: {
      type: 'object'
    }
  }
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      label: 'Basic image picker',
      scope: '/properties/basicImage',
      type: 'Control',
      options: {
        control: 'hub-field-input-image-picker'
      }
    },
    {
      label: 'Image picker with aspect ratio defined',
      scope: '/properties/imageWithAspectRatio',
      type: 'Control',
      options: {
        control: 'hub-field-input-image-picker',
        aspectRatio: 0.5,
        helperText: {
          label: 'Browse and select an image to see the configured aspect ratio (0.5) constrain the zoom window. The configured aspect ratio indicates the ratio of the output image\'s width relative to its height'
        }
      }
    },
    {
      label: 'Image picker with size description',
      scope: '/properties/imageWithSizeDescription',
      type: 'Control',
      options: {
        control: 'hub-field-input-image-picker',
        aspectRatio: 0.5,
        sizeDescription: {
          label: 'Max size is 10mb, JPEG, JPG, or PNG'
        }
      }
    },
    {
      label: 'Image picker with a default',
      scope: '/properties/defaultImage',
      type: 'Control',
      options: {
        control: 'hub-field-input-image-picker',
        defaultImgUrl: "https://t4.ftcdn.net/jpg/03/03/62/45/360_F_303624505_u0bFT1Rnoj8CMUSs8wMCwoKlnWlh5Jiq.jpg",
        helperText: {
          label: "click the trash icon to return to the picking experience"
        }
      }
    }
  ]
};
