import { Host, h } from '@stencil/core';
import intlManager from '../../utils/intl-manager';
import { FIELD_MAP } from './resources';
import { bind } from '../../utils/context';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { redirectToExternalUrl } from '../../utils';
var FieldTab;
(function (FieldTab) {
  FieldTab["Chart"] = "Chart";
  FieldTab["Table"] = "Table";
})(FieldTab || (FieldTab = {}));
/**
 * @slot <FIELD_NAME>-table - A dynamically named slot that allows for rendering `table` content into a chartable field's `Table` tab
 * @slot <FIELD_NAME>-chart - A dynamically named slot that allows for rendering `chart` content into a chartable field's `Chart` tab
 */
export class ArcgisHubAttributesList {
  /**
   * Pre-binds method context
   * @constructor
   */
  constructor() {
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
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.navigation.action.external.label.webHelp), { details: href }));
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
    this.hubTelemetry.emit(dictionary.category.interaction.action.search.label.loadMore.details.attributes);
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
      ? dictionary.category.interaction.action.close.label.accordion.details.attribute
      : dictionary.category.interaction.action.open.label.accordion.details.attribute;
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
        telemetry: dictionary.category.navigation.action.onPage.label.chart,
        renderSlot: this.renderChartSlot,
      },
      {
        type: FieldTab.Table,
        title: 'secTab',
        telemetry: dictionary.category.navigation.action.onPage.label.table,
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
  static get is() { return "arcgis-hub-attributes-list"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-attributes-list.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-attributes-list.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "content": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubContent",
          "resolved": "IHubContent",
          "references": {
            "IHubContent": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An IHubContent object"
        }
      },
      "fields": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "any[]",
          "resolved": "any[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An Array of fields augmented with statistics"
        }
      }
    };
  }
  static get states() {
    return {
      "maxFields": {},
      "parsedFields": {}
    };
  }
  static get events() {
    return [{
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Hub telemetry event"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "arcgisHubAttributesListAccordionChange",
        "name": "arcgisHubAttributesListAccordionChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when a `calcite-accordion-item"
        },
        "complexType": {
          "original": "{ fieldName: string, expanded: boolean }",
          "resolved": "{ fieldName: string; expanded: boolean; }",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "content",
        "methodName": "handleContentUpdated"
      }, {
        "propName": "fields",
        "methodName": "handleFieldsUpdated"
      }];
  }
  static get listeners() {
    return [{
        "name": "calciteInternalAccordionChange",
        "method": "handleAccordionChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
