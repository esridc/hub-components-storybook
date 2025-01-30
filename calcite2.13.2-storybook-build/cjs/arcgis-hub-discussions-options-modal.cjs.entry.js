'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const context = require('./context-0167a31e.js');
const index$1 = require('./index-6f16fe65.js');
const discussions = require('./discussions-09889d00.js');
const state = require('./state-6637df8c.js');
const utils = require('./utils-7f390376.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./get-family-cafa88bb.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./extent-715f7c8d.js');
require('./request-67da3c71.js');
require('./helpers-64227739.js');
require('./cache-4d33af79.js');
require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
require('./resources-e64df288.js');
require('./download-list-00ce3845.js');
require('./index-77618030.js');
require('./store-2a385ca0.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./fetchContent-963f3885.js');
require('./tslib.es6-b6cfa7d7.js');
require('./_enrichments-a40a3850.js');
require('./get-with-default-d1b1754d.js');
require('./get-0368c931.js');
require('./tslib.es6-e7faa7f3.js');
require('./append-custom-params-0f5d0fe2.js');
require('./OperationError-902f34ae.js');
require('./get-user-5eecc1c4.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getService-b27eda44.js');
require('./slugs-8f743e2c.js');
require('./is-guid-b5c2b74c.js');
require('./request-79b61e92.js');
require('./index-ef80ab27.js');
require('./getLayer-0c83b4c1.js');
require('./tslib.es6-846f687c.js');
require('./discussions-api-request-e9e6e346.js');
require('./update-b8977041.js');
require('./get-52661c13.js');
require('./update-7b2b2d9d.js');

const arcgisHubDiscussionsOptionsModalCss = ".sc-arcgis-hub-discussions-options-modal-h{display:block}calcite-notice.sc-arcgis-hub-discussions-options-modal{margin-top:0.5rem}p.sc-arcgis-hub-discussions-options-modal{margin:0px}";

const ArcgisHubDiscussionsOptionsModal = class {
  /**
   * Constructor function
   */
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.arcgisHubDiscussionsOptionsModalClosed = index.createEvent(this, "arcgisHubDiscussionsOptionsModalClosed", 7);
    this.arcgisHubDiscussionsOptionsModalUpdated = index.createEvent(this, "arcgisHubDiscussionsOptionsModalUpdated", 7);
    this.subject = undefined;
    this.open = undefined;
    this.saving = undefined;
    this.error = undefined;
    this.canDiscuss = false;
    context.bind(this, 'handleCloseModal', 'handleModalClosed', 'handleSave', 'handleNoticeClosed', 'handleOptionsChanged');
  }
  /**
   * Component will load lifecycle method
   */
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    this.updateCanDiscuss();
  }
  /**
   * Updates canDiscuss state when subject or open changes. Results in the selected panel being
   * reset to reflect the actual discussability of the subject when re-opening the modal.
   * @param subject
   */
  updateCanDiscuss() {
    this.canDiscuss = utils.isDiscussable(this.subject);
  }
  /**
   * Invoked when the modal is dismissed by either clicking close from header or cancel button
   */
  handleModalClosed() {
    this.hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.close.label.modal.details.discussionOptions);
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
    return state.getGlobalContext();
  }
  /**
   * Handles clicks to the save button
   */
  async handleSave() {
    const { subject, _context, optionsElement, isGroup } = this;
    const { value } = optionsElement;
    const categoryKey = isGroup ? 'groups' : 'content';
    const detailsKey = value ? 'allowDiscussions' : 'blockDiscussions';
    const telemetry = index$1.dist.dictionary.category[categoryKey].action.update.label.settings.details[detailsKey];
    this.saving = true;
    this.error = null;
    try {
      const updatedSubject = await discussions.updateDiscussable(Object.assign({ subject, discussable: optionsElement.value }, _context.requestOptions));
      this.hubTelemetry.emit(Object.assign(Object.assign({}, telemetry), { response: index$1.dist.constants.response.SUCCESS }));
      this.subject = updatedSubject;
      this.arcgisHubDiscussionsOptionsModalUpdated.emit(updatedSubject);
    }
    catch (error) {
      this.error = error;
      this.hubTelemetry.emit(Object.assign(Object.assign({}, telemetry), { response: index$1.dist.constants.response.FAILURE }));
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
    return (index.h(index.Host, null, index.h("arcgis-wormhole", null, index.h("calcite-modal", { closeButtonDisabled: saving, "data-element": "discussions-options-modal", onCalciteModalClose: this.handleModalClosed, open: open, outsideCloseDisabled: true }, index.h("header", { slot: "header" }, intl.t('header')), index.h("arcgis-hub-discussions-options", { disabled: saving, layout: "horizontal", onArcgisHubDiscussionsOptionsChange: this.handleOptionsChanged, ref: (optionsElement) => { this.optionsElement = optionsElement; }, slot: "content", value: canDiscuss, variant: isGroup ? utils.DiscussionType.GROUP : utils.DiscussionType.CONTENT }), error && (index.h("calcite-notice", { closable: true, kind: "danger", onCalciteNoticeClose: this.handleNoticeClosed, open: true, slot: "content" }, index.h("header", { slot: "title" }, this.intl.t('error.title')), index.h("p", { slot: "message" }, this.intl.t('error.message')))), index.h("calcite-button", { appearance: "outline", disabled: saving, onClick: this.handleCloseModal, slot: "secondary", type: "button" }, intl.t('secondary')), index.h("calcite-button", { disabled: saving, loading: saving, onClick: this.handleSave, slot: "primary", type: "submit" }, intl.t(saving ? 'pending' : 'primary'))))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "open": ["updateCanDiscuss"],
    "subject": ["updateCanDiscuss"]
  }; }
};
ArcgisHubDiscussionsOptionsModal.style = arcgisHubDiscussionsOptionsModalCss;

exports.arcgis_hub_discussions_options_modal = ArcgisHubDiscussionsOptionsModal;
