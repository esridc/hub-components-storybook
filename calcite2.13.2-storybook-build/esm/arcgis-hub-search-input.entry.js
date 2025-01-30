import { r as registerInstance, c as createEvent, h, H as Host } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';

const arcgisHubSearchInputCss = ":host{margin-bottom:1.5rem;display:block}calcite-input{--calcite-color-foreground-1:var(--hub-gallery-input-background);--calcite-color-text-1:var(--hub-gallery-input-text)}";

const ArcgisHubSearchInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.inputChange = createEvent(this, "hubSearchInputChange", 7);
    this.value = undefined;
    this.placeholder = "Enter search term...";
    this.text = "Search";
    this.scale = undefined;
    bind(this, 'handleInput', 'handleInputChange');
  }
  /**
   * This event fires each time a new value is typed and committed
   * Which means it fires
   * - when the user presses enter
   * - when the user tabs out of the input
   * - when the clear button is clicked
   * - when the action button is clicked
   */
  handleInputChange() {
    this.inputChange.emit(this.value);
  }
  /**
   * Keep the internal value syncronized with the calcite-input
   *
   * @param ev
   */
  handleInput(ev) {
    this.value = ev.target.value;
  }
  render() {
    return (h(Host, null, h("calcite-input", { clearable: true, onCalciteInputChange: this.handleInputChange, onCalciteInputInput: this.handleInput, placeholder: this.placeholder, scale: this.scale, value: this.value }, h("calcite-button", { scale: this.scale, slot: "action" }, this.text))));
  }
};
ArcgisHubSearchInput.style = arcgisHubSearchInputCss;

export { ArcgisHubSearchInput as arcgis_hub_search_input };
