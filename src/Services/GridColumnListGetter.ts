import { Injectable } from '@angular/core';
import { GridData, GridColumn, Column } from '../Model/Model';
import { ColumnListManager } from '../Services/Managers/Managers';

@Injectable()
export class GridColumnListGetter {
    constructor(private columnListManager: ColumnListManager) {

    }
    get(columnList: Column[]): GridColumn[] {
        var lastIndex = -1;
        var result: GridColumn[] = [];
        columnList.forEach(column => {
            var columnIndex = column.startIndex;
            while (columnIndex <= column.endIndex) {
                result.push({
                    gridSectionName: column.gridSectionName,
                    index: columnIndex,
                    name: column.name,
                    style: column.style,
                    width: column.width,
                    filterExpression: '',
                });
                columnIndex++;
            }
        });
        return result;
    }
}