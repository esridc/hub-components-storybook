'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');
const clipboard = require('./clipboard-e854350e.js');
const intlManager = require('./intl-manager-f0103583.js');
const index$1 = require('./index-6f16fe65.js');
const shareableUtils = require('./shareable-utils-495892cb.js');
const util = require('./util-38e73510.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./get-prop-4bd8fc1a.js');

const arcgisCopyableInputCss = ":host([type='textarea']) .copy-button{flex-shrink:1;align-self:flex-end;min-width:7rem}:host([type='textarea']) calcite-label{display:flex;flex-direction:column;min-width:-moz-fit-content;min-width:fit-content}.copy-button{height:2rem}";

const ArcgisCopyableInput = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubCopyButtonClicked = index.createEvent(this, "arcgisHubCopyButtonClicked", 7);
    this.type = 'text';
    this.label = undefined;
    this.placeholder = undefined;
    this.buttonText = undefined;
    this.value = undefined;
    this.readonly = false;
    this.disabled = false;
    context.bind(this, 'onCopyButtonClick', 'handleCalciteInputInput');
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    if (this.type === "textarea") {
      this.buttonText = this.buttonText || this.intl.t('copyCode');
    }
  }
  handleCalciteInputInput(event) {
    this.value = event.target.value;
  }
  onCopyButtonClick() {
    this.arcgisHubCopyButtonClicked.emit(this.value);
    clipboard.copyStringToClipboard(this.value);
  }
  renderCopyButton(buttonText, icon, slot) {
    return (index.h("calcite-button", { class: "copy-button", disabled: this.disabled, iconStart: icon, label: this.intl.t('copyButtonLabel'), onClick: this.onCopyButtonClick, slot: slot }, buttonText));
  }
  render() {
    const isTypeText = this.type === "text";
    return (index.h(index.Host, null, index.h("calcite-label", null, index.h("slot", { name: "label" }, this.label), isTypeText
      ? index.h("calcite-input", { disabled: this.disabled, onCalciteInputInput: this.handleCalciteInputInput, placeholder: this.placeholder, readOnly: this.readonly, type: this.type, value: this.value }, this.renderCopyButton(null, "copy-to-clipboard", "action"))
      : index.h(index.Fragment, null, index.h("calcite-input", { disabled: this.disabled, placeholder: this.placeholder, readOnly: this.readonly, scale: "l", type: this.type, value: this.value }), this.renderCopyButton(this.buttonText)))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisCopyableInput.style = arcgisCopyableInputCss;

const version = "5.347.0";

const arcgisShareCss = ":host{display:block}";

const ArcgisShare = class {
  /**
   * Hooks
   */
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
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
    this.domId = util.createId();
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
    return referenceElement.getState ? (await referenceElement.getState()) : shareableUtils.getCardState(this.referenceElement);
  }
  getSnippetByVal(state) {
    if (this.referenceElement && this.shareableByValue) {
      // the domId/id stuff - in order for the embedded snippet to be shareable via url, it needs to have an id so we just give it a random one
      const { domId: id, referenceElement } = this;
      const linkAndScript = shareableUtils.getLinkAndScriptTags(version);
      const snippet = shareableUtils.getSnippetByVal(referenceElement, Object.assign(Object.assign({}, state), { id }));
      return `${linkAndScript}\n${snippet}`;
    }
  }
  getSnippetByRef() {
    const { referenceElement } = this;
    if (referenceElement && this.shareableByReference) {
      const linkAndScript = shareableUtils.getLinkAndScriptTags(version);
      const snippet = shareableUtils.getSnippetByRef(referenceElement);
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
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
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
    const telemetry = Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.share.label.link), { details: event.detail });
    this.hubTelemetry.emit(telemetry);
  }
  render() {
    return index.h(index.Host, { "data-element": "share" }, this.shareable && index.h("arcgis-copyable-input", { label: this.intl.t('copyLinkLabel'), readonly: true, type: "text", value: this.linkUrl }), this.shareableByValue && index.h("arcgis-copyable-input", { label: this.intl.t('copySnippetByValLabel'), readonly: true, type: "textarea", value: this.snippetByVal }), this.shareableByReference && index.h("arcgis-copyable-input", { label: this.intl.t('copySnippetByRefLabel'), readonly: true, type: "textarea", value: this.snippetByRef }));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisShare.style = arcgisShareCss;

const arcgisShareableCardCss = ":host{display:flex;height:100%;flex-direction:column}#sharing{display:flex;align-items:center;justify-content:flex-end;gap:0.5rem}#sharing>*{margin-top:0.125rem}:host([shareable-on-hover]){position:relative}:host([shareable-on-hover]) #sharing{pointer-events:none;position:absolute;top:100%;right:0px;left:0px;z-index:10;opacity:0;transition:opacity 150ms ease-out 2000ms}:host([shareable-on-hover]:hover) #sharing,:host([shareable-on-hover]:focus) #sharing{pointer-events:auto;opacity:1;transition:opacity 250ms ease-in 100ms}calcite-tooltip[aria-hidden=\"true\"]{pointer-events:none}";

const ArcgisShareableCard = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.shareable = false;
    this.shareableByValue = false;
    this.shareableByReference = false;
    this.referenceElement = undefined;
    this.shareableOnHover = false;
    this.showShareUi = true;
    this.modalIsOpen = false;
    context.bind(this, 'onCalciteModalClose', 'onOpenModalButtonClick');
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
    const telemetry = Object.assign({}, index$1.dist.dictionary.category.interaction.action.close.label.modal.details.share);
    this.hubTelemetry.emit(telemetry);
  }
  onOpenModalButtonClick() {
    this.modalIsOpen = true;
    const telemetry = Object.assign({}, index$1.dist.dictionary.category.interaction.action.open.label.popover.details.share);
    this.hubTelemetry.emit(telemetry);
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  componentDidLoad() {
    if (!this.referenceElement) {
      const slot = this.element.shadowRoot.querySelector('slot');
      this.referenceElement = slot.assignedElements()[0];
    }
  }
  renderSharingUi() {
    if (this.shouldRender) {
      return index.h(index.Fragment, null, index.h("label", { id: "sharing" }, this.intl.t("shareableTooltip"), index.h("calcite-fab", { appearance: "outline-fill", icon: "share", kind: "neutral", label: this.intl.t("shareableTooltip"), onClick: this.onOpenModalButtonClick })), index.h("arcgis-wormhole", null, index.h("calcite-modal", { messageOverrides: this._messageOverrides, onCalciteModalClose: this.onCalciteModalClose, open: this.modalIsOpen, scale: "s" }, index.h("div", { slot: "header" }, this.intl.t('modalHeading')), index.h("div", { slot: "content" }, this.modalIsOpen && index.h("arcgis-share", { hash: this.referenceElement && this.referenceElement.id, referenceElement: this.referenceElement, shareable: this.shareable, shareableByReference: this.shareableByReference, shareableByValue: this.shareableByValue })))));
    }
  }
  render() {
    /*
      Note: the idea here is that this can be used:
        - as sorta the outerHtml of shareable stencil components
        - OR in ember to wrap ember components and enable sharing via URL

      Note: we only render the sharingUi if there are results to display
    */
    return (index.h(index.Host, { "data-element": "shareable-card", tabindex: (this.shouldRender && this.shareableOnHover) ? "0" : undefined }, index.h("slot", null), this.showShareUi && this.renderSharingUi()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisShareableCard.style = arcgisShareableCardCss;

exports.arcgis_copyable_input = ArcgisCopyableInput;
exports.arcgis_share = ArcgisShare;
exports.arcgis_shareable_card = ArcgisShareableCard;
