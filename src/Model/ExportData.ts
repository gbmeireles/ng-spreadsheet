import { SpreadsheetRow } from './SpreadsheetRow';
import { Column } from './Column';
export interface ExportData {
    rowList: SpreadsheetRow[];
    columnList: Column[];
}