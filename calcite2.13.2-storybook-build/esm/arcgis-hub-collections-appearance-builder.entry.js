import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { C as CONFIGURATION_VARIANTS } from './resources-3247991b.js';
import { a as cloneObject } from './util-3e6872d9.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './get-prop-ec5be510.js';

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
    registerInstance(this, hostRef);
    this.arcgisHubCollectionsAppearanceBuilderChange = createEvent(this, "arcgisHubCollectionsAppearanceBuilderChange", 7);
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
    this._intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Returns the correct schema for the editor depending on which editor is selected
   */
  get _schema() {
    return cloneObject(COLLECTIONS_APPEARANCE_BUILDER_SCHEMA);
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
    return h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleCollectionsAppearanceBuilderChange, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: Object.assign({}, this._displayConfig), variant: CONFIGURATION_VARIANTS.workspace });
  }
  render() {
    return (h(Host, { "data-element": "collections-appearance-builder" }, this.renderEditor()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubCollectionsAppearanceBuilder.style = arcgisHubCollectionsAppearanceBuilderCss;

export { ArcgisHubCollectionsAppearanceBuilder as arcgis_hub_collections_appearance_builder };
