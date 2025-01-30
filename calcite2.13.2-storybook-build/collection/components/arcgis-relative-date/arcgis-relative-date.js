import { Host, h } from '@stencil/core';
import intlManager from '../../utils/intl-manager';
import { TIME_INTERVAL, TIME_UNIT } from '../../utils/date-time';
var FormatStyle;
(function (FormatStyle) {
  FormatStyle["long"] = "long";
  FormatStyle["short"] = "short";
  FormatStyle["narrow"] = "narrow";
})(FormatStyle || (FormatStyle = {}));
export class ArcgisRelativeDate {
  constructor() {
    this.dateTime = undefined;
    this.tooltip = undefined;
    this.formatStyle = FormatStyle.long;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  get _date() {
    const { dateTime } = this;
    let date;
    if (typeof dateTime === 'number') {
      date = new Date(dateTime);
    }
    else if (typeof dateTime === 'string' && /^\d+$/.test(dateTime)) {
      date = new Date(parseInt(dateTime, 10));
    }
    else {
      date = new Date(dateTime);
    }
    return date;
  }
  get isoString() {
    return this._date.toISOString();
  }
  get localeString() {
    const { _date, intl } = this;
    return _date.toLocaleString(intl.locale, {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  }
  get relativeString() {
    const { _date, intl, formatStyle: style } = this;
    const dateMs = _date.getTime();
    const nowMs = Date.now();
    const delta = nowMs - dateMs;
    let result;
    if (delta < TIME_INTERVAL.SECOND) {
      result = intl.t('now');
    }
    else {
      let unit;
      let num;
      if (delta < TIME_INTERVAL.HOUR) {
        num = delta / TIME_INTERVAL.MINUTE;
        unit = TIME_UNIT.MINUTE;
      }
      else if (delta < TIME_INTERVAL.DAY) {
        num = delta / TIME_INTERVAL.HOUR;
        unit = TIME_UNIT.HOUR;
        num = delta / TIME_INTERVAL.HOUR;
      }
      else if (delta < TIME_INTERVAL.WEEK) {
        num = delta / TIME_INTERVAL.DAY;
        unit = TIME_UNIT.DAY;
      }
      else if (delta < 4 * TIME_INTERVAL.WEEK) {
        num = delta / TIME_INTERVAL.WEEK;
        unit = TIME_UNIT.WEEK;
      }
      else if (delta < TIME_INTERVAL.YEAR) {
        num = delta / TIME_INTERVAL.MONTH;
        unit = TIME_UNIT.MONTH;
      }
      else {
        num = delta / TIME_INTERVAL.YEAR;
        unit = TIME_UNIT.YEAR;
      }
      result = intl.formatRelativeTime((Math.floor(num) || 1) * -1, unit, { style });
    }
    return result;
  }
  render() {
    return (h(Host, null, this.tooltip && (h("calcite-tooltip", { label: this.localeString, placement: "top", referenceElement: "time" }, this.localeString)), h("calcite-tooltip-manager", null, h("time", { dateTime: this.isoString, id: "time" }, this.relativeString))));
  }
  static get is() { return "arcgis-relative-date"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-relative-date.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-relative-date.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "dateTime": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "Date | string | number",
          "resolved": "Date | number | string",
          "references": {
            "Date": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "A date in the past. Must be a valid date string, number or object"
        },
        "attribute": "date-time",
        "reflect": false
      },
      "tooltip": {
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
          "text": "If the tooltip should render"
        },
        "attribute": "tooltip",
        "reflect": false
      },
      "formatStyle": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "FormatStyle",
          "resolved": "FormatStyle.long | FormatStyle.narrow | FormatStyle.short",
          "references": {
            "FormatStyle": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The format style"
        },
        "attribute": "format-style",
        "reflect": false,
        "defaultValue": "FormatStyle.long"
      }
    };
  }
  static get elementRef() { return "element"; }
}
