import { GridData } from '../Model/GridData';
import { GridCell } from '../Model/GridCell';

export interface ColumnDefinition {
    name: string;
    description?: string;
    hide?: boolean;
    gridSection?: string;

    getTitleCellMatrix(gridData: GridData, gridColumn: Column): GridCell[][];
    getDataCellMatrix(gridData: GridData, rowData: any, gridColumn: Column): GridCell[][];
    getColumn(rowDataList: any[], columnStartIndex: number): Column;
}