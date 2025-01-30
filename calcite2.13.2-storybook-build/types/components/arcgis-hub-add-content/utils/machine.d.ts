import { AddContentWorkflowConfig, IArcGISContext } from '@esri/hub-common';
import { State } from './states';
import { Action } from './actions';
export interface IMachine {
  start: () => State;
  reduce: (action: Action, state?: State) => State;
}
export declare function initMachine(workflowConfig: AddContentWorkflowConfig, context: IArcGISContext, options?: Record<string, any>): Promise<IMachine>;
