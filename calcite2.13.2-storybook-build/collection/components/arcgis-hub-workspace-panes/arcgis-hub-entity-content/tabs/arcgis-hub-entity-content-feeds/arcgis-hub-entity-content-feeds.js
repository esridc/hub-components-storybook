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
import { Logger, getFeedTemplate, setFeedTemplate, cloneObject, getTypeFromEntity, hubSearch, previewFeed, updateHubEntity, getProp, getLayerIdFromUrl } from "@esri/hub-common";
import { h, Host, Fragment } from "@stencil/core";
import intlManager from "../../../../../utils/intl-manager";
import { ContentPaneTabs } from "../../types";
import { bind } from "../../../../../utils/context";
import Debounce from "../../../../../decorators/debounce";
import { getEntityCatalogGroupIds } from "../../../../../utils/workspace/getEntityCatalogGroupIds";
import { getService } from "@esri/arcgis-rest-feature-layer";
import { getGlobalContext, showNotice } from "../../../../../utils/state";
import { constants, dictionary } from "@esri/telemetry-dictionary-hub";
/**
 * This component is responsible for configuring feeds for a Hub entity.
 * As of now, feeds are only supported for public sites with a group-based catalog.
 * Feeds also only support item-based results, so other entity types are not supported (e.g., events)
 * Once our backend APIs support feeds for other entity types, we can expand functionality here.
 */
export class ArcgisHubEntityContentFeeds {
  constructor() {
    this.entity = undefined;
    this.footerSlotRef = undefined;
    this.hasGrouplessCatalog = undefined;
    this.hasEmptyPublicCatalog = undefined;
    this.isFeedsToggleEnabled = undefined;
    this.feedFormat = undefined;
    this.feedVersion = undefined;
    this.feedTemplate = undefined;
    this.isPreviewing = undefined;
    this.previewPickerSchema = undefined;
    this.previewPickerUiSchema = undefined;
    this.previewHubId = undefined;
    this.formattedPreview = undefined;
    this.isFeedsToggleDirty = undefined;
    this.isTemplateEditorDirty = undefined;
    this.isSaving = undefined;
    this.attemptedFormatChange = undefined;
    this.isLoading = undefined;
    this.previewStatus = undefined;
    bind(this, 'openCatalogTab', 'openCatalogConfigTab', 'handleFeedsEnabledToggle', 'handleFeedFormatChange', 'handleCodeEditorChange', 'handlePreviewToggle', 'handlePreviewItemChange', 'handleSaveFeedsClick', 'handleCopyButtonClicked');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.initializeComponent();
  }
  /**
   * Whenever the entity changes (e.g., sharing level is changed in the workspace header)
   * we need to re-initialize the component to reflect the new state. Feeds is very dependent
   * on the current configuration of the entity.
   */
  async initializeComponent() {
    this.setIsLoading(true);
    await this._initializeState();
    this.setIsLoading(false);
  }
  setIsLoading(value) {
    this.isLoading = value;
  }
  /**
   * Initializes the component state based on the current entity configuration.
   * NOTE: Call this.initializeComponent() instead of this method directly.
   */
  async _initializeState() {
    // Reset state to defaults
    this.hasGrouplessCatalog = false;
    this.hasEmptyPublicCatalog = false;
    this.isFeedsToggleEnabled = !getProp(this.entity, 'feeds.disabled');
    this.isFeedsToggleDirty = false;
    this.isPreviewing = false;
    this.previewPickerSchema = null;
    this.previewPickerUiSchema = null;
    this.previewHubId = null;
    this.formattedPreview = null;
    this.isSaving = false;
    this.attemptedFormatChange = null;
    // Feeds are not supported for private entities
    if (this.entity.access !== 'public') {
      return;
    }
    // Feeds are not supported for entities without a group-based catalog
    this.hasGrouplessCatalog = !getEntityCatalogGroupIds(this.entity).length;
    if (this.hasGrouplessCatalog) {
      return;
    }
    // Feeds cannot be configured if the catalog has no public items
    const firstSearchResult = await this.fetchPublicResultFromCatalog();
    if (!firstSearchResult) {
      this.hasEmptyPublicCatalog = true;
      return;
    }
    // Feeds _can_ be configured, so let's initialize the editor
    // NOTE: In case the entity is updated while the user is editing a non-default feed format (e.g. rss),
    // we need to re-initialize the editor with the correct format and version. Default to DCAT-US 1.1.
    this.initializeTemplateEditor(this.feedFormat || 'dcat-us', this.feedVersion || '1.1');
    // Derive the initial preview hubId and set the preview picker schemas
    this.previewHubId = this.getPreviewHubId(firstSearchResult);
    this.setPreviewPickerSchemas();
  }
  /**
   * TODO: consider moving to a utility
   * Fetch the first public item from the entity's catalog. Used to derive the
   * item for previewing and to set the state of the preview picker.
   * @param additionalFilters additional filters to apply to the search query
   * @returns the first public result within the entity's catalog
   */
  async fetchPublicResultFromCatalog(additionalFilters) {
    try {
      // We only show the feeds tab if there are public items in the catalog,
      // so we have to perform a live search to check.
      // NOTE: this._catalog includes predicates to only fetch public items
      const query = cloneObject(this._publicItemCatalog.scopes.item);
      if (additionalFilters) {
        query.filters = query.filters.concat(additionalFilters);
      }
      const searchOptions = {
        num: 1,
        requestOptions: getGlobalContext().hubRequestOptions,
      };
      const { total: hasPublicItems, results } = await hubSearch(query, searchOptions);
      if (hasPublicItems) {
        const result = results[0];
        // NOTE: there is a bug in the enrichment process that causes the pipeline to error out
        // when attempting to fetch the service definition for non-service items. As a result,
        // We'll do it manually here for now.
        if (result.type === 'Feature Service' || result.type === 'Map Service') {
          const getServiceOptions = {
            url: result.rawResult.url,
            authentication: getGlobalContext().hubRequestOptions.authentication
          };
          result.server = await getService(getServiceOptions);
        }
        return result;
      }
    }
    catch (err) {
      Logger.error('error fetching catalog result', err);
    }
  }
  /**
   * TODO: consider moving to a utility
   *
   * Derive a valid hubId for the preview functionality based on a search result.
   * Due to idiosyncrasies of our indexing system, we need to jump through
   * a number of hoops to calculate the correct id.
   * @param searchResult IHubSearchResult used derive the preview hubId from.
   * Should be enriched with server info if it's a service.
   * @returns a valid hubId for the preview picker
   */
  getPreviewHubId(searchResult) {
    let previewHubId;
    const referenceLayerId = ['Feature Service', 'Map Service'].includes(searchResult.type) && getLayerIdFromUrl(searchResult.rawResult.url);
    const hasLayers = !!getProp(searchResult, 'server.layers.length');
    // Feeds rely on the indexer and the indexer does odd things for certain service permutations.
    // As a result, we make some checks to properly construct a valid hubId for the preview
    if (referenceLayerId && hasLayers) {
      // We only index the reference layer for reference layer services
      previewHubId = `${searchResult.id}_${referenceLayerId}`;
    }
    else if (hasLayers) {
      // We index the service and all layers for multi-layer services, but only the service for single-layer services.
      // To play it safe, we opt always use the first layer present in the service since it's guaranteed to be indexed.
      // NOTE: the first layer is _not_ always 0. Customers do strange things when they manage their services.
      previewHubId = `${searchResult.id}_${searchResult.server.layers[0].id}`;
    }
    else {
      // Non-service items have the same hubId as the item itself
      previewHubId = searchResult.id;
    }
    return previewHubId;
  }
  setPreviewPickerSchemas() {
    this.previewPickerSchema = {
      type: "object",
      properties: {
        previewItem: {
          type: "array",
          items: {
            type: "string"
          },
          maxItems: 1,
        },
      }
    };
    const i18nScope = 'toolsSection.previewSampleData';
    this.previewPickerUiSchema = {
      type: 'layout',
      elements: [
        {
          label: this.intl.t('toolsSection.previewSampleData.label'),
          scope: "/properties/previewItem",
          type: "Control",
          options: {
            control: "hub-field-input-gallery-picker",
            targetEntity: "item",
            catalogs: [
              this._publicItemCatalog
            ],
            facets: [
              {
                label: this.intl.t(`${i18nScope}.pickerFacets.type`),
                key: 'type',
                display: 'multi-select',
                field: 'type',
                options: [],
                operation: 'OR',
                aggLimit: 100,
              },
              {
                label: this.intl.t(`${i18nScope}.pickerFacets.tags`),
                key: 'tags',
                display: 'multi-select',
                field: 'tags',
                options: [],
                operation: 'OR',
              },
              {
                label: this.intl.t(`${i18nScope}.pickerFacets.categories`),
                key: 'categories',
                display: 'tree',
                field: 'categories',
                options: [],
                operation: 'OR',
              },
              {
                label: this.intl.t(`${i18nScope}.pickerFacets.dateUpdated`),
                key: 'modified',
                display: 'date-range',
                field: 'modified',
                state: 'open',
                max: new Date(),
              },
              {
                label: this.intl.t(`${i18nScope}.pickerFacets.sharing`),
                key: 'access',
                display: 'multi-select',
                field: 'access',
                options: [],
                operation: 'OR',
              },
            ]
          }
        },
      ]
    };
  }
  /**
   * Returns whether feeds could even be configured for the current entity.
   */
  get isFeedsSupported() {
    return this.entity.access === 'public' && !this.hasGrouplessCatalog && !this.hasEmptyPublicCatalog;
  }
  get supportedFeeds() {
    return [
      { format: 'dcat-us', version: '1.1' },
      { format: 'dcat-ap', version: '2.1.1' },
      { format: 'rss', version: '2.0' }
    ];
  }
  get hasUneditableAttributes() {
    var _a;
    const withUneditableAttributes = {
      'dcat-us': {
        '1.1': true
      },
      'dcat-ap': {
        '2.1.1': true
      }
    };
    return !!((_a = withUneditableAttributes[this.feedFormat]) === null || _a === void 0 ? void 0 : _a[this.feedVersion]);
  }
  /**
   * returns the base i18n key for the current feed format and version
   */
  get baseFeedIntlKey() {
    return this.getBaseFeedIntlKey(this.feedFormat, this.feedVersion);
  }
  /**
   * Calculates the base i18n key for a given feed format and version.
   * @param format
   * @param version
   * @returns the base i18n key
   */
  getBaseFeedIntlKey(format, version) {
    return `${format}.${version}`;
  }
  /**
   * Whether the current feed template in the editor contains invalid JSON.
   * We use this for messaging and to prevent the user from saving invalid JSON.
   */
  get hasInvalidJson() {
    let result = true;
    if (this.feedTemplate) {
      try {
        JSON.parse(this.feedTemplate);
        result = false;
      }
      catch (_) { }
    }
    return result;
  }
  /**
   * Returns a modified version of the entity's catalog that is suitable for feeds,
   * (Namely it only includes public items and removes extraneous collections)
   */
  get _publicItemCatalog() {
    const result = cloneObject(this.entity.catalog);
    // Remove scopes for non-item entity types since they are not supported by feeds
    result.scopes = { item: result.scopes.item };
    // Remove private results since feeds only deals with public content
    result.scopes.item.filters.push({
      predicates: [{
          access: 'public'
        }]
    });
    // For simplicity, only allow the "all" collection
    result.collections = result.collections.filter(collection => collection.key === 'all');
    return result;
  }
  /**
   * Returns the values for the preview functionality's item picker
   */
  get previewPickerValues() {
    return {
      previewItem: this.previewHubId
        // The gallery picker only supports item ids, so we need to strip the layer id
        ? [this.previewHubId.split('_')[0]]
        : []
    };
  }
  /**
   * Returns the entity's access url for the currently selected format and version.
   */
  get feedAccessUrl() {
    let result;
    const entityType = getTypeFromEntity(this.entity);
    if (entityType === 'site') {
      const { customHostname, defaultHostname } = this.entity;
      const baseUrl = `https://${customHostname || defaultHostname}/api/feed`;
      switch (this.feedFormat) {
        case 'dcat-us':
          result = `${baseUrl}/dcat-us/${this.feedVersion}.json`;
          break;
        case 'dcat-ap':
          result = `${baseUrl}/dcat-ap/${this.feedVersion}.json`;
          break;
        case 'rss':
          result = `${baseUrl}/rss/${this.feedVersion}`;
          break;
      }
    }
    return result;
  }
  /**
   * Returns whether the component is generally in a dirty state. (i.e,
   * the user has made changes to the feeds toggle OR the template editor)
   *
   * NOTE: Be very careful when relying on this property. Due to the form-
   * within-a-form nature of the template editor, it's possible that the property
   * you actually care about is `this.isTemplateEditorDirty`
   */
  get isDirty() {
    return !!this.isFeedsToggleDirty || !!this.isTemplateEditorDirty;
  }
  get shouldDisableSaveButton() {
    return (!this.isDirty ||
      this.isSaving ||
      // We only need to worry about persisting the template when the feeds toggle is enabled
      this.isFeedsToggleEnabled && this.hasInvalidJson);
  }
  /**
   * Clears the dirty state of the template editor and re-populates
   * it with the template for the given format and version.
   *
   * Will also respect the preview toggle state and attempt to preview if active.
   *
   * @param format feed format to initialize the editor with
   * @param version feed format version to initialize the editor with
   */
  initializeTemplateEditor(format, version) {
    this.isTemplateEditorDirty = false;
    this.feedFormat = format;
    this.feedVersion = version;
    try {
      this.feedTemplate = JSON.stringify(getFeedTemplate({
        feedsConfig: this.entity.feeds || {},
        format,
        version
      }), null, 2);
    }
    catch (err) {
      Logger.error('error getting feed template', err);
      this.feedTemplate = '';
    }
    // Attempt to preview if the preview toggle is active
    this.isPreviewing && this.handlePreviewAttempt();
  }
  openCatalogConfigTab() {
    // TODO: Add telemetry
    this.arcgisHubEntityContentTabChangeRequest.emit(ContentPaneTabs.CATALOG_CONFIG);
  }
  openCatalogTab() {
    // TODO: Add telemetry
    this.arcgisHubEntityContentTabChangeRequest.emit(ContentPaneTabs.CATALOG);
  }
  handleFeedsEnabledToggle() {
    this.isFeedsToggleEnabled = !this.isFeedsToggleEnabled;
    this.isFeedsToggleDirty = true;
    this.arcgisHubWorkspaceEntityChange.emit({
      isDirty: this.isDirty,
      entity: this.entity,
    });
  }
  /**
   * Function that intercepts the feed format change event if the template editor is dirty.
   * If the editor is dirty, we prompt the user to either discard changes or cancel the transition.
   */
  handleFeedFormatChange(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    const [format, version] = event.target.value.split('::');
    if (this.isTemplateEditorDirty) {
      // Setting this property will trigger the dirty state modal to appear
      this.attemptedFormatChange = {
        format: format,
        version,
        event
      };
    }
    else {
      this.initializeTemplateEditor(format, version);
    }
  }
  async handlePreviewToggle() {
    const willPreview = !this.isPreviewing;
    if (willPreview) {
      // reset the formatted preview while loading
      this.formattedPreview = null;
      // fire and forget the preview attempt
      this.handlePreviewAttempt();
    }
    this.isPreviewing = !this.isPreviewing;
  }
  /**
   * Called whenever the preview toggle is activated. If appropriate
   * conditions are met, we attempt to preview the current feed template.
   */
  async handlePreviewAttempt() {
    if (this.previewHubId && !this.hasInvalidJson) {
      try {
        this.setPreviewStatus('loading', null);
        this.formattedPreview = await previewFeed({
          format: this.feedFormat,
          version: this.feedVersion,
          previewTemplate: JSON.parse(this.feedTemplate),
          previewHubId: this.previewHubId,
          context: getGlobalContext(),
        });
        this.setPreviewStatus('success', null);
      }
      catch (err) {
        this.setPreviewStatus('error', err);
        Logger.error('Error previewing feed', err);
      }
    }
  }
  setPreviewStatus(status, message) {
    this.previewStatus = { state: status, message };
  }
  /**
   * Handles the event emitted by the preview picker when the user
   * selects a new item to preview (or clears the selection entirely)
   */
  async handlePreviewItemChange(event) {
    const [newItemId] = event.detail.values.previewItem;
    // If the user clears the selection, we should clear the preview
    if (!newItemId) {
      this.previewHubId = null;
      return;
    }
    // If a new item is selected, attempt to preview it
    const currentItemId = this.previewHubId && this.previewHubId.split('_')[0];
    if (newItemId !== currentItemId) {
      // NOTE: the preview picker only gives us an item id, so we need to get the fully
      // hydrated search result to derive the correct hubId
      const additionalFilters = [{
          predicates: [{ id: newItemId }]
        }];
      const searchResult = await this.fetchPublicResultFromCatalog(additionalFilters);
      // TODO: Should we show an error state if the search fails?
      if (searchResult) {
        this.previewHubId = this.getPreviewHubId(searchResult);
        this.handlePreviewAttempt();
      }
    }
  }
  // We separate the debounced handler from the logic to allow for easier testing
  handleCodeEditorChange(event) {
    this._handleCodeEditorChange(event);
  }
  _handleCodeEditorChange(event) {
    // NOTE: the code editor emits a change event whenever this.entity changes, even if the template value
    // is exactly the same. As such, we check if the template has _actually_ changed before proceeding.
    if (event.detail !== this.feedTemplate) {
      this.feedTemplate = event.detail;
      // Mark the entity as dirty and emit the change event
      this.isTemplateEditorDirty = true;
      this.arcgisHubWorkspaceEntityChange.emit({
        isDirty: this.isDirty,
        entity: this.entity
      });
    }
  }
  /**
   * Emits telemetry for the save attempt
   * @param response the response from the save attempt
   */
  saveTelemetry(response) {
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary
      .category.content
      .action.update
      .label.feeds), {
      // either disabled or the feed format we're attempting to save
      details: this.isFeedsToggleEnabled ? this.feedFormat : constants.details.DISABLED, response: response
    }));
  }
  async handleSaveFeedsClick() {
    this.setIsSaving(true);
    try {
      const entityToUpdate = cloneObject(this.entity);
      let configToUpdate = cloneObject(this.entity.feeds) || {};
      // Always update the disabled state of the feeds config
      configToUpdate.disabled = !this.isFeedsToggleEnabled;
      // Only update the template when the feeds toggle is enabled
      if (this.isFeedsToggleEnabled) {
        configToUpdate = setFeedTemplate({
          feedsConfig: configToUpdate,
          format: this.feedFormat,
          version: this.feedVersion,
          updatedTemplate: JSON.parse(this.feedTemplate)
        });
      }
      entityToUpdate.feeds = configToUpdate;
      // Update the entity
      const entityType = getTypeFromEntity(entityToUpdate);
      const updated = await updateHubEntity(entityType, entityToUpdate, getGlobalContext());
      // Reset dirty state and emit the change event
      this.isFeedsToggleDirty = false;
      this.isTemplateEditorDirty = false;
      this.arcgisHubWorkspaceEntityChange.emit({
        entity: updated,
        isDirty: false,
      });
      // emit success telemetry
      this.saveTelemetry(constants.response.SUCCESS);
      // Show a success notice
      // TODO: Should we abstract the notice display out to a higher component?
      showNotice({
        title: this.intl.t('alertMessages.success'),
        message: '',
        configuration: {
          noticeType: 'alert',
          autoClose: true,
          autoCloseDuration: 'fast',
          icon: true,
          kind: 'success',
          label: this.intl.t('formAlert')
        }
      });
    }
    catch (err) {
      Logger.error('Error saving feeds', err);
      this.arcgisHubWorkspaceEntityChange.emit({
        entity: this.entity,
        isDirty: true,
      });
      // emit failure telemetry
      this.saveTelemetry(constants.response.FAILURE);
      showNotice({
        title: this.intl.t('alertMessages.error'),
        message: '',
        configuration: {
          noticeType: 'alert',
          autoClose: true,
          autoCloseDuration: 'fast',
          icon: true,
          kind: 'danger',
          label: this.intl.t('formAlert')
        }
      });
    }
    finally {
      this.setIsSaving(false);
    }
  }
  setIsSaving(value) {
    this.isSaving = value;
  }
  /**
   * This is a listener for the dirty state modal that is specific to the template editor.
   * When a user attempts to change the feed format while the template editor is dirty,
   * we prompt the user to either discard changes or cancel the transition. This listener
   * is responsible for handling the user's choice.
   */
  handleDirtyStateModalClosed(event) {
    // First, we prevent propagation to the root <arcgis-hub-entity-content> component
    event.preventDefault();
    event.stopImmediatePropagation();
    // true === they clicked cancel
    // false === they clicked okay
    if (event.detail) {
      this.attemptedFormatChange = null;
    }
    else {
      // user is OK w/ navigating away and losing changes;
      // re-init the template editor with the new format
      const { format, version } = this.attemptedFormatChange;
      this.initializeTemplateEditor(format, version);
      this.attemptedFormatChange = null;
      // Update parent component with the new dirty state
      this.arcgisHubWorkspaceEntityChange.emit({
        isDirty: this.isDirty,
        entity: this.entity
      });
    }
  }
  renderHeaderRow() {
    return (h("div", { class: "feeds-tab-title-row" }, h("div", { class: "enable-feeds-column" }, h("h3", { class: "feeds-tab-title", "data-test": "entity-content-tab-title" }, this.intl.t('tabTitle')), this.isFeedsSupported
      ? h("calcite-label", null, this.intl.t('enableFeedsToggle.label'), h("calcite-switch", { checked: this.isFeedsToggleEnabled, "data-test": "feeds-toggle", onCalciteSwitchChange: this.handleFeedsEnabledToggle }))
      : this.renderFeedsNotSupportedUi()), this.isFeedsSupported &&
      h("div", { class: "feeds-help-column" }, this.isFeedsToggleEnabled
        /* TODO: convert to arcgis-hub-notice */
        ? h("calcite-notice", { open: true, scale: "m", width: "auto" }, h("div", { slot: "title" }, this.intl.t('gettingStartedNotice.title')), h("div", { slot: "message" }, this.intl.t('gettingStartedNotice.exampleMessage')), h("div", { slot: "message" }, this.intl.t('gettingStartedNotice.previewMessage', {
          catalogFederationLink: (...chunks) => h("calcite-link", { href: "https://doc.arcgis.com/en/hub/content/federate-data-with-external-catalogs.htm", iconEnd: "launch", target: "_blank" }, chunks)
        })))
        : h("arcgis-hub-notice", { noticeId: "20241104-about-feeds-notice" }))));
  }
  renderFeedsNotSupportedUi() {
    let result;
    if (this.entity.access !== 'public') {
      // TODO: convert to arcgis-hub-notice
      result = h("calcite-notice", { "data-test": "is-private-notice", icon: "lightbulb", open: true }, h("div", { slot: "message" }, this.intl.t('enableFeedsToggle.privateNotice')));
    }
    else if (this.hasGrouplessCatalog) {
      result = h(Fragment, null, h("p", { "data-test": "has-groupless-catalog-message" }, this.intl.t('enableFeedsToggle.grouplessCatalog.message')), h("calcite-button", { appearance: "outline-fill", onClick: this.openCatalogConfigTab, round: true }, this.intl.t('enableFeedsToggle.grouplessCatalog.button')));
    }
    else if (this.hasEmptyPublicCatalog) {
      result = h(Fragment, null, h("p", { "data-test": "has-empty-public-catalog-message" }, this.intl.t('enableFeedsToggle.emptyPublicCatalog.message')), h("calcite-button", { appearance: "outline-fill", onClick: this.openCatalogTab, round: true }, this.intl.t('enableFeedsToggle.emptyPublicCatalog.button')));
    }
    return result;
  }
  renderEditorColumn() {
    return h("div", { class: "feeds-editor-column" }, h("h4", null, this.intl.t('feedsEditorSection.title')), h("calcite-label", null, this.intl.t('feedsEditorSection.formatSelectLabel'), h("calcite-select", { onCalciteSelectChange: this.handleFeedFormatChange }, this.supportedFeeds.map(feed => (h("calcite-option", {
      // NOTE: we need to add`this.attemptedFormatChange` to the key to force
      // a re-render when the user attempts to change the format and then cancels
      key: `${feed.format}::${feed.version}::${!!this.attemptedFormatChange}`, selected: this.feedFormat === feed.format && this.feedVersion === feed.version, value: `${feed.format}::${feed.version}`
    }, this.intl.t(`${this.getBaseFeedIntlKey(feed.format, feed.version)}.title`)))))), !!this.hasUneditableAttributes &&
      h("div", { class: "feeds-uneditable-attributes" }, h("div", null, this.intl.t('feedsEditorSection.uneditableAttributesIntro')), h("div", null, this.intl.t(`${this.baseFeedIntlKey}.uneditableAttributes`))), h("div", { class: "editing-main-container" }, h("div", { class: "preview-toggle-container" }, h("calcite-label", { layout: "inline" }, this.intl.t('feedsEditorSection.edit'), h("calcite-switch", { checked: this.isPreviewing, class: "preview-toggle", "data-test": "preview-toggle", onCalciteSwitchChange: this.handlePreviewToggle }), this.intl.t('feedsEditorSection.preview'))), this.isPreviewing ? this.renderPreview() : this.renderTemplateEditor()));
  }
  renderTemplateEditor() {
    return h(Fragment, null, h("arcgis-code-editor", { class: "feeds-code-editor", "data-test": "template-editor", "has-error": this.hasInvalidJson, language: "json", onArcgisValueChange: this.handleCodeEditorChange, value: this.feedTemplate }), this.hasInvalidJson &&
      h("calcite-input-message", { class: "invalid-json-editor-warning", "data-test": "invalid-json-editor-warning", icon: "x-octagon", status: "invalid" }, this.intl.t('feedsEditorSection.invalidJsonEditorWarning')));
  }
  renderPreview() {
    var _a, _b, _c;
    let result;
    if (this.hasInvalidJson) {
      // TODO: convert to arcgis-hub-notice
      result = h("calcite-notice", { class: "preview-notice", "data-test": "invalid-json-preview-warning", kind: "danger", open: true }, h("div", { slot: "message" }, this.intl.t('feedsEditorSection.invalidJsonPreviewWarning')));
    }
    else if (!this.previewHubId) {
      // TODO: convert to arcgis-hub-notice
      result = h("calcite-notice", { class: "preview-notice", "data-test": "no-preview-item-warning", kind: "warning", open: true }, h("div", { slot: "message" }, this.intl.t('feedsEditorSection.selectContentNotice')));
    }
    else if (((_a = this.previewStatus) === null || _a === void 0 ? void 0 : _a.state) === 'loading') {
      result = h("calcite-loader", { active: true, "data-test": "preview-loader" });
    }
    else if (((_b = this.previewStatus) === null || _b === void 0 ? void 0 : _b.state) === 'error') {
      // TODO: convert to arcgis-hub-notice
      result = h("calcite-notice", { class: "preview-notice", "data-test": "preview-error-notice", kind: "danger", open: true }, h("div", { slot: "message" }, this.intl.t('feedsEditorSection.errorPreviewingWarning')));
    }
    else if (((_c = this.previewStatus) === null || _c === void 0 ? void 0 : _c.state) === 'success') {
      result = h("pre", { class: "formatted-preview", "data-test": "feed-preview" }, this.formattedPreview);
    }
    return h("div", { class: "preview-main-container" }, result);
  }
  /**
   * Emits telemetry when the user clicks the copy button for the feed access url
   */
  handleCopyButtonClicked() {
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary
      .category.interaction
      .action.copy
      .label.input), { details: this.feedFormat }));
  }
  renderToolsColumn() {
    return (h("div", { class: "feeds-tools-column" }, h("h4", null, this.intl.t(`${this.baseFeedIntlKey}.title`)), this.renderFeedDescription(), h("h4", null, this.intl.t('toolsSection.title')), this.isPreviewing && this.renderPreviewPicker(), h("h5", null, this.intl.t('toolsSection.verification')), this.renderFeedVerificationLabel(), h("arcgis-copyable-input", { label: this.intl.t('toolsSection.copyableInputLabel'), onArcgisHubCopyButtonClicked: this.handleCopyButtonClicked, readonly: true, value: this.feedAccessUrl })));
  }
  renderPreviewPicker() {
    return h("arcgis-configuration-editor", { class: "preview-picker-form", onArcgisConfigurationEditorChange: this.handlePreviewItemChange, scale: "l", schema: this.previewPickerSchema, uiSchema: this.previewPickerUiSchema, values: this.previewPickerValues });
  }
  renderFeedDescription() {
    var _a;
    const descriptionI18nVariables = {
      'dcat-us': {
        '1.1': {
          dcatUsSchemaLink: (...chunks) => h("calcite-link", { href: "https://resources.data.gov/resources/dcat-us/", iconEnd: "launch", target: "_blank" }, chunks),
          catalogFederationLink: (...chunks) => h("calcite-link", { href: "https://doc.arcgis.com/en/hub/content/federate-data-with-external-catalogs.htm", iconEnd: "launch", target: "_blank" }, chunks)
        }
      },
      'dcat-ap': {
        '2.1.1': {
          lineBreak: () => h("br", null),
          dcatApSchemaLink: (...chunks) => h("calcite-link", { href: "https://joinup.ec.europa.eu/collection/semantic-interoperability-community-semic/solution/dcat-application-profile-data-portals-europe/about", iconEnd: "launch", target: "_blank" }, chunks),
          catalogFederationLink: (...chunks) => h("calcite-link", { href: "https://doc.arcgis.com/en/hub/content/federate-data-with-external-catalogs.htm", iconEnd: "launch", target: "_blank" }, chunks)
        }
      },
      'rss': {
        '2.0': {
          rssAboutLink: (...chunks) => h("calcite-link", { href: "https://validator.w3.org/feed/docs/rss2.html", iconEnd: "launch", target: "_blank" }, chunks),
          xmlSpecLink: (...chunks) => h("calcite-link", { href: "https://www.w3.org/TR/REC-xml/", iconEnd: "launch", target: "_blank" }, chunks),
          catalogFederationLink: (...chunks) => h("calcite-link", { href: "https://doc.arcgis.com/en/hub/content/federate-data-with-external-catalogs.htm", iconEnd: "launch", target: "_blank" }, chunks)
        }
      }
    };
    const i18nVariables = (_a = descriptionI18nVariables[this.feedFormat]) === null || _a === void 0 ? void 0 : _a[this.feedVersion];
    return h("div", null, this.intl.t(`${this.baseFeedIntlKey}.description`, i18nVariables));
  }
  renderFeedVerificationLabel() {
    var _a;
    const descriptionI18nVariables = {
      'dcat-us': {
        '1.1': {
          dcatUsVerificationLink: (...chunks) => h("calcite-link", { href: "https://catalog.data.gov/dcat-us/validator", iconEnd: "launch", target: "_blank" }, chunks),
        }
      },
      'dcat-ap': {
        '2.1.1': {
          dcatApVerificationLink: (...chunks) => h("calcite-link", { href: "https://www.itb.ec.europa.eu/shacl/dcat-ap/upload", iconEnd: "launch", target: "_blank" }, chunks),
        }
      },
      'rss': {
        '2.0': {
          rssVerificationLink: (...chunks) => h("calcite-link", { href: "https://validator.w3.org/feed/", iconEnd: "launch", target: "_blank" }, chunks),
        }
      }
    };
    const i18nVariables = (_a = descriptionI18nVariables[this.feedFormat]) === null || _a === void 0 ? void 0 : _a[this.feedVersion];
    return h("div", null, this.intl.t(`${this.baseFeedIntlKey}.verificationLabel`, i18nVariables));
  }
  renderDirtyStateModal() {
    if (this.attemptedFormatChange) {
      return h("arcgis-hub-workspace-dirty-state-modal", { "is-open": true });
    }
  }
  renderMain() {
    return h(Fragment, null, this.renderHeaderRow(), this.isFeedsSupported && this.isFeedsToggleEnabled &&
      h(Fragment, null, h("div", { class: "horizontal-rule" }), h("section", { class: "feeds-editor-row", "data-test": "feeds-editor-section" }, this.renderEditorColumn(), this.renderToolsColumn())), this.footerSlotRef && this.isFeedsSupported &&
      h("arcgis-wormhole", { styles: { position: 'relative' }, target: this.footerSlotRef }, h("calcite-button", { disabled: this.shouldDisableSaveButton, loading: this.isSaving, onClick: this.handleSaveFeedsClick, round: true }, this.intl.t('saveButton'))), this.renderDirtyStateModal());
  }
  renderLoading() {
    return h("calcite-loader", { active: true, label: this.intl.t('loadingLabel') });
  }
  render() {
    return (h(Host, { "data-element": "entity-content-feeds", "data-test-ready": !this.isLoading }, this.isLoading ? this.renderLoading() : this.renderMain()));
  }
  static get is() { return "arcgis-hub-entity-content-feeds"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-content-feeds.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-content-feeds.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "entity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "HubEntityWithFeeds",
          "resolved": "IHubDiscussion & IWithCatalog & { feeds: IFeedsConfiguration; } | IHubEvent & IWithCatalog & { feeds: IFeedsConfiguration; } | IHubGroup & IWithCatalog & { feeds: IFeedsConfiguration; } | IHubInitiative & IWithCatalog & { feeds: IFeedsConfiguration; } | IHubPage & IWithCatalog & { feeds: IFeedsConfiguration; } | IHubProject & IWithCatalog & { feeds: IFeedsConfiguration; } | IHubSite & IWithCatalog & { feeds: IFeedsConfiguration; } | IHubSurvey & IWithCatalog & { feeds: IFeedsConfiguration; } | IHubTemplate & IWithCatalog & { feeds: IFeedsConfiguration; } | IHubUser & IWithCatalog & { feeds: IFeedsConfiguration; }",
          "references": {
            "HubEntityWithFeeds": {
              "location": "import",
              "path": "../../types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The entity to configure feeds for"
        }
      },
      "footerSlotRef": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "HTMLElement",
          "resolved": "HTMLElement",
          "references": {
            "HTMLElement": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Reference passed from above so we can correctly place the save button"
        }
      }
    };
  }
  static get states() {
    return {
      "hasGrouplessCatalog": {},
      "hasEmptyPublicCatalog": {},
      "isFeedsToggleEnabled": {},
      "feedFormat": {},
      "feedVersion": {},
      "feedTemplate": {},
      "isPreviewing": {},
      "previewPickerSchema": {},
      "previewPickerUiSchema": {},
      "previewHubId": {},
      "formattedPreview": {},
      "isFeedsToggleDirty": {},
      "isTemplateEditorDirty": {},
      "isSaving": {},
      "attemptedFormatChange": {},
      "isLoading": {},
      "previewStatus": {}
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
          "text": ""
        },
        "complexType": {
          "original": "IWorkspaceEntityChange",
          "resolved": "IWorkspaceEntityChange",
          "references": {
            "IWorkspaceEntityChange": {
              "location": "import",
              "path": "../../../../../utils/workspace/types"
            }
          }
        }
      }, {
        "method": "arcgisHubEntityContentTabChangeRequest",
        "name": "arcgisHubEntityContentTabChangeRequest",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event emitted when the user clicks a button that requires a tab change from the parent\n<arcgis-hub-entity-content> component (e.g.,\"Configure Catalog\" button that displays\nwhen the entity has no groups configured for their catalog. \"View Catalog\" button that\ndisplays when the entity has no public items in their catalog, etc.)"
        },
        "complexType": {
          "original": "ContentPaneTabs",
          "resolved": "ContentPaneTabs.CATALOG | ContentPaneTabs.CATALOG_CONFIG | ContentPaneTabs.COLLECTIONS | ContentPaneTabs.FEEDS",
          "references": {
            "ContentPaneTabs": {
              "location": "import",
              "path": "../../types"
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
          "text": ""
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
        "methodName": "initializeComponent"
      }];
  }
  static get listeners() {
    return [{
        "name": "arcgisHubWorkspaceDirtyStateModalClosed",
        "method": "handleDirtyStateModalClosed",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
__decorate([
  Debounce({ timeout: 500 })
], ArcgisHubEntityContentFeeds.prototype, "handleCodeEditorChange", null);
