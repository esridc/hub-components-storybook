import { EntityType } from '@esri/hub-common';
import { ComponentIntl } from '../../../../../../../../../utils/stencil-intl';
/**
 *
 * @param targetEntity
 * @param intl
 */
export declare const getTypePredicateItemsWithChildren: (targetEntity: EntityType, intl: ComponentIntl) => any[];
/**
 * Helper function to convert raw ago item types into combobox items that can be rendered in the UI.
 * This groups the combobox items by family so that the items are nested, and adds the appropriate icon.
 * We also include the family as a top-level item in the combobox so that a type expansion like "$documents" can be used in the query.
 * @param intl
 * @returns
 */
export declare const getItemTargetEntityTypeItems: (intl: ComponentIntl) => any[];
