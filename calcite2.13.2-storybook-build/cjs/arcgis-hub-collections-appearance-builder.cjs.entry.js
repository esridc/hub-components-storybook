'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const resources = require('./resources-42021303.js');
const util = require('./util-38e73510.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./get-prop-4bd8fc1a.js');

const COLLECTIONS_APPEARANCE_BUILDER_SCHEMA = {
  type: "object",
  properties: {
    sort: {
      type: "string",
      enum: ["relevance", "title", "created", "modified"]
    },
    filters: {
      type: "array",
      items: {
        type: "object",
        // TODO: fill in schema for creating new filters
      }
    }
  }
};
const getCollectionsAppearanceBuilderUiSchema = (options) => {
  const { intl } = options;
  return {
    type: "Layout",
    elements: [
      {
        type: "Section",
        label: intl.t("sort.label"),
        options: {
          section: "block",
          open: true,
        },
        elements: [
          {
            scope: "/properties/sort",
            type: "Control",
            options: {
              helperText: { label: intl.t("sort.helperText") },
              control: "hub-field-input-tile-select",
              labels: [intl.t("sort.relevance.label"), intl.t("sort.title.label"), intl.t("sort.created.label"), intl.t("sort.modified.label")],
              type: "radio",
            }
          },
        ],
      },
      {
        type: "Section",
        label: intl.t("filters.label"),
        options: {
          section: "block",
          open: true
        },
        elements: [
          {
            scope: "/properties/filters",
            type: "Control",
            options: {
              control: "hub-field-input-list",
              // TODO: fill in all of the uiSchema options for new filters
            }
          }
        ]
      }
    ]
  };
};

const arcgisHubCollectionsAppearanceBuilderCss = "calcite-block.section-block--l.sc-hub-section-block{--calcite-font-size--1:0.875rem}";

const ArcgisHubCollectionsAppearanceBuilder = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubCollectionsAppearanceBuilderChange = index.createEvent(this, "arcgisHubCollectionsAppearanceBuilderChange", 7);
    /**
     * Handles a change from the collections appearance builder
     * Updates internal state and emits the change event
     */
    this.handleCollectionsAppearanceBuilderChange = (evt) => {
      evt.stopPropagation();
      // update the internal state
      const { values } = evt.detail;
      this._displayConfig = values;
      this.arcgisHubCollectionsAppearanceBuilderChange.emit(this._displayConfig);
    };
    /**
     * wrapper around the built-in intl.t function that
     * encapsulates the translation strings from this
     * component to pass into the configuration editor
     */
    this.translationFunc = (key, values, opts) => {
      return this._intl.t(key, values, opts);
    };
    this.calciteFlowRefCallback = undefined;
    this.displayConfig = undefined;
    this._displayConfig = undefined;
  }
  async componentWillLoad() {
    this._intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Returns the correct schema for the editor depending on which editor is selected
   */
  get _schema() {
    return util.cloneObject(COLLECTIONS_APPEARANCE_BUILDER_SCHEMA);
  }
  ;
  /**
   * Returns the correct uiSchema for the editor depending on which editor is selected
   */
  get _uiSchema() {
    return getCollectionsAppearanceBuilderUiSchema({ intl: this._intl });
  }
  /**
   * Renders an instance of the configuration editor
   * @returns
   */
  renderEditor() {
    return index.h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleCollectionsAppearanceBuilderChange, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: Object.assign({}, this._displayConfig), variant: resources.CONFIGURATION_VARIANTS.workspace });
  }
  render() {
    return (index.h(index.Host, { "data-element": "collections-appearance-builder" }, this.renderEditor()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubCollectionsAppearanceBuilder.style = arcgisHubCollectionsAppearanceBuilderCss;

exports.arcgis_hub_collections_appearance_builder = ArcgisHubCollectionsAppearanceBuilder;
