import { EventEmitter } from '../../stencil-public-runtime';
import { ComponentIntl } from '../../utils/stencil-intl';
import { IConfigurationSchema, IConfigurationValues, IUiSchema, IChangeEventDetail } from '@esri/hub-common';
import { CONFIGURATION_VARIANTS, TranslationFunc } from '../arcgis-configuration-editor/resources';
import { Scale } from '@esri/calcite-components';
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
export declare class ArcgisConfigurationForm {
  element: HTMLElement;
  /**
   * A data/JSON schema which defines what the underlying
   * data properties are. The schema should follow JSON
   * schema format
   */
  schema: IConfigurationSchema;
  /**
   * An optional schema which defines how the data properties
   * are rendered
   */
  uiSchema: IUiSchema;
  /**
   * An object that provides the configuration values. Its
   * keys are property names and values are property values.
   */
  values: IConfigurationValues;
  /**
   * A translation function for translating form labels
   */
  t: TranslationFunc;
  /**
   * Indicates how the form should be rendered:
   * fixed: on-page form with fixed footer
   * sticky: on-page form with sticky footer
   * modal: form is rendered in a calcite modal
   * step: form is rendered without a save button for use as a step in a workflow
   */
  layout: 'fixed' | 'sticky' | 'modal' | 'step';
  /**
   * This prop is for "advanced" usage only if you need to
   * slot the footer into a specific part of the DOM.
   *
   * For example, on workspace panels we need to slot the form
   * footer into the "footer" slot of the workspace panel
   * component, otherwise we end up with styling inconsistencies.
   */
  footerSlotRef: HTMLElement;
  /**
   * Indicates whether the form is disabled. If so, the
   * primary button will be disabled with an optional tooltip
   */
  isDisabled: boolean;
  /**
   * Indicates when the consumer would like the loading state to render
   * (e.g. when the consumer is still loading data to populate the form5)
   */
  isLoading: boolean;
  /**
   * Indicates whether the form is in a saving state.
   * If so, we render a loading indicator in the primary
   * button and disable all buttons
   */
  isSaving: boolean;
  /**
   * If the form layout is "modal", this prop can be provided
   * to open/close the modal
   */
  isOpen: boolean;
  /**
   * Use this property to override translated strings
   * used by this compoennt
   * note: we can add more as necessary
   */
  messageOverrides: {
    save?: string;
    primaryBtnTooltip?: string;
  };
  scale: Scale;
  /**
   * Style variant of the configuration editor to render (optional)
   */
  variant: CONFIGURATION_VARIANTS;
  /**
   * Indicates whether the form is in a "create" state
   */
  isCreateForm?: boolean;
  isDirty: boolean;
  isValid: boolean;
  stepperPosition: number;
  isNextStepDisabled: boolean;
  /**
   * Indicates whether the underlying configuration editor is still loading
   */
  _isConfigEditorLoading: boolean;
  private internalValues;
  intl: ComponentIntl;
  /** reference to the config editor element */
  configEditorEl: HTMLArcgisConfigurationEditorElement;
  /** reference to the (potential) stepper element within the config editor */
  stepperEl: HTMLCalciteStepperElement;
  /**
   * if a form has a stepper in it, we always need a reference to
   * the next step in the stepper in order to determine the state
   * of the primary action button
   */
  nextStepEl: HTMLCalciteStepperItemElement;
  arcgisConfigurationFormChanged: EventEmitter<IConfigurationValues>;
  arcgisConfigurationFormSaved: EventEmitter<IConfigurationValues>;
  /** fired once the form has initialized, receiving the initialization event from the configuration editor */
  arcgisConfigurationFormInitialized: EventEmitter<IConfigurationValues>;
  /** if the form layout is "modal", this fires when the modal closes */
  arcgisConfigurationFormModalClosed: EventEmitter<null>;
  /** if the form layout is "modal", this fires when the modal opens */
  arcgisConfigurationFormModalOpen: EventEmitter<null>;
  handleCalciteStepperChangeEvent(event: CustomEvent): void;
  handleValuesChange(values: IConfigurationValues): void;
  /**
   * we need to keep track of/update the next stepper element
   * every time the stepper position changes. Having reference
   * to this element allows us to know whether to enable/disable
   * the primary button in the modal footer
   */
  handleStepperPositionChange(): void;
  componentWillLoad(): Promise<void>;
  /**
   * Returns whether external (consumer) dependencies are still loading (`isLoading` prop) or
   * whether internal components are still loading (e.g. `_isConfigEditorLoading` state)
   *
   * Only reference this when logic depends on both conditions
   */
  get _isLoading(): boolean;
  /**
   * If the form has multiple steps, we need to know if
   * the user is on the final step. This helps us know what
   * label the primary button should render and what the
   * button should do when clicked
   */
  get isFinalStep(): boolean;
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
  get _isNextStepDisabled(): boolean;
  get _primaryBtnText(): string;
  get _isPrimaryBtnDisabled(): boolean;
  get _primaryButtonTooltip(): string;
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
  get slots(): string[];
  /** sets a reference to the configuration editor element */
  setConfigEditorEl: (el: HTMLArcgisConfigurationEditorElement) => void;
  /**
   * If a form has steps, this sets a reference to the
   * stepper element
   */
  setStepperEl: (el: HTMLArcgisConfigurationEditorElement) => void;
  /**
   * If a form is stepped, we need a reference to the next step el in
   * the form. If it has a "disabled" attribute, we disable the "Next"
   * button in the modal footer.
   */
  setNextStepEl: (el: HTMLCalciteStepperElement) => void;
  handleEditorLoaded: () => void;
  handleEditorInitialized: (evt: CustomEvent<IChangeEventDetail>) => void;
  handleEditorChangeEvent: (evt: CustomEvent<IChangeEventDetail>) => void;
  handleEditorChange(evt: CustomEvent<IChangeEventDetail>, isInitialization?: boolean): void;
  onSaveButtonClick: () => void;
  onCalciteModalClose: () => void;
  onCalciteModalOpen: () => void;
  onNextButtonClick: () => void;
  onUndoChanges: () => void;
  renderSlots(): HTMLSlotElement[];
  renderEditor(): HTMLArcgisConfigurationEditorElement;
  /**
   * Renders the primary form button e.g. "save"/"next" depending on the
   * context. The default "save" string can be overridden by providing
   * messageOverrides. If necessary, we can implement a message override
   * for the "next" button as well
   */
  renderPrimaryBtn(isModal?: boolean): HTMLElement;
  /**
   * renders the secondary form button e.g. "cancel"/"undo changes"
   * depending on the context. If necessary, we can implement message
   * overrides so the consumer can change the default strings
   */
  renderSecondaryBtn(isModal?: boolean): HTMLCalciteButtonElement;
  renderModalForm(): HTMLCalciteModalElement;
  renderInlineForm(): HTMLElement;
  renderInlineFormContent(): HTMLElement;
  /**
   * TODO: we should try to make this visually accurate based
   * on the form's length/content/experience
   */
  renderLoadingState(): HTMLCalciteLoaderElement;
  render(): any;
}
