'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');

const dateTimePickerCss = "hub-field-input-date-time{display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:100%}";

const DateTimePicker = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = index.createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.params = undefined;
    context.bind(this, 'handleCalciteInputDateTimePickerChange');
  }
  componentWillLoad() {
    // Default to now and isostring as return format
    let date = new Date();
    this.returnFormat = "isostring";
    // If a value was passed in, use it and set the return format to be the same
    if (this.params.value) {
      // if it's a string or number, convert to a date
      if ((typeof this.params.value === 'string' || typeof this.params.value === "number")) {
        this.returnFormat = typeof this.params.value === 'string' ? "isostring" : "timestamp";
        date = new Date(this.params.value);
      }
    }
    // convert into local date & time strings for use in components
    this._date = this.getDateString(date);
    this._time = `${date.getHours()}:${date.getMinutes()}`;
  }
  /**
   * Get the formatted date string in the format YYYY-MM-DD.
   * @param date - The date object.
   * @returns The formatted date string.
   */
  getDateString(date) {
    const yr = date.getFullYear();
    let mo = (date.getMonth() + 1).toString();
    if (mo.length === 1) {
      mo = `0${mo}`;
    }
    let dt = date.getDate().toString();
    if (dt.length === 1) {
      dt = `0${dt}`;
    }
    return `${yr}-${mo}-${dt}`;
  }
  /**
   * Given time and date strings, return a date object in the current timezone
   * @param dateString YYYY-MM-DD
   * @param timeString HH:MM
   * @returns
   */
  getLocalDate(dateString, timeString) {
    const date = new Date();
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(parseInt(timeString.split(':')[1], 10));
    date.setHours(parseInt(timeString.split(':')[0], 10));
    date.setDate(parseInt(dateString.split('-')[2], 10));
    date.setMonth(parseInt(dateString.split('-')[1], 10) - 1);
    date.setFullYear(parseInt(dateString.split('-')[0], 10));
    return date;
  }
  handleCalciteInputDateTimePickerChange(evt) {
    const el = evt.target;
    // depending on the tag the event came from, update the date or time
    if (el.tagName === 'CALCITE-INPUT-DATE-PICKER') {
      this._date = el.value;
    }
    if (el.tagName === 'CALCITE-INPUT-TIME-PICKER') {
      this._time = el.value;
    }
    // Convert into a date object in local timezone
    const updatedDate = this.getLocalDate(this._date, this._time);
    // default to assuming we return `isostring`
    let returnVal = updatedDate.toISOString();
    // if the return format is a timestamp, convert it
    if (this.returnFormat === "timestamp") {
      returnVal = updatedDate.getTime();
    }
    // emit the event informing the config editor of the change
    this.arcgisConfigurationEditorFieldInputChange.emit(returnVal);
  }
  render() {
    return (index.h(index.Host, null, index.h("calcite-input-date-picker", { disabled: this.params.disabled, onCalciteInputDatePickerChange: this.handleCalciteInputDateTimePickerChange, overlayPositioning: "fixed", scale: this.params.scale, value: this._date }), index.h("calcite-input-time-picker", { disabled: this.params.disabled, onCalciteInputTimePickerChange: this.handleCalciteInputDateTimePickerChange, overlayPositioning: "fixed", scale: this.params.scale, value: this._time })));
  }
};
DateTimePicker.style = dateTimePickerCss;

exports.hub_field_input_date_time = DateTimePicker;
