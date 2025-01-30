import { Fragment, Host, h } from '@stencil/core';
import intlManager from '../../../utils/intl-manager';
import { CORNERS, DROP_SHADOWS } from '../../interfaces';
import { getTypeFromEntity } from '@esri/hub-common';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { getEntityLayoutUrl, getEntityWorkspaceUrl } from '../../../utils/urls';
/**
 * @internal
 * This component is for internal use by the arcgis-hub-add-content-workflow component
 */
export class ArcgisHubAddContentResults {
  constructor() {
    this.handleGroupCardClick = () => {
      // this handles the title click event for the group card
      this.hubTelemetry.emit(dictionary.category.navigation.action.view.label.groups);
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
    this.hubTelemetry.emit(dictionary.category.navigation.action.view.label.content);
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
  static get is() { return "arcgis-hub-add-content-results"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-add-content-results.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-add-content-results.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "workflow": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Workflow",
          "resolved": "\"create\" | \"existing\" | \"upload\"",
          "references": {
            "Workflow": {
              "location": "import",
              "path": "../utils/utils"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "workflow",
        "reflect": false
      },
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
      "helpStateClass": {
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
        "attribute": "help-state-class",
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
  static get events() {
    return [{
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
  static get listeners() {
    return [{
        "name": "arcgisHubCardTitleLinkClick",
        "method": "handleResultsItemClick",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
