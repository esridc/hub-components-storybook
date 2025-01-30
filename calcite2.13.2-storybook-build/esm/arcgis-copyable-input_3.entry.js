import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, a as getElement } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { c as copyStringToClipboard } from './clipboard-71b2b31d.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { d as dist } from './index-dd3f99ac.js';
import { g as getCardState, a as getSnippetByVal, b as getSnippetByRef, c as getLinkAndScriptTags } from './shareable-utils-8e335e9e.js';
import { c as createId } from './util-3e6872d9.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './_commonjsHelpers-11ca3be1.js';
import './get-prop-ec5be510.js';

const arcgisCopyableInputCss = ":host([type='textarea']) .copy-button{flex-shrink:1;align-self:flex-end;min-width:7rem}:host([type='textarea']) calcite-label{display:flex;flex-direction:column;min-width:-moz-fit-content;min-width:fit-content}.copy-button{height:2rem}";

const ArcgisCopyableInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubCopyButtonClicked = createEvent(this, "arcgisHubCopyButtonClicked", 7);
    this.type = 'text';
    this.label = undefined;
    this.placeholder = undefined;
    this.buttonText = undefined;
    this.value = undefined;
    this.readonly = false;
    this.disabled = false;
    bind(this, 'onCopyButtonClick', 'handleCalciteInputInput');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    if (this.type === "textarea") {
      this.buttonText = this.buttonText || this.intl.t('copyCode');
    }
  }
  handleCalciteInputInput(event) {
    this.value = event.target.value;
  }
  onCopyButtonClick() {
    this.arcgisHubCopyButtonClicked.emit(this.value);
    copyStringToClipboard(this.value);
  }
  renderCopyButton(buttonText, icon, slot) {
    return (h("calcite-button", { class: "copy-button", disabled: this.disabled, iconStart: icon, label: this.intl.t('copyButtonLabel'), onClick: this.onCopyButtonClick, slot: slot }, buttonText));
  }
  render() {
    const isTypeText = this.type === "text";
    return (h(Host, null, h("calcite-label", null, h("slot", { name: "label" }, this.label), isTypeText
      ? h("calcite-input", { disabled: this.disabled, onCalciteInputInput: this.handleCalciteInputInput, placeholder: this.placeholder, readOnly: this.readonly, type: this.type, value: this.value }, this.renderCopyButton(null, "copy-to-clipboard", "action"))
      : h(Fragment, null, h("calcite-input", { disabled: this.disabled, placeholder: this.placeholder, readOnly: this.readonly, scale: "l", type: this.type, value: this.value }), this.renderCopyButton(this.buttonText)))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisCopyableInput.style = arcgisCopyableInputCss;

const version = "5.347.0";

const arcgisShareCss = ":host{display:block}";

const ArcgisShare = class {
  /**
   * Hooks
   */
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.origin = undefined;
    this.pathname = undefined;
    this.search = undefined;
    this.hash = undefined;
    this.shareable = false;
    this.shareableByValue = false;
    this.shareableByReference = false;
    this.referenceElement = undefined;
    this.domId = undefined;
    this.snippetByVal = undefined;
    this.snippetByRef = undefined;
    this.domId = createId();
  }
  get linkUrl() {
    // start with the current url
    // (the end result is that if we were passed none of the params we are looking for, the generated url will be the current url)
    let result = new URL(location.href);
    const { origin, pathname, search, hash } = this;
    if (origin) {
      result = new URL(origin);
    }
    if (pathname) {
      // if we were passed a pathname, set that on our result
      result.pathname = pathname;
      // i think we should set search to '' in this case too but i could be talked out of that
      result.search = '';
    }
    if (search) {
      // if we were passed search, set that on our result
      result.search = search;
    }
    // set the hash to whatever was passed or set it to ''
    result.hash = hash !== null && hash !== void 0 ? hash : '';
    return result.href;
  }
  async getCardState() {
    const referenceElement = this.referenceElement;
    return referenceElement.getState ? (await referenceElement.getState()) : getCardState(this.referenceElement);
  }
  getSnippetByVal(state) {
    if (this.referenceElement && this.shareableByValue) {
      // the domId/id stuff - in order for the embedded snippet to be shareable via url, it needs to have an id so we just give it a random one
      const { domId: id, referenceElement } = this;
      const linkAndScript = getLinkAndScriptTags(version);
      const snippet = getSnippetByVal(referenceElement, Object.assign(Object.assign({}, state), { id }));
      return `${linkAndScript}\n${snippet}`;
    }
  }
  getSnippetByRef() {
    const { referenceElement } = this;
    if (referenceElement && this.shareableByReference) {
      const linkAndScript = getLinkAndScriptTags(version);
      const snippet = getSnippetByRef(referenceElement);
      return `${linkAndScript}\n${snippet}>`;
    }
  }
  async updateSnippets() {
    const { referenceElement } = this;
    if (referenceElement) {
      if (this.shareableByReference || this.shareableByValue) {
        await customElements.whenDefined(referenceElement.tagName.toLowerCase());
        const cardState = await this.getCardState();
        this.snippetByVal = this.getSnippetByVal(cardState);
        this.snippetByRef = this.getSnippetByRef();
      }
    }
  }
  ;
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  componentWillRender() {
    /*
      NOTE: if doing it in componentWillRender is not sufficient, we can implement a mutation observer on the reference element - something like:
      const observer = new MutationObserver(mutations => {
        mutations.forEach(_ => {
          this.updateSnippets();
        });
      });
      observer.observe(this.referenceElement, {
        attributes: true
      });
    }
    */
    this.updateSnippets();
  }
  onCopyButtonClicked(event) {
    event.stopPropagation();
    const telemetry = Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.share.label.link), { details: event.detail });
    this.hubTelemetry.emit(telemetry);
  }
  render() {
    return h(Host, { "data-element": "share" }, this.shareable && h("arcgis-copyable-input", { label: this.intl.t('copyLinkLabel'), readonly: true, type: "text", value: this.linkUrl }), this.shareableByValue && h("arcgis-copyable-input", { label: this.intl.t('copySnippetByValLabel'), readonly: true, type: "textarea", value: this.snippetByVal }), this.shareableByReference && h("arcgis-copyable-input", { label: this.intl.t('copySnippetByRefLabel'), readonly: true, type: "textarea", value: this.snippetByRef }));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisShare.style = arcgisShareCss;

const arcgisShareableCardCss = ":host{display:flex;height:100%;flex-direction:column}#sharing{display:flex;align-items:center;justify-content:flex-end;gap:0.5rem}#sharing>*{margin-top:0.125rem}:host([shareable-on-hover]){position:relative}:host([shareable-on-hover]) #sharing{pointer-events:none;position:absolute;top:100%;right:0px;left:0px;z-index:10;opacity:0;transition:opacity 150ms ease-out 2000ms}:host([shareable-on-hover]:hover) #sharing,:host([shareable-on-hover]:focus) #sharing{pointer-events:auto;opacity:1;transition:opacity 250ms ease-in 100ms}calcite-tooltip[aria-hidden=\"true\"]{pointer-events:none}";

const ArcgisShareableCard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.shareable = false;
    this.shareableByValue = false;
    this.shareableByReference = false;
    this.referenceElement = undefined;
    this.shareableOnHover = false;
    this.showShareUi = true;
    this.modalIsOpen = false;
    bind(this, 'onCalciteModalClose', 'onOpenModalButtonClick');
  }
  get isShareable() {
    // in order to link to the card, it needs to have a dom element id
    const { shareable, referenceElement } = this;
    return shareable && !!(referenceElement === null || referenceElement === void 0 ? void 0 : referenceElement.id);
  }
  get shouldRender() {
    const { isShareable, shareableByValue, shareableByReference } = this;
    return isShareable || shareableByValue || shareableByReference;
  }
  get _messageOverrides() {
    return {
      close: this.intl.t("modalClose")
    };
  }
  /**
   * Event Handling
   */
  onCalciteModalClose() {
    this.modalIsOpen = false;
    const telemetry = Object.assign({}, dist.dictionary.category.interaction.action.close.label.modal.details.share);
    this.hubTelemetry.emit(telemetry);
  }
  onOpenModalButtonClick() {
    this.modalIsOpen = true;
    const telemetry = Object.assign({}, dist.dictionary.category.interaction.action.open.label.popover.details.share);
    this.hubTelemetry.emit(telemetry);
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  componentDidLoad() {
    if (!this.referenceElement) {
      const slot = this.element.shadowRoot.querySelector('slot');
      this.referenceElement = slot.assignedElements()[0];
    }
  }
  renderSharingUi() {
    if (this.shouldRender) {
      return h(Fragment, null, h("label", { id: "sharing" }, this.intl.t("shareableTooltip"), h("calcite-fab", { appearance: "outline-fill", icon: "share", kind: "neutral", label: this.intl.t("shareableTooltip"), onClick: this.onOpenModalButtonClick })), h("arcgis-wormhole", null, h("calcite-modal", { messageOverrides: this._messageOverrides, onCalciteModalClose: this.onCalciteModalClose, open: this.modalIsOpen, scale: "s" }, h("div", { slot: "header" }, this.intl.t('modalHeading')), h("div", { slot: "content" }, this.modalIsOpen && h("arcgis-share", { hash: this.referenceElement && this.referenceElement.id, referenceElement: this.referenceElement, shareable: this.shareable, shareableByReference: this.shareableByReference, shareableByValue: this.shareableByValue })))));
    }
  }
  render() {
    /*
      Note: the idea here is that this can be used:
        - as sorta the outerHtml of shareable stencil components
        - OR in ember to wrap ember components and enable sharing via URL

      Note: we only render the sharingUi if there are results to display
    */
    return (h(Host, { "data-element": "shareable-card", tabindex: (this.shouldRender && this.shareableOnHover) ? "0" : undefined }, h("slot", null), this.showShareUi && this.renderSharingUi()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisShareableCard.style = arcgisShareableCardCss;

export { ArcgisCopyableInput as arcgis_copyable_input, ArcgisShare as arcgis_share, ArcgisShareableCard as arcgis_shareable_card };
