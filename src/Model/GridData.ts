import { Type, Injector } from '@angular/core';
import { ColumnDefinition } from '../Model/ColumnDefinition';
import { ContentTypeEnum } from '../Model/ContentTypeEnum';

export interface GridData {
    // columnDefinitionList: ColumnDefinition[];
    dataRowList: any[];
    originalDataRowList?: any[];
    providerList?: Type[];
    rowHeight?: number;
    getRowStyle: (dataRow, rowType: ContentTypeEnum, rowIndex: number) => string;
}