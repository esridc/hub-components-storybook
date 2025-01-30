import { IFilter } from "@esri/hub-common";
/** internal filter interface for the editing experience */
export declare type _IFilter = IFilter & {
  key: string;
  isValid: boolean;
};
