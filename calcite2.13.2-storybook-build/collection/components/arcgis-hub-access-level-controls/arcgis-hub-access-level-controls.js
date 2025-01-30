import { h } from "@stencil/core";
import intlManager from "../../utils/intl-manager";
import { getGlobalContext } from '../../utils/state';
var ACCESS_LEVEL;
(function (ACCESS_LEVEL) {
  ACCESS_LEVEL["PUBLIC"] = "public";
  ACCESS_LEVEL["ORG"] = "org";
  ACCESS_LEVEL["PRIVATE"] = "private";
})(ACCESS_LEVEL || (ACCESS_LEVEL = {}));
// default strings
const DEFAULT_STRINGS = {
  public: 'public',
  publicInfo: 'publicInfo',
  organization: 'organization',
  organizationInfo: 'organizationInfo',
  owner: 'owner',
  ownerInfo: 'ownerInfo',
};
// item-specific string overrides
const STRING_OVERRIDES_BY_TYPE = {
  discussion: ['publicInfo', 'organization', 'organizationInfo', 'owner', 'ownerInfo'],
};
export class ArcgisHubAccessLevelControls {
  constructor() {
    this.updateAccessLevel = (evt) => {
      const { access } = evt.detail.values;
      evt.stopPropagation();
      this.arcgisHubItemAccessLevelChange.emit(access);
    };
    this.accessLevel = undefined;
    this.orgName = undefined;
    this.itemType = undefined;
  }
  get _context() { return getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  get values() {
    return {
      access: this.accessLevel
    };
  }
  get canShareToPublic() {
    var _a, _b, _c;
    return (_c = (_b = (_a = this._context) === null || _a === void 0 ? void 0 : _a.currentUser) === null || _b === void 0 ? void 0 : _b.privileges) === null || _c === void 0 ? void 0 : _c.includes('portal:user:shareToPublic');
  }
  get canShareToOrg() {
    var _a, _b, _c;
    return (_c = (_b = (_a = this._context) === null || _a === void 0 ? void 0 : _a.currentUser) === null || _b === void 0 ? void 0 : _b.privileges) === null || _c === void 0 ? void 0 : _c.includes('portal:user:shareToOrg');
  }
  get schema() {
    return {
      type: 'object',
      properties: {
        access: {
          type: 'string',
          enum: [ACCESS_LEVEL.PUBLIC, ACCESS_LEVEL.ORG, ACCESS_LEVEL.PRIVATE]
        }
      }
    };
  }
  get strings() {
    var _a;
    const overrides = (_a = STRING_OVERRIDES_BY_TYPE[this.itemType]) !== null && _a !== void 0 ? _a : [];
    return Object.assign(Object.assign({}, DEFAULT_STRINGS), overrides.reduce((acc, override) => (Object.assign(Object.assign({}, acc), { [override]: [this.itemType, override].join('.') })), {}));
  }
  get uiSchema() {
    const { strings } = this;
    return {
      type: 'Layout',
      elements: [
        {
          scope: '/properties/access',
          type: 'Control',
          options: {
            control: "hub-field-input-tile-select",
            layout: "vertical",
            labels: [
              this.intl.t(strings.public),
              this.intl.t(strings.organization),
              this.intl.t(strings.owner)
            ],
            descriptions: [
              this.intl.t(strings.publicInfo, { itemType: this.itemType }),
              this.intl.t(strings.organizationInfo, { orgName: this.orgName, itemType: this.itemType }),
              this.intl.t(strings.ownerInfo, { itemType: this.itemType })
            ],
            icons: ["globe", "organization", "user"],
            type: "radio",
            disabled: [!this.canShareToPublic, !this.canShareToOrg, false]
          }
        }
      ]
    };
  }
  render() {
    return (h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.updateAccessLevel, schema: this.schema, uiSchema: this.uiSchema, values: this.values }));
  }
  static get is() { return "arcgis-hub-access-level-controls"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-access-level-controls.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-access-level-controls.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "accessLevel": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "ACCESS_LEVEL",
          "resolved": "ACCESS_LEVEL.ORG | ACCESS_LEVEL.PRIVATE | ACCESS_LEVEL.PUBLIC",
          "references": {
            "ACCESS_LEVEL": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Access Level that the item will be shared to. (public, org, or private)"
        },
        "attribute": "access-level",
        "reflect": false
      },
      "orgName": {
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
          "text": "Org name for the org string"
        },
        "attribute": "org-name",
        "reflect": false
      },
      "itemType": {
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
          "text": "What type of item is having its access level set"
        },
        "attribute": "item-type",
        "reflect": false
      }
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubItemAccessLevelChange",
        "name": "arcgisHubItemAccessLevelChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event emits the access level when it is changed."
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
}
