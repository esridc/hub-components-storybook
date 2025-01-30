import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { d as showNotice, g as getGlobalContext } from './state-31a09db0.js';
import { d as dist } from './index-dd3f99ac.js';
import { u as updateHubEntity } from './updateHubEntity-c9ae958c.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './store-0a6cb79f.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './_commonjsHelpers-11ca3be1.js';
import './edit-237c0a70.js';
import './tslib.es6-9c17e83a.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './search-c7a57aa9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './append-custom-params-4bd856e5.js';
import './request-fa80ae40.js';
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
import './get-with-default-b819d95d.js';
import './OperationError-387ae9ab.js';
import './object-to-json-blob-583ae5c3.js';
import './fail-safe-cd1a5a2a.js';
import './delete-prop-bd13d424.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './get-form-json-1d4e3591.js';
import './HubInitiatives-4f4e24ce.js';
import './_enrichments-8641475c.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './types-2eaa1a18.js';
import './TemplateBusinessRules-0e35d61b.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeFromEntity-e149b61e.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './map-by-a2234e13.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
import './hostedServiceUtils-f22b023b.js';
import './is-service-ad021db8.js';
import './_deep-map-values-53f8dbd1.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './getDownloadFlow-6c6d04d5.js';
import './canUseHubDownloadSystem-a22afbb9.js';
import './index-edff2d62.js';
import './getDownloadConfiguration-6cb6d32f.js';
import './types-303cd4d6.js';
import './shouldShowDownloadsConfiguration-385c6ff6.js';
import './edit-9f487804.js';
import './settings-2d4e159a.js';
import './discussions-api-request-199cae2d.js';
import './request-3e386aeb.js';
import './edit-fa9666f2.js';
import './getPropertyMap-10ee9d61.js';
import './events-c59246f8.js';
import './types-db540898.js';
import './registrations-431b9788.js';
import './defaults-1f93a79e.js';
import './getDefaultEventDatesAndTimes-4847a519.js';
import './hubSearch-41612481.js';
import './merge-objects-5b123ab3.js';
import './get-850c466d.js';
import './search-211dee83.js';
import './channels-2574fd6e.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';

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
    registerInstance(this, hostRef);
    this.arcgisHubWorkspacePaneEntityDelete = createEvent(this, "arcgisHubWorkspacePaneEntityDelete", 7);
    this.arcgisHubWorkspaceEntityChange = createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
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
        this.hubTelemetry.emit(dist.dictionary.category.interaction.action[isCanceled ? 'cancel' : 'enable'].label.event);
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
    this.hubTelemetry.emit(dist.dictionary.category.interaction.action.delete.label.event);
  }
  render() {
    return (h(Host, { "data-element": "entity-settings" }, h("arcgis-hub-workspace-pane", { stickyFooter: true }, h("h1", { slot: "title" }, this.intl.t('settings')), h("div", { slot: "primary-actions" }, h("section", null, h("header", null, h("h2", null, this.intl.t('cancel.header')), h("p", null, this.intl.t(`${!this.entity.isCanceled ? 'cancel' : 'enable'}.desc`))), h("calcite-button", { appearance: "outline", disabled: this.actionPending, onClick: this.handleCancelButtonClicked, round: true }, this.entity.isCanceled ? this.intl.t('enable.event') : this.intl.t('cancel.event')))), h("div", null, h("arcgis-hub-delete-confirmation", { entity: this.entity, entityScopedDeleteButtonText: this.intl.t('delete.deleteButton'), titleText: this.intl.t('delete.event') }, h("p", { slot: "controls-before" }, this.intl.t('delete.desc')))))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubEntityEventSettings.style = arcgisHubEntityEventSettingsCss;

export { ArcgisHubEntityEventSettings as arcgis_hub_entity_event_settings };
