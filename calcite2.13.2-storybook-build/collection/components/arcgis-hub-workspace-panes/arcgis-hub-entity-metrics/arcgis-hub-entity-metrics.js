import { Host, h, Fragment } from '@stencil/core';
import intlManager from '../../../utils/intl-manager';
import { DROP_SHADOWS, SCALE } from '../../interfaces';
import { bind } from '../../../utils/context';
import { getGlobalContext } from '../../../utils/state';
import { constants as telemetryConstants, dictionary as telemetryDictionary } from '@esri/telemetry-dictionary-hub';
import { CONFIGURATION_VARIANTS } from '../../arcgis-configuration-editor/resources';
import { MetricEditorTabs } from './resources';
import { cloneObject, getEntityMetrics, getProp, getTypeFromEntity, MetricVisibility, setProp, updateHubEntity, MAX_ENTITY_METRICS_ALLOWED, MAX_FEATURED_METRICS_ALLOWED, editorToMetric, } from '@esri/hub-common';
export class ArcgisHubEntityMetrics {
  constructor() {
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
    if (detail.category === telemetryConstants.category.CONTENT && detail.action === telemetryConstants.action.UPDATE && detail.label === telemetryConstants.label.METRICS) {
      telemetry = this.metricInFocus ?
        telemetryDictionary.category.content.action.update.label.metric.details.update :
        telemetryDictionary.category.content.action.update.label.metric.details.create;
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
    this.hubTelemetry.emit({ telemetry: telemetryDictionary.category.interaction.action.open.label.editor.details.metric, composedPath: e.composedPath() });
  }
  /** fires when delete is clicked from the metric calcite-dropdown menu */
  handleDelete(e) {
    // grab metric in focus
    const metricId = e.target.getAttribute("data-metric");
    this.setMetricInFocus(metricId);
    // launch delete modal
    this.showDeleteModal = true;
    this.hubTelemetry.emit(telemetryDictionary.category.interaction.action.open.label.modal.details.delete);
  }
  handleCloseDeleteModal(telemetry = true) {
    this.showDeleteModal = false;
    this.isDeleting = false;
    this.setMetricInFocus();
    // only fire close telemetry if intentionally closing modal
    if (telemetry) {
      this.hubTelemetry.emit(telemetryDictionary.category.interaction.action.close.label.modal.details.delete);
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
    this.hubTelemetry.emit(Object.assign(Object.assign({}, telemetryDictionary.category.content.action.update.label.metric.details.delete), { response: !!success ? telemetryConstants.response.SUCCESS : telemetryConstants.response.FAILURE }));
    // only close once the promise is finished
    this.handleCloseDeleteModal(false);
  }
  /** Fired when add metric button is clicked to open editor to create new metrics */
  handleAddMetric(evt) {
    this.isEditorOpen = true;
    this.hubTelemetry.emit({ telemetry: telemetryDictionary.category.interaction.action.open.label.editor.details.metric, composedPath: evt.composedPath() });
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
      this.hubTelemetry.emit(telemetryDictionary.category.interaction.action.close.label.editor.details.metric);
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
        [MetricVisibility.featured]: telemetryDictionary.category.content.action.update.label.metric.details.featured,
        [MetricVisibility.visible]: telemetryDictionary.category.content.action.update.label.metric.details.show,
        [MetricVisibility.hidden]: telemetryDictionary.category.content.action.update.label.metric.details.hide,
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
  static get is() { return "arcgis-hub-entity-metrics"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-metrics.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-metrics.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "entity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "HubEntity",
          "resolved": "IHubDiscussion | IHubEvent | IHubGroup | IHubInitiative | IHubPage | IHubProject | IHubSite | IHubSurvey | IHubTemplate | IHubUser",
          "references": {
            "HubEntity": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Hub entity of which metrics and metricDisplays will be pulled off of"
        }
      },
      "isMobile": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "is-mobile",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "metricDisplays": {},
      "metrics": {},
      "isEditorOpen": {},
      "metricInFocus": {},
      "footerSlotEl": {},
      "showDeleteModal": {},
      "isDeleting": {},
      "editorValues": {},
      "activeTab": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubWorkspaceEntityChange",
        "name": "arcgisHubWorkspaceEntityChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event to signal to the workspace that the entity has been saved"
        },
        "complexType": {
          "original": "IWorkspaceEntityChange",
          "resolved": "IWorkspaceEntityChange",
          "references": {
            "IWorkspaceEntityChange": {
              "location": "import",
              "path": "../../../utils/workspace"
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
          "text": "* Emits telemetry information"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "entity",
        "methodName": "initializeMetrics"
      }];
  }
}
