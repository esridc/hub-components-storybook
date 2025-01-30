import { IHelpStateProps } from "../arcgis-hub-help-state/arcgis-hub-help-state";
import { ITableColumn, ITableRow } from "./interfaces";
export declare const CalciteTableRows: ({ rows, columns, emptyHelpState, startItem, setFirstCellRefCallback }: {
  rows: ITableRow[];
  columns: ITableColumn[];
  emptyHelpState: IHelpStateProps;
  startItem?: number;
  setFirstCellRefCallback?: (ref: HTMLElement) => void;
}) => any[];
