import { GridCell } from '../Model/GridCell';
import { ContentTypeEnum } from '../Model/ContentTypeEnum';

export interface GridRow {
    cellList: GridCell[];
    cellMap?: { [columnIndex: number]: GridCell };
    height: number;
    rowData: any;
    rowIndex: number;
    rowStyle?: string;
    rowType: ContentTypeEnum;
    sectionRowIndex: number;
    visibleCellList?: GridCell[];
}