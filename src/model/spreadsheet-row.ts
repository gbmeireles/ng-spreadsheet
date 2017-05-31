import { SpreadsheetCell } from '../model/spreadsheet-cell';
import { ContentTypeEnum } from '../model/content-type-enum';

export interface SpreadsheetRow {
    cellList: SpreadsheetCell[];
    cellMap?: { [columnIndex: number]: SpreadsheetCell };
    height: number;
    rowData: any;
    rowIndex: number;
    rowStyle?: string;
    rowType: ContentTypeEnum;
    sectionRowIndex: number;
    visibleCellList?: SpreadsheetCell[];
}