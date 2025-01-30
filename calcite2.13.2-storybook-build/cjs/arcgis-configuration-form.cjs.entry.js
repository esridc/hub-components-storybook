'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const util = require('./util-38e73510.js');
const types = require('./types-60347c5c.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./get-prop-4bd8fc1a.js');
require('./ProjectSchema-d1b6b7cf.js');
require('./MetricSchema-b212808d.js');
require('./enums-0160df9d.js');
require('./definitions-94c1da69.js');
require('./HubItemEntitySchema-62590777.js');
require('./types-097b54b1.js');
require('./subschemas-61a41e85.js');
require('./InitiativeSchema-5a0a1956.js');
require('./SiteSchema-85074143.js');
require('./DiscussionSchema-24407ed6.js');
require('./PageSchema-f15eb977.js');
require('./ContentSchema-92224d5f.js');
require('./TemplateSchema-d46d6f3b.js');
require('./GroupSchema-e21948a6.js');
require('./InitiativeTemplateSchema-c5d2cb31.js');
require('./SurveySchema-9ec907b6.js');
require('./EventSchemaCreate-bf05e6ea.js');
require('./getDefaultEventDatesAndTimes-99ac0275.js');
require('./types-751ad3a9.js');
require('./validations-121c30e3.js');
require('./UserSchema-5e3cafa7.js');

const arcgisConfigurationFormCss = ".sc-arcgis-configuration-form-h{display:block;height:100%}.configuration-form__container.sc-arcgis-configuration-form{display:flex;height:100%;flex-direction:column;justify-content:space-between}.configuration-form__body.sc-arcgis-configuration-form{display:flex;flex-direction:column;gap:3rem}.configuration-form__content.sc-arcgis-configuration-form{display:flex;flex-direction:column;gap:2rem}.configuration-form__body.sc-arcgis-configuration-form-s>[slot=\"header\"],.configuration-form__body .sc-arcgis-configuration-form-s>[slot=\"header\"]{margin:0px;font-size:var(--calcite-font-size-2);line-height:1.5rem;font-weight:var(--calcite-font-weight-medium)}.configuration-form__footer.sc-arcgis-configuration-form{background-color:var(--arcgis-configuration-form-footer-bg-color, inherit);max-width:var(--arcgis-configuration-form-footer-max-width, none);margin-left:auto;margin-right:auto;display:flex;justify-content:flex-end}.configuration-form__footer--fixed.sc-arcgis-configuration-form{margin:0px}.configuration-form__footer--sticky.sc-arcgis-configuration-form{margin-left:calc(-1 * var(--arcgis-configuration-form-footer-negative-margin, 0));margin-right:calc(-1 * var(--arcgis-configuration-form-footer-negative-margin, 0));position:sticky;left:0px;bottom:0px;z-index:10;padding-top:1rem;padding-bottom:1rem;--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.configuration-form__footer--sticky.sc-arcgis-configuration-form .configuration-form__footer--primary.sc-arcgis-configuration-form{margin-right:var(--arcgis-configuration-form-footer-negative-margin, 0);margin-left:0.5rem}calcite-modal.sc-arcgis-configuration-form [slot=\"content\"].sc-arcgis-configuration-form{padding:1rem}";

const ArcgisConfigurationForm = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisConfigurationFormChanged = index.createEvent(this, "arcgisConfigurationFormChanged", 7);
    this.arcgisConfigurationFormSaved = index.createEvent(this, "arcgisConfigurationFormSaved", 7);
    this.arcgisConfigurationFormInitialized = index.createEvent(this, "arcgisConfigurationFormInitialized", 7);
    this.arcgisConfigurationFormModalClosed = index.createEvent(this, "arcgisConfigurationFormModalClosed", 7);
    this.arcgisConfigurationFormModalOpen = index.createEvent(this, "arcgisConfigurationFormModalOpen", 7);
    /** sets a reference to the configuration editor element */
    this.setConfigEditorEl = (el) => {
      this.configEditorEl = el;
    };
    /**
     * If a form has steps, this sets a reference to the
     * stepper element
     */
    this.setStepperEl = (el) => {
      /**
       * This querySelector will depend on how the configuration
       * editor is styled (i.e. scoped or shadow). This will protect
       * against both cases in case it is switched
       */
      const stepperEl = el && (el.shadowRoot
        ? el.shadowRoot.querySelector('calcite-stepper')
        : el.querySelector('calcite-stepper'));
      this.stepperEl = stepperEl;
      this.setNextStepEl(stepperEl);
    };
    /**
     * If a form is stepped, we need a reference to the next step el in
     * the form. If it has a "disabled" attribute, we disable the "Next"
     * button in the modal footer.
     */
    this.setNextStepEl = (el) => {
      this.nextStepEl = this.isFinalStep
        ? null
        : el && el.querySelectorAll('calcite-stepper-item')[this.stepperPosition + 1];
    };
    this.handleEditorLoaded = () => {
      this._isConfigEditorLoading = false;
      // we must wait until the config editor has loaded
      // before we attemp to grab a reference to the (potential)
      // stepper el - this is ultimately used to determine the
      // state of the form's primary action button
      this.setStepperEl(this.configEditorEl);
    };
    this.handleEditorInitialized = (evt) => {
      this.handleEditorChange(evt, true);
    };
    this.handleEditorChangeEvent = (evt) => {
      this.handleEditorChange(evt);
      this.isDirty = true;
    };
    this.onSaveButtonClick = () => {
      this.arcgisConfigurationFormSaved.emit(this.internalValues);
      this.isDirty = false;
    };
    this.onCalciteModalClose = () => {
      this.internalValues = util.cloneObject(this.values) || {};
      if (this.stepperEl) {
        this.stepperPosition = 0;
        this.stepperEl.startStep();
      }
      this.arcgisConfigurationFormModalClosed.emit();
    };
    this.onCalciteModalOpen = () => {
      this.arcgisConfigurationFormModalOpen.emit();
    };
    this.onNextButtonClick = () => {
      this.stepperPosition += 1;
      this.stepperEl.nextStep();
    };
    this.onUndoChanges = () => {
      // TODO: implement functionality
    };
    this.schema = undefined;
    this.uiSchema = undefined;
    this.values = undefined;
    this.t = undefined;
    this.layout = 'sticky';
    this.footerSlotRef = undefined;
    this.isDisabled = undefined;
    this.isLoading = undefined;
    this.isSaving = false;
    this.isOpen = undefined;
    this.messageOverrides = undefined;
    this.scale = undefined;
    this.variant = undefined;
    this.isCreateForm = false;
    this.isDirty = false;
    this.isValid = true;
    this.stepperPosition = 0;
    this.isNextStepDisabled = undefined;
    this._isConfigEditorLoading = true;
  }
  handleCalciteStepperChangeEvent(event) {
    var _a;
    this.stepperPosition = (_a = event === null || event === void 0 ? void 0 : event.detail) === null || _a === void 0 ? void 0 : _a.position;
  }
  handleValuesChange(values) {
    this.internalValues = util.cloneObject(values);
  }
  /**
   * we need to keep track of/update the next stepper element
   * every time the stepper position changes. Having reference
   * to this element allows us to know whether to enable/disable
   * the primary button in the modal footer
   */
  handleStepperPositionChange() {
    this.setNextStepEl(this.stepperEl);
  }
  async componentWillLoad() {
    this._isConfigEditorLoading = true;
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    this.internalValues = util.cloneObject(this.values) || {};
  }
  /**
   * Returns whether external (consumer) dependencies are still loading (`isLoading` prop) or
   * whether internal components are still loading (e.g. `_isConfigEditorLoading` state)
   *
   * Only reference this when logic depends on both conditions
   */
  get _isLoading() {
    return this.isLoading || this._isConfigEditorLoading;
  }
  /**
   * If the form has multiple steps, we need to know if
   * the user is on the final step. This helps us know what
   * label the primary button should render and what the
   * button should do when clicked
   */
  get isFinalStep() {
    const stepperItems = this.stepperEl && this.stepperEl.querySelectorAll('calcite-stepper-item');
    const stepperCount = (stepperItems || []).length;
    const hasStepper = stepperCount > 0;
    const isOnFinalStep = this.stepperPosition === (stepperCount - 1);
    return !hasStepper || isOnFinalStep;
  }
  /**
   * checks whether the reference we have to the next step el
   * has a disabled attribute. If so, we need to make sure to
   * disable the primary "Next" button so that it aligns with
   * the disabled state of the steps
   *
   * Note: we also have an isNextStepDisabled state property
   * which gets updated on the editor change event (which
   * in turn triggers the re-calculation of this getter), but
   * for some reason that property is flaky and we need this
   * additional internal getter to get the true state of the
   * step. This feels weird but appears to address the flakiness
   */
  get _isNextStepDisabled() {
    var _a;
    return (_a = this.nextStepEl) === null || _a === void 0 ? void 0 : _a.disabled;
  }
  get _primaryBtnText() {
    var _a;
    return this.isFinalStep
      ? ((_a = this.messageOverrides) === null || _a === void 0 ? void 0 : _a.save) || this.intl.t('save')
      : this.intl.t('next');
  }
  get _isPrimaryBtnDisabled() {
    return (!this.isDirty && !this.isCreateForm) || this._isLoading || this.isDisabled || (this.isFinalStep ? !this.isValid : this._isNextStepDisabled);
  }
  get _primaryButtonTooltip() {
    var _a;
    let tooltip = (_a = this.messageOverrides) === null || _a === void 0 ? void 0 : _a.primaryBtnTooltip;
    if (!this.isValid) {
      tooltip = this.intl.t('invalidForm');
    }
    return tooltip;
  }
  /**
   * We allow consumers to include slotted content in their editing
   * experience by configuring an element of type "slot" in their
   * uiSchema. The configuration editor dynamically renders a
   * <slot> for these elements. Since the configuration form
   * is a wrapper around the configuration editor, it must
   * similarly render these slots in order for the slotted
   * content to get passed down to the configuration editor.
   *
   * This function recursively iterates over the form's uiSchema
   * and returns an array of slot names. These will be rendered
   * as <slot name={name} /> elements
   *
   * TODO: add @Cache('uiSchema') once the decorator is refactored
   */
  get slots() {
    const getSlotsRecursively = (schema, slots) => {
      if (!schema.elements) {
        return schema.type === types.UiSchemaElementTypes.slot
          ? [...slots, schema.options.name]
          : slots;
      }
      return schema.elements.reduce((acc, s) => getSlotsRecursively(s, acc), slots);
    };
    return getSlotsRecursively(this.uiSchema, []);
  }
  handleEditorChange(evt, isInitialization = false) {
    const { valid, values } = evt.detail;
    evt.stopPropagation();
    this.isValid = valid;
    this.internalValues = Object.assign(Object.assign({}, this.internalValues), values);
    !isInitialization && this.arcgisConfigurationFormChanged.emit({ values: this.internalValues, isValid: valid });
    isInitialization && this.arcgisConfigurationFormInitialized.emit(this.internalValues);
    /**
     * set isNextStepDisabled on the nextTick - this is necessary for some
     * reason, otherwise it doesn't pick up the newest element in the DOM
     */
    setTimeout(() => {
      var _a;
      this.isNextStepDisabled = (_a = this.nextStepEl) === null || _a === void 0 ? void 0 : _a.disabled;
    }, 0);
  }
  renderSlots() {
    return this.slots.map(slotName => (index.h("slot", { key: slotName, name: slotName })));
  }
  renderEditor() {
    return (this.schema && index.h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleEditorChangeEvent, onArcgisConfigurationEditorInitialized: this.handleEditorInitialized, onArcgisConfigurationEditorLoaded: this.handleEditorLoaded, ref: this.setConfigEditorEl, scale: this.scale, schema: this.schema, t: this.t, uiSchema: this.uiSchema, values: this.internalValues, variant: this.variant }, this.renderSlots()));
  }
  /**
   * Renders the primary form button e.g. "save"/"next" depending on the
   * context. The default "save" string can be overridden by providing
   * messageOverrides. If necessary, we can implement a message override
   * for the "next" button as well
   */
  renderPrimaryBtn(isModal) {
    if (this.layout !== 'step') {
      return (index.h("span", Object.assign({ class: "configuration-form__footer--primary", id: "configuration-form-primary-tooltip" }, isModal && { slot: 'primary' }), index.h("arcgis-ref-tooltip", { placement: "left", text: this._primaryButtonTooltip }, index.h("calcite-button", { disabled: this._isPrimaryBtnDisabled || this.isSaving, loading: this.isSaving, onClick: this.isFinalStep ? this.onSaveButtonClick : this.onNextButtonClick, round: true }, this._primaryBtnText))));
    }
  }
  /**
   * renders the secondary form button e.g. "cancel"/"undo changes"
   * depending on the context. If necessary, we can implement message
   * overrides so the consumer can change the default strings
   */
  renderSecondaryBtn(isModal) {
    return (index.h("calcite-button", Object.assign({ appearance: "outline", disabled: this._isLoading || this.isSaving, onClick: isModal ? this.onCalciteModalClose : this.onUndoChanges, round: true }, isModal && { slot: 'secondary' }), this.intl.t(isModal ? 'cancel' : 'undoChanges')));
  }
  renderModalForm() {
    return (index.h("calcite-modal", { onCalciteModalBeforeOpen: this.onCalciteModalOpen, onCalciteModalClose: this.onCalciteModalClose, open: this.isOpen, scale: "s" }, this.isOpen &&
      index.h(index.Fragment, null, index.h("slot", { name: "header", slot: "header" }), index.h("div", { slot: "content" }, index.h("slot", { name: "form-start" }), this.renderLoadingState(), !this.isLoading && this.renderEditor()), this.renderPrimaryBtn(true), this.renderSecondaryBtn(true))));
  }
  renderInlineForm() {
    return (index.h("div", { class: "configuration-form__container" }, this.renderLoadingState(), !this.isLoading && this.renderInlineFormContent()));
  }
  renderInlineFormContent() {
    const footer = (index.h("div", { class: {
        "configuration-form__footer": true,
        "configuration-form__footer--fixed": (this.layout === "fixed"),
        "configuration-form__footer--sticky": (this.layout === 'sticky' && !this.footerSlotRef),
      } }, this.renderPrimaryBtn()));
    return index.h(index.Fragment, null, index.h("div", { class: "configuration-form__body" }, index.h("slot", { name: "header" }), index.h("div", { class: "configuration-form__content" }, index.h("slot", { name: "form-start" }), this.renderEditor())), this.footerSlotRef
      ? index.h("arcgis-wormhole", { styles: { position: 'relative' }, target: this.footerSlotRef }, footer)
      : footer);
  }
  /**
   * TODO: we should try to make this visually accurate based
   * on the form's length/content/experience
   */
  renderLoadingState() {
    return (this._isLoading) && index.h("arcgis-skeleton-loader", { active: true, rows: 3, showFooter: false, showHeading: true, showThumbnail: false });
  }
  render() {
    return (index.h(index.Host, { "data-element": "configuration-form" }, this.layout === 'modal'
      ? this.renderModalForm()
      : this.renderInlineForm()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "values": ["handleValuesChange"],
    "stepperPosition": ["handleStepperPositionChange"]
  }; }
};
ArcgisConfigurationForm.style = arcgisConfigurationFormCss;

exports.arcgis_configuration_form = ArcgisConfigurationForm;
