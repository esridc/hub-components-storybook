import { Host, h, Fragment } from '@stencil/core';
import intlManager from '../../utils/intl-manager';
import { getWellKnownCatalog } from '@esri/hub-common';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { fetchGroupsWithGallerySelection, getGallerySelection } from '../../utils/group-list-manager-utils';
import { bind } from '../../utils/context';
import { connectContext, getGlobalContext } from '../../utils/state';
/**
 * This functional component is meant to be a stop-gap for `arcgis-hub-group-list-manager`
 * until the `arcgis-hub-card` (and derivatives) support a "compact" format. Once it does,
 * `arcgis-hub-group-list-manager` should delete this functional component and use the gallery
 * for displaying selected groups instead.
 */
// TODO: move this to a separate file with other functional components so we can have a story for it
const GroupBlock = ({ groupResult, intl }, children) => {
  let groupDescription;
  if (groupResult.membershipSummary) {
    // In the members metadata mode, the description will show membership totals
    const count = groupResult.membershipSummary.total;
    if (count === 0) {
      groupDescription = intl.t('groupBlock.memberCount.noMember');
    }
    else if (count === 1) {
      groupDescription = intl.t('groupBlock.memberCount.oneMember');
    }
    else {
      groupDescription = intl.t('groupBlock.memberCount.members', { count });
    }
  }
  else {
    // In the default metadata mode, the description will be pipe-delimited key-value pairs
    const { owner, createdDate, access, userMembership } = groupResult;
    const metadataLabels = [
      owner,
      intl.t('groupBlock.dateCreated', { localizedDate: createdDate.toLocaleDateString(intl.locale) }),
      intl.t('groupBlock.sharing', { sharingLevel: intl.t(`groupBlock.sharingLevels.${access}`) }),
      intl.t('groupBlock.membership', { membershipLevel: intl.t(`groupBlock.membershipLevels.${userMembership || 'none'}`) }),
    ];
    // Reverse the display order for RTL languages
    intl.direction === 'rtl' && metadataLabels.reverse();
    groupDescription = metadataLabels.join(' | ');
  }
  return (h("calcite-block", { description: groupDescription, heading: groupResult.name, key: groupResult.id, role: "listitem" }, h("calcite-avatar", { fullName: groupResult.name, scale: 'm', slot: "icon-start", thumbnail: groupResult.links.thumbnail }), children));
};
export class ArcgisHubGroupListManager {
  constructor() {
    /**
     * because we wrap the arcgis-hub-gallery-picker in a wormhole, we
     * intercept its telemetry and re-emit it from this component so
     * we don't lose the DOM context
     */
    this.handleHubTelemetry = (evt) => {
      evt.stopPropagation();
      this.hubTelemetry.emit(evt.detail);
    };
    this.groupIds = undefined;
    this.allowAdd = undefined;
    this.allowRemove = undefined;
    this.metadataMode = 'default';
    this.wellKnownPickerCatalog = undefined;
    this.pickerFacets = undefined;
    this.pickerToggleLabel = undefined;
    this.showEmptyState = true;
    this.pickerClassName = undefined;
    this.currentGroupSelection = undefined;
    this.currentGroups = undefined;
    this.showGroupPicker = false;
    this._context = getGlobalContext();
    bind(this, 'handleRemove', 'handlePickerOpen', 'handlePickerClose', 'handlePickerSelectionUpdate', 'handleHubTelemetry');
  }
  get pickerCatalogDefinition() {
    var _a;
    const opts = {
      user: (_a = this._context) === null || _a === void 0 ? void 0 : _a.currentUser
    };
    return getWellKnownCatalog(null, this.wellKnownPickerCatalog, 'group', opts);
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.fetchCurrentGroups();
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  async fetchCurrentGroups() {
    const include = this.metadataMode === 'members' ? ['membershipSummary'] : ['userMembership'];
    // Convert the group IDs to IGallerySelection for ease of management and searching
    this.currentGroupSelection = getGallerySelection(this.groupIds);
    this.currentGroups = this.groupIds.length
      ? await fetchGroupsWithGallerySelection({
        selection: this.currentGroupSelection,
        context: this._context,
        include
      })
      : [];
  }
  handleRemove(event) {
    const groupId = event.target.dataset.groupId;
    const updatedList = this.groupIds.filter(g => g !== groupId);
    this.groupsChangedEvent.emit({
      updatedList,
      removed: [groupId]
    });
  }
  handlePickerOpen() {
    this.showGroupPicker = true;
  }
  handlePickerClose() {
    this.showGroupPicker = false;
  }
  handlePickerSelectionUpdate(evt) {
    const updatedList = evt.detail.group;
    const added = updatedList.filter(g => !this.groupIds.includes(g));
    const removed = this.groupIds.filter(g => !updatedList.includes(g));
    const payload = { updatedList };
    if (added.length) {
      payload.added = added;
    }
    if (removed.length) {
      payload.removed = removed;
    }
    this.groupsChangedEvent.emit(payload);
  }
  renderGroup(group) {
    return h(GroupBlock, { groupResult: group, intl: this.intl }, h("arcgis-hub-workspace-link", { href: `/groups/${group.id}`, relativeToOrigin: true, slot: 'actions-end', target: "_blank", telemetry: dictionary.category.navigation.action.view.label.groups.details.profile }, h("calcite-action", { icon: 'launch', label: this.intl.t('newTab', { groupName: group.name }), text: group.name })), this.allowRemove &&
      h("calcite-action", { "data-group-id": group.id, icon: 'x-circle', label: this.intl.t('removeGroup', { groupName: group.name }), onClick: this.handleRemove, slot: 'actions-end', text: group.name }));
  }
  renderGroupPicker() {
    if (this.allowAdd) {
      return h(Fragment, null, h("div", { class: "picker-button-container" }, h("calcite-button", { appearance: "outline-fill", onClick: this.handlePickerOpen, round: true }, this.pickerToggleLabel || this.intl.t('pickerToggle')), h("slot", { name: "secondary-picker-button" })), 
      // Sigh, there is a bug in <arcgis-hub-gallery-picker> where the gallery selection remains
      // in a dirty state even after the modal is closed and re-opened. This fix mitigates that
      // by forcing `componentWillLoad()` to run.
      this.showGroupPicker &&
        h("arcgis-wormhole", { elAttributes: { unthemed: '' } }, h("arcgis-hub-gallery-picker", { catalogs: [this.pickerCatalogDefinition], class: this.pickerClassName, facets: this.pickerFacets, gallerySelection: this.currentGroupSelection, linkTarget: "siteRelative", modalTitle: this.intl.t('pickerTitle'), onArcgisHubGalleryPickerClose: this.handlePickerClose, onArcgisHubGalleryPickerSelectionUpdate: this.handlePickerSelectionUpdate, onHubTelemetry: this.handleHubTelemetry, open: this.showGroupPicker, showBadges: false, showSearch: true, showSelection: true })));
    }
  }
  renderEmptyState() {
    if (this.showEmptyState) {
      return (h("div", { class: "no-groups-message" }, this.intl.t('noGroups')));
    }
  }
  renderGroupList() {
    return (h("calcite-list", { role: "list" }, this.currentGroups.map((group) => this.renderGroup(group)), "      "));
  }
  render() {
    var _a;
    return (h(Host, null, ((_a = this.currentGroups) === null || _a === void 0 ? void 0 : _a.length)
      ? this.renderGroupList()
      : this.renderEmptyState(), this.renderGroupPicker()));
  }
  static get is() { return "arcgis-hub-group-list-manager"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-group-list-manager.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-group-list-manager.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "groupIds": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "allowAdd": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "allow-add",
        "reflect": false
      },
      "allowRemove": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "allow-remove",
        "reflect": false
      },
      "metadataMode": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'default' | 'members'",
          "resolved": "\"default\" | \"members\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "metadata-mode",
        "reflect": false,
        "defaultValue": "'default'"
      },
      "wellKnownPickerCatalog": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "WellKnownCatalog",
          "resolved": "\"allGroups\" | \"community\" | \"editGroups\" | \"favorites\" | \"livingAtlas\" | \"myContent\" | \"organization\" | \"partners\" | \"viewGroups\" | \"world\"",
          "references": {
            "WellKnownCatalog": {
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
        },
        "attribute": "well-known-picker-catalog",
        "reflect": false
      },
      "pickerFacets": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IFacet[]",
          "resolved": "IFacet[]",
          "references": {
            "IFacet": {
              "location": "import",
              "path": "../../utils/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "pickerToggleLabel": {
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
          "text": ""
        },
        "attribute": "picker-toggle-label",
        "reflect": false
      },
      "showEmptyState": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "show-empty-state",
        "reflect": false,
        "defaultValue": "true"
      },
      "pickerClassName": {
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
          "text": ""
        },
        "attribute": "picker-class-name",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "currentGroupSelection": {},
      "currentGroups": {},
      "showGroupPicker": {},
      "_context": {}
    };
  }
  static get events() {
    return [{
        "method": "groupsChangedEvent",
        "name": "arcgisHubGroupListManagerChanged",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IGroupsChangedEvent",
          "resolved": "IGroupsChangedEvent",
          "references": {
            "IGroupsChangedEvent": {
              "location": "import",
              "path": "./types"
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
  static get watchers() {
    return [{
        "propName": "groupIds",
        "methodName": "fetchCurrentGroups"
      }];
  }
}
