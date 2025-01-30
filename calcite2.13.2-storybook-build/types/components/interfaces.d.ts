export declare enum ALIGNMENTS {
  start = "start",
  center = "center",
  end = "end"
}
export declare enum CORNERS {
  square = "square",
  round = "round"
}
export declare enum DROP_SHADOWS {
  none = "none",
  low = "low",
  medium = "medium",
  heavy = "heavy"
}
export declare enum LAYOUTS {
  simple = "simple",
  informational = "informational"
}
export declare enum SCALE {
  small = "s",
  medium = "m",
  large = "l"
}
export declare enum UNIT_POSITIONS {
  before = "before",
  after = "after",
  below = "below"
}
export declare enum VISUAL_INTEREST {
  none = "none",
  icon = "icon"
}
export declare enum ICONS {
  caretUp = "caret-up",
  caretDown = "caret-down",
  caretDouble = "caret-double-horizontal"
}
export declare enum SHARING {
  always = "always",
  hover = "hover"
}
export declare enum SOURCE {
  dynamic = "dynamic",
  static = "static",
  itemQuery = "itemQuery"
}
export declare type SelectionMode = "multiple" | "none" | "single";
export interface IShareableCard {
  getState?(): any;
  shareable: boolean;
  shareableByValue: boolean;
  shareableByReference: boolean;
  shareableOnHover: boolean;
  element: HTMLElement;
}
export declare enum IMAGE_TYPES {
  thumbnail = "thumbnail",
  icon = "icon"
}
