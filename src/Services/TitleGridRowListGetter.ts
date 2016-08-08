import { Injectable } from '@angular/core';
import { GridRowspanSetter } from '../Services/GridRowspanSetter';
import {
    GridRow,
    ColumnDefinition,
    ContentTypeEnum,
    Column,
    GridSection,
} from '../Model/Model';
import { SpreadsheetState } from '../Spreadsheet/SpreadsheetState';

@Injectable()
export class TitleGridRowListGetter {
    constructor(private gridRowRowspanSetter: GridRowspanSetter) {

    }

    get(spreadsheetState: SpreadsheetState, gridSection: GridSection): GridRow[] {
        var result: GridRow[] = [];
        var columnListMap: { [tableSection: string]: ColumnDefinition[] } = {};
        gridSection.columnList.forEach(column => {
            if (!columnListMap[column.gridSectionName]) {
                columnListMap[column.gridSectionName] = [];
            }
            var columnDefinition = spreadsheetState.columnDefinitionList.find(cd => cd.name === column.name);
            columnListMap[column.gridSectionName].push(columnDefinition);
        });

        gridSection.columnList.forEach(column => {
            var indexOfColumn = gridSection.columnList.indexOf(column);
            var columnDefinition = columnListMap[column.gridSectionName][indexOfColumn];

            var titleCellMatrix = columnDefinition.getTitleCellMatrix(column);
            for (var i = 0; i < titleCellMatrix.length; i++) {
                var row: GridRow = null;
                if (result.length >= i + 1) {
                    row = result[i];
                }
                if (row == null) {
                    row = {
                        cellList: [],
                        height: spreadsheetState.rowHeight,
                        rowData: null,
                        rowIndex: i,
                        rowStyle: '',
                        rowType: ContentTypeEnum.Title,
                        sectionRowIndex: i,
                    };
                    result.push(row);
                }
                row.cellList = row.cellList.concat(titleCellMatrix[i]);
            }
        });

        for (var i = 0; i < result.length; i++) {
            var row = result[i];
            row.rowIndex = i;
            row.sectionRowIndex = i;
            row.visibleCellList = row.cellList.slice(0, 20);
            var lastCell = row.cellList[row.cellList.length - 1];
            if (row.visibleCellList.indexOf(lastCell) < 0) {
                row.visibleCellList.push(lastCell);
            }
            row.cellMap = {};
            row.cellList.forEach(cell => {
                cell.rowIndex = row.rowIndex;
                cell.sectionRowIndex = row.sectionRowIndex;
                cell.cellType = row.rowType;
                row.cellMap[cell.columnIndex] = cell;
            });
            if (spreadsheetState.getRowStyle) {
                row.rowStyle = spreadsheetState.getRowStyle(row.rowData, row.rowType, row.sectionRowIndex);
            }
        }

        this.gridRowRowspanSetter.set(result);

        return result;
    }
}