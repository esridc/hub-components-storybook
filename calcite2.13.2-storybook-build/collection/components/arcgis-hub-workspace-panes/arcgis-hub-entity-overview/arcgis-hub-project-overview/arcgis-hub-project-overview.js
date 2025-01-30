import { Host, h } from '@stencil/core';
import { bBoxToExtent, orgExtent, getProp } from '@esri/hub-common';
import intlManager from '../../../../utils/intl-manager';
/**
 * TODO: we're currently leveraging the map symbology defined for
 * the discussions components. We should standardize and centralize
 * this logic in the future
 */
import symbols, { defaultLayerThemeOptions } from '../../../arcgis-hub-discussions-map-integrator/symbols';
import { SYMBOL_STATE } from '../../../arcgis-hub-discussions-map-integrator/utils/utils';
import Graphic from '@arcgis/core/Graphic';
import { constants as telemetryConstants, dictionary } from '@esri/telemetry-dictionary-hub';
import { COMMON_TELEMETRY } from '../../../arcgis-telemetry-report/interfaces';
import { getGlobalContext } from '../../../../utils/state';
export class ArcgisHubProjectOverview {
  constructor() {
    this.entity = undefined;
  }
  get _context() { return getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    try {
      // TODO - this throws an unhandled exception when there is no session, but we should be
      // able to get org extent without a session
      this.orgExtent = await orgExtent(this._context.hubRequestOptions);
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
    const isHubHome = window.location.href.startsWith(getProp(this._context, 'hubHomeUrl'));
    const isUmbrella = window.location.href.startsWith(getProp(this._context, 'hubUrl'));
    return !(isHubHome || isUmbrella);
  }
  get mapSettings() {
    return getProp(this.entity, 'view.mapSettings');
  }
  get hasLocation() {
    return this.entity.location && this.entity.location.type !== "none";
  }
  get extent() {
    return this.hasLocation
      ? bBoxToExtent(this.entity.location.extent)
      : this.orgExtent;
  }
  get graphics() {
    const { geometries = [] } = this.entity.location;
    if (!this.hasLocation) {
      return [];
    }
    ;
    return geometries.length
      ? geometries.map(geometry => {
        return new Graphic({
          geometry,
          symbol: symbols[geometry.type](SYMBOL_STATE.DEFAULT, defaultLayerThemeOptions[geometry.type])
        });
      })
      : [
        {
          symbol: symbols.polygon(SYMBOL_STATE.DEFAULT, defaultLayerThemeOptions.polygon),
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
    return (h("arcgis-telemetry-report", { contentId: `portal:${this.entity.id}`, context: this._context, dataTransforms: dataTransforms, dimensionFilters: [{ name: "action", not: [telemetryConstants.action.MANAGE] }], endDate: endDate, hostname: window.location.hostname, reportTitle: this.intl.t('telemetry.pageViews'), startDate: startDate, subtitle: this.intl.t('telemetry.last30days'), telemetryEvent: COMMON_TELEMETRY['page-views'], trailingText: isNew ? this.intl.t('telemetry.checkTomorrow') : this.intl.t('telemetry.lastUpdated', { hoursElapsed: roundedHoursElapsed }), type: "metric" }));
  }
  renderMetadata() {
    return (h("div", null, h("arcgis-hub-entity-metadata", { entity: this.entity, exclude: ['access'] })));
  }
  renderLearnAboutNotice() {
    return (h("calcite-notice", { icon: 'lightbulb', kind: 'brand', open: true, width: "full" }, h("arcgis-hub-workspace-link", { href: "https://doc.arcgis.com/en/hub/initiatives/use-projects.htm", iconEnd: "launch", slot: "link", target: "_blank", telemetry: dictionary.category.navigation.action.external.label.webHelp.details.learnMoreAboutHubProjects }, this.intl.t('learnAbout'))));
  }
  renderStatusAndPurpose() {
    return (h("div", { class: 'project-overview__status-purpose-container' }, h("calcite-chip", { appearance: "outline", icon: this.entity.status === 'complete' ? 'check' : '', scale: "l", value: this.entity.status }, this.intl.t(`status.${this.entity.status}`)), h("div", { class: 'project-overview__purpose' }, this.renderPurpose())));
  }
  renderPurpose() {
    return (this.entity.summary
      ? h("div", null, this.entity.summary)
      : h("div", { class: 'project-overview__no-purpose-message' }, this.intl.t('noPurposeSet')));
  }
  renderMap() {
    return (h("arcgis-hub-map", { basemap: 'gray-vector', expand: 1.5, extent: this.extent, graphics: this.graphics, settings: this.mapSettings }, this.hasLocation
      ? null
      : h("div", { class: "project-overview__map-overlay" }, h("div", { class: "project-overview__no-location-message" }, this.intl.t('noLocationSet')))));
  }
  renderEditButton() {
    return (h("div", null, h("arcgis-hub-workspace-link", { pane: "details" }, h("calcite-button", { appearance: 'outline', round: true }, this.intl.t('editDetails')))));
  }
  render() {
    return (h(Host, { "data-element": "project-overview" }, h("arcgis-hub-workspace-pane", null, h("h1", { slot: "title" }, this.intl.t('overview')), h("div", null, h("div", { class: 'project-overview__main' }, this.renderStatusAndPurpose(), this.renderMap(), this.renderEditButton())), h("div", { slot: "side-panel" }, this.renderLearnAboutNotice(), this.shouldShowPageViews && this.renderPageViews(), this.renderMetadata()))));
  }
  static get is() { return "arcgis-hub-project-overview"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-project-overview.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-project-overview.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "entity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubProject",
          "resolved": "IHubProject",
          "references": {
            "IHubProject": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      }
    };
  }
  static get events() {
    return [{
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
          "original": "Record<string, any>",
          "resolved": "{ [x: string]: any; }",
          "references": {
            "Record": {
              "location": "global"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
}
