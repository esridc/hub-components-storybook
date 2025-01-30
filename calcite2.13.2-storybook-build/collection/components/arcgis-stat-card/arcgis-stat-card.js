import { Fragment, h, Host } from '@stencil/core';
import { ALIGNMENTS, UNIT_POSITIONS, CORNERS, LAYOUTS, SOURCE, SCALE, DROP_SHADOWS, VISUAL_INTEREST, ICONS } from "../interfaces";
import { CSS, SLOTS } from "./resources";
import { getCardState } from '../../utils/shareable-utils';
import { Shareable } from "../functional/shareable";
import { METRIC_ERRORS } from '../arcgis-hub-metric-card/interfaces';
import intlManager from '../../utils/intl-manager';
import { dictionary } from "@esri/telemetry-dictionary-hub";
import { bind } from '../../utils/context';
/**
 * @slot header-media - A slot for adding markup in the upper right corner of the card. This is intended for things like a logo, an icon, or a tiny chart.
 * @slot value-media - A slot for adding markup to follow the value. This is intended for something like a trend indicator.
 * @slot footer - A slot for adding markup to the footer. This will render below any text provided via the `trailingText` prop. This is intended for things like charts.
 */
export class ArcgisStatCard {
  constructor() {
    this.type = SOURCE.static;
    this.layout = LAYOUTS.simple;
    this.cardTitle = undefined;
    this.textAlign = ALIGNMENTS.start;
    this.subtitle = undefined;
    this.value = undefined;
    this.valueColor = '';
    this.unit = undefined;
    this.unitPosition = UNIT_POSITIONS.after;
    this.allowUnitFormatting = true;
    this.trailingText = undefined;
    this.sourceLink = undefined;
    this.sourceTitle = undefined;
    this.allowLink = true;
    this.popoverText = undefined;
    this.publisherText = undefined;
    this.icon = ICONS.caretUp;
    this.visualInterest = VISUAL_INTEREST.none;
    this.shareable = false;
    this.shareableByValue = false;
    this.shareableByReference = false;
    this.shareableOnHover = false;
    this.corners = CORNERS.square;
    this.shadow = DROP_SHADOWS.none;
    this.border = true;
    this.scale = SCALE.small;
    this.errorMessage = undefined;
    this.isLoading = false;
    this.isModalOpen = false;
    bind(this, 'handleModalOpen', 'handleModalClose', 'handleLinkNavigation');
  }
  onColorChanged(newVal) {
    const cssVar = CSS.valueColorProp;
    this.updateCSSProp(cssVar, newVal);
  }
  onCornersChanged(style) {
    const cssVar = CSS.cornerBorderRadiusProp;
    const newVal = style === CORNERS.round && "10px";
    this.updateCSSProp(cssVar, newVal);
  }
  async getState() {
    // this implementation works if all props that are needed to spin up the component in its current state are reflected back to the DOM
    // in cases where that is not the case, a custom implementation will be needed
    const { element } = this;
    const blacklist = ['hub-request-options', 'site'];
    return getCardState(element, blacklist);
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
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
    this.hubTelemetry.emit(Object.assign({}, dictionary.category.navigation.action.view.label.content));
  }
  /**
   * Closes the calcite-modal
   */
  handleModalClose() {
    this.isModalOpen = false;
    this.hubTelemetry.emit(Object.assign({}, dictionary.category.interaction.action.close.label.modal.details.info));
  }
  /**
   * Opens the calcite-modal
   */
  handleModalOpen() {
    this.isModalOpen = true;
    this.hubTelemetry.emit(Object.assign({}, dictionary.category.interaction.action.open.label.modal.details.info));
  }
  /**
   * Renders the information calcite-icon wrapped in a calcite-button with interactability
   * @returns HTMLElement
   */
  renderInfoIcon() {
    return (h("calcite-button", { appearance: "transparent", label: this.intl.t("openInfo"), onClick: this.handleModalOpen, round: true }, h("calcite-icon", { icon: "information" })));
  }
  /**
   * Renders the selected visual interest icon
   * @returns HTMLElement
   */
  renderVisualInterestIcon() {
    return h("calcite-icon", { icon: this.icon, scale: "m" });
  }
  /**
   * Renders the selected icon dependent on layout type. In the future, we look to
   * expand icon choices by adding a dependencies on source and card style
   * @returns HTMLElement
   */
  renderIcon() {
    let icon;
    switch (this.layout) {
      case LAYOUTS.informational:
        // Renders the info icon if either popoverText or publisherText has content
        icon = (this.popoverText || this.publisherText) && this.renderInfoIcon();
        break;
      case LAYOUTS.simple:
        // Renders visual interest icon if visual interest is set to 'icon'
        icon = this.visualInterest === VISUAL_INTEREST.icon && this.renderVisualInterestIcon();
        break;
    }
    return icon;
  }
  /**
   * Renders the title, headerMedia, subtitle, and icon on the stat card
   * @param title - title of stat card
   */
  renderHeader(title) {
    return (h("div", { class: "header", slot: "title" }, h("div", { class: "header-upper" }, h("h1", { class: CSS.title }, title), h("slot", { name: SLOTS.headerMedia }), this.renderIcon()), h("div", { class: "header-lower" }, this.renderSubtitle(this.subtitle))));
  }
  /**
   * Renders the calcite-modal on info-icon click to give user more information
   * @returns HTMLElement
   */
  renderInformationalModal() {
    return (h("arcgis-wormhole", { styles: { overflowWrap: "break-word" } }, h("calcite-modal", { docked: true, onCalciteModalClose: this.handleModalClose, open: this.isModalOpen, scale: "s" }, h("div", { "aria-level": "2", role: "heading", slot: "header" }, this.intl.t("moreInfo")), h("div", { slot: "content" }, this.popoverText && h("p", null, this.popoverText), this.publisherText && h("div", null, h("strong", null, this.publisherText)), this.sourceLink && this.renderSourceLink(this.sourceLink, this.sourceTitle, this.type, false)), h("calcite-button", { kind: "brand", onClick: this.handleModalClose, round: true, slot: "primary", width: "full" }, this.intl.t("dismiss")))));
  }
  renderSubtitle(subtitle) {
    return subtitle && h("h2", { class: CSS.subtitle }, subtitle);
  }
  renderValue(value, unit) {
    let result = [
      h("span", { class: CSS.value, key: value }, value, h("slot", { name: SLOTS.valueMedia }))
    ];
    if (this.allowUnitFormatting && unit) {
      result.push(h("span", { class: CSS.unit }, unit));
    }
    if (this.allowUnitFormatting && this.unitPosition === 'before') {
      result.reverse();
    }
    if (this._isLoading) {
      result = h("calcite-loader", { label: this.intl.t("loading"), scale: "m", type: "indeterminite" });
    }
    return result;
  }
  shouldShowLink(allowLink, sourceLink, type) {
    // if we have the link and if we allow the link to be shown
    switch (type) {
      case SOURCE.static:
        return !!(allowLink && sourceLink);
      case SOURCE.dynamic:
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
    return h(Fragment, null, h("div", { class: CSS.footer, slot: "footer-start" }, this.renderTrailingText(trailingText), this.shouldShowLink(allowLink, sourceLink, type) && this.renderSourceLink(sourceLink, sourceTitle, type, true), h("slot", { name: SLOTS.footer })));
  }
  renderTrailingText(trailingText) {
    return trailingText && h("p", { class: "trailing-text" }, trailingText);
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
      if (type === SOURCE.static) {
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
    const prefix = usePrefix && type === SOURCE.dynamic ? this.intl.t('source') : "";
    const iconEnd = this.shouldShowLaunchIcon(type, sourceLink) ? 'launch' : '';
    return (h("div", { class: "source-link-container" }, prefix && h("span", null, prefix), h("calcite-link", { class: `source-link ${type}`, href: sourceLink, "icon-end": iconEnd, onClick: this.handleLinkNavigation, target: iconEnd ? "_blank" : "" }, textToRender)));
  }
  getPremadeError(type) {
    return {
      [METRIC_ERRORS.generic]: { title: this.intl.t("genericError.title"), message: this.intl.t("genericError.message") },
      [METRIC_ERRORS.timeout]: { title: this.intl.t("timeoutError.title"), message: this.intl.t("timeoutError.message") }
    }[type];
  }
  renderErrorMessage(errorMessage) {
    let error = errorMessage;
    // if given a premade type, use that instead
    if (errorMessage.premadeType) {
      error = this.getPremadeError(errorMessage.premadeType);
    }
    return h("calcite-notice", { icon: "exclamation-mark-circle", kind: "danger", open: true, width: "full" }, h("h3", { slot: "title" }, error === null || error === void 0 ? void 0 : error.title), h("p", { slot: "message" }, error === null || error === void 0 ? void 0 : error.message));
  }
  get _isLoading() {
    return !this.value || this.isLoading;
  }
  renderContent() {
    return h(Fragment, null, this.renderHeader(this.cardTitle), h("div", { class: {
        [CSS.valueContainerWithError]: !!this.errorMessage,
        [CSS.valueContainer]: !this.errorMessage
      } }, this.errorMessage ? this.renderErrorMessage(this.errorMessage) : this.renderValue(this.value, this.unit)), this.renderFooter(this.trailingText, this.sourceLink, this.sourceTitle, this.allowLink, this.type), this.renderInformationalModal());
  }
  render() {
    return h(Host, { "data-element": "stat-card" }, h(Shareable, { context: this, showShareUi: !!this.value }, h("calcite-card", null, this.renderContent())));
  }
  static get is() { return "arcgis-stat-card"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-stat-card.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-stat-card.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "SOURCE",
          "resolved": "SOURCE.dynamic | SOURCE.itemQuery | SOURCE.static",
          "references": {
            "SOURCE": {
              "location": "import",
              "path": "../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{Source}"
            }, {
              "name": "memberof",
              "text": "ArcgisStatCard"
            }],
          "text": "Whether the statistic being rendered was manually input or dynamically created.\npossible values are 'dynamic' | 'static'"
        },
        "attribute": "type",
        "reflect": true,
        "defaultValue": "SOURCE.static"
      },
      "layout": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "LAYOUTS",
          "resolved": "LAYOUTS.informational | LAYOUTS.simple",
          "references": {
            "LAYOUTS": {
              "location": "import",
              "path": "../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{Layout}"
            }, {
              "name": "memberof",
              "text": "ArcgisStatCard"
            }],
          "text": "The layout chosen for the styling of the stat card (optional)"
        },
        "attribute": "layout",
        "reflect": true,
        "defaultValue": "LAYOUTS.simple"
      },
      "cardTitle": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{string}"
            }, {
              "name": "memberof",
              "text": "ArcgisStatCard"
            }],
          "text": "The title to appear at the top of the card (optional)"
        },
        "attribute": "card-title",
        "reflect": true
      },
      "textAlign": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "ALIGNMENTS",
          "resolved": "ALIGNMENTS.center | ALIGNMENTS.end | ALIGNMENTS.start",
          "references": {
            "ALIGNMENTS": {
              "location": "import",
              "path": "../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{Alignment}"
            }, {
              "name": "memberof",
              "text": "ArcgisStatCard"
            }],
          "text": "The alignment of the text (optional)"
        },
        "attribute": "text-align",
        "reflect": true,
        "defaultValue": "ALIGNMENTS.start"
      },
      "subtitle": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{string}"
            }, {
              "name": "memberof",
              "text": "ArcgisStatCard"
            }],
          "text": "A subtitle to appear before the value (optional)"
        },
        "attribute": "subtitle",
        "reflect": true
      },
      "value": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{string}"
            }, {
              "name": "memberof",
              "text": "ArcgisStatCard"
            }],
          "text": "The value to render in the main content area\nIt is expected that the consumer will format the value appropriately"
        },
        "attribute": "value",
        "reflect": true
      },
      "valueColor": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{string= --calcite-color-brand}"
            }, {
              "name": "memberof",
              "text": "ArcgisStatCard"
            }],
          "text": "The color in which to render the value (optional)"
        },
        "attribute": "value-color",
        "reflect": true,
        "defaultValue": "''"
      },
      "unit": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{string}"
            }, {
              "name": "memberof",
              "text": "ArcgisStatCard"
            }],
          "text": "The unit to render next to the value (optional)"
        },
        "attribute": "unit",
        "reflect": true
      },
      "unitPosition": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "UNIT_POSITIONS",
          "resolved": "UNIT_POSITIONS.after | UNIT_POSITIONS.before | UNIT_POSITIONS.below",
          "references": {
            "UNIT_POSITIONS": {
              "location": "import",
              "path": "../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{UnitPosition= after}"
            }, {
              "name": "memberof",
              "text": "ArcgisStatCard"
            }],
          "text": "Where to render the unit (optional)"
        },
        "attribute": "unit-position",
        "reflect": true,
        "defaultValue": "UNIT_POSITIONS.after"
      },
      "allowUnitFormatting": {
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
          "text": "If any unit rendering should be allowed. Defaults to true (optional)"
        },
        "attribute": "allow-unit-formatting",
        "reflect": false,
        "defaultValue": "true"
      },
      "trailingText": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{string}"
            }, {
              "name": "memberof",
              "text": "ArcgisStatCard"
            }],
          "text": "Text to render in the footer of the card (optional)"
        },
        "attribute": "trailing-text",
        "reflect": true
      },
      "sourceLink": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{string}"
            }, {
              "name": "memberof",
              "text": "ArcgisStatCard"
            }],
          "text": "The hyperlink to the source of the stat card's data"
        },
        "attribute": "source-link",
        "reflect": true
      },
      "sourceTitle": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The clickable text rendered for the hyperlink to the source of the stat card's data"
        },
        "attribute": "source-title",
        "reflect": true
      },
      "allowLink": {
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
          "text": "If any source link and source title rendering should be allowed. Defaults to true (optional)"
        },
        "attribute": "allow-link",
        "reflect": false,
        "defaultValue": "true"
      },
      "popoverText": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{string}"
            }, {
              "name": "memberof",
              "text": "ArcgisStatCard"
            }],
          "text": "Text to provide additional information, rendered inside the calcite-modal\nOnly relevant if layout is \"informational\""
        },
        "attribute": "popover-text",
        "reflect": true
      },
      "publisherText": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{string}"
            }, {
              "name": "memberof",
              "text": "ArcgisStatCard"
            }],
          "text": "Information about the publisher, rendered inside the calcite-modal\nOnly relevant if layout is \"informational\""
        },
        "attribute": "publisher-text",
        "reflect": true
      },
      "icon": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "ICONS",
          "resolved": "ICONS.caretDouble | ICONS.caretDown | ICONS.caretUp",
          "references": {
            "ICONS": {
              "location": "import",
              "path": "../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Sets the icon type (caretUp, caretDown, caretDouble) based on visual interest."
        },
        "attribute": "icon",
        "reflect": true,
        "defaultValue": "ICONS.caretUp"
      },
      "visualInterest": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "VISUAL_INTEREST",
          "resolved": "VISUAL_INTEREST.icon | VISUAL_INTEREST.none",
          "references": {
            "VISUAL_INTEREST": {
              "location": "import",
              "path": "../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Controls whether visual interest icons are displayed ('none' or 'icon')"
        },
        "attribute": "visual-interest",
        "reflect": true,
        "defaultValue": "VISUAL_INTEREST.none"
      },
      "shareable": {
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
          "tags": [{
              "name": "type",
              "text": "{string}"
            }, {
              "name": "memberof",
              "text": "ArcgisStatCard"
            }],
          "text": "Whether the card should render a share button"
        },
        "attribute": "shareable",
        "reflect": true,
        "defaultValue": "false"
      },
      "shareableByValue": {
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
          "text": ""
        },
        "attribute": "shareable-by-value",
        "reflect": true,
        "defaultValue": "false"
      },
      "shareableByReference": {
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
          "text": ""
        },
        "attribute": "shareable-by-reference",
        "reflect": true,
        "defaultValue": "false"
      },
      "shareableOnHover": {
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
          "text": ""
        },
        "attribute": "shareable-on-hover",
        "reflect": true,
        "defaultValue": "false"
      },
      "corners": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "CORNERS",
          "resolved": "CORNERS.round | CORNERS.square",
          "references": {
            "CORNERS": {
              "location": "import",
              "path": "../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{string}"
            }, {
              "name": "memberof",
              "text": "ArcgisStatCard"
            }],
          "text": "The style of the card's corners"
        },
        "attribute": "corners",
        "reflect": true,
        "defaultValue": "CORNERS.square"
      },
      "shadow": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "DROP_SHADOWS",
          "resolved": "DROP_SHADOWS.heavy | DROP_SHADOWS.low | DROP_SHADOWS.medium | DROP_SHADOWS.none",
          "references": {
            "DROP_SHADOWS": {
              "location": "import",
              "path": "../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{string}"
            }, {
              "name": "memberof",
              "text": "ArcgisStatCard"
            }],
          "text": "Adds a drop shadow to the calcite-card. Currently just for internal use."
        },
        "attribute": "shadow",
        "reflect": true,
        "defaultValue": "DROP_SHADOWS.none"
      },
      "border": {
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
          "text": "What border to render the card with, if any"
        },
        "attribute": "border",
        "reflect": true,
        "defaultValue": "true"
      },
      "scale": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "SCALE",
          "resolved": "SCALE.large | SCALE.medium | SCALE.small",
          "references": {
            "SCALE": {
              "location": "import",
              "path": "../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The scale of the font sizes on the stat card: \"s\", \"m\" or \"l\""
        },
        "attribute": "scale",
        "reflect": true,
        "defaultValue": "SCALE.small"
      },
      "errorMessage": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IErrorMessage",
          "resolved": "IErrorMessage",
          "references": {
            "IErrorMessage": {
              "location": "import",
              "path": "../arcgis-hub-metric-card/interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Error message to display instead of any value (optional)"
        }
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
          "text": "Allows a component to dictate when the stat card is\nfinished loading or not"
        },
        "attribute": "is-loading",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "isModalOpen": {}
    };
  }
  static get events() {
    return [{
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "getState": {
        "complexType": {
          "signature": "() => Promise<any>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<any>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "valueColor",
        "methodName": "onColorChanged"
      }, {
        "propName": "corners",
        "methodName": "onCornersChanged"
      }];
  }
}
