'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
const state = require('./state-6637df8c.js');
const index$1 = require('./index-6f16fe65.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
const resources = require('./resources-42021303.js');
const memoize = require('./memoize-1f967971.js');
const context = require('./context-0167a31e.js');
const edit = require('./edit-2b7ccc3f.js');
require('./index-f4a4c954.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./store-2a385ca0.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./generate-random-string-8807d629.js');
require('./getPropertyMap-030ec7b2.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./events-7873340d.js');
require('./types-751ad3a9.js');
require('./registrations-a6dd52b7.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./getTypeFromEntity-9476954e.js');
require('./get-family-cafa88bb.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./request-67da3c71.js');
require('./helpers-64227739.js');
require('./slugify-826af07b.js');
require('./defaults-abee9bee.js');
require('./getDefaultEventDatesAndTimes-99ac0275.js');
require('./search-2db68ef4.js');
require('./append-custom-params-0f5d0fe2.js');

const arcgisHubEntityRegistrantsCss = ".sc-arcgis-hub-entity-registrants-h{display:block;height:100%}div[slot=\"title\"].sc-arcgis-hub-entity-registrants{display:flex;align-items:center;justify-content:space-between}.content-tab-container.sc-arcgis-hub-entity-registrants{overflow:hidden}div[slot=\"title\"].sc-arcgis-hub-entity-registrants h1.sc-arcgis-hub-entity-registrants{margin:0px;font-size:var(--calcite-font-size-3);line-height:2rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}arcgis-hub-workspace-pane.sc-arcgis-hub-entity-registrants{--arcgis-hub-workspace-pane-max-width:55rem;--arcgis-configuration-form-footer-max-width:800px;--arcgis-configuration-form-footer-scalable-padding:0.5rem}calcite-tab.sc-arcgis-hub-entity-registrants{margin-top:2rem}arcgis-hub-entity-editor.sc-arcgis-hub-entity-registrants{width:100%}calcite-tabs.sc-arcgis-hub-entity-registrants{display:block;width:100%}calcite-tab.sc-arcgis-hub-entity-registrants{padding:0px}";

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
const alertConfig = {
  noticeType: 'alert',
  autoClose: true,
  autoCloseDuration: 'fast',
  icon: true,
  kind: 'success',
};
var RegistrantsPaneTabs;
(function (RegistrantsPaneTabs) {
  RegistrantsPaneTabs["REGISTRANTS"] = "Registrants";
  RegistrantsPaneTabs["SETTINGS"] = "Settings";
})(RegistrantsPaneTabs || (RegistrantsPaneTabs = {}));
const ArcgisHubEntityRegistrants = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubWorkspaceEntityChange = index.createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.handleEditorChanged = (event) => {
      // intercept and re-cast the event for parity with other panes
      event.stopPropagation();
      this.arcgisHubWorkspaceEntityChange.emit({
        entity: event.detail.values,
        isDirty: true,
      });
    };
    this.handleEditorSaved = (event) => {
      // intercept and re-cast the event for parity with other panes
      event.stopPropagation();
      this.arcgisHubWorkspaceEntityChange.emit({
        entity: event.detail.entity,
        isDirty: !event.detail.isSuccess,
      });
    };
    this.handleGallerySelection = (event) => {
      this.gallerySelection = event.detail;
    };
    this.handleOnArcgisHubGalleryBulkAction = async (event) => {
      const { selection } = event.detail;
      try {
        await Promise.all(selection.map(id => edit.deleteHubEventRegistration(id, this._context.hubRequestOptions).then(result => {
          this.gallerySelection = Object.assign(Object.assign({}, this.gallerySelection), { eventAttendee: this.gallerySelection.eventAttendee.filter(attendeeId => attendeeId !== id) });
          return result;
        })));
        state.showNotice({
          title: this.intl.t('success.delete', { eventName: this.entity.name }),
          message: '',
          configuration: Object.assign(Object.assign({}, alertConfig), { label: this.intl.t('notice.label') }),
        });
      }
      catch (e) {
        console.error(`Failed to remove registration: ${e}`);
        state.showNotice({
          title: this.intl.t('error.delete'),
          message: '',
          configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') }),
        });
      }
      this.galleryElement.refresh();
    };
    this.renderRegistrantsTab = () => {
      return (index.h("arcgis-hub-gallery", { bulkActions: this.bulkActions, cardTitleTag: "attendee", facets: this.facets, gallerySelection: this.gallerySelection, linkTarget: "siteRelative", onArcgisHubGalleryBulkAction: this.handleOnArcgisHubGalleryBulkAction, onArcgisHubGallerySelect: this.handleGallerySelection, query: this.query, ref: (el) => {
          this.galleryElement = el;
        }, selectionMode: "multiple", showAdditionalInfo: false, showEmptyState: true, showFacets: true, showResultsCount: true, showSearch: true, showSort: true, showType: false, sortField: "modified", sortOptions: this.sortOptions }));
    };
    this.renderSettingsTab = () => {
      return (index.h("arcgis-hub-entity-editor", { editorType: `hub:event:registrants`, entity: this.entity, footerSlotRef: this.footerSlotElement, onArcgisHubEntityEditorChange: this.handleEditorChanged, onArcgisHubEntityEditorSaved: this.handleEditorSaved, variant: resources.CONFIGURATION_VARIANTS.workspace }));
    };
    this.entity = undefined;
    this.selectedPrimaryTab = RegistrantsPaneTabs.REGISTRANTS;
    this.footerSlotElement = undefined;
    this.galleryElement = undefined;
    this.gallerySelection = {};
    this.isDirty = false;
    this.attemptedClick = undefined;
    context.bind(this, 'handlePrimaryTabSelect', 'handlePrimaryTabKeyDown', 'handleEditorChanged', 'handleEditorSaved', 'handleGallerySelection', 'handleOnArcgisHubGalleryBulkAction', 'handleEntityChange');
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  get _context() {
    return state.getGlobalContext();
  }
  get tabConfigurations() {
    return [
      {
        title: this.intl.t('tabs.registrants'),
        key: RegistrantsPaneTabs.REGISTRANTS,
        telemetry: index$1.dist.dictionary.category.navigation.action.manage.label.registrants,
        content: this.renderRegistrantsTab,
      },
      {
        title: this.intl.t('tabs.settings'),
        key: RegistrantsPaneTabs.SETTINGS,
        telemetry: index$1.dist.dictionary.category.navigation.action.manage.label.settings,
        content: this.renderSettingsTab,
      },
    ];
  }
  get query() {
    return {
      targetEntity: 'eventAttendee',
      filters: [{ predicates: [] }],
      properties: {
        eventId: this.entity.id,
      },
    };
  }
  get facets() {
    const { intl } = this;
    return [
      {
        label: intl.t('facets.role.header'),
        key: 'role',
        display: 'multi-select',
        operation: 'OR',
        options: [
          {
            label: intl.t('facets.role.owner'),
            key: 'owner',
            selected: false,
            predicates: [
              {
                role: 'owner',
              },
            ],
          },
          {
            label: intl.t('facets.role.organizer'),
            key: 'organizer',
            selected: false,
            predicates: [
              {
                role: 'organizer',
              },
            ],
          },
          {
            label: intl.t('facets.role.attendee'),
            key: 'attendee',
            selected: false,
            predicates: [
              {
                role: 'attendee',
              },
            ],
          },
        ],
      },
      {
        label: intl.t('facets.status.header'),
        key: 'status',
        display: 'multi-select',
        operation: 'OR',
        options: [
          {
            label: intl.t('facets.status.pending'),
            key: 'pending',
            selected: false,
            predicates: [
              {
                status: 'pending',
              },
            ],
          },
          {
            label: intl.t('facets.status.accepted'),
            key: 'accepted',
            selected: false,
            predicates: [
              {
                status: 'accepted',
              },
            ],
          },
          {
            label: intl.t('facets.status.declined'),
            key: 'declined',
            selected: false,
            predicates: [
              {
                status: 'declined',
              },
            ],
          },
          {
            label: intl.t('facets.status.blocked'),
            key: 'blocked',
            selected: false,
            predicates: [
              {
                status: 'blocked',
              },
            ],
          },
        ],
      },
      {
        label: intl.t('facets.location.header'),
        key: 'attendanceType',
        display: 'multi-select',
        operation: 'OR',
        options: [
          {
            label: intl.t('facets.location.online'),
            key: 'virtual',
            selected: false,
            predicates: [
              {
                attendanceType: 'virtual',
              },
            ],
          },
          {
            label: intl.t('facets.location.in_person'),
            key: 'in_person',
            selected: false,
            predicates: [
              {
                attendanceType: 'in_person',
              },
            ],
          },
        ],
      },
      {
        label: intl.t('facets.updatedDate'),
        field: 'updatedDateRange',
        key: 'updatedDateRange',
        display: 'date-range',
        state: 'open',
      },
    ];
  }
  get sortOptions() {
    return ['modified', 'created', 'username', 'firstName', 'lastName'];
  }
  get bulkActions() {
    return {
      actions: [
        {
          name: 'delete',
          icon: 'user-minus',
          text: this.intl.t('delete.attendee'),
        },
      ],
    };
  }
  handlePrimaryTabSelect(evt) {
    // stop the event from propagating to the calcite-tabs component and switching tabs before we're sure
    evt.preventDefault();
    evt.stopImmediatePropagation();
    // if the user clicked on a tab while the pane was dirty, we want to prevent the tab from switching
    if (this.isDirty) {
      this.attemptedClick = { tab: evt.target.tab, clickEvent: evt };
      return;
    }
    else {
      this.selectedPrimaryTab = evt.target.tab;
      const { telemetry } = this.tabConfigurations.find(({ key }) => key === this.selectedPrimaryTab);
      this.hubTelemetry.emit(telemetry);
    }
  }
  ;
  handlePrimaryTabKeyDown(evt) {
    switch (evt.key) {
      case ' ':
      case 'Enter':
        this.handlePrimaryTabSelect(evt);
        return;
    }
  }
  handleDirtyStateModalClosed(event) {
    // true === they clicked cancel
    // false === they clicked okay
    if (event.detail) {
      this.attemptedClick = null;
    }
    else {
      // user is OK w/ navigating away and losing changes
      // clear the dirty state
      this.isDirty = false;
      // change the tab
      this.selectedPrimaryTab = this.attemptedClick.tab;
      // close the dirty state modal
      this.attemptedClick = null;
    }
  }
  handleEntityChange(event) {
    this.isDirty = event.detail.isDirty;
  }
  renderTabs() {
    const tabConfigurations = this.tabConfigurations;
    return (index.h("calcite-tabs", null, index.h("calcite-tab-nav", { slot: "title-group" }, tabConfigurations.map(config => (index.h("calcite-tab-title", { key: config.key, onClick: this.handlePrimaryTabSelect, onKeyDown: this.handlePrimaryTabKeyDown, selected: this.selectedPrimaryTab === config.key, tab: config.key }, config.title)))), tabConfigurations.map(config => (index.h("calcite-tab", { class: "registrants-tab-container", key: config.key, selected: this.selectedPrimaryTab === config.key, tab: config.key }, config.content())))));
  }
  get shouldShowDirtyStateModal() {
    return !!this.attemptedClick;
  }
  renderDirtyStateModal() {
    return this.shouldShowDirtyStateModal
      ? index.h("arcgis-hub-workspace-dirty-state-modal", { "is-open": true })
      : null;
  }
  render() {
    return (index.h(index.Host, { "data-element": "entity-registrants" }, index.h("arcgis-hub-workspace-pane", { "sticky-footer": true }, index.h("div", { slot: "title" }, index.h("h1", null, this.intl.t('registrants'))), this.renderTabs(), this.selectedPrimaryTab === RegistrantsPaneTabs.SETTINGS && (index.h("div", { ref: (el) => {
        this.footerSlotElement = el;
      }, slot: "footer" }))), this.renderDirtyStateModal()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
__decorate([
  memoize.MemoizeDecoratorFactory()
], ArcgisHubEntityRegistrants.prototype, "query", null);
__decorate([
  memoize.MemoizeDecoratorFactory()
], ArcgisHubEntityRegistrants.prototype, "facets", null);
__decorate([
  memoize.MemoizeDecoratorFactory()
], ArcgisHubEntityRegistrants.prototype, "sortOptions", null);
__decorate([
  memoize.MemoizeDecoratorFactory()
], ArcgisHubEntityRegistrants.prototype, "bulkActions", null);
ArcgisHubEntityRegistrants.style = arcgisHubEntityRegistrantsCss;

exports.arcgis_hub_entity_registrants = ArcgisHubEntityRegistrants;
