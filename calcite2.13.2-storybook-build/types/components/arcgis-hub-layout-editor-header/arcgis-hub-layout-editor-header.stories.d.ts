declare const _default: {
  title: string;
  component: string;
  argTypes: {
    entity: {
      control: {
        type: string;
      };
    };
    site: {
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
export declare const Default: {
  (args: any): string;
  args: {
    entity: {
      id: string;
      itemControl: string;
      owner: string;
      schemaVersion: number;
      tags: any[];
      type: string;
      canEdit: boolean;
      canDelete: boolean;
      name: string;
      thumbnail: string;
      typeKeywords: any[];
    };
    isDirty: boolean;
    isPublishing: boolean;
    isSaving: boolean;
    saveButtonDisabled: boolean;
    showClone: boolean;
    showDelete: boolean;
    site: {
      access: string;
      id: string;
      itemControl: string;
      owner: string;
      schemaVersion: number;
      tags: any[];
      type: string;
      canEdit: boolean;
      canDelete: boolean;
      name: string;
      thumbnail: string;
      typeKeywords: any[];
    };
  };
  storyName: string;
};
