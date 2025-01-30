import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { b as bind } from './context-7d8f7366.js';
import { d as dist } from './index-dd3f99ac.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import './store-0a6cb79f.js';
import { r as redirectToExternalUrl } from './urls-0e36649d.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import './index-213c70d0.js';
import './_commonjsHelpers-11ca3be1.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './extent-34a4ba2a.js';
import './request-fa80ae40.js';
import './helpers-8c7e5e31.js';
import './getTypeFromEntity-e149b61e.js';
import './logger-f8667200.js';

const FIELD_ICONS = {
  title: 'title',
  string: 'string',
  label: 'label',
  number: 'number',
  percent: 'percent',
  measure: 'measure',
  credits: 'credits',
  fingerprint: 'fingerprint',
  phone: 'phone',
  emailAddress: 'email-address',
  switch: 'switch',
  toggle: 'toggle',
  pin: 'pin',
  point: 'point',
  calendar: 'calendar',
  vertexCheck: 'vertex-check',
  fileText: 'file-text',
};
const FIELD_MAP = {
  nameOrTitle: {
    icon: FIELD_ICONS.title,
    text: 'nameTitle'
  },
  description: {
    icon: FIELD_ICONS.string,
    text: 'description'
  },
  typeOrCategory: {
    icon: FIELD_ICONS.label,
    text: 'category'
  },
  countOrAmount: {
    icon: FIELD_ICONS.number,
    text: 'amount'
  },
  percentageOrRatio: {
    icon: FIELD_ICONS.percent,
    text: 'percentage'
  },
  measurement: {
    icon: FIELD_ICONS.measure,
    text: 'measurement'
  },
  currency: {
    icon: FIELD_ICONS.credits,
    text: 'currency'
  },
  uniqueIdentifier: {
    icon: FIELD_ICONS.fingerprint,
    text: 'identifier'
  },
  phoneNumber: {
    icon: FIELD_ICONS.phone,
    text: 'phone'
  },
  emailAddress: {
    icon: FIELD_ICONS.emailAddress,
    text: 'email'
  },
  orderedOrRanked: {
    icon: FIELD_ICONS.switch,
    text: 'ordered'
  },
  binary: {
    icon: FIELD_ICONS.toggle,
    text: 'binary'
  },
  locationOrPlaceName: {
    icon: FIELD_ICONS.pin,
    text: 'placename'
  },
  coordinate: {
    icon: FIELD_ICONS.point,
    text: 'coordinate'
  },
  dateAndTime: {
    icon: FIELD_ICONS.calendar,
    text: 'datetime'
  },
  esriFieldTypeSmallInteger: {
    icon: FIELD_ICONS.number,
    text: 'shortInt'
  },
  esriFieldTypeInteger: {
    icon: FIELD_ICONS.number,
    text: 'longInt'
  },
  esriFieldTypeSingle: {
    icon: FIELD_ICONS.number,
    text: 'singleNum'
  },
  esriFieldTypeDouble: {
    icon: FIELD_ICONS.number,
    text: 'doubleNum'
  },
  esriFieldTypeString: {
    icon: FIELD_ICONS.string,
    text: 'charString'
  },
  esriFieldTypeDate: {
    icon: FIELD_ICONS.calendar,
    text: 'date'
  },
  esriFieldTypeOID: {
    icon: FIELD_ICONS.fingerprint,
    text: 'idInteger'
  },
  esriFieldTypeGeometry: {
    icon: FIELD_ICONS.vertexCheck,
    text: 'geometry'
  },
  esriFieldTypeBlob: {
    icon: FIELD_ICONS.fileText,
    text: 'blobObject'
  },
  esriFieldTypeRaster: {
    icon: FIELD_ICONS.string,
    text: 'raster'
  },
  esriFieldTypeGUID: {
    icon: FIELD_ICONS.fingerprint,
    text: 'guid'
  },
  esriFieldTypeGlobalID: {
    icon: FIELD_ICONS.fingerprint,
    text: 'esriId'
  },
  esriFieldTypeXML: {
    icon: FIELD_ICONS.string,
    text: 'xml'
  },
};

const arcgisHubAttributesListCss = ":host {\n  display: block;\n  container-type: inline-size\n}\n\n.header {\n  margin-bottom: 1rem;\n  display: flex;\n  justify-content: space-between\n}\n\n@container (width < 500px) {\n  .header {\n    flex-direction: column\n  }\n}\n\n.header header {\n  font-size: var(--calcite-font-size-1);\n  line-height: 1.5rem;\n  font-weight: var(--calcite-font-weight-bold)\n}\n\ncalcite-label {\n  margin-top: 0.25rem;\n  display: block\n}\n\ncalcite-label:first-child {\n  margin-top: 0.75rem\n}\n\ncalcite-label span {\n  font-weight: var(--calcite-font-weight-bold)\n}\n\ncalcite-label div {\n  line-height: 1.375\n}\n\ncalcite-tabs {\n  margin-top: 0.25rem\n}\n\ncalcite-accordion + calcite-link {\n  margin-top: 0.5rem;\n  display: inline-block\n}";

var FieldTab;
(function (FieldTab) {
  FieldTab["Chart"] = "Chart";
  FieldTab["Table"] = "Table";
})(FieldTab || (FieldTab = {}));
const ArcgisHubAttributesList = class {
  /**
   * Pre-binds method context
   * @constructor
   */
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.arcgisHubAttributesListAccordionChange = createEvent(this, "arcgisHubAttributesListAccordionChange", 7);
    /**
     * Internally managed field states
     */
    this.fieldTabStates = {};
    /**
     * Default selected tab
     */
    this.defaultFieldTab = FieldTab.Chart;
    this.content = undefined;
    this.fields = undefined;
    this.maxFields = 10;
    this.parsedFields = [];
    bind(this, 'handleLearnMoreClick', 'handleLoadMoreClick', 'handleTabChange', 'renderChartSlot', 'renderTableSlot', 'renderAccordionItem');
  }
  handleContentUpdated(content) {
    this.parseFields(content, this.fields);
  }
  handleFieldsUpdated(fields) {
    this.parseFields(this.content, fields);
  }
  /**
   * Component setup
   */
  async componentWillLoad() {
    this.parseFields(this.content, this.fields);
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Handles clicks to the Learn about charts link
   * @param evt A PointerEvent
   */
  handleLearnMoreClick(evt) {
    evt.preventDefault();
    const { href } = evt.target;
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.navigation.action.external.label.webHelp), { details: href }));
    // allow time for telemetry event to bubble up the DOM
    setTimeout(() => {
      redirectToExternalUrl(href);
    }, 100);
  }
  /**
   * Handles clicks to the Load More button
   * @param evt A PointerEvent
   */
  handleLoadMoreClick(evt) {
    evt.preventDefault();
    this.hubTelemetry.emit(dist.dictionary.category.interaction.action.search.label.loadMore.details.attributes);
    this.maxFields = this.parsedFields.length;
  }
  /**
   * Emits the appropriate telemetry for calcite-accordion state changes
   * @param evt A CustomEvent<{ requestedAccordionItem: HTMLCalciteAccordionItemElement }>
   */
  handleAccordionChange(evt) {
    const { expanded, dataset: { fieldName } } = evt.detail.requestedAccordionItem;
    // the accordion item `expanded` prop still reflects the previous state
    // at the time this event is handled so need to inverse the logic to
    // log the correct telemetry event
    const data = expanded
      ? dist.dictionary.category.interaction.action.close.label.accordion.details.attribute
      : dist.dictionary.category.interaction.action.open.label.accordion.details.attribute;
    this.arcgisHubAttributesListAccordionChange.emit({
      fieldName,
      expanded: !expanded
    });
    this.hubTelemetry.emit(data);
  }
  /**
   * Parses the field data
   * @param content An IHubContent object
   * @param fields An Array of fields
   */
  parseFields(content, fields) {
    if (content && fields) {
      const transform = (str) => {
        if (str) {
          const trimmed = str.trim();
          return trimmed === '/' ? '' : trimmed;
        }
      };
      this.parsedFields = fields.map(field => {
        const rawField = content.layer.fields.find(({ name }) => name === field.name);
        let description;
        try {
          const parsedDescription = JSON.parse(rawField.description);
          description = {
            value: transform(parsedDescription.value),
            fieldValueType: transform(parsedDescription.fieldValueType),
          };
        }
        catch (e) {
          description = null;
        }
        return {
          alias: transform(field.alias),
          type: field.type,
          description,
          name: field.name,
          chartable: field.chartable,
        };
      });
    }
    else {
      this.parsedFields = [];
    }
  }
  /**
   * Emits the appropriate telemetry for tab changes
   * @param evt A CustomEvent<TabChangeEventDetail>
   */
  handleTabChange(evt) {
    const target = evt.target;
    const tab = target.tab;
    const fieldName = target.parentElement.dataset.fieldName;
    const { [fieldName]: previousValue = this.defaultFieldTab } = this.fieldTabStates;
    if (previousValue !== tab) {
      this.fieldTabStates = Object.assign(Object.assign({}, this.fieldTabStates), { [fieldName]: tab });
      const { telemetry } = this.tabs.find(({ type }) => type === tab);
      this.hubTelemetry.emit(telemetry);
    }
  }
  /**
   * Computes the fields to render
   * @returns IParsedField[]
   */
  get fieldsToRender() {
    const { maxFields, parsedFields } = this;
    return parsedFields.reduce((fields, field, idx) => (idx < maxFields ? [...fields, field] : fields), []);
  }
  /**
   * Computes if the Load More button should display
   * @returns boolean
   */
  get shouldRenderLoadMore() {
    return this.parsedFields.length > this.maxFields;
  }
  /**
   * Computes the tab configs
   * @returns Array of tab configs
   */
  get tabs() {
    return [
      {
        type: FieldTab.Chart,
        title: 'firstTab',
        telemetry: dist.dictionary.category.navigation.action.onPage.label.chart,
        renderSlot: this.renderChartSlot,
      },
      {
        type: FieldTab.Table,
        title: 'secTab',
        telemetry: dist.dictionary.category.navigation.action.onPage.label.table,
        renderSlot: this.renderTableSlot,
      },
    ];
  }
  /**
   * Renders the header
   * @returns HTMLDivElement
   */
  renderHeader() {
    return (h("div", { class: "header" }, h("header", null, this.intl.t('header')), h("calcite-link", { href: "https://doc.arcgis.com/en/hub/content/explore-content.htm", "icon-end": "launch", onClick: this.handleLearnMoreClick }, this.intl.t('learn'))));
  }
  /**
   * Renders the calcite-accordion
   * @returns HTMLCalciteAccordionElement
   */
  renderAccordion() {
    return h("calcite-accordion", { appearance: "transparent", scale: "l" }, this.fieldsToRender.map(this.renderAccordionItem));
  }
  /**
   * Renders a calcite-accordion-item for the given field
   * @param field The field
   * @param idx The field index
   * @returns HTMLCalciteAccordionItemElement
   */
  renderAccordionItem(field) {
    var _a, _b, _c, _d;
    return (h("calcite-accordion-item", { "data-field-name": field.name, description: (_a = field.description) === null || _a === void 0 ? void 0 : _a.value, heading: field.alias || field.name, "icon-end": field.chartable && 'graph-bar', "icon-start": FIELD_MAP[((_b = field.description) === null || _b === void 0 ? void 0 : _b.fieldValueType) || field.type].icon, key: field.name }, Boolean(field.alias) && field.alias !== field.name && (h("calcite-label", null, h("span", null, this.intl.t('aliasLabel')), h("div", null, field.alias))), h("calcite-label", null, h("span", null, this.intl.t('nameLabel')), h("div", null, field.name)), Boolean((_c = field.description) === null || _c === void 0 ? void 0 : _c.value) && (h("calcite-label", null, h("span", null, this.intl.t('descriptionLabel')), h("div", null, field.description.value))), Boolean((_d = field.description) === null || _d === void 0 ? void 0 : _d.fieldValueType) && (h("calcite-label", null, h("span", null, this.intl.t('fieldTypeLabel')), h("div", null, this.intl.t(FIELD_MAP[field.description.fieldValueType].text)))), h("calcite-label", null, h("span", null, this.intl.t('typeLabel')), h("div", null, this.intl.t(FIELD_MAP[field.type].text))), field.chartable && this.renderTabs(field)));
  }
  /**
   * Renders the calcite-tabs for the given field
   * @param field The field
   * @returns HTMLCalciteTabsElement
   */
  renderTabs(field) {
    return (h("calcite-tabs", null, h("calcite-tab-nav", { "data-field-name": field.name, slot: "title-group" }, this.tabs.map(({ type, title }) => (h("calcite-tab-title", { key: type, onCalciteTabsActivate: this.handleTabChange, tab: type }, this.intl.t(title))))), this.tabs.map(({ type, renderSlot }) => (h("calcite-tab", { key: type, selected: type === this.defaultFieldTab, tab: type }, renderSlot(field))))));
  }
  /**
   * Renders the slot for the feature chart content
   * @param field The field for the chart
   * @returns HTMLSlotElement
   */
  renderChartSlot(field) {
    return h("slot", { name: `${field.name}-chart` });
  }
  /**
   * Renders the slot for the feature table content
   * @param field The field for the table
   * @returns HTMLSlotElement
   */
  renderTableSlot(field) {
    return h("slot", { name: `${field.name}-table` });
  }
  render() {
    return (h(Host, { "data-element": "attributes-list" }, this.renderHeader(), this.renderAccordion(), this.shouldRenderLoadMore && (h("calcite-link", { "icon-end": "chevron-down", onClick: this.handleLoadMoreClick }, this.intl.t('loadMore')))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "content": ["handleContentUpdated"],
    "fields": ["handleFieldsUpdated"]
  }; }
};
ArcgisHubAttributesList.style = arcgisHubAttributesListCss;

export { ArcgisHubAttributesList as arcgis_hub_attributes_list };
