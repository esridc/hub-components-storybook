import { IFacet } from "../../utils/types";
declare const _default: {
  title: string;
  component: string;
  parameters: {
    withAuth: {
      components: string[];
    };
    actions: {
      handles: string[];
    };
  };
  decorators: any[];
};
export default _default;
export declare const Default: {
  (args: any): string;
  args: {
    groupIds: string[];
    allowAdd: boolean;
    allowRemove: boolean;
    metadataMode: string;
    wellKnownPickerCatalog: string;
    pickerFacets: IFacet[];
    pickerToggleLabel: string;
    showEmptyState: boolean;
  };
  storyName: string;
};
