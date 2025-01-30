'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const index$1 = require('./index-77afc8bd.js');
const Graphic = require('@arcgis/core/Graphic.js');
const index$2 = require('./index-6f16fe65.js');
const interfaces = require('./interfaces-917746e9.js');
const state = require('./state-6637df8c.js');
const extent = require('./extent-715f7c8d.js');
const getProp = require('./get-prop-4bd8fc1a.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./store-2a385ca0.js');
require('./util-38e73510.js');
require('./request-67da3c71.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

const Graphic__default = /*#__PURE__*/_interopDefaultLegacy(Graphic);

const arcgisHubProjectOverviewCss = ".sc-arcgis-hub-project-overview-h{display:block;height:100%}.project-overview__new-notice-icon.sc-arcgis-hub-project-overview{--calcite-ui-icon-color:var(--calcite-color-status-warning);padding-left:0.25rem}.project-overview__main.sc-arcgis-hub-project-overview{border-radius:10px;border:1px solid var(--calcite-color-border-2);display:flex;flex-direction:column;gap:1rem;background-color:var(--calcite-color-foreground-1);padding:1rem}calcite-chip.sc-arcgis-hub-project-overview{margin-right:1.5rem}[slot=\"title\"].sc-arcgis-hub-project-overview{margin:0px;font-size:var(--calcite-font-size-3);line-height:2rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}.project-overview__status-purpose-container.sc-arcgis-hub-project-overview{display:flex}calcite-chip.sc-arcgis-hub-project-overview,.project-overview__purpose.sc-arcgis-hub-project-overview{align-self:center}arcgis-hub-map.sc-arcgis-hub-project-overview{position:relative;aspect-ratio:200 / 133;height:20rem;width:100%}arcgis-hub-map.sc-arcgis-hub-project-overview .project-overview__map-overlay.sc-arcgis-hub-project-overview{position:absolute;z-index:10;display:flex;height:20rem;width:100%;flex-direction:column;justify-content:center;background-color:#0000004d;color:var(--calcite-color-text-inverse)}.project-overview__no-location-message.sc-arcgis-hub-project-overview{text-align:center}.project-overview__no-purpose-message.sc-arcgis-hub-project-overview{font-style:italic;color:var(--calcite-color-text-3)}";

const ArcgisHubProjectOverview = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.entity = undefined;
  }
  get _context() { return state.getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    try {
      // TODO - this throws an unhandled exception when there is no session, but we should be
      // able to get org extent without a session
      this.orgExtent = await extent.orgExtent(this._context.hubRequestOptions);
    }
    catch (e) {
      console.warn('Failed to fetch org extent', e);
    }
  }
  /**
   * Determine whether to show page views. We don't show page views
   * on the Hub Home or umbrella sites because the telemetry service
   * currently requires they be scoped by a hostname or contentId.
   */
  get shouldShowPageViews() {
    const isHubHome = window.location.href.startsWith(getProp.getProp(this._context, 'hubHomeUrl'));
    const isUmbrella = window.location.href.startsWith(getProp.getProp(this._context, 'hubUrl'));
    return !(isHubHome || isUmbrella);
  }
  get mapSettings() {
    return getProp.getProp(this.entity, 'view.mapSettings');
  }
  get hasLocation() {
    return this.entity.location && this.entity.location.type !== "none";
  }
  get extent() {
    return this.hasLocation
      ? extent.bBoxToExtent(this.entity.location.extent)
      : this.orgExtent;
  }
  get graphics() {
    const { geometries = [] } = this.entity.location;
    if (!this.hasLocation) {
      return [];
    }
    return geometries.length
      ? geometries.map(geometry => {
        return new Graphic__default['default']({
          geometry,
          symbol: index$1.symbols[geometry.type](index$1.SYMBOL_STATE.DEFAULT, index$1.defaultLayerThemeOptions[geometry.type])
        });
      })
      : [
        {
          symbol: index$1.symbols.polygon(index$1.SYMBOL_STATE.DEFAULT, index$1.defaultLayerThemeOptions.polygon),
          geometry: Object.assign({ type: 'extent' }, this.extent)
        }
      ];
  }
  renderPageViews() {
    /**
     * The telemetry API has a nightly data migration from redshift to
     * pg which causes a lag between when telemetry is actually logged
     * and when it shows up in a request. This migration happens at
     * 2am ET and takes about 10 minutes. We want to add a messcleage to
     * let users know about this delay. The following calculates the
     * approximate time elapsed (in hours) from the last update. We
     * round this number to the nearest 0.5 hour and convert it to a
     * language-sensitive representation
     */
    const migrationET = new Date(new Date().toLocaleString('en-US', { timeZone: "America/New_York" })).setHours(2, 30, 0, 0);
    const nowET = Date.parse(new Date().toLocaleString('en-US', { timeZone: "America/New_York" }));
    // we must take into account the time between midnight and
    // 2:30AM ET when the difference between now and the updated
    // date is negative
    const hoursElapsed = (nowET - migrationET) / 36e5 > 0
      ? (nowET - migrationET) / 36e5
      : 24 + (nowET - migrationET) / 36e5;
    const roundedHoursElapsed = (Math.round(hoursElapsed * 2) / 2).toLocaleString(this.intl.locale);
    // we must also check whether the project is new (e.g. created after
    // the last nightly migration). If so, we render "Check back tomorrow"
    // in the trailing text rather than "Last updated ..." and "-" as the value
    const dateCreatedET = Date.parse(new Date(this.entity.createdDate).toLocaleString('en-US', { timeZone: "America/New_York" }));
    const isNew = Math.floor((dateCreatedET - migrationET) / 3.6e6) > 0;
    const dataTransforms = isNew ? [{ name: "page-views:count", value: { display: (val) => (val === 0) ? "-" : val } }] : [];
    /**
     * show pageviews for the last 30 days - start and end dates are relative
     * to the telemetry API migration time
     *
     * Note: we are currently scoping page views by hostname + contentId
     * until we can performantly scope by contentId only
     * TODO: remove hostname once https://zentopia.esri.com/workspaces/platform-workspace-6151c71e92ca09001e28b27f/issues/dc/hub/7029
     * is closed out
     */
    const startDate = new Date(new Date(migrationET).setDate(new Date(migrationET).getDate() - 30)).toISOString();
    const endDate = new Date(migrationET).toISOString();
    return (index.h("arcgis-telemetry-report", { contentId: `portal:${this.entity.id}`, context: this._context, dataTransforms: dataTransforms, dimensionFilters: [{ name: "action", not: [index$2.dist.constants.action.MANAGE] }], endDate: endDate, hostname: window.location.hostname, reportTitle: this.intl.t('telemetry.pageViews'), startDate: startDate, subtitle: this.intl.t('telemetry.last30days'), telemetryEvent: interfaces.COMMON_TELEMETRY['page-views'], trailingText: isNew ? this.intl.t('telemetry.checkTomorrow') : this.intl.t('telemetry.lastUpdated', { hoursElapsed: roundedHoursElapsed }), type: "metric" }));
  }
  renderMetadata() {
    return (index.h("div", null, index.h("arcgis-hub-entity-metadata", { entity: this.entity, exclude: ['access'] })));
  }
  renderLearnAboutNotice() {
    return (index.h("calcite-notice", { icon: 'lightbulb', kind: 'brand', open: true, width: "full" }, index.h("arcgis-hub-workspace-link", { href: "https://doc.arcgis.com/en/hub/initiatives/use-projects.htm", iconEnd: "launch", slot: "link", target: "_blank", telemetry: index$2.dist.dictionary.category.navigation.action.external.label.webHelp.details.learnMoreAboutHubProjects }, this.intl.t('learnAbout'))));
  }
  renderStatusAndPurpose() {
    return (index.h("div", { class: 'project-overview__status-purpose-container' }, index.h("calcite-chip", { appearance: "outline", icon: this.entity.status === 'complete' ? 'check' : '', scale: "l", value: this.entity.status }, this.intl.t(`status.${this.entity.status}`)), index.h("div", { class: 'project-overview__purpose' }, this.renderPurpose())));
  }
  renderPurpose() {
    return (this.entity.summary
      ? index.h("div", null, this.entity.summary)
      : index.h("div", { class: 'project-overview__no-purpose-message' }, this.intl.t('noPurposeSet')));
  }
  renderMap() {
    return (index.h("arcgis-hub-map", { basemap: 'gray-vector', expand: 1.5, extent: this.extent, graphics: this.graphics, settings: this.mapSettings }, this.hasLocation
      ? null
      : index.h("div", { class: "project-overview__map-overlay" }, index.h("div", { class: "project-overview__no-location-message" }, this.intl.t('noLocationSet')))));
  }
  renderEditButton() {
    return (index.h("div", null, index.h("arcgis-hub-workspace-link", { pane: "details" }, index.h("calcite-button", { appearance: 'outline', round: true }, this.intl.t('editDetails')))));
  }
  render() {
    return (index.h(index.Host, { "data-element": "project-overview" }, index.h("arcgis-hub-workspace-pane", null, index.h("h1", { slot: "title" }, this.intl.t('overview')), index.h("div", null, index.h("div", { class: 'project-overview__main' }, this.renderStatusAndPurpose(), this.renderMap(), this.renderEditButton())), index.h("div", { slot: "side-panel" }, this.renderLearnAboutNotice(), this.shouldShowPageViews && this.renderPageViews(), this.renderMetadata()))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubProjectOverview.style = arcgisHubProjectOverviewCss;

exports.arcgis_hub_project_overview = ArcgisHubProjectOverview;
