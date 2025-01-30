import { IGroup } from "@esri/arcgis-rest-portal";
import { EventEmitter } from "../../stencil-public-runtime";
import { ComponentIntl } from "../../utils/stencil-intl";
export declare class ArcgisHubGroupsSharing {
  element: HTMLElement;
  intl: ComponentIntl;
  /**
   * Array of groups that can be shared to.
   */
  groups: IGroup[];
  /**
   * Groups we want to optionally share to by default
   * We pass down selected groups to pre-select one/multiple groups (presuming that's necessary)
   */
  selectedGroups: IGroup[];
  /**
   * Internal tracking of selected groups
   * Keep track of selected / deselected groups internally to keep things clean
   */
  internalSelectedGroups: IGroup[];
  internalDeselectedGroups: IGroup[];
  /**
   * Emits the groups we will be sharing something to
   */
  arcgisHubSelectedGroupsChange: EventEmitter<{
    share: IGroup[];
    unshare: IGroup[];
  }>;
  /**
   * Func bound to onCalciteCheckboxChange event.
   * Done this way because said event doesn't return anything, and this is needed to avoid
   * digging down the shadowdom tree to get at the correct target.
   */
  updateSelectedGroups(evt: any): void;
  constructor();
  componentWillLoad(): Promise<void>;
  private _shouldGroupBeSelected;
  render(): any;
}
