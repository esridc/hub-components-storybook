export class ArcgisHubWorkspaceDirtyStateModalSpecPage {
  constructor(page) {
    this.page = page;
  }
  get calciteModal() {
    const el = this.page.root.shadowRoot.querySelector('calcite-modal');
    return {
      el,
      open: el.getAttribute('open'),
      kind: el.getAttribute('kind')
    };
  }
  get cancelButton() {
    const buttons = this.calciteModal.el.querySelectorAll('calcite-button');
    return buttons[0];
  }
  ;
  get confirmButton() {
    const el = this.calciteModal.el.querySelector('arcgis-hub-workspace-link');
    return { el, href: el.getAttribute('href') };
  }
  ;
}
