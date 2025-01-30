import { Host, h } from '@stencil/core';
import '@fullcalendar/web-component/global';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import arLocale from '@fullcalendar/core/locales/ar';
import bgLocale from '@fullcalendar/core/locales/bg';
import bsLocale from '@fullcalendar/core/locales/bs';
import caLocale from '@fullcalendar/core/locales/ca';
import csLocale from '@fullcalendar/core/locales/cs';
import daLocale from '@fullcalendar/core/locales/da';
import deLocale from '@fullcalendar/core/locales/de';
import elLocale from '@fullcalendar/core/locales/el';
import esLocale from '@fullcalendar/core/locales/es';
import etLocale from '@fullcalendar/core/locales/et';
import fiLocale from '@fullcalendar/core/locales/fi';
import frLocale from '@fullcalendar/core/locales/fr';
import heLocale from '@fullcalendar/core/locales/he';
import hrLocale from '@fullcalendar/core/locales/hr';
import huLocale from '@fullcalendar/core/locales/hu';
import idLocale from '@fullcalendar/core/locales/id';
import itLocale from '@fullcalendar/core/locales/it';
import jaLocale from '@fullcalendar/core/locales/ja';
import koLocale from '@fullcalendar/core/locales/ko';
import ltLocale from '@fullcalendar/core/locales/lt';
import lvLocale from '@fullcalendar/core/locales/lv';
import nbLocale from '@fullcalendar/core/locales/nb';
import nlLocale from '@fullcalendar/core/locales/nl';
import plLocale from '@fullcalendar/core/locales/pl';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import ptLocale from '@fullcalendar/core/locales/pt';
// import ptPtLocale from '@fullcalendar/core/locales/pt-pt'; // doesn't exist...
import roLocale from '@fullcalendar/core/locales/ro';
import ruLocale from '@fullcalendar/core/locales/ru';
import skLocale from '@fullcalendar/core/locales/sk';
import slLocale from '@fullcalendar/core/locales/sl';
import srLocale from '@fullcalendar/core/locales/sr';
import svLocale from '@fullcalendar/core/locales/sv';
import thLocale from '@fullcalendar/core/locales/th';
import trLocale from '@fullcalendar/core/locales/tr';
import ukLocale from '@fullcalendar/core/locales/uk';
import viLocale from '@fullcalendar/core/locales/vi';
import zhCnLocale from '@fullcalendar/core/locales/zh-cn';
// import zhHkLocale from '@fullcalendar/core/locales/zh-hk'; // doesn't exist...
import zhTwLocale from '@fullcalendar/core/locales/zh-tw';
import intlManager from '../../utils/intl-manager';
import { getEventInputsFromSearchResults } from './helpers';
/**
 * Arcgis-hub-calendar is a wrapper component for the Full Calendar library for use with arcgis-hub-gallery. The calendar emits events when dates and date ranges are selected so that the gallery can filter search results. The selectable date range can be configured, and the maximum number of events displayed on a calendar date can be adjusted to accomodate for the available space the calendar is displayed in.
 */
export class ArcgisHubCalendar {
  constructor() {
    /**
     * Callback function that gets invoked when a date or date-range is selected on the calendar.
     * @param info A DateSelectArg object containing details about the selected date or date-range
     */
    this.handleDatesSelected = (info) => {
      this.hubCalendarDateSelected.emit({
        start: info.start.toISOString(),
        end: info.end.toISOString(),
      });
    };
    /**
     * Callback function that gets invoked when a date or date-range is unselected on the calendar.
     */
    this.handleDatesUnselected = () => {
      this.hubCalendarDateUnselected.emit();
    };
    /**
     * Callback function that gets invoked when an event is selected on the calendar.
     * @param info A EventClickArg object containing details about the selected event
     */
    this.handleEventSelected = (arg) => {
      arg.jsEvent.preventDefault();
      this.selectedEvent = {
        el: arg.el,
        event: arg.event,
      };
    };
    /**
     * Resets the selectedEvent reference to null when the calcite-popover closes
     */
    this.handleCalcitePopoverClosed = () => {
      this.selectedEvent = null;
    };
    /**
     * Callback function to compute additional classnames to be added to day cells
     * @param renderProps A DayCellContentArg object containing details about the day
     * @returns an array of additional classnames to be added to day cells
     */
    this.dayCellClassNames = (renderProps) => {
      const isLessThanMin = Boolean(this._minSelectableDate) && renderProps.date < this._minSelectableDate;
      const isGreaterThanMax = Boolean(this._maxSelectableDate) && renderProps.date > this._maxSelectableDate;
      return isLessThanMin || isGreaterThanMax ? ['non-selectable'] : [];
    };
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
    this.renderEvent = (renderProps, createElement) => {
      const title = createElement('div', { className: 'hub-calendar-event-title' }, renderProps.event.title);
      const dateTime = createElement('div', { className: 'hub-calendar-event-time' }, renderProps.event.allDay ? this.intl.t('allDay') : renderProps.timeText);
      return createElement('div', {}, title, dateTime);
    };
    this.maxEventsPerDay = 5;
    this.maxSelectableDate = undefined;
    this.minSelectableDate = undefined;
    this.interactable = undefined;
    this.searchResults = [];
    this.selectedEvent = null;
  }
  /**
   * Component will load lifecycle hook. Loads the intl service for the component
   */
  async componentWillLoad() {
    await this.loadIntl();
  }
  /**
   * Component did load lifecycle hook. Sets the calendar options after initial component load
   */
  componentDidLoad() {
    this.setOptions();
  }
  /**
   * Component should update lifecycle hook. Sets the calendar options after state and property updates
   */
  componentShouldUpdate() {
    this.setOptions();
  }
  /**
   * A public method to manually clear any calendar date selections
   */
  async clearSelection() {
    var _a, _b;
    (_b = (_a = this.fullCalendarRef) === null || _a === void 0 ? void 0 : _a.getApi()) === null || _b === void 0 ? void 0 : _b.unselect();
  }
  /**
   * Loads the intl service
   */
  async loadIntl() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Sets the options on the FullCalendar web component
   */
  setOptions() {
    if (this.fullCalendarRef) {
      this.fullCalendarRef.options = this.options;
    }
  }
  /**
   * Transforms the provided `searchResults` to a collection of `EventInput` objects that can
   * be rendered on the calendar.
   */
  get events() {
    return getEventInputsFromSearchResults(this.searchResults);
  }
  /**
   * Returns a `CalendarOptions` object used to configure the FullCalendar component
   */
  get options() {
    return {
      // callback fn to compute additional classnames to be added to day cells, see https://fullcalendar.io/docs/day-cell-render-hooks & https://fullcalendar.io/docs/classname-input
      dayCellClassNames: this.dayCellClassNames,
      // max number of events that can be visible by default per day, see https://fullcalendar.io/docs/dayMaxEvents
      dayMaxEvents: this.maxEventsPerDay,
      // locale direction, see https://fullcalendar.io/docs/direction
      direction: this.intl.direction,
      // display the event's end time, see https://fullcalendar.io/docs/displayEventEnd
      displayEventEnd: true,
      // display the event's date/time, see https://fullcalendar.io/docs/displayEventTime
      displayEventTime: true,
      // callback fn that gets invoked when an event is selected, see https://fullcalendar.io/docs/eventClick
      eventClick: this.handleEventSelected,
      // callback function to define custom event markup, see https://fullcalendar.io/docs/event-render-hooks & https://fullcalendar.io/docs/content-injection
      eventContent: this.renderEvent,
      // forces all events to render consistently in `block` mode, see https://fullcalendar.io/docs/eventDisplay
      eventDisplay: 'block',
      // makes events keyboard navigatable, see https://fullcalendar.io/docs/eventInteractive
      eventInteractive: true,
      // collection of event models to render on the calendar, see https://fullcalendar.io/docs/event-object
      events: this.events,
      // event date/time formatting options, see https://fullcalendar.io/docs/eventTimeFormat & https://fullcalendar.io/docs/date-formatting
      eventTimeFormat: {
        hour: 'numeric',
        minute: '2-digit',
        meridiem: 'short',
        omitZeroMinute: true,
      },
      // only show weeks that have days in the current month, see https://fullcalendar.io/docs/fixedWeekCount
      fixedWeekCount: false,
      // current user locale, see https://fullcalendar.io/docs/locale
      locale: this.locale,
      // all supported locales, see https://fullcalendar.io/docs/locale
      locales: this.locales,
      // registered plugins, see https://fullcalendar.io/docs/plugin-index
      plugins: [dayGridPlugin, interactionPlugin],
      // callback fn that gets invoked when a date or date-range is selected, see https://fullcalendar.io/docs/select-callback
      select: this.handleDatesSelected,
      // allow users to select a date or date-range, see https://fullcalendar.io/docs/selectable
      selectable: Boolean(this.interactable),
      // limits user selection to certain windows of time, see https://fullcalendar.io/docs/selectConstraint
      selectConstraint: this.selectContraint,
      // prevents the selected date or date-range from being automatically deselected upon clicking elsewhere in the DOM, see https://fullcalendar.io/docs/unselectAuto
      unselectAuto: false,
      // callback fn that gets invoked when a date or date-range is unselected, see https://fullcalendar.io/docs/unselect-callback
      unselect: this.handleDatesUnselected,
    };
  }
  /**
   * Computes a ConstraintInput used to limit what days can be selected
   */
  get selectContraint() {
    const constraint = {};
    if (this._minSelectableDate) {
      constraint.start = this._minSelectableDate.toISOString();
    }
    if (this._maxSelectableDate) {
      const max = new Date(this._maxSelectableDate.valueOf() + 60 * 60 * 24 * 1000);
      constraint.end = max.toISOString();
    }
    return constraint;
  }
  /**
   * Returns a date object representing the minimum selectable date when `min` is provided
   */
  get _minSelectableDate() {
    let date;
    if (this.minSelectableDate) {
      const d = new Date(this.minSelectableDate);
      date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
    }
    else {
      date = null;
    }
    return date;
  }
  /**
   * Returns a date object representing the maximum selectable date when `max` is provided
   */
  get _maxSelectableDate() {
    let date;
    if (this.maxSelectableDate) {
      const d = new Date(this.maxSelectableDate);
      date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
    }
    else {
      date = null;
    }
    return date;
  }
  /**
   * Returns the locale for the FullCalendar component.
   *
   * Hub supports `pt-pt` & `zh-hk` locales, but FullCalendar does not. For `pt-pt`, FullCalendar
   * gracefully degrades to `pt`. FullCalendar, however, does not gracefully degrade for `zh-hk`,
   * as there is no `@fullcalendar/core/locales/zh` file. When this occurs, certain strings rendered
   * in the UI default to english, which is not desirable. To mitigate this, we manually degrade `zh-hk`
   * to `zh-cn`.
   */
  get locale() {
    return this.intl.locale.toLowerCase() === 'zh-hk' ? 'zh-cn' : this.intl.locale;
  }
  /**
   * Returns a collection of LocaleInput objects representing the locales we need to support
   */
  get locales() {
    return [
      arLocale,
      bgLocale,
      bsLocale,
      caLocale,
      csLocale,
      daLocale,
      deLocale,
      elLocale,
      esLocale,
      etLocale,
      fiLocale,
      frLocale,
      heLocale,
      hrLocale,
      huLocale,
      idLocale,
      itLocale,
      jaLocale,
      koLocale,
      ltLocale,
      lvLocale,
      nbLocale,
      nlLocale,
      plLocale,
      ptBrLocale,
      ptLocale,
      roLocale,
      ruLocale,
      skLocale,
      slLocale,
      srLocale,
      svLocale,
      thLocale,
      trLocale,
      ukLocale,
      viLocale,
      zhCnLocale,
      zhTwLocale,
    ];
  }
  /**
   * Renders a popover for an event when the event is clicked
   */
  renderEventPopover() {
    if (this.selectedEvent) {
      return (h("calcite-popover", { autoClose: true, onCalcitePopoverClose: this.handleCalcitePopoverClosed, open: true, referenceElement: this.selectedEvent.el }, h("arcgis-hub-entity-card", { searchResult: this.selectedEvent.event.extendedProps })));
    }
  }
  /**
   * Renders the calendar
   */
  renderCalendar() {
    return (h("full-calendar", { ref: (el) => {
        this.fullCalendarRef = el;
      } }));
  }
  /**
   * Primary render method
   */
  render() {
    return (h(Host, { "data-element": "hub-calendar" }, this.renderCalendar(), this.renderEventPopover()));
  }
  static get is() { return "arcgis-hub-calendar"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-calendar.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-calendar.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "maxEventsPerDay": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The maximum number of events that be rendered on any given day"
        },
        "attribute": "max-events-per-day",
        "reflect": false,
        "defaultValue": "5"
      },
      "maxSelectableDate": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "number | string | Date",
          "resolved": "Date | number | string",
          "references": {
            "Date": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "The maximum possible date that can be selected"
        },
        "attribute": "max-selectable-date",
        "reflect": false
      },
      "minSelectableDate": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "number | string | Date",
          "resolved": "Date | number | string",
          "references": {
            "Date": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "The minimum possible date that can be selected"
        },
        "attribute": "min-selectable-date",
        "reflect": false
      },
      "interactable": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Whether or not the user can filter dates on the calendar"
        },
        "attribute": "interactable",
        "reflect": true
      },
      "searchResults": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubSearchResult[]",
          "resolved": "IHubSearchResult[]",
          "references": {
            "IHubSearchResult": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An array of IHubSearchResult objects"
        },
        "defaultValue": "[]"
      }
    };
  }
  static get states() {
    return {
      "selectedEvent": {}
    };
  }
  static get events() {
    return [{
        "method": "hubCalendarDateSelected",
        "name": "hubCalendarDateSelected",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user selects a date or date-range from the calendar"
        },
        "complexType": {
          "original": "{ start: string; end: string }",
          "resolved": "{ start: string; end: string; }",
          "references": {}
        }
      }, {
        "method": "hubCalendarDateUnselected",
        "name": "hubCalendarDateUnselected",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user unselects a date or date-range from the calendar"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "clearSelection": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "A public method to manually clear any calendar date selections",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "element"; }
}
