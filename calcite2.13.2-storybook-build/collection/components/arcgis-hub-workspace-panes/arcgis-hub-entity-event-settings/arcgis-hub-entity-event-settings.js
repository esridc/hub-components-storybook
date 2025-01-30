import { Host, h } from '@stencil/core';
import { updateHubEntity } from '@esri/hub-common';
import intlManager from '../../../utils/intl-manager';
import { getGlobalContext, showNotice } from '../../../utils/state';
import { dictionary } from '@esri/telemetry-dictionary-hub';
const alertConfig = {
  noticeType: 'alert',
  autoClose: true,
  autoCloseDuration: 'fast',
  icon: true,
  kind: 'success',
};
export class ArcgisHubEntityEventSettings {
  constructor() {
    this.handleCancelButtonClicked = async () => {
      const { entity, _context } = this;
      const isCanceled = !entity.isCanceled;
      try {
        this.actionPending = true;
        this.entity = (await updateHubEntity('event', Object.assign(Object.assign({}, entity), { isCanceled }), _context));
        this.arcgisHubWorkspaceEntityChange.emit({
          entity: this.entity,
          isDirty: false,
        });
        this.hubTelemetry.emit(dictionary.category.interaction.action[isCanceled ? 'cancel' : 'enable'].label.event);
        showNotice({
          title: this.intl.t(`${isCanceled ? 'cancel' : 'enable'}.notice.success.title`),
          message: this.intl.t(`${isCanceled ? 'cancel' : 'enable'}.notice.success.message`),
          configuration: Object.assign(Object.assign({}, alertConfig), { label: this.intl.t('notice.label') })
        });
      }
      catch (e) {
        console.error(`Failed to ${isCanceled ? 'cancel' : 're-enable'} event: ${e}`);
        showNotice({
          title: this.intl.t(`${isCanceled ? 'cancel' : 'enable'}.notice.error.title`),
          message: this.intl.t(`${isCanceled ? 'cancel' : 'enable'}.notice.error.message`),
          configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
        });
      }
      finally {
        this.actionPending = false;
      }
    };
    this.entity = undefined;
    this.actionPending = false;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  get _context() {
    return getGlobalContext();
  }
  handleEntityDelete(event) {
    event.stopPropagation();
    this.arcgisHubWorkspacePaneEntityDelete.emit(this.entity);
    this.hubTelemetry.emit(dictionary.category.interaction.action.delete.label.event);
  }
  render() {
    return (h(Host, { "data-element": "entity-settings" }, h("arcgis-hub-workspace-pane", { stickyFooter: true }, h("h1", { slot: "title" }, this.intl.t('settings')), h("div", { slot: "primary-actions" }, h("section", null, h("header", null, h("h2", null, this.intl.t('cancel.header')), h("p", null, this.intl.t(`${!this.entity.isCanceled ? 'cancel' : 'enable'}.desc`))), h("calcite-button", { appearance: "outline", disabled: this.actionPending, onClick: this.handleCancelButtonClicked, round: true }, this.entity.isCanceled ? this.intl.t('enable.event') : this.intl.t('cancel.event')))), h("div", null, h("arcgis-hub-delete-confirmation", { entity: this.entity, entityScopedDeleteButtonText: this.intl.t('delete.deleteButton'), titleText: this.intl.t('delete.event') }, h("p", { slot: "controls-before" }, this.intl.t('delete.desc')))))));
  }
  static get is() { return "arcgis-hub-entity-event-settings"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-event-settings.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-event-settings.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "entity": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "IHubEvent",
          "resolved": "IHubEvent",
          "references": {
            "IHubEvent": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Workspace Entity"
        }
      }
    };
  }
  static get states() {
    return {
      "actionPending": {}
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
          "text": "Emitted when the entity is deleted"
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
          "text": "Emitted when the entity's properties change"
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
          "text": "Emits hub telemetry"
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
        "name": "arcgisHubDeleteConfirmationEntityDelete",
        "method": "handleEntityDelete",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
