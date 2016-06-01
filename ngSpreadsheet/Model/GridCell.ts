import { Type } from '@angular/core';
import { ContentTypeEnum } from '../Model/ContentTypeEnum';

export interface GridCell {
    cellStyle?: string;
    cellType?: ContentTypeEnum;
    colspan: number;
    columnIndex: number;
    rowspan: number;
    data: any;
    dataPathOnRowData?: string;
    formattedData?: string;
    viewableComponentType?: Type;
    editableComponentType?: Type;
    rowIndex?: number;
    sectionRowIndex?: number;
    isEditing?: boolean;
}