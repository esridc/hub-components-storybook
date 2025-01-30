import { IMachine } from './machine';
import { BaseMachine } from './base-machine';
import { Workflow } from './utils';
import { State, Working } from './states';
import { Action } from './actions';
import { IAddContentExistingWorkflowConfig, IArcGISContext } from '@esri/hub-common';
export declare class AddExistingMachine extends BaseMachine implements IMachine {
  workflow: Workflow;
  workflowConfig: IAddContentExistingWorkflowConfig;
  constructor(workflowConfig: IAddContentExistingWorkflowConfig, context: IArcGISContext, options?: Record<string, any>);
  get canAddOthersContent(): boolean;
  /**
  * Called to get a new state from the machine
  */
  reduce(action: Action, state?: State): State;
  /**
   * Initial reducer for the machine that just sets things up
   * @param action
   * @returns
   */
  private reduceInitial;
  /**
   * Fires when the user selects content in the gallery of "exitsting" content
   * @param action
   * @param state
   * @returns
   */
  private reduceSelectContent;
  private reduceSelectGroups;
  protected reduceWorking(action: Action, state: Working): any;
  private reduceFailure;
  private reduceSteps;
  private reduceControls;
}
