import { BBox, IDateRange } from "@esri/hub-common";
/**
 * @private
 * Generic key/value type for storing component state
 */
export interface IComponentState {
  [key: string]: string;
}
export declare type FacetOptionChangePayload = {
  key: string;
  optionKey: string;
  checked: boolean;
  optionIndex?: number;
};
/**
 * Typed event payload that includes state
 */
export interface IStateEventPayload<T> {
  state: IComponentState;
  payload: T;
}
export declare type DateRangeFacetChangePayload = {
  key: string;
  value: IDateRange<string>;
};
export declare type MapFacetChangePayload = {
  key: string;
  value: BBox;
};
