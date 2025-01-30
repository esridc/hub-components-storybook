'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const state = require('./state-6637df8c.js');
const index$1 = require('./index-6f16fe65.js');
const updateHubEntity = require('./updateHubEntity-60b83b84.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./store-2a385ca0.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./edit-3df37e35.js');
require('./tslib.es6-b6cfa7d7.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./search-2db68ef4.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./append-custom-params-0f5d0fe2.js');
require('./request-67da3c71.js');
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
require('./get-with-default-d1b1754d.js');
require('./OperationError-902f34ae.js');
require('./object-to-json-blob-5c0a267d.js');
require('./fail-safe-33c35b7f.js');
require('./delete-prop-7826ae49.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./get-form-json-e6831b20.js');
require('./HubInitiatives-25ecf40a.js');
require('./_enrichments-a40a3850.js');
require('./get-user-5eecc1c4.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getService-b27eda44.js');
require('./types-097b54b1.js');
require('./TemplateBusinessRules-5564c964.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./getTypeFromEntity-9476954e.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./UserSession-f8bc10c8.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
require('./map-by-a7a75788.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
require('./hostedServiceUtils-236344a8.js');
require('./is-service-9b8238d2.js');
require('./_deep-map-values-d489006b.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./getDownloadFlow-94a34207.js');
require('./canUseHubDownloadSystem-5b330e55.js');
require('./index-ef80ab27.js');
require('./getDownloadConfiguration-1ed2582d.js');
require('./types-2810dd27.js');
require('./shouldShowDownloadsConfiguration-62f7f280.js');
require('./edit-fd85c003.js');
require('./settings-0b8cd93b.js');
require('./discussions-api-request-e9e6e346.js');
require('./request-79b61e92.js');
require('./edit-2b7ccc3f.js');
require('./getPropertyMap-030ec7b2.js');
require('./events-7873340d.js');
require('./types-751ad3a9.js');
require('./registrations-a6dd52b7.js');
require('./defaults-abee9bee.js');
require('./getDefaultEventDatesAndTimes-99ac0275.js');
require('./hubSearch-79d30702.js');
require('./merge-objects-b31af1a3.js');
require('./get-52661c13.js');
require('./search-b00c4c79.js');
require('./channels-bf478342.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');

const arcgisHubEntityEventSettingsCss = ":host{display:block;height:100%}.entity-settings__entity-name{margin-top:1rem;font-weight:var(--calcite-font-weight-bold)}calcite-button{width:-moz-fit-content;width:fit-content}calcite-modal{--calcite-modal-context-text-internal:var(--calcite-font-size-0)}arcgis-hub-workspace-pane{--arcgis-hub-workspace-pane-max-width:55rem;--arcgis-configuration-form-footer-max-width:50rem}calcite-button{margin-right:1rem}section{display:block;width:100%;border-radius:0.25rem;padding:1.25rem;--tw-shadow:0 1px 6px -1px rgba(0, 0, 0, 0.16), 0 1px 2px -1px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 1px 6px -1px var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);background:white}h2{margin-top:0px;margin-bottom:1.5rem;font-size:var(--calcite-font-size-1);line-height:1.5rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}";

const alertConfig = {
  noticeType: 'alert',
  autoClose: true,
  autoCloseDuration: 'fast',
  icon: true,
  kind: 'success',
};
const ArcgisHubEntityEventSettings = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubWorkspacePaneEntityDelete = index.createEvent(this, "arcgisHubWorkspacePaneEntityDelete", 7);
    this.arcgisHubWorkspaceEntityChange = index.createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.handleCancelButtonClicked = async () => {
      const { entity, _context } = this;
      const isCanceled = !entity.isCanceled;
      try {
        this.actionPending = true;
        this.entity = (await updateHubEntity.updateHubEntity('event', Object.assign(Object.assign({}, entity), { isCanceled }), _context));
        this.arcgisHubWorkspaceEntityChange.emit({
          entity: this.entity,
          isDirty: false,
        });
        this.hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action[isCanceled ? 'cancel' : 'enable'].label.event);
        state.showNotice({
          title: this.intl.t(`${isCanceled ? 'cancel' : 'enable'}.notice.success.title`),
          message: this.intl.t(`${isCanceled ? 'cancel' : 'enable'}.notice.success.message`),
          configuration: Object.assign(Object.assign({}, alertConfig), { label: this.intl.t('notice.label') })
        });
      }
      catch (e) {
        console.error(`Failed to ${isCanceled ? 'cancel' : 're-enable'} event: ${e}`);
        state.showNotice({
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
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  get _context() {
    return state.getGlobalContext();
  }
  handleEntityDelete(event) {
    event.stopPropagation();
    this.arcgisHubWorkspacePaneEntityDelete.emit(this.entity);
    this.hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.delete.label.event);
  }
  render() {
    return (index.h(index.Host, { "data-element": "entity-settings" }, index.h("arcgis-hub-workspace-pane", { stickyFooter: true }, index.h("h1", { slot: "title" }, this.intl.t('settings')), index.h("div", { slot: "primary-actions" }, index.h("section", null, index.h("header", null, index.h("h2", null, this.intl.t('cancel.header')), index.h("p", null, this.intl.t(`${!this.entity.isCanceled ? 'cancel' : 'enable'}.desc`))), index.h("calcite-button", { appearance: "outline", disabled: this.actionPending, onClick: this.handleCancelButtonClicked, round: true }, this.entity.isCanceled ? this.intl.t('enable.event') : this.intl.t('cancel.event')))), index.h("div", null, index.h("arcgis-hub-delete-confirmation", { entity: this.entity, entityScopedDeleteButtonText: this.intl.t('delete.deleteButton'), titleText: this.intl.t('delete.event') }, index.h("p", { slot: "controls-before" }, this.intl.t('delete.desc')))))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubEntityEventSettings.style = arcgisHubEntityEventSettingsCss;

exports.arcgis_hub_entity_event_settings = ArcgisHubEntityEventSettings;
