import { IComponentAction } from "./IComponentAction";
export interface IBulkActions {
  actions: IComponentAction[];
  position?: 'bottom' | 'top';
}
