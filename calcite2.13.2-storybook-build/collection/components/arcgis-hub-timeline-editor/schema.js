import { TIMELINE_STAGE_STATUSES } from "@esri/hub-common";
import { getIconForStatus } from "../../utils/get-icon-for-status";
export const TIMELINE_SCHEMA = {
  required: [],
  type: 'object',
  properties: {
    title: {
      type: 'string',
      maxLength: 255
    },
    description: {
      type: 'string',
      maxLength: 500
    },
    canCollapse: {
      type: 'boolean'
    }
  }
};
export const TIMELINE_UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      labelKey: 'title',
      scope: '/properties/title',
      type: 'Control'
    },
    {
      labelKey: 'description',
      scope: '/properties/description',
      type: 'Control',
      options: {
        control: 'hub-field-input-input',
        type: 'textarea'
      }
    }
  ]
};
export const STAGE_SCHEMA = {
  required: ['title'],
  type: 'object',
  properties: {
    title: {
      type: 'string',
      maxLength: 255,
      minLength: 1
    },
    timeframe: {
      type: 'string',
    },
    stageDescription: {
      type: 'string',
      maxLength: 500
    },
    link: {
      type: 'object',
      properties: {
        href: {
          type: 'string',
          if: { minLength: 1 },
          then: { format: "url" }
        },
        title: {
          type: 'string'
        }
      }
    },
    status: {
      type: 'string',
      default: 'notStarted'
    }
  }
};
export const STAGE_UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      labelKey: 'title',
      scope: '/properties/title',
      type: 'Control',
      options: {
        messages: [
          {
            type: "ERROR",
            keyword: "required",
            icon: true,
            labelKey: "titleRequiredError"
          }
        ]
      }
    },
    {
      labelKey: 'timeframe',
      scope: '/properties/timeframe',
      type: 'Control'
    },
    {
      labelKey: 'stageDescription',
      scope: '/properties/stageDescription',
      type: 'Control',
      options: {
        control: 'hub-field-input-input',
        type: 'textarea'
      }
    },
    {
      labelKey: 'linkHref',
      scope: '/properties/link/properties/href',
      type: 'Control',
      options: {
        helperText: {
          labelKey: 'linkHrefHelperText'
        },
        messages: [
          {
            type: "ERROR",
            keyword: "format",
            icon: true,
            labelKey: "linkHrefFormatError"
          },
          {
            type: "ERROR",
            keyword: "if",
            hidden: true
          }
        ]
      }
    },
    {
      labelKey: 'linkTitle',
      scope: '/properties/link/properties/title',
      type: 'Control'
    },
    {
      labelKey: 'status',
      scope: '/properties/status',
      type: 'Control',
      options: {
        control: 'hub-field-input-combobox',
        selectionMode: 'single',
        placeholder: "{{setStatus:translate}}",
        items: Object.keys(TIMELINE_STAGE_STATUSES).map(status => {
          return {
            value: status,
            label: `{{${status}:translate}}`,
            icon: getIconForStatus(status)
          };
        })
      }
    }
  ]
};
