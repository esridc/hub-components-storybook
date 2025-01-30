import { r as registerInstance, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { a as TIME_INTERVAL, T as TIME_UNIT } from './date-time-d2b464c4.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';

const arcgisRelativeDateCss = ":host{display:block}calcite-tooltip-manager{display:inline}calcite-tooltip[aria-hidden=\"true\"]{pointer-events:none}";

var FormatStyle;
(function (FormatStyle) {
  FormatStyle["long"] = "long";
  FormatStyle["short"] = "short";
  FormatStyle["narrow"] = "narrow";
})(FormatStyle || (FormatStyle = {}));
const ArcgisRelativeDate = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisRelativeDate.style = arcgisRelativeDateCss;

export { ArcgisRelativeDate as arcgis_relative_date };
