import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { b as bind } from './context-7d8f7366.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';

const arcgisHubFeedsListCss = ":host{display:block}.list-description{margin-bottom:1.5rem}.feed-container{margin-bottom:0.75rem;display:grid;align-items:flex-end;grid-template-columns:1fr min-content}.feed-container calcite-button{margin-left:0.75rem;margin-bottom:0.75rem;height:2rem}";

const ArcgisHubFeedsList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.feeds = undefined;
    bind(this, 'generateViewButtonHandler');
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
    this.intl = await intlManager.loadIntlForComponent(this.element);
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
    return (h(Host, null, h("p", { class: "list-description" }, h("slot", null)), this.feeds.map(feed => (h("div", { class: "feed-container" }, h("arcgis-copyable-input", { label: feed.label, readonly: true, value: feed.copyUrl || feed.url }), h("calcite-button", { appearance: "outline", href: feed.url, iconEnd: "launch", label: this.intl.t('viewButtonLabel'), onClick: this.generateViewButtonHandler(feed), target: "_blank" }, this.intl.t('viewButtonText')))))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubFeedsList.style = arcgisHubFeedsListCss;

export { ArcgisHubFeedsList as arcgis_hub_feeds_list };
