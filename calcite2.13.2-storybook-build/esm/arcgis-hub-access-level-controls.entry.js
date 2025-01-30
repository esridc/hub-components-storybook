import { r as registerInstance, c as createEvent, h, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './_commonjsHelpers-11ca3be1.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';

const arcgisHubAccessLevelControlsCss = ":host{display:block}";

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
const ArcgisHubAccessLevelControls = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubItemAccessLevelChange = createEvent(this, "arcgisHubItemAccessLevelChange", 7);
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
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubAccessLevelControls.style = arcgisHubAccessLevelControlsCss;

export { ArcgisHubAccessLevelControls as arcgis_hub_access_level_controls };
