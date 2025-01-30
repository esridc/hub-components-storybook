import { r as registerInstance, c as createEvent, h, H as Host } from './index-57f71b44.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { s as slotChangeGetAssignedElements } from './dom-e1e6c513.js';
import { f as fetchHubEntity } from './fetchHubEntity-28d04ab4.js';
import { H as HUB_ENTITY_TYPES } from './getRelativeWorkspaceUrl-ac123b7f.js';
import { b as capitalize } from './util-3e6872d9.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './_commonjsHelpers-11ca3be1.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './get-prop-ec5be510.js';
import './search-c7a57aa9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './append-custom-params-4bd856e5.js';
import './request-fa80ae40.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './helpers-8c7e5e31.js';
import './generate-random-string-1436d9e6.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
import './slugify-e3e67bac.js';
import './HubError-e26c5610.js';
import './get-with-default-b819d95d.js';
import './OperationError-387ae9ab.js';
import './object-to-json-blob-583ae5c3.js';
import './fail-safe-cd1a5a2a.js';
import './delete-prop-bd13d424.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './get-form-json-1d4e3591.js';
import './HubInitiatives-4f4e24ce.js';
import './_enrichments-8641475c.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './types-2eaa1a18.js';
import './TemplateBusinessRules-0e35d61b.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './map-by-a2234e13.js';
import './tslib.es6-9c17e83a.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
import './hostedServiceUtils-f22b023b.js';
import './is-service-ad021db8.js';
import './_deep-map-values-53f8dbd1.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './settings-2d4e159a.js';
import './discussions-api-request-199cae2d.js';
import './request-3e386aeb.js';
import './fetchContent-dbc662af.js';
import './index-edff2d62.js';
import './getLayer-464ff70e.js';
import './hubSearch-41612481.js';
import './merge-objects-5b123ab3.js';
import './get-850c466d.js';
import './search-211dee83.js';
import './channels-2574fd6e.js';
import './events-c59246f8.js';
import './registrations-431b9788.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';
import './fetch-63549ae7.js';
import './getPropertyMap-10ee9d61.js';
import './types-db540898.js';
import './getTypeFromEntity-e149b61e.js';

const harnessFetchCss = ":host{display:flex;flex-direction:column;gap:1rem}.fetch-inputs{display:flex;gap:0.5rem}calcite-combobox{width:13rem}calcite-input{flex-grow:1}";

const HarnessFetch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.harnessFetchEntity = createEvent(this, "harnessFetchEntity", 7);
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
  static get watchers() { return {
    "_identifier": ["fetchEntity"],
    "_type": ["fetchEntity"],
    "_slottedElements": ["fetchEntity"]
  }; }
};
HarnessFetch.style = harnessFetchCss;

export { HarnessFetch as harness_fetch };
