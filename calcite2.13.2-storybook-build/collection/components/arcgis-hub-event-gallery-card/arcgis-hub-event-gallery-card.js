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
import { Host, h } from '@stencil/core';
import { migrateEventGalleryCardSchema } from '../../utils/event-gallery-card';
import Memoize from '../../decorators/memoize';
/**
 * A layout card component to render a gallery of events. This component supports dynamically populating the gallery with events that possess a reference to one or more selected entities in dynamic mode, else specifically selected events in manual mode.
 */
export class ArcgisHubEventGalleryCard {
  constructor() {
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
    return migrateEventGalleryCardSchema(this.cardConfig);
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
    return (h(Host, { corners: this._cardConfig.corners, "data-element": "event-gallery-card", shadow: this._cardConfig.shadow, unthemed: true }, h("arcgis-hub-gallery", { cardTitleTag: this._cardConfig.titleHeading, galleryMapSettings: this.galleryMapSettings, layout: this._cardConfig.layout, layoutOptions: this.layoutOptions, limit: this.limit, mobileView: this.isMobile, newTab: this.newTab, query: this.query, showAdditionalInfo: this._cardConfig.showAdditionalInfo, showBadges: false, showLayoutSwitcher: true, showMoreResultsBtn: true, showOwner: false, showResultsCount: true, showSearch: true, showThumbnail: false, showType: true, sortField: "startDate", sortOrder: "asc" })));
  }
  static get is() { return "arcgis-hub-event-gallery-card"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-event-gallery-card.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-event-gallery-card.css"]
    };
  }
  static get properties() {
    return {
      "cardConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "EventGalleryCardSchema",
          "resolved": "IEventGalleryCardSchemaV1 | IEventGalleryCardSchemaV2 | IEventGalleryCardSchemaV3",
          "references": {
            "EventGalleryCardSchema": {
              "location": "import",
              "path": "../../utils/event-gallery-card"
            }
          }
        },
        "required": true,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An EventGalleryCardSchema object representing the card configuration values"
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
          "text": "True when the card is being rendered in a mobile screen context"
        },
        "attribute": "is-mobile",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get elementRef() { return "element"; }
}
__decorate([
  Memoize('cardConfig')
], ArcgisHubEventGalleryCard.prototype, "_cardConfig", null);
__decorate([
  Memoize('_cardConfig.entityIds', '_cardConfig.access', '_cardConfig.tags', '_cardConfig.categories')
], ArcgisHubEventGalleryCard.prototype, "dynamicModePredicate", null);
__decorate([
  Memoize('_cardConfig.eventIds')
], ArcgisHubEventGalleryCard.prototype, "manualModePredicate", null);
__decorate([
  Memoize('_cardConfig.selectionMode', 'dynamicModePredicate', 'manualModePredicate')
], ArcgisHubEventGalleryCard.prototype, "query", null);
__decorate([
  Memoize()
], ArcgisHubEventGalleryCard.prototype, "layoutOptions", null);
__decorate([
  Memoize()
], ArcgisHubEventGalleryCard.prototype, "galleryMapSettings", null);
