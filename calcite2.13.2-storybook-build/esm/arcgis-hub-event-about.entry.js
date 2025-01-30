import { r as registerInstance, h, H as Host, a as getElement } from './index-57f71b44.js';
import { c as sanitizeHtml } from './hubSanitizer-45ca9e6e.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { M as MemoizeDecoratorFactory } from './memoize-dfcfa834.js';
import './index-55cb25f7.js';
import './_commonjsHelpers-11ca3be1.js';
import './get-prop-ec5be510.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './generate-random-string-1436d9e6.js';

const arcgisHubEventAboutCss = ":host{margin-top:1rem;display:flex;gap:4rem}.entity-about-main{flex:2}.entity-about-side-bar{flex:1}.entity-about-main>div:not(:last-child),.entity-about-side-bar>div:not(:last-child){margin-bottom:2.5rem}calcite-notice{margin-bottom:1rem}";

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
const ArcgisHubEventAbout = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
__decorate([
  MemoizeDecoratorFactory('entity.description')
], ArcgisHubEventAbout.prototype, "sanitizedDescription", null);
__decorate([
  MemoizeDecoratorFactory('entity.startDateTime', 'entity.endDateTime', 'intl.locale')
], ArcgisHubEventAbout.prototype, "dateRange", null);
__decorate([
  MemoizeDecoratorFactory('entity.isCanceled', 'entity.isPast')
], ArcgisHubEventAbout.prototype, "noticeConfig", null);
__decorate([
  MemoizeDecoratorFactory('entity')
], ArcgisHubEventAbout.prototype, "referencedContentQuery", null);
ArcgisHubEventAbout.style = arcgisHubEventAboutCss;

export { ArcgisHubEventAbout as arcgis_hub_event_about };
