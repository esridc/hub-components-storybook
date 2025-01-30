/**
 * Systems of measurement
 */
export var MeasurementSystem;
(function (MeasurementSystem) {
  MeasurementSystem["Imperial"] = "imperial";
  MeasurementSystem["Metric"] = "metric";
})(MeasurementSystem || (MeasurementSystem = {}));
/**
 * Imperial Units of Measurement
 */
export var ImperialUnit;
(function (ImperialUnit) {
  ImperialUnit["Feet"] = "feet";
  ImperialUnit["Miles"] = "miles";
  ImperialUnit["NauticalMiles"] = "nautical miles";
})(ImperialUnit || (ImperialUnit = {}));
/**
 * Metric Units of Measurement
 */
export var MetricUnit;
(function (MetricUnit) {
  MetricUnit["Meters"] = "meters";
  MetricUnit["Kilometers"] = "kilometers";
})(MetricUnit || (MetricUnit = {}));
