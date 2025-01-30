import { r as registerInstance, h, H as Host } from './index-57f71b44.js';

const arcgisHubKeyboardShortcutsHelpCss = ":host{display:flex;flex-direction:row;justify-content:space-between;align-items:flex-start;gap:1rem}section{border:solid 1px lightgray;border-radius:5px;flex:1}section h2{background-color:#f0f0f0;font-size:1rem;margin:0;padding:0.25rem 0.5rem;border-bottom:solid 1px lightgray}ul{padding:0;margin:0;list-style-type:none}li{padding:0.5rem;border-bottom:solid 1px lightgray;display:flex;justify-content:space-between;align-items:center}li:last-child{border-bottom:none}li div:last-child{display:flex;gap:0.5rem}.modifier-key{border:solid 1px lightgray;background-color:#f0f0f0;border-radius:3px;padding-inline:0.2rem;display:inline-flex;align-items:center}";

const ArcgisHubKeyboardShortcutsHelp = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.intl = undefined;
    this.config = undefined;
  }
  mapKeyToLabel(key) {
    var _a, _b;
    // NOTE: this will need to account for the os
    const platform = ((_b = (_a = window.navigator) === null || _a === void 0 ? void 0 : _a.userAgentData) === null || _b === void 0 ? void 0 : _b.platform) || window.navigator.platform;
    const os = platform.toLowerCase().startsWith('mac') ? 'mac' : 'win';
    return this.intl.t(`metaKeys.${os}.${key}`);
  }
  renderConfig() {
    const groupedShortcuts = this.config.reduce((acc, shortcut) => {
      var _a;
      const { categoryKey } = shortcut;
      acc[categoryKey] = (_a = acc[categoryKey]) !== null && _a !== void 0 ? _a : [];
      acc[categoryKey].push(shortcut);
      return acc;
    }, {});
    // NOTE: obviously this needs work...
    return Object.entries(groupedShortcuts).map(([categoryKey, shortcuts]) => {
      return (h("section", { key: categoryKey }, h("h2", null, this.intl.t(categoryKey)), h("ul", null, shortcuts.map(shortcut => {
        const keyboardKey = shortcut.key || shortcut.code.replace(/^Key/, '').toLowerCase();
        return (h("li", { key: shortcut.labelKey }, h("div", null, this.intl.t(shortcut.labelKey)), h("div", null, shortcut.modifiers.map(modifier => {
          const label = this.mapKeyToLabel(modifier);
          return h("span", { class: "modifier-key", key: label }, label);
        }), h("span", { class: "modifier-key" }, keyboardKey))));
      }))));
    });
  }
  render() {
    return (h(Host, { "data-element": "keyboard-shortcuts" }, this.renderConfig()));
  }
};
ArcgisHubKeyboardShortcutsHelp.style = arcgisHubKeyboardShortcutsHelpCss;

export { ArcgisHubKeyboardShortcutsHelp as arcgis_hub_keyboard_shortcuts_help };
