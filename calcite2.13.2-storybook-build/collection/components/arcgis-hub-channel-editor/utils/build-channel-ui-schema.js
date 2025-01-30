export const buildChannelUiSchema = (options) => {
  const { intl, isOrgAdmin, context, disabled } = options;
  return {
    type: 'Layout',
    elements: [
      {
        type: 'Section',
        labelKey: 'basicInfo.label',
        options: {
          headerTag: 'h3',
        },
        elements: [
          {
            labelKey: 'name.label',
            type: 'Control',
            scope: '/properties/name',
            options: {
              control: 'hub-field-input-input',
              messages: [
                {
                  type: 'ERROR',
                  keyword: 'required',
                  icon: true,
                  labelKey: 'validations.channelNameRequired',
                  allowShowBeforeInteract: true,
                }
              ],
            },
          },
        ],
      },
      {
        type: 'Section',
        labelKey: 'blockWords.label',
        options: {
          headerTag: 'h3',
        },
        elements: [
          {
            type: 'Control',
            scope: '/properties/blockWords',
            options: {
              control: 'hub-field-input-input',
              type: 'textarea',
              helperText: {
                labelKey: 'blockWords.helperText',
              },
              messages: [
                {
                  type: 'ERROR',
                  keyword: 'format',
                  icon: true,
                  label: intl.t('validations.blockWords'),
                },
              ],
            },
          },
        ],
      },
      {
        type: 'Section',
        labelKey: 'participants.label',
        elements: [
          {
            type: 'Control',
            scope: '/properties/access',
            options: {
              messages: [
                {
                  type: 'ERROR',
                  keyword: 'enum',
                  icon: true,
                  label: intl.t('validations.minChannelGroups'),
                  allowShowBeforeInteract: true,
                },
              ],
              control: 'hub-field-input-radio',
              icons: ['globe', 'organization', 'user'],
              disabled: [!isOrgAdmin, !isOrgAdmin],
              labels: [intl.t('access.public.label'), intl.t('access.organization.label'), intl.t('access.private.label')],
              descriptions: [
                intl.t('access.public.description'),
                intl.t('access.organization.description', { orgName: context.portal.name }),
                intl.t('access.private.description'),
              ],
              tooltips: [
                !disabled &&
                  !isOrgAdmin && {
                  text: intl.t('access.public.disabledTooltip'),
                  placement: 'top',
                },
                !disabled &&
                  !isOrgAdmin && {
                  text: intl.t('access.organization.disabledTooltip'),
                  placement: 'top',
                },
              ],
              helperText: {
                labelKey: 'participants.helperText',
              },
            },
          },
          {
            type: 'Slot',
            options: { name: 'participant-groups' },
          },
          {
            type: 'Control',
            labelKey: 'access.allowAsAnonymous.label',
            scope: '/properties/allowAsAnonymous',
            options: {
              control: 'hub-field-input-switch',
            },
          },
        ],
      },
      {
        type: 'Section',
        labelKey: 'manage.label',
        elements: [
          {
            type: 'Slot',
            options: { name: 'moderators' },
          },
        ],
      },
    ],
  };
};
