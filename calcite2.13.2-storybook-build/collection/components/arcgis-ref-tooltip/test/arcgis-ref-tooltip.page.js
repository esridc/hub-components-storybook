export class ArcgisRefTooltipPage {
  constructor(page) {
    this.page = page;
  }
  get slottedContent() {
    return this.page.root.querySelector('calcite-chip');
  }
  get referenceElement() {
    return this.page.root.shadowRoot.querySelector('div');
  }
  get tooltip() {
    return this.page.root.shadowRoot.querySelector('calcite-tooltip');
  }
}
