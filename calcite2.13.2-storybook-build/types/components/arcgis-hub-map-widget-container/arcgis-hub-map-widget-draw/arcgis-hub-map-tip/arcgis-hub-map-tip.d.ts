import { Kind } from '@esri/calcite-components/dist/types/components/interfaces';
export declare class ArcgisHubMapTip {
  /**
   * Tip text
   */
  text: string;
  /**
   * (optional) Specifies the kind of the component (will apply to bg-color)
   */
  kind?: Kind;
  /**
   * (optional) Leading icon
   */
  icon?: string;
  render(): any;
}
