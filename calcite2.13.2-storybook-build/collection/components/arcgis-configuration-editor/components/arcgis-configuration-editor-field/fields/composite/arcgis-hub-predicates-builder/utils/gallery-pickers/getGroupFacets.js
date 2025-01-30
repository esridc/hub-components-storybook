/**
 * returns default group facets to be used in various
 * group picker predicate experiences
 *
 * @param context contextual portal and auth info
 * @param i18nScope intl scope for translations
 */
export const getGroupFacets = (context, i18nScope) => {
  var _a, _b, _c, _d;
  {
    const idsOfUserAdminGroups = context.currentUser.groups
      .reduce((acc, group) => {
      group.userMembership.memberType === 'admin' && acc.push(group.id);
      return acc;
    }, []);
    const facet = {
      label: `{{${i18nScope}.facet.label:translate}}`,
      key: 'from',
      display: 'single-select',
      operation: 'OR',
      options: [
        {
          label: `{{${i18nScope}.facet.myGroups:translate}}`,
          key: `{{${i18nScope}.facet.myGroups:translate}}`,
          selected: true,
          predicates: [
            {
              owner: context === null || context === void 0 ? void 0 : context.currentUser.username
            }
          ]
        },
        {
          label: `{{${i18nScope}.facet.myOrganization:translate}}`,
          key: `{{${i18nScope}.facet.myOrganization:translate}}`,
          selected: false,
          predicates: [
            {
              orgid: (_a = context === null || context === void 0 ? void 0 : context.currentUser) === null || _a === void 0 ? void 0 : _a.orgId,
              searchUserAccess: 'groupMember',
              searchUserName: (_b = context === null || context === void 0 ? void 0 : context.currentUser) === null || _b === void 0 ? void 0 : _b.username,
              isviewonly: false
            },
            {
              orgid: (_c = context === null || context === void 0 ? void 0 : context.currentUser) === null || _c === void 0 ? void 0 : _c.orgId,
              id: idsOfUserAdminGroups
            }
          ]
        }
      ]
    };
    if (context === null || context === void 0 ? void 0 : context.communityOrgId) {
      facet.options.push({
        label: `{{${i18nScope}.facet.myCommunity:translate}}`,
        key: `{{${i18nScope}.facet.myCommunity:translate}}`,
        selected: false,
        predicates: [
          {
            orgid: context === null || context === void 0 ? void 0 : context.communityOrgId,
            searchUserAccess: 'groupMember',
            searchUserName: (_d = context === null || context === void 0 ? void 0 : context.currentUser) === null || _d === void 0 ? void 0 : _d.username,
            isviewonly: false
          },
          {
            orgid: context === null || context === void 0 ? void 0 : context.communityOrgId,
            id: idsOfUserAdminGroups
          }
        ]
      });
    }
    return [facet];
  }
};
