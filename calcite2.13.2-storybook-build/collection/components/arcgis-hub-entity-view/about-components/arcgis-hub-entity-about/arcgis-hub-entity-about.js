import { cacheBustUrl, getProp, getTypeFromEntity, getWithDefault, MetricVisibility } from '@esri/hub-common';
import { Host, h, Fragment } from '@stencil/core';
import { sanitizeHtml } from '../../../../utils/hubSanitizer';
import { getGlobalContext } from '../../../../utils/state';
import intlManager from '../../../../utils/intl-manager';
import { CORNERS, SCALE } from '../../../interfaces';
import { bind } from '../../../../utils/context';
import { ViewTabs } from '../../types';
/**
 * generic entity overview tab component
 *
 * note: there is currently no flexibility when it comes to
 * sections/headings/layout. This is something we plan
 * to continue iterating on and integrating with the next
 * generation layout system
 *
 * @slot - main slot for adding content below the default main content
 * @slot - sidebar slot for adding content below the default sidebar content
 */
export class ArcgisHubEntityAbout {
  constructor() {
    /**
     * We must listen to the change in results from the gallery
     * to determine whether to render the "Featured content" section.
     * We can't simply check the length of the featuredContentIds array
     * because the current user may not have access to all of the items
     */
    this.handleFeaturedContentResultsChange = (evt) => {
      this.hasFeaturedContent = !!evt.detail.length;
    };
    this.handleTabChange = (evt) => {
      this.arcgisHubEntityAboutTabChange.emit(evt);
    };
    this.entity = undefined;
    this.path = "";
    this.hasFeaturedContent = false;
    bind(this, 'handleTabChange');
  }
  async componentWillLoad() {
    console.info(`Entity About: PATH: ${this.path}`);
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /** global context: contextual portal & auth information */
  get _context() { return getGlobalContext(); }
  get entityType() {
    return getTypeFromEntity(this.entity);
  }
  get view() {
    const { view = {} } = this.entity || {};
    return view;
  }
  get shouldRenderAbout() {
    var _a, _b, _c, _d;
    return !!((_a = this.entity) === null || _a === void 0 ? void 0 : _a.summary)
      || !!((_b = this.entity) === null || _b === void 0 ? void 0 : _b.description)
      || !!((_c = this.view.embeds) === null || _c === void 0 ? void 0 : _c.length)
      || !!((_d = this.view.featuredContentIds) === null || _d === void 0 ? void 0 : _d.length);
  }
  get shouldRenderStatus() {
    return !!getProp(this.entity, 'status')
      || !!this.view.timeline;
  }
  get featuredImageUrl() {
    var _a;
    const queryParams = ((_a = this._context) === null || _a === void 0 ? void 0 : _a.isAuthenticated) ? `?token=${this._context.session.token}` : '';
    return cacheBustUrl(`${this.view.featuredImageUrl}${queryParams}`);
  }
  get metricDisplays() {
    var _a, _b;
    return ((_b = (_a = this.view) === null || _a === void 0 ? void 0 : _a.metricDisplays) === null || _b === void 0 ? void 0 : _b.filter((display) => (display === null || display === void 0 ? void 0 : display.visibility) !== MetricVisibility.hidden)) || [];
  }
  get featuredMetricDisplays() {
    var _a;
    return ((_a = this.view.metricDisplays) === null || _a === void 0 ? void 0 : _a.filter((display) => (display === null || display === void 0 ? void 0 : display.visibility) === MetricVisibility.featured)) || [];
  }
  renderAbout() {
    var _a, _b, _c;
    return (h("div", null, h("h2", null, this.intl.t("about")), ((_a = this.entity) === null || _a === void 0 ? void 0 : _a.summary) && h("p", null, this.entity.summary), !!((_b = this.view.embeds) === null || _b === void 0 ? void 0 : _b.length) && h("arcgis-hub-embed-card", { embed: this.view.embeds[0], shareable: true, shareableOnHover: true }), ((_c = this.entity) === null || _c === void 0 ? void 0 : _c.description) && h("p", { innerHTML: sanitizeHtml(this.entity.description) }), this.view.featuredImageUrl && !this.view.hero && (h("arcgis-hub-image", { alt: this.view.featuredImageAltText || "", corners: CORNERS.round, src: this.featuredImageUrl }))));
  }
  renderMetrics() {
    return (h("div", { class: "entity-about__featured-metrics" }, h("h2", null, this.intl.t("metrics")), h("div", { class: 'entity-about__featured-metrics-grid' }, this.featuredMetricDisplays.map((display) => {
      const metrics = getWithDefault(this.entity, 'metrics', []);
      const metric = metrics.find((metric) => metric.id === display.metricId);
      return (h("arcgis-hub-metric-card", { cardConfig: Object.assign(Object.assign({}, display), { scale: SCALE.medium, border: true }), key: metric.id, metric: metric }));
    })), !!this.metricDisplays.length
      && this.metricDisplays.length !== this.featuredMetricDisplays.length
      && (h("calcite-button", { appearance: "outline", "data-scroll": "scroll", "data-tab": ViewTabs.Metrics, onClick: this.handleTabChange, round: true }, this.intl.t("exploreMetrics")))));
  }
  renderFeaturedContent() {
    const query = {
      targetEntity: 'item',
      filters: [{
          predicates: [{ id: this.view.featuredContentIds }]
        }]
    };
    return (h("div", null, this.hasFeaturedContent
      && h("h2", null, this.intl.t('featuredContent')), h("arcgis-hub-gallery", { layout: 'grid', limit: 4, linkTarget: "siteRelative", onArcgisHubGalleryResultsChange: this.handleFeaturedContentResultsChange, path: this.path, query: query, showEmptyState: false, sortByIds: this.view.featuredContentIds })));
  }
  renderStatus() {
    var _a;
    const status = getProp(this.entity, 'status');
    const timeline = this.view.timeline || {};
    return (h(Fragment, null, h("div", null, h("h2", null, this.intl.t(`status.label.${this.entityType}`, {}, this.intl.t('status.label.default'))), !!status && h("calcite-chip", { icon: status === 'complete' ? 'check' : '', scale: "l", value: status }, this.intl.t(`status.${status || 'notStarted'}`))), !!((_a = Object.keys(timeline)) === null || _a === void 0 ? void 0 : _a.length) && h("div", null, h("arcgis-hub-timeline", { canCollapse: timeline.canCollapse, description: timeline.description, stages: timeline.stages, timelineTitle: timeline.title }))));
  }
  renderMetadata() {
    return (h("div", { class: 'entity-view-side-bar__metadata' }, h("h2", null, this.intl.t('details')), h("arcgis-hub-entity-metadata", { entity: this.entity })));
  }
  render() {
    var _a, _b;
    return (h(Host, { "data-element": "entity-about" }, h("div", { class: "entity-about-main" }, this.shouldRenderAbout && this.renderAbout(), !!((_a = this.featuredMetricDisplays) === null || _a === void 0 ? void 0 : _a.length) && this.renderMetrics(), !!((_b = this.view.featuredContentIds) === null || _b === void 0 ? void 0 : _b.length) && this.renderFeaturedContent(), h("slot", { name: "main" })), h("div", { class: 'entity-about-side-bar' }, this.shouldRenderStatus && this.renderStatus(), this.renderMetadata(), h("slot", { name: "sidebar" }))));
  }
  static get is() { return "arcgis-hub-entity-about"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-about.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-about.css"]
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
          "text": "ArcGIS Hub entity"
        }
      },
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
      }
    };
  }
  static get states() {
    return {
      "hasFeaturedContent": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubEntityAboutTabChange",
        "name": "arcgisHubEntityAboutTabChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event emitted when a button or other element is interacted with to change tabs."
        },
        "complexType": {
          "original": "CalciteTabTitleCustomEvent<void>",
          "resolved": "CalciteTabTitleCustomEvent<void>",
          "references": {
            "CalciteTabTitleCustomEvent": {
              "location": "import",
              "path": "@esri/calcite-components"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
}
