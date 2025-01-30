'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const dateTime = require('./date-time-7a41551c.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');

const arcgisRelativeDateCss = ":host{display:block}calcite-tooltip-manager{display:inline}calcite-tooltip[aria-hidden=\"true\"]{pointer-events:none}";

var FormatStyle;
(function (FormatStyle) {
  FormatStyle["long"] = "long";
  FormatStyle["short"] = "short";
  FormatStyle["narrow"] = "narrow";
})(FormatStyle || (FormatStyle = {}));
const ArcgisRelativeDate = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.dateTime = undefined;
    this.tooltip = undefined;
    this.formatStyle = FormatStyle.long;
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
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
    if (delta < dateTime.TIME_INTERVAL.SECOND) {
      result = intl.t('now');
    }
    else {
      let unit;
      let num;
      if (delta < dateTime.TIME_INTERVAL.HOUR) {
        num = delta / dateTime.TIME_INTERVAL.MINUTE;
        unit = dateTime.TIME_UNIT.MINUTE;
      }
      else if (delta < dateTime.TIME_INTERVAL.DAY) {
        num = delta / dateTime.TIME_INTERVAL.HOUR;
        unit = dateTime.TIME_UNIT.HOUR;
        num = delta / dateTime.TIME_INTERVAL.HOUR;
      }
      else if (delta < dateTime.TIME_INTERVAL.WEEK) {
        num = delta / dateTime.TIME_INTERVAL.DAY;
        unit = dateTime.TIME_UNIT.DAY;
      }
      else if (delta < 4 * dateTime.TIME_INTERVAL.WEEK) {
        num = delta / dateTime.TIME_INTERVAL.WEEK;
        unit = dateTime.TIME_UNIT.WEEK;
      }
      else if (delta < dateTime.TIME_INTERVAL.YEAR) {
        num = delta / dateTime.TIME_INTERVAL.MONTH;
        unit = dateTime.TIME_UNIT.MONTH;
      }
      else {
        num = delta / dateTime.TIME_INTERVAL.YEAR;
        unit = dateTime.TIME_UNIT.YEAR;
      }
      result = intl.formatRelativeTime((Math.floor(num) || 1) * -1, unit, { style });
    }
    return result;
  }
  render() {
    return (index.h(index.Host, null, this.tooltip && (index.h("calcite-tooltip", { label: this.localeString, placement: "top", referenceElement: "time" }, this.localeString)), index.h("calcite-tooltip-manager", null, index.h("time", { dateTime: this.isoString, id: "time" }, this.relativeString))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisRelativeDate.style = arcgisRelativeDateCss;

exports.arcgis_relative_date = ArcgisRelativeDate;
