'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');

const arcgisHubConfirmButtonCss = ":host{display:block}:host([disabled]){pointer-events:none}";

const ArcgisHubConfirmButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.reset = () => {
      this.state = 'default';
    };
    this.onClick = (e) => {
      switch (this.state) {
        case 'default':
          e.stopPropagation();
          this.state = 'confirm';
          break;
        case 'confirm':
          setTimeout(this.reset, 1000);
          break;
      }
    };
    this.state = 'default';
    this.disabled = false;
    this.icon = undefined;
    this.kind = 'brand';
    this.defaultText = null;
    this.confirmText = null;
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  get appearance() {
    switch (this.state) {
      case 'default':
        return 'outline';
      case 'confirm':
        return 'solid';
    }
  }
  get text() {
    switch (this.state) {
      case 'default':
        return this.defaultText || this.intl.t('delete');
      case 'confirm':
        return this.confirmText || this.intl.t('confirmDelete');
    }
  }
  render() {
    return (index.h(index.Host, { "data-element": "confirm-button" }, index.h("calcite-button", { appearance: this.appearance, disabled: this.disabled, iconStart: this.icon, kind: this.kind, onClick: this.onClick }, this.text)));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubConfirmButton.style = arcgisHubConfirmButtonCss;

exports.arcgis_hub_confirm_button = ArcgisHubConfirmButton;
