'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');

const arcgisHubEventHeroCss = ".sc-arcgis-hub-event-hero-h{display:block}";

const ArcgisHubEventHero = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.entity = undefined;
  }
  render() {
    return (index.h(index.Host, { "data-element": "event-hero" }, index.h("arcgis-hub-entity-hero", { entity: this.entity }, index.h("div", { slot: "footer-start" }, index.h("arcgis-hub-event-actions", { entity: this.entity })))));
  }
  get element() { return index.getElement(this); }
};
ArcgisHubEventHero.style = arcgisHubEventHeroCss;

exports.arcgis_hub_event_hero = ArcgisHubEventHero;
