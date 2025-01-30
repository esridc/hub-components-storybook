/**
 * A list item interface to render in the list editor.
 * @interface
 */
export interface IListItem {
  key: string;
  label: string;
  description?: string;
  hidden?: boolean;
  [key: string]: any;
}
/**
 * Types of ways to edit an item in the list
 *
 * modal - edit the item in a calcite-modal using a form (default)
 * flow - edit the item in a calcite-flow where changes are automatically saved
 */
export declare enum ListEditModeTypes {
  FLOW = "flow",
  MODAL = "modal"
}
