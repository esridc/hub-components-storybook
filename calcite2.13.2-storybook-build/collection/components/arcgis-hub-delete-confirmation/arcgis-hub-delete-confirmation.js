import { checkPermission, getTypeFromEntity, getWithDefault } from '@esri/hub-common';
import { Host, h } from '@stencil/core';
import { deleteHubEntity } from '../../utils/workspace';
import { bind } from '../../utils/context';
import { getGlobalContext } from '../../utils/state';
import intlManager from '../../utils/intl-manager';
import { constants as telemetryConstants, dictionary } from '@esri/telemetry-dictionary-hub';
import { protectGroup, protectItem, unprotectGroup, unprotectItem } from '@esri/arcgis-rest-portal';
import { request } from '@esri/arcgis-rest-request';
/**
 * Delete Confirmation Component
 * Will display a modal to confirm deletion of an entity
 * Will show a self-contained alert when actions are successful or not
 */
export class ArcgisHubDeleteConfirmation {
  constructor() {
    this.canRecycle = false;
    this.handleProtectionChange = async (event) => {
      const switchEl = event.target;
      this.action = this.isProtected ? 'unprotect' : 'protect';
      let result = { success: true };
      try {
        if (this.action === 'protect') {
          result = await this.protectEntity(this.entity);
          this.entity.protected = result.success;
        }
        else {
          result = await this.unprotectEntity(this.entity);
          this.entity.protected = !result.success;
        }
      }
      catch (_ex) {
        result = { success: false };
      }
      // If the result is not successful, we need to reset the state of the switch
      if (!result.success) {
        switchEl.checked = !switchEl.checked;
      }
      this.state = result.success ? 'success' : 'error';
      this.showAlert = true;
      // send telemetry
      const response = result.success ? telemetryConstants.response.SUCCESS : telemetryConstants.response.FAILURE;
      this.hubTelemetry.emit(this.getProtectionTelemetry(this.action, this.entity, response));
    };
    this.entity = undefined;
    this.titleText = undefined;
    this.entityScopedDeleteButtonText = undefined;
    this.showModal = undefined;
    this.showAlert = undefined;
    this.action = undefined;
    this.state = undefined;
    bind(this, 'deleteEntity', 'handleDeleteBtnClick', 'handleDeleteModalClose', 'handleProtectionChange', 'handleAlertClose', 'permanentDeleteEntity', 'handleCalciteModalClose');
  }
  get _context() { return getGlobalContext(); }
  get entityType() {
    return getTypeFromEntity(this.entity);
  }
  get type() {
    return this.entity.type;
  }
  get telemetryCategory() {
    let cat = "content";
    if (this.entity.type === "Group") {
      cat = "group";
    }
    return cat;
  }
  get getDeleteButtonText() {
    var _a;
    return (_a = this.entityScopedDeleteButtonText) !== null && _a !== void 0 ? _a : this.intl.t('deleteButton');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  get isProtected() {
    var _a;
    return ((_a = this.entity) === null || _a === void 0 ? void 0 : _a.protected) || false;
  }
  /**
   * Can the current user delete the entity?
   */
  get canDelete() {
    return !this.isProtected && checkPermission(`hub:${this.entityType}:delete`, this._context, this.entity).access;
  }
  /**
   * Does this entity support protection?
   */
  get canBeProtected() {
    var _a;
    return !["Event"].includes((_a = this.entity) === null || _a === void 0 ? void 0 : _a.type);
  }
  /**
   * Can the user change the protection of the entity?
   * Requires that the entity can be protected and the user can delete the entity
   */
  get canChangeProtection() {
    return this.canBeProtected && checkPermission(`hub:${this.entityType}:delete`, this._context, this.entity).access;
  }
  async handleDeleteBtnClick() {
    // call the `/canRecycle` endpoint for the entity (if it's item backed)
    // to determine if the entity can be recycled
    this.canRecycle = await canRecycleEntity(this.entity, this._context.userRequestOptions);
    this.showModal = true;
    this.hubTelemetry.emit(dictionary.category.interaction.action.open.label.modal.details.deleteContent);
  }
  handleCalciteModalClose() {
    this.handleDeleteModalClose();
    this.hubTelemetry.emit(dictionary.category.interaction.action.close.label.modal.details.deleteContent);
  }
  handleAlertClose() {
    // Only raise the event if the action was successful
    if ((this.action === "delete" || this.action === "permanentDelete") && this.state === "success") {
      // Emitting this will tell the upstream components to transition
      this.arcgisHubDeleteConfirmationEntityDelete.emit(this.entity);
    }
    this.showAlert = false;
  }
  handleDeleteModalClose() {
    this.showModal = false;
  }
  async unprotectEntity(entity) {
    // Assume a group because it has simpler options...
    const opts = { id: entity.id, authentication: this._context.userRequestOptions.authentication };
    let fn = unprotectGroup;
    // If it's not a group, we need to pass the owner, and use the unprotectItem function
    if (entity.type !== "Group") {
      opts.owner = entity.owner;
      fn = unprotectItem;
    }
    try {
      // the await below is important, as we need to wait for the result of the function
      // otherwise the catch block will not catch the error
      return await fn(opts);
    }
    catch (_ex) {
      return { success: false };
    }
  }
  async protectEntity(entity) {
    // Assume a group because it has simpler options...
    const opts = { id: entity.id, authentication: this._context.userRequestOptions.authentication };
    let fn = protectGroup;
    // If it's not a group, we need to pass the owner, and use the protectItem function
    if (entity.type !== "Group") {
      opts.owner = entity.owner;
      fn = protectItem;
    }
    try {
      // the await below is important, as we need to wait for the result of the function
      // otherwise the catch block will not catch the error
      return await fn(opts);
    }
    catch (_ex) {
      return { success: false };
    }
  }
  // TODO: decide if this should be in this component or not
  renderAlert() {
    if (!this.showAlert) {
      return null;
    }
    const { action, state } = this;
    const titleKey = `${action}.${state}Title`;
    const messageKey = `${action}.${state}`;
    const labelKey = `${action}.${state}Label`;
    const kind = state === "success" ? "success" : "danger";
    const icon = state === "success" ? "check-circle" : "exclamation-mark-circle";
    return (h("calcite-alert", { "auto-close": true, "auto-close-duration": "fast", icon: icon, kind: kind, label: this.intl.t(labelKey, { type: this.type }), onCalciteAlertClose: this.handleAlertClose, open: this.showAlert, placement: "top-end" }, h("div", { slot: "title" }, this.intl.t(titleKey)), (action !== "delete" && action !== "permanentDelete") ?
      h("div", { slot: "message" }, this.intl.t(messageKey))
      : null));
  }
  renderDeleteModal() {
    const messageKey = this.canRecycle ? 'deleteModal.recycleContent' : 'deleteModal.deleteContent';
    return (h("calcite-modal", { kind: "danger", onCalciteModalClose: this.handleCalciteModalClose, open: this.showModal }, h("div", { class: 'modal-header', slot: "header" }, this.intl.t('deleteModal.header')), h("div", { slot: "content" }, h("div", null, this.intl.t(messageKey))), this.canRecycle ?
      h("calcite-button", { appearance: "outline-fill", kind: "danger", onClick: this.permanentDeleteEntity, round: true, slot: "back" }, this.intl.t('deleteModal.permanentlyDelete'))
      : null, h("calcite-button", { appearance: "outline", onClick: this.handleDeleteModalClose, round: true, slot: "secondary", width: "full" }, this.intl.t('deleteModal.cancel')), h("calcite-button", { kind: "danger", onClick: this.deleteEntity, round: true, slot: "primary", width: "full" }, this.intl.t('deleteModal.delete'))));
  }
  /**
   * Wrapper function b/c jsx does not like arrow functions
   * @returns void
   */
  async permanentDeleteEntity() {
    return this._deleteEntity(true);
  }
  async deleteEntity() {
    return this._deleteEntity(false);
  }
  /**
   * Delete the entity. If it can be recycled, it will be moved to the recycle bin,
   * otherwise it will be permanently deleted.
   */
  async _deleteEntity(permanent = false) {
    this.action = permanent ? "permanentDelete" : "delete";
    let response = telemetryConstants.response.SUCCESS;
    try {
      await deleteHubEntity(this.entityType, this.entity, this._context, permanent);
    }
    catch (e) {
      response = telemetryConstants.response.FAILURE;
    }
    finally {
      this.showModal = false;
      this.state = response === telemetryConstants.response.SUCCESS ? "success" : "error";
      this.showAlert = true;
      this.hubTelemetry.emit(this.getDeleteTelemetry(this.action, this.entity, response));
    }
  }
  getDeleteTelemetry(action, entity, response) {
    const telemetry = entity.type === "Group" ? Object.assign(Object.assign({}, dictionary.category.groups.action.delete), { groupId: entity.id, groupAccess: entity.access, groupOrgId: getWithDefault(entity, 'orgId', "n/a"), response }) : Object.assign(Object.assign({}, dictionary.category.content.action.delete), { label: action === "delete" ? "Delete" : "Permanently Delete", id: entity.id, access: entity.access, type: entity.type, contentOrgId: getWithDefault(entity, 'orgId', "n/a"), response });
    return telemetry;
  }
  getProtectionTelemetry(action, entity, response) {
    return entity.type === "Group" ? Object.assign(Object.assign({}, dictionary
      .category.groups
      .action.update
      .label[action]), { groupId: entity.id, groupAccess: entity.access, groupOrgId: getWithDefault(entity, 'orgId', "n/a"), response }) : Object.assign(Object.assign({}, dictionary
      .category.content
      .action.update
      .label[action]), { id: entity.id, access: entity.access, type: entity.type, contentOrgId: getWithDefault(entity, 'orgId', "n/a"), response });
  }
  get deleteDisabledTooltip() {
    // default to no access messasge
    let key = this.entityType === "group" ? "deleteDisabledNoAccessTooltipGroup" : "deleteDisabledNoAccessTooltip";
    // if user can change protection and can delete it, show the protected message
    if (this.canChangeProtection && this.canDelete) {
      key = 'deleteDisabledProtectedTooltip';
    }
    return key;
  }
  render() {
    var _a;
    const deleteDisabledTooltip = this.deleteDisabledTooltip;
    return (h(Host, { "data-element": "delete-confirmation" }, this.renderDeleteModal(), h("header", null, h("h2", null, (_a = this.titleText) !== null && _a !== void 0 ? _a : this.intl.t('section'))), this.canChangeProtection ?
      h("div", { class: "container" }, h("p", null, this.intl.t('protection', { type: this.type })), h("calcite-switch", { checked: this.isProtected, id: "protect-checkbox", onCalciteSwitchChange: this.handleProtectionChange }))
      : null, h("slot", { name: "controls-before" }), h("calcite-button", { appearance: "outline-fill", class: "entity-settings__deleteBtn", disabled: !this.canDelete, id: "delete-button", kind: "danger", onClick: this.handleDeleteBtnClick, round: true }, this.getDeleteButtonText), !this.canDelete
      ? h("calcite-tooltip", { label: this.intl.t('protectionTooltip'), "reference-element": "delete-button" }, h("span", null, this.intl.t(deleteDisabledTooltip)))
      : null, this.renderAlert()));
  }
  static get is() { return "arcgis-hub-delete-confirmation"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-delete-confirmation.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-delete-confirmation.css"]
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
      "titleText": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "title-text",
        "reflect": false
      },
      "entityScopedDeleteButtonText": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "entity-scoped-delete-button-text",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "showModal": {},
      "showAlert": {},
      "action": {},
      "state": {}
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
          "original": "Record<string, any>",
          "resolved": "{ [x: string]: any; }",
          "references": {
            "Record": {
              "location": "global"
            }
          }
        }
      }, {
        "method": "arcgisHubDeleteConfirmationEntityDelete",
        "name": "arcgisHubDeleteConfirmationEntityDelete",
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
      }];
  }
  static get elementRef() { return "element"; }
}
/**
 * Call the /canRecycle endpoint for the entity to determine if it can be recycled
 * @param entity
 * @param userRequestOptions
 * @returns
 */
async function canRecycleEntity(entity, userRequestOptions) {
  // types we know can't recycle
  if (["Event", "Hub Site Application", "Site Application", "Group"].includes(entity.type)) {
    return false;
  }
  // Construct the url...
  const url = `${userRequestOptions.portal}/content/users/${entity.owner}/items/${entity.id}/canRecycle`;
  // make the request
  const response = await request(url, userRequestOptions);
  return !!response.success;
}
