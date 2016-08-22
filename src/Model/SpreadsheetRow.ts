import { SpreadsheetCell } from '../Model/SpreadsheetCell';
import { ContentTypeEnum } from '../Model/ContentTypeEnum';

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