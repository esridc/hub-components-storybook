/**
 * Systems of measurement
 */
export declare enum MeasurementSystem {
  Imperial = "imperial",
  Metric = "metric"
}
/**
 * Imperial Units of Measurement
 */
export declare enum ImperialUnit {
  Feet = "feet",
  Miles = "miles",
  NauticalMiles = "nautical miles"
}
/**
 * Metric Units of Measurement
 */
export declare enum MetricUnit {
  Meters = "meters",
  Kilometers = "kilometers"
}
/**
 * Measurement Unit
 */
export declare type MeasurementUnit = ImperialUnit | MetricUnit;
/**
 * Buffer details distance and unit of measurement
 */
export interface BufferDetails {
  distance: number;
  unit: MeasurementUnit;
}
