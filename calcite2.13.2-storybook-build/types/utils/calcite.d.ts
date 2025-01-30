import { Kind } from '@esri/calcite-components/dist/types/components/interfaces';
export declare type ButtonColor = "blue" | "inverse" | "neutral" | "red";
export declare const buttonColorToKind: (color: ButtonColor) => Extract<Kind, 'brand' | 'danger' | 'inverse' | 'neutral'>;
