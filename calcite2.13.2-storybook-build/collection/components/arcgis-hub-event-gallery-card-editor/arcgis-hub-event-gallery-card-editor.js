var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Host, h } from '@stencil/core';
import intlManager from '../../utils/intl-manager';
import { getGlobalContext, connectContext } from '../../utils/state';
import { getEditorConfig } from '@esri/hub-common';
import { interpolateTranslations } from '../../utils';
import { migrateEventGalleryCardSchema } from '../../utils/event-gallery-card';
import Memoize from '../../decorators/memoize';
/**
 * A layout card editor component responsible for building the card configuration used by instances of Events 3 `arcgis-hub-event-gallery-card` components.
 */
export class ArcgisHubEventGalleryCardEditor {
  constructor() {
    /**
     * Intl reference
     */
    this.intl = null;
    /**
     * Wrapper function for `intl.t` used by configuration editor
     * @param key A translation string key
     * @param values Any values to interpolate into the translation string
     * @param opts Translation options
     * @returns A translated string
     */
    this.translationFn = (key, values, options) => {
      return this.intl.t(key, values, options);
    };
    /**
     * Handles changes to the configuration editor values
     * @param evt
     */
    this.handleConfigurationEditorChange = (evt) => {
      evt.stopPropagation();
      this.values = Object.assign(Object.assign({}, this._values), evt.detail.values);
      this.arcgisHubEventGalleryCardEditorChange.emit({
        valid: evt.detail.valid,
        values: this.values,
      });
    };
    /**
     * Invoked when a `arcgisHubAddContentWorkflowComplete` is emitted from the arcgis-hub-add-content component after
     * successfully creating new content. This component doesn't have direct access to the gallery as it's rendered in
     * the card, so we simply create a new `values` object and emit `arcgisHubEventGalleryCardEditorChange` to indirectly
     * trigger the gallery in the card to refresh it's results
     */
    this.handleAddContentComplete = () => {
      this.values = Object.assign({}, this._values);
      this.arcgisHubEventGalleryCardEditorChange.emit({
        valid: true,
        values: this.values,
      });
    };
    this._context = getGlobalContext();
    this.schema = undefined;
    this.uiSchema = undefined;
    this.site = undefined;
    this.values = undefined;
  }
  /**
   * Wires up the component to receive global context when the component mounts to the DOM
   */
  connectedCallback() {
    connectContext(this);
  }
  /**
   * Cleans up the global context when the component unmounts from the DOM
   */
  disconnectedCallback() {
    this.disconnectContext();
  }
  /**
   * Loads translations, the schema & the uiSchema before the component renders
   */
  async componentWillLoad() {
    await this.loadIntl();
    await this.loadSchemas();
  }
  /**
   * Loads the intl reference
   */
  async loadIntl() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Loads the schema and uiSchema
   */
  async loadSchemas() {
    var _a, _b;
    if (this.site && this._context.currentUser) {
      const { uiSchema, schema } = await getEditorConfig('fields', 'hub:card:eventGallery', { tags: (_b = (_a = this.site) === null || _a === void 0 ? void 0 : _a.tags) !== null && _b !== void 0 ? _b : [] }, this._context);
      this.schema = schema;
      this.uiSchema = interpolateTranslations(this.intl, uiSchema);
    }
    else {
      this.schema = undefined;
      this.uiSchema = undefined;
    }
  }
  get _values() {
    return migrateEventGalleryCardSchema(this.values);
  }
  /**
   * Primary render method
   */
  render() {
    return (h(Host, { "data-element": "event-gallery-card-editor" }, this.schema && this.uiSchema && (h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleConfigurationEditorChange, schema: this.schema, t: this.translationFn, uiSchema: this.uiSchema, values: this._values }, h("arcgis-hub-add-content", { buttonProps: { width: 'full', appearance: 'outline' }, config: {
        create: {
          workflow: "create",
          targetEntity: "event",
          types: ["Event"],
        },
        state: 'enabled'
      }, entityType: "event", onArcgisHubAddContentWorkflowComplete: this.handleAddContentComplete, site: this.site, slot: "add-content-slot" })))));
  }
  static get is() { return "arcgis-hub-event-gallery-card-editor"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-event-gallery-card-editor.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-event-gallery-card-editor.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
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
        "required": true,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The current site"
        }
      },
      "values": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "EventGalleryCardSchema",
          "resolved": "IEventGalleryCardSchemaV1 | IEventGalleryCardSchemaV2 | IEventGalleryCardSchemaV3",
          "references": {
            "EventGalleryCardSchema": {
              "location": "import",
              "path": "../../utils/event-gallery-card"
            }
          }
        },
        "required": true,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An EventGalleryCardSchema object representing the card configuration values"
        }
      }
    };
  }
  static get states() {
    return {
      "_context": {},
      "schema": {},
      "uiSchema": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubEventGalleryCardEditorChange",
        "name": "arcgisHubEventGalleryCardEditorChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emits an IChangeEventDetail object when changes are made to the card configuration"
        },
        "complexType": {
          "original": "IChangeEventDetail",
          "resolved": "IChangeEventDetail",
          "references": {
            "IChangeEventDetail": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "site",
        "methodName": "loadSchemas"
      }, {
        "propName": "_context",
        "methodName": "loadSchemas"
      }];
  }
}
__decorate([
  Memoize('values')
], ArcgisHubEventGalleryCardEditor.prototype, "_values", null);
