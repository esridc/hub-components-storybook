export class ArcgisHubDiscussionsMentionPopoverSpecPage {
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
    return this.body.querySelector('div:has(calcite-icon[icon="organization"])');
  }
  get region() {
    return this.body.querySelector('div:has(calcite-icon[icon="pin"])');
  }
  get postMetadata() {
    return this.footer.querySelectorAll('div');
  }
  get link() {
    return this.footer.querySelector('calcite-link');
  }
  get mentionedBy() {
    return this.postMetadata[0];
  }
}
;
