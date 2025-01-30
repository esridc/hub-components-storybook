export class ArcgisHubRichTextE2EPage {
  constructor(page) {
    this.tagName = 'arcgis-hub-rich-text';
    this.page = page;
  }
  get root() {
    return this.page.find('arcgis-hub-rich-text');
  }
  get toolbarItems() {
    return this.page.findAll('.ck-toolbar__items > *');
  }
  get content() {
    return this.page.find('.ck-content');
  }
  get textarea() {
    return this.page.find('textarea');
  }
  get label() {
    return this.page.find('label');
  }
}
