import { Host, h } from '@stencil/core';
import { cloneObject, getProp } from '@esri/hub-common';
import { bind } from '../../utils/context';
import intlManager from '../../utils/intl-manager';
import { interpolateTranslations, showNotice } from '../../utils';
import { getGlobalContext } from '../../utils/state';
import { constants as telemetryConstants, dictionary as telemetryDictionary } from '@esri/telemetry-dictionary-hub';
import { parseTelemetryEvents, } from './utils';
import { getTypeFromEntity, EntityEditor, capitalize, } from '@esri/hub-common';
import { isNil } from '../../utils/is-nil';
import { mergeDeep } from '../../utils/object';
/**
 * @slot header A slot for adding a form title to render above the form. In the case of a "modal" layout, this will render in the calcite-modal header slot
 * @slot form-start A slot for adding content above the form
 */
export class ArcgisHubEntityEditor {
  constructor() {
    this.entity = undefined;
    this.editorContext = undefined;
    this.include = undefined;
    this.editorType = undefined;
    this.layout = "sticky";
    this.footerSlotRef = undefined;
    this.isOpen = undefined;
    this.variant = undefined;
    this.isDisabled = undefined;
    this.messageOverrides = undefined;
    this.scale = undefined;
    this.isLoading = false;
    this.isSaving = false;
    this.schema = undefined;
    this.uiSchema = undefined;
    this.values = undefined;
    bind(this, 'translationFunc', 'handleEntityEditorSave', 'handleEntityEditorChange', 'setConfigurationFormEl', 'handleConfigurationInitialized');
  }
  async componentWillLoad() {
    this.isLoading = true;
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
  * We execute these XHRs in componentDidLoad rather than componentWillLoad
  * so that render isn't blocked. We want the underlying configuration form
  * to render so that the loading state is visible to the consumer while
  * these values load
  */
  async componentDidLoad() {
    this.initializeForm();
  }
  async initializeForm() {
    try {
      // Create the EntityEditor instance
      const entity = this.isCreateForm
        ? this.getDefaultEntity(this.entityType)
        : this.entity;
      this.editor = EntityEditor.fromEntity(entity, this._context);
      const i18nScope = this.entityType;
      const config = await this.editor.getConfig(i18nScope, this.editorType);
      // interpolate translations
      this.schema = interpolateTranslations(this.intl, config.schema);
      this.uiSchema = interpolateTranslations(this.intl, config.uiSchema);
      // get the values from the editor
      const values = await this.editor.toEditor(this.editorContext, this.include);
      // interpolate value translations (if applicable)
      //
      // NOTE: be very careful when adding new entity types to this list. If an entity contains adlib interpolation
      // strings that are _not_ meant to be translated, the interpolation process may fail or cause unexpected results.
      //
      // Ex: Site entities often have "feed templates" attached to them. They configure the output of a site's
      // various feeds (DCAT, RSS, etc.). These feed templates contain adlib interpolation strings that should
      // _never_ be translated.
      const needsTranslatedValues = [
        'content', // download format configuration
      ];
      this.values = needsTranslatedValues.includes(this.entityType)
        ? interpolateTranslations(this.intl, values)
        : values;
      // if we have defaults, merge them with values
      if (config.defaults) {
        const defaults = interpolateTranslations(this.intl, config.defaults);
        // do defaults take precedence over values or vice versa, dependent on if we're creating
        this.values = this.isCreateForm ? mergeDeep(this.values, defaults) : mergeDeep(defaults, this.values);
      }
    }
    catch (error) {
      console.error(`Could not fetch the editor config:`, error);
    }
    finally {
      this.isLoading = false;
    }
  }
  get _messageOverrides() {
    return Object.assign(Object.assign({}, this.messageOverrides), (this.isCreateForm && { save: this.intl.t('create') }));
  }
  /**
   * stops propogation and fires new event to alert initialization
   *
   * @param event - listens for the arcgisConfigurationForm to be initialized
   */
  handleConfigurationInitialized(event) {
    event.stopPropagation();
    this.arcgisHubEntityEditorInitialization.emit(event.detail);
  }
  /**
   * If the entity changes, we need to re-initialize the form and it's fields
   * as a refresh with the latest information.
   */
  async handleEntityChanged() {
    this.initializeForm();
  }
  /**
   * For cases where we are creating a new entity, we need to create
   * the minimum entity object to pass to the editor.
   * @param entityType
   * @returns
   */
  getDefaultEntity(entityType) {
    let entity;
    switch (entityType) {
      case 'project':
        entity = { type: 'Hub Project' };
        break;
      case 'initiative':
        entity = { type: 'Hub Initiative' };
        break;
      case 'content':
        // This just needs to be a type that will resolve to content
        entity = { type: 'Web Map' };
        break;
      case 'page':
        entity = { type: 'Hub Page' };
        break;
      case 'site':
        entity = { type: 'Hub Site Application' };
        break;
      case 'discussion':
        entity = { type: 'Discussion' };
        break;
      case 'event':
        entity = { type: 'Event' };
        break;
      case 'group':
        entity = { type: 'Group' };
        break;
      default:
        // other things should be content
        entity = { type: 'Web Map' };
    }
    const defaults = this.entity || {};
    return Object.assign(Object.assign({}, defaults), entity);
  }
  /**
   * Contextual auth & portal information
   */
  get _context() {
    return getGlobalContext();
  }
  /**
   * Computes the entity type based on the entity (if defined).
   * When undefined (in the case of entity creation), we assume
   * the entity type can be determined from the editorType which
   * has the form "context:type:action", e.g. "hub:project:create"
   */
  get entityType() {
    return this.isCreateForm
      ? this.editorType.split(':')[1]
      : getTypeFromEntity(this.entity);
  }
  /**
   * Computes a contextual label to include in our telemetry
   * payload based on the editorType which has the form
   * "context:type:action:...", e.g. "hub:project:edit"
   */
  get telemetryLabel() {
    let label;
    const action = this.editorType.split(':')[2];
    // a hash for deriving default telemetry labels
    // based on the editor type
    const defaultMap = {
      edit: "Details",
      create: ""
    };
    // a hash for explicitly defining a telemetry label
    // for an editor type - For example:
    // "hub:group:create:followers": "Some custom label"
    const overrideMap = {
      "hub:group:create:followers": "Followers",
      "hub:group:create:association": "Association"
    };
    if (defaultMap.hasOwnProperty(action)) {
      label = defaultMap[action];
    }
    if (overrideMap.hasOwnProperty(this.editorType)) {
      label = overrideMap[this.editorType];
    }
    return isNil(label) ? capitalize(action) : label;
  }
  /**
   * If the entity id is undefined, we assume we're in an entity
   * "creation" experience
   */
  get isCreateForm() {
    return !getProp(this.entity, "id");
  }
  setConfigurationFormEl(el) {
    this.configurationFormEl = el;
  }
  translationFunc(key, values, opts) {
    return this.intl.t(key, values, opts);
  }
  /**
   * when editor values are saved, we log telemetry to give us insight
   * into the changes our users are making. We compare the original
   * editor values to the updated values and emit individual telemetry
   * events for each meaningful change. See the parseTelemetryEvents
   * util for more details on how we construct these telemetry events.
   *
   * we also log an event to indicate whether the save was a success/failure
   */
  emitSaveTelemetry(opts) {
    var _a, _b, _c, _d;
    let telemetryEvents = [];
    const { isSuccess, entity, originalValues, updatedValues } = opts;
    const category = ["user", "group"].includes(this.entityType)
      ? `${this.entityType}s`
      : "content";
    const action = this.isCreateForm ? 'create' : 'update';
    const createDimensions = entity.type === "Group"
      ? {
        // Note: contentId is not specific to items - it is used to
        // scope telemetry requests
        contentId: `portal:${entity.id}`,
        groupId: entity.id,
        groupType: this.editorType.split('hub:group:create:')[1]
          ? capitalize(this.editorType.split('hub:group:create:')[1])
          : entity.isSharedUpdate ? "Edit" : "View",
        groupAccess: entity.access,
        groupOrgId: (_b = (_a = this._context) === null || _a === void 0 ? void 0 : _a.portal) === null || _b === void 0 ? void 0 : _b.id
      }
      : {
        contentId: `portal:${entity.id}`,
        id: entity.id,
        type: entity.type,
        access: entity.access,
        contentOrgId: (_d = (_c = this._context) === null || _c === void 0 ? void 0 : _c.portal) === null || _d === void 0 ? void 0 : _d.id
      };
    if (isSuccess) {
      telemetryEvents = parseTelemetryEvents(originalValues, updatedValues, this.entityType);
      telemetryEvents.push(Object.assign(Object.assign({}, telemetryDictionary.category[category].action[action]), (this.telemetryLabel && { label: this.telemetryLabel })));
      telemetryEvents = telemetryEvents.map(event => {
        if (this.isCreateForm) {
          event = mergeDeep(event, createDimensions);
        }
        return Object.assign(Object.assign({}, event), { response: telemetryConstants.response.SUCCESS });
      });
    }
    else {
      telemetryEvents = [Object.assign(Object.assign({}, telemetryDictionary.category[category].action[action]), { response: telemetryConstants.response.FAILURE })];
    }
    telemetryEvents.forEach(event => this.hubTelemetry.emit(event));
  }
  handleEntityEditorChange(evt) {
    this.arcgisHubEntityEditorChange.emit(evt.detail);
  }
  async handleEntityEditorSave(evt) {
    const values = evt.detail;
    let entity = this.entity;
    try {
      this.isSaving = true;
      // save using the editor instance
      entity = await this.editor.save(cloneObject(values), this.editorContext);
      // render a success alert (calcite-alert in top right)
      this.layout !== 'modal' && showNotice({ title: this.intl.t('success'), message: '', configuration: { noticeType: 'alert', autoClose: true, autoCloseDuration: 'fast', icon: true, kind: 'success', label: this.intl.t('formAlert') } });
      // emit success telemetry and the updated entity to the consuming app
      this.emitSaveTelemetry({
        isSuccess: true,
        originalValues: this.values,
        updatedValues: values,
        entity
      });
      this.arcgisHubEntityEditorSaved.emit({ entity, isSuccess: true });
      // update our state's "values" with the updated editor values
      this.values = values;
    }
    catch (error) {
      console.error('Unable to save entity changes:', error);
      // render an error alert (calcite-alert in top right)
      this.layout !== 'modal' && showNotice({ title: this.intl.t('error'), message: '', configuration: { noticeType: 'alert', autoClose: true, autoCloseDuration: 'fast', icon: true, kind: 'danger', label: this.intl.t('formAlert') } });
      // emit error telemetry and the original entity to the consuming app
      // entity needs to be passed in otherwise it errors out and doesn't emit out the saved event
      this.emitSaveTelemetry({ isSuccess: false, entity });
      this.arcgisHubEntityEditorSaved.emit({ entity, isSuccess: false, error });
    }
    finally {
      this.isSaving = false;
    }
  }
  get shouldShowForm() {
    var _a;
    return this.uiSchema
      // Schema has been computed, hide if no elements are present
      ? !!((_a = this.uiSchema.elements) === null || _a === void 0 ? void 0 : _a.length)
      // Schema is still being computed, show for loading state
      : true;
  }
  render() {
    return (h(Host, { "data-element": "entity-editor", unthemed: true }, this.shouldShowForm &&
      h("arcgis-configuration-form", { footerSlotRef: this.footerSlotRef, isCreateForm: this.isCreateForm, isDisabled: this.isDisabled, isLoading: this.isLoading, isOpen: this.isOpen, isSaving: this.isSaving, layout: this.layout, messageOverrides: this._messageOverrides, onArcgisConfigurationFormChanged: this.handleEntityEditorChange, onArcgisConfigurationFormInitialized: this.handleConfigurationInitialized, onArcgisConfigurationFormSaved: this.handleEntityEditorSave, ref: this.setConfigurationFormEl, scale: this.scale, schema: this.schema, t: this.translationFunc, uiSchema: this.uiSchema, values: this.values, variant: this.variant }, h("slot", { name: "header" }), h("slot", { name: "form-start" }))));
  }
  static get is() { return "arcgis-hub-entity-editor"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-editor.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-editor.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
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
          "text": "Hub entity object: site, project, discussion, initiative, etc."
        }
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
      "include": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Enrichments to add to the entity\n\nex: \"followersGroup AS followersGroup\"\nfollowersGroup.access AS _followersGroup.access\""
        }
      },
      "editorType": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "EntityEditorType",
          "resolved": "\"hub:site:create\" | \"hub:site:edit\" | \"hub:site:discussions\" | \"hub:project:create\" | \"hub:project:edit\" | \"hub:initiative:create\" | \"hub:initiative:edit\" | \"hub:content:edit\" | \"hub:group:create\" | \"hub:group:create:view\" | \"hub:group:create:edit\" | \"hub:group:edit\" | \"hub:page:create\" | \"hub:page:edit\" | \"hub:discussion:create\" | \"hub:discussion:edit\" | \"hub:initiativeTemplate:edit\" | \"hub:template:edit\" | \"hub:survey:edit\" | \"hub:event:create\" | \"hub:event:edit\" | \"hub:project:create2\" | \"hub:project:metrics\" | \"hub:project:settings\" | \"hub:content:settings\" | \"hub:content:discussions\" | \"hub:initiative:create2\" | \"hub:initiative:metrics\" | \"hub:initiative:associations\" | \"hub:initiative:settings\" | \"hub:site:followers\" | \"hub:site:settings\" | \"hub:discussion:settings\" | \"hub:group:settings\" | \"hub:group:discussions\" | \"hub:group:create:followers\" | \"hub:group:create:association\" | \"hub:survey:settings\" | \"hub:event:registrants\" | \"hub:user:settings\"",
          "references": {
            "EntityEditorType": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Specifies which uiSchema to dynamically import.\nThis dictates how the form will look in the UI"
        },
        "attribute": "editor-type",
        "reflect": false
      },
      "layout": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "\"fixed\" | \"sticky\" | \"modal\" | \"step\"",
          "resolved": "\"fixed\" | \"modal\" | \"step\" | \"sticky\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates how the entity form should be rendered:\nfixed: on-page form with fixed footer\nsticky: on-page form with sticky footer\nmodal: form is rendered in a calcite modal"
        },
        "attribute": "layout",
        "reflect": false,
        "defaultValue": "\"sticky\""
      },
      "footerSlotRef": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "HTMLElement",
          "resolved": "HTMLElement",
          "references": {
            "HTMLElement": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Specifies where the editor's footer should be slotted.\n\nThis is needed, for example, to slot the editor\nfooter into the \"footer\" slot of workspace panels.\nThis pattern is somewhat specific to the complexities\nof workspace panel styling and should not be\nimplemented liberally"
        }
      },
      "isOpen": {
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
          "text": "If the layout is \"modal\", this prop must be provided\nto open/close the modal"
        },
        "attribute": "is-open",
        "reflect": true
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
              "path": "../arcgis-configuration-editor/resources"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Style variant to render the editor with (optional)"
        },
        "attribute": "variant",
        "reflect": false
      },
      "isDisabled": {
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
          "text": "whether the form's primary button (Save) is disabled"
        },
        "attribute": "is-disabled",
        "reflect": false
      },
      "messageOverrides": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "{ primaryBtnTooltip?: string }",
          "resolved": "{ primaryBtnTooltip?: string; }",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Use this property to override translated strings\nused by this compoennt\nnote: we can add more as necessary"
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
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "isLoading": {},
      "isSaving": {},
      "schema": {},
      "uiSchema": {},
      "values": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubEntityEditorChange",
        "name": "arcgisHubEntityEditorChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IConfigurationValues",
          "resolved": "IConfigurationValues",
          "references": {
            "IConfigurationValues": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }, {
        "method": "arcgisHubEntityEditorSaved",
        "name": "arcgisHubEntityEditorSaved",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IArcgisHubEntityEditorSavedEvent",
          "resolved": "IArcgisHubEntityEditorSavedEvent",
          "references": {
            "IArcgisHubEntityEditorSavedEvent": {
              "location": "import",
              "path": "./types"
            }
          }
        }
      }, {
        "method": "arcgisHubEntityEditorInitialization",
        "name": "arcgisHubEntityEditorInitialization",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "fired from form initialization, receiving the initialization event from the configuration form"
        },
        "complexType": {
          "original": "IConfigurationValues",
          "resolved": "IConfigurationValues",
          "references": {
            "IConfigurationValues": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
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
  static get watchers() {
    return [{
        "propName": "entity",
        "methodName": "handleEntityChanged"
      }];
  }
}
