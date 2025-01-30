/**
 * valid item predicate properties
 *
 * NOTE: we will continue to add more properties here
 * as we extend the predicate builder field
 */
const ITEM_PREDICATE_PROPERTIES = [
  "type",
  "group"
];
/**
 * valid event predicate properties
 *
 * NOTE: we will continue to add more properties here
 * as we extend the predicate builder field
 */
const EVENT_PREDICATE_PROPERTIES = [
  "group",
  "occurrence"
];

export { EVENT_PREDICATE_PROPERTIES as E, ITEM_PREDICATE_PROPERTIES as I };
