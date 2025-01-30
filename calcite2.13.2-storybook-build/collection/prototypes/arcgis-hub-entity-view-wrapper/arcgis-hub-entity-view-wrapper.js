import { fetchHubEntity } from '@esri/hub-common';
import { Host, h, Fragment } from '@stencil/core';
import { getGlobalContext } from '../../utils/state';
export class ArcgisHubEntityViewWrapper {
  constructor() {
    this.entity = undefined;
    this.identifier = "";
    this.type = undefined;
    this.view = "view";
    this.mode = "default";
    this.breadcrumbs = [];
    this.path = "";
    this.loading = true;
  }
  get _context() { return getGlobalContext(); }
  // Listen to the event that tells us to switch to the workspace view
  async onIdentifierChange() {
    await this.loadEntity();
  }
  async loadEntity() {
    this.loading = true;
    if (this.type && this.identifier && this._context) {
      this.entity = await fetchHubEntity(this.type, this.identifier, this._context);
      this.loading = false;
    }
  }
  componentWillLoad() {
    if (this.entity) {
      this.loading = false;
    }
    else {
      if (!this.entity && (this._context && this.identifier && this.type)) {
        this.loadEntity();
      }
    }
  }
  renderLoading() {
    return (h("div", null, "Loading..."));
  }
  onEditClick() {
    this.view = "workspace";
    this.arcgisHubEntityViewWrapperViewChanged.emit("workspace");
  }
  onViewClick() {
    this.view = "view";
    this.arcgisHubEntityViewWrapperViewChanged.emit("view");
  }
  renderContent() {
    return (h(Fragment, null, this.view === "workspace"
      ? this.renderWorkspace()
      : this.renderView()));
  }
  renderWorkspace() {
    return (h("arcgis-hub-workspace", { entity: this.entity, layout: this.mode }));
  }
  renderView() {
    let ViewComponent = "arcgis-hub-entity-view";
    if (this.entity.type === "Group") {
      ViewComponent = "arcgis-hub-entity-view";
    }
    return (h("div", { class: "container" }, h("arcgis-hub-entity-breadcrumbs", { breadcrumbs: this.breadcrumbs }), h(ViewComponent, { entity: this.entity, mode: this.mode, path: this.path })));
  }
  render() {
    return (h(Host, { "data-element": "entity-view-wrapper" }, this.loading ? this.renderLoading() : this.renderContent()));
  }
  static get is() { return "arcgis-hub-entity-view-wrapper"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-view-wrapper.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-view-wrapper.css"]
    };
  }
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
          "text": ""
        }
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
          "text": ""
        },
        "attribute": "identifier",
        "reflect": false,
        "defaultValue": "\"\""
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
          "text": ""
        },
        "attribute": "type",
        "reflect": false
      },
      "view": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "\"view\" | \"workspace\"",
          "resolved": "\"view\" | \"workspace\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "view",
        "reflect": false,
        "defaultValue": "\"view\""
      },
      "mode": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "\"default\" | \"inline\"",
          "resolved": "\"default\" | \"inline\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "mode",
        "reflect": false,
        "defaultValue": "\"default\""
      },
      "breadcrumbs": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubEntityBreadcrumb[]",
          "resolved": "IHubEntityBreadcrumb[]",
          "references": {
            "IHubEntityBreadcrumb": {
              "location": "import",
              "path": "../../components/arcgis-hub-entity-view/arcgis-hub-entity-breadcrumbs/arcgis-hub-entity-breadcrumbs"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "[]"
      },
      "path": {
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
          "text": ""
        },
        "attribute": "path",
        "reflect": false,
        "defaultValue": "\"\""
      }
    };
  }
  static get states() {
    return {
      "loading": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubEntityViewWrapperViewChanged",
        "name": "arcgisHubEntityViewWrapperViewChanged",
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
      }];
  }
  static get watchers() {
    return [{
        "propName": "type",
        "methodName": "onIdentifierChange"
      }, {
        "propName": "identifier",
        "methodName": "onIdentifierChange"
      }];
  }
  static get listeners() {
    return [{
        "name": "arcgisEntityEdit",
        "method": "onEditClick",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisEntityView",
        "method": "onViewClick",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
