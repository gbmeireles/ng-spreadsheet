import { GridData } from './GridData';
import { GridCell } from './GridCell';
import { Column } from './Column';
import { ColumnDataTypeEnum } from './ColumnDataTypeEnum';

export interface ColumnDefinition {
    name: string;
    description?: string;
    hide?: boolean;
    gridSection?: string;
    dataType?: ColumnDataTypeEnum;

    getTitleCellMatrix(gridData: GridData, gridColumn: Column): GridCell[][];
    getDataCellMatrix(gridData: GridData, rowData: any, gridColumn: Column): GridCell[][];
    getColumn(columnStartIndex: number): Column;
}