import { r as registerInstance, c as createEvent, d as getAssetPath, h, F as Fragment, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { I as IMAGE_TYPES, C as CORNERS, D as DROP_SHADOWS } from './interfaces-0d0bef14.js';
import { S as Sanitizer } from './index-55cb25f7.js';
import { b as bind } from './context-7d8f7366.js';
import { g as getGlobalContext, h as connectContext } from './state-31a09db0.js';
import { g as getSearchResultTypeIcon } from './search-6c91f105.js';
import { c as createId, m as maybeAdd } from './util-3e6872d9.js';
import { d as defaultEntityToCardModel, g as groupToCardModel, r as resultToCardModel } from './resultToCardModel-4f88e531.js';
import { H as HubUserAvatar } from './hub-user-avatar-76be527d.js';
import { s as searchGroupUsers } from './get-850c466d.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './_commonjsHelpers-11ca3be1.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './get-prop-ec5be510.js';
import './request-fa80ae40.js';
import './helpers-8c7e5e31.js';
import './get-with-default-b819d95d.js';
import './getEntityThumbnailUrl-d6b416fe.js';
import './discussions-a173baa3.js';
import './cache-4bea61e0.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import './resources-3b88c839.js';
import './download-list-38d6b571.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './fetchContent-dbc662af.js';
import './tslib.es6-9c17e83a.js';
import './_enrichments-8641475c.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './append-custom-params-4bd856e5.js';
import './OperationError-387ae9ab.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './slugs-7b8828d5.js';
import './is-guid-982831aa.js';
import './request-3e386aeb.js';
import './index-edff2d62.js';
import './getLayer-464ff70e.js';
import './utils-6bf1b713.js';
import './tslib.es6-0e03e357.js';
import './discussions-api-request-199cae2d.js';
import './update-6a7d5697.js';
import './update-26e2fbc1.js';
import './HubInitiatives-4f4e24ce.js';
import './slugs-7ec67036.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './search-c7a57aa9.js';
import './generate-random-string-1436d9e6.js';
import './create-de41f6f6.js';
import './slugify-e3e67bac.js';
import './HubError-e26c5610.js';
import './object-to-json-blob-583ae5c3.js';
import './fail-safe-cd1a5a2a.js';
import './delete-prop-bd13d424.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './PropertyMapper-4eb0ac8f.js';
import './types-2eaa1a18.js';
import './TemplateBusinessRules-0e35d61b.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeFromEntity-e149b61e.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './remove-7361a90a.js';
import './map-by-a2234e13.js';
import './Metrics-9cb7a1fc.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';

/**
 * Convert a HubEntity into an IHubCardViewModel. This
 * function delegates to the appropriate conversion function
 * based on the HubEntity type.
 *
 * In order to streamline development, these functions have not
 * been hoisted to hub.js.
 *
 * @param entity
 * @param context
 * @param opts
 * @returns
 */
const entityToCardModel = (entity, layout, context, intl, opts) => {
  // default conversion function
  let fn;
  // override based on entity type
  switch (entity.type) {
    case 'Group':
      fn = groupToCardModel;
      break;
    default:
      fn = defaultEntityToCardModel;
      break;
  }
  // process the entity
  return fn(entity, layout, context, intl, opts);
};

const arcgisHubCardCss = ":host{display:block;height:100%}:host([corners=\"round\"]) calcite-card{--calcite-card-corner-radius:10px;border-radius:var(--calcite-card-corner-radius)}:host([shadow=\"low\"]) calcite-card{--tw-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);--tw-shadow-colored:0 4px 8px -1px var(--tw-shadow-color), 0 2px 4px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([shadow=\"medium\"]) calcite-card{--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([shadow=\"heavy\"]) calcite-card{--tw-shadow:0 12px 32px -2px rgba(0, 0, 0, 0.1), 0 4px 20px 0 rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 12px 32px -2px var(--tw-shadow-color), 0 4px 20px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}h1,h2,h3,h4,h5,h6{font-family:var(--hub-heading-family, inherit)}[slot=\"title\"]{display:flex;justify-content:space-between;gap:0.5rem}.content-type{margin-bottom:0.5rem;display:flex;align-items:center;gap:0.25rem;font-weight:var(--calcite-font-weight-bold)}.title>*{width:100%;font-size:var(--calcite-font-size-2);line-height:1.5rem;font-weight:var(--calcite-font-weight-medium);overflow-wrap:anywhere}.title a{color:var(--calcite-color-text-link);-webkit-text-decoration-line:var(--hub-text-decoration, underline);text-decoration-line:var(--hub-text-decoration, underline)}:host([clickable]) .title a::after{position:absolute;top:0;right:0;bottom:0;left:0;z-index:1;pointer-events:auto;content:\"\";background-color:rgba(0,0,0,0)}.owner{margin-top:0.5rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-medium)}.snippet{margin-left:0px;margin-right:0px;font-size:var(--calcite-font-size-0);line-height:1.25rem;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;height:2.5rem;padding-bottom:0.14rem;overflow-wrap:anywhere;color:var(--hub-gallery-body-text, var(--calcite-color-text-1))}dl[slot='footer-start']{margin:0px;display:grid;width:100%;gap:0.25rem;font-size:var(--calcite-font-size--1);line-height:normal;grid-template-columns:repeat(auto-fill, minmax(max(200px, (100% - (2 - 1) * 0.25rem) / 2), 1fr))}calcite-popover dl>div,dl[slot='footer-start']>div{display:flex;gap:0.25rem;overflow:hidden;white-space:nowrap}calcite-popover dt::after,dl[slot='footer-start'] dt::after{content:':'}calcite-popover dd,dl[slot='footer-start'] dd{margin:0px;overflow:hidden;text-overflow:ellipsis;font-weight:var(--calcite-font-weight-bold)}.chips{margin-left:auto;display:flex;gap:0.25rem}.popover-container{position:relative}.chips calcite-chip.chip-color-blue{color:var(--calcite-color-foreground-1);background-color:var(--calcite-color-brand)}.chips calcite-chip.chip-color-red{color:var(--calcite-color-foreground-1);background-color:var(--calcite-color-status-danger)}.chips calcite-chip.chip-color-yellow{color:var(--calcite-color-foreground-1);background-color:var(--calcite-color-status-warning)}.chips calcite-chip.chip-color-green{color:var(--calcite-color-foreground-1);background-color:var(--calcite-color-status-success)}.chips calcite-chip.chip-color-gray{color:var(--calcite-color-text-1);background-color:var(--calcite-color-border-3)}calcite-popover .popover-content{display:flex;flex-direction:column;align-items:stretch;gap:0.25rem;padding:0.5rem;width:max-content;max-width:14.5rem;}calcite-popover .popover-content:lang(el){font-size:var(--calcite-font-size--3)}calcite-popover dl{margin:0.5rem;display:flex;flex-direction:column;gap:0.25rem}#popover-toggle{vertical-align:middle}*[slot=\"thumbnail\"]{display:block;height:100%;width:100%}.avatar-container,.icon-container{display:grid;height:100%;width:100%;align-content:center;justify-content:center;color:var(--calcite-color-brand)}.avatar-container calcite-avatar{height:6rem;width:6rem}.icon-container calcite-icon{height:4rem;width:4rem}:host([selectable]) [slot=\"title\"]{margin-right:1.5rem}:host([layout='card']) calcite-card{height:100%;width:100%}:host([layout='card']) .avatar-container,:host([layout='card']) .icon-container{padding-top:0.5rem;padding-bottom:0.5rem}:host([layout='card']) .title{height:3rem}:host([layout='card']) .title>*{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}:host([layout='card']) .owner{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;height:2.5rem}:host([layout=\"card\"]) [slot=\"footer-end\"]{width:100%}:host([layout=\"card\"]) calcite-card{height:100%}:host([layout='row']) .title>*{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}@media only screen and (min-width: 769px){:host([layout='row']) .title>*{display:inline}:host([layout='row']) .title>*{overflow:visible}:host([layout='row']) .title>*{-webkit-line-clamp:unset}}:host([layout='row']) .owner{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}:host([layout=\"row\"]) .snippet{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}:host([layout=\"row\"]) [slot=\"footer-end\"]{margin-left:auto}";

const ArcgisHubCard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubCardSelect = createEvent(this, "arcgisHubCardSelect", 7);
    this.arcgisHubCardTitleLinkClick = createEvent(this, "arcgisHubCardTitleLinkClick", 7);
    this.arcgisHubCardAction = createEvent(this, "arcgisHubCardAction", 7);
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
  static get assetsDirs() { return ["assets", "locales"]; }
  get element() { return getElement(this); }
};
// This function intentionally does not use URLSearchParams to avoid
// issued with relative paths that are used in ArcGIS Enterprise environments
function addParamToUri(uri, param, value) {
  // check for existing query params
  const separator = uri.includes('?') ? '&' : '?';
  return `${uri}${separator}${param}=${value}`;
}
ArcgisHubCard.style = arcgisHubCardCss;

const arcgisHubEntityCardCss = ":host{display:block}";

const ArcgisHubEntityCard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubCardTitleLinkClick = createEvent(this, "arcgisHubCardTitleLinkClick", 7);
    this.actionLinks = undefined;
    this.baseUrl = undefined;
    this.clickable = undefined;
    this.corners = CORNERS.square;
    this.imageType = IMAGE_TYPES.thumbnail;
    this.layout = 'row';
    this.lazy = false;
    this.linkTarget = undefined;
    this.newTab = false;
    this.selectable = false;
    this.selected = false;
    this.searchResult = undefined;
    this.entity = undefined;
    this.shadow = DROP_SHADOWS.none;
    this.showAdditionalInfo = true;
    this.showAllAdditionalInfo = false;
    this.showBadges = true;
    this.showOwner = true;
    this.showThumbnail = true;
    this.showType = true;
    this.titleTag = undefined;
    this.callback = undefined;
    this.primaryActionsToRender = 1;
    this.isLoading = false;
  }
  get _model() {
    // Construct standard options hash for the conversion functions
    const opts = {
      actionLinks: this.actionLinks,
      baseUrl: this.baseUrl,
      locale: this.intl.locale,
      target: this.linkTarget
    };
    // Decide what converter function to use
    let converter = resultToCardModel;
    if (this.entity) {
      converter = entityToCardModel;
    }
    // Convert the entity or result to a card model
    const resultOrEntity = this.searchResult || this.entity;
    let model = converter(resultOrEntity, this.layout, this.context, this.intl, opts);
    // If there is a callback, call it
    if (this.callback) {
      try {
        model = this.callback(model, this.layout, this.context, resultOrEntity);
      }
      catch (error) {
        // Just log it out but do not throw
        console.error(`arcgis-hub-entity-card:callback error: ${error}`);
      }
    }
    // return the model
    return model;
  }
  get context() {
    return getGlobalContext();
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  render() {
    return (h(Host, { "data-element": "entity-card" }, h("arcgis-hub-card", { clickable: this.clickable, corners: this.corners, imageType: this.imageType, layout: this.layout, lazy: this.lazy, loading: this.isLoading, model: this._model, newTab: this.newTab, primaryActionsToRender: this.primaryActionsToRender, selectable: this.selectable, selected: this.selected, shadow: this.shadow, showAdditionalInfo: this.showAdditionalInfo, showAllAdditionalInfo: this.showAllAdditionalInfo, showBadges: this.showBadges, showOwner: this.showOwner, showThumbnail: this.showThumbnail, showType: this.showType, titleTag: this.titleTag })));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubEntityCard.style = arcgisHubEntityCardCss;

const arcgisHubGroupMemberSummaryCss = ":host{display:block}.members-container.loading{position:relative}.members-container.loading:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0}@keyframes shimmer{0%{background-size:200% 100%;background-position:100% 0}100%{background-size:200% 100%;background-position:-100% 0}}.members-container.loading:after{animation:shimmer 2s cubic-bezier(0.4, 0, 0.2, 0.8) infinite;background-image:linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, 0) 100%);background-color:var(--calcite-color-foreground-3)}.members-container.loading{height:1.5rem}.members-container{display:flex;align-items:center;gap:0.25rem;font-weight:var(--calcite-font-weight-medium)}.members-inner{display:flex}.members-inner calcite-avatar{border-width:1px;border-style:solid;border-color:var(--calcite-color-border-1)}.members-inner calcite-avatar:nth-child(n+2){margin-left:-10px}.members-count{font-size:var(--calcite-font-size-0);line-height:1.25rem}";

const ArcgisHubGroupMemberSummary = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this._context = getGlobalContext();
    this.identifier = undefined;
    this.membershipSummary = undefined;
    this.limit = 3;
    this.memberType = undefined;
    this.hasMembersError = false;
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    if (!this.membershipSummary) {
      this.fetchMembers();
    }
  }
  async fetchMembers() {
    try {
      const context = this._context;
      this.hasMembersError = false;
      if (context && (this === null || this === void 0 ? void 0 : this.identifier)) {
        const options = {
          num: this.limit,
          sortField: 'memberType',
          memberType: this.memberType
        };
        if (context === null || context === void 0 ? void 0 : context.session) {
          options.authentication = context.session;
        }
        else {
          options.portal = context.sharingApiUrl;
        }
        const result = await searchGroupUsers(this.identifier, options);
        this.membershipSummary = { total: result.total, users: result.users };
      }
    }
    catch (error) {
      this.hasMembersError = true;
      console.error('Error fetching group members:', error.message);
    }
  }
  getMemberCount(count) {
    const i18nBase = this.memberType === 'admin' ? 'managers' : 'members';
    if (count === 0) {
      return this.intl.t(`${i18nBase}.noMember`);
    }
    else if (count === 1) {
      return this.intl.t(`${i18nBase}.oneMember`);
    }
    else {
      return this.intl.t(`${i18nBase}.members`, { count });
    }
  }
  renderMembers(summary) {
    const context = this._context;
    // if we got an error fetching members, do not try to render members
    if (!this.hasMembersError) {
      // if we got context but do not yet have members it means we are fetching them but don't have them yet (we will set a loading class below)
      let result = '&nbsp;';
      if (summary) {
        result = h(Fragment, null, h("div", { class: "members-inner" }, summary.users.map(member => {
          return h(HubUserAvatar, { context: context, key: member.username, scale: 's', user: member });
        })), h("span", { class: "members-count" }, this.getMemberCount(summary.total)));
      }
      return (h("div", { class: {
          ["members-container"]: true,
          loading: !summary
        }, slot: "subtitle" }, result));
    }
  }
  render() {
    return (h(Host, null, this.renderMembers(this.membershipSummary)));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "identifier": ["fetchMembers"],
    "_context": ["fetchMembers"]
  }; }
};
ArcgisHubGroupMemberSummary.style = arcgisHubGroupMemberSummaryCss;

export { ArcgisHubCard as arcgis_hub_card, ArcgisHubEntityCard as arcgis_hub_entity_card, ArcgisHubGroupMemberSummary as arcgis_hub_group_member_summary };
