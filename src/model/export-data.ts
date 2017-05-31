import { SpreadsheetRow } from './spreadsheet-row';
import { Column } from './column';
export interface ExportData {
  rowList: SpreadsheetRow[];
  columnList: Column[];
}