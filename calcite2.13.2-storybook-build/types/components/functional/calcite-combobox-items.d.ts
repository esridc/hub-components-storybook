import { CalciteComboboxItemCustomEvent } from "@esri/calcite-components";
import { IUiSchemaComboboxItem } from "@esri/hub-common";
import { TranslationFunc } from "../arcgis-configuration-editor/resources";
import { ComboboxSelectionMode } from "../arcgis-configuration-editor/components/arcgis-configuration-editor-field/fields/combobox/types";
export declare const CalciteComboboxItems: ({ items, values, selectionMode, translationFunc, onCalciteComboboxItemChange, }: {
  items: IUiSchemaComboboxItem[];
  values: string[];
  selectionMode: ComboboxSelectionMode;
  translationFunc: TranslationFunc;
  onCalciteComboboxItemChange: (evt: CalciteComboboxItemCustomEvent<void>) => void;
}) => any[];
