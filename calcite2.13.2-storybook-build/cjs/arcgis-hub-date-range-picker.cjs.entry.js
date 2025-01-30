'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const context = require('./context-0167a31e.js');
const index$1 = require('./index-6f16fe65.js');
const utils = require('./utils-63ff43ec.js');
const util = require('./util-38e73510.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./get-prop-4bd8fc1a.js');

const arcgisHubDateRangePickerCss = ":host{display:flex}:host calcite-input-date-picker{width:auto}";

const ArcgisHubDateRangePicker = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubDateRangePickerSelect = index.createEvent(this, "arcgisHubDateRangePickerSelect", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.options = util.cloneObject(utils.PREDEFINED_DATE_OPTIONS);
    this.layout = undefined;
    this.value = undefined;
    this.min = undefined;
    this.max = undefined;
    this.selectedValue = undefined;
    this.customStartDate = undefined;
    this.customEndDate = undefined;
    context.bind(this, 'handleCalciteInputDatePickerRef');
  }
  handleSelectedValueChange() {
    if (this.isCustom && (!this.customStartDate || !this.customEndDate)) {
      return;
    }
    this.arcgisHubDateRangePickerSelect.emit({
      name: this.selectedValue,
      startDate: this.startDate,
      endDate: this.endDate
    });
    this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.search.label.query), { details: this.selectedValue }));
  }
  handleCalciteDropdownOpen() {
    this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.open.label.dropdown), { details: 'Date Range' }));
  }
  handleCalciteDrodownSelect() {
    this.selectedValue = this.dropdownEl.selectedItems[0].dataset.value;
  }
  handleCalciteDatePickerRangeChange() {
    const [startDate, endDate] = this.calciteInputDatePickerEl.valueAsDate;
    if (startDate) {
      this.customStartDate = startDate;
    }
    if (endDate) {
      this.customEndDate = endDate;
    }
  }
  setDropdownEl(el) {
    this.dropdownEl = el;
  }
  get isCustom() {
    return this.selectedValue === 'custom';
  }
  get startDate() {
    var _a;
    return (_a = utils.getDateRangePickerOptions(this.customStartDate, this.customEndDate)[this.selectedValue]) === null || _a === void 0 ? void 0 : _a.startDate;
  }
  get endDate() {
    var _a;
    return ((_a = utils.getDateRangePickerOptions(this.customStartDate, this.customEndDate)[this.selectedValue]) === null || _a === void 0 ? void 0 : _a.endDate) || new Date();
  }
  get _messageOverrides() {
    return {
      nextMonth: this.intl.t('nextMonth'),
      prevMonth: this.intl.t('previousMonth'),
      year: this.intl.t('year')
    };
  }
  async componentWillLoad() {
    var _a;
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    if (typeof this.value === 'string') {
      this.selectedValue = this.value;
      if (this.isCustom) {
        this.customStartDate = null;
        this.customEndDate = null;
      }
    }
    else if ((_a = this.value) === null || _a === void 0 ? void 0 : _a.length) {
      this.selectedValue = 'custom';
      this.customStartDate = new Date(this.value[0]);
      this.customEndDate = new Date(this.value[1]);
    }
  }
  // workaround for pointer-events issue introduced by calcite-components v1.0.0-beta.98
  // TODO: try removing next time we bump calcite-components
  handleCalciteInputDatePickerRef(inputDatePicker) {
    this.calciteInputDatePickerEl = inputDatePicker;
    if (inputDatePicker && inputDatePicker.shadowRoot && !inputDatePicker.shadowRoot.querySelector('style[data-hub]')) {
      const style = document.createElement("style");
      style.dataset.hub = "";
      style.innerHTML = ".menu-container { pointer-events: auto !important; }";
      inputDatePicker.shadowRoot.appendChild(style);
    }
  }
  get buttonText() {
    const { startDate, endDate } = this;
    return this.isCustom ? null : `${this.intl.formatDate(startDate)} - ${this.intl.formatDate(endDate)}`;
  }
  renderDropdown() {
    return (index.h("calcite-dropdown", { ref: this.setDropdownEl.bind(this) }, index.h("calcite-button", { appearance: "outline", "icon-end": "chevron-down", kind: "neutral", round: !this.isCustom, slot: "trigger" }, this.buttonText), index.h("calcite-dropdown-group", { "group-title": this.intl.t('title'), "selection-mode": "single" }, Object.keys(utils.getDateRangePickerOptions()).reduce((options, option) => {
      if (this.options.includes(option)) {
        options.push(index.h("calcite-dropdown-item", { "data-value": option, key: option, selected: option === this.selectedValue }, this.intl.t(`${option}`)));
      }
      return options;
    }, []))));
  }
  render() {
    return index.h(index.Host, { "data-element": "date-range-picker" }, this.isCustom && index.h("calcite-input-date-picker", { lang: this.intl.locale, layout: this.layout || 'horizontal', max: this.max, messageOverrides: this._messageOverrides, min: this.min, range: true, ref: this.handleCalciteInputDatePickerRef, role: "application", valueAsDate: [this.customStartDate, this.customEndDate] }), this.renderDropdown());
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "selectedValue": ["handleSelectedValueChange"],
    "customStartDate": ["handleSelectedValueChange"],
    "customEndDate": ["handleSelectedValueChange"]
  }; }
};
ArcgisHubDateRangePicker.style = arcgisHubDateRangePickerCss;

exports.arcgis_hub_date_range_picker = ArcgisHubDateRangePicker;
