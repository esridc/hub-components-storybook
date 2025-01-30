import { HUB_ENTITY_TYPES, capitalize, fetchHubEntity } from '@esri/hub-common';
import { Host, h } from '@stencil/core';
import { getGlobalContext } from '../../utils/state';
import { slotChangeGetAssignedElements } from '../../utils/dom';
/**
 * The harness-fetch component is meant for use in dev harnesses
 * that require a full hub entity to be passed into their component.
 * This component accepts an identifier (id or slug) and type, and
 * will fetch the corresponding entity which it will:
 *
 * 1. emit in an event that a consuming harness can listen for
 * 2. pass into any slotted content
 */
export class HarnessFetch {
  constructor() {
    /** append an "identifier" query param to the URL */
    this.handleIdentifierChange = (evt) => {
      const identifier = evt.target.value;
      this.setIdentifier(identifier);
    };
    /** append a "type" query param to the URL */
    this.handleTypeChange = (evt) => {
      const type = evt.target.value;
      this.appendParams(Object.assign({ type }, (this.defaults && this.defaults[type] && { identifier: this.defaults[type] })));
      this._type = type;
      if (this.defaults && this.defaults[type]) {
        this._identifier = this.defaults[type];
      }
    };
    /**
     * grab a reference to the slotted content so we can pass
     * the entity in once it's fetched
     */
    this.handleSlotChange = (evt) => {
      this._slottedElements = slotChangeGetAssignedElements(evt);
    };
    /**
     * helper function to append query params to the url
     *
     * note: normally this is not something a component
     * should handle, but since this is meant for harnesses
     * only, it takes away some of the burden on devs to
     * need to hook this up in their harness
     */
    this.appendParams = (params) => {
      const url = new URL(window.location.href);
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
      window.location.search = url.search;
    };
    this.entityProp = undefined;
    this.identifier = undefined;
    this.type = undefined;
    this.defaults = undefined;
    this.showIdentifierInput = undefined;
    this.showTypeInput = undefined;
    this._context = getGlobalContext();
    this._identifier = undefined;
    this._type = undefined;
    this._slottedElements = [];
  }
  async fetchEntity() {
    try {
      // 1. fetch the entity
      const entity = await fetchHubEntity(this._type, this._identifier, this._context);
      // 2. emit the entity for consuming harnesses (just a nice-to-have)
      this.harnessFetchEntity.emit(entity);
      // 3. pass the entity into the slotted content
      this._slottedElements.forEach(el => {
        el[this.entityProp] = entity;
      });
    }
    catch (error) {
      console.error(`harness-fetch: error fetching entity ${this._identifier}`);
    }
  }
  async componentWillLoad() {
    const params = new URL(window.location.href).searchParams;
    this._identifier = params.get('identifier') || this.identifier;
    this._type = params.get('type') || this.type;
    await this.fetchEntity();
  }
  async setIdentifier(identifier) {
    this.appendParams({ identifier });
    this._identifier = identifier;
  }
  renderTypeInput() {
    return (h("calcite-combobox", { clearDisabled: true, onCalciteComboboxChange: this.handleTypeChange, overlayPositioning: "fixed", placeholder: "Select an entity type...", selectionMode: "single" }, HUB_ENTITY_TYPES.map(type => {
      return (h("calcite-combobox-item", { heading: capitalize(type), key: type, label: capitalize(type), selected: type === this._type, textLabel: capitalize(type), value: type }));
    })));
  }
  renderIdentifierInput() {
    return (h("calcite-input", { onCalciteInputChange: this.handleIdentifierChange, placeholer: "Enter an entity identifier (id or slug)...", value: this._identifier }, h("calcite-button", { slot: "action" }, "GO")));
  }
  render() {
    return (h(Host, null, (this.showTypeInput || this.showIdentifierInput) && (h("div", { class: "fetch-inputs" }, this.showTypeInput && this.renderTypeInput(), this.showIdentifierInput && this.renderIdentifierInput())), h("slot", { onSlotchange: this.handleSlotChange })));
  }
  static get is() { return "harness-fetch"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["harness-fetch.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["harness-fetch.css"]
    };
  }
  static get properties() {
    return {
      "entityProp": {
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
          "text": "prop name on the slotted content to pass the\nfull entity into"
        },
        "attribute": "entity-prop",
        "reflect": false
      },
      "identifier": {
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
          "text": "hub entity id or slug"
        },
        "attribute": "identifier",
        "reflect": false
      },
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "HubEntityType",
          "resolved": "\"content\" | \"discussion\" | \"event\" | \"group\" | \"initiative\" | \"initiativeTemplate\" | \"org\" | \"page\" | \"project\" | \"site\" | \"survey\" | \"template\" | \"user\"",
          "references": {
            "HubEntityType": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "hub entity type"
        },
        "attribute": "type",
        "reflect": false
      },
      "defaults": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Record<HubEntityType, string>",
          "resolved": "{ template: string; content: string; discussion: string; event: string; group: string; initiative: string; initiativeTemplate: string; org: string; page: string; project: string; site: string; survey: string; user: string; }",
          "references": {
            "Record": {
              "location": "global"
            },
            "HubEntityType": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "default entity identifiers"
        }
      },
      "showIdentifierInput": {
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
          "text": "whether to render the identifier input field"
        },
        "attribute": "show-identifier-input",
        "reflect": false
      },
      "showTypeInput": {
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
          "text": "whether to render the type input field"
        },
        "attribute": "show-type-input",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "_context": {},
      "_identifier": {},
      "_type": {},
      "_slottedElements": {}
    };
  }
  static get events() {
    return [{
        "method": "harnessFetchEntity",
        "name": "harnessFetchEntity",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event containing the full entity once it's been fetched"
        },
        "complexType": {
          "original": "HubEntity",
          "resolved": "IHubDiscussion | IHubEvent | IHubGroup | IHubInitiative | IHubPage | IHubProject | IHubSite | IHubSurvey | IHubTemplate | IHubUser",
          "references": {
            "HubEntity": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "fetchEntity": {
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
          "text": "",
          "tags": []
        }
      },
      "setIdentifier": {
        "complexType": {
          "signature": "(identifier: string) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
  static get watchers() {
    return [{
        "propName": "_identifier",
        "methodName": "fetchEntity"
      }, {
        "propName": "_type",
        "methodName": "fetchEntity"
      }, {
        "propName": "_slottedElements",
        "methodName": "fetchEntity"
      }];
  }
}
