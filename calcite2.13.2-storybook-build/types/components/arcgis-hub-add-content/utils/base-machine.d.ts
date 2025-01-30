import { Workflow } from './utils';
import { State } from './states';
import { Action } from './actions';
import { AddContentWorkflowConfig, IArcGISContext } from '@esri/hub-common';
export declare abstract class BaseMachine {
  protected workflow: Workflow;
  context: IArcGISContext;
  workflowConfig: AddContentWorkflowConfig;
  overrideAllowGroupSelection: boolean;
  t: any;
  constructor(workflowConfig: AddContentWorkflowConfig, context: IArcGISContext, options?: Record<string, any>);
  /**
   *If we are working with a Group, they we can't allow group selection b/c we can't share a group to a group
   Otherwise if there are groups, and there are more than one, we should allow group selection
   */
  get allowGroupSelection(): boolean;
  /**
   * List of groups that the user can share to in order to be included in the context / query
   */
  get workflowGroupIds(): string[];
  start(): State;
  abstract reduce(action: Action, state?: State): State;
}
