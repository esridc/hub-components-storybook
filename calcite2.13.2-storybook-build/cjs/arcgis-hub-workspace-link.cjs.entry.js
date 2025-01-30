'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
require('./types-ff8f7df0.js');
const utils = require('./utils-a2df9951.js');
const context = require('./context-0167a31e.js');
const dom = require('./dom-e6a9a39e.js');
require('@arcgis/core/config.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./urls-2533c98f.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./get-family-cafa88bb.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./extent-715f7c8d.js');
require('./request-67da3c71.js');
require('./helpers-64227739.js');
require('./getTypeFromEntity-9476954e.js');
require('./logger-5db3d659.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');

const arcgisHubWorkspaceLinkCss = ":not(.workspace-link__text){--calcite-link-blue-underline:transparent;--calcite-color-text-link:transparent}::slotted(*){height:100%}";

const ArcgisHubWorkspaceLink = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubWorkspaceLinkClicked = index.createEvent(this, "arcgisHubWorkspaceLinkClicked", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.pane = undefined;
    this.href = undefined;
    this.relativeToOrigin = undefined;
    this.telemetry = {};
    this.iconStart = undefined;
    this.iconEnd = undefined;
    this.target = undefined;
    this.isText = true;
    this.isButton = false;
    context.bind(this, 'handleClick', 'handleKeyDown', 'handleSlotChange');
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
      href = utils.getRelativeWorkspacePaneUrl(this.pane);
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
    const slottedElements = dom.slotChangeGetAssignedElements(evt);
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
    utils.logWorkspaceLinkTelemetry({
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
    return (index.h(index.Host, null, this.isButton
      // we need to wrap the slotted button in a div so we can add the
      // click handler - eslint complains about this, but I think it's
      // okay because the slotted element is actually the interactive el
      // and a11y tools appear to work correctly
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      ? index.h("div", { "data-value": this.pane, onClick: this.handleClick, onKeyDown: this.handleKeyDown }, index.h("slot", null))
      : index.h("calcite-link", { class: { "workspace-link__text": this.isText }, "data-value": this.pane, href: this._href, iconEnd: this.iconEnd, iconStart: this.iconStart, onClick: this.handleClick, target: this.target }, index.h("slot", { onSlotchange: this.handleSlotChange }))));
  }
  get element() { return index.getElement(this); }
};
ArcgisHubWorkspaceLink.style = arcgisHubWorkspaceLinkCss;

exports.arcgis_hub_workspace_link = ArcgisHubWorkspaceLink;
