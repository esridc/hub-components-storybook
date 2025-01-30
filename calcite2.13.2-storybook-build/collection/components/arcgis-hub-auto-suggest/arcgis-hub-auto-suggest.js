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
import { cloneObject } from '@esri/hub-common';
import { Host, h } from '@stencil/core';
import { bind } from '../../utils/context';
import Debounce from '../../decorators/debounce';
import { getGlobalContext } from '../../utils/state';
import intlManager from '../../utils/intl-manager';
import { AutoSuggestMatchSource } from '../../utils/auto-suggest/types';
import { fetchAutoSuggestMatches } from '../../utils/auto-suggest/fetchAutoSuggestMatches';
import { getAllRecentTermsMatches } from '../../utils/auto-suggest/getAllRecentTermsMatches';
import { getEmptyAutoSuggestResponse } from '../../utils/auto-suggest/getEmptyAutoSuggestResponse';
import { removeRecentMatch } from '../../utils/auto-suggest/removeRecentMatch';
import { saveRecentMatch } from '../../utils/auto-suggest/saveRecentMatch';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { stripHtml } from '../../utils';
// NOTE: 12/19/24 added aggressive stripping HTML from the term to prevent XSS attacks
// A deeper refactor could centralize this via a getter on the term prop, but we wanted to
// get this out the door quickly. Created issue https://devtopia.esri.com/dc/hub/issues/12125 to revisit
export class ArcgisHubAutoSuggest {
  constructor() {
    /**
     * The minimum number of characters that must be entered into the input before searching
     * actually begins. If this threshold is not met, the component will display the N most
     * recently searched terms instead (see `numDefaultRecentMatches)
     */
    this._minTermLength = 3;
    /**
     * The number of recent terms to display when the input character count is below the `minTermLength` threshold.
     */
    this._numDefaultRecentMatches = 3;
    this.term = '';
    this.searchApi = 'portal';
    this.query = undefined;
    this.matchRecent = false;
    this.matchSearch = false;
    this.matchLocation = false;
    this.clearButton = false;
    this.searchButton = false;
    this.showSearchIcon = false;
    this.disableTelemetry = false;
    this.placeholder = undefined;
    this.scale = 'l';
    this.readOnly = false;
    this.lastResponse = undefined;
    bind(this, 'setInputElement', 'refreshMatches', 'clearMatches', 'handleInputFocused', 'handleInputKeyDown', 'handleInputTyped', 'handleInputCommitted', 'handleMatchKeyDown', 'handleMatchSelected', 'handleRecentMatchRemoved', 'handleMatchTabOut');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.lastResponse = getEmptyAutoSuggestResponse();
    // prevent xss attack vector issue #12121
    if (this.term) {
      this.term = stripHtml(this.term);
    }
  }
  ////////////////////////
  // Click Outside Logic
  ////////////////////////
  // This is very O_o, but it's the only workaround I've found that works with nested shadow doms:
  //
  // - Add an event listener that closes the dropdown when the document receives a click event
  // - Prevent click events _within_ this component from bubbling up to the document
  //
  // NOTE: Nested shadow doms wreak havoc on event.target, making it difficult to detect where a
  // click event originated  (See: https://stackoverflow.com/questions/49678404/event-target-is-null-when-using-shadow-dom).
  // This is why we can't use a more straightforward approach like `node.contains(event.target)`
  // (See: https://stackoverflow.com/questions/14188654/detect-click-outside-element-vanilla-javascript#answer-28432139).
  // eslint-disable-next-line @stencil/prefer-vdom-listener
  preventClickPropagation(event) {
    event.stopPropagation();
  }
  connectedCallback() {
    document.addEventListener('click', this.clearMatches);
  }
  disconnectedCallback() {
    document.removeEventListener('click', this.clearMatches);
  }
  ///////////////////////////
  // End Click Outside Logic
  ///////////////////////////
  get shouldShowRecentMatches() {
    return this.matchRecent && !!this.lastResponse.recent.length;
  }
  get shouldShowSearchMatches() {
    return this.matchSearch && !!this.lastResponse.search.length;
  }
  get shouldShowLocationMatches() {
    return this.matchLocation && !!this.lastResponse.location.length;
  }
  get shouldShowDropdown() {
    return this.shouldShowRecentMatches || this.shouldShowSearchMatches || this.shouldShowLocationMatches;
  }
  /**
   * Returns the name of the icon to display in the input
   */
  get searchIcon() {
    return this.showSearchIcon ? 'search' : null;
  }
  /**
   * Returns the placeholder text to display in the input
   */
  get _placeholder() {
    return this.placeholder || this.intl.t('search');
  }
  /**
   * This handles when consumers programmatically change the `term` prop.
   */
  handleTermInputChanged(termInput) {
    // Note from Caleb: by the time this fires, this.term === termInput
    // so the if statement is never hit. When we refactor for #12125, we should
    // likely be able to remove this entirely
    if (termInput !== this.term) {
      // avoid xss attack vector issue #12121
      this.term = stripHtml(termInput);
      this.refreshMatches();
    }
  }
  /**
   * Set focus on the input element programmatically
   */
  async setFocus() {
    var _a;
    (_a = this._inputElement) === null || _a === void 0 ? void 0 : _a.setFocus();
  }
  setInputElement(el) {
    this._inputElement = el;
  }
  /**
   * Debounced wrapper for `this._refreshMatches`. This function should always be called in lieu of
   * `this._refreshMatches` to ensure that matches are not refreshed too frequently.
   *
   * NOTE: Due to accessibility / product requirements, we can't add a `Watch('term')` decorator
   * since we need to be able to update the term without triggering a search (e.g., when a user
   * selects a match). This function _must_ be manually called whenever matches need to be refreshed.
   */
  refreshMatches() {
    this._refreshMatches();
  }
  /**
   * Executes a search for matches based on the current value of the input.
   *
   * NOTE: _Do not_ decorate this function with `@Debounce` and _do not_ call this function
   * directly outside of a test. We had to separate the debounce from the actual logic as our
   * testing framework doesn't play nicely with debounced async functions.
   */
  async _refreshMatches() {
    if ((this.term || '').length < this._minTermLength) {
      // Minimum term length not met, so display recent search terms (if enabled)
      const newResponse = getEmptyAutoSuggestResponse();
      if (this.matchRecent) {
        newResponse.recent = getAllRecentTermsMatches().slice(0, this._numDefaultRecentMatches);
      }
      this.lastResponse = newResponse;
    }
    else {
      // avoid xss attack vector issue #12121
      this.term = stripHtml(this.term);
      this.lastResponse = await fetchAutoSuggestMatches({
        term: this.term,
        searchApi: this.searchApi,
        query: this.query,
        matchRecent: this.matchRecent,
        matchSearch: this.matchSearch,
        matchLocation: this.matchLocation,
        context: getGlobalContext(),
      });
    }
  }
  /**
   * Clears all matches from the dropdown and closes the dropdown
   */
  clearMatches() {
    this.lastResponse = getEmptyAutoSuggestResponse();
  }
  /**
   * Product requirements for when the input is focused:
   * - If the dropdown is closed, open the dropdown and refresh matches
   * - If the dropdown is open, do nothing and assume results are up to date
   */
  handleInputFocused() {
    !this.shouldShowDropdown && this.refreshMatches();
  }
  /**
   * Handles keyboard interaction and navigation on the input element
   */
  handleInputKeyDown(event) {
    // prevent xss attack vector issue #12121
    // this.term = stripHtml(this.term);
    switch (event.key) {
      case 'Enter':
        // Commit the input value when the user presses 'Enter'
        // NOTE: We can't use the input's onCalciteInputChange event because it fires
        // on both 'Enter' and 'Tab' keydown events, but we only care about 'Enter'.
        this.handleInputCommitted();
        break;
      case 'ArrowDown':
        // If the dropdown is open, focus the first match
        if (this.shouldShowDropdown) {
          event.preventDefault();
          const firstMatch = this.element.shadowRoot.querySelector('arcgis-hub-auto-suggest-match');
          firstMatch === null || firstMatch === void 0 ? void 0 : firstMatch.setFocus();
        }
        break;
      case 'Escape':
        // calcite-input _erases_ the value of the input when the escape key is pressed,
        // which is not the behavior we want. This prevents that from happening.
        event.preventDefault();
      default:
        break;
    }
  }
  /**
   * Records the current value of the input whenever the user changes it (via type, paste, etc.)
   * and refreshes matches accordingly. This is _not_ propagated to the parent component.
   *
   * Note: this does not fire when `this.term` is updated programmatically
   */
  handleInputTyped(event) {
    // prevent xss attack vector issue #12121
    this.term = stripHtml(event.target.value);
    this.refreshMatches();
  }
  /**
   * Handles when the user commits the input value by pressing 'Enter' or clicking the search button,
   * indicating that they would like to execute a search. This is propagated to the parent component.
   *
   * If the `matchRecent` prop is true, this will save the current value of the input as a recent term.
   */
  handleInputCommitted() {
    var _a, _b;
    // avoid xss attack vector issue #12121
    // possibly redundant, but this ensures that the term is stripped of html before being used in any way
    this.term = stripHtml(this.term);
    if (this.matchRecent && ((_a = this.term) === null || _a === void 0 ? void 0 : _a.trim())) {
      const newMatch = {
        label: this.term.trim(),
        source: AutoSuggestMatchSource.RECENT,
        icon: 'recent',
      };
      saveRecentMatch(newMatch);
    }
    // Send telemetry for the search
    this.maybeSendTelemetry(Object.assign(Object.assign({}, dictionary
      .category.interaction
      .action.search
      .label.query), { search: (_b = this.term) === null || _b === void 0 ? void 0 : _b.trim() }));
    this.inputChangeEvent.emit(this.term);
    this.clearMatches();
  }
  /**
   * Handles keyboard interaction and navigation on match elements.
   *
   * NOTE: "Tab" events are special snowflakes that must be handled separately.
   * See `handleMatchTabOut` for more info.
   */
  async handleMatchKeyDown(e) {
    const { event: keyboardEvent, match } = e.detail;
    // NOTE, we need to calculate the current index across all match types, not just the current match type,
    const matchElements = Array.from(this.element.shadowRoot.querySelectorAll('arcgis-hub-auto-suggest-match'));
    const currentIndex = matchElements.findIndex((el) => el === e.target);
    switch (keyboardEvent.key) {
      // Navigate to the next match if available, otherwise focus the input
      case 'ArrowDown': {
        keyboardEvent.preventDefault();
        const nextIndex = currentIndex + 1;
        if (nextIndex < matchElements.length) {
          const nextMatch = matchElements[nextIndex];
          nextMatch.setFocus();
        }
        else {
          this._inputElement.setFocus();
        }
        break;
      }
      // Navigate to the previous match if available, otherwise focus the input
      case 'ArrowUp': {
        keyboardEvent.preventDefault();
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
          const prevMatch = matchElements[prevIndex];
          prevMatch === null || prevMatch === void 0 ? void 0 : prevMatch.setFocus();
        }
        else {
          this._inputElement.setFocus();
        }
        break;
      }
      // Set the match as the current value of the input, but _don't_ commit the input
      case ' ': {
        keyboardEvent.preventDefault();
        this.term = match.label;
        await this._inputElement.setFocus();
        this.clearMatches();
        break;
      }
      // Select the match and notify the consumer
      case 'Enter': {
        keyboardEvent.preventDefault();
        this.selectMatch(match);
        break;
      }
      // Close the dropdown and focus the input
      case 'Escape': {
        keyboardEvent.preventDefault();
        await this._inputElement.setFocus();
        this.clearMatches();
        break;
      }
      default:
        break;
    }
  }
  /**
   * Wrapper for handling event propagation from match elements
   */
  handleMatchSelected(event) {
    event.preventDefault();
    const match = event.detail;
    this.selectMatch(match);
  }
  /**
   * Handles when a user selects a match from the dropdown. The match
   * is propagated to the parent component and the dropdown is closed.
   *
   * @param match match to be emitted to consumer
   */
  selectMatch(match) {
    const telemetryBaseObject = match.source === AutoSuggestMatchSource.RECENT
      ? dictionary.category.interaction.action.search.label.recent
      : dictionary.category.interaction.action.search.label.suggest;
    this.maybeSendTelemetry(Object.assign(Object.assign({}, telemetryBaseObject), { details: match.label, search: this.term, position: this.lastResponse[match.source].findIndex((m) => m === match), count: this.lastResponse[match.source].length }));
    this.matchSelectedEvent.emit(match);
    // prevent xss attack vector issue #12121
    this.term = stripHtml(match.label);
    this.clearMatches();
  }
  /**
   * Handles when a user removes a recent match from the dropdown.
   */
  handleRecentMatchRemoved(event) {
    var _a;
    event.preventDefault();
    const match = event.detail;
    // Remove the match from local storage
    removeRecentMatch(match);
    const updatedResponse = cloneObject(this.lastResponse);
    updatedResponse.recent = ((_a = this.term) === null || _a === void 0 ? void 0 : _a.length) >= this._minTermLength
      // Term length is above threshold, so filter out the removed match
      ? updatedResponse.recent.filter((recent) => recent.label !== match.label)
      // Term length is below threshold, so display the default number of recent matches
      : getAllRecentTermsMatches().slice(0, this._numDefaultRecentMatches);
    this.lastResponse = updatedResponse;
  }
  /**
   * Handles forward tabs out of a match element.
   *
   * If the match is the last match in the dropdown, we let the browser handle the tab event
   * (i.e., focus the next tabbable element in the DOM) and close the dropdown.
   *
   * We can't do this in `handleMatchKeyDown` because recent match elements have mulitple tabbable
   * elements within them (i.e., the 'remove button'), so the component has to notify us via an event.
   */
  handleMatchTabOut(e) {
    const matchElements = Array.from(this.element.shadowRoot.querySelectorAll('arcgis-hub-auto-suggest-match'));
    const nextIndex = matchElements.findIndex((el) => el === e.target) + 1;
    if (nextIndex >= matchElements.length) {
      // I know this is O_o, but if we don't wait until the next tick _before_ we close the
      // dropdown, the browser's groove gets thrown off and it doesn't focus the next element
      setTimeout(this.clearMatches, 0);
    }
  }
  /**
   * Wrapper for emiting telemetry
   */
  maybeSendTelemetry(data) {
    if (!this.disableTelemetry) {
      this.hubTelemetry.emit(data);
    }
  }
  renderMatchesSection(matchSource) {
    return h("div", { class: "matches-section" }, h("div", { class: "section-header" }, this.intl.t(`sections.${matchSource}`)), this.lastResponse[matchSource].map((match) => {
      return h("arcgis-hub-auto-suggest-match", { key: match.label, match: match, onMatchKeyDown: this.handleMatchKeyDown, onMatchSelected: this.handleMatchSelected, onMatchTabOut: this.handleMatchTabOut, onRecentMatchRemoved: this.handleRecentMatchRemoved, term: this.term });
    }));
  }
  render() {
    return (h(Host, { "data-element": "auto-suggest" }, h("div", { class: "container" }, h("calcite-input", { clearable: this.clearButton, icon: this.searchIcon, label: this._placeholder, onCalciteInputInput: this.handleInputTyped, onFocus: this.handleInputFocused, onKeyDown: this.handleInputKeyDown, placeholder: this._placeholder, readOnly: this.readOnly, ref: this.setInputElement, scale: this.scale, value: this.term }, this.searchButton &&
      h("calcite-button", { onClick: this.handleInputCommitted, scale: this.scale, slot: "action" }, this.intl.t('search'))), this.shouldShowDropdown &&
      h("div", { class: "matches-dropdown" }, this.shouldShowRecentMatches && this.renderMatchesSection(AutoSuggestMatchSource.RECENT), this.shouldShowSearchMatches && this.renderMatchesSection(AutoSuggestMatchSource.SEARCH), this.shouldShowLocationMatches && this.renderMatchesSection(AutoSuggestMatchSource.LOCATION)))));
  }
  static get is() { return "arcgis-hub-auto-suggest"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-auto-suggest.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-auto-suggest.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "term": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Value that the input should be initialized to and\nstores the current value of the input.\nUsed to calculate suggestion matches."
        },
        "attribute": "term",
        "reflect": true,
        "defaultValue": "''"
      },
      "searchApi": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'portal' | 'hub'",
          "resolved": "\"hub\" | \"portal\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The search API to use for generating search result matches.\nOnly respected if `matchSearch` is true."
        },
        "attribute": "search-api",
        "reflect": false,
        "defaultValue": "'portal'"
      },
      "query": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IQuery",
          "resolved": "IQuery",
          "references": {
            "IQuery": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The base query to scope search result matches to.\nOnly respected if `matchSearch` is true."
        }
      },
      "matchRecent": {
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
          "text": "Whether the component should store / search recent\nsearch terms within the browser's local storage."
        },
        "attribute": "match-recent",
        "reflect": false,
        "defaultValue": "false"
      },
      "matchSearch": {
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
          "text": "Whether the component should search / display\nsuggestion matches from a search API"
        },
        "attribute": "match-search",
        "reflect": false,
        "defaultValue": "false"
      },
      "matchLocation": {
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
          "text": "NOTE: Functionality not yet implemented.\n\nWhether the component should search / display suggestion matches from a\ngeographic location API, such as a geocoding service or the places API."
        },
        "attribute": "match-location",
        "reflect": false,
        "defaultValue": "false"
      },
      "clearButton": {
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
          "text": "Whether the component should display a button that clears the input"
        },
        "attribute": "clear-button",
        "reflect": false,
        "defaultValue": "false"
      },
      "searchButton": {
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
          "text": "Whether the component should display a button that submits the input"
        },
        "attribute": "search-button",
        "reflect": false,
        "defaultValue": "false"
      },
      "showSearchIcon": {
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
          "text": "Whether or not the search icon should be displayed in the input"
        },
        "attribute": "show-search-icon",
        "reflect": false,
        "defaultValue": "false"
      },
      "disableTelemetry": {
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
          "text": "Whether telemetry events in the gallery should be disabled"
        },
        "attribute": "disable-telemetry",
        "reflect": false,
        "defaultValue": "false"
      },
      "placeholder": {
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
          "text": "Optional placeholder text for the input to be used in place of default text"
        },
        "attribute": "placeholder",
        "reflect": false
      },
      "scale": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Scale",
          "resolved": "\"l\" | \"m\" | \"s\"",
          "references": {
            "Scale": {
              "location": "import",
              "path": "@esri/calcite-components/dist/types/components/interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The scale of the input, based on calcite-input's scale prop"
        },
        "attribute": "scale",
        "reflect": false,
        "defaultValue": "'l'"
      },
      "readOnly": {
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
          "text": "When true, the component's value can be read, but cannot be modified."
        },
        "attribute": "read-only",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "lastResponse": {}
    };
  }
  static get events() {
    return [{
        "method": "inputChangeEvent",
        "name": "arcgisHubAutoSuggestInputChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "This event fires when a user commits a search term by pressing 'Enter' or clicking the search button."
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }, {
        "method": "matchSelectedEvent",
        "name": "arcgisHubAutoSuggestMatchSelected",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "This event fires when a user selects a match from the dropdown."
        },
        "complexType": {
          "original": "IHubAutoSuggestMatch",
          "resolved": "IHubAutoSuggestMatch",
          "references": {
            "IHubAutoSuggestMatch": {
              "location": "import",
              "path": "../../utils/auto-suggest/types"
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
          "text": "Event that fires for recording telemetry"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
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
          "text": "Set focus on the input element programmatically",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "term",
        "methodName": "handleTermInputChanged"
      }];
  }
  static get listeners() {
    return [{
        "name": "click",
        "method": "preventClickPropagation",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
__decorate([
  Debounce({ timeout: 100 })
], ArcgisHubAutoSuggest.prototype, "refreshMatches", null);
