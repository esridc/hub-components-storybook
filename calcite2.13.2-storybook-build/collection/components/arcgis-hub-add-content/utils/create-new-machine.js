import { BaseMachine } from './base-machine';
import { getGroupsGalleryConfig, getIcon, getDefaultEntityValues } from './utils';
import { States } from './states';
import { Actions } from './actions';
import { dictionary, constants as telemetryConstants } from '@esri/telemetry-dictionary-hub';
import { DEFAULT_CREATE_CONTENT_STATE, DEFAULT_SELECT_GROUPS_STATE, DEFAULT_WORKING_STATE } from './states';
import { Logger } from '@esri/hub-common';
import { getHubEntityTypeFromType } from '../../../utils/type-converters';
import { HelpState } from '../../functional/help-state';
export class CreateNewMachine extends BaseMachine {
  constructor(workflowConfig, context, options) {
    super(workflowConfig, context, options);
    this.workflow = 'create';
    this.requireGroupSelection = false;
    this.requireGroupSelection = this.workflowGroupIds.length > 1;
    this.entity = options === null || options === void 0 ? void 0 : options.entity;
    this.site = options === null || options === void 0 ? void 0 : options.site;
  }
  ;
  /**
   * Get the HubEntityType of the thing we are creating
   * e.g. initiative, project, etc, vs "Hub Project" or "Hub Initiative"
   */
  get entityType() {
    // Although the workflowConfig.types is an array, for the create workflow,
    // we pre-process things so there is only one entry
    const type = this.workflowConfig.types[0];
    // convert to an entity type
    return getHubEntityTypeFromType(type);
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
    else if (States.isCreateContent(state)) {
      newState = this.reduceCreateContent(action, state);
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
  get helpStateProps() {
    const i18nBase = `createHelpState.${this.entityType}.`;
    return {
      heading: this.t(`${i18nBase}heading`),
      icon: getIcon(this.entityType),
      isMain: false,
      message: this.t(`${i18nBase}message`),
    };
  }
  reduceInitial(action) {
    if (Actions.isInitialize(action)) {
      const { helpStateProps } = this;
      const editorTypeVersion = ['initiative', 'project'].includes(this.entityType) ? '2' : '';
      const editorType = `hub:${this.entityType}:create${editorTypeVersion}`;
      return Object.assign(Object.assign({}, DEFAULT_CREATE_CONTENT_STATE), { componentArgs: {
          editorType,
          entity: getDefaultEntityValues(this.entityType, DEFAULT_CREATE_CONTENT_STATE.configurationValues, {
            entity: this.entity,
            site: this.site,
          }),
          isOpen: true,
          layout: "step",
          scale: 'l'
        }, helpStateProps,
        // we are limiting to one group for now, so we just choose the first one
        selectedGroupIds: [this.workflowGroupIds[0]].filter(Boolean) });
    }
  }
  reduceCreateContent(action, state) {
    const { componentArgs, configurationValues, groupsGalleryState, selectedGroupIds } = state;
    if (Actions.isEntityEditorChanged(action)) {
      const { helpStateProps } = this;
      return Object.assign(Object.assign({}, DEFAULT_CREATE_CONTENT_STATE), { componentArgs: Object.assign(Object.assign({}, componentArgs), { entity: action.configurationValues.values }), configurationValues: action.configurationValues, helpStateProps,
        selectedGroupIds });
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
          }), configurationValues,
          groupsGalleryState,
          selectedGroupIds, telemetry: this.allowGroupSelection ? dictionary.category.interaction.action.open.label.stepper.details.selectGroups : undefined });
      }
      else {
        return Object.assign(Object.assign({}, DEFAULT_WORKING_STATE), { action: 'addNewContent', configurationValues,
          selectedGroupIds, stepIndex: 1 });
      }
    }
    if (Actions.isStepChanged(action)) {
      // we are on the CreateContent step and we got the StepChanged action
      // this is when a user selects a step from the stepper (ie they did not use the Next or Back buttons)
      if (action.stepIndex === state.stepIndex) {
        // this means we stay on the current step
        return state;
      }
      if (action.stepIndex === 1) {
        // if we are on the createcontent state (which is index 1) and we want to go to index 2, that amounts to a NextStep action
        return this.reduceCreateContent({ tag: 'NextStep' }, state);
      }
      if (action.stepIndex === 2) {
        return Object.assign(Object.assign({}, DEFAULT_WORKING_STATE), { action: 'addNewContent', configurationValues,
          selectedGroupIds, stepIndex: action.stepIndex });
      }
    }
  }
  reduceSelectGroups(action, state) {
    const { componentArgs, configurationValues, groupsGalleryState, selectedGroupIds, stepIndex } = state;
    if (Actions.isGallerySelectionChanged(action)) {
      componentArgs.gallerySelection = action.selected;
      return Object.assign(Object.assign({}, DEFAULT_SELECT_GROUPS_STATE), { componentArgs,
        groupsGalleryState,
        configurationValues, selectedGroupIds: action.selected.group, stepIndex });
    }
    if (Actions.isGalleryStateChanged(action)) {
      return Object.assign(Object.assign({}, DEFAULT_SELECT_GROUPS_STATE), { componentArgs,
        configurationValues, groupsGalleryState: action.galleryState, selectedGroupIds,
        stepIndex });
    }
    if (Actions.isPreviousStep(action)) {
      // we are on the SelectGroups step and we got the PreviousStep action
      const { helpStateProps } = this;
      const editorTypeVersion = ['initiative', 'project'].includes(this.entityType) ? '2' : '';
      const editorType = `hub:${this.entityType}:create${editorTypeVersion}`;
      return Object.assign(Object.assign({}, DEFAULT_CREATE_CONTENT_STATE), { componentArgs: {
          context: this.context,
          // editorContext={this.editorContext}
          editorType,
          entity: state.configurationValues.values,
          isOpen: true,
          layout: "step"
        }, configurationValues: state.configurationValues, groupsGalleryState,
        helpStateProps,
        selectedGroupIds });
    }
    if (Actions.isNextStep(action)) {
      // we are on the SelectGroups step and we got the NextStep action
      return Object.assign(Object.assign({}, DEFAULT_WORKING_STATE), { action: 'addNewContent', configurationValues,
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
    var _a, _b;
    const { configurationValues, selectedGroupIds } = state;
    if (Actions.isSuccess(action)) {
      // we are in the working state and we got the Success action
      // this means we successfully added the content
      // we should show the confirmation state
      const isSuccess = action.results.overallStatus === 'success';
      const icon = isSuccess ? 'check-circle' : 'exclamation-mark-triangle';
      const i18nParts = [this.workflow, this.entityType];
      const message = isSuccess ? [...i18nParts, 'successMessage'].join('.') : undefined;
      if (isSuccess) {
        if (!!((_b = (_a = action.results) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b.length)) {
          i18nParts.push('successWithGroupHeading');
        }
        else {
          i18nParts.push('successWithoutGroupHeading');
        }
      }
      else {
        i18nParts.push('failureHeading');
      }
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
            heading: i18nParts.filter(Boolean).join('.'),
            icon,
            kind: isSuccess ? 'success' : 'warning',
            message
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
        configurationValues,
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
    const { configurationValues, selectedGroupIds } = state;
    if (Actions.isRetry(action)) {
      // we are on the SelectGroups step and we got the NextStep action
      return Object.assign(Object.assign({}, DEFAULT_WORKING_STATE), { action: 'addNewContent', configurationValues,
        selectedGroupIds, stepIndex: this.allowGroupSelection ? 2 : 1 });
    }
  }
  reduceSteps(_, state) {
    // this is the stepper steps
    const selectedGroupIds = state.selectedGroupIds || [];
    const configurationValues = state.configurationValues || {};
    // NOTE: the state here is the _new_ state
    const steps = [
      {
        labelKey: 'steps.createContent',
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
        groupsStepIsDisabled = !state.configurationValues.isValid;
      }
      steps.push({
        labelKey: 'steps.selectGroups',
        complete: States.isWorking(state) || States.isConfirmation(state) || States.isFailure(state),
        disabled: groupsStepIsDisabled,
        error: false
      });
    }
    let confirmationStepIsDisabled = true;
    if (States.isConfirmation(state) || States.isFailure(state) || States.isWorking(state)) {
      confirmationStepIsDisabled = false;
    }
    else if (States.isCreateContent(state) || States.isSelectGroups(state)) {
      confirmationStepIsDisabled = !configurationValues.isValid || (this.requireGroupSelection && !selectedGroupIds.length);
    }
    steps.push({
      labelKey: 'steps.confirmation',
      complete: States.isConfirmation(state),
      disabled: confirmationStepIsDisabled,
      error: States.isFailure(state)
    });
    return { steps };
  }
  reduceControls(_, state) {
    // this is the controls at the bottom
    // NOTE: the state here is the _new_ state
    const selectedGroupIds = state.selectedGroupIds || [];
    let nextIsDisabled = true;
    if (States.isCreateContent(state)) {
      nextIsDisabled = !state.configurationValues.isValid;
    }
    else if (States.isSelectGroups(state)) {
      nextIsDisabled = this.requireGroupSelection && !selectedGroupIds.length;
    }
    let nextButtonLabelKey = 'controls.create';
    if (States.isCreateContent(state) && this.allowGroupSelection) {
      nextButtonLabelKey = 'controls.next';
    }
    return {
      controls: {
        back: {
          visible: States.isSelectGroups(state),
          labelKey: 'controls.back'
        },
        selection: {
          visible: States.isSelectGroups(state),
          count: selectedGroupIds === null || selectedGroupIds === void 0 ? void 0 : selectedGroupIds.length,
          limit: States.isSelectGroups(state) ? 1 : undefined
        },
        next: {
          visible: States.isCreateContent(state) || States.isSelectGroups(state),
          disabled: nextIsDisabled,
          labelKey: nextButtonLabelKey
        },
        cancel: {
          visible: States.isCreateContent(state) || States.isSelectGroups(state),
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
