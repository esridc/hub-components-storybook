import { Host, h } from '@stencil/core';
import { getRelativeWorkspacePaneUrl } from '../../../utils/workspace';
import { bind } from '../../../utils/context';
import { slotChangeGetAssignedElements } from '../../../utils/dom';
import { logWorkspaceLinkTelemetry } from './utils';
/**
 * The arcgis-hub-workspace-link is a utility component meant to
 * simplify linking in workspaces. It accepts content into its default
 * slot, wraps it in a calcite-link (unless it is a button), and
 * dynamically computes the appropriate HREF based on the provided
 * props.
 *
 * NOTE: In an effort to future-proof linking in workspaces (as we
 * potentially transition to a different FE framework), we should
 * rely as much as possible on relative linking
 *
 * NOTE: currently this component implements some slightly complex
 * logic to support button links; however, designs are under review
 * to determine whether a button should ever be used to simply link
 * between routes or if they should only be used when performing an
 * action; therefore, there's a chance this logic will be removed
 * moving forward
 */
export class ArcgisHubWorkspaceLink {
  constructor() {
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
  static get is() { return "arcgis-hub-workspace-link"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-workspace-link.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-workspace-link.css"]
    };
  }
  static get properties() {
    return {
      "pane": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "WorkspacePane",
          "resolved": "\"catalog\" | \"catalog-content\" | \"catalog-events\" | \"collaborators\" | \"content\" | \"dashboard\" | \"details\" | \"discussion\" | \"events\" | \"followers\" | \"groups\" | \"initiatives\" | \"members\" | \"metrics\" | \"metrics-coming-soon\" | \"overview\" | \"participation\" | \"projects\" | \"registrants\" | \"settings\"",
          "references": {
            "WorkspacePane": {
              "location": "import",
              "path": "../../../utils/workspace"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If a pane is provided, we assume that this link is for\ninter-pane navigation, and the provided pane is the\npane that the link should navigate to."
        },
        "attribute": "pane",
        "reflect": true
      },
      "href": {
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
          "text": "specifies the URL of the linked resource, which can be\nset as an absolute or relative path."
        },
        "attribute": "href",
        "reflect": true
      },
      "relativeToOrigin": {
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
          "text": "If a relative href is provided, this prop can be set to\nspecify whether it should be relative to the current url\nor to the origin url"
        },
        "attribute": "relative-to-origin",
        "reflect": false
      },
      "telemetry": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Record<string, any>",
          "resolved": "{ [x: string]: any; }",
          "references": {
            "Record": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Telemetry to log when the link is clicked. We log default\ntelemetry based on the other props provided, but exposing\nthis gives the consumer some flexibility around the telemetry\nthat gets logged. NOTE: telemetry events passed into this\nprop should come from our telemetry dictionary"
        },
        "defaultValue": "{}"
      },
      "iconStart": {
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
          "text": "specifies an icon to display at the start of the component."
        },
        "attribute": "icon-start",
        "reflect": false
      },
      "iconEnd": {
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
          "text": "specifies an icon to display at the end of the component."
        },
        "attribute": "icon-end",
        "reflect": false
      },
      "target": {
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
          "text": "specifies the frame or window to open the linked document."
        },
        "attribute": "target",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "isText": {},
      "isButton": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubWorkspaceLinkClicked",
        "name": "arcgisHubWorkspaceLinkClicked",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IWorkspaceLinkClicked",
          "resolved": "IWorkspaceLinkClicked",
          "references": {
            "IWorkspaceLinkClicked": {
              "location": "import",
              "path": "../../../utils/workspace"
            }
          }
        }
      }, {
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
  static get elementRef() { return "element"; }
}
