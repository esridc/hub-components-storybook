import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { C as CORNERS, D as DROP_SHADOWS } from './interfaces-0d0bef14.js';
import { d as dist } from './index-dd3f99ac.js';
import { g as getEntityLayoutUrl, a as getEntityWorkspaceUrl } from './urls-0e36649d.js';
import { g as getTypeFromEntity } from './getTypeFromEntity-e149b61e.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './_commonjsHelpers-11ca3be1.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './extent-34a4ba2a.js';
import './request-fa80ae40.js';
import './helpers-8c7e5e31.js';
import './logger-f8667200.js';

const arcgisHubAddContentResultsCss = ":host{display:block}calcite-accordion-item.success{--calcite-accordion-item-icon-color:var(--calcite-color-status-success)}calcite-accordion-item.fail{--calcite-accordion-item-icon-color:var(--calcite-color-status-warning)}arcgis-hub-gallery{text-align:start}[slot=\"actions\"]{display:flex;flex-direction:column;gap:2rem;align-items:center;width:100%}arcgis-hub-entity-card{text-align:start;width:50%}calcite-accordion{width:60%}";

const ArcgisHubAddContentResults = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.handleGroupCardClick = () => {
      // this handles the title click event for the group card
      this.hubTelemetry.emit(dist.dictionary.category.navigation.action.view.label.groups);
    };
    this.renderGallery = (query, slotName) => {
      const galleryProps = {
        callback: (viewModel, _layout, _context, entity) => {
          const editLayoutUrl = getEntityLayoutUrl(entity);
          viewModel.actionLinks = [
            {
              href: getEntityWorkspaceUrl(entity, _context),
              label: this.intl.t('manageEntity'),
              showLabel: true,
              buttonStyle: 'outline'
            },
            (editLayoutUrl) ? {
              href: editLayoutUrl,
              label: this.intl.t('editLayout'),
              showLabel: true,
              buttonStyle: 'outline'
            } : undefined,
            {
              href: entity.links.siteRelative,
              label: this.intl.t('viewEntity'),
              showLabel: true
            },
          ].filter(Boolean);
          return viewModel;
        },
        corners: CORNERS.round,
        disableTelemetry: true,
        limit: 100,
        linkTarget: 'workspaceRelative',
        newTab: true,
        primaryActionsToRender: 3,
        query,
        shadow: DROP_SHADOWS.low,
        showAdditionalInfo: false,
        showBadges: false,
        showOwner: false,
        slot: slotName
      };
      return h("arcgis-hub-gallery", Object.assign({}, galleryProps));
    };
    this.renderEntities = () => {
      const entityType = getTypeFromEntity(this.results.entities[0]);
      const targetEntity = ['group', 'event'].includes(entityType) ? entityType : 'item';
      const query = {
        filters: [
          {
            predicates: [
              {
                id: this.results.entities.map(e => e.id)
              }
            ]
          }
        ],
        targetEntity
      };
      return this.renderGallery(query, 'actions');
    };
    this.renderAccordionItem = (which, receipt) => {
      var _a, _b;
      if (!!((_a = receipt[which]) === null || _a === void 0 ? void 0 : _a.length)) {
        let expanded = true;
        if (which === 'success') {
          expanded = !((_b = receipt.fail) === null || _b === void 0 ? void 0 : _b.length);
        }
        const accordionArgs = {
          expanded,
          heading: which === 'success' ? this.intl.t(`${this.workflow}.successfulAccordionHeading`) : this.intl.t(`${this.workflow}.unsuccessfulAccordionHeading`),
          iconStart: which === 'success' ? 'check-circle' : 'exclamation-mark-triangle',
        };
        const query = which === 'success' ? receipt.successQuery : receipt.failQuery;
        return h("calcite-accordion-item", Object.assign({}, accordionArgs, { class: which }), !!receipt[which].length && this.renderGallery(query));
      }
    };
    this.renderReceipt = (receipt) => {
      let accordionItems = [this.renderAccordionItem('success', receipt), this.renderAccordionItem('fail', receipt)];
      if (this.results.overallStatus !== 'success') {
        accordionItems = accordionItems.reverse();
      }
      return h("div", { slot: "actions" }, h("arcgis-hub-entity-card", { corners: CORNERS.round, entity: receipt.group, linkTarget: "siteRelative", newTab: true, onArcgisHubCardTitleLinkClick: this.handleGroupCardClick, shadow: DROP_SHADOWS.low, showAdditionalInfo: false, showBadges: false, showType: false }), h("calcite-accordion", { scale: "l", selectionMode: "single" }, accordionItems));
    };
    this.workflow = undefined;
    this.results = undefined;
    this.icon = undefined;
    this.helpStateClass = undefined;
    this.helpStateConfig = undefined;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  handleResultsItemClick() {
    // this handles the title click event for the gallery items
    this.hubTelemetry.emit(dist.dictionary.category.navigation.action.view.label.content);
  }
  _renderAddExistingResults() {
    var _a;
    if (this.workflow === 'existing') {
      const helpStateConfig = Object.assign(Object.assign({}, this.helpStateConfig), { heading: this.intl.t(this.helpStateConfig.heading) });
      return h(Fragment, null, h("arcgis-hub-help-state", Object.assign({ class: this.helpStateClass }, helpStateConfig), (_a = this.results) === null || _a === void 0 ? void 0 :
        _a.receipts.map(this.renderReceipt), !this.results.receipts.length && this.renderEntities()));
    }
  }
  _renderCreateNewResults() {
    if (this.workflow === 'create') {
      const message = this.intl.t(this.helpStateConfig.message);
      const helpStateConfig = Object.assign(Object.assign({}, this.helpStateConfig), { message });
      let groupLink;
      if (this.results.groups.length) {
        groupLink = `<calcite-link href="${this.results.groups[0].links.siteRelative}" icon-end="launch" target="_blank">${this.results.groups[0].name}</calcite-link>`;
      }
      return (h(Fragment, null, h("arcgis-hub-help-state", Object.assign({ class: this.helpStateClass }, helpStateConfig), h("h3", { innerHTML: this.intl.t(this.helpStateConfig.heading, { group: groupLink }), slot: "heading" }), this.renderEntities())));
    }
  }
  render() {
    return (h(Host, { "data-element": "add-content-results" }, this._renderAddExistingResults(), this._renderCreateNewResults()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubAddContentResults.style = arcgisHubAddContentResultsCss;

export { ArcgisHubAddContentResults as arcgis_hub_add_content_results };
