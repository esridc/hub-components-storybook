import { h } from "@stencil/core";
/**
 * Converts an array of facet options into a tree.
 *
 * Implementation notes:
 * 1) There MUST be an option for EVERY tree node. However, the options array doesn't have to be in parent-child order,
 * 2) All option keys MUST prefixed with a `/` (e.g. `/categories/business`)
 * 3) If the created tree's root only has one child, then the child is returned instead
 * 4) The result tree's root is meant to be an entry point for recursive processing. DO NOT display in the UI!
 *
 * @param options flat array of options to convert
 * @returns a tree representation of the options. Every node except the root is guaranteed to have an option attached.
 */
export const createTree = (options) => {
  const rawTree = createRawTree(options);
  // If the tree only has 1 child, make the child the new top-level node
  const children = getChildren(rawTree);
  return children.length === 1 ? children[0] : rawTree;
};
export const createRawTree = (options) => {
  const parentTree = { label: 'root', children: {}, option: null };
  options.forEach(opt => {
    const path = opt.key.slice(1).split('/');
    addTreeBranches(parentTree, opt, path);
  });
  return parentTree;
};
/**
 * Akin to mkdir -p, this function recursively traverses
 * a tree path and creates the final indicated node. Also
 * creates intermediary nodes if they do not exist.
 *
 * @param subtree the current root node
 * @param facetOption the facet option to be added to the final node
 * @param path the remaining path to the final node
 */
export const addTreeBranches = (subtree, facetOption, path) => {
  if (!path.length) {
    subtree.label = facetOption.label;
    subtree.option = facetOption;
  }
  else {
    const nextPath = path.shift();
    const nextSubTree = subtree.children[nextPath] || { label: nextPath, children: {}, option: null };
    subtree.children[nextPath] = nextSubTree;
    addTreeBranches(nextSubTree, facetOption, path);
  }
};
/**
 * Returns whether a tree has any child nodes
 */
export const hasChildren = (tree) => !!getChildren(tree).length;
/**
 * Returns an array of child nodes
 */
export const getChildren = (tree) => Object.values(tree.children);
/**
 * Returns whether an entire tree has been selected
 */
export const isTreeSelected = (tree) => {
  const isNodeSelected = tree.option.selected;
  return (hasChildren(tree))
    // Parent node, verify that node and all children are selected
    ? isNodeSelected && getChildren(tree).every(isTreeSelected)
    // Leaf node, return whether individual option is selected
    : isNodeSelected;
};
/**
 * Recursively generates the jsx for displaying an IFacetOptionTree
 *
 * @param subtree current subtree node
 * @returns a fully rendered subtree
 */
export const renderSubtree = (subtree, topLevelIndex) => {
  // Set the telemetry index for the option
  subtree.option._telemetryIndex = topLevelIndex;
  return h("calcite-tree-item", { "data-key": subtree.option.key, selected: subtree.option.selected }, h("div", { class: "option-label" }, subtree.label), hasChildren(subtree) &&
    h("calcite-tree", { slot: "children" }, getChildren(subtree).map(childTree => renderSubtree(childTree, topLevelIndex))));
};
export const getSelectionDifference = (oldKeys, newKeys) => {
  const removedKeys = oldKeys.filter(o => !newKeys.includes(o));
  const addedKeys = newKeys.filter(n => !oldKeys.includes(n));
  let result = null;
  if (removedKeys.length) {
    result = { operation: 'removed', keys: removedKeys };
  }
  else if (addedKeys.length) {
    result = { operation: 'added', keys: addedKeys };
  }
  return result;
};
export const getTreeOptionLabel = (key) => {
  const segments = key.split('/');
  return segments[segments.length - 1];
};
