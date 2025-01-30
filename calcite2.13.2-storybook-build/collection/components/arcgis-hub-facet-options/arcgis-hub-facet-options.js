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
import { bind } from '../../utils/context';
import intlManager from '../../utils/intl-manager';
import Debounce from "../../decorators/debounce";
export class ArcgisHubFacetOptions {
  constructor() {
    /**
     * Number of facet options to show, default is 5
     */
    this.pageSize = 5;
    this.facet = undefined;
    this.showLimitedOptions = false;
    this.query = '';
    bind(this, 'handleCalciteRadioButtonChangeEvent', 'handleCalciteCheckboxChangeEvent', 'toggleMoreOrLessButton', 'handleCalciteInputInput', 'setPageSeparator');
  }
  async componentWillLoad() {
    // Reset page size if it's passed in
    if (this.facet.optionLimit) {
      this.pageSize = this.facet.optionLimit;
    }
    this.intl = await intlManager.loadIntlForComponent(this.element);
    // If there is a default page size and the number of facet options is more than that
    // we display the limited amount of options and the Show More button
    if (this.facet.options.length > this.pageSize) {
      this.showLimitedOptions = true;
    }
  }
  updateQuery() {
    this.query = this._query;
  }
  handleCalciteInputInput(event) {
    this._query = event.target.value;
    this.updateQuery();
  }
  /**
   * Event that's fired when a radio button is clicked(single mode)
   * Not using @Listen because the event's target is this component NOT
   * the calcite-radio. We are unclear if this is an issue with nested
   * shadowdom or something calcite specific
   */
  handleCalciteRadioButtonChangeEvent(evt) {
    this.onFacetChanged(evt.target.id, evt.target.checked);
  }
  /**
   * Event that's fired when a checkbox is checked/unchecked(multi mode)
   * Not using @Listen because the event's target is this component NOT
   * the calcite-checkbox. We are unclear if this is an issue with nested
   * shadowdom or something calcite specific
   */
  handleCalciteCheckboxChangeEvent(checkboxIndex, evt) {
    this.onFacetChanged(evt.target.id, evt.target.checked, checkboxIndex);
  }
  /**
   * Emit the arcgisHubFacetOptionsChange event
   * @param key
   * @param checked
   */
  onFacetChanged(key, checked, optionIndex) {
    this.arcgisHubFacetOptionsChange.emit({
      key: this.facet.key,
      optionKey: key,
      checked,
      optionIndex
    });
  }
  /**
   * filtered multi-select options based on user query
   */
  get filteredOptions() {
    return this.facet.options.filter(
    // Prevent "unrecognized" options from rendering, as they are only displayed as a filter chip.
    // See the documentation for IFacetOption._unrecognized for more info.
    ({ _unrecognized, label }) => !_unrecognized && label.toLowerCase().includes(this.query.toLowerCase()));
  }
  /**
   * ordered multi-select options based on facet setting
   */
  get orderedOptions() {
    return this.facet.orderBy === 'label'
      ? this.filteredOptions.sort((a, b) => a.label.localeCompare(b.label))
      : this.filteredOptions.sort((a, b) => { var _a, _b; return ((_a = b.count) !== null && _a !== void 0 ? _a : 0) - ((_b = a.count) !== null && _b !== void 0 ? _b : 0); });
  }
  setPageSeparator(el) {
    this.pageSeparator = el;
  }
  /**
   * Render the facet with checkboxes.
   */
  renderCheckboxes() {
    const allOptions = this.orderedOptions.map((option, i) => {
      // key needs to include the count or the facetOption won't be updated when count changes
      const key = option.count ? `${option.key}:${option.count}` : option.key;
      const checkboxChangeHandler = this.handleCalciteCheckboxChangeEvent.bind(this, i);
      return h("calcite-label", { key: key }, h("div", { class: "option-container" }, h("calcite-checkbox", { checked: option.selected, id: option.key, name: option.label, onCalciteCheckboxChange: checkboxChangeHandler }), h("span", { class: "option" }, option.label)));
    });
    // This may look odd, but it's needed for accessibility requirements.
    // When a user clicks the more button, the user's next tab press should
    // navigate to the first checkbox of the NEWLY loaded page.
    //
    // Focusing on an invisible span _in between_ the two pages is the easiest
    // way to achieve the desired behavior since the span is always present
    // and doesn't show a visual cue when we programmatically focus it.
    const firstOptionsPage = allOptions.slice(0, this.pageSize);
    const remainingOptions = this.showLimitedOptions ? [] : allOptions.slice(this.pageSize);
    const result = [
      ...firstOptionsPage,
      h("span", { key: "page-separator", ref: this.setPageSeparator, tabIndex: -1 }),
      ...remainingOptions
    ];
    return result;
  }
  toggleMoreOrLessButton() {
    // Emit event to notify consumers
    this.arcgisHubFacetMoreLessClicked.emit({
      facet: this.facet,
      isMore: this.showLimitedOptions
    });
    this.showLimitedOptions = !this.showLimitedOptions;
    this.renderCheckboxes();
    // By focusing on the separator span now, the user's next tab press
    // will navigate to the first checkbox of the next option page
    this.pageSeparator.focus();
  }
  /**
   * Number of options to display after the default page size.
   * Base off filtered options in case a query has been applied.
   */
  get optionsLeftToDisplay() {
    return this.filteredOptions.length - this.pageSize;
  }
  /**
   * Icon next to the "Show More" or "Show Less" button
   */
  get moreOrLessButtonIconEnd() {
    return this.showLimitedOptions ? "chevron-down" : "chevron-up";
  }
  /**
   * Show {num} More or Show Less label
   */
  get moreOrLessButtonLabel() {
    return this.showLimitedOptions
      ? this.intl.t('showMore', { num: this.optionsLeftToDisplay })
      : this.intl.t('showLess');
  }
  get showNoMatchesNotice() {
    return this.facet.display === 'multi-select' && !this.filteredOptions.length;
  }
  /**
   * Only show More/Less button for checkboxes AND when the filtered options are more than page size
   * when page size is not defined or the filtered options are less than page size
   * we don't want to show any buttons
   */
  renderMoreOrLessButton() {
    if (this.facet.display === 'multi-select' && this.filteredOptions.length > this.pageSize) {
      return (h("div", { class: "more-or-less-container" }, h("calcite-button", { appearance: "transparent", color: "blue", "icon-end": this.moreOrLessButtonIconEnd, label: this.intl.t('moreOrLessButtonLabel', {
          moreOrLess: this.moreOrLessButtonLabel,
          label: this.facet.label
        }), onClick: this.toggleMoreOrLessButton }, this.moreOrLessButtonLabel)));
    }
  }
  /**
   * Render the facet with radio buttons
   */
  renderRadioButtons() {
    // Prevent "unrecognized" options from rendering, as they are only displayed as a filter chip.
    // See the documentation for IFacetOption._unrecognized for more info.
    return this.facet.options.filter(option => !option._unrecognized).map(option => {
      return h("calcite-label", { key: option.key, layout: "inline" }, h("calcite-radio-button", { checked: option.selected, id: option.key, name: option.label, onCalciteRadioButtonChange: this.handleCalciteRadioButtonChangeEvent, value: option.key }), h("span", { class: "option" }, option.label));
    });
  }
  renderNoMatchesNotice() {
    return this.showNoMatchesNotice &&
      h("calcite-notice", { id: "no-match-notice", open: true, width: "full" }, h("div", { slot: "message" }, this.intl.t('noMatchesNotice')));
  }
  /**
   * Main Render
   */
  render() {
    const isMultiSelect = this.facet.display === 'multi-select';
    const showFilterInput = isMultiSelect && this.facet.options.length > 5;
    // Collaboration has an issue to hide the search bar when facet.options is less than 5, but
    // not when a filter is applied. In other words, my quick fix was not comprehensive enough.
    return (h(Host, { "data-element": "facet-options" }, showFilterInput &&
      h("calcite-input", { "aria-label": this.intl.t('inputAriaLabel', { label: this.facet.label }), "aria-labelledby": this.showNoMatchesNotice ? "no-match-notice" : null, class: "option-search-bar", clearable: true, onCalciteInputInput: this.handleCalciteInputInput, placeholder: this.intl.t('inputPlaceholder') }), isMultiSelect ?
      h("fieldset", { "data-test": "options-container" }, h("legend", null, this.facet.label), this.renderCheckboxes()) :
      h("calcite-radio-button-group", { "data-test": "options-container", layout: "vertical", name: "facet-group" }, this.renderRadioButtons()), this.renderMoreOrLessButton(), h("div", { "aria-live": "polite", role: "status" }, this.renderNoMatchesNotice())));
  }
  static get is() { return "arcgis-hub-facet-options"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-facet-options.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-facet-options.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "facet": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IListFacet",
          "resolved": "IListFacet",
          "references": {
            "IListFacet": {
              "location": "import",
              "path": "../../utils/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Facet object passed in from the parent component"
        }
      }
    };
  }
  static get states() {
    return {
      "showLimitedOptions": {},
      "query": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubFacetOptionsChange",
        "name": "arcgisHubFacetOptionsChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event that's fired when a facet option's changed"
        },
        "complexType": {
          "original": "FacetOptionChangePayload",
          "resolved": "{ key: string; optionKey: string; checked: boolean; optionIndex?: number; }",
          "references": {
            "FacetOptionChangePayload": {
              "location": "import",
              "path": "../../utils/state-utils"
            }
          }
        }
      }, {
        "method": "arcgisHubFacetMoreLessClicked",
        "name": "arcgisHubFacetMoreLessClicked",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event that's fired when the more/less button is clicked"
        },
        "complexType": {
          "original": "{facet: IListFacet, isMore: boolean }",
          "resolved": "{ facet: IListFacet; isMore: boolean; }",
          "references": {
            "IListFacet": {
              "location": "import",
              "path": "../../utils/types"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
}
__decorate([
  Debounce({ timeout: 750 })
], ArcgisHubFacetOptions.prototype, "updateQuery", null);
