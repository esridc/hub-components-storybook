export class ArcgisHubDiscussionsPostGeographySpecPage {
  constructor(page) {
    this.page = page;
  }
  get list() {
    return this.page.root.shadowRoot.querySelector('calcite-list');
  }
  get listItems() {
    return this.list.querySelectorAll('calcite-list-item');
  }
  get listItem() {
    return this.listItems[0];
  }
  get actions() {
    return this.listItem.querySelectorAll('calcite-action');
  }
  get updateAction() {
    return this.listItem.querySelector(".discussions-post-geography-edit");
  }
  get deleteAction() {
    return this.listItem.querySelector(".discussions-post-geography-delete");
  }
}
