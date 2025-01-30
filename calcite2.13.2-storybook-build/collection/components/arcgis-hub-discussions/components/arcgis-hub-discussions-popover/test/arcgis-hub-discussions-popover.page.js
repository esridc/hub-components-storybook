export class ArcgisHubDiscussionsPopoverSpecPage {
  constructor(page) {
    this.page = page;
  }
  get popover() {
    return this.page.root.shadowRoot.querySelector('calcite-popover');
  }
  get body() {
    return this.popover.querySelector('.popover-body');
  }
  get footer() {
    return this.popover.querySelector('footer');
  }
  get address() {
    return this.body.querySelector('address');
  }
  get avatar() {
    return this.address.querySelector('calcite-avatar');
  }
  get fullName() {
    return this.address.querySelector('b');
  }
  get username() {
    return this.address.querySelector('span');
  }
  get creatorMetadata() {
    return this.body.querySelectorAll('div');
  }
  get button() {
    return this.body.querySelector('calcite-button');
  }
  get organization() {
    return this.creatorMetadata[0];
  }
  get region() {
    return this.creatorMetadata[1];
  }
  get postMetadata() {
    return this.footer.querySelectorAll('div');
  }
  get link() {
    return this.footer.querySelector('calcite-link');
  }
  get postedTo() {
    return this.postMetadata[0];
  }
  get visibility() {
    return this.postMetadata[1];
  }
  get timestamp() {
    return this.postMetadata[2];
  }
}
;
