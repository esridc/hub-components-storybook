import { h, Host } from '@stencil/core';
import { bind } from '../../../../../../utils/context';
export class DateTimePicker {
  constructor() {
    this.params = undefined;
    bind(this, 'handleCalciteInputDateTimePickerChange');
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
    return (h(Host, null, h("calcite-input-date-picker", { disabled: this.params.disabled, onCalciteInputDatePickerChange: this.handleCalciteInputDateTimePickerChange, overlayPositioning: "fixed", scale: this.params.scale, value: this._date }), h("calcite-input-time-picker", { disabled: this.params.disabled, onCalciteInputTimePickerChange: this.handleCalciteInputDateTimePickerChange, overlayPositioning: "fixed", scale: this.params.scale, value: this._time })));
  }
  static get is() { return "hub-field-input-date-time"; }
  static get originalStyleUrls() {
    return {
      "$": ["date-time-picker.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["date-time-picker.css"]
    };
  }
  static get properties() {
    return {
      "params": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IRenderParams",
          "resolved": "IRenderParams",
          "references": {
            "IRenderParams": {
              "location": "import",
              "path": "../resources"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      }
    };
  }
  static get events() {
    return [{
        "method": "arcgisConfigurationEditorFieldInputChange",
        "name": "arcgisConfigurationEditorFieldInputChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Payload will be in the same format that was passed in ISO8601 string or timestamp number"
        },
        "complexType": {
          "original": "string | number",
          "resolved": "number | string",
          "references": {}
        }
      }];
  }
}
