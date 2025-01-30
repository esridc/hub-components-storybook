import { r as registerInstance, c as createEvent, h, H as Host } from './index-57f71b44.js';
import { c as createId } from './util-3e6872d9.js';
import './get-prop-ec5be510.js';

const cardCss = ".sc-hub-section-card-h{display:block}.sc-hub-section-card-h:not(.configuration-editor__last-child){margin-bottom:0.75rem}div[slot=\"title\"].sc-hub-section-card{border-bottom:1px solid var(--calcite-color-border-3);margin-left:-0.75rem;margin-right:-0.75rem;margin-top:-0.75rem;margin-bottom:-0.25rem;display:flex;height:3rem;align-items:center}.section-card--l.sc-hub-section-card div[slot=\"title\"].sc-hub-section-card h3.sc-hub-section-card{margin:0.75rem;font-size:var(--calcite-font-size-1);line-height:1.5rem;font-weight:var(--calcite-font-weight-medium)}calcite-card.sc-hub-section-card-s>.section__content>.helper-text{margin-top:0px;margin-bottom:1.5rem}";

const Card = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisConfigurationEditorSectionAction = createEvent(this, "arcgisConfigurationEditorSectionAction", 7);
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
};
Card.style = cardCss;

export { Card as hub_section_card };
