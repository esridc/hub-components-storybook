/**
 * Convert a HubEntityType to an EntityType
 * Exists in hub-common as an internal function
 * @param type
 * @returns
 */
export function getEntityTypeFromHubEntityType(type) {
  // Default to item, as it's the most common
  let etype = "item";
  // Some are just downcased, so we can check them with an array
  if (["group", "event", "user", "channel"].includes(type.toLowerCase())) {
    etype = type.toLocaleLowerCase();
  }
  // Group Member is just weird
  if (type.toLowerCase() === "group member") {
    etype = "groupMember";
  }
  return etype;
}
/**
 * Convert a type (e.g 'Event', 'Hub Site Application') to a
 * HubEntityType (e.g. 'event', 'site')
 * @param type
 * @returns
 */
export function getHubEntityTypeFromType(type) {
  let et = "content";
  switch (type) {
    case 'Event':
      et = 'event';
      break;
    case 'Discussion':
      et = 'discussion';
      break;
    case 'Group':
      et = 'group';
      break;
    case 'Hub Initiative':
      et = 'initiative';
      break;
    case 'Hub Project':
      et = 'project';
      break;
    case 'Hub Page':
      et = 'page';
      break;
    case 'Site Page':
      et = 'page';
      break;
    case 'Hub Site Application':
      et = 'site';
      break;
    case 'Site Application':
      et = 'site';
      break;
  }
  return et;
}
