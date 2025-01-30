import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { R as ResizeObserverManager } from './resize-observer-dc6e269e.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';

const arcgisMultilineEllipsisCss = ":host{display:block}:host div{margin:0px;text-overflow:ellipsis;overflow-wrap:break-word;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:var(--lines)}::slotted(*){margin:0 !important;padding:0 !important}:host calcite-link{margin:0px;margin-top:0.25rem;display:inline-block}";

const ArcgisMultilineEllipsis = class {
  /**
   * Constructor function
   */
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisMultilineEllipsisExpand = createEvent(this, "arcgisMultilineEllipsisExpand", 7);
    this.arcgisMultilineEllipsisCollapse = createEvent(this, "arcgisMultilineEllipsisCollapse", 7);
    this.lines = undefined;
    this.expandEnabled = undefined;
    this.expandIcon = undefined;
    this.expandText = undefined;
    this.collapseEnabled = undefined;
    this.collapseIcon = undefined;
    this.collapseText = undefined;
    this.tooltipEnabled = undefined;
    this.tooltipText = undefined;
    this.tooltipPlacement = undefined;
    this.isOverflowing = false;
    this.expanded = false;
    bind(this, 'handleExpand', 'handleCollapse', 'handleRef', 'renderLink', 'checkIsOverflowing');
  }
  /**
   * ComponentWillLoad lifecycle method
   */
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * componentDidLoad lifecycle method
   */
  componentDidLoad() {
    this.observe();
    this.checkIsOverflowing();
  }
  /**
   * connectedCallback lifecycle method
   */
  connectedCallback() {
    this.observe();
  }
  /**
   * disconnectedCallback lifecycle method
   */
  disconnectedCallback() {
    this.unobserve();
  }
  /**
   * Observe the paragraph element for resize changes
   */
  observe() {
    const { container } = this;
    if (container) {
      ResizeObserverManager.addHandler(container, this.checkIsOverflowing);
    }
  }
  /**
   * Stop observing the paragraph element for resize changes
   */
  unobserve() {
    const { container } = this;
    if (container) {
      ResizeObserverManager.unobserve(container);
    }
  }
  /**
   * Handles clicks to the Read More link
   */
  handleExpand() {
    const event = this.arcgisMultilineEllipsisExpand.emit();
    // clients can call preventDefault on the event if they want
    // to implement custom handling for clicks to the Read More link
    if (!event.defaultPrevented) {
      this.expanded = true;
    }
  }
  /**
   * Handles clicks to the Read Less link
   */
  handleCollapse() {
    const event = this.arcgisMultilineEllipsisCollapse.emit();
    // clients can call preventDefault on the event if they want
    // to implement custom handling for clicks to the Read Less link
    if (!event.defaultPrevented) {
      this.expanded = false;
    }
  }
  /**
   * Assigns a reference to the paragraph element
   * @param p A reference to the paragraph element
   */
  handleRef(container) {
    this.container = container;
  }
  /**
   * Checks to see if the contents of the paragraph element
   * exceed the desired number of lines
   */
  checkIsOverflowing() {
    if (this.container) {
      const { clientHeight, scrollHeight, clientWidth, scrollWidth } = this.container;
      this.isOverflowing = scrollHeight > clientHeight || scrollWidth > clientWidth;
      // Update 01/03/2025 -- The below hack no longer works for all instances of this component, and
      // the component it was originally implemented for no longer utilizes arcgis-multiline-ellipsis.
      // Commenting this out and reverting to the above line, which seems to work for as expected in the post component.
      // Previous comment:
      // the above, commented out line works in the HTML harness and in a POC outside of this repo
      // and is documented online as the correct way to programatically determine if an element's content
      // is overflowing. however, a style somewhere in opendata-ui causes the scrollHeight value to be
      // a few px greater than we'd expect, which causes isOverflowing to be miscalculated below. this
      // sounds like the same issue reported in https://github.com/rsms/inter/issues/602 but after much
      // effort, i've been unable to track down the offending style, so rolling with the following hack for now
      // this.isOverflowing = Math.floor(scrollHeight / clientHeight) > 1 || scrollWidth > clientWidth;
    }
  }
  /**
   * Getter to compute the host element styles
   */
  get styles() {
    const { expanded, lines } = this;
    const numLines = expanded ? 0 : lines;
    return {
      '--lines': numLines.toString(),
    };
  }
  /**
   * Provided tooltip text or the full text content
   * (either slotted or passed in as innerHTML to the
   * component). On overflow, we render this content
   * in a tooltip if enabled.
   */
  get _tooltipText() {
    return this.tooltipText || this.element.innerText;
  }
  /**
   * Renders a tooltip with the full text content
   */
  renderTooltip() {
    const { tooltipEnabled, _tooltipText, isOverflowing } = this;
    if (tooltipEnabled && isOverflowing) {
      return (h("calcite-tooltip", { label: _tooltipText, placement: this.tooltipPlacement, referenceElement: this.container }, h("span", null, _tooltipText)));
    }
  }
  /**
   * Renders the Read More or Read Less link
   */
  renderLink() {
    const { intl, expanded, expandText, expandEnabled, collapseEnabled, expandIcon, isOverflowing, collapseText, collapseIcon } = this;
    const isRtl = intl.direction === 'rtl';
    let link;
    if (expandEnabled && isOverflowing && !expanded) {
      const icon = expandIcon || 'chevron-down';
      link = {
        iconEnd: icon,
        iconStart: '',
        fn: this.handleExpand,
        label: expandText || intl.t('readMore')
      };
      if (isRtl) {
        Object.assign(link, {
          iconEnd: '',
          iconStart: icon
        });
      }
    }
    if (collapseEnabled && expanded) {
      const icon = collapseIcon || 'chevron-up';
      link = {
        iconEnd: icon,
        iconStart: '',
        fn: this.handleCollapse,
        label: collapseText || intl.t('readLess')
      };
      if (isRtl) {
        Object.assign(link, {
          iconEnd: '',
          iconStart: icon
        });
      }
    }
    if (link) {
      return (h("calcite-link", { "icon-end": link.iconEnd, "icon-start": link.iconStart, onClick: link.fn }, link.label));
    }
  }
  /**
   * Primary render entrypoint
   */
  render() {
    return (h(Host, { style: this.styles }, h("div", { ref: this.handleRef }, h("slot", null)), this.renderLink(), this.renderTooltip()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisMultilineEllipsis.style = arcgisMultilineEllipsisCss;

export { ArcgisMultilineEllipsis as arcgis_multiline_ellipsis };
