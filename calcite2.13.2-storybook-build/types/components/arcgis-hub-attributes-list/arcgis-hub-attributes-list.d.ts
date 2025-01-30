import { IHubContent } from '@esri/hub-common';
import { EventEmitter } from '../../stencil-public-runtime';
import { ComponentIntl } from '../../utils/stencil-intl';
import { CalciteTabTitleCustomEvent } from '@esri/calcite-components';
declare enum FieldTab {
  Chart = "Chart",
  Table = "Table"
}
export interface IParsedField {
  alias: string;
  description: null | {
    value?: string;
    fieldValueType?: string;
  };
  name: string;
  type: string;
  chartable: boolean;
}
/**
 * @slot <FIELD_NAME>-table - A dynamically named slot that allows for rendering `table` content into a chartable field's `Table` tab
 * @slot <FIELD_NAME>-chart - A dynamically named slot that allows for rendering `chart` content into a chartable field's `Chart` tab
 */
export declare class ArcgisHubAttributesList {
  /**
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  /**
   * Internally managed field states
   */
  fieldTabStates: Record<string, string>;
  /**
   * Default selected tab
   */
  defaultFieldTab: FieldTab;
  /**
   * Reference to host element
   */
  element: HTMLArcgisHubAttributesListElement;
  /**
   * An IHubContent object
   */
  content: IHubContent;
  handleContentUpdated(content: IHubContent): void;
  /**
   * An Array of fields augmented with statistics
   */
  fields: any[];
  handleFieldsUpdated(fields: any[]): void;
  /**
   * Max number of fields to display
   */
  maxFields: number;
  /**
   * Parsed field data
   */
  parsedFields: IParsedField[];
  /**
   * Hub telemetry event
   */
  hubTelemetry: EventEmitter<any>;
  /**
   * Emitted when a `calcite-accordion-item
   */
  arcgisHubAttributesListAccordionChange: EventEmitter<{
    fieldName: string;
    expanded: boolean;
  }>;
  /**
   * Pre-binds method context
   * @constructor
   */
  constructor();
  /**
   * Component setup
   */
  componentWillLoad(): Promise<void>;
  /**
   * Handles clicks to the Learn about charts link
   * @param evt A PointerEvent
   */
  handleLearnMoreClick(evt: PointerEvent): void;
  /**
   * Handles clicks to the Load More button
   * @param evt A PointerEvent
   */
  handleLoadMoreClick(evt: PointerEvent): void;
  /**
   * Emits the appropriate telemetry for calcite-accordion state changes
   * @param evt A CustomEvent<{ requestedAccordionItem: HTMLCalciteAccordionItemElement }>
   */
  handleAccordionChange(evt: CustomEvent<{
    requestedAccordionItem: HTMLCalciteAccordionItemElement;
  }>): void;
  /**
   * Parses the field data
   * @param content An IHubContent object
   * @param fields An Array of fields
   */
  parseFields(content: IHubContent, fields: any[]): void;
  /**
   * Emits the appropriate telemetry for tab changes
   * @param evt A CustomEvent<TabChangeEventDetail>
   */
  handleTabChange(evt: CalciteTabTitleCustomEvent<void>): void;
  /**
   * Computes the fields to render
   * @returns IParsedField[]
   */
  get fieldsToRender(): IParsedField[];
  /**
   * Computes if the Load More button should display
   * @returns boolean
   */
  get shouldRenderLoadMore(): boolean;
  /**
   * Computes the tab configs
   * @returns Array of tab configs
   */
  get tabs(): {
    type: FieldTab;
    title: string;
    telemetry: any;
    renderSlot: (field: any) => HTMLSlotElement;
  }[];
  /**
   * Renders the header
   * @returns HTMLDivElement
   */
  renderHeader(): HTMLDivElement;
  /**
   * Renders the calcite-accordion
   * @returns HTMLCalciteAccordionElement
   */
  renderAccordion(): HTMLCalciteAccordionElement;
  /**
   * Renders a calcite-accordion-item for the given field
   * @param field The field
   * @param idx The field index
   * @returns HTMLCalciteAccordionItemElement
   */
  renderAccordionItem(field: any): HTMLCalciteAccordionItemElement;
  /**
   * Renders the calcite-tabs for the given field
   * @param field The field
   * @returns HTMLCalciteTabsElement
   */
  renderTabs(field: any): HTMLCalciteTabsElement;
  /**
   * Renders the slot for the feature chart content
   * @param field The field for the chart
   * @returns HTMLSlotElement
   */
  renderChartSlot(field: any): HTMLSlotElement;
  /**
   * Renders the slot for the feature table content
   * @param field The field for the table
   * @returns HTMLSlotElement
   */
  renderTableSlot(field: any): HTMLSlotElement;
  render(): any;
}
export {};
