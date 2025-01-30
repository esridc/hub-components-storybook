import type { ITelemetryDataEntry } from '@esri/telemetry-reporting-client';
import { CedarChartConfig } from '../../../utils/charts/cedar';
export declare type TelemetryChartConfig = CedarChartConfig;
export declare const getTelemetryChartConfig: (data: ITelemetryDataEntry[], category: string, type: string, timeLabel: string, dataLabel: string) => Promise<TelemetryChartConfig>;
