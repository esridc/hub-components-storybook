'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const interfaces = require('./interfaces-fc0046ff.js');
const index$1 = require('./index-6f16fe65.js');
const urls = require('./urls-2533c98f.js');
const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./get-family-cafa88bb.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./extent-715f7c8d.js');
require('./request-67da3c71.js');
require('./helpers-64227739.js');
require('./logger-5db3d659.js');

const arcgisHubAddContentResultsCss = ":host{display:block}calcite-accordion-item.success{--calcite-accordion-item-icon-color:var(--calcite-color-status-success)}calcite-accordion-item.fail{--calcite-accordion-item-icon-color:var(--calcite-color-status-warning)}arcgis-hub-gallery{text-align:start}[slot=\"actions\"]{display:flex;flex-direction:column;gap:2rem;align-items:center;width:100%}arcgis-hub-entity-card{text-align:start;width:50%}calcite-accordion{width:60%}";

const ArcgisHubAddContentResults = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.handleGroupCardClick = () => {
      // this handles the title click event for the group card
      this.hubTelemetry.emit(index$1.dist.dictionary.category.navigation.action.view.label.groups);
    };
    this.renderGallery = (query, slotName) => {
      const galleryProps = {
        callback: (viewModel, _layout, _context, entity) => {
          const editLayoutUrl = urls.getEntityLayoutUrl(entity);
          viewModel.actionLinks = [
            {
              href: urls.getEntityWorkspaceUrl(entity, _context),
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
        corners: interfaces.CORNERS.round,
        disableTelemetry: true,
        limit: 100,
        linkTarget: 'workspaceRelative',
        newTab: true,
        primaryActionsToRender: 3,
        query,
        shadow: interfaces.DROP_SHADOWS.low,
        showAdditionalInfo: false,
        showBadges: false,
        showOwner: false,
        slot: slotName
      };
      return index.h("arcgis-hub-gallery", Object.assign({}, galleryProps));
    };
    this.renderEntities = () => {
      const entityType = getTypeFromEntity.getTypeFromEntity(this.results.entities[0]);
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
        return index.h("calcite-accordion-item", Object.assign({}, accordionArgs, { class: which }), !!receipt[which].length && this.renderGallery(query));
      }
    };
    this.renderReceipt = (receipt) => {
      let accordionItems = [this.renderAccordionItem('success', receipt), this.renderAccordionItem('fail', receipt)];
      if (this.results.overallStatus !== 'success') {
        accordionItems = accordionItems.reverse();
      }
      return index.h("div", { slot: "actions" }, index.h("arcgis-hub-entity-card", { corners: interfaces.CORNERS.round, entity: receipt.group, linkTarget: "siteRelative", newTab: true, onArcgisHubCardTitleLinkClick: this.handleGroupCardClick, shadow: interfaces.DROP_SHADOWS.low, showAdditionalInfo: false, showBadges: false, showType: false }), index.h("calcite-accordion", { scale: "l", selectionMode: "single" }, accordionItems));
    };
    this.workflow = undefined;
    this.results = undefined;
    this.icon = undefined;
    this.helpStateClass = undefined;
    this.helpStateConfig = undefined;
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  handleResultsItemClick() {
    // this handles the title click event for the gallery items
    this.hubTelemetry.emit(index$1.dist.dictionary.category.navigation.action.view.label.content);
  }
  _renderAddExistingResults() {
    var _a;
    if (this.workflow === 'existing') {
      const helpStateConfig = Object.assign(Object.assign({}, this.helpStateConfig), { heading: this.intl.t(this.helpStateConfig.heading) });
      return index.h(index.Fragment, null, index.h("arcgis-hub-help-state", Object.assign({ class: this.helpStateClass }, helpStateConfig), (_a = this.results) === null || _a === void 0 ? void 0 :
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
      return (index.h(index.Fragment, null, index.h("arcgis-hub-help-state", Object.assign({ class: this.helpStateClass }, helpStateConfig), index.h("h3", { innerHTML: this.intl.t(this.helpStateConfig.heading, { group: groupLink }), slot: "heading" }), this.renderEntities())));
    }
  }
  render() {
    return (index.h(index.Host, { "data-element": "add-content-results" }, this._renderAddExistingResults(), this._renderCreateNewResults()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubAddContentResults.style = arcgisHubAddContentResultsCss;

exports.arcgis_hub_add_content_results = ArcgisHubAddContentResults;
