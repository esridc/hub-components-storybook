'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const state = require('./state-6637df8c.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');

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
    index.registerInstance(this, hostRef);
    this.arcgisHubItemAccessLevelChange = index.createEvent(this, "arcgisHubItemAccessLevelChange", 7);
    this.updateAccessLevel = (evt) => {
      const { access } = evt.detail.values;
      evt.stopPropagation();
      this.arcgisHubItemAccessLevelChange.emit(access);
    };
    this.accessLevel = undefined;
    this.orgName = undefined;
    this.itemType = undefined;
  }
  get _context() { return state.getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
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
    return (index.h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.updateAccessLevel, schema: this.schema, uiSchema: this.uiSchema, values: this.values }));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubAccessLevelControls.style = arcgisHubAccessLevelControlsCss;

exports.arcgis_hub_access_level_controls = ArcgisHubAccessLevelControls;
