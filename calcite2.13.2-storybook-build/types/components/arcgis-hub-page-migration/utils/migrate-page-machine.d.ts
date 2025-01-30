import { State, Working } from './states';
import { Action } from './actions';
import { IArcGISContext, IHubPage, IHubSite } from '@esri/hub-common';
export interface IMachine {
  start: () => State;
  reduce: (action: Action, state?: State) => State;
}
export declare class MigratePageMachine implements IMachine {
  context: IArcGISContext;
  t: any;
  page: IHubPage;
  site: IHubSite;
  history: any[];
  constructor(context: IArcGISContext, options?: Record<string, any>);
  /**
  * Called to start the machine
  * @returns the initial state
  */
  start(): State;
  /**
  * Called to get a new state from the machine
  */
  reduce(action: Action, state?: State): State;
  logHistory(): void;
  get helpStateProps(): any;
  private reduceInitial;
  private reduceSpecifyInfo;
  private reduceSelectGroups;
  protected reduceWorking(action: Action, state: Working): any;
  private reduceFailure;
  private reduceSteps;
  private reduceControls;
}
