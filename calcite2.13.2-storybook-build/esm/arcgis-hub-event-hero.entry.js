import { r as registerInstance, h, H as Host, a as getElement } from './index-57f71b44.js';

const arcgisHubEventHeroCss = ".sc-arcgis-hub-event-hero-h{display:block}";

const ArcgisHubEventHero = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.entity = undefined;
  }
  render() {
    return (h(Host, { "data-element": "event-hero" }, h("arcgis-hub-entity-hero", { entity: this.entity }, h("div", { slot: "footer-start" }, h("arcgis-hub-event-actions", { entity: this.entity })))));
  }
  get element() { return getElement(this); }
};
ArcgisHubEventHero.style = arcgisHubEventHeroCss;

export { ArcgisHubEventHero as arcgis_hub_event_hero };
