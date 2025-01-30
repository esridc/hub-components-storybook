'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const eventGalleryCard = require('./event-gallery-card-80fb05f5.js');
const memoize = require('./memoize-1f967971.js');
require('./interfaces-fc0046ff.js');
require('./generate-random-string-8807d629.js');
require('./get-prop-4bd8fc1a.js');

const arcgisHubEventGalleryCardCss = ":host{display:block;background-color:var(--calcite-color-foreground-1);padding:0.75rem;color:var(--calcite-color-text-1)}:host([corners=\"round\"]){--calcite-card-corner-radius:10px;border-radius:var(--calcite-card-corner-radius)}:host([shadow=\"low\"]){--tw-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);--tw-shadow-colored:0 4px 8px -1px var(--tw-shadow-color), 0 2px 4px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([shadow=\"medium\"]){--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([shadow=\"heavy\"]){--tw-shadow:0 12px 32px -2px rgba(0, 0, 0, 0.1), 0 4px 20px 0 rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 12px 32px -2px var(--tw-shadow-color), 0 4px 20px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}";

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const ArcgisHubEventGalleryCard = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    /**
     * A date range object representing the unix epoch
     */
    this.unixEpochPredicate = {
      startDateRange: {
        type: 'date-range',
        from: new Date(0).toISOString(),
        to: new Date(0).toISOString(),
      },
    };
    this.cardConfig = undefined;
    this.isMobile = false;
  }
  /**
   * Applies migrations to the cardConfig to make sure we're working with the latest supported
   * schema structure
   */
  get _cardConfig() {
    return eventGalleryCard.migrateEventGalleryCardSchema(this.cardConfig);
  }
  /**
   * Builds the query predicate value for dynamic mode
   */
  get dynamicModePredicate() {
    return this._cardConfig.entityIds.length
      ? {
        entityId: this._cardConfig.entityIds,
        access: this._cardConfig.access,
        tags: this._cardConfig.tags,
        categories: this._cardConfig.categories,
        endDateAfter: new Date().valueOf(),
      }
      : this.unixEpochPredicate;
  }
  /**
   * Builds the query predicate value for manual mode
   */
  get manualModePredicate() {
    return this._cardConfig.eventIds.length ? { id: this._cardConfig.eventIds } : this.unixEpochPredicate;
  }
  /**
   * Builds the query property value used by the gallery to populate event results
   */
  get query() {
    const predicate = this._cardConfig.selectionMode === 'dynamic' ? this.dynamicModePredicate : this.manualModePredicate;
    return {
      targetEntity: 'event',
      filters: [{ predicates: [predicate] }],
    };
  }
  /**
   * Computes the limit property value used by the gallery to limit the results
   */
  get limit() {
    return this._cardConfig.selectionMode === 'dynamic' ? 4 : this._cardConfig.eventIds.length;
  }
  /**
   * Computes the openIn property value used by the gallery to control whether card title links open in the same or a new tab
   */
  get newTab() {
    return this._cardConfig.openIn === 'new';
  }
  /**
   * Computes the gallery layout options
   */
  get layoutOptions() {
    return ['map', 'list', 'calendar'];
  }
  /**
   * Computes the gallery map settings
   */
  get galleryMapSettings() {
    return { extent: 'continuous' };
  }
  /**
   * Primary render method
   */
  render() {
    return (index.h(index.Host, { corners: this._cardConfig.corners, "data-element": "event-gallery-card", shadow: this._cardConfig.shadow, unthemed: true }, index.h("arcgis-hub-gallery", { cardTitleTag: this._cardConfig.titleHeading, galleryMapSettings: this.galleryMapSettings, layout: this._cardConfig.layout, layoutOptions: this.layoutOptions, limit: this.limit, mobileView: this.isMobile, newTab: this.newTab, query: this.query, showAdditionalInfo: this._cardConfig.showAdditionalInfo, showBadges: false, showLayoutSwitcher: true, showMoreResultsBtn: true, showOwner: false, showResultsCount: true, showSearch: true, showThumbnail: false, showType: true, sortField: "startDate", sortOrder: "asc" })));
  }
  get element() { return index.getElement(this); }
};
__decorate([
  memoize.MemoizeDecoratorFactory('cardConfig')
], ArcgisHubEventGalleryCard.prototype, "_cardConfig", null);
__decorate([
  memoize.MemoizeDecoratorFactory('_cardConfig.entityIds', '_cardConfig.access', '_cardConfig.tags', '_cardConfig.categories')
], ArcgisHubEventGalleryCard.prototype, "dynamicModePredicate", null);
__decorate([
  memoize.MemoizeDecoratorFactory('_cardConfig.eventIds')
], ArcgisHubEventGalleryCard.prototype, "manualModePredicate", null);
__decorate([
  memoize.MemoizeDecoratorFactory('_cardConfig.selectionMode', 'dynamicModePredicate', 'manualModePredicate')
], ArcgisHubEventGalleryCard.prototype, "query", null);
__decorate([
  memoize.MemoizeDecoratorFactory()
], ArcgisHubEventGalleryCard.prototype, "layoutOptions", null);
__decorate([
  memoize.MemoizeDecoratorFactory()
], ArcgisHubEventGalleryCard.prototype, "galleryMapSettings", null);
ArcgisHubEventGalleryCard.style = arcgisHubEventGalleryCardCss;

exports.arcgis_hub_event_gallery_card = ArcgisHubEventGalleryCard;
