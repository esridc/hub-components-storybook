import { HelpState } from "../../functional/help-state";
export const States = {
  isSpecifyInfo: (state) => state.tag === 'SpecifyInfo',
  isSelectGroups: (state) => state.tag === 'SelectGroups',
  isWorking: (state) => state.tag === 'Working',
  isConfirmation: (state) => state.tag === 'Confirmation',
  isFailure: (state) => state.tag === 'Failure',
};
export const DEFAULT_SPECIFY_INFO_STATE = {
  tag: 'SpecifyInfo',
  component: 'arcgis-configuration-editor',
  configurationValues: {},
  selectedGroupIds: [],
  stepIndex: 0
};
export const DEFAULT_SELECT_GROUPS_STATE = {
  tag: 'SelectGroups',
  component: 'arcgis-hub-gallery',
  selectedGroupIds: [],
  stepIndex: 1,
};
export const DEFAULT_WORKING_STATE = {
  tag: 'Working',
  action: 'migratePage',
  component: HelpState,
  componentArgs: {
    state: 'loading',
    headingKey: 'working.heading',
    loadingLabel: 'working.loadingLabel',
  },
  stepIndex: 2,
};
