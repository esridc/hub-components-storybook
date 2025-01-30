import { Components } from "../../components";
import { ALIGNMENTS } from "../interfaces";
export interface ITableRow {
  [key: string]: any;
}
export interface ITableColumn {
  key: string;
  header: string;
  headerCellAlignment?: ALIGNMENTS;
  description?: string;
  contentCellAlignment?: ALIGNMENTS;
  cellWidth?: string;
  multilineCellEllipsis?: Components.ArcgisMultilineEllipsis;
}
