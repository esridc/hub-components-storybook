import { h, Host } from '@stencil/core';
import { renderHelperText } from '../../utils/renderHelperText';
import intlManager from '../../../../utils/intl-manager';
import { shouldRenderRequiredHelperText, renderRequiredHelperText } from '../../utils/renderRequiredHelperText';
export class ArcgisConfigurationEditorSection {
  constructor() {
    this.disabled = undefined;
    this.label = undefined;
    this.model = undefined;
    this.uiSchema = undefined;
    this.scale = 'm';
    this.t = undefined;
    this.variant = undefined;
  }
  async componentWillLoad() {
    this._intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Determines if the current section is either:
   * a. the last section in a series of sections/fields
   * b. a section before a field
   *
   * we use this to stamp a class onto the child
   * section component to conditionally apply
   * bottom margins to sections
   */
  get isLastSection() {
    const sibling = this.element.nextElementSibling;
    const hasSibling = !!sibling;
    const isSiblingAField = hasSibling && sibling.tagName === "ARCGIS-CONFIGURATION-EDITOR-FIELD";
    return !hasSibling || isSiblingAField;
  }
  /**
   * The following provides a mapping of section
   * types to section component names
   */
  get sectionComponent() {
    var _a;
    const type = (_a = this.uiSchema.options) === null || _a === void 0 ? void 0 : _a.section;
    return {
      accordion: "hub-section-accordion",
      accordionItem: "hub-section-accordion-item",
      block: "hub-section-block",
      stepper: "hub-section-stepper",
      subblock: "hub-section-subblock",
      card: "hub-section-card"
    }[type] || "hub-section-basic";
  }
  /**
   * compiled parameters that get passed down to the
   * individual section component
   */
  get sectionParams() {
    return {
      disabled: this.disabled,
      label: this.label,
      model: this.model,
      uiSchema: this.uiSchema,
      scale: this.scale,
      t: this.t,
      variant: this.variant
    };
  }
  /** section helper text */
  get helperText() {
    var _a;
    return ((_a = this.uiSchema.options) === null || _a === void 0 ? void 0 : _a.helperText) || {};
  }
  renderNestedSection() {
    return h("slot", null);
  }
  renderSectionContent() {
    const hasHelperText = !!(this.helperText.label || this.helperText.labelKey);
    return (h("div", { class: {
        "section__content": true,
        [`helper-text--${this.helperText.placement}`]: hasHelperText && !!this.helperText.placement
      } }, hasHelperText && renderHelperText(this.uiSchema, this.t), shouldRenderRequiredHelperText(this.model, this.uiSchema) && renderRequiredHelperText(this.uiSchema, this.t, this._intl), h("div", { class: "section__fields" }, h("slot", null))));
  }
  render() {
    var _a;
    const SectionComponent = this.sectionComponent;
    return (h(Host, null, h(SectionComponent, { class: { ["configuration-editor__last-child"]: this.isLastSection }, params: this.sectionParams }, ["stepper", "accordion"].includes((_a = this.uiSchema.options) === null || _a === void 0 ? void 0 : _a.section)
      ? this.renderNestedSection()
      : this.renderSectionContent())));
  }
  static get is() { return "arcgis-configuration-editor-section"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-configuration-editor-section.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-configuration-editor-section.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "disabled": {
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
          "text": "whether the section is disabled - this is only\nrelevant for collapsible block sections and\nstep sections"
        },
        "attribute": "disabled",
        "reflect": false
      },
      "label": {
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
          "text": "section label"
        },
        "attribute": "label",
        "reflect": false
      },
      "model": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IChangeEventDetail",
          "resolved": "IChangeEventDetail",
          "references": {
            "IChangeEventDetail": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "the editor's current state (values + validity)"
        }
      },
      "uiSchema": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IUiSchema",
          "resolved": "IUiSchema",
          "references": {
            "IUiSchema": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "section uiSchema"
        }
      },
      "scale": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Scale",
          "resolved": "\"l\" | \"m\" | \"s\"",
          "references": {
            "Scale": {
              "location": "import",
              "path": "@esri/calcite-components"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "scale",
        "reflect": false,
        "defaultValue": "'m'"
      },
      "t": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "TranslationFunc",
          "resolved": "(key: any, values?: any, opts?: any) => string",
          "references": {
            "TranslationFunc": {
              "location": "import",
              "path": "../../resources"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "translation function"
        }
      },
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "CONFIGURATION_VARIANTS",
          "resolved": "CONFIGURATION_VARIANTS.layoutEditor | CONFIGURATION_VARIANTS.workspace",
          "references": {
            "CONFIGURATION_VARIANTS": {
              "location": "import",
              "path": "../../resources"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "optionally adds preset styling for well-known contexts"
        },
        "attribute": "variant",
        "reflect": false
      }
    };
  }
  static get elementRef() { return "element"; }
}
