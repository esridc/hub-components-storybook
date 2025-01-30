import { h } from "@stencil/core";
import { bind } from '../../utils/context';
import intlManager from "../../utils/intl-manager";
export class ArcgisHubGroupsSharing {
  constructor() {
    /**
     * Internal tracking of selected groups
     * Keep track of selected / deselected groups internally to keep things clean
     */
    this.internalSelectedGroups = [];
    this.internalDeselectedGroups = [];
    this.groups = [];
    this.selectedGroups = [];
    bind(this, 'updateSelectedGroups', '_shouldGroupBeSelected');
  }
  /**
   * Func bound to onCalciteCheckboxChange event.
   * Done this way because said event doesn't return anything, and this is needed to avoid
   * digging down the shadowdom tree to get at the correct target.
   */
  updateSelectedGroups(evt) {
    if (evt.target.checked) {
      this.internalSelectedGroups.push(evt.target.value);
      // remove it from deselected groups array
      this.internalDeselectedGroups = this.internalDeselectedGroups.filter(groupId => groupId !== evt.target.value);
    }
    else { // If deselected
      // Add it to deselected groups array
      this.internalDeselectedGroups.push(evt.target.value);
      // remove it from selected groups array.
      this.internalSelectedGroups = this.internalSelectedGroups.filter(groupId => groupId !== evt.target.value);
    }
    // Emit out results.
    this.arcgisHubSelectedGroupsChange.emit({
      share: this.internalSelectedGroups,
      unshare: this.internalDeselectedGroups
    });
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    // If any selected groups were passed down in
    if (this.selectedGroups.length) {
      // Add them to our internal tracking of selected groups.
      this.internalSelectedGroups = this.internalSelectedGroups.concat(this.selectedGroups);
    }
  }
  _shouldGroupBeSelected(id) {
    const val = this.internalSelectedGroups.find(internalGroup => internalGroup.id === id);
    return !!val;
  }
  render() {
    if (this.groups.length) {
      return (h("div", null, h("header", null, this.intl.t('heading')), this.groups.map((group) => h("calcite-label", { key: group.id, layout: "inline" }, h("calcite-checkbox", { checked: this._shouldGroupBeSelected(group.id), name: group.title, onCalciteCheckboxChange: this.updateSelectedGroups, value: group }), group.title))));
    }
  }
  static get is() { return "arcgis-hub-groups-sharing"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-groups-sharing.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-groups-sharing.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "groups": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IGroup[]",
          "resolved": "IGroup[]",
          "references": {
            "IGroup": {
              "location": "import",
              "path": "@esri/arcgis-rest-portal"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Array of groups that can be shared to."
        },
        "defaultValue": "[]"
      },
      "selectedGroups": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IGroup[]",
          "resolved": "IGroup[]",
          "references": {
            "IGroup": {
              "location": "import",
              "path": "@esri/arcgis-rest-portal"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Groups we want to optionally share to by default\nWe pass down selected groups to pre-select one/multiple groups (presuming that's necessary)"
        },
        "defaultValue": "[]"
      }
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubSelectedGroupsChange",
        "name": "arcgisHubSelectedGroupsChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emits the groups we will be sharing something to"
        },
        "complexType": {
          "original": "{ share: IGroup[], unshare: IGroup[] }",
          "resolved": "{ share: IGroup[]; unshare: IGroup[]; }",
          "references": {
            "IGroup": {
              "location": "import",
              "path": "@esri/arcgis-rest-portal"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
}
