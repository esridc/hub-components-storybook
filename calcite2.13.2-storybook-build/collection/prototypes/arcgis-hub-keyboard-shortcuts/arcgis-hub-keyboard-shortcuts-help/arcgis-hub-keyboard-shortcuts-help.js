import { Host, h } from '@stencil/core';
export class ArcgisHubKeyboardShortcutsHelp {
  constructor() {
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
  static get is() { return "arcgis-hub-keyboard-shortcuts-help"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-keyboard-shortcuts-help.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-keyboard-shortcuts-help.css"]
    };
  }
  static get properties() {
    return {
      "intl": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ComponentIntl",
          "resolved": "ComponentIntl",
          "references": {
            "ComponentIntl": {
              "location": "import",
              "path": "../../../utils/stencil-intl"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "config": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "config",
        "reflect": false
      }
    };
  }
}
