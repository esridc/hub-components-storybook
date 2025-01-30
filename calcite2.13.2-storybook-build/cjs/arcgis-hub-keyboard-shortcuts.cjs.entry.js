'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const state = require('./state-6637df8c.js');
const intlManager = require('./intl-manager-f0103583.js');
const checkPermission = require('./checkPermission-11ab5992.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./TemplateBusinessRules-5564c964.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./get-with-default-d1b1754d.js');
require('./map-by-a7a75788.js');

// TODO: we may want to reconsider how we recognize the key -there is event.key, keyCode, code... it is a mess
// we use code for letters (like KeyH) and key for symbols (like ?)
// NOTE on chrome on windows i don't get keyboard events with fn, alt, or window key pressed,
// so that leaves ctrl and shift as available modifiers
const config = [
  {
    // dave's component goes here
    categoryKey: 'categories.commands',
    labelKey: 'shortcuts.history.label',
    code: 'KeyH',
    modifiers: ['shiftKey'],
    action: 'renderComponent',
    options: {
      modalTitleKey: 'shortcuts.history.modalTitle',
    },
    //permission: '' // this is not implemented
  },
  {
    categoryKey: 'categories.commands',
    labelKey: 'shortcuts.help.label',
    key: '?',
    modifiers: ['shiftKey'],
    action: 'renderComponent',
    options: {
      modalTitleKey: 'shortcuts.help.modalTitle',
      component: 'arcgis-hub-keyboard-shortcuts-help',
      componentArgs: {
      // config and intl will go here
      }
    },
  },
  {
    categoryKey: 'categories.commands',
    labelKey: 'shortcuts.smile.label',
    code: 'KeyS',
    modifiers: ['ctrlKey', 'shiftKey'],
    action: 'renderContent',
    options: {
      modalTitleKey: 'shortcuts.smile.modalTitle',
      content: '<calcite-icon class="smile" icon="smile" scale="l"></calcite-icon>'
    }
  },
  {
    categoryKey: 'categories.navigation',
    labelKey: 'shortcuts.search.label',
    code: 'KeyS',
    modifiers: ['shiftKey'],
    action: 'broadcastEvent',
    options: {
      eventName: 'navigate',
      path: '/search'
    }
  }
];

const arcgisHubKeyboardShortcutsCss = ":host{display:block}calcite-modal{z-index:999999}.modal-content{display:flex;justify-content:center;align-items:center}.smile{height:auto;width:20vh;background-color:yellow;border-radius:50%}";

const ArcgisHubKeyboardShortcuts = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubKeyboardShortcut = index.createEvent(this, "arcgisHubKeyboardShortcut", 7);
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
  get _context() { return state.getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
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
    if (checkPermission.checkPermission('hub:feature:keyboardshortcuts', this._context).access) {
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
      return index.h(Tag, Object.assign({}, componentArgs));
    }
    else if (content) {
      return index.h("div", { class: "modal-content", innerHTML: content });
    }
    else {
      return 'Component not found';
    }
  }
  renderModal() {
    var _a, _b, _c;
    if (['renderContent', 'renderComponent'].includes((_a = this.currentShortcut) === null || _a === void 0 ? void 0 : _a.action)) {
      return index.h(index.Fragment, null, index.h("div", { slot: "header" }, this.intl.t((_c = (_b = this.currentShortcut) === null || _b === void 0 ? void 0 : _b.options) === null || _c === void 0 ? void 0 : _c.modalTitleKey)), index.h("div", { slot: "content" }, this.renderContent()));
    }
  }
  render() {
    return (index.h(index.Host, { "data-element": "keyboard-shortcuts" }, index.h("calcite-modal", { onCalciteModalClose: this.onModalClose, open: this.modalOpen }, this.renderModal())));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubKeyboardShortcuts.style = arcgisHubKeyboardShortcutsCss;

exports.arcgis_hub_keyboard_shortcuts = ArcgisHubKeyboardShortcuts;
