import { IFacetOption } from "./IFacetOption";
/**
 * Represents a node in a Facet Option Tree
 */
export interface IFacetOptionTree {
  label: string;
  option: IFacetOption;
  children: {
    [key: string]: IFacetOptionTree;
  };
}
export interface TreeFacetChangePayload {
  key: string;
  optionKeys: string[];
  selected: boolean;
  topLevelIndex: number;
}
