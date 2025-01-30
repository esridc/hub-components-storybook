import { Host, h } from '@stencil/core';
import { flattenArray } from '@esri/hub-common';
import intlManager from '../../utils/intl-manager';
import { bind } from '../../utils/context';
import { dictionary } from '@esri/telemetry-dictionary-hub';
/**
 * This component allows the users to pick items from
 * a gallery like modal. It supports all types of entities.
 * To ensure this component works on all browsers (esp Safari),
 * we need to wrap this component with the `arcgis-wormhole`
 * component. Because of some strange styling issue(e.g. the modal
 * styling not being transported in the wormhole), we have wrap
 * the gallery picker component instead the calcite-modal with
 * `arcgis-wormhole`
 */
export class ArcgisHubGalleryPicker {
  constructor() {
    this._gallerySelection = {};
    this.modalTitle = undefined;
    this.open = false;
    this.limit = 100;
    this.catalogs = undefined;
    this.facets = undefined;
    this.gallerySelection = undefined;
    this.showSelection = true;
    this.showBadges = undefined;
    this.showSearch = undefined;
    this.showThumbnail = undefined;
    this.showFacetForSingleCatalog = undefined;
    this.sortOptions = undefined;
    this.sortField = null;
    this.sourceLabel = undefined;
    this.primaryButtonLabel = undefined;
    this.callback = undefined;
    this.selectionMode = 'multiple';
    this.linkTarget = undefined;
    this.modalOptions = {};
    this.count = 0;
    bind(this, 'handleGalleryPickerOpen', 'handleGalleryPickerClose', 'handleGalleryPickerAdd');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    // Get the count if there are any existing selections in the consuming app
    if (this.gallerySelection) {
      this._gallerySelection = this.gallerySelection;
      this.count = flattenArray(Object.values(this._gallerySelection)).length;
    }
  }
  handleHubGallerySelect(event) {
    event.preventDefault();
    this._gallerySelection = Object.assign(this._gallerySelection, event.detail);
    this.count = flattenArray(Object.values(this._gallerySelection)).length;
  }
  /** parse the target entity from the first catalog collection. We need this
   * for telemetry logging purposes */
  get targetEntity() {
    var _a, _b, _c, _d;
    return ((_d = (_c = (_b = (_a = this.catalogs) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.collections) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.targetEntity) || 'item';
  }
  handleGalleryPickerClose(event) {
    event.preventDefault();
    this.open = false;
    this.arcgisHubGalleryPickerClose.emit();
    const telemetryDetails = { item: "addContent", group: "addGroups", user: "addUsers", communityUser: "addUsers", channel: "addChannels" }[this.targetEntity] || 'addContent';
    this.hubTelemetry.emit(dictionary.category.interaction.action.close.label.modal.details[telemetryDetails]);
  }
  handleGalleryPickerOpen(event) {
    event.preventDefault();
    this.open = true;
    const telemetryDetails = { item: "addContent", group: "addGroups", user: "addUsers", communityUser: "addUsers", channel: "addChannels" }[this.targetEntity] || 'addContent';
    this.hubTelemetry.emit(dictionary.category.interaction.action.open.label.modal.details[telemetryDetails]);
  }
  handleGalleryPickerAdd(event) {
    event.preventDefault();
    this.open = false;
    this.arcgisHubGalleryPickerSelectionUpdate.emit(this._gallerySelection);
    this.arcgisHubGalleryPickerClose.emit();
    const telemetryLabel = { item: "content", group: "groups", user: "users", communityUser: "users", channel: "channel" }[this.targetEntity] || 'content';
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action.add.label[telemetryLabel]), { count: this.count }));
  }
  render() {
    // Only renders when the picker is open so the gallery does not fire the search request despite not
    // being rendered in the UI
    return this.open ? (h(Host, { "data-element": "gallery-picker" }, h("calcite-modal", { "data-element": "modal", onCalciteModalClose: this.handleGalleryPickerClose, onCalciteModalOpen: this.handleGalleryPickerOpen, open: this.open, "width-scale": this.modalOptions.widthScale }, h("div", { slot: "header" }, this.modalTitle), h("div", { slot: "content" }, h("arcgis-hub-catalog", { callback: this.callback, catalogs: this.catalogs, facets: this.facets, gallerySelection: this._gallerySelection, linkTarget: this.linkTarget, newTab: true, selectionMode: this.selectionMode, showBadges: this.showBadges, showFacetForSingleCatalog: this.showFacetForSingleCatalog, showSearch: this.showSearch, showSelection: this.showSelection, showThumbnail: this.showThumbnail, sortField: this.sortField, sortOptions: this.sortOptions, sourceLabel: this.sourceLabel })), h("div", { class: this.count > this.limit ? 'warning' : '', slot: 'back' }, h("calcite-label", null, this.intl.t('selected', { count: this.count, limit: this.limit }))), h("calcite-button", { appearance: "outline", onClick: this.handleGalleryPickerClose, slot: "secondary", width: "full" }, this.intl.t('cancel')), h("calcite-button", { disabled: this.count <= 0 || this.count > this.limit, onClick: this.handleGalleryPickerAdd, slot: "primary", width: "full" }, this.primaryButtonLabel || this.intl.t('add'))))) : undefined;
  }
  static get is() { return "arcgis-hub-gallery-picker"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-gallery-picker.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-gallery-picker.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "modalTitle": {
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
          "text": "Title shown in the header of the picker"
        },
        "attribute": "modal-title",
        "reflect": false
      },
      "open": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Whether the picker modal is open"
        },
        "attribute": "open",
        "reflect": false,
        "defaultValue": "false"
      },
      "limit": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The max number of selection allowed"
        },
        "attribute": "limit",
        "reflect": false,
        "defaultValue": "100"
      },
      "catalogs": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubCatalog[] | string[]",
          "resolved": "IHubCatalog[] | string[]",
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
          "text": "Catalogs that the picker uses to generate the gallery"
        }
      },
      "facets": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IFacet[]",
          "resolved": "IFacet[]",
          "references": {
            "IFacet": {
              "location": "import",
              "path": "../../utils/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Facets to show in the picker"
        }
      },
      "gallerySelection": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IGallerySelection",
          "resolved": "{ item?: string[]; event?: string[]; group?: string[]; user?: string[]; portalUser?: string[]; communityUser?: string[]; groupMember?: string[]; channel?: string[]; discussionPost?: string[]; eventAttendee?: string[]; }",
          "references": {
            "IGallerySelection": {
              "location": "import",
              "path": "../../utils/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Collection of selected entity IDs as an IGallerySelection object"
        }
      },
      "showSelection": {
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
          "text": "Whether to show the entities in the `gallerySelection` in the gallery"
        },
        "attribute": "show-selection",
        "reflect": false,
        "defaultValue": "true"
      },
      "showBadges": {
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
        "attribute": "show-badges",
        "reflect": false
      },
      "showSearch": {
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
          "text": "Whether to show/hide search input in the gallery"
        },
        "attribute": "show-search",
        "reflect": false
      },
      "showThumbnail": {
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
          "text": "Whether to show/hide thumbnail in the gallery"
        },
        "attribute": "show-thumbnail",
        "reflect": false
      },
      "showFacetForSingleCatalog": {
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
          "text": "Whether to show/hide catalog facets\nif undefined, will be hidden when there is only one catalog\n(see arcgis-hub-catalog)"
        },
        "attribute": "show-facet-for-single-catalog",
        "reflect": false
      },
      "sortOptions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "SortOption[]",
          "resolved": "SortOption[]",
          "references": {
            "SortOption": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "A list of sort options for the sort field"
        }
      },
      "sortField": {
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
          "text": "Default sort field. Null indicates that no sorting should be applied to the initial search requests."
        },
        "attribute": "sort-field",
        "reflect": false,
        "defaultValue": "null"
      },
      "sourceLabel": {
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
          "text": "label for the catalog facets - defaults to \"Source\""
        },
        "attribute": "source-label",
        "reflect": false
      },
      "primaryButtonLabel": {
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
          "text": "label for the primary button in the picker footer - defaults to \"Add\""
        },
        "attribute": "primary-button-label",
        "reflect": false
      },
      "callback": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "CardViewModelCallback",
          "resolved": "(model: IHubCardViewModel, layout: CardLayout, context: IArcGISContext, result: HubEntity | IHubSearchResult) => IHubCardViewModel",
          "references": {
            "CardViewModelCallback": {
              "location": "import",
              "path": "../../utils/cardModelConverters/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Passing a callback function into the gallery-picker allows the developer to apply custom\nbusiness logic to the processing of the Card View model. This is useful in scenarios\nwhere we want to show non-standard metadata, badges, actions and to apply logic to\nthe selectability of the card."
        }
      },
      "selectionMode": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "\"none\" | \"multiple\" | \"single\"",
          "resolved": "\"multiple\" | \"none\" | \"single\"",
          "references": {
            "SelectionMode": {
              "location": "import",
              "path": "../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "selection-mode",
        "reflect": false,
        "defaultValue": "'multiple' as SelectionMode"
      },
      "linkTarget": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "CardModelTarget",
          "resolved": "\"event\" | \"none\" | \"self\" | \"siteRelative\" | \"workspaceRelative\"",
          "references": {
            "CardModelTarget": {
              "location": "import",
              "path": "../../utils/cardModelConverters/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "indicates where the card should redirect"
        },
        "attribute": "link-target",
        "reflect": false
      },
      "modalOptions": {
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
          "text": "options to change the appearace of the gallery-picker calcite-modal"
        },
        "defaultValue": "{}"
      }
    };
  }
  static get states() {
    return {
      "count": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubGalleryPickerSelectionUpdate",
        "name": "arcgisHubGalleryPickerSelectionUpdate",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event that's fired when the \"Add\" button is clicked"
        },
        "complexType": {
          "original": "IGallerySelection",
          "resolved": "{ item?: string[]; event?: string[]; group?: string[]; user?: string[]; portalUser?: string[]; communityUser?: string[]; groupMember?: string[]; channel?: string[]; discussionPost?: string[]; eventAttendee?: string[]; }",
          "references": {
            "IGallerySelection": {
              "location": "import",
              "path": "../../utils/types"
            }
          }
        }
      }, {
        "method": "arcgisHubGalleryPickerClose",
        "name": "arcgisHubGalleryPickerClose",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
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
          "original": "Record<string, any>",
          "resolved": "{ [x: string]: any; }",
          "references": {
            "Record": {
              "location": "global"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get listeners() {
    return [{
        "name": "arcgisHubGallerySelect",
        "method": "handleHubGallerySelect",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
