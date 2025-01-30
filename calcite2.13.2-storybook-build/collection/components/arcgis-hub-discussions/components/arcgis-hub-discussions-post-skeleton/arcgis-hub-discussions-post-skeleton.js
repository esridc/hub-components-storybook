import { Host, h } from '@stencil/core';
/** @internal */
export class ArcgisHubDiscussionsPostSkeleton {
  render() {
    return (h(Host, null, h("arcgis-skeleton-loader", { active: true, rows: 0, showFooter: false, showHeading: false, showThumbnail: false }, h("div", null), h("div", null, h("div", null)), h("div", null, h("div", null), h("div", null)), h("div", null))));
  }
  static get is() { return "arcgis-hub-discussions-post-skeleton"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-discussions-post-skeleton.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-discussions-post-skeleton.css"]
    };
  }
}
