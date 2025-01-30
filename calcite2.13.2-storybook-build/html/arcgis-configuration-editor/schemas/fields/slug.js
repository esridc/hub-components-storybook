export const SUBTITLE = `Slug - this tests a keyword and not an input`;

const SLUG_PATTERN = "^[a-z0-9]+(?:-[a-z0-9]+-*)*$";

// start w/ existing QA project (auth as paige_pa)
const id = 'd2ed6efbc9904fbc93ff87d0546dfe09'
// const name = 'Harness Project'
const orgUrlKey = 'qa-pre-a-hub';
const _slug = 'harness-project';
const slug = `${orgUrlKey}|${_slug}`;

export const SCHEMA = {
  "$async": true,
  "type": "object",
  "properties": {
    "_slug": {
      "type": "string",
      "pattern": SLUG_PATTERN
      // NOTE: isUniqueSlug keyword is conditionally applied below
    }
  },
  allOf: [
    {
      // only do async isUniqueSlug check if the slug is valid
      if: { properties: { _slug: { pattern: SLUG_PATTERN } } },
      then: { properties: { _slug: { isUniqueSlug: { id, orgUrlKey } } } }
    }
  ]
};

export const UI_SCHEMA = {
  "type": "Layout",
  "elements": [
    {
      "label": "Slug",
      "scope": "/properties/_slug",
      "type": "Control",
      options: {
        control: "hub-field-input-input",
        helperText: {
          label: "Helper text for slug",
          // labelKey: `${i18nScope}.fields.slug.helperText`,
        },
        messages: [
          {
            type: "ERROR",
            keyword: "pattern",
            icon: true,
            label: 'Error: Slug must be lowercase alphanumeric characters separated by hyphens.',
            // labelKey: `${i18nScope}.fields.slug.patternError`,
          },
          {
            type: "ERROR",
            keyword: "isUniqueSlug",
            icon: true,
            label: 'Error: A project with this slug already exists.',
            // labelKey: `${i18nScope}.fields.slug.uniqueError`,
          },
        ],
      },
    }
  ]
};

export const VALUES = {
  // this is added to the values in toEditor()
  _slug,
  // these exist on the entity already
  // but are not used by this composite field
  orgUrlKey,
  slug
};
