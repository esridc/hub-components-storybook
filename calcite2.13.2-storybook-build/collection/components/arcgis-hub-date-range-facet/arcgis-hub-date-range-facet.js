import { getProp } from '@esri/hub-common';
import { Host, h } from '@stencil/core';
import { isValidDateRange } from '../../utils/gallery-utils';
import { bind } from '../../utils/context';
import intlManager from '../../utils/intl-manager';
export class ArcgisHubDateRangeFacet {
  constructor() {
    this.facet = undefined;
    bind(this, 'handleDateRangeChange');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  changeDateRange(range = { from: null, to: null }) {
    this.arcgisHubDateRangeFacetChange.emit({
      key: this.facet.key,
      value: range,
    });
  }
  handleDateRangeChange(event) {
    event.preventDefault();
    const [startDate, endDate] = event.target.valueAsDate;
    const range = {
      from: startDate === null || startDate === void 0 ? void 0 : startDate.toISOString(),
      to: endDate === null || endDate === void 0 ? void 0 : endDate.toISOString()
    };
    // range has been selected
    if (isValidDateRange(range)) {
      this.changeDateRange(range);
    }
    // range has been cleared
    else if (!startDate && !endDate) {
      this.changeDateRange();
    }
    // invalid date range - display validation error
    else {
      // need to emit here otherwise the picker doesn't visually update the first selection the user makes
      this.changeDateRange(range);
    }
  }
  render() {
    const startDate = getProp(this.facet, 'value.from') || null;
    const endDate = getProp(this.facet, 'value.to') || null;
    const max = getProp(this.facet, 'max');
    const maxDate = max ? new Date(max) : null;
    const displayValidationMessage = !startDate !== !endDate; // if only one date is empty it is an invalid state
    return (h(Host, { "data-element": "date-range-facet" }, h("calcite-input-date-picker", { id: "input-date-picker", layout: "vertical", max: maxDate === null || maxDate === void 0 ? void 0 : maxDate.toISOString(), onCalciteInputDatePickerChange: this.handleDateRangeChange, range: true, scale: "m", status: displayValidationMessage ? "invalid" : "idle", value: [startDate, endDate] }), displayValidationMessage &&
      h("calcite-input-message", { "aria-labelledby": "input-date-picker", icon: "x-octagon", status: "invalid" }, this.intl.t('validationMessage'))));
  }
  static get is() { return "arcgis-hub-date-range-facet"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-date-range-facet.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-date-range-facet.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "facet": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IDateRangeFacet",
          "resolved": "IDateRangeFacet",
          "references": {
            "IDateRangeFacet": {
              "location": "import",
              "path": "../../utils/types"
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
        "method": "arcgisHubDateRangeFacetChange",
        "name": "arcgisHubDateRangeFacetChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "DateRangeFacetChangePayload",
          "resolved": "{ key: string; value: IDateRange<string>; }",
          "references": {
            "DateRangeFacetChangePayload": {
              "location": "import",
              "path": "../../utils/state-utils"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
}
