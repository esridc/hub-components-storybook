import { h, Host } from '@stencil/core';
import { getTypeFromEntity, validEditorTypes, checkPermission } from '@esri/hub-common';
import intlManager from '../../../utils/intl-manager';
import { CONFIGURATION_VARIANTS } from '../../arcgis-configuration-editor/resources';
import { getGlobalContext } from '../../../utils';
export class ArcgisHubEntityDiscussionSettingsPane {
  constructor() {
    this.entity = undefined;
    this.isMobile = false;
    this.footerSlotEl = undefined;
  }
  /**
   * Component will load lifecycle method. Loads translations and dependencies
   */
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  get _context() { return getGlobalContext(); }
  /**
   * EditorType string contructed from entity type
   */
  get editorType() {
    return `hub:${this.type}:discussions`;
  }
  /**
   * Entity type
   */
  get type() {
    return getTypeFromEntity(this.entity);
  }
  get isDisabled() {
    return !checkPermission(`hub:${this.type}:edit`, this._context, this.entity).access;
  }
  get messageOverrides() {
    return Object.assign({}, (this.isDisabled && { primaryBtnTooltip: this.intl.t('disabledTooltip', { type: this.type }) }));
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
      isDirty: !event.detail.isSuccess
    });
  }
  /**
   * Primary render method
   */
  render() {
    return (h(Host, { "data-element": "entity-discussion-settings-pane" }, h("arcgis-hub-workspace-pane", { isMobile: this.isMobile, stickyFooter: true }, h("h1", { slot: "title" }, this.intl.t('discussions')), this.footerSlotEl && validEditorTypes.includes(this.editorType) && h("arcgis-hub-entity-editor", { editorType: this.editorType, entity: this.entity, footerSlotRef: this.footerSlotEl, isDisabled: this.isDisabled, messageOverrides: this.messageOverrides, variant: CONFIGURATION_VARIANTS.workspace }), h("div", { ref: (el) => { this.footerSlotEl = el; }, slot: "footer" }))));
  }
  static get is() { return "arcgis-hub-entity-discussion-settings-pane"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-discussion-settings-pane.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-discussion-settings-pane.css"]
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
          "text": "Entity of the workspace"
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
          "text": "An event that is emitted when the workspace is saved"
        },
        "complexType": {
          "original": "IWorkspaceEntityChange",
          "resolved": "IWorkspaceEntityChange",
          "references": {
            "IWorkspaceEntityChange": {
              "location": "import",
              "path": "../../../utils"
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
