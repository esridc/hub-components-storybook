import { EventEmitter } from '../../stencil-public-runtime';
import { HTMLCalciteDropdownElement } from '@esri/calcite-components/dist';
import { ComponentIntl } from "../../../src/utils/stencil-intl";
import { ISortOption } from '@esri/hub-common';
export declare type ActiveSortOption = ISortOption & {
  order: "asc" | "desc";
};
export declare class ArcgisHubSearchSort {
  sortOptions: ISortOption[];
  activeSortOption: ActiveSortOption;
  sortOrderIcon: string;
  hubSearchSortChange: EventEmitter<ActiveSortOption>;
  element: HTMLElement;
  dropdownEl: HTMLCalciteDropdownElement;
  intl: ComponentIntl;
  constructor();
  componentWillLoad(): Promise<void>;
  componentWillRender(): void;
  /**
   * Listen to the sort field dropdown change and fire the sort change fn with new activeSortOption
   */
  handleFieldChangeEvent(): void;
  setDropdownEl(el: HTMLCalciteDropdownElement): void;
  /**
   * Whenever sort order button is clicked, change the sort order and its icon, then
   * Fire the sort change fn with new activeSortOption
   */
  handleOrderChange(): void;
  render(): any;
}
