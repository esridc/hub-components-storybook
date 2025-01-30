import { r as registerInstance, h, H as Host } from './index-57f71b44.js';

const basicCss = ".sc-hub-section-basic-h{display:block}.sc-hub-section-basic-h:not(.configuration-editor__last-child){margin-bottom:2rem}.section-basic--s.sc-hub-section-basic .section-basic__header.sc-hub-section-basic .sc-hub-section-basic:is(h1,h2.sc-hub-section-basic,h3.sc-hub-section-basic,h4.sc-hub-section-basic,h5.sc-hub-section-basic,h6).sc-hub-section-basic{font-size:var(--calcite-font-size--1);margin-top:0px;margin-bottom:1.5rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}.section-basic--m.sc-hub-section-basic .section-basic__header.sc-hub-section-basic .sc-hub-section-basic:is(h1,h2.sc-hub-section-basic,h3.sc-hub-section-basic,h4.sc-hub-section-basic,h5.sc-hub-section-basic,h6).sc-hub-section-basic{font-size:var(--calcite-font-size-0);margin-top:0px;margin-bottom:1.5rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}.section-basic--l.sc-hub-section-basic .section-basic__header.sc-hub-section-basic .sc-hub-section-basic:is(h1,h2.sc-hub-section-basic,h3.sc-hub-section-basic,h4.sc-hub-section-basic,h5.sc-hub-section-basic,h6).sc-hub-section-basic{font-size:var(--calcite-font-size-1);margin-top:0px;margin-bottom:1.5rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}.sc-hub-section-basic-s>.section__content>.helper-text{margin-top:-1rem;margin-bottom:1.5rem}.sc-hub-section-basic-s>.helper-text--left>.helper-text,.sc-hub-section-basic-s>.helper-text--right>.helper-text{margin-top:0px}.variant-workspace.sc-hub-section-basic{border-radius:0.25rem;padding:1.25rem;--tw-shadow:0 1px 6px -1px rgba(0, 0, 0, 0.16), 0 1px 2px -1px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 1px 6px -1px var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);background:white}.variant-layout-editor.sc-hub-section-basic .section-basic__header.sc-hub-section-basic h5.sc-hub-section-basic,.variant-layout-editor.sc-hub-section-basic .section-basic__header.sc-hub-section-basic h6.sc-hub-section-basic{font-weight:var(--calcite-font-weight-bold)}.variant-layout-editor.sc-hub-section-basic-s>.section__content>.section__fields,.variant-layout-editor .sc-hub-section-basic-s>.section__content>.section__fields{font-weight:var(--calcite-font-weight-bold)}";

const Basic = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.params = undefined;
  }
  get scale() {
    var _a;
    return ((_a = this.params.uiSchema.options) === null || _a === void 0 ? void 0 : _a.scale) || this.params.scale;
  }
  render() {
    var _a;
    const HeaderTag = ((_a = this.params.uiSchema.options) === null || _a === void 0 ? void 0 : _a.headerTag) || 'h2';
    return (h(Host, null, h("section", { class: {
        [this.params.variant]: Boolean(this.params.variant),
        [`section-basic--${this.scale}`]: true
      }, "data-label": this.params.label }, h("header", { class: "section-basic__header" }, h(HeaderTag, null, this.params.label)), h("slot", null))));
  }
};
Basic.style = basicCss;

export { Basic as hub_section_basic };
