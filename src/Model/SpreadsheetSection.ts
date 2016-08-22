import { SpreadsheetRow } from '../Model/SpreadsheetRow';
import { Column } from '../Model/Column';

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