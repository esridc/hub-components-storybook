import { h, Host } from '@stencil/core';
import intlManager from '../../../../utils/intl-manager';
/** @internal */
export class ArcgisHubDiscussionsPrivateNotice {
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.el);
  }
  render() {
    const { intl } = this;
    return (h(Host, null, h("calcite-notice", { open: true, scale: "m" }, h("div", { slot: "title" }, intl.t('title')), h("div", { slot: "message" }, intl.t('message')), h("calcite-link", { href: "https://doc.arcgis.com/en/hub/team/how-discussions-work.htm", iconEnd: "launch", slot: "link", title: intl.t('link.title') }, intl.t('link.text')))));
  }
  static get is() { return "arcgis-hub-discussions-private-notice"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-discussions-private-notice.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-discussions-private-notice.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get elementRef() { return "el"; }
}
