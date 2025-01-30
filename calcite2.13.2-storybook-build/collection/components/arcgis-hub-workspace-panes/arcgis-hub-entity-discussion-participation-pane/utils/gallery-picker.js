export const getCatalogs = (intl) => {
  return [{
      schemaVersion: 1,
      title: intl.t('channelsLabel'),
      scopes: {},
      collections: [{
          label: intl.t('channelsLabel'),
          key: 'channels',
          targetEntity: 'channel',
          scope: {
            targetEntity: 'channel',
            filters: [],
            collection: 'channel'
          },
          include: ['groups']
        }]
    }];
};
export const getFacets = (intl) => {
  return [{
      label: intl.t('accessLabel'),
      key: 'access',
      display: 'multi-select',
      operation: 'OR',
      options: [
        {
          label: intl.t('optionPublicLabel'),
          key: 'public',
          selected: false,
          predicates: [{
              access: 'public'
            }]
        },
        {
          label: intl.t('optionOrganizationLabel'),
          key: 'organization',
          selected: false,
          predicates: [{
              access: 'org'
            }]
        },
        {
          label: intl.t('optionPrivateLabel'),
          key: 'private',
          selected: false,
          predicates: [{
              access: 'private'
            }]
        },
      ]
    }];
};
