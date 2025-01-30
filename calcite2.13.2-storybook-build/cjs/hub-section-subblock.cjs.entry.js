'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const getPropertyFrom = require('./getPropertyFrom-29c68996.js');
const util = require('./util-38e73510.js');
const getProp = require('./get-prop-4bd8fc1a.js');

const subblockCss = ".section-subblock--l.sc-hub-section-subblock{--calcite-font-size--1:18px}.section-subblock--m.sc-hub-section-subblock{--calcite-font-size--1:16px}calcite-block-section.sc-hub-section-subblock-s>*,calcite-block-section .sc-hub-section-subblock-s>*{--calcite-font-size--1:14px}calcite-block-section.sc-hub-section-subblock-s>.section__content>.helper-text{margin-top:-1rem;margin-bottom:1.5rem}.variant-layout-editor.sc-hub-section-subblock{--calcite-font-weight-medium:var(--calcite-font-weight-bold)}.variant-layout-editor.sc-hub-section-subblock-s>.section__content>.section__fields,.variant-layout-editor .sc-hub-section-subblock-s>.section__content>.section__fields{font-weight:var(--calcite-font-weight-bold)}";

const Subblock = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldChange = index.createEvent(this, "arcgisConfigurationEditorFieldChange", 7);
    /**
     * subblock sections with a toggle switch can essentially
     * serve as both a section AND a field (e.g. toggling the
     * switch can enable/disable a property in the schema). In
     * this case, we need to emit the field change event for
     * the configuration editor to update the internal value
     * on the model.
     */
    this.handleCalciteBlockSectionToggle = (evt) => {
      // 1. grab the block section element, check if it's open,
      // and set the internal open state
      const el = evt.target;
      this._isOpen = !el.hasAttribute('open');
      // 2. grab the optionally defined property scope, and emit that
      // property's state for the configuration editor to manage
      const property = getPropertyFrom.getPropertyPathFromScope(this.params.uiSchema.scope);
      if (property) {
        this.arcgisConfigurationEditorFieldChange.emit({
          property,
          value: this._isOpen
        });
      }
    };
    this.params = undefined;
    this._isOpen = undefined;
    this._key = undefined;
  }
  componentWillLoad() {
    var _a, _b, _c;
    this._key = util.createId('subblock');
    // the "open" state of subblock fields is determined in one of two
    // ways depending on how the section is being leveraged:
    // 1. uiSchema.scope: if this section is acting as a field, the open
    // state is determined by the value at the property path defined by
    // its scope.
    // 2. uiSchema.options.open: if the section is simply a section (not tied
    // to a scope), a static boolean option can be configured to define the
    // initial state
    const scope = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.scope;
    const { open } = ((_b = this.params.uiSchema) === null || _b === void 0 ? void 0 : _b.options) || {};
    this._isOpen = open;
    if (this.toggleDisplay === 'switch' && scope) {
      const propertyPath = getPropertyFrom.getPropertyPathFromScope(scope);
      const value = getProp.getProp((_c = this.params.model) === null || _c === void 0 ? void 0 : _c.values, propertyPath);
      this._isOpen = !!value;
    }
  }
  get toggleDisplay() {
    var _a;
    return (_a = this.params.uiSchema.options) === null || _a === void 0 ? void 0 : _a.toggleDisplay;
  }
  get scale() {
    var _a;
    return ((_a = this.params.uiSchema.options) === null || _a === void 0 ? void 0 : _a.scale) || "l";
  }
  render() {
    return (index.h(index.Host, null, index.h("calcite-block-section", { class: {
        [this.params.variant]: Boolean(this.params.variant),
        [`section-subblock--${this.scale}`]: true
      }, "data-label": this.params.label, key: this._key, onCalciteBlockSectionToggle: this.handleCalciteBlockSectionToggle, open: this._isOpen, text: this.params.label, toggleDisplay: this.toggleDisplay || "button" }, index.h("slot", null))));
  }
};
Subblock.style = subblockCss;

exports.hub_section_subblock = Subblock;
