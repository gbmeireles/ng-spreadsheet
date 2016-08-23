import { SpreadsheetCell } from './SpreadsheetCell';
import { Column } from './Column';
import { ColumnDefinition } from './ColumnDefinition';
import { ColumnDataTypeEnum } from './ColumnDataTypeEnum';

export interface ColumnDefinition {
    name: string;
    description?: string;
    isHidden?: boolean;
    spreadsheetSection?: string;
    dataType: ColumnDataTypeEnum;
    filterExpressionMap?: { [columnIndex: number]: string };
    isExportable?: boolean;

    getTitleCellMatrix(column: Column, columnList: Column[], columnDefinitionList: ColumnDefinition[]): SpreadsheetCell[][];
    getDataCellMatrix(rowData: any, column: Column, columnList: Column[], columnDefinitionList: ColumnDefinition[]): SpreadsheetCell[][];
    getColumn(columnStartIndex: number, columnDefinitionList: ColumnDefinition[]): Column;
}