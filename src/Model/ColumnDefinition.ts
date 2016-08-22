import { SpreadsheetCell } from './SpreadsheetCell';
import { Column } from './Column';
import { ColumnDataTypeEnum } from './ColumnDataTypeEnum';

export interface ColumnDefinition {
    name: string;
    description?: string;
    isHidden?: boolean;
    spreadsheetSection?: string;
    dataType: ColumnDataTypeEnum;
    filterExpressionMap?: { [columnIndex: number]: string };
    isExportable?: boolean;

    getTitleCellMatrix(column: Column): SpreadsheetCell[][];
    getDataCellMatrix(rowData: any, column: Column): SpreadsheetCell[][];
    getColumn(columnStartIndex: number): Column;
}