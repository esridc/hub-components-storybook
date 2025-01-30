import { Fragment, Host, h } from '@stencil/core';
import intlManager from '../../utils/intl-manager';
import { dictionary } from "@esri/telemetry-dictionary-hub";
import { buttonColorToKind } from '../../utils/calcite';
import { capitalize } from '@esri/hub-common';
/**
 * The arcgis-hub-new-content renders a dropdown or
 * standalone button to initiate the creation of new
 * hub entities. The component allows you to configure
 * in-place creation workflows (using the entity-editor
 * under the hood) OR redirect to an integrated creation UI
 */
export class ArcgisHubNewContent {
  constructor() {
    this.handleDropdownSelect = (evt) => {
      const el = evt.currentTarget;
      this.selectedEntityIdx = el.getAttribute('data-index');
      this.handleEntitySelected();
    };
    this.handleResourceLinkClick = (evt) => {
      const el = evt.currentTarget;
      const key = el.getAttribute('data-value');
      const telemetry = dictionary.category.navigation.action.new.label.content.details[key];
      telemetry && this.hubTelemetry.emit(telemetry);
    };
    /**
     * when an entity is selected from the dropdown, we either
     * redirect to the entity's provided href, or we open the
     * creation form in-place
     */
    this.handleEntitySelected = () => {
      var _a, _b;
      if (this.selectedEntity.href) {
        dictionary.category.navigation.action.new.label.content.details[(_a = this.selectedEntity) === null || _a === void 0 ? void 0 : _a.key]
          ? this.hubTelemetry.emit(dictionary.category.navigation.action.new.label.content.details[(_b = this.selectedEntity) === null || _b === void 0 ? void 0 : _b.key])
          : this.hubTelemetry.emit(dictionary.category.navigation.action.new.label.content);
      }
      else {
        this.toggleForm(true);
      }
      ;
    };
    /**
     * workaround for dropdown scrolling issue. Technically this should be addressed
     * by passing in the max-items prop to the dropdown, but there are a couple issues
     * on calcite's end:
     * https://github.com/Esri/calcite-components/issues/6230
     * https://github.com/Esri/calcite-components/issues/6242
     * TODO: remove when calcite issues are addressed
     */
    this.handleCalciteDropdownRef = (dropdown) => {
      if (dropdown.shadowRoot && !dropdown.shadowRoot.querySelector('style[data-hub]')) {
        const style = document.createElement("style");
        style.dataset.hub = "";
        style.innerHTML = ".calcite-dropdown-content { max-block-size: max-content !important; }";
        dropdown.shadowRoot.appendChild(style);
      }
    };
    this.handleEntityEditorSaved = async (evt) => {
      const { entity, isSuccess, error } = evt.detail;
      if (isSuccess) {
        this.toggleForm(false);
        this.arcgisHubNewContentSuccess.emit(entity);
      }
      else {
        this.arcgisHubNewContentError.emit(error);
      }
    };
    /**
     * because we wrap the arcgis-hub-entity-editor in a wormhole, we
     * intercept its telemetry and re-emit it from this component so
     * we don't loose the DOM context
     */
    this.handleHubTelemetry = (evt) => {
      evt.stopPropagation();
      this.hubTelemetry.emit(evt.detail);
    };
    /**
     * if an entity has an in-place creation form (rather than a
     * redirect link), we open that form in a modal
     */
    this.toggleForm = async (isOpen) => {
      var _a, _b;
      this.isMobileDropdownOpen = false;
      this.isFormOpen = isOpen;
      /**
       * Note: if we support more entities in this modal workflow,
       * we will need to add dictionary entries for them that follow
       * this convension so that we log telemetry when the creation
       * modal is opened/closed
       */
      this.selectedEntity && this.hubTelemetry.emit(isOpen
        ? dictionary.category.interaction.action.open.label.modal.details[`create${capitalize((_a = this.selectedEntity) === null || _a === void 0 ? void 0 : _a.key)}`]
        : dictionary.category.interaction.action.close.label.modal.details[`create${capitalize((_b = this.selectedEntity) === null || _b === void 0 ? void 0 : _b.key)}`]);
    };
    this.onOpenMobileDropdownButtonClick = () => {
      this.isMobileDropdownOpen = true;
    };
    this.onCloseMobileDropdownButttonClick = () => {
      this.isMobileDropdownOpen = false;
    };
    this.buttonAppearance = undefined;
    this.buttonColor = undefined;
    this.editorContext = undefined;
    this.entityConfigs = [];
    this.resourceLinks = [];
    this.renderAsDropdown = false;
    this.buttonScale = undefined;
    this.isMobile = false;
    this.selectedEntityIdx = undefined;
    this.isFormOpen = false;
    this.isFormModalOpen = false;
    this.isMobileDropdownOpen = false;
  }
  handleArcgisHubNewContentModalOpen() {
    this.isFormModalOpen = true;
  }
  handleArcgisHubNewContentModalClosed() {
    this.toggleForm(false);
    this.selectedEntityIdx = null;
    this.isFormModalOpen = false;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  get isSingleEntity() {
    return this.entityConfigs.length === 1;
  }
  /**
   * keep track of the selected entity based on what the user
   * selects from the dropdown menu. Or, if there is only a
   * single entity, set that as the selected entity
   */
  get selectedEntity() {
    return this.isSingleEntity
      ? this.entityConfigs[0]
      : this.entityConfigs[this.selectedEntityIdx];
  }
  get hasResourceLinks() {
    return !!this.resourceLinks.length;
  }
  get formTitle() {
    var _a, _b;
    return ((_a = this.selectedEntity) === null || _a === void 0 ? void 0 : _a.formLabel) || this.intl.t(`${(_b = this.selectedEntity) === null || _b === void 0 ? void 0 : _b.key}.newLabel`);
  }
  get formDescription() {
    var _a, _b;
    return ((_a = this.selectedEntity) === null || _a === void 0 ? void 0 : _a.description) || this.intl.t(`${(_b = this.selectedEntity) === null || _b === void 0 ? void 0 : _b.key}.description`);
  }
  get editorType() {
    var _a, _b;
    return ((_a = this.selectedEntity) === null || _a === void 0 ? void 0 : _a.editorType) || `hub:${(_b = this.selectedEntity) === null || _b === void 0 ? void 0 : _b.key}:create`;
  }
  getIcon(entityConfig) {
    // if an icon is not provided in the config, fallback to a default
    const DEFAULT_ICONS = {
      site: "globe",
      initiative: "initiative",
      app: "apps",
      content: "file",
      project: "projects",
      discussion: "speech-bubbles",
      feedback: "survey",
      event: "event",
      group: "group",
      template: "initiative-template"
    };
    return entityConfig.icon || DEFAULT_ICONS[entityConfig.key] || "file";
  }
  /**
   * render the main "New" dropdown button:
   * - if we're on a mobile device, this will render as a "+" button
   * - if there's only a single entity, and we haven't specified that
   * it should render as a dropdown, we render a simple calcite button
   * - if there are multiple entities, we render a calcite dropdown
   */
  renderNewDropdownButton(entityConfigs, resourceLinks) {
    let button;
    if (this.isMobile) {
      button = (h("calcite-button", { appearance: this.buttonAppearance, kind: buttonColorToKind(this.buttonColor), onClick: this.onOpenMobileDropdownButtonClick, scale: this.buttonScale }, h("calcite-icon", { icon: "plus", scale: this.buttonScale })));
    }
    else {
      button = this.isSingleEntity && !this.renderAsDropdown
        ? (h("arcgis-ref-tooltip", { overlayPositioning: 'fixed', placement: "bottom", text: entityConfigs[0].disabled && entityConfigs[0].disabledTooltip || '' }, h("calcite-button", { appearance: this.buttonAppearance, href: entityConfigs[0].href, kind: buttonColorToKind(this.buttonColor), onClick: entityConfigs[0].disabled ? null : this.handleEntitySelected, round: true, scale: this.buttonScale, shouldBeDisabled: entityConfigs[0].disabled }, entityConfigs[0].label || this.intl.t(`${entityConfigs[0].key}.createLabel`))))
        : this.renderDropdown(entityConfigs, resourceLinks);
    }
    return button;
  }
  renderDropdown(entityConfigs, resourceLinks) {
    return (h("calcite-dropdown", { ref: this.handleCalciteDropdownRef }, h("calcite-button", { appearance: this.buttonAppearance, "icon-end": "caret-down", kind: buttonColorToKind(this.buttonColor), scale: this.buttonScale, slot: "trigger" }, this.intl.t('new')), this.renderDropdownContent(entityConfigs, resourceLinks)));
  }
  /**
   * render the "dropdown" modal that opens when a user
   * is on a mobile device. We render the entities and
   * resource links in exactly the same way as non-mobile,
   * we just render them in a modal instead of a dropdown
   */
  renderMobileDropdown(entityConfigs, resourceLinks) {
    return (h("calcite-modal", { onCalciteModalClose: this.onCloseMobileDropdownButttonClick, open: this.isMobileDropdownOpen }, h("div", { slot: "header" }, this.intl.t('new')), h("div", { slot: "content" }, this.renderDropdownContent(entityConfigs, resourceLinks))));
  }
  renderDropdownContent(entityConfigs, resourceLinks) {
    return (h(Fragment, null, this.renderEntityItems(entityConfigs), this.hasResourceLinks && this.renderResourceLinks(resourceLinks)));
  }
  renderEntityItems(entityConfigs) {
    return (h("calcite-dropdown-group", { class: { "hub-new-content_dropdown-group": true, "mobile": this.isMobile }, "selection-mode": "none" }, entityConfigs.map((entity, idx) => this.renderEntityItem(entity, idx))));
  }
  renderEntityItem(entity, index) {
    return (h("calcite-dropdown-item", { "data-index": index, "data-value": entity.key, href: entity.href, key: entity.key, onCalciteDropdownItemSelect: this.handleDropdownSelect }, h("div", { class: "hub-new-content_dropdown-item" }, h("div", { class: "hub-new-content_dropdown-item--left" }, h("div", { class: "hub-new-content_dropdown-item-icon" }, h("calcite-icon", { icon: this.getIcon(entity), scale: "l" })), h("div", { class: "hub-new-content_dropdown-item-content" }, h("div", { class: "hub-new-content_dropdown-item-title" }, entity.label || this.intl.t(`${entity.key}.label`)), h("div", { class: "hub-new-content_dropdown-item-description" }, entity.description || this.intl.t(`${entity.key}.description`)))))));
  }
  renderResourceLinks(resourceLinks) {
    return (h("calcite-dropdown-group", { class: { "hub-new-content_dropdown-group": true, "mobile": this.isMobile }, "selection-mode": "none" }, resourceLinks.map(resourceLink => this.renderResourceLink(resourceLink))));
  }
  renderResourceLink(resourceLink) {
    return (h("calcite-dropdown-item", { "data-value": resourceLink.key, href: resourceLink.href, key: resourceLink.label, onClick: this.handleResourceLinkClick }, h("calcite-link", null, resourceLink.label)));
  }
  renderFormHeader() {
    return (h("div", { class: "new-content-modal__header" }, h("div", { class: "new-content-modal__header-icon" }, h("calcite-icon", { icon: this.getIcon(this.selectedEntity), scale: "l" })), h("h2", null, this.formTitle), h("span", null, this.formDescription)));
  }
  /**
   * if an entity has an in-place creation form, we render
   * the form in a modal
   */
  renderForm() {
    var _a;
    return (h("arcgis-hub-entity-editor", { editorContext: this.editorContext, editorType: this.editorType, entity: (_a = this.selectedEntity) === null || _a === void 0 ? void 0 : _a.defaults, isOpen: this.isFormOpen, layout: "modal", onArcgisHubEntityEditorSaved: this.handleEntityEditorSaved, onHubTelemetry: this.handleHubTelemetry }, 
    // we only render the form's slotted content
    // once the modal has been opened, otherwise
    // there's a small glitch where the content
    // renders prematurely (outside of the form)
    // when the form opens
    this.isFormModalOpen && (h(Fragment, null, h("div", { slot: "header" }, this.formTitle), h("div", { slot: "form-start" }, this.renderFormHeader())))));
  }
  render() {
    let dataElement = "new-content";
    if (this.selectedEntity) {
      dataElement = this.isFormOpen
        ? `new-${this.selectedEntity.key}-modal`
        : `new-${this.selectedEntity.key}`;
    }
    return (h(Host, { "data-element": dataElement }, !!this.entityConfigs.length && this.renderNewDropdownButton(this.entityConfigs, this.resourceLinks), this.isFormOpen && this.renderForm(), this.isMobile && this.renderMobileDropdown(this.entityConfigs, this.resourceLinks)));
  }
  static get is() { return "arcgis-hub-new-content"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-new-content.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-new-content.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "buttonAppearance": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Appearance",
          "resolved": "\"outline\" | \"outline-fill\" | \"solid\" | \"transparent\"",
          "references": {
            "Appearance": {
              "location": "import",
              "path": "@esri/calcite-components/dist/types/components/interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{Appearance}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubNewContent"
            }],
          "text": "calcite-button appearance"
        },
        "attribute": "button-appearance",
        "reflect": true
      },
      "buttonColor": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "ButtonColor",
          "resolved": "\"blue\" | \"inverse\" | \"neutral\" | \"red\"",
          "references": {
            "ButtonColor": {
              "location": "import",
              "path": "../../utils/calcite"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{ButtonColor}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubNewContent"
            }],
          "text": "TODO: deprecate this and replace w/ buttonKind\ncalcite-button color"
        },
        "attribute": "button-color",
        "reflect": true
      },
      "editorContext": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IEntityEditorContext",
          "resolved": "IEntityEditorContext",
          "references": {
            "IEntityEditorContext": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "optional hub-specific contextual information to help\npre-populate the editor"
        }
      },
      "entityConfigs": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubNewContentEntityConfig[]",
          "resolved": "IHubNewContentEntityConfig[]",
          "references": {
            "IHubNewContentEntityConfig": {
              "location": "import",
              "path": "./resources"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{IHubNewContentEntityConfig[]}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubNewContent"
            }],
          "text": "array of content entities"
        },
        "defaultValue": "[]"
      },
      "resourceLinks": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubNewContentResourceLink[]",
          "resolved": "IHubNewContentResourceLink[]",
          "references": {
            "IHubNewContentResourceLink": {
              "location": "import",
              "path": "./resources"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{IHubNewContentResourceLink[]}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubNewContent"
            }],
          "text": "array of resource links to render below\nthe content create buttons in the dropdown"
        },
        "defaultValue": "[]"
      },
      "renderAsDropdown": {
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
              "name": "type",
              "text": "{boolean}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubNewContent"
            }],
          "text": "optional prop to force button to render as a\ndropdown even if there's only a single entity.\nIf there's more than 1 entity, a dropdown will\nrender by default"
        },
        "attribute": "render-as-dropdown",
        "reflect": true,
        "defaultValue": "false"
      },
      "buttonScale": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Scale",
          "resolved": "\"l\" | \"m\" | \"s\"",
          "references": {
            "Scale": {
              "location": "import",
              "path": "@esri/calcite-components/dist/types/components/interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{Scale}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubNewContent"
            }],
          "text": "calcite-button scale"
        },
        "attribute": "button-scale",
        "reflect": true
      },
      "isMobile": {
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
          "text": ""
        },
        "attribute": "is-mobile",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "selectedEntityIdx": {},
      "isFormOpen": {},
      "isFormModalOpen": {},
      "isMobileDropdownOpen": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubNewContentSuccess",
        "name": "arcgisHubNewContentSuccess",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "Record<string,any>",
          "resolved": "{ [x: string]: any; }",
          "references": {
            "Record": {
              "location": "global"
            }
          }
        }
      }, {
        "method": "arcgisHubNewContentError",
        "name": "arcgisHubNewContentError",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }, {
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
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get listeners() {
    return [{
        "name": "arcgisConfigurationFormModalOpen",
        "method": "handleArcgisHubNewContentModalOpen",
        "target": "body",
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisConfigurationFormModalClosed",
        "method": "handleArcgisHubNewContentModalClosed",
        "target": "body",
        "capture": false,
        "passive": false
      }];
  }
}
