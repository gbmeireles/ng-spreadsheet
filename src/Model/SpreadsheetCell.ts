import { Type } from '@angular/core';
import { ContentTypeEnum } from '../Model/ContentTypeEnum';

export interface SpreadsheetCell {
    cellStyle?: string;
    cellType?: ContentTypeEnum;
    colspan: number;
    columnIndex: number;
    rowspan: number;
    data: any;
    formatData?: (data: any) => string;
    viewableComponentType?: Type;
    editableComponentType?: Type;
    rowIndex?: number;
    sectionRowIndex?: number;
    isEditing?: boolean;
    customOptions?: any;
}