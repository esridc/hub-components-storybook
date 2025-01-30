import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { S as SCALE, D as DROP_SHADOWS } from './interfaces-0d0bef14.js';
import { b as bind } from './context-7d8f7366.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { d as dist } from './index-dd3f99ac.js';
import { C as CONFIGURATION_VARIANTS } from './resources-3247991b.js';
import { g as getTypeFromEntity } from './getTypeFromEntity-e149b61e.js';
import { a as MAX_ENTITY_METRICS_ALLOWED, M as MetricVisibility, b as MAX_FEATURED_METRICS_ALLOWED } from './Metrics-9cb7a1fc.js';
import { g as getProp } from './get-prop-ec5be510.js';
import { g as getEntityMetrics } from './getEntityMetrics-ad176d9d.js';
import { a as cloneObject } from './util-3e6872d9.js';
import { s as setProp } from './set-prop-9a4aa9a9.js';
import { u as updateHubEntity } from './updateHubEntity-c9ae958c.js';
import { J as editorToMetric } from './HubInitiatives-4f4e24ce.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './store-0a6cb79f.js';
import './_commonjsHelpers-11ca3be1.js';
import './get-family-543fac52.js';
import './deep-set-67281c6f.js';
import './edit-237c0a70.js';
import './tslib.es6-9c17e83a.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './search-c7a57aa9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './append-custom-params-4bd856e5.js';
import './request-fa80ae40.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
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
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './get-form-json-1d4e3591.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './hostedServiceUtils-f22b023b.js';
import './is-service-ad021db8.js';
import './_deep-map-values-53f8dbd1.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './getDownloadFlow-6c6d04d5.js';
import './canUseHubDownloadSystem-a22afbb9.js';
import './index-edff2d62.js';
import './types-2eaa1a18.js';
import './getDownloadConfiguration-6cb6d32f.js';
import './types-303cd4d6.js';
import './shouldShowDownloadsConfiguration-385c6ff6.js';
import './getService-e61b8c6e.js';
import './remove-7361a90a.js';
import './TemplateBusinessRules-0e35d61b.js';
import './edit-9f487804.js';
import './settings-2d4e159a.js';
import './discussions-api-request-199cae2d.js';
import './request-3e386aeb.js';
import './_enrichments-8641475c.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './map-by-a2234e13.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
import './edit-fa9666f2.js';
import './getPropertyMap-10ee9d61.js';
import './events-c59246f8.js';
import './types-db540898.js';
import './registrations-431b9788.js';
import './defaults-1f93a79e.js';
import './getDefaultEventDatesAndTimes-4847a519.js';
import './hubSearch-41612481.js';
import './merge-objects-5b123ab3.js';
import './get-850c466d.js';
import './search-211dee83.js';
import './channels-2574fd6e.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';

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
    registerInstance(this, hostRef);
    this.arcgisHubWorkspaceEntityChange = createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
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
    bind(this, "handleDelete", "handleEdit", "handleMove", "handleAddMetric", "handleOnEditorClose", "handleOnChangedMetric", "handleOnSavedMetric", "handleConfirmDelete", "handleCloseDeleteModal", "hubTelemetryHandler", "handleEditorInitialized");
  }
  /**
    * provides auth & portal information
    */
  get _context() { return getGlobalContext(); }
  /**
   * type of entity, used for i18nScope
   */
  get type() {
    return getTypeFromEntity(this.entity);
  }
  /**
   * getter for if we have reached the maximum number of metrics
   */
  get isAtMetricCapacity() {
    return this.metricDisplays.length >= MAX_ENTITY_METRICS_ALLOWED;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.initializeMetrics();
  }
  /** Creates state for metrics and metrics displays. */
  initializeMetrics() {
    this.metricDisplays = getProp(this.entity, "view.metricDisplays") || [];
    // have to typecast since not all entities have metrics as of now
    this.metrics = getEntityMetrics(this.entity) || [];
  }
  hubTelemetryHandler(event) {
    const { detail } = event;
    event.stopPropagation();
    let telemetry = detail;
    // save new metric or save edits to existing metric
    if (detail.category === dist.constants.category.CONTENT && detail.action === dist.constants.action.UPDATE && detail.label === dist.constants.label.METRICS) {
      telemetry = this.metricInFocus ?
        dist.dictionary.category.content.action.update.label.metric.details.update :
        dist.dictionary.category.content.action.update.label.metric.details.create;
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
    const entity = cloneObject(this.entity);
    setProp("metrics", metrics, entity);
    setProp("view.metricDisplays", metricDisplays, entity);
    // update entity and state
    this.metrics = metrics;
    this.metricDisplays = metricDisplays;
    let updatedEntity;
    try {
      updatedEntity = await updateHubEntity(this.type, entity, this._context);
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
    this.hubTelemetry.emit({ telemetry: dist.dictionary.category.interaction.action.open.label.editor.details.metric, composedPath: e.composedPath() });
  }
  /** fires when delete is clicked from the metric calcite-dropdown menu */
  handleDelete(e) {
    // grab metric in focus
    const metricId = e.target.getAttribute("data-metric");
    this.setMetricInFocus(metricId);
    // launch delete modal
    this.showDeleteModal = true;
    this.hubTelemetry.emit(dist.dictionary.category.interaction.action.open.label.modal.details.delete);
  }
  handleCloseDeleteModal(telemetry = true) {
    this.showDeleteModal = false;
    this.isDeleting = false;
    this.setMetricInFocus();
    // only fire close telemetry if intentionally closing modal
    if (telemetry) {
      this.hubTelemetry.emit(dist.dictionary.category.interaction.action.close.label.modal.details.delete);
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
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.content.action.update.label.metric.details.delete), { response: !!success ? dist.constants.response.SUCCESS : dist.constants.response.FAILURE }));
    // only close once the promise is finished
    this.handleCloseDeleteModal(false);
  }
  /** Fired when add metric button is clicked to open editor to create new metrics */
  handleAddMetric(evt) {
    this.isEditorOpen = true;
    this.hubTelemetry.emit({ telemetry: dist.dictionary.category.interaction.action.open.label.editor.details.metric, composedPath: evt.composedPath() });
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
      this.hubTelemetry.emit(dist.dictionary.category.interaction.action.close.label.editor.details.metric);
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
    const featuredDisplays = this.metricDisplays.filter((display) => display.visibility === MetricVisibility.featured);
    const visibleDisplays = this.metricDisplays.filter((display) => display.visibility === MetricVisibility.visible);
    const hiddenDisplays = this.metricDisplays.filter((display) => display.visibility === MetricVisibility.hidden);
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
      if (targetVisibility === MetricVisibility.hidden || (targetVisibility === MetricVisibility.visible && visibility === MetricVisibility.featured)) {
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
        [MetricVisibility.featured]: dist.dictionary.category.content.action.update.label.metric.details.featured,
        [MetricVisibility.visible]: dist.dictionary.category.content.action.update.label.metric.details.show,
        [MetricVisibility.hidden]: dist.dictionary.category.content.action.update.label.metric.details.hide,
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
    return (h("calcite-dropdown-item", { "data-metric": metricId, "data-target-visibility": targetVisibility, "data-visibility": visibility, key: metricId, onClick: this.handleMove }, text));
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
    const featuredCount = this.metricDisplays.filter((display) => display.visibility === MetricVisibility.featured).length;
    switch (visibility) {
      // metric that is currently featured
      case MetricVisibility.featured:
        result = [
          this.getMoveDropdownItem({ metricId, visibility, targetVisibility: MetricVisibility.visible, text: this.intl.t("actions.removeFeatured") }),
          this.getMoveDropdownItem({ metricId, visibility, targetVisibility: MetricVisibility.hidden, text: this.intl.t("actions.hide") }),
        ];
        break;
      // metric that is currently visible
      case MetricVisibility.visible:
        result = [];
        if (featuredCount < MAX_FEATURED_METRICS_ALLOWED) {
          result.push(this.getMoveDropdownItem({ metricId, visibility, targetVisibility: MetricVisibility.featured, text: this.intl.t("actions.featured") }));
        }
        result.push(this.getMoveDropdownItem({ metricId, visibility, targetVisibility: MetricVisibility.hidden, text: this.intl.t("actions.hide") }));
        break;
      // metric that is currently hidden
      case MetricVisibility.hidden:
        result = [];
        if (featuredCount < MAX_FEATURED_METRICS_ALLOWED) {
          result.push(this.getMoveDropdownItem({ metricId, visibility, targetVisibility: MetricVisibility.featured, text: this.intl.t("actions.featured") }));
        }
        result.push(this.getMoveDropdownItem({ metricId, visibility, targetVisibility: MetricVisibility.visible, text: this.intl.t("actions.show") }));
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
    return (h("calcite-dropdown", { placement: "bottom-end", scale: "m" }, h("calcite-button", { appearance: "transparent", "aria-haspopup": true, iconStart: "ellipsis", kind: "neutral", label: this.intl.t('optionsLabel', { name: metric.name }), round: true, slot: "trigger" }), h("calcite-dropdown-group", { role: "menu", selectionMode: "none" }, this.renderMoveActions(metricId, visibility), h("calcite-dropdown-item", { "data-element": "edit-menu-item", "data-metric": metricId, onClick: this.handleEdit }, this.intl.t("actions.edit")), h("calcite-dropdown-item", { "data-metric": metricId, onClick: this.handleDelete }, this.intl.t("actions.delete")))));
  }
  /**
   * Renders a single empty featured metric
   * @param metricOrder
   * @returns
   */
  renderEmptyFeaturedMetric(metricOrder) {
    const number = this.intl.t(`metricNumber.${metricOrder}`);
    return (h("div", { class: "hub-entity-metrics__empty-featured-metric" }, number));
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
      result = (h(Fragment, null, h("div", { class: {
          "hub-entity-metrics__metrics-wrapper": true,
          "featured-metric": isFeatured
        } }, h("arcgis-hub-metric-card", { cardConfig: Object.assign(Object.assign({}, metricDisplay), { scale: SCALE.medium, shadow: DROP_SHADOWS.low }), metric: metric }), isFeatured ? h("p", { class: "hub-entity-metrics__metrics-featured-label" }, this.intl.t("featured").toUpperCase()) : ""), this.renderMetricActions(metricDisplay, metric)));
    }
    else {
      result = isFeatured ? this.renderEmptyFeaturedMetric(metricOrder) : undefined;
    }
    return h("div", { class: "hub-entity-metrics__metric-container" }, result);
  }
  /**
   * renders all "featured metrics, in the metrics pane
   */
  renderFeaturedMetrics() {
    let featuredMetricDisplays = [];
    // TODO: replace visibility with enum exported from hub-common
    if (this.metricDisplays) {
      featuredMetricDisplays = this.metricDisplays.filter((m) => m.visibility === MetricVisibility.featured);
    }
    // fill with empty state to ensure we always have at least four spots
    if (featuredMetricDisplays.length < 4) {
      const emptyState = new Array(4 - featuredMetricDisplays.length).fill({});
      featuredMetricDisplays = [...featuredMetricDisplays, ...emptyState];
    }
    // create metric element to render
    const featuredMetrics = featuredMetricDisplays.map((metricDisplay, index) => this.renderMetric(metricDisplay, true, index + 1));
    return (h("div", { class: "hub-entity-metrics__metrics-grid" }, featuredMetrics));
  }
  /**
   * renders all "visible" metrics, in the metrics pane.
   */
  renderVisibleMetrics() {
    let visibleMetrics = h("h3", { class: "hub-entity-metrics__no-metrics" }, this.intl.t('visible.noMetrics'));
    if (this.metricDisplays.length) {
      const visibleMetricDisplays = this.metricDisplays.reduce((acc, display) => {
        if (display.visibility === MetricVisibility.visible) {
          acc.push(this.renderMetric(display, false));
        }
        return acc;
      }, []);
      visibleMetrics = visibleMetricDisplays.length ? visibleMetricDisplays : visibleMetrics;
    }
    // We are doing this because the full grid will reserve space for 4 metrics, but if we have less than 4, we want to use a smaller grid
    // to not show a bunch of white space
    // const className = visibleMetrics.length > 2 ? "hub-entity-metrics__metrics-grid" : "hub-entity-metrics__metrics-grid-small";
    return (h("div", { class: "hub-entity-metrics__metrics-grid" }, visibleMetrics));
  }
  /**
   * Renders any hidden metric displays, if there are any.
   * @returns
   */
  renderHiddenMetrics() {
    // default helper text saying no metrics are found
    let result = h("h3", { class: "hub-entity-metrics__no-metrics" }, this.intl.t('hidden.noMetrics'));
    // let className = "hub-entity-metrics__metrics-grid";
    // if displays, then render any hiddenmetrics
    if (this.metricDisplays.length) {
      const hiddenMetrics = this.metricDisplays.reduce((acc, display) => {
        // only grab hidden metrics
        if (display.visibility === MetricVisibility.hidden) {
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
    return h("div", { class: "hub-entity-metrics__metrics-grid" }, result);
  }
  /**
   * Renders all metrics (featured, visible, and hidden) in the publishing part of the metrics pane.
   */
  renderMetrics() {
    return (h("calcite-flow-item", null, h("div", { class: "hub-entity-metrics__featured" }, h("h2", { class: "hub-entity-metrics__section-title" }, this.intl.t('featured')), h("p", { class: "hub-entity-metrics__helper-text" }, this.intl.t(`${this.type}.featured.description`)), this.renderFeaturedMetrics()), h("div", { class: "hub-entity-metrics__visible" }, h("h2", { class: "hub-entity-metrics__section-title" }, this.intl.t('visible.title')), h("p", { class: "hub-entity-metrics__helper-text" }, this.intl.t(`${this.type}.visible.description`)), this.renderVisibleMetrics()), h("div", { class: "hub-entity-metrics__hidden" }, h("h2", { class: "hub-entity-metrics__section-title" }, this.intl.t('hidden.title')), h("p", { class: "hub-entity-metrics__helper-text" }, this.intl.t('hidden.description')), this.renderHiddenMetrics())));
  }
  /**
   * Renders the entity-editor in a calcite-flow-item.
   * Used for creating or editing a metric.
   */
  renderEditor() {
    const id = this.metricInFocus && this.metricInFocus.id;
    const name = this.metricInFocus && this.metricInFocus.name;
    return (h("calcite-flow-item", { class: "hub-entity-metrics__editor-calcite-flow", description: this.intl.t("editor.description"), heading: name ? name : this.intl.t("editor.heading"), onCalciteFlowItemBack: this.handleOnEditorClose }, h("arcgis-hub-entity-editor", { editorContext: { metricId: id }, editorType: `hub:${this.type}:metrics`, entity: this.entity, footerSlotRef: this.footerSlotEl, onArcgisHubEntityEditorChange: this.handleOnChangedMetric, onArcgisHubEntityEditorInitialization: this.handleEditorInitialized, onArcgisHubEntityEditorSaved: this.handleOnSavedMetric, onHubTelemetry: this.hubTelemetryHandler, variant: CONFIGURATION_VARIANTS.workspace })));
  }
  /**
   * Renders the confirm delete modal for a metric.
   */
  renderDeleteModal() {
    return (h("calcite-modal", { kind: "danger", onCalciteModalClose: this.handleCloseDeleteModal, open: this.showDeleteModal }, h("h1", { slot: "header" }, this.intl.t("deleteMetricModal.heading")), h("div", { slot: "content" }, h("p", { class: "modal-description" }, this.intl.t("deleteMetricModal.content")), h("p", { class: "modal-metric-name" }, this.metricInFocus.name)), h("calcite-button", { appearance: "solid", disabled: this.isDeleting, kind: "danger", loading: this.isDeleting, onClick: this.handleConfirmDelete, slot: "primary" }, this.intl.t("deleteMetricModal.delete")), h("calcite-button", { appearance: "outline-fill", kind: "brand", onClick: this.handleCloseDeleteModal, slot: "secondary" }, this.intl.t("deleteMetricModal.cancel"))));
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
      const result = editorToMetric(this.editorValues || {}, id, {});
      metric = result.metric;
      displayConfig = result.displayConfig;
    }
    return (h("calcite-tabs", { class: "metric-preview" }, h("calcite-tab-nav", { slot: "title-group" }, h("calcite-tab-title", { "aria-selected": true, class: "preview-tab-title", selected: MetricEditorTabs.PREVIEW === this.activeTab }, this.intl.t(`sidePanel.preview`))), h("calcite-tab", null, h("arcgis-hub-metric-card", { cardConfig: Object.assign(Object.assign({}, displayConfig), { shadow: DROP_SHADOWS.medium, border: true }), metric: metric }))));
  }
  /** renders the pane side panel of calcite-notices. */
  renderSidePanel() {
    return (h("div", { class: "hub-entity-metrics__side-panel", slot: "side-panel" }, h("calcite-notice", { icon: "user-key", open: true, width: this.isMobile ? "full" : "auto" }, h("p", { slot: "message" }, this.intl.t(`${this.type}.sideNotices.metricLocation.message`)), h("calcite-link", { href: "https://doc.arcgis.com/en/hub/initiatives/add-metrics.htm", "icon-end": "launch", slot: "link", target: "_blank" }, this.intl.t(`${this.type}.sideNotices.metricLocation.metricsDockLink`))), this.isEditorOpen && this.renderEditorPreview()));
  }
  /** renders the current count of metrics created in the workspace */
  renderMetricCount() {
    const kind = this.isAtMetricCapacity ? "warning" : "info";
    const icon = this.isAtMetricCapacity ? "exclamation-mark-triangle" : "";
    return (h("div", null, h("calcite-notice", { icon: icon, kind: kind, open: true, scale: "s" }, h("div", { slot: "title" }, this.intl.t("metricCount.label", {
      currentCount: this.metricDisplays.length,
      totalCountAllowed: MAX_ENTITY_METRICS_ALLOWED
    })))));
  }
  /** renders the "Add metric" button at the top of the pane to allow users to add a new metric. Navigates to the editor calcite-flow-item. */
  renderAddMetric() {
    return !this.isEditorOpen && (h("div", { class: "hub-entity-metrics__add-metric", slot: "primary-actions" }, this.renderAddMetricButton(), this.renderMetricCount()));
  }
  /**
   * Renders the add metric button in the primary actions slot.
   * Will render with a tooltip wrapping it if the user is at the metric capacity.
   * @returns
   */
  renderAddMetricButton() {
    const button = h("calcite-button", { appearance: "solid", "data-element": "add-metric-button", disabled: this.isAtMetricCapacity, onClick: this.handleAddMetric, round: true }, this.intl.t("addMetric"));
    return (this.isAtMetricCapacity ?
      h("arcgis-ref-tooltip", { placement: 'right', text: this.intl.t("metricCount.tooltip") }, button)
      : button);
  }
  render() {
    return (h(Host, { "data-element": "workspace-entity-metrics" }, h("arcgis-hub-workspace-pane", { isMobile: this.isMobile }, h("h1", { slot: "title" }, this.intl.t("title")), h("span", { slot: "subtitle" }, this.intl.t('metricDescription')), this.renderAddMetric(), h("div", { class: {
        "hub-entity-metrics__content": true,
        "hub-entity-metrics__content-edit": this.isEditorOpen
      } }, h("calcite-flow", null, this.renderMetrics(), this.isEditorOpen && this.renderEditor())), this.renderSidePanel(), h("div", { ref: (el) => { this.footerSlotEl = el; }, slot: "footer" }), this.showDeleteModal && this.renderDeleteModal())));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "entity": ["initializeMetrics"]
  }; }
};
ArcgisHubEntityMetrics.style = arcgisHubEntityMetricsCss;

export { ArcgisHubEntityMetrics as arcgis_hub_entity_metrics };
