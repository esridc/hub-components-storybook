import { Fragment, Host, h } from '@stencil/core';
import intlManager from '../../../utils/intl-manager';
import { CORNERS, DROP_SHADOWS } from '../../interfaces';
/**
 * @internal
 * This component is for internal use by the arcgis-hub-page-migration-workflow component
 */
export class ArcgisHubPageMigrationResults {
  constructor() {
    this.renderGallery = (query) => {
      const galleryProps = {
        corners: CORNERS.round,
        disableTelemetry: true,
        limit: 100,
        linkTarget: 'siteRelative',
        newTab: true,
        query,
        shadow: DROP_SHADOWS.low,
        showAdditionalInfo: false,
        showBadges: false,
        showOwner: false
      };
      return h("arcgis-hub-gallery", Object.assign({}, galleryProps));
    };
    this.renderGroups = (groupIds) => {
      const query = {
        filters: [
          {
            predicates: [
              {
                id: groupIds
              }
            ]
          }
        ],
        targetEntity: 'group'
      };
      return this.renderGallery(query);
    };
    this.results = undefined;
    this.icon = undefined;
    this.helpStateConfig = undefined;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  _renderResults(which) {
    const groups = this.results.results.filter(result => result.status === which);
    if (groups.length) {
      return (h(Fragment, null, h("h3", null, this.intl.t(`${which}.accordionHeading`)), this.renderGroups(groups.map(result => result.groupId))));
    }
  }
  render() {
    const heading = this.intl.t(this.helpStateConfig.heading);
    const helpStateConfig = Object.assign(Object.assign({}, this.helpStateConfig), { heading });
    return (h(Host, { "data-element": "page-migration-results" }, h("arcgis-hub-help-state", Object.assign({}, helpStateConfig), h("div", { slot: "message" }, this._renderResults('success'), this._renderResults('fail')))));
  }
  static get is() { return "arcgis-hub-page-migration-results"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-page-migration-results.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-page-migration-results.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "results": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubGroupSharingResults",
          "resolved": "IHubGroupSharingResults",
          "references": {
            "IHubGroupSharingResults": {
              "location": "import",
              "path": "../../../utils/add-content/utils"
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
      "icon": {
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
        "attribute": "icon",
        "reflect": false
      },
      "helpStateConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHelpStateProps",
          "resolved": "IHelpStateProps",
          "references": {
            "IHelpStateProps": {
              "location": "import",
              "path": "../../arcgis-hub-help-state/arcgis-hub-help-state"
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
  static get elementRef() { return "element"; }
}
