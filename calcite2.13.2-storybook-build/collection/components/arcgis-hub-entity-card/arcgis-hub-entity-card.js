/**
 * A custom Stencil component for rendering a Search Result or Hub Entity in a card.
 *
 * @remarks
 * This component displays information about a Search Result or Hub Entity, such as a dataset or initiative, in a card format.
 * It supports various customization options, such as clickable behavior, round or square corners, and different layouts.
 *
 * @example
 * ```tsx
 * <arcgis-hub-entity-card
 *   actionLinks={[{ label: 'View Details', url: 'https://example.com' }]}
 *   baseUrl="https://example.com"
 *   clickable={true}
 *   corners="round"
 *   imageType="thumbnail"
 *   layout="row"
 *   lazy={false}
 *   linkTarget="_blank"
 *   newTab={true}
 *   selectable={true}
 *   selected={false}
 *   shadow="none"
 *   showAdditionalInfo={true}
 *   showBadges={true}
 *   showOwner={true}
 *   showThumbnail={true}
 *   showType={true}
 *   titleTag="h3"
 *   callback={customCallback}
 *   searchResult={searchResult}
 *   entity={entity}
 * ></arcgis-hub-entity-card>
 * ```
 *
 * @public
 */
import { Host, h } from '@stencil/core';
import intlManager from '../../utils/intl-manager';
import { CORNERS, DROP_SHADOWS, IMAGE_TYPES } from '../interfaces';
import { getGlobalContext } from '../../utils/state';
import { entityToCardModel, resultToCardModel } from '../../utils/cardModelConverters';
export class ArcgisHubEntityCard {
  constructor() {
    this.actionLinks = undefined;
    this.baseUrl = undefined;
    this.clickable = undefined;
    this.corners = CORNERS.square;
    this.imageType = IMAGE_TYPES.thumbnail;
    this.layout = 'row';
    this.lazy = false;
    this.linkTarget = undefined;
    this.newTab = false;
    this.selectable = false;
    this.selected = false;
    this.searchResult = undefined;
    this.entity = undefined;
    this.shadow = DROP_SHADOWS.none;
    this.showAdditionalInfo = true;
    this.showAllAdditionalInfo = false;
    this.showBadges = true;
    this.showOwner = true;
    this.showThumbnail = true;
    this.showType = true;
    this.titleTag = undefined;
    this.callback = undefined;
    this.primaryActionsToRender = 1;
    this.isLoading = false;
  }
  get _model() {
    // Construct standard options hash for the conversion functions
    const opts = {
      actionLinks: this.actionLinks,
      baseUrl: this.baseUrl,
      locale: this.intl.locale,
      target: this.linkTarget
    };
    // Decide what converter function to use
    let converter = resultToCardModel;
    if (this.entity) {
      converter = entityToCardModel;
    }
    // Convert the entity or result to a card model
    const resultOrEntity = this.searchResult || this.entity;
    let model = converter(resultOrEntity, this.layout, this.context, this.intl, opts);
    // If there is a callback, call it
    if (this.callback) {
      try {
        model = this.callback(model, this.layout, this.context, resultOrEntity);
      }
      catch (error) {
        // Just log it out but do not throw
        console.error(`arcgis-hub-entity-card:callback error: ${error}`);
      }
    }
    // return the model
    return model;
  }
  get context() {
    return getGlobalContext();
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  render() {
    return (h(Host, { "data-element": "entity-card" }, h("arcgis-hub-card", { clickable: this.clickable, corners: this.corners, imageType: this.imageType, layout: this.layout, lazy: this.lazy, loading: this.isLoading, model: this._model, newTab: this.newTab, primaryActionsToRender: this.primaryActionsToRender, selectable: this.selectable, selected: this.selected, shadow: this.shadow, showAdditionalInfo: this.showAdditionalInfo, showAllAdditionalInfo: this.showAllAdditionalInfo, showBadges: this.showBadges, showOwner: this.showOwner, showThumbnail: this.showThumbnail, showType: this.showType, titleTag: this.titleTag })));
  }
  static get is() { return "arcgis-hub-entity-card"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-card.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-card.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "actionLinks": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ICardActionLink[]",
          "resolved": "ICardActionLink[]",
          "references": {
            "ICardActionLink": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "actions to render in the card"
        }
      },
      "baseUrl": {
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
          "text": "base url to work in conjunction with the linkTarget"
        },
        "attribute": "base-url",
        "reflect": false
      },
      "clickable": {
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
          "text": "indicates whether the entire card is a clickable target"
        },
        "attribute": "clickable",
        "reflect": false
      },
      "corners": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "CORNERS",
          "resolved": "CORNERS.round | CORNERS.square",
          "references": {
            "CORNERS": {
              "location": "import",
              "path": "../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "indicates whether the card's corners are round or square"
        },
        "attribute": "corners",
        "reflect": false,
        "defaultValue": "CORNERS.square"
      },
      "imageType": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "IMAGE_TYPES",
          "resolved": "IMAGE_TYPES.icon | IMAGE_TYPES.thumbnail",
          "references": {
            "IMAGE_TYPES": {
              "location": "import",
              "path": "../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "indicates whether the card renders a thumbnail or icon"
        },
        "attribute": "image-type",
        "reflect": false,
        "defaultValue": "IMAGE_TYPES.thumbnail"
      },
      "layout": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'row' | 'card'",
          "resolved": "\"card\" | \"row\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "the card's layout"
        },
        "attribute": "layout",
        "reflect": true,
        "defaultValue": "'row'"
      },
      "lazy": {
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
          "text": "indicates whether the card's thumbnail should lazy load"
        },
        "attribute": "lazy",
        "reflect": false,
        "defaultValue": "false"
      },
      "linkTarget": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "CardModelTarget",
          "resolved": "\"event\" | \"none\" | \"self\" | \"siteRelative\" | \"workspaceRelative\"",
          "references": {
            "CardModelTarget": {
              "location": "import",
              "path": "../../utils/cardModelConverters/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "indicates where the card should redirect"
        },
        "attribute": "link-target",
        "reflect": false
      },
      "newTab": {
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
          "text": "indicates whether the target url should open in a new tab"
        },
        "attribute": "new-tab",
        "reflect": false,
        "defaultValue": "false"
      },
      "selectable": {
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
          "text": "indicates whether the card is selectable (renders a checkbox)"
        },
        "attribute": "selectable",
        "reflect": false,
        "defaultValue": "false"
      },
      "selected": {
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
          "text": "indicates whether the card is selected"
        },
        "attribute": "selected",
        "reflect": false,
        "defaultValue": "false"
      },
      "searchResult": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubSearchResult",
          "resolved": "IHubSearchResult",
          "references": {
            "IHubSearchResult": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "hub search result"
        }
      },
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
          "text": "full entity"
        }
      },
      "shadow": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "DROP_SHADOWS",
          "resolved": "DROP_SHADOWS.heavy | DROP_SHADOWS.low | DROP_SHADOWS.medium | DROP_SHADOWS.none",
          "references": {
            "DROP_SHADOWS": {
              "location": "import",
              "path": "../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "defines the heaviness of the card's drop shadow"
        },
        "attribute": "shadow",
        "reflect": false,
        "defaultValue": "DROP_SHADOWS.none"
      },
      "showAdditionalInfo": {
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
          "text": "indicates whether additional metadata should be displayed"
        },
        "attribute": "show-additional-info",
        "reflect": false,
        "defaultValue": "true"
      },
      "showAllAdditionalInfo": {
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
          "text": "indicates whether all additional metadata should be displayed"
        },
        "attribute": "show-all-additional-info",
        "reflect": false,
        "defaultValue": "false"
      },
      "showBadges": {
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
          "text": "indicates whether badges should be displayed"
        },
        "attribute": "show-badges",
        "reflect": false,
        "defaultValue": "true"
      },
      "showOwner": {
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
          "text": "indicates whether the source information should be displayed"
        },
        "attribute": "show-owner",
        "reflect": false,
        "defaultValue": "true"
      },
      "showThumbnail": {
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
          "text": "indicates whether the thumbnail should be displayed"
        },
        "attribute": "show-thumbnail",
        "reflect": false,
        "defaultValue": "true"
      },
      "showType": {
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
          "text": "indicates whether the family name + icon should be displayed"
        },
        "attribute": "show-type",
        "reflect": false,
        "defaultValue": "true"
      },
      "titleTag": {
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
          "text": "defines what tag (i.e. <h3>, etc) should wrap the title"
        },
        "attribute": "title-tag",
        "reflect": false
      },
      "callback": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "CardViewModelCallback",
          "resolved": "(model: IHubCardViewModel, layout: CardLayout, context: IArcGISContext, result: HubEntity | IHubSearchResult) => IHubCardViewModel",
          "references": {
            "CardViewModelCallback": {
              "location": "import",
              "path": "../../utils/cardModelConverters/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "optional callback to customize the IHubCardViewModel before it is rendered"
        }
      },
      "primaryActionsToRender": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "1 | 2 | 3",
          "resolved": "1 | 2 | 3",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "primary-actions-to-render",
        "reflect": false,
        "defaultValue": "1"
      }
    };
  }
  static get states() {
    return {
      "isLoading": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubCardTitleLinkClick",
        "name": "arcgisHubCardTitleLinkClick",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emits when a user clicks the card title and the title is a link\nNote that this is emitted by the underlying `arcgis-hub-card` component"
        },
        "complexType": {
          "original": "IHubCardTitleLinkClickEvent",
          "resolved": "IHubCardTitleLinkClickEvent",
          "references": {
            "IHubCardTitleLinkClickEvent": {
              "location": "import",
              "path": "../../utils/cardModelConverters/types"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
}
