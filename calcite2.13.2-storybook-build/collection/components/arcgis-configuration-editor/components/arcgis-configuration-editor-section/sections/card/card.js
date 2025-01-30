import { Host, h } from '@stencil/core';
import { createId } from '@esri/hub-common';
export class Card {
  constructor() {
    /**
     * generic handler for section actions - when an action is taken,
     * we emit an event with the action name and editor's current model
     * for the consuming app/component to hook into
     */
    this.handleSectionActionClick = (evt) => {
      const { model } = this.params;
      const el = evt.currentTarget;
      const action = el.getAttribute('data-key');
      this.arcgisConfigurationEditorSectionAction.emit({ action, model });
    };
    this.params = undefined;
  }
  componentWillLoad() {
    this._key = createId('card');
  }
  get scale() {
    var _a;
    return ((_a = this.params.uiSchema.options) === null || _a === void 0 ? void 0 : _a.scale) || "l";
  }
  get actions() {
    var _a;
    const { uiSchema } = this.params;
    const actions = ((_a = uiSchema.options) === null || _a === void 0 ? void 0 : _a.actions) || [];
    return actions.reduce((acc, action) => {
      if (action.slot === "footer-start") {
        acc.startActions.push(action);
      }
      else if (action.slot === "footer-end") {
        acc.endActions.push(action);
      }
      return acc;
    }, { startActions: [], endActions: [] });
  }
  renderActions(actions) {
    const { model, t } = this.params;
    return actions === null || actions === void 0 ? void 0 : actions.map((link) => {
      let label = link.label;
      if (!label && link.labelKey) {
        label = t(link.labelKey);
      }
      return (h("calcite-button", { appearance: link.appearance, "data-key": link.action, disabled: link.disableWhenInvalid && !model.valid, href: link.href, key: link.action, kind: link.kind, label: label, onClick: this.handleSectionActionClick, round: link.round }, label));
    });
  }
  render() {
    return (h(Host, null, h("calcite-card", { class: {
        [this.params.variant]: Boolean(this.params.variant),
        [`section-card--${this.scale}`]: true
      }, key: this._key }, h("div", { slot: "title" }, h("h3", null, this.params.label)), h("slot", null), h("div", { slot: "footer-start" }, this.renderActions(this.actions.startActions)), h("div", { slot: "footer-end" }, this.renderActions(this.actions.endActions)))));
  }
  static get is() { return "hub-section-card"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["card.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["card.css"]
    };
  }
  static get properties() {
    return {
      "params": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ISectionParams",
          "resolved": "ISectionParams",
          "references": {
            "ISectionParams": {
              "location": "import",
              "path": "../../resources"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      }
    };
  }
  static get events() {
    return [{
        "method": "arcgisConfigurationEditorSectionAction",
        "name": "arcgisConfigurationEditorSectionAction",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "{ action: string, model: IChangeEventDetail }",
          "resolved": "{ action: string; model: IChangeEventDetail; }",
          "references": {
            "IChangeEventDetail": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }];
  }
}
;
