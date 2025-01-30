;
// currently only used in this module and tests
export const CEDAR_COLORS = {
  black: [46, 46, 46, 255],
  blue: [0, 122, 194, 255],
  gray: [128, 128, 128, 200],
  red: [255, 0, 0, 200],
  white: [255, 255, 255, 255]
};
const applyBarChartFormatting = (model) => {
  model.setSeriesColor(CEDAR_COLORS.blue, 0);
};
const applyLineChartFormatting = (model) => {
  model.setSeriesLineColor(CEDAR_COLORS.blue, 0);
  model.setSeriesLineWidth(1, 0);
  model.setSeriesMarkerColor(CEDAR_COLORS.blue, 0);
  model.setSeriesMarkerSize(5, 0);
};
// apply cedar formatting to model and return the config, see:
// https://github.com/ArcGIS/opendata-ui/blob/3e51721aa365c9b7299a78973f4762c8062eed32/packages/hub-components/src/utils/cedar/index.ts
export const getCedarFormattedConfig = (model, options) => {
  const _options = options || {};
  const { isSparkline = false } = _options;
  const textSymbolBase = {
    type: "esriTS",
    color: CEDAR_COLORS.black,
  };
  const chartType = model.getChartType();
  // colors
  model.setColorMatch(false);
  if (chartType === 'barSeries') {
    applyBarChartFormatting(model);
  }
  else {
    applyLineChartFormatting(model);
  }
  // title
  model.setTitleSymbol(Object.assign(Object.assign({}, textSymbolBase), { font: {
      size: 20
    } }));
  // axes
  if (isSparkline) {
    model.setXAxisTitleVisibility(false);
    model.setYAxisTitleVisibility(false);
    // NOTE: axis line and label visibility are set below on the config
  }
  else {
    model.setAxisLabelsSymbol(Object.assign(Object.assign({}, textSymbolBase), { font: {
        size: 14
      } }));
    model.setAxisLinesSymbol({
      type: "esriSLS",
      color: CEDAR_COLORS.gray,
      width: 2
    });
  }
  // formatting that must be applied directly to the config instead of the model
  // NOTE: Nels says we can use model.setConfig() if we have to return the model instead
  const config = model.getConfig();
  config.cursorCrosshair = {
    type: "cursorCrosshair",
    style: {
      type: "esriSLS",
      style: "esriSLSDash",
      color: CEDAR_COLORS.red,
      width: 1,
    },
    horizontalLineVisible: true,
    verticalLineVisible: true,
  };
  if (isSparkline) {
    config.axes.forEach(axis => {
      axis.visible = false;
      axis.labels.visible = false;
    });
  }
  return config;
};
