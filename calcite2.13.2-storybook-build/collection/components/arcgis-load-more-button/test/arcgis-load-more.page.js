export class ArcgisLoadMoreButtonSpecPage {
  constructor(page) {
    this.page = page;
  }
  get button() {
    return this.page.root.shadowRoot.querySelector('calcite-button');
  }
}
