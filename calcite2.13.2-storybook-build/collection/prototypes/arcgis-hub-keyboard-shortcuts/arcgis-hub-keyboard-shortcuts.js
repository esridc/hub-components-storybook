import { Fragment, Host, h } from '@stencil/core';
import { checkPermission } from '@esri/hub-common';
import { getGlobalContext } from '../../utils/state';
import { config } from './config';
import intlManager from '../../utils/intl-manager';
export class ArcgisHubKeyboardShortcuts {
  constructor() {
    /*
      TODO:
        - The config should be typed
        - we will need a way of checking what is available... maybe the permission system?
          - but it may also need to be route dependent
        - i think this should take an optional config prop and use the built in one if not provided
      NOTE:
        - we need to be careful to not collide with existing shortcuts
        - the current implementation does not account for "this key then that key" but it's a good start
    */
    this.handleKeyPress = (event) => {
      // console.log('key pressed', event);
      if (this.modalOpen || event.target.tagName !== 'BODY') {
        return;
      }
      const shortcut = config.find((item) => {
        let result = false;
        // eslint-disable-next-line unicorn/prefer-ternary
        // NOTE: this should be refactored
        const modifiers = item.modifiers || [];
        const modifiersMatch = modifiers.every((modifier) => {
          return event[modifier];
        });
        let keyMatches = false;
        if (item.code) {
          keyMatches = event.code === item.code;
        }
        else if (item.key) {
          keyMatches = event.key === item.key;
        }
        result = keyMatches && modifiersMatch;
        return result;
      });
      if (shortcut) {
        this.currentShortcut = shortcut;
        switch (shortcut.action) {
          case 'renderComponent':
          case 'renderContent':
            this.modalOpen = true;
            break;
          case 'broadcastEvent':
            this.arcgisHubKeyboardShortcut.emit(shortcut.options);
            break;
          default:
            break;
        }
        event.preventDefault();
        event.stopPropagation();
      }
    };
    this.onModalClose = () => {
      this.modalOpen = false;
      this.currentShortcut = null;
    };
    this.modalOpen = false;
    this.currentShortcut = undefined;
  }
  get _context() { return getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.config = config.map(shortcut => {
      // this is a special case where we need to pass this config to the help component
      // so this array needs to reference itself
      if (shortcut.options.component === 'arcgis-hub-keyboard-shortcuts-help') {
        shortcut.options.componentArgs = {
          config: config,
          intl: this.intl
        };
      }
      return shortcut;
    });
  }
  connectedCallback() {
    if (checkPermission('hub:feature:keyboardshortcuts', this._context).access) {
      // if the permission is enabled, listen for keydown events
      document.addEventListener('keypress', this.handleKeyPress);
    }
  }
  disconnectedCallback() {
    document.removeEventListener('keypress', this.handleKeyPress);
  }
  renderContent() {
    const { options: { componentArgs, component: Tag, content } } = this.currentShortcut;
    if (Tag) {
      return h(Tag, Object.assign({}, componentArgs));
    }
    else if (content) {
      return h("div", { class: "modal-content", innerHTML: content });
    }
    else {
      return 'Component not found';
    }
  }
  renderModal() {
    var _a, _b, _c;
    if (['renderContent', 'renderComponent'].includes((_a = this.currentShortcut) === null || _a === void 0 ? void 0 : _a.action)) {
      return h(Fragment, null, h("div", { slot: "header" }, this.intl.t((_c = (_b = this.currentShortcut) === null || _b === void 0 ? void 0 : _b.options) === null || _c === void 0 ? void 0 : _c.modalTitleKey)), h("div", { slot: "content" }, this.renderContent()));
    }
  }
  render() {
    return (h(Host, { "data-element": "keyboard-shortcuts" }, h("calcite-modal", { onCalciteModalClose: this.onModalClose, open: this.modalOpen }, this.renderModal())));
  }
  static get is() { return "arcgis-hub-keyboard-shortcuts"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-keyboard-shortcuts.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-keyboard-shortcuts.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get states() {
    return {
      "modalOpen": {},
      "currentShortcut": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubKeyboardShortcut",
        "name": "arcgisHubKeyboardShortcut",
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
      }];
  }
  static get elementRef() { return "element"; }
}
