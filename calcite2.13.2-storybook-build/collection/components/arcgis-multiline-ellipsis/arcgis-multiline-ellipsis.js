import { Host, h } from '@stencil/core';
import { bind } from '../../utils/context';
import intlManager from '../../utils/intl-manager';
import { ResizeObserverManager } from '../../utils/resize-observer';
/**
 * @slot default - The content to truncated.
 */
export class ArcgisMultilineEllipsis {
  /**
   * Constructor function
   */
  constructor() {
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
  static get is() { return "arcgis-multiline-ellipsis"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-multiline-ellipsis.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-multiline-ellipsis.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "lines": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": true,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "A positive integer representing the maximum number of lines to render\nbefore truncating the text and adding the ellipsis"
        },
        "attribute": "lines",
        "reflect": false
      },
      "expandEnabled": {
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
          "text": "A boolean indicating whether the expand link should display when\nthe content is truncated"
        },
        "attribute": "expand-enabled",
        "reflect": false
      },
      "expandIcon": {
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
          "text": "An optional override for the expand icon"
        },
        "attribute": "expand-icon",
        "reflect": false
      },
      "expandText": {
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
          "text": "An optional override for the expand link text"
        },
        "attribute": "expand-text",
        "reflect": false
      },
      "collapseEnabled": {
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
          "text": "A boolean indicating whether the collapse link should display when\nthe content is expanded"
        },
        "attribute": "collapse-enabled",
        "reflect": false
      },
      "collapseIcon": {
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
          "text": "An optional override for the collapse icon"
        },
        "attribute": "collapse-icon",
        "reflect": false
      },
      "collapseText": {
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
          "text": "An optional override for the collapse link text"
        },
        "attribute": "collapse-text",
        "reflect": false
      },
      "tooltipEnabled": {
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
          "text": "A boolean indicating whether a tooltip should display when\nthe content is truncated"
        },
        "attribute": "tooltip-enabled",
        "reflect": false
      },
      "tooltipText": {
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
          "text": "An optional override for the tooltip text. By default\nwe render the full text content that was truncated"
        },
        "attribute": "tooltip-text",
        "reflect": false
      },
      "tooltipPlacement": {
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
          "text": "An optional override for tooltip placement"
        },
        "attribute": "tooltip-placement",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "isOverflowing": {},
      "expanded": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisMultilineEllipsisExpand",
        "name": "arcgisMultilineEllipsisExpand",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the expand link is clicked"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "arcgisMultilineEllipsisCollapse",
        "name": "arcgisMultilineEllipsisCollapse",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the collapse link is clicked"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
}
