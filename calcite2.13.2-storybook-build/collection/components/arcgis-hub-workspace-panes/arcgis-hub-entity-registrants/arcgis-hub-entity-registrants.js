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
import { deleteHubEventRegistration } from '@esri/hub-common';
import { h, Host } from '@stencil/core';
import intlManager from '../../../utils/intl-manager';
import { getGlobalContext, showNotice } from '../../../utils';
import { CONFIGURATION_VARIANTS } from '../../arcgis-configuration-editor/resources';
import Memoize from '../../../decorators/memoize';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { bind } from '../../../utils/context';
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
export class ArcgisHubEntityRegistrants {
  constructor() {
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
        telemetry: dictionary.category.navigation.action.manage.label.registrants,
        content: this.renderRegistrantsTab,
      },
      {
        title: this.intl.t('tabs.settings'),
        key: RegistrantsPaneTabs.SETTINGS,
        telemetry: dictionary.category.navigation.action.manage.label.settings,
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
  static get is() { return "arcgis-hub-entity-registrants"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-registrants.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-registrants.css"]
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
          "text": "Entity of the workspace"
        }
      }
    };
  }
  static get states() {
    return {
      "selectedPrimaryTab": {},
      "footerSlotElement": {},
      "galleryElement": {},
      "gallerySelection": {},
      "isDirty": {},
      "attemptedClick": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubWorkspaceEntityChange",
        "name": "arcgisHubWorkspaceEntityChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the workspace is saved"
        },
        "complexType": {
          "original": "IWorkspaceEntityChange",
          "resolved": "IWorkspaceEntityChange",
          "references": {
            "IWorkspaceEntityChange": {
              "location": "import",
              "path": "../../../utils"
            }
          }
        }
      }, {
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Hub telemetry"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get listeners() {
    return [{
        "name": "arcgisHubWorkspaceDirtyStateModalClosed",
        "method": "handleDirtyStateModalClosed",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubWorkspaceEntityChange",
        "method": "handleEntityChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
__decorate([
  Memoize()
], ArcgisHubEntityRegistrants.prototype, "query", null);
__decorate([
  Memoize()
], ArcgisHubEntityRegistrants.prototype, "facets", null);
__decorate([
  Memoize()
], ArcgisHubEntityRegistrants.prototype, "sortOptions", null);
__decorate([
  Memoize()
], ArcgisHubEntityRegistrants.prototype, "bulkActions", null);
