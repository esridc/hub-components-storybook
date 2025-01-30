/**
 * Types of ways to edit an item in the list
 *
 * modal - edit the item in a calcite-modal using a form (default)
 * flow - edit the item in a calcite-flow where changes are automatically saved
 */
var ListEditModeTypes;
(function (ListEditModeTypes) {
  ListEditModeTypes["FLOW"] = "flow";
  ListEditModeTypes["MODAL"] = "modal";
})(ListEditModeTypes || (ListEditModeTypes = {}));

export { ListEditModeTypes as L };
