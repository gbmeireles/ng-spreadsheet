import { ColumnDataTypeEnum } from './column-data-type-enum';

export interface Column {
    startIndex: number;
    endIndex: number;
    style?: string;
    width?: number;
    sectionName: string;
    defaultWidth: number;
    name?: string;
    dataType?: ColumnDataTypeEnum;
    isExportable?: boolean;
}