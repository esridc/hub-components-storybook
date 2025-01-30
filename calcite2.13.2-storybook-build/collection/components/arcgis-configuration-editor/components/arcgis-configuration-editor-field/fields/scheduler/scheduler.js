import { h, Host } from "@stencil/core";
import intlManager from "../../../../../../utils/intl-manager";
import { cloneObject, getProp } from "@esri/hub-common";
// TODO in https://devtopia.esri.com/dc/hub/issues/9947:
// - handle params: `invalid`, `disabled`, and `required`
// - validate that options are valid, and not repeated
// - confirm with Klara and Sean that component is accessible
// - run aXe dev tools
// - add validation messages
// - time picker currently doesn't allow us to restrict minute changes; will need to fix once Calcite updates `step` prop
export class Scheduler {
  constructor() {
    this.params = undefined;
    this.value = undefined;
    this.options = undefined;
    this.isInitialized = false;
  }
  // TODO: validate that options are valid, and not repeated
  // get optionsAreValid() {...}
  /*********** GETTERS, SETTERS, AND VALIDATION ***********/
  /**
   * Returns whether the field has been statically disabled (via UI Schema
   * options) or dynamically disabled (via parent form validation)
   */
  get _disabled() {
    var _a, _b;
    return ((_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.disabled) || this.params.disabled;
  }
  get checkedOption() {
    return this.options.find(option => option.checked);
  }
  get isValueValid() {
    if (!this.value) {
      return false;
    }
    if (this.value.mode === 'automatic' || this.value.mode === 'manual') {
      return this.isOptionAvailable(this.value.mode);
    }
    else if (this.value.mode === 'scheduled') {
      switch (this.value.cadence) {
        case 'daily':
          return this.isHourValid && this.isTimezoneValid && this.isOptionAvailable(this.value.cadence);
        case 'weekly':
          return this.isHourValid && this.isDayValid && this.isTimezoneValid && this.isOptionAvailable(this.value.cadence);
        case 'monthly':
          return this.isHourValid && this.isDateValid && this.isTimezoneValid && this.isOptionAvailable(this.value.cadence);
        case 'yearly':
          return this.isHourValid && this.isValidMonth && this.isDateValid && this.isTimezoneValid && this.isOptionAvailable(this.value.cadence);
      }
    }
  }
  get isHourValid() {
    return this.value.hour !== null && this.value.hour !== undefined && this.value.hour >= 0 && this.value.hour <= 23;
  }
  get isDayValid() {
    return this.value.day !== null && this.value.day !== undefined && this.value.day >= 0 && this.value.day <= 6;
  }
  get isDateValid() {
    return this.value.date !== null && this.value.date !== undefined && this.value.date >= 1 && this.value.date <= 28;
  }
  get isValidMonth() {
    return this.value.month !== null && this.value.month !== undefined && this.value.month >= 0 && this.value.month <= 11;
  }
  get isTimezoneValid() {
    return typeof this.value.timezone === "string" && !!this.value.timezone;
  }
  isOptionAvailable(type) {
    return !!this.options.find(option => option.type === type);
  }
  getOptionLabel(option) {
    return option.label == undefined
      ? this.intl.t(`option.${option.type}.defaultLabel`)
      : option.label;
  }
  async componentWillLoad() {
    var _a, _b, _c, _d, _e;
    this.isInitialized = false;
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.options = ((_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a.uiSchema) === null || _b === void 0 ? void 0 : _b.options.inputs)
      ? cloneObject((_d = (_c = this.params) === null || _c === void 0 ? void 0 : _c.uiSchema) === null || _d === void 0 ? void 0 : _d.options.inputs)
      : [{ label: "Default", type: "automatic" }];
    this.value = (_e = this.params) === null || _e === void 0 ? void 0 : _e.value;
    if (!this.isValueValid || this._disabled) {
      this.options[0].checked = true;
      this.setValueToBaseSchedule();
    }
    // using the value from props, check the initial option + set the initial checkedOption type
    this.options = this.options.map(option => {
      if (option.type === this.value.cadence || option.type === this.value.mode) {
        option.checked = true;
      }
      return option;
    });
    this.isInitialized = true;
  }
  // when updating the value after a new selection, reset the value to its base state
  setValueToBaseSchedule() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
    const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    switch ((_a = this.checkedOption) === null || _a === void 0 ? void 0 : _a.type) {
      case 'automatic':
        this.value = {
          mode: "automatic"
        };
        (_b = this.value) === null || _b === void 0 ? true : delete _b.cadence;
        (_c = this.value) === null || _c === void 0 ? true : delete _c.hour;
        (_d = this.value) === null || _d === void 0 ? true : delete _d.day;
        (_e = this.value) === null || _e === void 0 ? true : delete _e.date;
        (_f = this.value) === null || _f === void 0 ? true : delete _f.month;
        (_g = this.value) === null || _g === void 0 ? true : delete _g.timezone;
        break;
      case 'daily':
        this.value = {
          mode: "scheduled",
          cadence: "daily",
          hour: 0,
          timezone: defaultTimezone // needed to be valid
        };
        (_h = this.value) === null || _h === void 0 ? true : delete _h.day;
        (_j = this.value) === null || _j === void 0 ? true : delete _j.date;
        (_k = this.value) === null || _k === void 0 ? true : delete _k.month;
        break;
      case 'weekly':
        this.value = {
          mode: "scheduled",
          cadence: "weekly",
          hour: 0,
          day: 0,
          timezone: defaultTimezone // needed to be valid
        };
        (_l = this.value) === null || _l === void 0 ? true : delete _l.date;
        (_m = this.value) === null || _m === void 0 ? true : delete _m.month;
        break;
      case 'monthly':
        this.value = {
          mode: "scheduled",
          cadence: "monthly",
          hour: 0,
          date: null,
          timezone: defaultTimezone // needed to be valid
        };
        (_o = this.value) === null || _o === void 0 ? true : delete _o.day;
        (_p = this.value) === null || _p === void 0 ? true : delete _p.month;
        break;
      case 'yearly':
        this.value = {
          mode: "scheduled",
          cadence: "yearly",
          hour: 0,
          date: null,
          month: 0,
          timezone: defaultTimezone // needed to be valid
        };
        (_q = this.value) === null || _q === void 0 ? true : delete _q.day;
        break;
      case 'manual':
        this.value = {
          mode: "manual",
        };
        (_r = this.value) === null || _r === void 0 ? true : delete _r.cadence;
        (_s = this.value) === null || _s === void 0 ? true : delete _s.hour;
        (_t = this.value) === null || _t === void 0 ? true : delete _t.day;
        (_u = this.value) === null || _u === void 0 ? true : delete _u.date;
        (_v = this.value) === null || _v === void 0 ? true : delete _v.month;
        (_w = this.value) === null || _w === void 0 ? true : delete _w.timezone;
        break;
    }
  }
  /*********** EVENT HANDLERS ***********/
  handleParamsChange(newParams, oldParams) {
    // We have cases where the scheduler gets statically disabled while the form is open, but after render.
    // In those cases, we want reset the value to default state when the field is newly disabled.
    // When the field is re-enabled, we want to reset the value to the state before it was disabled.
    const isDisabled = getProp(newParams, 'uiSchema.options.disabled') || newParams.disabled;
    const wasDisabled = getProp(oldParams, 'uiSchema.options.disabled') || oldParams.disabled;
    const hasPreDisabledState = !!this._valueBeforeDisabled && !!this._optionsBeforeDisabled;
    if (!wasDisabled && isDisabled) {
      // Save now so we can reset to this state when re-enabled
      this._valueBeforeDisabled = cloneObject(this.value);
      this._optionsBeforeDisabled = cloneObject(this.options);
      // Reset the UI to its base state when disabled
      this.options = this.options.map(option => {
        return Object.assign(Object.assign({}, option), { checked: false });
      });
      this.options[0].checked = true;
      this.setValueToBaseSchedule();
    }
    else if (wasDisabled && !isDisabled && hasPreDisabledState) {
      // Reset to the state before the field was disabled
      this.options = cloneObject(this._optionsBeforeDisabled);
      this.value = cloneObject(this._valueBeforeDisabled);
      // Clean up until the next time the field is disabled
      delete this._valueBeforeDisabled;
      delete this._optionsBeforeDisabled;
    }
  }
  // when the value changes to something valid, emit the new value
  handleArcgisHubInputSchedulerChange() {
    if (this.isInitialized) {
      this.isValueValid
        ? this.arcgisConfigurationEditorFieldInputChange.emit(this.value)
        : this.arcgisConfigurationEditorChange.emit({ valid: false });
    }
  }
  // when the selected option changes, update the checkedOption
  updateCheckedOptionSelectFormat(e) {
    const select = e.target;
    if (select.id === 'scheduler-select') {
      // update the options to reflect the new checked option
      this.options = this.options.map(option => {
        return Object.assign(Object.assign({}, option), { checked: option.type === select.value });
      });
      // reset the value to its base state
      this.setValueToBaseSchedule();
    }
  }
  // if any of the inputs with a calcite input time picker change, update the value
  updateHour(e) {
    var _a;
    const timePicker = e.target;
    if (!timePicker.value) {
      // if value is null, set hour to null so that we can show validation message
      this.value = Object.assign(Object.assign({}, this.value), { hour: null });
      return;
    }
    // TODO: Calcite currently doesn't allow us to restrict minute changes, so until they do, this hack will have to suffice
    // Calcite ticket: https://github.com/Esri/calcite-design-system/issues/4757#issuecomment-2018926334
    const hoursAndMinutes = cloneObject(timePicker.value.split(":"));
    const minutes = Number(hoursAndMinutes[1]);
    const hour = Number(hoursAndMinutes[0]);
    const roundedUp = (hour === 23)
      ? "00:00"
      : hour + 1 + ":00";
    const roundedDown = (hour === 0)
      ? "23:00"
      : hour - 1 + ":00";
    // this if/else is needed to make the minute step button function like the hour step button
    // this if/else LOOKS like it can be reduced to a single if/else, but it shouldn't for UX reasons
    if (minutes === 1) {
      timePicker.value = roundedUp;
    }
    else if (minutes === 59) {
      timePicker.value = roundedDown;
    }
    else if (minutes < 30 && minutes !== 0) {
      timePicker.value = roundedDown;
    }
    else if (minutes >= 30) {
      timePicker.value = roundedUp;
    }
    switch ((_a = this.checkedOption) === null || _a === void 0 ? void 0 : _a.type) {
      case 'daily':
      case 'weekly':
      case 'monthly':
      case 'yearly':
        this.value = Object.assign(Object.assign({}, this.value), { hour: Number(timePicker.value.split(":")[0]) });
        break;
    }
  }
  // if any of the inputs with a calcite input time zone picker change, update the value
  updateTimezone(e) {
    var _a;
    const timezonePicker = e.target;
    switch ((_a = this.checkedOption) === null || _a === void 0 ? void 0 : _a.type) {
      case 'daily':
      case 'weekly':
      case 'monthly':
      case 'yearly':
        this.value = Object.assign(Object.assign({}, this.value), { timezone: timezonePicker.value });
        break;
    }
  }
  // if any of the inputs with a calcite select change, update the value
  updateDayOrMonth(e) {
    var _a, _b;
    const select = e.target;
    if (select.id === 'day-picker' && ((_a = this.checkedOption) === null || _a === void 0 ? void 0 : _a.type) === 'weekly') {
      this.value = Object.assign(Object.assign({}, this.value), { day: Number(select.value) });
    }
    else if (select.id === 'month-picker' && ((_b = this.checkedOption) === null || _b === void 0 ? void 0 : _b.type) === 'yearly') {
      this.value = Object.assign(Object.assign({}, this.value), { month: Number(select.value) });
    }
  }
  updateDateNumber(e) {
    var _a;
    const numberInput = e.target;
    switch ((_a = this.checkedOption) === null || _a === void 0 ? void 0 : _a.type) {
      case 'monthly':
      case 'yearly':
        this.value = Object.assign(Object.assign({}, this.value), { date: Number(numberInput.value) || null });
        break;
    }
  }
  /*********** RENDER FUNCTIONS: INPUTS ***********/
  renderInvalidInputMessage(message) {
    return h("calcite-input-message", { icon: "x-octagon", status: "invalid" }, message);
  }
  renderHourPicker() {
    var _a;
    return h("calcite-label", { class: "expanded-sub-input" }, this.intl.t('inputs.hour.helperText'), h("calcite-input-time-picker", { class: "max-w-21", id: "scheduler-time-picker", placement: "bottom", status: this.isHourValid ? "idle" : "invalid", value: this.isHourValid ? `${(_a = this.value) === null || _a === void 0 ? void 0 : _a.hour}:00` : null }), this.isHourValid
      ? h("calcite-input-message", { icon: "information-f", status: "idle" }, this.intl.t('inputs.hour.inputMessage'))
      : this.renderInvalidInputMessage(this.intl.t('inputs.hour.error')));
  }
  renderDatePicker() {
    var _a;
    return h("calcite-label", { class: "expanded-sub-input" }, this.intl.t('inputs.date.helperText'), h("calcite-input-number", { class: "max-w-21", clearable: true, integer: true, max: "28", min: "1", "number-button-type": "vertical", placeholder: this.intl.t('inputs.date.inputNumberPlaceholder'), status: this.isDateValid ? "idle" : "invalid", step: "1", value: ((_a = this.value) === null || _a === void 0 ? void 0 : _a.date) || null }), this.isDateValid
      ? h("calcite-input-message", { icon: "information-f", status: "idle" }, this.intl.t('inputs.date.inputMessage'))
      : this.renderInvalidInputMessage(this.intl.t('inputs.date.error')));
  }
  renderDayPicker() {
    const daysOfTheWeek = [
      { label: this.intl.t('inputs.day.daysOfTheWeek.sunday'), value: "0" },
      { label: this.intl.t('inputs.day.daysOfTheWeek.monday'), value: "1" },
      { label: this.intl.t('inputs.day.daysOfTheWeek.tuesday'), value: "2" },
      { label: this.intl.t('inputs.day.daysOfTheWeek.wednesday'), value: "3" },
      { label: this.intl.t('inputs.day.daysOfTheWeek.thursday'), value: "4" },
      { label: this.intl.t('inputs.day.daysOfTheWeek.friday'), value: "5" },
      { label: this.intl.t('inputs.day.daysOfTheWeek.saturday'), value: "6" },
    ];
    return h("calcite-label", { class: "expanded-sub-input" }, this.intl.t('inputs.day.helperText'), h("calcite-select", { class: "max-w-21", id: "day-picker", label: this.intl.t('inputs.day.selectLabel') }, daysOfTheWeek.map(day => {
      var _a;
      const selected = `${(_a = this.value) === null || _a === void 0 ? void 0 : _a.day}` === day.value;
      return h("calcite-option", { key: day.value, label: day.label, selected: selected, status: this.isDayValid ? "idle" : "invalid", value: day.value }, day.label);
    })), !this.isDayValid && this.renderInvalidInputMessage(this.intl.t('inputs.day.error')));
  }
  renderMonthPicker() {
    const monthsOfTheYear = [
      { label: this.intl.t('inputs.month.monthsOfTheYear.january'), value: "0" },
      { label: this.intl.t('inputs.month.monthsOfTheYear.february'), value: "1" },
      { label: this.intl.t('inputs.month.monthsOfTheYear.march'), value: "2" },
      { label: this.intl.t('inputs.month.monthsOfTheYear.april'), value: "3" },
      { label: this.intl.t('inputs.month.monthsOfTheYear.may'), value: "4" },
      { label: this.intl.t('inputs.month.monthsOfTheYear.june'), value: "5" },
      { label: this.intl.t('inputs.month.monthsOfTheYear.july'), value: "6" },
      { label: this.intl.t('inputs.month.monthsOfTheYear.august'), value: "7" },
      { label: this.intl.t('inputs.month.monthsOfTheYear.september'), value: "8" },
      { label: this.intl.t('inputs.month.monthsOfTheYear.october'), value: "9" },
      { label: this.intl.t('inputs.month.monthsOfTheYear.november'), value: "10" },
      { label: this.intl.t('inputs.month.monthsOfTheYear.december'), value: "11" },
    ];
    return h("calcite-label", { class: "expanded-sub-input" }, this.intl.t('inputs.month.helperText'), h("calcite-select", { class: "max-w-21", id: "month-picker", label: this.intl.t('inputs.month.selectLabel') }, monthsOfTheYear.map(month => {
      var _a;
      const selected = `${(_a = this.value) === null || _a === void 0 ? void 0 : _a.month}` === month.value;
      return h("calcite-option", { key: month.value, label: month.label, selected: selected, status: this.isValidMonth ? "idle" : "invalid", value: month.value }, month.label);
    })), !this.isValidMonth && this.renderInvalidInputMessage(this.intl.t('inputs.month.error')));
  }
  renderTimezonePicker() {
    var _a;
    return h("calcite-label", { class: "expanded-sub-input" }, this.intl.t('inputs.timezone.helperText'), h("calcite-input-time-zone", { class: "max-w-21", mode: "name", status: this.isTimezoneValid ? "idle" : "invalid", value: (_a = this.value) === null || _a === void 0 ? void 0 : _a.timezone }), !this.isTimezoneValid && this.renderInvalidInputMessage(this.intl.t('inputs.timezone.error')));
  }
  /*********** RENDER FUNCTIONS: EXPANDED SECTIONS ***********/
  renderDailyOptionSection() {
    return h("div", { class: "expanded-daily-scheduler-section" }, this.renderHourPicker(), this.renderTimezonePicker());
  }
  renderWeeklyOptionSection() {
    return h("div", { class: "expanded-weekly-scheduler-section" }, this.renderDayPicker(), this.renderHourPicker(), this.renderTimezonePicker());
  }
  renderMonthlyOptionSection() {
    return h("div", { class: "expanded-monthly-scheduler-section" }, this.renderDatePicker(), this.renderHourPicker(), this.renderTimezonePicker());
  }
  renderYearlyOptionSection() {
    return h("div", { class: "expanded-yearly-scheduler-section" }, this.renderMonthPicker(), this.renderDatePicker(), this.renderHourPicker(), this.renderTimezonePicker());
  }
  // TODO: Add disabled state for single option
  renderExpandedOptionSection() {
    const { type } = this.checkedOption;
    switch (type) {
      case 'daily':
        return h("div", null, this.renderDailyOptionSection());
      case 'weekly':
        return h("div", null, this.renderWeeklyOptionSection());
      case 'monthly':
        return h("div", null, this.renderMonthlyOptionSection());
      case 'yearly':
        return h("div", null, this.renderYearlyOptionSection());
    }
  }
  /*********** RENDER FUNCTIONS: FORMATS ***********/
  renderSelectOption(option) {
    const { type, checked } = option;
    return h("calcite-option", { selected: checked, value: type }, this.getOptionLabel(option));
  }
  renderSelectFormat() {
    var _a, _b, _c, _d;
    const labelKey = (_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a.uiSchema) === null || _b === void 0 ? void 0 : _b.options.labelKey;
    const select = h("calcite-select", { class: "max-w-21", disabled: this._disabled, id: "scheduler-select", label: (_c = this.params) === null || _c === void 0 ? void 0 : _c.label, name: (_d = this.params) === null || _d === void 0 ? void 0 : _d.label, required: true, width: "full" }, this.options.map(option => {
      var _a;
      return this.renderSelectOption(Object.assign(Object.assign({}, option), { checked: option.type === ((_a = this.checkedOption) === null || _a === void 0 ? void 0 : _a.type) }));
    }));
    return h("div", { class: "select-format" }, labelKey
      ? h("calcite-label", null, this.intl.t(labelKey), select)
      : select, this.renderExpandedOptionSection());
  }
  renderSingleFormat() {
    return h("div", { class: "single-format" }, this.renderExpandedOptionSection());
  }
  render() {
    var _a, _b;
    let scheduler;
    switch ((_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a.uiSchema) === null || _b === void 0 ? void 0 : _b.options.format) {
      case 'select':
        scheduler = this.renderSelectFormat();
        break;
      case 'single':
        scheduler = this.renderSingleFormat();
        break;
    }
    return h(Host, { "data-element": "scheduler-field" }, scheduler);
  }
  static get is() { return "hub-field-input-scheduler"; }
  static get originalStyleUrls() {
    return {
      "$": ["scheduler.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["scheduler.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
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
          "tags": [{
              "name": "type",
              "text": "{IRenderParams} - required\n\n- format: 'select' | 'single'\n- options: ISchedulerOption[]\n\nSee examples here: packages/hub-components/src/html/arcgis-configuration-editor/schemas/fields/scheduler.js"
            }],
          "text": "The parameters for the field"
        }
      }
    };
  }
  static get states() {
    return {
      "value": {},
      "options": {},
      "isInitialized": {}
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
          "text": "Emitted when the value of the field changes"
        },
        "complexType": {
          "original": "IHubSchedule",
          "resolved": "IHubSchedule",
          "references": {
            "IHubSchedule": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }, {
        "method": "arcgisConfigurationEditorChange",
        "name": "arcgisConfigurationEditorChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IChangeEventDetail",
          "resolved": "IChangeEventDetail",
          "references": {
            "IChangeEventDetail": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "params",
        "methodName": "handleParamsChange"
      }, {
        "propName": "value",
        "methodName": "handleArcgisHubInputSchedulerChange"
      }];
  }
  static get listeners() {
    return [{
        "name": "calciteSelectChange",
        "method": "updateCheckedOptionSelectFormat",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "calciteInputTimePickerChange",
        "method": "updateHour",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "calciteInputTimeZoneChange",
        "method": "updateTimezone",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "calciteSelectChange",
        "method": "updateDayOrMonth",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "calciteInputNumberChange",
        "method": "updateDateNumber",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
