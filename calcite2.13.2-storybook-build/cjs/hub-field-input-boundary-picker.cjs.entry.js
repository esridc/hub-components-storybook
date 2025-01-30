'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');
const getLabel = require('./getLabel-c21bfe7f.js');
require('./get-prop-4bd8fc1a.js');

const BoundaryPicker = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = index.createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.params = undefined;
    this.sources = undefined;
    context.bind(this, 'handleArcgisHubInputBoundaryPickerChange');
  }
  componentWillLoad() {
    // we want to generate the sources once on load, otherwise when the sources
    // update the arcgis-boundary-picker-ui resets the selected geometry to
    // the initial selection
    this.sources = this.getSources();
  }
  /**
   * generate the boundary picker sources from the uiSchema options.
   * This function handles source label translations if a labelKey is
   * provided
   */
  getSources() {
    var _a, _b;
    const defaultSources = [{ value: 'none', selected: true }];
    const uiSchemaSources = ((_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.sources) || [];
    return uiSchemaSources
      ? uiSchemaSources.map(source => {
        const label = getLabel.getLabel(source, this.params.t);
        delete source.labelKey;
        return Object.assign(source, Object.assign({}, (label && { label })));
      })
      : defaultSources;
  }
  handleArcgisHubInputBoundaryPickerChange(evt) {
    var _a;
    if (evt.detail.graphic) {
      const { xmin, ymin, xmax, ymax, spatialReference } = (_a = evt.detail.graphic) === null || _a === void 0 ? void 0 : _a.geometry;
      this.arcgisConfigurationEditorFieldInputChange.emit({
        xmin, ymin, xmax, ymax,
        spatialReference: { wkid: spatialReference.wkid }
      });
    }
    else {
      // This is needed because unless we overwrite all the
      // values, the config editor won't pick up changes.
      // IE just passing undefined will output from the config-editor
      // the original values.
      this.arcgisConfigurationEditorFieldInputChange.emit({
        xmin: null, ymin: null, xmax: null, ymax: null,
        spatialReference: { wkid: null }
      });
    }
  }
  render() {
    var _a, _b;
    return (index.h("arcgis-boundary-picker-ui", { extent: this.params.value, onArcgisBoundaryPickerUpdate: this.handleArcgisHubInputBoundaryPickerChange, resetDrawingToolsOnDisconnect: !!((_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.resetDrawingToolsOnDisconnect), sources: this.sources }));
  }
};

exports.hub_field_input_boundary_picker = BoundaryPicker;
