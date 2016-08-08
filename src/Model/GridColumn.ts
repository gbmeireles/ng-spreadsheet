import { ColumnDataTypeEnum } from './ColumnDataTypeEnum';

export interface GridColumn {
    name: string;
    index: number;
    style?: string;
    width: number;
    gridSectionName: string;
    filterExpression: string;
    dataType: ColumnDataTypeEnum;
}