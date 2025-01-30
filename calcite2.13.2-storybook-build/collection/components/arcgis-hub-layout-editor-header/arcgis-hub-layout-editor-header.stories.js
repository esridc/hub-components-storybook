import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
export default {
  title: 'Navigation/Layout Editor Header',
  component: 'arcgis-hub-layout-editor-header',
  argTypes: {
    entity: {
      control: {
        type: 'object'
      }
    },
    site: {
      control: {
        type: 'object'
      }
    }
  },
  decorators: [
    withRenderCallback('arcgis-hub-layout-editor-header', ($el, { args }) => {
      $el.entity = args.entity;
      $el.site = args.site;
    })
  ],
  parameters: {
    actions: {
      handles: ['arcgisHubUserProfileSignout', 'arcgisHubLayoutEditorHeaderShare', 'arcgisHubLayoutEditorHeaderPreviewPublished', 'arcgisHubLayoutEditorHeaderPreviewDraft', 'arcgisHubLayoutEditorHeaderPublish', 'arcgisHubLayoutEditorHeaderSave', 'arcgisHubLayoutEditorHeaderClone', 'arcgisHubLayoutEditorHeaderDelete', 'arcgisHubLayoutEditorHeaderSaveAsTemplate', 'hubTelemetry']
    }
  }
};
const defaultArgs = {
  entity: {
    id: "abc123",
    itemControl: "",
    owner: "mockOwner",
    schemaVersion: 1,
    tags: [],
    type: "Hub Page",
    canEdit: true,
    canDelete: true,
    name: "Mock Page",
    thumbnail: "cat.png",
    typeKeywords: [],
  },
  isDirty: false,
  isPublishing: false,
  isSaving: false,
  saveButtonDisabled: false,
  showClone: true,
  showDelete: true,
  site: {
    access: "public",
    id: "bc3",
    itemControl: "",
    owner: "mockOwner",
    schemaVersion: 1,
    tags: [],
    type: "Hub Site Application",
    canEdit: true,
    canDelete: true,
    name: "Mock Site",
    thumbnail: "cat.png",
    typeKeywords: [],
  }
};
export const Default = (args) => `
  <arcgis-hub-layout-editor-header
    is-dirty="${args.isDirty.toString()}"
    is-publishing="${args.isPublishing}"
    is-saving="${args.isSaving}"
    save-button-disabled="${args.saveButtonDisabled}"
    show-clone="${args.showClone}"
    show-delete="${args.showDelete}"
  ></arcgis-hub-layout-editor-header>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Layout Editor Header';
