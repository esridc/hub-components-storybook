import { getFamily } from '@esri/hub-common';
import { getAgoTypes } from '../../../../../../../../../utils/get-ago-types';
import { rawAgoItemTypes } from '../../../../../../../../../utils/resources/raw-ago-item-types';
import { isNil } from '../../../../../../../../../utils/is-nil';
/**
 *
 * @param targetEntity
 * @param intl
 */
export const getTypePredicateItemsWithChildren = (targetEntity, intl) => {
  let comboboxUiItems = [];
  switch (targetEntity) {
    case "item":
      comboboxUiItems = getItemTargetEntityTypeItems(intl);
      break;
    /**
     * TODO: if we reuse the type predicate (group types, user types, etc),
     * we'll add more combobox item cases here
    */
  }
  return comboboxUiItems;
};
/**
 * Helper function to convert raw ago item types into combobox items that can be rendered in the UI.
 * This groups the combobox items by family so that the items are nested, and adds the appropriate icon.
 * We also include the family as a top-level item in the combobox so that a type expansion like "$documents" can be used in the query.
 * @param intl
 * @returns
 */
export const getItemTargetEntityTypeItems = (intl) => {
  const familyToIndex = {};
  const comboboxItems = getAgoTypes(rawAgoItemTypes).reduce((acc, type) => {
    // grab the family first, since we organize by this
    const family = getFamily(type);
    // only non-event types are added to combobox
    if (family && family !== "event") {
      // if we have yet to see the family (and no events since we are in items)
      if (isNil(familyToIndex[family])) {
        // save the family and the index where we added it
        familyToIndex[family] = acc.length;
        acc.push({
          label: intl.t(`valueConfigs.type.${family}.label`),
          // we add a $ to the value to prepare it for predicate expansion later
          value: `$${family}`,
          children: [],
        });
      }
      // add the type to the family
      acc[familyToIndex[family]].children.push({
        label: type,
        value: type
      });
    }
    // if we don't get a family, log that type
    else if (!family) {
      console.error("No family is defined for type: ", type);
    }
    return acc;
  }, []);
  // sort the resulting list by family alphabetically
  comboboxItems.sort((a, b) => a.label.localeCompare(b.label));
  return comboboxItems;
};
