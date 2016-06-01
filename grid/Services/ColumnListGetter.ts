import { Injectable } from '@angular/core';
import { GridData } from '../Model/Model';

@Injectable()
export class ColumnListGetter {
    get(gridData: GridData): Column[] {
        var lastIndex = -1;
        return gridData.columnDefinitionList.filter(c => !c.hide).map(columnDefinition => {
            var gridColumn = columnDefinition.getColumn(gridData.dataRowList, lastIndex + 1);

            gridColumn.name = columnDefinition.name;

            lastIndex = gridColumn.endIndex;
            gridColumn.width = gridColumn.width || gridColumn.defaultWidth;

            return gridColumn;
        });
    }
}