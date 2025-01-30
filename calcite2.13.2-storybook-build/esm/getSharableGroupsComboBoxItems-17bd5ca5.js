/**
 * Filter an array of groups into the set the user has the rights to share content
 * into, and then convert them to UiSchemaComboboxItem array for use in the Entity Editor component
 */
function getSharableGroupsComboBoxItems(groups) {
    return groups.reduce((groupItems, group) => {
        var _a;
        const isEditGroup = group.capabilities.includes("updateitemcontrol");
        const memberType = (_a = group.userMembership) === null || _a === void 0 ? void 0 : _a.memberType;
        /**
         * a user can only share to a group if:
         * 1. the group is NOT view only
         * 2. their membership type in a view only group is "owner" or "admin"
         */
        const canShareToGroup = !group.isViewOnly ||
            (group.isViewOnly && ["owner", "admin"].includes(memberType));
        if (canShareToGroup) {
            groupItems.push({
                value: group.id,
                label: group.title,
                icon: isEditGroup ? "unlock" : "view-mixed",
            });
        }
        return groupItems;
    }, []);
}

export { getSharableGroupsComboBoxItems as g };
