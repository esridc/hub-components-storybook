import { CATALOGS, FACETS, GROUP_CATALOGS, GROUP_FACETS } from "../../fixtures.js";

export const SUBTITLE = `The following harness shows variations of the gallery picker field (arcgis-hub-field-gallery-picker):

1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of field.`;

export const SCHEMA = {
  type: 'object',
  required: ["requiredGallery"],
  properties: {
    itemGalleryWithDefault: {
      type: "array",
      items: {
        type: "string",
      },
      maxItems: 10,
      default: [ 'c1a3ea9d4518498795206c1b4ec3ce48', 'a3ace68c29d847f2bda6f85c60744a9d' ]
    },
    groupGalleryWithDefault: {
      type: "array",
      items: {
        type: "string"
      },
      default: [ "c6a05bafa1e84c30af4db7c6ebf70abb", "4cedc28d8f6542d09a09a359d3fcf1bc" ]
    },
    galleryWithMaxSelection: {
      type: "array",
      items: {
        type: "string",
      },
      maxItems: 2
    },
    requiredGallery: {
      type: "array",
      items: {
        type: "string",
      },
      maxItems: 10,
      default: [ 'a3ace68c29d847f2bda6f85c60744a9d' ]
    },
    galleryWithTooltip: {
      type: "array",
      items: {
        type: "string",
      },
      maxItems: 10
    },
    galleryWithCanReorderDisabled: {
      type: "array",
      items: {
        type: "string"
      },
      default: [ 'c1a3ea9d4518498795206c1b4ec3ce48', 'a3ace68c29d847f2bda6f85c60744a9d']
    },
    galleryWithLaunchAction: {
      type: "array",
      items: {
        type: "string",
      },
      default: ["5e0f7cea9ba64324b81532af9793a4f9"]
    }
  }
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      label: 'Item gallery picker with default selection',
      scope: '/properties/itemGalleryWithDefault',
      type: 'Control',
      options: {
        control: 'hub-field-input-gallery-picker',
        targetEntity: 'item',
        catalogs: CATALOGS,
        facets: FACETS
      }
    },
    {
      label: 'Group gallery picker with default selection',
      scope: '/properties/groupGalleryWithDefault',
      type: 'Control',
      options: {
        control: 'hub-field-input-gallery-picker',
        targetEntity: 'group',
        catalogs: GROUP_CATALOGS,
        facets: GROUP_FACETS
      }
    },
    {
      label: 'Gallery picker with max selection',
      scope: '/properties/galleryWithMaxSelection',
      type: 'Control',
      options: {
        control: 'hub-field-input-gallery-picker',
        targetEntity: 'item',
        catalogs: CATALOGS,
        facets: FACETS,
        helperText: {
          label: 'Notice you can no longer select additional entities. Remove a current selection to see the "add" button re-appear. Open the picker and notice that it also keeps track of the current selection and indicates when you\'ve exceeded the max.'
        }
      }
    },
    {
      label: 'Required gallery picker',
      scope: '/properties/requiredGallery',
      type: 'Control',
      options: {
        control: 'hub-field-input-gallery-picker',
        targetEntity: 'item',
        catalogs: CATALOGS,
        facets: FACETS,
        helperText: {
          label: "Remove the default selection to see the custom error message"
        },
        messages: [
          {
            type: "ERROR",
            keyword: "required",
            icon: true,
            label: "This field is required"
          }
        ]
      }
    },
    {
      label: 'Gallery picker with a tooltip',
      scope: '/properties/galleryWithTooltip',
      type: 'Control',
      options: {
        control: 'hub-field-input-gallery-picker',
        targetEntity: 'item',
        catalogs: CATALOGS,
        facets: FACETS,
        tooltip: {
          label: 'This is tooltip text'
        }
      }
    },
    {
      label: 'Gallery picker with canReorder diabled',
      scope: '/properties/galleryWithCanReorderDisabled',
      type: 'Control',
      options: {
        control: 'hub-field-input-gallery-picker',
        targetEntity: 'item',
        catalogs: CATALOGS,
        facets: FACETS,
        canReorder: false,
      }
    },
    {
      label: 'Gallery picker with launch action to workspace',
      scope: '/properties/galleryWithLaunchAction',
      type: 'Control',
      options: {
        control: 'hub-field-input-gallery-picker',
        targetEntity: 'item',
        catalogs: CATALOGS,
        facets: FACETS,
        linkTarget: "workspaceRelative",
      },
    }
  ]
};

export const VALUES = {
  galleryWithMaxSelection: [ 'c1a3ea9d4518498795206c1b4ec3ce48', 'a3ace68c29d847f2bda6f85c60744a9d' ]
}
