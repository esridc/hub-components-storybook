import { IMachine } from './machine';
import { BaseMachine } from './base-machine';
import { Workflow } from './utils';
import { State, Working } from './states';
import { Action } from './actions';
import { HubEntity, HubEntityType, IAddContentCreateWorkflowConfig, IArcGISContext, IHubSite } from '@esri/hub-common';
export declare class CreateNewMachine extends BaseMachine implements IMachine {
  workflow: Workflow;
  requireGroupSelection: boolean;
  entity: HubEntity;
  site: IHubSite;
  constructor(workflowConfig: IAddContentCreateWorkflowConfig, context: IArcGISContext, options?: Record<string, any>);
  /**
   * Get the HubEntityType of the thing we are creating
   * e.g. initiative, project, etc, vs "Hub Project" or "Hub Initiative"
   */
  get entityType(): HubEntityType;
  /**
  * Called to get a new state from the machine
  */
  reduce(action: Action, state?: State): State;
  get helpStateProps(): any;
  private reduceInitial;
  private reduceCreateContent;
  private reduceSelectGroups;
  protected reduceWorking(action: Action, state: Working): any;
  private reduceFailure;
  private reduceSteps;
  private reduceControls;
}
