import { Injectable } from '@angular/core';
import { SpreadsheetColumn, Column } from '../model';

@Injectable()
export class SpreadsheetColumnListGetter {

  get(columnList: Column[], filterExpressionMap: { [spreadsheetColumnIndex: number]: string }): SpreadsheetColumn[] {
    var lastIndex = -1;
    var result: SpreadsheetColumn[] = [];
    columnList.forEach(column => {
      var columnIndex = column.startIndex;
      while (columnIndex <= column.endIndex) {
        result.push({
          sectionName: column.sectionName,
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