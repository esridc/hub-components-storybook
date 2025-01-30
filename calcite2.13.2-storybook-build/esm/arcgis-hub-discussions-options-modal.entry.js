import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { b as bind } from './context-7d8f7366.js';
import { d as dist } from './index-dd3f99ac.js';
import { u as updateDiscussable } from './discussions-a173baa3.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { i as isDiscussable, D as DiscussionType } from './utils-6bf1b713.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './_commonjsHelpers-11ca3be1.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './extent-34a4ba2a.js';
import './request-fa80ae40.js';
import './helpers-8c7e5e31.js';
import './cache-4bea61e0.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import './resources-3b88c839.js';
import './download-list-38d6b571.js';
import './index-55cb25f7.js';
import './store-0a6cb79f.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './fetchContent-dbc662af.js';
import './tslib.es6-9c17e83a.js';
import './_enrichments-8641475c.js';
import './get-with-default-b819d95d.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './append-custom-params-4bd856e5.js';
import './OperationError-387ae9ab.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './slugs-7b8828d5.js';
import './is-guid-982831aa.js';
import './request-3e386aeb.js';
import './index-edff2d62.js';
import './getLayer-464ff70e.js';
import './tslib.es6-0e03e357.js';
import './discussions-api-request-199cae2d.js';
import './update-6a7d5697.js';
import './get-850c466d.js';
import './update-26e2fbc1.js';

const arcgisHubDiscussionsOptionsModalCss = ".sc-arcgis-hub-discussions-options-modal-h{display:block}calcite-notice.sc-arcgis-hub-discussions-options-modal{margin-top:0.5rem}p.sc-arcgis-hub-discussions-options-modal{margin:0px}";

const ArcgisHubDiscussionsOptionsModal = class {
  /**
   * Constructor function
   */
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.arcgisHubDiscussionsOptionsModalClosed = createEvent(this, "arcgisHubDiscussionsOptionsModalClosed", 7);
    this.arcgisHubDiscussionsOptionsModalUpdated = createEvent(this, "arcgisHubDiscussionsOptionsModalUpdated", 7);
    this.subject = undefined;
    this.open = undefined;
    this.saving = undefined;
    this.error = undefined;
    this.canDiscuss = false;
    bind(this, 'handleCloseModal', 'handleModalClosed', 'handleSave', 'handleNoticeClosed', 'handleOptionsChanged');
  }
  /**
   * Component will load lifecycle method
   */
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.updateCanDiscuss();
  }
  /**
   * Updates canDiscuss state when subject or open changes. Results in the selected panel being
   * reset to reflect the actual discussability of the subject when re-opening the modal.
   * @param subject
   */
  updateCanDiscuss() {
    this.canDiscuss = isDiscussable(this.subject);
  }
  /**
   * Invoked when the modal is dismissed by either clicking close from header or cancel button
   */
  handleModalClosed() {
    this.hubTelemetry.emit(dist.dictionary.category.interaction.action.close.label.modal.details.discussionOptions);
    this.arcgisHubDiscussionsOptionsModalClosed.emit();
  }
  /**
   * Handles changes to the selected tile
   * @param evt A custom event whose details represent the updated checked state of the tiles
   */
  handleOptionsChanged(evt) {
    this.canDiscuss = evt.detail;
  }
  /**
   * Handles clicks to the cancel button, closes the modal
   */
  handleCloseModal() {
    this.open = false;
  }
  /**
   * True when the given subject is a group
   */
  get isGroup() {
    return this.subject.isInvitationOnly !== undefined;
  }
  get _context() {
    return getGlobalContext();
  }
  /**
   * Handles clicks to the save button
   */
  async handleSave() {
    const { subject, _context, optionsElement, isGroup } = this;
    const { value } = optionsElement;
    const categoryKey = isGroup ? 'groups' : 'content';
    const detailsKey = value ? 'allowDiscussions' : 'blockDiscussions';
    const telemetry = dist.dictionary.category[categoryKey].action.update.label.settings.details[detailsKey];
    this.saving = true;
    this.error = null;
    try {
      const updatedSubject = await updateDiscussable(Object.assign({ subject, discussable: optionsElement.value }, _context.requestOptions));
      this.hubTelemetry.emit(Object.assign(Object.assign({}, telemetry), { response: dist.constants.response.SUCCESS }));
      this.subject = updatedSubject;
      this.arcgisHubDiscussionsOptionsModalUpdated.emit(updatedSubject);
    }
    catch (error) {
      this.error = error;
      this.hubTelemetry.emit(Object.assign(Object.assign({}, telemetry), { response: dist.constants.response.FAILURE }));
    }
    finally {
      this.saving = false;
    }
  }
  /**
   * Resets error state
   */
  handleNoticeClosed() {
    this.error = null;
  }
  render() {
    const { intl, saving, open, error, isGroup, canDiscuss } = this;
    return (h(Host, null, h("arcgis-wormhole", null, h("calcite-modal", { closeButtonDisabled: saving, "data-element": "discussions-options-modal", onCalciteModalClose: this.handleModalClosed, open: open, outsideCloseDisabled: true }, h("header", { slot: "header" }, intl.t('header')), h("arcgis-hub-discussions-options", { disabled: saving, layout: "horizontal", onArcgisHubDiscussionsOptionsChange: this.handleOptionsChanged, ref: (optionsElement) => { this.optionsElement = optionsElement; }, slot: "content", value: canDiscuss, variant: isGroup ? DiscussionType.GROUP : DiscussionType.CONTENT }), error && (h("calcite-notice", { closable: true, kind: "danger", onCalciteNoticeClose: this.handleNoticeClosed, open: true, slot: "content" }, h("header", { slot: "title" }, this.intl.t('error.title')), h("p", { slot: "message" }, this.intl.t('error.message')))), h("calcite-button", { appearance: "outline", disabled: saving, onClick: this.handleCloseModal, slot: "secondary", type: "button" }, intl.t('secondary')), h("calcite-button", { disabled: saving, loading: saving, onClick: this.handleSave, slot: "primary", type: "submit" }, intl.t(saving ? 'pending' : 'primary'))))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "open": ["updateCanDiscuss"],
    "subject": ["updateCanDiscuss"]
  }; }
};
ArcgisHubDiscussionsOptionsModal.style = arcgisHubDiscussionsOptionsModalCss;

export { ArcgisHubDiscussionsOptionsModal as arcgis_hub_discussions_options_modal };
