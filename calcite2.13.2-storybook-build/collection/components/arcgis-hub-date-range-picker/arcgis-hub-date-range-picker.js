import { Host, h } from '@stencil/core';
import intlManager from '../../utils/intl-manager';
import { bind } from '../../utils/context';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { PREDEFINED_DATE_OPTIONS, getDateRangePickerOptions } from './utils';
import { cloneObject } from '@esri/hub-common';
export class ArcgisHubDateRangePicker {
  constructor() {
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
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action.search.label.query), { details: this.selectedValue }));
  }
  handleCalciteDropdownOpen() {
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action.open.label.dropdown), { details: 'Date Range' }));
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
  static get is() { return "arcgis-hub-date-range-picker"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-date-range-picker.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-date-range-picker.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "options": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "PredefinedDateOption[]",
          "resolved": "string[]",
          "references": {
            "PredefinedDateOption": {
              "location": "import",
              "path": "./utils"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{PredefinedDateOption[]}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubDateRangePicker"
            }],
          "text": "The date range options to show in the dropdown"
        },
        "defaultValue": "cloneObject(PREDEFINED_DATE_OPTIONS)"
      },
      "layout": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'horizontal' | 'vertical'",
          "resolved": "\"horizontal\" | \"vertical\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The layout of the date picker"
        },
        "attribute": "layout",
        "reflect": false
      },
      "value": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "PredefinedDateOption | string[]",
          "resolved": "string | string[]",
          "references": {
            "PredefinedDateOption": {
              "location": "import",
              "path": "./utils"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{PredefinedDateOption | string[]}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubDateRangePicker"
            }],
          "text": "The pre-defined or custom date range value"
        },
        "attribute": "value",
        "reflect": false
      },
      "min": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{string}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubDateRangePicker"
            }],
          "text": "Earliest allowed date for custom date range picker"
        },
        "attribute": "min",
        "reflect": false
      },
      "max": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{string}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubDateRangePicker"
            }],
          "text": "Latest allowed date for custom date range picker"
        },
        "attribute": "max",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "selectedValue": {},
      "customStartDate": {},
      "customEndDate": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubDateRangePickerSelect",
        "name": "arcgisHubDateRangePickerSelect",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "Record<string, any>",
          "resolved": "{ [x: string]: any; }",
          "references": {
            "Record": {
              "location": "global"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "selectedValue",
        "methodName": "handleSelectedValueChange"
      }, {
        "propName": "customStartDate",
        "methodName": "handleSelectedValueChange"
      }, {
        "propName": "customEndDate",
        "methodName": "handleSelectedValueChange"
      }];
  }
  static get listeners() {
    return [{
        "name": "calciteDropdownOpen",
        "method": "handleCalciteDropdownOpen",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "calciteDropdownSelect",
        "method": "handleCalciteDrodownSelect",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "calciteInputDatePickerChange",
        "method": "handleCalciteDatePickerRangeChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
