import { CORNERS, DROP_SHADOWS, IMAGE_TYPES } from "../interfaces";
declare const _default: {
  title: string;
  component: string;
  argTypes: {
    api: {
      options: string[];
      control: {
        type: string;
      };
    };
    corners: {
      options: CORNERS[];
      control: {
        type: string;
      };
    };
    imageType: {
      options: IMAGE_TYPES[];
      control: {
        type: string;
      };
    };
    layoutOptions: {
      options: string[];
      control: {
        type: string;
      };
    };
    linkTarget: {
      options: string[];
      control: {
        type: string;
      };
    };
    shadow: {
      options: DROP_SHADOWS[];
      control: {
        type: string;
      };
    };
    selectionMode: {
      options: string[];
      control: {
        type: string;
      };
    };
  };
  decorators: any[];
  parameters: {
    actions: {
      handles: string[];
    };
  };
};
export default _default;
export declare const ItemSearch: any;
export declare const ItemDisplay: any;
export declare const GroupSearch: any;
export declare const GroupDisplay: any;
export declare const MapLayout: any;
