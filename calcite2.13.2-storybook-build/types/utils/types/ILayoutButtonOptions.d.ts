/**
 * Gallery Layout Options
*/
export declare type LayoutOptions = 'grid' | 'grid-filled' | 'list' | 'map' | 'compact' | 'table' | 'calendar';
export interface ILayoutButtonOptions {
  icon: string;
  layout: LayoutOptions;
  tooltip: string;
}
