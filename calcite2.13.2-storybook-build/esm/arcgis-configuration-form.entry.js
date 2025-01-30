import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { a as cloneObject } from './util-3e6872d9.js';
import { a as UiSchemaElementTypes } from './types-1fca2e83.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './get-prop-ec5be510.js';
import './ProjectSchema-060a6b72.js';
import './MetricSchema-da66a5ad.js';
import './enums-783e40b4.js';
import './definitions-193d63f9.js';
import './HubItemEntitySchema-5c1f4677.js';
import './types-2eaa1a18.js';
import './subschemas-4d56570e.js';
import './InitiativeSchema-4fb31f85.js';
import './SiteSchema-3e282ce1.js';
import './DiscussionSchema-6e5016d0.js';
import './PageSchema-4cbe3bd9.js';
import './ContentSchema-d913d8e9.js';
import './TemplateSchema-83e65297.js';
import './GroupSchema-13ff9290.js';
import './InitiativeTemplateSchema-bf5d8531.js';
import './SurveySchema-0fcb1d64.js';
import './EventSchemaCreate-2f6ba245.js';
import './getDefaultEventDatesAndTimes-4847a519.js';
import './types-db540898.js';
import './validations-3d61466c.js';
import './UserSchema-abc4f738.js';

const arcgisConfigurationFormCss = ".sc-arcgis-configuration-form-h{display:block;height:100%}.configuration-form__container.sc-arcgis-configuration-form{display:flex;height:100%;flex-direction:column;justify-content:space-between}.configuration-form__body.sc-arcgis-configuration-form{display:flex;flex-direction:column;gap:3rem}.configuration-form__content.sc-arcgis-configuration-form{display:flex;flex-direction:column;gap:2rem}.configuration-form__body.sc-arcgis-configuration-form-s>[slot=\"header\"],.configuration-form__body .sc-arcgis-configuration-form-s>[slot=\"header\"]{margin:0px;font-size:var(--calcite-font-size-2);line-height:1.5rem;font-weight:var(--calcite-font-weight-medium)}.configuration-form__footer.sc-arcgis-configuration-form{background-color:var(--arcgis-configuration-form-footer-bg-color, inherit);max-width:var(--arcgis-configuration-form-footer-max-width, none);margin-left:auto;margin-right:auto;display:flex;justify-content:flex-end}.configuration-form__footer--fixed.sc-arcgis-configuration-form{margin:0px}.configuration-form__footer--sticky.sc-arcgis-configuration-form{margin-left:calc(-1 * var(--arcgis-configuration-form-footer-negative-margin, 0));margin-right:calc(-1 * var(--arcgis-configuration-form-footer-negative-margin, 0));position:sticky;left:0px;bottom:0px;z-index:10;padding-top:1rem;padding-bottom:1rem;--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.configuration-form__footer--sticky.sc-arcgis-configuration-form .configuration-form__footer--primary.sc-arcgis-configuration-form{margin-right:var(--arcgis-configuration-form-footer-negative-margin, 0);margin-left:0.5rem}calcite-modal.sc-arcgis-configuration-form [slot=\"content\"].sc-arcgis-configuration-form{padding:1rem}";

const ArcgisConfigurationForm = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisConfigurationFormChanged = createEvent(this, "arcgisConfigurationFormChanged", 7);
    this.arcgisConfigurationFormSaved = createEvent(this, "arcgisConfigurationFormSaved", 7);
    this.arcgisConfigurationFormInitialized = createEvent(this, "arcgisConfigurationFormInitialized", 7);
    this.arcgisConfigurationFormModalClosed = createEvent(this, "arcgisConfigurationFormModalClosed", 7);
    this.arcgisConfigurationFormModalOpen = createEvent(this, "arcgisConfigurationFormModalOpen", 7);
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
      this.internalValues = cloneObject(this.values) || {};
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
    this.internalValues = cloneObject(values);
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
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.internalValues = cloneObject(this.values) || {};
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
        return schema.type === UiSchemaElementTypes.slot
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
    return this.slots.map(slotName => (h("slot", { key: slotName, name: slotName })));
  }
  renderEditor() {
    return (this.schema && h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleEditorChangeEvent, onArcgisConfigurationEditorInitialized: this.handleEditorInitialized, onArcgisConfigurationEditorLoaded: this.handleEditorLoaded, ref: this.setConfigEditorEl, scale: this.scale, schema: this.schema, t: this.t, uiSchema: this.uiSchema, values: this.internalValues, variant: this.variant }, this.renderSlots()));
  }
  /**
   * Renders the primary form button e.g. "save"/"next" depending on the
   * context. The default "save" string can be overridden by providing
   * messageOverrides. If necessary, we can implement a message override
   * for the "next" button as well
   */
  renderPrimaryBtn(isModal) {
    if (this.layout !== 'step') {
      return (h("span", Object.assign({ class: "configuration-form__footer--primary", id: "configuration-form-primary-tooltip" }, isModal && { slot: 'primary' }), h("arcgis-ref-tooltip", { placement: "left", text: this._primaryButtonTooltip }, h("calcite-button", { disabled: this._isPrimaryBtnDisabled || this.isSaving, loading: this.isSaving, onClick: this.isFinalStep ? this.onSaveButtonClick : this.onNextButtonClick, round: true }, this._primaryBtnText))));
    }
  }
  /**
   * renders the secondary form button e.g. "cancel"/"undo changes"
   * depending on the context. If necessary, we can implement message
   * overrides so the consumer can change the default strings
   */
  renderSecondaryBtn(isModal) {
    return (h("calcite-button", Object.assign({ appearance: "outline", disabled: this._isLoading || this.isSaving, onClick: isModal ? this.onCalciteModalClose : this.onUndoChanges, round: true }, isModal && { slot: 'secondary' }), this.intl.t(isModal ? 'cancel' : 'undoChanges')));
  }
  renderModalForm() {
    return (h("calcite-modal", { onCalciteModalBeforeOpen: this.onCalciteModalOpen, onCalciteModalClose: this.onCalciteModalClose, open: this.isOpen, scale: "s" }, this.isOpen &&
      h(Fragment, null, h("slot", { name: "header", slot: "header" }), h("div", { slot: "content" }, h("slot", { name: "form-start" }), this.renderLoadingState(), !this.isLoading && this.renderEditor()), this.renderPrimaryBtn(true), this.renderSecondaryBtn(true))));
  }
  renderInlineForm() {
    return (h("div", { class: "configuration-form__container" }, this.renderLoadingState(), !this.isLoading && this.renderInlineFormContent()));
  }
  renderInlineFormContent() {
    const footer = (h("div", { class: {
        "configuration-form__footer": true,
        "configuration-form__footer--fixed": (this.layout === "fixed"),
        "configuration-form__footer--sticky": (this.layout === 'sticky' && !this.footerSlotRef),
      } }, this.renderPrimaryBtn()));
    return h(Fragment, null, h("div", { class: "configuration-form__body" }, h("slot", { name: "header" }), h("div", { class: "configuration-form__content" }, h("slot", { name: "form-start" }), this.renderEditor())), this.footerSlotRef
      ? h("arcgis-wormhole", { styles: { position: 'relative' }, target: this.footerSlotRef }, footer)
      : footer);
  }
  /**
   * TODO: we should try to make this visually accurate based
   * on the form's length/content/experience
   */
  renderLoadingState() {
    return (this._isLoading) && h("arcgis-skeleton-loader", { active: true, rows: 3, showFooter: false, showHeading: true, showThumbnail: false });
  }
  render() {
    return (h(Host, { "data-element": "configuration-form" }, this.layout === 'modal'
      ? this.renderModalForm()
      : this.renderInlineForm()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "values": ["handleValuesChange"],
    "stepperPosition": ["handleStepperPositionChange"]
  }; }
};
ArcgisConfigurationForm.style = arcgisConfigurationFormCss;

export { ArcgisConfigurationForm as arcgis_configuration_form };
