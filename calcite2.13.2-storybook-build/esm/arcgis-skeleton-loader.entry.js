import { r as registerInstance, h, H as Host } from './index-57f71b44.js';

const arcgisSkeletonLoaderCss = ":host{display:none}:host([active]){display:block}@keyframes shimmer{0%{background-size:200% 100%;background-position:100% 0}100%{background-size:200% 100%;background-position:-100% 0}}.thumbnail,.heading,.row,.footer>div{animation:shimmer 2s cubic-bezier(0.4, 0, 0.2, 0.8) infinite;background-image:linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, 0) 100%);background-color:var(--calcite-color-foreground-3);border-radius:4px}.thumbnail{margin-bottom:1rem;aspect-ratio:200 / 133}.heading{margin-bottom:1rem;height:1.5rem}.row{margin-bottom:0.5rem;height:1rem}.footer{margin-top:2rem;display:flex;justify-content:space-between}.footer>*{height:1.5rem;width:33.333333%}";

const ArcgisSkeletonLoader = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
};
ArcgisSkeletonLoader.style = arcgisSkeletonLoaderCss;

export { ArcgisSkeletonLoader as arcgis_skeleton_loader };
