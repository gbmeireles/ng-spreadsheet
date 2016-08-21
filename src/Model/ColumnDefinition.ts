import { GridCell } from './GridCell';
import { Column } from './Column';
import { ColumnDataTypeEnum } from './ColumnDataTypeEnum';

export interface ColumnDefinition {
    name: string;
    description?: string;
    isHidden?: boolean;
    gridSection?: string;
    dataType: ColumnDataTypeEnum;
    filterExpressionMap?: { [columnIndex: number]: string };
    isExportable?: boolean;

    getTitleCellMatrix(column: Column): GridCell[][];
    getDataCellMatrix(rowData: any, column: Column): GridCell[][];
    getColumn(columnStartIndex: number): Column;
}