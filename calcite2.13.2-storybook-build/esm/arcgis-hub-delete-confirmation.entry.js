import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import './types-dca4cb90.js';
import { s as setProp } from './set-prop-9a4aa9a9.js';
import { f as deleteSurvey, g as deleteTemplate, h as deleteInitiativeTemplate, i as deleteContent, j as deleteProject } from './edit-237c0a70.js';
import { deleteHubEvent } from './edit-fa9666f2.js';
import { d as deleteHubGroup } from './hubSearch-41612481.js';
import { Z as deletePage, S as deleteSite, _ as deleteInitiative } from './HubInitiatives-4f4e24ce.js';
import { deleteDiscussion } from './edit-9f487804.js';
import { b as bind } from './context-7d8f7366.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { d as dist } from './index-dd3f99ac.js';
import { g as getTypeFromEntity } from './getTypeFromEntity-e149b61e.js';
import { c as checkPermission } from './checkPermission-6c5be250.js';
import { g as getWithDefault } from './get-with-default-b819d95d.js';
import { r as request } from './request-fa80ae40.js';
import { u as unprotectGroup, p as protectGroup } from './remove-2e7122d1.js';
import { u as unprotectItem, p as protectItem } from './protect-e98e6111.js';
import './deep-set-67281c6f.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './tslib.es6-9c17e83a.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './search-c7a57aa9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './append-custom-params-4bd856e5.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './helpers-8c7e5e31.js';
import './generate-random-string-1436d9e6.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
import './slugify-e3e67bac.js';
import './HubError-e26c5610.js';
import './OperationError-387ae9ab.js';
import './object-to-json-blob-583ae5c3.js';
import './fail-safe-cd1a5a2a.js';
import './delete-prop-bd13d424.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './get-form-json-1d4e3591.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './hostedServiceUtils-f22b023b.js';
import './is-service-ad021db8.js';
import './_deep-map-values-53f8dbd1.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './getDownloadFlow-6c6d04d5.js';
import './canUseHubDownloadSystem-a22afbb9.js';
import './index-edff2d62.js';
import './types-2eaa1a18.js';
import './getDownloadConfiguration-6cb6d32f.js';
import './types-303cd4d6.js';
import './shouldShowDownloadsConfiguration-385c6ff6.js';
import './getService-e61b8c6e.js';
import './remove-7361a90a.js';
import './TemplateBusinessRules-0e35d61b.js';
import './getPropertyMap-10ee9d61.js';
import './events-c59246f8.js';
import './types-db540898.js';
import './registrations-431b9788.js';
import './defaults-1f93a79e.js';
import './getDefaultEventDatesAndTimes-4847a519.js';
import './merge-objects-5b123ab3.js';
import './get-850c466d.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './_enrichments-8641475c.js';
import './get-user-f035bd36.js';
import './map-by-a2234e13.js';
import './search-211dee83.js';
import './request-3e386aeb.js';
import './channels-2574fd6e.js';
import './discussions-api-request-199cae2d.js';
import './is-update-group-7b9eb0ea.js';
import './update-26e2fbc1.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './Metrics-9cb7a1fc.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
import './settings-2d4e159a.js';
import './store-0a6cb79f.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './_commonjsHelpers-11ca3be1.js';

/***
 *    ######## ######## ##     ## ########
 *       ##    ##       ###   ### ##     ##
 *       ##    ##       #### #### ##     ##
 *       ##    ######   ## ### ## ########
 *       ##    ##       ##     ## ##
 *       ##    ##       ##     ## ##
 *       ##    ######## ##     ## ##
 *    FUNCTIONS IN THIS FILE WILL BE IMPLEMENTED IN HUB.JS
 */
/**
 * centralized function to delete a Hub entity - delegates
 * to the appropriate delete function by entity type
 */
async function deleteHubEntity(type, entity, context, permanent = false) {
  const uro = Object.assign({}, context.userRequestOptions);
  // Add the owner to the request options if the current user is not the owner
  if (entity.owner !== context.currentUser.username) {
    setProp('owner', entity.owner, uro);
  }
  // If the entity is recycleable, we need to add `permanentDelete`
  if (permanent) {
    uro.params = { permanentDelete: true };
  }
  switch (type) {
    case "project":
      await deleteProject(entity.id, uro);
      break;
    case "initiative":
      await deleteInitiative(entity.id, uro);
      break;
    case "site":
      // Sites need to delete the domain entry, which requires the IHubRequestOptions
      // and we also need to add the owner to the request options if the current user is not the owner
      // without affecting the original context.hubRequestOptions, so we create a new object
      const siteHuro = Object.assign({}, context.hubRequestOptions);
      if (entity.owner !== context.currentUser.username) {
        setProp('owner', entity.owner, siteHuro);
      }
      await deleteSite(entity.id, siteHuro);
      break;
    case "content":
      await deleteContent(entity.id, uro);
      break;
    case "discussion":
      // discussions can't be recycled, so we don't need to pass the permanent flag
      // Discussion also requires the IHubRequestOptions, so we do that same thing as with sites
      const huro = Object.assign({}, context.hubRequestOptions);
      if (entity.owner !== context.currentUser.username) {
        setProp('owner', entity.owner, huro);
      }
      await deleteDiscussion(entity.id, huro);
      break;
    case "page":
      await deletePage(entity.id, uro);
      break;
    case "initiativeTemplate":
      await deleteInitiativeTemplate(entity.id, uro);
      break;
    case "template":
      await deleteTemplate(entity.id, uro);
      break;
    case "group":
      await deleteHubGroup(entity.id, uro);
      break;
    case "event":
      await deleteHubEvent(entity.id, context.hubRequestOptions);
      break;
    case "survey":
      await deleteSurvey(entity.id, uro);
      break;
  }
}

const arcgisHubDeleteConfirmationCss = ":host{display:block;border-radius:0.25rem;padding:1.25rem;--tw-shadow:0 1px 6px -1px rgba(0, 0, 0, 0.16), 0 1px 2px -1px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 1px 6px -1px var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);background:white}h2{margin-top:0px;margin-bottom:1.5rem;font-size:var(--calcite-font-size-1);line-height:1.5rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}.container{margin-bottom:1rem;display:flex;outline:1px solid #ccc;padding:8px;justify-content:space-between;align-items:baseline}";

const ArcgisHubDeleteConfirmation = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.arcgisHubDeleteConfirmationEntityDelete = createEvent(this, "arcgisHubDeleteConfirmationEntityDelete", 7);
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
      const response = result.success ? dist.constants.response.SUCCESS : dist.constants.response.FAILURE;
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
    this.hubTelemetry.emit(dist.dictionary.category.interaction.action.open.label.modal.details.deleteContent);
  }
  handleCalciteModalClose() {
    this.handleDeleteModalClose();
    this.hubTelemetry.emit(dist.dictionary.category.interaction.action.close.label.modal.details.deleteContent);
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
    let response = dist.constants.response.SUCCESS;
    try {
      await deleteHubEntity(this.entityType, this.entity, this._context, permanent);
    }
    catch (e) {
      response = dist.constants.response.FAILURE;
    }
    finally {
      this.showModal = false;
      this.state = response === dist.constants.response.SUCCESS ? "success" : "error";
      this.showAlert = true;
      this.hubTelemetry.emit(this.getDeleteTelemetry(this.action, this.entity, response));
    }
  }
  getDeleteTelemetry(action, entity, response) {
    const telemetry = entity.type === "Group" ? Object.assign(Object.assign({}, dist.dictionary.category.groups.action.delete), { groupId: entity.id, groupAccess: entity.access, groupOrgId: getWithDefault(entity, 'orgId', "n/a"), response }) : Object.assign(Object.assign({}, dist.dictionary.category.content.action.delete), { label: action === "delete" ? "Delete" : "Permanently Delete", id: entity.id, access: entity.access, type: entity.type, contentOrgId: getWithDefault(entity, 'orgId', "n/a"), response });
    return telemetry;
  }
  getProtectionTelemetry(action, entity, response) {
    return entity.type === "Group" ? Object.assign(Object.assign({}, dist.dictionary
      .category.groups
      .action.update
      .label[action]), { groupId: entity.id, groupAccess: entity.access, groupOrgId: getWithDefault(entity, 'orgId', "n/a"), response }) : Object.assign(Object.assign({}, dist.dictionary
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
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
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
ArcgisHubDeleteConfirmation.style = arcgisHubDeleteConfirmationCss;

export { ArcgisHubDeleteConfirmation as arcgis_hub_delete_confirmation };
