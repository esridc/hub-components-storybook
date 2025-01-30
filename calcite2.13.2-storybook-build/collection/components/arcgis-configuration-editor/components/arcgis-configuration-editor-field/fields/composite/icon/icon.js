import { Host, h } from '@stencil/core';
import { SCHEMA, UI_SCHEMA } from "./schema";
import { cloneObject } from '@esri/hub-common';
import intlManager from '../../../../../../../utils/intl-manager';
import { bind } from '../../../../../../../utils/context';
import { iconNames } from './icon-names';
;
/**
 * @internal
 * NOTE: this component is not ready for consumption
 */
export class Icon {
  constructor() {
    this.internalValues = {};
    this._schema = cloneObject(SCHEMA);
    this._uiSchema = cloneObject(UI_SCHEMA);
    this.values = {};
    this.isModalOpen = false;
    this.iconElements = [];
    this.selectedIcon = undefined;
    bind(this, 'translationFunc', 'handleOpenIconModal', 'handleSelectIcon', 'handleCloseIconModal', 'handleClickIcon', 'handleEditorChangeEvent');
  }
  async componentWillLoad() {
    var _a, _b;
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.selectedIcon = ((_b = (_a = this.values) === null || _a === void 0 ? void 0 : _a.icon) === null || _b === void 0 ? void 0 : _b.name) || '';
  }
  componentDidLoad() {
    // load the modal icons after the editor has loaded.
    // This speeds up the initial render
    this.loadIcons();
  }
  handleOpenIconModal() {
    this.isModalOpen = true;
  }
  handleCloseIconModal() {
    this.isModalOpen = false;
  }
  handleClickIcon(event) {
    this.selectedIcon = event.target.shadowRoot.querySelector('calcite-icon').getAttribute('icon');
  }
  handleSelectIcon() {
    this.internalValues = Object.assign(Object.assign({}, this.internalValues), { name: this.selectedIcon });
    this.isValid && this.arcgisCompositeIconFieldChange.emit(this.internalValues);
    this.isModalOpen = false;
  }
  handleEditorChangeEvent(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const { valid, values } = event.detail;
    this.internalValues = Object.assign(Object.assign({}, this.internalValues), values.icon);
    this.isValid = valid;
    if (valid) {
      this.arcgisCompositeIconFieldChange.emit(this.internalValues);
    }
  }
  loadIcons() {
    this.iconElements = iconNames.map((iconName) => {
      return h("calcite-action", { alignment: "center", icon: iconName, key: iconName, onClick: this.handleClickIcon, text: "" });
    });
  }
  translationFunc(key, values, opts) {
    return this.intl.t(key, values, opts);
  }
  render() {
    return (h(Host, null, h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleEditorChangeEvent, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: this.values }, h("div", { class: "select-icon", slot: "select-icon-button" }, h("calcite-button", { "icon-end": this.selectedIcon, onClick: this.handleOpenIconModal, width: "full" }, "Select an Icon"), h("arcgis-wormhole", null, h("calcite-modal", { onCalciteModalClose: this.handleCloseIconModal, open: this.isModalOpen, scale: "s" }, h("div", { slot: "header" }, this.intl.t('iconModalTitle')), h("div", { slot: "content" }, h("calcite-action-group", { columns: 6, layout: "grid" }, this.iconElements)), h("calcite-button", { appearance: "outline", onClick: this.handleCloseIconModal, slot: "secondary", width: "full" }, this.intl.t('cancel')), h("calcite-button", { disabled: !this.selectedIcon, onClick: this.handleSelectIcon, slot: "primary", width: "full" }, this.intl.t('select'))))))));
  }
  static get is() { return "hub-composite-input-icon"; }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "values": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IConfigurationValues",
          "resolved": "IConfigurationValues",
          "references": {
            "IConfigurationValues": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "{}"
      }
    };
  }
  static get states() {
    return {
      "isModalOpen": {},
      "iconElements": {},
      "selectedIcon": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisCompositeIconFieldChange",
        "name": "arcgisCompositeIconFieldChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IHubCompositeInputIcon",
          "resolved": "IHubCompositeInputIcon",
          "references": {
            "IHubCompositeInputIcon": {
              "location": "global"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
}
;
