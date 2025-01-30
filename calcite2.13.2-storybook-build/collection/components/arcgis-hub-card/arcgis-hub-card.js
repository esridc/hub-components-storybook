import { getAssetPath, h, Host, Fragment } from '@stencil/core';
import { createId, maybeAdd } from '@esri/hub-common';
import intlManager from '../../utils/intl-manager';
import { CORNERS, IMAGE_TYPES } from "../interfaces";
import { Sanitizer } from '@esri/arcgis-html-sanitizer';
import { bind } from '../../utils/context';
import { getGlobalContext } from '../../utils/state';
import { getSearchResultTypeIcon } from '../../utils/search';
export class ArcgisHubCard {
  constructor() {
    /**
     * Internal variables
     */
    this.sanitizer = new Sanitizer({
      whiteList: {},
      stripIgnoreTag: true,
      stripIgnoreTagBody: ['script'] // remove script tag contents
    });
    this.model = undefined;
    this.layout = 'row';
    this.loading = undefined;
    this.showThumbnail = undefined;
    this.imageType = IMAGE_TYPES.thumbnail;
    this.lazy = false;
    this.newTab = undefined;
    this.selectable = undefined;
    this.selected = false;
    this.itemTitle = undefined;
    this.source = undefined;
    this.summary = undefined;
    this.thumbnailUrl = undefined;
    this.family = undefined;
    this.additionalInfo = undefined;
    this.actionLinks = undefined;
    this.cardActionLinks = [];
    this.badges = undefined;
    this.type = undefined;
    this.identifier = undefined;
    this.corners = CORNERS.square;
    this.titleTag = 'div';
    this.showAdditionalInfo = true;
    this.showAllAdditionalInfo = false;
    this.shadow = undefined;
    this.showBadges = true;
    this.showType = true;
    this.showOwner = true;
    this.primaryActionsToRender = 1;
    this.clickable = false;
    bind(this, 'onTitleLinkClick');
    this.internalId = createId('ahc');
  }
  /**
   * Get the icon for the content type
   */
  get contentTypeIcon() {
    return getSearchResultTypeIcon(this.model.type);
  }
  /**
   * Get the primary infos to be shown in the body of
   * the row. Cards do not display any infos
   */
  get primaryInfos() {
    const result = [];
    if (this.showAdditionalInfo) {
      // If it's a card, we show no primary info, so end is 0
      let end = 0;
      const additionalInfo = this.model.additionalInfo || [];
      // if row, we show 4, unless there is a primary action
      if (this.layout === "row") {
        end = this.hasPrimaryAction ? 2 : 4;
        if (this.showAllAdditionalInfo) {
          // override limit on additional info and show all
          end = additionalInfo.length;
        }
      }
      return additionalInfo.slice(0, end);
    }
    return result;
  }
  /**
   * Get the secondary info to be shown in the pop-over
   * - Pop-over should only contain max 4 entries
   * - Actions are always shown
   * - we show as many info's as we have space for
   */
  get secondaryInfos() {
    let result = [];
    if (this.showAdditionalInfo) {
      // we return (4 - this.secondaryActions.length)
      const start = this.primaryInfos.length;
      const end = 4 - (this.secondaryActions.length) + start;
      const additionalInfo = this.model.additionalInfo || [];
      result = additionalInfo.slice(start, end);
    }
    return result;
  }
  /**
   * Do we have any content to render in the pop-over. If not
   * lets not render it
   */
  get hasPopoverContent() {
    return !!(this.secondaryActions.length || this.secondaryInfos.length);
  }
  /**
   * Do we have a primary action?
   */
  get hasPrimaryAction() {
    return !!this.primaryActions.length;
  }
  /**
   * Primary action is the first action in model.actionLinks
   */
  get primaryActions() {
    const links = this.model.actionLinks || [];
    return links.slice(0, this.primaryActionsToRender).filter(item => item.action || item.href);
  }
  /**
   * Secondary Actions are the 2nd, 3rd and 4th actions in model.actionLinks
   */
  get secondaryActions() {
    const links = this.model.actionLinks || [];
    return links.slice(this.primaryActionsToRender, 3).filter(item => item.action || item.href);
  }
  /**
   * AVOID USING getter until accessibility violations are resolved
   */
  get isClickable() {
    var _a;
    return this.clickable && !!((_a = this.model) === null || _a === void 0 ? void 0 : _a.titleUrl);
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  async componentWillRender() {
    // See if we got a ViewModel or need to construct one from props
    if (!this.model) {
      // create model from props
      let model = {
        additionalInfo: [],
        actionLinks: []
      };
      ["summary", "source", "thumbnailUrl", "family", "type"].forEach(key => {
        model = maybeAdd(key, this[key], model);
      });
      model = maybeAdd("id", this.identifier, model);
      model = maybeAdd('title', this.itemTitle, model);
      if (this.additionalInfo) {
        // parse into configs
        model.additionalInfo = this.additionalInfo.split('|').map(attr => {
          return {
            i18nKey: attr.split(':')[0],
            value: attr.split(':')[1]
          };
        });
      }
      if (this.actionLinks) {
        console.info(`Action links are deprecated - use cardActionLinks instead`);
        model.actionLinks = this.actionLinks.split('|').map(entry => {
          const parts = entry.split(':');
          let link = { action: parts[0] };
          link = maybeAdd("icon", parts[1], link);
          link = maybeAdd("label", parts[2], link);
          return link;
        });
      }
      if (this.cardActionLinks) {
        model.actionLinks = this.cardActionLinks;
      }
      if (this.badges) {
        model.badges = this.badges.split('|').map(entry => {
          const parts = entry.split(":");
          let chip = {
            color: parts[0]
          };
          chip = maybeAdd('icon', parts[1], chip);
          chip = maybeAdd('label', parts[2], chip);
          return chip;
        });
      }
      this.model = model;
    }
  }
  /**
   * Fired when a card is selected/deselected
   */
  handelCardSelectEvent() {
    this.arcgisHubCardSelect.emit(this.model);
  }
  get _thumbnailUrl() {
    var _a, _b;
    const { model } = this;
    let thumbnailUrl;
    // only run this if we have a thumbnail to convert
    if (model.thumbnailUrl) {
      // if the model has a thumbnailUrl AND there has not been an error loading it, use it
      thumbnailUrl = model.thumbnailUrl;
      const token = (_b = (_a = getGlobalContext()) === null || _a === void 0 ? void 0 : _a.session) === null || _b === void 0 ? void 0 : _b.token;
      if (token && model.access !== 'public') {
        thumbnailUrl = addParamToUri(thumbnailUrl, 'token', token);
      }
      // NOTE: we could do this conditionally based on the current size by leveraging the resize-observer util but i think w=400 will be good in most cases
      thumbnailUrl = addParamToUri(thumbnailUrl, 'w', '400');
    }
    return thumbnailUrl;
  }
  get _fallbackUrl() {
    const { model } = this;
    const isGroupType = model.type === 'Group';
    const fallbackPath = isGroupType ? './assets/groups-fallback.png' : './assets/content-fallback.png';
    return getAssetPath(fallbackPath);
  }
  get _messageOverrides() {
    return {
      select: `${this.intl.t('select')} ${this.intl.t(this.model.family)} ${this.model.title}`,
    };
  }
  /**
   * Render the thumbnail if showThumbnail is true
   * We will render an image icon with a gray background if the item does not contain a thumbnail
   * @returns thumbnail html element
   */
  renderThumbnail(model) {
    let image;
    // Only render the thumbnail when not in loading state
    // so the <calcite-card> loader will not appear in thumbnail slot in row layout
    if (this.showThumbnail && !this.loading) {
      if (model.type === "User" || model.type === "channel") {
        image = this.renderAvatar(model);
      }
      else {
        // content/item or group
        const className = this.getThumbnailClassName(model);
        // eslint-disable-next-line unicorn/prefer-ternary
        if (this.imageType === IMAGE_TYPES.thumbnail) {
          image = h("arcgis-hub-image", { alt: "", class: className, fallback: this._fallbackUrl, lazy: this.lazy, src: this._thumbnailUrl });
        }
        else {
          image = h("div", { class: "icon-container" }, h("calcite-icon", { icon: this.contentTypeIcon, scale: "l" }));
        }
      }
    }
    return this.isClickable
      ? h("a", { href: model.titleUrl, slot: "thumbnail", target: this.newTab ? "_blank" : "_self" }, image)
      : h("div", { slot: "thumbnail" }, image);
  }
  getThumbnailClassName(model) {
    let result = 'content-thumbnail';
    if (model.type === 'Group') {
      result = 'group-thumbnail';
    }
    if (model.type === 'Image') {
      result = 'image-thumbnail';
    }
    return result;
  }
  configureFullNameAvatar(model) {
    var _a;
    let fullName = model.title;
    // If we don't have a thumbnailUrl then the calcite-avatar will render the initials
    if (!model.thumbnailUrl && model.title) {
      // if the title does not have a space in it, then it will only show the first letter
      if (((_a = model === null || model === void 0 ? void 0 : model.title) === null || _a === void 0 ? void 0 : _a.indexOf(' ')) === -1) {
        // get the first two letters of the title, minus the @ symbol
        const subStr = model.title.indexOf('@') === 0 ? model.title.substring(1, 3) : model.title.substring(0, 2);
        // split the characters up and join them with a space, the calcite-avatar will then render the initials
        // If you leave them merged, it will render the first letter and the second letter will be cut off
        fullName = subStr.split("").join(" ");
      }
    }
    return fullName;
  }
  renderAvatar(model) {
    return h("div", { class: "avatar-container" }, h("calcite-avatar", { "aria-hidden": "true", class: {
        'full-size-avatar': this.layout === "row",
        'initials-avatar': this.layout === "row" && !model.thumbnailUrl
      }, "full-name": this.configureFullNameAvatar(model), scale: "l", thumbnail: model.thumbnailUrl, username: model.source }));
  }
  /**
   * When there is no card url, render a plain text title instead of a link
   * @returns card url
   */
  renderCardTitle(model) {
    const { titleUrl: link, title } = model;
    if (title) {
      const Tag = this.titleTag;
      return link
        ? h(Tag, { class: "title", slot: "title" }, h("a", { href: link, onClick: this.onTitleLinkClick, target: this.newTab ? "_blank" : "_self" }, model.title))
        : h(Tag, { class: "title", slot: "title" }, h("span", null, title));
    }
  }
  onTitleLinkClick(event) {
    this.arcgisHubCardTitleLinkClick.emit({ model: this.model, event });
  }
  renderFooter() {
    const result = [];
    // Do not render anything into the footer-* slots unless we have something to render, otherwise it will have padding and take up space
    if (this.primaryInfos.length) {
      result.push(h("dl", { slot: "footer-start" }, this.renderAdditionalInfo(this.primaryInfos)));
    }
    // TODO: finalize if we want to support actions via slots or not. The Gallery does not have a means to pass in actions via slots so we may want to remove this
    const hasActionsSlot = this.element.querySelector('[slot="actions"]');
    if (this.primaryActions.length || hasActionsSlot) {
      result.push(h("div", { slot: "footer-end" }, h("slot", { name: "actions" }), this.renderActions(this.primaryActions, 'solid')));
    }
    return result;
  }
  renderAdditionalInfo(infos) {
    return infos.map((config) => h("div", { "data-test": config.i18nKey, key: config.i18nKey }, h("dt", null, config.i18nKey ? this.intl.t(config.i18nKey) : config.label), h("dd", null, config.value)));
  }
  renderPopoverAdditionalInfo() {
    if (this.secondaryInfos.length) {
      return h("dl", null, this.renderAdditionalInfo(this.secondaryInfos));
    }
  }
  actionHandler(action, model) {
    console.log("arcgisHubCardAction", [action, model]);
    this.arcgisHubCardAction.emit({ action, model });
  }
  renderActions(actions, buttonStyle = 'outline') {
    return actions.map((link, id) => {
      let label = link.label;
      if (!label && link.i18nKey) {
        label = this.intl.t(link.i18nKey);
      }
      const handler = link.action && this.actionHandler.bind(this, link.action, this.model);
      const button = (h("calcite-button", { appearance: link.buttonStyle || buttonStyle, color: "blue", disabled: link.disabled, href: link.href, iconStart: link.icon, key: id, label: link.ariaLabel || label, onClick: handler ? handler : undefined, target: this.newTab ? "_blank" : "_self", width: "full" }, link.showLabel && label));
      return (link.tooltip
        ? h("arcgis-ref-tooltip", { key: label, overlayPositioning: "fixed", placement: "top", text: link.tooltip }, button)
        : button);
    });
  }
  renderHeader(model) {
    const showType = this.showType && !["Group", "User"].includes(this.model.type);
    if (showType || this.showBadges || this.hasPopoverContent) {
      let label = this.intl.t(model.family || 'other');
      // Temporary fix added as part of https://confluencewikidev.esri.com/x/KYJuDg
      // Remove once re-classification efforts are complete
      if (model.type === 'Feature Service') {
        label = this.intl.t('dataset');
      }
      return h("div", { slot: "title" }, showType && h("div", { class: 'content-type' }, h(Fragment, null, h("calcite-icon", { icon: this.contentTypeIcon }), h("span", null, label))), this.showBadges && this.renderChips(model), this.hasPopoverContent && this.renderPopover());
    }
  }
  renderChips(model) {
    const chipEls = (model.badges || []).map((badge, idx) => {
      var _a, _b;
      const label = (badge.i18nKey ? this.intl.t(badge.i18nKey) : badge.label) || null;
      const tooltip = ((_a = badge.tooltip) === null || _a === void 0 ? void 0 : _a.i18nKey) ? this.intl.t(badge.tooltip.i18nKey) : (_b = badge.tooltip) === null || _b === void 0 ? void 0 : _b.label;
      const cssClass = badge.color
        ? `chip-color-${badge.color}`
        : null;
      return (h("arcgis-ref-tooltip", { key: idx, overlayPositioning: "fixed", placement: "top", text: tooltip }, h("calcite-chip", { class: cssClass, icon: badge.icon, label: `${this.intl.t('role')} ${label}`, scale: "s", value: label }, !badge.hideLabel && label)));
    });
    return (h("div", { class: "chips" }, chipEls));
  }
  renderPopover() {
    return h("div", { class: "popover-container" }, h("calcite-button", { appearance: "transparent", "icon-start": "ellipsis", id: "popover-toggle", kind: "neutral", label: `${this.intl.t('cardPopoverButton')} ${this.model.title}`, round: true, scale: "m" }), h("calcite-popover", { "auto-close": true, overlayPositioning: "fixed", placement: "bottom-end", referenceElement: "popover-toggle" }, h("div", { class: "popover-content" }, this.renderPopoverAdditionalInfo(), this.renderActions(this.secondaryActions))));
  }
  renderSourceSlot(model) {
    if (this.showOwner) {
      // eslint-disable-next-line unicorn/prefer-ternary
      if (model.type !== "Group") {
        return h("div", { class: 'owner', slot: 'subtitle' }, model.source);
      }
      else {
        return h("arcgis-hub-group-member-summary", { identifier: model.id, slot: 'subtitle' });
      }
    }
  }
  /**
   * Render the card or row
   * @param model
   * @param isLoading
   * @param layout card or row
   * @returns layout element
   */
  renderLayout(model, isLoading = false) {
    let thumbnailPosition = this.layout === 'card' ? 'block-start' : 'inline-start';
    // Temporary patch until calcite fixes an issue where we need to manually pass
    // in 'block-start' when toggling between layouts to properly hide the thumbnail.
    // (discovered by https://devtopia.esri.com/dc/hub/issues/5169#issuecomment-3785632)
    if (!this.showThumbnail) {
      thumbnailPosition = 'block-start';
    }
    return h(Host, null, h("calcite-card", { dir: this.intl.direction, label: this.intl.t('resultCard', { resultTitle: model.title }), loading: isLoading, messageOverrides: this._messageOverrides, selectable: this.selectable, selected: this.selected, thumbnailPosition: thumbnailPosition }, this.renderThumbnail(model), this.renderHeader(model), this.renderCardTitle(model), this.renderSourceSlot(model), model.summary && h("div", { class: 'snippet' }, this.sanitizer.sanitize(model.summary)), this.renderFooter()));
  }
  render() {
    return this.model ? this.renderLayout(this.model, this.loading) : `No data.`;
  }
  static get is() { return "arcgis-hub-card"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-card.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-card.css"]
    };
  }
  static get assetsDirs() { return ["assets", "locales"]; }
  static get properties() {
    return {
      "model": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "IHubCardViewModel",
          "resolved": "IHubCardViewModel",
          "references": {
            "IHubCardViewModel": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Model received from the parent component"
        }
      },
      "layout": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'row' | 'card' | 'header'",
          "resolved": "\"card\" | \"header\" | \"row\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Layout of each hub card, row(list) or card(grid) layout"
        },
        "attribute": "layout",
        "reflect": true,
        "defaultValue": "'row'"
      },
      "loading": {
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
          "text": "We show the loading state when item is being fetched"
        },
        "attribute": "loading",
        "reflect": false
      },
      "showThumbnail": {
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
          "text": "Show/hide the thumbnail"
        },
        "attribute": "show-thumbnail",
        "reflect": false
      },
      "imageType": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "IMAGE_TYPES",
          "resolved": "IMAGE_TYPES.icon | IMAGE_TYPES.thumbnail",
          "references": {
            "IMAGE_TYPES": {
              "location": "import",
              "path": "../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "image-type",
        "reflect": false,
        "defaultValue": "IMAGE_TYPES.thumbnail"
      },
      "lazy": {
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
          "text": "Indicates if the thumbnail should lazy load"
        },
        "attribute": "lazy",
        "reflect": false,
        "defaultValue": "false"
      },
      "newTab": {
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
          "text": "Whether to open the card url in a new tab"
        },
        "attribute": "new-tab",
        "reflect": false
      },
      "selectable": {
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
          "text": "Whether the card/row is selectable"
        },
        "attribute": "selectable",
        "reflect": true
      },
      "selected": {
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
          "text": "Whether the card/row is selected"
        },
        "attribute": "selected",
        "reflect": false,
        "defaultValue": "false"
      },
      "itemTitle": {
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
          "tags": [],
          "text": ""
        },
        "attribute": "item-title",
        "reflect": false
      },
      "source": {
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
          "tags": [],
          "text": ""
        },
        "attribute": "source",
        "reflect": false
      },
      "summary": {
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
          "tags": [],
          "text": ""
        },
        "attribute": "summary",
        "reflect": false
      },
      "thumbnailUrl": {
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
          "tags": [],
          "text": ""
        },
        "attribute": "thumbnail-url",
        "reflect": false
      },
      "family": {
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
          "tags": [],
          "text": ""
        },
        "attribute": "family",
        "reflect": false
      },
      "additionalInfo": {
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
          "tags": [],
          "text": ""
        },
        "attribute": "additional-info",
        "reflect": false
      },
      "actionLinks": {
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
              "name": "deprecated",
              "text": "- use cardActionLinks instead"
            }],
          "text": ""
        },
        "attribute": "action-links",
        "reflect": false
      },
      "cardActionLinks": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ICardActionLink[]",
          "resolved": "ICardActionLink[]",
          "references": {
            "ICardActionLink": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "[]"
      },
      "badges": {
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
          "tags": [],
          "text": ""
        },
        "attribute": "badges",
        "reflect": false
      },
      "type": {
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
          "tags": [],
          "text": ""
        },
        "attribute": "type",
        "reflect": false
      },
      "identifier": {
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
          "tags": [],
          "text": ""
        },
        "attribute": "identifier",
        "reflect": false
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
          "tags": [],
          "text": ""
        },
        "attribute": "corners",
        "reflect": true,
        "defaultValue": "CORNERS.square"
      },
      "titleTag": {
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
          "tags": [],
          "text": ""
        },
        "attribute": "title-tag",
        "reflect": false,
        "defaultValue": "'div'"
      },
      "showAdditionalInfo": {
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
        "attribute": "show-additional-info",
        "reflect": false,
        "defaultValue": "true"
      },
      "showAllAdditionalInfo": {
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
          "text": "If true, all additional info items will be\ndisplayed when layout === 'row'"
        },
        "attribute": "show-all-additional-info",
        "reflect": false,
        "defaultValue": "false"
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
          "tags": [],
          "text": ""
        },
        "attribute": "shadow",
        "reflect": true
      },
      "showBadges": {
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
        "attribute": "show-badges",
        "reflect": false,
        "defaultValue": "true"
      },
      "showType": {
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
        "attribute": "show-type",
        "reflect": false,
        "defaultValue": "true"
      },
      "showOwner": {
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
        "attribute": "show-owner",
        "reflect": false,
        "defaultValue": "true"
      },
      "primaryActionsToRender": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "1 | 2 | 3",
          "resolved": "1 | 2 | 3",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "primary-actions-to-render",
        "reflect": false,
        "defaultValue": "1"
      },
      "clickable": {
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
          "text": "AVOID USING prop until accessibility violations are resolved"
        },
        "attribute": "clickable",
        "reflect": true,
        "defaultValue": "false"
      }
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubCardSelect",
        "name": "arcgisHubCardSelect",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "When the select box is being check/unchecked"
        },
        "complexType": {
          "original": "IHubCardViewModel",
          "resolved": "IHubCardViewModel",
          "references": {
            "IHubCardViewModel": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }, {
        "method": "arcgisHubCardTitleLinkClick",
        "name": "arcgisHubCardTitleLinkClick",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emits when a user clicks the card title and the title is a link"
        },
        "complexType": {
          "original": "IHubCardTitleLinkClickEvent",
          "resolved": "IHubCardTitleLinkClickEvent",
          "references": {
            "IHubCardTitleLinkClickEvent": {
              "location": "import",
              "path": "../../utils/cardModelConverters/types"
            }
          }
        }
      }, {
        "method": "arcgisHubCardAction",
        "name": "arcgisHubCardAction",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "{ action: string, model: IHubCardViewModel }",
          "resolved": "{ action: string; model: IHubCardViewModel; }",
          "references": {
            "IHubCardViewModel": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get listeners() {
    return [{
        "name": "calciteCardSelect",
        "method": "handelCardSelectEvent",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
// This function intentionally does not use URLSearchParams to avoid
// issued with relative paths that are used in ArcGIS Enterprise environments
function addParamToUri(uri, param, value) {
  // check for existing query params
  const separator = uri.includes('?') ? '&' : '?';
  return `${uri}${separator}${param}=${value}`;
}
