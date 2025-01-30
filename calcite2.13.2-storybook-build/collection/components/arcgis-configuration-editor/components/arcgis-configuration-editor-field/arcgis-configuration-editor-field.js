import { h, Host, Fragment } from '@stencil/core';
import { bind } from '../../../../utils/context';
import { isNil } from '../../../../utils/is-nil';
import { capitalize, UiSchemaMessageTypes, dasherize } from '@esri/hub-common';
import { getLabel, getTitle, renderHelperText } from '../../utils';
import { getGlobalContext } from '../../../../utils/state';
import { SCHEMA_TYPE_TO_DEFAULT_FIELD_VALUE, } from '../../resources';
export class ArcgisConfigurationEditorField {
  constructor() {
    /**
     * mapping of supported composite fields (i.e. fields that render the
     * configuration editor themselves) to their field change event
     */
    this.compositeFields = {
      'arcgis-hub-timeline-editor': {
        inputChange: 'arcgisHubTimelineEditorChange'
      },
      'hub-composite-input-icon': {
        inputChange: 'arcgisCompositeIconFieldChange'
      },
      'hub-composite-input-service-query-metric': {
        inputChange: 'arcgisCompositeServiceQueryMetricFieldChange',
      },
      'hub-composite-input-expression-set': {
        inputChange: 'arcgisCompositeExpressionSetFieldChange',
      },
      'hub-composite-input-action-links': {
        values: 'links',
        inputChange: 'arcgisCompositeActionLinksFieldChange'
      },
      'arcgis-hub-access-level-controls': {
        values: 'accessLevel',
        inputChange: 'arcgisHubItemAccessLevelChange'
      },
      'arcgis-hub-license-picker': {
        inputChange: 'arcgisHubLicensePickerChange',
        values: 'licenseInfo'
      },
      'arcgis-privacy-config': {
        inputChange: 'hubPrivacyPreferencesConfigChanged',
        values: 'config'
      },
      'hub-composite-input-map-settings': {
        values: 'settings',
        inputChange: 'arcgisCompositeMapSettingsFieldChange'
      },
      'hub-composite-input-embed': {
        inputChange: 'arcgisCompositeEmbedFieldChange',
        values: 'embed'
      },
      'hub-composite-input-embeds': {
        inputChange: 'arcgisCompositeEmbedsFieldChange',
        values: 'embeds'
      },
      'hub-composite-input-site-url': {
        inputChange: 'arcgisCompositeSiteUrlFieldChange',
        // would be great if we could do something like this:
        // values: ['default-hostname', 'subdomain']
        values: 'urlInfo'
      },
      'arcgis-hub-catalog-builder': {
        values: 'catalog',
        inputChange: 'arcgisHubCatalogBuilderChange'
      },
      'arcgis-hub-collections-builder': {
        inputChange: 'arcgisHubCollectionsBuilderChange'
      },
      'arcgis-hub-query-builder': {
        values: 'query',
        inputChange: 'arcgisHubQueryBuilderChange'
      },
      'arcgis-hub-filters-builder': {
        values: 'filters',
        inputChange: 'arcgisHubFiltersBuilderChange'
      },
      'arcgis-hub-predicates-builder': {
        values: 'predicates',
        inputChange: 'arcgisHubPredicatesBuilderChange'
      },
      'arcgis-hub-catalog-appearance-builder': {
        values: 'catalogDisplayConfig',
        inputChange: 'arcgisHubCatalogAppearanceBuilderChange'
      },
      'arcgis-hub-collections-appearance-builder': {
        values: 'displayConfig',
        inputChange: 'arcgisHubCollectionsAppearanceBuilderChange'
      },
      'arcgis-hub-results-appearance-builder': {
        values: 'displayConfig',
        inputChange: 'arcgisHubResultsAppearanceBuilderChange'
      },
    };
    this.property = undefined;
    this.schema = undefined;
    this.uiSchema = undefined;
    this.model = undefined;
    this.value = undefined;
    this.invalid = false;
    this.messages = [];
    this.disabled = false;
    this.required = false;
    this.t = undefined;
    this.scale = undefined;
    this.shouldShowMessages = false;
    bind(this, 'handleFieldInputChange');
  }
  componentWillLoad() {
    this.shouldShowMessages = !!this.value;
  }
  /**
   * Contextual auth & portal information
   */
  get _context() {
    return getGlobalContext();
  }
  get fieldLabel() {
    const label = getLabel(this.uiSchema, this.t);
    if (label) {
      return this.required ? `${label}*` : label;
    }
  }
  get hasHelperText() {
    var _a, _b;
    return (_b = (_a = this.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.helperText;
  }
  get hasTooltip() {
    var _a, _b;
    return (_b = (_a = this.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.tooltip;
  }
  get isDisabled() {
    return this.disabled || !isNil(this.schema.const);
  }
  get status() {
    let _status = this.invalid ? 'invalid' : 'idle';
    _status = this.shouldShowMessages ? _status : 'idle';
    return _status;
  }
  /**
   * the field value is the first of the following conditions that is met:
   * 1. the provided value
   * 2. the default value defined on the schema
   * 3. the constant value defined on the schema
   * 4. the default value based on the field type
   */
  get _value() {
    return [
      this.value,
      this.schema.default,
      this.schema.const,
      SCHEMA_TYPE_TO_DEFAULT_FIELD_VALUE[this.schema.type]
    ].find((value) => {
      var _a;
      // we check to see if this is a number type, as null
      // is the empty value state for number types, versus
      // string having an empty value state of an empty string
      const isNumber = typeof this.schema.type === 'string'
        ? this.schema.type === 'number'
        : (_a = this.schema.type) === null || _a === void 0 ? void 0 : _a.includes('number');
      return isNumber ? !isNaN(value) : !isNil(value);
    });
  }
  get fieldTelemetryLabel() {
    // some schemas can have nested properties, so we pop
    // off the last part of the property path to format as
    // a consistent telemetry label for this field
    const _property = this.property.split('.').pop();
    return dasherize(_property)
      .split('-')
      .map(capitalize)
      .join(' ');
  }
  /**
   * compiled parameters to pass into each field-input component
   * as a single "params" prop
   */
  get fieldParams() {
    const { property, required, t, uiSchema, schema, status, disabled, _value, fieldLabel, fieldTelemetryLabel, model } = this;
    /**
     * Sometimes a field won't have its own label, but will be in a section
     * that has a label, and we'll want to pass this "implicit" label down to
     * the field itself (for a11y and telemetry purposes)
     *
     * To get this, we traverses the DOM to find the closest section element
     * (if there is one), and get its label (which we store in a data-label
     * attribute)
     */
    let label = fieldLabel;
    if (!label) {
      const closestSection = this.element.closest(".configuration-editor-section");
      label = (closestSection === null || closestSection === void 0 ? void 0 : closestSection.getAttribute('data-label')) || '';
    }
    ;
    return { value: _value, property, required, t, uiSchema, schema, status, disabled, model, label, telemetryLabel: fieldTelemetryLabel };
  }
  isCompositeField(name) {
    return !!this.compositeFields[name];
  }
  /**
   * handler function for the arcgisConfigurationEditorFieldInputChange event
   * which gets emitted every time the field input changes. This function
   * re-emits the updated field input value for the arcgis-configuration-editor
   * to validate and compile
   */
  handleFieldInputChange(evt) {
    var _a;
    evt.stopPropagation();
    let value = evt.detail;
    /**
     * we need to check if evt.detail is an array before checking if
     * values exists on evt.detail because values is a built-in method
     * on the array prototype
     */
    if (!Array.isArray(evt.detail) && ((_a = evt.detail) === null || _a === void 0 ? void 0 : _a.values)) {
      value = evt.detail.values;
    }
    this.arcgisConfigurationEditorFieldChange.emit({
      property: this.property,
      value
    });
    this.shouldShowMessages = true;
  }
  /**
   * If the uiSchema does not specify a specific control to render,
   * we fall-back to a default control based on the field's type
   */
  getDefaultControl(type) {
    const typeToDefault = {
      string: 'hub-field-input-input',
      boolean: 'hub-field-input-switch',
      array: 'hub-field-input-multiselect'
    };
    return typeToDefault[type];
  }
  getMessageIcon(icon, type, label) {
    let iconName;
    const shouldRenderIcon = isNil(icon) ? true : icon;
    if (type === UiSchemaMessageTypes.error && shouldRenderIcon) {
      iconName = label ? 'x-octagon' : 'exclamation-mark-circle';
    }
    else if (type === UiSchemaMessageTypes.success && shouldRenderIcon) {
      iconName = 'check-circle';
    }
    else if (type === UiSchemaMessageTypes.custom) {
      iconName = icon;
    }
    return iconName;
  }
  getMessageStatus(type) {
    switch (type) {
      case UiSchemaMessageTypes.error:
        return 'invalid';
      case UiSchemaMessageTypes.success:
        return 'valid';
      case UiSchemaMessageTypes.custom:
        return 'idle';
    }
  }
  renderMessages(messages) {
    return messages.reduce((acc, message) => {
      const { type, display, icon, kind, hidden, allowShowBeforeInteract } = message;
      if (allowShowBeforeInteract || this.shouldShowMessages) {
        const label = getLabel(message, this.t);
        const title = getTitle(message, this.t);
        const iconName = this.getMessageIcon(icon, type, label);
        const status = this.getMessageStatus(type);
        !hidden && acc.push(
        // NOTE: 'notice' is deprecated in 'messages' and will be removed in the future.
        // Please configure notices in UISchema as a standalone element instead.
        display === 'notice'
          ?
            h("div", { class: "message-notice-container" }, h("calcite-notice", { icon: icon, key: `${message.keyword}_${message.type}`, kind: kind, open: true, scale: this.scale }, title && (h("div", { slot: "title" }, title)), h("div", { slot: "message" }, label), message.link && this.renderNoticeLink(message)))
          : h("calcite-input-message", { icon: iconName, key: `${message.keyword}_${message.type}`, scale: this.scale, status: status }, label));
      }
      ;
      return acc;
    }, []);
  }
  // NOTE: 'notice' is deprecated in 'messages' and will be removed in the future.
  // Please configure notices in UISchema as a standalone element instead.
  renderNoticeLink(message) {
    let result = null;
    const link = message.link;
    switch (link.kind) {
      case 'external':
        result = (h("calcite-link", { href: link.href, iconEnd: "launch", slot: "link", target: link.target }, link.label));
        break;
      // TODO: add support for other link types
    }
    return result;
  }
  renderControl(params) {
    var _a, _b, _c;
    const { control, composite, changeEvent, styles } = ((_a = params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) || {};
    const ControlComponent = control || this.getDefaultControl(params.schema.type);
    const isComposite = this.isCompositeField(control) || composite;
    const compositeValues = ((_b = this.compositeFields[control]) === null || _b === void 0 ? void 0 : _b.values) || 'values';
    const compositeFieldInputChangeEvent = ((_c = this.compositeFields[control]) === null || _c === void 0 ? void 0 : _c.inputChange) || changeEvent;
    const componentAttributes = isComposite
      ? Object.assign(Object.assign({ context: this._context, [compositeValues]: params.value }, params.uiSchema.options), { params: Object.assign({ scale: this.scale }, params), [`on${capitalize(compositeFieldInputChangeEvent)}`]: this.handleFieldInputChange }) : {
      context: this._context,
      params: Object.assign({ scale: this.scale }, params),
      styles,
      onArcgisConfigurationEditorFieldInputChange: this.handleFieldInputChange,
    };
    return ControlComponent && (h(ControlComponent, Object.assign({}, componentAttributes)));
  }
  renderTooltip(uiSchemaElement, t) {
    const refElementId = `arcgis-configuration-editor-field-tooltip-${Date.now()}`;
    const tooltip = getLabel(uiSchemaElement, t, 'options.tooltip');
    return (h(Fragment, null, h("calcite-icon", { icon: "information-f", id: refElementId, scale: "s" }), h("calcite-tooltip", { label: tooltip, "reference-element": refElementId }, tooltip)));
  }
  renderBlockField() {
    const { fieldLabel, hasTooltip, hasHelperText, messages, fieldParams } = this;
    const field = (h(Fragment, null, h("div", { class: "field-container" }, hasHelperText && renderHelperText(fieldParams.uiSchema, fieldParams.t), this.renderControl(fieldParams)), !!(messages === null || messages === void 0 ? void 0 : messages.length) && h("div", { class: "message-container" }, this.renderMessages(messages))));
    return fieldLabel
      ? h("calcite-label", { scale: this.scale }, h("span", null, fieldLabel, hasTooltip && this.renderTooltip(this.uiSchema, this.t)), field)
      : field;
  }
  renderInlineField() {
    var _a;
    const { fieldLabel, hasTooltip, fieldParams } = this;
    return (h(Fragment, null, h("calcite-label", { layout: "inline-space-between", scale: this.scale }, h("div", null, h("span", null, fieldLabel, hasTooltip && this.renderTooltip(fieldParams.uiSchema, fieldParams.t)), this.hasHelperText && renderHelperText(fieldParams === null || fieldParams === void 0 ? void 0 : fieldParams.uiSchema, fieldParams.t), !!((_a = this.messages) === null || _a === void 0 ? void 0 : _a.length) && h("div", { class: "message-container" }, this.renderMessages(this.messages))), h("div", { class: "field-container field-container-inline" }, this.renderControl(fieldParams)))));
  }
  render() {
    var _a, _b, _c;
    const isInline = ((_c = (_b = (_a = this.fieldParams) === null || _a === void 0 ? void 0 : _a.uiSchema) === null || _b === void 0 ? void 0 : _b.options) === null || _c === void 0 ? void 0 : _c.layout) === 'inline-space-between';
    return (h(Host, null, this.fieldLabel && isInline
      /*
        note we previously set the status on the field,
        but as of calcite-components 1.0.0, the status
        should be set on the component the label is bound to
        TODO: ensure that renderBlockField() and renderInlineField do that
      */
      ? this.renderInlineField()
      : this.renderBlockField()));
  }
  static get is() { return "arcgis-configuration-editor-field"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-configuration-editor-field.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-configuration-editor-field.css"]
    };
  }
  static get properties() {
    return {
      "property": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": true,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The field's property key from the form schema"
        },
        "attribute": "property",
        "reflect": true
      },
      "schema": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "JSONSchema",
          "resolved": "JSONSchema",
          "references": {
            "JSONSchema": {
              "location": "import",
              "path": "../../resources"
            }
          }
        },
        "required": true,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The field's schema"
        }
      },
      "uiSchema": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IUiSchemaElement",
          "resolved": "IUiSchemaElement",
          "references": {
            "IUiSchemaElement": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The field's uiSchema"
        }
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
          "text": "The entire form's current state.\nHolds the values of all fields in the form as well as the schema and validity of the form."
        }
      },
      "value": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "unknown",
          "resolved": "unknown",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The field's value"
        }
      },
      "invalid": {
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
          "text": "Indicates whether the value is valid"
        },
        "attribute": "invalid",
        "reflect": true,
        "defaultValue": "false"
      },
      "messages": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IUiSchemaMessage[]",
          "resolved": "IUiSchemaMessage[]",
          "references": {
            "IUiSchemaMessage": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An array of AJV errors associated with the field"
        },
        "defaultValue": "[]"
      },
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
          "text": "Indicates whether the field is disabled"
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
      },
      "required": {
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
          "text": "Indicates whether the field value is required"
        },
        "attribute": "required",
        "reflect": true,
        "defaultValue": "false"
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
          "text": "A translation function with which to translate field labels"
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
              "path": "@esri/calcite-components/dist/types/components/interfaces"
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
        "reflect": true
      }
    };
  }
  static get states() {
    return {
      "shouldShowMessages": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisConfigurationEditorFieldChange",
        "name": "arcgisConfigurationEditorFieldChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "This custom event is emitted when the value of the field\nchanges. It includes the field's property and value"
        },
        "complexType": {
          "original": "IFieldChangeEventDetail",
          "resolved": "IFieldChangeEventDetail",
          "references": {
            "IFieldChangeEventDetail": {
              "location": "import",
              "path": "./resources"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
}
