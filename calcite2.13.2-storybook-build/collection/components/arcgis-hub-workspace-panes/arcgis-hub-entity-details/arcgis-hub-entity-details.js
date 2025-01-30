import { Host, h } from '@stencil/core';
import intlManager from '../../../utils/intl-manager';
import { getTypeFromEntity, checkPermission } from '@esri/hub-common';
import { CONFIGURATION_VARIANTS } from '../../arcgis-configuration-editor/resources';
import { getGlobalContext } from '../../../utils';
import { dictionary } from '@esri/telemetry-dictionary-hub';
export class ArcgisHubEntityDetails {
  constructor() {
    this.entity = undefined;
    this.pane = undefined;
    this.isMobile = false;
    this.values = undefined;
    this.footerSlotEl = undefined;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.setCssValues();
  }
  get _context() { return getGlobalContext(); }
  get entityType() {
    return getTypeFromEntity(this.entity);
  }
  get isDisabled() {
    return !checkPermission(`hub:${this.entityType}:edit`, this._context, this.entity).access;
  }
  get messageOverrides() {
    return Object.assign({}, (this.isDisabled && { primaryBtnTooltip: this.intl.t('disabledTooltip', { type: this.entityType }) }));
  }
  /**
   * Whether or not we should be rendering the details side panel
   */
  get shouldRenderSidePanel() {
    return ["project", "initiative"].includes(this.entityType);
  }
  handleEditorChanged(event) {
    // intercept and re-cast the event for parity with other panes
    event.preventDefault();
    this.arcgisHubWorkspaceEntityChange.emit({
      entity: event.detail.values,
      isDirty: true,
    });
  }
  handleEditorSaved(event) {
    // intercept and re-cast the event for parity with other panes
    event.preventDefault();
    this.arcgisHubWorkspaceEntityChange.emit({
      entity: event.detail.entity,
      isDirty: !event.detail.isSuccess,
    });
  }
  /** renders the pane's side panel */
  renderSidePanel() {
    const sidePanelInfo = {
      initiative: {
        href: "https://www.esri.com/arcgis-blog/products/arcgis-hub/announcements/introducing-redefined-initiatives-in-arcgis-hub/",
        telemetry: dictionary.category.navigation.action.external.label.webHelp.details.learnMoreAboutHubInitiatives,
        text: this.intl.t('sidePanel.initiative.learnAbout'),
      },
      project: {
        href: "https://doc.arcgis.com/en/hub/initiatives/use-projects.htm",
        telemetry: dictionary.category.navigation.action.external.label.webHelp.details.learnMoreAboutHubProjects,
        text: this.intl.t('sidePanel.project.learnAbout'),
      },
    };
    const { href, telemetry, text } = sidePanelInfo[this.entityType];
    return (h("div", { class: "entity-details__side-panel", slot: "side-panel" }, h("calcite-notice", { icon: "lightbulb", kind: "brand", open: true, width: "full" }, h("arcgis-hub-workspace-link", { href: href, iconEnd: "launch", slot: "link", target: "_blank", telemetry: telemetry }, text))));
  }
  /**
   * Dynamically sets the css values for the component
   */
  setCssValues() {
    // set max width of the pane based on whether or not we render the side panel
    this.element.style.setProperty('--arcgis-hub-workspace-pane-max-width-value', this.shouldRenderSidePanel ? '70rem' : '55rem');
  }
  render() {
    return (h(Host, { "data-element": "entity-details" }, h("arcgis-hub-workspace-pane", { isMobile: this.isMobile, stickyFooter: true }, h("h1", { slot: "title" }, this.intl.t('details')), this.footerSlotEl && h("arcgis-hub-entity-editor", { editorType: `hub:${this.entityType}:edit`, entity: this.entity, footerSlotRef: this.footerSlotEl, isDisabled: this.isDisabled, messageOverrides: this.messageOverrides, variant: CONFIGURATION_VARIANTS.workspace }), this.shouldRenderSidePanel && this.renderSidePanel(), h("div", { ref: (el) => { this.footerSlotEl = el; }, slot: "footer" }))));
  }
  static get is() { return "arcgis-hub-entity-details"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-details.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-details.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "entity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "HubEntity",
          "resolved": "IHubDiscussion | IHubEvent | IHubGroup | IHubInitiative | IHubPage | IHubProject | IHubSite | IHubSurvey | IHubTemplate | IHubUser",
          "references": {
            "HubEntity": {
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
        }
      },
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
          "text": ""
        },
        "attribute": "pane",
        "reflect": false
      },
      "isMobile": {
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
        "attribute": "is-mobile",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "values": {},
      "footerSlotEl": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubWorkspaceEntityChange",
        "name": "arcgisHubWorkspaceEntityChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IWorkspaceEntityChange",
          "resolved": "IWorkspaceEntityChange",
          "references": {
            "IWorkspaceEntityChange": {
              "location": "import",
              "path": "../../../utils/workspace"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get listeners() {
    return [{
        "name": "arcgisHubEntityEditorChange",
        "method": "handleEditorChanged",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubEntityEditorSaved",
        "method": "handleEditorSaved",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
