import { Host, h, Fragment } from '@stencil/core';
import { PostStatus } from '@esri/hub-discussions';
import { bind } from '../../../../utils/context';
import intlManager from '../../../../utils/intl-manager';
import { dictionary } from '@esri/telemetry-dictionary-hub';
/** @internal */
export class ArcgisHubDiscussionsPostChips {
  constructor() {
    this.post = undefined;
    this.index = undefined;
    this.channel = undefined;
    this.activeTooltip = null;
    bind(this, 'handleTooltipOpen', 'renderChip', 'handleChipMouseEnter', 'handleChipMouseOut');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  handleTooltipOpen(evt) {
    const { post, channel, chipsToRender, index } = this;
    const { tooltip: { telemetry } } = chipsToRender.find(chip => chip.type === evt.target.dataset.type);
    this.hubTelemetry.emit(Object.assign(Object.assign({}, telemetry), { postId: post.id, parentId: post.parentId, channelId: channel.id, channelAccess: channel.access, position: index }));
  }
  handleChipMouseEnter(evt) {
    this.activeTooltip = evt.target.dataset.type;
  }
  handleChipMouseOut() {
    this.activeTooltip = null;
  }
  get chipsToRender() {
    const { post, intl } = this;
    const chips = [];
    if (post.status === PostStatus.HIDDEN || post.status === PostStatus.BLOCKED) {
      chips.push({
        appearance: 'outline',
        icon: 'view-hide',
        kind: 'neutral',
        tooltip: {
          telemetry: dictionary.category.interaction.action.open.label.tooltip.details.chipComponentWithStringHidden,
          text: post.status === PostStatus.BLOCKED ? intl.t('chip.hidden.label.blocked') : intl.t('chip.hidden.label.moderator'),
        },
        type: 'hidden',
        value: intl.t('chip.hidden.text'),
      });
    }
    return chips;
  }
  renderChip(chip) {
    const { activeTooltip, handleTooltipOpen } = this;
    return (h(Fragment, null, h("calcite-chip", { appearance: chip.appearance, class: chip.type === 'hidden' && 'end', "data-type": chip.type, icon: chip.icon, id: chip.type, key: chip.type, kind: chip.kind, onMouseEnter: this.handleChipMouseEnter, onMouseOut: this.handleChipMouseOut, scale: "s", value: chip.value }, chip.value), chip.tooltip && (h("calcite-tooltip", { "data-type": chip.type, label: chip.tooltip.text, onCalciteTooltipOpen: handleTooltipOpen, open: activeTooltip === chip.type, overlayPositioning: 'fixed', placement: 'bottom', referenceElement: chip.type }, h("div", { class: "tooltip-body" }, chip.tooltip.text)))));
  }
  render() {
    const { chipsToRender, index, intl } = this;
    return (h(Host, { "data-count": chipsToRender.length, "data-element": "post-chips", "data-index": index }, h("calcite-chip-group", { label: intl.t('label'), scale: "s" }, chipsToRender.map(this.renderChip))));
  }
  static get is() { return "arcgis-hub-discussions-post-chips"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-discussions-post-chips.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-discussions-post-chips.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "post": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IPost",
          "resolved": "IPost",
          "references": {
            "IPost": {
              "location": "import",
              "path": "@esri/hub-discussions"
            }
          }
        },
        "required": true,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The IPost object"
        }
      },
      "index": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The numeric position of the post in a list"
        },
        "attribute": "index",
        "reflect": false
      },
      "channel": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IChannel",
          "resolved": "IChannel",
          "references": {
            "IChannel": {
              "location": "import",
              "path": "@esri/hub-discussions"
            }
          }
        },
        "required": true,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The IChannel object"
        }
      }
    };
  }
  static get states() {
    return {
      "activeTooltip": {}
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
          "text": "Emits telemetry information"
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
