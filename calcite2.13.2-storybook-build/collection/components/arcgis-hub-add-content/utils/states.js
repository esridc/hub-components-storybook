import { HelpState } from '../../functional/help-state';
export const States = {
  isSelectContent: (state) => state.tag === 'SelectContent',
  isCreateContent: (state) => state.tag === 'CreateContent',
  isSelectGroups: (state) => state.tag === 'SelectGroups',
  isWorking: (state) => state.tag === 'Working',
  isConfirmation: (state) => state.tag === 'Confirmation',
  isFailure: (state) => state.tag === 'Failure',
  isNotImplemented: (state) => state.tag === 'NotImplemented',
};
export const DEFAULT_SELECT_CONTENT_STATE = {
  tag: 'SelectContent',
  component: 'arcgis-hub-gallery',
  selectedContentIds: [],
  selectedGroupIds: [],
  stepIndex: 0
};
export const DEFAULT_CREATE_CONTENT_STATE = {
  tag: 'CreateContent',
  component: 'arcgis-hub-entity-editor',
  configurationValues: {},
  selectedGroupIds: [],
  stepIndex: 0
};
export const DEFAULT_SELECT_GROUPS_STATE = {
  tag: 'SelectGroups',
  component: 'arcgis-hub-gallery',
  selectedContentIds: [],
  selectedGroupIds: [],
  stepIndex: 1,
};
export const DEFAULT_WORKING_STATE = {
  tag: 'Working',
  component: HelpState,
  componentArgs: {
    state: 'loading',
    headingKey: 'working.heading',
    loadingLabel: 'working.loadingLabel',
  }
};
