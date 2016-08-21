import { Injectable } from '@angular/core';
import { GridColumn, Column } from '../Model/Model';

@Injectable()
export class SpreadsheetColumnListGetter {

    get(columnList: Column[], filterExpressionMap: { [gridColumnIndex: number]: string }): GridColumn[] {
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
                    filterExpression: (filterExpressionMap && filterExpressionMap[columnIndex]) || '',
                    dataType: column.dataType,
                });
                columnIndex++;
            }
        });
        return result;
    }
}