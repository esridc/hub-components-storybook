import { EventEmitter, VNode } from '../../stencil-public-runtime';
import { IHubSearchResult } from '@esri/hub-common';
import '@fullcalendar/web-component/global';
import { LocaleInput, CalendarOptions, EventInput, EventContentArg, DateSelectArg, EventClickArg, ConstraintInput, DayCellContentArg } from '@fullcalendar/core';
import { ComponentIntl } from '../../utils/stencil-intl';
import { FullCalendarElement } from '@fullcalendar/web-component';
/**
 * Arcgis-hub-calendar is a wrapper component for the Full Calendar library for use with arcgis-hub-gallery. The calendar emits events when dates and date ranges are selected so that the gallery can filter search results. The selectable date range can be configured, and the maximum number of events displayed on a calendar date can be adjusted to accomodate for the available space the calendar is displayed in.
 */
export declare class ArcgisHubCalendar {
  /**
   * A reference to the FullCalendar HTML element
   */
  fullCalendarRef: FullCalendarElement;
  /**
   * A reference to the intl service
   */
  intl: ComponentIntl;
  /**
   * A reference to the host element of this component
   */
  element: HTMLArcgisHubCalendarElement;
  /**
   * The maximum number of events that be rendered on any given day
   */
  maxEventsPerDay: number;
  /**
   * The maximum possible date that can be selected
   */
  maxSelectableDate?: number | string | Date;
  /**
   * The minimum possible date that can be selected
   */
  minSelectableDate?: number | string | Date;
  /**
   * Whether or not the user can filter dates on the calendar
   */
  interactable: boolean;
  /**
   * An array of IHubSearchResult objects
   */
  searchResults: IHubSearchResult[];
  /**
   * An object containing a reference the EventInput (model) and the HTML element representing that EventInput when an event is clicked on the calendar
   */
  selectedEvent: Pick<EventClickArg, 'el' | 'event'>;
  /**
   * Emitted when the user selects a date or date-range from the calendar
   */
  hubCalendarDateSelected: EventEmitter<{
    start: string;
    end: string;
  }>;
  /**
   * Emitted when the user unselects a date or date-range from the calendar
   */
  hubCalendarDateUnselected: EventEmitter<void>;
  /**
   * Component will load lifecycle hook. Loads the intl service for the component
   */
  componentWillLoad(): Promise<void>;
  /**
   * Component did load lifecycle hook. Sets the calendar options after initial component load
   */
  componentDidLoad(): void;
  /**
   * Component should update lifecycle hook. Sets the calendar options after state and property updates
   */
  componentShouldUpdate(): void;
  /**
   * A public method to manually clear any calendar date selections
   */
  clearSelection(): Promise<void>;
  /**
   * Loads the intl service
   */
  loadIntl(): Promise<void>;
  /**
   * Sets the options on the FullCalendar web component
   */
  setOptions(): void;
  /**
   * Callback function that gets invoked when a date or date-range is selected on the calendar.
   * @param info A DateSelectArg object containing details about the selected date or date-range
   */
  handleDatesSelected: (info: DateSelectArg) => void;
  /**
   * Callback function that gets invoked when a date or date-range is unselected on the calendar.
   */
  handleDatesUnselected: () => void;
  /**
   * Callback function that gets invoked when an event is selected on the calendar.
   * @param info A EventClickArg object containing details about the selected event
   */
  handleEventSelected: (arg: EventClickArg) => void;
  /**
   * Resets the selectedEvent reference to null when the calcite-popover closes
   */
  handleCalcitePopoverClosed: () => void;
  /**
   * Callback function to compute additional classnames to be added to day cells
   * @param renderProps A DayCellContentArg object containing details about the day
   * @returns an array of additional classnames to be added to day cells
   */
  dayCellClassNames: (renderProps: DayCellContentArg) => string[];
  /**
   * Transforms the provided `searchResults` to a collection of `EventInput` objects that can
   * be rendered on the calendar.
   */
  get events(): EventInput[];
  /**
   * Returns a `CalendarOptions` object used to configure the FullCalendar component
   */
  get options(): CalendarOptions;
  /**
   * Computes a ConstraintInput used to limit what days can be selected
   */
  get selectContraint(): ConstraintInput;
  /**
   * Returns a date object representing the minimum selectable date when `min` is provided
   */
  get _minSelectableDate(): Date;
  /**
   * Returns a date object representing the maximum selectable date when `max` is provided
   */
  get _maxSelectableDate(): Date;
  /**
   * Returns the locale for the FullCalendar component.
   *
   * Hub supports `pt-pt` & `zh-hk` locales, but FullCalendar does not. For `pt-pt`, FullCalendar
   * gracefully degrades to `pt`. FullCalendar, however, does not gracefully degrade for `zh-hk`,
   * as there is no `@fullcalendar/core/locales/zh` file. When this occurs, certain strings rendered
   * in the UI default to english, which is not desirable. To mitigate this, we manually degrade `zh-hk`
   * to `zh-cn`.
   */
  get locale(): string;
  /**
   * Returns a collection of LocaleInput objects representing the locales we need to support
   */
  get locales(): LocaleInput[];
  /**
   * A callback function that gets invoked for each event that is rendered on the calendar that allows
   * for customizing the display of the event content.
   *
   * I was unable to get this working with JSX, even after importing the preact JSX helper detailed here
   * @fullcalendar/core/preact. Therefore, we
   *
   * @param renderProps A EventContentArg object containing event details
   * @returns the event content nodes to be rendered
   */
  renderEvent: (renderProps: EventContentArg, createElement: any) => any;
  /**
   * Renders a popover for an event when the event is clicked
   */
  renderEventPopover(): VNode;
  /**
   * Renders the calendar
   */
  renderCalendar(): VNode;
  /**
   * Primary render method
   */
  render(): any;
}
