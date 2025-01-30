import { BaseMachine } from './base-machine';
import { getContentGalleryConfig, getGroupsGalleryConfig } from './utils';
import { States } from './states';
import { Actions } from './actions';
import { dictionary, constants as telemetryConstants } from '@esri/telemetry-dictionary-hub';
import { DEFAULT_SELECT_CONTENT_STATE, DEFAULT_SELECT_GROUPS_STATE, DEFAULT_WORKING_STATE } from './states';
import { Logger } from '@esri/hub-common';
import { HelpState } from '../../functional/help-state';
export class AddExistingMachine extends BaseMachine {
  constructor(workflowConfig, context, options) {
    super(workflowConfig, context, options);
    this.workflow = 'existing';
    // TODO: Add logic here to determine if group selection is required
    // this.requireGroupSelection = true;
  }
  ;
  get canAddOthersContent() {
    const groupMemberships = this.workflowConfig.groups || { owner: [], admin: [], member: [] };
    // are  there any admin / owned groups?
    const groups = [...groupMemberships.owner, ...groupMemberships.admin];
    return groups.length > 1;
  }
  /**
  * Called to get a new state from the machine
  */
  reduce(action, state) {
    /*
      NOTE: we want this to return the passed in state if we don't have a reducer for it (which should mean it is an invalid action for the state)
            so the top level reducer should return the passed in state if it doesn't have a reducer for the action
            all the private reducers return undefined if they don't have a reducer for the action
    */
    let newState;
    if (!state) {
      newState = this.reduceInitial(action);
    }
    else if (States.isSelectContent(state)) {
      newState = this.reduceSelectContent(action, state);
    }
    else if (States.isSelectGroups(state)) {
      newState = this.reduceSelectGroups(action, state);
    }
    else if (States.isWorking(state)) {
      newState = this.reduceWorking(action, state);
    }
    else if (States.isFailure(state)) {
      newState = this.reduceFailure(action, state);
    }
    if (newState) {
      const steps = this.reduceSteps(action, newState);
      const controls = this.reduceControls(action, newState);
      const result = Object.assign(Object.assign(Object.assign({}, newState), steps), controls);
      return result;
    }
    Logger.warn(`reducer for workflow: ${this.workflow}, state: ${state.tag}, and action: ${action.tag} not implemented yet`);
    return state;
  }
  /**
   * Initial reducer for the machine that just sets things up
   * @param action
   * @returns
   */
  reduceInitial(action) {
    if (Actions.isInitialize(action)) {
      // if we can't share other people's content, we should only show the user's content
      // const query = canAddOthersContent? getProp(this.config, 'world') : getProp(this.config, 'mine');
      return Object.assign(Object.assign({}, DEFAULT_SELECT_CONTENT_STATE), { componentArgs: getContentGalleryConfig(this.context, { t: this.t, query: this.workflowConfig.query, canAddOthersContent: this.canAddOthersContent }),
        // we are limiting to one group for now, so we just choose the first one
        selectedGroupIds: [this.workflowGroupIds[0]].filter(Boolean) });
    }
  }
  /**
   * Fires when the user selects content in the gallery of "exitsting" content
   * @param action
   * @param state
   * @returns
   */
  reduceSelectContent(action, state) {
    const { componentArgs, contentGalleryState, groupsGalleryState, selectedContentIds, selectedGroupIds, stepIndex } = state;
    const selectionKey = this.workflowConfig.targetEntity;
    if (Actions.isGallerySelectionChanged(action)) {
      componentArgs.gallerySelection = action.selected;
      return Object.assign(Object.assign({}, DEFAULT_SELECT_CONTENT_STATE), { componentArgs,
        contentGalleryState,
        groupsGalleryState, selectedContentIds: action.selected[selectionKey], selectedGroupIds,
        stepIndex });
    }
    if (Actions.isGalleryStateChanged(action)) {
      return Object.assign(Object.assign({}, DEFAULT_SELECT_CONTENT_STATE), { componentArgs, contentGalleryState: action.galleryState, groupsGalleryState,
        selectedContentIds,
        selectedGroupIds,
        stepIndex });
    }
    if (Actions.isNextStep(action)) {
      // we are on the SelectContent step and we got the NextStep action
      // eslint-disable-next-line unicorn/prefer-ternary
      if (this.allowGroupSelection) {
        return Object.assign(Object.assign({}, DEFAULT_SELECT_GROUPS_STATE), { componentArgs: getGroupsGalleryConfig(this.context, {
            selectedGroupIds: state.selectedGroupIds,
            state: groupsGalleryState,
            t: this.t,
            catalogGroupIds: this.workflowGroupIds
          }), contentGalleryState,
          groupsGalleryState,
          selectedContentIds,
          selectedGroupIds, telemetry: this.allowGroupSelection ? dictionary.category.interaction.action.open.label.stepper.details.selectGroups : undefined });
      }
      else {
        return Object.assign(Object.assign({}, DEFAULT_WORKING_STATE), { action: 'addExistingContent', selectedContentIds,
          selectedGroupIds, stepIndex: 1 });
      }
    }
    if (Actions.isStepChanged(action)) {
      // we are on the SelectContent step and we got the StepChanged action
      // this is when a user selects a step from the stepper (ie they did not use the Next or Back buttons)
      if (action.stepIndex === state.stepIndex) {
        // this means we stay on the current step
        return state;
      }
      if (action.stepIndex === 1) {
        // if we are on the selectcontent state (which is index 1) and we want to go to index 2, that amounts to a NextStep action
        return this.reduceSelectContent({ tag: 'NextStep' }, state);
      }
      if (action.stepIndex === 2) {
        return Object.assign(Object.assign({}, DEFAULT_WORKING_STATE), { action: 'addExistingContent', selectedContentIds,
          selectedGroupIds, stepIndex: action.stepIndex });
      }
    }
  }
  reduceSelectGroups(action, state) {
    const { componentArgs, contentGalleryState, groupsGalleryState, selectedContentIds, selectedGroupIds, stepIndex } = state;
    if (Actions.isGallerySelectionChanged(action)) {
      componentArgs.gallerySelection = action.selected;
      return Object.assign(Object.assign({}, DEFAULT_SELECT_GROUPS_STATE), { componentArgs,
        contentGalleryState,
        groupsGalleryState, selectedGroupIds: action.selected.group, selectedContentIds,
        stepIndex });
    }
    if (Actions.isGalleryStateChanged(action)) {
      return Object.assign(Object.assign({}, DEFAULT_SELECT_GROUPS_STATE), { componentArgs,
        contentGalleryState, groupsGalleryState: action.galleryState, selectedContentIds,
        selectedGroupIds,
        stepIndex });
    }
    if (Actions.isPreviousStep(action)) {
      // we are on the SelectGroups step and we got the PreviousStep action
      return Object.assign(Object.assign({}, DEFAULT_SELECT_CONTENT_STATE), { componentArgs: getContentGalleryConfig(this.context, { selectedContentIds, state: contentGalleryState, t: this.t, query: this.workflowConfig.query, canAddOthersContent: this.canAddOthersContent }), contentGalleryState,
        groupsGalleryState,
        selectedContentIds,
        selectedGroupIds, telemetry: dictionary.category.interaction.action.open.label.stepper.details.selectContent });
    }
    if (Actions.isNextStep(action)) {
      // we are on the SelectGroups step and we got the NextStep action
      return Object.assign(Object.assign({}, DEFAULT_WORKING_STATE), { action: 'addExistingContent', selectedContentIds,
        selectedGroupIds, stepIndex: 2, telemetry: dictionary.category.interaction.action.open.label.stepper.details.confirm });
    }
    if (Actions.isStepChanged(action)) {
      // we are on the SelectGroups step and we got the StepChanged action
      // this is when a user selects a step from the stepper (ie they did not use the Next or Back buttons)
      if (action.stepIndex === state.stepIndex) {
        // this means we stay on the current step
        return state;
      }
      if (action.stepIndex === 0) {
        // if we are on the selectgroups state (which is index 1) and we want to go to index 0, that amounts to a PreviousStep action
        return this.reduceSelectGroups({ tag: 'PreviousStep' }, state);
      }
      if (action.stepIndex === 2) {
        // if we are on the selectgroups state (which is index 1) and we want to go to index 2, that amounts to a NextStep action
        return this.reduceSelectGroups({ tag: 'NextStep' }, state);
      }
    }
  }
  // Shared reduce logic for the Working and Confirmation states
  reduceWorking(action, state) {
    const { selectedContentIds, selectedGroupIds } = state;
    if (Actions.isSuccess(action)) {
      // we are in the working state and we got the Success action
      // this means we successfully added the content
      // we should show the confirmation state
      const isSuccess = action.results.overallStatus === 'success';
      const icon = isSuccess ? 'check-circle' : 'exclamation-mark-triangle';
      const i18nParts = [this.workflow];
      const i18nBase = i18nParts.filter(Boolean).join('.');
      return {
        tag: 'Confirmation',
        component: 'arcgis-hub-add-content-results',
        stepIndex: this.allowGroupSelection ? 2 : 1,
        componentArgs: {
          workflow: this.workflow,
          results: action.results,
          icon,
          helpStateClass: isSuccess ? 'success' : 'warning',
          helpStateConfig: {
            heading: `${i18nBase}.${isSuccess ? 'successHeading' : 'failureHeading'}`,
            icon,
            isMain: false,
            kind: isSuccess ? 'success' : 'warning',
          }
        },
        telemetry: Object.assign(Object.assign({}, dictionary.category.groups.action.share.label.content), { response: telemetryConstants.response.SUCCESS })
      };
    }
    if (Actions.isFailure(action)) {
      // we are in the working state and we got the Failure action
      // this means we failed to add the content
      // we should return the failure state
      return {
        tag: 'Failure',
        component: HelpState,
        selectedContentIds,
        selectedGroupIds,
        stepIndex: this.allowGroupSelection ? 2 : 1,
        componentArgs: {
          className: 'danger',
          actionKey: 'failure.action',
          headingKey: 'failure.heading',
          icon: 'frown',
          kind: 'danger',
          messageKey: 'failure.message',
        },
        telemetry: Object.assign(Object.assign({}, dictionary.category.groups.action.share.label.content), { response: telemetryConstants.response.FAILURE })
      };
    }
  }
  reduceFailure(action, state) {
    const { selectedContentIds, selectedGroupIds } = state;
    if (Actions.isRetry(action)) {
      // we are on the SelectGroups step and we got the NextStep action
      return Object.assign(Object.assign({}, DEFAULT_WORKING_STATE), { action: 'addExistingContent', selectedContentIds,
        selectedGroupIds, stepIndex: this.allowGroupSelection ? 2 : 1 });
    }
  }
  reduceSteps(_, state) {
    // this is the stepper steps
    const selectedContentIds = state.selectedContentIds || [];
    const selectedGroupIds = state.selectedGroupIds || [];
    // NOTE: the state here is the _new_ state
    const steps = [
      {
        labelKey: 'steps.selectContent',
        complete: States.isWorking(state) || States.isSelectGroups(state) || States.isConfirmation(state) || States.isFailure(state),
        disabled: States.isWorking(state) || States.isConfirmation(state) || States.isFailure(state),
        error: false
      }
    ];
    if (this.allowGroupSelection) {
      let groupsStepIsDisabled = true;
      // eslint-disable-next-line unicorn/prefer-ternary
      if (States.isWorking(state) || States.isConfirmation(state) || States.isFailure(state)) {
        groupsStepIsDisabled = true;
      }
      else {
        groupsStepIsDisabled = !selectedContentIds.length;
      }
      steps.push({
        labelKey: 'steps.selectGroups',
        complete: States.isWorking(state) || States.isConfirmation(state) || States.isFailure(state),
        disabled: groupsStepIsDisabled,
        error: false
      });
    }
    steps.push({
      labelKey: 'steps.confirmation',
      complete: States.isConfirmation(state),
      disabled: (!States.isConfirmation(state) && !States.isFailure(state) && !States.isWorking(state)) && (!selectedContentIds.length || !selectedGroupIds.length),
      error: States.isFailure(state)
    });
    return { steps };
  }
  reduceControls(_, state) {
    // this is the controls at the bottom
    // NOTE: the state here is the _new_ state
    const selectedContentIds = state.selectedContentIds || [];
    const selectedGroupIds = state.selectedGroupIds || [];
    let nextIsDisabled = true;
    if (States.isSelectContent(state)) {
      nextIsDisabled = !selectedContentIds.length || (!this.allowGroupSelection && !selectedGroupIds.length);
    }
    else if (States.isSelectGroups(state)) {
      nextIsDisabled = !selectedGroupIds.length;
    }
    let nextButtonLabelKey = 'controls.addContent';
    if (States.isSelectContent(state) && this.allowGroupSelection) {
      nextButtonLabelKey = 'controls.next';
    }
    return {
      controls: {
        back: {
          visible: States.isSelectGroups(state),
          labelKey: 'controls.back'
        },
        selection: {
          visible: States.isSelectContent(state) || States.isSelectGroups(state),
          count: States.isSelectContent(state) ? selectedContentIds.length : selectedGroupIds === null || selectedGroupIds === void 0 ? void 0 : selectedGroupIds.length,
          limit: States.isSelectGroups(state) ? 1 : undefined
        },
        next: {
          visible: States.isSelectContent(state) || States.isSelectGroups(state),
          disabled: nextIsDisabled,
          labelKey: nextButtonLabelKey
        },
        cancel: {
          visible: States.isSelectContent(state) || States.isSelectGroups(state),
          labelKey: 'controls.cancel'
        },
        close: {
          visible: States.isConfirmation(state) || States.isFailure(state) || States.isWorking(state),
          disabled: States.isWorking(state),
          labelKey: 'controls.close'
        }
      },
    };
  }
}
