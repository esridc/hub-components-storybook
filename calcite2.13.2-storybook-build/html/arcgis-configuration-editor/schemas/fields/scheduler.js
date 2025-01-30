export const SUBTITLE = "The scheduler component is a flexible tool for those making use of the already flexible configuration editor. It takes in an initial value, or defaults to `mode: \"automatic\"`, and allows developers to provide different scheduling options. These options are know as `cadence`s, and those are `daily`, `weekly`, `monthly`, and `yearly` -- each of these being `mode: \"scheduled\"`. There are two other modes that don't require cadences, `mode: \"automatic\"` and `mode: \"manual\"`.";

export const SCHEMA = {
  type: 'object',
  properties: {
    schedule: {
      type: 'object',
    },
  }
};

// either add the value the `options` section, or get it from the scope
export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      label: 'Scheduler Input: Single Format',
      scope: '/properties/schedule',
      type: 'Control',
      options: {
        control: 'hub-field-input-scheduler',
        format: 'single',
        inputs: [ // can only have one input in this format
          // { type: "daily" },
          // { type: "weekly" },
          // { type: "monthly" },
          { type: "yearly" },
        ],
      }
    },
    {
      label: 'Scheduler Input: `select` Format',
      scope: '/properties/schedule',
      type: 'Control',
      options: {
        control: 'hub-field-input-scheduler',
        format: 'select', // could be 'single' as well
        inputs: [
          { type: "automatic" },
          { type: "daily" },
          { type: "weekly" },
          { type: "monthly" },
          { type: "yearly" },
          { type: "manual" }
        ],
      }
    },
    {
      label: 'Just default and manual options',
      scope: '/properties/schedule',
      type: 'Control',
      options: {
        control: 'hub-field-input-scheduler',
        format: 'select',
        inputs: [
          { 
            label: "Default but with different label and tooltip/action", 
            type: "automatic", 
            helperActionIcon: "slice", 
            helperActionText: "This could say whatever you want! And the icon is customizable too :)"
          }
        ],
      }
    },
    {
      label: 'Disabled `select` Format',
      scope: '/properties/schedule',
      type: 'Control',
      options: {
        control: 'hub-field-input-scheduler',
        format: 'select',
        disabled: true,
        inputs: [
          { type: "automatic" },
          { type: "daily" },
          { type: "weekly" },
          { type: "monthly" },
          { type: "yearly" },
          { type: "manual", helperActionIcon: "information-f", helperActionText: "Use this option to manually update the search index and cached download files for this item." }
        ],
      }
    },
  ]
};

// export const VALUES = {
//   schedule: {
//     mode: "scheduled",
//     cadence: "daily",
//     hour: 13,
//     timezone: "Africa/Accra"
//   }
// }

// export const VALUES = {
//   schedule: {
//     mode: "scheduled",
//     cadence: "weekly",
//     hour: 17,
//     timezone: "Africa/Accra"
//   }
// }

// export const VALUES = {
//   schedule: {
//     mode: "scheduled",
//     cadence: "monthly",
//     hour: 20,
//     date: 15,
//     timezone: "Africa/Accra"
//   }
// }

export const VALUES = {
  schedule: {
    mode: "scheduled",
    cadence: "yearly",
    month: 5,
    date: 4,
    hour: 7,
    timezone: "Africa/Accra"
  }
}