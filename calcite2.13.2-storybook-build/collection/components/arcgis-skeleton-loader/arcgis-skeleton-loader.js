import { Host, h } from '@stencil/core';
/**
 * @slot default - A slot for adding additional content. It is the responsibility of the consumer to style this content, likely with \@apply hub-loading;
 */
export class ArcgisSkeletonLoader {
  constructor() {
    this.active = false;
    this.showThumbnail = false;
    this.showHeading = true;
    this.headingRows = 1;
    this.rows = 3;
    this.showFooter = false;
  }
  renderRows(rows, className) {
    return [...Array(rows).keys()].map(key => {
      return h("div", { class: className, key: key });
    });
  }
  render() {
    if (this.active) {
      return h(Host, { role: "progressbar" }, this.showThumbnail && h("div", { class: "thumbnail" }), this.showHeading && this.renderRows(this.headingRows, 'heading'), this.renderRows(this.rows, 'row'), h("slot", null), this.showFooter && h("div", { class: "footer" }, h("div", null), h("div", null)));
    }
  }
  static get is() { return "arcgis-skeleton-loader"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-skeleton-loader.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-skeleton-loader.css"]
    };
  }
  static get properties() {
    return {
      "active": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "memberof",
              "text": "ArcgisSkeletonLoader"
            }],
          "text": "Should the component be rendered"
        },
        "attribute": "active",
        "reflect": true,
        "defaultValue": "false"
      },
      "showThumbnail": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "memberof",
              "text": "ArcgisSkeletonLoader"
            }],
          "text": "Should the thumbnail placeholder be rendered"
        },
        "attribute": "show-thumbnail",
        "reflect": false,
        "defaultValue": "false"
      },
      "showHeading": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "memberof",
              "text": "ArcgisSkeletonLoader"
            }],
          "text": "Should the heading placeholder be rendered"
        },
        "attribute": "show-heading",
        "reflect": false,
        "defaultValue": "true"
      },
      "headingRows": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "memberof",
              "text": "ArcgisSkeletonLoader"
            }],
          "text": "How many heading rows to render"
        },
        "attribute": "heading-rows",
        "reflect": false,
        "defaultValue": "1"
      },
      "rows": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "memberof",
              "text": "ArcgisSkeletonLoader"
            }],
          "text": "The number of row placeholders to be rendered"
        },
        "attribute": "rows",
        "reflect": false,
        "defaultValue": "3"
      },
      "showFooter": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "memberof",
              "text": "ArcgisSkeletonLoader"
            }],
          "text": "Should the footer placeholder be rendered"
        },
        "attribute": "show-footer",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
}
