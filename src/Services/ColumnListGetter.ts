import { Injectable } from '@angular/core';
import { Column, ColumnDefinition } from '../Model/Model';

@Injectable()
export class ColumnListGetter {
    get(columnDefinitionList: ColumnDefinition[]): Column[] {
        var lastIndex = -1;
        return columnDefinitionList.filter(c => !c.isHidden).map(columnDefinition => {
            var spreadsheetColumn = columnDefinition.getColumn(lastIndex + 1);

            spreadsheetColumn.name = columnDefinition.name;

            lastIndex = spreadsheetColumn.endIndex;
            spreadsheetColumn.width = spreadsheetColumn.width || spreadsheetColumn.defaultWidth;
            spreadsheetColumn.dataType = columnDefinition.dataType;
            spreadsheetColumn.sectionName = columnDefinition.spreadsheetSection;
            spreadsheetColumn.isExportable = columnDefinition.isExportable;

            return spreadsheetColumn;
        });
    }
}