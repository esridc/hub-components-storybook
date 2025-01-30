'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const util = require('./util-38e73510.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./get-prop-4bd8fc1a.js');

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
    index.registerInstance(this, hostRef);
    this.arcgisCountdownEditorChange = index.createEvent(this, "arcgisCountdownEditorChange", 7);
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
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  /**
   * json schema for the arcgis-countdown-editor
   * this gets parsed by the arcgis-configuration-editor
   * to determine what inputs to render
   */
  get schema() {
    const schema = util.cloneObject(SCHEMA);
    const getTitle = prop => this.intl.t(prop);
    // add a translated title to each prop
    Object.entries(schema.properties).forEach(([prop, propSchema]) => {
      propSchema.title = getTitle(prop);
    });
    return schema;
  }
  render() {
    return (index.h("arcgis-configuration-editor", { schema: this.schema, values: this.values }));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};

exports.arcgis_countdown_editor = ArcgisCountdownEditor;
