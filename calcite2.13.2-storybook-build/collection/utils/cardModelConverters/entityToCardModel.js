import { defaultEntityToCardModel } from './internal/defaultConverters';
import { groupToCardModel } from './internal/groupConverters';
/**
 * Convert a HubEntity into an IHubCardViewModel. This
 * function delegates to the appropriate conversion function
 * based on the HubEntity type.
 *
 * In order to streamline development, these functions have not
 * been hoisted to hub.js.
 *
 * @param entity
 * @param context
 * @param opts
 * @returns
 */
export const entityToCardModel = (entity, layout, context, intl, opts) => {
  // default conversion function
  let fn;
  // override based on entity type
  switch (entity.type) {
    case 'Group':
      fn = groupToCardModel;
      break;
    default:
      fn = defaultEntityToCardModel;
      break;
  }
  // process the entity
  return fn(entity, layout, context, intl, opts);
};
