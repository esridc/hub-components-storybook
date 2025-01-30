import { Host, h, Fragment, } from '@stencil/core';
import intlManager from '../../utils/intl-manager';
import { checkPermission, fetchHubGroup, fetchPage, getCatalogGroups, HubSite } from '@esri/hub-common';
import { getGlobalContext } from '../../utils/state';
export class ArcgisHubPageMigration {
  constructor() {
    this.handleButtonClick = () => {
      this.shouldShowModal = true;
    };
    /**
     * Handler for onCalciteDialogClose event
     */
    this.handleModalClose = () => {
      this.shouldShowModal = false;
      this.arcgisHubPageMigrationWorkflowClose.emit();
    };
    /**
     * Handler for onArcgisHubAddContentWorkflowClose event
     */
    this.handleClose = () => {
      this.shouldShowModal = false;
      this.arcgisHubPageMigrationWorkflowClose.emit();
    };
    this.handlePageMigrationWorkflowComplete = (evt) => {
      // we need to catch and re-emit this event because the workflow component is in a wormhole, thanks safari
      evt.stopPropagation();
      this.arcgisHubPageMigrationWorkflowComplete.emit(evt.detail);
    };
    this.pageId = undefined;
    this.site = undefined;
    this.shouldShowModal = false;
    this.canMigratePage = undefined;
    this.shouldMigratePage = false;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    const context = getGlobalContext();
    if (context) {
      // figure out if the user has the necessary permissions
      const page = await fetchPage(this.pageId, context.requestOptions);
      const canEditPage = checkPermission('hub:page:edit', context, page).access;
      const siteInstance = HubSite.fromJson(this.site, context);
      const groupsByMembership = getCatalogGroups(siteInstance.catalog, context);
      const groupIds = [...groupsByMembership['admin'], ...groupsByMembership['member'], ...groupsByMembership['owner']];
      const groupPromises = groupIds.map(groupId => {
        return fetchHubGroup(groupId, context.hubRequestOptions);
      });
      const groups = await Promise.all(groupPromises);
      const canShareToAnyGroups = groups.some(group => checkPermission('hub:group:shareContent', context, group).access);
      this.canMigratePage = canEditPage && canShareToAnyGroups;
      // figure out if the page has a slug and is already in the site catalog
      const isInCatalog = await siteInstance.contains(this.pageId);
      this.shouldMigratePage = !(page.slug && isInCatalog.isContained);
    }
  }
  _renderButton() {
    if (this.shouldMigratePage) {
      // eslint-disable-next-line unicorn/prefer-ternary
      if (this.canMigratePage) {
        return h("calcite-button", { appearance: "transparent", onClick: this.handleButtonClick, scale: "s" }, this.intl.t("buttonText"));
      }
      else {
        return h(Fragment, null, h("calcite-icon", { icon: "information", id: "no-access-icon", scale: "s" }), h("calcite-tooltip", { label: "Data disclaimer", "reference-element": "no-access-icon" }, h("span", null, this.intl.t('noAccess'))));
      }
    }
  }
  renderDialog() {
    if (this.canMigratePage && this.shouldMigratePage) {
      return h("arcgis-wormhole", { elAttributes: { unthemed: 'true' }, styles: { "--calcite-dialog-background-color": "#fff" } }, h("calcite-dialog", { "escape-disabled": true, heading: this.intl.t("modalHeading"), headingLevel: 3, modal: true, onCalciteDialogClose: this.handleModalClose, open: this.shouldShowModal, "outside-close-disabled": true, scale: "l", widthScale: "l" }, this.shouldShowModal && h("arcgis-hub-page-migration-workflow", { onArcgisHubPageMigrationWorkflowClose: this.handleClose, onArcgisHubPageMigrationWorkflowComplete: this.handlePageMigrationWorkflowComplete, pageId: this.pageId, site: this.site })));
    }
  }
  render() {
    return (h(Host, { "data-element": "hub-page-migration" }, this._renderButton(), this.renderDialog()));
  }
  static get is() { return "arcgis-hub-page-migration"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-page-migration.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-page-migration.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "pageId": {
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
          "text": "The id of the page this component will migrate."
        },
        "attribute": "page-id",
        "reflect": false
      },
      "site": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubSite",
          "resolved": "IHubSite",
          "references": {
            "IHubSite": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "A reference to the current site entity."
        }
      }
    };
  }
  static get states() {
    return {
      "shouldShowModal": {},
      "canMigratePage": {},
      "shouldMigratePage": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubPageMigrationWorkflowComplete",
        "name": "arcgisHubPageMigrationWorkflowComplete",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }, {
        "method": "arcgisHubPageMigrationWorkflowClose",
        "name": "arcgisHubPageMigrationWorkflowClose",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
}
