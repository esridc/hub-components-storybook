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
import { sanitizeHtml } from '../../../../utils/hubSanitizer';
import intlManager from '../../../../utils/intl-manager';
import Memoize from '../../../../decorators/memoize';
export class ArcgisHubEventAbout {
  constructor() {
    /**
     * Sets hasReferencedContent to true when the event has referenced content and that content is accessible to the user, else false
     * @param evt An ArcgisHubGalleryCustomEvent<IHubSearchResult[]> object
     */
    this.handleReferencedContentResultsChange = (evt) => {
      this.hasReferencedContent = !!evt.detail.length;
    };
    this.path = "";
    this.entity = undefined;
    this.hasReferencedContent = false;
  }
  /**
   * Component will load lifecycle method. Loads translations.
   */
  async componentWillLoad() {
    await this.loadIntl();
  }
  /**
   * Loads the translations for the component
   */
  async loadIntl() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Returns a sanitized copy of the entity description string
   */
  get sanitizedDescription() {
    var _a;
    return sanitizeHtml((_a = this.entity.description) !== null && _a !== void 0 ? _a : '');
  }
  /**
   * Returns a string representing the event's start & end date/time formatted for the user's locale
   */
  get dateRange() {
    return this.intl.formatDateTimeRange(this.entity.startDateTime, this.entity.endDateTime, { dateStyle: 'full', timeStyle: 'long' });
  }
  /**
   * Returns notice configs for past and canceled events
   */
  get noticeConfig() {
    let noticeConfig;
    if (this.entity.isCanceled) {
      noticeConfig = {
        kind: 'danger',
        message: this.intl.t('notice.canceled'),
      };
    }
    else if (this.entity.isPast) {
      noticeConfig = {
        kind: 'warning',
        message: this.intl.t('notice.ended'),
      };
    }
    return noticeConfig;
  }
  /**
   * Builds the query used to render the referenced content in a gallery component
   */
  get referencedContentQuery() {
    var _a;
    if ((_a = this.entity.referencedContentIds) === null || _a === void 0 ? void 0 : _a.length) {
      return {
        targetEntity: 'item',
        filters: [{
            predicates: [{ id: this.entity.referencedContentIds }],
          }],
      };
    }
  }
  /**
   * Renders a calcite-notice when a noticeConfig exists (past & canceled events)
   */
  renderNotice() {
    if (this.noticeConfig) {
      return (h("calcite-notice", { kind: this.noticeConfig.kind, open: true }, h("div", { slot: "title" }, this.noticeConfig.message)));
    }
  }
  /**
   * Renders the When and Where section
   */
  renderWhen() {
    return (h("div", { class: "entity-about-main__when-and-where" }, h("h2", null, this.intl.t('about')), this.renderNotice(), h("p", null, this.dateRange)));
  }
  /**
   * Renders the Summary section
   */
  renderSummary() {
    if (this.entity.summary) {
      return (h("div", { class: "entity-about-main__summary" }, h("h2", null, this.intl.t('summary')), this.entity.summary));
    }
  }
  /**
   * Renders the Description section
   */
  renderDescription() {
    if (this.entity.description) {
      return (h("div", { class: "entity-about-main__description" }, h("h2", null, this.intl.t('description')), h("div", { innerHTML: this.sanitizedDescription })));
    }
  }
  /**
   * Renders the Metadata section
   */
  renderMetadata() {
    return (h("div", { class: "entity-about-side-bar__summary" }, h("h2", null, this.intl.t('details')), h("arcgis-hub-entity-metadata", { entity: this.entity })));
  }
  /**
   * Renders the Referenced Content section
   */
  renderReferencedContent() {
    if (this.referencedContentQuery) {
      return (h("div", { class: "entity-about-side-bar__connected-content" }, this.hasReferencedContent && (h("h2", null, this.intl.t('referencedContent'))), h("arcgis-hub-gallery", { layout: "grid", limit: 1, linkTarget: "siteRelative", onArcgisHubGalleryResultsChange: this.handleReferencedContentResultsChange, path: this.path, query: this.referencedContentQuery, showAdditionalInfo: false, showBadges: false, showEmptyState: false, showOwner: false, showThumbnail: false, showType: false, sortByIds: this.entity.referencedContentIds })));
    }
  }
  /**
   * Primary render method
   */
  render() {
    return (h(Host, null, h("div", { class: "entity-about-main" }, h("div", null, this.renderWhen(), this.renderSummary(), this.renderDescription())), h("div", { class: 'entity-about-side-bar' }, this.renderMetadata(), this.renderReferencedContent())));
  }
  static get is() { return "arcgis-hub-event-about"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-event-about.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-event-about.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "path": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Content Hierarchy Path that will be passed onto the gallery component\nso links are constructed with the correct path"
        },
        "attribute": "path",
        "reflect": false,
        "defaultValue": "\"\""
      },
      "entity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubEvent",
          "resolved": "IHubEvent",
          "references": {
            "IHubEvent": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "A reference to an IHubEvent object"
        }
      }
    };
  }
  static get states() {
    return {
      "hasReferencedContent": {}
    };
  }
  static get elementRef() { return "element"; }
}
__decorate([
  Memoize('entity.description')
], ArcgisHubEventAbout.prototype, "sanitizedDescription", null);
__decorate([
  Memoize('entity.startDateTime', 'entity.endDateTime', 'intl.locale')
], ArcgisHubEventAbout.prototype, "dateRange", null);
__decorate([
  Memoize('entity.isCanceled', 'entity.isPast')
], ArcgisHubEventAbout.prototype, "noticeConfig", null);
__decorate([
  Memoize('entity')
], ArcgisHubEventAbout.prototype, "referencedContentQuery", null);
