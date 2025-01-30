import { PostSort, SortOrder } from '@esri/hub-discussions';
declare const _default: {
  title: string;
  component: string;
  decorators: any[];
};
export default _default;
export declare const PostList: {
  (): string;
  args: {
    columns: number;
    showCounts: boolean;
    showLayoutActions: boolean;
    showSearchActions: boolean;
    showSortActions: boolean;
    layout: string;
    parentIds: any[];
    access: string[];
    status: string[];
    entityType: string;
    entityId: string;
    start: number;
    isHub: boolean;
    isMobile: boolean;
    showChannelAvatar: boolean;
    showChannelName: boolean;
    showLocations: boolean;
    sortBy: PostSort;
    sortOrder: SortOrder;
  };
  argTypes: {
    hasMap: {
      control: boolean;
    };
    unsavedFeatures: {
      control: boolean;
    };
    unsavedRelatedFeatures: {
      control: boolean;
    };
    unsavedExistingFeatures: {
      control: boolean;
    };
    entity: {
      control: boolean;
    };
    discussion: {
      control: boolean;
    };
    displayFieldValid: {
      control: boolean;
    };
    displayFieldValue: {
      control: boolean;
    };
    displayFieldKey: {
      control: boolean;
    };
    locationId: {
      control: boolean;
    };
    nextStart: {
      control: boolean;
    };
    total: {
      control: boolean;
    };
    num: {
      control: boolean;
    };
    items: {
      control: boolean;
    };
    geometry: {
      control: boolean;
    };
    featureGeometry: {
      control: boolean;
    };
    renderPost: {
      control: boolean;
    };
    access: {
      options: string[];
      control: {
        type: string;
      };
    };
    status: {
      options: string[];
      control: {
        type: string;
      };
    };
    createdBefore: {
      control: string;
    };
    createdAfter: {
      control: string;
    };
    updatedBefore: {
      control: string;
    };
    updatedAfter: {
      control: string;
    };
    entityType: {
      options: string[];
      control: {
        type: string;
      };
    };
    disableSelectExistingLocation: {
      control: boolean;
    };
    sortBy: {
      options: PostSort[];
      control: {
        type: string;
      };
    };
    sortOrder: {
      options: SortOrder[];
      control: {
        type: string;
      };
    };
  };
  storyName: string;
};
