import { SpreadsheetRow } from '../model/spreadsheet-row';
import { Column } from '../model/column';

export interface SpreadsheetSection {
    name: string;
    columnList: Column[];
    titleRowList: SpreadsheetRow[];
    dataRowList: SpreadsheetRow[];
    dataRowMap: { [sectionRowIndex: number]: SpreadsheetRow };
    visibleDataRowList?: SpreadsheetRow[];
    width?: number;
    defaultWidth?: number;
    dataRowListLength: number;
}