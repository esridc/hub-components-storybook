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
import { Host, h } from '@stencil/core';
import { getGlobalContext } from '../../../utils/state';
import intlManager from '../../../utils/intl-manager';
import Memoize from '../../../decorators/memoize';
/***
 *    ##      ## #### ########
 *    ##  ##  ##  ##  ##     ##
 *    ##  ##  ##  ##  ##     ##
 *    ##  ##  ##  ##  ########
 *    ##  ##  ##  ##  ##
 *    ##  ##  ##  ##  ##
 *     ###  ###  #### ##
 *
 * The Discussion Posts Search api is not fully featured yet, so this component is a placeholder
 */
/**
 * A component that displays a list of discussion posts the current user is participating in.
 * @slot title - The title of the pane
 */
export class ArcgisHubUserPostsPane {
  constructor() {
    this.isMobile = false;
    this._context = getGlobalContext();
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  get query() {
    return {
      targetEntity: "discussionPost",
      filters: [
        {
          predicates: [
            {
              creator: this._context.currentUser
            }
          ],
        }
      ]
    };
  }
  /**
     * Construct props that will be passed through the gallery, to the
     * `arcgis-hub-add-content` component
     */
  get addContentProps() {
    return {
      buttonText: this.intl.t('addEventButtonText'),
    };
  }
  render() {
    return (h(Host, { "data-element": "user-groups" }, h("arcgis-hub-workspace-pane", { isMobile: this.isMobile, "sticky-footer": true }, h("h2", { slot: "title" }, this.intl.t('header')), h("arcgis-hub-gallery", { api: 'hub', layout: "compact", linkTarget: "workspaceRelative", mobileView: this.isMobile, query: this.query, showAddContent: false, showFacets: false, showLinkButton: false, showMoreResultsBtn: true, showSearch: true, showSort: true, showThumbnail: false }))));
  }
  static get is() { return "arcgis-hub-user-posts-pane"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-user-posts-pane.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-user-posts-pane.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "isMobile": {
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
        "attribute": "is-mobile",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "_context": {}
    };
  }
  static get elementRef() { return "element"; }
}
__decorate([
  Memoize('_context.currentUser.username')
], ArcgisHubUserPostsPane.prototype, "query", null);
__decorate([
  Memoize()
], ArcgisHubUserPostsPane.prototype, "addContentProps", null);
