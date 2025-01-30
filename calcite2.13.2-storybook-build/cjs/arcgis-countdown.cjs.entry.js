'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const shareable = require('./shareable-36054bd4.js');
const intlManager = require('./intl-manager-f0103583.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');

const CSS = {
  header: "header",
  title: "title",
  countdown: "countdown",
};

const arcgisCountdownCss = ":host{display:block}.countdown{display:flex}.countdown>div{display:flex;flex-direction:column;align-items:center;padding-right:1rem}.counter{font-size:var(--calcite-font-size-3);line-height:2rem}.unit{font-size:var(--calcite-font-size-1);line-height:1.5rem}";

const ArcgisCountdown = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.cardTitle = undefined;
    this.countdownDate = undefined;
    this.shareable = false;
    this.shareableByValue = false;
    this.shareableByReference = false;
    this.shareableOnHover = false;
    this.days = undefined;
    this.hours = undefined;
    this.minutes = undefined;
    this.seconds = undefined;
  }
  onCountdownDateChange(date) {
    this.intervalId && this.cleanupCountdown(this.intervalId);
    this.initializeCountdown(date);
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  async componentDidLoad() {
    this.countdownDate && this.initializeCountdown(this.countdownDate);
  }
  disconnectedCallback() {
    this.cleanupCountdown(this.intervalId);
  }
  /**
   * function to initialize the countdown timer
   * and call the update function on a set interval
   * (i.e. every 1 second)
   *
   * @param {string} countdownDate
   */
  initializeCountdown(countdownDate) {
    this.updateCountdown(countdownDate);
    this.intervalId = setInterval(this.updateCountdown.bind(this), 1000, countdownDate);
  }
  /**
   * function to update the rendered countdown.
   * Once the countdown has reached 0, the continuous
   * interval is removed
   *
   * @param {string} countdownDate
   */
  updateCountdown(countdownDate) {
    const t = this.getTimeRemaining(countdownDate);
    this.days = t.days.toString();
    this.hours = ('0' + t.hours).slice(-2);
    this.minutes = ('0' + t.minutes).slice(-2);
    this.seconds = ('0' + t.seconds).slice(-2);
    if (t.total <= 0) {
      this.cleanupCountdown(this.intervalId);
    }
  }
  /**
   * given a date string, this function returns the total and
   * broken down time (days, hours, minutes, seconds) until
   * the date is reached
   *
   * @param {string} countdownDate
   * @returns {ITimeRemaining}
   */
  getTimeRemaining(countdownDate) {
    // we need to set the time to 00:00:00.000 since we are only dealing with countdowns to a specific date
    const formattedCountdownDate = `${new Date(countdownDate).toISOString().split('T').shift()}T00:00:00.000`;
    const total = Date.parse(formattedCountdownDate) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return { total, days, hours, minutes, seconds };
  }
  /**
   * function to cleanup an existing countdown by removing
   * its continuous interval
   *
   * @param id countdown interval identifier
   */
  cleanupCountdown(id) {
    clearInterval(id);
  }
  renderHeader(title) {
    return index.h("div", { class: CSS.header, slot: "title" }, title && index.h("h1", { class: CSS.title }, title));
  }
  renderCountdown() {
    return ['days', 'hours', 'minutes', 'seconds'].map(counter => {
      return index.h("div", null, index.h("span", { class: `${counter} counter` }, this[counter]), index.h("div", { class: "unit" }, this.intl.t(counter)));
    });
  }
  renderError() {
    return index.h("calcite-notice", { kind: "danger", open: true, scale: "m", width: "auto" }, index.h("div", { slot: "title" }, this.intl.t('countdownDateMissingError')));
  }
  render() {
    return (this.countdownDate
      ? index.h(shareable.Shareable, { context: this, showShareUi: true }, index.h("calcite-card", null, this.renderHeader(this.cardTitle), index.h("div", { class: CSS.countdown }, this.renderCountdown())))
      : this.renderError());
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "countdownDate": ["onCountdownDateChange"]
  }; }
};
ArcgisCountdown.style = arcgisCountdownCss;

exports.arcgis_countdown = ArcgisCountdown;
