import { getAssociatedEntitiesQuery, hubSearch } from '@esri/hub-common';
import { Host, h } from '@stencil/core';
import { getGlobalContext } from '../../../../utils/state';
import intlManager from '../../../../utils/intl-manager';
import { associatedInitiativesGalleryCallback, FEATURED_ASSOCIATED_INITIATIVES_MAX } from './resources';
import { bind } from '../../../../utils/context';
import { ViewTabs } from '../../types';
export class ArcgisHubProjectAbout {
  constructor() {
    this.entity = undefined;
    this.path = "";
    this._associatedInitiativesCount = 0;
    bind(this, 'handleTabChange');
  }
  async init() {
    // NOTE: if the current user does not have access to the related initiative, this will fail
    try {
      // 1. build the query to fetch the project's associated initiatives
      this._associatedInitiativesQuery = this.project && await getAssociatedEntitiesQuery(this.project, "initiative", this._context);
      // 2. fetch the project's associated initiatives to get the total count -
      // we use this to conditionally render the "Associated Initiatives" section
      // and overflow pattern when there are > 5 associated initiatives
      if (this._associatedInitiativesQuery) {
        const { total } = await hubSearch(this._associatedInitiativesQuery, { requestOptions: this._context.hubRequestOptions });
        this._associatedInitiativesCount = total;
      }
    }
    catch (error) {
      // swallow it
    }
  }
  /** global context: contextual portal & auth information */
  get _context() { return getGlobalContext(); }
  get project() {
    return this.entity;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.init();
  }
  handleTabChange(evt) {
    this.arcgisHubEntityAboutTabChange.emit(evt);
  }
  /**
   * Renders associated initiatives of the project
   * Renders at max 4 -- if there are more, then we
   * render a button to explore all initiatives
   */
  renderAssociatedInitiatives() {
    return (h("div", { class: "project-about__initiatives" }, h("h2", null, this.intl.t('associatedInitiatives')), h("arcgis-hub-gallery", { callback: associatedInitiativesGalleryCallback, limit: FEATURED_ASSOCIATED_INITIATIVES_MAX, linkTarget: "siteRelative", path: this.path, query: this._associatedInitiativesQuery, showAdditionalInfo: false, showOwner: false, showThumbnail: false, showType: false }), h("calcite-button", { appearance: "outline", "data-scroll": "scroll", "data-tab": ViewTabs.Initiatives, onClick: this.handleTabChange, round: true }, this.intl.t("exploreAssociations"))));
  }
  render() {
    return (h(Host, { "data-element": "project-about" }, h("arcgis-hub-entity-about", { entity: this.entity, path: this.path }, h("div", { slot: "sidebar" }, this._associatedInitiativesCount > 0 && this.renderAssociatedInitiatives()))));
  }
  static get is() { return "arcgis-hub-project-about"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-project-about.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-project-about.css"]
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
          "text": "ArcGIS Hub project entity"
        }
      },
      "path": {
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
          "text": "Content Hierarchy Path that will be passed onto the gallery component\nso links are constructed with the correct path"
        },
        "attribute": "path",
        "reflect": false,
        "defaultValue": "\"\""
      }
    };
  }
  static get states() {
    return {
      "_associatedInitiativesCount": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubEntityAboutTabChange",
        "name": "arcgisHubEntityAboutTabChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event emitted when a button or other element is interacted with to change tabs."
        },
        "complexType": {
          "original": "CalciteTabTitleCustomEvent<void>",
          "resolved": "CalciteTabTitleCustomEvent<void>",
          "references": {
            "CalciteTabTitleCustomEvent": {
              "location": "import",
              "path": "@esri/calcite-components"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "entity",
        "methodName": "init"
      }];
  }
}
