import { IQuery } from "@esri/hub-common";
declare const _default: {
  title: string;
  component: string;
  decorators: any[];
};
export default _default;
export declare const Default: {
  (args: any): string;
  args: {
    term: string;
    searchApi: string;
    matchRecent: boolean;
    matchSearch: boolean;
    matchLocation: boolean;
    clearButton: boolean;
    searchButton: boolean;
    showSearchIcon: boolean;
    disableTelemetry: boolean;
    placeholder: string;
    scale: string;
    readOnly: string;
    query: IQuery;
  };
  storyName: string;
};
