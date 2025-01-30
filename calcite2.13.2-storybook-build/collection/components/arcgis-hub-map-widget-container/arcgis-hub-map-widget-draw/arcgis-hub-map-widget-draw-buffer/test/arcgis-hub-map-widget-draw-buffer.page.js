export class ArcgisHubMapWidgetDrawBufferSpecPage {
  constructor(page) {
    this.page = page;
  }
  get panel() {
    return this.page.root.shadowRoot.querySelector('calcite-panel');
  }
  get distanceInput() {
    return this.panel.querySelector('calcite-input');
  }
  get distanceInputMessage() {
    return this.panel.querySelector('calcite-input-message');
  }
}
