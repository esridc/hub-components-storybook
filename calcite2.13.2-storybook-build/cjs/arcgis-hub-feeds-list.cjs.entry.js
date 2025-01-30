'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const context = require('./context-0167a31e.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');

const arcgisHubFeedsListCss = ":host{display:block}.list-description{margin-bottom:1.5rem}.feed-container{margin-bottom:0.75rem;display:grid;align-items:flex-end;grid-template-columns:1fr min-content}.feed-container calcite-button{margin-left:0.75rem;margin-bottom:0.75rem;height:2rem}";

const ArcgisHubFeedsList = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.feeds = undefined;
    context.bind(this, 'generateViewButtonHandler');
  }
  onCopyButtonClicked(event) {
    const url = event.detail;
    const feedClicked = this.feeds.find((feed) => feed.url === url);
    this.hubTelemetry.emit({
      category: 'Interaction',
      action: 'Copy',
      label: 'Content',
      details: feedClicked.telemetryName
    });
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  generateViewButtonHandler(feed) {
    // Bind arguments to hubTelemetry.emit()
    return () => {
      this.hubTelemetry.emit({
        category: 'Navigation',
        action: 'View',
        label: 'Content',
        details: feed.telemetryName
      });
    };
  }
  render() {
    return (index.h(index.Host, null, index.h("p", { class: "list-description" }, index.h("slot", null)), this.feeds.map(feed => (index.h("div", { class: "feed-container" }, index.h("arcgis-copyable-input", { label: feed.label, readonly: true, value: feed.copyUrl || feed.url }), index.h("calcite-button", { appearance: "outline", href: feed.url, iconEnd: "launch", label: this.intl.t('viewButtonLabel'), onClick: this.generateViewButtonHandler(feed), target: "_blank" }, this.intl.t('viewButtonText')))))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubFeedsList.style = arcgisHubFeedsListCss;

exports.arcgis_hub_feeds_list = ArcgisHubFeedsList;
