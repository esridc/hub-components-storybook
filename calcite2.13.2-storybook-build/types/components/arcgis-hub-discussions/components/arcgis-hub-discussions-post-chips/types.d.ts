import { Appearance, Kind } from '@esri/calcite-components/dist/types/components/interfaces';
/**
 * An interface for a combined calcite-chip and
 * caclite-tooltip
 */
export interface IHubDiscussionsChip {
  appearance: Extract<"outline" | "outline-fill" | "solid", Appearance>;
  icon?: string;
  kind: Extract<"brand" | "inverse" | "neutral", Kind>;
  type: string;
  tooltip?: {
    text: string;
    telemetry: any;
  };
  value: string;
}
