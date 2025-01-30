import { Host, h, Fragment } from '@stencil/core';
import intlManager from '../../utils/intl-manager';
import { cloneObject, UiSchemaElementTypes } from '@esri/hub-common';
/**
 * The arcgis-configuration-form is a presentational component which
 * wraps the arcgis-configuration-editor to provide a consistent form
 * UI. This component does NOT handle any "save"/XHR logic. It is
 * solely responsible for rendering the form UI (e.g. form header,
 * save/next/undo buttons, loading, success and error states, etc.)
 *
 * @slot header - A slot for adding a form title to render above the form. In the case of a "modal" layout, this will render in the calcite-modal header slot
 * @slot form-start - A slot for adding content above the form
 */
export class ArcgisConfigurationForm {
  constructor() {
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
  static get is() { return "arcgis-configuration-form"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-configuration-form.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-configuration-form.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "schema": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IConfigurationSchema",
          "resolved": "IConfigurationSchema",
          "references": {
            "IConfigurationSchema": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "A data/JSON schema which defines what the underlying\ndata properties are. The schema should follow JSON\nschema format"
        }
      },
      "uiSchema": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IUiSchema",
          "resolved": "IUiSchema",
          "references": {
            "IUiSchema": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional schema which defines how the data properties\nare rendered"
        }
      },
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
          "text": "An object that provides the configuration values. Its\nkeys are property names and values are property values."
        }
      },
      "t": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "TranslationFunc",
          "resolved": "(key: any, values?: any, opts?: any) => string",
          "references": {
            "TranslationFunc": {
              "location": "import",
              "path": "../arcgis-configuration-editor/resources"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "A translation function for translating form labels"
        }
      },
      "layout": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'fixed' | 'sticky' | 'modal' | 'step'",
          "resolved": "\"fixed\" | \"modal\" | \"step\" | \"sticky\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates how the form should be rendered:\nfixed: on-page form with fixed footer\nsticky: on-page form with sticky footer\nmodal: form is rendered in a calcite modal\nstep: form is rendered without a save button for use as a step in a workflow"
        },
        "attribute": "layout",
        "reflect": true,
        "defaultValue": "'sticky'"
      },
      "footerSlotRef": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "HTMLElement",
          "resolved": "HTMLElement",
          "references": {
            "HTMLElement": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "This prop is for \"advanced\" usage only if you need to\nslot the footer into a specific part of the DOM.\n\nFor example, on workspace panels we need to slot the form\nfooter into the \"footer\" slot of the workspace panel\ncomponent, otherwise we end up with styling inconsistencies."
        }
      },
      "isDisabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates whether the form is disabled. If so, the\nprimary button will be disabled with an optional tooltip"
        },
        "attribute": "is-disabled",
        "reflect": false
      },
      "isLoading": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates when the consumer would like the loading state to render\n(e.g. when the consumer is still loading data to populate the form5)"
        },
        "attribute": "is-loading",
        "reflect": false
      },
      "isSaving": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates whether the form is in a saving state.\nIf so, we render a loading indicator in the primary\nbutton and disable all buttons"
        },
        "attribute": "is-saving",
        "reflect": true,
        "defaultValue": "false"
      },
      "isOpen": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the form layout is \"modal\", this prop can be provided\nto open/close the modal"
        },
        "attribute": "is-open",
        "reflect": true
      },
      "messageOverrides": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "{ save?: string, primaryBtnTooltip?: string }",
          "resolved": "{ save?: string; primaryBtnTooltip?: string; }",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Use this property to override translated strings\nused by this compoennt\nnote: we can add more as necessary"
        }
      },
      "scale": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Scale",
          "resolved": "\"l\" | \"m\" | \"s\"",
          "references": {
            "Scale": {
              "location": "import",
              "path": "@esri/calcite-components"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "scale",
        "reflect": false
      },
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "CONFIGURATION_VARIANTS",
          "resolved": "CONFIGURATION_VARIANTS.layoutEditor | CONFIGURATION_VARIANTS.workspace",
          "references": {
            "CONFIGURATION_VARIANTS": {
              "location": "import",
              "path": "../arcgis-configuration-editor/resources"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Style variant of the configuration editor to render (optional)"
        },
        "attribute": "variant",
        "reflect": false
      },
      "isCreateForm": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates whether the form is in a \"create\" state"
        },
        "attribute": "is-create-form",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "isDirty": {},
      "isValid": {},
      "stepperPosition": {},
      "isNextStepDisabled": {},
      "_isConfigEditorLoading": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisConfigurationFormChanged",
        "name": "arcgisConfigurationFormChanged",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IConfigurationValues",
          "resolved": "IConfigurationValues",
          "references": {
            "IConfigurationValues": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }, {
        "method": "arcgisConfigurationFormSaved",
        "name": "arcgisConfigurationFormSaved",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IConfigurationValues",
          "resolved": "IConfigurationValues",
          "references": {
            "IConfigurationValues": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }, {
        "method": "arcgisConfigurationFormInitialized",
        "name": "arcgisConfigurationFormInitialized",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "fired once the form has initialized, receiving the initialization event from the configuration editor"
        },
        "complexType": {
          "original": "IConfigurationValues",
          "resolved": "IConfigurationValues",
          "references": {
            "IConfigurationValues": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }, {
        "method": "arcgisConfigurationFormModalClosed",
        "name": "arcgisConfigurationFormModalClosed",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "if the form layout is \"modal\", this fires when the modal closes"
        },
        "complexType": {
          "original": "null",
          "resolved": "null",
          "references": {}
        }
      }, {
        "method": "arcgisConfigurationFormModalOpen",
        "name": "arcgisConfigurationFormModalOpen",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "if the form layout is \"modal\", this fires when the modal opens"
        },
        "complexType": {
          "original": "null",
          "resolved": "null",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "values",
        "methodName": "handleValuesChange"
      }, {
        "propName": "stepperPosition",
        "methodName": "handleStepperPositionChange"
      }];
  }
  static get listeners() {
    return [{
        "name": "calciteStepperItemChange",
        "method": "handleCalciteStepperChangeEvent",
        "target": "body",
        "capture": false,
        "passive": false
      }];
  }
}
