'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');
const intlManager = require('./intl-manager-f0103583.js');
const state = require('./state-6637df8c.js');
const types = require('./types-097b54b1.js');
const extent = require('./extent-715f7c8d.js');
const search = require('./search-2db68ef4.js');
const createItemFromUrlOrFile = require('./create-item-from-url-or-file-1a2bf39f.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./request-67da3c71.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./append-custom-params-0f5d0fe2.js');
require('./tslib.es6-b6cfa7d7.js');
require('./create-6279e23e.js');
require('./tslib.es6-e7faa7f3.js');
require('./get-0368c931.js');
require('./batch-180e8ec7.js');
require('./access-049994c9.js');
require('./helpers-05252545.js');
require('./get-52661c13.js');
require('./is-update-group-36bf5d24.js');
require('./fail-safe-33c35b7f.js');
require('./share-item-with-group-6c27286f.js');
require('./get-user-5eecc1c4.js');
require('./update-user-membership-4af88c1c.js');

const arcgisHubFileUploadManagerCss = ":host{display:flex;width:80%;flex-direction:column}.button-container{margin-top:0.5rem;display:flex;width:100%;flex-direction:row;justify-content:flex-end;padding-top:1.25rem}calcite-button:first-child{margin-right:4px}.separator{display:flex;align-items:center;text-align:center}.separator::before,.separator::after{flex:1 1 0%;border-width:1px;border-top-width:0px;border-right-width:0px;border-left-width:0px;border-style:solid;border-color:var(--calcite-color-border-input);--tw-content:'';content:var(--tw-content)}.separator:not(:empty)::before{margin-right:0.25rem}.separator:not(:empty)::after{margin-left:0.25rem}arcgis-hub-file-select{margin-bottom:1rem}arcgis-hub-url-content-form{margin-top:2rem}arcgis-hub-groups-sharing{margin-top:1.25rem}.hide{display:none}.duplicate-file-name{margin-top:40px;display:flex;flex-direction:column;align-items:center;gap:0.25rem}.duplicate-file-name-span{width:80%;font-size:18px;margin-top:40px;margin-bottom:50px}calcite-icon{height:75px;width:75px;color:var(--calcite-color-status-danger)}";

// ENUM for what stage we are currently on.
var STAGE;
(function (STAGE) {
  STAGE["ITEM"] = "item";
  STAGE["METADATA"] = "metadata";
  STAGE["SHARING"] = "sharing";
  STAGE["CREATING"] = "creating";
  STAGE["COMPLETE"] = "complete"; // Completion state
})(STAGE || (STAGE = {}));
const ArcgisHubFileUploadManager = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubItemCreationState = index.createEvent(this, "arcgisHubItemCreationState", 7);
    this.arcgisHubFileUploadManagerStageChange = index.createEvent(this, "arcgisHubFileUploadManagerStageChange", 7);
    this.arcgisHubFileOrUrlValid = index.createEvent(this, "arcgisHubFileOrUrlValid", 7);
    // Internal tracking of metadata values.
    this.metadataValues = {};
    // Has the second stage been completed or not?
    this.secondStageComplete = false;
    this.context = undefined;
    this.portal = "https://www.arcgis.com";
    this.groups = undefined;
    this.selectedGroups = undefined;
    this.allowedFileTypes = {
      types: [types.ItemType.Image, types.ItemType["Microsoft Word"], types.ItemType["Microsoft Excel"], types.ItemType["Microsoft Powerpoint"]],
      extensions: [types.FileExtension.pdf, types.FileExtension.csv]
    };
    this.showButtons = false;
    this.selectedItem = undefined;
    this.stage = STAGE.ITEM;
    this.duplicateFileId = undefined;
    this.thirdStageDisabled = true;
    this._context = state.getGlobalContext();
    context.bind(this, 'setStepperEl', 'setFileSelectEl', '_moveToNextStage', 'nextStage', '_moveToPreviousStage', 'previousStage');
  }
  async componentWillLoad() {
    // attach intl
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.el);
    // If we don't have a context, but we have a portal
    if (!this.context && this.portal) {
      this.context = this._context;
    }
  }
  async componentWillRender() {
    // get and set the default extent in the proper projection if it's not already set
    if ((this.context && this.context.portal) && !this.defaultExtent) {
      this.defaultExtent = await extent.orgExtent(this.context.hubRequestOptions);
    }
  }
  async onPortalChange() {
    // changing the context should fire the watch for that property thus re-running the search
    this.context = this._context;
  }
  async onStageChange() {
    // If we are going back to the first stage
    // AND we have a file selected
    // We want to clear it out
    if (this.stage === STAGE.ITEM && this.itemSource === 'file') {
      // clear out selected item
      this.selectedItem = undefined;
      this.fileSelectElement.clearSelectedFile();
      // clear out item source
      this.itemSource = undefined;
      // mark second stage incomplete
      this.secondStageComplete = false;
      // disable third stage
      this.thirdStageDisabled = true;
      // reset duplicate file id
      this.duplicateFileId = undefined;
    }
    // If we are on the second stage && there's a file.
    if (this.stage === STAGE.METADATA && this.selectedItem.file) {
      // Get the item
      const item = this.selectedItem;
      // check name dupe
      const existingFileResults = await search.searchItems({
        q: `owner:${this.context.currentUser.username} ownerfolder:root type:${item.type}`,
        // We need to replace spaces with underscores otherwise it will not work
        // We double quote the name for characters such as (. Double quotes still do not allow spaces in the filename.
        filter: `item:"${item.file.name.split(' ').join('_')}"`,
        authentication: this.context.session
      });
      // if there's any results... then a file with the same name exists
      if (existingFileResults.results.length) {
        // set duplicate file id
        this.duplicateFileId = existingFileResults.results[0].id;
        // disable third stage
        this.thirdStageDisabled = true;
        // Emit out a invalid file state
        this.arcgisHubFileOrUrlValid.emit({ valid: false, source: 'file' });
      }
      else {
        // Otherwise enable third stage.
        this.thirdStageDisabled = false;
      }
    }
    this.arcgisHubFileUploadManagerStageChange.emit(this.stage);
  }
  // NOTE: ABP - When bumping from v2.8 to v2.13, I mistakenly switched this event name 
  // from `calciteInternalStepperItemChange` to `calciteStepperChange`. This was a mistake,
  // and we should continue using the internal event name.
  // See:
  // - Confusing event name change in Calcite docs: https://github.com/Esri/calcite-design-system/blob/e137abefa40d07d9847fce5d23ca242910d5a936/packages/calcite-components/src/components/stepper/readme.md#events
  // - Internal event name in Calcite Stepper component: https://github.com/Esri/calcite-design-system/blob/e137abefa40d07d9847fce5d23ca242910d5a936/packages/calcite-components/src/components/stepper/stepper.tsx#L164-L171
  // - Regression resulting from attempting to switch: https://devtopia.esri.com/dc/hub/issues/11466
  handleCalciteStepperChangeEvent(event) {
    // DO NOT stop propogation of event. It will cause issues with the stepper
    // internally setting the step / prevent nextStep && prevStep from working
    // event.stopPropagation();
    // Get position out of event
    const { detail: { position } } = event;
    // Translate position to Stage.
    switch (position) {
      case 0:
        this.stage = STAGE.ITEM;
        break;
      case 1:
        this.stage = STAGE.METADATA;
        break;
      case 2:
        this.stage = STAGE.SHARING;
    }
  }
  handleFileSelected(event) {
    // Stop propogation
    event.stopPropagation();
    // Get item
    const item = event.detail;
    // assign item to state
    this.selectedItem = item;
    // note it came from file.
    this.itemSource = 'file';
    // set metadata values
    this.metadataValues = { title: item.title };
    // move to next step
    setTimeout(this._moveToNextStage, 100);
    // emit file status
    this.arcgisHubFileOrUrlValid.emit({ valid: true, source: 'file' });
  }
  handleUrlValidation(event) {
    // Stop propogation
    event.stopPropagation();
    // get item from event
    const item = event.detail;
    // If there's a type...
    if (item.type) {
      this.selectedItem = item;
      // note it came from url
      this.itemSource = 'url';
      // set metadata values
      this.metadataValues = { title: item.title };
      // emit url status
      this.arcgisHubFileOrUrlValid.emit({ valid: true, source: 'url' });
    }
    else {
      // emit url invalid status
      this.arcgisHubFileOrUrlValid.emit({ valid: false, source: 'url' });
    }
  }
  handleItemTypeSelection(event) {
    // Stop propogation
    event.stopPropagation();
    // get item from event
    const item = event.detail;
    // assign item to state
    this.selectedItem = item;
    // Note it came from url
    this.itemSource = 'url';
    // set metadata values
    this.metadataValues = { title: item.title };
    // emit url status
    this.arcgisHubFileOrUrlValid.emit({ valid: true, source: 'url' });
  }
  mergeMetadataValuesWithItem(event) {
    // Stop propogation
    event.stopPropagation();
    // get values/valid/item
    const { values, valid } = event.detail;
    const item = this.selectedItem;
    // If valid..
    if (valid) {
      // merge in changes
      this.selectedItem = Object.assign({}, item, values);
      // activate third stage if we are on the right stage
      this.thirdStageDisabled = false;
      // mark second stage complete
      this.secondStageComplete = true;
      // emit valid/invalid status
      this.arcgisHubFileOrUrlValid.emit({ valid: true, source: this.itemSource });
    }
    else {
      // ensure they can't move on to the third stage
      this.thirdStageDisabled = true;
      // emit valid/invalid status
      this.arcgisHubFileOrUrlValid.emit({ valid: false, source: this.itemSource });
    }
  }
  updateSelectedGroups(event) {
    // Stop propogation
    event.stopPropagation();
    // extract groups
    const groups = event.detail.share;
    // updated selected groups
    this.selectedGroups = groups;
  }
  updateAccessLevel(event) {
    // Stop propogation
    event.stopPropagation();
    // extract access level
    const accessLevel = event.detail;
    // update item
    this.selectedItem.access = accessLevel;
  }
  /**
   * Move forward a stage, or create item if we are at the sharing stage.
   *
   * @memberof ArcgisHubFileUploadManager
   */
  async nextStage() {
    const { stage, selectedItem, selectedGroups } = this;
    // Handle basic forward in stepper
    if (stage === STAGE.ITEM || stage === STAGE.METADATA) {
      this._moveToNextStage();
    }
    // Save / create the item
    if (stage === STAGE.SHARING) {
      const typeAccessAndGroups = {
        type: selectedItem.type,
        access: selectedItem.access,
        groups: this.selectedGroups.map(group => group.id)
      };
      // Try
      try {
        // Shift to creating stage.
        this.stage = STAGE.CREATING;
        const authentication = this.context.session;
        // Create item.
        const createdItem = await createItemFromUrlOrFile.createItemFromUrlOrFile({
          item: selectedItem,
          groups: selectedGroups,
          authentication
        });
        // When complete shift to complete stage.
        this.stage = STAGE.COMPLETE;
        // Emit the new item
        this.arcgisHubItemCreationState.emit(Object.assign(Object.assign({}, typeAccessAndGroups), createdItem));
      }
      catch (err) {
        this.stage = STAGE.COMPLETE;
        this.arcgisHubItemCreationState.emit(Object.assign({ title: selectedItem.title, createdItem: { id: undefined, success: false, folder: undefined }, itemAccessResponse: undefined, itemSharingResponse: undefined }, typeAccessAndGroups));
      }
    }
  }
  /**
   * Move back a stage.
   *
   * @return {*}  {Promise<void>}
   * @memberof ArcgisHubFileUploadManager
   */
  async previousStage() {
    // handle basic backwards in stepper
    if (this.stage === STAGE.METADATA || this.stage === STAGE.SHARING) {
      this._moveToPreviousStage();
    }
  }
  // Internal back for stepper method
  _moveToPreviousStage() {
    this.stepperElement.prevStep();
  }
  // Internal forward for stepper method
  _moveToNextStage() {
    this.stepperElement.nextStep();
  }
  // Input element ref
  setStepperEl(el) {
    this.stepperElement = el;
  }
  // File Select input
  setFileSelectEl(el) {
    this.fileSelectElement = el;
  }
  // Render first three stages
  renderItemStage() {
    var _a, _b, _c, _d, _e, _f, _g;
    if (this.stage !== STAGE.CREATING && this.stage !== STAGE.COMPLETE) {
      return (index.h("calcite-stepper", { ref: this.setStepperEl }, index.h("calcite-stepper-item", { complete: !!this.selectedItem, heading: this.intl.t('firstStepHeader'), selected: true }, index.h("arcgis-hub-file-select", { allowedFileTypes: this.allowedFileTypes, defaultExtent: this.defaultExtent, owner: (_a = this.context.currentUser) === null || _a === void 0 ? void 0 : _a.username, portalName: (_b = this.context.portal) === null || _b === void 0 ? void 0 : _b.name, ref: this.setFileSelectEl }), index.h("span", { class: "separator" }, this.intl.t('divider')), index.h("arcgis-hub-url-content-form", { defaultExtent: this.defaultExtent, owner: (_c = this.context.currentUser) === null || _c === void 0 ? void 0 : _c.username, portalName: (_d = this.context.portal) === null || _d === void 0 ? void 0 : _d.name })), index.h("calcite-stepper-item", { complete: this.secondStageComplete, disabled: !this.selectedItem, heading: this.intl.t('secondStepHeader') }, index.h("arcgis-hub-file-metadata-editor", { class: {
          hide: !!this.duplicateFileId
        }, values: this.metadataValues }), index.h("div", { class: {
          'duplicate-file-name': !!this.duplicateFileId,
          hide: !this.duplicateFileId
        } }, index.h("calcite-icon", { "aria-label": this.intl.t('duplicateFileAriaLabel'), icon: "x-circle", scale: "l" }), index.h("span", { class: "duplicate-file-name-span" }, this.intl.t('duplicateFileError', { a: (...chunks) => index.h("a", { href: `${this.context.portalUrl}/home/item.html?id=${this.duplicateFileId}`, target: "_blank" }, chunks)
      })))), index.h("calcite-stepper-item", { disabled: this.thirdStageDisabled, heading: this.intl.t('thirdStepHeader') }, index.h("arcgis-hub-access-level-controls", { "access-level": (_e = this.selectedItem) === null || _e === void 0 ? void 0 : _e.access, "item-type": (_f = this.selectedItem) === null || _f === void 0 ? void 0 : _f.type, "org-name": (_g = this.context.portal) === null || _g === void 0 ? void 0 : _g.name }), index.h("arcgis-hub-groups-sharing", { groups: this.groups, selectedGroups: this.selectedGroups }))));
    }
  }
  // Render loading state
  renderCreating() {
    if (this.stage === STAGE.CREATING) {
      return (index.h("calcite-loader", { label: this.intl.t('uploading'), scale: "l", type: "indeterminate" }));
    }
  }
  // Render complete stage slot
  renderCompleteStage() {
    if (this.stage === STAGE.COMPLETE) {
      return (index.h("slot", null));
    }
  }
  // Render Buttons.
  renderButtons() {
    const { selectedItem, showButtons, stage, thirdStageDisabled } = this;
    if (showButtons && (stage !== STAGE.CREATING && stage !== STAGE.COMPLETE)) {
      const nextbuttonIntl = stage === STAGE.SHARING ? 'save' : 'next';
      const nextButtonDisabled = !selectedItem || (stage === STAGE.METADATA && thirdStageDisabled);
      return (index.h("div", { class: "button-container" }, index.h("calcite-button", { appearance: "outline", disabled: stage === STAGE.ITEM, onClick: this.previousStage }, this.intl.t('back')), index.h("calcite-button", { appearance: "solid", disabled: nextButtonDisabled, onClick: this.nextStage }, this.intl.t(nextbuttonIntl))));
    }
  }
  render() {
    return (index.h(index.Host, null, this.renderItemStage(), this.renderCreating(), this.renderButtons(), this.renderCompleteStage()));
  }
  static get assetsDirs() { return ["locales"]; }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "portal": ["onPortalChange"],
    "stage": ["onStageChange"]
  }; }
};
ArcgisHubFileUploadManager.style = arcgisHubFileUploadManagerCss;

exports.arcgis_hub_file_upload_manager = ArcgisHubFileUploadManager;
