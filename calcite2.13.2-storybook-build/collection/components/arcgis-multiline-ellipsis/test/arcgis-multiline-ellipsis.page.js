export class ArcgisMultilineEllipsisE2EPage {
  constructor(page) {
    this.tagName = 'arcgis-multiline-ellipsis';
    this.page = page;
  }
  get root() {
    return this.page.find(this.tagName);
  }
  get div() {
    return this.page.find(`${this.tagName} >>> div`);
  }
  get link() {
    return this.page.find(`${this.tagName} >>> calcite-link`);
  }
  get tooltip() {
    return this.page.find(`${this.tagName} >>> calcite-tooltip`);
  }
}
