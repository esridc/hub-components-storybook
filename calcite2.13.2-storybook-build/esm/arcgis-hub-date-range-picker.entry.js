import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { b as bind } from './context-7d8f7366.js';
import { d as dist } from './index-dd3f99ac.js';
import { g as getDateRangePickerOptions, P as PREDEFINED_DATE_OPTIONS } from './utils-b2491d65.js';
import { a as cloneObject } from './util-3e6872d9.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './_commonjsHelpers-11ca3be1.js';
import './get-prop-ec5be510.js';

const arcgisHubDateRangePickerCss = ":host{display:flex}:host calcite-input-date-picker{width:auto}";

const ArcgisHubDateRangePicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubDateRangePickerSelect = createEvent(this, "arcgisHubDateRangePickerSelect", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.options = cloneObject(PREDEFINED_DATE_OPTIONS);
    this.layout = undefined;
    this.value = undefined;
    this.min = undefined;
    this.max = undefined;
    this.selectedValue = undefined;
    this.customStartDate = undefined;
    this.customEndDate = undefined;
    bind(this, 'handleCalciteInputDatePickerRef');
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
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.search.label.query), { details: this.selectedValue }));
  }
  handleCalciteDropdownOpen() {
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.open.label.dropdown), { details: 'Date Range' }));
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
    return (_a = getDateRangePickerOptions(this.customStartDate, this.customEndDate)[this.selectedValue]) === null || _a === void 0 ? void 0 : _a.startDate;
  }
  get endDate() {
    var _a;
    return ((_a = getDateRangePickerOptions(this.customStartDate, this.customEndDate)[this.selectedValue]) === null || _a === void 0 ? void 0 : _a.endDate) || new Date();
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
    this.intl = await intlManager.loadIntlForComponent(this.element);
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
    return (h("calcite-dropdown", { ref: this.setDropdownEl.bind(this) }, h("calcite-button", { appearance: "outline", "icon-end": "chevron-down", kind: "neutral", round: !this.isCustom, slot: "trigger" }, this.buttonText), h("calcite-dropdown-group", { "group-title": this.intl.t('title'), "selection-mode": "single" }, Object.keys(getDateRangePickerOptions()).reduce((options, option) => {
      if (this.options.includes(option)) {
        options.push(h("calcite-dropdown-item", { "data-value": option, key: option, selected: option === this.selectedValue }, this.intl.t(`${option}`)));
      }
      return options;
    }, []))));
  }
  render() {
    return h(Host, { "data-element": "date-range-picker" }, this.isCustom && h("calcite-input-date-picker", { lang: this.intl.locale, layout: this.layout || 'horizontal', max: this.max, messageOverrides: this._messageOverrides, min: this.min, range: true, ref: this.handleCalciteInputDatePickerRef, role: "application", valueAsDate: [this.customStartDate, this.customEndDate] }), this.renderDropdown());
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "selectedValue": ["handleSelectedValueChange"],
    "customStartDate": ["handleSelectedValueChange"],
    "customEndDate": ["handleSelectedValueChange"]
  }; }
};
ArcgisHubDateRangePicker.style = arcgisHubDateRangePickerCss;

export { ArcgisHubDateRangePicker as arcgis_hub_date_range_picker };
