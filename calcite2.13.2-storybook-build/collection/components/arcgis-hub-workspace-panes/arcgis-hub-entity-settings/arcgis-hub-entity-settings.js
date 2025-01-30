import { Host, h } from '@stencil/core';
import { getTypeFromEntity, validEditorTypes, isHostedFeatureServiceMainEntity, checkPermission } from '@esri/hub-common';
import intlManager from '../../../utils/intl-manager';
import { CONFIGURATION_VARIANTS } from '../../arcgis-configuration-editor/resources';
import { getGlobalContext } from '../../../utils/state';
export class ArcgisHubEntitySettings {
  constructor() {
    this.entity = undefined;
    this.isMobile = false;
    this.isDeleteModalOpen = undefined;
    this.footerSlotEl = undefined;
    this.workspacePane = undefined;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  get _context() { return getGlobalContext(); }
  get editorType() {
    return `hub:${this.type}:settings`;
  }
  get type() {
    return getTypeFromEntity(this.entity);
  }
  get showSettingsEditor() {
    return this.footerSlotEl && this.isValidEditorType;
  }
  get showDeleteConfirmation() {
    return this.type !== "user";
  }
  get isValidEditorType() {
    return validEditorTypes.includes(this.editorType);
  }
  get canAccessPane() {
    // check the pane permissions
    const permission = `hub:${this.type}:workspace:settings`;
    return checkPermission(permission, this._context, this.entity).access;
  }
  get isFormDisabled() {
    return !checkPermission(`hub:${this.type}:edit`, this._context, this.entity).access;
  }
  get formMessageOverrides() {
    return Object.assign({}, (this.isFormDisabled && { primaryBtnTooltip: this.intl.t('formDisabledTooltip', { type: this.type }) }));
  }
  handleEditorChanged(event) {
    // intercept and re-cast the event for parity with other panes
    event.preventDefault();
    this.arcgisHubWorkspaceEntityChange.emit({
      entity: event.detail.values,
      isDirty: true,
    });
    // TODO: Remove once other panes are updated to use the new event
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
      isDirty: !event.detail.isSuccess
    });
  }
  handleEntityDelete(event) {
    event.preventDefault();
    this.arcgisHubWorkspacePaneEntityDelete.emit(this.entity);
  }
  renderSidePanel() {
    let panelContent;
    switch (this.type) {
      case 'content':
        if (isHostedFeatureServiceMainEntity(this.entity)) {
          const i18nScope = 'sidePanel.content.extractNotice';
          panelContent = h("calcite-notice", { icon: 'lightbulb', kind: 'brand', open: true, width: "full" }, h("div", { slot: "title" }, this.intl.t(`${i18nScope}.title`)), h("div", { slot: "message" }, this.intl.t(`${i18nScope}.message`, {
            docLink: (...str) => (h("calcite-link", { href: "https://doc.arcgis.com/en/arcgis-online/manage-data/use-hosted-layers.htm#GUID-47A1D795-B330-45D7-89F7-9203A99E6924", iconEnd: "launch", target: "_blank" }, str))
          })));
        }
        break;
    }
    return panelContent && h("div", { slot: "side-panel" }, panelContent);
  }
  render() {
    return this.canAccessPane ? this.renderSettings() : this.renderAccessDenied();
  }
  renderDeleteConfirmation() {
    return (h("arcgis-hub-delete-confirmation", { entity: this.entity, titleText: this.intl.t(`delete.${this.type}`) }, h("p", { slot: "controls-before" }, this.intl.t(`delete.desc.${this.type}`))));
  }
  /**
   * User does not have access to the pane
   * @returns
   */
  renderAccessDenied() {
    return (h(Host, { "data-element": "entity-settings" }, h("arcgis-hub-workspace-pane", { isMobile: this.isMobile }, h("div", null, h("arcgis-hub-help-state", { state: "access-denied" })))));
  }
  renderSettings() {
    return (h(Host, { "data-element": "entity-settings" }, h("arcgis-hub-workspace-pane", { isMobile: this.isMobile, ref: (el) => { this.workspacePane = el; }, stickyFooter: true }, h("h1", { slot: "title" }, this.intl.t('settings')), h("div", null, this.showSettingsEditor && h("arcgis-hub-entity-editor", { editorType: this.editorType, entity: this.entity, footerSlotRef: this.footerSlotEl, isDisabled: this.isFormDisabled, messageOverrides: this.formMessageOverrides, variant: CONFIGURATION_VARIANTS.workspace }), this.showDeleteConfirmation && this.renderDeleteConfirmation()), (this.isValidEditorType) && h("div", { ref: (el) => { this.footerSlotEl = el; }, slot: "footer" }), this.renderSidePanel())));
  }
  static get is() { return "arcgis-hub-entity-settings"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-settings.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-settings.css"]
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
      "isDeleteModalOpen": {},
      "footerSlotEl": {},
      "workspacePane": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubWorkspacePaneEntityDelete",
        "name": "arcgisHubWorkspacePaneEntityDelete",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "HubEntity",
          "resolved": "IHubDiscussion | IHubEvent | IHubGroup | IHubInitiative | IHubPage | IHubProject | IHubSite | IHubSurvey | IHubTemplate | IHubUser",
          "references": {
            "HubEntity": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }, {
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
          "original": "Record<string, any>",
          "resolved": "{ [x: string]: any; }",
          "references": {
            "Record": {
              "location": "global"
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
      }, {
        "name": "arcgisHubDeleteConfirmationEntityDelete",
        "method": "handleEntityDelete",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
