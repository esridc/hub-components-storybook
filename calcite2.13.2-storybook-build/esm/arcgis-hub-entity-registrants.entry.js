import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import { d as showNotice, g as getGlobalContext } from './state-31a09db0.js';
import { d as dist } from './index-dd3f99ac.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { C as CONFIGURATION_VARIANTS } from './resources-3247991b.js';
import { M as MemoizeDecoratorFactory } from './memoize-dfcfa834.js';
import { b as bind } from './context-7d8f7366.js';
import { deleteHubEventRegistration } from './edit-fa9666f2.js';
import './index-213c70d0.js';
import './_commonjsHelpers-11ca3be1.js';
import './store-0a6cb79f.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './generate-random-string-1436d9e6.js';
import './getPropertyMap-10ee9d61.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './events-c59246f8.js';
import './types-db540898.js';
import './registrations-431b9788.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeFromEntity-e149b61e.js';
import './get-family-543fac52.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './request-fa80ae40.js';
import './helpers-8c7e5e31.js';
import './slugify-e3e67bac.js';
import './defaults-1f93a79e.js';
import './getDefaultEventDatesAndTimes-4847a519.js';
import './search-c7a57aa9.js';
import './append-custom-params-4bd856e5.js';

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
    registerInstance(this, hostRef);
    this.arcgisHubWorkspaceEntityChange = createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
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
        await Promise.all(selection.map(id => deleteHubEventRegistration(id, this._context.hubRequestOptions).then(result => {
          this.gallerySelection = Object.assign(Object.assign({}, this.gallerySelection), { eventAttendee: this.gallerySelection.eventAttendee.filter(attendeeId => attendeeId !== id) });
          return result;
        })));
        showNotice({
          title: this.intl.t('success.delete', { eventName: this.entity.name }),
          message: '',
          configuration: Object.assign(Object.assign({}, alertConfig), { label: this.intl.t('notice.label') }),
        });
      }
      catch (e) {
        console.error(`Failed to remove registration: ${e}`);
        showNotice({
          title: this.intl.t('error.delete'),
          message: '',
          configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') }),
        });
      }
      this.galleryElement.refresh();
    };
    this.renderRegistrantsTab = () => {
      return (h("arcgis-hub-gallery", { bulkActions: this.bulkActions, cardTitleTag: "attendee", facets: this.facets, gallerySelection: this.gallerySelection, linkTarget: "siteRelative", onArcgisHubGalleryBulkAction: this.handleOnArcgisHubGalleryBulkAction, onArcgisHubGallerySelect: this.handleGallerySelection, query: this.query, ref: (el) => {
          this.galleryElement = el;
        }, selectionMode: "multiple", showAdditionalInfo: false, showEmptyState: true, showFacets: true, showResultsCount: true, showSearch: true, showSort: true, showType: false, sortField: "modified", sortOptions: this.sortOptions }));
    };
    this.renderSettingsTab = () => {
      return (h("arcgis-hub-entity-editor", { editorType: `hub:event:registrants`, entity: this.entity, footerSlotRef: this.footerSlotElement, onArcgisHubEntityEditorChange: this.handleEditorChanged, onArcgisHubEntityEditorSaved: this.handleEditorSaved, variant: CONFIGURATION_VARIANTS.workspace }));
    };
    this.entity = undefined;
    this.selectedPrimaryTab = RegistrantsPaneTabs.REGISTRANTS;
    this.footerSlotElement = undefined;
    this.galleryElement = undefined;
    this.gallerySelection = {};
    this.isDirty = false;
    this.attemptedClick = undefined;
    bind(this, 'handlePrimaryTabSelect', 'handlePrimaryTabKeyDown', 'handleEditorChanged', 'handleEditorSaved', 'handleGallerySelection', 'handleOnArcgisHubGalleryBulkAction', 'handleEntityChange');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  get _context() {
    return getGlobalContext();
  }
  get tabConfigurations() {
    return [
      {
        title: this.intl.t('tabs.registrants'),
        key: RegistrantsPaneTabs.REGISTRANTS,
        telemetry: dist.dictionary.category.navigation.action.manage.label.registrants,
        content: this.renderRegistrantsTab,
      },
      {
        title: this.intl.t('tabs.settings'),
        key: RegistrantsPaneTabs.SETTINGS,
        telemetry: dist.dictionary.category.navigation.action.manage.label.settings,
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
    return (h("calcite-tabs", null, h("calcite-tab-nav", { slot: "title-group" }, tabConfigurations.map(config => (h("calcite-tab-title", { key: config.key, onClick: this.handlePrimaryTabSelect, onKeyDown: this.handlePrimaryTabKeyDown, selected: this.selectedPrimaryTab === config.key, tab: config.key }, config.title)))), tabConfigurations.map(config => (h("calcite-tab", { class: "registrants-tab-container", key: config.key, selected: this.selectedPrimaryTab === config.key, tab: config.key }, config.content())))));
  }
  get shouldShowDirtyStateModal() {
    return !!this.attemptedClick;
  }
  renderDirtyStateModal() {
    return this.shouldShowDirtyStateModal
      ? h("arcgis-hub-workspace-dirty-state-modal", { "is-open": true })
      : null;
  }
  render() {
    return (h(Host, { "data-element": "entity-registrants" }, h("arcgis-hub-workspace-pane", { "sticky-footer": true }, h("div", { slot: "title" }, h("h1", null, this.intl.t('registrants'))), this.renderTabs(), this.selectedPrimaryTab === RegistrantsPaneTabs.SETTINGS && (h("div", { ref: (el) => {
        this.footerSlotElement = el;
      }, slot: "footer" }))), this.renderDirtyStateModal()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
__decorate([
  MemoizeDecoratorFactory()
], ArcgisHubEntityRegistrants.prototype, "query", null);
__decorate([
  MemoizeDecoratorFactory()
], ArcgisHubEntityRegistrants.prototype, "facets", null);
__decorate([
  MemoizeDecoratorFactory()
], ArcgisHubEntityRegistrants.prototype, "sortOptions", null);
__decorate([
  MemoizeDecoratorFactory()
], ArcgisHubEntityRegistrants.prototype, "bulkActions", null);
ArcgisHubEntityRegistrants.style = arcgisHubEntityRegistrantsCss;

export { ArcgisHubEntityRegistrants as arcgis_hub_entity_registrants };
