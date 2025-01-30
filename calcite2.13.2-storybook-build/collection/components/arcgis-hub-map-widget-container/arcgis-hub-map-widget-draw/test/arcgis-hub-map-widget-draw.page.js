export class ArcgisHubMapWidgetDrawSpecPage {
  constructor(page) {
    this.page = page;
  }
  get selectWidget() {
    return this.page.root.querySelector('arcgis-hub-map-widget-generic[icon="select"]');
  }
  get pointWidget() {
    return this.page.root.querySelector('arcgis-hub-map-widget-generic[icon="pin"]');
  }
  get polylineWidget() {
    return this.page.root.querySelector('arcgis-hub-map-widget-generic[icon="freehand"]');
  }
  get polygonWidget() {
    return this.page.root.querySelector('arcgis-hub-map-widget-generic[icon="freehand-area"]');
  }
  get circleWidget() {
    return this.page.root.querySelector('arcgis-hub-map-widget-generic[icon="circle"]');
  }
  get rectangleWidget() {
    return this.page.root.querySelector('arcgis-hub-map-widget-generic[icon="rectangle"]');
  }
  get bufferPanel() {
    return this.page.root.querySelector('arcgis-hub-map-widget-draw-buffer');
  }
  get options() {
    return this.page.root.querySelector('calcite-action[icon="pencil-mark-plus"]');
  }
  get popover() {
    return this.page.root.querySelector('calcite-popover');
  }
}
