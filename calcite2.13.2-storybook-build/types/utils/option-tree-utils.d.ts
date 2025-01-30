import { VNode } from "../stencil-public-runtime";
import { IFacetOption } from "./types/IFacetOption";
import { IFacetOptionTree } from "./types/IFacetOptionTree";
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
export declare const createTree: (options: IFacetOption[]) => IFacetOptionTree;
export declare const createRawTree: (options: IFacetOption[]) => IFacetOptionTree;
/**
 * Akin to mkdir -p, this function recursively traverses
 * a tree path and creates the final indicated node. Also
 * creates intermediary nodes if they do not exist.
 *
 * @param subtree the current root node
 * @param facetOption the facet option to be added to the final node
 * @param path the remaining path to the final node
 */
export declare const addTreeBranches: (subtree: IFacetOptionTree, facetOption: IFacetOption, path: string[]) => void;
/**
 * Returns whether a tree has any child nodes
 */
export declare const hasChildren: (tree: IFacetOptionTree) => boolean;
/**
 * Returns an array of child nodes
 */
export declare const getChildren: (tree: IFacetOptionTree) => IFacetOptionTree[];
/**
 * Returns whether an entire tree has been selected
 */
export declare const isTreeSelected: (tree: IFacetOptionTree) => boolean;
/**
 * Recursively generates the jsx for displaying an IFacetOptionTree
 *
 * @param subtree current subtree node
 * @returns a fully rendered subtree
 */
export declare const renderSubtree: (subtree: IFacetOptionTree, topLevelIndex: number) => VNode;
export interface ITreeSelectionDifference {
  keys: string[];
  operation: 'added' | 'removed';
}
export declare const getSelectionDifference: (oldKeys: string[], newKeys: string[]) => ITreeSelectionDifference;
export declare const getTreeOptionLabel: (key: string) => string;
