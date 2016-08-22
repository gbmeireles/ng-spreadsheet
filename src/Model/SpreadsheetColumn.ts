import { ColumnDataTypeEnum } from './ColumnDataTypeEnum';

export interface SpreadsheetColumn {
    name: string;
    index: number;
    style?: string;
    width: number;
    sectionName: string;
    filterExpression: string;
    dataType: ColumnDataTypeEnum;
}