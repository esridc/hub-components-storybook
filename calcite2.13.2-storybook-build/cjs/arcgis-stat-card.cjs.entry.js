'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const interfaces = require('./interfaces-fc0046ff.js');
const shareableUtils = require('./shareable-utils-495892cb.js');
const shareable = require('./shareable-36054bd4.js');
const interfaces$1 = require('./interfaces-3c096567.js');
const intlManager = require('./intl-manager-f0103583.js');
const index$1 = require('./index-6f16fe65.js');
const context = require('./context-0167a31e.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./_commonjsHelpers-dcc4cf71.js');

const CSS = {
  footer: "footer",
  header: "header",
  subtitle: "subtitle",
  title: "title",
  value: "value",
  valueContainer: "value-container",
  valueContainerWithError: "value-container-with-error",
  valueColorProp: "--valueColor",
  unit: "unit",
  cornerBorderRadiusProp: "--cornerBorderRadius"
};
const SLOTS = {
  headerMedia: "header-media",
  valueMedia: "value-media",
  footer: "footer"
};

const arcgisStatCardCss = ":host{display:block;height:100%;border-color:transparent;--calcite-border-radius-base:var(--cornerBorderRadius, \"0\");--calcite-loader-padding:.5rem}calcite-card{height:100%}:host(:not([border])){--calcite-color-border-3:transparent}.header{display:flex;flex-direction:column;align-items:center}.header-upper{display:flex;width:100%;align-items:center;justify-content:space-between}.header-lower{display:flex;width:100%;align-items:center;justify-content:space-between}.title{margin:0px;font-weight:var(--calcite-font-weight-bold);line-height:1.375;color:var(--calcite-color-text-1);display:-webkit-box;-webkit-line-clamp:2;overflow:hidden;-webkit-box-orient:vertical}calcite-card.stat-card-background{position:relative}.subtitle{margin:0px;font-weight:var(--calcite-font-weight-normal);line-height:1.375;color:var(--calcite-color-text-2)}.footer{display:flex;width:100%;flex-direction:column;align-items:flex-start}.footer ::slotted([slot=\"footer\"]){width:100%}.value-container{display:flex;font-weight:var(--calcite-font-weight-bold);color:var(--valueColor, var(--calcite-color-text-1))}.value-container-with-error{display:flex;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}.value-container calcite-notice{color:var(--calcite-color-text-1)}.trailing-text{margin:0px;font-size:var(--calcite-font-size-0);font-weight:var(--calcite-font-weight-normal);line-height:1.375;color:var(--calcite-color-text-2)}.source-link{display:none}.source-link.static,.source-link.dynamic{margin-top:0.125rem;display:-webkit-box;-webkit-line-clamp:2;overflow:hidden;-webkit-box-orient:vertical}.source-link-container{display:flex;flex-direction:row;flex-wrap:wrap;align-items:center}.source-link-container span{margin-right:0.25rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}calcite-link{padding-bottom:0.125rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;overflow-wrap:anywhere}calcite-card{height:100%}:host([unit-position=\"below\"]) .value-container{flex-direction:column}:host([unit-position=\"below\"]) .unit{font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1);font-size:1rem;line-height:1.25rem}:host([unit-position=\"before\"]) .unit{margin-right:0.25rem}:host([unit-position=\"after\"]) .unit{margin-left:0.25rem}:host([text-align=\"center\"]) .header-upper,:host([text-align=\"center\"]) .header-lower,:host([text-align=\"center\"]) .value-container,:host([text-align=\"center\"]) .footer{align-items:center;justify-content:center;text-align:center}:host([text-align=\"center\"]) .header-upper{flex-direction:column-reverse}:host([text-align=\"end\"]) .header-upper,:host([text-align=\"end\"]) .header-lower{justify-content:flex-end}:host([text-align=\"end\"]) .value-container,:host([text-align=\"end\"]) .footer{align-items:flex-end;justify-content:flex-end;text-align:right}:host([text-align=\"center\"]) .subtitle{text-align:center}:host([text-align=\"end\"]) .subtitle{text-align:end}:host([scale=\"l\"]) .title{font-size:1.5rem;line-height:1.875rem}:host([scale=\"l\"]) .subtitle{font-size:1.125rem;line-height:1.5rem}:host([scale=\"l\"]) .value-container,:host([scale=\"l\"]) .value-container-with-error{font-size:3.5rem;line-height:4rem}:host([scale=\"l\"][unit-position=\"below\"]) .unit{font-size:1.125rem}@media only screen and (max-width: 560px){:host([scale=\"l\"]) .title{font-size:1.25rem;line-height:1.625rem}:host([scale=\"l\"]) .value-container{font-size:2.5rem;line-height:3rem}}:host([scale=\"m\"]) .title{font-size:1.25rem;line-height:1.625rem}:host([scale=\"m\"]) .subtitle{font-size:1rem;line-height:1.375rem}:host([scale=\"m\"]) .value-container,:host([scale=\"m\"]) .value-container-with-error{font-size:2rem;line-height:2.5rem}:host([scale=\"s\"]) .title{font-size:1.125rem;line-height:1.5rem}:host([scale=\"s\"]) .subtitle{font-size:1rem;line-height:1.375rem}:host([scale=\"s\"]) .value-container,:host([scale=\"s\"]) .value-container-with-error{font-size:1.625rem;line-height:2rem}:host([shadow=\"low\"]) calcite-card{box-shadow:0px 4px 10px 0px rgba(0, 0, 0, 0.05)}";

const ArcgisStatCard = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.type = interfaces.SOURCE.static;
    this.layout = interfaces.LAYOUTS.simple;
    this.cardTitle = undefined;
    this.textAlign = interfaces.ALIGNMENTS.start;
    this.subtitle = undefined;
    this.value = undefined;
    this.valueColor = '';
    this.unit = undefined;
    this.unitPosition = interfaces.UNIT_POSITIONS.after;
    this.allowUnitFormatting = true;
    this.trailingText = undefined;
    this.sourceLink = undefined;
    this.sourceTitle = undefined;
    this.allowLink = true;
    this.popoverText = undefined;
    this.publisherText = undefined;
    this.icon = interfaces.ICONS.caretUp;
    this.visualInterest = interfaces.VISUAL_INTEREST.none;
    this.shareable = false;
    this.shareableByValue = false;
    this.shareableByReference = false;
    this.shareableOnHover = false;
    this.corners = interfaces.CORNERS.square;
    this.shadow = interfaces.DROP_SHADOWS.none;
    this.border = true;
    this.scale = interfaces.SCALE.small;
    this.errorMessage = undefined;
    this.isLoading = false;
    this.isModalOpen = false;
    context.bind(this, 'handleModalOpen', 'handleModalClose', 'handleLinkNavigation');
  }
  onColorChanged(newVal) {
    const cssVar = CSS.valueColorProp;
    this.updateCSSProp(cssVar, newVal);
  }
  onCornersChanged(style) {
    const cssVar = CSS.cornerBorderRadiusProp;
    const newVal = style === interfaces.CORNERS.round && "10px";
    this.updateCSSProp(cssVar, newVal);
  }
  async getState() {
    // this implementation works if all props that are needed to spin up the component in its current state are reflected back to the DOM
    // in cases where that is not the case, a custom implementation will be needed
    const { element } = this;
    const blacklist = ['hub-request-options', 'site'];
    return shareableUtils.getCardState(element, blacklist);
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  componentDidLoad() {
    this.onColorChanged(this.valueColor);
    this.onCornersChanged(this.corners);
  }
  updateCSSProp(cssVar, newVal) {
    if (newVal) {
      this.element.style.setProperty(cssVar, newVal);
    }
    else {
      this.element.style.removeProperty(cssVar);
    }
  }
  /**
   * Emits hubTelemetry once source link is selected
   */
  handleLinkNavigation() {
    this.hubTelemetry.emit(Object.assign({}, index$1.dist.dictionary.category.navigation.action.view.label.content));
  }
  /**
   * Closes the calcite-modal
   */
  handleModalClose() {
    this.isModalOpen = false;
    this.hubTelemetry.emit(Object.assign({}, index$1.dist.dictionary.category.interaction.action.close.label.modal.details.info));
  }
  /**
   * Opens the calcite-modal
   */
  handleModalOpen() {
    this.isModalOpen = true;
    this.hubTelemetry.emit(Object.assign({}, index$1.dist.dictionary.category.interaction.action.open.label.modal.details.info));
  }
  /**
   * Renders the information calcite-icon wrapped in a calcite-button with interactability
   * @returns HTMLElement
   */
  renderInfoIcon() {
    return (index.h("calcite-button", { appearance: "transparent", label: this.intl.t("openInfo"), onClick: this.handleModalOpen, round: true }, index.h("calcite-icon", { icon: "information" })));
  }
  /**
   * Renders the selected visual interest icon
   * @returns HTMLElement
   */
  renderVisualInterestIcon() {
    return index.h("calcite-icon", { icon: this.icon, scale: "m" });
  }
  /**
   * Renders the selected icon dependent on layout type. In the future, we look to
   * expand icon choices by adding a dependencies on source and card style
   * @returns HTMLElement
   */
  renderIcon() {
    let icon;
    switch (this.layout) {
      case interfaces.LAYOUTS.informational:
        // Renders the info icon if either popoverText or publisherText has content
        icon = (this.popoverText || this.publisherText) && this.renderInfoIcon();
        break;
      case interfaces.LAYOUTS.simple:
        // Renders visual interest icon if visual interest is set to 'icon'
        icon = this.visualInterest === interfaces.VISUAL_INTEREST.icon && this.renderVisualInterestIcon();
        break;
    }
    return icon;
  }
  /**
   * Renders the title, headerMedia, subtitle, and icon on the stat card
   * @param title - title of stat card
   */
  renderHeader(title) {
    return (index.h("div", { class: "header", slot: "title" }, index.h("div", { class: "header-upper" }, index.h("h1", { class: CSS.title }, title), index.h("slot", { name: SLOTS.headerMedia }), this.renderIcon()), index.h("div", { class: "header-lower" }, this.renderSubtitle(this.subtitle))));
  }
  /**
   * Renders the calcite-modal on info-icon click to give user more information
   * @returns HTMLElement
   */
  renderInformationalModal() {
    return (index.h("arcgis-wormhole", { styles: { overflowWrap: "break-word" } }, index.h("calcite-modal", { docked: true, onCalciteModalClose: this.handleModalClose, open: this.isModalOpen, scale: "s" }, index.h("div", { "aria-level": "2", role: "heading", slot: "header" }, this.intl.t("moreInfo")), index.h("div", { slot: "content" }, this.popoverText && index.h("p", null, this.popoverText), this.publisherText && index.h("div", null, index.h("strong", null, this.publisherText)), this.sourceLink && this.renderSourceLink(this.sourceLink, this.sourceTitle, this.type, false)), index.h("calcite-button", { kind: "brand", onClick: this.handleModalClose, round: true, slot: "primary", width: "full" }, this.intl.t("dismiss")))));
  }
  renderSubtitle(subtitle) {
    return subtitle && index.h("h2", { class: CSS.subtitle }, subtitle);
  }
  renderValue(value, unit) {
    let result = [
      index.h("span", { class: CSS.value, key: value }, value, index.h("slot", { name: SLOTS.valueMedia }))
    ];
    if (this.allowUnitFormatting && unit) {
      result.push(index.h("span", { class: CSS.unit }, unit));
    }
    if (this.allowUnitFormatting && this.unitPosition === 'before') {
      result.reverse();
    }
    if (this._isLoading) {
      result = index.h("calcite-loader", { label: this.intl.t("loading"), scale: "m", type: "indeterminite" });
    }
    return result;
  }
  shouldShowLink(allowLink, sourceLink, type) {
    // if we have the link and if we allow the link to be shown
    switch (type) {
      case interfaces.SOURCE.static:
        return !!(allowLink && sourceLink);
      case interfaces.SOURCE.dynamic:
        return allowLink;
      default:
        return allowLink;
    }
  }
  renderFooter(trailingText, sourceLink, sourceTitle, allowLink, type) {
    /*
      this could be a bit confusing we render a div with slot="footer-start"
      that means, "put that div in the calcite-card's 'footer-start' slot"
      _inside that_ we render whatever we got on the trailingText prop
      _then_ whatever we got in _this component's_ 'footer' slot
    */
    return index.h(index.Fragment, null, index.h("div", { class: CSS.footer, slot: "footer-start" }, this.renderTrailingText(trailingText), this.shouldShowLink(allowLink, sourceLink, type) && this.renderSourceLink(sourceLink, sourceTitle, type, true), index.h("slot", { name: SLOTS.footer })));
  }
  renderTrailingText(trailingText) {
    return trailingText && index.h("p", { class: "trailing-text" }, trailingText);
  }
  /**
   * Helper function to determine if we are linking out to an external source rather than something on the same site.
   * @param type
   * @param sourceLink
   * @returns
   */
  shouldShowLaunchIcon(type, sourceLink) {
    let showLaunchIcon = false;
    try {
      if (type === interfaces.SOURCE.static) {
        const currentHostname = window.location.hostname;
        const sourceLinkHostname = new URL(sourceLink).hostname;
        showLaunchIcon = currentHostname !== sourceLinkHostname;
      }
    }
    catch (e) {
    }
    return showLaunchIcon;
  }
  /**
   * Renders the source link and source title text of the stat card.
   * @param sourceLink
   * @param sourceTitle
   * @param type
   * @param usePrefix
   * @returns
   */
  renderSourceLink(sourceLink, sourceTitle, type, usePrefix) {
    const textToRender = sourceTitle ? sourceTitle : sourceLink;
    const prefix = usePrefix && type === interfaces.SOURCE.dynamic ? this.intl.t('source') : "";
    const iconEnd = this.shouldShowLaunchIcon(type, sourceLink) ? 'launch' : '';
    return (index.h("div", { class: "source-link-container" }, prefix && index.h("span", null, prefix), index.h("calcite-link", { class: `source-link ${type}`, href: sourceLink, "icon-end": iconEnd, onClick: this.handleLinkNavigation, target: iconEnd ? "_blank" : "" }, textToRender)));
  }
  getPremadeError(type) {
    return {
      [interfaces$1.METRIC_ERRORS.generic]: { title: this.intl.t("genericError.title"), message: this.intl.t("genericError.message") },
      [interfaces$1.METRIC_ERRORS.timeout]: { title: this.intl.t("timeoutError.title"), message: this.intl.t("timeoutError.message") }
    }[type];
  }
  renderErrorMessage(errorMessage) {
    let error = errorMessage;
    // if given a premade type, use that instead
    if (errorMessage.premadeType) {
      error = this.getPremadeError(errorMessage.premadeType);
    }
    return index.h("calcite-notice", { icon: "exclamation-mark-circle", kind: "danger", open: true, width: "full" }, index.h("h3", { slot: "title" }, error === null || error === void 0 ? void 0 : error.title), index.h("p", { slot: "message" }, error === null || error === void 0 ? void 0 : error.message));
  }
  get _isLoading() {
    return !this.value || this.isLoading;
  }
  renderContent() {
    return index.h(index.Fragment, null, this.renderHeader(this.cardTitle), index.h("div", { class: {
        [CSS.valueContainerWithError]: !!this.errorMessage,
        [CSS.valueContainer]: !this.errorMessage
      } }, this.errorMessage ? this.renderErrorMessage(this.errorMessage) : this.renderValue(this.value, this.unit)), this.renderFooter(this.trailingText, this.sourceLink, this.sourceTitle, this.allowLink, this.type), this.renderInformationalModal());
  }
  render() {
    return index.h(index.Host, { "data-element": "stat-card" }, index.h(shareable.Shareable, { context: this, showShareUi: !!this.value }, index.h("calcite-card", null, this.renderContent())));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "valueColor": ["onColorChanged"],
    "corners": ["onCornersChanged"]
  }; }
};
ArcgisStatCard.style = arcgisStatCardCss;

exports.arcgis_stat_card = ArcgisStatCard;
