'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
require('./types-ff8f7df0.js');
const setProp = require('./set-prop-3de2437f.js');
const edit = require('./edit-3df37e35.js');
const edit$1 = require('./edit-2b7ccc3f.js');
const hubSearch = require('./hubSearch-79d30702.js');
const HubInitiatives = require('./HubInitiatives-25ecf40a.js');
const edit$2 = require('./edit-fd85c003.js');
const context = require('./context-0167a31e.js');
const state = require('./state-6637df8c.js');
const intlManager = require('./intl-manager-f0103583.js');
const index$1 = require('./index-6f16fe65.js');
const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');
const checkPermission = require('./checkPermission-11ab5992.js');
const getWithDefault = require('./get-with-default-d1b1754d.js');
const request = require('./request-67da3c71.js');
const remove = require('./remove-df88a78e.js');
const protect = require('./protect-56ea038d.js');
require('./deep-set-49b373be.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./tslib.es6-b6cfa7d7.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./search-2db68ef4.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./append-custom-params-0f5d0fe2.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-family-cafa88bb.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./helpers-64227739.js');
require('./generate-random-string-8807d629.js');
require('./get-0368c931.js');
require('./tslib.es6-e7faa7f3.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');
require('./slugify-826af07b.js');
require('./HubError-44e07249.js');
require('./OperationError-902f34ae.js');
require('./object-to-json-blob-5c0a267d.js');
require('./fail-safe-33c35b7f.js');
require('./delete-prop-7826ae49.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./get-form-json-e6831b20.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./hostedServiceUtils-236344a8.js');
require('./is-service-9b8238d2.js');
require('./_deep-map-values-d489006b.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./getDownloadFlow-94a34207.js');
require('./canUseHubDownloadSystem-5b330e55.js');
require('./index-ef80ab27.js');
require('./types-097b54b1.js');
require('./getDownloadConfiguration-1ed2582d.js');
require('./types-2810dd27.js');
require('./shouldShowDownloadsConfiguration-62f7f280.js');
require('./getService-b27eda44.js');
require('./remove-921f5dc7.js');
require('./TemplateBusinessRules-5564c964.js');
require('./getPropertyMap-030ec7b2.js');
require('./events-7873340d.js');
require('./types-751ad3a9.js');
require('./registrations-a6dd52b7.js');
require('./defaults-abee9bee.js');
require('./getDefaultEventDatesAndTimes-99ac0275.js');
require('./merge-objects-b31af1a3.js');
require('./get-52661c13.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./_enrichments-a40a3850.js');
require('./get-user-5eecc1c4.js');
require('./map-by-a7a75788.js');
require('./search-b00c4c79.js');
require('./request-79b61e92.js');
require('./channels-bf478342.js');
require('./discussions-api-request-e9e6e346.js');
require('./is-update-group-36bf5d24.js');
require('./update-7b2b2d9d.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./UserSession-f8bc10c8.js');
require('./slugs-8f743e2c.js');
require('./Metrics-b8657153.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
require('./settings-0b8cd93b.js');
require('./store-2a385ca0.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./_commonjsHelpers-dcc4cf71.js');

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
    setProp.setProp('owner', entity.owner, uro);
  }
  // If the entity is recycleable, we need to add `permanentDelete`
  if (permanent) {
    uro.params = { permanentDelete: true };
  }
  switch (type) {
    case "project":
      await edit.deleteProject(entity.id, uro);
      break;
    case "initiative":
      await HubInitiatives.deleteInitiative(entity.id, uro);
      break;
    case "site":
      // Sites need to delete the domain entry, which requires the IHubRequestOptions
      // and we also need to add the owner to the request options if the current user is not the owner
      // without affecting the original context.hubRequestOptions, so we create a new object
      const siteHuro = Object.assign({}, context.hubRequestOptions);
      if (entity.owner !== context.currentUser.username) {
        setProp.setProp('owner', entity.owner, siteHuro);
      }
      await HubInitiatives.deleteSite(entity.id, siteHuro);
      break;
    case "content":
      await edit.deleteContent(entity.id, uro);
      break;
    case "discussion":
      // discussions can't be recycled, so we don't need to pass the permanent flag
      // Discussion also requires the IHubRequestOptions, so we do that same thing as with sites
      const huro = Object.assign({}, context.hubRequestOptions);
      if (entity.owner !== context.currentUser.username) {
        setProp.setProp('owner', entity.owner, huro);
      }
      await edit$2.deleteDiscussion(entity.id, huro);
      break;
    case "page":
      await HubInitiatives.deletePage(entity.id, uro);
      break;
    case "initiativeTemplate":
      await edit.deleteInitiativeTemplate(entity.id, uro);
      break;
    case "template":
      await edit.deleteTemplate(entity.id, uro);
      break;
    case "group":
      await hubSearch.deleteHubGroup(entity.id, uro);
      break;
    case "event":
      await edit$1.deleteHubEvent(entity.id, context.hubRequestOptions);
      break;
    case "survey":
      await edit.deleteSurvey(entity.id, uro);
      break;
  }
}

const arcgisHubDeleteConfirmationCss = ":host{display:block;border-radius:0.25rem;padding:1.25rem;--tw-shadow:0 1px 6px -1px rgba(0, 0, 0, 0.16), 0 1px 2px -1px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 1px 6px -1px var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);background:white}h2{margin-top:0px;margin-bottom:1.5rem;font-size:var(--calcite-font-size-1);line-height:1.5rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}.container{margin-bottom:1rem;display:flex;outline:1px solid #ccc;padding:8px;justify-content:space-between;align-items:baseline}";

const ArcgisHubDeleteConfirmation = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.arcgisHubDeleteConfirmationEntityDelete = index.createEvent(this, "arcgisHubDeleteConfirmationEntityDelete", 7);
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
      const response = result.success ? index$1.dist.constants.response.SUCCESS : index$1.dist.constants.response.FAILURE;
      this.hubTelemetry.emit(this.getProtectionTelemetry(this.action, this.entity, response));
    };
    this.entity = undefined;
    this.titleText = undefined;
    this.entityScopedDeleteButtonText = undefined;
    this.showModal = undefined;
    this.showAlert = undefined;
    this.action = undefined;
    this.state = undefined;
    context.bind(this, 'deleteEntity', 'handleDeleteBtnClick', 'handleDeleteModalClose', 'handleProtectionChange', 'handleAlertClose', 'permanentDeleteEntity', 'handleCalciteModalClose');
  }
  get _context() { return state.getGlobalContext(); }
  get entityType() {
    return getTypeFromEntity.getTypeFromEntity(this.entity);
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
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  get isProtected() {
    var _a;
    return ((_a = this.entity) === null || _a === void 0 ? void 0 : _a.protected) || false;
  }
  /**
   * Can the current user delete the entity?
   */
  get canDelete() {
    return !this.isProtected && checkPermission.checkPermission(`hub:${this.entityType}:delete`, this._context, this.entity).access;
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
    return this.canBeProtected && checkPermission.checkPermission(`hub:${this.entityType}:delete`, this._context, this.entity).access;
  }
  async handleDeleteBtnClick() {
    // call the `/canRecycle` endpoint for the entity (if it's item backed)
    // to determine if the entity can be recycled
    this.canRecycle = await canRecycleEntity(this.entity, this._context.userRequestOptions);
    this.showModal = true;
    this.hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.open.label.modal.details.deleteContent);
  }
  handleCalciteModalClose() {
    this.handleDeleteModalClose();
    this.hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.close.label.modal.details.deleteContent);
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
    let fn = remove.unprotectGroup;
    // If it's not a group, we need to pass the owner, and use the unprotectItem function
    if (entity.type !== "Group") {
      opts.owner = entity.owner;
      fn = protect.unprotectItem;
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
    let fn = remove.protectGroup;
    // If it's not a group, we need to pass the owner, and use the protectItem function
    if (entity.type !== "Group") {
      opts.owner = entity.owner;
      fn = protect.protectItem;
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
    return (index.h("calcite-alert", { "auto-close": true, "auto-close-duration": "fast", icon: icon, kind: kind, label: this.intl.t(labelKey, { type: this.type }), onCalciteAlertClose: this.handleAlertClose, open: this.showAlert, placement: "top-end" }, index.h("div", { slot: "title" }, this.intl.t(titleKey)), (action !== "delete" && action !== "permanentDelete") ?
      index.h("div", { slot: "message" }, this.intl.t(messageKey))
      : null));
  }
  renderDeleteModal() {
    const messageKey = this.canRecycle ? 'deleteModal.recycleContent' : 'deleteModal.deleteContent';
    return (index.h("calcite-modal", { kind: "danger", onCalciteModalClose: this.handleCalciteModalClose, open: this.showModal }, index.h("div", { class: 'modal-header', slot: "header" }, this.intl.t('deleteModal.header')), index.h("div", { slot: "content" }, index.h("div", null, this.intl.t(messageKey))), this.canRecycle ?
      index.h("calcite-button", { appearance: "outline-fill", kind: "danger", onClick: this.permanentDeleteEntity, round: true, slot: "back" }, this.intl.t('deleteModal.permanentlyDelete'))
      : null, index.h("calcite-button", { appearance: "outline", onClick: this.handleDeleteModalClose, round: true, slot: "secondary", width: "full" }, this.intl.t('deleteModal.cancel')), index.h("calcite-button", { kind: "danger", onClick: this.deleteEntity, round: true, slot: "primary", width: "full" }, this.intl.t('deleteModal.delete'))));
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
    let response = index$1.dist.constants.response.SUCCESS;
    try {
      await deleteHubEntity(this.entityType, this.entity, this._context, permanent);
    }
    catch (e) {
      response = index$1.dist.constants.response.FAILURE;
    }
    finally {
      this.showModal = false;
      this.state = response === index$1.dist.constants.response.SUCCESS ? "success" : "error";
      this.showAlert = true;
      this.hubTelemetry.emit(this.getDeleteTelemetry(this.action, this.entity, response));
    }
  }
  getDeleteTelemetry(action, entity, response) {
    const telemetry = entity.type === "Group" ? Object.assign(Object.assign({}, index$1.dist.dictionary.category.groups.action.delete), { groupId: entity.id, groupAccess: entity.access, groupOrgId: getWithDefault.getWithDefault(entity, 'orgId', "n/a"), response }) : Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.delete), { label: action === "delete" ? "Delete" : "Permanently Delete", id: entity.id, access: entity.access, type: entity.type, contentOrgId: getWithDefault.getWithDefault(entity, 'orgId', "n/a"), response });
    return telemetry;
  }
  getProtectionTelemetry(action, entity, response) {
    return entity.type === "Group" ? Object.assign(Object.assign({}, index$1.dist.dictionary
      .category.groups
      .action.update
      .label[action]), { groupId: entity.id, groupAccess: entity.access, groupOrgId: getWithDefault.getWithDefault(entity, 'orgId', "n/a"), response }) : Object.assign(Object.assign({}, index$1.dist.dictionary
      .category.content
      .action.update
      .label[action]), { id: entity.id, access: entity.access, type: entity.type, contentOrgId: getWithDefault.getWithDefault(entity, 'orgId', "n/a"), response });
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
    return (index.h(index.Host, { "data-element": "delete-confirmation" }, this.renderDeleteModal(), index.h("header", null, index.h("h2", null, (_a = this.titleText) !== null && _a !== void 0 ? _a : this.intl.t('section'))), this.canChangeProtection ?
      index.h("div", { class: "container" }, index.h("p", null, this.intl.t('protection', { type: this.type })), index.h("calcite-switch", { checked: this.isProtected, id: "protect-checkbox", onCalciteSwitchChange: this.handleProtectionChange }))
      : null, index.h("slot", { name: "controls-before" }), index.h("calcite-button", { appearance: "outline-fill", class: "entity-settings__deleteBtn", disabled: !this.canDelete, id: "delete-button", kind: "danger", onClick: this.handleDeleteBtnClick, round: true }, this.getDeleteButtonText), !this.canDelete
      ? index.h("calcite-tooltip", { label: this.intl.t('protectionTooltip'), "reference-element": "delete-button" }, index.h("span", null, this.intl.t(deleteDisabledTooltip)))
      : null, this.renderAlert()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
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
  const response = await request.request(url, userRequestOptions);
  return !!response.success;
}
ArcgisHubDeleteConfirmation.style = arcgisHubDeleteConfirmationCss;

exports.arcgis_hub_delete_confirmation = ArcgisHubDeleteConfirmation;
