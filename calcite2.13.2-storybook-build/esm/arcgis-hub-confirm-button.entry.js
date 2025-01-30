import { r as registerInstance, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';

const arcgisHubConfirmButtonCss = ":host{display:block}:host([disabled]){pointer-events:none}";

const ArcgisHubConfirmButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    this.intl = await intlManager.loadIntlForComponent(this.element);
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
    return (h(Host, { "data-element": "confirm-button" }, h("calcite-button", { appearance: this.appearance, disabled: this.disabled, iconStart: this.icon, kind: this.kind, onClick: this.onClick }, this.text)));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubConfirmButton.style = arcgisHubConfirmButtonCss;

export { ArcgisHubConfirmButton as arcgis_hub_confirm_button };
