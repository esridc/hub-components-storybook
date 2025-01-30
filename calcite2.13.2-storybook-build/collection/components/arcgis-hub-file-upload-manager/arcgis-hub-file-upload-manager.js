import { searchItems } from "@esri/arcgis-rest-portal";
import { ItemType, FileExtension, createItemFromUrlOrFile, orgExtent } from "@esri/hub-common";
import { Host, h } from "@stencil/core";
import { bind } from '../../utils/context';
import intlManager from "../../utils/intl-manager";
import { getGlobalContext } from '../../utils/state';
// ENUM for what stage we are currently on.
var STAGE;
(function (STAGE) {
  STAGE["ITEM"] = "item";
  STAGE["METADATA"] = "metadata";
  STAGE["SHARING"] = "sharing";
  STAGE["CREATING"] = "creating";
  STAGE["COMPLETE"] = "complete"; // Completion state
})(STAGE || (STAGE = {}));
/**
 * @internal
 *
 * @export
 * @class ArcgisHubFileUploadManager
 */
export class ArcgisHubFileUploadManager {
  constructor() {
    // Internal tracking of metadata values.
    this.metadataValues = {};
    // Has the second stage been completed or not?
    this.secondStageComplete = false;
    this.context = undefined;
    this.portal = "https://www.arcgis.com";
    this.groups = undefined;
    this.selectedGroups = undefined;
    this.allowedFileTypes = {
      types: [ItemType.Image, ItemType["Microsoft Word"], ItemType["Microsoft Excel"], ItemType["Microsoft Powerpoint"]],
      extensions: [FileExtension.pdf, FileExtension.csv]
    };
    this.showButtons = false;
    this.selectedItem = undefined;
    this.stage = STAGE.ITEM;
    this.duplicateFileId = undefined;
    this.thirdStageDisabled = true;
    this._context = getGlobalContext();
    bind(this, 'setStepperEl', 'setFileSelectEl', '_moveToNextStage', 'nextStage', '_moveToPreviousStage', 'previousStage');
  }
  async componentWillLoad() {
    // attach intl
    this.intl = await intlManager.loadIntlForComponent(this.el);
    // If we don't have a context, but we have a portal
    if (!this.context && this.portal) {
      this.context = this._context;
    }
  }
  async componentWillRender() {
    // get and set the default extent in the proper projection if it's not already set
    if ((this.context && this.context.portal) && !this.defaultExtent) {
      this.defaultExtent = await orgExtent(this.context.hubRequestOptions);
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
      const existingFileResults = await searchItems({
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
      default:
        break;
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
        const createdItem = await createItemFromUrlOrFile({
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
      return (h("calcite-stepper", { ref: this.setStepperEl }, h("calcite-stepper-item", { complete: !!this.selectedItem, heading: this.intl.t('firstStepHeader'), selected: true }, h("arcgis-hub-file-select", { allowedFileTypes: this.allowedFileTypes, defaultExtent: this.defaultExtent, owner: (_a = this.context.currentUser) === null || _a === void 0 ? void 0 : _a.username, portalName: (_b = this.context.portal) === null || _b === void 0 ? void 0 : _b.name, ref: this.setFileSelectEl }), h("span", { class: "separator" }, this.intl.t('divider')), h("arcgis-hub-url-content-form", { defaultExtent: this.defaultExtent, owner: (_c = this.context.currentUser) === null || _c === void 0 ? void 0 : _c.username, portalName: (_d = this.context.portal) === null || _d === void 0 ? void 0 : _d.name })), h("calcite-stepper-item", { complete: this.secondStageComplete, disabled: !this.selectedItem, heading: this.intl.t('secondStepHeader') }, h("arcgis-hub-file-metadata-editor", { class: {
          hide: !!this.duplicateFileId
        }, values: this.metadataValues }), h("div", { class: {
          'duplicate-file-name': !!this.duplicateFileId,
          hide: !this.duplicateFileId
        } }, h("calcite-icon", { "aria-label": this.intl.t('duplicateFileAriaLabel'), icon: "x-circle", scale: "l" }), h("span", { class: "duplicate-file-name-span" }, this.intl.t('duplicateFileError', { a: (...chunks) => h("a", { href: `${this.context.portalUrl}/home/item.html?id=${this.duplicateFileId}`, target: "_blank" }, chunks)
      })))), h("calcite-stepper-item", { disabled: this.thirdStageDisabled, heading: this.intl.t('thirdStepHeader') }, h("arcgis-hub-access-level-controls", { "access-level": (_e = this.selectedItem) === null || _e === void 0 ? void 0 : _e.access, "item-type": (_f = this.selectedItem) === null || _f === void 0 ? void 0 : _f.type, "org-name": (_g = this.context.portal) === null || _g === void 0 ? void 0 : _g.name }), h("arcgis-hub-groups-sharing", { groups: this.groups, selectedGroups: this.selectedGroups }))));
    }
  }
  // Render loading state
  renderCreating() {
    if (this.stage === STAGE.CREATING) {
      return (h("calcite-loader", { label: this.intl.t('uploading'), scale: "l", type: "indeterminate" }));
    }
  }
  // Render complete stage slot
  renderCompleteStage() {
    if (this.stage === STAGE.COMPLETE) {
      return (h("slot", null));
    }
  }
  // Render Buttons.
  renderButtons() {
    const { selectedItem, showButtons, stage, thirdStageDisabled } = this;
    if (showButtons && (stage !== STAGE.CREATING && stage !== STAGE.COMPLETE)) {
      const nextbuttonIntl = stage === STAGE.SHARING ? 'save' : 'next';
      const nextButtonDisabled = !selectedItem || (stage === STAGE.METADATA && thirdStageDisabled);
      return (h("div", { class: "button-container" }, h("calcite-button", { appearance: "outline", disabled: stage === STAGE.ITEM, onClick: this.previousStage }, this.intl.t('back')), h("calcite-button", { appearance: "solid", disabled: nextButtonDisabled, onClick: this.nextStage }, this.intl.t(nextbuttonIntl))));
    }
  }
  render() {
    return (h(Host, null, this.renderItemStage(), this.renderCreating(), this.renderButtons(), this.renderCompleteStage()));
  }
  static get is() { return "arcgis-hub-file-upload-manager"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-file-upload-manager.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-file-upload-manager.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "context": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "IArcGISContext",
          "resolved": "IArcGISContext",
          "references": {
            "IArcGISContext": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Context - how we pass in auth & portal information\nThis is mutable because if not passed the component\ncreates it's own, based on the value of `portal`"
        }
      },
      "portal": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Portal url. If `context` is not passed in,\nthen a `context` will be created using the portal\nvalue.\nShould not have /sharing/rest on the end\ndefaults to https://www.arcgis.com"
        },
        "attribute": "portal",
        "reflect": false,
        "defaultValue": "\"https://www.arcgis.com\""
      },
      "groups": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IGroup[]",
          "resolved": "IGroup[]",
          "references": {
            "IGroup": {
              "location": "import",
              "path": "@esri/arcgis-rest-portal"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{IGroup[]}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubFileUploadManager"
            }],
          "text": "Potential list of groups the item can bbe shared with."
        }
      },
      "selectedGroups": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IGroup[]",
          "resolved": "IGroup[]",
          "references": {
            "IGroup": {
              "location": "import",
              "path": "@esri/arcgis-rest-portal"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{IGroup[]}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubFileUploadManager"
            }],
          "text": "List og groups that are selected by default"
        }
      },
      "allowedFileTypes": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IAllowedFileTypes",
          "resolved": "IAllowedFileTypes",
          "references": {
            "IAllowedFileTypes": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{IAllowedFileTypes}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubFileUploadManager"
            }],
          "text": "File types that the file picker allows. By default we use the below, but it can be overridden\nif needed."
        },
        "defaultValue": "{\n    types: [ItemType.Image, ItemType[\"Microsoft Word\"], ItemType[\"Microsoft Excel\"], ItemType[\"Microsoft Powerpoint\"]],\n    extensions: [FileExtension.pdf, FileExtension.csv]\n  }"
      },
      "showButtons": {
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
          "tags": [{
              "name": "memberof",
              "text": "ArcgisHubFileUploadManager"
            }],
          "text": "Should Back/Next/Save be shown or no?\nIf no then utilize methods for going back/forward in stages and\nto save/create the item"
        },
        "attribute": "show-buttons",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "selectedItem": {},
      "stage": {},
      "duplicateFileId": {},
      "thirdStageDisabled": {},
      "_context": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubItemCreationState",
        "name": "arcgisHubItemCreationState",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{EventEmitter<ICreateItemResponse>}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubFileUploadManager"
            }],
          "text": "Emit out status of item creation."
        },
        "complexType": {
          "original": "{\n    title: string;\n    type: string;\n    access: string;\n    groups: string[];\n    createdItem: ICreateItemResponse;\n    itemAccessResponse: ISharingResponse;\n    itemSharingResponse: ISharingResponse[];\n  }",
          "resolved": "{ title: string; type: string; access: string; groups: string[]; createdItem: ICreateItemResponse; itemAccessResponse: ISharingResponse; itemSharingResponse: ISharingResponse[]; }",
          "references": {
            "ICreateItemResponse": {
              "location": "import",
              "path": "@esri/arcgis-rest-portal"
            },
            "ISharingResponse": {
              "location": "import",
              "path": "@esri/arcgis-rest-portal"
            }
          }
        }
      }, {
        "method": "arcgisHubFileUploadManagerStageChange",
        "name": "arcgisHubFileUploadManagerStageChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{EventEmitter<string>}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubFileUploadManager"
            }],
          "text": "Emit out when the stage changes"
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }, {
        "method": "arcgisHubFileOrUrlValid",
        "name": "arcgisHubFileOrUrlValid",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{(EventEmitter<{ valid: boolean, source: 'file' | 'url' }>)}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubFileUploadManager"
            }],
          "text": "Emit out when File or Url is valid and what its source is."
        },
        "complexType": {
          "original": "{ valid: boolean, source: 'file' | 'url' }",
          "resolved": "{ valid: boolean; source: \"url\" | \"file\"; }",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "nextStage": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Move forward a stage, or create item if we are at the sharing stage.",
          "tags": [{
              "name": "memberof",
              "text": "ArcgisHubFileUploadManager"
            }]
        }
      },
      "previousStage": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Move back a stage.",
          "tags": [{
              "name": "return",
              "text": "{Promise<void>}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubFileUploadManager"
            }]
        }
      }
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "portal",
        "methodName": "onPortalChange"
      }, {
        "propName": "stage",
        "methodName": "onStageChange"
      }];
  }
  static get listeners() {
    return [{
        "name": "calciteInternalStepperItemChange",
        "method": "handleCalciteStepperChangeEvent",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubFileSelected",
        "method": "handleFileSelected",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubUrlValidated",
        "method": "handleUrlValidation",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubItemTypeSelected",
        "method": "handleItemTypeSelection",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubFileMetadataEditorChange",
        "method": "mergeMetadataValuesWithItem",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubSelectedGroupsChange",
        "method": "updateSelectedGroups",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubItemAccessLevelChange",
        "method": "updateAccessLevel",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
