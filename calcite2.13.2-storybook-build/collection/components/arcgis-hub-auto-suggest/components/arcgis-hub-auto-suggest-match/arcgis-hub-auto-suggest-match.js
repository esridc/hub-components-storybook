import { Host, h } from '@stencil/core';
import { bind } from '../../../../utils/context';
import { getHighlightedLabel } from '../../../../utils/auto-suggest/getHighlightedLabel';
import { AutoSuggestMatchSource } from '../../../../utils/auto-suggest/types';
import { stripHtml } from '../../../../utils';
export class ArcgisHubAutoSuggestMatch {
  constructor() {
    this.match = undefined;
    this.term = '';
    bind(this, 'setLinkElement', 'handleMatchSelected', 'handleMatchKeyDown', 'handleRecentMatchRemoved', 'handleRemoveMatchButtonKeyDown');
  }
  setLinkElement(el) {
    this._link = el;
  }
  async setFocus() {
    this._link.focus();
  }
  get isRecentMatch() {
    return this.match.source === AutoSuggestMatchSource.RECENT;
  }
  handleMatchSelected(event) {
    // Prevent the empty link from navigating to prevent interference
    // with navigation handlers defined by the parent component
    event.preventDefault();
    this.matchSelected.emit(this.match);
  }
  handleMatchKeyDown(event) {
    this.matchKeyDown.emit({
      event,
      match: this.match
    });
    // Non-recent matches should emit a `matchTabOut` event when the user forward tabs off the link
    if (!this.isRecentMatch && event.key === 'Tab' && !event.shiftKey) {
      this.matchTabOut.emit(this.match);
    }
  }
  handleRecentMatchRemoved() {
    this.recentMatchRemoved.emit(this.match);
  }
  handleRemoveMatchButtonKeyDown(event) {
    // recent matches should emit a `matchTabOut` event when the user forward tabs off the remove button
    if (event.key === 'Tab' && !event.shiftKey) {
      this.matchTabOut.emit(this.match);
    }
  }
  render() {
    // prevent xss attack vector issue #12121
    const label = stripHtml(this.match.label);
    const highlighted = getHighlightedLabel(label, this.term);
    // TODO: Change this into a button and fix the icon alignment
    // eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid
    const link = h("a", { class: "match-link", href: '#', innerHTML: highlighted, onClick: this.handleMatchSelected, onKeyDown: this.handleMatchKeyDown, ref: this.setLinkElement });
    return (h(Host, { "data-element": "auto-suggest-match" }, h("calcite-icon", { class: "match-icon", icon: this.match.icon, scale: "s" }), h("div", { class: "match-info" }, link, this.match.description &&
      h("div", { class: "match-description" }, this.match.description)), this.isRecentMatch &&
      h("calcite-action", { class: "remove-match-button", icon: "x", onClick: this.handleRecentMatchRemoved, onKeyDown: this.handleRemoveMatchButtonKeyDown, scale: "s" })));
  }
  static get is() { return "arcgis-hub-auto-suggest-match"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-auto-suggest-match.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-auto-suggest-match.css"]
    };
  }
  static get properties() {
    return {
      "match": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubAutoSuggestMatch",
          "resolved": "IHubAutoSuggestMatch",
          "references": {
            "IHubAutoSuggestMatch": {
              "location": "import",
              "path": "../../../../utils/auto-suggest/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The match to render"
        }
      },
      "term": {
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
          "text": "The term that was used to find this match. Used for calculating\nthe highlighted label to display"
        },
        "attribute": "term",
        "reflect": false,
        "defaultValue": "''"
      }
    };
  }
  static get events() {
    return [{
        "method": "matchSelected",
        "name": "matchSelected",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emits when the match's primary label is clicked"
        },
        "complexType": {
          "original": "IHubAutoSuggestMatch",
          "resolved": "IHubAutoSuggestMatch",
          "references": {
            "IHubAutoSuggestMatch": {
              "location": "import",
              "path": "../../../../utils/auto-suggest/types"
            }
          }
        }
      }, {
        "method": "matchKeyDown",
        "name": "matchKeyDown",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emits when a key is pressed while the match is focused.\nDecorates the event with the match that was focused"
        },
        "complexType": {
          "original": "IEventWithMatchPayload",
          "resolved": "IEventWithMatchPayload",
          "references": {
            "IEventWithMatchPayload": {
              "location": "import",
              "path": "../../../../utils/auto-suggest/types"
            }
          }
        }
      }, {
        "method": "recentMatchRemoved",
        "name": "recentMatchRemoved",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emits when the remove button is clicked on a recent match"
        },
        "complexType": {
          "original": "IHubAutoSuggestRecentMatch",
          "resolved": "IHubAutoSuggestRecentMatch",
          "references": {
            "IHubAutoSuggestRecentMatch": {
              "location": "import",
              "path": "../../../../utils/auto-suggest/types"
            }
          }
        }
      }, {
        "method": "matchTabOut",
        "name": "matchTabOut",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emits when the user hits forward tab on the _last_ focusable element\nwithin the match. Decorates the event with the match that tabbed on.\n\nFor recent matches, this emits when the user tabs off the remove button.\nFor other matches, this emits when the user tabs off the match link."
        },
        "complexType": {
          "original": "IHubAutoSuggestMatch",
          "resolved": "IHubAutoSuggestMatch",
          "references": {
            "IHubAutoSuggestMatch": {
              "location": "import",
              "path": "../../../../utils/auto-suggest/types"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "setFocus": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
}
