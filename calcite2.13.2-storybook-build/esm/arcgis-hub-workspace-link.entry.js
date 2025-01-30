import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import './types-dca4cb90.js';
import { g as getRelativeWorkspacePaneUrl, l as logWorkspaceLinkTelemetry } from './utils-44ff0e2f.js';
import { b as bind } from './context-7d8f7366.js';
import { s as slotChangeGetAssignedElements } from './dom-e1e6c513.js';
import '@arcgis/core/config.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import './_commonjsHelpers-11ca3be1.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './urls-0e36649d.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './extent-34a4ba2a.js';
import './request-fa80ae40.js';
import './helpers-8c7e5e31.js';
import './getTypeFromEntity-e149b61e.js';
import './logger-f8667200.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';

const arcgisHubWorkspaceLinkCss = ":not(.workspace-link__text){--calcite-link-blue-underline:transparent;--calcite-color-text-link:transparent}::slotted(*){height:100%}";

const ArcgisHubWorkspaceLink = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubWorkspaceLinkClicked = createEvent(this, "arcgisHubWorkspaceLinkClicked", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.pane = undefined;
    this.href = undefined;
    this.relativeToOrigin = undefined;
    this.telemetry = {};
    this.iconStart = undefined;
    this.iconEnd = undefined;
    this.target = undefined;
    this.isText = true;
    this.isButton = false;
    bind(this, 'handleClick', 'handleKeyDown', 'handleSlotChange');
  }
  /**
   * 1. We default to the provided href (relative or absolute)
   * 2. If pane is provided, we assume this is an inter-workspace-pane
   * link and we construct a relative href using the existing url
   * 3. If a (relative) href is provided and specified to be
   * relativeToOrigin, we construct an absolute url relative to the
   * origin url
   */
  get _href() {
    let href = this.href;
    if (this.pane) {
      href = getRelativeWorkspacePaneUrl(this.pane);
    }
    if (this.href && !this.href.startsWith('http') && this.relativeToOrigin) {
      return `${window.location.origin}${href}`;
    }
    return href;
  }
  /**
   * This function is called when the slotted content changes. It
   * checks whether the slotted content is a calcite-button and
   * if so, sets the "isButton" flag to true and sets the href
   * on the calcite-button to the computed _href.
   *
   * In the render function, you'll see that we use the "isButton"
   * state to conditionally render a calcite-link around the slotted
   * content. If a button is slotted in, we do NOT want to wrap it
   * in a calcite-link as it is improper HTML to wrap a button
   * in an anchor tag. Instead, we simply render the button and
   * manually set its href
   */
  handleSlotChange(evt) {
    var _a, _b;
    const slottedElements = slotChangeGetAssignedElements(evt);
    this.isText = !slottedElements.length;
    if (((_b = (_a = slottedElements[0]) === null || _a === void 0 ? void 0 : _a.tagName) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === 'calcite-button') {
      this.isButton = true;
      const slottedButtonEl = slottedElements[0];
      slottedButtonEl.href = this._href;
    }
  }
  handleClick(evt) {
    const el = evt.currentTarget;
    const pane = el.getAttribute('data-value');
    const evtDetail = pane
      ? { clickEvent: evt, pane }
      : { clickEvent: evt, href: this._href };
    this.arcgisHubWorkspaceLinkClicked.emit(evtDetail);
    logWorkspaceLinkTelemetry({
      pane: this.pane,
      href: this._href,
      hubTelemetry: this.hubTelemetry,
      telemetry: this.telemetry
    });
  }
  handleKeyDown(evt) {
    if (evt.key === 'enter') {
      this.handleClick(evt);
    }
  }
  render() {
    return (h(Host, null, this.isButton
      // we need to wrap the slotted button in a div so we can add the
      // click handler - eslint complains about this, but I think it's
      // okay because the slotted element is actually the interactive el
      // and a11y tools appear to work correctly
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      ? h("div", { "data-value": this.pane, onClick: this.handleClick, onKeyDown: this.handleKeyDown }, h("slot", null))
      : h("calcite-link", { class: { "workspace-link__text": this.isText }, "data-value": this.pane, href: this._href, iconEnd: this.iconEnd, iconStart: this.iconStart, onClick: this.handleClick, target: this.target }, h("slot", { onSlotchange: this.handleSlotChange }))));
  }
  get element() { return getElement(this); }
};
ArcgisHubWorkspaceLink.style = arcgisHubWorkspaceLinkCss;

export { ArcgisHubWorkspaceLink as arcgis_hub_workspace_link };
