import { EventEmitter, VNode } from '../../stencil-public-runtime';
import { IFacetOption, IListFacet } from '../../utils/types';
import { ComponentIntl } from "../../utils/stencil-intl";
import { FacetOptionChangePayload } from '../../utils/state-utils';
import { CalciteInputCustomEvent } from '@esri/calcite-components';
export declare class ArcgisHubFacetOptions {
  element: HTMLElement;
  /**
   * Facet object passed in from the parent component
   */
  facet: IListFacet;
  /**
   * Event that's fired when a facet option's changed
   */
  arcgisHubFacetOptionsChange: EventEmitter<FacetOptionChangePayload>;
  /**
   * Event that's fired when the more/less button is clicked
   */
  arcgisHubFacetMoreLessClicked: EventEmitter<{
    facet: IListFacet;
    isMore: boolean;
  }>;
  showLimitedOptions: boolean;
  query: string;
  intl: ComponentIntl;
  /**
   * Number of facet options to show, default is 5
   */
  pageSize: number;
  /**
   * Needed for resetting focus per accessibility requirements
   */
  pageSeparator: HTMLSpanElement;
  _query: string;
  constructor();
  componentWillLoad(): Promise<void>;
  updateQuery(): void;
  handleCalciteInputInput(event: CalciteInputCustomEvent<void>): void;
  /**
   * Event that's fired when a radio button is clicked(single mode)
   * Not using @Listen because the event's target is this component NOT
   * the calcite-radio. We are unclear if this is an issue with nested
   * shadowdom or something calcite specific
   */
  handleCalciteRadioButtonChangeEvent(evt: any): void;
  /**
   * Event that's fired when a checkbox is checked/unchecked(multi mode)
   * Not using @Listen because the event's target is this component NOT
   * the calcite-checkbox. We are unclear if this is an issue with nested
   * shadowdom or something calcite specific
   */
  handleCalciteCheckboxChangeEvent(checkboxIndex: number, evt: any): void;
  /**
   * Emit the arcgisHubFacetOptionsChange event
   * @param key
   * @param checked
   */
  onFacetChanged(key: string, checked: boolean, optionIndex?: number): void;
  /**
   * filtered multi-select options based on user query
   */
  get filteredOptions(): IFacetOption[];
  /**
   * ordered multi-select options based on facet setting
   */
  get orderedOptions(): IFacetOption[];
  setPageSeparator(el: HTMLSpanElement): void;
  /**
   * Render the facet with checkboxes.
   */
  renderCheckboxes(): VNode[];
  toggleMoreOrLessButton(): void;
  /**
   * Number of options to display after the default page size.
   * Base off filtered options in case a query has been applied.
   */
  get optionsLeftToDisplay(): number;
  /**
   * Icon next to the "Show More" or "Show Less" button
   */
  get moreOrLessButtonIconEnd(): string;
  /**
   * Show {num} More or Show Less label
   */
  get moreOrLessButtonLabel(): string;
  get showNoMatchesNotice(): boolean;
  /**
   * Only show More/Less button for checkboxes AND when the filtered options are more than page size
   * when page size is not defined or the filtered options are less than page size
   * we don't want to show any buttons
   */
  renderMoreOrLessButton(): VNode;
  /**
   * Render the facet with radio buttons
   */
  renderRadioButtons(): VNode[];
  renderNoMatchesNotice(): VNode;
  /**
   * Main Render
   */
  render(): VNode;
}
