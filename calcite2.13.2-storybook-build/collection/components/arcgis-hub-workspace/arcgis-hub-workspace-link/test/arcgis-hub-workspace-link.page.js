export class ArcgisHubWorkspaceLinkSpecPage {
  constructor(page) {
    this.page = page;
  }
  get calciteLink() {
    const el = this.page.root.shadowRoot.querySelector('calcite-link');
    return {
      el,
      href: el.getAttribute('href'),
      iconEnd: el.getAttribute('iconEnd'),
      iconStart: el.getAttribute('iconStart'),
      target: el.getAttribute('target')
    };
  }
}
