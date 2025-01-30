import { checkPermission } from "@esri/hub-common";
export const pickerCatalogDefinition = {
  schemaVersion: 1,
  scopes: {
    communityUser: {
      targetEntity: 'communityUser',
      filters: [
        {
          predicates: [{ q: "*" }]
        }
      ]
    },
  },
  collections: [
    {
      key: 'user',
      label: 'Users',
      scope: {
        targetEntity: 'communityUser',
        filters: [
          {
            predicates: [{ q: "*" }]
          }
        ]
      },
      targetEntity: 'communityUser',
    }
  ]
};
export function getUserPickerFacets(group, context, intl, i18nScope = "") {
  var _a, _b;
  // Get trusted orgs that aren't the current user's org or the community org
  const trustedOrgIds = context.trustedOrgIds && (context === null || context === void 0 ? void 0 : context.trustedOrgIds.filter(orgId => {
    var _a;
    return orgId !== ((_a = context === null || context === void 0 ? void 0 : context.currentUser) === null || _a === void 0 ? void 0 : _a.orgId) && orgId !== (context === null || context === void 0 ? void 0 : context.communityOrgId);
  }));
  // Add My org facet
  const facet = {
    label: "From",
    key: 'from',
    display: 'single-select',
    operation: 'AND',
    options: [
      {
        label: intl.t(`${i18nScope}addMembers.modal.org`),
        key: 'org',
        selected: true,
        predicates: [
          {
            orgid: (_a = context === null || context === void 0 ? void 0 : context.currentUser) === null || _a === void 0 ? void 0 : _a.orgId
          },
          {
            group: {
              not: group === null || group === void 0 ? void 0 : group.id
            }
          }
        ]
      }
    ]
  };
  // Add My community facet if the group does not have a membership access of organization
  // AND there is a community org id
  if ((group === null || group === void 0 ? void 0 : group.membershipAccess) && (group === null || group === void 0 ? void 0 : group.membershipAccess) !== 'organization'
    && (context === null || context === void 0 ? void 0 : context.communityOrgId)) {
    facet.options.push({
      label: intl.t(`${i18nScope}addMembers.modal.community`),
      key: 'community',
      selected: false,
      predicates: [
        {
          orgid: context === null || context === void 0 ? void 0 : context.communityOrgId,
          searchUserAccess: 'includeTrustedOrgs'
        },
        {
          group: {
            not: group === null || group === void 0 ? void 0 : group.id
          }
        }
      ]
    });
  }
  // Add a My partners facet if the group does not have a membership access of organization
  // AND there are trusted orgs
  // AND the user has 'portal:admin:assignToGroups' AND 'portal:user:invitePartneredCollaborationMembers' OR 'portal:user:addExternalMembersToGroup'
  if ((group === null || group === void 0 ? void 0 : group.membershipAccess) && (group === null || group === void 0 ? void 0 : group.membershipAccess) !== 'organization'
    && (trustedOrgIds === null || trustedOrgIds === void 0 ? void 0 : trustedOrgIds.length) > 0
    && checkPermission('platform:portal:admin:assignToGroups', context).access
    && (checkPermission('platform:portal:user:invitePartneredCollaborationMembers', context).access || checkPermission('platform:portal:user:addExternalMembersToGroup', context).access)) {
    facet.options.push({
      label: intl.t(`${i18nScope}addMembers.modal.partner`),
      key: 'partners',
      selected: false,
      predicates: [
        {
          orgid: trustedOrgIds,
          searchUserAccess: 'includeTrustedOrgs'
        },
        {
          group: {
            not: group === null || group === void 0 ? void 0 : group.id
          }
        }
      ]
    });
  }
  // Add a World facet if the group has a membership access of anyone
  // and it is not a shared update group
  if ((group === null || group === void 0 ? void 0 : group.membershipAccess) && (group === null || group === void 0 ? void 0 : group.membershipAccess) === 'anyone'
    && !(group === null || group === void 0 ? void 0 : group.isSharedUpdate)) {
    facet.options.push({
      label: intl.t(`${i18nScope}addMembers.modal.world`),
      key: 'world',
      selected: false,
      predicates: [
        {
          // This generates a query that looks like: (orgid: [0 TO \\{])
          // Which means "Only show users in orgs, do not show public users"
          // It is platform crazy sauce.
          orgid: { type: 'range', from: "0", to: "\\{" }
        },
        {
          orgid: {
            not: [(_b = context === null || context === void 0 ? void 0 : context.currentUser) === null || _b === void 0 ? void 0 : _b.orgId, context === null || context === void 0 ? void 0 : context.communityOrgId]
          }
        },
        {
          group: {
            not: group === null || group === void 0 ? void 0 : group.id
          }
        }
      ]
    });
  }
  return [facet];
}
