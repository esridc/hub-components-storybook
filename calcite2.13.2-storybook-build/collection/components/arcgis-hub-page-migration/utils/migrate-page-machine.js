import { getGroupsGalleryConfig } from './utils';
import { States, DEFAULT_SPECIFY_INFO_STATE, DEFAULT_SELECT_GROUPS_STATE, DEFAULT_WORKING_STATE } from './states';
import { Actions } from './actions';
// import { dictionary, constants as telemetryConstants } from '@esri/telemetry-dictionary-hub';
import { Logger, SLUG_SCHEMA } from '@esri/hub-common';
import { HelpState } from '../../functional/help-state';
const MIGRATE_PAGE_SCHEMA = {
  $async: true,
  type: "object",
  required: ['name', 'slug'],
  properties: {
    name: {
      type: "string",
      minLength: 1,
      maxLength: 250,
      format: "entityTitleValidator",
    },
    slug: SLUG_SCHEMA
  },
};
const MIGRATE_PAGE_UI_SCHEMA = {
  type: "Layout",
  elements: [
    {
      labelKey: 'form.title.label',
      scope: "/properties/name",
      type: "Control",
      options: {
        messages: [
          {
            type: "ERROR",
            keyword: "required",
            icon: true,
            labelKey: 'form.title.requiredError',
          },
          {
            type: "ERROR",
            keyword: "format",
            icon: true,
            labelKey: 'form.title.entityTitleValidatorError'
          },
        ],
      },
    },
    {
      labelKey: 'form.slug.label',
      scope: "/properties/slug",
      type: "Control",
      options: {
        control: "hub-field-input-input",
        helperText: {
          labelKey: 'form.slug.helperText'
        },
        messages: [
          {
            type: "ERROR",
            keyword: "pattern",
            icon: true,
            labelKey: 'form.slug.patternError',
          },
          {
            type: "ERROR",
            keyword: "required",
            icon: true,
            labelKey: 'form.slug.requiredError',
          },
        ],
      },
    }
  ]
};
export class MigratePageMachine {
  constructor(context, options) {
    this.context = context;
    this.t = options === null || options === void 0 ? void 0 : options.t;
    this.page = options.page;
    this.site = options.site;
    this.history = [];
  }
  ;
  /**
  * Called to start the machine
  * @returns the initial state
  */
  start() {
    this.history = [];
    return this.reduce({ tag: 'Initialize' });
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
    let result = state;
    let newState;
    if (!state) {
      newState = this.reduceInitial(action);
    }
    else if (States.isSpecifyInfo(state)) {
      newState = this.reduceSpecifyInfo(action, state);
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
      result = Object.assign(Object.assign(Object.assign({}, newState), steps), controls);
    }
    else {
      Logger.warn(`reducer for state: ${state.tag}, and action: ${action.tag} is not implemented`);
    }
    this.history.push({ action, state, result });
    return result;
  }
  logHistory() {
    console.debug('MigratePageMachine', this.history);
  }
  get helpStateProps() {
    return {
      heading: this.t('heading'),
      icon: 'file-text',
      isMain: false,
    };
  }
  reduceInitial(action) {
    if (Actions.isInitialize(action)) {
      const { helpStateProps } = this;
      const slug = this.site.pages.find(p => p.id === this.page.id).slug;
      return Object.assign(Object.assign({}, DEFAULT_SPECIFY_INFO_STATE), { componentArgs: {
          schema: MIGRATE_PAGE_SCHEMA,
          scale: 'l',
          uiSchema: MIGRATE_PAGE_UI_SCHEMA,
          values: {
            name: this.page.name,
            slug: slug
          }
        }, helpStateProps, selectedGroupIds: [] });
    }
  }
  reduceSpecifyInfo(action, state) {
    const { componentArgs, configurationValues, groupsGalleryState, selectedGroupIds } = state;
    if (Actions.isConfigurationEditorChanged(action)) {
      const { helpStateProps } = this;
      return Object.assign(Object.assign({}, DEFAULT_SPECIFY_INFO_STATE), { componentArgs: Object.assign(Object.assign({}, componentArgs), { values: action.configurationValues.values }), configurationValues: action.configurationValues, helpStateProps,
        selectedGroupIds });
    }
    if (Actions.isNextStep(action)) {
      // we are on the SelectContent step and we got the NextStep action
      // eslint-disable-next-line unicorn/prefer-ternary
      return Object.assign(Object.assign({}, DEFAULT_SELECT_GROUPS_STATE), { componentArgs: getGroupsGalleryConfig(this.context, this.site.catalog, {
          selectedGroupIds: state.selectedGroupIds,
          state: groupsGalleryState,
          t: this.t,
        }), configurationValues,
        groupsGalleryState,
        selectedGroupIds });
    }
    if (Actions.isStepChanged(action)) {
      // we are on the SpecifyInfo step and we got the StepChanged action
      // this is when a user selects a step from the stepper (ie they did not use the Next or Back buttons)
      if (action.stepIndex === state.stepIndex) {
        // this means we stay on the current step
        return state;
      }
      if (action.stepIndex === 1) {
        // if we are on the createcontent state (which is index 1) and we want to go to index 2, that amounts to a NextStep action
        return this.reduceSpecifyInfo({ tag: 'NextStep' }, state);
      }
      if (action.stepIndex === 2) {
        return Object.assign(Object.assign({}, DEFAULT_WORKING_STATE), { configurationValues,
          selectedGroupIds });
      }
    }
  }
  reduceSelectGroups(action, state) {
    const { componentArgs, configurationValues, groupsGalleryState, selectedGroupIds } = state;
    if (Actions.isGallerySelectionChanged(action)) {
      componentArgs.gallerySelection = action.selected;
      return Object.assign(Object.assign({}, DEFAULT_SELECT_GROUPS_STATE), { componentArgs,
        groupsGalleryState,
        configurationValues, selectedGroupIds: action.selected.group });
    }
    if (Actions.isGalleryStateChanged(action)) {
      return Object.assign(Object.assign({}, DEFAULT_SELECT_GROUPS_STATE), { componentArgs,
        configurationValues, groupsGalleryState: action.galleryState, selectedGroupIds });
    }
    if (Actions.isPreviousStep(action)) {
      // we are on the SelectGroups step and we got the PreviousStep action
      const { helpStateProps } = this;
      return Object.assign(Object.assign({}, DEFAULT_SPECIFY_INFO_STATE), { componentArgs: {
          context: this.context,
          values: state.configurationValues.values,
          schema: MIGRATE_PAGE_SCHEMA,
          uiSchema: MIGRATE_PAGE_UI_SCHEMA,
          scale: 'l'
        }, configurationValues: state.configurationValues, groupsGalleryState,
        helpStateProps,
        selectedGroupIds });
    }
    if (Actions.isNextStep(action)) {
      // we are on the SelectGroups step and we got the NextStep action
      return Object.assign(Object.assign({}, DEFAULT_WORKING_STATE), { configurationValues,
        selectedGroupIds });
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
    const { configurationValues, selectedGroupIds } = state;
    if (Actions.isSuccess(action)) {
      // we are in the working state and we got the Success action
      // this means we successfully added the content
      // we should show the confirmation state
      const isSuccess = action.results.overallStatus === 'success';
      const icon = isSuccess ? 'check-circle' : 'exclamation-mark-triangle';
      return {
        tag: 'Confirmation',
        component: 'arcgis-hub-page-migration-results',
        stepIndex: 2,
        componentArgs: {
          results: action.results,
          icon,
          helpStateConfig: {
            heading: isSuccess ? 'successHeading' : 'failureHeading',
            icon,
            kind: isSuccess ? 'success' : 'warning',
            isMain: false,
          }
        },
        // telemetry: {
        //   ...dictionary.category.groups.action.share.label.content,
        //   response: telemetryConstants.response.SUCCESS,
        // }
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
        stepIndex: 2,
        componentArgs: {
          actionKey: 'failure.action',
          headingKey: 'failure.heading',
          icon: 'frown',
          kind: 'danger',
          messageKey: 'failure.message',
        },
        // telemetry: {
        //   ...dictionary.category.groups.action.share.label.content,
        //   response: telemetryConstants.response.FAILURE,
        // }
      };
    }
  }
  reduceFailure(action, state) {
    const { configurationValues, selectedGroupIds } = state;
    if (Actions.isRetry(action)) {
      // we are on the SelectGroups step and we got the NextStep action
      return Object.assign(Object.assign({}, DEFAULT_WORKING_STATE), { configurationValues,
        selectedGroupIds });
    }
  }
  reduceSteps(_, state) {
    // this is the stepper steps
    const selectedGroupIds = state.selectedGroupIds || [];
    const configurationValues = state.configurationValues || {};
    // NOTE: the state here is the _new_ state
    const steps = [
      {
        labelKey: 'steps.specifyInfo',
        complete: States.isWorking(state) || States.isSelectGroups(state) || States.isConfirmation(state) || States.isFailure(state),
        disabled: States.isWorking(state) || States.isConfirmation(state) || States.isFailure(state),
        error: false
      }
    ];
    let groupsStepIsDisabled = true;
    // eslint-disable-next-line unicorn/prefer-ternary
    if (States.isWorking(state) || States.isConfirmation(state) || States.isFailure(state)) {
      groupsStepIsDisabled = true;
    }
    else {
      groupsStepIsDisabled = !state.configurationValues.valid;
    }
    steps.push({
      labelKey: 'steps.selectGroups',
      complete: States.isWorking(state) || States.isConfirmation(state) || States.isFailure(state),
      disabled: groupsStepIsDisabled,
      error: false
    });
    let confirmationStepIsDisabled = true;
    if (States.isConfirmation(state) || States.isFailure(state) || States.isWorking(state)) {
      confirmationStepIsDisabled = false;
    }
    else if (States.isSpecifyInfo(state) || States.isSelectGroups(state)) {
      confirmationStepIsDisabled = !configurationValues.valid || !selectedGroupIds.length;
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
    if (States.isSpecifyInfo(state)) {
      nextIsDisabled = !state.configurationValues.valid;
    }
    else if (States.isSelectGroups(state)) {
      nextIsDisabled = !selectedGroupIds.length;
    }
    let nextButtonLabelKey = 'controls.next';
    if (States.isSelectGroups(state)) {
      nextButtonLabelKey = 'controls.migrate';
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
        },
        next: {
          visible: States.isSpecifyInfo(state) || States.isSelectGroups(state),
          disabled: nextIsDisabled,
          labelKey: nextButtonLabelKey
        },
        cancel: {
          visible: States.isSpecifyInfo(state) || States.isSelectGroups(state),
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
