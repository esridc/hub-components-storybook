'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const state = require('./state-6637df8c.js');
const dom = require('./dom-e6a9a39e.js');
const fetchHubEntity = require('./fetchHubEntity-88467d55.js');
const getRelativeWorkspaceUrl = require('./getRelativeWorkspaceUrl-6dfbafa1.js');
const util = require('./util-38e73510.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./get-prop-4bd8fc1a.js');
require('./search-2db68ef4.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./append-custom-params-0f5d0fe2.js');
require('./request-67da3c71.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-family-cafa88bb.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./helpers-64227739.js');
require('./generate-random-string-8807d629.js');
require('./get-0368c931.js');
require('./tslib.es6-e7faa7f3.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');
require('./slugify-826af07b.js');
require('./HubError-44e07249.js');
require('./get-with-default-d1b1754d.js');
require('./OperationError-902f34ae.js');
require('./object-to-json-blob-5c0a267d.js');
require('./fail-safe-33c35b7f.js');
require('./delete-prop-7826ae49.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./get-form-json-e6831b20.js');
require('./HubInitiatives-25ecf40a.js');
require('./_enrichments-a40a3850.js');
require('./get-user-5eecc1c4.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getService-b27eda44.js');
require('./types-097b54b1.js');
require('./TemplateBusinessRules-5564c964.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./UserSession-f8bc10c8.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
require('./map-by-a7a75788.js');
require('./tslib.es6-b6cfa7d7.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
require('./hostedServiceUtils-236344a8.js');
require('./is-service-9b8238d2.js');
require('./_deep-map-values-d489006b.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./settings-0b8cd93b.js');
require('./discussions-api-request-e9e6e346.js');
require('./request-79b61e92.js');
require('./fetchContent-963f3885.js');
require('./index-ef80ab27.js');
require('./getLayer-0c83b4c1.js');
require('./hubSearch-79d30702.js');
require('./merge-objects-b31af1a3.js');
require('./get-52661c13.js');
require('./search-b00c4c79.js');
require('./channels-bf478342.js');
require('./events-7873340d.js');
require('./registrations-a6dd52b7.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');
require('./fetch-1292fb6b.js');
require('./getPropertyMap-030ec7b2.js');
require('./types-751ad3a9.js');
require('./getTypeFromEntity-9476954e.js');

const harnessFetchCss = ":host{display:flex;flex-direction:column;gap:1rem}.fetch-inputs{display:flex;gap:0.5rem}calcite-combobox{width:13rem}calcite-input{flex-grow:1}";

const HarnessFetch = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.harnessFetchEntity = index.createEvent(this, "harnessFetchEntity", 7);
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
      this._slottedElements = dom.slotChangeGetAssignedElements(evt);
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
    this._context = state.getGlobalContext();
    this._identifier = undefined;
    this._type = undefined;
    this._slottedElements = [];
  }
  async fetchEntity() {
    try {
      // 1. fetch the entity
      const entity = await fetchHubEntity.fetchHubEntity(this._type, this._identifier, this._context);
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
    return (index.h("calcite-combobox", { clearDisabled: true, onCalciteComboboxChange: this.handleTypeChange, overlayPositioning: "fixed", placeholder: "Select an entity type...", selectionMode: "single" }, getRelativeWorkspaceUrl.HUB_ENTITY_TYPES.map(type => {
      return (index.h("calcite-combobox-item", { heading: util.capitalize(type), key: type, label: util.capitalize(type), selected: type === this._type, textLabel: util.capitalize(type), value: type }));
    })));
  }
  renderIdentifierInput() {
    return (index.h("calcite-input", { onCalciteInputChange: this.handleIdentifierChange, placeholer: "Enter an entity identifier (id or slug)...", value: this._identifier }, index.h("calcite-button", { slot: "action" }, "GO")));
  }
  render() {
    return (index.h(index.Host, null, (this.showTypeInput || this.showIdentifierInput) && (index.h("div", { class: "fetch-inputs" }, this.showTypeInput && this.renderTypeInput(), this.showIdentifierInput && this.renderIdentifierInput())), index.h("slot", { onSlotchange: this.handleSlotChange })));
  }
  static get watchers() { return {
    "_identifier": ["fetchEntity"],
    "_type": ["fetchEntity"],
    "_slottedElements": ["fetchEntity"]
  }; }
};
HarnessFetch.style = harnessFetchCss;

exports.harness_fetch = HarnessFetch;
