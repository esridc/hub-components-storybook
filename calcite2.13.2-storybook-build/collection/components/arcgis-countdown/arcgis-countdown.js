import { h } from '@stencil/core';
import { CSS } from "./resources";
import { Shareable } from "../functional/shareable";
import intlManager from '../../utils/intl-manager';
export class ArcgisCountdown {
  constructor() {
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
    this.intl = await intlManager.loadIntlForComponent(this.element);
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
    return h("div", { class: CSS.header, slot: "title" }, title && h("h1", { class: CSS.title }, title));
  }
  renderCountdown() {
    return ['days', 'hours', 'minutes', 'seconds'].map(counter => {
      return h("div", null, h("span", { class: `${counter} counter` }, this[counter]), h("div", { class: "unit" }, this.intl.t(counter)));
    });
  }
  renderError() {
    return h("calcite-notice", { kind: "danger", open: true, scale: "m", width: "auto" }, h("div", { slot: "title" }, this.intl.t('countdownDateMissingError')));
  }
  render() {
    return (this.countdownDate
      ? h(Shareable, { context: this, showShareUi: true }, h("calcite-card", null, this.renderHeader(this.cardTitle), h("div", { class: CSS.countdown }, this.renderCountdown())))
      : this.renderError());
  }
  static get is() { return "arcgis-countdown"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-countdown.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-countdown.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "cardTitle": {
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
              "text": "ArcgisCountdown"
            }],
          "text": "The title to appear at the top of the countdown card"
        },
        "attribute": "card-title",
        "reflect": true
      },
      "countdownDate": {
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
              "text": "ArcgisCountdown"
            }],
          "text": "The date to countdown to"
        },
        "attribute": "countdown-date",
        "reflect": true
      },
      "shareable": {
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
          "text": "Whether the card should render a share button"
        },
        "attribute": "shareable",
        "reflect": true,
        "defaultValue": "false"
      },
      "shareableByValue": {
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
          "text": ""
        },
        "attribute": "shareable-by-value",
        "reflect": true,
        "defaultValue": "false"
      },
      "shareableByReference": {
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
          "text": ""
        },
        "attribute": "shareable-by-reference",
        "reflect": true,
        "defaultValue": "false"
      },
      "shareableOnHover": {
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
          "text": ""
        },
        "attribute": "shareable-on-hover",
        "reflect": true,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "days": {},
      "hours": {},
      "minutes": {},
      "seconds": {}
    };
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "countdownDate",
        "methodName": "onCountdownDateChange"
      }];
  }
}
