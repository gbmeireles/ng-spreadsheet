import { Injectable } from '@angular/core';
import { Column, ColumnDefinition } from '../model';
import { MIN_COLUMN_SIZE } from '../spreadsheet/spreadsheet-constants';

@Injectable()
export class ColumnListGetter {
  get(columnDefinitionList: ColumnDefinition[]): Column[] {
    var lastIndex = -1;
    return columnDefinitionList.filter(c => !c.isHidden).map(columnDefinition => {
      var spreadsheetColumn = columnDefinition.getColumn(lastIndex + 1, columnDefinitionList);

      spreadsheetColumn.name = columnDefinition.name;

      lastIndex = spreadsheetColumn.endIndex;
      spreadsheetColumn.width = Math.max(spreadsheetColumn.width || spreadsheetColumn.defaultWidth, MIN_COLUMN_SIZE);
      spreadsheetColumn.dataType = columnDefinition.dataType;
      spreadsheetColumn.sectionName = columnDefinition.spreadsheetSection;
      spreadsheetColumn.isExportable = columnDefinition.isExportable;

      return spreadsheetColumn;
    });
  }
}