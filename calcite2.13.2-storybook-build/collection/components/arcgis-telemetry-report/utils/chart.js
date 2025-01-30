import { BarChartModel, LineChartModel } from '@arcgis/charts-model';
import { convertInlineDataToLayerDefinition } from '@arcgis/charts-shared-utils';
import { getCedarFormattedConfig } from '../../../utils/charts/cedar';
// create a layer definition from telemetry data
// and set up the model
const setupTelemetryChartModel = async (model, dataItems) => {
  // create a feature layer
  // NOTE: we handle no data higher up in the call stack
  const [categoryField, numericField] = Object.keys(dataItems[0]);
  const categoryType = "date";
  const numericFields = [numericField];
  const inlineData = { dataItems };
  const iLayer = convertInlineDataToLayerDefinition({ categoryField, categoryType, numericFields, inlineData });
  // set up the model
  await model.setup({ iLayer });
  // set fields
  await (model.setCategory
    ? model.setCategory(categoryField)
    : model.setXAxisField(categoryField));
  await model.setNumericFields(numericFields);
  // the telemetry API already bins the data
  // so we do not want the chart to aggregate it again
  await model.setAggregationType('no_aggregation');
};
const formatTelemetryChartModel = (model, timeLabel, dataLabel, timeIntervalUnits = 'esriTimeUnitsDays') => {
  // NOTE: we render the title in the parent component
  // so we don't want the show the chart component's default title
  model.setChartTitleVisibility(false);
  // time interval
  model.setTimeIntervalUnits(timeIntervalUnits);
  model.setTimeIntervalSize(1);
  // configure axes titles and formatting
  model.setXAxisTitleText(timeLabel);
  model.setYAxisTitleText(dataLabel);
  // NOTE: this controls the label in the tooltip
  model.setSeriesName(dataLabel, 0);
  const numericField = model.getNumericFields()[0];
  const maximumFractionDigits = numericField === 'session-activity:average'
    ? 1
    : 0;
  model.setYAxisValueFormat({
    type: "number",
    intlOptions: {
      style: "decimal",
      notation: "compact",
      minimumFractionDigits: 0,
      maximumFractionDigits
    }
  });
};
export const getTelemetryChartConfig = async (data, category, type, timeLabel, dataLabel) => {
  // set up the model from the data
  const model = type === 'bar'
    ? new BarChartModel()
    : new LineChartModel();
  await setupTelemetryChartModel(model, data);
  // apply telemetry-specific formatting to the model
  const timeIntervalUnits = category === 'hour' ? 'esriTimeUnitsHours' : 'esriTimeUnitsDays';
  formatTelemetryChartModel(model, timeLabel, dataLabel, timeIntervalUnits);
  // apply cedar formatting and get the config
  const isSparkline = type === 'sparkline';
  const config = getCedarFormattedConfig(model, { isSparkline });
  // telemetry-specific formatting that can only be set on config
  if (category === 'hour') {
    // when category is hour, we format the date as time only
    const series = config.series[0];
    series.dataTooltipDateFormat = {
      type: 'date',
      intlOptions: {
        hour: "numeric",
        minute: "numeric"
      }
    };
  }
  return config;
};
