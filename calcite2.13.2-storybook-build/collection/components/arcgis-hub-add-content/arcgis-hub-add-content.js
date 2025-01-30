import { Fragment, Host, h } from '@stencil/core';
import intlManager from '../../utils/intl-manager';
import { connectContext, getGlobalContext } from '../../utils/state';
import { checkPermission, cloneObject, getAddContentConfig, Logger, } from '@esri/hub-common';
import { getIcon } from './utils/utils';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { getHubEntityTypeFromType } from '../../utils/type-converters';
/**
 * Add content component
 * Renders dropdown with options to add content to a Hub entity
 * Currently only supports adding existing content
 * In the near future will support creating new content and uploading content
 */
export class ArcgisHubAddContent {
  constructor() {
    this.handleAddContentWorkflowComplete = (evt) => {
      // we need to catch and re-emit this event because the workflow component is in a wormhole, thanks safari
      evt.stopPropagation();
      this.arcgisHubAddContentWorkflowComplete.emit();
    };
    /**
     * Handler for the dropdown button click
     */
    this.handleDropdownButtonClick = () => {
      this.hubTelemetry.emit(dictionary.category.interaction.action.open.label.options.details.add);
    };
    /**
     * Handler for dropdown item click
     */
    this.handleDropdownItemSelect = (event) => {
      this.selectDropdownEntry(this.dropDownEntries[event.target.dataset.index]);
    };
    /**
     * Click handler for button to create a specific entity type
     */
    this.handleButtonClick = () => {
      this.selectDropdownEntry(this.specificEntityTypeToCreate);
    };
    /**
     * Handler for onCalciteModalClose event
     */
    this.handleModalClose = () => {
      this.shouldShowModal = false;
      this.selectedConfig = null;
      this.hubTelemetry.emit(dictionary.category.interaction.action.close.label.modal.details.add);
    };
    /**
     * Handler for onArcgisHubAddContentWorkflowClose event
     */
    this.handleClose = () => {
      this.shouldShowModal = false;
    };
    /**
     * workaround for dropdown scrolling issue.
     * This should be addressed by passing maxItems to the dropdown
     * but https://github.com/Esri/calcite-components/issues/6230
     * TODO: remove when calcite issue is addressed
     */
    this.handleCalciteDropdownRef = (dropdown) => {
      setTimeout(() => {
        var _a;
        const contentEl = (_a = dropdown === null || dropdown === void 0 ? void 0 : dropdown.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.calcite-dropdown-content');
        if (contentEl) {
          // ugh, need to make it scrollable too - so need to make sure we are not making it taller than the window
          const rect = contentEl.getBoundingClientRect();
          const maxHeight = window.innerHeight - rect.top - 10;
          contentEl.style.maxBlockSize = maxHeight + 'px';
        }
      }, 100);
    };
    this.renderDropdownItem = (config, index) => {
      const onlineOrEnterprise = this._context.isPortal ? 'ArcGIS Enterprise' : 'ArcGIS Online';
      const workflow = config.workflowConfig.workflow;
      const entityType = config.entityType || '';
      const intlKeyBase = workflow === 'create' ? `${workflow}.${entityType}` : workflow;
      let itemTitle = this.intl.t(`${intlKeyBase}.title`);
      let itemDescription = this.intl.t(`${intlKeyBase}.description`, { onlineOrEnterprise });
      if (workflow === 'existing') {
        itemTitle = this.addExistingTitle || itemTitle;
        itemDescription = this.addExistingDescription || itemDescription;
      }
      return (h("calcite-dropdown-item", { "data-index": index, key: `${workflow}${entityType}`, label: this.intl.t(`${intlKeyBase}.title`), onCalciteDropdownItemSelect: this.handleDropdownItemSelect }, h("div", { class: "dropdown-item" }, h("div", { class: "dropdown-item-icon" }, h("calcite-icon", { icon: getIcon(config.entityType), scale: "m" })), h("div", { class: "dropdown-item-content" }, h("div", null, itemTitle), h("div", null, itemDescription)))));
    };
    this.query = undefined;
    this.catalog = undefined;
    this.config = undefined;
    this.entity = undefined;
    this.site = undefined;
    this.entityType = undefined;
    this.workflowConfig = undefined;
    this.allowGroupSelection = false;
    this.buttonText = undefined;
    this.buttonProps = {};
    this.addExistingTitle = undefined;
    this.addExistingDescription = undefined;
    this._context = getGlobalContext();
    this.shouldShowModal = false;
    this.selectedConfig = undefined;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.processConfiguration();
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  // Note: There are some circumstances where this set of watch's may lead to
  // unexpected behavior, but those are not expected given the current
  // useage of this component.
  processConfiguration() {
    if (this._context.isAuthenticated) {
      if (this.config) {
        Logger.info(`AC: Using provided config`);
        // use the provided config
        this.workflowConfig = this.config;
      }
      else {
        if (this.query) {
          Logger.info(`AC: Using query`);
          // create config from query
          this.workflowConfig = getAddContentConfig(this._context, this.query);
        }
        else if (this.catalog) {
          Logger.info(`AC: Using catalog`);
          // create config from catalog
          this.workflowConfig = getAddContentConfig(this._context, this.catalog);
        }
        else {
          Logger.info(`AC: Using default config`);
          // create the default workflowconfig
          this.workflowConfig = getAddContentConfig(this._context);
        }
      }
    }
  }
  get dropDownEntries() {
    // filter the config into a new config that only contains entries the user has permission to do
    const config = [];
    // use the configuration to construct the button configs
    if (this.workflowConfig) {
      // if the configuration has a create workflow, we need to add it to the config
      if (this.workflowConfig.create) {
        // convert into individual entries for each type
        const types = this.workflowConfig.create.types || [];
        const creatableTypes = types.filter(type => {
          const entityType = getHubEntityTypeFromType(type);
          const permission = `hub:${entityType}:create`;
          Logger.info(`AC: Checking permission: ${permission}`);
          return checkPermission(permission, this._context).access;
        });
        creatableTypes.forEach(type => {
          const wfConfig = cloneObject(this.workflowConfig.create);
          wfConfig.types = [type];
          config.push({
            workflow: 'create',
            workflowConfig: wfConfig,
            entityType: getHubEntityTypeFromType(type),
          });
        });
      }
      // if the configuration has a upload workflow, we need to add it to the config
      if (this.workflowConfig.existing) {
        config.push({
          workflow: 'existing',
          workflowConfig: this.workflowConfig.existing,
        });
      }
    }
    return config;
  }
  get isMemberOfRequiredGroup() {
    return this.dropDownEntries.length > 0;
  }
  get isDisabled() {
    return !this.workflowConfig || this.workflowConfig.state === "disabled";
  }
  get tooltip() {
    if (this.isDisabled) {
      // eslint-disable-next-line unicorn/prefer-ternary
      if (this.workflowConfig.reason) {
        return this.intl.t(`tooltip.${this.workflowConfig.reason}`);
      }
      else if (!this.isMemberOfRequiredGroup) {
        return this.intl.t('tooltip.noCatalog');
      }
    }
  }
  get specificEntityTypeToCreate() {
    // Note: the "existing" workflow definition will not have a entityType
    // so we need to ensure that this.entityType is defined before we do
    // the deeper check.
    if (this.entityType) {
      return this.dropDownEntries.find(({ entityType }) => entityType === this.entityType);
    }
  }
  /**
   * Computes the button text
   */
  get _buttonText() {
    let text;
    if (this.buttonText) {
      text = this.buttonText;
    }
    else if (this.specificEntityTypeToCreate) {
      text = this.intl.t(`addContentType.${this.specificEntityTypeToCreate.entityType}`);
    }
    else {
      text = this.intl.t('addContent');
    }
    return text;
  }
  /**
   * Sets the selectedConfig to the provided dropdownEntry
   * @param dropdownEntry The dropdown entry to set as the selectedConfig
   */
  selectDropdownEntry(dropdownEntry) {
    this.selectedConfig = dropdownEntry;
    this.hubTelemetry.emit(dictionary.category.interaction.action.open.label.modal.details.add);
    this.shouldShowModal = true;
  }
  get modalHeader() {
    if (!!this.selectedConfig) {
      const entityType = this.selectedConfig.entityType || '';
      const workflow = this.selectedConfig.workflowConfig.workflow;
      const intlKeyBase = workflow === 'create' ? `${workflow}.${entityType}` : workflow;
      return this.intl.t(`${intlKeyBase}.modalTitle`);
    }
  }
  renderModalContent() {
    if (!!this.selectedConfig) {
      return (h("arcgis-hub-add-content-workflow", { allowGroupSelection: this.allowGroupSelection, entity: this.entity, onArcgisHubAddContentWorkflowClose: this.handleClose, onArcgisHubAddContentWorkflowComplete: this.handleAddContentWorkflowComplete, site: this.site, workflowConfig: this.selectedConfig.workflowConfig }));
    }
  }
  renderDropdown() {
    return (h(Fragment, null, h("calcite-dropdown", { disabled: this.isDisabled, id: "add-content-dropdown", placement: "bottom-end", ref: this.handleCalciteDropdownRef }, this._renderButton({
      iconEnd: 'chevron-down',
      onClick: this.handleDropdownButtonClick,
      slot: 'trigger',
    }), h("calcite-dropdown-group", { "selection-mode": "none" }, this.dropDownEntries.map(this.renderDropdownItem)), h("slot", { name: "dropdown-items" })), this.tooltip && (h("calcite-tooltip", { label: this.intl.t('tooltip.label'), "reference-element": "add-content-dropdown" }, h("span", null, this.tooltip)))));
  }
  _renderButton(props = {}) {
    // we do not translate these strings because they are product names
    const buttonProps = Object.assign(Object.assign({ round: true }, props), this.buttonProps);
    return h("calcite-button", Object.assign({}, buttonProps), this._buttonText);
  }
  renderButton() {
    return this._renderButton({ onClick: this.handleButtonClick });
  }
  render() {
    if (this.workflowConfig) {
      return (h(Host, { "data-element": "add-entity" }, this.specificEntityTypeToCreate ? this.renderButton() : this.renderDropdown(), h("arcgis-wormhole", { elAttributes: { unthemed: 'true' }, styles: { "--calcite-dialog-background-color": "#fff" } }, h("calcite-dialog", { "escape-disabled": true, heading: this.modalHeader, headingLevel: 3, modal: true, onCalciteDialogClose: this.handleModalClose, open: this.shouldShowModal, "outside-close-disabled": true, scale: "l", widthScale: "l" }, this.renderModalContent()))));
    }
  }
  static get is() { return "arcgis-hub-add-content"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-add-content.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-add-content.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "query": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IQuery",
          "resolved": "IQuery",
          "references": {
            "IQuery": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The query to use to create the configuration for the add content workflow\nIf provided, will override the catalog prop"
        }
      },
      "catalog": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubCatalog",
          "resolved": "IHubCatalog",
          "references": {
            "IHubCatalog": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Catalog to use to create the configuration for the add content workflow\nProviding either the Query or Config prop will override this prop"
        }
      },
      "config": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IAddContentWorkflowConfig",
          "resolved": "IAddContentWorkflowConfig",
          "references": {
            "IAddContentWorkflowConfig": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The configuration for the add content workflow\nIf provided, will override the query and catalog props\nIf none of the above are provided, will use the default configuration"
        }
      },
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
          "text": "A reference to the entity this component is being rendered within the context of. E.g. an IHubProject when in a project's Workspace or View"
        }
      },
      "site": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubSite",
          "resolved": "IHubSite",
          "references": {
            "IHubSite": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "A reference to the current site entity."
        }
      },
      "entityType": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "AddContentEntityType",
          "resolved": "\"discussion\" | \"event\" | \"group\" | \"initiative\" | \"page\" | \"project\" | \"site\"",
          "references": {
            "AddContentEntityType": {
              "location": "local"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "When provided and an entry exists within the config for the provided type, will render a create button for the entity type rather than a dropdown"
        },
        "attribute": "entity-type",
        "reflect": false
      },
      "allowGroupSelection": {
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
          "tags": [],
          "text": "Whether to show the group selection step in the create workflow"
        },
        "attribute": "allow-group-selection",
        "reflect": false,
        "defaultValue": "false"
      },
      "buttonText": {
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
          "text": "The text to render on the button - optional, will default to 'Add content'"
        },
        "attribute": "button-text",
        "reflect": false
      },
      "buttonProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Record<string, any>",
          "resolved": "{ [x: string]: any; }",
          "references": {
            "Record": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The props to apply to the calcite-button"
        },
        "defaultValue": "{}"
      },
      "addExistingTitle": {
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
          "text": "Override for the \"create\" dropdown item title"
        },
        "attribute": "add-existing-title",
        "reflect": false
      },
      "addExistingDescription": {
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
          "text": "Override for the \"create\" dropdown item description"
        },
        "attribute": "add-existing-description",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "workflowConfig": {},
      "_context": {},
      "shouldShowModal": {},
      "selectedConfig": {}
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
        "method": "arcgisHubAddContentWorkflowComplete",
        "name": "arcgisHubAddContentWorkflowComplete",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "_context",
        "methodName": "processConfiguration"
      }, {
        "propName": "config",
        "methodName": "processConfiguration"
      }, {
        "propName": "query",
        "methodName": "processConfiguration"
      }, {
        "propName": "catalog",
        "methodName": "processConfiguration"
      }];
  }
}
