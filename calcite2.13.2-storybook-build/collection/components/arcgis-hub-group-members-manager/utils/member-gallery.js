export function getMemberGalleryFacets(intl) {
  return [
    {
      label: intl.t("facets.role.label"),
      key: 'access',
      display: 'single-select',
      field: 'access',
      options: [
        {
          label: intl.t("facets.role.all"),
          key: "all",
          selected: true,
          predicates: [],
        },
        {
          label: intl.t("facets.role.manager"),
          key: "admin",
          selected: false,
          predicates: [{
              memberType: "admin",
            }],
        },
        {
          label: intl.t("facets.role.member"),
          key: "member",
          selected: false,
          predicates: [{
              memberType: "member",
            }],
        }
      ],
      operation: 'OR',
    },
    {
      label: intl.t("facets.dateJoined.label"),
      key: 'joined',
      display: 'date-range',
      state: 'open',
      field: 'joined',
      max: new Date(),
    },
  ];
}
