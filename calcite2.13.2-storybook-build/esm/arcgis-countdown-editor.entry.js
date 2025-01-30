import { r as registerInstance, c as createEvent, h, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { a as cloneObject } from './util-3e6872d9.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './get-prop-ec5be510.js';

const SCHEMA = {
  required: ['countdownDate'],
  type: 'object',
  properties: {
    cardTitle: {
      type: 'string'
    },
    countdownDate: {
      type: 'string',
      format: 'date'
    }
  }
};

const ArcgisCountdownEditor = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisCountdownEditorChange = createEvent(this, "arcgisCountdownEditorChange", 7);
    this.values = {};
  }
  /**
   * emit an event with the updated countdown values
   * when a field in the arcgis-configuration-editor is
   * changed
   * @param event
   */
  handleEditorChangeEvent(event) {
    event.stopPropagation();
    this.arcgisCountdownEditorChange.emit(event.detail);
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * json schema for the arcgis-countdown-editor
   * this gets parsed by the arcgis-configuration-editor
   * to determine what inputs to render
   */
  get schema() {
    const schema = cloneObject(SCHEMA);
    const getTitle = prop => this.intl.t(prop);
    // add a translated title to each prop
    Object.entries(schema.properties).forEach(([prop, propSchema]) => {
      propSchema.title = getTitle(prop);
    });
    return schema;
  }
  render() {
    return (h("arcgis-configuration-editor", { schema: this.schema, values: this.values }));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};

export { ArcgisCountdownEditor as arcgis_countdown_editor };
