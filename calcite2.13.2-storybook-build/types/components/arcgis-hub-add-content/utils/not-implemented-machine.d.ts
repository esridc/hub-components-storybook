import { IMachine } from './machine';
import { BaseMachine } from './base-machine';
import { State } from './states';
import { Action } from './actions';
export declare class NotImplementedMachine extends BaseMachine implements IMachine {
  /**
  * Called to get a new state from the machine
  */
  reduce(action: Action, state?: State): State;
  private reduceInitial;
  private reduceSteps;
  private reduceControls;
}
