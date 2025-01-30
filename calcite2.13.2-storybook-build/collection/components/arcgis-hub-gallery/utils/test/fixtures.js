export const typeFacet = {
  "aggLimit": 100,
  "display": "multi-select",
  "field": "type",
  "key": "type",
  "label": "facets.type.label",
  "operation": "OR",
  "options": [],
  "validTargetEntities": ["item"],
};
export const accessFacet = {
  "label": "facets.access.label",
  "key": "access",
  "display": "multi-select",
  "field": "access",
  "options": [],
  "operation": "OR",
  "validTargetEntities": ["item"],
};
export const licenseFacet = {
  "label": "facets.license.label",
  "key": "license",
  "display": "multi-select",
  "field": "license",
  "operation": "OR",
  "options": [],
  aggLimit: 100,
  tooltip: "facets.license.tooltip",
  "validTargetEntities": [],
};
export const tagsFacet = {
  "aggLimit": 15,
  "display": "multi-select",
  "field": "tags",
  "key": "tags",
  "label": "facets.tags.label",
  "operation": "OR",
  "options": [],
  "validTargetEntities": ["item"],
};
export const groupAccessFacet = {
  label: "facets.group.sharing.label",
  key: 'access',
  display: 'multi-select',
  operation: 'OR',
  options: [
    {
      label: "facets.group.sharing.private",
      key: 'private',
      selected: false,
      predicates: [{
          access: ['private', 'org']
        }]
    },
    {
      label: "facets.group.sharing.public",
      key: 'public',
      selected: false,
      predicates: [{
          access: 'public'
        }]
    }
  ],
  validTargetEntities: ["group"],
};
export const eventFromFacet = {
  label: "facets.event.from.label",
  key: 'from',
  display: 'single-select',
  operation: 'OR',
  options: [
    {
      label: "facets.event.from.myContent",
      key: 'myContent',
      selected: true,
      predicates: [
        {
          owner: "mock-user-id",
        },
      ],
    },
    {
      label: "facets.event.from.myOrganization",
      key: 'myOrganization',
      selected: false,
      predicates: [
        {
          orgId: "mock-org-id",
        },
      ],
    },
    {
      label: "facets.event.from.world",
      key: 'world',
      selected: false,
      predicates: [
        {
          access: ['public', 'private', 'org'],
        },
      ],
    },
  ],
  validTargetEntities: ["event"],
};
