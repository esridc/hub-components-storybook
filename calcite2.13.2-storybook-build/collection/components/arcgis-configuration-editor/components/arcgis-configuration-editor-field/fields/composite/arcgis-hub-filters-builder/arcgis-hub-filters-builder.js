var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h, Host } from '@stencil/core';
import { cloneObject, createId, findBy } from '@esri/hub-common';
import { interpolateTranslations } from '../../../../../../../utils';
import { buildFilterBuilderUiSchema, FILTER_BUILDER_SCHEMA } from './schemas';
import Memoize from '../../../../../../../decorators/memoize';
import intlManager from '../../../../../../../utils/intl-manager';
import { mergeDeep } from '../../../../../../../utils/object';
import { dictionary } from '@esri/telemetry-dictionary-hub';
/**
 * The arcgis-hub-filters-builder is a composite field for
 * configuring an array of IFilter
 */
export class ArcgisHubFiltersBuilder {
  constructor() {
    this._filterSchema = cloneObject(FILTER_BUILDER_SCHEMA);
    /**
     * The number of filters currently made -- note that this property gets updated after each render.
     * NOTE: We should use the _filters.length property to get the current number of filters.
     * This is just a helper to determine if the number of filters has changed after a render,
     * so that we can set focus on the new filter block -- we do this after the render so that
     * we have a reference to the new block element.
     */
    this._lastRenderFiltersCount = 0;
    /**
     * wrapper around the built-in intl.t function that
     * encapsulates the translation strings from this
     * component to pass into the configuration editor
     */
    this.translationFunc = (key, values, opts) => {
      return this._intl.t(key, values, opts);
    };
    /** helper to find a filter by its unique identifier */
    this.findFilterByKey = (key, filters = this._filters) => {
      return findBy(filters, 'key', key);
    };
    this.handleFilterEditorChange = (evt) => {
      const { values, valid } = evt.detail;
      evt.stopPropagation();
      const editKey = evt.currentTarget.getAttribute('data-key');
      const filter = this.findFilterByKey(editKey);
      // 1. merge new values into the existing filter
      mergeDeep(filter, cloneObject(values));
      // 2. update the filter's validity
      filter.isValid = valid;
      valid && this.arcgisHubFiltersBuilderChange.emit(this.transformFiltersToEmit(this._filters));
    };
    /**
     * handler for when the "New filter" button is clicked.
     * We create a new filter and set it as the one being edited
     */
    this.handleAddFilter = () => {
      const key = createId('filter');
      const newFilter = { key, isValid: false, predicates: [] };
      this._filters = [...this._filters, newFilter];
      this._editKey = key;
      // we do not emit the change here, as we want to wait until the filter is valid to emit
      // send telemetry
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary
        .category.interaction
        .action.select
        .label.newFilter), { details: this.targetEntity, count: this._filters.length }));
    };
    /**
     * Sets the ref to the "New filter" button.
     * @param el
     */
    this.setAddFilterButtonRef = (el) => {
      if (el) {
        this._addFilterButtonRef = el;
      }
    };
    /**
     * Sets the ref to the calcite block element of the last rendered filter.
     * @param el
     */
    this.setFilterBlockRef = (el) => {
      if (el) {
        this._filterBlockRef = el;
      }
    };
    /** handler for when a filter block is opened for editing. */
    this.handleEditFilter = (evt) => {
      this._editKey = evt.currentTarget.getAttribute('data-key');
    };
    /** handler for when a filter is deleted. */
    this.handleDeleteFilter = (evt) => {
      const key = evt.currentTarget.getAttribute('data-key');
      this._filters = this._filters.filter(filter => (filter === null || filter === void 0 ? void 0 : filter.key) !== key);
      this._editKey = null;
      this.arcgisHubFiltersBuilderChange.emit(this.transformFiltersToEmit(this._filters));
      // set focus on the "New filter" button
      this._addFilterButtonRef && this._addFilterButtonRef.setFocus();
    };
    this.filters = [];
    this.targetEntity = undefined;
    this.availablePredicateProperties = undefined;
    this._filters = [];
    this._editKey = undefined;
  }
  async componentWillLoad() {
    this._intl = await intlManager.loadIntlForComponent(this.element);
    this._filters = this.transformFiltersForEditor(this.filters);
    this._lastRenderFiltersCount = this._filters.length;
    // if we have no filters, add one by default to start us off
    if (!this._filters.length) {
      this.handleAddFilter();
    }
  }
  componentDidRender() {
    // if the number of filters has changed, set focus on the new filter block
    if (this._lastRenderFiltersCount !== this._filters.length) {
      this._lastRenderFiltersCount = this._filters.length;
      (this._filterBlockRef && this._filterBlockRef.setFocus) && this._filterBlockRef.setFocus();
    }
  }
  /** dynamically generated filter builder uiSchema */
  get _filterUiSchema() {
    return interpolateTranslations(this._intl, buildFilterBuilderUiSchema({
      targetEntity: this.targetEntity,
      availablePredicateProperties: this.availablePredicateProperties
    }));
  }
  /**
   * returns whether the current filter being edited is valid.
   * We use this to conditionally disable the "New filter" button
   * as well as other filter blocks.
   *
   * If no filter is being edited, we default to true to enable
   * these UIs
   */
  get _isValid() {
    const collection = this.findFilterByKey(this._editKey);
    return collection ? collection === null || collection === void 0 ? void 0 : collection.isValid : true;
  }
  /**
   * function to transform the filters into a format that is
   * consistent with the underlying filters editor
   */
  transformFiltersForEditor(filters = []) {
    return filters.map(filter => {
      const transformedFilter = cloneObject(filter);
      // 1. add a unique identifier to the filter
      transformedFilter.key = createId('filter');
      // 2. add the isValid flag to the filter - by default
      // it should be valid if it's been passed in
      transformedFilter.isValid = true;
      return transformedFilter;
    });
  }
  /**
   * function to transform the editor values into an array of
   * valid IFilters before emitting
   */
  transformFiltersToEmit(filters) {
    const transformedFilters = filters.map((filter) => {
      const transformedFilter = cloneObject(filter);
      // remove internal-only properties
      delete transformedFilter.key;
      delete transformedFilter.isValid;
      return transformedFilter;
    });
    return transformedFilters;
  }
  renderAddButton() {
    return (h("calcite-button", { appearance: "outline-fill", class: "filters__add", disabled: !this._isValid, onClick: this.handleAddFilter, ref: this.setAddFilterButtonRef, round: true, width: "full" }, this._intl.t("newFilter")));
  }
  renderFilters(filters = []) {
    return (filters.map((filter, idx) => {
      return this.renderFilter(filter, idx);
    }));
  }
  renderFilter(filter, idx) {
    var _a;
    // determine the block header based on the configured
    // predicate property
    const parameter = ((_a = filter.predicates) === null || _a === void 0 ? void 0 : _a.length) ? Object.keys(filter.predicates[0])[0] : undefined;
    const filterNum = idx + 1;
    const fallback = this._intl.t("block.heading.default", { filterNum, parameter });
    const heading = parameter
      ? this._intl.t(`block.heading.${parameter}`, { filterNum }, { fallback })
      : this._intl.t("block.heading.untitled");
    return (h("calcite-block", { class: "filters__block", collapsible: true, "data-key": filter.key, disabled: this._editKey !== filter.key && !this._isValid, heading: heading, key: filter.key, onCalciteBlockOpen: this.handleEditFilter, open: this._editKey === filter.key, overlayPositioning: "fixed", ref: this.setFilterBlockRef }, h("div", { slot: "actions-end" }, this.renderBlockActions(filter.key, heading)), this._editKey === filter.key && this.renderFilterEditor()));
  }
  renderBlockActions(filterKey, label) {
    const filter = this.findFilterByKey(filterKey);
    return (h("calcite-action", { "data-key": filter.key, icon: "trash", onClick: this.handleDeleteFilter, text: this._intl.t("block.actions.delete", { label }) }));
  }
  renderFilterEditor() {
    const filter = this.findFilterByKey(this._editKey);
    return (filter && (h("arcgis-configuration-editor", { "data-key": filter.key, onArcgisConfigurationEditorChange: this.handleFilterEditorChange, schema: this._filterSchema, t: this.translationFunc, uiSchema: this._filterUiSchema, values: filter })));
  }
  render() {
    var _a;
    return (h(Host, { "data-element": "filters-builder" }, !!((_a = this._filters) === null || _a === void 0 ? void 0 : _a.length) && this.renderFilters(this._filters), this.renderAddButton()));
  }
  static get is() { return "arcgis-hub-filters-builder"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-filters-builder.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-filters-builder.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "filters": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IFilter[]",
          "resolved": "IFilter[]",
          "references": {
            "IFilter": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "array of hub filter definitions"
        },
        "defaultValue": "[]"
      },
      "targetEntity": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "EntityType",
          "resolved": "\"channel\" | \"communityUser\" | \"discussionPost\" | \"event\" | \"eventAttendee\" | \"group\" | \"groupMember\" | \"item\" | \"portalUser\" | \"user\"",
          "references": {
            "EntityType": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "type of entity the filter is targeting. This is used\ninternally to determine which API we query."
        },
        "attribute": "target-entity",
        "reflect": false
      },
      "availablePredicateProperties": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "PredicateProperty[]",
          "resolved": "PredicateProperty[]",
          "references": {
            "PredicateProperty": {
              "location": "import",
              "path": "../arcgis-hub-predicates-builder/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "predicate properties to present as filter options"
        }
      }
    };
  }
  static get states() {
    return {
      "_filters": {},
      "_editKey": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubFiltersBuilderChange",
        "name": "arcgisHubFiltersBuilderChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "event emitted when the filter is updated"
        },
        "complexType": {
          "original": "IFilter[]",
          "resolved": "IFilter[]",
          "references": {
            "IFilter": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }, {
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "event to emit Hub telemetry"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
}
__decorate([
  Memoize('targetEntity', 'availablePredicateProperties')
], ArcgisHubFiltersBuilder.prototype, "_filterUiSchema", null);
