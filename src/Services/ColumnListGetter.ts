import { Injectable } from '@angular/core';
import { GridData, Column, ColumnDefinition } from '../Model/Model';

@Injectable()
export class ColumnListGetter {
    get(columnDefinitionList: ColumnDefinition[]): Column[] {
        var lastIndex = -1;
        return columnDefinitionList.filter(c => !c.hide).map(columnDefinition => {
            var gridColumn = columnDefinition.getColumn(lastIndex + 1);

            gridColumn.name = columnDefinition.name;

            lastIndex = gridColumn.endIndex;
            gridColumn.width = gridColumn.width || gridColumn.defaultWidth;

            return gridColumn;
        });
    }
}