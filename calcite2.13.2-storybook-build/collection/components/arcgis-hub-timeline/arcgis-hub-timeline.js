import { h, Host } from '@stencil/core';
import { getIconForStatus } from '../../utils/get-icon-for-status';
import { bind } from '../../utils/context';
import intlManager from '../../utils/intl-manager';
import { dictionary } from '@esri/telemetry-dictionary-hub';
/** @internal */
export class ArcgisHubTimeline {
  constructor() {
    this.timelineTitle = undefined;
    this.description = undefined;
    this.stages = [];
    this.canCollapse = undefined;
    this.isCollapsed = undefined;
    bind(this, 'handleCollapseExpandBtnClick');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Whether we should collapse the timeline, meaning all conditions have been met
   */
  get shouldCollapse() {
    return this.canCollapse && this.stages.length >= 6;
  }
  renderStageLink(link) {
    let result;
    const { href, title } = link || {};
    if (href || title) {
      result = h("calcite-link", { href: href || '#' }, title || href);
    }
    return result;
  }
  handleCollapseExpandBtnClick() {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      this.hubTelemetry.emit(dictionary.category.interaction.action.close.label.timeline);
    }
    else {
      this.hubTelemetry.emit(dictionary.category.interaction.action.open.label.timeline);
    }
  }
  renderCollapseExpandIconAndBtn() {
    // Until the collapse/expand button is clicked for the first time, this.isCollapsed is undefined
    // we want to have its value align with this.shouldCollapse in this case
    if (this.isCollapsed === undefined) {
      this.isCollapsed = this.shouldCollapse;
    }
    if (this.shouldCollapse) {
      return h("li", null, h("calcite-icon", { icon: this.isCollapsed ? 'chevrons-down' : 'chevrons-up' }), h("calcite-link", { class: 'collapse-expand-btn', onClick: this.handleCollapseExpandBtnClick }, this.intl.t(this.isCollapsed ? 'expandTimeline' : 'collapseTimeline')));
    }
  }
  renderStages() {
    return (h("ol", null, this.renderFirstThreeStages(), this.renderCollapseExpandIconAndBtn(), this.renderRemainingStages()));
  }
  renderStage(stage) {
    return h("li", { key: stage.title }, h("calcite-icon", { icon: getIconForStatus(stage.status) }), h("div", { class: "stage" }, h("h3", null, stage.title), h("span", null, stage.timeframe), h("p", null, stage.stageDescription), this.renderStageLink(stage.link)));
  }
  // We render the first 3 stages regardless of the timeline is set to collapse or not
  renderFirstThreeStages() {
    return this.stages.slice(0, 3).map(stage => this.renderStage(stage));
  }
  renderLastStage() {
    return this.renderStage(this.stages[this.stages.length - 1]);
  }
  renderExpandedStages() {
    return this.stages.slice(3).map(stage => this.renderStage(stage));
  }
  /**
   * This is where we choose to render the collapsed timeline or expanded timeline
   * it is a bit tricky and can be confusing...
   * not only we have to consider whether expanded timeline should be shown
   * but we also have to consider if it should be shown, whether it's already been expanded
   * (after user clicks the 'expand timeline' button, marked by the isCollapsed flag)
   * so at the initial stage, when a timeline is first created, isCollapsed is set to align with
   * shouldCollapse, after that, it will be altered by the 'collapse/expand timeline' button
   */
  renderRemainingStages() {
    if (this.isCollapsed === undefined) {
      this.isCollapsed = this.shouldCollapse;
    }
    return this.shouldCollapse && this.isCollapsed
      ? this.renderLastStage()
      : this.renderExpandedStages();
  }
  render() {
    return (h(Host, null, (this.timelineTitle || this.description) && (h("div", { class: "hub-timeline__header" }, this.timelineTitle && h("h1", null, this.timelineTitle), this.description && h("label", null, this.description))), !!this.stages.length && this.renderStages()));
  }
  static get is() { return "arcgis-hub-timeline"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-timeline.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-timeline.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "timelineTitle": {
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
          "text": "Timeline title"
        },
        "attribute": "timeline-title",
        "reflect": false
      },
      "description": {
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
          "text": "Timeline description"
        },
        "attribute": "description",
        "reflect": false
      },
      "stages": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubStage[]",
          "resolved": "IHubStage[]",
          "references": {
            "IHubStage": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Timeline stages"
        },
        "defaultValue": "[]"
      },
      "canCollapse": {
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
          "text": "User has the the option to collapse the timeline, but ONLY IF it has at least 6 stages"
        },
        "attribute": "can-collapse",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "isCollapsed": {}
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
  static get elementRef() { return "element"; }
}
