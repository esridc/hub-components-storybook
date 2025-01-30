'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const interfaces = require('./interfaces-fc0046ff.js');
const context = require('./context-0167a31e.js');
const state = require('./state-6637df8c.js');
const index$1 = require('./index-6f16fe65.js');
const resources = require('./resources-42021303.js');
const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');
const Metrics = require('./Metrics-b8657153.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const getEntityMetrics = require('./getEntityMetrics-b6d0cdfa.js');
const util = require('./util-38e73510.js');
const setProp = require('./set-prop-3de2437f.js');
const updateHubEntity = require('./updateHubEntity-60b83b84.js');
const HubInitiatives = require('./HubInitiatives-25ecf40a.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./store-2a385ca0.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./get-family-cafa88bb.js');
require('./deep-set-49b373be.js');
require('./edit-3df37e35.js');
require('./tslib.es6-b6cfa7d7.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./search-2db68ef4.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./append-custom-params-0f5d0fe2.js');
require('./request-67da3c71.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
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
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./get-form-json-e6831b20.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./hostedServiceUtils-236344a8.js');
require('./is-service-9b8238d2.js');
require('./_deep-map-values-d489006b.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./getDownloadFlow-94a34207.js');
require('./canUseHubDownloadSystem-5b330e55.js');
require('./index-ef80ab27.js');
require('./types-097b54b1.js');
require('./getDownloadConfiguration-1ed2582d.js');
require('./types-2810dd27.js');
require('./shouldShowDownloadsConfiguration-62f7f280.js');
require('./getService-b27eda44.js');
require('./remove-921f5dc7.js');
require('./TemplateBusinessRules-5564c964.js');
require('./edit-fd85c003.js');
require('./settings-0b8cd93b.js');
require('./discussions-api-request-e9e6e346.js');
require('./request-79b61e92.js');
require('./_enrichments-a40a3850.js');
require('./get-user-5eecc1c4.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./UserSession-f8bc10c8.js');
require('./slugs-8f743e2c.js');
require('./map-by-a7a75788.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
require('./edit-2b7ccc3f.js');
require('./getPropertyMap-030ec7b2.js');
require('./events-7873340d.js');
require('./types-751ad3a9.js');
require('./registrations-a6dd52b7.js');
require('./defaults-abee9bee.js');
require('./getDefaultEventDatesAndTimes-99ac0275.js');
require('./hubSearch-79d30702.js');
require('./merge-objects-b31af1a3.js');
require('./get-52661c13.js');
require('./search-b00c4c79.js');
require('./channels-bf478342.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');

/**
 * Handles which tab the metric sidepanel is linked to
 */
var MetricEditorTabs;
(function (MetricEditorTabs) {
  MetricEditorTabs["PREVIEW"] = "preview";
  MetricEditorTabs["DEFINITIONS"] = "definitions";
})(MetricEditorTabs || (MetricEditorTabs = {}));

const arcgisHubEntityMetricsCss = ".project-metrics__main:not(.project-metrics__main--edit){height:-moz-fit-content;height:fit-content}arcgis-hub-workspace-pane{--arcgis-configuration-form-footer-max-width:800px;--arcgis-configuration-form-footer-scalable-padding:0.5rem}.hub-entity-metrics__content{display:flex;flex-direction:column}.hub-entity-metrics__visible,.hub-entity-metrics__hidden{padding-top:1.5rem}.hub-entity-metrics__content .hub-entity-metrics__section-title{margin:0px;padding-bottom:0.5rem;font-size:var(--calcite-font-size-2);line-height:1.5rem;font-weight:var(--calcite-font-weight-medium);color:var(--light-ui-text-1)}.hub-entity-metrics__content .hub-entity-metrics__helper-text{margin:0px;margin-bottom:2rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}.hub-entity-metrics__add-metric{display:flex;flex-direction:row;align-items:center;gap:1rem}.hub-entity-metrics__metrics-grid{display:grid;align-items:flex-end;gap:2rem;grid-template-columns:repeat(auto-fill, minmax(max(14rem, calc((100% - 10rem) / 2)), 1fr))}.hub-entity-metrics__empty-featured-metric{display:flex;min-height:100%;flex-direction:row;align-items:center;justify-content:center;font-size:var(--calcite-font-size-5);line-height:3rem;font-weight:var(--calcite-font-weight-bold);aspect-ratio:1.4;color:var(--calcite-color-border-input);border:2.75px dashed #b7b7b7}.hub-entity-metrics__metrics-wrapper{position:relative;padding:0.25rem;aspect-ratio:1.4}.hub-entity-metrics__metrics-wrapper.featured-metric{border:3px solid var(--calcite-color-brand)}.hub-entity-metrics__metric-container{display:flex;height:100%;flex-direction:column-reverse}calcite-dropdown{align-self:flex-end}calcite-dropdown:not([open]) calcite-dropdown-group{display:none}.hub-entity-metrics__no-metrics{font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-medium);--tw-text-opacity:1;color:rgb(21 21 21 / var(--tw-text-opacity))}p.hub-entity-metrics__metrics-featured-label{position:absolute;bottom:0px;right:0px;margin:0px;width:-moz-fit-content;width:fit-content;padding-bottom:0.25rem;padding-top:0.25rem;padding-left:0.5rem;padding-right:0.5rem;font-size:var(--calcite-font-size--1);line-height:1rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-foreground-1);background-color:var(--calcite-color-brand)}arcgis-hub-metric-card{height:100%}calcite-modal p.modal-description{font-size:var(--calcite-font-size-0);line-height:1.25rem}calcite-modal p.modal-metric-name{font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-bold)}.metric-preview{position:sticky;top:1.25rem;width:100%}.metric-preview arcgis-hub-metric-card{height:-moz-fit-content;height:fit-content;min-height:11.25rem}calcite-tab{overflow:visible}";

const ArcgisHubEntityMetrics = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubWorkspaceEntityChange = index.createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.entity = undefined;
    this.isMobile = false;
    this.metricDisplays = undefined;
    this.metrics = undefined;
    this.isEditorOpen = false;
    this.metricInFocus = undefined;
    this.footerSlotEl = undefined;
    this.showDeleteModal = false;
    this.isDeleting = false;
    this.editorValues = undefined;
    this.activeTab = MetricEditorTabs.PREVIEW;
    context.bind(this, "handleDelete", "handleEdit", "handleMove", "handleAddMetric", "handleOnEditorClose", "handleOnChangedMetric", "handleOnSavedMetric", "handleConfirmDelete", "handleCloseDeleteModal", "hubTelemetryHandler", "handleEditorInitialized");
  }
  /**
    * provides auth & portal information
    */
  get _context() { return state.getGlobalContext(); }
  /**
   * type of entity, used for i18nScope
   */
  get type() {
    return getTypeFromEntity.getTypeFromEntity(this.entity);
  }
  /**
   * getter for if we have reached the maximum number of metrics
   */
  get isAtMetricCapacity() {
    return this.metricDisplays.length >= Metrics.MAX_ENTITY_METRICS_ALLOWED;
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    this.initializeMetrics();
  }
  /** Creates state for metrics and metrics displays. */
  initializeMetrics() {
    this.metricDisplays = getProp.getProp(this.entity, "view.metricDisplays") || [];
    // have to typecast since not all entities have metrics as of now
    this.metrics = getEntityMetrics.getEntityMetrics(this.entity) || [];
  }
  hubTelemetryHandler(event) {
    const { detail } = event;
    event.stopPropagation();
    let telemetry = detail;
    // save new metric or save edits to existing metric
    if (detail.category === index$1.dist.constants.category.CONTENT && detail.action === index$1.dist.constants.action.UPDATE && detail.label === index$1.dist.constants.label.METRICS) {
      telemetry = this.metricInFocus ?
        index$1.dist.dictionary.category.content.action.update.label.metric.details.update :
        index$1.dist.dictionary.category.content.action.update.label.metric.details.create;
    }
    // TODO: add specific edits to metric telemetry
    this.hubTelemetry.emit(Object.assign(Object.assign({}, telemetry), { response: detail.response }));
  }
  /**
   * Updates the hub entity with the new metrics and metricDisplays arrays.
   * Also updates the local state.
   * @param metrics
   * @param metricDisplays
   */
  async updateEntity(metrics, metricDisplays) {
    // clone entity object and set new metrics and displays
    const entity = util.cloneObject(this.entity);
    setProp.setProp("metrics", metrics, entity);
    setProp.setProp("view.metricDisplays", metricDisplays, entity);
    // update entity and state
    this.metrics = metrics;
    this.metricDisplays = metricDisplays;
    let updatedEntity;
    try {
      updatedEntity = await updateHubEntity.updateHubEntity(this.type, entity, this._context);
      this.arcgisHubWorkspaceEntityChange.emit({
        entity: updatedEntity,
        isDirty: false,
      });
    }
    catch (err) {
      this.arcgisHubWorkspaceEntityChange.emit({
        entity: entity,
        isDirty: true,
      });
      throw err;
    }
    return updatedEntity;
  }
  /**
   * entity-editor updates the current metric being initialized.
   *
   * @param event - listens for entity editor to be initialized
   */
  handleEditorInitialized(event) {
    event.stopPropagation();
    this.editorValues = event.detail._metric;
  }
  /** fires when edit is clicked from the metric calcite-dropdown menu */
  handleEdit(e) {
    // update metricInFocus
    const metricId = e.target.getAttribute("data-metric");
    this.setMetricInFocus(metricId);
    // open editor
    this.isEditorOpen = true;
    this.hubTelemetry.emit({ telemetry: index$1.dist.dictionary.category.interaction.action.open.label.editor.details.metric, composedPath: e.composedPath() });
  }
  /** fires when delete is clicked from the metric calcite-dropdown menu */
  handleDelete(e) {
    // grab metric in focus
    const metricId = e.target.getAttribute("data-metric");
    this.setMetricInFocus(metricId);
    // launch delete modal
    this.showDeleteModal = true;
    this.hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.open.label.modal.details.delete);
  }
  handleCloseDeleteModal(telemetry = true) {
    this.showDeleteModal = false;
    this.isDeleting = false;
    this.setMetricInFocus();
    // only fire close telemetry if intentionally closing modal
    if (telemetry) {
      this.hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.close.label.modal.details.delete);
    }
  }
  async handleConfirmDelete() {
    // remove metric off of the metrics list
    const metrics = this.metrics.filter((m) => m.id !== this.metricInFocus.id);
    // remove metric display off of the metric displays list
    const metricDisplays = this.metricDisplays.filter((d) => d.metricId !== this.metricInFocus.id);
    // start deleting
    this.isDeleting = true;
    // update entity
    const success = await this.updateEntity(metrics, metricDisplays);
    // emit telemetry
    this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.update.label.metric.details.delete), { response: !!success ? index$1.dist.constants.response.SUCCESS : index$1.dist.constants.response.FAILURE }));
    // only close once the promise is finished
    this.handleCloseDeleteModal(false);
  }
  /** Fired when add metric button is clicked to open editor to create new metrics */
  handleAddMetric(evt) {
    this.isEditorOpen = true;
    this.hubTelemetry.emit({ telemetry: index$1.dist.dictionary.category.interaction.action.open.label.editor.details.metric, composedPath: evt.composedPath() });
  }
  /**
   * Fired when the entity-editor updates the current metric being worked on.
   * Fires an event to let the workspace know that the entity is dirty.
   */
  handleOnChangedMetric(event) {
    this.editorValues = event.detail.values["_metric"];
    this.arcgisHubWorkspaceEntityChange.emit({
      entity: event.detail.values,
      isDirty: true
    });
  }
  /**
   * Fired when the entity-editor saves the current metric being worked on.
   * Fires an event to let the workspace know that the entity has been updated, and closes the editor.
   */
  handleOnSavedMetric(event) {
    this.arcgisHubWorkspaceEntityChange.emit({
      entity: event.detail.entity,
      isDirty: !event.detail.isSuccess
    });
    // handle all closing functionality of editor and don't emit form closing telemetry
    this.handleOnEditorClose(false);
  }
  /** Fires when the editor is closed by backing out of the calcite-flow-item. */
  handleOnEditorClose(telemetry = true) {
    this.isEditorOpen = false;
    this.setMetricInFocus();
    // only emit telemetry if intentionally closing form, rather than on save
    if (telemetry) {
      this.hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.close.label.editor.details.metric);
    }
  }
  /**
   * Handles a move operation to change visibilities.
   * @param e
   */
  handleMove(e) {
    /**
     * The move process must do the following:
     *   - change the visibility of the current display
     *   - ensure the display appears "last" in the grouping of visibilities, so that order is maintained
     *
     * To do this, we separate all of the displays by visibility first into arrays. We then find the current display, and then
     * remove it from its grouping of visibility. We then change the display's visibility on the model, and then we add it to the
     * target visibility grouping array.
     *
     * We finally combine all of the arrays together so that order is kept betweent them.
     */
    // get important data from element
    const metricId = e.target.getAttribute("data-metric");
    const visibility = e.target.getAttribute("data-visibility");
    const targetVisibility = e.target.getAttribute("data-target-visibility");
    // get all displays filtered out
    const featuredDisplays = this.metricDisplays.filter((display) => display.visibility === Metrics.MetricVisibility.featured);
    const visibleDisplays = this.metricDisplays.filter((display) => display.visibility === Metrics.MetricVisibility.visible);
    const hiddenDisplays = this.metricDisplays.filter((display) => display.visibility === Metrics.MetricVisibility.hidden);
    const displayDict = {
      featured: featuredDisplays,
      visible: visibleDisplays,
      hidden: hiddenDisplays
    };
    // get array of where display is now, and where it is headed
    const currentArray = displayDict[visibility];
    const targetArray = displayDict[targetVisibility];
    // take display out of current array
    const displayIndex = currentArray.findIndex((display) => display.metricId === metricId);
    const displayInArray = currentArray.splice(displayIndex, 1);
    // if we can find display
    if (displayInArray.length) {
      const display = displayInArray[0];
      // change visibility and put into target array
      display.visibility = targetVisibility;
      // if visibility is a demotion (featured -> hidden, visible -> hidden, featured -> visible), we add to the front of the array
      if (targetVisibility === Metrics.MetricVisibility.hidden || (targetVisibility === Metrics.MetricVisibility.visible && visibility === Metrics.MetricVisibility.featured)) {
        targetArray.unshift(display);
      }
      // else it is a promotion (hidden to visible, visible to featured), add to end of array
      else {
        targetArray.push(display);
      }
      // recombine all arrays so that order is maintained between each, and update entity
      const finalDisplays = [...featuredDisplays, ...visibleDisplays, ...hiddenDisplays];
      this.updateEntity(this.metrics, finalDisplays);
      const telemetry = {
        [Metrics.MetricVisibility.featured]: index$1.dist.dictionary.category.content.action.update.label.metric.details.featured,
        [Metrics.MetricVisibility.visible]: index$1.dist.dictionary.category.content.action.update.label.metric.details.show,
        [Metrics.MetricVisibility.hidden]: index$1.dist.dictionary.category.content.action.update.label.metric.details.hide,
      }[targetVisibility];
      this.hubTelemetry.emit(telemetry);
    }
  }
  /**
   * updates the metricInFocus state to either have the metric corresponding to the metricId,
   * or resets the state to undefined
   */
  setMetricInFocus(metricId) {
    this.metricInFocus = metricId ? this.metrics.find((m) => m.id === metricId) : undefined;
    this.editorValues = undefined;
  }
  /**
   * Returns a specific dropdown item for the move actions for a metric.
   * @param options: should have metricId, visibility, targetVisibility, and text to rendedr
  */
  getMoveDropdownItem(options) {
    const { metricId, visibility, targetVisibility, text } = options;
    return (index.h("calcite-dropdown-item", { "data-metric": metricId, "data-target-visibility": targetVisibility, "data-visibility": visibility, key: metricId, onClick: this.handleMove }, text));
  }
  /**
   * Renders the specific move actions for each metric depending on its visibility.
   * "Featured", "Show", "Hide", etc.
   * @param metricId
   * @param visibility
   * @returns
   */
  renderMoveActions(metricId, visibility) {
    let result;
    const featuredCount = this.metricDisplays.filter((display) => display.visibility === Metrics.MetricVisibility.featured).length;
    switch (visibility) {
      // metric that is currently featured
      case Metrics.MetricVisibility.featured:
        result = [
          this.getMoveDropdownItem({ metricId, visibility, targetVisibility: Metrics.MetricVisibility.visible, text: this.intl.t("actions.removeFeatured") }),
          this.getMoveDropdownItem({ metricId, visibility, targetVisibility: Metrics.MetricVisibility.hidden, text: this.intl.t("actions.hide") }),
        ];
        break;
      // metric that is currently visible
      case Metrics.MetricVisibility.visible:
        result = [];
        if (featuredCount < Metrics.MAX_FEATURED_METRICS_ALLOWED) {
          result.push(this.getMoveDropdownItem({ metricId, visibility, targetVisibility: Metrics.MetricVisibility.featured, text: this.intl.t("actions.featured") }));
        }
        result.push(this.getMoveDropdownItem({ metricId, visibility, targetVisibility: Metrics.MetricVisibility.hidden, text: this.intl.t("actions.hide") }));
        break;
      // metric that is currently hidden
      case Metrics.MetricVisibility.hidden:
        result = [];
        if (featuredCount < Metrics.MAX_FEATURED_METRICS_ALLOWED) {
          result.push(this.getMoveDropdownItem({ metricId, visibility, targetVisibility: Metrics.MetricVisibility.featured, text: this.intl.t("actions.featured") }));
        }
        result.push(this.getMoveDropdownItem({ metricId, visibility, targetVisibility: Metrics.MetricVisibility.visible, text: this.intl.t("actions.show") }));
    }
    return result;
  }
  /**
   * Renders the specific actions in the calcite-dropdown menu that can be
   * clicked on when interacting with a metric (edit, delete, move)
   * @param metricDisplay
   * @returns
   */
  renderMetricActions(metricDisplay, metric) {
    const { visibility, metricId } = metricDisplay;
    return (index.h("calcite-dropdown", { placement: "bottom-end", scale: "m" }, index.h("calcite-button", { appearance: "transparent", "aria-haspopup": true, iconStart: "ellipsis", kind: "neutral", label: this.intl.t('optionsLabel', { name: metric.name }), round: true, slot: "trigger" }), index.h("calcite-dropdown-group", { role: "menu", selectionMode: "none" }, this.renderMoveActions(metricId, visibility), index.h("calcite-dropdown-item", { "data-element": "edit-menu-item", "data-metric": metricId, onClick: this.handleEdit }, this.intl.t("actions.edit")), index.h("calcite-dropdown-item", { "data-metric": metricId, onClick: this.handleDelete }, this.intl.t("actions.delete")))));
  }
  /**
   * Renders a single empty featured metric
   * @param metricOrder
   * @returns
   */
  renderEmptyFeaturedMetric(metricOrder) {
    const number = this.intl.t(`metricNumber.${metricOrder}`);
    return (index.h("div", { class: "hub-entity-metrics__empty-featured-metric" }, number));
  }
  /**
   * Renders a metric display by finding the corresponding metric on the entity. This is either a visible, hidden, or featured metric. Will render empty state if the metric is featured.
   * Will not render if a metric cannot be found.
   * @param metricDisplay IMetricDisplayConfig
   * @param metricOrder number -- number rendered inside of empty state for a featured metric
   * @param isFeatured boolean
   * @returns
   */
  renderMetric(metricDisplay, isFeatured, metricOrder) {
    let result;
    let metric;
    // get accompanying metric off of entity
    const { metricId } = metricDisplay;
    // if we have both, then try to find the correct metric
    if (this.metrics && metricId) {
      metric = this.metrics.find((m) => m.id === metricId);
    }
    // if we have the metric, render the card. else, fill with empty state if featured, or just don't render the display
    if (metric) {
      result = (index.h(index.Fragment, null, index.h("div", { class: {
          "hub-entity-metrics__metrics-wrapper": true,
          "featured-metric": isFeatured
        } }, index.h("arcgis-hub-metric-card", { cardConfig: Object.assign(Object.assign({}, metricDisplay), { scale: interfaces.SCALE.medium, shadow: interfaces.DROP_SHADOWS.low }), metric: metric }), isFeatured ? index.h("p", { class: "hub-entity-metrics__metrics-featured-label" }, this.intl.t("featured").toUpperCase()) : ""), this.renderMetricActions(metricDisplay, metric)));
    }
    else {
      result = isFeatured ? this.renderEmptyFeaturedMetric(metricOrder) : undefined;
    }
    return index.h("div", { class: "hub-entity-metrics__metric-container" }, result);
  }
  /**
   * renders all "featured metrics, in the metrics pane
   */
  renderFeaturedMetrics() {
    let featuredMetricDisplays = [];
    // TODO: replace visibility with enum exported from hub-common
    if (this.metricDisplays) {
      featuredMetricDisplays = this.metricDisplays.filter((m) => m.visibility === Metrics.MetricVisibility.featured);
    }
    // fill with empty state to ensure we always have at least four spots
    if (featuredMetricDisplays.length < 4) {
      const emptyState = new Array(4 - featuredMetricDisplays.length).fill({});
      featuredMetricDisplays = [...featuredMetricDisplays, ...emptyState];
    }
    // create metric element to render
    const featuredMetrics = featuredMetricDisplays.map((metricDisplay, index) => this.renderMetric(metricDisplay, true, index + 1));
    return (index.h("div", { class: "hub-entity-metrics__metrics-grid" }, featuredMetrics));
  }
  /**
   * renders all "visible" metrics, in the metrics pane.
   */
  renderVisibleMetrics() {
    let visibleMetrics = index.h("h3", { class: "hub-entity-metrics__no-metrics" }, this.intl.t('visible.noMetrics'));
    if (this.metricDisplays.length) {
      const visibleMetricDisplays = this.metricDisplays.reduce((acc, display) => {
        if (display.visibility === Metrics.MetricVisibility.visible) {
          acc.push(this.renderMetric(display, false));
        }
        return acc;
      }, []);
      visibleMetrics = visibleMetricDisplays.length ? visibleMetricDisplays : visibleMetrics;
    }
    // We are doing this because the full grid will reserve space for 4 metrics, but if we have less than 4, we want to use a smaller grid
    // to not show a bunch of white space
    // const className = visibleMetrics.length > 2 ? "hub-entity-metrics__metrics-grid" : "hub-entity-metrics__metrics-grid-small";
    return (index.h("div", { class: "hub-entity-metrics__metrics-grid" }, visibleMetrics));
  }
  /**
   * Renders any hidden metric displays, if there are any.
   * @returns
   */
  renderHiddenMetrics() {
    // default helper text saying no metrics are found
    let result = index.h("h3", { class: "hub-entity-metrics__no-metrics" }, this.intl.t('hidden.noMetrics'));
    // let className = "hub-entity-metrics__metrics-grid";
    // if displays, then render any hiddenmetrics
    if (this.metricDisplays.length) {
      const hiddenMetrics = this.metricDisplays.reduce((acc, display) => {
        // only grab hidden metrics
        if (display.visibility === Metrics.MetricVisibility.hidden) {
          acc.push(this.renderMetric(display, false));
        }
        return acc;
      }, []);
      // if we have hidden metrics, we render them instead of the no metrics warning
      result = hiddenMetrics.length ? hiddenMetrics : result;
    }
    // We are doing this because the full grid will reserve space for 4 metrics, but if we have less than 4, we want to use a smaller grid
    // to not show a bunch of white space
    // const className = result.length > 2 ? "hub-entity-metrics__metrics-grid" : "hub-entity-metrics__metrics-grid-small";
    return index.h("div", { class: "hub-entity-metrics__metrics-grid" }, result);
  }
  /**
   * Renders all metrics (featured, visible, and hidden) in the publishing part of the metrics pane.
   */
  renderMetrics() {
    return (index.h("calcite-flow-item", null, index.h("div", { class: "hub-entity-metrics__featured" }, index.h("h2", { class: "hub-entity-metrics__section-title" }, this.intl.t('featured')), index.h("p", { class: "hub-entity-metrics__helper-text" }, this.intl.t(`${this.type}.featured.description`)), this.renderFeaturedMetrics()), index.h("div", { class: "hub-entity-metrics__visible" }, index.h("h2", { class: "hub-entity-metrics__section-title" }, this.intl.t('visible.title')), index.h("p", { class: "hub-entity-metrics__helper-text" }, this.intl.t(`${this.type}.visible.description`)), this.renderVisibleMetrics()), index.h("div", { class: "hub-entity-metrics__hidden" }, index.h("h2", { class: "hub-entity-metrics__section-title" }, this.intl.t('hidden.title')), index.h("p", { class: "hub-entity-metrics__helper-text" }, this.intl.t('hidden.description')), this.renderHiddenMetrics())));
  }
  /**
   * Renders the entity-editor in a calcite-flow-item.
   * Used for creating or editing a metric.
   */
  renderEditor() {
    const id = this.metricInFocus && this.metricInFocus.id;
    const name = this.metricInFocus && this.metricInFocus.name;
    return (index.h("calcite-flow-item", { class: "hub-entity-metrics__editor-calcite-flow", description: this.intl.t("editor.description"), heading: name ? name : this.intl.t("editor.heading"), onCalciteFlowItemBack: this.handleOnEditorClose }, index.h("arcgis-hub-entity-editor", { editorContext: { metricId: id }, editorType: `hub:${this.type}:metrics`, entity: this.entity, footerSlotRef: this.footerSlotEl, onArcgisHubEntityEditorChange: this.handleOnChangedMetric, onArcgisHubEntityEditorInitialization: this.handleEditorInitialized, onArcgisHubEntityEditorSaved: this.handleOnSavedMetric, onHubTelemetry: this.hubTelemetryHandler, variant: resources.CONFIGURATION_VARIANTS.workspace })));
  }
  /**
   * Renders the confirm delete modal for a metric.
   */
  renderDeleteModal() {
    return (index.h("calcite-modal", { kind: "danger", onCalciteModalClose: this.handleCloseDeleteModal, open: this.showDeleteModal }, index.h("h1", { slot: "header" }, this.intl.t("deleteMetricModal.heading")), index.h("div", { slot: "content" }, index.h("p", { class: "modal-description" }, this.intl.t("deleteMetricModal.content")), index.h("p", { class: "modal-metric-name" }, this.metricInFocus.name)), index.h("calcite-button", { appearance: "solid", disabled: this.isDeleting, kind: "danger", loading: this.isDeleting, onClick: this.handleConfirmDelete, slot: "primary" }, this.intl.t("deleteMetricModal.delete")), index.h("calcite-button", { appearance: "outline-fill", kind: "brand", onClick: this.handleCloseDeleteModal, slot: "secondary" }, this.intl.t("deleteMetricModal.cancel"))));
  }
  /* renders the definitions and metric preview tab on the side pane */
  renderEditorPreview() {
    let metric;
    let displayConfig;
    // 1. Grab the id of the metric being edited, or fallback to
    // "preview-id" when a new metric is being created
    const id = this.metricInFocus ? this.metricInFocus.id : "preview-id";
    // 2a. Grab an existing metric's initial definition + display config
    if (!this.editorValues && this.metricInFocus) {
      metric = this.metricInFocus;
      displayConfig = this.metricDisplays.find((display) => display.metricId === id);
      // 2b. As a new/existing metric is being updated, transform the
      // editor values into an updated definition + display config to
      // render in the preview
    }
    else {
      const result = HubInitiatives.editorToMetric(this.editorValues || {}, id, {});
      metric = result.metric;
      displayConfig = result.displayConfig;
    }
    return (index.h("calcite-tabs", { class: "metric-preview" }, index.h("calcite-tab-nav", { slot: "title-group" }, index.h("calcite-tab-title", { "aria-selected": true, class: "preview-tab-title", selected: MetricEditorTabs.PREVIEW === this.activeTab }, this.intl.t(`sidePanel.preview`))), index.h("calcite-tab", null, index.h("arcgis-hub-metric-card", { cardConfig: Object.assign(Object.assign({}, displayConfig), { shadow: interfaces.DROP_SHADOWS.medium, border: true }), metric: metric }))));
  }
  /** renders the pane side panel of calcite-notices. */
  renderSidePanel() {
    return (index.h("div", { class: "hub-entity-metrics__side-panel", slot: "side-panel" }, index.h("calcite-notice", { icon: "user-key", open: true, width: this.isMobile ? "full" : "auto" }, index.h("p", { slot: "message" }, this.intl.t(`${this.type}.sideNotices.metricLocation.message`)), index.h("calcite-link", { href: "https://doc.arcgis.com/en/hub/initiatives/add-metrics.htm", "icon-end": "launch", slot: "link", target: "_blank" }, this.intl.t(`${this.type}.sideNotices.metricLocation.metricsDockLink`))), this.isEditorOpen && this.renderEditorPreview()));
  }
  /** renders the current count of metrics created in the workspace */
  renderMetricCount() {
    const kind = this.isAtMetricCapacity ? "warning" : "info";
    const icon = this.isAtMetricCapacity ? "exclamation-mark-triangle" : "";
    return (index.h("div", null, index.h("calcite-notice", { icon: icon, kind: kind, open: true, scale: "s" }, index.h("div", { slot: "title" }, this.intl.t("metricCount.label", {
      currentCount: this.metricDisplays.length,
      totalCountAllowed: Metrics.MAX_ENTITY_METRICS_ALLOWED
    })))));
  }
  /** renders the "Add metric" button at the top of the pane to allow users to add a new metric. Navigates to the editor calcite-flow-item. */
  renderAddMetric() {
    return !this.isEditorOpen && (index.h("div", { class: "hub-entity-metrics__add-metric", slot: "primary-actions" }, this.renderAddMetricButton(), this.renderMetricCount()));
  }
  /**
   * Renders the add metric button in the primary actions slot.
   * Will render with a tooltip wrapping it if the user is at the metric capacity.
   * @returns
   */
  renderAddMetricButton() {
    const button = index.h("calcite-button", { appearance: "solid", "data-element": "add-metric-button", disabled: this.isAtMetricCapacity, onClick: this.handleAddMetric, round: true }, this.intl.t("addMetric"));
    return (this.isAtMetricCapacity ?
      index.h("arcgis-ref-tooltip", { placement: 'right', text: this.intl.t("metricCount.tooltip") }, button)
      : button);
  }
  render() {
    return (index.h(index.Host, { "data-element": "workspace-entity-metrics" }, index.h("arcgis-hub-workspace-pane", { isMobile: this.isMobile }, index.h("h1", { slot: "title" }, this.intl.t("title")), index.h("span", { slot: "subtitle" }, this.intl.t('metricDescription')), this.renderAddMetric(), index.h("div", { class: {
        "hub-entity-metrics__content": true,
        "hub-entity-metrics__content-edit": this.isEditorOpen
      } }, index.h("calcite-flow", null, this.renderMetrics(), this.isEditorOpen && this.renderEditor())), this.renderSidePanel(), index.h("div", { ref: (el) => { this.footerSlotEl = el; }, slot: "footer" }), this.showDeleteModal && this.renderDeleteModal())));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "entity": ["initializeMetrics"]
  }; }
};
ArcgisHubEntityMetrics.style = arcgisHubEntityMetricsCss;

exports.arcgis_hub_entity_metrics = ArcgisHubEntityMetrics;
