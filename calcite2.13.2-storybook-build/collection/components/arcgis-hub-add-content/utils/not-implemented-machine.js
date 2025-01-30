import { BaseMachine } from './base-machine';
import { States, } from './states';
import { Actions, } from './actions';
import { HelpState } from '../../functional/help-state';
import { Logger } from '@esri/hub-common';
export class NotImplementedMachine extends BaseMachine {
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
    if (newState) {
      const steps = this.reduceSteps(action, newState);
      const controls = this.reduceControls(action, newState);
      const result = Object.assign(Object.assign(Object.assign({}, newState), steps), controls);
      return result;
    }
    Logger.warn(`reducer for workflow: not-implemented, state: ${state.tag}, and action: ${action.tag} not implemented yet`);
    return state;
  }
  reduceInitial(action) {
    if (Actions.isInitialize(action)) {
      return {
        tag: 'NotImplemented',
        component: HelpState,
        componentArgs: {
          className: 'warning',
          headingKey: 'notImplemented.heading',
          icon: 'frown',
        },
        controls: {},
        configurationValues: {},
        selectedContentIds: [],
        selectedGroupIds: [],
        stepIndex: 0,
        steps: [],
      };
    }
  }
  reduceSteps(_, state) {
    // this is the stepper steps
    // NOTE: the state here is the _new_ state
    if (States.isNotImplemented(state)) {
      return {
        steps: [
          {
            labelKey: 'steps.notImplemented',
            complete: false,
            disabled: false,
            error: false
          }
        ]
      };
    }
  }
  reduceControls(_, state) {
    // this is the controls at the bottom
    // NOTE: the state here is the _new_ state
    if (States.isNotImplemented(state)) {
      return {
        controls: {
          back: {
            visible: false,
            labelKey: 'controls.back'
          },
          selection: {
            visible: false,
            count: 0,
          },
          next: {
            visible: false,
            disabled: false,
            labelKey: 'controls.next'
          },
          cancel: {
            visible: false,
            labelKey: 'controls.cancel'
          },
          close: {
            visible: true,
            disabled: false,
            labelKey: 'controls.close'
          }
        },
      };
    }
  }
}
